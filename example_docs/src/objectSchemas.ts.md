# src/objectSchemas.ts - fofo-docs

**Summary:** The code defines TypeScript types and interfaces for summarizing and analyzing code projects.

- **File Location:** .//src/objectSchemas.ts
- **Language:** TypeScript
## Table of Contents
- [exports](#exports)
- [interfaces](#interfaces)
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


## interfaces
🌉 **INTERFACES**


### ProjectSummary - [INTERFACE]
------------------------------------------------------------
**Description:** Interface representing a summary of a project.
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
**Description:** Interface representing a model with a name and the model itself.
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
**Description:** Interface representing the configuration for a model service.
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
**Description:** Interface representing RAG data with metadata and optional embeddings.
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
**Description:** Interface representing a summary of code with goal and features/functions.
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
**Description:** Interface representing a summary of a code file.
**Code Snippet:**
```
export interface CodeFileSummary { fileName: string; fileLocation: string; codeSummary: codeSummary; language: string; executionFlow: ExecutionFlow[]; codeObjects: CodeObject; }
```
- **Line:** 32
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### ExecutionFlow - [INTERFACE]
------------------------------------------------------------
**Description:** Interface representing the execution flow of a code file.
**Code Snippet:**
```
export interface ExecutionFlow { step: number; stepDescription: string; bImportant: boolean; codeSnippet: string; codeLine: number; codeIndent: number; fileName: string; fileLocation: string; }
```
- **Line:** 39
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### FunctionParameter - [INTERFACE]
------------------------------------------------------------
**Description:** Interface representing a function parameter with name, type, description, and example.
**Code Snippet:**
```
export interface FunctionParameter { name: string; type: string; description: string; example: string; }
```
- **Line:** 47
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### FunctionReturn - [INTERFACE]
------------------------------------------------------------
**Description:** Interface representing the return type of a function with description and example.
**Code Snippet:**
```
export interface FunctionReturn { type: string; description: string; example: string; }
```
- **Line:** 52
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### CodeObject - [INTERFACE]
------------------------------------------------------------
**Description:** Interface representing a code object with various properties.
**Code Snippet:**
```
export interface CodeObject { name: string; type: CodeObjectType; description: string; codeSnippet: string; codeLine: number; codeIndent: number; content?:string; fileName: string; fileLocation: string; subObjects?: CodeObject[]; parentObject?: CodeObject; functionParameters?: FunctionParameter[]; functionReturns?: FunctionReturn; isExported: boolean; isFunction: boolean; isClass: boolean; isPrivate: boolean; isAsync: boolean; }
```
- **Line:** 57
- **Indent:** 0
- **Location:** objectSchemas.ts (.//src/objectSchemas.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


