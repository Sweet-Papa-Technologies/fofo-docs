# src/codeParser.ts - fofo-docs

**Summary:** The code aims to parse a codebase, generate summaries for code files, and store relevant data in a vector database.

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
**Description:** Generates a CodeObject for a given code chunk in a project.
**Code Snippet:**
```
async function genCodeChunkObj(projectSummary:ProjectSummary, filePath:string, chunk:string):Promise<CodeObject>{ ... }
```
- **Line:** 33
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectSummary** (ProjectSummary): Summary of the project. 
 Example: { projectName: 'example', projectDescription: {}, projectLocation: 'path', codeFiles: [], ragData: [], teamContext: '' }
- **filePath** (string): Path to the file being processed. 
 Example: src/example.ts
- **chunk** (string): Code chunk to be processed. 
 Example: const example = 'code chunk';
###### Function Returns:
- **Type:** CodeObject
- **Description:** Generated CodeObject for the given code chunk.
- **Example:** { classes: [], functions: [], variables: [], types: [], interfaces: [], imports: [], exports: [] }

### mergeObjectArrays - [FUNCTION]
------------------------------------------------------------
**Description:** Merges incoming code objects with existing code objects, removing duplicates.
**Code Snippet:**
```
export function mergeObjectArrays(codeObjArray: CodeObject, newCodeObj: any): CodeObject { ... }
```
- **Line:** 75
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **codeObjArray** (CodeObject): Existing code objects. 
 Example: { classes: [], functions: [], variables: [], types: [], interfaces: [], imports: [], exports: [] }
- **newCodeObj** (any): New code objects to be merged. 
 Example: { functions: [{ name: 'newFunction', type: 'function', description: 'A new function', codeSnippet: 'function newFunction() { ... }', codeLine: 10, codeIndent: 2, fileName: 'example.ts', fileLocation: 'src/example.ts', isExported: false, isPrivate: false, isAsync: false, functionParameters: [], functionReturns: {} }] }
###### Function Returns:
- **Type:** CodeObject
- **Description:** Merged code objects without duplicates.
- **Example:** { classes: [], functions: [], variables: [], types: [], interfaces: [], imports: [], exports: [] }

### parseCodebase - [FUNCTION]
------------------------------------------------------------
**Description:** Parses the codebase and generates a project summary.
**Code Snippet:**
```
export async function parseCodebase(projectPath: string, projectName: string): Promise<ProjectSummary> { ... }
```
- **Line:** 145
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectPath** (string): Path to the project directory or file. 
 Example: src/project
- **projectName** (string): Name of the project. 
 Example: exampleProject
###### Function Returns:
- **Type:** ProjectSummary
- **Description:** Summary of the parsed project.
- **Example:** { projectName: 'exampleProject', projectDescription: {}, projectLocation: 'src/project', codeFiles: [], ragData: [], teamContext: '' }

### getIgnoredFiles - [FUNCTION]
------------------------------------------------------------
**Description:** Retrieves the list of files to be ignored based on .gitignore and .fofoignore files.
**Code Snippet:**
```
async function getIgnoredFiles(projectPath: string): Promise<string[]> { ... }
```
- **Line:** 335
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** true


###### Function Parameters:
- **projectPath** (string): Path to the project directory. 
 Example: src/project
###### Function Returns:
- **Type:** string[]
- **Description:** List of file patterns to be ignored.
- **Example:** [ 'node_modules/**', 'dist/**' ]

### getFileSizeInKB - [FUNCTION]
------------------------------------------------------------
**Description:** Gets the size of a file in kilobytes.
**Code Snippet:**
```
async function getFileSizeInKB(filePath: string): Promise<number> { ... }
```
- **Line:** 379
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** true


###### Function Parameters:
- **filePath** (string): Path to the file. 
 Example: src/example.ts
###### Function Returns:
- **Type:** number
- **Description:** Size of the file in kilobytes.
- **Example:** 1024

### isFileTooLarge - [FUNCTION]
------------------------------------------------------------
**Description:** Checks if a file is too large based on its size and character count.
**Code Snippet:**
```
async function isFileTooLarge(filePath: string, maxFileSizeKB: number, maxChars: number = 300): Promise<boolean> { ... }
```
- **Line:** 384
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** true


###### Function Parameters:
- **filePath** (string): Path to the file. 
 Example: src/example.ts
- **maxFileSizeKB** (number): Maximum allowed file size in kilobytes. 
 Example: 3000
- **maxChars** (number): Maximum allowed number of characters in the file. 
 Example: 300
###### Function Returns:
- **Type:** boolean
- **Description:** Indicates if the file is too large.
- **Example:** true

