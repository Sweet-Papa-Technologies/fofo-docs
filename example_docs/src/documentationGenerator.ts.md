# src/documentationGenerator.ts - fofo-docs

**Summary:** The code aims to generate documentation for a project by saving the project context to a JSON file and converting it to Markdown format.

- **File Location:** .//src/documentationGenerator.ts
- **Language:** TypeScript
## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [imports](#imports)
- [exports](#exports)
- [interfaces](#interfaces)
## functions
🔧 **FUNCTIONS**


### jsonToMarkdown - [FUNCTION]
------------------------------------------------------------
**Description:** Converts a project summary object into a markdown documentation format and saves it to the specified output folder.
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
- **projectSummary** (ProjectSummary): The summary of the project including details like project name, description, team context, and code files. 
 Example: { projectName: 'ExampleProject', projectDescription: { goal: '...', features_functions: '...' }, teamContext: '...', codeFiles: [...] }
- **outputFolder** (string): The directory where the markdown files will be saved. 
 Example: "./output"
###### Function Returns:
- **Type:** void
- **Description:** This function does not return a value.
- **Example:** N/A

### duplicateCheck - [FUNCTION]
------------------------------------------------------------
**Description:** Checks if a given code object is a duplicate based on its name, content, and type.
**Code Snippet:**
```
const duplicateCheck = (obj: CodeObject, type: CodeObjectType): boolean => { ... }
```
- **Line:** 70
- **Indent:** 8
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** true
- **Async:** false


###### Function Parameters:
- **obj** (CodeObject): The code object to check for duplication. 
 Example: { name: 'exampleFunction', codeSnippet: 'function exampleFunction() { ... }', type: 'function' }
- **type** (CodeObjectType): The type of the code object (e.g., class, function, variable). 
 Example: "function"
###### Function Returns:
- **Type:** boolean
- **Description:** Returns true if the code object is a duplicate, otherwise false.
- **Example:** true

### generateCodeObjectContent - [FUNCTION]
------------------------------------------------------------
**Description:** Generates content for a given code object with specified indentation.
**Code Snippet:**
```
function generateCodeObjectContent(codeObject: CodeObject, indent: number): string { ... }
```
- **Line:** 87
- **Indent:** 1
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **codeObject** (CodeObject): The code object to generate content for. 
 Example: { name: 'example', type: 'function', description: 'An example function', codeSnippet: 'function example() { ... }', codeLine: 10, codeIndent: 2, fileName: 'example.ts', fileLocation: './src/example.ts', isExported: true, isPrivate: false, isAsync: false }
- **indent** (number): The level of indentation to apply to the generated content. 
 Example: 2
###### Function Returns:
- **Type:** string
- **Description:** The generated content for the code object.
- **Example:** ### example - [FUNCTION]
---
**Description:** An example function
**Code Snippet:**

function example() { ... }
```
- **Line:** 10
- **Indent:** 2
- **Location:** example.ts (./src/example.ts)
- **Exported:** true
- **Private:** false
- **Async:** false



### getEmoji - [FUNCTION]
------------------------------------------------------------
**Description:** Returns an emoji based on the type of code object.
**Code Snippet:**
```
function getEmoji(type: string): string { ... }
```
- **Line:** 142
- **Indent:** 1
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
**Description:** Generates documentation for a project by saving the project context to a JSON file and converting it to Markdown.
**Code Snippet:**
```
export async function generateDocumentation(folderPath: string, projectContext: ProjectSummary | null = null, jsonFile?: string): Promise<boolean> { ... }
```
- **Line:** 10
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **folderPath** (string): The path to the folder where the documentation will be generated. 
 Example: /path/to/folder
- **projectContext** (ProjectSummary | null): The project context to be documented. If null, it will be read from the JSON file. 
 Example: null
- **jsonFile** (string): Optional path to an existing JSON file containing the project context. 
 Example: /path/to/projectContext.json
###### Function Returns:
- **Type:** boolean
- **Description:** Returns true if the documentation was successfully generated, otherwise false.
- **Example:** true
## variables
🧮 **VARIABLES**


### timestamp - [VARIABLE]
------------------------------------------------------------
**Description:** Current timestamp formatted as a string.
**Code Snippet:**
```
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
```
- **Line:** 10
- **Indent:** 1
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### projectFolder - [VARIABLE]
------------------------------------------------------------
**Description:** Path to the project folder.
**Code Snippet:**
```
const projectFolder = path.join(outputFolder, `${projectSummary.projectName}-${timestamp}`);
```
- **Line:** 11
- **Indent:** 1
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### toc - [VARIABLE]
------------------------------------------------------------
**Description:** Table of contents as an array of strings.
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



### fileName - [VARIABLE]
------------------------------------------------------------
**Description:** Name of the markdown file for each code file.
**Code Snippet:**
```
const fileName = `${file.fileName}.md`;
```
- **Line:** 22
- **Indent:** 2
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### filePath - [VARIABLE]
------------------------------------------------------------
**Description:** Path to the markdown file for each code file.
**Code Snippet:**
```
const filePath = path.join(projectFolder, fileName);
```
- **Line:** 23
- **Indent:** 2
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### fileContent - [VARIABLE]
------------------------------------------------------------
**Description:** Content of the markdown file for each code file.
**Code Snippet:**
```
let fileContent = `# ${file.fileName} - ${projectSummary.projectName}
`;
```
- **Line:** 25
- **Indent:** 2
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### sectionLinks - [VARIABLE]
------------------------------------------------------------
**Description:** Array of section links for the table of contents.
**Code Snippet:**
```
const sectionLinks: string[] = [];
```
- **Line:** 32
- **Indent:** 2
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### sectionContent - [VARIABLE]
------------------------------------------------------------
**Description:** Object to hold different sections of content.
**Code Snippet:**
```
const sectionContent = {
    classes: '',
    functions: '',
    variables: '',
    types: '',
    comments: '',
    imports: '',
    exports: '',
    interfaces: ''
};
```
- **Line:** 34
- **Indent:** 2
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### duplicateTracking - [VARIABLE]
------------------------------------------------------------
**Description:** Object to track duplicates of different code objects.
**Code Snippet:**
```
const duplicateTracking: dupTrack = {
    classes: [],
    functions: [],
    variables: [],
    types: [],
    comments: [],
    imports: [],
    exports: [],
    interfaces: []
};
```
- **Line:** 50
- **Indent:** 2
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### duplicateCheck - [VARIABLE]
------------------------------------------------------------
**Description:** Function to check for duplicates in code objects.
**Code Snippet:**
```
const duplicateCheck = (obj: CodeObject, type: CodeObjectType): boolean => {
    const objName = obj.name;
    const objContent = obj.codeSnippet;
    const objType = obj.type;

    if ((objName || objContent) && objType) {
        const dupObj = {
            name: objName,
            content: objContent,
            type: objType
        };

        // Check to see if the object already exists in the duplicate tracking
        let bFound = false;
        for (const [section, content] of Object.entries(duplicateTracking)) {
            const contentObj = content as dupObj[];

            // If the same name and the same type, we will go ahead and omit it
            const found = contentObj.find((item) => (item.name === objName || item.content === objContent) && item.type === objType);

            if (typeof found !== 'undefined') {
                bFound = true;
                break;
            }
        }

        if (bFound === true) {
            return true;
        }

        switch (type) {
            case 'class':
                duplicateTracking.classes.push(dupObj);
                break;
            case 'function':
                duplicateTracking.functions.push(dupObj);
                break;
            case 'variable':
                duplicateTracking.variables.push(dupObj);
                break;
            case 'type':
                duplicateTracking.types.push(dupObj);
                break;
            // case 'comment':
            //     duplicateTracking.comments.push(dupObj);
            //     break;
            case 'import':
                duplicateTracking.imports.push(dupObj);
                break;
            case 'export':
                duplicateTracking.exports.push(dupObj);
                break;
            case 'interface':
                duplicateTracking.interfaces.push(dupObj);
                break;
            default:
                break;
        }

        return false;
    }

    return false;
};
```
- **Line:** 61
- **Indent:** 2
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### baseObject - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the code objects from the file.
**Code Snippet:**
```
const baseObject = file.codeObjects as any;
```
- **Line:** 1
- **Indent:** 12
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### obj - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the array of code objects for a specific key.
**Code Snippet:**
```
const obj = baseObject[key] as any[];
```
- **Line:** 2
- **Indent:** 12
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### fileFolder - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the directory path of the file.
**Code Snippet:**
```
const fileFolder = path.dirname(filePath);
```
- **Line:** 37
- **Indent:** 8
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### tocPath - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the path to the README.md file in the project folder.
**Code Snippet:**
```
const tocPath = path.join(projectFolder, 'README.md');
```
- **Line:** 47
- **Indent:** 4
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### indentation - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the indentation string based on the indent level.
**Code Snippet:**
```
const indentation = '  '.repeat(indent);
```
- **Line:** 53
- **Indent:** 4
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### fancyBar - [VARIABLE]
------------------------------------------------------------
**Description:** Holds a decorative string used in the content.
**Code Snippet:**
```
const fancyBar = '---'.repeat(20);
```
- **Line:** 54
- **Indent:** 4
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### folderPath - [VARIABLE]
------------------------------------------------------------
**Description:** The path to the folder where documentation will be generated.
**Code Snippet:**
```
export async function generateDocumentation(folderPath: string, projectContext: ProjectSummary | null = null, jsonFile?: string): Promise<boolean> {
```
- **Line:** 10
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### timeStamp - [VARIABLE]
------------------------------------------------------------
**Description:** A timestamp used to create a unique filename.
**Code Snippet:**
```
const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
```
- **Line:** 38
- **Indent:** 8
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### model - [VARIABLE]
------------------------------------------------------------
**Description:** The model name used in the filename, defaulting to 'ml'.
**Code Snippet:**
```
const model = process.env.LLM_TO_USE || 'ml';
```
- **Line:** 39
- **Indent:** 8
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### projectContextPath - [VARIABLE]
------------------------------------------------------------
**Description:** The path to the project context JSON file.
**Code Snippet:**
```
const projectContextPath = path.join(folderPath, `projectContext-${timeStamp}-${model}.json`);
```
- **Line:** 40
- **Indent:** 8
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


## imports
📥 **IMPORTS**


### CodeObject, ProjectSummary, CodeObjectType - [IMPORT]
------------------------------------------------------------
**Description:** Imports the CodeObject, ProjectSummary, and CodeObjectType types from the local objectSchemas module.
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



### dotenv/config - [IMPORT]
------------------------------------------------------------
**Description:** Imports and configures the dotenv module to load environment variables from a .env file.
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



### fs - [IMPORT]
------------------------------------------------------------
**Description:** Node.js File System module used for file operations such as checking existence, creating directories, and writing files.
**Code Snippet:**
```
import fs from 'fs';
```
- **Line:** 1
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### path - [IMPORT]
------------------------------------------------------------
**Description:** Node.js Path module used for handling and transforming file paths.
**Code Snippet:**
```
import path from 'path';
```
- **Line:** 2
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## exports
📤 **EXPORTS**


### generateDocumentation - [EXPORT]
------------------------------------------------------------
**Description:** Asynchronous function to generate documentation for a given folder path and project context. It ensures the folder path exists and is writable, saves the project context to a JSON file, and converts the JSON to Markdown.
**Code Snippet:**
```
export async function generateDocumentation(folderPath: string, projectContext: ProjectSummary | null = null, jsonFile?: string): Promise<boolean> { ... }
```
- **Line:** 12
- **Indent:** 0
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## interfaces
🌉 **INTERFACES**


### dupObj - [INTERFACE]
------------------------------------------------------------
**Description:** Interface for tracking duplicate objects with optional name and content, and a required type.
**Code Snippet:**
```
interface dupObj { name?: string; content?: string; type: CodeObjectType; }
```
- **Line:** 45
- **Indent:** 8
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### dupTrack - [INTERFACE]
------------------------------------------------------------
**Description:** Interface for tracking duplicates of various code object types.
**Code Snippet:**
```
interface dupTrack { classes: dupObj[]; functions: dupObj[]; variables: dupObj[]; types: dupObj[]; comments: dupObj[]; imports: dupObj[]; exports: dupObj[]; interfaces: dupObj[]; }
```
- **Line:** 50
- **Indent:** 8
- **Location:** documentationGenerator.ts (.//src/documentationGenerator.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


