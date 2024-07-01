# src/appData.ts - fofo-docs

**Summary:** The code defines functions and constants related to file and directory handling for a documentation generation tool. It aims to identify relevant files and directories for documentation, excluding common build artifacts and configuration files.

- **File Location:** ./src/appData.ts
- **Language:** language: TypeScript 

## Table of Contents
- [classes](#classes)
- [functions](#functions)
- [variables](#variables)
- [types](#types)
- [imports](#imports)
- [exports](#exports)
- [interfaces](#interfaces)
## classes


### 📘 runtimeData - CLASS
------------------------------------------------------------
**Description:** This class represents the runtime data for the application.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `runtimeData` class stores information about the application's runtime environment, including the application version, project name, project path, output path, selected language model, and selected RAG service.
- **Dependencies:** chromadb

### 📘 globResult - CLASS
------------------------------------------------------------
**Description:** This class represents the result of a glob search.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `globResult` interface defines the structure for storing the results of a glob search, which is a pattern-based file search.
- **Usage Example:** 


```typescript
// Example usage
const globResult: globResult = {
  glob: ['**/*.ts', '**/*.js'],
  ignore: ['node_modules/**'],
};
```

- **Dependencies:** This interface relies on the `chromadb` library for its types.

### 📘 moduleObject - CLASS
------------------------------------------------------------
**Description:** This class represents a module or package object.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `moduleObject` interface defines the structure for representing a module or package object. It includes properties for the module's name, version, and description.
- **Usage Example:** 


```typescript
const myModule: moduleObject = {
  name: "my-module",
  version: "1.0.0",
  description: "A useful module",
};
```


### 📘 ProjectSummary - CLASS
------------------------------------------------------------
**Description:** This class represents a project summary.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ProjectSummary` class represents a summary of a code project. It stores information about the project's name, description, location, technology stack, dependencies, code files, RAG data, and team context.
- **Usage Example:** 


```typescript
const projectSummary: ProjectSummary = {
  projectName: "MyProject",
  projectDescription: {
    goal: "This project aims to...",
    features_functions: "The project includes features like..."
  },
  projectLocation: "/path/to/project",
  projectTechStackDescription: "This project uses TypeScript, React, and Node.js",
  projectDependencies: [
    { name: "react", version: "18.2.0", description: "A JavaScript library for building user interfaces" },
    { name: "typescript", version: "4.9.4", description: "A superset of JavaScript that adds static typing" }
  ],
  codeFiles: [
    // ... code file summaries
  ],
  ragData: [
    // ... RAG data
  ],
  teamContext: "This project is developed by..."
};
```

- **Dependencies:** The `ProjectSummary` class depends on the following interfaces from the `objectSchemas.ts` file:

- `codeSummary`
- `moduleObject`
- `CodeFileSummary`
- `RagData`

### 📘 models - CLASS
------------------------------------------------------------
**Description:** This class represents a model object.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}

export interface models {
    name: string,
    model: any,
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `models` class defines an interface for representing LLM models used in the application. It includes properties for the model's name, model identifier, backend platform, and optional context size.
- **Usage Example:** 


```typescript
const myModel: models = {
  name: "myModel",
  model: "gpt-3.5-turbo",
};
```

- **Dependencies:** The `models` class depends on the `chromadb` library for its `Embeddings`, `Metadata`, and `QueryResponse` types.

### 📘 modelServiceConfig - CLASS
------------------------------------------------------------
**Description:** This class represents a model service configuration object.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}

export interface models {
    name: string,
    model: any,
}
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `modelServiceConfig` interface defines the configuration for a model service. It includes an array of `models` and an optional `endpoint`.
- **Usage Example:** 


```typescript
const modelServiceConfig: modelServiceConfig = {
  models: [
    {
      name: "phi3",
      model: "phi3",
    },
  ],
  endpoint: "http://localhost:11434",
};
```

- **Dependencies:** The interface depends on the `models` interface, which is also defined in the same file.

### 📘 RagData - CLASS
------------------------------------------------------------
**Description:** This class represents a RAG data object.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}

export interface models {
    name: string,
    model: any,
}
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}

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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `RagData` class represents a data object used for storing and retrieving information related to Retrieval Augmented Generation (RAG). It contains metadata about code chunks, embeddings, and search results.
- **Usage Example:** 


```typescript
const ragData: RagData = {
  metadata: {
    filename: "myFile.ts",
    codeChunkId: 1,
    codeChunkLineStart: 10,
    codeChunkLineEnd: 20,
    codeObjects: {},
    codeChunkSummary: "This code chunk defines a function..."
  },
  embeddings: [],
  documentData: "// Code chunk content",
  allSearchResults: {},
  allResults: {
    documents: [],
    embeddings: [],
    metadatas: []
  }
};
```

- **Dependencies:** The `RagData` class depends on the `chromadb` library for embedding and search functionality.

### 📘 codeSummary - CLASS
------------------------------------------------------------
**Description:** This class represents a code summary object.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}

export interface models {
    name: string,
    model: any,
}
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}

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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}

export interface codeSummary {
    goal: string,
    features_functions: string,
  }
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This class defines various interfaces and types for representing and summarizing code projects, including project metadata, code files, code objects, and runtime data. It aims to provide a structured way to store and analyze information about code projects, potentially for documentation, code understanding, or code analysis purposes.
- **Dependencies:** chromadb

### 📘 CodeFileSummary - CLASS
------------------------------------------------------------
**Description:** This class represents a code file summary object.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}

export interface models {
    name: string,
    model: any,
}
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}

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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}

export interface codeSummary {
    goal: string,
    features_functions: string,
  }
export interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: codeSummary;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeFileSummary` class represents a summary of a code file, containing information about its name, location, language, summary of its purpose and features, and a list of code objects found within the file.
- **Usage Example:** 


```typescript
const codeFileSummary: CodeFileSummary = {
  fileName: "myFile.ts",
  fileLocation: "./src/myFile.ts",
  codeSummary: {
    goal: "This file implements a function to calculate the sum of two numbers.",
    features_functions: "The file contains a function called `add` that takes two numbers as input and returns their sum."
  },
  language: "TypeScript",
  executionFlow: [],
  codeObjects: {
    functions: [
      {
        name: "add",
        type: "function",
        description: "This function calculates the sum of two numbers.",
        codeSnippet: "function add(a: number, b: number): number { return a + b; }",
        codeLine: 10,
        codeIndent: 2,
        fileName: "myFile.ts",
        fileLocation: "./src/myFile.ts",
        isExported: true,
        isPrivate: false,
        isAsync: false,
        functionParameters: [
          { name: "a", type: "number", description: "The first number to add.", example: "1" },
          { name: "b", type: "number", description: "The second number to add.", example: "2" }
        ],
        functionReturns: { type: "number", description: "The sum of the two input numbers.", example: "3" }
      }
    ]
  }
};
```

- **Dependencies:** The class depends on the `chromadb` library for its `Embeddings`, `Metadata`, and `QueryResponse` types.

### 📘 ExecutionFlow - CLASS
------------------------------------------------------------
**Description:** This class represents an execution flow step object.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}

export interface models {
    name: string,
    model: any,
}
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}

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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}

export interface codeSummary {
    goal: string,
    features_functions: string,
  }
export interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: codeSummary;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject;
}

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

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ExecutionFlow` class represents a step in the execution flow of a codebase. It stores information about the step, including its description, importance, code snippet, line number, indentation level, and file location.
- **Usage Example:** 


```typescript
const step1: ExecutionFlow = {
  step: 1,
  stepDescription: "Initialize the application",
  bImportant: true,
  codeSnippet: "// Initialize the application",
  codeLine: 10,
  codeIndent: 0,
  fileName: "main.ts",
  fileLocation: "./src/main.ts",
};
```


### 📘 FunctionParameter - CLASS
------------------------------------------------------------
**Description:** This class represents a function parameter object.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}

export interface models {
    name: string,
    model: any,
}
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}

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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}

export interface codeSummary {
    goal: string,
    features_functions: string,
  }
export interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: codeSummary;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject;
}

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

export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This class represents a function parameter object, which is used to store information about a function's parameters.
- **Parameters:** The class has four properties:

- `name`: The name of the parameter.
- `type`: The data type of the parameter.
- `description`: A description of the parameter's purpose.
- `example`: An example value for the parameter.
- **Returns:** This class does not return any value.
- **Usage Example:** 


```typescript
const functionParameter: FunctionParameter = {
  name: 'param1',
  type: 'string',
  description: 'This is the first parameter',
  example: 'Hello World'
};
```


### 📘 FunctionReturn - CLASS
------------------------------------------------------------
**Description:** This class represents a function return object.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}

export interface models {
    name: string,
    model: any,
}
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}

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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}

export interface codeSummary {
    goal: string,
    features_functions: string,
  }
export interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: codeSummary;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject;
}

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

export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}

export interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `FunctionReturn` class represents a function return object, which is used to define the type, description, and example of a function's return value.
- **Usage Example:** 


```typescript
// Example usage:
const myFunction = () => {
  return new FunctionReturn({
    type: 'string',
    description: 'This is a string return value',
    example: 'Hello, world!'
  });
};
```

- **Dependencies:** The `FunctionReturn` class depends on the `chromadb` library for its type definitions.

### 📘 CodeObject - CLASS
------------------------------------------------------------
**Description:** This class represents a code object.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}

export interface models {
    name: string,
    model: any,
}
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}

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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}

export interface codeSummary {
    goal: string,
    features_functions: string,
  }
export interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: codeSummary;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject;
}

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

export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}

export interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}

export interface CodeObject {
    name: string;
    type: CodeObjectType;
    description: string;
    codeSnippet: string;
    annotation?: Annotation;
    codeLine?: number;
    codeIndent?: number;
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

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This class defines various interfaces and types for representing and summarizing code projects, including project metadata, code files, code objects, and runtime data. It aims to provide a structured way to store and analyze information about code projects, potentially for documentation, code understanding, or code analysis purposes.
- **Dependencies:** chromadb

### 📘 Annotation - CLASS
------------------------------------------------------------
**Description:** This class represents an annotation object.

**Code Snippet:**


```typescript
import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}

export interface models {
    name: string,
    model: any,
}
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}

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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}

export interface codeSummary {
    goal: string,
    features_functions: string,
  }
export interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: codeSummary;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject;
}

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

export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}

export interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}

