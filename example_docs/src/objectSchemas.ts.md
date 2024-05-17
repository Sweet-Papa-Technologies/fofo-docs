# src/objectSchemas.ts

**Summary:** The goal of the code is to define TypeScript interfaces and types for summarizing and managing details about code files and their components within a project.

- **File Location:** .//src/objectSchemas.ts
- **Language:** TypeScript
## Table of Contents
- [types](#types)
- [exports](#exports)
- [interfaces](#interfaces)
## types
🏷️ **TYPES**

### CodeObjectType - [TYPE]
- **Description:** Union type for different types of code objects.
- **Line:** 1
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'comment' | 'import' | 'export' | 'interface' | 'constructor';
```
### CodeObjects - [TYPE]
- **Description:** Union type for different collections of code objects.
- **Line:** 2
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'comments' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation';
```
### CodeObjectTypes - [TYPE]
- **Description:** Union type for properties of a CodeObject.
- **Line:** 61
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export type CodeObjectTypes = 'name' | 'type' | 'description' | 'codeSnippet' | 'codeLine' | 'codeIndent' | 'fileName' | 'fileLocation' | 'subObjects' | 'parentObject' | 'functionParameters' | 'functionReturns' | 'isExported' | 'isFunction' | 'isClass' | 'isPrivate' | 'isAsync';
```
## exports
📤 **EXPORTS**

### CodeObjectType - [EXPORT]
- **Description:** Type defining code object types such as 'class', 'function', etc.
- **Line:** 1
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'comment' | 'import' | 'export' | 'interface' | 'constructor';
```
### CodeObjects - [EXPORT]
- **Description:** Type defining collections of code objects
- **Line:** 2
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'comments' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation';
```
### ProjectSummary - [EXPORT]
- **Description:** Interface for project summary information
- **Line:** 4
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface ProjectSummary { projectName: string; projectDescription: codeSummary projectLocation: string; codeFiles: CodeFileSummary[]; ragData: RagData[]; teamContext: string; };
```
### models - [EXPORT]
- **Description:** Interface for models information
- **Line:** 10
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface models { name: string, model: any, };
```
### modelServiceConfig - [EXPORT]
- **Description:** Interface for model service configuration
- **Line:** 13
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface modelServiceConfig { models: models[], endpoint?: string };
```
### RagData - [EXPORT]
- **Description:** Interface for RagData information
- **Line:** 17
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface RagData { metadata: { filename: string; codeChunkId: string | number; codeChunkLineStart: number; codeChunkLineEnd: number; codeObjects: CodeObject; codeChunkSummary: string; }; embeddings?: number[][]; // Example: Embeddings could be an array of numbers documentData: any };
```
### codeSummary - [EXPORT]
- **Description:** Interface for code summary
- **Line:** 26
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface codeSummary { goal: string, features_functions: string, };
```
### CodeFileSummary - [EXPORT]
- **Description:** Interface for code file summary
- **Line:** 29
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface CodeFileSummary { fileName: string; fileLocation: string; codeSummary: codeSummary; language: string; executionFlow: ExecutionFlow[]; codeObjects: CodeObject; };
```
### ExecutionFlow - [EXPORT]
- **Description:** Interface for execution flow steps
- **Line:** 37
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface ExecutionFlow { step: number; stepDescription: string; bImportant: boolean; codeSnippet: string; codeLine: number; codeIndent: number; fileName: string; fileLocation: string; };
```
### FunctionParameter - [EXPORT]
- **Description:** Interface for function parameter details
- **Line:** 45
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface FunctionParameter { name: string; type: string; description: string; example: string; };
```
### FunctionReturn - [EXPORT]
- **Description:** Interface for function return details
- **Line:** 50
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface FunctionReturn { type: string; description: string; example: string; };
```
### CodeObject - [EXPORT]
- **Description:** Interface for code object details
- **Line:** 55
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface CodeObject { name: string; type: CodeObjectType; description: string; codeSnippet: string; codeLine: number; codeIndent: number; content?: string; fileName: string; fileLocation: string; subObjects?: CodeObject[]; parentObject?: CodeObject; functionParameters?: FunctionParameter[]; functionReturns?: FunctionReturn; isExported: boolean; isFunction: boolean; isClass: boolean; isPrivate: boolean; isAsync: boolean; };
```
## interfaces
🌉 **INTERFACES**

### ProjectSummary - [INTERFACE]
- **Description:** Interface representing the summary of a project.
- **Line:** 4
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export interface ProjectSummary { ... }
```
### models - [INTERFACE]
- **Description:** Interface representing a model object.
- **Line:** 11
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export interface models { ... }
```
### modelServiceConfig - [INTERFACE]
- **Description:** Interface for configuring model services.
- **Line:** 14
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export interface modelServiceConfig { ... }
```
### RagData - [INTERFACE]
- **Description:** Interface representing RAG data.
- **Line:** 18
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export interface RagData { ... }
```
### codeSummary - [INTERFACE]
- **Description:** Interface for code summary information.
- **Line:** 26
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export interface codeSummary { ... }
```
### CodeFileSummary - [INTERFACE]
- **Description:** Interface summarizing the details of a code file.
- **Line:** 29
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export interface CodeFileSummary { ... }
```
### ExecutionFlow - [INTERFACE]
- **Description:** Interface representing the execution flow of the code.
- **Line:** 35
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export interface ExecutionFlow { ... }
```
### FunctionParameter - [INTERFACE]
- **Description:** Interface describing a function parameter.
- **Line:** 42
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export interface FunctionParameter { ... }
```
### FunctionReturn - [INTERFACE]
- **Description:** Interface describing a function's return value.
- **Line:** 47
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export interface FunctionReturn { ... }
```
### CodeObject - [INTERFACE]
- **Description:** Interface representing a code object.
- **Line:** 51
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
export interface CodeObject { ... }
```
### ProjectSummary - [INTERFACE]
- **Description:** An interface describing the summary of a project, including the project name, description, location, related code files, RAG data, and team context.
- **Line:** 5
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}
```
### models - [INTERFACE]
- **Description:** An interface describing a model object containing a name and a model of any type.
- **Line:** 13
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface models {
    name: string,
    model: any,
}
```
### modelServiceConfig - [INTERFACE]
- **Description:** An interface for model service configuration, including an array of models and an optional endpoint.
- **Line:** 17
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}
```
### RagData - [INTERFACE]
- **Description:** An interface representing RAG (Retrieve And Generate) data, including metadata, embeddings, and document data.
- **Line:** 21
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface RagData {
    metadata: {
        filename: string;
        codeChunkId: string|number;
        codeChunkLineStart: number;
        codeChunkLineEnd: number;
        codeObjects: CodeObject;
        codeChunkSummary: string;
    };
    embeddings?: number[][]; // Example: Embeddings could be an array of numbers
    documentData: any
}
```
### codeSummary - [INTERFACE]
- **Description:** An interface describing a summary of code-related goals and features/functions.
- **Line:** 32
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface codeSummary {
    goal: string,
    features_functions: string,
  }
```
### CodeFileSummary - [INTERFACE]
- **Description:** An interface summarizing the details of a code file, including file name, location, code summary, language, execution flow, and code objects.
- **Line:** 36
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: codeSummary;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject;
}
```
### ExecutionFlow - [INTERFACE]
- **Description:** An interface representing the steps in the execution flow of a code, with detail of each step, its description, importance, associated code snippet, line number, indent level, file name, and location.
- **Line:** 43
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface ExecutionFlow {
    step: number;
    stepDescription: string;
    bImportant: boolean;
    codeSnippet: string;
    codeLine: number;
    codeIndent: number;
    fileName: string;
    fileLocation: string;
}
```
### FunctionParameter - [INTERFACE]
- **Description:** An interface representing the parameters of a function, including their name, type, description, and an example.
- **Line:** 51
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}
```
### FunctionReturn - [INTERFACE]
- **Description:** An interface for representing the return type of a function, along with its description and an example.
- **Line:** 57
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```
### CodeObject - [INTERFACE]
- **Description:** An interface representing a code object, including its name, type, description, code snippet, line, indent, file name, location, content, subobjects, parent object, function parameters, function returns, and flags indicating its properties like isExported, isFunction, isClass, isPrivate, isAsync.
- **Line:** 63
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export interface CodeObject {
    name: string;
    type: CodeObjectType;
    description: string;
    codeSnippet: string;
    codeLine: number;
    codeIndent: number;
    content?:string;
    fileName: string;
    fileLocation: string;
    subObjects?: CodeObject[];
    parentObject?: CodeObject;
    functionParameters?: FunctionParameter[];
    functionReturns?: FunctionReturn;
    isExported: boolean;
    isFunction: boolean;
    isClass: boolean;
    isPrivate: boolean;
    isAsync: boolean;
}
```
