import { glob } from "glob";
import { readFile, stat } from "fs/promises";
import {
  CodeFileSummary,
  CodeObject,
  CodeObjects,
  ProjectSummary,
  RagData,
  codeSummary,
} from "./objectSchemas";
import { infer, callLLM, getCodeSummaryFromLLM } from "./llmInterface";
import { 
    getLanguageTypeFromFile, 
    classesPrompt,
    functionsPrompt,
    variablesPrompt,
    typesPrompt,
    interfacesPrompt,
    commentsPrompt,
    importsPrompt,
    exportsPrompt
 } from "./prompt";
import { saveToVectorDatabase } from "./vectorDB";
import { breakCodeIntoChunks, getFileContentLen, getTokens } from "./shared";
import fs from "fs";
import "dotenv/config";

const llmToUse = process.env.LLM_TO_USE || undefined;
const breakNum = Number(process.env.MAX_TOKEN_SPLIT) || 400;


async function genCodeChunkObj(projectSummary:ProjectSummary, filePath:string, chunk:string):Promise<CodeObject>{
    // Process each chunk's code objects (update projectSummary.ragData, etc.)
    const objectKeys:CodeObjects[] = ['classes', 'functions', 'variables', 'types', 'interfaces', 'comments', 'imports', 'exports']
    const chunkCodeObjectsAny = {} as any;
    
    for (const key of objectKeys) {

    let promptTemplate = ""

    switch (key) {
        case 'classes':
            promptTemplate = classesPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        case 'functions':
            promptTemplate = functionsPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        case 'variables':
            promptTemplate = variablesPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        case 'types':
            promptTemplate = typesPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        case 'interfaces':
            promptTemplate = interfacesPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        case 'comments':
            promptTemplate = commentsPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        case 'imports':
            promptTemplate = importsPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        case 'exports':
            promptTemplate = exportsPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        default:
            console.error("Error: Invalid object key")
            break;
    }

    const codeObjects = await callLLM(
        promptTemplate,
        projectSummary,
        chunk,
        filePath,
        undefined,
        llmToUse
      );

     // insert the object into the chunkCodeObjects
     chunkCodeObjectsAny[key] = codeObjects[key];
    }

    const chunkCodeObjects = chunkCodeObjectsAny as CodeObject;

    return chunkCodeObjects;
}


export function mergeObjectArrays(
  codeObjArray: CodeObject,
  newCodeObj: any
): CodeObject {
  // We need to merge our incoming codeObj's key-array pairs with the existing codeObjArray
  // If the key already exists, we need to merge the arrays
  // If the key does not exist, we need to add it to the codeObjArray
  const mergedCodeObj: any = codeObjArray;
  for (const key in newCodeObj) {
    // if the current key is a string, skip it
    if (typeof newCodeObj[key] === "string") {
      continue;
    }
    if (key in mergedCodeObj) {
      mergedCodeObj[key] = [...mergedCodeObj[key], ...newCodeObj[key]];
    } else {
      mergedCodeObj[key] = newCodeObj[key];
    }
  }

  // Delete any duplicate code objects:
  console.log("Deleting Duplicate Code Objects");
  for (const key in mergedCodeObj as CodeObject) {
    const foundKeys: string[] = [];
    // Make sure the key object is iterable
    if (!Array.isArray(mergedCodeObj[key])) {
      continue;
    }
    for (const arrayObj of mergedCodeObj[key]) {
      if ("name" in arrayObj) {
        if (foundKeys.includes(arrayObj.name)) {
          mergedCodeObj[key] = mergedCodeObj[key].filter(
            (obj: any) => obj.name !== arrayObj.name
          );
        } else {
          foundKeys.push(arrayObj.name);
        }
      } else if ("content" in arrayObj) {
        if (foundKeys.includes(arrayObj.content)) {
          mergedCodeObj[key] = mergedCodeObj[key].filter(
            (obj: any) => obj.content !== arrayObj.content
          );
        } else {
          foundKeys.push(arrayObj.content);
        }
      } else {
        console.warn("Error: Code Object has no name or content property");
        continue;
      }
    }
  }
  return mergedCodeObj;
}