export interface CodeObject {
    name: string;
    type: CodeObjectType;
    description: string;
    codeSnippet: string;
    annotation?: Annotation;
    codeLine?: number;
    codeIndent?: number;
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

export type CodeObjectTypes = 'name' | 'type' | 'description' | 'codeSnippet' | 'codeLine' | 'codeIndent' | 'fileName' | 'fileLocation' | 'subObjects' | 'parentObject' | 'functionParameters' | 'functionReturns' | 'isExported' | 'isFunction' | 'isClass' | 'isPrivate' | 'isAsync'

export interface Annotation {
    purpose: string;
    parameters?: string;
    returns?: string;
    usageExample?: string;
    edgeCases?: string;
    dependencies?: string;
    errorHandling?: string;
    performance?: string;
    bestPractices?: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `Annotation` class represents an annotation object, which is used to store information about a code object, such as its purpose, parameters, returns, usage examples, edge cases, dependencies, error handling, performance, and best practices.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
// Example usage of the Annotation class
const annotation = new Annotation();
annotation.purpose = "This function calculates the sum of two numbers.";
annotation.parameters = "num1: number, num2: number";
annotation.returns = "number";
```

- **Edge Cases:** N/A
- **Dependencies:** N/A
## functions


### 🔧 getAppVersion - FUNCTION
------------------------------------------------------------
**Description:** This function attempts to read the version number from the package.json file in the project directory. If successful, it returns the version string. If an error occurs, it logs the error and returns a placeholder string.

**Code Snippet:**


```typescript
export function getAppVersion() {
    try {
        const scriptDirectory = __dirname;
        const packageJSONpath = path.join(scriptDirectory, "../package.json");
        const packageJSON = readFileSync(packageJSONpath, "utf-8");
        const packageJSONParsed = JSON.parse(packageJSON);
        return packageJSONParsed.version;
    } catch (error) {
        console.error("Error reading package.json", error);
        return "AWESOME VERSION - THE ONE INCAPABLE OF RETURNING ITS OWN VERSION";
    }
}
```

- **Line:** 182
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Returns:
- **Type:** string
- **Description:** The version string from package.json, or a placeholder string if an error occurs.
- **Example:** "1.0.0"
###### Annotations / Comments:
- **Purpose:** The `getAppVersion` function attempts to retrieve the version number from the `package.json` file located in the project directory. It first determines the current script directory using `__dirname` and then constructs the path to `package.json` using `path.join`. It then reads the contents of `package.json` using `readFileSync` and parses it as JSON using `JSON.parse`. If successful, it returns the `version` property from the parsed JSON object. If an error occurs during any of these steps, it logs the error using `console.error` and returns a placeholder string indicating that the version could not be retrieved.
- **Returns:** The function returns a string representing the version number from `package.json`. If an error occurs, it returns a placeholder string: "AWESOME VERSION - THE ONE INCAPABLE OF RETURNING ITS OWN VERSION".
- **Usage Example:** 


```typescript
const version = getAppVersion();
console.log(version); // Output: "1.0.0" (or the placeholder string if an error occurs)
```

- **Edge Cases:** The function handles the case where the `package.json` file is not found or cannot be read. In this case, it logs an error and returns a placeholder string.
- **Dependencies:** The function depends on the following modules:
- `fs` (for reading files)
- `path` (for constructing file paths)

### 🔧 isNoNoFile - FUNCTION
------------------------------------------------------------
**Description:** This function checks if a given file path is considered a "no-no" file, meaning it should be ignored during documentation generation. It checks for common patterns like node_modules, build directories, and specific file extensions. It also allows for custom ignore patterns to be passed in.

**Code Snippet:**


```typescript
export function isNoNoFile(file: string, ignoreMeh:string[]=[]): boolean {
    let isNoNo = false;

    const nonoDirs = [
        "node_modules",
        "dist",
        "build",
        "out",
        "bin",
        "obj",
        "venv",
        "__pycache__",
        ".DS_Store",
        ".vscode",
        "coverage",
        ".nyc_output",
        ".mypy_cache",
        ".pytest_cache",
        ".tox",
        ".nox",
        ".coverage",
        ".hypothesis",
        ".git",
        ".hg",
        ".svn",
        ".bzr",
        "htmlcov",
        "site",
        ".sass-cache",
        ".cache",
        "npm-debug.log",
        "yarn-debug.log",
        "yarn-error.log",
        ".env",
        ".venv",
        ...ignoreMeh
    ]

    const noNoKeywords = [
        "node_modules/",
        "tsconfig.json",
        ".md",
        "dist/",
        "build/",
        "out/",
        "bin/",
        "obj/",
        "venv/",
        "__pycache__/",
        "*.pyc",
        "*.pyo",
        ".DS_Store",
        "*.class",
        "*.jar",
        "*.war",
        "*.ear",
        "*.dll",
        "*.exe",
        "*.out",
        "*.log",
        "*.tmp",
        "*.lock",
        "yarn.lock",
        "package-lock.json",
        "pipfile.lock",
        "poetry.lock",
        "*.iml",
        ".idea/",
        "*.suo",
        "*.user",
        "*.userosscache",
        "*.sln.docstates",
        "*.swp",
        "*.swo",
        "*.bak",
        "*.orig",
        "*.rej",
        ".vscode/",
        "coverage/",
        ".nyc_output/",
        "*.test",
        "*.spec",
        "*.snap",
        "target/",
        "Pods/",
        "DerivedData/",
        ".gradle/",
        "*.xcworkspace",
        "*.xcodeproj",
        "CMakeFiles/",
        "CMakeCache.txt",
        "CMakeLists.txt.user",
        ".mypy_cache/",
        ".pytest_cache/",
        ".tox/",
        ".nox/",
        ".coverage",
        ".hypothesis/",
        "*.prof",
        ".xml",
        ".json",
        ".html",
        ".css",
        ".scss",
        ".sass",
        ".less",
        ".yaml",
        ".yml",
        ".env",
        ".env.*",
        ".git/",
        ".hg/",
        ".svn/",
        ".bzr/",
        "nosetests.xml",
        "test-results.xml",
        "tests/__pycache__/",
        "tests/*.pyc",
        "tests/*.pyo",
        "docs/_build/",
        "*.ipynb_checkpoints",
        "htmlcov/",
        "site/",
        ".sass-cache/",
        ".cache/",
        "npm-debug.log",
        "yarn-debug.log",
        "yarn-error.log",
        ".env",
        ".env.*",
        ".venv/"
    ]
    
    for (const keyword of noNoKeywords) {
        if (file.includes(keyword)) {
            isNoNo = true;
            break;
        }
    }

    for (const OKkeyword of fofoDocsBuiltInGlobSearch) {

        if (file.includes(OKkeyword)) {
            let isOK = true

            for (const dir of nonoDirs) {
                if (file.includes(dir)) {
                    isOK = false;
                    break;
                }
            }

            if (isOK === true) {
                isNoNo = false;
                break;
            }
        }
    }

    return isNoNo;

}
```

- **Line:** 195
- **Location:** undefined (Unable to Load)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `isNoNoFile` function determines whether a given file path should be ignored during documentation generation. It identifies common patterns associated with build artifacts, dependency directories, and specific file extensions, effectively filtering out irrelevant files.
- **Parameters:** - `file`: A string representing the file path to be evaluated.
- `ignoreMeh`: An optional array of strings containing custom ignore patterns. This allows for additional filtering based on specific project requirements.
- **Returns:** A boolean value indicating whether the file should be ignored (true) or processed (false).
- **Usage Example:** 


```typescript
const filePath = 'node_modules/my-package/index.js';
const shouldIgnore = isNoNoFile(filePath);
// shouldIgnore will be true because the file path contains 'node_modules'
```

- **Edge Cases:** The function relies on a predefined list of patterns and keywords. If a project uses unconventional file structures or naming conventions, it might not accurately identify all irrelevant files.
- **Dependencies:** The function relies on the `fofoDocsBuiltInGlobSearch` and `nonoDirs` arrays, which contain predefined patterns and keywords for identifying common ignore scenarios.

### 🔧 appHeaderPretty - FUNCTION
------------------------------------------------------------
**Description:** This function generates a formatted header string for the FoFo Docs application, including information about the project, version, selected language model, and output path. It uses the colorize function to add color to the output.

**Code Snippet:**


```typescript
export const appHeaderPretty = (runtimeData:runtimeData) => `

${headerColored}

Version: ${colorize(runtimeData.appVersion, 'blue')}
Project: ${colorize(runtimeData.projectName, 'magenta')}
Path: ${colorize(runtimeData.projectPath, 'magenta')}

Selected Language Model: ${colorize(runtimeData.selectedLLModel || 'Undefined', 'yellow')}
Selected RAG Service: ${colorize(runtimeData.selectedRAGService, 'yellow')}

Output Path: ${colorize(runtimeData.outputPath, 'green')}

====================================================================================
`
```

- **Line:** 166
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **runtimeData** (runtimeData): An object containing runtime data for the application, including version, project name, path, selected language model, and output path. 
 Example: { appVersion: "1.0.0", projectName: "MyProject", projectPath: "/path/to/project", selectedLLModel: "gpt-3.5-turbo", selectedRAGService: "OFF", outputPath: "/path/to/output" }
###### Function Returns:
- **Type:** string
- **Description:** A formatted header string for the FoFo Docs application.
- **Example:** ```
====================================================================================
$$$$$$$$\         $$$$$$\                 $$$$$$$\                                
$$  _____|       $$  __$$\                $$  __$$\                               
$$ |    $$$$$$\  $$ /  \__|$$$$$$\        $$ |  $$ | $$$$$$\   $$$$$$$\  $$$$$$$\ 
$$$$$\ $$  __$$\ $$$$    $$  __$$\       $$ |  $$ |$$  __$$\ $$  _____|$$  _____|
$$  __|$$ /  $$ |$$  _|   $$ /  $$ |      $$ |  $$ |$$ /  $$ |$$ /      \$$$$$$\  
$$ |   $$ |  $$ |$$ |     $$ |  $$ |      $$ |  $$ |$$ |  $$ |$$ |       \____$$\ 
$$ |   \$$$$$$  |$$ |     \$$$$$$  |      $$$$$$$  |\$$$$$$  |\$$$$$$$\ $$$$$$$  |
\__|    \______/ \__|      \______/       \_______/  \______/  \_______|\_______/ 

Created By Sweet Papa Technologies, LLC
Forrester Terry | fterry@sweetpapatechnologis.com
                            
====================================================================================

Version: 1.0.0
Project: MyProject
Path: /path/to/project

Selected Language Model: gpt-3.5-turbo
Selected RAG Service: OFF

Output Path: /path/to/output

====================================================================================
```
###### Annotations / Comments:
- **Purpose:** This function generates a formatted header string for the FoFo Docs application, including information about the project, version, selected language model, and output path. It uses the `colorize` function to add color to the output.
- **Parameters:** runtimeData: An object containing runtime data for the application, including version, project name, path, selected language model, and output path. This object is defined in the `objectSchemas.ts` file.
- **Returns:** A formatted header string for the FoFo Docs application. The string includes the application header, version, project name, path, selected language model, selected RAG service, and output path. The string is formatted with color using the `colorize` function.
- **Usage Example:** 


```typescript
const runtimeData = {
  appVersion: "1.0.0",
  projectName: "MyProject",
  projectPath: "/path/to/project",
  selectedLLModel: "gpt-3.5-turbo",
  selectedRAGService: "OFF",
  outputPath: "/path/to/output"
};

const header = appHeaderPretty(runtimeData);

console.log(header);
```

- **Dependencies:** The function depends on the `colorize` function from the `shared.ts` file and the `headerColored` constant from the `appData.ts` file.

### 🔧 findCorrectCodeLineForObject - FUNCTION
------------------------------------------------------------
**Description:** This function attempts to find the correct line number in the code for each code object (class, function, variable, etc.). It uses a fuzzy matching approach to find the start line of the code snippet within the entire code.

**Code Snippet:**


```typescript
export function findCorrectCodeLineForObject(codeObj: CodeObject, code: string): CodeObject {
  // Split the entire code into lines
  const codeLines = code.split("\n");

  // Function to find the start line of a code snippet with fuzzy matching
  const findStartLine = (snippetLines: string[], codeLines: string[]): number => {
      for (let i = 0; i < codeLines.length; i++) {
          let match = true;
          for (let j = 0; j < snippetLines.length; j++) {
              if (i + j >= codeLines.length || !codeLines[i + j].includes(snippetLines[j].trim())) {
                  match = false;
                  break;
              }
          }
          if (match) {
              return i + 1; // Line numbers are 1-based
          }
      }
      return -1; // Not found
  };

  // Find the correct code line for each object
  for (const key in codeObj) {
      const codeObject = codeObj as any;
      try {
        for (const objects of codeObject[key]) {
          const obj = objects as CodeObject;
          const codeSnippet = obj.codeSnippet;
          const snippetLines = codeSnippet.split("\n");

          const startLine = findStartLine(snippetLines, codeLines);
          obj.codeLine = startLine !== -1 ? startLine : -2;
      }

      } catch(err) {
          console.error("Error finding correct code line for object", err);
          console.debug("Code Object:", codeObj);
          console.debug("Code Object Key:", codeObject[key]);
          continue
      }
  }
  return codeObj;
}



// Helper Functions Implementation:
```

- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **codeObj** (CodeObject): An object representing a code object (class, function, variable, etc.) with its properties like name, type, description, code snippet, and line number. 
 Example: { name: "myFunction", type: "function", description: "This function does something", codeSnippet: "function myFunction() { ... }", codeLine: 10 }
- **code** (string): The entire code content of the file where the code object is located. 
 Example: const myVar = 10;
function myFunction() { ... }
###### Function Returns:
- **Type:** CodeObject
- **Description:** The updated code object with the correct line number set.
- **Example:** { name: "myFunction", type: "function", description: "This function does something", codeSnippet: "function myFunction() { ... }", codeLine: 10 }
###### Annotations / Comments:
- **Purpose:** The `findCorrectCodeLineForObject` function aims to accurately determine the line number within a code file where each code object (class, function, variable, etc.) is located. It employs a fuzzy matching technique to identify the starting line of the code snippet associated with the object within the entire code content.
- **Parameters:** - `codeObj`: Represents a code object (class, function, variable, etc.) containing properties like name, type, description, code snippet, and line number. An example is: `{ name: "myFunction", type: "function", description: "This function does something", codeSnippet: "function myFunction() { ... }", codeLine: 10 }`.
- `code`: Represents the entire code content of the file where the code object resides. An example is: `const myVar = 10;
function myFunction() { ... }`.
- **Returns:** The function returns the updated code object with the correct line number assigned. For instance: `{ name: "myFunction", type: "function", description: "This function does something", codeSnippet: "function myFunction() { ... }", codeLine: 10 }`.
- **Usage Example:** 


```typescript
const codeObject = { name: "myFunction", type: "function", description: "This function does something", codeSnippet: "function myFunction() { ... }", codeLine: -2 };
const code = "const myVar = 10;
function myFunction() { ... } ";
const updatedCodeObject = findCorrectCodeLineForObject(codeObject, code);
console.log(updatedCodeObject); // Output: { name: "myFunction", type: "function", description: "This function does something", codeSnippet: "function myFunction() { ... }", codeLine: 10 }
```

- **Edge Cases:** The function might not be able to accurately determine the line number if the code snippet is not a perfect match within the code content. This could happen if the code snippet has been modified or if there are similar code snippets in the file.
- **Dependencies:** The function relies on the `CodeObject` interface defined in the `objectSchemas.ts` file.

### 🔧 getFileSizeInKB - FUNCTION
------------------------------------------------------------
**Description:** This function calculates the size of a file in kilobytes (KB) using the fs.stat function.

**Code Snippet:**


```typescript
async function getFileSizeInKB(filePath: string): Promise<number> {
  return await stat(filePath).then((stats) => stats.size / 1024);
}
```

- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **filePath** (string): The path to the file whose size needs to be calculated. 
 Example: /path/to/file.txt
###### Function Returns:
- **Type:** number
- **Description:** The size of the file in kilobytes (KB).
- **Example:** Data Not Available
###### Annotations / Comments:
- **Purpose:** This function calculates the size of a file in kilobytes (KB) using the `fs.stat` function.
- **Parameters:** filePath: string - The path to the file whose size needs to be calculated.
- **Returns:** number - The size of the file in kilobytes (KB).
- **Usage Example:** 


```typescript
const fileSizeKB = await getFileSizeInKB('/path/to/file.txt');
console.log(`File size: ${fileSizeKB} KB`);
```

- **Edge Cases:** If the file does not exist or is inaccessible, the function will throw an error.
- **Dependencies:** fs.stat

### 🔧 isFileTooLarge - FUNCTION
------------------------------------------------------------
**Description:** This function checks if a file is too large based on a given maximum file size in KB and a maximum character limit. It first checks the character count using the getTokens function. If the character count exceeds the limit, it returns true. Otherwise, it calculates the file size in KB and compares it to the maximum file size. If the file size exceeds the limit, it returns true. Otherwise, it returns false.

**Code Snippet:**


```typescript
async function isFileTooLarge(
  filePath: string,
  maxFileSizeKB: number,
  maxChars: number = 300
): Promise<boolean> {
  // Check the amount of characters in the file content
  const file = readFileSync(filePath, "utf-8");
  const tooLong = getTokens(file) > maxChars;

  if (tooLong === true) return true;

  return await getFileSizeInKB(filePath).then((size) => size > maxFileSizeKB);
}
```

- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **filePath** (string): The path to the file to check. 
 Example: /path/to/file.txt
- **maxFileSizeKB** (number): The maximum allowed file size in KB. 
 Example: Data Not Available
- **maxChars** (number): The maximum allowed character count in the file. 
 Example: Data Not Available
###### Function Returns:
- **Type:** boolean
- **Description:** True if the file is too large, false otherwise.
- **Example:** Data Not Available
###### Annotations / Comments:
- **Purpose:** The `isFileTooLarge` function determines if a file exceeds a specified size limit in kilobytes (KB) and a maximum character count. It prioritizes character count checks first, returning `true` if the character limit is exceeded. If the character count is within the limit, it then calculates the file size in KB and compares it to the `maxFileSizeKB` parameter. If the file size exceeds the limit, it returns `true`; otherwise, it returns `false`.
- **Parameters:** - `filePath`: A string representing the path to the file to be checked.
- `maxFileSizeKB`: A number representing the maximum allowed file size in KB.
- `maxChars`: An optional number representing the maximum allowed character count in the file. Defaults to 300.
- **Returns:** A boolean value indicating whether the file is too large (`true`) or not (`false`).
- **Usage Example:** 


```typescript
const isFileTooLargeResult = await isFileTooLarge('/path/to/file.txt', 1024, 500);
console.log(isFileTooLargeResult); // Output: true if the file is too large, false otherwise
```

- **Edge Cases:** None explicitly mentioned in the code. However, potential edge cases could include:
- Handling files with special characters or encoding issues.
- Dealing with files that are larger than the maximum allowed size for the `readFileSync` function.
- **Dependencies:** - `readFileSync` from the `fs` module for reading file contents.
- `getFileSizeInKB` function (presumably defined elsewhere) for calculating file size in KB.
- `getTokens` function (presumably defined elsewhere) for counting characters in the file content.

### 🔧 load_create_collection - FUNCTION
------------------------------------------------------------
**Description:** This function attempts to load an existing ChromaDB collection with the given project name. If the collection doesn't exist, it creates a new one. It uses the ChromaClient to interact with the ChromaDB database.

**Code Snippet:**


```typescript
export async function load_create_collection(
  projectName: string
): Promise<Collection | void> {
  const name = projectName;

  let collection: Collection | void;

  console.log("Loading/Creating Collection: " + name);
  console.log("API URL: " + chromaSettings.path);

  if (chromaSettings.path) {
    const hb = await client.heartbeat().catch((err: any) => {
      console.log("Error connecting to database");
      console.error(err);
    });
  
    console.log("Heartbeat for Database:");
    console.log(hb);
  }
  
  try {
    collection = await client.getOrCreateCollection({
      name: prefix + makeWebSafe(name),
      embeddingFunction: embedder,
    });
    if (collection instanceof Collection && "name" in collection) {
      return collection;
    }
  } catch (err) {
    console.log("Collection not found, attempting to create collection AGAIN");
  }

  collection = await client
    .createCollection({ name:prefix + makeWebSafe(name), embeddingFunction: embedder })
    .catch((err: any) => {
      console.log("Error creating collection");
      console.error(err);
    });

  return collection;
}
```

- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): The name of the project for which the collection is being loaded or created. 
 Example: MyProject
###### Function Returns:
- **Type:** Collection | void
- **Description:** The loaded or created ChromaDB collection, or undefined if an error occurs.
- **Example:** Collection { name: "FOFO-RAG-MyProject", embeddingFunction: GoogleGenerativeAiEmbeddingFunction { googleApiKey: "..." }, ... }
###### Annotations / Comments:
- **Purpose:** This function attempts to load an existing ChromaDB collection with the given project name. If the collection doesn't exist, it creates a new one. It uses the ChromaClient to interact with the ChromaDB database.
- **Parameters:** projectName: string - The name of the project for which the collection is being loaded or created.
- **Returns:** Collection | void - The loaded or created ChromaDB collection, or undefined if an error occurs.
- **Usage Example:** 
```
const collection = await load_create_collection('MyProject');
```
- **Edge Cases:** If the ChromaDB database is unavailable or there is an error connecting to it, the function will return undefined. If the collection cannot be created, the function will also return undefined.
- **Dependencies:** ChromaClient, makeWebSafe, client (ChromaClient instance), prefix (string), embedder (embedding function)

### 🔧 saveToVectorDatabase - FUNCTION
------------------------------------------------------------
**Description:** This function saves code and its associated metadata to a vector database. It uses the ChromaDB client to add the data to the specified collection. The function checks the embedder mode and only proceeds if the embedder is enabled. It also handles the case where the embedder is not initialized.

**Code Snippet:**


```typescript
export async function saveToVectorDatabase(
  projectName: string,
  code: string,
  ragData: RagData
): Promise<boolean> {
  let bOK = false;

  projectName = projectName.replace(/\s*/g, "")

  if (embedderMode === "OFF") {
    console.log("Embedder is off");
    return bOK;
  }

  if (embedderENGINE === "CHROMA_DB") {
    if (!embedder) {
      console.error("Embedder not initialized");
      return bOK;
    }
    

    const meta = ragData.metadata as any;

    const filename = meta.filename;

    delete meta.codeObjects;

    const collection = await load_create_collection(`${projectName}`);

    if (!collection) {
      console.error("Error creating collection");
      return false;
    }

    try {
      const embeddings = await embedder?.generate([code]);
      console.log(embeddings);
  
      const res = await collection.add({
        ids: [`${projectName}-${filename}-${ragData.metadata.codeChunkId}`],
        documents: [code],
        embeddings: embeddings,
        metadatas: [meta],
      });
  
      console.log("Saved to Vector Database:");
      console.log(res);
      bOK = true
    } catch(e:any){
      console.log(e)
    }

  }

  return bOK;
}
```

- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): The name of the project for which the data is being saved. 
 Example: MyProject
- **code** (string): The code snippet to be saved. 
 Example: function myFunction() { ... }
- **ragData** (RagData): An object containing metadata about the code, including filename, chunk ID, line numbers, and code objects. 
 Example: { metadata: { filename: "myFile.ts", codeChunkId: 0, codeChunkLineStart: 1, codeChunkLineEnd: 10, codeObjects: { functions: [ ... ] }, codeChunkSummary: "This chunk defines a function" }, documentData: "function myFunction() { ... }", allSearchResults: { ... }, allResults: { ... } }
###### Function Returns:
- **Type:** boolean
- **Description:** True if the data was successfully saved to the vector database, false otherwise.
- **Example:** Data Not Available
###### Annotations / Comments:
- **Purpose:** The `saveToVectorDatabase` function is responsible for storing code snippets and their associated metadata in a vector database. It utilizes the ChromaDB client to add the data to a collection associated with the specified project name. The function first checks if the embedder mode is enabled. If the embedder is off, it returns false without saving any data. If the embedder is enabled, it checks if the embedder is initialized. If not, it returns false. Otherwise, it proceeds to generate embeddings for the code snippet using the embedder and adds the code, embeddings, and metadata to the ChromaDB collection.
- **Parameters:** - `projectName`: A string representing the name of the project for which the data is being saved.
- `code`: A string containing the code snippet to be saved.
- `ragData`: An object containing metadata about the code, including filename, chunk ID, line numbers, and code objects.
- **Returns:** A boolean value indicating whether the data was successfully saved to the vector database. True if successful, false otherwise.
- **Usage Example:** 


```typescript
const projectName = "MyProject";
const code = "function myFunction() { ... }";
const ragData = { metadata: { filename: "myFile.ts", codeChunkId: 0, codeChunkLineStart: 1, codeChunkLineEnd: 10, codeObjects: { functions: [ ... ] }, codeChunkSummary: "This chunk defines a function" }, documentData: "function myFunction() { ... }", allSearchResults: { ... }, allResults: { ... } };

await saveToVectorDatabase(projectName, code, ragData);
```

- **Edge Cases:** - If the embedder mode is "OFF", the function returns false without saving any data.
- If the embedder is not initialized, the function returns false.
- If there is an error generating embeddings or adding data to the ChromaDB collection, the function returns false.
- **Dependencies:** - `chromadb` library for interacting with the vector database.
- `embedder` object, which is either a `GoogleGenerativeAiEmbeddingFunction` or an `OpenAIEmbeddingFunction`, depending on the embedder mode.

### 🔧 searchRAG - FUNCTION
------------------------------------------------------------
**Description:** This function searches the vector database for relevant code snippets based on a given search string. It uses the ChromaDB client to perform the search. The function checks the embedder mode and only proceeds if the embedder is enabled. It also handles the case where the embedder is not initialized. If an error occurs during the search, it retries the search after a cool down period.

**Code Snippet:**


```typescript
export async function searchRAG(
  projectName: string,
  searchString: string,
  bRetry=true
): Promise<RagData> {
  let ragData: RagData = {} as RagData;

  try {
  if (embedderMode === "OFF") {
    console.log("Embedder is off");
    return ragData;
  }

  if (embedderENGINE === "CHROMA_DB") {
    if (!embedder) {
      console.error("Embedder not initialized");
      return {} as RagData;
    }

    const collection = await load_create_collection(projectName);
    if (!collection) {
      console.error("Error creating collection");
      return {} as RagData;
    }

   
      const searchEmbeddings = await embedder.generate([searchString]);
      const searchResults = await collection.query({
        queryEmbeddings: searchEmbeddings,
      });


    console.log("Search Results for RAG:");
    console.log(searchResults);

    ragData = {
      metadata: (searchResults.metadatas[0] as any) || {},
      embeddings: searchResults.embeddings ? ([0] as any) : {},
      documentData: (searchResults.documents[0] as any) || [],
      allSearchResults: searchResults,
      allResults: {
        documents: searchResults.documents,
        embeddings: searchResults.embeddings,
        metadatas: searchResults.metadatas,
      }
      }
  };
  

  console.log("RAG Data:");
  console.log(ragData);

  return ragData;

} catch (err) {
  console.error("Error searching collection");
  console.error(err);

  if (bRetry === true){
    console.log("Retrying search after cool down period of 30 seconds");
    await new Promise((resolve) => setTimeout(resolve, 30000));
    return await searchRAG(projectName, searchString, false);
  }
  return {} as RagData;
}

}
```

- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): The name of the project for which the search is being performed. 
 Example: MyProject
- **searchString** (string): The search string to be used for querying the vector database. 
 Example: Calculate the sum of two numbers
- **bRetry** (boolean): A flag indicating whether to retry the search if an error occurs. Defaults to true. 
 Example: Data Not Available
###### Function Returns:
- **Type:** RagData
- **Description:** An object containing the search results, including metadata, embeddings, and the retrieved document data.
- **Example:** { metadata: { filename: "myFile.ts", codeChunkId: 0, codeChunkLineStart: 1, codeChunkLineEnd: 10, codeObjects: { functions: [ ... ] }, codeChunkSummary: "This chunk defines a function" }, embeddings: [ ... ], documentData: "function myFunction() { ... }", allSearchResults: { ... }, allResults: { ... } }
###### Annotations / Comments:
- **Purpose:** The `searchRAG` function is responsible for searching the vector database for relevant code snippets based on a given search string. It utilizes the ChromaDB client to execute the search query.
- **Parameters:** - `projectName`: A string representing the name of the project for which the search is being conducted.
- `searchString`: A string containing the search query to be used for querying the vector database.
- `bRetry`: A boolean flag indicating whether to retry the search if an error occurs. Defaults to `true`.
- **Returns:** The function returns a `RagData` object containing the search results. This object includes metadata about the retrieved code snippets, their embeddings, and the actual code snippets themselves. It also provides information about all search results, including their documents, embeddings, and metadatas.
- **Usage Example:** 


```typescript
const searchResults = await searchRAG("MyProject", "Calculate the sum of two numbers");
console.log(searchResults.metadata.filename); // Output: "myFile.ts"
console.log(searchResults.documentData); // Output: "function myFunction() { ... }"
```

- **Edge Cases:** The function handles the case where the embedder is turned off (`embedderMode === "OFF"`) by returning an empty `RagData` object. It also handles the case where the embedder is not initialized by returning an empty `RagData` object. If an error occurs during the search, the function retries the search after a cool down period of 30 seconds. If the retry fails, it returns an empty `RagData` object.
- **Dependencies:** The function depends on the `ChromaDB` client and the `embedder` object, which is responsible for generating embeddings. It also uses the `load_create_collection` function to load or create the collection in the vector database.

### 🔧 removeDoubleQuotesFromBegEnd - FUNCTION
------------------------------------------------------------
**Description:** This function removes double quotes (or single quotes) from the beginning and end of a string. It handles various quote types, including double quotes, single quotes, and curly quotes.

**Code Snippet:**


```typescript
const removeDoubleQuotesFromBegEnd = (str: string) => {
  if (!str) {
    return str;
  }
  if (str.startsWith('"') || str.startsWith("'") || str.startsWith("”") || str.startsWith("“") || str.startsWith("‘") || str.startsWith("’")){
    str = str.slice(1);
  }
  if (str.endsWith('"') || str.endsWith("'") || str.endsWith("”") || str.endsWith("“") || str.endsWith("‘") || str.endsWith("’")){
    str = str.slice(0, -1);
  }
  return str;
}
```

- **Line:** Could Not Verify Line
- **Location:** cli.ts (./src/cli.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **str** (string): The string to be processed. 
 Example: "My String"
###### Function Returns:
- **Type:** string
- **Description:** The string with double quotes (or single quotes) removed from the beginning and end.
- **Example:** My String
###### Annotations / Comments:
- **Purpose:** The `removeDoubleQuotesFromBegEnd` function removes double quotes (or single quotes) from the beginning and end of a string. It handles various quote types, including double quotes, single quotes, and curly quotes.
- **Parameters:** The function takes a single parameter, `str`, which is a string to be processed.
- **Returns:** The function returns the string with double quotes (or single quotes) removed from the beginning and end.
- **Usage Example:** 


```typescript
const myString = "  My String  ";
const cleanedString = removeDoubleQuotesFromBegEnd(myString);
console.log(cleanedString); // Output: My String
```

- **Edge Cases:** If the input string is empty or null, the function returns the input string unchanged.

### 🔧 runAnnotations - FUNCTION
------------------------------------------------------------
**Description:** This function handles the annotation process for code objects. It checks if the annotation flag is set and proceeds if it is. It then attempts to annotate the code objects in the project summary. If a JSON file is provided, it reads the project summary from the file. Otherwise, it uses the provided project summary. After annotation, it saves the updated project summary to the JSON file if one was provided.

**Code Snippet:**


```typescript
const runAnnotations = async (projectSummary?:ProjectSummary) => {
  if (bAnnotate && bAnnotate !== "false") {
    console.log("Annotating code objects...");
    // Annotate code objects
    let jsonData: ProjectSummary;
    if (projectSummary) {
      jsonData = projectSummary;
    } else if
    (jsonFile) {
      jsonData = JSON.parse(fs.readFileSync(jsonFile, "utf-8")) as ProjectSummary;
    } else {
      if (!projectSummary) {
        console.error("Project summary not found!");
        return projectSummary;
      }
      jsonData = projectSummary;
    }

    try {
      projectSummary = await annotateProject(jsonData, outputDir);

      if (jsonFile) {
        fs.writeFileSync(jsonFile, JSON.stringify(projectSummary, null, 4));
      }


 
    } catch (error) {
      console.error("Error during annotation:", error);
    }
    console.log("Annotation complete!");
  }
  return projectSummary;

}
```

- **Line:** Could Not Verify Line
- **Location:** cli.ts (./src/cli.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectSummary** (ProjectSummary): An object containing the project summary, including project name, description, dependencies, code files, and RAG data. 
 Example: { projectName: "MyProject", projectDescription: { goal: "This project does something", features_functions: "It has these features" }, projectLocation: "/path/to/project", projectTechStackDescription: "TypeScript project", projectDependencies: [ ... ], codeFiles: [ ... ], ragData: [ ... ], teamContext: "This is the team context" }
###### Function Returns:
- **Type:** ProjectSummary
- **Description:** The updated project summary with annotated code objects.
- **Example:** { projectName: "MyProject", projectDescription: { goal: "This project does something", features_functions: "It has these features" }, projectLocation: "/path/to/project", projectTechStackDescription: "TypeScript project", projectDependencies: [ ... ], codeFiles: [ ... ], ragData: [ ... ], teamContext: "This is the team context" }
###### Annotations / Comments:
- **Purpose:** The `runAnnotations` function is responsible for annotating code objects within a project. It takes an optional `projectSummary` object as input, which contains information about the project, including code files and their annotations. The function checks if the annotation flag is set and proceeds if it is. It then attempts to annotate the code objects in the project summary. If a JSON file is provided, it reads the project summary from the file. Otherwise, it uses the provided project summary. After annotation, it saves the updated project summary to the JSON file if one was provided.
- **Parameters:** - `projectSummary` (optional): An object containing the project summary, including project name, description, dependencies, code files, and RAG data. This parameter is optional and can be used to provide an existing project summary object. If not provided, the function will attempt to read the project summary from a JSON file.
- **Returns:** - `ProjectSummary`: The updated project summary with annotated code objects. The function returns the updated project summary object, which includes the annotated code objects.
- **Usage Example:** 


```typescript
// Example usage with an existing project summary object
const projectSummary = { ... }; // Existing project summary
const annotatedProjectSummary = await runAnnotations(projectSummary);

// Example usage with a JSON file
const annotatedProjectSummary = await runAnnotations(undefined, "path/to/projectSummary.json");
```

- **Edge Cases:** - If the annotation flag is not set, the function will not annotate any code objects. 
- If the `projectSummary` parameter is not provided and a JSON file is not specified, the function will throw an error. 
- If an error occurs during annotation, the function will log the error and continue processing. 
- If a JSON file is provided and an error occurs while saving the updated project summary, the function will log the error.
- **Dependencies:** - `annotateProject`: This function is responsible for annotating the code objects in the project summary. 
- `fs`: This module is used for reading and writing files. 
- `console`: This module is used for logging messages to the console.

### 🔧 getIgnoredFiles - FUNCTION
------------------------------------------------------------
**Description:** This function attempts to read ignore patterns from .gitignore and .fofoignore files. It checks for these files in the project directory and the current execution directory. If a file is found, it reads its contents and returns an array of ignore patterns. If no files are found, it returns an empty array.

**Code Snippet:**


```typescript
async function getIgnoredFiles(projectPath: string): Promise<string[]> {
  let ignorePatterns: string[] = [];
  const basePath = projectPath.split("/").slice(0, -1).join("/");
  const executionPath = process.cwd();

  console.log("basePath", basePath);
  console.log("executionPath", executionPath);

  // CHECK for these files in order:
  const pathsToCheck = [
    `${basePath}/.gitignore`,
    `${basePath}/.fofoignore`,
    `${executionPath}/.gitignore`,
    `${executionPath}/.fofoignore`,
  ];

  for (const path of pathsToCheck) {
    if (path.includes("fofoignore")) {
      try {
        const fofoignoreContent = await readFile(
          path,
          "utf-8"
        );
        ignorePatterns.push(...fofoignoreContent.split("\n").filter(Boolean));
      } catch (err) {
        // .fofoignore not found, ignore the error
        console.warn("No .fofoignore file found in " + path);
      }
    } else {
      try {
        const gitignoreContent = await readFile(
          path,
          "utf-8"
        );
        ignorePatterns.push(...gitignoreContent.split("\n").filter(Boolean)); // Filter out empty lines
      } catch (err) {
```

- **Line:** Could Not Verify Line
- **Location:** undefined (Unable to Load)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `getIgnoredFiles` function attempts to read ignore patterns from `.gitignore` and `.fofoignore` files. It checks for these files in the project directory and the current execution directory. If a file is found, it reads its contents and returns an array of ignore patterns. If no files are found, it returns an empty array.
- **Parameters:** The function takes a single parameter, `projectPath`, which is a string representing the path to the project directory.
- **Returns:** The function returns a Promise that resolves to an array of strings, representing the ignore patterns found in the `.gitignore` and `.fofoignore` files.
- **Usage Example:** 


```typescript
const ignorePatterns = await getIgnoredFiles('./my-project');
console.log(ignorePatterns); // Output: ['node_modules', 'dist', 'build', ...]
```

- **Edge Cases:** The function handles cases where the `.gitignore` or `.fofoignore` files are not found. In these cases, it logs a warning message and continues execution. It also handles cases where the files contain invalid ignore patterns. In these cases, it logs a warning message and ignores the invalid patterns.
- **Dependencies:** The function depends on the `fs/promises` module for reading files asynchronously.
## variables


### 🧮 runtimeData - VARIABLE
------------------------------------------------------------
**Description:** This variable is likely used to store runtime data for the application, such as the application version, project name, project path, output path, selected language model, and selected RAG service.

**Code Snippet:**
```
import { runtimeData } from "./objectSchemas";
```
- **Line:** 1
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable is used to store runtime data for the application, such as the application version, project name, project path, output path, selected language model, and selected RAG service.
- **Dependencies:** This variable depends on the `objectSchemas` module.

### 🧮 fofoDocsBuiltInGlobSearch - VARIABLE
------------------------------------------------------------
**Description:** This variable is an array of glob patterns that are used to search for dependency files in a project. It includes patterns for common dependency management files across various programming languages.

**Code Snippet:**
```
export const fofoDocsBuiltInGlobSearch = [
```
- **Line:** 7
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines a list of glob patterns used to search for dependency files within a project. It covers common dependency management files across various programming languages.

### 🧮 fofoDocsBuiltInFileSearch - VARIABLE
------------------------------------------------------------
**Description:** This variable is an array of glob patterns that are used to search for source code files in a project. It includes patterns for common file extensions across various programming languages.

**Code Snippet:**
```
export const fofoDocsBuiltInFileSearch = [
```
- **Line:** 93
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines a list of glob patterns used to identify and include source code files from various programming languages during the documentation generation process.
- **Returns:** An array of glob patterns.
- **Usage Example:** 


```typescript
const files = glob.sync(fofoDocsBuiltInFileSearch, { cwd: projectPath });
```

- **Dependencies:** glob

### 🧮 headerColored - VARIABLE
------------------------------------------------------------
**Description:** This variable stores a string representing a colored header for the application, likely used for display purposes.

**Code Snippet:**

const headerColored = colorize(`

- **Line:** 145
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `headerColored` variable stores a string representing a colored header for the application, likely used for display purposes. It is assigned the result of calling the `colorize` function with a string containing the header text and the color 'green'.
- **Usage Example:** 


```typescript
console.log(headerColored);
```

- **Dependencies:** The `headerColored` variable depends on the `colorize` function, which is likely defined elsewhere in the code.

### 🧮 appHeaderPretty - VARIABLE
------------------------------------------------------------
**Description:** This variable is a function that generates a formatted header string for the application, likely used for display purposes.

**Code Snippet:**

export const appHeaderPretty = (runtimeData:runtimeData) => `

- **Line:** 166
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `appHeaderPretty` function generates a formatted header string for the application, likely used for display purposes. It takes a `runtimeData` object as input and returns a string containing the application version, project name, path, selected language model, selected RAG service, and output path.
- **Parameters:** runtimeData: An object containing runtime data for the application, including version, project name, path, selected language model, selected RAG service, and output path.
- **Returns:** A formatted string containing the application header information.
- **Usage Example:** 


```typescript
const runtimeData = {
  appVersion: '1.0.0',
  projectName: 'MyProject',
  projectPath: '/path/to/project',
  outputPath: '/path/to/output',
  selectedLLModel: 'gpt-3.5-turbo',
  selectedRAGService: 'OLLAMA'
};

const header = appHeaderPretty(runtimeData);

console.log(header);
```

- **Dependencies:** The function depends on the `colorize` function from the `shared` module to colorize the output string.

### 🧮 scriptDirectory - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the directory path of the current script.

**Code Snippet:**
```
const scriptDirectory = __dirname;
```
- **Line:** 184
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the directory path of the current script using the `__dirname` global variable.
- **Usage Example:** 


```typescript
// Example usage:
console.log(scriptDirectory); // Output: The directory path of the current script
```


### 🧮 packageJSONpath - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the path to the package.json file.

**Code Snippet:**
```
const packageJSONpath = path.join(scriptDirectory, "../package.json");
```
- **Line:** 185
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the path to the `package.json` file, which is used to retrieve the application's version.
- **Usage Example:** 


```typescript
const packageJSONpath = path.join(scriptDirectory, "../package.json");
const packageJSON = readFileSync(packageJSONpath, "utf-8");
const packageJSONParsed = JSON.parse(packageJSON);
return packageJSONParsed.version;
```

- **Edge Cases:** If the `package.json` file is not found, an error will be thrown.
- **Dependencies:** The `path` and `fs` modules are used to access the file system.

### 🧮 packageJSON - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the content of the package.json file as a string.

**Code Snippet:**
```
const packageJSON = readFileSync(packageJSONpath, "utf-8");
```
- **Line:** 186
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the content of the `package.json` file as a string, which is read using the `readFileSync` function from the `fs` module.
- **Usage Example:** 


```typescript
const packageJSON = readFileSync(packageJSONpath, "utf-8");
```

- **Edge Cases:** If the `package.json` file is not found or cannot be read, an error will be thrown.
- **Dependencies:** The `fs` module is used to read the file.

### 🧮 packageJSONParsed - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the parsed JSON object from the package.json file.

**Code Snippet:**
```
const packageJSONParsed = JSON.parse(packageJSON);
```
- **Line:** 187
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the parsed JSON object from the `package.json` file, which contains metadata about the project, including its dependencies and version.
- **Usage Example:** 


```typescript
const packageJSON = fs.readFileSync(packageJSONpath, "utf-8");
const packageJSONParsed = JSON.parse(packageJSON);
```

- **Edge Cases:** If the `package.json` file is invalid or cannot be read, the `JSON.parse` function will throw an error.
- **Dependencies:** This variable depends on the `fs` module for reading the `package.json` file.

### 🧮 isNoNo - VARIABLE
------------------------------------------------------------
**Description:** This variable is a boolean flag that indicates whether a file should be ignored or not.

**Code Snippet:**
```
let isNoNo = false;
```
- **Line:** 196
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable is a boolean flag that indicates whether a file should be ignored or not. It is used to determine if a file should be processed by the documentation generator.

### 🧮 nonoDirs - VARIABLE
------------------------------------------------------------
**Description:** This variable is an array of directory names that should be ignored when searching for files.

**Code Snippet:**
```
const nonoDirs = [
```
- **Line:** 198
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines an array of directory names that should be excluded when searching for files during the documentation generation process.
- **Usage Example:** 


```typescript
const nonoDirs = [ ... ];
```


### 🧮 noNoKeywords - VARIABLE
------------------------------------------------------------
**Description:** This variable is an array of keywords that should be ignored when searching for files.

**Code Snippet:**
```
const noNoKeywords = [
```
- **Line:** 233
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines an array of keywords that should be ignored when searching for files during the documentation generation process.

### 🧮 isOK - VARIABLE
------------------------------------------------------------
**Description:** This variable is a boolean flag that indicates whether a file should be included or not.

**Code Snippet:**
```
let isOK = true
```
- **Line:** 338
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `isOK` variable is a boolean flag used to determine whether a file should be included in the processing of a codebase. It is set to `true` by default, indicating that the file should be included.
- **Usage Example:** 


```typescript
// Example usage in the `isNoNoFile` function:
function isNoNoFile(file: string, ignoreMeh: string[] = []): boolean {
  let isOK = true;
  // ...
  return isNoNo;
}
```


### 🧮 llmToUse - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the name of the LLM (Large Language Model) to be used for processing the code.

**Code Snippet:**
```
const llmToUse = process.env.LLM_TO_USE || undefined;
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the name of the LLM (Large Language Model) to be used for processing the code. It is set to the value of the environment variable `LLM_TO_USE` if it exists, otherwise it is set to `undefined`.

### 🧮 breakNum - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the maximum number of tokens allowed in a code chunk for processing.

**Code Snippet:**
```
const breakNum = Number(process.env.MAX_TOKEN_SPLIT) || 400;
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `breakNum` variable defines the maximum number of tokens allowed in a code chunk during processing. This is used to break down large code files into smaller, manageable chunks for analysis by the LLM.
- **Usage Example:** 


```typescript
// Example usage within the code:
const codeChunks = breakCodeIntoChunks(fileContent, breakNum);
```

- **Dependencies:** The `breakNum` variable depends on the environment variable `MAX_TOKEN_SPLIT`. If this environment variable is not set, the default value of 400 is used.

### 🧮 rl - VARIABLE
------------------------------------------------------------
**Description:** This variable represents a readline interface, used for prompting the user for input.

**Code Snippet:**
```
const rl = readline.createInterface({
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `rl` variable is declared to create a readline interface, which is used to prompt the user for input in the `promptUser` function.
- **Usage Example:** 


```typescript
const answer = await promptUser("What is your name?");
console.log(`Hello, ${answer}!`);
```

- **Dependencies:** The `readline` module is required for creating the readline interface.

### 🧮 projectSummary - VARIABLE
------------------------------------------------------------
**Description:** This variable stores a ProjectSummary object, which contains information about the project being analyzed, including its name, description, dependencies, files, and other relevant data.

**Code Snippet:**
```
const projectSummary: ProjectSummary = {
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `projectSummary` variable is declared and initialized as an empty `ProjectSummary` object. This object will be populated with information about the project being analyzed, including its name, description, dependencies, files, and other relevant data.
- **Usage Example:** 


```typescript
// Example usage of projectSummary
const projectSummary: ProjectSummary = {
  projectName: 'MyProject',
  projectDescription: {
    goal: 'This project aims to...',
    features_functions: 'It includes features like...'
  },
  projectLocation: '/path/to/project',
  projectTechStackDescription: 'This is a TypeScript project with a React frontend and a Node.js backend.',
  projectDependencies: [],
  codeFiles: [],
  ragData: [],
  teamContext: 'This project is being developed by...'
};
```

- **Dependencies:** The `ProjectSummary` interface is imported from the `objectSchemas` module.

### 🧮 filePaths - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an array of file paths that are to be processed during the code parsing process.

**Code Snippet:**
```
let filePaths: string[] = [];
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `filePaths` variable is declared as an empty array of strings (`string[]`) to store the file paths that will be processed during the code parsing process.

### 🧮 bIsDir - VARIABLE
------------------------------------------------------------
**Description:** This variable is a boolean flag that indicates whether the project path is a directory or a file.

**Code Snippet:**
```
let bIsDir = false
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `bIsDir` variable is a boolean flag used to determine whether the `projectPath` provided to the `parseCodebase` function represents a directory or a file.
- **Usage Example:** 


```typescript
// Example usage in the parseCodebase function:
const projectSummary: ProjectSummary = {
    projectName: projectName,
    projectDescription: {} as codeSummary,
    projectDependencies: [],
    projectLocation: projectPath,
    projectTechStackDescription: "",
    codeFiles: [],
    ragData: [],
    teamContext: "",
  };

  // ...

  if (fs.lstatSync(projectPath).isDirectory()) {
    // ...
    bIsDir = true
  } else {
    // ...
  }
```


### 🧮 filePathsTruncated - VARIABLE
------------------------------------------------------------
**Description:** This variable stores a truncated version of the filePaths array, used for determining the project stack and dependencies.

**Code Snippet:**
```
const filePathsTruncated = filePaths.length > 500 ? filePaths.slice(0, 500) : filePaths;
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `filePathsTruncated` variable is used to store a truncated version of the `filePaths` array. This truncation is done to limit the number of files used for determining the project stack and dependencies, as processing a large number of files can be computationally expensive.
- **Usage Example:** 


```typescript
// Example usage:
const filePaths = ["file1.ts", "file2.js", "file3.py", ...]; // Assume filePaths has more than 500 elements
const filePathsTruncated = filePaths.length > 500 ? filePaths.slice(0, 500) : filePaths;
// filePathsTruncated now contains the first 500 elements of filePaths
```

- **Edge Cases:** If the `filePaths` array has less than or equal to 500 elements, the `filePathsTruncated` variable will be a copy of the entire `filePaths` array.

### 🧮 projectStackLang - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the inferred programming language and technology stack of the project.

**Code Snippet:**
```
const projectStackLang = await infer(
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `projectStackLang` variable stores the inferred programming language and technology stack of the project. It is determined by calling the `infer` function, which uses a large language model (LLM) to analyze the project's files and identify the relevant technologies.
- **Parameters:** The `infer` function takes the following parameters:

- `prompt`: A string containing the prompt for the LLM. In this case, the prompt is generated by the `determineProjectStack` function, which provides a list of project files to the LLM.
- `responseMode`: A string indicating the expected response format from the LLM. In this case, it is set to `"TEXT STRING"`, indicating that the LLM should return a plain text string.
- `responseKey`: An optional string specifying the key for the response. This is not used in this case.
- `bPro`: A boolean indicating whether to use a professional LLM model. This is not used in this case.
- `bRetry`: A boolean indicating whether to retry the LLM call if an error occurs. This is not used in this case.
- `supplementalData`: An optional object containing additional data to be passed to the LLM. This is not used in this case.
- `model`: A string specifying the name of the LLM model to use. This is not used in this case, as the default model is used.
- **Returns:** The `infer` function returns an object containing the LLM's response. In this case, the response is a plain text string describing the inferred programming language and technology stack of the project.
- **Usage Example:** 


```typescript
const projectStackLang = await infer(
  determineProjectStack(filePathsTruncated),
  "TEXT STRING",
  undefined,
  false,
  undefined,
  undefined,
  llmToUse
);
```

- **Edge Cases:** If the LLM is unable to infer the programming language and technology stack, the `projectStackLang` variable will be undefined.
- **Dependencies:** This code depends on the following:

- `infer`: A function that calls an LLM to generate a response based on a given prompt.
- `determineProjectStack`: A function that generates a prompt for the LLM based on a list of project files.

### 🧮 ignoreMeh - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an array of glob patterns that are used to ignore files during the code parsing process.

**Code Snippet:**
```
const ignoreMeh = await getIgnoredFiles(projectPath)
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `ignoreMeh` variable is used to store an array of glob patterns that are used to ignore files during the code parsing process. This is done to prevent the code parser from processing files that are not relevant to the project, such as build artifacts, configuration files, or dependency files.
- **Usage Example:** 


```typescript
const ignoreMeh = await getIgnoredFiles(projectPath);
// Use ignoreMeh to filter files during the glob process
const files = await glob(['**/*.{ts,js,tsx,jsx}', ...fofoDocsBuiltInFileSearch], {
  cwd: projectPath,
  ignore: [...ignorePatterns, ...ignoreMeh],
});
```

- **Dependencies:** The `ignoreMeh` variable depends on the `getIgnoredFiles` function, which reads the `.gitignore` and `.fofoignore` files to determine which files to ignore.

### 🧮 dependencyFiles - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an array of file paths that are related to project dependencies.

**Code Snippet:**
```
const dependencyFiles = await glob(fofoDocsBuiltInGlobSearch, {
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `dependencyFiles` variable stores an array of file paths that are related to project dependencies. These files are identified using glob patterns defined in the `fofoDocsBuiltInGlobSearch` array.
- **Usage Example:** 


```typescript
const dependencyFiles = await glob(fofoDocsBuiltInGlobSearch, {
    cwd:projectPath,
    ignore: ignorePatterns,
  })
  .then((res) => {
    console.log("Dependency Files Found (PRIOR):", res);
    return res.filter((file) => isNoNoFile(file, ignoreMeh) === false);
  });
```

- **Dependencies:** The `dependencyFiles` variable relies on the `glob` function from the `glob` library, which is used to find files matching specific patterns.

### 🧮 depFile - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the full path to a dependency file.

**Code Snippet:**

const depFile = `${projectPath}/${depFileName}`;

- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the full path to a dependency file, combining the project path with the dependency file name.

### 🧮 depFileContent - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the content of a dependency file as a string.

**Code Snippet:**

const depFileContent = await readFile(`${depFile}`, "utf-8");

- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `depFileContent` variable stores the content of a dependency file, such as `package.json`, `requirements.txt`, or `Gemfile`, as a string. This content is then used to extract information about the project's dependencies.
- **Usage Example:** 


```typescript
const depFileContent = await readFile(`${depFile}`, "utf-8");
```

- **Edge Cases:** If the dependency file cannot be read, the variable will be undefined. This could happen if the file does not exist, if the file is not accessible, or if there is an error reading the file.
- **Dependencies:** The `readFile` function from the `fs/promises` module is used to read the dependency file.

### 🧮 relevantPackagesModules - VARIABLE
------------------------------------------------------------
**Description:** This variable stores a moduleObject object, which contains information about a module or package identified in a dependency file.

**Code Snippet:**
```
const relevantPackagesModules = await infer(
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `relevantPackagesModules` variable is declared to store information about a module or package identified in a dependency file. It is assigned the result of an asynchronous function call to `infer`, which likely uses a large language model (LLM) to extract module information from the file contents.
- **Usage Example:** 


```typescript
// Example usage:
const relevantPackagesModules = await infer(determineModulesPackagesFromFile(depFileContent), "JSON object", undefined, false, undefined, undefined, llmToUse);
projectSummary.projectDependencies.push(relevantPackagesModules);
```

- **Edge Cases:** If the `infer` function fails to extract module information from the file contents, the `relevantPackagesModules` variable will be undefined. This could occur if the file format is not recognized by the LLM or if the file contains invalid data.
- **Dependencies:** The `relevantPackagesModules` variable depends on the `infer` function, which likely relies on an LLM and potentially other libraries for parsing and extracting module information.

### 🧮 warnIfOverValue - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the maximum number of files that can be processed before prompting the user for confirmation.

**Code Snippet:**
```
const warnIfOverValue = Number(process.env.WARN_IF_OVER || "100");
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `warnIfOverValue` variable is used to set a threshold for the number of files that can be processed before prompting the user for confirmation. This is a safety measure to prevent the application from processing an excessively large number of files without user consent, which could potentially lead to long processing times or resource exhaustion.
- **Usage Example:** 


```typescript
// Example usage:
const warnIfOverValue = Number(process.env.WARN_IF_OVER || "100");

// If the number of files to process exceeds warnIfOverValue, the user will be prompted for confirmation.
```

- **Edge Cases:** If the environment variable `WARN_IF_OVER` is not set or is invalid, the default value of 100 will be used.
- **Dependencies:** The variable relies on the `process.env` object to access the environment variable `WARN_IF_OVER`.

### 🧮 fullFilePath - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the full path to a file being processed.

**Code Snippet:**

const fullFilePath = `${projectPath}/${filePath}`;

- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the full path to a file being processed. It combines the project path with the file path to create a complete file path.
- **Usage Example:** 


```typescript
const fullFilePath = `${projectPath}/${filePath}`;
```


### 🧮 fileLanguage - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the inferred programming language of a file.

**Code Snippet:**
```
const fileLanguage = await infer(
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `fileLanguage` variable is used to store the inferred programming language of a file. It is determined by calling the `infer` function, which uses a large language model (LLM) to analyze the file's content and identify the language.
- **Usage Example:** 


```typescript
const fileLanguage = await infer(
  getLanguageTypeFromFile(fullFilePath),
  "TEXT STRING",
  "language",
  false,
  undefined,
  undefined,
  llmToUse
);
console.log("fileLanguage", fileLanguage.language);
```

- **Edge Cases:** If the `infer` function fails to identify the language, the `fileLanguage` variable will be set to `undefined`.
- **Dependencies:** The `fileLanguage` variable depends on the `infer` function, which is defined in the `llmInterface` module.

### 🧮 codeFileSummary - VARIABLE
------------------------------------------------------------
**Description:** This variable stores a CodeFileSummary object, which contains information about a specific code file, including its name, location, summary, language, execution flow, and code objects.

**Code Snippet:**
```
const codeFileSummary: CodeFileSummary = {
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `codeFileSummary` variable is declared and initialized as a `CodeFileSummary` object. This object is used to store information about a specific code file, including its name, location, summary, language, execution flow, and code objects.
- **Usage Example:** 


```typescript
const codeFileSummary: CodeFileSummary = {
  fileName: filePath,
  fileLocation: fullFilePath,
  codeSummary: {} as codeSummary, // Placeholder, will be updated later
  language: fileLanguage.language || "Unknown",
  executionFlow: [], // Placeholder, will be updated later
  codeObjects: {} as CodeObject, // Placeholder, will be updated later
};
```

- **Dependencies:** CodeFileSummary, codeSummary, CodeObject

### 🧮 currentLine - VARIABLE
------------------------------------------------------------
**Description:** This variable keeps track of the current line number being processed in a file.

**Code Snippet:**
```
let currentLine = 0;
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `currentLine` variable keeps track of the current line number being processed within a file during code parsing.

### 🧮 fileContent - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the content of a file as a string.

**Code Snippet:**
```
const fileContent = await readFile(fullFilePath, "utf-8");
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `fileContent` variable is declared and assigned the result of reading the content of a file using the `readFile` function from the `fs/promises` module. The `readFile` function takes the file path (`fullFilePath`) and the encoding (`"utf-8"`) as arguments and returns a Promise that resolves to the file content as a string.
- **Usage Example:** 


```typescript
const fileContent = await readFile(fullFilePath, "utf-8");
```

- **Edge Cases:** If the file does not exist or cannot be read, the `readFile` function will throw an error. The code handles this by using the `await` keyword, which will pause execution until the Promise resolves or rejects. If the Promise rejects, the error will be caught and handled accordingly.
- **Dependencies:** The code depends on the `fs/promises` module for the `readFile` function.

### 🧮 codeChunks - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an array of code chunks, created by splitting a large file into smaller segments for processing.

**Code Snippet:**
```
const codeChunks = breakCodeIntoChunks(fileContent, breakNum);
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `codeChunks` variable stores an array of code chunks, which are created by splitting a large file into smaller segments for processing. This is done to handle large files efficiently, as processing them in their entirety can be resource-intensive.
- **Parameters:** The `breakCodeIntoChunks` function takes two parameters:

- `code`: The code string to be split into chunks.
- `chunkSize`: The maximum number of tokens allowed in each chunk. This helps to ensure that each chunk is processed within the token limit of the LLM.
- **Returns:** The `breakCodeIntoChunks` function returns an array of strings, where each string represents a code chunk.
- **Usage Example:** 


```typescript
const codeChunks = breakCodeIntoChunks(fileContent, breakNum);
```

- **Edge Cases:** None specifically mentioned in the code snippet.
- **Dependencies:** The `breakCodeIntoChunks` function relies on the `getTokens` function to estimate the number of tokens in each line of code.

### 🧮 getCurrentLineEndLineBasedOnChunk - VARIABLE
------------------------------------------------------------
**Description:** This variable is a function that calculates the start and end line numbers of a code chunk based on its content.

**Code Snippet:**
```
const getCurrentLineEndLineBasedOnChunk = (chunk: string) => {
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `getCurrentLineEndLineBasedOnChunk` function calculates the starting and ending line numbers of a code chunk within a larger file, taking into account the current line number in the file.
- **Parameters:** The function accepts a single parameter: `chunk`, which is a string representing the code chunk.
- **Returns:** The function returns an object with two properties: `start` and `end`. `start` represents the starting line number of the chunk within the file, and `end` represents the ending line number.
- **Usage Example:** 


```typescript
const chunk = "const myVariable = 'hello world';";
const lineInfo = getCurrentLineEndLineBasedOnChunk(chunk);
console.log(lineInfo); // Output: { start: 10, end: 11 }
```

- **Edge Cases:** The function assumes that the code chunk is a valid string and that the current line number is accurate. If the chunk contains invalid characters or the line number is incorrect, the results may be inaccurate.
- **Dependencies:** The function relies on the `split` method of the string object to split the code chunk into lines.

### 🧮 endLine - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the end line number of a code chunk.

**Code Snippet:**
```
const endLine = getCurrentLineEndLineBasedOnChunk(chunk).end;
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `endLine` variable stores the end line number of a code chunk. It is calculated by calling the `getCurrentLineEndLineBasedOnChunk` function, which takes the current code chunk as input and returns an object containing the start and end line numbers of the chunk.
- **Usage Example:** 


```typescript
const endLine = getCurrentLineEndLineBasedOnChunk(chunk).end;
```

- **Dependencies:** The `endLine` variable depends on the `getCurrentLineEndLineBasedOnChunk` function, which is defined elsewhere in the code.

### 🧮 chunkCodeObjects - VARIABLE
------------------------------------------------------------
**Description:** This variable stores a CodeObject object, which contains information about the code objects identified in a code chunk.

**Code Snippet:**
```
const chunkCodeObjects = await genCodeChunkObj(projectSummary, fullFilePath, chunk)
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `chunkCodeObjects` variable is declared to store the results of the `genCodeChunkObj` function, which analyzes a code chunk and identifies various code objects like classes, functions, variables, types, interfaces, imports, and exports.
- **Usage Example:** 


```typescript
// Example usage within the `parseCodebase` function:
const chunkCodeObjects = await genCodeChunkObj(projectSummary, fullFilePath, chunk);
// ... further processing of chunkCodeObjects
```

- **Dependencies:** The `chunkCodeObjects` variable depends on the `genCodeChunkObj` function, which in turn relies on the `callLLM` function to interact with a language model for code analysis.

### 🧮 codeObjects - VARIABLE
------------------------------------------------------------
**Description:** This variable stores a CodeObject object, which contains information about the code objects identified in a file.

**Code Snippet:**
```
const codeObjects = await genCodeChunkObj(projectSummary, fullFilePath, fileContent)
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `codeObjects` variable is used to store the results of the `genCodeChunkObj` function, which identifies and extracts code objects from a given code chunk. This variable is then used to populate the `codeObjects` property of the `CodeFileSummary` object, which represents a summary of a code file.
- **Usage Example:** 


```typescript
const codeObjects = await genCodeChunkObj(projectSummary, fullFilePath, fileContent);
// Use the codeObjects variable to access the identified code objects
console.log(codeObjects.classes);
```

- **Dependencies:** The `codeObjects` variable depends on the `genCodeChunkObj` function, which in turn depends on the `callLLM` function and the `classesPrompt`, `functionsPrompt`, `variablesPrompt`, `typesPrompt`, `interfacesPrompt`, `importsPrompt`, and `exportsPrompt` functions.

### 🧮 codeDescription - VARIABLE
------------------------------------------------------------
**Description:** This variable stores a string representing a description of the code files in the project.

**Code Snippet:**
```
let codeDescription = '';
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable is used to store a string that will contain a description of the code files in the project. It is initialized as an empty string and will be populated later in the code.
- **Usage Example:** 


```typescript
// Example usage:
codeDescription += `## ${codeFile.fileName}\n`;
codeDescription += codeFile.codeSummary.goal + "\n" + 
codeFile.codeSummary.features_functions + "\n\n";
```


### 🧮 codeLines - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an array of lines from a code snippet.

**Code Snippet:**
```
const codeLines = code.split("
");
```
- **Line:** 185
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `codeLines` variable is declared and assigned the result of splitting the `code` string into an array of lines using the `split()` method with the newline character (`\n`) as the delimiter.
- **Usage Example:** 


```typescript
const code = "line1\nline2\nline3";
const codeLines = code.split("\n");
console.log(codeLines); // Output: ["line1", "line2", "line3"]
```


### 🧮 findStartLine - VARIABLE
------------------------------------------------------------
**Description:** This variable is a function that finds the starting line number of a code snippet within a larger code block.

**Code Snippet:**
```
const findStartLine = (snippetLines: string[], codeLines: string[]): number => {
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `findStartLine` function is designed to locate the starting line number of a code snippet within a larger code block. It takes two arrays of strings as input: `snippetLines` representing the lines of the code snippet and `codeLines` representing the lines of the entire code block.
- **Parameters:** - `snippetLines`: An array of strings representing the lines of the code snippet to be searched for.
- `codeLines`: An array of strings representing the lines of the entire code block where the snippet might be found.
- **Returns:** The function returns an integer representing the starting line number of the code snippet within the larger code block. If the snippet is not found, it returns -1.
- **Usage Example:** 


```typescript
const codeLines = ['const a = 1;', 'const b = 2;', 'const c = a + b;'];
const snippetLines = ['const b = 2;'];
const startLine = findStartLine(snippetLines, codeLines);
console.log(startLine); // Output: 2
```

- **Edge Cases:** The function assumes that the code snippet is present within the larger code block. If the snippet is not found, it returns -1. The function also assumes that the code snippet is a contiguous block of lines within the larger code block. If the snippet is split across multiple non-contiguous blocks, the function will not find it.
- **Dependencies:** None

### 🧮 match - VARIABLE
------------------------------------------------------------
**Description:** This variable is a boolean flag that indicates whether a match has been found between a code snippet and a larger code block.

**Code Snippet:**
```
let match = true;
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `match` variable is a boolean flag used to track whether a match has been found during a code comparison process. It is initialized to `true` and likely used to indicate a successful match until a condition is met that would change its value to `false`.
- **Usage Example:** 


```typescript
let match = true;
// ... code that checks for a match
if (conditionThatIndicatesNoMatch) {
  match = false;
}
// ... code that uses the match flag
```


### 🧮 startLine - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the starting line number of a code snippet within a larger code block.

**Code Snippet:**
```
const startLine = findStartLine(snippetLines, codeLines);
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `startLine` variable is declared and assigned the result of calling the `findStartLine` function, which determines the starting line number of a code snippet within a larger code block.
- **Dependencies:** The `startLine` variable depends on the `findStartLine` function, which is defined elsewhere in the code.

### 🧮 basePath - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the base path of the project, excluding the last directory.

**Code Snippet:**
```
const basePath = projectPath.split("/").slice(0, -1).join("/");
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the base path of the project, excluding the last directory. It is used to determine the location of files within the project.

### 🧮 executionPath - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the current working directory of the application.

**Code Snippet:**
```
const executionPath = process.cwd();
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the current working directory of the application.

### 🧮 pathsToCheck - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an array of file paths that are checked for ignore patterns.

**Code Snippet:**
```
const pathsToCheck = [
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines an array of file paths that are checked for ignore patterns during codebase parsing.

### 🧮 fofoignoreContent - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the content of a .fofoignore file as a string.

**Code Snippet:**
```
const fofoignoreContent = await readFile(
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `fofoignoreContent` variable is used to store the content of a `.fofoignore` file, which is a custom file used to specify files and directories that should be ignored during the documentation generation process.
- **Usage Example:** 


```typescript
const fofoignoreContent = await readFile(
  path,
  "utf-8"
);
ignorePatterns.push(...fofoignoreContent.split("\n").filter(Boolean));
```

- **Edge Cases:** If the `.fofoignore` file is not found, the code will log a warning and continue without using the file's contents.
- **Dependencies:** The code depends on the `fs` module for file system operations and the `readFile` function for reading the file content.

### 🧮 gitignoreContent - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the content of a .gitignore file as a string.

**Code Snippet:**
```
const gitignoreContent = await readFile(
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `gitignoreContent` variable is declared to store the content of a `.gitignore` file, which is read asynchronously using the `readFile` function.
- **Usage Example:** 


```typescript
const gitignoreContent = await readFile('./.gitignore', 'utf-8');
// Use gitignoreContent to access the content of the .gitignore file
```

- **Edge Cases:** If the `.gitignore` file is not found, the `readFile` function will throw an error. The code should handle this error appropriately.
- **Dependencies:** The code depends on the `fs/promises` module for asynchronous file reading.

### 🧮 size - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the size of a file in kilobytes.

**Code Snippet:**
```
return await getFileSizeInKB(filePath).then((size) => size > maxFileSizeKB);
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `size` variable stores the size of a file in kilobytes. It is used in the `isFileTooLarge` function to determine if a file is larger than a specified maximum size.
- **Usage Example:** 


```typescript
const maxFileSizeKB = 1024; // 1MB
const filePath = './myFile.txt';
const isTooLarge = await isFileTooLarge(filePath, maxFileSizeKB);
```

- **Dependencies:** The `size` variable depends on the `getFileSizeInKB` function, which uses the `fs/promises` module to read file statistics.

### 🧮 file - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the content of a file as a string.

**Code Snippet:**
```
const file = readFileSync(filePath, "utf-8");
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `file` variable is declared and assigned the result of calling the `readFileSync` function, which reads the contents of a file specified by the `filePath` variable and returns the content as a string.
- **Usage Example:** 


```typescript
const filePath = './myFile.txt';
const file = readFileSync(filePath, 'utf-8');
console.log(file); // Output: The content of myFile.txt
```

- **Edge Cases:** If the file does not exist or cannot be read, the `readFileSync` function will throw an error.
- **Dependencies:** The `readFileSync` function is part of the `fs` (filesystem) module in Node.js.

### 🧮 tooLong - VARIABLE
------------------------------------------------------------
**Description:** This variable is a boolean flag that indicates whether the file content exceeds the maximum allowed character limit.

**Code Snippet:**
```
const tooLong = getTokens(file) > maxChars;
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable checks if the file content exceeds the maximum allowed character limit (maxChars).
- **Dependencies:** getTokens function

### 🧮 apiPass - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the API password for accessing the ChromaDB database.

**Code Snippet:**
```
const apiPass = process.env.API_PASS;
```
- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `apiPass` variable stores the API password for accessing the ChromaDB database. It is retrieved from the environment variable `API_PASS` using `process.env.API_PASS`. This password is used for authentication when connecting to the ChromaDB database.
- **Dependencies:** The code depends on the `dotenv` package to load environment variables.

### 🧮 apiUser - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the API username for accessing the ChromaDB database.

**Code Snippet:**
```
const apiUser = process.env.API_USER;
```
- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `apiUser` variable stores the API username used to authenticate with the ChromaDB database. It retrieves the username from the environment variable `API_USER`.
- **Dependencies:** The code depends on the `process.env` object to access environment variables.

### 🧮 geminiKey - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the API key for accessing the Google Generative AI service.

**Code Snippet:**
```
const geminiKey = process.env.GEMINI_KEY;
```
- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the API key for accessing the Google Generative AI service, which is used for embedding text into vectors for use with ChromaDB.
- **Dependencies:** process.env.GEMINI_KEY

### 🧮 apiURL - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the URL of the ChromaDB database.

**Code Snippet:**
```
const apiURL = process.env.API_URL || "http://localhost:8000";
```
- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `apiURL` variable defines the URL of the ChromaDB database. It uses the environment variable `API_URL` if it's set, otherwise defaults to `http://localhost:8000`.
- **Dependencies:** The code depends on the `process.env` object to access environment variables.

### 🧮 embedderMode - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the mode of the embedder, which determines how embeddings are generated.

**Code Snippet:**
```
const embedderMode = process.env.EMBEDDER_MODE || "OFF";
```
- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `embedderMode` variable is used to control the mode of the embedder, which determines how embeddings are generated for code snippets. It is set to the value of the environment variable `EMBEDDER_MODE`, defaulting to "OFF" if the environment variable is not set.
- **Usage Example:** 


```typescript
// Set the embedder mode to "GCP" in the environment variables
process.env.EMBEDDER_MODE = "GCP";

// The embedderMode variable will be set to "GCP"
const embedderMode = process.env.EMBEDDER_MODE || "OFF";
```

- **Edge Cases:** If the `EMBEDDER_MODE` environment variable is not set, the `embedderMode` variable will default to "OFF", disabling embedding generation.
- **Dependencies:** The `embedderMode` variable depends on the `process.env.EMBEDDER_MODE` environment variable.

### 🧮 embedderENGINE - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the engine used for embedding, such as ChromaDB.

**Code Snippet:**
```
const embedderENGINE = process.env.EMBEDDER_ENGINE || "CHROMA_DB";
```
- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `embedderENGINE` variable stores the name of the engine used for embedding code snippets. It defaults to "CHROMA_DB" if the environment variable `EMBEDDER_ENGINE` is not set.
- **Dependencies:** The `embedderENGINE` variable depends on the environment variable `EMBEDDER_ENGINE`.

### 🧮 embedder - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the embedder object, which is used to generate embeddings for code snippets.

**Code Snippet:**
```
let embedder:
```
- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `embedder` variable is declared to store an embedding function object. This function is used to generate numerical representations (embeddings) of text data, which are then used by the vector database (ChromaDB) for similarity search and retrieval.
- **Dependencies:** The `embedder` variable depends on the `GoogleGenerativeAiEmbeddingFunction`, `OpenAIEmbeddingFunction`, or `undefined` based on the `embedderMode` environment variable.

### 🧮 chromaSettings - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the settings for connecting to the ChromaDB database.

**Code Snippet:**
```
let chromaSettings:any = {
```
- **Line:** Could Not Verify Line
- **Location:** undefined (Unable to Load)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This variable stores the settings for connecting to the ChromaDB database. It includes the path to the database server and authentication credentials.
- **Dependencies:** ChromaDB library
## types


### 🏷️ CodeObjectType - TYPE
------------------------------------------------------------
**Description:** Type definition for CodeObjectType object.

**Code Snippet:**


```typescript
CodeObjectType
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type defines the possible types of code objects that can be identified and annotated in the codebase.
- **Usage Example:** 


```typescript
const codeObjectType: CodeObjectType = 'class';
```


### 🏷️ CodeObjects - TYPE
------------------------------------------------------------
**Description:** Type definition for CodeObjects object.

**Code Snippet:**


```typescript
CodeObjects
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObjects` type defines a union of string literals representing the keys used to access arrays of code objects within the `CodeObject` interface.
- **Usage Example:** 


```typescript
const codeObjects: CodeObjects = 'classes';
```


### 🏷️ llmBackendMode - TYPE
------------------------------------------------------------
**Description:** Type definition for llmBackendMode object.

**Code Snippet:**


```typescript
llmBackendMode
```

- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type definition defines the possible values for the `llmBackendMode` variable, which represents the backend platform used for the large language model (LLM).
- **Usage Example:** 


```typescript
const backend: llmBackendMode = 'OLLAMA';
```


### 🏷️ llmModel - TYPE
------------------------------------------------------------
**Description:** Type definition for llmModel object.

**Code Snippet:**


```typescript
llmModel
```

- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type definition defines the structure of an object representing a Large Language Model (LLM).
- **Usage Example:** 


```typescript
const myModel: llmModel = {
  name: "gpt-3.5-turbo",
  model: "gpt-3.5-turbo",
  backend: "OPENAI"
};
```

## imports


### 📥 runtimeData - IMPORT
------------------------------------------------------------
**Description:** Imports the runtimeData interface from the objectSchemas module.

**Code Snippet:**
```
import { runtimeData } from "./objectSchemas";
```
- **Line:** 1
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `runtimeData` interface from the `objectSchemas` module. This interface is used to store runtime data for the FoFo Docs application, such as the application version, project name, project path, output path, selected language model, and selected RAG service.
- **Dependencies:** objectSchemas module

### 📥 readFileSync - IMPORT
------------------------------------------------------------
**Description:** Imports the readFileSync function from the fs module.

**Code Snippet:**
```
import { readFileSync } from "fs";
```
- **Line:** 2
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `readFileSync` function from the `fs` module, which is used to read the contents of a file synchronously.
- **Parameters:** None
- **Returns:** None
- **Usage Example:** 


```typescript
const fileContent = fs.readFileSync("path/to/file.txt", "utf-8");
```

- **Edge Cases:** If the file does not exist or cannot be read, an error will be thrown.
- **Dependencies:** fs module

### 📥 path - IMPORT
------------------------------------------------------------
**Description:** Imports the path module.

**Code Snippet:**
```
import path from "path";
```
- **Line:** 3
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `path` module, which provides utilities for working with file and directory paths.
- **Dependencies:** path module

### 📥 colorize - IMPORT
------------------------------------------------------------
**Description:** Imports the colorize function from the shared module.

**Code Snippet:**
```
import { colorize } from "./shared";
```
- **Line:** 4
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `colorize` function from the `shared` module.
- **Dependencies:** The `colorize` function is defined in the `shared` module.

### 📥 logger - IMPORT
------------------------------------------------------------
**Description:** Imports the logger module.

**Code Snippet:**
```
import "./logger";
```
- **Line:** 5
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `logger` module, which is likely responsible for logging messages and events within the application.
- **Dependencies:** logger module
## exports


### 📤 fofoDocsBuiltInGlobSearch - EXPORT
------------------------------------------------------------
**Description:** An array of glob patterns that match common dependency management files across various programming languages.

**Code Snippet:**


```typescript
export const fofoDocsBuiltInGlobSearch = [
    // TypeScript / Node.js / JS
    "package.json",
    "**/package.json",
    "**/**/package.json",

    // Python
    "**/requirements.txt",
    "**/**/requirements.txt",
    "**/Pipfile",
    "**/**/Pipfile",
    
    // Ruby
    "**/Gemfile",
    "**/**/Gemfile",
    
    // Java
    "**/pom.xml",
    "**/**/pom.xml",

    // Swift
    "**/Podfile",
    "**/**/Podfile",

    // C#
    "**/packages.config",
    "**/**/packages.config",

    // C++
    "**/CMakeLists.txt",
    "**/**/CMakeLists.txt",

    // Kotlin
    "**/build.gradle",
    "**/**/build.gradle",

    // Go
    "**/go.mod",
    "**/**/go.mod",

    // PHP
    "**/composer.json",
    "**/**/composer.json",

    // Rust
    "**/Cargo.toml",
    "**/**/Cargo.toml",

    // Dart
    "**/pubspec.yaml",
    "**/**/pubspec.yaml",

    // Scala
    "**/build.sbt",
    "**/**/build.sbt",

    // Haskell
    "**/stack.yaml",
    "**/**/stack.yaml",

    // Lua
    "**/rockspec",
    "**/**/rockspec",

    // Erlang
    "**/rebar.config",
    "**/**/rebar.config",

    // Elixir
    "**/mix.exs",
    "**/**/mix.exs",

    // Julia
    "**/Project.toml",
    "**/**/Project.toml",

    // R
    "**/DESCRIPTION",
    "**/**/DESCRIPTION",

    // Golang
    "**/go.mod",
    "**/**/go.mod",
    
];
```

- **Line:** 7
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This exported constant defines an array of glob patterns that are used to identify common dependency management files across various programming languages. These patterns are used to locate files like `package.json`, `requirements.txt`, `Gemfile`, `pom.xml`, etc., which are typically used to manage project dependencies.
- **Returns:** An array of glob patterns.
- **Usage Example:** 


```typescript
// Example usage in a function to find dependency files
function findDependencyFiles(projectPath: string) {
  const dependencyFiles = glob.sync(fofoDocsBuiltInGlobSearch, { cwd: projectPath });
  // Process the found dependency files
}
```

- **Dependencies:** The code relies on the `glob` library for pattern matching.

### 📤 fofoDocsBuiltInFileSearch - EXPORT
------------------------------------------------------------
**Description:** An array of glob patterns that match common source code file extensions across various programming languages.

**Code Snippet:**


```typescript
export const fofoDocsBuiltInFileSearch = [
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx",
    "**/*.swift",
    "**/*.java",
    "**/*.py",
    "**/*.go",
    "**/*.rb",
    "**/*.php",
    "**/*.cs",
    "**/*.cpp",
    "**/*.c",
    "**/*.h",
    "**/*.hpp",
    "**/*.m",
    "**/*.mm",
    "**/*.kt",
    "**/*.kts",
    "**/*.sql",
    "**/*.r",
    "**/*.scala",
    "**/*.sh",
    "**/*.bat",
    "**/*.cmd",
    "**/*.rs",
    "**/*.dart",
    "**/*.erl",
    "**/*.ex",
    "**/*.exs",
    "**/*.hs",
    "**/*.jl",
    "**/*.lua",
  
    "**/*.pl",
    "**/*.pm",
    "**/*.r",
    "**/*.tcl",
    "**/*.vb",
    "**/*.vbs",
    "**/*.xml",
    "**/*.html",
    "**/*.css",
    "**/*.scss",
    "**/*.sass",
    "**/*.less",
    "**/*.yaml",
    "**/*.yml",
    "**/*.json"
]
```

- **Line:** 93
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object defines an array of glob patterns that match common source code file extensions across various programming languages. This array is used to identify relevant files for documentation generation.
- **Returns:** An array of glob patterns.
- **Usage Example:** 


```typescript
const files = glob.sync(fofoDocsBuiltInFileSearch, { cwd: 'path/to/project' });
```

- **Dependencies:** glob

### 📤 appHeaderPretty - EXPORT
------------------------------------------------------------
**Description:** A function that returns a formatted string representing the header of the FoFo Docs application.

**Code Snippet:**


```typescript
export const appHeaderPretty = (runtimeData:runtimeData) => `

${headerColored}

Version: ${colorize(runtimeData.appVersion, 'blue')}
Project: ${colorize(runtimeData.projectName, 'magenta')}
Path: ${colorize(runtimeData.projectPath, 'magenta')}

Selected Language Model: ${colorize(runtimeData.selectedLLModel || 'Undefined', 'yellow')}
Selected RAG Service: ${colorize(runtimeData.selectedRAGService, 'yellow')}

Output Path: ${colorize(runtimeData.outputPath, 'green')}

====================================================================================
`
```

- **Line:** 166
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `appHeaderPretty` function takes a `runtimeData` object as input and returns a formatted string representing the header of the FoFo Docs application. This header includes information about the application version, project name, project path, selected language model, selected RAG service, and output path.
- **Parameters:** runtimeData: An object containing runtime data for the FoFo Docs application. This object includes properties like `appVersion`, `projectName`, `projectPath`, `selectedLLModel`, `selectedRAGService`, and `outputPath`.
- **Returns:** A formatted string representing the header of the FoFo Docs application. The string includes information about the application version, project name, project path, selected language model, selected RAG service, and output path. The string is formatted using ANSI color codes for better readability.
- **Usage Example:** 


```typescript
const runtimeData = {
  appVersion: '1.0.0',
  projectName: 'MyProject',
  projectPath: '/path/to/project',
  selectedLLModel: 'gpt-3.5-turbo',
  selectedRAGService: 'ON',
  outputPath: '/path/to/output'
};

const header = appHeaderPretty(runtimeData);
console.log(header);
```

- **Dependencies:** The function depends on the following external libraries:
- `colorize` function from the `shared.ts` file
- `headerColored` constant from the `appData.ts` file

### 📤 parseCodebase - EXPORT
------------------------------------------------------------
**Description:** A function that parses a codebase, extracting information about files, dependencies, and code objects.

**Code Snippet:**


```typescript
export async function parseCodebase(
  projectPath: string,
  projectName: string
): Promise<ProjectSummary> {
  const projectSummary: ProjectSummary = {
    projectName: projectName,
    projectDescription: {} as codeSummary,
    projectDependencies: [],
    projectLocation: projectPath,
    projectTechStackDescription: "",
    codeFiles: [],
    ragData: [],
    teamContext: "",
  };

  // Clean projectPath of any trailing slashes or '"' characters
  projectPath = projectPath.replace(/\$/, "");
  projectPath = projectPath.replace(/\\$/g, "");
  projectPath = projectPath.replace(/"/g, "");

  const ignorePatterns = [
    "**/node_modules",
    "node_modules",
    "dist",
    "*/node_modules/**",
    "*/dist/**",
    "node_modules/**",
    "dist/**",
    ...(await getIgnoredFiles(projectPath)),
  ];

  projectSummary.teamContext = getContextFromFile(); 
  console.log("Team/Project Context:
", projectSummary.teamContext)

  let filePaths: string[] = [];
  let bIsDir = false
  // Determine if the projectPath is a directory or a file

  if (fs.lstatSync(projectPath).isDirectory()) {

    filePaths = await glob(["**/*", "*"], {
      cwd: projectPath,
      ignore: ignorePatterns,
    });
    bIsDir = true
  } else {
    const file = projectPath.split("/").pop();
    projectPath = projectPath.split("/").slice(0, -1).join("/");

    if (!file) {
      throw new Error("Invalid file path");
    }
    filePaths = [file];
  }

  // Determine the general information about the project, and determine if there are any package dependencies, etc:
  if (bIsDir === true) {
  const filePathsTruncated = filePaths.length > 500 ? filePaths.slice(0, 500) : filePaths;
  console.log("===> Determining Project Stack and Dependencies:

");
  console.log("Files to Determine Stack:", filePathsTruncated.length);
  //console.debug(filePathsTruncated)
  const projectStackLang = await infer(
    determineProjectStack(filePathsTruncated),
    "TEXT STRING",
    undefined,
    false,
    undefined,
    undefined,
    llmToUse
  ) as any;

  projectSummary.projectTechStackDescription = projectStackLang.response;

  console.log("Project Stack Language:", projectStackLang.response);

  // const associatedDependencyFiles = await infer(
  //   getPackageDependenciesBasedOnLanguage(projectStackLang.response),
  //   "JSON object",
  //   undefined,
  //   false,
  //   undefined,
  //   undefined,
  //   llmToUse
  // ) as globResult;

  // const detectedGlobs = await infer(
  //   getGlobsBasedOnLangStack(projectStackLang.response),
  //   "JSON object",
  //   undefined,
  //   false,
  //   undefined,
  //   undefined,
  //   llmToUse
  // ) as globResult;

  // console.log("Detected Globs:", detectedGlobs.glob);
  // console.log("Detected Ignore Patterns:", detectedGlobs.ignore);
  // Search for the specific files the LLM decided we should look for:

  // Update Files Paths to Include LLM Result:
  const ignoreMeh = await getIgnoredFiles(projectPath)
  filePaths = await glob(["**/*.{ts,js,tsx,jsx}", ...fofoDocsBuiltInFileSearch], {
    cwd: projectPath,
    ignore: [...ignorePatterns],
  }).then((res) => {
    console.log("All Files LEN:", res.length);
    return res.filter((file) => isNoNoFile(file) === false);
  });

  console.log(filePaths)
  console.log("POST Filter Files to Process LEN:", filePaths.length);

  console.log("Searching for Dependency Files:", fofoDocsBuiltInGlobSearch)
  console.log("Ignoring Files:", ignorePatterns)

  const dependencyFiles = await glob(fofoDocsBuiltInGlobSearch, {
    cwd:projectPath,
    ignore: ignorePatterns,
  })
  .then((res) => {
    console.log("Dependency Files Found (PRIOR):", res);
    return res.filter((file) => isNoNoFile(file, ignoreMeh) === false);
  });

  console.log("Dependency Files Found:", dependencyFiles);

  // Process each dependency file:
  for (const depFileName of dependencyFiles) {
    const depFile = `${projectPath}/${depFileName}`;
    console.log("Processing Dependency File:", depFile);
    const depFileContent = await readFile(`${depFile}`, "utf-8");
    const relevantPackagesModules = await infer(
      determineModulesPackagesFromFile(depFileContent),
      "JSON object",
      undefined,
      false,
      undefined,
      undefined,
      llmToUse
    ) as moduleObject;

    projectSummary.projectDependencies.push(relevantPackagesModules);
  }

  // if the result array is nested, or it is an array of arrays, we need to flatten it
  projectSummary.projectDependencies = projectSummary.projectDependencies.flat(1);

}

console.log(filePaths)
  // Process Each File!
  console.log("===> Processing Code Files:

");
  console.log("Files to Process:", filePaths.length);
  
  // pause for a moment so user can see
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const warnIfOverValue = Number(process.env.WARN_IF_OVER || "100");
  console.log("Warn if over value:", warnIfOverValue);

  if (filePaths.length === 0) {
    console.log("No files to process, exiting...");
    return projectSummary;
  }

  if (filePaths.length > warnIfOverValue) {
    console.warn("Warning: Large number of files to process, this may take a while...");

    // Prompt to see if they want to continue:
    const bContinue = await promptUser("Continue processing files? (y/n): ") as string;
    if (bContinue?.toLocaleLowerCase() !== "y") {
      console.log("Exiting...");
      return projectSummary;
    } else {
      console.log("ALRIGHT, LET'S CONTINUE...");
    }
  }

  for (const filePath of filePaths) {
    console.log(`Parsing file: ${filePath}`);
    const fullFilePath = `${projectPath}/${filePath}`;

    const fileLanguage = await infer(
      getLanguageTypeFromFile(fullFilePath),
      "TEXT STRING",
      "language",
      false,
      undefined,
      undefined,
      llmToUse
    );
    console.log("fileLanguage", fileLanguage.language);
    const codeFileSummary: CodeFileSummary = {
      fileName: filePath,
      fileLocation: fullFilePath,
      codeSummary: {} as codeSummary, // Placeholder, will be updated later
      language: fileLanguage.language || "Unknown",
      executionFlow: [], // Placeholder, will be updated later
      codeObjects: {} as CodeObject, // Placeholder, will be updated later
    };
    let currentLine = 0;

    if ((await isFileTooLarge(fullFilePath, 3000, breakNum)) == true) {
      // 750KB is the default limit
      // Handle large files by breaking into chunks and processing separately
      const fileContent = await readFile(fullFilePath, "utf-8");
      const codeChunks = breakCodeIntoChunks(fileContent, breakNum); // 1000 tokens per chunk
      const getCurrentLineEndLineBasedOnChunk = (chunk: string) => {
        const lines = chunk.split("\n");
        return {
          start: currentLine,
          end: currentLine + lines.length,
        };
      };
      console.log("Code broken into codeChunks length =", codeChunks.length);
      for (const [index, chunk] of codeChunks.entries()) {
        console.log(
          "Processing chunk:",
          index + 1,
          "of ",
          codeChunks.length,
          " chunks for file ",
          filePath
        );
        const endLine = getCurrentLineEndLineBasedOnChunk(chunk).end;

        const chunkCodeObjects = await genCodeChunkObj(projectSummary, fullFilePath, chunk)
        .then(
          (res) => {

            try {
              const codeLineUpdatedObject =  findCorrectCodeLineForObject(res, chunk)
              if (codeLineUpdatedObject.codeLine){
                codeLineUpdatedObject.codeLine = codeLineUpdatedObject.codeLine + currentLine
                return codeLineUpdatedObject 
              }
            } catch (err) {
              console.error("Error finding correct code line for object", err);
          }
          return res
        });

        // Update the Data with correct line information:
        
        const ragData: RagData = {
          metadata: {
            filename: fullFilePath,
            codeChunkId: index,
            codeChunkLineStart: currentLine,
            codeChunkLineEnd: endLine,
            codeObjects: chunkCodeObjects,
            codeChunkSummary: chunkCodeObjects.description,
          },
          documentData: chunk,
          allSearchResults: {
            ids: [],
            embeddings: null,
            documents: [],
            metadatas: [],
            distances: null
          },
          allResults: {
            documents: undefined,
            embeddings: null,
            metadatas: []
          }
        };

        projectSummary.ragData.push(ragData);

        codeFileSummary.codeObjects = mergeObjectArrays(
          codeFileSummary.codeObjects,
          chunkCodeObjects
        );
        codeFileSummary.codeSummary = await getCodeSummaryFromLLM(
          chunk,
          llmToUse
        );

        await saveToVectorDatabase(projectName, chunk, ragData);

        currentLine = endLine;
      }
    } else {
      const fileContent = await readFile(fullFilePath, "utf-8");
      const codeObjects = await genCodeChunkObj(projectSummary, fullFilePath, fileContent)
      .then(
        (res) => {

          try {
            const codeLineUpdatedObject =  findCorrectCodeLineForObject(res, fileContent)
            return codeLineUpdatedObject 

          } catch (err) {
            console.error("Error finding correct code line for object", err);
            
        }
        return res
      });
      // Process code objects and update projectSummary and codeFiles

      // Process each chunk's code objects (update projectSummary.ragData, etc.)
      const ragData: RagData = {
        metadata: {
          filename: fullFilePath,
          codeChunkId: 0,
          codeChunkLineStart: 1,
          codeChunkLineEnd: getTotalLines(fileContent),
          codeObjects: codeObjects,
          codeChunkSummary: codeObjects.description,
        },
        documentData: fileContent,
        allSearchResults: {
          ids: [],
          embeddings: null,
          documents: [],
          metadatas: [],
          distances: null
        },
        allResults: {
          documents: undefined,
          embeddings: null,
          metadatas: []
        }
      };

      projectSummary.ragData.push(ragData); 

      await saveToVectorDatabase(projectName, fileContent, ragData);

      codeFileSummary.codeObjects = mergeObjectArrays(
        codeFileSummary.codeObjects,
        codeObjects
      );
      codeFileSummary.codeSummary = await getCodeSummaryFromLLM(
        fileContent,
        llmToUse
      );
    }

    // WE need to define the overall execution flow here, with another LLM call?

    projectSummary.codeFiles.push(codeFileSummary);
  }

  let codeDescription = '';
    for (const codeFile of projectSummary.codeFiles) {

        codeDescription += `## ${codeFile.fileName}
`;
        codeDescription += codeFile.codeSummary.goal + "\n" + 
        codeFile.codeSummary.features_functions + "\n\n";
    }
  projectSummary.projectDescription = 
    await getCodeSummaryFromLLM(
      "# Summaries of Code Files: \n" + codeDescription,
      llmToUse
    )
  

  return projectSummary;
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `parseCodebase` function is responsible for analyzing a codebase, extracting key information, and preparing it for documentation generation. It iterates through files, identifies the project's technology stack, and extracts code objects like classes, functions, and variables.
- **Parameters:** - `projectPath`: A string representing the path to the codebase to be analyzed. It can be a directory or a single file.
- `projectName`: A string representing the name of the project.
- **Returns:** The function returns a `ProjectSummary` object, which contains a comprehensive summary of the codebase. This object includes information about the project's name, description, dependencies, technology stack, code files, and extracted code objects.
- **Usage Example:** 


```typescript
const projectSummary = await parseCodebase('./my-project', 'My Project');
```

- **Edge Cases:** - The function handles large files by breaking them into chunks and processing them separately. This helps to prevent memory issues and improve performance.
- It also includes logic to handle potential errors, such as invalid file paths or rate limits from the LLM.
- **Dependencies:** - `glob`: A library for finding files matching specific patterns.
- `fs/promises`: A library for file system operations.
- `objectSchemas`: A module defining data structures for representing codebase information.
- `llmInterface`: A module for interacting with the LLM (Large Language Model).
- `prompt`: A module for generating prompts for the LLM.
- `vectorDB`: A module for interacting with the vector database.
- `shared`: A module containing utility functions for handling text, code, and file operations.

### 📤 findCorrectCodeLineForObject - EXPORT
------------------------------------------------------------
**Description:** A function that attempts to find the correct line number for each code object within a given code snippet.

**Code Snippet:**


```typescript
export function findCorrectCodeLineForObject(codeObj: CodeObject, code: string): CodeObject {
  // Split the entire code into lines
  const codeLines = code.split("\n");

  // Function to find the start line of a code snippet with fuzzy matching
  const findStartLine = (snippetLines: string[], codeLines: string[]): number => {
      for (let i = 0; i < codeLines.length; i++) {
          let match = true;
          for (let j = 0; j < snippetLines.length; j++) {
              if (i + j >= codeLines.length || !codeLines[i + j].includes(snippetLines[j].trim())) {
                  match = false;
                  break;
              }
          }
          if (match) {
              return i + 1; // Line numbers are 1-based
          }
      }
      return -1; // Not found
  };

  // Find the correct code line for each object
  for (const key in codeObj) {
      const codeObject = codeObj as any;
      try {
        for (const objects of codeObject[key]) {
          const obj = objects as CodeObject;
          const codeSnippet = obj.codeSnippet;
          const snippetLines = codeSnippet.split("\n");

          const startLine = findStartLine(snippetLines, codeLines);
          obj.codeLine = startLine !== -1 ? startLine : -2;
      }

      } catch(err) {
          console.error("Error finding correct code line for object", err);
          console.debug("Code Object:", codeObj);
          console.debug("Code Object Key:", codeObject[key]);
          continue
      }
  }
  return codeObj;
}



// Helper Functions Implementation:
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function attempts to find the correct line number for each code object within a given code snippet. It iterates through each code object in the provided `codeObj` and uses a fuzzy matching algorithm to find the starting line number of the code snippet within the `code` string.
- **Parameters:** - `codeObj`: A `CodeObject` representing the code object to be annotated. It contains information like the code snippet, name, type, and other relevant details.
- `code`: A string representing the entire code snippet within which the code object is located.
- **Returns:** The function returns the original `codeObj` with the `codeLine` property updated to reflect the starting line number of the code snippet within the `code` string. If the line number cannot be determined, the `codeLine` property is set to -2.
- **Usage Example:** 


```typescript
const codeObj = {
  name: 'myFunction',
  type: 'function',
  codeSnippet: 'function myFunction() { ... }',
  codeLine: undefined,
};

const code = `
// Some other code
function myFunction() { ... }
// More code
`;

const annotatedCodeObj = findCorrectCodeLineForObject(codeObj, code);

console.log(annotatedCodeObj.codeLine); // Output: 3 (assuming the function starts on line 3)
```

- **Edge Cases:** The function uses a fuzzy matching algorithm to find the starting line number, so it may not be accurate if the code snippet contains similar code blocks. If the code snippet cannot be found within the `code` string, the `codeLine` property is set to -2.
- **Dependencies:** This function relies on the `CodeObject` interface defined in the `objectSchemas.ts` file.

### 📤 getIgnoredFiles - EXPORT
------------------------------------------------------------
**Description:** A function that attempts to read ignore patterns from .gitignore or .fofoignore files.

**Code Snippet:**


```typescript
async function getIgnoredFiles(projectPath: string): Promise<string[]> {
  let ignorePatterns: string[] = [];
  const basePath = projectPath.split("/").slice(0, -1).join("/");
  const executionPath = process.cwd();

  console.log("basePath", basePath);
  console.log("executionPath", executionPath);

  // CHECK for these files in order:
  const pathsToCheck = [
    `${basePath}/.gitignore`,
    `${basePath}/.fofoignore`,
    `${executionPath}/.gitignore`,
    `${executionPath}/.fofoignore`,
  ];

  for (const path of pathsToCheck) {
    if (path.includes("fofoignore")) {
      try {
        const fofoignoreContent = await readFile(
          path,
          "utf-8"
        );
        ignorePatterns.push(...fofoignoreContent.split("\n").filter(Boolean));
      } catch (err) {
        // .fofoignore not found, ignore the error
        console.warn("No .fofoignore file found in " + path);
      }
    } else {
      try {
        const gitignoreContent = await readFile(
          path,
          "utf-8"
        );
        ignorePatterns.push(...gitignoreContent.split("\n").filter(Boolean)); // Filter out empty lines
      } catch (err) {
        // .gitignore not found, ignore the error
        console.warn("No .gitignore file found in " + path);
      }
    }
  }

  return ignorePatterns;
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function attempts to read ignore patterns from `.gitignore` or `.fofoignore` files. It checks for these files in a specific order: 

1.  `${basePath}/.gitignore`
2.  `${basePath}/.fofoignore`
3.  `${executionPath}/.gitignore`
4.  `${executionPath}/.fofoignore`

If a `.fofoignore` file is found, it reads the ignore patterns from it. Otherwise, it reads the ignore patterns from the `.gitignore` file. If neither file is found, it returns an empty array.
- **Parameters:** projectPath: string - The path to the project directory.
- **Returns:** An array of strings representing the ignore patterns.
- **Edge Cases:** If the `.gitignore` or `.fofoignore` files are not found, the function will return an empty array. If the files contain invalid ignore patterns, the function will not throw an error, but the invalid patterns will be ignored.
- **Dependencies:** fs/promises - For reading files.

### 📤 getFileSizeInKB - EXPORT
------------------------------------------------------------
**Description:** A function that returns the size of a file in kilobytes.

**Code Snippet:**


```typescript
async function getFileSizeInKB(filePath: string): Promise<number> {
  return await stat(filePath).then((stats) => stats.size / 1024);
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function retrieves the size of a file in kilobytes (KB) using the `stat` function from the `fs/promises` module.
- **Parameters:** filePath: string - The path to the file whose size needs to be retrieved.
- **Returns:** Promise<number> - A promise that resolves to the size of the file in KB.
- **Usage Example:** 


```typescript
const fileSizeKB = await getFileSizeInKB('./myFile.txt');
console.log(`File size: ${fileSizeKB} KB`);
```

- **Edge Cases:** If the file does not exist or cannot be accessed, the promise will reject with an error.
- **Dependencies:** fs/promises

### 📤 isFileTooLarge - EXPORT
------------------------------------------------------------
**Description:** A function that determines if a file is too large based on a specified size limit and character count.

**Code Snippet:**


```typescript
async function isFileTooLarge(
  filePath: string,
  maxFileSizeKB: number,
  maxChars: number = 300
): Promise<boolean> {
  // Check the amount of characters in the file content
  const file = readFileSync(filePath, "utf-8");
  const tooLong = getTokens(file) > maxChars;

  if (tooLong === true) return true;

  return await getFileSizeInKB(filePath).then((size) => size > maxFileSizeKB);
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `isFileTooLarge` function checks if a file exceeds a specified size limit and character count. It aims to prevent processing of excessively large files that might cause performance issues or exceed resource limitations.
- **Parameters:** - `filePath`: A string representing the path to the file to be checked.
- `maxFileSizeKB`: A number representing the maximum allowed file size in kilobytes.
- `maxChars`: An optional number representing the maximum allowed character count in the file. Defaults to 300.
- **Returns:** A Promise that resolves to a boolean value. `true` indicates that the file is too large, while `false` indicates that it is within the allowed limits.
- **Usage Example:** 


```typescript
const isFileTooLargeResult = await isFileTooLarge('./myLargeFile.txt', 1024, 500);

if (isFileTooLargeResult) {
  console.log('File is too large!');
} else {
  console.log('File is within the allowed limits.');
}
```

- **Edge Cases:** The function assumes that the file exists and is readable. If the file does not exist or is not accessible, an error will be thrown. The character count is an approximation based on splitting the file content by whitespace, which might not be entirely accurate for all file types.
- **Dependencies:** - `readFileSync` from the `fs` module for reading the file content.
- `getFileSizeInKB` function for getting the file size in kilobytes.
- `getTokens` function for approximating the character count.
## interfaces


### 🌉 runtimeData - INTERFACE
------------------------------------------------------------
**Description:** Interface for runtime data

**Code Snippet:**


```typescript
interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `runtimeData` interface defines the structure for storing runtime data related to the FoFo Docs application.

### 🌉 moduleObject - INTERFACE
------------------------------------------------------------
**Description:** Interface for module objects

**Code Snippet:**


```typescript
interface moduleObject {
    name: string;
    version: string;
    description: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of a module object, which represents a package or module with its name, version, and description.

### 🌉 ProjectSummary - INTERFACE
------------------------------------------------------------
**Description:** Interface for project summaries

**Code Snippet:**


```typescript
interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ProjectSummary` interface defines the structure for storing information about a code project. It includes details like the project name, description, location, technology stack, dependencies, code files, RAG data, and team context.
- **Usage Example:** 


```typescript
const projectSummary: ProjectSummary = {
  projectName: 'MyProject',
  projectDescription: {
    goal: 'This project aims to...',
    features_functions: 'It includes features like...'
  },
  projectLocation: '/path/to/project',
  projectTechStackDescription: 'TypeScript, React, Node.js',
  projectDependencies: [
    { name: 'react', version: '18.2.0' },
    { name: 'express', version: '4.18.2' }
  ],
  codeFiles: [
    // ... code file summaries
  ],
  ragData: [
    // ... RAG data
  ],
  teamContext: 'This project is for...'
};
```


### 🌉 models - INTERFACE
------------------------------------------------------------
**Description:** Interface for models

**Code Snippet:**


```typescript
interface models {
    name: string,
    model: any,
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for a model object, which includes the name of the model and its associated model object.

### 🌉 modelServiceConfig - INTERFACE
------------------------------------------------------------
**Description:** Interface for model service configurations

**Code Snippet:**


```typescript
interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Defines the interface for model service configurations, which includes an array of models and an optional endpoint.
- **Parameters:** models: models[],
endpoint?: string
- **Returns:** This interface does not return any value. It defines the structure for model service configurations.
- **Usage Example:** 


```typescript
const config: modelServiceConfig = {
    models: [
        { name: 'gpt-3.5-turbo', model: 'gpt-3.5-turbo', backend: 'OPENAI' },
        { name: 'text-davinci-003', model: 'text-davinci-003', backend: 'OPENAI' }
    ],
    endpoint: 'https://api.openai.com/v1'
};
```


### 🌉 RagData - INTERFACE
------------------------------------------------------------
**Description:** Interface for RAG data

**Code Snippet:**


```typescript
interface RagData {
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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `RagData` interface defines the structure for data retrieved from a Retrieval Augmented Generation (RAG) system. It stores metadata about the retrieved code snippet, embeddings (if applicable), the actual code snippet, and search results.
- **Dependencies:** This interface depends on the `CodeObject` interface and the `QueryResponse` type from the `chromadb` library.

### 🌉 codeSummary - INTERFACE
------------------------------------------------------------
**Description:** Interface for code summaries

**Code Snippet:**


```typescript
interface codeSummary {
    goal: string,
    features_functions: string,
  }
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for code summaries, which are used to provide a high-level overview of code files.
- **Usage Example:** 


```typescript
const codeSummary: codeSummary = {
    goal: "This function calculates the sum of two numbers.",
    features_functions: "The function takes two numbers as input and returns their sum."
  };
```


### 🌉 CodeFileSummary - INTERFACE
------------------------------------------------------------
**Description:** Interface for code file summaries

**Code Snippet:**


```typescript
interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: codeSummary;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject;
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeFileSummary` interface represents a summary of a code file. It stores information about the file's name, location, code summary, language, execution flow, and code objects.
- **Usage Example:** 


```typescript
const codeFileSummary: CodeFileSummary = {
    fileName: 'myFile.ts',
    fileLocation: './src/myFile.ts',
    codeSummary: {
        goal: 'This file implements a function to calculate the sum of two numbers',
        features_functions: 'The function takes two numbers as input and returns their sum'
    },
    language: 'TypeScript',
    executionFlow: [],
    codeObjects: {
        functions: [
            {
                name: 'add',
                type: 'function',
                description: 'Calculates the sum of two numbers',
                codeSnippet: 'function add(num1: number, num2: number): number {
    return num1 + num2;
}',
                codeLine: 10,
                codeIndent: 0,
                fileName: 'myFile.ts',
                fileLocation: './src/myFile.ts',
                isExported: true,
                isFunction: true,
                isClass: false,
                isPrivate: false,
                isAsync: false,
                functionParameters: [
                    {
                        name: 'num1',
                        type: 'number',
                        description: 'The first number to add',
                        example: '1'
                    },
                    {
                        name: 'num2',
                        type: 'number',
                        description: 'The second number to add',
                        example: '2'
                    }
                ],
                functionReturns: {
                    type: 'number',
                    description: 'The sum of the two numbers',
                    example: '3'
                }
            }
        ]
    }
};
```


### 🌉 ExecutionFlow - INTERFACE
------------------------------------------------------------
**Description:** Interface for execution flow

**Code Snippet:**


```typescript
interface ExecutionFlow {
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

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for representing a step in the execution flow of a codebase. It includes information about the step number, description, importance, code snippet, line number, indentation level, and file location.

### 🌉 FunctionParameter - INTERFACE
------------------------------------------------------------
**Description:** Interface for function parameters

**Code Snippet:**


```typescript
interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Defines the structure for a function parameter, including its name, type, description, and an example.
- **Parameters:**  - **name**: `string` - The name of the function parameter.
 - **type**: `string` - The data type of the function parameter.
 - **description**: `string` - A description of the function parameter.
 - **example**: `string` - An example of how the function parameter is used.
- **Returns:** This interface does not return any value.
- **Usage Example:** 


```typescript
const functionParameter: FunctionParameter = {
    name: 'param1',
    type: 'number',
    description: 'The first parameter',
    example: '10'
};
```


### 🌉 FunctionReturn - INTERFACE
------------------------------------------------------------
**Description:** Interface for function returns

**Code Snippet:**


```typescript
interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for representing the return value of a function.
- **Returns:** The `FunctionReturn` interface represents a function's return value, including its type, description, and an example.
- **Usage Example:** 


```typescript
// Example usage of the FunctionReturn interface
const functionReturn: FunctionReturn = {
    type: 'string',
    description: 'This function returns a string',
    example: 'Hello, world!'
};
```


### 🌉 CodeObject - INTERFACE
------------------------------------------------------------
**Description:** Interface for code objects

**Code Snippet:**


```typescript
interface CodeObject {
    name: string;
    type: CodeObjectType;
    description: string;
    codeSnippet: string;
    annotation?: Annotation;
    codeLine?: number;
    codeIndent?: number;
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

- **Line:** Could Not Verify Line
- **Location:** appData.ts (./src/appData.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of a code object, which represents a single element within a codebase, such as a class, function, variable, or type.
- **Usage Example:** 


```typescript
const codeObject: CodeObject = {
  name: 'MyClass',
  type: 'class',
  description: 'A simple class',
  codeSnippet: 'class MyClass { ... }',
  codeLine: 10,
  codeIndent: 0,
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts'
};
```


### 🌉 globResult - INTERFACE
------------------------------------------------------------
**Description:** Interface for glob results

**Code Snippet:**


```typescript
interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}
```

- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for storing results from the `glob` function, which is used for finding files matching a pattern.
- **Usage Example:** 


```typescript
const globResult: globResult = {
  glob: ['*.ts', '*.js'],
  ignore: ['node_modules/**']
};
```

- **Dependencies:** glob
