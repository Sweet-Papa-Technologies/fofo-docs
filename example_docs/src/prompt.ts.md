# src/prompt.ts - fofo-docs

**Summary:** The code provides a set of functions to generate prompts for different types of code objects (e.g., classes, functions, variables, types, interfaces, comments, imports, exports) and a function to determine the programming language based on the file path.

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
------------------------------------------------------------
**Description:** Generates a prompt string for identifying and describing code objects in a given code snippet.
**Code Snippet:**
```
const generalPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => { ... }
```
- **Line:** 5
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): Context of the project and team. 
 Example: Project and Team Context
- **relevantCode** (string): Previously parsed relevant code. 
 Example: Relevant Code
- **filePath** (string): Path to the file containing the code snippet. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet to be analyzed. 
 Example: code snippet here
- **type** (CodeObjects): Type of code objects to identify (e.g., functions, classes). 
 Example: functions
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt string.
- **Example:** Generated prompt string here

### classesPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt for classes based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const classesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'classes');
```
- **Line:** 50
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): The context for generating the prompt. 
 Example: Project and Team Context
- **relevantCode** (string): The relevant code for generating the prompt. 
 Example: Previously Parsed Code
- **filePath** (string): The file path for generating the prompt. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet for generating the prompt. 
 Example: codeSnippet
- **type** (CodeObjects): The type of code object for generating the prompt. 
 Example: classes
###### Function Returns:
- **Type:** string
- **Description:** The generated prompt.
- **Example:** Generated prompt for classes

### functionsPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt for functions based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const functionsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'functions');
```
- **Line:** 52
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): The context for generating the prompt. 
 Example: Project and Team Context
- **relevantCode** (string): The relevant code for generating the prompt. 
 Example: Previously Parsed Code
- **filePath** (string): The file path for generating the prompt. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet for generating the prompt. 
 Example: codeSnippet
- **type** (CodeObjects): The type of code object for generating the prompt. 
 Example: functions
###### Function Returns:
- **Type:** string
- **Description:** The generated prompt.
- **Example:** Generated prompt for functions

### variablesPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt for variables based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const variablesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'variables');
```
- **Line:** 54
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): The context for generating the prompt. 
 Example: Project and Team Context
- **relevantCode** (string): The relevant code for generating the prompt. 
 Example: Previously Parsed Code
- **filePath** (string): The file path for generating the prompt. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet for generating the prompt. 
 Example: codeSnippet
- **type** (CodeObjects): The type of code object for generating the prompt. 
 Example: variables
###### Function Returns:
- **Type:** string
- **Description:** The generated prompt.
- **Example:** Generated prompt for variables

### typesPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt for types based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const typesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'types');
```
- **Line:** 56
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): The context for generating the prompt. 
 Example: Project and Team Context
- **relevantCode** (string): The relevant code for generating the prompt. 
 Example: Previously Parsed Code
- **filePath** (string): The file path for generating the prompt. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet for generating the prompt. 
 Example: codeSnippet
- **type** (CodeObjects): The type of code object for generating the prompt. 
 Example: types
###### Function Returns:
- **Type:** string
- **Description:** The generated prompt.
- **Example:** Generated prompt for types

### interfacesPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt for interfaces based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const interfacesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'interfaces');
```
- **Line:** 58
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): The context for generating the prompt. 
 Example: Project and Team Context
- **relevantCode** (string): The relevant code for generating the prompt. 
 Example: Previously Parsed Code
- **filePath** (string): The file path for generating the prompt. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet for generating the prompt. 
 Example: codeSnippet
- **type** (CodeObjects): The type of code object for generating the prompt. 
 Example: interfaces
###### Function Returns:
- **Type:** string
- **Description:** The generated prompt.
- **Example:** Generated prompt for interfaces

### importsPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt for imports based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const importsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'imports');
```
- **Line:** 62
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): The context for generating the prompt. 
 Example: Project and Team Context
- **relevantCode** (string): The relevant code for generating the prompt. 
 Example: Previously Parsed Code
