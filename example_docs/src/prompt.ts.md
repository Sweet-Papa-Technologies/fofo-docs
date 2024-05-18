# src/prompt.ts - fofo-docs

**Summary:** The code provides a set of functions to generate prompts for identifying and describing different types of code objects (e.g., classes, functions, variables, types, interfaces, imports, exports) within a given code snippet.

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
**Description:** Generates a prompt for identifying and describing code objects in a given code snippet.
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
 Example: Project and Team Context: ...
- **relevantCode** (string): Previously parsed relevant code. 
 Example: Relevant Code: ...
- **filePath** (string): Path to the file containing the code snippet. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet to be analyzed. 
 Example: const example = () => { ... }
- **type** (CodeObjects): Type of code objects to identify. 
 Example: functions
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt string.
- **Example:** You will be asked to provide a JSON object that contains the identified ...

### classesPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt specifically for identifying and describing class objects in a given code snippet.
**Code Snippet:**
```
export const classesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'classes');
```
- **Line:** 95
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): Context of the project and team. 
 Example: Project and Team Context: ...
- **relevantCode** (string): Previously parsed relevant code. 
 Example: Relevant Code: ...
- **filePath** (string): Path to the file containing the code snippet. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet to be analyzed. 
 Example: const example = () => { ... }
- **type** (CodeObjects): Type of code objects to identify. 
 Example: classes
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt string.
- **Example:** You will be asked to provide a JSON object that contains the identified classes ...

### functionsPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt specifically for identifying and describing function objects in a given code snippet.
**Code Snippet:**
```
export const functionsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'functions');
```
- **Line:** 97
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): Context of the project and team. 
 Example: Project and Team Context: ...
- **relevantCode** (string): Previously parsed relevant code. 
 Example: Relevant Code: ...
- **filePath** (string): Path to the file containing the code snippet. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet to be analyzed. 
 Example: const example = () => { ... }
- **type** (CodeObjects): Type of code objects to identify. 
 Example: functions
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt string.
- **Example:** You will be asked to provide a JSON object that contains the identified functions ...

### variablesPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt specifically for identifying and describing variable objects in a given code snippet.
**Code Snippet:**
```
export const variablesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'variables');
```
- **Line:** 99
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): Context of the project and team. 
 Example: Project and Team Context: ...
- **relevantCode** (string): Previously parsed relevant code. 
 Example: Relevant Code: ...
- **filePath** (string): Path to the file containing the code snippet. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet to be analyzed. 
 Example: const example = () => { ... }
- **type** (CodeObjects): Type of code objects to identify. 
 Example: variables
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt string.
- **Example:** You will be asked to provide a JSON object that contains the identified variables ...

### typesPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt specifically for identifying and describing type objects in a given code snippet.
**Code Snippet:**
```
export const typesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'types');
```
- **Line:** 101
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): Context of the project and team. 
 Example: Project and Team Context: ...
- **relevantCode** (string): Previously parsed relevant code. 
 Example: Relevant Code: ...
- **filePath** (string): Path to the file containing the code snippet. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet to be analyzed. 
 Example: const example = () => { ... }
- **type** (CodeObjects): Type of code objects to identify. 
 Example: types
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt string.
- **Example:** You will be asked to provide a JSON object that contains the identified types ...

### interfacesPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt specifically for identifying and describing interface objects in a given code snippet.
**Code Snippet:**
```
export const interfacesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'interfaces');
```
- **Line:** 103
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): Context of the project and team. 
 Example: Project and Team Context: ...
- **relevantCode** (string): Previously parsed relevant code. 
 Example: Relevant Code: ...
- **filePath** (string): Path to the file containing the code snippet. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet to be analyzed. 
 Example: const example = () => { ... }
- **type** (CodeObjects): Type of code objects to identify. 
 Example: interfaces
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt string.
- **Example:** You will be asked to provide a JSON object that contains the identified interfaces ...

### importsPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt specifically for identifying and describing import objects in a given code snippet.
**Code Snippet:**
```
export const importsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'imports');
```
- **Line:** 105
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): Context of the project and team. 
 Example: Project and Team Context: ...
- **relevantCode** (string): Previously parsed relevant code. 
 Example: Relevant Code: ...
- **filePath** (string): Path to the file containing the code snippet. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet to be analyzed. 
 Example: const example = () => { ... }
- **type** (CodeObjects): Type of code objects to identify. 
 Example: imports
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt string.
- **Example:** You will be asked to provide a JSON object that contains the identified imports ...

### exportsPrompt - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt specifically for identifying and describing export objects in a given code snippet.
**Code Snippet:**
```
export const exportsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'exports');
```
- **Line:** 107
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **context** (string): Context of the project and team. 
 Example: Project and Team Context: ...
- **relevantCode** (string): Previously parsed relevant code. 
 Example: Relevant Code: ...
- **filePath** (string): Path to the file containing the code snippet. 
 Example: .//src/prompt.ts
- **codeSnippet** (string): The code snippet to be analyzed. 
 Example: const example = () => { ... }
- **type** (CodeObjects): Type of code objects to identify. 
 Example: exports
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt string.
- **Example:** You will be asked to provide a JSON object that contains the identified exports ...

### getLanguageTypeFromFile - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a prompt to guess the programming language based on the file name and path.
**Code Snippet:**
```
export const getLanguageTypeFromFile = (filePath: string) => { ... }
```
- **Line:** 109
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **filePath** (string): Path to the file. 
 Example: .//src/prompt.ts
###### Function Returns:
- **Type:** string
- **Description:** Generated prompt string.
- **Example:** Based on the file name and path, guess the programming language (i.e. JavaScript, TypeScript, Python, etc.): ...
## variables
🧮 **VARIABLES**


### codeSummary - [VARIABLE]
------------------------------------------------------------
**Description:** A constant string that contains a template for creating a summary of the code in markdown format.
**Code Snippet:**
```
export const codeSummary = `\n    Create a summary of the following code in markdown. ONLY respond with the summary, For example:\n    \n    ##Execution Flow\n\n1. The app... etc\n`
```
- **Line:** 1
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available



### generalPrompt - [VARIABLE]
------------------------------------------------------------
**Description:** A constant function that generates a prompt for identifying and describing code objects in a given code snippet.
**Code Snippet:**
```
const generalPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => { ... }
```
- **Line:** 3
- **Indent:** 0
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
- **Line:** 5
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## exports
📤 **EXPORTS**


### codeSummary - [EXPORT]
------------------------------------------------------------
**Description:** A constant string template for creating a summary of the code in markdown format.
**Code Snippet:**
```
export const codeSummary = `...`;
```
- **Line:** 1
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### classesPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying class objects in a code snippet.
**Code Snippet:**
```
export const classesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'classes');
```
- **Line:** 97
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### functionsPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying function objects in a code snippet.
**Code Snippet:**
```
export const functionsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'functions');
```
- **Line:** 99
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### variablesPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying variable objects in a code snippet.
**Code Snippet:**
```
export const variablesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'variables');
```
- **Line:** 101
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### typesPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying type objects in a code snippet.
**Code Snippet:**
```
export const typesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'types');
```
- **Line:** 103
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### interfacesPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying interface objects in a code snippet.
**Code Snippet:**
```
export const interfacesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'interfaces');
```
- **Line:** 105
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### importsPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying import objects in a code snippet.
**Code Snippet:**
```
export const importsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'imports');
```
- **Line:** 110
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### exportsPrompt - [EXPORT]
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying export objects in a code snippet.
**Code Snippet:**
```
export const exportsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'exports');
```
- **Line:** 112
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
export const getLanguageTypeFromFile = (filePath: string) => { ... };
```
- **Line:** 114
- **Indent:** 0
- **Location:** prompt.ts (.//src/prompt.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