export async function parseCodebase(
  projectPath: string,
  projectName: string
): Promise<ProjectSummary> {
  const projectSummary: ProjectSummary = {
    projectName: projectName,
    projectDescription: {} as codeSummary,
    projectLocation: projectPath,
    codeFiles: [],
    ragData: [],
    teamContext: "", // Placeholder, TODO==> Add support for team context
  };

  const ignorePatterns = [
    "node_modules/**",
    "dist/**",
    ...(await getIgnoredFiles(projectPath)),
  ];
  let filePaths: string[] = [];

  // Determine if the projectPath is a directory or a file
  if (fs.lstatSync(projectPath).isDirectory()) {
    filePaths = await glob("**/*.{ts,js,tsx,jsx}", {
      cwd: projectPath,
      ignore: ignorePatterns,
    }); // TODO=> Add support for way more files
  } else {
    const file = projectPath.split("/").pop();
    projectPath = projectPath.split("/").slice(0, -1).join("/");

    if (!file) {
      throw new Error("Invalid file path");
    }
    filePaths = [file];
  }

  await glob("**/*.{ts,js,tsx,jsx}", {
    cwd: projectPath,
    ignore: ignorePatterns,
  }); // TODO=> Add support for way more files

  for (const filePath of filePaths) {
    console.log(`Parsing file: ${filePath}`);
    const fullFilePath = `${projectPath}/${filePath}`;

    const fileLanguage = await infer(
      getLanguageTypeFromFile(fullFilePath),
      "TEXT STRING",
      "language",
      false,
      undefined,
      undefined,
      llmToUse
    );
    console.log("fileLanguage", fileLanguage.language);
    const codeFileSummary: CodeFileSummary = {
      fileName: filePath,
      fileLocation: fullFilePath,
      codeSummary: {} as codeSummary, // Placeholder, will be updated later
      language: fileLanguage.language || "Unknown",
      executionFlow: [], // Placeholder, will be updated later
      codeObjects: {} as CodeObject, // Placeholder, will be updated later
    };
    let currentLine = 0;

    if ((await isFileTooLarge(fullFilePath, 750, breakNum)) == true) {
      // 750KB is the default limit
      // Handle large files by breaking into chunks and processing separately
      const fileContent = await readFile(fullFilePath, "utf-8");
      const codeChunks = breakCodeIntoChunks(fileContent, breakNum); // 1000 tokens per chunk
      const getCurrentLineEndLineBasedOnChunk = (chunk: string) => {
        const lines = chunk.split("\n");
        return {
          start: currentLine,
          end: currentLine + lines.length,
        };
      };
      console.log("Code broken into codeChunks length =", codeChunks.length);
      for (const [index, chunk] of codeChunks.entries()) {
        console.log(
          "Processing chunk:",
          index + 1,
          "of ",
          codeChunks.length,
          " chunks for file ",
          filePath
        );
        const endLine = getCurrentLineEndLineBasedOnChunk(chunk).end;

        const chunkCodeObjects = await genCodeChunkObj(projectSummary, fullFilePath, chunk);

        const ragData: RagData = {
          metadata: {
            filename: fullFilePath,
            codeChunkId: index,
            codeChunkLineStart: currentLine,
            codeChunkLineEnd: endLine,
            codeObjects: chunkCodeObjects,
            codeChunkSummary: chunkCodeObjects.description,
          },
          documentData: chunk,
        };

        projectSummary.ragData.push(ragData);

        codeFileSummary.codeObjects = mergeObjectArrays(
          codeFileSummary.codeObjects,
          chunkCodeObjects
        );
        codeFileSummary.codeSummary = await getCodeSummaryFromLLM(
          chunk,
          llmToUse
        );

        await saveToVectorDatabase(projectName, chunk, ragData);

        currentLine = endLine;
      }
    } else {
      const fileContent = await readFile(fullFilePath, "utf-8");
      const codeObjects = await genCodeChunkObj(projectSummary, fullFilePath, fileContent);
      // Process code objects and update projectSummary and codeFiles

      // Process each chunk's code objects (update projectSummary.ragData, etc.)
      const ragData: RagData = {
        metadata: {
          filename: fullFilePath,
          codeChunkId: 0,
          codeChunkLineStart: 0,
          codeChunkLineEnd: 0,
          codeObjects: codeObjects,
          codeChunkSummary: codeObjects.description,
        },
        documentData: fileContent,
      };

      projectSummary.ragData.push(ragData); 

      await saveToVectorDatabase(projectName, fileContent, ragData);

      codeFileSummary.codeObjects = mergeObjectArrays(
        codeFileSummary.codeObjects,
        codeObjects
      );
      codeFileSummary.codeSummary = await getCodeSummaryFromLLM(
        fileContent,
        llmToUse
      );
    }

    // WE need to define the overall execution flow here, with another LLM call?

    projectSummary.codeFiles.push(codeFileSummary);
  }

  let codeDescription = '';
    for (const codeFile of projectSummary.codeFiles) {
        codeDescription += codeFile.codeSummary.goal + "\n" + codeFile.codeSummary.features_functions + "\n";
    }
  projectSummary.projectDescription = 
    await getCodeSummaryFromLLM(
      "Summaries of Code Files: \n" + codeDescription,
      llmToUse
    )
  

  return projectSummary;
}

// Helper Functions Implementation:
async function getIgnoredFiles(projectPath: string): Promise<string[]> {
  let ignorePatterns: string[] = [];
  const basePath = projectPath.split("/").slice(0, -1).join("/");
  const executionPath = process.cwd();

  console.log("basePath", basePath);
  console.log("executionPath", executionPath);

  // CHECK for these files in order:
  const pathsToCheck = [
    `${basePath}/.gitignore`,
    `${basePath}/.fofoignore`,
    `${executionPath}/.gitignore`,
    `${executionPath}/.fofoignore`,
  ];

  for (const path of pathsToCheck) {
    if (path.includes("fofoignore")) {
      try {
        const fofoignoreContent = await readFile(
          path,
          "utf-8"
        );
        ignorePatterns.push(...fofoignoreContent.split("\n").filter(Boolean));
      } catch (err) {
        // .fofoignore not found, ignore the error
        console.warn("No .fofoignore file found in " + path);
      }
    } else {
      try {
        const gitignoreContent = await readFile(
          path,
          "utf-8"
        );
        ignorePatterns.push(...gitignoreContent.split("\n").filter(Boolean)); // Filter out empty lines
      } catch (err) {
        // .gitignore not found, ignore the error
        console.warn("No .gitignore file found in " + path);
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
  // Check the amount of characters in the file content
  const file = await readFile(filePath, "utf-8");
  const tooLong = getTokens(file) > maxChars;

  if (tooLong === true) return true;

  return await getFileSizeInKB(filePath).then((size) => size > maxFileSizeKB);
}