# src/vectorDB.ts

**Summary:** The code's goal is to interact with a vector database using embeddings generated from either Google or OpenAI embedding functions. It includes functionalities for loading or creating collections, saving data to the database, and searching within the database.

- **File Location:** .//src/vectorDB.ts
- **Language:** TypeScript
## Table of Contents
- [classes](#classes)
- [functions](#functions)
- [variables](#variables)
- [imports](#imports)
- [exports](#exports)
## classes
📘 **CLASSES**

### ChromaClient - [CLASS]
- **Description:** Represents a client for interacting with the Chroma database.
- **Line:** 3
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { ChromaClient, ... } from 'chromadb'
```
### GoogleGenerativeAiEmbeddingFunction - [CLASS]
- **Description:** Represents an embedding function using Google Generative AI.
- **Line:** 3
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { ..., GoogleGenerativeAiEmbeddingFunction, ... } from 'chromadb'
```
### OpenAIEmbeddingFunction - [CLASS]
- **Description:** Represents an embedding function using OpenAI.
- **Line:** 3
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { ..., OpenAIEmbeddingFunction, ... } from 'chromadb'
```
### Collection - [CLASS]
- **Description:** Represents a collection in the Chroma database.
- **Line:** 3
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { ..., Collection } from 'chromadb'
```
## functions
🔧 **FUNCTIONS**

### load_create_collection - [FUNCTION]
- **Description:** Loads an existing collection or creates a new one if it doesn't exist, using the project name.
- **Line:** 48
- **Indent:** 0
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


**Code Snippet:**
```
export async function load_create_collection(projectName:string): Promise<Collection|void> { ... }
```
###### Function Parameters:
- **projectName** (string): The name of the project for which to load or create a collection. 
 Example: exampleProject
###### Function Returns:
- **Type:** Collection|void
- **Description:** The loaded or newly created collection.
- **Example:** collection
### saveToVectorDatabase - [FUNCTION]
- **Description:** Saves the provided code and associated RAG data to the vector database under the specified project name.
- **Line:** 82
- **Indent:** 0
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


**Code Snippet:**
```
export async function saveToVectorDatabase(projectName:string, code: string, ragData:RagData): Promise<boolean> { ... }
```
###### Function Parameters:
- **projectName** (string): The name of the project to which the data will be saved. 
 Example: exampleProject
- **code** (string): The code to be saved in the vector database. 
 Example: exampleCode
- **ragData** (RagData): The RAG data associated with the code. 
 Example: exampleRagData
###### Function Returns:
- **Type:** boolean
- **Description:** Returns true if the data was saved successfully, otherwise false.
- **Example:** true
### searchRAG - [FUNCTION]
- **Description:** Searches the vector database for RAG data using a search string, within the context of a specified project.
- **Line:** 120
- **Indent:** 0
- **Location:** vectorDB.ts (./src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


**Code Snippet:**
```
export async function searchRAG(projectName:string, searchString: string): Promise<RagData> { ... }
```
###### Function Parameters:
- **projectName** (string): The name of the project in which to perform the search. 
 Example: exampleProject
- **searchString** (string): The search string used to query the vector database. 
 Example: exampleSearch
###### Function Returns:
- **Type:** RagData
- **Description:** The resulting RAG data from the search query.
- **Example:** {}
## variables
🧮 **VARIABLES**

### apiPass - [VARIABLE]
- **Description:** Environment variable for API password.
- **Line:** 7
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const apiPass = process.env.API_PASS || '';
```
### apiUser - [VARIABLE]
- **Description:** Environment variable for API user.
- **Line:** 8
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const apiUser = process.env.API_USER || '';
```
### geminiKey - [VARIABLE]
- **Description:** Environment variable for Gemini Key.
- **Line:** 9
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const geminiKey = process.env.GEMINI_KEY || '';
```
### apiURL - [VARIABLE]
- **Description:** Environment variable for API URL.
- **Line:** 10
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const apiURL = process.env.API_URL || '';
```
### embedderMode - [VARIABLE]
- **Description:** Environment variable for embedder mode, defaults to 'GCP'.
- **Line:** 17
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const embedderMode = process.env.EMBEDDER_MODE || 'GCP';
```
### embedder - [VARIABLE]
- **Description:** Variable to hold the embedding function based on embedder mode.
- **Line:** 19
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
let embedder:any|undefined=undefined;
```
### chromaSettings - [VARIABLE]
- **Description:** Configuration settings for ChromaClient, set to undefined.
- **Line:** 36
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const chromaSettings = undefined;
```
### client - [VARIABLE]
- **Description:** Instance of ChromaClient initialized with chromaSettings.
- **Line:** 38
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const client = new ChromaClient(chromaSettings);
```
### name - [VARIABLE]
- **Description:** Name of the collection used within load_create_collection function.
- **Line:** 42
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const name = projectName;
```
### collection - [VARIABLE]
- **Description:** Variable to hold the Collection instance within load_create_collection function.
- **Line:** 43
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
let collection:Collection|void;
```
### hb - [VARIABLE]
- **Description:** Variable to hold the result of the client's heartbeat check.
- **Line:** 45
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const hb = await client.heartbeat().catch((err:any) => {
```
### bOK - [VARIABLE]
- **Description:** Boolean flag indicating success or failure within saveToVectorDatabase function.
- **Line:** 70
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
let bOK = true;
```
### meta - [VARIABLE]
- **Description:** RagData metadata cast to any type within saveToVectorDatabase function.
- **Line:** 72
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const meta = ragData.metadata as any;
```
### filename - [VARIABLE]
- **Description:** Variable to hold the filename extracted from metadata within saveToVectorDatabase function.
- **Line:** 74
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const filename = meta.filename;
```
### embeddings - [VARIABLE]
- **Description:** Generated embeddings for the code within saveToVectorDatabase function.
- **Line:** 78
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const embeddings = await embedder.generate([code]);
```
### res - [VARIABLE]
- **Description:** Result of adding data to the collection within saveToVectorDatabase function.
- **Line:** 87
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const res = await collection.add({
```
### searchEmbeddings - [VARIABLE]
- **Description:** Generated embeddings for the search string within searchRAG function.
- **Line:** 108
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const searchEmbeddings = await embedder.generate([searchString]);
```
### searchResults - [VARIABLE]
- **Description:** Results of the search query within searchRAG function.
- **Line:** 109
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const searchResults = await collection.query({queryEmbeddings: searchEmbeddings});
```
### ragData - [VARIABLE]
- **Description:** RAG data object to be returned within searchRAG function.
- **Line:** 115
- **Indent:** 1
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const ragData = {
```
## imports
📥 **IMPORTS**

### ProjectSummary, RagData - [IMPORT]
- **Description:** Imports ProjectSummary and RagData from the local module objectSchemas.
- **Line:** 1
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { ProjectSummary, RagData } from "./objectSchemas";
```
### dotenv/config - [IMPORT]
- **Description:** Imports and configures the dotenv package which loads environment variables from a .env file.
- **Line:** 2
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import 'dotenv/config';
```
### ChromaClient, GoogleGenerativeAiEmbeddingFunction, OpenAIEmbeddingFunction, Collection - [IMPORT]
- **Description:** Imports ChromaClient, GoogleGenerativeAiEmbeddingFunction, OpenAIEmbeddingFunction, and Collection from the chromadb package.
- **Line:** 3
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { ChromaClient, GoogleGenerativeAiEmbeddingFunction, OpenAIEmbeddingFunction, Collection } from 'chromadb';
```
## exports
📤 **EXPORTS**

### load_create_collection - [EXPORT]
- **Description:** Asynchronous function that loads or creates a collection in the Chroma database based on the given project name.
- **Line:** 36
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export async function load_create_collection(projectName:string): Promise<Collection|void> { ... }
```
### saveToVectorDatabase - [EXPORT]
- **Description:** Asynchronous function that saves code and RAG data to the vector database under a given project name.
- **Line:** 72
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export async function saveToVectorDatabase(projectName:string, code: string, ragData:RagData): Promise<boolean> { ... }
```
### searchRAG - [EXPORT]
- **Description:** Asynchronous function that searches for RAG data in the vector database using the provided project name and search string.
- **Line:** 108
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export async function searchRAG(projectName:string, searchString: string): Promise<RagData> { ... }
```
