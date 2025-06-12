import { glob } from "glob";
import "./logger";
import { readFile, stat } from "fs/promises";
import fs, { readFileSync } from "fs";
import "dotenv/config";

import readline from "readline";

import {
  CodeFileSummary,
  CodeObject,
  CodeObjects,
  FunctionParameter,
  ProjectSummary,
  RagData,
  codeSummary,
  globResult,
  moduleObject,
} from "./objectSchemas";

import {
  callLLM,
  infer,
  getCodeSummaryFromLLM,
} from "./llmInterface";

import {
  determineProjectStack,
  determineModulesPackagesFromFile,
  getLanguageTypeFromFile,
  // The separate prompts exist but we won't individually call them now
  classesPrompt,
  functionsPrompt,
  variablesPrompt,
  typesPrompt,
  interfacesPrompt,
  importsPrompt,
  exportsPrompt,
  // getPackageDependenciesBasedOnLanguage,
  // getGlobsBasedOnLangStack
} from "./prompt";

import {
  saveToVectorDatabase
} from "./vectorDB";

import {
  breakCodeIntoChunks,
  cleanBackticks,
  getContextFromFile,
  getFileContentLen,
  getTokens,
  getTotalLines,
  isArray,
  removeCodeBlockIfPresent,
} from "./shared";

import {
  fofoDocsBuiltInFileSearch,
  fofoDocsBuiltInGlobSearch,
  isNoNoFile,
} from "./appData";

// -------------------------------------
// Environment Variables / Constants
// -------------------------------------
const llmToUse = process.env.LLM_TO_USE || undefined;
const breakNum = Number(process.env.MAX_TOKEN_SPLIT) || 400;
const maxCallsPerMin = Number(process.env.MAX_CALLS_PER_MINUTE) || 60;
const warnIfOverValue = Number(process.env.WARN_IF_OVER || "100");

let maxRetries = 3;
let currentRetry = 0;

// -------------------------------------
// Helper: Minimal Prompt for all objects
// -------------------------------------
function combinedCodeObjectsPrompt(
  teamContext: string,
  filePath: string,
  codeChunk: string
) {
  // You can make this as detailed or short as you like, as long as it requests
  // all code objects in a single JSON structure
  return `
You are a code parser. You will receive a snippet of code from a file. 
The snippet is:

<<< CODE SNIPPET START >>>
${codeChunk}
<<< CODE SNIPPET END >>>

Please return a VALID JSON object with the following top-level keys:
{
  "classes": [ ...CodeObject array... ],
  "functions": [ ...CodeObject array... ],
  "variables": [ ...CodeObject array... ],
  "types": [ ...CodeObject array... ],
  "interfaces": [ ...CodeObject array... ],
  "imports": [ ...CodeObject array... ],
  "exports": [ ...CodeObject array... ]
}

Where each CodeObject has the shape:
{
  "name": string,
  "type": "class" | "function" | "variable" | "type" | "interface" | "import" | "export",
  "description": string,
  "codeSnippet": string,
  "fileName": string,
  "fileLocation": string,
  "annotation": {
      "purpose"?: string,
      "parameters"?: string,
      "returns"?: string,
      "usageExample"?: string,
      "edgeCases"?: string,
      "dependencies"?: string,
      "errorHandling"?: string,
      "performance"?: string,
      "bestPractices"?: string
  },
  "codeLine"?: number,
  "codeIndent"?: number,
  "content"?: string,
  "subObjects"?: CodeObject[],
  "parentObject"?: CodeObject,
  "functionParameters"?: [{
    "name": string,
    "type": string,
    "description": string,
    "example": string
  }],
  "functionReturns"?: {
    "name"?: string,
    "type": string,
    "description": string,
    "example": string
  },
  "isExported"?: boolean,
  "isFunction"?: boolean,
  "isClass"?: boolean,
  "isPrivate"?: boolean,
  "isAsync"?: boolean
}

Use the snippet to fill the "codeSnippet" with the relevant portion,
and set "fileName" to the exact file path: "${filePath}".
Do not wrap JSON in backticks or code fences; just return the raw JSON.
Ignore anything that doesn't fit; do not add additional keys beyond the structure described.`;
}