- **filePath** (string): The file path for generating the prompt. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet for generating the prompt. 
 Example: codeSnippet
- **type** (CodeObjects): The type of code object for generating the prompt. 
 Example: imports
###### Function Returns:
- **Type:** string
- **Description:** The generated prompt.
- **Example:** Generated prompt for imports

### exportsPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt for exports based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const exportsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'exports');
```
- **Line:** 64
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): The context for generating the prompt. 
 Example: Project and Team Context
- **relevantCode** (string): The relevant code for generating the prompt. 
 Example: Previously Parsed Code
- **filePath** (string): The file path for generating the prompt. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet for generating the prompt. 
 Example: codeSnippet
- **type** (CodeObjects): The type of code object for generating the prompt. 
 Example: exports
###### Function Returns:
- **Type:** string
- **Description:** The generated prompt.
- **Example:** Generated prompt for exports

### getLanguageTypeFromFile - [FUNCTION]
------------------------------------------------------------
**Description:** Guesses the programming language based on the file name and path.
**Code Snippet:**
```
export const getLanguageTypeFromFile = (filePath: string) => {
    return `Based on the file name and path, guess the programming language (i.e. JavaScript, TypeScript, Python, etc.): 
    ${filePath}
    
    Please respond with JUST the language name. For example: JavaScript
    `
}
```
- **Line:** 66
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **filePath** (string): The file path to guess the programming language from. 
 Example: .//src/prompt.ts
###### Function Returns:
- **Type:** string
- **Description:** The guessed programming language.
- **Example:** JavaScript
## variables
🧮 **VARIABLES**


### codeSummary - [VARIABLE]
------------------------------------------------------------
**Description:** A constant string that contains a template for summarizing code in markdown format.
**Code Snippet:**
```
export const codeSummary = `...`;
```
- **Line:** 1
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available



### generalPrompt - [VARIABLE]
------------------------------------------------------------
**Description:** A constant function that generates a prompt string based on provided context, relevant code, file path, code snippet, and type.
**Code Snippet:**
```
const generalPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => { ... };
```
- **Line:** 5
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### fileName - [VARIABLE]
------------------------------------------------------------
**Description:** A constant string that represents the name of the file extracted from the file path.
**Code Snippet:**
```
const fileName = filePath.split('/').pop();
```
- **Line:** 6
- **Indent:** 1
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


## imports
📥 **IMPORTS**


### CodeObjects - [IMPORT]
------------------------------------------------------------
**Description:** Imports the CodeObjects type from the objectSchemas module.
**Code Snippet:**
```
import { CodeObjects } from "./objectSchemas";
```
- **Line:** 3
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## exports
📤 **EXPORTS**


### codeSummary - [EXPORT]
------------------------------------------------------------
**Description:** A constant string template for creating a summary of code in markdown format.
**Code Snippet:**
```
export const codeSummary = `...`
```
- **Line:** 1
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### classesPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for classes based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const classesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'classes');
```
- **Line:** 70
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### functionsPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for functions based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const functionsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'functions');
```
- **Line:** 71
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### variablesPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for variables based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const variablesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'variables');
```
- **Line:** 72
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### typesPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for types based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const typesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'types');
```
- **Line:** 73
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### interfacesPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for interfaces based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const interfacesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'interfaces');
```
- **Line:** 74
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### importsPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for imports based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const importsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'imports');
```
- **Line:** 77
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### exportsPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for exports based on the provided context, relevant code, file path, and code snippet.
**Code Snippet:**
```
export const exportsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'exports');
```
- **Line:** 78
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### getLanguageTypeFromFile - [EXPORT]
------------------------------------------------------------
**Description:** A function that guesses the programming language based on the file name and path.
**Code Snippet:**
```
export const getLanguageTypeFromFile = (filePath: string) => { return `Based on the file name and path, guess the programming language (i.e. JavaScript, TypeScript, Python, etc.): ${filePath} Please respond with JUST the language name. For example: JavaScript ` }
```
- **Line:** 81
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


