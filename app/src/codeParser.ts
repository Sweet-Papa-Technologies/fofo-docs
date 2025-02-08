import { glob } from "glob";
import "./logger";
import { readFile, stat } from "fs/promises";
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
import { infer, callLLM, getCodeSummaryFromLLM } from "./llmInterface";
import { 
    getLanguageTypeFromFile, 
    classesPrompt,
    functionsPrompt,
    variablesPrompt,
    typesPrompt,
    interfacesPrompt,
    // commentsPrompt,
    importsPrompt,
    exportsPrompt,
    determineProjectStack,
    getPackageDependenciesBasedOnLanguage,
    determineModulesPackagesFromFile,
    getGlobsBasedOnLangStack
 } from "./prompt";
import { saveToVectorDatabase } from "./vectorDB";
import { breakCodeIntoChunks, cleanBackticks, getContextFromFile, getFileContentLen, getTokens, getTotalLines, isArray, removeCodeBlockIfPresent } from "./shared";
import fs from "fs";
import "dotenv/config";
import { readFileSync } from "fs";

const llmToUse = process.env.LLM_TO_USE || undefined;
const breakNum = Number(process.env.MAX_TOKEN_SPLIT) || 400;
const maxCallsPerMin = Number(process.env.MAX_CALLS_PER_MINUTE) || 60;

import readline from 'readline'
import { fofoDocsBuiltInFileSearch, fofoDocsBuiltInGlobSearch, isNoNoFile } from "./appData";


const  ensureCodeObjectHasAllKeys = async (codeObjects: {
  [key : string]: CodeObject[]
}, key: string) => {
    if (!codeObjects[key]) {
      console.log(`Code object ${key} not found`)
       return false
    }

    // Check that the code object has all keys
    const keys = Object.keys(codeObjects[key]);
    const dummyCodeObject: CodeObject = {
      name: "",
      type: "function",
      description: "",
      codeSnippet: "",
      fileName: "",
      fileLocation: ""
    } 

    // Ensure the code object has all keys that are expected in the CodeObjects interface
    let index = 0
    for (const key of Object.keys(dummyCodeObject)) {
        if (!keys.includes(key)) {
            console.log(`Code object ${index} does not seem to have key ${key}`)
            console.log("The Actual Code Object:")
            console.debug(JSON.stringify(codeObjects[key], null, 2))
            console.log("The Expected Code Object Schema:")
            console.debug(JSON.stringify(dummyCodeObject, null, 2))
            console.log(`Missing key: ${key}`)
            return false
        }
        index++
    }

    // If we get here, the code object has all keys
    return true
}


// Create readline interface

// Function to prompt user for input
const promptUser = (question:string) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
            rl.close();
        });
    })
};

let maxRetries = 3;
let currentRetry = 0;
async function genCodeChunkObj(projectSummary:ProjectSummary, filePath:string, chunk:string, bRetry = true):Promise<{
  [key : string]: CodeObject[]
}>{
    // Process each chunk's code objects (update projectSummary.ragData, etc.)
    const objectKeys:CodeObjects[] = ['classes', 'functions', 'variables', 'types', 'interfaces', 'imports', 'exports']
    const chunkCodeObjectsAny = {} as {
      [key : string]: CodeObject[]
    };

    
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
        // case 'comments':
        //     promptTemplate = commentsPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
        //     break;
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

    const bRag = process.env.EMBEDDER_MODE === 'OFF' ? false : true

    let codeObjects = await callLLM(
        promptTemplate,
        projectSummary,
        chunk,
        filePath,
        bRag,
        llmToUse
      ) as {
        [key : string]: CodeObject[]
      }

      // We need to ensure the CodeObject actually contains all of the keys we would expect,
      // and if not, we need to try generating it again!
      const bOK = await ensureCodeObjectHasAllKeys(codeObjects, key);

      if (bOK === false) {
        console.log(`Code object ${key} not found -- WE NEED TO RETRY?`)
        console.debug(codeObjects)
        console.debug(JSON.stringify(codeObjects))
        currentRetry++
        console.log(`Current Retry: ${currentRetry}`)

        if (currentRetry > maxRetries) {
          console.log(`Max retries reached for chunk ${chunk}`)
          console.warn(`Unable to generate code object ${key} for chunk ${chunk}, skipping`)
          currentRetry = 0
          bRetry = false
        } else {
          if (bRetry) {
            console.log(`Retrying for chunk ${chunk}`)
            return await genCodeChunkObj(projectSummary, filePath, chunk, bRetry)
          }
        }
      } else {
        currentRetry = 0
      }

     // insert the object into the chunkCodeObjects
     chunkCodeObjectsAny[key] = codeObjects[key];
    }

    return chunkCodeObjectsAny;
}


