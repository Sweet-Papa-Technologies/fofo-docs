# src/vectorDB.ts - fofo-docs

**Summary:** This code implements a vector database for storing and retrieving code snippets using ChromaDB. It provides functions to load or create a collection, save code snippets to the database, and search for relevant code snippets based on a given search string.

- **File Location:** ./src/vectorDB.ts
- **Language:** language: TypeScript 

## Table of Contents
- [classes](#classes)
- [functions](#functions)
- [variables](#variables)
- [types](#types)
- [imports](#imports)
- [interfaces](#interfaces)
## classes


### 📘 ChromaClient - CLASS
------------------------------------------------------------
**Description:** A class representing a ChromaDB client.

**Code Snippet:**


```typescript
const client = new ChromaClient(chromaSettings);
//
```

- **Line:** 75
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Function Returns:
- **Type:** Data Not Available
- **Description:** Data Not Available
- **Example:** Data Not Available
###### Annotations / Comments:
- **Purpose:** This code object creates a new instance of the `ChromaClient` class, which is used to interact with a ChromaDB vector database.
- **Parameters:** chromaSettings: An object containing settings for the ChromaDB client, including the path to the database and authentication credentials.
- **Returns:** An instance of the `ChromaClient` class.
- **Dependencies:** chromadb

### 📘 GoogleGenerativeAiEmbeddingFunction - CLASS
------------------------------------------------------------
**Description:** A class representing a Google Generative AI embedding function.

**Code Snippet:**


```typescript
embedder = new GoogleGenerativeAiEmbeddingFunction({
      googleApiKey: geminiKey,
    });
```

- **Line:** 34
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Function Returns:
- **Type:** Data Not Available
- **Description:** Data Not Available
- **Example:** Data Not Available
###### Annotations / Comments:
- **Purpose:** This class represents a Google Generative AI embedding function, which is used to generate embeddings for text data. Embeddings are numerical representations of text that can be used for tasks like similarity search and clustering.
- **Parameters:** The constructor takes a single parameter, `googleApiKey`, which is the API key for Google Generative AI.
- **Returns:** The class does not return any value. It is used to create an instance of the embedding function.
- **Usage Example:** 


```typescript
const embedder = new GoogleGenerativeAiEmbeddingFunction({
  googleApiKey: 'YOUR_API_KEY',
});

const embeddings = await embedder.generate(['This is a test sentence.']);
```

- **Edge Cases:** If the `googleApiKey` is invalid or missing, the constructor will throw an error.
- **Dependencies:** This class depends on the `@google-cloud/vertexai` library.

### 📘 OpenAIEmbeddingFunction - CLASS
------------------------------------------------------------
**Description:** A class representing an OpenAI embedding function.

**Code Snippet:**


```typescript
embedder = new OpenAIEmbeddingFunction({
      openai_api_key: process.env.OPENAI_API_KEY || "",
      openai_organization_id: process.env.OPENAI_ORG_ID || "",
      openai_model: process.env.OPENAI_EMBEDDER || "text-embedding-3-small",
    });
```

- **Line:** 40
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Function Returns:
- **Type:** Data Not Available
- **Description:** Data Not Available
- **Example:** Data Not Available
###### Annotations / Comments:
- **Purpose:** This class represents an OpenAI embedding function, which is used to generate embeddings for text data. Embeddings are numerical representations of text that can be used for tasks like similarity search and clustering.
- **Parameters:** The constructor takes the following parameters:
- `openai_api_key`: The API key for OpenAI.
- `openai_organization_id`: The organization ID for OpenAI.
- `openai_model`: The OpenAI model to use for embedding generation. The default value is `"text-embedding-3-small"`.
- **Returns:** The constructor returns an instance of the `OpenAIEmbeddingFunction` class.
- **Usage Example:** 


```typescript
const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY || "",
  openai_organization_id: process.env.OPENAI_ORG_ID || "",
  openai_model: process.env.OPENAI_EMBEDDER || "text-embedding-3-small",
});
```

- **Edge Cases:** If the OpenAI API key or organization ID is invalid, the embedding function will not work. Additionally, if the OpenAI model is not supported, an error will be thrown.
- **Dependencies:** This class depends on the `openai` library, which is used to interact with the OpenAI API.

### 📘 Collection - CLASS
------------------------------------------------------------
**Description:** A class representing a ChromaDB collection.

**Code Snippet:**


```typescript
import {
  ChromaClient,
  GoogleGenerativeAiEmbeddingFunction,
  OpenAIEmbeddingFunction,
  Collection,
} from "chromadb";
```

- **Line:** 3
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Function Returns:
- **Type:** Data Not Available
- **Description:** Data Not Available
- **Example:** Data Not Available
###### Annotations / Comments:
- **Purpose:** The `Collection` class represents a ChromaDB collection, which is a data structure used for storing and retrieving data in a vector database.
- **Usage Example:** 


```typescript
const client = new ChromaClient({ path: 'http://localhost:8000' });
const collection = await client.getOrCreateCollection({ name: 'my-collection', embeddingFunction: embedder });
```

- **Dependencies:** The `Collection` class depends on the `chromadb` library, which provides the functionality for interacting with ChromaDB.
## functions


### 🔧 load_create_collection - FUNCTION
------------------------------------------------------------
**Description:** This function is specifc to Chroma DB

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

- **Line:** 82
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): Name of the project 
 Example: MyProject
###### Function Returns:
- **Type:** Collection | void
- **Description:** Returns a Collection object if successful, otherwise undefined
- **Example:** undefined
###### Annotations / Comments:
- **Purpose:** This function loads or creates a collection in the ChromaDB vector database based on the provided project name.
- **Parameters:** projectName: string - The name of the project for which the collection is being loaded or created.
- **Returns:** Collection | void - Returns a Collection object if the collection is successfully loaded or created, otherwise returns undefined.
- **Edge Cases:** If the collection is not found, the function attempts to create it again. If there is an error connecting to the database or creating the collection, the function returns undefined.
- **Dependencies:** ChromaDB client, makeWebSafe function, embedder (GoogleGenerativeAiEmbeddingFunction or OpenAIEmbeddingFunction)

### 🔧 saveToVectorDatabase - FUNCTION
------------------------------------------------------------
**Description:** Save to Loaded Vector Database

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

- **Line:** 125
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): Name of the project 
 Example: MyProject
- **code** (string): Code to be saved 
 Example: const myVar = 'hello world';
- **ragData** (RagData): RagData object containing metadata about the code 
 Example: {}
###### Function Returns:
- **Type:** boolean
- **Description:** Returns true if the code was saved successfully, otherwise false
- **Example:** true
###### Annotations / Comments:
- **Purpose:** This function saves a code snippet and its associated metadata to a vector database. It uses the `embedder` to generate embeddings for the code and then adds the code, embeddings, and metadata to a ChromaDB collection.
- **Parameters:** - projectName: string - The name of the project. This is used to identify the collection in the vector database.
- code: string - The code snippet to be saved.
- ragData: RagData - An object containing metadata about the code, including the filename, code chunk ID, line numbers, and code objects.
- **Returns:** boolean - Returns `true` if the code was successfully saved to the vector database, otherwise `false`.
- **Usage Example:** 


```typescript
const codeSnippet = `const myVar = 'hello world';`;
const ragData = { metadata: { filename: 'myFile.ts', codeChunkId: 0, codeChunkLineStart: 1, codeChunkLineEnd: 2, codeObjects: {}, codeChunkSummary: 'This code snippet defines a variable' } };
await saveToVectorDatabase('MyProject', codeSnippet, ragData);
```

- **Edge Cases:** - If the `embedderMode` is set to "OFF", the function will not save the code to the vector database.
- If the `embedderENGINE` is not set to "CHROMA_DB", the function will not save the code to the vector database.
- If the `embedder` is not initialized, the function will not save the code to the vector database.
- If there is an error creating the collection, the function will return `false`.
- **Dependencies:** - ChromaDB: Used for storing and retrieving code snippets.
- embedder: A function for generating embeddings for code snippets. This can be either a Google Generative AI embedding function or an OpenAI embedding function.

### 🔧 searchRAG - FUNCTION
------------------------------------------------------------
**Description:** Search Loaded Vector Database

**Code Snippet:**


```typescript
export async function searchRAG(
  projectName: string,
  searchString: string,
  bRetry=true,
  AIusageData?: llmRuntimeData
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

  if (AIusageData){
    AIusageData.totalAPIcalls++;
    AIusageData.totalCharactersEmbed += searchString.length
    const cost = typeof API_COST_PER_EMBEDDING  === 'string' ? parseFloat(API_COST_PER_EMBEDDING) : API_COST_PER_EMBEDDING;
    AIusageData.totalCost += cost * searchString.length;
  }


  return ragData;

} catch (err) {
  console.error("Error searching collection");
  console.error(err);

  if (bRetry === true){
    console.log("Retrying search after cool down period of 30 seconds");
    await new Promise((resolve) => setTimeout(resolve, 30000));
    return await searchRAG(projectName, searchString, false, AIusageData);
  }
  return {} as RagData;
}

}
    
```

- **Line:** 183
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): Name of the project 
 Example: MyProject
- **searchString** (string): String to search for 
 Example: What is the purpose of this function?
- **bRetry** (boolean): Whether to retry the search if it fails 
 Example: true
- **AIusageData** (llmRuntimeData): Object to track AI usage data 
 Example: {}
###### Function Returns:
- **Type:** RagData
- **Description:** Returns a RagData object containing the search results
- **Example:** {}
###### Annotations / Comments:
- **Purpose:** This function searches a loaded vector database for relevant code snippets based on a given search string. It uses the `embedder` to generate embeddings for the search string and then queries the `collection` using these embeddings.
- **Parameters:** - projectName: string - The name of the project associated with the vector database.
- searchString: string - The string to search for in the database.
- bRetry: boolean - Whether to retry the search if it fails. Defaults to `true`.
- AIusageData: llmRuntimeData - An optional object to track AI usage data. Defaults to `undefined`.
- **Returns:** RagData - A `RagData` object containing the search results. This object includes metadata about the retrieved code snippets, embeddings, the actual code snippets, and information about the overall search results.
- **Usage Example:** 


```typescript
const searchResults = await searchRAG("MyProject", "What is the purpose of this function?", true);
```

- **Edge Cases:** - If the `embedderMode` is set to "OFF", the function will return an empty `RagData` object.
- If the `embedder` is not initialized, the function will return an empty `RagData` object.
- If there is an error creating the `collection`, the function will return an empty `RagData` object.
- If there is an error searching the `collection`, the function will log the error and return an empty `RagData` object. If `bRetry` is set to `true`, the function will retry the search after a 30-second cool-down period.
- **Dependencies:** - `embedder` - An embedding function (e.g., `GoogleGenerativeAiEmbeddingFunction`, `OpenAIEmbeddingFunction`) used to generate embeddings for the search string.
- `load_create_collection` - A function that loads or creates a `Collection` object in the vector database.
- `RagData` - An interface that defines the structure of the search results object.
## variables


### 🧮 API_COST_PER_EMBEDDING - VARIABLE
------------------------------------------------------------
**Description:** Environment variable representing the cost per embedding for the API.

**Code Snippet:**


```typescript
export const API_COST_PER_EMBEDDING = process.env.API_COST_PER_EMBEDDING || 0.000025;
```

- **Line:** 11
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines the cost per embedding for the API, which is used to calculate the cost of API calls.
- **Dependencies:** process.env.API_COST_PER_EMBEDDING

### 🧮 apiPass - VARIABLE
------------------------------------------------------------
**Description:** Environment variable representing the API password.

**Code Snippet:**


```typescript
const apiPass = process.env.API_PASS;
```

- **Line:** 14
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `apiPass` variable stores the API password retrieved from the environment variable `API_PASS`.

### 🧮 apiUser - VARIABLE
------------------------------------------------------------
**Description:** Environment variable representing the API username.

**Code Snippet:**


```typescript
const apiUser = process.env.API_USER;
```

- **Line:** 15
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `apiUser` variable stores the value of the environment variable `API_USER`, which likely represents the username for accessing a ChromaDB API.
- **Dependencies:** The code depends on the `process.env` object to access environment variables.

### 🧮 geminiKey - VARIABLE
------------------------------------------------------------
**Description:** Environment variable representing the Gemini API key.

**Code Snippet:**


```typescript
const geminiKey = process.env.GEMINI_KEY;
```

- **Line:** 16
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the Gemini API key, which is retrieved from the environment variable `GEMINI_KEY`.
- **Usage Example:** 


```typescript
// Use the geminiKey to make requests to the Gemini API
const response = await geminiClient.makeRequest(geminiKey, requestData);
```

- **Edge Cases:** If the `GEMINI_KEY` environment variable is not set, the variable will be undefined.
- **Dependencies:** The code depends on the `process.env` object to access environment variables.

### 🧮 apiURL - VARIABLE
------------------------------------------------------------
**Description:** Environment variable representing the API URL, defaulting to 'http://localhost:8000'.

**Code Snippet:**


```typescript
const apiURL = process.env.API_URL || "http://localhost:8000";
```

- **Line:** 17
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `apiURL` variable stores the API URL for the ChromaDB vector database. It defaults to `http://localhost:8000` if the environment variable `API_URL` is not set.
- **Dependencies:** The `process.env` object is used to access environment variables.

### 🧮 embedderMode - VARIABLE
------------------------------------------------------------
**Description:** Environment variable representing the embedder mode, defaulting to 'OFF'.

**Code Snippet:**


```typescript
const embedderMode = process.env.EMBEDDER_MODE || "OFF";
```

- **Line:** 18
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `embedderMode` variable stores the mode of the embedder, which is used for generating embeddings for code snippets. It defaults to 'OFF', meaning embeddings are not generated.
- **Dependencies:** The `embedderMode` variable depends on the environment variable `EMBEDDER_MODE`.

### 🧮 embedderENGINE - VARIABLE
------------------------------------------------------------
**Description:** Environment variable representing the embedder engine, defaulting to 'CHROMA_DB'.

**Code Snippet:**


```typescript
const embedderENGINE = process.env.EMBEDDER_ENGINE || "CHROMA_DB";
```

- **Line:** 19
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `embedderENGINE` variable stores the name of the embedder engine used for vector database operations. It defaults to 'CHROMA_DB' but can be overridden by the environment variable `EMBEDDER_ENGINE`.
- **Dependencies:** The `embedderENGINE` variable depends on the environment variable `EMBEDDER_ENGINE`.

### 🧮 embedder - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the embedder, which can be either a GoogleGenerativeAiEmbeddingFunction, OpenAIEmbeddingFunction, or undefined.

**Code Snippet:**


```typescript
let embedder:
  | GoogleGenerativeAiEmbeddingFunction
  | OpenAIEmbeddingFunction
  | undefined = undefined;
```

- **Line:** 22
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `embedder` variable is declared to store the embedding function used for vector database operations. It can be either a `GoogleGenerativeAiEmbeddingFunction`, `OpenAIEmbeddingFunction`, or `undefined` depending on the chosen embedding mode.
- **Usage Example:** 


```typescript
// Example usage:
const embeddings = await embedder?.generate([code]);
```

- **Edge Cases:** If the embedder mode is set to "OFF", the `embedder` variable will be `undefined`.
- **Dependencies:** The `embedder` variable depends on the chosen embedding mode, which in turn depends on the environment variables `GEMINI_KEY`, `OPENAI_API_KEY`, `OPENAI_ORG_ID`, and `OPENAI_EMBEDDER`.

### 🧮 chromaSettings - VARIABLE
------------------------------------------------------------
**Description:** Object representing the ChromaDB settings, including the path and authentication details.

**Code Snippet:**


```typescript
let chromaSettings:any = {
    path: apiURL,
    auth: undefined
  };
```

- **Line:** 56
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `chromaSettings` variable is an object that stores the configuration settings for connecting to the ChromaDB vector database.
- **Usage Example:** 


```typescript
// Example usage of chromaSettings
const client = new ChromaClient(chromaSettings);
```

- **Dependencies:** ChromaDB library

### 🧮 prefix - VARIABLE
------------------------------------------------------------
**Description:** Constant string representing the prefix for the ChromaDB collection name.

**Code Snippet:**


```typescript
const prefix = "FOFO-RAG-";
```

- **Line:** 73
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `prefix` variable is a constant string that defines the prefix for the ChromaDB collection name. This prefix is used to ensure that the collection name is unique and avoids potential conflicts with other collections.
- **Usage Example:** 


```typescript
const collectionName = prefix + makeWebSafe(projectName);
```


### 🧮 client - VARIABLE
------------------------------------------------------------
**Description:** Instance of the ChromaClient class, used to interact with the ChromaDB database.

**Code Snippet:**


```typescript
const client = new ChromaClient(chromaSettings);
```

- **Line:** 75
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `client` variable is an instance of the `ChromaClient` class, which is used to interact with the ChromaDB database. It provides methods for creating, loading, and querying collections within the database.
- **Dependencies:** The `client` variable depends on the `ChromaClient` class from the `chromadb` library.

### 🧮 name - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the name of the project, used within the load_create_collection function.

**Code Snippet:**


```typescript
  const name = projectName;
```

- **Line:** 85
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the name of the project, which is used to identify and access the corresponding collection in the vector database.

### 🧮 hb - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the heartbeat response from the ChromaDB database, used within the load_create_collection function.

**Code Snippet:**


```typescript
    const hb = await client.heartbeat().catch((err: any) => {
      console.log("Error connecting to database");
      console.error(err);
    });
```

- **Line:** 93
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `hb` variable is used to store the result of the `client.heartbeat()` function call, which checks the connection to the ChromaDB database.
- **Edge Cases:** If there is an error connecting to the database, the `catch` block will log an error message.
- **Dependencies:** The `hb` variable depends on the `client` object, which is an instance of the `ChromaClient` class.

### 🧮 bOK - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the success status of saving to the vector database, used within the saveToVectorDatabase function.

**Code Snippet:**


```typescript
  let bOK = false;
```

- **Line:** 130
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `bOK` variable is a boolean flag used to track the success status of saving code snippets to the vector database within the `saveToVectorDatabase` function.
- **Usage Example:** 


```typescript
  if (embedderMode === "OFF") {
    console.log("Embedder is off");
    return bOK;
  }
```


### 🧮 meta - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the metadata object, used within the saveToVectorDatabase function.

**Code Snippet:**


```typescript
    const meta = ragData.metadata as any;
```

- **Line:** 146
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `meta` variable is used to store the metadata object associated with a code snippet being saved to the vector database. It's declared within the `saveToVectorDatabase` function and is used to provide context and information about the code snippet.
- **Usage Example:** 


```typescript
const meta = ragData.metadata as any;
```


### 🧮 filename - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the filename, used within the saveToVectorDatabase function.

**Code Snippet:**


```typescript
    const filename = meta.filename;
```

- **Line:** 148
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `filename` variable stores the name of the file being processed within the `saveToVectorDatabase` function. It is extracted from the `meta` object, which likely contains metadata about the file.

### 🧮 embeddings - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the embeddings generated from the code, used within the saveToVectorDatabase function.

**Code Snippet:**


```typescript
      const embeddings = await embedder?.generate([code]);
```

- **Line:** 160
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `embeddings` variable stores the results of generating embeddings for the provided code using the `embedder` function. This is a crucial step in the process of saving code snippets to the vector database.
- **Usage Example:** 


```typescript
const embeddings = await embedder?.generate([code]);
```

- **Edge Cases:** If the `embedder` is not initialized or if there is an error during embedding generation, the `embeddings` variable will be undefined.
- **Dependencies:** The `embeddings` variable depends on the `embedder` function, which is responsible for generating embeddings.

### 🧮 res - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the response from adding data to the ChromaDB collection, used within the saveToVectorDatabase function.

**Code Snippet:**


```typescript
      const res = await collection.add({
        ids: [`${projectName}-${filename}-${ragData.metadata.codeChunkId}`],
        documents: [code],
        embeddings: embeddings,
        metadatas: [meta],
      });
```

- **Line:** 163
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `res` variable stores the result of adding data to the ChromaDB collection using the `collection.add()` method. This method adds a new document to the collection, along with its associated metadata and embeddings.
- **Usage Example:** 


```typescript
const res = await collection.add({
  ids: ["myProject-myFile-123"],
  documents: ["const myVariable = 'hello world';"],
  embeddings: [0.1, 0.2, 0.3], // Example embeddings
  metadatas: [{ filename: "myFile.ts", codeChunkId: 123 }],
});
```

- **Dependencies:** ChromaDB library

### 🧮 e - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the error caught during the saveToVectorDatabase function.

**Code Snippet:**


```typescript
    } catch(e:any){
      console.log(e)
    }
```

- **Line:** 173
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable captures any error that occurs within the `catch` block of the `saveToVectorDatabase` function.

### 🧮 ragData - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the RagData object, used within the searchRAG function.

**Code Snippet:**


```typescript
  let ragData: RagData = {} as RagData;
```

- **Line:** 189
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `ragData` variable is declared within the `searchRAG` function to store the results of a search query against a vector database. It is initialized as an empty `RagData` object.
- **Usage Example:** 


```typescript
  let ragData: RagData = {} as RagData;
```

- **Dependencies:** The `RagData` interface defines the structure of the data stored in the `ragData` variable.

### 🧮 searchEmbeddings - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the embeddings generated from the search string, used within the searchRAG function.

**Code Snippet:**


```typescript
      const searchEmbeddings = await embedder.generate([searchString]);
```

- **Line:** 210
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `searchEmbeddings` variable stores the embeddings generated from the search string using the `embedder` function. These embeddings are used to perform similarity searches within the vector database.
- **Dependencies:** The `searchEmbeddings` variable depends on the `embedder` function, which is responsible for generating embeddings from text.

### 🧮 searchResults - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the results of the query to the ChromaDB collection, used within the searchRAG function.

**Code Snippet:**


```typescript
      const searchResults = await collection.query({
        queryEmbeddings: searchEmbeddings,
      });
```

- **Line:** 211
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `searchResults` variable stores the results of a query to the ChromaDB collection, which is a vector database used for storing and retrieving code snippets.
- **Usage Example:** 


```typescript
const searchResults = await collection.query({
  queryEmbeddings: searchEmbeddings,
});
```

- **Dependencies:** ChromaDB library

### 🧮 err - VARIABLE
------------------------------------------------------------
**Description:** Variable representing the error caught during the searchRAG function.

**Code Snippet:**


```typescript
} catch (err) {
  console.error("Error searching collection");
  console.error(err);
```

- **Line:** 246
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable captures any errors that occur during the `searchRAG` function.
## types


### 🏷️ GoogleGenerativeAiEmbeddingFunction - TYPE
------------------------------------------------------------
**Description:** Type representing the Google Generative AI embedding function.

**Code Snippet:**


```typescript
GoogleGenerativeAiEmbeddingFunction
```

- **Line:** 5
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type represents the Google Generative AI embedding function, which is used to generate embeddings for text data.
- **Usage Example:** 


```typescript
const embedder = new GoogleGenerativeAiEmbeddingFunction({
  googleApiKey: geminiKey,
});
```

- **Dependencies:** This type depends on the `@google-cloud/vertexai` library.

### 🏷️ OpenAIEmbeddingFunction - TYPE
------------------------------------------------------------
**Description:** Type representing the OpenAI embedding function.

**Code Snippet:**


```typescript
OpenAIEmbeddingFunction
```

- **Line:** 6
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `OpenAIEmbeddingFunction` type represents a function that generates embeddings for text using the OpenAI API.
- **Usage Example:** 


```typescript
const embeddingFunction = new OpenAIEmbeddingFunction({
  openai_api_key: 'YOUR_OPENAI_API_KEY',
  openai_organization_id: 'YOUR_OPENAI_ORG_ID',
  openai_model: 'text-embedding-ada-002',
});

const embeddings = await embeddingFunction.generate(['This is a test sentence.']);
```

- **Dependencies:** This type depends on the `openai` library, which provides access to the OpenAI API.

### 🏷️ Collection - TYPE
------------------------------------------------------------
**Description:** Type representing a ChromaDB collection.

**Code Snippet:**


```typescript
Collection
```

- **Line:** 7
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `Collection` type represents a ChromaDB collection, which is a data structure used for storing and retrieving data in a vector database.
- **Usage Example:** 


```typescript
// Create a new collection
const collection = await client.createCollection({ name: 'myCollection', embeddingFunction: embedder });

// Add data to the collection
await collection.add({ ids: ['id1'], documents: ['document1'], embeddings: [embeddings1] });

// Query the collection
const results = await collection.query({ queryEmbeddings: [embeddings2] });
```

- **Dependencies:** ChromaDB library

### 🏷️ llmRuntimeData - TYPE
------------------------------------------------------------
**Description:** Type representing runtime data for the LLM.

**Code Snippet:**


```typescript
llmRuntimeData
```

- **Line:** 1
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type defines the structure for runtime data related to the LLM (Large Language Model) used in the application.
- **Usage Example:** 


```typescript
const runtimeData: llmRuntimeData = {
  appVersion: '1.0.0',
  projectName: 'MyProject',
  projectPath: '/path/to/project',
  outputPath: '/path/to/output',
  selectedLLModel: 'gpt-3.5-turbo',
  selectedRAGService: 'ChromaDB'
};
```

## imports


### 📥 ProjectSummary - IMPORT
------------------------------------------------------------
**Description:** Imports the ProjectSummary interface from the objectSchemas module.

**Code Snippet:**


```typescript
import { ProjectSummary, RagData, llmRuntimeData } from "./objectSchemas";
```

- **Line:** 1
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `ProjectSummary` interface from the `objectSchemas` module. This interface is likely used to represent a summary of a code project, potentially containing information about the project's name, description, dependencies, files, and other relevant data.
- **Usage Example:** 


```typescript
// Example usage of the ProjectSummary interface
const projectSummary: ProjectSummary = {
  projectName: "MyProject",
  projectDescription: {
    goal: "This project aims to...",
    features_functions: "The project includes features such as..."
  },
  projectDependencies: [],
  projectLocation: "/path/to/project",
  projectTechStackDescription: "This project uses...",
  codeFiles: [],
  ragData: [],
  teamContext: "This project is for..."
};
```

- **Dependencies:** objectSchemas

### 📥 RagData - IMPORT
------------------------------------------------------------
**Description:** Imports the RagData interface from the objectSchemas module.

**Code Snippet:**


```typescript
import { ProjectSummary, RagData, llmRuntimeData } from "./objectSchemas";
```

- **Line:** 1
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `RagData` interface from the `objectSchemas` module, which is likely used to represent data related to a Retrieval Augmented Generation (RAG) system.
- **Dependencies:** objectSchemas module

### 📥 dotenv/config - IMPORT
------------------------------------------------------------
**Description:** Imports the config function from the dotenv module to load environment variables.

**Code Snippet:**


```typescript
import "dotenv/config";
```

- **Line:** 2
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This import statement loads the `config` function from the `dotenv` module, which is used to load environment variables from a `.env` file.
- **Dependencies:** dotenv

### 📥 ChromaClient - IMPORT
------------------------------------------------------------
**Description:** Imports the ChromaClient class from the chromadb module for interacting with ChromaDB.

**Code Snippet:**


```typescript
import {
  ChromaClient,
  GoogleGenerativeAiEmbeddingFunction,
  OpenAIEmbeddingFunction,
  Collection,
} from "chromadb";
```

- **Line:** 3
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `ChromaClient` class from the `chromadb` module, which is used for interacting with ChromaDB, a vector database.
- **Dependencies:** chromadb

### 📥 makeWebSafe - IMPORT
------------------------------------------------------------
**Description:** Imports the makeWebSafe function from the shared module, likely used to sanitize strings for use in URLs or file names.

**Code Snippet:**


```typescript
import { makeWebSafe } from "./shared";
```

- **Line:** 9
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `makeWebSafe` function from the `shared` module. This function is likely used to sanitize strings by removing any characters that are not alphanumeric, replacing them with underscores. This is often done to create safe and valid file names, URLs, or other identifiers.
- **Usage Example:** 


```typescript
const safeName = makeWebSafe("My File Name with Spaces"); // safeName will be "My_File_Name_with_Spaces"
```

- **Dependencies:** The `makeWebSafe` function is likely defined in the `shared` module, which is a dependency of this code.

### 📥 ./logger - IMPORT
------------------------------------------------------------
**Description:** Imports the logger module, likely for logging purposes.

**Code Snippet:**


```typescript
import "./logger";
```

- **Line:** 10
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This line imports the `logger` module, which is likely used for logging messages and events within the application.
- **Dependencies:** The `logger` module is likely a custom module defined within the project.
## interfaces


### 🌉 globResult - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
    export interface globResult {
        
        "glob": string[],
        "ignore": string[]
        
    }
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for a result object returned by the `glob` function, which is used to find files matching a pattern.

### 🌉 runtimeData - INTERFACE
------------------------------------------------------------
**Description:** N/A

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

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `runtimeData` interface defines the structure for storing runtime data related to the application, including version information, project details, output paths, and selected language model and RAG service.

### 🌉 moduleObject - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
    export interface moduleObject {
        name: string;
        version: string;
        description: string;
    }
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for a module object, which represents a package or module with its name, version, and description.

### 🌉 ProjectSummary - INTERFACE
------------------------------------------------------------
**Description:** N/A

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

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ProjectSummary` interface defines the structure for storing information about a code project. It includes details like the project name, description, location, technology stack, dependencies, code files, RAG data, and team context.

### 🌉 models - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
    export interface models {
        name: string,
        model: any,
    }
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for a model object, which likely represents a language model or a machine learning model.
- **Parameters:** name: string - The name of the model.
model: any - The model itself, which can be of any type depending on the specific implementation.
- **Returns:** N/A
- **Usage Example:** 


```typescript
const myModel: models = {
  name: "myModel",
  model: // Model object
};
```


### 🌉 modelServiceConfig - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
    export interface modelServiceConfig {
        models: models[],
        endpoint?:string 
    }
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
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

- **Edge Cases:** N/A
- **Dependencies:** N/A

### 🌉 RagData - INTERFACE
------------------------------------------------------------
**Description:** N/A

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

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `RagData` interface represents data retrieved from a Retrieval Augmented Generation (RAG) system, which combines a vector database with a language model.
- **Dependencies:** This interface depends on the following types:
- `CodeObject`
- `QueryResponse`
- `Embeddings`
- `Metadata`

### 🌉 codeSummary - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
    export interface codeSummary {
        goal: string,
        features_functions: string,
    }
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for summarizing code, including its goal and relevant features or functions.
- **Usage Example:** 


```typescript
const codeSummary: codeSummary = {
    goal: "This code calculates the sum of two numbers.",
    features_functions: "The code uses the `add` function to perform the calculation."
};
```


### 🌉 CodeFileSummary - INTERFACE
------------------------------------------------------------
**Description:** N/A

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

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeFileSummary` interface represents a summary of a code file, containing information about its name, location, code summary, language, execution flow, and code objects.

### 🌉 ExecutionFlow - INTERFACE
------------------------------------------------------------
**Description:** N/A

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

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
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
    fileLocation: "./myFile.ts"
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A

### 🌉 FunctionParameter - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
    export interface FunctionParameter {
        name: string;
        type: string;
        description: string;
        example: string;
    }
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of a function parameter object.
- **Parameters:**  - **name**: The name of the parameter.
 - **type**: The data type of the parameter.
 - **description**: A description of the parameter.
 - **example**: An example value for the parameter.
- **Returns:** N/A
- **Usage Example:** 


```typescript
const functionParameter: FunctionParameter = {
    name: "myParam",
    type: "string",
    description: "This is a parameter",
    example: "Hello World"
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A

### 🌉 FunctionReturn - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
    export interface FunctionReturn {
        type: string;
        description: string;
        example: string;
    }
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for representing the return value of a function.
- **Usage Example:** 


```typescript
interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```


### 🌉 CodeObject - INTERFACE
------------------------------------------------------------
**Description:** N/A

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

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObject` interface defines the structure for representing code objects within a project. It includes properties like name, type, description, code snippet, annotation, line number, indentation level, file name, file location, sub-objects, parent object, function parameters, function returns, and flags indicating whether the object is exported, a function, a class, private, or asynchronous.
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
    fileLocation: "./myFile.ts"
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A

### 🌉 Annotation - INTERFACE
------------------------------------------------------------
**Description:** N/A

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

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `Annotation` interface defines the structure for annotations that can be applied to code objects. It includes properties for describing the purpose, parameters, return values, usage examples, edge cases, dependencies, error handling, performance considerations, and best practices for using the code object.
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

### 🌉 llmRuntimeData - INTERFACE
------------------------------------------------------------
**Description:** N/A

**Code Snippet:**


```typescript
    export interface llmRuntimeData {
        totalAPIcalls: number;
        totalCharactersEmbed: number;
        totalCost: number;
    }
```

- **Line:** Could Not Verify Line
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for storing runtime data related to the LLM, including the total number of API calls made, the total number of characters embedded, and the total cost incurred.
