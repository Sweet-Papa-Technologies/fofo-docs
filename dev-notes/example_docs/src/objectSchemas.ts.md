# src/objectSchemas.ts - fofo-docs

**Summary:** The code defines various interfaces and types for representing and summarizing code projects, including project metadata, code files, code objects, and runtime data. It aims to provide a structured way to store and analyze information about code projects, potentially for documentation, code understanding, or code analysis purposes.

- **File Location:** ./src/objectSchemas.ts
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


### 📘 globResult - CLASS
------------------------------------------------------------
**Description:** This class represents a result from a glob operation, containing an array of glob patterns and an array of ignore patterns.

**Code Snippet:**
```
export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}
```
- **Line:** 8
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `globResult` interface defines the structure for storing results from a glob operation. It contains two properties: `glob` and `ignore`.
- **Usage Example:** 


```typescript
const globResult: globResult = {
  glob: ['**/*.ts', '**/*.js'],
  ignore: ['node_modules/**', 'dist/**']
};
```


### 📘 llmRuntimeData - CLASS
------------------------------------------------------------
**Description:** This class represents runtime data for an LLM, including token count, character count, cost, and API calls.

**Code Snippet:**
```
export interface llmRuntimeData {
    totalTokens: number;
    totalCharacters: number;
    totalCharactersOut: number;
    totalCharactersEmbed: number;
    totalCost: number;
    totalAPIcalls: number;

}
```
- **Line:** 14
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `llmRuntimeData` interface defines the structure for storing runtime data related to an LLM (Large Language Model). This data includes information about the total tokens, characters, cost, and API calls used during LLM interactions.
- **Usage Example:** 


```typescript
const runtimeData: llmRuntimeData = {
  totalTokens: 100,
  totalCharacters: 500,
  totalCharactersOut: 200,
  totalCharactersEmbed: 100,
  totalCost: 0.05,
  totalAPIcalls: 2,
};
```


### 📘 runtimeData - CLASS
------------------------------------------------------------
**Description:** This class represents runtime data for an application, including version, project name, paths, and selected models.

**Code Snippet:**
```
export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
```
- **Line:** 25
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `runtimeData` interface defines the structure for storing runtime data related to an application. This data includes information about the application's version, the project being processed, file paths, and the selected language model and RAG service.
- **Usage Example:** 


```typescript
const runtimeData: runtimeData = {
  appVersion: '1.0.0',
  projectName: 'MyProject',
  projectPath: '/path/to/project',
  outputPath: '/path/to/output',
  selectedLLModel: 'gpt-3.5-turbo',
  selectedRAGService: 'OpenAI'
};
```


### 📘 moduleObject - CLASS
------------------------------------------------------------
**Description:** This class represents a module or package object, containing its name, version, and description.

**Code Snippet:**
```
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
```
- **Line:** 33
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `moduleObject` interface defines a structure to represent a module or package. It stores information about the module's name, version, and description.
- **Usage Example:** 


```typescript
const myModule: moduleObject = {
  name: 'my-module',
  version: '1.0.0',
  description: 'A useful module',
};
```


### 📘 ProjectSummary - CLASS
------------------------------------------------------------
**Description:** This class represents a summary of a project, including its name, description, dependencies, code files, RAG data, and team context.

**Code Snippet:**
```
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
- **Line:** 38
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ProjectSummary` class represents a comprehensive summary of a software project, encapsulating key information for documentation and analysis.
- **Parameters:** None. The `ProjectSummary` class is an interface, not a function, so it doesn't have parameters.
- **Returns:** The `ProjectSummary` class doesn't return anything. It defines a structure for storing project information.
- **Usage Example:** 


```typescript
const projectSummary: ProjectSummary = {
  projectName: 'MyProject',
  projectDescription: {
    goal: 'This project aims to...'
  },
  projectLocation: '/path/to/project',
  projectTechStackDescription: 'This project uses TypeScript, React, and Node.js',
  projectDependencies: [],
  codeFiles: [],
  ragData: [],
  teamContext: 'This project is developed by...'
};
```

- **Edge Cases:** None. The `ProjectSummary` class is a simple data structure, so there are no specific edge cases to consider.
- **Dependencies:** The `ProjectSummary` class depends on the following interfaces:

- `codeSummary`
- `moduleObject`
- `CodeFileSummary`
- `RagData`

### 📘 models - CLASS
------------------------------------------------------------
**Description:** This class represents a model object, containing its name and model.

**Code Snippet:**
```
export interface models {
    name: string,
    model: any,
}
```
- **Line:** 49
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `models` interface defines the structure for a model object, which represents a specific language model used in the application.
- **Usage Example:** 


```typescript
const myModel: models = {
  name: "myModelName",
  model: "myModelIdentifier",
};
```


### 📘 modelServiceConfig - CLASS
------------------------------------------------------------
**Description:** This class represents a model service configuration, containing an array of models and an optional endpoint.

**Code Snippet:**
```
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}
```
- **Line:** 53
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `modelServiceConfig` interface defines the configuration for a model service. It includes an array of `models` and an optional `endpoint`.
- **Usage Example:** 


```typescript
const config: modelServiceConfig = {
  models: [
    {
      name: 'gpt-3.5-turbo',
      model: 'gpt-3.5-turbo',
      backend: 'OPENAI',
    },
  ],
  endpoint: 'https://api.openai.com/v1',
};
```


### 📘 RagData - CLASS
------------------------------------------------------------
**Description:** This class represents RAG data, including metadata, embeddings, document data, and search results.

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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}
```
- **Line:** 58
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `RagData` interface represents data associated with Retrieval Augmented Generation (RAG) in the context of code analysis. It stores metadata about code chunks, embeddings (numerical representations of the code), the actual code chunk itself, and search results from a vector database.
- **Usage Example:** 


```typescript
const ragData: RagData = {
  metadata: {
    filename: 'myFile.ts',
    codeChunkId: 1,
    codeChunkLineStart: 10,
    codeChunkLineEnd: 20,
    codeObjects: { /* Code objects for this chunk */ },
    codeChunkSummary: 'This chunk defines a function...'
  },
  embeddings: [ /* Array of embeddings */ ],
  documentData: '// Code chunk content', // The actual code chunk
  allSearchResults: { /* Search results from the vector database */ },
  allResults: { /* Additional search results */ }
};
```

- **Dependencies:** This interface depends on the `CodeObject` interface, which represents individual code elements like classes, functions, and variables.

### 📘 codeSummary - CLASS
------------------------------------------------------------
**Description:** This class represents a code summary, containing the goal and features/functions of the code.

**Code Snippet:**
```
export interface codeSummary {
    goal: string,
    features_functions: string,
  }
```
- **Line:** 78
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `codeSummary` interface defines the structure for storing a summary of a code block. It includes two properties: `goal` and `features_functions`.
- **Usage Example:** 


```typescript
const codeSummary: codeSummary = {
  goal: "This code calculates the sum of two numbers.",
  features_functions: "The code uses a function called `add` to perform the calculation."
};
```


### 📘 CodeFileSummary - CLASS
------------------------------------------------------------
**Description:** This class represents a summary of a code file, including its name, location, summary, language, execution flow, and code objects.

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
- **Line:** 82
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeFileSummary` interface represents a summary of a code file, containing essential information for documentation generation.
- **Parameters:** None.
- **Returns:** This interface does not return any value. It defines a structure for storing information about a code file.
- **Usage Example:** 


```typescript
const codeFileSummary: CodeFileSummary = {
  fileName: "myFile.ts",
  fileLocation: "./src/myFile.ts",
  codeSummary: {
    goal: "This file implements a function to calculate the sum of two numbers.",
    features_functions: "The function takes two numbers as input and returns their sum."
  },
  language: "TypeScript",
  executionFlow: [],
  codeObjects: {
    functions: [
      {
        name: "add",
        type: "function",
        description: "This function calculates the sum of two numbers.",
        codeSnippet: "function add(num1: number, num2: number): number { return num1 + num2; }",
        codeLine: 10,
        codeIndent: 2,
        fileName: "myFile.ts",
        fileLocation: "./src/myFile.ts",
        isExported: true,
        isPrivate: false,
        isAsync: false,
        functionParameters: [
          { name: "num1", type: "number", description: "The first number to add.", example: "1" },
          { name: "num2", type: "number", description: "The second number to add.", example: "2" }
        ],
        functionReturns: { type: "number", description: "The sum of the two input numbers.", example: "3" }
      }
    ]
  }
};
```

- **Edge Cases:** None.
- **Dependencies:** This interface depends on the `codeSummary` and `CodeObject` interfaces.

