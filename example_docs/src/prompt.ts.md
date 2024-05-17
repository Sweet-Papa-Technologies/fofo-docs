# src/prompt.ts

**Summary:** The goal of the code is to provide metadata descriptions for various code elements including variables, types, interfaces, comments, imports, and exports. Additionally, it contains a function to guess the programming language based on the file path.

- **File Location:** .//src/prompt.ts
- **Language:** TypeScript
## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [imports](#imports)
- [exports](#exports)
## functions
🔧 **FUNCTIONS**

### generalPrompt - [FUNCTION]
- **Description:** A function to generate a JSON object response format prompt given various inputs.
- **Line:** 7
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


**Code Snippet:**
```
const generalPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => { ... }
```
###### Function Parameters:
- **context** (string): The context of the project and team 
 Example: 
- **relevantCode** (string): Previously parsed relevant code 
 Example: 
- **filePath** (string): The file path of the code snippet 
 Example: 
- **codeSnippet** (string): The code snippet to analyze 
 Example: 
- **type** (CodeObjects): The type of code objects to identify 
 Example: 
###### Function Returns:
- **Type:** string
- **Description:** Returns a template string for generating the JSON object
- **Example:** 
### classesPrompt - [FUNCTION]
- **Description:** Generates prompt for identifying classes in a code snippet.
- **Line:** 32
- **Indent:** 0
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export const classesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'classes');
```
###### Function Parameters:
- **context** (string): Context information for the prompt 
 Example: Project and team context
- **relevantCode** (string): Relevant code for context 
 Example: 
- **filePath** (string): File path of the code snippet 
 Example: ./src/prompt.ts
- **codeSnippet** (string): The actual code snippet to analyze 
 Example: 
- **type** (CodeObjects): The type of code object to identify 
 Example: classes
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt
- **Example:** 
### functionsPrompt - [FUNCTION]
- **Description:** Generates prompt for identifying functions in a code snippet.
- **Line:** 35
- **Indent:** 0
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export const functionsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'functions');
```
###### Function Parameters:
- **context** (string): Context information for the prompt 
 Example: Project and team context
- **relevantCode** (string): Relevant code for context 
 Example: 
- **filePath** (string): File path of the code snippet 
 Example: ./src/prompt.ts
- **codeSnippet** (string): The actual code snippet to analyze 
 Example: 
- **type** (CodeObjects): The type of code object to identify 
 Example: functions
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt
- **Example:** 
### variablesPrompt - [FUNCTION]
- **Description:** Generates prompt for identifying variables in a code snippet.
- **Line:** 38
- **Indent:** 0
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export const variablesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'variables');
```
###### Function Parameters:
- **context** (string): Context information for the prompt 
 Example: Project and team context
- **relevantCode** (string): Relevant code for context 
 Example: 
- **filePath** (string): File path of the code snippet 
 Example: ./src/prompt.ts
- **codeSnippet** (string): The actual code snippet to analyze 
 Example: 
- **type** (CodeObjects): The type of code object to identify 
 Example: variables
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt
- **Example:** 
### typesPrompt - [FUNCTION]
- **Description:** Generates prompt for identifying types in a code snippet.
- **Line:** 41
- **Indent:** 0
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export const typesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'types');
```
###### Function Parameters:
- **context** (string): Context information for the prompt 
 Example: Project and team context
- **relevantCode** (string): Relevant code for context 
 Example: 
- **filePath** (string): File path of the code snippet 
 Example: ./src/prompt.ts
- **codeSnippet** (string): The actual code snippet to analyze 
 Example: 
- **type** (CodeObjects): The type of code object to identify 
 Example: types
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt
- **Example:** 
### interfacesPrompt - [FUNCTION]
- **Description:** Generates prompt for identifying interfaces in a code snippet.
- **Line:** 44
- **Indent:** 0
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export const interfacesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'interfaces');
```
###### Function Parameters:
- **context** (string): Context information for the prompt 
 Example: Project and team context
- **relevantCode** (string): Relevant code for context 
 Example: 
- **filePath** (string): File path of the code snippet 
 Example: ./src/prompt.ts
- **codeSnippet** (string): The actual code snippet to analyze 
 Example: 
- **type** (CodeObjects): The type of code object to identify 
 Example: interfaces
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt
- **Example:** 
### commentsPrompt - [FUNCTION]
- **Description:** Generates prompt for identifying comments in a code snippet.
- **Line:** 47
- **Indent:** 0
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export const commentsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'comments');
```
###### Function Parameters:
- **context** (string): Context information for the prompt 
 Example: Project and team context
- **relevantCode** (string): Relevant code for context 
 Example: 
- **filePath** (string): File path of the code snippet 
 Example: ./src/prompt.ts
- **codeSnippet** (string): The actual code snippet to analyze 
 Example: 
- **type** (CodeObjects): The type of code object to identify 
 Example: comments
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt
- **Example:** 
### importsPrompt - [FUNCTION]
- **Description:** Generates prompt for identifying imports in a code snippet.
- **Line:** 50
- **Indent:** 0
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export const importsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'imports');
```
###### Function Parameters:
- **context** (string): Context information for the prompt 
 Example: Project and team context
- **relevantCode** (string): Relevant code for context 
 Example: 
- **filePath** (string): File path of the code snippet 
 Example: ./src/prompt.ts
- **codeSnippet** (string): The actual code snippet to analyze 
 Example: 
- **type** (CodeObjects): The type of code object to identify 
 Example: imports
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt
- **Example:** 
### exportsPrompt - [FUNCTION]
- **Description:** Generates prompt for identifying exports in a code snippet.
- **Line:** 53
- **Indent:** 0
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export const exportsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'exports');
```
###### Function Parameters:
- **context** (string): Context information for the prompt 
 Example: Project and team context
