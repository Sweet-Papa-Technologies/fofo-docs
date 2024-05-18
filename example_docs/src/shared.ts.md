# src/shared.ts - fofo-docs

**Summary:** The code provides utility functions for reading file content, breaking code into chunks, and counting tokens in a string.

- **File Location:** .//src/shared.ts
- **Language:** TypeScript
## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [imports](#imports)
- [exports](#exports)
## functions
🔧 **FUNCTIONS**


### getFileContentLen - [FUNCTION]
------------------------------------------------------------
**Description:** Asynchronously reads a file and returns the length of its content.
**Code Snippet:**
```
export async function getFileContentLen(filePath: string): Promise<number> { return await readFile(filePath, 'utf-8').then(content => content.length); }
```
- **Line:** 4
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **filePath** (string): The path to the file to be read. 
 Example: example/path/to/file.txt
###### Function Returns:
- **Type:** number
- **Description:** The length of the file content.
- **Example:** 123

### breakCodeIntoChunks - [FUNCTION]
------------------------------------------------------------
**Description:** Breaks a given code string into chunks of specified token size.
**Code Snippet:**
```
export function breakCodeIntoChunks(code: string, chunkSize: number): string[] { const codeByLine = code.split('\n'); const chunks = []; let currentChunk = ''; let currentChunkTokenCount = 0; for (const line of codeByLine) { const lineTokenCount = line.split(/\s+/).length; if (currentChunkTokenCount + lineTokenCount <= chunkSize) { currentChunk += line + '\n'; currentChunkTokenCount += lineTokenCount; } else { chunks.push(currentChunk); currentChunk = line + '\n'; currentChunkTokenCount = lineTokenCount; } } if (currentChunk) { chunks.push(currentChunk); } return chunks; }
```
- **Line:** 8
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **code** (string): The code string to be broken into chunks. 
 Example: const a = 1;\nconst b = 2;
- **chunkSize** (number): The maximum token size for each chunk. 
 Example: 10
###### Function Returns:
- **Type:** string[]
- **Description:** An array of code chunks.
- **Example:** const a = 1;\n,const b = 2;\n

### getTokens - [FUNCTION]
------------------------------------------------------------
**Description:** Counts the number of tokens in a given code string.
**Code Snippet:**
```
export function getTokens(code: string): number { return code.split(' ').length }
```
- **Line:** 28
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **code** (string): The code string to be tokenized. 
 Example: const a = 1;
###### Function Returns:
- **Type:** number
- **Description:** The number of tokens in the code string.
- **Example:** 4
## variables
🧮 **VARIABLES**


### codeByLine - [VARIABLE]
------------------------------------------------------------
**Description:** Array of strings, each representing a line of the input code.
**Code Snippet:**
```
const codeByLine = code.split('\n');
```
- **Line:** 9
- **Indent:** 1
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### chunks - [VARIABLE]
------------------------------------------------------------
**Description:** Array to hold the chunks of code.
**Code Snippet:**
```
const chunks = [];
```
- **Line:** 10
- **Indent:** 1
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### currentChunk - [VARIABLE]
------------------------------------------------------------
**Description:** String to accumulate the current chunk of code.
**Code Snippet:**
```
let currentChunk = '';
```
- **Line:** 11
- **Indent:** 1
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### currentChunkTokenCount - [VARIABLE]
------------------------------------------------------------
**Description:** Counter for the number of tokens in the current chunk.
**Code Snippet:**
```
let currentChunkTokenCount = 0;
```
- **Line:** 12
- **Indent:** 1
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### line - [VARIABLE]
------------------------------------------------------------
**Description:** Current line of code being processed.
**Code Snippet:**
```
for (const line of codeByLine) {
```
- **Line:** 14
- **Indent:** 1
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### lineTokenCount - [VARIABLE]
------------------------------------------------------------
**Description:** Approximate token count of the current line by splitting on whitespace.
**Code Snippet:**
```
const lineTokenCount = line.split(/\s+/).length;
```
- **Line:** 15
- **Indent:** 2
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


## imports
📥 **IMPORTS**


### readFile - [IMPORT]
------------------------------------------------------------
**Description:** Imports the readFile function from the 'fs/promises' module, which provides a way to read files asynchronously.
**Code Snippet:**
```
import { readFile } from 'fs/promises';
```
- **Line:** 1
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## exports
📤 **EXPORTS**


### getFileContentLen - [EXPORT]
------------------------------------------------------------
**Description:** Asynchronously reads a file and returns the length of its content.
**Code Snippet:**
```
export async function getFileContentLen(filePath: string): Promise<number> { ... }
```
- **Line:** 4
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### breakCodeIntoChunks - [EXPORT]
------------------------------------------------------------
**Description:** Splits the given code into chunks of specified token size.
**Code Snippet:**
```
export function breakCodeIntoChunks(code: string, chunkSize: number): string[] { ... }
```
- **Line:** 8
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### getTokens - [EXPORT]
------------------------------------------------------------
**Description:** Returns the number of tokens in the given code.
**Code Snippet:**
```
export function getTokens(code: string): number { ... }
```
- **Line:** 31
- **Indent:** 0
- **Location:** shared.ts (.//src/shared.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


