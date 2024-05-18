# src/documentationGenerator.ts - fofo-docs

**Summary:** The code aims to generate Markdown documentation from a given project summary, including details about code files, their summaries, and various code objects within them.

- **File Location:** .//src/documentationGenerator.ts
- **Language:** TypeScript
## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [types](#types)
- [imports](#imports)
- [exports](#exports)
- [interfaces](#interfaces)
## functions
🔧 **FUNCTIONS**


### jsonToMarkdown - [FUNCTION]
------------------------------------------------------------
**Description:** Converts a project summary to markdown format and writes it to the specified output folder.
**Code Snippet:**
```
function jsonToMarkdown(projectSummary: ProjectSummary, outputFolder: string) { ... }
```
- **Line:** 8
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **projectSummary** (ProjectSummary): The summary of the project to be converted to markdown. 
 Example: { projectName: 'Example', projectDescription: { goal: 'Example goal', features_functions: 'Example features' }, teamContext: 'Example team context', codeFiles: [] }
- **outputFolder** (string): The folder where the markdown files will be written. 
 Example: /path/to/output/folder
###### Function Returns:
- **Type:** void
- **Description:** This function does not return a value.
- **Example:** N/A

### generateCodeObjectContent - [FUNCTION]
------------------------------------------------------------
**Description:** Generates the content for a code object in markdown format.
**Code Snippet:**
```
function generateCodeObjectContent(codeObject: CodeObject, indent: number): string { ... }
```
- **Line:** 156
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **codeObject** (CodeObject): The code object to generate content for. 
 Example: { name: 'Example', type: 'function', description: 'Example description', codeSnippet: 'function example() {}', codeLine: 1, codeIndent: 0, fileName: 'example.ts', fileLocation: '/path/to/example.ts', isExported: false, isPrivate: false, isAsync: false }
- **indent** (number): The indentation level for the generated content. 
 Example: 0
###### Function Returns:
- **Type:** string
- **Description:** The generated markdown content for the code object.
- **Example:** ### Example - [FUNCTION] ... 

### getEmoji - [FUNCTION]
------------------------------------------------------------
**Description:** Returns an emoji based on the type of code object.
**Code Snippet:**
```
function getEmoji(type: string): string { ... }
```
- **Line:** 202
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **type** (string): The type of code object. 
 Example: functions
###### Function Returns:
- **Type:** string
- **Description:** The emoji corresponding to the code object type.
- **Example:** 🔧

### generateDocumentation - [FUNCTION]
------------------------------------------------------------
**Description:** Generates documentation for a project and writes it to the specified folder.
**Code Snippet:**
```
export async function generateDocumentation(folderPath: string, projectContext: ProjectSummary | null = null, jsonFile?: string): Promise<boolean> { ... }
```
- **Line:** 222
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **folderPath** (string): The path to the folder where the documentation will be written. 
 Example: /path/to/folder
- **projectContext** (ProjectSummary | null): The context of the project to generate documentation for. If null, it will be read from the jsonFile. 
 Example: { projectName: 'Example', projectDescription: { goal: 'Example goal', features_functions: 'Example features' }, teamContext: 'Example team context', codeFiles: [] }
- **jsonFile** (string): The path to the JSON file containing the project context. If not provided, a new file will be created. 
 Example: /path/to/jsonFile.json
###### Function Returns:
- **Type:** boolean
- **Description:** Returns true if the documentation was successfully generated, otherwise false.
- **Example:** true
## variables
🧮 **VARIABLES**


### backupDirectory - [VARIABLE]
------------------------------------------------------------
**Description:** Path to the backup directory where files will be stored if the main directory is not accessible.
**Code Snippet:**
```
const backupDirectory = path.join(__dirname, 'backup');
```
- **Line:** 8
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### toc - [VARIABLE]
------------------------------------------------------------
**Description:** Array to store the table of contents for the markdown documentation.
**Code Snippet:**
```
const toc: string[] = [];
```
- **Line:** 14
- **Indent:** 1
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### sectionContent - [VARIABLE]
------------------------------------------------------------
**Description:** Object to store different sections of the documentation content.
**Code Snippet:**
```
const sectionContent = { classes: '', functions: '', variables: '', types: '', comments: '', imports: '', exports: '', interfaces: '' };
```
- **Line:** 35
- **Indent:** 2
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### duplicateTracking - [VARIABLE]
------------------------------------------------------------
**Description:** Object to track duplicate code objects to avoid redundancy in the documentation.
**Code Snippet:**
```
const duplicateTracking: dupTrack = { classes: [], functions: [], variables: [], types: [], comments: [], imports: [], exports: [], interfaces: [] };
```
- **Line:** 48
- **Indent:** 2
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### fileContent - [VARIABLE]
------------------------------------------------------------
**Description:** String to store the content of the markdown file for each code file.
**Code Snippet:**
```
let fileContent = `# ${file.fileName} - ${projectSummary.projectName}
`;
```
- **Line:** 23
- **Indent:** 2
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### sectionLinks - [VARIABLE]
------------------------------------------------------------
**Description:** Array to store links to different sections in the table of contents.
**Code Snippet:**
```
const sectionLinks: string[] = [];
```
- **Line:** 34
- **Indent:** 2
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


## types
🏷️ **TYPES**


### dupObj - [TYPE]
------------------------------------------------------------
**Description:** Defines the structure for tracking duplicate objects with optional name and content properties, and a mandatory type property.
**Code Snippet:**
```
interface dupObj {
    name?: string;
    content?: string;
    type: CodeObjectType;
}
```
- **Line:** 48
- **Indent:** 8
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### dupTrack - [TYPE]
------------------------------------------------------------
**Description:** Defines the structure for tracking duplicates of various code object types including classes, functions, variables, types, comments, imports, exports, and interfaces.
**Code Snippet:**
```
interface dupTrack {
    classes: dupObj[];
    functions: dupObj[];
    variables: dupObj[];
    types: dupObj[];
    comments: dupObj[];
    imports: dupObj[];
    exports: dupObj[];
    interfaces: dupObj[];
}
```
- **Line:** 54
- **Indent:** 8
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## imports
📥 **IMPORTS**


### CodeObject, ProjectSummary, CodeObjectType - [IMPORT]
------------------------------------------------------------
**Description:** Imports CodeObject, ProjectSummary, and CodeObjectType from the local module './objectSchemas'. These are likely types or interfaces used in the code.
**Code Snippet:**
```
import { CodeObject, ProjectSummary, CodeObjectType } from "./objectSchemas";
```
- **Line:** 1
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### fs - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'fs' module from Node.js, which provides an API for interacting with the file system.
**Code Snippet:**
```
import fs from 'fs';
```
- **Line:** 2
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### path - [IMPORT]
------------------------------------------------------------
**Description:** Imports the 'path' module from Node.js, which provides utilities for working with file and directory paths.
**Code Snippet:**
```
import path from 'path';
```
- **Line:** 3
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### dotenv/config - [IMPORT]
------------------------------------------------------------
**Description:** Imports and configures the 'dotenv' module, which loads environment variables from a .env file into process.env.
**Code Snippet:**
```
import "dotenv/config";
```
- **Line:** 4
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## exports
📤 **EXPORTS**


### generateDocumentation - [EXPORT]
------------------------------------------------------------
**Description:** Asynchronously generates documentation for a given project context and saves it to the specified folder path. If the folder path is not writable, it attempts to use a backup directory.
**Code Snippet:**
```
export async function generateDocumentation(folderPath: string, projectContext: ProjectSummary | null = null, jsonFile?: string): Promise<boolean> { ... }
```
- **Line:** 268
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## interfaces
🌉 **INTERFACES**


### dupObj - [INTERFACE]
------------------------------------------------------------
**Description:** Interface for tracking duplicate objects with optional name and content properties, and a required type property.
**Code Snippet:**
```
interface dupObj {
    name?: string;
    content?: string;
    type: CodeObjectType;
}
```
- **Line:** 47
- **Indent:** 8
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### dupTrack - [INTERFACE]
------------------------------------------------------------
**Description:** Interface for tracking duplicates of various code object types, including classes, functions, variables, types, comments, imports, exports, and interfaces.
**Code Snippet:**
```
interface dupTrack {
    classes: dupObj[];
    functions: dupObj[];
    variables: dupObj[];
    types: dupObj[];
    comments: dupObj[];
    imports: dupObj[];
    exports: dupObj[];
    interfaces: dupObj[];
}
```
- **Line:** 53
- **Indent:** 8
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