// -------------------------------------
// Helper: Ensure code object has expected keys
// (Simplified from the original approach)
// -------------------------------------
async function ensureAllKeys(
  possibleObj: any
): Promise<boolean> {
  // We want to see if we have all top-level keys:
  const requiredKeys: CodeObjects[] = [
    "classes",
    "functions",
    "variables",
    "types",
    "interfaces",
    "imports",
    "exports",
  ];
  for (const key of requiredKeys) {
    if (!Object.prototype.hasOwnProperty.call(possibleObj, key)) {
      return false;
    }
    // Also ensure each is an array
    if (!Array.isArray(possibleObj[key])) {
      return false;
    }
  }
  return true;
}

// -------------------------------------
// Helper: Single combined code object generator for a chunk
// -------------------------------------
async function genCodeChunkObj(
  projectSummary: ProjectSummary,
  filePath: string,
  chunk: string,
  bRetry = true
): Promise<{ [key: string]: CodeObject[] }> {
  // We'll do ONE LLM call that returns all code objects in a single JSON
  const bRag = process.env.EMBEDDER_MODE === "OFF" ? false : true;
  const promptTemplate = combinedCodeObjectsPrompt(
    projectSummary.teamContext,
    filePath,
    chunk
  );

  let codeObjects: { [key: string]: CodeObject[] } = {
    classes: [],
    functions: [],
    variables: [],
    types: [],
    interfaces: [],
    imports: [],
    exports: [],
  };

  // Call LLM once
  const rawResult = await callLLM(
    promptTemplate,
    projectSummary,
    chunk,
    filePath,
    bRag,
    llmToUse
  );

  // Attempt to parse it
  try {
    if (typeof rawResult === "string") {
      codeObjects = JSON.parse(rawResult);
    } else {
      // if it's already an object
      codeObjects = rawResult;
    }
  } catch (err) {
    console.error(
      `Error parsing JSON from LLM for chunk of file ${filePath}.`,
      err
    );
  }

  // Validate keys
  const hasAllKeys = await ensureAllKeys(codeObjects);
  if (!hasAllKeys) {
    currentRetry++;
    console.warn("LLM JSON missing keys, attempt:", currentRetry);

    if (currentRetry <= maxRetries && bRetry) {
      console.warn("Retrying to parse chunk...");
      return await genCodeChunkObj(projectSummary, filePath, chunk, bRetry);
    } else {
      console.error("Max retries reached, skipping this chunk's code objects.");
      currentRetry = 0;
      return {
        classes: [],
        functions: [],
        variables: [],
        types: [],
        interfaces: [],
        imports: [],
        exports: [],
      };
    }
  }

  currentRetry = 0;
  return codeObjects;
}

// -------------------------------------
// Merges new code objects into existing
// -------------------------------------
export function mergeObjectArrays(
  codeObjArray: { [key: string]: CodeObject[] },
  newCodeObj: { [key: string]: CodeObject[] }
): { [key: string]: CodeObject[] } {
  const mergedCodeObj = { ...codeObjArray };

  for (const key in newCodeObj) {
    if (!Array.isArray(mergedCodeObj[key])) {
      mergedCodeObj[key] = [];
    }
    // Merge arrays
    mergedCodeObj[key] = [...mergedCodeObj[key], ...newCodeObj[key]];
  }

  // Remove duplicates by `name` or `content`
  for (const key of Object.keys(mergedCodeObj)) {
    const seenNames = new Set<string>();
    const filtered: CodeObject[] = [];

    for (const obj of mergedCodeObj[key]) {
      // pick a unique identifier
      const uniqueID = obj.name || obj.content || "";
      if (!seenNames.has(uniqueID)) {
        seenNames.add(uniqueID);
        filtered.push(obj);
      }
    }
    mergedCodeObj[key] = filtered;
  }

  return mergedCodeObj;
}