### 📘 ExecutionFlow - CLASS
------------------------------------------------------------
**Description:** This class represents a step in the execution flow of a code file, including its description, importance, code snippet, line, indent, and file information.

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
- **Line:** 91
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ExecutionFlow` interface defines the structure for representing a step in the execution flow of a code file. It includes properties for the step number, description, importance, code snippet, line number, indentation level, and file information.
- **Usage Example:** 


```typescript
const flowStep: ExecutionFlow = {
  step: 1,
  stepDescription: 'Initialize variables',
  bImportant: true,
  codeSnippet: 'let myVar = 0;
let anotherVar = 'hello';',
  codeLine: 10,
  codeIndent: 2,
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts'
};
```


### 📘 FunctionParameter - CLASS
------------------------------------------------------------
**Description:** This class represents a parameter of a function, including its name, type, description, and example.

**Code Snippet:**
```
export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}
```
- **Line:** 102
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `FunctionParameter` interface defines the structure for representing a function parameter. It includes properties for the parameter's name, type, description, and an example value.
- **Usage Example:** 


```typescript
const param: FunctionParameter = {
  name: 'myParam',
  type: 'string',
  description: 'This is a parameter',
  example: 'hello world'
};
```


### 📘 FunctionReturn - CLASS
------------------------------------------------------------
**Description:** This class represents the return value of a function, including its type, description, and example.

**Code Snippet:**
```
export interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```
- **Line:** 103
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `FunctionReturn` class represents the return value of a function, providing information about its type, description, and an example.
- **Usage Example:** 


```typescript
const functionReturn = new FunctionReturn({
    type: 'string',
    description: 'This is a string',
    example: 'Example String'
});
```


### 📘 CodeObject - CLASS
------------------------------------------------------------
**Description:** This class represents a code object, including its name, type, description, code snippet, annotation, line, indent, file information, sub-objects, parent object, function parameters, return values, and flags for exported, function, class, private, and async.

**Code Snippet:**
```
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
- **Line:** 115
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObject` interface defines the structure for representing code objects within a project. It encompasses various attributes, including name, type, description, code snippet, annotation, line number, indentation, file information, sub-objects, parent object, function parameters, return values, and flags indicating whether the object is exported, a function, a class, private, or asynchronous.
- **Usage Example:** 


```typescript
const codeObj: CodeObject = {
  name: 'MyClass',
  type: 'class',
  description: 'A simple class example',
  codeSnippet: 'class MyClass { ... }',
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  isExported: true,
  isClass: true,
  isPrivate: false,
  isAsync: false
};
```


### 📘 Annotation - CLASS
------------------------------------------------------------
**Description:** This class represents an annotation for a code object, including purpose, parameters, returns, usage example, edge cases, dependencies, error handling, performance, and best practices.

**Code Snippet:**
```
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
- **Line:** 139
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `Annotation` interface defines the structure for annotations associated with code objects. It includes properties to capture various aspects of the code object, such as its purpose, parameters, return values, usage examples, edge cases, dependencies, error handling, performance considerations, and best practices.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const annotation: Annotation = {
  purpose: "This function calculates the sum of two numbers.",
  parameters: "num1: number, num2: number",
  returns: "number",
  usageExample: "const sum = add(1, 2);",
  edgeCases: "Negative numbers are not supported.",
  dependencies: "someDependency, anotherDependency",
  errorHandling: "Throws an error if the input is not a number.",
  performance: "Optimized for speed.",
  bestPractices: "Use this function for adding numbers to..."
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A
## functions


### 🔧 load_create_collection - FUNCTION
------------------------------------------------------------
**Description:** This function is specifc to Chroma DB. It loads or creates a collection in the Chroma DB vector database.

**Code Snippet:**
```
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
- **projectName** (string): The name of the project to load or create a collection for. 
 Example: myProject
###### Function Returns:
- **Type:** Collection | void
- **Description:** Returns a Collection object if the collection was successfully loaded or created, otherwise returns void.
- **Example:** collection
###### Annotations / Comments:
- **Purpose:** This function interacts with a ChromaDB vector database to either load an existing collection or create a new one based on the provided project name.
- **Parameters:** projectName: string - The name of the project for which the collection is being loaded or created.
- **Returns:** Collection | void - Returns a Collection object if the collection was successfully loaded or created, otherwise returns void.
- **Usage Example:** 
```
const collection = await load_create_collection('myProject');
```
- **Edge Cases:** If the collection is not found, the function attempts to create it. If there are errors connecting to the database or creating the collection, the function logs the error and returns void.
- **Dependencies:** ChromaDB library, makeWebSafe function from shared.ts, client object (ChromaDB client instance), prefix constant, embedder object (embedding function instance).

### 🔧 saveToVectorDatabase - FUNCTION
------------------------------------------------------------
**Description:** Saves code and associated RAG data to the loaded vector database.

**Code Snippet:**

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

- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): The name of the project to save the code to. 
 Example: myProject
- **code** (string): The code to save to the vector database. 
 Example: const myVariable = 'hello world';
- **ragData** (RagData): An object containing metadata and other information about the code. 
 Example: ragData
###### Function Returns:
- **Type:** boolean
- **Description:** Returns true if the code was successfully saved to the vector database, otherwise returns false.
- **Example:** true
###### Annotations / Comments:
- **Purpose:** This function saves code and associated RAG data to the loaded vector database. It uses the `embedder` to generate embeddings for the code and then adds the code, embeddings, and metadata to the ChromaDB collection.
- **Parameters:** - projectName: string - The name of the project to save the code to.
- code: string - The code to save to the vector database.
- ragData: RagData - An object containing metadata and other information about the code.
- **Returns:** boolean - Returns true if the code was successfully saved to the vector database, otherwise returns false.
- **Usage Example:** 


```typescript
const codeSnippet = `const myVariable = 'hello world';`;
const ragData = { metadata: { filename: 'myFile.ts', codeChunkId: 0, codeChunkLineStart: 1, codeChunkLineEnd: 1, codeObjects: {}, codeChunkSummary: 'This code snippet defines a variable.' }, documentData: codeSnippet, allSearchResults: { ids: [], embeddings: null, documents: [], metadatas: [], distances: null }, allResults: { documents: undefined, embeddings: null, metadatas: [] } };
await saveToVectorDatabase('myProject', codeSnippet, ragData);
```

- **Edge Cases:** - If the `embedderMode` is set to "OFF", the function will return false without saving the code.
- If the `embedder` is not initialized, the function will return false without saving the code.
- If there is an error creating the ChromaDB collection, the function will return false without saving the code.
- If there is an error generating embeddings or adding the code to the collection, the function will log the error and return false.
- **Dependencies:** - ChromaDB: For storing and retrieving code snippets.
- embedder: A function for generating embeddings (either GoogleGenerativeAiEmbeddingFunction or OpenAIEmbeddingFunction).

### 🔧 searchRAG - FUNCTION
------------------------------------------------------------
**Description:** Searches the loaded vector database for relevant code snippets based on a search string.

**Code Snippet:**
```
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
- **projectName** (string): The name of the project to search in. 
 Example: myProject
- **searchString** (string): The string to search for. 
 Example: function to calculate the sum of two numbers
- **bRetry** (boolean): Whether to retry the search if an error occurs. 
 Example: true
###### Function Returns:
- **Type:** RagData
- **Description:** Returns an object containing the search results, including metadata, embeddings, and document data.
- **Example:** ragData
###### Annotations / Comments:
- **Purpose:** The `searchRAG` function is responsible for querying the loaded vector database (using ChromaDB in this case) for relevant code snippets based on a provided search string. It leverages the `embedder` (which could be OpenAI, GCP, or disabled) to generate embeddings for both the search string and the existing code snippets in the database. It then uses these embeddings to find similar code snippets and returns a `RagData` object containing the search results.
- **Parameters:** - `projectName`: A string representing the name of the project associated with the vector database to search within.
- `searchString`: A string containing the text to search for in the database.
- `bRetry`: A boolean flag indicating whether to retry the search if an error occurs. Defaults to `true`.
- **Returns:** The function returns a `RagData` object. This object contains the following information:
- `metadata`: Metadata about the retrieved code snippet, including filename, chunk ID, line numbers, and a summary of the code chunk.
- `embeddings`: Embeddings for the retrieved code snippet (if available).
- `documentData`: The actual code snippet retrieved from the database.
- `allSearchResults`: The raw results from the ChromaDB query, including all retrieved documents, embeddings, and metadatas.
- `allResults`: A simplified version of the search results, containing only the documents, embeddings, and metadatas.
- **Usage Example:** 


```typescript
const searchTerm = "function to calculate the sum of two numbers";
const searchResults = await searchRAG("myProject", searchTerm);
console.log(searchResults.documentData); // Output: The code snippet matching the search term
```

- **Edge Cases:** - If the `embedderMode` is set to "OFF", the function will return an empty `RagData` object.
- If the `embedder` is not initialized, the function will return an empty `RagData` object.
- If there is an error creating the collection, the function will return an empty `RagData` object.
- If an error occurs during the search, the function will retry the search after a 30-second cooldown period if `bRetry` is set to `true`. Otherwise, it will return an empty `RagData` object.
- **Dependencies:** - `chromadb` library for interacting with the vector database.
- `embedder` (OpenAI, GCP, or disabled) for generating embeddings.

### 🔧 genCodeChunkObj - FUNCTION
------------------------------------------------------------
**Description:** Generates a CodeObject object for a given code chunk.

**Code Snippet:**
```
async function genCodeChunkObj(projectSummary:ProjectSummary, filePath:string, chunk:string):Promise<CodeObject>{
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectSummary** (ProjectSummary): An object containing information about the project. 
 Example: projectSummary
- **filePath** (string): The path to the file containing the code chunk. 
 Example: ./src/myFile.ts
- **chunk** (string): The code chunk to process. 
 Example: const myVariable = 'hello world';
###### Function Returns:
- **Type:** CodeObject
- **Description:** Returns a CodeObject object containing information about the code chunk.
- **Example:** codeObject
###### Annotations / Comments:
- **Purpose:** The `genCodeChunkObj` function processes a code chunk from a file and extracts information about code objects (classes, functions, variables, types, interfaces, imports, and exports) within that chunk. It uses a language model (LLM) to analyze the code and generate a `CodeObject` object that summarizes the identified code objects.
- **Parameters:** - `projectSummary`: An object containing information about the project, including team context and other relevant data.
- `filePath`: The path to the file containing the code chunk.
- `chunk`: The code chunk to be processed.
- **Returns:** The function returns a `CodeObject` object. This object contains information about the code objects found within the chunk, including their names, types, descriptions, code snippets, and other relevant details.
- **Usage Example:** 


```typescript
const codeChunk = "// This is a code chunk
const myVariable = 'hello world';";
const codeObject = await genCodeChunkObj(projectSummary, './src/myFile.ts', codeChunk);
```

- **Edge Cases:** The function handles cases where no code objects are found within the chunk. In such cases, it returns an empty `CodeObject` object.
- **Dependencies:** - `callLLM`: A function that calls the LLM to analyze the code chunk.
- `classesPrompt`, `functionsPrompt`, etc.: Functions that generate prompts for the LLM to extract specific types of code objects.
- `mergeObjectArrays`: A function that merges arrays of code objects from different chunks.

### 🔧 mergeObjectArrays - FUNCTION
------------------------------------------------------------
**Description:** Merges two CodeObject objects, combining their arrays of code objects.

**Code Snippet:**
```
export function mergeObjectArrays(
  codeObjArray: CodeObject,
  newCodeObj: any
): CodeObject {
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **codeObjArray** (CodeObject): The existing CodeObject object to merge into. 
 Example: codeObjArray
- **newCodeObj** (any): The new CodeObject object to merge with the existing one. 
 Example: newCodeObj
###### Function Returns:
- **Type:** CodeObject
- **Description:** Returns a new CodeObject object with the merged arrays.
- **Example:** mergedCodeObj
###### Annotations / Comments:
- **Purpose:** The `mergeObjectArrays` function merges two `CodeObject` objects, combining their arrays of code objects. It iterates through the keys of the `newCodeObj` and checks if the key exists in the `mergedCodeObj`. If the key exists and both values are arrays, it merges the arrays. If the key doesn't exist, it adds the key-value pair to the `mergedCodeObj`. The function also removes duplicate code objects based on their `name` or `content` properties.
- **Parameters:** - `codeObjArray`: The existing `CodeObject` object to merge into. It contains arrays of code objects for different categories like classes, functions, variables, etc.
- `newCodeObj`: The new `CodeObject` object to merge with the existing one. It also contains arrays of code objects.
- **Returns:** The function returns a new `CodeObject` object with the merged arrays of code objects from both input objects.
- **Usage Example:** 


```typescript
const codeObjArray: CodeObject = {
  classes: [],
  functions: [],
  // ... other code object categories
};

const newCodeObj: CodeObject = {
  functions: [
    // ... new function code objects
  ],
  // ... other code object categories
};

const mergedCodeObj = mergeObjectArrays(codeObjArray, newCodeObj);
```

- **Edge Cases:** The function assumes that the values of the keys in both input objects are either arrays or strings. If a key has a value that is not an array or a string, it will throw an error. The function also assumes that the code objects have either a `name` or `content` property for duplicate removal. If a code object lacks both properties, it will not be checked for duplicates.
- **Dependencies:** The function relies on the `CodeObject` interface defined in the `objectSchemas.ts` file.

### 🔧 parseCodebase - FUNCTION
------------------------------------------------------------
**Description:** Parses a codebase, extracting code objects and generating a ProjectSummary object.

**Code Snippet:**
```
export async function parseCodebase(
  projectPath: string,
  projectName: string
): Promise<ProjectSummary> {
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectPath** (string): The path to the codebase to parse. 
 Example: ./myProject
- **projectName** (string): The name of the project. 
 Example: myProject
###### Function Returns:
- **Type:** ProjectSummary
- **Description:** Returns a ProjectSummary object containing information about the parsed codebase.
- **Example:** projectSummary
###### Annotations / Comments:
- **Purpose:** The `parseCodebase` function is responsible for parsing a codebase, extracting code objects (classes, functions, variables, etc.), and generating a `ProjectSummary` object that encapsulates information about the parsed codebase.
- **Parameters:** - `projectPath`: A string representing the path to the codebase to be parsed. For example, `./myProject`.
- `projectName`: A string representing the name of the project. For example, `myProject`.
- **Returns:** The function returns a `ProjectSummary` object, which is an interface defined in the `objectSchemas.ts` file. This object contains various information about the parsed codebase, including:
- `projectName`: The name of the project.
- `projectDescription`: A `codeSummary` object containing a summary of the project's goal and features.
- `projectDependencies`: An array of `moduleObject` objects representing the project's dependencies.
- `projectLocation`: The path to the project's root directory.
- `projectTechStackDescription`: A string describing the project's technology stack.
- `codeFiles`: An array of `CodeFileSummary` objects, each representing a code file in the project.
- `ragData`: An array of `RagData` objects, containing information about the code chunks and their embeddings for use with the RAG (Retrieval-Augmented Generation) system.
- `teamContext`: A string containing context about the project and team.
- **Usage Example:** 


```typescript
const projectSummary = await parseCodebase('./myProject', 'myProject');
```

- **Edge Cases:** The function handles large files by breaking them into chunks and processing them separately. It also includes logic to handle potential errors during file reading, globbing, and LLM calls.
- **Dependencies:** - `glob`: For finding files in the codebase.
- `fs/promises`: For reading files.
- `objectSchemas`: For defining the data structures used to represent the project summary.
- `llmInterface`: For interacting with the LLM (Large Language Model) to extract information from code.
- `prompt`: For generating prompts for the LLM.
- `vectorDB`: For storing and retrieving code snippets using ChromaDB.
- `shared`: For utility functions like breaking code into chunks, getting token counts, and colorizing text.
- `dotenv/config`: For loading environment variables.

### 🔧 findCorrectCodeLineForObject - FUNCTION
------------------------------------------------------------
**Description:** Finds the correct line number for each code object in a given code snippet.

**Code Snippet:**
```
export function findCorrectCodeLineForObject(codeObj: CodeObject, code: string): CodeObject {
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **codeObj** (CodeObject): The CodeObject object to find the line number for. 
 Example: codeObj
- **code** (string): The code snippet to search within. 
 Example: const myVariable = 'hello world';
###### Function Returns:
- **Type:** CodeObject
- **Description:** Returns the CodeObject object with the updated codeLine property.
- **Example:** codeObj
###### Annotations / Comments:
- **Purpose:** The `findCorrectCodeLineForObject` function iterates through each code object within a provided `CodeObject` and attempts to locate the corresponding line number within the given code snippet. It uses a fuzzy matching approach to find the start line of a code snippet within the larger code.
- **Parameters:** - `codeObj`: A `CodeObject` containing code objects to find line numbers for.
- `code`: A string representing the code snippet to search within.
- **Returns:** The function returns the `CodeObject` with the updated `codeLine` property for each code object. If a line number cannot be found, the `codeLine` property is set to -2.
- **Usage Example:** 


```typescript
const codeObj = {
  classes: [
    {
      name: 'MyClass',
      type: 'class',
      description: 'A simple class',
      codeSnippet: 'class MyClass { ... }',
      codeLine: -2,
      codeIndent: 0,
      fileName: 'myFile.ts',
      fileLocation: './myFile.ts',
      subObjects: []
    }
  ]
};

const code = `
class MyClass {
  constructor() {
    // ...
  }
}
`;

const updatedCodeObj = findCorrectCodeLineForObject(codeObj, code);

console.log(updatedCodeObj); // Output: The codeObj with updated codeLine for each code object
```

- **Edge Cases:** The function might not be able to find the exact line number for a code object if the code snippet is heavily modified or if the code object is not present in the code snippet.
- **Dependencies:** The function relies on the `CodeObject` interface defined in the `objectSchemas.ts` file.

### 🔧 getIgnoredFiles - FUNCTION
------------------------------------------------------------
**Description:** Gets a list of ignored files from .gitignore and .fofoignore files.

**Code Snippet:**
```
async function getIgnoredFiles(projectPath: string): Promise<string[]> {
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectPath** (string): The path to the project directory. 
 Example: ./myProject
###### Function Returns:
- **Type:** string[]
- **Description:** Returns an array of glob patterns for ignored files.
- **Example:** ignorePatterns
###### Annotations / Comments:
- **Purpose:** The `getIgnoredFiles` function is responsible for retrieving a list of ignored files from the project's `.gitignore` and `.fofoignore` files. It aims to identify files that should be excluded from the documentation generation process.
- **Parameters:** The function takes a single parameter, `projectPath`, which is a string representing the path to the project directory. This parameter is used to locate the `.gitignore` and `.fofoignore` files within the project.
- **Returns:** The function returns a Promise that resolves to an array of strings. Each string in the array represents a glob pattern for ignored files. These patterns are used to filter out unwanted files during the documentation generation process.
- **Usage Example:** 


```typescript
const projectPath = './myProject';
const ignorePatterns = await getIgnoredFiles(projectPath);
```

- **Edge Cases:** The function handles the case where the `.gitignore` or `.fofoignore` files are not found. If a file is not found, the function logs a warning message and continues execution. It also handles the case where the files contain invalid glob patterns. In this case, the function ignores the invalid patterns and continues processing the valid ones.
- **Dependencies:** The function depends on the `fs` module for file system operations and the `path` module for path manipulation.

### 🔧 getFileSizeInKB - FUNCTION
------------------------------------------------------------
**Description:** Gets the size of a file in kilobytes.

**Code Snippet:**
```
async function getFileSizeInKB(filePath: string): Promise<number> {
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **filePath** (string): The path to the file. 
 Example: ./myFile.ts
###### Function Returns:
- **Type:** number
- **Description:** Returns the size of the file in kilobytes.
- **Example:** size
###### Annotations / Comments:
- **Purpose:** This function retrieves the size of a file in kilobytes using the `stat` function from the `fs/promises` module.
- **Parameters:** - `filePath`: A string representing the path to the file.
- **Returns:** A Promise that resolves to a number representing the file size in kilobytes.
- **Usage Example:** 


```typescript
const fileSizeKB = await getFileSizeInKB('./myFile.ts');
console.log(`File size: ${fileSizeKB} KB`);
```

- **Edge Cases:** If the file does not exist or cannot be accessed, the Promise will reject with an error.
- **Dependencies:** - `fs/promises` module

### 🔧 isFileTooLarge - FUNCTION
------------------------------------------------------------
**Description:** Checks if a file is too large based on a maximum file size and character limit.

**Code Snippet:**
```
async function isFileTooLarge(
  filePath: string,
  maxFileSizeKB: number,
  maxChars: number = 300
): Promise<boolean> {
```
- **Line:** Could Not Verify Line
- **Location:** codeParser.ts (./src/codeParser.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **filePath** (string): The path to the file. 
 Example: ./myFile.ts
- **maxFileSizeKB** (number): The maximum file size in kilobytes. 
 Example: 1024
- **maxChars** (number): The maximum number of characters allowed in the file. 
 Example: 300
###### Function Returns:
- **Type:** boolean
- **Description:** Returns true if the file is too large, otherwise returns false.
- **Example:** true
###### Annotations / Comments:
- **Purpose:** The `isFileTooLarge` function determines if a given file exceeds a specified size limit in kilobytes and a character limit. It first checks the character count of the file content using the `getTokens` function. If the character count exceeds the `maxChars` limit, the function immediately returns `true`. Otherwise, it proceeds to calculate the file size in kilobytes using the `getFileSizeInKB` function and compares it to the `maxFileSizeKB` limit. If the file size exceeds the limit, the function returns `true`; otherwise, it returns `false`.
- **Parameters:** - `filePath`: A string representing the path to the file to be checked.
- `maxFileSizeKB`: A number representing the maximum allowed file size in kilobytes.
- `maxChars`: An optional number representing the maximum number of characters allowed in the file. Defaults to 300.
- **Returns:** A boolean value indicating whether the file is too large (`true`) or not (`false`).
- **Usage Example:** 


```typescript
const isLarge = await isFileTooLarge('./myFile.ts', 1024, 500);
console.log(isLarge); // true if the file is larger than 1024KB or has more than 500 characters
```

- **Edge Cases:** The function assumes that the file exists and is accessible. If the file does not exist or is inaccessible, the function will throw an error.
- **Dependencies:** - `stat` from `fs/promises` for getting file stats.
- `readFileSync` from `fs` for reading file content.
- `getTokens` from `shared` for calculating character count.
- `getFileSizeInKB` from `shared` for calculating file size in kilobytes.

### 🔧 getRelevantCodeSnippets - FUNCTION
------------------------------------------------------------
**Description:** Retrieves relevant code snippets from the vector database based on a code object's description.

**Code Snippet:**
```
async function getRelevantCodeSnippets(
  codeObj: CodeObject,
  projectName: string
): Promise<string> {
```
- **Line:** Could Not Verify Line
- **Location:** annotations.ts (./src/annotations.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **codeObj** (CodeObject): The code object to retrieve relevant snippets for. 
 Example: codeObj
- **projectName** (string): The name of the project. 
 Example: myProject
###### Function Returns:
- **Type:** string
- **Description:** Returns a string containing the relevant code snippets.
- **Example:** relevantCodeSnippets
###### Annotations / Comments:
- **Purpose:** The `getRelevantCodeSnippets` function retrieves relevant code snippets from the vector database based on a code object's description. It searches the database using the provided `projectName` and the `codeObj.description`.
- **Parameters:** - `codeObj`: A `CodeObject` representing the code snippet for which relevant snippets are being retrieved.
- `projectName`: A string representing the name of the project.
- **Returns:** The function returns a string containing the relevant code snippets retrieved from the vector database. If no relevant snippets are found, it returns an empty string.
- **Usage Example:** 


```typescript
const codeSnippet = await getRelevantCodeSnippets(codeObject, "myProject");
console.log(codeSnippet); // Output: Relevant code snippets from the database
```

- **Edge Cases:** If the vector database is not configured or if no relevant code snippets are found, the function will return an empty string.
- **Dependencies:** - `searchRAG`: A function that searches the vector database for relevant code snippets.

### 🔧 annotateCodeObject - FUNCTION
------------------------------------------------------------
**Description:** Annotates a code object with detailed comments and information.

**Code Snippet:**
```
async function annotateCodeObject(
  codeObj: CodeObject,
  context: string,
  projectName?: string
): Promise<Annotation> {
```
- **Line:** Could Not Verify Line
- **Location:** annotations.ts (./src/annotations.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **codeObj** (CodeObject): The code object to annotate. 
 Example: codeObj
- **context** (string): The context of the codebase. 
 Example: context
- **projectName** (string): The name of the project. 
 Example: myProject
###### Function Returns:
- **Type:** Annotation
- **Description:** Returns an Annotation object containing the generated annotations.
- **Example:** annotation
###### Annotations / Comments:
- **Purpose:** The `annotateCodeObject` function is responsible for generating annotations for a given code object. It takes the code object, the context of the codebase, and optionally the project name as input. It then uses a large language model (LLM) to generate annotations based on the provided information.
- **Parameters:** - `codeObj`: A `CodeObject` representing the code snippet to be annotated.
- `context`: A string containing the context of the codebase, which can include information about the project, team, and other relevant code snippets.
- `projectName`: An optional string representing the name of the project. This can be used to provide additional context to the LLM.
- **Returns:** The function returns an `Annotation` object containing the generated annotations. The `Annotation` object includes information about the purpose, parameters, returns, usage example, edge cases, dependencies, error handling, performance, and best practices of the code object.
- **Usage Example:** 


```typescript
const annotation = await annotateCodeObject(codeObj, context, projectName);
```

- **Edge Cases:** The function may encounter edge cases if the LLM is unable to generate accurate annotations based on the provided context or if the code object is complex or poorly documented.
- **Dependencies:** The function depends on the `annotateCodeObjectPrompt` function to generate the prompt for the LLM and the `infer` function to call the LLM and retrieve the annotations.

### 🔧 annotateProject - FUNCTION
------------------------------------------------------------
**Description:** Annotates all code objects in a project.

**Code Snippet:**
```
export async function annotateProject(
  projectSummary: ProjectSummary,
  outputDir: string
) {
```
- **Line:** Could Not Verify Line
- **Location:** annotations.ts (./src/annotations.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectSummary** (ProjectSummary): The ProjectSummary object containing the project's code. 
 Example: projectSummary
- **outputDir** (string): The directory to save the annotations to. 
 Example: ./output
###### Function Returns:
- **Type:** ProjectSummary
- **Description:** Returns the ProjectSummary object with the annotated code objects.
- **Example:** projectSummary
###### Annotations / Comments:
- **Purpose:** The `annotateProject` function iterates through all code objects within a project, generates an annotation for each object using the `annotateCodeObject` function, and then updates the `projectSummary` object with the annotations. It also saves the annotations to a JSON file in the specified output directory.
- **Parameters:** - `projectSummary`: A `ProjectSummary` object containing information about the project, including its code files and code objects.
- `outputDir`: A string representing the directory where the annotations should be saved.
- **Returns:** The function returns the updated `ProjectSummary` object, which now includes the annotations for each code object.
- **Usage Example:** 


```typescript
// Assuming you have a ProjectSummary object called 'projectSummary' and an output directory called 'outputDir'
const annotatedProjectSummary = await annotateProject(projectSummary, outputDir);
```

- **Edge Cases:** - The function may encounter errors if the output directory cannot be created or if there are issues accessing the files in the project.
- The `annotateCodeObject` function may also encounter errors if the LLM fails to generate an annotation.
- **Dependencies:** - `fs`: Node.js module for file system operations.
- `path`: Node.js module for working with file paths.
- `annotateCodeObject`: A function that generates annotations for individual code objects.
- `addCodeObjectBackToProjectSummaryObject`: A function that updates the `projectSummary` object with the annotations.

### 🔧 addCodeObjectBackToProjectSummaryObject - FUNCTION
------------------------------------------------------------
**Description:** Adds an annotation to a code object and updates the ProjectSummary object.

**Code Snippet:**
```
const addCodeObjectBackToProjectSummaryObject = (
  codeObj: CodeObject,
  annotation: Annotation,
  projectSummary: ProjectSummary
) => {
```
- **Line:** Could Not Verify Line
- **Location:** annotations.ts (./src/annotations.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **codeObj** (CodeObject): The code object to add the annotation to. 
 Example: codeObj
- **annotation** (Annotation): The annotation to add to the code object. 
 Example: annotation
- **projectSummary** (ProjectSummary): The ProjectSummary object to update. 
 Example: projectSummary
###### Function Returns:
- **Type:** ProjectSummary
- **Description:** Returns the updated ProjectSummary object.
- **Example:** projectSummary
###### Annotations / Comments:
- **Purpose:** This function takes a `CodeObject`, an `Annotation`, and a `ProjectSummary` as input. It adds the annotation to the code object and updates the ProjectSummary object with the annotated code object.
- **Parameters:** - `codeObj`: The code object to add the annotation to. It is of type `CodeObject`.
- `annotation`: The annotation to add to the code object. It is of type `Annotation`.
- `projectSummary`: The ProjectSummary object to update. It is of type `ProjectSummary`.
- **Returns:** The function returns the updated `ProjectSummary` object.
- **Usage Example:** 


```typescript
const updatedProjectSummary = addCodeObjectBackToProjectSummaryObject(codeObject, annotation, projectSummary);
```


### 🔧 summarizeAllFiles - FUNCTION
------------------------------------------------------------
**Description:** Summarizes all files in a project.

**Code Snippet:**
```
async function summarizeAllFiles(
  codeFiles: CodeFileSummary[]
): Promise<string> {
```
- **Line:** Could Not Verify Line
- **Location:** annotations.ts (./src/annotations.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **codeFiles** (CodeFileSummary[]): An array of CodeFileSummary objects representing the project's files. 
 Example: codeFiles
###### Function Returns:
- **Type:** string
- **Description:** Returns a string containing the summary of all files.
- **Example:** summary
###### Annotations / Comments:
- **Purpose:** The `summarizeAllFiles` function iterates through an array of `CodeFileSummary` objects, each representing a code file in a project. For each file, it extracts the file name and the goal of the code as described in the `codeSummary` object. It then concatenates these pieces of information into a formatted string, creating a high-level summary of the project's files.
- **Parameters:** The function takes one parameter: `codeFiles`, which is an array of `CodeFileSummary` objects. Each `CodeFileSummary` object contains information about a single code file, including its name, location, summary, language, execution flow, and code objects.
- **Returns:** The function returns a string containing the summary of all files. The summary is formatted as a list of file names and their corresponding code summaries.
- **Usage Example:** 


```typescript
// Example usage:
const codeFiles = [
  {
    fileName: "index.ts",
    fileLocation: "./src/index.ts",
    codeSummary: {
      goal: "This file defines the main entry point for the application."
    }
  },
  {
    fileName: "utils.ts",
    fileLocation: "./src/utils.ts",
    codeSummary: {
      goal: "This file contains utility functions for the application."
    }
  }
];

summarizeAllFiles(codeFiles).then(summary => {
  console.log(summary);
});
```


### 🔧 wait - FUNCTION
------------------------------------------------------------
**Description:** Waits for a specified amount of time.

**Code Snippet:**
```
async function wait(ms: number) {
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **ms** (number): The amount of time to wait in milliseconds. 
 Example: 1000
###### Function Returns:
- **Type:** Promise<void>
- **Description:** Returns a Promise that resolves after the specified time.
- **Example:** undefined
###### Annotations / Comments:
- **Purpose:** The `wait` function pauses execution for a specified duration in milliseconds.
- **Parameters:** The function accepts a single parameter, `ms`, which represents the time to wait in milliseconds.
- **Returns:** The function returns a Promise that resolves after the specified time. The Promise resolves with `undefined`.
- **Usage Example:** 


```typescript
async function myFunction() {
  console.log('Starting...');
  await wait(1000); // Wait for 1 second
  console.log('Continuing...');
}
myFunction();
```

- **Edge Cases:** The function does not handle negative values for `ms`. If a negative value is provided, the function will likely throw an error.

### 🔧 infer - FUNCTION
------------------------------------------------------------
**Description:** Calls an LLM (Large Language Model) to infer information based on a prompt.

**Code Snippet:**
```
export async function infer(
  prompt: string,
  responseMode: "JSON object" | "YAML object" | "TEXT STRING" = "JSON object",
  responseKey?: string,
  bPro = false,
  bRetry = true,
  supplementalData?: any,
  model: string = textModel
): Promise<any> {
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **prompt** (string): The prompt to send to the LLM. 
 Example: What is the capital of France?
- **responseMode** ("JSON object" | "YAML object" | "TEXT STRING"): The expected format of the LLM's response. 
 Example: "JSON object"
- **responseKey** (string): The key to use for the response in the JSON object. 
 Example: response
- **bPro** (boolean): Whether to use the Pro version of the LLM. 
 Example: true
- **bRetry** (boolean): Whether to retry the inference if an error occurs. 
 Example: true
- **supplementalData** (any): Additional data to pass to the LLM. 
 Example: supplementalData
- **model** (string): The name of the LLM model to use. 
 Example: textModel
###### Function Returns:
- **Type:** Promise<any>
- **Description:** Returns a Promise that resolves with the LLM's response.
- **Example:** response
###### Annotations / Comments:
- **Purpose:** The `infer` function is a core component of the application, responsible for interacting with a Large Language Model (LLM) to obtain insights based on user-provided prompts.
- **Parameters:** - `prompt`: A string representing the question or instruction to be sent to the LLM. For example, "What is the capital of France?" or "Summarize the following code snippet..." 
- `responseMode`: Specifies the expected format of the LLM's response. It can be "JSON object", "YAML object", or "TEXT STRING". 
- `responseKey`:  (Optional)  The key to use for the response in the JSON object. This is only relevant when `responseMode` is set to "TEXT STRING". 
- `bPro`: A boolean indicating whether to use the Pro version of the LLM. 
- `bRetry`: A boolean indicating whether to retry the inference if an error occurs. 
- `supplementalData`:  (Optional)  Additional data to pass to the LLM. This could be context, previous responses, or other relevant information. 
- `model`: The name of the LLM model to use. This could be a specific model identifier like "textModel" or "codechat-bison".
- **Returns:** The `infer` function returns a Promise that resolves with the LLM's response. The response format depends on the `responseMode` parameter. It could be a JSON object, a YAML object, or a plain text string.
- **Usage Example:** 


```typescript
const response = await infer("What is the capital of France?", "TEXT STRING", "response");
console.log(response.response); // Output: Paris
```

- **Edge Cases:** The `infer` function handles potential errors by retrying the inference if `bRetry` is set to `true`. It also includes error handling for invalid JSON responses, attempting to fix them if possible. If the JSON cannot be fixed, it returns an error message as a JSON object.
- **Dependencies:** The `infer` function relies on external libraries like `ollama`, `openai`, and `@google-cloud/vertexai` to interact with different LLM backends.

### 🔧 validateJSON - FUNCTION
------------------------------------------------------------
**Description:** Validates if a string is a valid JSON object.

**Code Snippet:**
```
function validateJSON(jsonString: string): boolean {
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **jsonString** (string): The string to validate. 
 Example: jsonString
###### Function Returns:
- **Type:** boolean
- **Description:** Returns true if the string is a valid JSON object, otherwise returns false.
- **Example:** true
###### Annotations / Comments:
- **Purpose:** The `validateJSON` function checks if a given string is a valid JSON object. It attempts to parse the string using `JSON.parse` and returns `true` if successful, otherwise `false`.
- **Parameters:** The function takes one parameter: `jsonString` (string) - The string to be validated as a JSON object.
- **Returns:** The function returns a boolean value: `true` if the string is a valid JSON object, `false` otherwise.
- **Usage Example:** 


```typescript
const jsonString = '{ "name": "John", "age": 30 }';
const isValid = validateJSON(jsonString);
console.log(isValid); // Output: true
```

- **Edge Cases:** The function will return `false` if the input string is not a valid JSON object. This includes cases where the string is empty, contains invalid syntax, or is not properly formatted.
- **Dependencies:** The function relies on the built-in `JSON.parse` function.

### 🔧 fixJSON - FUNCTION
------------------------------------------------------------
**Description:** Attempts to fix a malformed JSON string.

**Code Snippet:**
```
function fixJSON(jsonString: string): string {
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **jsonString** (string): The malformed JSON string to fix. 
 Example: jsonString
###### Function Returns:
- **Type:** string
- **Description:** Returns the fixed JSON string.
- **Example:** jsonString
###### Annotations / Comments:
- **Purpose:** The `fixJSON` function attempts to repair a malformed JSON string using the `jsonrepair` library.
- **Parameters:** The function takes a single parameter, `jsonString`, which is a string representing the malformed JSON.
- **Returns:** The function returns a string representing the fixed JSON string, if successful. If the JSON cannot be fixed, it throws an error.
- **Usage Example:** 


```typescript
const malformedJSON = '{ "key": "value", "key2": "value2" }';
const fixedJSON = fixJSON(malformedJSON);
console.log(fixedJSON); // Output: { "key": "value", "key2": "value2" }
```

- **Edge Cases:** The function may not be able to fix all types of malformed JSON strings. It relies on the `jsonrepair` library, which has its own limitations.
- **Dependencies:** The function depends on the `jsonrepair` library.

### 🔧 parseYaml - FUNCTION
------------------------------------------------------------
**Description:** Parses a YAML string into a JSON object.

**Code Snippet:**
```
export function parseYaml(yamlString: string): any {
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **yamlString** (string): The YAML string to parse. 
 Example: yamlString
###### Function Returns:
- **Type:** any
- **Description:** Returns the parsed JSON object.
- **Example:** obj
###### Annotations / Comments:
- **Purpose:** The `parseYaml` function takes a YAML string as input and attempts to convert it into a JSON object using the `js-yaml` library.
- **Parameters:** yamlString: string - The YAML string to be parsed.
- **Returns:** any - Returns the parsed JSON object if successful, otherwise throws an error.
- **Usage Example:** 


```typescript
const yamlString = 'name: John Doe\nage: 30';
const jsonObject = parseYaml(yamlString);
console.log(jsonObject); // Output: { name: 'John Doe', age: 30 }
```

- **Edge Cases:** If the input YAML string is invalid or malformed, the function will throw an error.
- **Dependencies:** js-yaml library

### 🔧 parseText - FUNCTION
------------------------------------------------------------
**Description:** Parses a text string into a JSON object.

**Code Snippet:**
```
export function parseText(text: string, resKey = "response"): any {
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **text** (string): The text string to parse. 
 Example: text
- **resKey** (string): The key to use for the response in the JSON object. 
 Example: response
###### Function Returns:
- **Type:** any
- **Description:** Returns the parsed JSON object.
- **Example:** obj
###### Annotations / Comments:
- **Purpose:** The `parseText` function takes a text string as input and converts it into a JSON object. It creates a new object with a specified key (defaulting to "response") and assigns the input text to that key.
- **Parameters:** - `text`: A string representing the text to be parsed into a JSON object.
- `resKey`: An optional string specifying the key to use for the response in the resulting JSON object. Defaults to "response" if not provided.
- **Returns:** The function returns a JSON object containing the input text as the value for the specified key. The returned object is of type `any` to accommodate different data structures that might be parsed from the text.
- **Usage Example:** 


```typescript
const text = "This is a sample text string.";
const parsedObject = parseText(text, "myText");
console.log(parsedObject); // Output: { myText: "This is a sample text string." }
```

- **Edge Cases:** The function does not handle any specific edge cases. It assumes the input text is a valid string that can be converted into a JSON object. If the input text is not a valid string, the function will likely throw an error.

### 🔧 getCodeSummaryFromLLM - FUNCTION
------------------------------------------------------------
**Description:** Generates a code summary using an LLM.

**Code Snippet:**
```
export async function getCodeSummaryFromLLM(
  codeToSummarize: string,
  model: string = textModel
): Promise<codeSummary> {
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **codeToSummarize** (string): The code to summarize. 
 Example: codeToSummarize
- **model** (string): The name of the LLM model to use. 
 Example: textModel
###### Function Returns:
- **Type:** Promise<codeSummary>
- **Description:** Returns a Promise that resolves with the code summary.
- **Example:** codeSummary
###### Annotations / Comments:
- **Purpose:** The `getCodeSummaryFromLLM` function is designed to generate a concise summary of a given code block using a Large Language Model (LLM). It takes the code to be summarized as a string and optionally accepts the name of the LLM model to use. The function then constructs a prompt for the LLM, which includes the code block and instructions to summarize it, focusing on the code's goal and relevant features or functions. The LLM's response is parsed and returned as a `codeSummary` object, containing the code's goal and a description of its features.
- **Parameters:** - `codeToSummarize`: A string representing the code block to be summarized.
- `model`: An optional string specifying the name of the LLM model to use. Defaults to `textModel` if not provided.
- **Returns:** A Promise that resolves with a `codeSummary` object. The `codeSummary` object contains two properties:
- `goal`: A string summarizing the code's purpose and goal.
- `features_functions`: A string describing any relevant features or functions within the code.
- **Usage Example:** 


```typescript
const codeBlock = `// This is a simple function to add two numbers
function add(a: number, b: number): number {
  return a + b;
}
`;
const codeSummary = await getCodeSummaryFromLLM(codeBlock);
console.log(codeSummary); // Output: { goal: 'This code defines a simple function called add that takes two numbers as input and returns their sum.', features_functions: 'The add function takes two numbers as input and returns their sum.' }
```

- **Edge Cases:** The function may not be able to accurately summarize complex or highly specialized code. The quality of the summary depends on the capabilities of the LLM model used.
- **Dependencies:** - `infer`: A function that interacts with the LLM to generate responses.
- `codeSummary`: An interface defining the structure of the code summary object.

### 🔧 callLLM - FUNCTION
------------------------------------------------------------
**Description:** Calls an LLM to process a prompt and code snippet.

**Code Snippet:**
```
export async function callLLM(
  promptTemplate: string,
  projectContext: ProjectSummary,
  code: string,
  filePath: string,
  bRAG = false,
  model: string = textModel
): Promise<any> {
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **promptTemplate** (string): The template for the prompt to send to the LLM. 
 Example: promptTemplate
- **projectContext** (ProjectSummary): An object containing information about the project. 
 Example: projectContext
- **code** (string): The code snippet to process. 
 Example: code
- **filePath** (Data Not Available): Data Not Available 
 Example: Data Not Available
###### Annotations / Comments:
- **Purpose:** The `callLLM` function is responsible for interacting with a Large Language Model (LLM) to process a prompt and a code snippet. It takes a prompt template, project context, code snippet, file path, a flag indicating whether to use a Retrieval Augmented Generation (RAG) system, and the desired LLM model as input.
- **Parameters:** - `promptTemplate`: A string representing the template for the prompt to be sent to the LLM. It can include placeholders like `<relevant code>` and `<code snippet>` that will be replaced with actual values before sending the prompt.
- `projectContext`: An object of type `ProjectSummary` containing information about the project, such as the project name, description, dependencies, and code files.
- `code`: A string representing the code snippet to be processed by the LLM.
- `filePath`: A string representing the path to the file containing the code snippet.
- `bRAG`: A boolean flag indicating whether to use a RAG system. If true, the function will attempt to retrieve relevant code snippets from a vector database and include them in the prompt.
- `model`: A string representing the name of the LLM model to use. This can be a model from OpenAI, Ollama, or Vertex AI.
- **Returns:** The function returns a Promise that resolves to an object containing the response from the LLM. The specific structure of the response object depends on the LLM model and the type of response requested.
- **Usage Example:** 


```typescript
const promptTemplate = `Please summarize the following code: \n\n${code}\n\n`;
const projectContext = { ... };
const code = `// Code snippet to be processed`;
const filePath = './src/myFile.ts';
const response = await callLLM(promptTemplate, projectContext, code, filePath, false, 'gpt-3.5-turbo');
console.log(response); // Output: The LLM's response
```

- **Edge Cases:** - If the LLM returns an error, the function will catch the error and return an object containing the error information.
- If the rate limit for the LLM API is exceeded, the function will wait for a specified duration and retry the request.
- **Dependencies:** - `infer`: A function that sends a prompt to an LLM and returns the response.
- `searchRAG`: A function that searches a vector database for relevant code snippets.
## variables


### 🧮 CodeObjectType - VARIABLE
------------------------------------------------------------
**Description:** This variable defines a type alias for the different types of code objects that can be identified in a codebase. It includes 'class', 'function', 'variable', 'type', 'import', 'export', 'interface', and 'constructor'.

**Code Snippet:**
```
export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
```
- **Line:** 3
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines a type alias for the different types of code objects that can be identified in a codebase. It includes 'class', 'function', 'variable', 'type', 'import', 'export', 'interface', and 'constructor'.
- **Usage Example:** 


```typescript
const codeObjType: CodeObjectType = 'function';
```


### 🧮 CodeObjects - VARIABLE
------------------------------------------------------------
**Description:** This variable defines a type alias for the different categories of code objects that can be identified in a codebase. It includes 'classes', 'functions', 'variables', 'types', 'imports', 'exports', 'interfaces', 'fileName', and 'fileLocation'.

**Code Snippet:**
```
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'
```
- **Line:** 4
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines a type alias for the different categories of code objects that can be identified in a codebase. It includes 'classes', 'functions', 'variables', 'types', 'imports', 'exports', 'interfaces', 'fileName', and 'fileLocation'.
- **Usage Example:** 


```typescript
// Example usage:
const codeObjectType: CodeObjects = 'functions';
```


### 🧮 globResult - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents the results of a glob search. It includes two properties: 'glob' and 'ignore'.

**Code Snippet:**
```
export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}
```
- **Line:** 8
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `globResult` interface defines the structure of an object that represents the results of a glob search. It is used to store the glob patterns that match files and the patterns that should be ignored during the search.
- **Usage Example:** 


```typescript
const globResult: globResult = {
  glob: ['**/*.ts', '**/*.js'],
  ignore: ['node_modules/**', 'dist/**'],
};
```


### 🧮 llmRuntimeData - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents runtime data related to the use of a large language model (LLM). It includes properties for tracking the total number of tokens, characters, API calls, and costs associated with LLM interactions.

**Code Snippet:**
```
export interface llmRuntimeData {
    totalTokens: number;
    totalCharacters: number;
    totalCharactersOut: number;
    totalCharactersEmbed: number;
    totalCost: number;
    totalAPIcalls: number;

}
```
- **Line:** 14
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of an object that represents runtime data related to the use of a large language model (LLM). It includes properties for tracking the total number of tokens, characters, API calls, and costs associated with LLM interactions.

### 🧮 runtimeData - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents runtime data for the application. It includes properties for tracking the application version, project name, project path, output path, selected language model, and selected RAG service.

**Code Snippet:**
```
export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
```
- **Line:** 25
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `runtimeData` interface defines the structure of an object that stores runtime information for the application. This information is used to track various aspects of the application's execution, such as the version, project details, output location, and selected language models and RAG services.
- **Usage Example:** 


```typescript
const runtimeData: runtimeData = {
  appVersion: '1.0.0',
  projectName: 'MyProject',
  projectPath: '/path/to/project',
  outputPath: '/path/to/output',
  selectedLLModel: 'gpt-3.5-turbo',
  selectedRAGService: 'OpenAI',
};
```


### 🧮 moduleObject - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents a module or package. It includes properties for the module's name, version, and description.

**Code Snippet:**
```
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
```
- **Line:** 33
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of an object that represents a module or package. It is used to store information about the name, version, and description of a module or package.
- **Usage Example:** 


```typescript
const moduleInfo: moduleObject = {
  name: "my-module",
  version: "1.0.0",
  description: "A useful module",
};
```


### 🧮 ProjectSummary - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents a summary of a project. It includes properties for the project name, description, location, technology stack description, dependencies, code files, RAG data, and team context.

**Code Snippet:**
```
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
- **Line:** 38
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `ProjectSummary` interface defines the structure of an object that represents a summary of a project. It is used to store and organize information about a codebase, including its name, description, location, technology stack, dependencies, code files, RAG data, and team context.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const projectSummary: ProjectSummary = {
  projectName: 'MyProject',
  projectDescription: {
    goal: 'This project is a simple web application...',
    features_functions: 'It has a login page, a user profile page, and a blog section.'
  },
  projectLocation: '/path/to/project',
  projectTechStackDescription: 'This is a TypeScript project with a React frontend and a Node.js backend.',
  projectDependencies: [
    { name: 'express', version: '4.18.2' },
    { name: 'react', version: '18.2.0' }
  ],
  codeFiles: [
    // ... code file summaries
  ],
  ragData: [
    // ... RAG data
  ],
  teamContext: 'This project is being developed by a team of engineers...'
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A

### 🧮 models - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents a model. It includes properties for the model's name and the model itself.

**Code Snippet:**
```
export interface models {
    name: string,
    model: any,
}
```
- **Line:** 49
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of an object that represents a model. It is used to store information about different LLM models, including their names and the model objects themselves.
- **Usage Example:** 


```typescript
const model: models = {
  name: "gpt-3.5-turbo",
  model: openai.models.gpt3_5_turbo
};
```


### 🧮 modelServiceConfig - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents a model service configuration. It includes properties for an array of models and an optional endpoint.

**Code Snippet:**
```
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}
```
- **Line:** 53
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of an object that represents a model service configuration. It is used to store information about the models available in a service and their optional endpoint.
- **Usage Example:** 


```typescript
const config: modelServiceConfig = {
  models: [
    {
      name: 'gpt-3.5-turbo',
      model: 'gpt-3.5-turbo',
      backend: 'OPENAI',
    },
  ],
  endpoint: 'https://api.openai.com/v1',
};
```


### 🧮 RagData - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents RAG data. It includes properties for metadata, embeddings, document data, all search results, and all results.

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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}
```
- **Line:** 58
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `RagData` interface defines the structure of an object that stores data related to Retrieval Augmented Generation (RAG). It's used to hold information retrieved from a vector database, which is then used to enhance the context for a language model.
- **Usage Example:** 


```typescript
const ragData: RagData = {
  metadata: {
    filename: 'myFile.ts',
    codeChunkId: 1,
    codeChunkLineStart: 10,
    codeChunkLineEnd: 20,
    codeObjects: {},
    codeChunkSummary: 'This code chunk defines a function...'
  },
  embeddings: [],
  documentData: '// This is the code chunk...',
  allSearchResults: {},
  allResults: {
    documents: [],
    embeddings: [],
    metadatas: []
  }
};
```

- **Dependencies:** This interface depends on the `CodeObject` interface, which defines the structure of code objects.

### 🧮 codeSummary - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents a code summary. It includes properties for the goal of the code and a description of its features and functions.

**Code Snippet:**
```
export interface codeSummary {
    goal: string,
    features_functions: string,
  }
```
- **Line:** 78
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `codeSummary` interface defines the structure for an object that represents a code summary. It's used to store information about the code's goal and its features or functions.
- **Usage Example:** 


```typescript
const codeSummary: codeSummary = {
  goal: "This code calculates the sum of two numbers.",
  features_functions: "The code uses a function called `add` to perform the calculation."
};
```


### 🧮 CodeFileSummary - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents a summary of a code file. It includes properties for the file name, location, code summary, language, execution flow, and code objects.

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
- **Line:** 82
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `CodeFileSummary` interface defines the structure of an object that represents a summary of a code file. It is used to store information about a code file, including its name, location, code summary, language, execution flow, and code objects.
- **Usage Example:** 


```typescript
const codeFileSummary: CodeFileSummary = {
  fileName: "myFile.ts",
  fileLocation: "./src/myFile.ts",
  codeSummary: {
    goal: "This file implements a function to calculate the sum of two numbers.",
    features_functions: "The function takes two numbers as input and returns their sum."
  },
  language: "TypeScript",
  executionFlow: [],
  codeObjects: {
    functions: [
      {
        name: "add",
        type: "function",
        description: "This function calculates the sum of two numbers.",
        codeSnippet: "function add(num1: number, num2: number): number { return num1 + num2; }",
        codeLine: 10,
        codeIndent: 2,
        fileName: "myFile.ts",
        fileLocation: "./src/myFile.ts",
        isExported: true,
        isPrivate: false,
        isAsync: false,
        functionParameters: [
          {
            name: "num1",
            type: "number",
            description: "The first number to add.",
            example: "1"
          },
          {
            name: "num2",
            type: "number",
            description: "The second number to add.",
            example: "2"
          }
        ],
        functionReturns: {
          type: "number",
          description: "The sum of the two input numbers.",
          example: "3"
        }
      }
    ]
  }
};
```


### 🧮 ExecutionFlow - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents a step in the execution flow of a code file. It includes properties for the step number, description, importance, code snippet, line number, indent level, file name, and file location.

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
- **Line:** 91
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `ExecutionFlow` interface defines the structure of an object representing a step in the execution flow of a code file. It's used to store information about each step, including its description, code snippet, line number, and file location.
- **Usage Example:** 


```typescript
const executionFlow: ExecutionFlow = {
  step: 1,
  stepDescription: 'Initialize variables',
  bImportant: true,
  codeSnippet: 'let myVariable = 0;
let anotherVariable = 'hello';',
  codeLine: 10,
  codeIndent: 2,
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
};
```


### 🧮 FunctionParameter - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents a function parameter. It includes properties for the parameter name, type, description, and an example value.

**Code Snippet:**
```
export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}
```
- **Line:** 102
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of a function parameter object, which is used to represent a parameter passed to a function.
- **Parameters:** The interface has four properties:

- **name**: A string representing the name of the parameter.
- **type**: A string representing the data type of the parameter.
- **description**: A string providing a description of the parameter's purpose.
- **example**: A string providing an example value for the parameter.
- **Returns:** This interface does not return any value. It simply defines the structure of a function parameter object.
- **Usage Example:** 


```typescript
const functionParameter: FunctionParameter = {
  name: 'param1',
  type: 'string',
  description: 'This is the first parameter',
  example: 'Hello World'
};
```


### 🧮 FunctionReturn - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents a function return value. It includes properties for the return type, description, and an example value.

**Code Snippet:**
```
export interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```
- **Line:** 103
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of an object that represents a function return value. It includes properties for the return type, description, and an example value.

### 🧮 CodeObject - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents a code object. It includes properties for the object's name, type, description, code snippet, annotation, line number, indent level, content, file name, file location, sub-objects, parent object, function parameters, function returns, export status, function status, class status, private status, and async status.

**Code Snippet:**
```
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
- **Line:** 115
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `CodeObject` interface defines the structure of an object that represents a code element within a project. It provides a comprehensive representation of code objects, including their name, type, description, code snippet, and various attributes related to their functionality and context.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const codeObj: CodeObject = {
  name: 'myFunction',
  type: 'function',
  description: 'This function does something cool',
  codeSnippet: 'function myFunction() { ... }',
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  isExported: true,
  isPrivate: false,
  isAsync: false
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A

### 🧮 CodeObjectTypes - VARIABLE
------------------------------------------------------------
**Description:** This type alias defines the possible keys that can be used to access properties of a CodeObject.

**Code Snippet:**
```
export type CodeObjectTypes = 'name' | 'type' | 'description' | 'codeSnippet' | 'codeLine' | 'codeIndent' | 'fileName' | 'fileLocation' | 'subObjects' | 'parentObject' | 'functionParameters' | 'functionReturns' | 'isExported' | 'isFunction' | 'isClass' | 'isPrivate' | 'isAsync'
```
- **Line:** 136
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This type alias defines the possible keys that can be used to access properties of a CodeObject. It provides a standardized way to refer to the different attributes of a code object, such as its name, type, description, code snippet, line number, indentation, file name, file location, and other relevant information.
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
  fileLocation: './src/myFile.ts',
  isExported: true,
  isPrivate: false,
  isAsync: false
};

// Accessing properties using CodeObjectTypes
console.log(codeObject.name); // 'myFunction'
console.log(codeObject.type); // 'function'
console.log(codeObject.codeSnippet); // 'function myFunction() { ... }'
```


### 🧮 Annotation - VARIABLE
------------------------------------------------------------
**Description:** This interface defines the structure of an object that represents an annotation for a code object. It includes properties for the purpose, parameters, returns, usage example, edge cases, dependencies, error handling, performance considerations, and best practices.

**Code Snippet:**
```
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
- **Line:** 139
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `Annotation` interface defines the structure for storing annotations related to code objects. It provides properties to capture various aspects of a code object, such as its purpose, parameters, return values, usage examples, edge cases, dependencies, error handling, performance considerations, and best practices.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const annotation: Annotation = {
  purpose: "This function calculates the sum of two numbers.",
  parameters: "num1: number, num2: number",
  returns: "number",
  usageExample: "const sum = add(1, 2);",
  edgeCases: "Negative numbers are not supported.",
  dependencies: "someDependency, anotherDependency",
  errorHandling: "Throws an error if the input is not a number.",
  performance: "Optimized for speed.",
  bestPractices: "Use this function for adding numbers to...etc"
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A
## types


### 🏷️ CodeObjectType - TYPE
------------------------------------------------------------
**Description:** A type alias for the different types of code objects that can be identified in a codebase.

**Code Snippet:**
```
export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
```
- **Line:** 3
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines a set of possible values for the `type` property of a `CodeObject`. These values represent different categories of code elements, such as classes, functions, variables, types, imports, exports, interfaces, and constructors.
- **Usage Example:** 


```typescript
// Example usage of CodeObjectType
const codeObject: CodeObject = {
  type: 'function', // Using 'function' from CodeObjectType
  // ... other properties
};
```


### 🏷️ CodeObjects - TYPE
------------------------------------------------------------
**Description:** A type alias for the different types of code objects that can be identified in a codebase.

**Code Snippet:**
```
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'
```
- **Line:** 4
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines a set of strings representing different types of code objects that can be identified and analyzed within a codebase. These types include classes, functions, variables, types, imports, exports, interfaces, file names, and file locations.
- **Usage Example:** 


```typescript
// Example usage:
const codeObjectType: CodeObjects = 'functions';
```


### 🏷️ globResult - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a glob result object, which contains glob patterns and ignore patterns.

**Code Snippet:**
```
export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}
```
- **Line:** 8
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `globResult` interface defines the structure of a glob result object, which is used to store glob patterns and ignore patterns.
- **Usage Example:** 


```typescript
const globResult: globResult = {
  glob: ['**/*.ts', '**/*.js'],
  ignore: ['node_modules/**', 'dist/**'],
};
```


### 🏷️ llmRuntimeData - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a runtime data object for LLM usage, containing information about tokens, characters, costs, and API calls.

**Code Snippet:**
```
export interface llmRuntimeData {
    totalTokens: number;
    totalCharacters: number;
    totalCharactersOut: number;
    totalCharactersEmbed: number;
    totalCost: number;
    totalAPIcalls: number;

}
```
- **Line:** 14
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type defines the structure of a runtime data object for LLM usage, containing information about tokens, characters, costs, and API calls.
- **Usage Example:** 


```typescript
const runtimeData: llmRuntimeData = {
    totalTokens: 100,
    totalCharacters: 500,
    totalCharactersOut: 200,
    totalCharactersEmbed: 100,
    totalCost: 0.05,
    totalAPIcalls: 10,
};
```


### 🏷️ runtimeData - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a runtime data object, containing information about the application version, project name, paths, and selected models.

**Code Snippet:**
```
export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
```
- **Line:** 25
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `runtimeData` interface defines the structure of an object that stores runtime information for the application. This information is used to track various aspects of the application's execution, including the version, project details, paths, and selected models.
- **Usage Example:** 


```typescript
const runtimeInfo: runtimeData = {
  appVersion: '1.0.0',
  projectName: 'MyProject',
  projectPath: '/path/to/project',
  outputPath: '/path/to/output',
  selectedLLModel: 'gpt-3.5-turbo',
  selectedRAGService: 'ChromaDB'
};
```


### 🏷️ moduleObject - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a module object, containing information about the module name, version, and description.

**Code Snippet:**
```
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
```
- **Line:** 33
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `moduleObject` interface defines the structure for representing a module or package. It includes properties for the module's name, version, and description.
- **Usage Example:** 


```typescript
const myModule: moduleObject = {
  name: 'my-module',
  version: '1.0.0',
  description: 'A useful module',
};
```


### 🏷️ ProjectSummary - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a project summary object, containing information about the project name, description, location, tech stack, dependencies, code files, RAG data, and team context.

**Code Snippet:**
```
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
- **Line:** 38
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ProjectSummary` interface defines the structure of a project summary object, which is used to store and organize information about a codebase.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const projectSummary: ProjectSummary = {
  projectName: 'MyProject',
  projectDescription: {
    goal: 'This project is a simple web application...',
    features_functions: 'It has a login page, a user profile page, and a blog section.'
  },
  projectLocation: '/path/to/project',
  projectTechStackDescription: 'This is a TypeScript project with a React frontend and a Node.js backend.',
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
  teamContext: 'This project is being developed by a team of engineers...'
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A

### 🏷️ models - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a model object, containing information about the model name and model itself.

**Code Snippet:**
```
export interface models {
    name: string,
    model: any,
}
```
- **Line:** 49
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type defines the structure of a model object, which is used to represent a specific language model.
- **Usage Example:** 


```typescript
const myModel: models = {
  name: "gpt-3.5-turbo",
  model: openai.models.gpt3.gpt3_5_turbo,
};
```


### 🏷️ modelServiceConfig - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a model service configuration object, containing information about the models and an optional endpoint.

**Code Snippet:**
```
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}
```
- **Line:** 53
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `modelServiceConfig` interface defines the structure of a configuration object for a model service. It specifies the models available in the service and optionally includes an endpoint URL.
- **Usage Example:** 


```typescript
const config: modelServiceConfig = {
  models: [
    { name: 'gpt-3.5-turbo', model: 'gpt-3.5-turbo' },
    { name: 'text-davinci-003', model: 'text-davinci-003' },
  ],
  endpoint: 'https://api.example.com/models',
};
```


### 🏷️ RagData - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a RAG data object, containing metadata, embeddings, document data, search results, and all results.

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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}
```
- **Line:** 58
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `RagData` interface defines the structure of a data object used for storing and retrieving information from a Retrieval Augmented Generation (RAG) system. It is designed to hold metadata about code chunks, embeddings for similarity search, the actual code chunk itself, and results from RAG queries.
- **Usage Example:** 


```typescript
const ragData: RagData = {
  metadata: {
    filename: 'myFile.ts',
    codeChunkId: 1,
    codeChunkLineStart: 10,
    codeChunkLineEnd: 20,
    codeObjects: { /* Code objects for the chunk */ },
    codeChunkSummary: 'This chunk defines a function...'
  },
  embeddings: [ /* Array of embeddings */ ],
  documentData: '// Code chunk content', // The actual code chunk
  allSearchResults: { /* Results from RAG query */ },
  allResults: { /* All results from RAG query */ }
};
```

- **Dependencies:** The `RagData` interface depends on the following interfaces:

- `CodeObject`
- `QueryResponse` (from the `chromadb` library)
- `Embeddings` (from the `chromadb` library)
- `Metadata` (from the `chromadb` library)

### 🏷️ codeSummary - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a code summary object, containing information about the goal and features/functions of the code.

**Code Snippet:**
```
export interface codeSummary {
    goal: string,
    features_functions: string,
  }
```
- **Line:** 78
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `codeSummary` interface defines the structure for storing information about a code snippet's purpose and features.
- **Usage Example:** 


```typescript
const codeSummary: codeSummary = {
  goal: "This code calculates the sum of two numbers.",
  features_functions: "The code uses a function called `add` to perform the calculation."
};
```


### 🏷️ CodeFileSummary - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a code file summary object, containing information about the file name, location, summary, language, execution flow, and code objects.

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
- **Line:** 82
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeFileSummary` interface represents a code file within a project. It stores essential information about the file, including its name, location, summary, language, execution flow, and code objects.
- **Usage Example:** 


```typescript
const codeFileSummary: CodeFileSummary = {
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  codeSummary: {
    goal: 'This file implements a function to calculate the sum of two numbers.',
    features_functions: 'The function takes two numbers as input and returns their sum.'
  },
  language: 'TypeScript',
  executionFlow: [],
  codeObjects: {
    functions: [
      {
        name: 'add',
        type: 'function',
        description: 'Calculates the sum of two numbers.',
        codeSnippet: 'function add(num1: number, num2: number): number { return num1 + num2; }',
        codeLine: 10,
        codeIndent: 2,
        fileName: 'myFile.ts',
        fileLocation: './src/myFile.ts',
        isExported: true,
        isPrivate: false,
        isAsync: false,
        functionParameters: [
          { name: 'num1', type: 'number', description: 'The first number to add.', example: '1' },
          { name: 'num2', type: 'number', description: 'The second number to add.', example: '2' }
        ],
        functionReturns: { type: 'number', description: 'The sum of the two numbers.', example: '3' }
      }
    ]
  }
};
```


### 🏷️ ExecutionFlow - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of an execution flow step object, containing information about the step number, description, importance, code snippet, line, indent, and file details.

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
- **Line:** 91
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ExecutionFlow` interface defines the structure for representing a single step in an execution flow. It's used to store information about each step, including its description, code snippet, line number, indentation, and file details.
- **Usage Example:** 


```typescript
const executionFlowStep: ExecutionFlow = {
  step: 1,
  stepDescription: 'Initialize variables',
  bImportant: true,
  codeSnippet: 'let myVariable = 0;
let anotherVariable = 'hello';',
  codeLine: 10,
  codeIndent: 2,
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
};
```


### 🏷️ FunctionParameter - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a function parameter object, containing information about the parameter name, type, description, and example.

**Code Snippet:**
```
export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}
```
- **Line:** 102
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of a function parameter object, which is used to represent a parameter of a function within the codebase.
- **Parameters:** The interface has four properties:

- **name**: A string representing the name of the function parameter.
- **type**: A string representing the data type of the function parameter.
- **description**: A string providing a description of the function parameter's purpose.
- **example**: A string providing an example value for the function parameter.
- **Returns:** This interface does not return any value. It is used to define the structure of a function parameter object.
- **Usage Example:** 


```typescript
const functionParameter: FunctionParameter = {
  name: 'param1',
  type: 'string',
  description: 'This is the first parameter',
  example: 'Hello World'
};
```


### 🏷️ FunctionReturn - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a function return object, containing information about the return type, description, and example.

**Code Snippet:**
```
export interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```
- **Line:** 103
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of a function return object, which is used to represent the return value of a function.
- **Returns:** The `FunctionReturn` interface represents a function's return value, containing information about its type, description, and an example.
- **Usage Example:** 


```typescript
// Example usage of FunctionReturn interface
const functionReturn: FunctionReturn = {
    type: 'string',
    description: 'This function returns a string',
    example: 'Hello, world!'
};
```


### 🏷️ CodeObject - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of a code object, containing information about the name, type, description, code snippet, annotation, line, indent, file details, sub-objects, parent object, function parameters, function returns, and flags for exported, function, class, private, and async.

**Code Snippet:**
```
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
- **Line:** 115
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObject` interface defines the structure for representing code elements within a project. It includes information about the code's name, type, description, code snippet, and various attributes like line number, indentation, file location, function parameters, and return values. Additionally, it allows for storing annotations and flags indicating whether the code is exported, a function, a class, private, or asynchronous.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const codeObj: CodeObject = {
  name: 'myFunction',
  type: 'function',
  description: 'This function does something cool',
  codeSnippet: 'function myFunction() { ... }',
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  isExported: true,
  isAsync: false
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A

### 🏷️ CodeObjectTypes - TYPE
------------------------------------------------------------
**Description:** A type alias for the different types of code object properties that can be identified in a codebase.

**Code Snippet:**
```
export type CodeObjectTypes = 'name' | 'type' | 'description' | 'codeSnippet' | 'codeLine' | 'codeIndent' | 'fileName' | 'fileLocation' | 'subObjects' | 'parentObject' | 'functionParameters' | 'functionReturns' | 'isExported' | 'isFunction' | 'isClass' | 'isPrivate' | 'isAsync'
```
- **Line:** 136
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines a set of string literals representing the possible properties of a `CodeObject`.
- **Usage Example:** 


```typescript
const codeObjectTypes: CodeObjectTypes = 'name';
```


### 🏷️ Annotation - TYPE
------------------------------------------------------------
**Description:** An interface that defines the structure of an annotation object, containing information about the purpose, parameters, returns, usage example, edge cases, dependencies, error handling, performance, and best practices.

**Code Snippet:**
```
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
- **Line:** 139
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `Annotation` interface defines the structure for storing annotations related to code objects. It provides fields to capture various aspects of a code object, including its purpose, parameters, return values, usage examples, edge cases, dependencies, error handling, performance considerations, and best practices.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const annotation: Annotation = {
  purpose: 'This function calculates the sum of two numbers.',
  parameters: 'num1: number, num2: number',
  returns: 'number',
  usageExample: 'const sum = add(1, 2);',
  edgeCases: 'Negative numbers are not supported.',
  dependencies: 'someDependency, anotherDependency',
  errorHandling: 'Throws an error if the input is not a number.',
  performance: 'Optimized for speed.',
  bestPractices: 'Use this function for adding numbers to...',
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A
## imports


### 📥 Embeddings - IMPORT
------------------------------------------------------------
**Description:** Imports the Embeddings interface from the chromadb library.

**Code Snippet:**
```
import {  Embeddings, Metadata, QueryResponse } from "chromadb";
```
- **Line:** 1
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `Embeddings` interface from the `chromadb` library, which is likely used for working with vector embeddings in a vector database.
- **Dependencies:** chromadb
## exports


### 📤 CodeObjectType - EXPORT
------------------------------------------------------------
**Description:** Type alias for the different types of code objects that can be identified.

**Code Snippet:**
```
export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
```
- **Line:** 3
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object defines a type alias called `CodeObjectType` which represents the different types of code objects that can be identified in the codebase. This type alias is used to provide a consistent and structured way to represent these code objects throughout the application.
- **Returns:** This type alias returns a string representing the type of code object. The possible values are: 'class', 'function', 'variable', 'type', 'import', 'export', 'interface', and 'constructor'.
- **Usage Example:** 


```typescript
// Example usage of CodeObjectType
const codeObject: CodeObjectType = 'function';
```


### 📤 CodeObjects - EXPORT
------------------------------------------------------------
**Description:** Type alias for the different types of code objects that can be identified.

**Code Snippet:**
```
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'
```
- **Line:** 4
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object defines a type alias called `CodeObjects` which represents a union of string literals. These literals represent different types of code objects that can be identified and processed within the application.
- **Returns:** The type alias `CodeObjects` represents a union of string literals, which are used to identify different types of code objects.
- **Usage Example:** 


```typescript
// Example usage of CodeObjects type alias
const codeObjectType: CodeObjects = 'functions';
```


### 📤 globResult - EXPORT
------------------------------------------------------------
**Description:** Interface for the glob result object.

**Code Snippet:**
```
export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}
```
- **Line:** 8
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of a glob result object, which is used to store the results of a glob operation.
- **Usage Example:** 


```typescript
const globResult: globResult = {
  glob: ['**/*.ts', '**/*.js'],
  ignore: ['node_modules/**'],
};
```


### 📤 llmRuntimeData - EXPORT
------------------------------------------------------------
**Description:** Interface for the LLM runtime data object.

**Code Snippet:**
```
export interface llmRuntimeData {
    totalTokens: number;
    totalCharacters: number;
    totalCharactersOut: number;
    totalCharactersEmbed: number;
    totalCost: number;
    totalAPIcalls: number;

}
```
- **Line:** 14
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for an object that stores runtime data related to the LLM, including token counts, character counts, API call counts, and costs.

### 📤 runtimeData - EXPORT
------------------------------------------------------------
**Description:** Interface for the runtime data object.

**Code Snippet:**
```
export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
```
- **Line:** 25
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for runtime data used in the application.
- **Usage Example:** 


```typescript
const runtimeData: runtimeData = {
  appVersion: '1.0.0',
  projectName: 'MyProject',
  projectPath: '/path/to/project',
  outputPath: '/path/to/output',
  selectedLLModel: 'gpt-3.5-turbo',
  selectedRAGService: 'ChromaDB',
};
```


### 📤 moduleObject - EXPORT
------------------------------------------------------------
**Description:** Interface for the module object.

**Code Snippet:**
```
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
```
- **Line:** 33
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of a module object, which represents a package or dependency in a project.
- **Usage Example:** 


```typescript
const myModule: moduleObject = {
  name: 'my-module',
  version: '1.0.0',
  description: 'A useful module'
};
```


### 📤 models - EXPORT
------------------------------------------------------------
**Description:** Interface for the models object.

**Code Snippet:**
```
export interface models {
    name: string,
    model: any,
}
```
- **Line:** 49
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code defines an interface called `models` for representing LLM models. It specifies two properties: `name` (string) for the model's name and `model` (any) for the model itself.
- **Usage Example:** 


```typescript
interface models {
    name: string,
    model: any,
}
```


### 📤 modelServiceConfig - EXPORT
------------------------------------------------------------
**Description:** Interface for the model service config object.

**Code Snippet:**
```
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}
```
- **Line:** 53
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object defines an interface called `modelServiceConfig` which is used to configure the model service. It specifies the models available and an optional endpoint for the service.
- **Usage Example:** 


```typescript
const modelServiceConfig: modelServiceConfig = {
  models: [
    {
      name: 'phi3',
      model: 'phi3',
      backend: 'OLLAMA'
    }
  ],
  endpoint: 'http://localhost:11434'
};
```


### 📤 RagData - EXPORT
------------------------------------------------------------
**Description:** Interface for the RAG data object.

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
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}
```
- **Line:** 58
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `RagData` interface defines the structure for data related to Retrieval Augmented Generation (RAG). It stores metadata about code chunks, embeddings, document data, and search results.
- **Usage Example:** 


```typescript
const ragData: RagData = {
  metadata: {
    filename: 'myFile.ts',
    codeChunkId: 1,
    codeChunkLineStart: 10,
    codeChunkLineEnd: 20,
    codeObjects: {},
    codeChunkSummary: 'This code chunk defines a function...'
  },
  embeddings: [],
  documentData: '// This is the code chunk...',
  allSearchResults: {},
  allResults: {
    documents: [],
    embeddings: [],
    metadatas: []
  }
};
```

- **Dependencies:** The `RagData` interface depends on the following interfaces:

- `CodeObject`
- `QueryResponse`
- `Embeddings`
- `Metadata`

### 📤 codeSummary - EXPORT
------------------------------------------------------------
**Description:** Interface for the code summary object.

**Code Snippet:**
```
export interface codeSummary {
    goal: string,
    features_functions: string,
  }
```
- **Line:** 78
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object defines an interface named `codeSummary` which is used to represent a summary of a code block. It contains two properties: `goal` and `features_functions`.
- **Usage Example:** 


```typescript
const codeSummary: codeSummary = {
  goal: "This code block calculates the sum of two numbers.",
  features_functions: "The code block uses the `add` function to perform the calculation."
};
```


### 📤 CodeFileSummary - EXPORT
------------------------------------------------------------
**Description:** Interface for the code file summary object.

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
- **Line:** 82
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeFileSummary` interface defines the structure for storing information about a code file. It includes the file name, location, a summary of the code's purpose and features, the programming language used, an array of execution flow steps, and a collection of code objects representing elements like classes, functions, and variables.
- **Usage Example:** 


```typescript
const codeFileSummary: CodeFileSummary = {
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  codeSummary: {
    goal: 'This file implements a function to calculate the sum of two numbers.',
    features_functions: 'The file includes a function called `add` that takes two numbers as input and returns their sum.'
  },
  language: 'TypeScript',
  executionFlow: [],
  codeObjects: {
    functions: [
      {
        name: 'add',
        type: 'function',
        description: 'This function calculates the sum of two numbers.',
        codeSnippet: 'function add(num1: number, num2: number): number { return num1 + num2; }',
        codeLine: 10,
        codeIndent: 2,
        fileName: 'myFile.ts',
        fileLocation: './src/myFile.ts',
        isExported: true,
        isPrivate: false,
        isAsync: false,
        functionParameters: [
          { name: 'num1', type: 'number', description: 'The first number to add.', example: '1' },
          { name: 'num2', type: 'number', description: 'The second number to add.', example: '2' }
        ],
        functionReturns: { type: 'number', description: 'The sum of the two input numbers.', example: '3' }
      }
    ]
  }
};
```


### 📤 ExecutionFlow - EXPORT
------------------------------------------------------------
**Description:** Interface for the execution flow object.

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
- **Line:** 91
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for an object representing a step in the execution flow of a codebase. It is used to store information about each step, including its description, importance, code snippet, line number, indentation, and file location.
- **Usage Example:** 


```typescript
const executionFlow: ExecutionFlow[] = [
  {
    step: 1,
    stepDescription: 'Initialize the application',
    bImportant: true,
    codeSnippet: 'const app = express();',
    codeLine: 10,
    codeIndent: 2,
    fileName: 'index.ts',
    fileLocation: './src/index.ts'
  },
  {
    step: 2,
    stepDescription: 'Define a route',
    bImportant: false,
    codeSnippet: 'app.get('/api/users', (req, res) => { ... });',
    codeLine: 15,
    codeIndent: 2,
    fileName: 'index.ts',
    fileLocation: './src/index.ts'
  }
];
```


### 📤 FunctionParameter - EXPORT
------------------------------------------------------------
**Description:** Interface for the function parameter object.

**Code Snippet:**
```
export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}
```
- **Line:** 102
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of a function parameter object, which is used to represent a parameter passed to a function.
- **Parameters:**  - **name**: The name of the parameter.
 - **type**: The data type of the parameter.
 - **description**: A description of the parameter's purpose.
 - **example**: An example value for the parameter.
- **Returns:** This interface does not return any value. It is used to define the structure of a function parameter object.
- **Usage Example:** 


```typescript
// Example usage of the FunctionParameter interface
const functionParameter: FunctionParameter = {
    name: 'param1',
    type: 'string',
    description: 'This is the first parameter',
    example: 'Hello World'
};
```


### 📤 FunctionReturn - EXPORT
------------------------------------------------------------
**Description:** Interface for the function return object.

**Code Snippet:**
```
export interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```
- **Line:** 103
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of a function return object, which is used to represent the type, description, and example of a function's return value.
- **Usage Example:** 


```typescript
// Example usage of FunctionReturn interface
const functionReturn: FunctionReturn = {
    type: 'string',
    description: 'This function returns a string',
    example: 'Hello, world!'
};
```


### 📤 CodeObject - EXPORT
------------------------------------------------------------
**Description:** Interface for the code object.

**Code Snippet:**
```
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
- **Line:** 115
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObject` interface defines the structure for representing code objects within a project. It includes properties like name, type, description, code snippet, annotation, line number, indentation, file name, file location, sub-objects, parent object, function parameters, function returns, and flags indicating whether the object is exported, a function, a class, private, or asynchronous.
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
  fileLocation: './src/myFile.ts',
  isExported: true,
  isFunction: true,
  isClass: false,
  isPrivate: false,
  isAsync: false
};
```


### 📤 CodeObjectTypes - EXPORT
------------------------------------------------------------
**Description:** Type alias for the different types of code object properties.

**Code Snippet:**
```
export type CodeObjectTypes = 'name' | 'type' | 'description' | 'codeSnippet' | 'codeLine' | 'codeIndent' | 'fileName' | 'fileLocation' | 'subObjects' | 'parentObject' | 'functionParameters' | 'functionReturns' | 'isExported' | 'isFunction' | 'isClass' | 'isPrivate' | 'isAsync'
```
- **Line:** 136
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines a list of possible keys for a code object, representing the various properties that can be associated with a code snippet.

### 📤 Annotation - EXPORT
------------------------------------------------------------
**Description:** Interface for the annotation object.

**Code Snippet:**
```
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
- **Line:** 139
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of an annotation object, which is used to provide detailed comments and insights about code objects.
- **Usage Example:** 


```typescript
const annotation: Annotation = {
  purpose: 'This function calculates the sum of two numbers.',
  parameters: 'num1: number, num2: number',
  returns: 'number',
  usageExample: 'const sum = add(1, 2);',
  edgeCases: 'Negative numbers are not supported.',
  dependencies: 'someDependency, anotherDependency',
  errorHandling: 'Throws an error if the input is not a number.',
  performance: 'Optimized for speed.',
  bestPractices: 'Use this function for adding numbers to...',
};
```


### 📤 load_create_collection - EXPORT
------------------------------------------------------------
**Description:** Asynchronous function to load or create a collection in Chroma DB.

**Code Snippet:**
```
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
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This asynchronous function loads or creates a collection in Chroma DB, a vector database. It takes the project name as input and attempts to retrieve an existing collection with the specified name. If the collection doesn't exist, it creates a new one.
- **Parameters:** projectName: string - The name of the project for which the collection is being created or loaded.
- **Returns:** Collection | void - Returns a Chroma DB Collection object if the collection is successfully loaded or created. Returns void if an error occurs.
- **Edge Cases:** If the collection is not found, the function attempts to create it. If the creation fails, it returns void.
- **Dependencies:** ChromaDB library, makeWebSafe function, client object, prefix constant, embedder object.

### 📤 saveToVectorDatabase - EXPORT
------------------------------------------------------------
**Description:** Asynchronous function to save data to a vector database.

**Code Snippet:**

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

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function saves code snippets and their associated metadata to a vector database. It uses the `ChromaDB` library for embedding and storing the data.
- **Parameters:** - `projectName`: A string representing the name of the project. This is used to organize the data within the vector database.
- `code`: A string containing the code snippet to be saved.
- `ragData`: An object containing metadata about the code snippet, including the filename, code chunk ID, line numbers, and code objects.
- **Returns:** A boolean value indicating whether the code snippet was successfully saved to the vector database.
- **Usage Example:** 


```typescript
const projectName = 'my-project';
const code = '// Code snippet to save';
const ragData = {
  metadata: {
    filename: 'my-file.ts',
    codeChunkId: 0,
    codeChunkLineStart: 1,
    codeChunkLineEnd: 10,
    codeObjects: { ... },
    codeChunkSummary: 'Summary of the code chunk'
  },
  documentData: code,
  allSearchResults: { ... },
  allResults: { ... }
};

await saveToVectorDatabase(projectName, code, ragData);
```

- **Edge Cases:** - If the `embedderMode` is set to "OFF", the function will not save the data to the vector database.
- If the `embedderENGINE` is not set to "CHROMA_DB", the function will not save the data to the vector database.
- If the `embedder` is not initialized, the function will not save the data to the vector database.
- If there is an error creating the collection in the vector database, the function will return `false`.
- **Dependencies:** - `ChromaDB` library for embedding and storing data.
- `makeWebSafe` function from the `shared` module for sanitizing the project name.

### 📤 searchRAG - EXPORT
------------------------------------------------------------
**Description:** Asynchronous function to search a RAG database.

**Code Snippet:**
```
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
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function searches a RAG database for relevant code snippets based on a given search string. It uses the `embedder` to generate embeddings for the search string and then queries the ChromaDB collection using these embeddings. The function returns a `RagData` object containing the search results, including metadata, embeddings, and the retrieved document data.
- **Parameters:** - projectName: string - The name of the project associated with the RAG database.
- searchString: string - The search query to be used for retrieving relevant code snippets.
- bRetry: boolean (optional, default: true) - A flag indicating whether to retry the search if an error occurs. If set to true, the function will retry the search after a 30-second cooldown period.
- **Returns:** RagData - An object containing the search results, including metadata, embeddings, and the retrieved document data.
- **Usage Example:** 
```
const searchResults = await searchRAG('myProject', 'function to calculate the sum of two numbers');
```
- **Edge Cases:** - If the `embedderMode` is set to "OFF", the function will return an empty `RagData` object.
- If the `embedder` is not initialized, the function will return an empty `RagData` object.
- If an error occurs during the search, the function will return an empty `RagData` object unless `bRetry` is set to true, in which case it will retry the search after a 30-second cooldown period.
- **Dependencies:** - ChromaDB: For interacting with the vector database.
- embedder: An embedding function (either GoogleGenerativeAiEmbeddingFunction or OpenAIEmbeddingFunction) for generating embeddings.

### 📤 parseCodebase - EXPORT
------------------------------------------------------------
**Description:** Asynchronous function to parse a codebase and generate a ProjectSummary object.

**Code Snippet:**

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
  projectPath = projectPath.replace(/\/$/, "");
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

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `parseCodebase` function is an asynchronous function that parses a codebase (a directory or a single file) and generates a `ProjectSummary` object. This object contains information about the project, including its name, description, dependencies, technology stack, code files, and RAG data.
- **Parameters:** - `projectPath`: A string representing the path to the codebase to be parsed. It can be a directory or a single file.
- `projectName`: A string representing the name of the project.
- **Returns:** A `ProjectSummary` object containing information about the parsed codebase.
- **Usage Example:** 


```typescript
const projectSummary = await parseCodebase('./my-project', 'My Project');
```

- **Edge Cases:** - The function handles large files by breaking them into chunks and processing them separately.
- It also handles cases where the project path is a directory or a single file.
- It includes logic to determine the project's technology stack and dependencies based on the files found in the codebase.
- **Dependencies:** - `glob`: Used for finding files matching specific patterns.
- `fs/promises`: Used for reading files asynchronously.
- `objectSchemas`: Defines the interfaces and types used for representing project information.
- `llmInterface`: Provides functions for interacting with the LLM.
- `prompt`: Defines prompts for the LLM.
- `vectorDB`: Provides functions for interacting with the vector database.
- `shared`: Provides utility functions for handling text, code, and file operations.

### 📤 findCorrectCodeLineForObject - EXPORT
------------------------------------------------------------
**Description:** Function to find the correct code line for each object in a CodeObject.

**Code Snippet:**
```
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
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function takes a `CodeObject` and a string representing the entire code content as input. It iterates through each object within the `CodeObject` and attempts to find the correct line number in the code where the object's code snippet is located. It uses a fuzzy matching approach to find the start line of the code snippet within the code lines.
- **Parameters:** - `codeObj`: A `CodeObject` containing code objects with properties like `name`, `type`, `codeSnippet`, etc.
- `code`: A string representing the entire code content.
- **Returns:** The input `CodeObject` with updated `codeLine` properties for each object, indicating the line number where the object's code snippet is found. If the line number cannot be determined, the `codeLine` property is set to -2.
- **Usage Example:** 


```typescript
const codeObj = {
  "classes": [
    {
      "name": "MyClass",
      "type": "class",
      "codeSnippet": "class MyClass { ... }",
      "codeLine": -2,
      "codeIndent": 0,
      "fileName": "myFile.ts",
      "fileLocation": "./src/myFile.ts"
    }
  ]
};

const code = `
class MyClass {
  // ...
}
`;

const updatedCodeObj = findCorrectCodeLineForObject(codeObj, code);

console.log(updatedCodeObj); // Output: The codeObj with updated codeLine property for MyClass
```

- **Edge Cases:** The function uses fuzzy matching to find the start line of the code snippet. If the code snippet is not found or if there are multiple matches, the `codeLine` property might not be accurate.
- **Dependencies:** - `CodeObject` interface from the `objectSchemas.ts` file.

### 📤 mergeObjectArrays - EXPORT
------------------------------------------------------------
**Description:** Function to merge two CodeObject objects.

**Code Snippet:**
```
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

```
- **Line:** Could Not Verify Line
- **Location:** undefined (Unable to Load)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `mergeObjectArrays` function merges two `CodeObject` objects. It iterates through the keys of the `newCodeObj` and merges the values with the corresponding keys in the `codeObjArray`. If a key exists in both objects and the values are arrays, the arrays are concatenated. If a key does not exist in the `codeObjArray`, it is added with the value from the `newCodeObj`. The function also removes duplicate code objects based on their `name` or `content` properties.
- **Parameters:** - `codeObjArray`: The existing `CodeObject` object to be merged with.
- `newCodeObj`: The new `CodeObject` object to merge into the existing one.
- **Returns:** A new `CodeObject` object containing the merged data from both input objects.
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
    fileLocation: '/path/to/file1.ts',
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
    fileLocation: '/path/to/file2.ts',
    subObjects: []
  }]
};

const mergedCodeObj = mergeObjectArrays(codeObj1, codeObj2);

console.log(mergedCodeObj);
```

- **Edge Cases:** The function assumes that the values of the `CodeObject` objects are either arrays or strings. If a key has a value that is not an array or a string, it will be skipped.
- **Dependencies:** - `CodeObject` interface from the `objectSchemas` module.
## interfaces


### 🌉 globResult - INTERFACE
------------------------------------------------------------
**Description:** Interface for glob results, containing glob patterns and ignore patterns.

**Code Snippet:**


```typescript
export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}
```

- **Line:** 6
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `globResult` interface defines the structure for storing results from glob operations, which are used to find files matching specific patterns.

### 🌉 llmRuntimeData - INTERFACE
------------------------------------------------------------
**Description:** Interface for LLM runtime data, containing information about tokens, characters, cost, and API calls.

**Code Snippet:**


```typescript
export interface llmRuntimeData {
    totalTokens: number;
    totalCharacters: number;
    totalCharactersOut: number;
    totalCharactersEmbed: number;
    totalCost: number;
    totalAPIcalls: number;

}
```

- **Line:** 13
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `llmRuntimeData` interface defines a structure to track runtime data related to Large Language Model (LLM) interactions. It stores information about the total tokens, characters, cost, and API calls made during LLM usage.
- **Usage Example:** 


```typescript
const runtimeData: llmRuntimeData = {
    totalTokens: 100,
    totalCharacters: 500,
    totalCharactersOut: 200,
    totalCharactersEmbed: 100,
    totalCost: 0.05,
    totalAPIcalls: 2,
};
```


### 🌉 runtimeData - INTERFACE
------------------------------------------------------------
**Description:** Interface for runtime data, containing information about the application version, project name, paths, and selected models.

**Code Snippet:**


```typescript
export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
```

- **Line:** 23
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `runtimeData` interface defines the structure for storing runtime information about the application, including version, project details, paths, and selected models.
- **Usage Example:** 


```typescript
const runtimeInfo: runtimeData = {
  appVersion: '1.0.0',
  projectName: 'MyProject',
  projectPath: '/path/to/project',
  outputPath: '/path/to/output',
  selectedLLModel: 'gpt-3.5-turbo',
  selectedRAGService: 'OPENAI'
};
```


### 🌉 moduleObject - INTERFACE
------------------------------------------------------------
**Description:** Interface for module objects, containing information about module name, version, and description.

**Code Snippet:**


```typescript
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
```

- **Line:** 32
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `moduleObject` interface defines a structure for representing information about a module or package. It includes properties for the module's name, version, and description.
- **Usage Example:** 


```typescript
const myModule: moduleObject = {
  name: "my-module",
  version: "1.0.0",
  description: "A useful module",
};
```


### 🌉 ProjectSummary - INTERFACE
------------------------------------------------------------
**Description:** Interface for project summary, containing information about the project, its dependencies, code files, RAG data, and team context.

**Code Snippet:**


```typescript
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

- **Line:** 37
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ProjectSummary` interface defines the structure for storing information about a code project. It includes details like the project name, description, location, technology stack, dependencies, code files, RAG data, and team context.
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
    { name: "express", version: "4.18.2" },
    { name: "react", version: "18.2.0" }
  ],
  codeFiles: [
    // ... code file summaries
  ],
  ragData: [
    // ... RAG data
  ],
  teamContext: "This project is for..."
};
```


### 🌉 models - INTERFACE
------------------------------------------------------------
**Description:** Interface for models, containing information about model name and model object.

**Code Snippet:**


```typescript
export interface models {
    name: string,
    model: any,
}
```

- **Line:** 48
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `models` interface defines the structure for storing information about different language models used in the application. It includes the model's name and its corresponding model object.
- **Usage Example:** 


```typescript
const myModel: models = {
  name: "myModelName",
  model: // Model object
};
```


### 🌉 modelServiceConfig - INTERFACE
------------------------------------------------------------
**Description:** Interface for model service configuration, containing information about models and endpoint.

**Code Snippet:**


```typescript
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}
```

- **Line:** 52
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `modelServiceConfig` interface defines the configuration for a model service. It includes an array of `models` and an optional `endpoint`.
- **Usage Example:** 


```typescript
const modelConfig: modelServiceConfig = {
  models: [
    {
      name: 'phi3',
      model: 'phi3',
      backend: 'OLLAMA',
    },
  ],
  endpoint: 'http://localhost:11434',
};
```


### 🌉 RagData - INTERFACE
------------------------------------------------------------
**Description:** Interface for RAG data, containing metadata, embeddings, document data, and search results.

**Code Snippet:**


```typescript
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

- **Line:** 57
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `RagData` interface represents data associated with Retrieval Augmented Generation (RAG) in the context of code analysis. It stores metadata about code chunks, embeddings (numerical representations of the code), the actual code chunk itself, and search results from a vector database.
- **Usage Example:** 


```typescript
const ragData: RagData = {
  metadata: {
    filename: 'myFile.ts',
    codeChunkId: 1,
    codeChunkLineStart: 10,
    codeChunkLineEnd: 20,
    codeObjects: { /* Code objects */ },
    codeChunkSummary: 'This code chunk defines a function...'
  },
  embeddings: [ /* Array of embeddings */ ],
  documentData: '// Code chunk content', // The actual code chunk
  allSearchResults: { /* Search results from the vector database */ },
  allResults: { /* Additional search results */ }
};
```

- **Dependencies:** This interface relies on the `CodeObject` interface and the `QueryResponse`, `Embeddings`, and `Metadata` types from the `chromadb` library.

### 🌉 codeSummary - INTERFACE
------------------------------------------------------------
**Description:** Interface for code summary, containing information about the goal and features/functions of the code.

**Code Snippet:**


```typescript
export interface codeSummary {
    goal: string,
    features_functions: string,
  }
```

- **Line:** 77
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `codeSummary` interface defines the structure for storing information about the goal and features/functions of a code snippet.
- **Usage Example:** 


```typescript
const codeSummary: codeSummary = {
  goal: "This code snippet calculates the sum of two numbers.",
  features_functions: "The code uses the `add` function to perform the calculation."
};
```


### 🌉 CodeFileSummary - INTERFACE
------------------------------------------------------------
**Description:** Interface for code file summary, containing information about the file name, location, summary, language, execution flow, and code objects.

**Code Snippet:**


```typescript
export interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: codeSummary;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject;
}
```

- **Line:** 81
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeFileSummary` interface represents a summary of a code file. It stores information about the file's name, location, language, a summary of the code's purpose, any execution flow steps, and a collection of code objects found within the file.
- **Usage Example:** 


```typescript
const codeFileSummary: CodeFileSummary = {
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  codeSummary: {
    goal: 'This file implements a function to calculate the sum of two numbers',
    features_functions: 'The file contains a function called `add`'
  },
  language: 'TypeScript',
  executionFlow: [],
  codeObjects: {
    functions: [
      {
        name: 'add',
        type: 'function',
        description: 'This function adds two numbers together',
        codeSnippet: 'function add(a: number, b: number): number { return a + b; }',
        codeLine: 10,
        codeIndent: 2,
        fileName: 'myFile.ts',
        fileLocation: './src/myFile.ts',
        isExported: true,
        isPrivate: false,
        isAsync: false,
        functionParameters: [
          {
            name: 'a',
            type: 'number',
            description: 'The first number to add',
            example: '1'
          },
          {
            name: 'b',
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
**Description:** Interface for execution flow, containing information about the step number, description, importance, code snippet, line, indent, and file details.

**Code Snippet:**


```typescript
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

- **Line:** 90
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ExecutionFlow` interface defines the structure for representing a step in a code execution flow. It includes information about the step number, description, importance, code snippet, line number, indentation level, and file details.
- **Usage Example:** 


```typescript
const executionFlow: ExecutionFlow = {
  step: 1,
  stepDescription: 'Initialize variables',
  bImportant: true,
  codeSnippet: 'let myVariable = 0;
let anotherVariable = 'hello';',
  codeLine: 10,
  codeIndent: 2,
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
};
```


### 🌉 FunctionParameter - INTERFACE
------------------------------------------------------------
**Description:** Interface for function parameters, containing information about the parameter name, type, description, and example.

**Code Snippet:**


```typescript
export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}
```

- **Line:** 101
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `FunctionParameter` interface defines the structure for representing function parameters within the codebase. It provides a standardized way to store information about each parameter, including its name, type, description, and an example value.
- **Parameters:** The interface has four properties:

- `name`: A string representing the name of the parameter.
- `type`: A string representing the data type of the parameter.
- `description`: A string providing a detailed explanation of the parameter's purpose and usage.
- `example`: A string demonstrating an example value for the parameter.
- **Returns:** This interface does not return any value. It is used to define the structure of function parameters.
- **Usage Example:** 


```typescript
const functionParameters: FunctionParameter[] = [
    {
        name: 'param1',
        type: 'string',
        description: 'This is the first parameter',
        example: 'Hello World'
    },
    {
        name: 'param2',
        type: 'number',
        description: 'This is the second parameter',
        example: 123
    }
];
```


### 🌉 FunctionReturn - INTERFACE
------------------------------------------------------------
**Description:** Interface for function return values, containing information about the return type, description, and example.

**Code Snippet:**


```typescript
export interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```

- **Line:** 108
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `FunctionReturn` interface defines the structure for representing function return values. It includes properties for the return type, a description of the return value, and an example of the return value.
- **Usage Example:** 


```typescript
const functionResult: FunctionReturn = {
    type: 'string',
    description: 'This is a string return value',
    example: 'Hello, world!'
};
```


### 🌉 CodeObject - INTERFACE
------------------------------------------------------------
**Description:** Interface for code objects, containing information about the object name, type, description, code snippet, annotation, line, indent, file details, sub-objects, parent object, function parameters, return values, and flags for exported, function, class, private, and async.

**Code Snippet:**


```typescript
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

- **Line:** 114
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObject` interface defines a structure for representing code objects within a software project. It encompasses various attributes that provide comprehensive information about each code object, including its name, type, description, code snippet, annotations, line number, indentation level, file details, sub-objects, parent object, function parameters, return values, and flags indicating whether it's exported, a function, a class, private, or asynchronous.
- **Usage Example:** 


```typescript
const myFunction: CodeObject = {
  name: 'myFunction',
  type: 'function',
  description: 'This function does something amazing',
  codeSnippet: 'function myFunction() { ... }',
  codeLine: 10,
  codeIndent: 2,
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  isExported: true,
  isFunction: true,
  isClass: false,
  isPrivate: false,
  isAsync: false
};
```


### 🌉 Annotation - INTERFACE
------------------------------------------------------------
**Description:** Interface for annotations, containing information about the purpose, parameters, returns, usage example, edge cases, dependencies, error handling, performance, and best practices.

**Code Snippet:**


```typescript
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

- **Line:** 138
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `Annotation` interface defines the structure for storing annotations related to code objects. It provides properties to capture various aspects of a code object, including its purpose, parameters, return values, usage examples, edge cases, dependencies, error handling, performance considerations, and best practices.
- **Usage Example:** 


```typescript
const annotation: Annotation = {
  purpose: 'This function calculates the sum of two numbers.',
  parameters: 'num1: number, num2: number',
  returns: 'number',
  usageExample: 'const sum = add(1, 2);',
  edgeCases: 'Negative numbers are not supported.',
  dependencies: 'someDependency, anotherDependency',
  errorHandling: 'Throws an error if the input is not a number.',
  performance: 'Optimized for speed.',
  bestPractices: 'Use this function for adding numbers to...',
};
```