### getContextFromFile - [FUNCTION]
------------------------------------------------------------
**Description:** Retrieves the team context from a specified file.
**Code Snippet:**
```
function getContextFromFile() { ... }
```
- **Line:** 398
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** false


###### Function Returns:
- **Type:** string
- **Description:** Team context retrieved from the file.
- **Example:** Team context content
## variables
🧮 **VARIABLES**


### llmToUse - [VARIABLE]
------------------------------------------------------------
**Description:** Specifies the LLM to use, fetched from environment variables.
**Code Snippet:**
```
const llmToUse = process.env.LLM_TO_USE || undefined;
```
- **Line:** 29
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available



### breakNum - [VARIABLE]
------------------------------------------------------------
**Description:** Specifies the maximum token split, fetched from environment variables or defaults to 400.
**Code Snippet:**
```
const breakNum = Number(process.env.MAX_TOKEN_SPLIT) || 400;
```
- **Line:** 30
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available



### objectKeys - [VARIABLE]
------------------------------------------------------------
**Description:** An array of code object types to process.
**Code Snippet:**
```
const objectKeys:CodeObjects[] = ['classes', 'functions', 'variables', 'types', 'interfaces', 'imports', 'exports']
```
- **Line:** 35
- **Indent:** 4
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available



### chunkCodeObjectsAny - [VARIABLE]
------------------------------------------------------------
**Description:** An object to store code objects for each chunk.
**Code Snippet:**
```
const chunkCodeObjectsAny = {} as any;
```
- **Line:** 36
- **Indent:** 4
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available



### mergedCodeObj - [VARIABLE]
------------------------------------------------------------
**Description:** An object to store merged code objects.
**Code Snippet:**
```
const mergedCodeObj: any = codeObjArray;
```
- **Line:** 80
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available



### projectSummary - [VARIABLE]
------------------------------------------------------------
**Description:** An object to store the summary of the project being parsed.
**Code Snippet:**
```
const projectSummary: ProjectSummary = { projectName: projectName, projectDescription: {} as codeSummary, projectLocation: projectPath, codeFiles: [], ragData: [], teamContext: "", // Placeholder, TODO==> Add support for team context };
```
- **Line:** 127
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available



### filePaths - [VARIABLE]
------------------------------------------------------------
**Description:** An array to store file paths to be parsed.
**Code Snippet:**
```
let filePaths: string[] = [];
```
- **Line:** 141
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available



### codeDescription - [VARIABLE]
------------------------------------------------------------
**Description:** A string to store the description of the code files.
**Code Snippet:**
```
let codeDescription = '';
```
- **Line:** 276
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available



### contextFile - [VARIABLE]
------------------------------------------------------------
**Description:** Specifies the path to the context file, fetched from environment variables or defaults to './prompts/teamContext.md'.
**Code Snippet:**
```
const contextFile = process.env.CONTEXT_FILE === '' ? "./prompts/teamContext.md" : (process.env.CONTEXT_FILE || "./prompts/teamContext.md");
```
- **Line:** 359
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


## imports
📥 **IMPORTS**


### glob - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'glob' function from the 'glob' module, which is used for file pattern matching.
**Code Snippet:**
```
import { glob } from "glob";
```
- **Line:** 1
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### readFile - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'readFile' function from the 'fs/promises' module, which is used to read files asynchronously.
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
**Description:** Imports the 'CodeFileSummary' type from the './objectSchemas' module.
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
**Description:** Imports the 'infer' function from the './llmInterface' module.
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
**Description:** Imports the 'getLanguageTypeFromFile' function from the './prompt' module.
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
**Description:** Imports the 'saveToVectorDatabase' function from the './vectorDB' module.
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
**Description:** Imports the 'breakCodeIntoChunks' function from the './shared' module.
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



### fs - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'fs' module, which provides an API for interacting with the file system.
**Code Snippet:**
```
import fs from "fs";
```
- **Line:** 8
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### dotenv/config - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'dotenv/config' module, which loads environment variables from a .env file into process.env.
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
**Description:** Function to merge incoming code objects with existing code objects, handling duplicates and ensuring proper merging.
**Code Snippet:**
```
export function mergeObjectArrays(codeObjArray: CodeObject, newCodeObj: any): CodeObject { ... }
```
- **Line:** 75
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### parseCodebase - [EXPORT]
------------------------------------------------------------
**Description:** Function to parse the entire codebase, generating a project summary with code objects and descriptions.
**Code Snippet:**
```
export async function parseCodebase(projectPath: string, projectName: string): Promise<ProjectSummary> { ... }
```
- **Line:** 139
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