- **relevantCode** (string): Relevant code for context 
 Example: 
- **filePath** (string): File path of the code snippet 
 Example: ./src/prompt.ts
- **codeSnippet** (string): The actual code snippet to analyze 
 Example: 
- **type** (CodeObjects): The type of code object to identify 
 Example: exports
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt
- **Example:** 
### getLanguageTypeFromFile - [FUNCTION]
- **Description:** Guesses the programming language based on the file name and path.
- **Line:** 1
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export const getLanguageTypeFromFile = (filePath: string) => {
    return `Based on the file name and path, guess the programming language (i.e. JavaScript, TypeScript, Python, etc.): 
    ${filePath}
    
    Please respond with JUST the language name. For example: JavaScript
    `

}
```
###### Function Parameters:
- **filePath** (string): The file path to guess the programming language from. 
 Example: /path/to/file.js
###### Function Returns:
- **Type:** string
- **Description:** The guessed programming language.
- **Example:** JavaScript
## variables
🧮 **VARIABLES**

### codeSummary - [VARIABLE]
- **Description:** A constant storing the template for creating a summary in markdown format
- **Line:** 6
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export const codeSummary = `...`;
```
### generalPrompt - [VARIABLE]
- **Description:** A function that generates a prompt template based on given context, relevant code, file path, code snippet, and type
- **Line:** 9
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const generalPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => { ... };
```
### fileName - [VARIABLE]
- **Description:** A constant holding the file name extracted from the given file path
- **Line:** 11
- **Indent:** 1
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const fileName = filePath.split('/').pop();
```
### classesPrompt - [VARIABLE]
- **Description:** A constant that holds a function call to generalPrompt for classes.
- **Line:** 29
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export const classesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'classes');
```
### functionsPrompt - [VARIABLE]
- **Description:** A constant that holds a function call to generalPrompt for functions.
- **Line:** 31
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export const functionsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'functions');
```
### variablesPrompt - [VARIABLE]
- **Description:** A constant that holds a function call to generalPrompt for variables.
- **Line:** 33
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export const variablesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'variables');
```
### typesPrompt - [VARIABLE]
- **Description:** A constant that holds a function call to generalPrompt for types.
- **Line:** 35
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export const typesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'types');
```
### interfacesPrompt - [VARIABLE]
- **Description:** A constant that holds a function call to generalPrompt for interfaces.
- **Line:** 37
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export const interfacesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'interfaces');
```
### commentsPrompt - [VARIABLE]
- **Description:** A constant that holds a function call to generalPrompt for comments.
- **Line:** 39
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export const commentsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'comments');
```
### importsPrompt - [VARIABLE]
- **Description:** A constant that holds a function call to generalPrompt for imports.
- **Line:** 41
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export const importsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'imports');
```
### exportsPrompt - [VARIABLE]
- **Description:** A constant that holds a function call to generalPrompt for exports.
- **Line:** 43
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export const exportsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'exports');
```
## imports
📥 **IMPORTS**

### CodeObjects - [IMPORT]
- **Description:** Importing the CodeObjects definition from the objectSchemas module.
- **Line:** 4
- **Indent:** 0
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { CodeObjects } from "./objectSchemas";
```
### importName - [IMPORT]
- **Description:** Description of the import prompt for CodeObjects
- **Line:** 1
- **Indent:** 0
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import importName from 'module';
```
## exports
📤 **EXPORTS**

### codeSummary - [EXPORT]
- **Description:** Constant export holding a multiline template string intended to guide how to create a summary of the code.
- **Line:** 6
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export const codeSummary = `Create a summary of the following code in markdown. ONLY respond with the summary, For example:

##Execution Flow

1. The app... etc
`
```
### classesPrompt - [EXPORT]
- **Description:** Function that generates a prompt for identifying class objects in the provided code.
- **Line:** 37
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export const classesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'classes');
```
### functionsPrompt - [EXPORT]
- **Description:** Function that generates a prompt for identifying function objects in the provided code.
- **Line:** 39
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export const functionsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'functions');
```
### variablesPrompt - [EXPORT]
- **Description:** Function that generates a prompt for identifying variable objects in the provided code.
- **Line:** 41
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export const variablesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'variables');
```
### typesPrompt - [EXPORT]
- **Description:** Function that generates a prompt for identifying type objects in the provided code.
- **Line:** 43
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export const typesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'types');
```
### interfacesPrompt - [EXPORT]
- **Description:** Function that generates a prompt for identifying interface objects in the provided code.
- **Line:** 45
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export const interfacesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'interfaces');
```
### commentsPrompt - [EXPORT]
- **Description:** Function that generates a prompt for identifying comment objects in the provided code.
- **Line:** 47
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export const commentsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'comments');
```
### importsPrompt - [EXPORT]
- **Description:** Function that generates a prompt for identifying import objects in the provided code.
- **Line:** 49
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export const importsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'imports');
```
### exportsPrompt - [EXPORT]
- **Description:** Function that generates a prompt for identifying export objects in the provided code.
- **Line:** 51
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export const exportsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'exports');
```
### getLanguageTypeFromFile - [EXPORT]
- **Description:** A function that guesses the programming language based on file name and path.
- **Line:** 1
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export const getLanguageTypeFromFile = (filePath: string) => { ... }
```
