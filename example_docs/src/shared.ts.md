# src/shared.ts

**Summary:** The goal of the code is to provide utility functions for reading file content, breaking code into chunks, and counting tokens in a string.

- **File Location:** .//src/shared.ts
- **Language:** TypeScript
## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [imports](#imports)
## functions
🔧 **FUNCTIONS**

### getFileContentLen - [FUNCTION]
- **Description:** Asynchronous function to get the length of file content.
- **Line:** 5
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


**Code Snippet:**
```
export async function getFileContentLen(filePath: string): Promise<number> { return await readFile(filePath, 'utf-8').then(content => content.length); }
```
###### Function Parameters:
- **filePath** (string): Path to the file 
 Example: /path/to/file.txt
###### Function Returns:
- **Type:** Promise<number>
- **Description:** Returns a promise that resolves to the length of the file content.
- **Example:** 1024
### breakCodeIntoChunks - [FUNCTION]
- **Description:** Function to break code into chunks based on chunk size.
- **Line:** 9
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export function breakCodeIntoChunks(code: string, chunkSize: number): string[] { const codeByLine = code.split('\n'); const chunks = []; let currentChunk = ''; let currentChunkTokenCount = 0; for (const line of codeByLine) { const lineTokenCount = line.split(/\s+/).length; if (currentChunkTokenCount + lineTokenCount <= chunkSize) { currentChunk += line + '\n'; currentChunkTokenCount += lineTokenCount; } else { chunks.push(currentChunk); currentChunk = line + '\n'; currentChunkTokenCount = lineTokenCount; } } if (currentChunk) { chunks.push(currentChunk); } return chunks; }
```
###### Function Parameters:
- **code** (string): The code to be broken into chunks. 
 Example: const a = 1; const b = 2;
- **chunkSize** (number): The maximum token count for each chunk. 
 Example: 100
###### Function Returns:
- **Type:** string[]
- **Description:** Returns an array of code chunks.
- **Example:** const a = 1;,const b = 2;
### getTokens - [FUNCTION]
- **Description:** Function to get the number of tokens in the code.
- **Line:** 31
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export function getTokens(code: string): number { return code.split(' ').length }
```
###### Function Parameters:
- **code** (string): The code whose tokens are to be counted. 
 Example: const a = 1; const b = 2;
###### Function Returns:
- **Type:** number
- **Description:** Returns the number of tokens in the code.
- **Example:** 6
### getFileContentLen - [FUNCTION]
- **Description:** Asynchronously returns the length of content of a file given its file path.
- **Line:** 5
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export async function getFileContentLen(filePath: string): Promise<number> { return await readFile(filePath, 'utf-8').then(content => content.length); }
```
### breakCodeIntoChunks - [FUNCTION]
- **Description:** Divides code into chunks of a specific size by line count.
- **Line:** 10
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export function breakCodeIntoChunks(code: string, chunkSize: number): string[] { const codeByLine = code.split('\n'); const chunks = []; let currentChunk = ''; let currentChunkTokenCount = 0; for (const line of codeByLine) { const lineTokenCount = line.split(/\s+/).length; if (currentChunkTokenCount + lineTokenCount <= chunkSize) { currentChunk += line + '\n'; currentChunkTokenCount += lineTokenCount; } else { chunks.push(currentChunk); currentChunk = line + '\n'; currentChunkTokenCount = lineTokenCount; } } if (currentChunk) { chunks.push(currentChunk); } return chunks; }
```
### getTokens - [FUNCTION]
- **Description:** Returns the count of tokens in a string of code.
- **Line:** 28
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export function getTokens(code: string): number { return code.split(' ').length; }
```
## variables
🧮 **VARIABLES**

### codeByLine - [VARIABLE]
- **Description:** Array of strings split by newline from the input code.
- **Line:** 11
- **Indent:** 1
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const codeByLine = code.split('\n');
```
### chunks - [VARIABLE]
- **Description:** Array to store the code chunks.
- **Line:** 12
- **Indent:** 1
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const chunks = [];
```
### currentChunk - [VARIABLE]
- **Description:** Current chunk of code being processed.
- **Line:** 13
- **Indent:** 1
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
let currentChunk = '';
```
### currentChunkTokenCount - [VARIABLE]
- **Description:** Token count for the current chunk.
- **Line:** 14
- **Indent:** 1
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
let currentChunkTokenCount = 0;
```
### lineTokenCount - [VARIABLE]
- **Description:** Token count for the current line.
- **Line:** 18
- **Indent:** 2
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const lineTokenCount = line.split(/\s+/).length;
```
## imports
📥 **IMPORTS**

### readFile - [IMPORT]
- **Description:** Imports the readFile function from the 'fs/promises' module to enable asynchronous file reading.
- **Line:** 1
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { readFile } from 'fs/promises';
```
