# src/objectSchemas.ts - fofo-docs

**Summary:** The code defines TypeScript types and interfaces for summarizing and analyzing code projects.

- **File Location:** .//src/objectSchemas.ts
- **Language:** TypeScript
## Table of Contents
- [types](#types)
- [exports](#exports)
- [interfaces](#interfaces)
## types
🏷️ **TYPES**


### CodeObjectType - [TYPE]
------------------------------------------------------------
**Description:** Represents the type of a code object, such as class, function, variable, etc.
**Code Snippet:**
```
export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
```
- **Line:** 1
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### CodeObjects - [TYPE]
------------------------------------------------------------
**Description:** Represents the different categories of code objects, such as classes, functions, variables, etc.
**Code Snippet:**
```
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation';
```
- **Line:** 2
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### CodeObjectTypes - [TYPE]
------------------------------------------------------------
**Description:** Represents the properties of a code object, such as name, type, description, etc.
**Code Snippet:**
```
export type CodeObjectTypes = 'name' | 'type' | 'description' | 'codeSnippet' | 'codeLine' | 'codeIndent' | 'fileName' | 'fileLocation' | 'subObjects' | 'parentObject' | 'functionParameters' | 'functionReturns' | 'isExported' | 'isFunction' | 'isClass' | 'isPrivate' | 'isAsync';
```
- **Line:** 47
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## exports
📤 **EXPORTS**


### CodeObjectType - [EXPORT]
------------------------------------------------------------
**Description:** Type alias for different kinds of code objects.
**Code Snippet:**
```
export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
```
- **Line:** 1
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### CodeObjects - [EXPORT]
------------------------------------------------------------
**Description:** Type alias for different categories of code objects.
**Code Snippet:**
```
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation';
```
- **Line:** 2
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### ProjectSummary - [EXPORT]
------------------------------------------------------------
**Description:** Interface representing a summary of a project.
**Code Snippet:**
```
export interface ProjectSummary { projectName: string; projectDescription: codeSummary projectLocation: string; codeFiles: CodeFileSummary[]; ragData: RagData[]; teamContext: string; }
```
- **Line:** 4
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### models - [EXPORT]
------------------------------------------------------------
**Description:** Interface representing a model with a name and the model itself.
**Code Snippet:**
```
export interface models { name: string, model: any, }
```
- **Line:** 11
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### modelServiceConfig - [EXPORT]
------------------------------------------------------------
**Description:** Interface representing the configuration for a model service.
**Code Snippet:**
```
export interface modelServiceConfig { models: models[], endpoint?:string }
```
- **Line:** 14
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### RagData - [EXPORT]
------------------------------------------------------------
**Description:** Interface representing RAG (Retrieval-Augmented Generation) data.
**Code Snippet:**
```
export interface RagData { metadata: { filename: string; codeChunkId: string|number; codeChunkLineStart: number; codeChunkLineEnd: number; codeObjects: CodeObject; codeChunkSummary: string; }; embeddings?: number[][]; documentData: any }
```
- **Line:** 18
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### codeSummary - [EXPORT]
------------------------------------------------------------
**Description:** Interface representing a summary of code.
**Code Snippet:**
```
export interface codeSummary { goal: string, features_functions: string, }
```
- **Line:** 26
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### CodeFileSummary - [EXPORT]
------------------------------------------------------------
**Description:** Interface representing a summary of a code file.
**Code Snippet:**
```
export interface CodeFileSummary { fileName: string; fileLocation: string; codeSummary: codeSummary; language: string; executionFlow: ExecutionFlow[]; codeObjects: CodeObject; }
```
- **Line:** 29
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### ExecutionFlow - [EXPORT]
------------------------------------------------------------
**Description:** Interface representing the execution flow of code.
**Code Snippet:**
```
export interface ExecutionFlow { step: number; stepDescription: string; bImportant: boolean; codeSnippet: string; codeLine: number; codeIndent: number; fileName: string; fileLocation: string; }
```
- **Line:** 36
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### FunctionParameter - [EXPORT]
------------------------------------------------------------
**Description:** Interface representing a function parameter.
**Code Snippet:**
```
export interface FunctionParameter { name: string; type: string; description: string; example: string; }
```
- **Line:** 43
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### FunctionReturn - [EXPORT]
------------------------------------------------------------
**Description:** Interface representing a function return value.
**Code Snippet:**
```
export interface FunctionReturn { type: string; description: string; example: string; }
```
- **Line:** 48
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### CodeObject - [EXPORT]
------------------------------------------------------------
**Description:** Interface representing a code object.
**Code Snippet:**
```
export interface CodeObject { name: string; type: CodeObjectType; description: string; codeSnippet: string; codeLine: number; codeIndent: number; content?:string; fileName: string; fileLocation: string; subObjects?: CodeObject[]; parentObject?: CodeObject; functionParameters?: FunctionParameter[]; functionReturns?: FunctionReturn; isExported: boolean; isFunction: boolean; isClass: boolean; isPrivate: boolean; isAsync: boolean; }
```
- **Line:** 53
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### CodeObjectTypes - [EXPORT]
------------------------------------------------------------
**Description:** Type alias for different properties of a code object.
**Code Snippet:**
```
export type CodeObjectTypes = 'name' | 'type' | 'description' | 'codeSnippet' | 'codeLine' | 'codeIndent' | 'fileName' | 'fileLocation' | 'subObjects' | 'parentObject' | 'functionParameters' | 'functionReturns' | 'isExported' | 'isFunction' | 'isClass' | 'isPrivate' | 'isAsync';
```
- **Line:** 66
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## interfaces
🌉 **INTERFACES**


### ProjectSummary - [INTERFACE]
------------------------------------------------------------
**Description:** Represents a summary of a project including its name, description, location, code files, RAG data, and team context.
**Code Snippet:**
```
export interface ProjectSummary { projectName: string; projectDescription: codeSummary projectLocation: string; codeFiles: CodeFileSummary[]; ragData: RagData[]; teamContext: string; }
```
- **Line:** 5
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### models - [INTERFACE]
------------------------------------------------------------
**Description:** Represents a model with a name and the model object itself.
**Code Snippet:**
```
export interface models { name: string, model: any, }
```
- **Line:** 13
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### modelServiceConfig - [INTERFACE]
------------------------------------------------------------
**Description:** Configuration for model services including an array of models and an optional endpoint.
**Code Snippet:**
```
export interface modelServiceConfig { models: models[], endpoint?:string }
```
- **Line:** 16
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### RagData - [INTERFACE]
------------------------------------------------------------
**Description:** Represents RAG (Retrieval-Augmented Generation) data including metadata, optional embeddings, and document data.
**Code Snippet:**
```
export interface RagData { metadata: { filename: string; codeChunkId: string|number; codeChunkLineStart: number; codeChunkLineEnd: number; codeObjects: CodeObject; codeChunkSummary: string; }; embeddings?: number[][]; documentData: any }
```
- **Line:** 20
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### codeSummary - [INTERFACE]
------------------------------------------------------------
**Description:** Represents a summary of code including its goal and features/functions.
**Code Snippet:**
```
export interface codeSummary { goal: string, features_functions: string, }
```
- **Line:** 29
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### CodeFileSummary - [INTERFACE]
------------------------------------------------------------
**Description:** Represents a summary of a code file including its name, location, code summary, language, execution flow, and code objects.
**Code Snippet:**
```
export interface CodeFileSummary { fileName: string; fileLocation: string; codeSummary: codeSummary; language: string; executionFlow: ExecutionFlow[]; codeObjects: CodeObject; }
```
- **Line:** 33
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### ExecutionFlow - [INTERFACE]
------------------------------------------------------------
**Description:** Represents the execution flow of a code file including step number, description, importance, code snippet, line number, indentation, file name, and location.
**Code Snippet:**
```
export interface ExecutionFlow { step: number; stepDescription: string; bImportant: boolean; codeSnippet: string; codeLine: number; codeIndent: number; fileName: string; fileLocation: string; }
```
- **Line:** 41
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### FunctionParameter - [INTERFACE]
------------------------------------------------------------
**Description:** Represents a parameter of a function including its name, type, description, and example.
**Code Snippet:**
```
export interface FunctionParameter { name: string; type: string; description: string; example: string; }
```
- **Line:** 49
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### FunctionReturn - [INTERFACE]
------------------------------------------------------------
**Description:** Represents the return value of a function including its type, description, and example.
**Code Snippet:**
```
export interface FunctionReturn { type: string; description: string; example: string; }
```
- **Line:** 54
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### CodeObject - [INTERFACE]
------------------------------------------------------------
**Description:** Represents a code object including its name, type, description, code snippet, line number, indentation, file name, location, and various properties related to its structure and usage.
**Code Snippet:**
```
export interface CodeObject { name: string; type: CodeObjectType; description: string; codeSnippet: string; codeLine: number; codeIndent: number; content?:string; fileName: string; fileLocation: string; subObjects?: CodeObject[]; parentObject?: CodeObject; functionParameters?: FunctionParameter[]; functionReturns?: FunctionReturn; isExported: boolean; isFunction: boolean; isClass: boolean; isPrivate: boolean; isAsync: boolean; }
```
- **Line:** 59
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


