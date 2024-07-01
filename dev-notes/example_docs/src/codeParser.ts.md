# src/codeParser.ts - fofo-docs

**Summary:** The code aims to parse a codebase (directory or single file) and generate a summary of its contents. It analyzes code files, extracts information like classes, functions, variables, types, interfaces, imports, and exports, and summarizes the code's purpose and features using a large language model (LLM). The code also handles large files by breaking them into chunks and processing them separately.

- **File Location:** ./src/codeParser.ts
- **Language:** language: TypeScript 

## Table of Contents
- [classes](#classes)
- [functions](#functions)
- [types](#types)
- [imports](#imports)
- [interfaces](#interfaces)
## classes


### 📘 CodeFileSummary - CLASS
------------------------------------------------------------
**Description:** Represents a summary of a code file, including its name, location, language, code summary, execution flow, and code objects.

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
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeFileSummary` interface represents a summary of a code file, encompassing its name, location, language, code summary, execution flow, and code objects.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const codeFileSummary: CodeFileSummary = {
  fileName: "myFile.ts",
  fileLocation: "./myFile.ts",
  codeSummary: {
    goal: "This file implements a function to calculate the sum of two numbers.",
    features_functions: "The function takes two numbers as input and returns their sum."
  },
  language: "TypeScript",
  executionFlow: [],
  codeObjects: {}
};
```

- **Edge Cases:** N/A
- **Dependencies:** The interface relies on the `codeSummary`, `ExecutionFlow`, and `CodeObject` interfaces.

### 📘 ProjectSummary - CLASS
------------------------------------------------------------
**Description:** Represents a summary of a project, including its name, description, dependencies, location, tech stack description, code files, RAG data, and team context.

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
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ProjectSummary` class represents a comprehensive summary of a software project, encompassing various aspects like project name, description, dependencies, location, technology stack, code files, RAG data, and team context.
- **Usage Example:** 


```typescript
const projectSummary: ProjectSummary = {
  projectName: "MyProject",
  projectDescription: {
    goal: "This project aims to...",
    features_functions: "Key features include..."
  },
  projectLocation: "/path/to/project",
  projectTechStackDescription: "TypeScript, React, Node.js",
  projectDependencies: [
    { name: "react", version: "18.2.0" },
    { name: "express", version: "4.18.2" }
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

- **Dependencies:** The `ProjectSummary` class relies on the following interfaces and types from the `objectSchemas` module:

- `codeSummary`
- `CodeFileSummary`
- `RagData`
- `moduleObject`
- `CodeObjectType`
- `CodeObjects`
- `globResult`
- `runtimeData`
- `models`
- `modelServiceConfig`
- `ExecutionFlow`
- `FunctionParameter`
- `FunctionReturn`
- `CodeObject`
- `CodeObjectTypes`
- `Annotation`

### 📘 runtimeData - CLASS
------------------------------------------------------------
**Description:** Represents runtime data for the FoFo Docs application, including version, project name, paths, and selected models.

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
```

- **Line:** Could Not Verify Line
- **Location:** undefined (Unable to Load)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `runtimeData` class represents runtime data for the FoFo Docs application. It stores information such as the application version, project name, file paths, and selected language models and RAG services.
- **Usage Example:** 


```typescript
const runtimeData: runtimeData = {
  appVersion: "1.2.0-alpha5",
  projectName: "fofo-docs",
  projectPath: "./",
  outputPath: "./output",
  selectedLLModel: "gpt-4o",
  selectedRAGService: "GCP"
};
```

- **Dependencies:** The `runtimeData` class depends on the `chromadb` library for embedding and searching data in a vector database.
## functions


### 🔧 promptUser - FUNCTION
------------------------------------------------------------
**Description:** Function to prompt user for input

**Code Snippet:**


```typescript
const promptUser = (question:string) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
            rl.close();
        });
    })
};
```

- **Line:** 46
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **question** (string): The question to ask the user 
 Example: 'What is your name?'
###### Function Returns:
- **Type:** Promise<string>
- **Description:** A promise that resolves to the user's answer
- **Example:** 'John Doe'
###### Annotations / Comments:
- **Purpose:** The `promptUser` function is designed to prompt the user for input using the `readline` module. It creates a readline interface, asks the user a question, and returns a promise that resolves to the user's answer.
- **Parameters:** The function takes a single parameter, `question`, which is a string representing the question to ask the user.
- **Returns:** The function returns a promise that resolves to the user's answer as a string.
- **Usage Example:** 


```typescript
const userName = await promptUser('What is your name?');
console.log(`Hello, ${userName}!`);
```

- **Edge Cases:** The function does not handle any specific edge cases. It assumes that the user will provide a valid input.
- **Dependencies:** The function depends on the `readline` module for interacting with the user's input.

### 🔧 genCodeChunkObj - FUNCTION
------------------------------------------------------------
**Description:** Process each chunk's code objects (update projectSummary.ragData, etc.)

**Code Snippet:**


```typescript
async function genCodeChunkObj(projectSummary:ProjectSummary, filePath:string, chunk:string):Promise<CodeObject>{
    // Process each chunk's code objects (update projectSummary.ragData, etc.)
    const objectKeys:CodeObjects[] = ['classes', 'functions', 'variables', 'types', 'interfaces', 'imports', 'exports']
    const chunkCodeObjectsAny = {} as any;

    
    for (const key of objectKeys) {

    let promptTemplate = ""

    switch (key) {
        case 'classes':
            promptTemplate = classesPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        case 'functions':
            promptTemplate = functionsPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        case 'variables':
            promptTemplate = variablesPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        case 'types':
            promptTemplate = typesPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        case 'interfaces':
            promptTemplate = interfacesPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        // case 'comments':
        //     promptTemplate = commentsPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
        //     break;
        case 'imports':
            promptTemplate = importsPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        case 'exports':
            promptTemplate = exportsPrompt(projectSummary.teamContext, "<relevant code>", filePath, chunk, key)
            break;
        default:
            console.error("Error: Invalid object key")
            break;
    }

    const bRag = process.env.EMBEDDER_MODE === 'OFF' ? false : true

    const codeObjects = await callLLM(
        promptTemplate,
        projectSummary,
        chunk,
        filePath,
        bRag,
        llmToUse
      );

     // insert the object into the chunkCodeObjects
     chunkCodeObjectsAny[key] = codeObjects[key];
    }

    const chunkCodeObjects = chunkCodeObjectsAny as CodeObject;

    return chunkCodeObjects;
}
```

- **Line:** 60
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectSummary** (ProjectSummary): The project summary object 
 Example: {}
- **filePath** (string): The path to the file 
 Example: './src/codeParser.ts'
- **chunk** (string): The chunk of code to process 
 Example: '// This is a chunk of code'
###### Function Returns:
- **Type:** Promise<CodeObject>
- **Description:** A promise that resolves to the code object
- **Example:** {}
###### Annotations / Comments:
- **Purpose:** This function processes each chunk of code in a file and extracts code objects like classes, functions, variables, types, interfaces, imports, and exports. It uses a prompt template based on the type of code object to generate a prompt for the LLM, which then identifies and describes the code objects within the chunk. The function then merges the extracted code objects into a single CodeObject and returns it.
- **Parameters:** - projectSummary: The ProjectSummary object containing information about the project, including team context and other relevant data.
- filePath: The path to the file containing the code chunk.
- chunk: The code chunk to be processed.
- **Returns:** A Promise that resolves to a CodeObject containing the extracted code objects from the chunk.
- **Usage Example:** 


```typescript
const codeChunk = "// This is a chunk of code";
const codeObject = await genCodeChunkObj(projectSummary, './src/codeParser.ts', codeChunk);
```

- **Edge Cases:** If the code chunk contains invalid syntax or if the LLM fails to identify code objects, the function may return an empty CodeObject or an error.
- **Dependencies:** - classesPrompt, functionsPrompt, variablesPrompt, typesPrompt, interfacesPrompt, importsPrompt, exportsPrompt: Functions that generate prompts for the LLM based on the type of code object.
- callLLM: Function that calls the LLM with the generated prompt and returns the response.

### 🔧 mergeObjectArrays - FUNCTION
------------------------------------------------------------
**Description:** Merge incoming codeObj's key-array pairs with the existing codeObjArray

**Code Snippet:**


```typescript
export function mergeObjectArrays(
  codeObjArray: CodeObject,
  newCodeObj: any
): CodeObject {
  // We need to merge our incoming codeObj's key-array pairs with the existing codeObjArray
  // If the key already exists, we need to merge the arrays
  // If the key does not exist, we need to add it to the codeObjArray
  const mergedCodeObj: any = codeObjArray;
  for (const key in newCodeObj) {

    // if the current key is a string, skip it
    if (typeof newCodeObj[key] === "string" || newCodeObj[key] instanceof String) {
      continue;
    }
    if (typeof mergedCodeObj[key] === "string" || mergedCodeObj[key] instanceof String) {
      console.warn("Error: Code Object is not an object");
      console.debug(newCodeObj[key]);
      continue;
    }

    if (key in mergedCodeObj) {
      if (Array.isArray(mergedCodeObj[key]) && Array.isArray(newCodeObj[key])){
        mergedCodeObj[key] = [...mergedCodeObj[key], ...newCodeObj[key]];
      } else{
        console.error("Not an Array?")
      }

    } else {
      mergedCodeObj[key] = newCodeObj[key];
    }
  }

  // Delete any duplicate code objects:
  console.log("Deleting Duplicate Code Objects");
  const mergedCodeKeys = Object.keys(mergedCodeObj);
    for (const key of mergedCodeKeys) {

    const foundKeys: string[] = [];

    // Make sure the key object is iterable
    if (!Array.isArray(mergedCodeObj[key])) {
      console.warn("Error: Code Object is not an array");
      console.log(mergedCodeObj[key]);
      continue;
    }

    for (const arrayObj of mergedCodeObj[key]) {
      if ("name" in arrayObj) {
        if (foundKeys.includes(arrayObj.name)) {
          mergedCodeObj[key] = mergedCodeObj[key].filter(
            (obj: any) => obj.name !== arrayObj.name
          );
        } else {
          foundKeys.push(arrayObj.name);
        }
      } else if ("content" in arrayObj) {
        if (foundKeys.includes(arrayObj.content)) {
          mergedCodeObj[key] = mergedCodeObj[key].filter(
            (obj: any) => obj.content !== arrayObj.content
          );
        } else {
          foundKeys.push(arrayObj.content);
        }
      } else {
        console.warn("Error: Code Object has no name or content property");
        continue;
      }
    }
  }
  return mergedCodeObj;
}
```

- **Line:** 121
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **codeObjArray** (CodeObject): The existing code object array 
 Example: {}
- **newCodeObj** (any): The new code object to merge 
 Example: {}
###### Function Returns:
- **Type:** CodeObject
- **Description:** The merged code object array
- **Example:** {}
###### Annotations / Comments:
- **Purpose:** This function merges two code objects, combining their key-value pairs. It handles merging arrays by concatenating them and removes duplicate code objects based on their 'name' or 'content' properties.
- **Parameters:** - codeObjArray: CodeObject - The existing code object array.
- newCodeObj: any - The new code object to merge.
- **Returns:** CodeObject - The merged code object array.
- **Usage Example:** 


```typescript
const codeObj1: CodeObject = {
  classes: [{
    name: 'ClassA',
    type: 'class',
    description: 'Class A description',
    codeSnippet: 'class ClassA { ... }',
    codeLine: 10,
    codeIndent: 0,
    fileName: 'file1.ts',
    fileLocation: './src/file1.ts',
    subObjects: []
  }]
};

const codeObj2: any = {
  classes: [{
    name: 'ClassB',
    type: 'class',
    description: 'Class B description',
    codeSnippet: 'class ClassB { ... }',
    codeLine: 20,
    codeIndent: 0,
    fileName: 'file2.ts',
    fileLocation: './src/file2.ts',
    subObjects: []
  }]
};

const mergedCodeObj = mergeObjectArrays(codeObj1, codeObj2);
```

- **Edge Cases:** The function assumes that the 'codeObjArray' is a valid CodeObject and that the 'newCodeObj' is an object. It also assumes that the arrays to be merged are arrays of objects with either a 'name' or 'content' property for duplicate detection.
- **Dependencies:** None

### 🔧 parseCodebase - FUNCTION
------------------------------------------------------------
**Description:** Parse the codebase and generate a ProjectSummary object

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

  // Clean projectPath of any trailing slashes or " characters
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

  console.debug(filePaths)
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

  const processFile = async (filePath: string) => {
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

  
  // TODO=> Implement DIS
  // Divide the files array into separate arrays based on the number of calls we can make per minute
  // const fileJobs=[]
  // const maxFilesPerJob = maxCallsPerMin
  // for (let i = 0; i < filePaths.length; i += maxFilesPerJob) {
  //   fileJobs.push(filePaths.slice(i, i + maxFilesPerJob));
  // }

  // console.log("Number of File Jobs:", fileJobs.length);

  // for (const job of fileJobs) {
  //   await Promise.all(job.map((filePath) => processFile(filePath)));
  // }


  for (const filePath of filePaths) {
    await processFile(filePath);
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
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectPath** (string): The path to the project 
 Example: './src'
- **projectName** (string): The name of the project 
 Example: 'My Awesome Project'
###### Function Returns:
- **Type:** Promise<ProjectSummary>
- **Description:** A promise that resolves to the project summary object
- **Example:** {}
###### Annotations / Comments:
- **Purpose:** The `parseCodebase` function is responsible for parsing a codebase (a directory or a single file) and generating a `ProjectSummary` object that contains information about the project, its dependencies, and its code files.
- **Parameters:** - `projectPath`: The path to the project directory or file to be parsed.
- `projectName`: The name of the project.
- **Returns:** A `ProjectSummary` object containing information about the project, its dependencies, and its code files.
- **Usage Example:** 


```typescript
const projectSummary = await parseCodebase('./src', 'My Awesome Project');
```

- **Edge Cases:** - The function handles large files by breaking them into chunks and processing them separately.
- It also handles cases where the project path is a directory or a single file.
- **Dependencies:** - `glob`: For finding files in a directory.
- `fs/promises`: For reading files.
- `objectSchemas`: For defining the `ProjectSummary` and other related objects.
- `llmInterface`: For calling the LLM to infer language type, project stack, and dependencies.
- `prompt`: For generating prompts for the LLM.
- `vectorDB`: For saving code snippets to the vector database.
- `shared`: For utility functions like breaking code into chunks, getting token counts, and colorizing text.

### 🔧 findCorrectCodeLineForObject - FUNCTION
------------------------------------------------------------
**Description:** Find the correct code line for each object

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
          const codeSnippet = removeCodeBlockIfPresent(obj.codeSnippet)
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
```

- **Line:** 575
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **codeObj** (CodeObject): The code object to find the line number for 
 Example: {}
- **code** (string): The code to search 
 Example: '// This is a chunk of code'
###### Function Returns:
- **Type:** CodeObject
- **Description:** The code object with the updated code line
- **Example:** {}
###### Annotations / Comments:
- **Purpose:** This function takes a code object and the entire code string as input and attempts to find the correct line number for each code snippet within the code object. It iterates through each code object, splits the code snippet into lines, and uses a fuzzy matching algorithm to find the starting line number in the entire code string. The function updates the `codeLine` property of each code object with the found line number or -2 if the line number could not be determined.
- **Parameters:** - `codeObj`: A `CodeObject` containing code snippets and other information.
- `code`: A string representing the entire code to search.
- **Returns:** The input `CodeObject` with the updated `codeLine` property for each code snippet.
- **Usage Example:** 


```typescript
const codeObject = {
  name: 'myFunction',
  type: 'function',
  codeSnippet: 'function myFunction() { ... }',
  codeLine: undefined,
};

const code = `// This is a chunk of code
function myFunction() { ... }
`;

const updatedCodeObject = findCorrectCodeLineForObject(codeObject, code);

console.log(updatedCodeObject.codeLine); // Output: 2
```

- **Edge Cases:** The fuzzy matching algorithm might not be able to find the exact line number if the code snippet is not a perfect match or if the code has been modified since the code snippet was extracted.
- **Dependencies:** None

### 🔧 getIgnoredFiles - FUNCTION
------------------------------------------------------------
**Description:** Get ignored files from .gitignore and .fofoignore

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

- **Line:** 624
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectPath** (string): The path to the project 
 Example: './src'
###### Function Returns:
- **Type:** Promise<string[]>
- **Description:** A promise that resolves to an array of ignored files
- **Example:** ['node_modules', 'dist']
###### Annotations / Comments:
- **Purpose:** This function retrieves ignored files from `.gitignore` and `.fofoignore` files within the project directory or the execution directory.
- **Parameters:** projectPath: string - The path to the project directory.
- **Returns:** Promise<string[]> - A promise that resolves to an array of strings representing the ignored file patterns.
- **Edge Cases:** If no `.gitignore` or `.fofoignore` files are found, the function will return an empty array. The function prioritizes files within the project directory over the execution directory.
- **Dependencies:** fs/promises, process.cwd

### 🔧 getFileSizeInKB - FUNCTION
------------------------------------------------------------
**Description:** Get the file size in KB

**Code Snippet:**


```typescript
async function getFileSizeInKB(filePath: string): Promise<number> {
  return await stat(filePath).then((stats) => stats.size / 1024);
}
```

- **Line:** 669
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **filePath** (string): The path to the file 
 Example: './src/codeParser.ts'
###### Function Returns:
- **Type:** Promise<number>
- **Description:** A promise that resolves to the file size in KB
- **Example:** 1024
###### Annotations / Comments:
- **Purpose:** This function retrieves the size of a file in kilobytes (KB) using the `stat` function from the `fs/promises` module.
- **Parameters:** - `filePath`: A string representing the path to the file.
- **Returns:** - `Promise<number>`: A promise that resolves to the file size in KB.
- **Usage Example:** 


```typescript
const fileSizeKB = await getFileSizeInKB('./src/codeParser.ts');
console.log(`File size: ${fileSizeKB} KB`);
```

- **Edge Cases:** If the file does not exist or cannot be accessed, the promise will reject with an error.
- **Dependencies:** - `fs/promises` module for file system operations.

### 🔧 isFileTooLarge - FUNCTION
------------------------------------------------------------
**Description:** Check if the file is too large

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

- **Line:** 673
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **filePath** (string): The path to the file 
 Example: './src/codeParser.ts'
- **maxFileSizeKB** (number): The maximum file size in KB 
 Example: 1024
- **maxChars** (number): The maximum number of characters in the file 
 Example: 300
###### Function Returns:
- **Type:** Promise<boolean>
- **Description:** A promise that resolves to true if the file is too large, false otherwise
- **Example:** true
###### Annotations / Comments:
- **Purpose:** This function checks if a file is too large based on two criteria: file size in KB and the number of characters in the file content.
- **Parameters:** - filePath: string - The path to the file.
- maxFileSizeKB: number - The maximum file size allowed in KB.
- maxChars: number - The maximum number of characters allowed in the file. Defaults to 300.
- **Returns:** A Promise that resolves to true if the file is too large (exceeds either the maximum file size or the maximum number of characters), and false otherwise.
- **Usage Example:** 


```typescript
const isLarge = await isFileTooLarge('./myFile.txt', 1024, 500);
console.log(isLarge); // true if the file is too large, false otherwise
```

- **Edge Cases:** The function uses `readFileSync` to read the file content, which might be inefficient for very large files. It also uses a simple character count to approximate the number of tokens, which might not be accurate for all languages.
- **Dependencies:** - `readFileSync` from `fs` module
- `getFileSizeInKB` function (presumably defined elsewhere)
## types


### 🏷️ CodeFileSummary - TYPE
------------------------------------------------------------
**Description:** Interface for summarizing a code file.

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
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeFileSummary` interface is used to represent and store information about a code file within a project. It includes details like the file name, location, language, a summary of the code's purpose and features, and a list of code objects (classes, functions, variables, etc.) found within the file.
- **Usage Example:** 


```typescript
const codeFileSummary: CodeFileSummary = {
  fileName: "myFile.ts",
  fileLocation: "./myFile.ts",
  codeSummary: {
    goal: "This file implements a function to calculate the sum of two numbers.",
    features_functions: "The file includes a function called `add` that takes two numbers as input and returns their sum."
  },
  language: "TypeScript",
  executionFlow: [],
  codeObjects: {
    functions: [
      {
        name: "add",
        type: "function",
        description: "Calculates the sum of two numbers.",
        codeSnippet: "function add(a: number, b: number): number { return a + b; }",
        codeLine: 10,
        codeIndent: 2,
        fileName: "myFile.ts",
        fileLocation: "./myFile.ts",
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

- **Dependencies:** The interface relies on the `codeSummary` and `CodeObject` interfaces for representing code summaries and individual code objects, respectively.

### 🏷️ CodeObject - TYPE
------------------------------------------------------------
**Description:** Interface for representing a code object.

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
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObject` interface defines the structure for representing code objects within a project. It includes properties like `name`, `type`, `description`, `codeSnippet`, `annotation`, `codeLine`, `codeIndent`, `fileName`, `fileLocation`, `subObjects`, `parentObject`, `functionParameters`, `functionReturns`, `isExported`, `isFunction`, `isClass`, `isPrivate`, and `isAsync`. This interface is used to store and organize information about code elements, such as classes, functions, variables, types, imports, exports, and interfaces.
- **Usage Example:** 


```typescript
const codeObject: CodeObject = {
  name: 'myFunction',
  type: 'function',
  description: 'This function does something',
  codeSnippet: 'function myFunction() { ... }',
  codeLine: 10,
  codeIndent: 2,
  fileName: 'myFile.ts',
  fileLocation: './myFile.ts',
  isExported: true,
  isFunction: true,
  isClass: false,
  isPrivate: false,
  isAsync: false
};
```

- **Dependencies:** The `CodeObject` interface relies on the `CodeObjectType` and `CodeObjects` types, as well as the `Annotation` interface, which are also defined in the `objectSchemas.ts` file.

### 🏷️ modelServiceConfig - TYPE
------------------------------------------------------------
**Description:** Interface for representing a model service configuration.

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
    codeSnippet
```

- **Line:** Could Not Verify Line
- **Location:** undefined (Unable to Load)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `modelServiceConfig` interface defines the configuration for a model service, including an array of models and an optional endpoint.
- **Parameters:**  - `models`: An array of `models` objects, each representing a specific model with its name and associated model object. 
 - `endpoint`: An optional string representing the endpoint URL for the model service.
- **Returns:** This interface does not return any value. It is used to define the structure of a model service configuration.
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

- **Dependencies:**  - `models` interface: Defines the structure of individual model objects within the configuration. 
 - `Embeddings`, `Metadata`, `QueryResponse`: Types imported from the `chromadb` library, likely used for vector database operations.
## imports


### 📥 glob - IMPORT
------------------------------------------------------------
**Description:** Imports the glob function from the glob module.

**Code Snippet:**


```typescript
import { glob } from "glob";
```

- **Line:** 1
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the `glob` function from the `glob` module, which is used for finding files matching a specified pattern.
- **Dependencies:** glob module

### 📥 logger - IMPORT
------------------------------------------------------------
**Description:** Imports the logger module.

**Code Snippet:**


```typescript
import "./logger";
```

- **Line:** 2
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This line imports the `logger` module, which is likely responsible for logging messages and events within the application.
- **Dependencies:** The `logger` module is a dependency of this code.

### 📥 readFile - IMPORT
------------------------------------------------------------
**Description:** Imports the readFile function from the fs/promises module.

**Code Snippet:**


```typescript
import { readFile, stat } from "fs/promises";
```

- **Line:** 3
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `readFile` function from the `fs/promises` module, which allows asynchronous reading of files.
- **Usage Example:** 


```typescript
const fileContent = await readFile("path/to/file.txt", "utf-8");
```

- **Edge Cases:** The `readFile` function can throw an error if the file does not exist or if there is an error reading the file.
- **Dependencies:** fs/promises module

### 📥 CodeFileSummary - IMPORT
------------------------------------------------------------
**Description:** Imports the CodeFileSummary interface from the objectSchemas module.

**Code Snippet:**


```typescript
import {
  CodeFileSummary,
  CodeObject,
  CodeObjects,
  ProjectSummary,
  RagData,
  codeSummary,
  globResult,
  moduleObject,
} from "./objectSchemas";
```

- **Line:** 4
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code snippet imports the `CodeFileSummary` interface from the `objectSchemas` module, along with other related interfaces and types.
- **Dependencies:** objectSchemas module

### 📥 infer - IMPORT
------------------------------------------------------------
**Description:** Imports the infer function from the llmInterface module.

**Code Snippet:**


```typescript
import { infer, callLLM, getCodeSummaryFromLLM } from "./llmInterface";
```

- **Line:** 14
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This import statement brings in the `infer` function from the `llmInterface` module. The `infer` function is likely used to interact with a large language model (LLM) to get information or generate text based on a given prompt.
- **Dependencies:** llmInterface module

### 📥 getLanguageTypeFromFile - IMPORT
------------------------------------------------------------
**Description:** Imports the getLanguageTypeFromFile function from the prompt module.

**Code Snippet:**


```typescript
import { 
    getLanguageTypeFromFile, 
    classesPrompt,
    functionsPrompt,
    variablesPrompt,
    typesPrompt,
    interfacesPrompt,
    // commentsPrompt,
    importsPrompt,
    exportsPrompt,
    determineProjectStack,
    getPackageDependenciesBasedOnLanguage,
    determineModulesPackagesFromFile,
    getGlobsBasedOnLangStack
 } from "./prompt";
```

- **Line:** 15
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code snippet imports the `getLanguageTypeFromFile` function from the `prompt` module.
- **Usage Example:** 


```typescript
const language = getLanguageTypeFromFile('./src/codeParser.ts');
```

- **Dependencies:** prompt module

### 📥 saveToVectorDatabase - IMPORT
------------------------------------------------------------
**Description:** Imports the saveToVectorDatabase function from the vectorDB module.

**Code Snippet:**


```typescript
import { saveToVectorDatabase } from "./vectorDB";
```

- **Line:** 30
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `saveToVectorDatabase` function from the `vectorDB` module, which is likely used to store code snippets in a vector database for later retrieval and analysis.
- **Dependencies:** vectorDB module

### 📥 breakCodeIntoChunks - IMPORT
------------------------------------------------------------
**Description:** Imports the breakCodeIntoChunks function from the shared module.

**Code Snippet:**


```typescript
import { breakCodeIntoChunks, cleanBackticks, getContextFromFile, getFileContentLen, getTokens, getTotalLines, isArray, removeCodeBlockIfPresent } from "./shared";
```

- **Line:** 31
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `breakCodeIntoChunks` function from the `shared` module.
- **Usage Example:** 


```typescript
const codeChunks = breakCodeIntoChunks(code, chunkSize);
```

- **Dependencies:** The `breakCodeIntoChunks` function is defined in the `shared` module.

### 📥 fs - IMPORT
------------------------------------------------------------
**Description:** Imports the fs module.

**Code Snippet:**


```typescript
import fs from "fs";
```

- **Line:** 32
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `fs` module from Node.js, providing access to file system operations.
- **Dependencies:** Node.js `fs` module

### 📥 dotenv/config - IMPORT
------------------------------------------------------------
**Description:** Imports the config function from the dotenv module.

**Code Snippet:**


```typescript
import "dotenv/config";
```

- **Line:** 33
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This line imports the `config` function from the `dotenv` module, which is used to load environment variables from a `.env` file.
- **Dependencies:** dotenv

### 📥 readFileSync - IMPORT
------------------------------------------------------------
**Description:** Imports the readFileSync function from the fs module.

**Code Snippet:**


```typescript
import { readFileSync } from "fs";
```

- **Line:** 34
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `readFileSync` function from the `fs` module, which is used to read the contents of a file synchronously.
- **Parameters:** None
- **Returns:** None
- **Usage Example:** 


```typescript
const fileContent = fs.readFileSync("path/to/file.txt", "utf-8");
```

- **Edge Cases:** If the file does not exist or cannot be read, an error will be thrown.
- **Dependencies:** fs module

### 📥 readline - IMPORT
------------------------------------------------------------
**Description:** Imports the readline module.

**Code Snippet:**


```typescript
import readline from 'readline'
```

- **Line:** 40
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `readline` module, which provides an interface for reading data from the command line.
- **Dependencies:** readline

### 📥 fofoDocsBuiltInFileSearch - IMPORT
------------------------------------------------------------
**Description:** Imports the fofoDocsBuiltInFileSearch array from the appData module.

**Code Snippet:**


```typescript
import { fofoDocsBuiltInFileSearch, fofoDocsBuiltInGlobSearch, isNoNoFile } from "./appData";
```

- **Line:** 41
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `fofoDocsBuiltInFileSearch` array from the `appData` module. This array contains a list of file extensions and patterns that are considered relevant for documentation generation.
- **Dependencies:** appData module
## interfaces


### 🌉 globResult - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for a result object returned by the `glob` function, which is used to find files matching a pattern.

### 🌉 moduleObject - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
interface moduleObject {
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
- **Purpose:** This interface defines the structure for a module object, which represents a package or module with its name, version, and description.

### 🌉 models - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
interface models {
    name: string,
    model: any,
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for a model object, which likely represents a language model or a machine learning model.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const myModel: models = {
    name: "myModel",
    model: "someModelObject"
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A

### 🌉 modelServiceConfig - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the configuration for a model service, including the models and optional endpoint.
- **Parameters:** models: models[],
    endpoint?:string
- **Returns:** N/A
- **Usage Example:** 


```typescript
const modelServiceConfig: modelServiceConfig = {
    models: [
        { name: 'gpt-3.5-turbo', model: 'gpt-3.5-turbo' },
        { name: 'gpt-4', model: 'gpt-4' }
    ],
    endpoint: 'https://api.openai.com/v1'
};
```


### 🌉 RagData - INTERFACE
------------------------------------------------------------
**Description:** N/A

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
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `RagData` interface defines the structure for storing data related to a code chunk, including metadata, embeddings, document data, and search results from a vector database.
- **Dependencies:** This interface depends on the `CodeObject`, `QueryResponse`, `Embeddings`, and `Metadata` types.

### 🌉 ExecutionFlow - INTERFACE
------------------------------------------------------------
**Description:** N/A

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
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ExecutionFlow` interface defines the structure for representing a step in the execution flow of a codebase. It includes information about the step number, description, importance, code snippet, line number, indentation level, and file location.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const executionFlow: ExecutionFlow = {
    step: 1,
    stepDescription: "This is the first step in the execution flow",
    bImportant: true,
    codeSnippet: "// Code snippet for the first step",
    codeLine: 10,
    codeIndent: 2,
    fileName: "myFile.ts",
    fileLocation: "./src/myFile.ts"
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A

### 🌉 FunctionParameter - INTERFACE
------------------------------------------------------------
**Description:** N/A

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
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of a function parameter object.
- **Parameters:**  - **name**: string - The name of the parameter.
 - **type**: string - The data type of the parameter.
 - **description**: string - A description of the parameter.
 - **example**: string - An example value for the parameter.
- **Returns:** N/A
- **Usage Example:** 


```typescript
const param: FunctionParameter = {
    name: "myParam",
    type: "string",
    description: "This is a parameter",
    example: "Hello World"
};
```

- **Dependencies:** N/A

### 🌉 FunctionReturn - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
interface FunctionReturn {
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
- **Purpose:** This interface defines the structure for a function's return value, including its type, description, and an example.

### 🌉 CodeObject - INTERFACE
------------------------------------------------------------
**Description:** N/A

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
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObject` interface defines the structure for representing code objects within a project. It includes information about the object's name, type, description, code snippet, annotations, line number, indentation, file location, sub-objects, parent object, function parameters, return values, and various flags indicating its properties (exported, function, class, private, async).
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const codeObject: CodeObject = {
    name: "myFunction",
    type: "function",
    description: "This function does something",
    codeSnippet: "// Code snippet here",
    codeLine: 10,
    fileName: "myFile.ts",
    fileLocation: "./src/myFile.ts",
    isExported: true,
    isFunction: true,
    isClass: false,
    isPrivate: false,
    isAsync: false
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A

### 🌉 Annotation - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
interface Annotation {
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
- **Purpose:** The `Annotation` interface defines the structure for annotations that can be applied to code objects. It includes properties for describing the purpose, parameters, returns, usage examples, edge cases, dependencies, error handling, performance considerations, and best practices for using the code object.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const annotation: Annotation = {
    purpose: "This function calculates the sum of two numbers",
    parameters: "num1: number, num2: number",
    returns: "number",
    usageExample: "
```typescript\nconst sum = add(1, 2);\n
```",
    edgeCases: "Negative numbers are not supported",
    dependencies: "someDependency, anotherDependency",
    errorHandling: "Throws an error if the input is not a number",
    performance: "Optimized for speed",
    bestPractices: "Use this function for adding numbers to"
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A
