# src/codeParser.ts - fofo-docs

**Summary:** The code checks if a file is too long based on token count or file size.

- **File Location:** .//src/codeParser.ts
- **Language:** TypeScript
## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [imports](#imports)
- [exports](#exports)
## functions
🔧 **FUNCTIONS**


### genCodeChunkObj - [FUNCTION]
------------------------------------------------------------
**Description:** Processes each chunk's code objects and updates the project summary.
**Code Snippet:**
```
async function genCodeChunkObj(projectSummary:ProjectSummary, filePath:string, chunk:string):Promise<CodeObject>{ ... }
```
- **Line:** 32
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectSummary** (ProjectSummary): Summary of the project. 
 Example: projectSummary
- **filePath** (string): Path to the file being processed. 
 Example: './/src/codeParser.ts'
- **chunk** (string): Chunk of code to process. 
 Example: chunk
###### Function Returns:
- **Type:** CodeObject
- **Description:** Processed code objects for the chunk.
- **Example:** chunkCodeObjects

### mergeObjectArrays - [FUNCTION]
------------------------------------------------------------
**Description:** Merges incoming code object's key-array pairs with the existing code object array.
**Code Snippet:**
```
export function mergeObjectArrays(codeObjArray: CodeObject, newCodeObj: any): CodeObject { ... }
```
- **Line:** 73
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **codeObjArray** (CodeObject): Existing code object array. 
 Example: codeObjArray
- **newCodeObj** (any): New code object to merge. 
 Example: newCodeObj
###### Function Returns:
- **Type:** CodeObject
- **Description:** Merged code object array.
- **Example:** mergedCodeObj

### parseCodebase - [FUNCTION]
------------------------------------------------------------
**Description:** Parses the codebase located at the given project path and generates a summary of the project.
**Code Snippet:**
```
export async function parseCodebase(projectPath: string, projectName: string): Promise<ProjectSummary> { ... }
```
- **Line:** 30
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectPath** (string): The path to the project directory or file. 
 Example: /path/to/project
- **projectName** (string): The name of the project. 
 Example: MyProject
###### Function Returns:
- **Type:** ProjectSummary
- **Description:** A summary of the project including its name, description, location, code files, and other metadata.
- **Example:** [object Object]

### getIgnoredFiles - [FUNCTION]
------------------------------------------------------------
**Description:** Reads and returns a list of file patterns to ignore based on .gitignore and .fofoignore files in various paths.
**Code Snippet:**
```
async function getIgnoredFiles(projectPath: string): Promise<string[]> { ... }
```
- **Line:** 88
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectPath** (string): The path of the project to check for ignore files. 
 Example: /path/to/project
###### Function Returns:
- **Type:** string[]
- **Description:** An array of file patterns to ignore.
- **Example:** node_modules,dist

### getFileSizeInKB - [FUNCTION]
------------------------------------------------------------
**Description:** Returns the size of a file in kilobytes.
**Code Snippet:**
```
async function getFileSizeInKB(filePath: string): Promise<number> { ... }
```
- **Line:** 123
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **filePath** (string): The path of the file to check the size of. 
 Example: /path/to/file.txt
###### Function Returns:
- **Type:** number
- **Description:** The size of the file in kilobytes.
- **Example:** 1024

### isFileTooLarge - [FUNCTION]
------------------------------------------------------------
**Description:** Checks if a file is too large based on its size in kilobytes and the number of characters.
**Code Snippet:**
```
async function isFileTooLarge(filePath: string, maxFileSizeKB: number, maxChars: number = 300): Promise<boolean> { ... }
```
- **Line:** 128
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **filePath** (string): The path of the file to check. 
 Example: /path/to/file.txt
- **maxFileSizeKB** (number): The maximum file size in kilobytes. 
 Example: 1024
- **maxChars** (number): The maximum number of characters allowed in the file. 
 Example: 300
###### Function Returns:
- **Type:** boolean
- **Description:** Whether the file is too large.
- **Example:** true
## variables
🧮 **VARIABLES**


### llmToUse - [VARIABLE]
------------------------------------------------------------
**Description:** Specifies the language model to use, retrieved from environment variables.
**Code Snippet:**
```
const llmToUse = process.env.LLM_TO_USE || undefined;
```
- **Line:** 23
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### breakNum - [VARIABLE]
------------------------------------------------------------
**Description:** Specifies the maximum token split value, retrieved from environment variables or defaults to 400.
**Code Snippet:**
```
const breakNum = Number(process.env.MAX_TOKEN_SPLIT) || 400;
```
- **Line:** 24
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### objectKeys - [VARIABLE]
------------------------------------------------------------
**Description:** An array of code object types to be processed.
**Code Snippet:**
```
const objectKeys:CodeObjects[] = ['classes', 'functions', 'variables', 'types', 'interfaces', 'imports', 'exports']
```
- **Line:** 30
- **Indent:** 1
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### chunkCodeObjectsAny - [VARIABLE]
------------------------------------------------------------
**Description:** An object to store the code objects for each chunk.
**Code Snippet:**
```
const chunkCodeObjectsAny = {} as any;
```
- **Line:** 31
- **Indent:** 1
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### promptTemplate - [VARIABLE]
------------------------------------------------------------
**Description:** A template string for generating prompts based on the type of code object.
**Code Snippet:**
```
let promptTemplate = ""
```
- **Line:** 34
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### mergedCodeObj - [VARIABLE]
------------------------------------------------------------
**Description:** An object to store the merged code objects.
**Code Snippet:**
```
const mergedCodeObj: any = codeObjArray;
```
- **Line:** 71
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### mergedCodeKeys - [VARIABLE]
------------------------------------------------------------
**Description:** An array of keys from the merged code objects.
**Code Snippet:**
```
const mergedCodeKeys = Object.keys(mergedCodeObj);
```
- **Line:** 86
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### foundKeys - [VARIABLE]
------------------------------------------------------------
**Description:** An array to store unique keys found in the merged code object.
**Code Snippet:**
```
const foundKeys: string[] = [];
```
- **Line:** 1
- **Indent:** 4
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### projectSummary - [VARIABLE]
------------------------------------------------------------
**Description:** An object to store the summary of the project being parsed.
**Code Snippet:**
```
const projectSummary: ProjectSummary = { projectName: projectName, projectDescription: {} as codeSummary, projectLocation: projectPath, codeFiles: [], ragData: [], teamContext: "", };
```
- **Line:** 27
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### filePaths - [VARIABLE]
------------------------------------------------------------
**Description:** An array to store the paths of the files to be parsed.
**Code Snippet:**
```
let filePaths: string[] = [];
```
- **Line:** 41
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### fullFilePath - [VARIABLE]
------------------------------------------------------------
**Description:** A variable to store the full path of the file being parsed.
**Code Snippet:**
```
const fullFilePath = `${projectPath}/${filePath}`;
```
- **Line:** 71
- **Indent:** 4
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### fileLanguage - [VARIABLE]
------------------------------------------------------------
**Description:** A variable to store the inferred language of the file being parsed.
**Code Snippet:**
```
const fileLanguage = await infer( getLanguageTypeFromFile(fullFilePath), "TEXT STRING", "language", false, undefined, undefined, llmToUse );
```
- **Line:** 74
- **Indent:** 4
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### codeFileSummary - [VARIABLE]
------------------------------------------------------------
**Description:** An object to store the summary of the code file being parsed.
**Code Snippet:**
```
const codeFileSummary: CodeFileSummary = { fileName: filePath, fileLocation: fullFilePath, codeSummary: {} as codeSummary, language: fileLanguage.language || "Unknown", executionFlow: [], codeObjects: {} as CodeObject, };
```
- **Line:** 79
- **Indent:** 4
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### currentLine - [VARIABLE]
------------------------------------------------------------
**Description:** A variable to keep track of the current line number while parsing the file.
**Code Snippet:**
```
let currentLine = 0;
```
- **Line:** 86
- **Indent:** 4
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### endLine - [VARIABLE]
------------------------------------------------------------
**Description:** The ending line number of the current code chunk.
**Code Snippet:**
```
const endLine = getCurrentLineEndLineBasedOnChunk(chunk).end;
```
- **Line:** 5
- **Indent:** 8
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### chunkCodeObjects - [VARIABLE]
------------------------------------------------------------
**Description:** The code objects generated from the current code chunk.
**Code Snippet:**
```
const chunkCodeObjects = await genCodeChunkObj(projectSummary, fullFilePath, chunk);
```
- **Line:** 7
- **Indent:** 8
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### fileContent - [VARIABLE]
------------------------------------------------------------
**Description:** The content of the file read as a string.
**Code Snippet:**
```
const fileContent = await readFile(fullFilePath, "utf-8");
```
- **Line:** 25
- **Indent:** 6
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### codeObjects - [VARIABLE]
------------------------------------------------------------
**Description:** The code objects generated from the entire file content.
**Code Snippet:**
```
const codeObjects = await genCodeChunkObj(projectSummary, fullFilePath, fileContent);
```
- **Line:** 26
- **Indent:** 6
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### codeDescription - [VARIABLE]
------------------------------------------------------------
**Description:** A string that accumulates the code summaries of all code files.
**Code Snippet:**
```
let codeDescription = '';
```
- **Line:** 48
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### basePath - [VARIABLE]
------------------------------------------------------------
**Description:** The base path of the project directory.
**Code Snippet:**
```
const basePath = projectPath.split("/").slice(0, -1).join("/");
```
- **Line:** 75
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### executionPath - [VARIABLE]
------------------------------------------------------------
**Description:** The current working directory of the process.
**Code Snippet:**
```
const executionPath = process.cwd();
```
- **Line:** 76
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### pathsToCheck - [VARIABLE]
------------------------------------------------------------
**Description:** An array of file paths to check for ignore patterns.
**Code Snippet:**
```
const pathsToCheck = [ `${basePath}/.gitignore`, `${basePath}/.fofoignore`, `${executionPath}/.gitignore`, `${executionPath}/.fofoignore`, ];
```
- **Line:** 80
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### fofoignoreContent - [VARIABLE]
------------------------------------------------------------
**Description:** The content of the .fofoignore file read as a string.
**Code Snippet:**
```
const fofoignoreContent = await readFile( path, "utf-8" );
```
- **Line:** 87
- **Indent:** 8
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### gitignoreContent - [VARIABLE]
------------------------------------------------------------
**Description:** The content of the .gitignore file read as a string.
**Code Snippet:**
```
const gitignoreContent = await readFile( path, "utf-8" );
```
- **Line:** 95
- **Indent:** 8
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### tooLong - [VARIABLE]
------------------------------------------------------------
**Description:** Indicates if the number of tokens in the file exceeds the maximum allowed characters
**Code Snippet:**
```
const tooLong = getTokens(file) > maxChars;
```
- **Line:** 3
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


## imports
📥 **IMPORTS**


### readFile - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'readFile' function from 'fs/promises' for reading files asynchronously.
**Code Snippet:**
```
import { readFile, stat } from "fs/promises";
```
- **Line:** 2
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### CodeFileSummary - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'CodeFileSummary' type from './objectSchemas'.
**Code Snippet:**
```
import { CodeFileSummary, CodeObject, CodeObjects, ProjectSummary, RagData, codeSummary } from "./objectSchemas";
```
- **Line:** 3
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### infer - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'infer' function from './llmInterface'.
**Code Snippet:**
```
import { infer, callLLM, getCodeSummaryFromLLM } from "./llmInterface";
```
- **Line:** 4
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### getLanguageTypeFromFile - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'getLanguageTypeFromFile' function from './prompt'.
**Code Snippet:**
```
import { getLanguageTypeFromFile, classesPrompt, functionsPrompt, variablesPrompt, typesPrompt, interfacesPrompt, importsPrompt, exportsPrompt } from "./prompt";
```
- **Line:** 5
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### saveToVectorDatabase - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'saveToVectorDatabase' function from './vectorDB'.
**Code Snippet:**
```
import { saveToVectorDatabase } from "./vectorDB";
```
- **Line:** 6
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### breakCodeIntoChunks - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'breakCodeIntoChunks' function from './shared'.
**Code Snippet:**
```
import { breakCodeIntoChunks, getFileContentLen, getTokens } from "./shared";
```
- **Line:** 7
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### dotenv/config - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'dotenv/config' module to load environment variables from a .env file.
**Code Snippet:**
```
import "dotenv/config";
```
- **Line:** 9
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## exports
📤 **EXPORTS**


### mergeObjectArrays - [EXPORT]
------------------------------------------------------------
**Description:** Function to merge incoming code objects with existing code objects, handling both new and existing keys.
**Code Snippet:**
```
export function mergeObjectArrays(codeObjArray: CodeObject, newCodeObj: any): CodeObject { ... }
```
- **Line:** 67
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### parseCodebase - [EXPORT]
------------------------------------------------------------
**Description:** Asynchronously parses the codebase at the given project path and returns a summary of the project.
**Code Snippet:**
```
export async function parseCodebase(projectPath: string, projectName: string): Promise<ProjectSummary> { ... }
```
- **Line:** 36
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


