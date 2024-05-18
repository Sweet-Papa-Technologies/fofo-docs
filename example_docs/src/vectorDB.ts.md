# src/vectorDB.ts - fofo-docs

**Summary:** The code aims to interact with a vector database using ChromaClient, embedding functions from Google and OpenAI, and manage collections for storing and retrieving project-related data.

- **File Location:** .//src/vectorDB.ts
- **Language:** TypeScript
## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [imports](#imports)
- [exports](#exports)
## functions
🔧 **FUNCTIONS**


### load_create_collection - [FUNCTION]
------------------------------------------------------------
**Description:** Loads an existing collection or creates a new one if it doesn't exist.
**Code Snippet:**
```
export async function load_create_collection(projectName: string): Promise<Collection | void> { ... }
```
- **Line:** 42
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): The name of the project for which the collection is to be loaded or created. 
 Example: exampleProject
###### Function Returns:
- **Type:** Collection | void
- **Description:** The loaded or newly created collection, or void if an error occurs.
- **Example:** collectionInstance

### saveToVectorDatabase - [FUNCTION]
------------------------------------------------------------
**Description:** Saves data to the vector database. Currently, this function is not fully implemented.
**Code Snippet:**
```
export async function saveToVectorDatabase(projectName: string, code: string, ragData: RagData): Promise<boolean> { ... }
```
- **Line:** 74
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): The name of the project for which the data is to be saved. 
 Example: exampleProject
- **code** (string): The code to be saved in the vector database. 
 Example: exampleCode
- **ragData** (RagData): The RAG data associated with the code. 
 Example: exampleRagData
###### Function Returns:
- **Type:** boolean
- **Description:** Returns true if the data is saved successfully, otherwise false.
- **Example:** true

### searchRAG - [FUNCTION]
------------------------------------------------------------
**Description:** Searches the RAG data in the vector database using a search string.
**Code Snippet:**
```
export async function searchRAG(projectName: string, searchString: string): Promise<RagData> { ... }
```
- **Line:** 97
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectName** (string): The name of the project for which the RAG data is to be searched. 
 Example: exampleProject
- **searchString** (string): The search string used to query the RAG data. 
 Example: exampleSearchString
###### Function Returns:
- **Type:** RagData
- **Description:** The RAG data retrieved from the search.
- **Example:** exampleRagData
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
- **Indent:** 0
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
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### geminiKey - [VARIABLE]
------------------------------------------------------------
**Description:** Gemini key retrieved from environment variables or an empty string if not set.
**Code Snippet:**
```
const geminiKey = process.env.GEMINI_KEY || "";
```
- **Line:** 11
- **Indent:** 0
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
- **Indent:** 0
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
- **Line:** 19
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### embedder - [VARIABLE]
------------------------------------------------------------
**Description:** Embedder function instance, initialized based on the embedder mode.
**Code Snippet:**
```
let embedder: any | undefined = undefined;
```
- **Line:** 21
- **Indent:** 0
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
- **Line:** 39
- **Indent:** 0
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
- **Line:** 41
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### name - [VARIABLE]
------------------------------------------------------------
**Description:** Name of the collection, derived from the projectName parameter.
**Code Snippet:**
```
const name = projectName;
```
- **Line:** 45
- **Indent:** 2
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### bOK - [VARIABLE]
------------------------------------------------------------
**Description:** Boolean flag indicating the success status, currently always true.
**Code Snippet:**
```
let bOK = true;
```
- **Line:** 80
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
- **Line:** 98
- **Indent:** 2
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### searchResults - [VARIABLE]
------------------------------------------------------------
**Description:** Results of the query performed on the collection using the search embeddings.
**Code Snippet:**
```
const searchResults = await collection.query({ queryEmbeddings: searchEmbeddings });
```
- **Line:** 99
- **Indent:** 2
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### ragData - [VARIABLE]
------------------------------------------------------------
**Description:** RAG data constructed from the search results.
**Code Snippet:**
```
const ragData = { metadata: (searchResults.metadatas[0] as any) || {}, embeddings: searchResults.embeddings ? ([0] as any) : {}, documentData: (searchResults.documents[0] as any) || [], };
```
- **Line:** 104
- **Indent:** 2
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


## imports
📥 **IMPORTS**


### ProjectSummary, RagData - [IMPORT]
------------------------------------------------------------
**Description:** Imports the ProjectSummary and RagData types from the objectSchemas module.
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
**Description:** Imports the ChromaClient, GoogleGenerativeAiEmbeddingFunction, OpenAIEmbeddingFunction, and Collection classes from the chromadb module.
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


## exports
📤 **EXPORTS**


### load_create_collection - [EXPORT]
------------------------------------------------------------
**Description:** Asynchronously loads or creates a collection in the vector database based on the provided project name.
**Code Snippet:**
```
export async function load_create_collection(projectName: string): Promise<Collection | void> { ... }
```
- **Line:** 47
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### saveToVectorDatabase - [EXPORT]
------------------------------------------------------------
**Description:** Asynchronously saves data to the vector database for a given project name, code, and RAG data.
**Code Snippet:**
```
export async function saveToVectorDatabase(projectName: string, code: string, ragData: RagData): Promise<boolean> { ... }
```
- **Line:** 82
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### searchRAG - [EXPORT]
------------------------------------------------------------
**Description:** Asynchronously searches the vector database for RAG data based on the provided project name and search string.
**Code Snippet:**
```
export async function searchRAG(projectName: string, searchString: string): Promise<RagData> { ... }
```
- **Line:** 103
- **Indent:** 0
- **Location:** vectorDB.ts (.//src/vectorDB.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


