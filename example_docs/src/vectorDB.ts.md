# src/vectorDB.ts - fofo-docs

**Summary:** The code aims to process search results and extract embeddings and document data, then log and return this processed data.

- **File Location:** .//src/vectorDB.ts
- **Language:** TypeScript
## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [imports](#imports)
## functions
🔧 **FUNCTIONS**


### load_create_collection - [FUNCTION]
------------------------------------------------------------
**Description:** Loads an existing collection or creates a new one if it doesn't exist.
**Code Snippet:**
```
export async function load_create_collection(projectName: string): Promise<Collection | void> { ... }
```
- **Line:** 40
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): The name of the project for which the collection is being loaded or created. 
 Example: exampleProject
###### Function Returns:
- **Type:** Collection | void
- **Description:** The collection object if found or created, otherwise void.
- **Example:** Collection { name: 'exampleProject', ... }

### saveToVectorDatabase - [FUNCTION]
------------------------------------------------------------
**Description:** Saves data to the vector database.
**Code Snippet:**
```
export async function saveToVectorDatabase(projectName: string, code: string, ragData: RagData): Promise<boolean> { ... }
```
- **Line:** 78
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): The name of the project for which the data is being saved. 
 Example: exampleProject
- **code** (string): The code to be saved in the vector database. 
 Example: const x = 10;
- **ragData** (RagData): The RAG data associated with the code. 
 Example: { metadata: { filename: 'example.ts', codeChunkId: '123' }, ... }
###### Function Returns:
- **Type:** boolean
- **Description:** Returns true if the data is saved successfully, otherwise false.
- **Example:** true

### searchRAG - [FUNCTION]
------------------------------------------------------------
**Description:** Searches the RAG data in the vector database.
**Code Snippet:**
```
export async function searchRAG(projectName: string, searchString: string): Promise<RagData> { ... }
```
- **Line:** 101
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): The name of the project for which the search is being performed. 
 Example: exampleProject
- **searchString** (string): The search string used to query the RAG data. 
 Example: example search
###### Function Returns:
- **Type:** RagData
- **Description:** The RAG data that matches the search query.
- **Example:** { metadata: { filename: 'example.ts', codeChunkId: '123' }, ... }
## variables
🧮 **VARIABLES**


### apiPass - [VARIABLE]
------------------------------------------------------------
**Description:** API password retrieved from environment variables or an empty string if not set.
**Code Snippet:**
```
const apiPass = process.env.API_PASS || "";
```
- **Line:** 9
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### apiUser - [VARIABLE]
------------------------------------------------------------
**Description:** API user retrieved from environment variables or an empty string if not set.
**Code Snippet:**
```
const apiUser = process.env.API_USER || "";
```
- **Line:** 10
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### geminiKey - [VARIABLE]
------------------------------------------------------------
**Description:** Gemini API key retrieved from environment variables or an empty string if not set.
**Code Snippet:**
```
const geminiKey = process.env.GEMINI_KEY || "";
```
- **Line:** 11
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### apiURL - [VARIABLE]
------------------------------------------------------------
**Description:** API URL retrieved from environment variables or an empty string if not set.
**Code Snippet:**
```
const apiURL = process.env.API_URL || "";
```
- **Line:** 12
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### embedderMode - [VARIABLE]
------------------------------------------------------------
**Description:** Embedder mode retrieved from environment variables or defaults to 'GCP'.
**Code Snippet:**
```
const embedderMode = process.env.EMBEDDER_MODE || "GCP";
```
- **Line:** 18
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### embedder - [VARIABLE]
------------------------------------------------------------
**Description:** Embedder function initialized based on the embedder mode.
**Code Snippet:**
```
let embedder: any | undefined = undefined;
```
- **Line:** 20
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### chromaSettings - [VARIABLE]
------------------------------------------------------------
**Description:** Settings for ChromaClient, currently set to undefined.
**Code Snippet:**
```
const chromaSettings = undefined;
```
- **Line:** 42
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### client - [VARIABLE]
------------------------------------------------------------
**Description:** Instance of ChromaClient initialized with chromaSettings.
**Code Snippet:**
```
const client = new ChromaClient(chromaSettings);
```
- **Line:** 44
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### name - [VARIABLE]
------------------------------------------------------------
**Description:** Name of the project collection.
**Code Snippet:**
```
const name = projectName;
```
- **Line:** 49
- **Indent:** 2
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### collection - [VARIABLE]
------------------------------------------------------------
**Description:** Collection object for the project, can be undefined.
**Code Snippet:**
```
let collection: Collection | void;
```
- **Line:** 50
- **Indent:** 2
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### hb - [VARIABLE]
------------------------------------------------------------
**Description:** Heartbeat response from the database client.
**Code Snippet:**
```
const hb = await client.heartbeat().catch((err: any) => {
```
- **Line:** 52
- **Indent:** 2
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### bOK - [VARIABLE]
------------------------------------------------------------
**Description:** Boolean flag indicating the success of the saveToVectorDatabase function.
**Code Snippet:**
```
let bOK = true;
```
- **Line:** 83
- **Indent:** 2
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### searchEmbeddings - [VARIABLE]
------------------------------------------------------------
**Description:** Embeddings generated for the search string.
**Code Snippet:**
```
const searchEmbeddings = await embedder.generate([searchString]);
```
- **Line:** 108
- **Indent:** 2
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### searchResults - [VARIABLE]
------------------------------------------------------------
**Description:** Results from querying the collection with search embeddings.
**Code Snippet:**
```
const searchResults = await collection.query({
```
- **Line:** 109
- **Indent:** 2
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### embeddings - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the embeddings from searchResults if available, otherwise an empty object.
**Code Snippet:**
```
embeddings: searchResults.embeddings ? ([0] as any) : {},
```
- **Line:** 1
- **Indent:** 4
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### documentData - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the first document from searchResults if available, otherwise an empty array.
**Code Snippet:**
```
documentData: (searchResults.documents[0] as any) || [],
```
- **Line:** 2
- **Indent:** 4
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


## imports
📥 **IMPORTS**


### ProjectSummary, RagData - [IMPORT]
------------------------------------------------------------
**Description:** Imports the ProjectSummary and RagData types from the local objectSchemas module.
**Code Snippet:**
```
import { ProjectSummary, RagData } from "./objectSchemas";
```
- **Line:** 1
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### dotenv/config - [IMPORT]
------------------------------------------------------------
**Description:** Imports and configures the dotenv module to load environment variables from a .env file.
**Code Snippet:**
```
import "dotenv/config";
```
- **Line:** 2
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### ChromaClient, GoogleGenerativeAiEmbeddingFunction, OpenAIEmbeddingFunction, Collection - [IMPORT]
------------------------------------------------------------
**Description:** Imports ChromaClient, GoogleGenerativeAiEmbeddingFunction, OpenAIEmbeddingFunction, and Collection from the chromadb module.
**Code Snippet:**
```
import { ChromaClient, GoogleGenerativeAiEmbeddingFunction, OpenAIEmbeddingFunction, Collection } from "chromadb";
```
- **Line:** 3
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