// -------------------------------------
// Minimal user prompt in CLI for "continue? (y/n)"
// -------------------------------------
const promptUser = (question: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};

// -------------------------------------
// Finds line numbers with naive fuzzy match
// (kept from original; can be expensive but we keep it to not remove features)
// -------------------------------------
export function findCorrectCodeLineForObject(
  codeObj: { [key: string]: CodeObject[] },
  code: string
): { [key: string]: CodeObject[] } {
  const codeLines = code.split("\n");

  // Attempt fuzzy match: each snippet line must be included at offset
  const findStartLine = (snippetLines: string[], fullLines: string[]): number => {
    for (let i = 0; i < fullLines.length; i++) {
      let match = true;
      for (let j = 0; j < snippetLines.length; j++) {
        if (
          i + j >= fullLines.length ||
          !fullLines[i + j].includes(snippetLines[j].trim())
        ) {
          match = false;
          break;
        }
      }
      if (match) {
        return i + 1; // 1-based
      }
    }
    return -1;
  };

  for (const key in codeObj) {
    if (!codeObj[key] || !Array.isArray(codeObj[key])) continue;

    for (const obj of codeObj[key]) {
      if (!obj.codeSnippet) continue;
      const snippet = removeCodeBlockIfPresent(obj.codeSnippet);
      const snippetLines = snippet.split("\n");
      const startLine = findStartLine(snippetLines, codeLines);
      obj.codeLine = startLine !== -1 ? startLine : -2;
    }
  }
  return codeObj;
}

// -------------------------------------
// Helpers for ignoring files
// -------------------------------------
async function getIgnoredFiles(projectPath: string): Promise<string[]> {
  let ignorePatterns: string[] = [];
  const basePath = projectPath.split("/").slice(0, -1).join("/");
  const executionPath = process.cwd();

  // Potential paths for .gitignore or .fofoignore
  const pathsToCheck = [
    `${basePath}/.gitignore`,
    `${basePath}/.fofoignore`,
    `${executionPath}/.gitignore`,
    `${executionPath}/.fofoignore`,
  ];

  for (const path of pathsToCheck) {
    if (path.includes("fofoignore")) {
      try {
        const fofoignoreContent = await readFile(path, "utf-8");
        ignorePatterns.push(...fofoignoreContent.split("\n").filter(Boolean));
      } catch {
        // no .fofoignore found
      }
    } else {
      try {
        const gitignoreContent = await readFile(path, "utf-8");
        ignorePatterns.push(...gitignoreContent.split("\n").filter(Boolean));
      } catch {
        // no .gitignore found
      }
    }
  }
  return ignorePatterns;
}

async function getFileSizeInKB(filePath: string): Promise<number> {
  return await stat(filePath).then((stats) => stats.size / 1024);
}

async function isFileTooLarge(
  filePath: string,
  maxFileSizeKB: number,
  maxChars: number = 300
): Promise<boolean> {
  // also check token length of file
  const file = readFileSync(filePath, "utf-8");
  const tooLong = getTokens(file) > maxChars;
  if (tooLong) return true;

  const sizeInKb = await getFileSizeInKB(filePath);
  return sizeInKb > maxFileSizeKB;
}