export function mergeObjectArrays(
  codeObjArray: {
    [key: string]: CodeObject[];
},
  newCodeObj: {
    [key: string]: CodeObject[];
}
): {
  [key: string]: CodeObject[];
} {
  // We need to merge our incoming codeObj's key-array pairs with the existing codeObjArray
  // If the key already exists, we need to merge the arrays
  // If the key does not exist, we need to add it to the codeObjArray
  const mergedCodeObj = { ...codeObjArray };
  for (const key in newCodeObj) {

    // if the current key is a string, skip it
    if (typeof newCodeObj[key] === "string" || newCodeObj[key] instanceof String) {
      continue;
    }
    if (typeof mergedCodeObj[key] === "string" || mergedCodeObj[key] instanceof String) {
      console.warn("Error: Code Object is not an object");
      console.debug(newCodeObj[key]);
      continue;
    }

    if (key in mergedCodeObj) {
      if (Array.isArray(mergedCodeObj[key]) && Array.isArray(newCodeObj[key])){
        mergedCodeObj[key] = [...mergedCodeObj[key], ...newCodeObj[key]];
      } else{
        console.error("Not an Array?")

      }

    } else {
      mergedCodeObj[key] = newCodeObj[key];
    }
  }

  // Delete any duplicate code objects:
  console.log("Deleting Duplicate Code Objects");
  console.debug(mergedCodeObj);
  console.debug(JSON.stringify(mergedCodeObj));

  if (!mergedCodeObj) {
    console.warn("Error: Merged Code Object is undefined or null, we have to return the original object, which may have duplicates!");
    console.info(codeObjArray);
    console.info(JSON.stringify(codeObjArray));
    return codeObjArray;
  }

  const mergedCodeKeys = Object.keys(mergedCodeObj);
  for (const key of mergedCodeKeys) {

    const foundKeys: string[] = [];

    // Make sure the key object is iterable
    // MAY Need to put this back later or something
    // if (!Array.isArray(mergedCodeObj[key])) {
    //   console.warn("Error: Code Object is not an array");
    //   console.log(mergedCodeObj[key]);
    //   console.log(key);
    //   continue;
    // }

    if (!mergedCodeObj[key]) {
      console.warn("Error: Code Object is undefined or null, we have to return the original object, which may have duplicates!");
      console.log(mergedCodeObj[key]);
      console.log(key);
      console.log(JSON.stringify(mergedCodeObj[key]));
      continue;
    }

    if ('name' in Object.keys(mergedCodeObj[key])) {
      console.warn("Error: We got a Code Object when we shouldn't have!!!")
      console.log(mergedCodeObj[key]);
      continue;
    }
    for (const arrayObj of mergedCodeObj[key]) {
      if ("name" in arrayObj) {
        if (foundKeys.includes(arrayObj.name)) {
          mergedCodeObj[key] = mergedCodeObj[key].filter(
            (obj) => obj.name !== arrayObj.name
          );
        } else {
          foundKeys.push(arrayObj.name);
        }
      } else if ("content" in arrayObj && arrayObj['content'] !== undefined) {
        if (foundKeys.includes(arrayObj['content'])) {
          mergedCodeObj[key] = mergedCodeObj[key].filter(
            (obj) => obj['content'] !== arrayObj['content']
          );
        } else {
          foundKeys.push(arrayObj['content']);
        }
      } else {
        const expectedSchema = {
          name: "",
          type: "function",
          description: "",
          codeSnippet: "",
          fileName: "",
          fileLocation: ""
        };
        console.error(
          "Missing key 'name'. Detailed object:",
          JSON.stringify(arrayObj, null, 2),
          "\nExpected schema:",
          JSON.stringify(expectedSchema, null, 2),
          "\nStack trace:",
          new Error().stack
        );
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
    projectDependencies: [],
    projectLocation: projectPath,
    projectTechStackDescription: "",
    codeFiles: [],
    ragData: [],
    teamContext: "",
  };

  // Clean projectPath of any trailing slashes or '"' characters
  projectPath = projectPath.replace(/\/$/, "");
  projectPath = projectPath.replace(/\\$/g, "");
  projectPath = projectPath.replace(/\"/g, "");

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

  projectSummary.teamContext = getContextFromFile(); 
  console.log("Team/Project Context:\n", projectSummary.teamContext)

  let filePaths: string[] = [];
  let bIsDir = false
  // Determine if the projectPath is a directory or a file

  if (fs.lstatSync(projectPath).isDirectory()) {

    filePaths = await glob(["**/*", "*"], {
      cwd: projectPath,
      ignore: ignorePatterns,
    });
    bIsDir = true
  } else {
    const file = projectPath.split("/").pop();
    projectPath = projectPath.split("/").slice(0, -1).join("/");

    if (!file) {
      throw new Error("Invalid file path");
    }
    filePaths = [file];
  }

  // Determine the general information about the project, and determine if there are any package dependencies, etc:
  if (bIsDir === true) {
  const filePathsTruncated = filePaths.length > 500 ? filePaths.slice(0, 500) : filePaths;
  console.log("===> Determining Project Stack and Dependencies:\n\n");
  console.log("Files to Determine Stack:", filePathsTruncated.length);
  //console.debug(filePathsTruncated)
  const projectStackLang = await infer(
    determineProjectStack(filePathsTruncated),
    "TEXT STRING",
    undefined,
    false,
    undefined,
    undefined,
    llmToUse
  ) as any;

  projectSummary.projectTechStackDescription = projectStackLang.response;

  console.log("Project Stack Language:", projectStackLang.response);

  // const associatedDependencyFiles = await infer(
  //   getPackageDependenciesBasedOnLanguage(projectStackLang.response),
  //   "JSON object",
  //   undefined,
  //   false,
  //   undefined,
  //   undefined,
  //   llmToUse
  // ) as globResult;

  // const detectedGlobs = await infer(
  //   getGlobsBasedOnLangStack(projectStackLang.response),
  //   "JSON object",
  //   undefined,
  //   false,
  //   undefined,
  //   undefined,
  //   llmToUse
  // ) as globResult;

  // console.log("Detected Globs:", detectedGlobs.glob);
  // console.log("Detected Ignore Patterns:", detectedGlobs.ignore);
  // Search for the specific files the LLM decided we should look for:

  // Update Files Paths to Include LLM Result:
  const ignoreMeh = await getIgnoredFiles(projectPath)
  filePaths = await glob(["**/*.{ts,js,tsx,jsx}", ...fofoDocsBuiltInFileSearch], {
    cwd: projectPath,
    ignore: [...ignorePatterns],
  }).then((res) => {
    console.log("All Files LEN:", res.length);
    return res.filter((file) => isNoNoFile(file) === false);
  });

  console.debug(filePaths)
  console.log("POST Filter Files to Process LEN:", filePaths.length);

  console.log("Searching for Dependency Files:", fofoDocsBuiltInGlobSearch)
  console.log("Ignoring Files:", ignorePatterns)

  const dependencyFiles = await glob(fofoDocsBuiltInGlobSearch, {
    cwd:projectPath,
    ignore: ignorePatterns,
  })
  .then((res) => {
    console.log("Dependency Files Found (PRIOR):", res);
    return res.filter((file) => isNoNoFile(file, ignoreMeh) === false);
  });

  console.log("Dependency Files Found:", dependencyFiles);

  // Process each dependency file:
  for (const depFileName of dependencyFiles) {
    const depFile = `${projectPath}/${depFileName}`;
    console.log("Processing Dependency File:", depFile);
    const depFileContent = await readFile(`${depFile}`, "utf-8");
    const relevantPackagesModules = await infer(
      determineModulesPackagesFromFile(depFileContent),
      "JSON object",
      undefined,
      false,
      undefined,
      undefined,
      llmToUse
    ) as moduleObject;

    projectSummary.projectDependencies.push(relevantPackagesModules);
  }

  // if the result array is nested, or it is an array of arrays, we need to flatten it
  projectSummary.projectDependencies = projectSummary.projectDependencies.flat(1);

}

console.log(filePaths)
  // Process Each File!
  console.log("===> Processing Code Files:\n\n");
  console.log("Files to Process:", filePaths.length);
  
  // pause for a moment so user can see
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const warnIfOverValue = Number(process.env.WARN_IF_OVER || "100");
  console.log("Warn if over value:", warnIfOverValue);

  if (filePaths.length === 0) {
    console.log("No files to process, exiting...");
    return projectSummary;
  }

  if (filePaths.length > warnIfOverValue) {
    console.warn("Warning: Large number of files to process, this may take a while...");

    // Prompt to see if they want to continue:
    const bContinue = await promptUser("Continue processing files? (y/n): ") as string;
    if (bContinue?.toLocaleLowerCase() !== "y") {
      console.log("Exiting...");
      return projectSummary;
    } else {
      console.log("ALRIGHT, LET'S CONTINUE...");
    }
  }

  const processFile = async (filePath: string) => {
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
      codeObjects: {} as {
        [key: string]: CodeObject[];
    }, // Placeholder, will be updated later
    };
    let currentLine = 0;

    if ((await isFileTooLarge(fullFilePath, 3000, breakNum)) == true) {
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

        const chunkCodeObjects = await genCodeChunkObj(projectSummary, fullFilePath, chunk)
        .then(
          (res) => {

            try {
              const codeLineUpdatedObject =  findCorrectCodeLineForObject(res, chunk)
              if (codeLineUpdatedObject.codeLine){
                // codeLineUpdatedObject.codeLine = codeLineUpdatedObject.codeLine + currentLine
                for (const obj of codeLineUpdatedObject.codeObjects) {
                  if (!obj.codeLine) {
                    obj.codeLine = 0
                  }
                  obj.codeLine = obj.codeLine + currentLine
                }
                return codeLineUpdatedObject 
              }
            } catch (err) {
              console.error("Error finding correct code line for object", err);
          }
          return res
        });

        // Update the Data with correct line information:
        const description = (()=>{
          // Take all of the code objects and turn them into a single string
          let description = ""
        for (const obj of Object.keys(chunkCodeObjects)) {
          if (!chunkCodeObjects[obj]) continue;
          if (!Array.isArray(chunkCodeObjects[obj])) continue;
          if (chunkCodeObjects[obj].length === 0) continue;
          if (chunkCodeObjects[obj][0] instanceof String) continue;
          if (chunkCodeObjects[obj][0].description === undefined) continue;
          for (const codeObj of chunkCodeObjects[obj]) {
            description += codeObj.description + "\n"
          }
        }
          return description
        })()
        const ragData: RagData = {
          metadata: {
            filename: fullFilePath,
            codeChunkId: index,
            codeChunkLineStart: currentLine,
            codeChunkLineEnd: endLine,
            codeObjects: chunkCodeObjects,
            codeChunkSummary: description,
          },
          documentData: chunk,
          allSearchResults: {
            included: [],
            ids: [],
            embeddings: null,
            documents: [],
            metadatas: [],
            distances: null
          },
          allResults: {
            documents: undefined,
            embeddings: null,
            metadatas: []
          }
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
      const codeObjects = await genCodeChunkObj(projectSummary, fullFilePath, fileContent)
      .then(
        (res) => {

          try {
            const codeLineUpdatedObject =  findCorrectCodeLineForObject(res, fileContent)
            return codeLineUpdatedObject 

          } catch (err) {
            console.error("Error finding correct code line for object", err);
            
        }
        return res
      });
      // Process code objects and update projectSummary and codeFiles
      const description = (()=>{
        // Take all of the code objects and turn them into a single string
        let description = ""
        for (const obj of Object.keys(codeObjects)) {
          if (!codeObjects[obj]) continue;
          if (!Array.isArray(codeObjects[obj])) continue;
          if (codeObjects[obj].length === 0) continue;
          if (codeObjects[obj][0] instanceof String) continue;
          if (codeObjects[obj][0].description === undefined) continue;
          for (const codeObj of codeObjects[obj]) {
            description += codeObj.description + "\n"
          }
        }
        return description
      })()

      // Process each chunk's code objects (update projectSummary.ragData, etc.)
      const ragData: RagData = {
        metadata: {
          filename: fullFilePath,
          codeChunkId: 0,
          codeChunkLineStart: 1,
          codeChunkLineEnd: getTotalLines(fileContent),
          codeObjects: codeObjects,
          codeChunkSummary: description,
        },
        documentData: fileContent,
        allSearchResults: {
          included: [],
          ids: [],
          embeddings: null,
          documents: [],
          metadatas: [],
          distances: null
        },
        allResults: {
          documents: undefined,
          embeddings: null,
          metadatas: []
        }
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

  
  // TODO=> Implement DIS
  // Divide the files array into separate arrays based on the number of calls we can make per minute
  // const fileJobs=[]
  // const maxFilesPerJob = maxCallsPerMin
  // for (let i = 0; i < filePaths.length; i += maxFilesPerJob) {
  //   fileJobs.push(filePaths.slice(i, i + maxFilesPerJob));
  // }

  // console.log("Number of File Jobs:", fileJobs.length);

  // for (const job of fileJobs) {
  //   await Promise.all(job.map((filePath) => processFile(filePath)));
  // }


  filePaths = filePaths.filter((file) => file.endsWith("package.json") === false);
  
  for (const filePath of filePaths) {
    await processFile(filePath);
  }

  let codeDescription = '';
    for (const codeFile of projectSummary.codeFiles) {

        codeDescription += `## ${codeFile.fileName}\n`;
        codeDescription += codeFile.codeSummary.goal + "\n" + 
        codeFile.codeSummary.features_functions + "\n\n";
    }
  projectSummary.projectDescription = 
    await getCodeSummaryFromLLM(
      "# Summaries of Code Files: \n" + codeDescription,
      llmToUse
    )
  

  return projectSummary;
}

// export function findCorrectCodeLineForObject(codeObj: {
//   [key : string]: CodeObject[]
// }, code: string): {
//   [key : string]: CodeObject[]
// } {
//   // Split the entire code into lines
//   const codeLines = code.split("\n");

//   // Function to find the start line of a code snippet with fuzzy matching
//   const findStartLine = (snippetLines: string[], codeLines: string[]): number => {
//       for (let i = 0; i < codeLines.length; i++) {
//           let match = true;
//           for (let j = 0; j < snippetLines.length; j++) {
//               if (i + j >= codeLines.length || !codeLines[i + j].includes(snippetLines[j].trim())) {
//                   match = false;
//                   break;
//               }
//           }
//           if (match) {
//               return i + 1; // Line numbers are 1-based
//           }
//       }
//       return -1; // Not found
//   };

//   // Find the correct code line for each object
//   for (const key in codeObj) {
//       const codeObject = codeObj
//       try {
//         if (!codeObject[key]) continue;
//         if (!Array.isArray(codeObject[key])) continue;
//         if (codeObject[key].length === 0) continue;
//         if (codeObject[key][0] instanceof String) continue;
//         if (codeObject[key][0].codeSnippet === undefined) continue;
//         for (const objects of codeObject[key]) {
//           const obj = objects;
//           const codeSnippet = removeCodeBlockIfPresent(obj.codeSnippet)
//           const snippetLines = codeSnippet.split("\n");

//           const startLine = findStartLine(snippetLines, codeLines);
//           obj.codeLine = startLine !== -1 ? startLine : -2;
//         }
//       } catch(err) {
//         console.error("Error finding correct code line for object", err);
//         console.debug("Code Object RAW:", codeObj);
//         console.debug("Code Object Stringified:", JSON.stringify(codeObj));
//         console.debug("Typeof Code Object:", typeof codeObj);
//         console.debug("Code Object Key:", key);

//         // This may be a BAD object, so let us go ahead and CREATE it and add some blank data
//         if (!codeObj) codeObj = {} as { [key: string]: CodeObject[] };
//         if (!codeObj[key]) codeObj[key] = [];
//       }
//   }
//   return codeObj;
// }



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
  const file = readFileSync(filePath, "utf-8");
  const tooLong = getTokens(file) > maxChars;

  if (tooLong === true) return true;

  return await getFileSizeInKB(filePath).then((size) => size > maxFileSizeKB);
}


export function findCorrectCodeLineForObject(codeObj: {
  [key : string]: CodeObject[]
}, code: string): {
  [key : string]: CodeObject[]
} {
  // Split the entire code into lines
  const codeLines = code.split("\n");

  // Function to find the start line of a code snippet with fuzzy matching
  const findStartLine = (snippetLines: string[], codeLines: string[]): number => {
      for (let i = 0; i < codeLines.length; i++) {
          let match = true;
          for (let j = 0; j < snippetLines.length; j++) {
              if (i + j >= codeLines.length || !codeLines[i + j].includes(snippetLines[j].trim())) {
                  match = false;
                  break;
              }
          }
          if (match) {
              return i + 1; // Line numbers are 1-based
          }
      }
      return -1; // Not found
  };

  // Find the correct code line for each object
  for (const key in codeObj) {
      const codeObject = codeObj
      try {
        if (!codeObject[key]) continue;
        if (!Array.isArray(codeObject[key])) continue;
        if (codeObject[key].length === 0) continue;
        if (codeObject[key][0] instanceof String) continue;
        if (codeObject[key][0].codeSnippet === undefined) continue;
        for (const objects of codeObject[key]) {
          const obj = objects;
          const codeSnippet = removeCodeBlockIfPresent(obj.codeSnippet)
          const snippetLines = codeSnippet.split("\n");

          const startLine = findStartLine(snippetLines, codeLines);
          obj.codeLine = startLine !== -1 ? startLine : -2;
        }
      } catch(err) {
        console.error("Error finding correct code line for object", err);
        console.debug("Code Object RAW:", codeObj);
        console.debug("Code Object Stringified:", JSON.stringify(codeObj));
        console.debug("Typeof Code Object:", typeof codeObj);
        console.debug("Code Object Key:", key);

        // This may be a BAD object, so let us go ahead and CREATE it and add some blank data
        if (!codeObj) codeObj = {} as { [key: string]: CodeObject[] };
        if (!codeObj[key]) codeObj[key] = [];
      }
  }
  return codeObj;
}
