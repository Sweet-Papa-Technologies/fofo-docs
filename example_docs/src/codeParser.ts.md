# src/codeParser.ts

**Summary:** The goal of the code block is to process code files, generate summaries using language models, and save relevant data to a vector database while handling ignored files and checking file sizes.

- **File Location:** .//src/codeParser.ts
- **Language:** TypeScript
## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [imports](#imports)
- [exports](#exports)
- [interfaces](#interfaces)
## functions
🔧 **FUNCTIONS**

### mergeObjectArrays - [FUNCTION]
- **Description:** Merges arrays within an incoming code object into the existing code object and removes duplicates.
- **Line:** 72
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export function mergeObjectArrays(codeObjArray: CodeObject, newCodeObj: any): CodeObject { ... }
```
###### Function Parameters:
- **codeObjArray** (CodeObject): Existing code object array to be merged. 
 Example: { functions: [], classes: [], ... }
- **newCodeObj** (any): New code object array to merge into the existing array. 
 Example: { functions: [], classes: [], ... }
###### Function Returns:
- **Type:** CodeObject
- **Description:** Merged code object after removing duplicates.
- **Example:** { functions: [], classes: [], ... }
### parseCodebase - [FUNCTION]
- **Description:** Parses the codebase to generate a summary of the project.
- **Line:** 32
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


**Code Snippet:**
```
export async function parseCodebase(projectPath: string, projectName: string): Promise<ProjectSummary> { ... }
```
###### Function Parameters:
- **projectPath** (string): The path to the project to be parsed. 
 Example: /path/to/project
- **projectName** (string): The name of the project. 
 Example: MyProject
###### Function Returns:
- **Type:** ProjectSummary
- **Description:** A summary of the project with metadata and analysis.
- **Example:** [object Object]
### getIgnoredFiles - [FUNCTION]
- **Description:** Retrieves a list of ignored files based on various .gitignore and .fofoignore files in specified paths.
- **Line:** 73
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


**Code Snippet:**
```
async function getIgnoredFiles(projectPath: string): Promise<string[]> { ... }
```
###### Function Parameters:
- **projectPath** (string): The base path of the project. 
 Example: /user/project/
###### Function Returns:
- **Type:** Promise<string[]>
- **Description:** A promise that resolves to an array of ignore patterns extracted from .gitignore and .fofoignore files.
- **Example:** ["node_modules/", ".env"]
### getFileSizeInKB - [FUNCTION]
- **Description:** Calculates the file size in kilobytes for a given file path.
- **Line:** 118
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


**Code Snippet:**
```
async function getFileSizeInKB(filePath: string): Promise<number> { ... }
```
###### Function Parameters:
- **filePath** (string): The path to the file. 
 Example: /user/project/file.txt
###### Function Returns:
- **Type:** Promise<number>
- **Description:** A promise that resolves to the file size in kilobytes.
- **Example:** 4.5
### isFileTooLarge - [FUNCTION]
- **Description:** Determines if a file exceeds the specified file size or character limit.
- **Line:** 123
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


**Code Snippet:**
```
async function isFileTooLarge(filePath: string, maxFileSizeKB: number, maxChars: number = 300): Promise<boolean> { ... }
```
###### Function Parameters:
- **filePath** (string): The path to the file. 
 Example: /user/project/file.txt
- **maxFileSizeKB** (number): The maximum allowed file size in kilobytes. 
 Example: 512
- **maxChars** (number): The maximum allowed number of characters in the file content (default is 300). 
 Example: 300
###### Function Returns:
- **Type:** Promise<boolean>
- **Description:** A promise that resolves to true if the file exceeds the specified size or character limit, otherwise false.
- **Example:** true
### getIgnoredFiles - [FUNCTION]
- **Description:** Asynchronously retrieves a list of ignored file patterns from .gitignore and .fofoignore files.
- **Line:** 83
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export async function getIgnoredFiles(projectPath: string): Promise<string[]> { ... }
```
### getFileSizeInKB - [FUNCTION]
- **Description:** Asynchronously gets the size of a specified file in kilobytes.
- **Line:** 116
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export async function getFileSizeInKB(filePath: string): Promise<number> { ... }
```
### isFileTooLarge - [FUNCTION]
- **Description:** Asynchronously checks if a file exceeds a given size and character limit.
- **Line:** 121
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export async function isFileTooLarge(filePath: string, maxFileSizeKB: number, maxChars: number = 300): Promise<boolean> { ... }
```
## variables
🧮 **VARIABLES**

### breakNum - [VARIABLE]
- **Description:** Number of tokens to break the chunks into, fetched from environment variable or defaults to 400.
- **Line:** 30
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const breakNum = Number(process.env.MAX_TOKEN_SPLIT) || 400;
```
### objectKeys - [VARIABLE]
- **Description:** Keys of code objects that are processed in the code chunk.
- **Line:** 36
- **Indent:** 1
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const objectKeys: CodeObjects[] = ['classes', 'functions', 'variables', 'types', 'interfaces', 'comments', 'imports', 'exports'];
```
### chunkCodeObjectsAny - [VARIABLE]
- **Description:** Temporary storage for code objects identified in a code chunk.
- **Line:** 37
- **Indent:** 1
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const chunkCodeObjectsAny = {} as any;
```
### promptTemplate - [VARIABLE]
- **Description:** Template for generating LLM prompts, which will be filled based on the type of code object being processed.
- **Line:** 39
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
let promptTemplate = '';
```
### ignorePatterns - [VARIABLE]
- **Description:** Patterns to ignore files/directories while parsing.
- **Line:** 33
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const ignorePatterns = [
```
### filePaths - [VARIABLE]
- **Description:** Array of file paths to be processed.
- **Line:** 38
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
let filePaths: string[] = [];
```
### file - [VARIABLE]
- **Description:** File name extracted from the project path.
- **Line:** 49
- **Indent:** 4
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const file = projectPath.split("/").pop();
```
### fullFilePath - [VARIABLE]
- **Description:** Full path of the file being processed.
- **Line:** 66
- **Indent:** 4
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const fullFilePath = `${projectPath}/${filePath}`;
```
### fileLanguage - [VARIABLE]
- **Description:** Language type inferred from the file.
- **Line:** 69
- **Indent:** 4
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const fileLanguage = await infer(
```
### codeChunks - [VARIABLE]
- **Description:** Array of code chunks split from the file content.
- **Line:** 89
- **Indent:** 6
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const codeChunks = breakCodeIntoChunks(fileContent, breakNum); // 1000 tokens per chunk
```
### getCurrentLineEndLineBasedOnChunk - [VARIABLE]
- **Description:** Function to get the start and end lines of the current chunk.
- **Line:** 90
- **Indent:** 6
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const getCurrentLineEndLineBasedOnChunk = (chunk: string) => {
```
### endLine - [VARIABLE]
- **Description:** End line number of the current chunk.
- **Line:** 103
- **Indent:** 8
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const endLine = getCurrentLineEndLineBasedOnChunk(chunk).end;
```
### chunk - [VARIABLE]
- **Description:** Individual chunk of code being processed
- **Line:** 10
- **Indent:** 10
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
documentData: chunk,
```
### codeObjects - [VARIABLE]
- **Description:** Chunk of code objects generated for a file
- **Line:** 28
- **Indent:** 6
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const codeObjects = await genCodeChunkObj(projectSummary, fullFilePath, fileContent);
```
## imports
📥 **IMPORTS**

### CodeFileSummary - [IMPORT]
- **Description:** Imports the 'CodeFileSummary' type from the './objectSchemas' module
- **Line:** 3
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { CodeFileSummary, CodeObject, CodeObjects, ProjectSummary, RagData, codeSummary } from "./objectSchemas";
```
### CodeObject - [IMPORT]
- **Description:** Imports the 'CodeObject' type from the './objectSchemas' module
- **Line:** 3
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { CodeFileSummary, CodeObject, CodeObjects, ProjectSummary, RagData, codeSummary } from "./objectSchemas";
```
### CodeObjects - [IMPORT]
- **Description:** Imports the 'CodeObjects' type from the './objectSchemas' module
- **Line:** 3
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { CodeFileSummary, CodeObject, CodeObjects, ProjectSummary, RagData, codeSummary } from "./objectSchemas";
```
### ProjectSummary - [IMPORT]
- **Description:** Imports the 'ProjectSummary' type from the './objectSchemas' module
- **Line:** 3
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { CodeFileSummary, CodeObject, CodeObjects, ProjectSummary, RagData, codeSummary } from "./objectSchemas";
```
### RagData - [IMPORT]
- **Description:** Imports the 'RagData' type from the './objectSchemas' module
- **Line:** 3
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { CodeFileSummary, CodeObject, CodeObjects, ProjectSummary, RagData, codeSummary } from "./objectSchemas";
```
### codeSummary - [IMPORT]
- **Description:** Imports the 'codeSummary' function from the './objectSchemas' module
- **Line:** 3
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { CodeFileSummary, CodeObject, CodeObjects, ProjectSummary, RagData, codeSummary } from "./objectSchemas";
```
### infer - [IMPORT]
- **Description:** Imports the 'infer' function from the './llmInterface' module
- **Line:** 4
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { infer, callLLM, getCodeSummaryFromLLM } from "./llmInterface";
```
### callLLM - [IMPORT]
- **Description:** Imports the 'callLLM' function from the './llmInterface' module
- **Line:** 4
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { infer, callLLM, getCodeSummaryFromLLM } from "./llmInterface";
```
### getCodeSummaryFromLLM - [IMPORT]
- **Description:** Imports the 'getCodeSummaryFromLLM' function from the './llmInterface' module
- **Line:** 4
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { infer, callLLM, getCodeSummaryFromLLM } from "./llmInterface";
```
### getLanguageTypeFromFile - [IMPORT]
- **Description:** Imports the 'getLanguageTypeFromFile' function from the './prompt' module
- **Line:** 5
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { getLanguageTypeFromFile, classesPrompt, functionsPrompt, variablesPrompt, typesPrompt, interfacesPrompt, commentsPrompt, importsPrompt, exportsPrompt } from "./prompt";
```
### classesPrompt - [IMPORT]
- **Description:** Imports the 'classesPrompt' function from the './prompt' module
- **Line:** 5
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { getLanguageTypeFromFile, classesPrompt, functionsPrompt, variablesPrompt, typesPrompt, interfacesPrompt, commentsPrompt, importsPrompt, exportsPrompt } from "./prompt";
```
### functionsPrompt - [IMPORT]
- **Description:** Imports the 'functionsPrompt' function from the './prompt' module
- **Line:** 5
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { getLanguageTypeFromFile, classesPrompt, functionsPrompt, variablesPrompt, typesPrompt, interfacesPrompt, commentsPrompt, importsPrompt, exportsPrompt } from "./prompt";
```
### variablesPrompt - [IMPORT]
- **Description:** Imports the 'variablesPrompt' function from the './prompt' module
- **Line:** 5
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { getLanguageTypeFromFile, classesPrompt, functionsPrompt, variablesPrompt, typesPrompt, interfacesPrompt, commentsPrompt, importsPrompt, exportsPrompt } from "./prompt";
```
### typesPrompt - [IMPORT]
- **Description:** Imports the 'typesPrompt' function from the './prompt' module
- **Line:** 5
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { getLanguageTypeFromFile, classesPrompt, functionsPrompt, variablesPrompt, typesPrompt, interfacesPrompt, commentsPrompt, importsPrompt, exportsPrompt } from "./prompt";
```
### interfacesPrompt - [IMPORT]
- **Description:** Imports the 'interfacesPrompt' function from the './prompt' module
- **Line:** 5
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { getLanguageTypeFromFile, classesPrompt, functionsPrompt, variablesPrompt, typesPrompt, interfacesPrompt, commentsPrompt, importsPrompt, exportsPrompt } from "./prompt";
```
### commentsPrompt - [IMPORT]
- **Description:** Imports the 'commentsPrompt' function from the './prompt' module
- **Line:** 5
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { getLanguageTypeFromFile, classesPrompt, functionsPrompt, variablesPrompt, typesPrompt, interfacesPrompt, commentsPrompt, importsPrompt, exportsPrompt } from "./prompt";
```
### importsPrompt - [IMPORT]
- **Description:** Imports the 'importsPrompt' function from the './prompt' module
- **Line:** 5
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { getLanguageTypeFromFile, classesPrompt, functionsPrompt, variablesPrompt, typesPrompt, interfacesPrompt, commentsPrompt, importsPrompt, exportsPrompt } from "./prompt";
```
### exportsPrompt - [IMPORT]
- **Description:** Imports the 'exportsPrompt' function from the './prompt' module
- **Line:** 5
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { getLanguageTypeFromFile, classesPrompt, functionsPrompt, variablesPrompt, typesPrompt, interfacesPrompt, commentsPrompt, importsPrompt, exportsPrompt } from "./prompt";
```
### saveToVectorDatabase - [IMPORT]
- **Description:** Imports the 'saveToVectorDatabase' function from the './vectorDB' module
- **Line:** 6
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { saveToVectorDatabase } from "./vectorDB";
```
### breakCodeIntoChunks - [IMPORT]
- **Description:** Imports the 'breakCodeIntoChunks' function from the './shared' module
- **Line:** 7
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { breakCodeIntoChunks, getFileContentLen, getTokens } from "./shared";
```
### getFileContentLen - [IMPORT]
- **Description:** Imports the 'getFileContentLen' function from the './shared' module
- **Line:** 7
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { breakCodeIntoChunks, getFileContentLen, getTokens } from "./shared";
```
### getTokens - [IMPORT]
- **Description:** Imports the 'getTokens' function from the './shared' module
- **Line:** 7
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { breakCodeIntoChunks, getFileContentLen, getTokens } from "./shared";
```
### dotenv/config - [IMPORT]
- **Description:** Imports the 'dotenv/config' module to load environment variables
- **Line:** 9
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import "dotenv/config";
```
## exports
📤 **EXPORTS**

### mergeObjectArrays - [EXPORT]
- **Description:** This function merges incoming CodeObject arrays with existing ones by combining arrays with the same keys and ensuring no duplicates.
- **Line:** 61
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export function mergeObjectArrays(
  codeObjArray: CodeObject,
  newCodeObj: any
): CodeObject {
```
### parseCodebase - [EXPORT]
- **Description:** Asynchronous function to parse the codebase and return a project summary.
- **Line:** 25
- **Indent:** 0
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export async function parseCodebase(
  projectPath: string,
  projectName: string
): Promise<ProjectSummary> {
```
## interfaces
🌉 **INTERFACES**

### ProjectSummary - [INTERFACE]
- **Description:** Represents the summary of a project, including its name, description, location, code files, RAG data, and team context.
- **Line:** 25
- **Indent:** 2
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
interface ProjectSummary { projectName: string; projectDescription: codeSummary; projectLocation: string; codeFiles: string[]; ragData: RagData[]; teamContext: string; }
```
### CodeFileSummary - [INTERFACE]
- **Description:** Represents the summary of a code file, including its name, location, summary, language, execution flow, and code objects.
- **Line:** 59
- **Indent:** 4
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
interface CodeFileSummary { fileName: string; fileLocation: string; codeSummary: codeSummary; language: string; executionFlow: string[]; codeObjects: CodeObject; }
```
### RagData - [INTERFACE]
- **Description:** Represents RAG (Risk Assessment Grid) data, containing metadata for the code chunk.
- **Line:** 100
- **Indent:** 6
- **Location:** codeParser.ts (.//src/codeParser.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
interface RagData { metadata: { filename: string; codeChunkId: number; codeChunkLineStart: number; codeChunkLineEnd: number; } }
```