// -------------------------------------
// MAIN: Parse entire codebase
// -------------------------------------
export async function parseCodebase(
  projectPath: string,
  projectName: string
): Promise<ProjectSummary> {
  const projectSummary: ProjectSummary = {
    projectName: projectName,
    projectDescription: {} as codeSummary,
    projectDependencies: [],
    projectLocation: projectPath,
    projectTechStackDescription: "",
    codeFiles: [],
    ragData: [],
    teamContext: "",
  };

  // Clean up projectPath
  projectPath = projectPath.replace(/\/$/, "").replace(/\\$/, "").replace(/\"/g, "");

  // Gather ignore patterns
  const ignorePatterns = [
    "**/node_modules",
    "node_modules",
    "dist",
    "*/node_modules/**",
    "*/dist/**",
    "node_modules/**",
    "dist/**",
    ...(await getIgnoredFiles(projectPath)),
  ];

  // Retrieve extra context from a file, if any
  projectSummary.teamContext = getContextFromFile();

  // Collect file paths
  let filePaths: string[] = [];
  let isDirectory = false;

  if (fs.lstatSync(projectPath).isDirectory()) {
    filePaths = await glob(["**/*", "*"], {
      cwd: projectPath,
      ignore: ignorePatterns,
    });
    isDirectory = true;
  } else {
    const file = projectPath.split("/").pop();
    projectPath = projectPath.split("/").slice(0, -1).join("/");
    if (!file) {
      throw new Error("Invalid file path");
    }
    filePaths = [file];
  }

  // -------------------------------------
  // If it's a directory, guess the stack, gather dependencies, etc.
  // -------------------------------------
  if (isDirectory) {
    console.log("Determining project stack...");
    const filePathsTruncated = filePaths.length > 500 ? filePaths.slice(0, 500) : filePaths;
    const projectStackLang = (await infer(
      determineProjectStack(filePathsTruncated),
      "TEXT STRING",
      undefined,
      false,
      undefined,
      undefined,
      llmToUse
    )) as any;
    projectSummary.projectTechStackDescription = projectStackLang.response || "";

    // Gather potential dependency files
    console.log("Looking for known dependency files...");
    const ignoreMeh = await getIgnoredFiles(projectPath);
    const dependencyFiles = await glob(fofoDocsBuiltInGlobSearch, {
      cwd: projectPath,
      ignore: ignorePatterns,
    }).then((res) => {
      return res.filter((file) => isNoNoFile(file, ignoreMeh) === false);
    });

    for (const depFileName of dependencyFiles) {
      const depFile = `${projectPath}/${depFileName}`;
      try {
        const depFileContent = await readFile(depFile, "utf-8");
        const relevantPackagesModules = (await infer(
          determineModulesPackagesFromFile(depFileContent),
          "JSON object",
          undefined,
          false,
          undefined,
          undefined,
          llmToUse
        )) as moduleObject;

        // flatten
        const flattened = Array.isArray(relevantPackagesModules)
          ? relevantPackagesModules
          : [relevantPackagesModules];
        projectSummary.projectDependencies.push(...flattened);
      } catch (err) {
        console.warn(`Error reading dependency file: ${depFileName}`, err);
      }
    }
    // flatten one more time in case there's nesting
    projectSummary.projectDependencies = projectSummary.projectDependencies.flat(1);

    // Now refine the filePaths to just code files we want
    filePaths = await glob(
      ["**/*.{ts,js,tsx,jsx}", ...fofoDocsBuiltInFileSearch],
      {
        cwd: projectPath,
        ignore: [...ignorePatterns],
      }
    ).then((res) => {
      return res.filter((file) => !isNoNoFile(file));
    });
  }

  // Prompt user if file count is large
  console.log(`Found ${filePaths.length} file(s) to potentially process...`);
  if (filePaths.length > warnIfOverValue) {
    const bContinue = (await promptUser(
      `You have ${filePaths.length} files to parse, which is quite large. Continue? (y/n): `
    )) as string;
    if (bContinue.toLowerCase() !== "y") {
      console.log("Exiting...");
      return projectSummary;
    }
  }

  // -------------------------------------
  // Process a single file
  // -------------------------------------
  const processFile = async (filePath: string) => {
    console.log(`Parsing file: ${filePath}`);
    const fullFilePath = `${projectPath}/${filePath}`;

    // infer language
    const fileLanguage = await infer(
      getLanguageTypeFromFile(fullFilePath),
      "TEXT STRING",
      "language",
      false,
      undefined,
      undefined,
      llmToUse
    );

    const codeFileSummary: CodeFileSummary = {
      fileName: filePath, // Relative path
      fileLocation: fullFilePath, // Absolute path
      fileContent: "", // Initialize fileContent
      codeSummary: {}, // Fields within are optional
      language: fileLanguage.language || "Unknown",
      executionFlow: [], // Initialize as empty, populated if applicable
      codeObjects: {
        classes: [],
        functions: [],
        variables: [],
        types: [],
        interfaces: [],
        imports: [],
        exports: [],
      },
      processingStatus: 'success', // Default status
      processingError: null,       // Default error state
    };

    let fileContent = "";
    let totalLines = 0;

    try {
      fileContent = await readFile(fullFilePath, "utf-8");
      totalLines = getTotalLines(fileContent);

      if (fileContent.trim().length === 0) {
        console.warn(`[Parser] File is empty or contains only whitespace: ${fullFilePath}`);
        codeFileSummary.processingStatus = 'empty';
        codeFileSummary.processingError = "File is empty or contains only whitespace.";
        codeFileSummary.codeSummary = {
            goal: "File is empty or contains only whitespace.",
            features_functions: "Not applicable as file is empty."
        };
        projectSummary.codeFiles.push(codeFileSummary); // Add summary even for empty files
        return; // Skip further processing for this file
      }
      // If content is valid, processingStatus remains 'success' for now
    } catch (error: any) {
      console.error(`[Parser] Error reading file ${fullFilePath}:`, error);
      codeFileSummary.processingStatus = 'error_read';
      codeFileSummary.processingError = error.message;
      codeFileSummary.fileContent = ""; // Ensure fileContent is empty on read error
      codeFileSummary.codeSummary = {
          goal: `File unreadable: ${error.message}`,
          features_functions: "Not applicable due to file read error."
      };
      projectSummary.codeFiles.push(codeFileSummary); // Add summary even for unreadable files
      return; // Skip further processing for this file
    }

    let currentLine = 1;
    // If large, break into chunks
    const largeFile = await isFileTooLarge(fullFilePath, 3000, breakNum);
    if (largeFile) {
      const codeChunks = breakCodeIntoChunks(fileContent, breakNum);
      console.log(
        `File is large, splitting into ${codeChunks.length} chunk(s) for ${filePath}`
      );

      for (let index = 0; index < codeChunks.length; index++) {
        const chunk = codeChunks[index];
        const startLine = currentLine;
        const chunkLines = chunk.split("\n").length;
        const endLine = currentLine + chunkLines - 1;

        console.log(`Processing chunk ${index + 1} / ${codeChunks.length}`);
        const chunkCodeObjects = await genCodeChunkObj(
          projectSummary,
          fullFilePath,
          chunk
        );

        // Attempt line matching
        const updatedObjects = findCorrectCodeLineForObject(
          chunkCodeObjects,
          chunk
        );
        // Adjust line offset
        for (const key of Object.keys(updatedObjects)) {
          for (const obj of updatedObjects[key]) {
            if (obj.codeLine && obj.codeLine > 0) {
              obj.codeLine += startLine - 1;
            }
          }
        }

        // Combine into codeFileSummary
        codeFileSummary.codeObjects = mergeObjectArrays(
          codeFileSummary.codeObjects,
          updatedObjects
        );

        // Summarize chunk
        const chunkSummary = await getCodeSummaryFromLLM(chunk, llmToUse);

        // Add to ragData
        const ragData: RagData = {
          metadata: {
            filename: fullFilePath,
            codeChunkId: index,
            codeChunkLineStart: startLine,
            codeChunkLineEnd: endLine,
            codeObjects: updatedObjects,
            codeChunkSummary:
              chunkSummary.goal + "\n" + chunkSummary.features_functions,
          },
          documentData: chunk,
          allSearchResults: {
            included: [],
            ids: [],
            embeddings: null,
            documents: [],
            metadatas: [],
            distances: null,
          },
          allResults: {
            documents: undefined,
            embeddings: null,
            metadatas: [],
          },
        };
        projectSummary.ragData.push(ragData);

        // Save chunk to vector DB
        await saveToVectorDatabase(projectName, chunk, ragData);

        currentLine = endLine + 1;
      }
    } else {
      // Smaller file, single chunk
      const codeObjects = await genCodeChunkObj(
        projectSummary,
        fullFilePath,
        fileContent
      );
      // Attempt line matching
      const updatedObjects = findCorrectCodeLineForObject(
        codeObjects,
        fileContent
      );

      codeFileSummary.codeObjects = mergeObjectArrays(
        codeFileSummary.codeObjects,
        updatedObjects
      );

      // Summarize entire file
      let fileSummaryForLLM: codeSummary = { goal: "Default goal if not overwritten by LLM", features_functions: "Default features if not overwritten" };
      try {
        fileSummaryForLLM = await getCodeSummaryFromLLM(fileContent, llmToUse);
        // If LLM summary was successful, codeFileSummary.processingStatus remains 'success'
      } catch (llmError: any) {
        console.error(`[Parser] Error getting LLM summary for ${fullFilePath}:`, llmError);
        codeFileSummary.processingStatus = 'error_llm_summary';
        codeFileSummary.processingError = llmError.message;
        // Populate codeSummary with error placeholders
        fileSummaryForLLM = { // Assign to the local variable that gets used for codeFileSummary.codeSummary
            goal: `LLM summary generation failed: ${llmError.message}`,
            features_functions: "Not applicable due to LLM summary error."
        };
      }


      const ragData: RagData = {
        metadata: {
          filename: fullFilePath,
          codeChunkId: 0,
          codeChunkLineStart: 1,
          codeChunkLineEnd: totalLines,
          codeObjects: updatedObjects,
          codeChunkSummary:
            (fileSummaryForLLM.goal || "") + "\n" + (fileSummaryForLLM.features_functions || ""),
        },
        documentData: fileContent,
        allSearchResults: {
          included: [],
          ids: [],
          embeddings: null,
          documents: [],
          metadatas: [],
          distances: null,
        },
        allResults: {
          documents: undefined,
          embeddings: null,
          metadatas: [],
        },
      };
      projectSummary.ragData.push(ragData);
      // Consider if saveToVectorDatabase should be skipped if LLM summary failed
      if (codeFileSummary.processingStatus === 'success') { // Only save if no prior critical error
         await saveToVectorDatabase(projectName, fileContent, ragData);
      }
      codeFileSummary.codeSummary = fileSummaryForLLM;
    }

    projectSummary.codeFiles.push(codeFileSummary);
  };

  // -------------------------------------
  // Remove package.json from further processing if it’s in the list
  // -------------------------------------
  filePaths = filePaths.filter((f) => !f.endsWith("package.json"));

  // -------------------------------------
  // Process each file sequentially
  // (You could parallelize with a concurrency queue if you want.)
  // -------------------------------------
  for (const filePath of filePaths) {
    await processFile(filePath);
  }

  // -------------------------------------
  // Summarize the entire codebase by combining file summaries
  // -------------------------------------
  let combinedDescription = "";
  for (const codeFile of projectSummary.codeFiles) {
    if (codeFile.codeSummary) { // Check if codeSummary exists
      combinedDescription += `## ${codeFile.fileName}\n`;
      combinedDescription += (codeFile.codeSummary.goal || "N/A") + "\n";
      combinedDescription += (codeFile.codeSummary.features_functions || "N/A") + "\n\n";
    }
  }
  try {
    projectSummary.projectDescription = await getCodeSummaryFromLLM(
      "# Summaries of Code Files: \n" + combinedDescription,
      llmToUse
    );
  } catch (llmError: any) {
    console.error(`[Parser] Error getting LLM project description:`, llmError);
    projectSummary.projectDescription = {
      goal: "Error generating project description.",
      features_functions: "Could not generate project features due to LLM error."
    };
  }


  return projectSummary;
}
