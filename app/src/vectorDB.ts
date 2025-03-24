// import { ProjectSummary, RagData, llmRuntimeData } from "./objectSchemas";
// import "dotenv/config";
// import {
//   ChromaClient,
//   GoogleGenerativeAiEmbeddingFunction,
//   OpenAIEmbeddingFunction,
//   Collection,
// } from "chromadb";
// import { makeWebSafe } from "./shared";
// import "./logger";
// export const API_COST_PER_EMBEDDING = process.env.API_COST_PER_EMBEDDING || 0.000025;


// const apiPass = process.env.API_PASS;
// const apiUser = process.env.API_USER;
// const geminiKey = process.env.GEMINI_KEY;
// const apiURL = process.env.API_URL || "http://localhost:8000";
// const embedderMode = process.env.EMBEDDER_MODE || "OFF";
// const embedderENGINE = process.env.EMBEDDER_ENGINE || "CHROMA_DB";

// // Chroma DB Settings
// let embedder:
//   | GoogleGenerativeAiEmbeddingFunction
//   | OpenAIEmbeddingFunction
//   | undefined = undefined;

// switch (embedderMode) {
//   case "GCP":
//     // Check to see if any of the environment variables are missing
//     if (!geminiKey) {
//       console.error("Missing environment variable for geminiKey - Please check your .env file");
//       process.exit(1);
//     }
//     embedder = new GoogleGenerativeAiEmbeddingFunction({
//       googleApiKey: geminiKey,
//     });
//     break;
//   case "OpenAI":

//     embedder = new OpenAIEmbeddingFunction({
//       openai_api_key: process.env.OPENAI_API_KEY || "",
//       openai_organization_id: process.env.OPENAI_ORG_ID || "",
//       openai_model: process.env.OPENAI_EMBEDDER || "text-embedding-3-small",
//     });
//     break;
//   case "OFF":
//     console.log("Embedder is off");
//     embedder = undefined;
//     break;
//   default:
//     console.log("Embedder is off");
//     embedder = undefined;
//     break;
// }

// let chromaSettings:any = {
//     path: apiURL,
//     auth: undefined
//   };

// if (apiUser && apiPass){
//   chromaSettings.auth = {
//       provider: "basic",
//       credentials: `${apiUser}:${apiPass}`,
//     }
// } else if ((!apiUser || apiUser=="" || apiUser === "BEARER") && apiPass){
//     chromaSettings.auth = {
//       provider: "bearer",
//       credentials: `Bearer ${apiPass}`,
//     }
// } 

// const prefix = "FOFO-RAG-";

// const client = new ChromaClient(chromaSettings);
// //

// ////////////////////////////////////////
// // Vector Database Functions

// // This function is specifc to Chroma DB
// export async function load_create_collection(
//   projectName: string
// ): Promise<Collection | void> {
//   const name = projectName;

//   let collection: Collection | void;

//   console.log("Loading/Creating Collection: " + name);
//   console.log("API URL: " + chromaSettings.path);

//   if (chromaSettings.path) {
//     const hb = await client.heartbeat().catch((err: any) => {
//       console.log("Error connecting to database");
//       console.error(err);
//     });
  
//     console.log("Heartbeat for Database:");
//     console.log(hb);
//   }
  
//   try {
//     collection = await client.getOrCreateCollection({
//       name: prefix + makeWebSafe(name),
//       embeddingFunction: embedder,
//     });
//     if (collection instanceof Collection && "name" in collection) {
//       return collection;
//     }
//   } catch (err) {
//     console.log("Collection not found, attempting to create collection AGAIN");
//   }

//   collection = await client
//     .createCollection({ name:prefix + makeWebSafe(name), embeddingFunction: embedder })
//     .catch((err: any) => {
//       console.log("Error creating collection");
//       console.error(err);
//     });

//   return collection;
// }

// // Save to Loaded Vector Database
// export async function saveToVectorDatabase(
//   projectName: string,
//   code: string,
//   ragData: RagData
// ): Promise<boolean> {
//   let bOK = false;

//   projectName = projectName.replace(/\s*/g, "")

//   if (embedderMode === "OFF") {
//     console.log("Embedder is off");
//     return bOK;
//   }

//   if (embedderENGINE === "CHROMA_DB") {
//     if (!embedder) {
//       console.error("Embedder not initialized");
//       return bOK;
//     }
    

//     const meta = ragData.metadata as any;

//     const filename = meta.filename;

//     delete meta.codeObjects;

//     const collection = await load_create_collection(`${projectName}`);

//     if (!collection) {
//       console.error("Error creating collection");
//       return false;
//     }

//     try {
//       const embeddings = await embedder?.generate([code]);
//       console.log(embeddings);
  
//       const res = await collection.add({
//         ids: [`${projectName}-${filename}-${ragData.metadata.codeChunkId}`],
//         documents: [code],
//         embeddings: embeddings,
//         metadatas: [meta],
//       });
  
//       console.log("Saved to Vector Database:");
//       console.log(res);
//       bOK = true
//     } catch(e:any){
//       console.log(e)
//     }

//   }

//   return bOK;
// }

// // Search Loaded Vector Database
// export async function searchRAG(
//   projectName: string,
//   searchString: string,
//   bRetry=true,
//   AIusageData?: llmRuntimeData
// ): Promise<RagData> {
//   let ragData: RagData = {} as RagData;

//   try {
//   if (embedderMode === "OFF") {
//     console.log("Embedder is off");
//     return ragData;
//   }

//   if (embedderENGINE === "CHROMA_DB") {
//     if (!embedder) {
//       console.error("Embedder not initialized");
//       return {} as RagData;
//     }

//     const collection = await load_create_collection(projectName);
//     if (!collection) {
//       console.error("Error creating collection");
//       return {} as RagData;
//     }

   
//       const searchEmbeddings = await embedder.generate([searchString]);
//       const searchResults = await collection.query({
//         queryEmbeddings: searchEmbeddings,
//       });


//     console.log("Search Results for RAG:");
//     console.log(searchResults);

//     ragData = {
//       metadata: (searchResults.metadatas[0] as any) || {},
//       embeddings: searchResults.embeddings ? ([0] as any) : {},
//       documentData: (searchResults.documents[0] as any) || [],
//       allSearchResults: searchResults,
//       allResults: {
//         documents: searchResults.documents,
//         embeddings: searchResults.embeddings,
//         metadatas: searchResults.metadatas,
//       }
//       }
//   };
  

//   console.log("RAG Data:");
//   console.log(ragData);

//   if (AIusageData){
//     AIusageData.totalAPIcalls++;
//     AIusageData.totalCharactersEmbed += searchString.length
//     const cost = typeof API_COST_PER_EMBEDDING  === 'string' ? parseFloat(API_COST_PER_EMBEDDING) : API_COST_PER_EMBEDDING;
//     AIusageData.totalCost += cost * searchString.length;
//   }


//   return ragData;

// } catch (err) {
//   console.error("Error searching collection");
//   console.error(err);

//   if (bRetry === true){
//     console.log("Retrying search after cool down period of 30 seconds");
//     await new Promise((resolve) => setTimeout(resolve, 30000));
//     return await searchRAG(projectName, searchString, false, AIusageData);
//   }
//   return {} as RagData;
// }

// }

import { ProjectSummary, RagData, llmRuntimeData } from "./objectSchemas";
import "dotenv/config";
import {
  ChromaClient,
  GoogleGenerativeAiEmbeddingFunction,
  OpenAIEmbeddingFunction,
  Collection,
} from "chromadb";
import { makeWebSafe } from "./shared";
import "./logger";

export const API_COST_PER_EMBEDDING =
  process.env.API_COST_PER_EMBEDDING || 0.000025;

const apiPass = process.env.API_PASS;
const apiUser = process.env.API_USER;
const geminiKey = process.env.GEMINI_KEY;
const apiURL = process.env.API_URL || "http://localhost:8000";
const embedderMode = process.env.EMBEDDER_MODE || "OFF";
const embedderENGINE = process.env.EMBEDDER_ENGINE || "CHROMA_DB";

// -------------------------------------
// Initialize embedding function, if applicable
// -------------------------------------
let embedder:
  | GoogleGenerativeAiEmbeddingFunction
  | OpenAIEmbeddingFunction
  | undefined = undefined;

switch (embedderMode) {
  case "GCP":
    // Make sure we have a key
    if (!geminiKey) {
      console.error(
        "Missing environment variable GEMINI_KEY; required for GCP embedding"
      );
      process.exit(1);
    }
    // The official name often is "models/embedding-gecko-001"
    embedder = new GoogleGenerativeAiEmbeddingFunction({
      googleApiKey: geminiKey,
      // If you want to override with an env var, or else default
      model:
        process.env.GOOGLE_EMBED_MODEL?.trim() || "models/text-embedding-004",
    });
    break;

  case "OpenAI":
    embedder = new OpenAIEmbeddingFunction({
      openai_api_key: process.env.OPENAI_API_KEY || "",
      openai_organization_id: process.env.OPENAI_ORG_ID || "",
      openai_model:
        process.env.OPENAI_EMBEDDER?.trim() || "text-embedding-ada-002",
    });
    break;

  default:
    // "OFF" or anything else => no embedding
    console.log("Embedding is OFF or not recognized");
    embedder = undefined;
    break;
}

// -------------------------------------
// Configure Chroma settings
// -------------------------------------
let chromaSettings: any = {
  path: apiURL,
  auth: undefined,
};

if (apiUser && apiPass) {
  chromaSettings.auth = {
    provider: "basic",
    credentials: `${apiUser}:${apiPass}`,
  };
} else if ((!apiUser || apiUser === "" || apiUser === "BEARER") && apiPass) {
  chromaSettings.auth = {
    provider: "bearer",
    credentials: `Bearer ${apiPass}`,
  };
}

const prefix = "FOFO-RAG-";
const client = new ChromaClient(chromaSettings);

// -------------------------------------
// load_create_collection
// -------------------------------------
export async function load_create_collection(
  projectName: string
): Promise<Collection | void> {
  const name = prefix + makeWebSafe(projectName);

  console.log("Loading or Creating Chroma Collection:", name);
  // Optional heartbeat check
  if (chromaSettings.path) {
    try {
      const hb = await client.heartbeat();
      console.log("Chroma DB Heartbeat:", hb);
    } catch (err: any) {
      console.error("Error connecting to Chroma database:", err);
    }
  }

  let collection: Collection | void;
  // Attempt get or create
  try {
    collection = await client.getOrCreateCollection({
      name: name,
      embeddingFunction: embedder,
    });
    if (collection instanceof Collection && "name" in collection) {
      return collection;
    }
  } catch (err) {
    console.log(
      "Collection not found or error. Attempting to create a new collection..."
    );
  }

  // If we didn't succeed, attempt create
  collection = await client.createCollection({
    name: name,
    embeddingFunction: embedder,
  }).catch((err: any) => {
    console.error("Error creating collection:", err);
  });

  return collection;
}

// -------------------------------------
// Saves data to the loaded vector DB (Chroma) if embedding is enabled
// -------------------------------------
export async function saveToVectorDatabase(
  projectName: string,
  code: string,
  ragData: RagData
): Promise<boolean> {
  // If embeddings are off, skip
  if (code === undefined || code === null || code === "" || code.trim() === "") {
    throw new Error("Code is empty! We have a fundamental issue here!");
  }
  if (embedderMode === "OFF") {
    return false;
  }
  if (!embedder) {
    console.error("Embedding function not initialized (embedder is undefined).");
    return false;
  }

  // Validate input
  if (!code || !code.trim()) {
    console.warn("saveToVectorDatabase: code is empty or whitespace, skipping...");
    return false;
  }

  // Attempt to load collection
  const collection = await load_create_collection(projectName.replace(/\s*/g, ""));
  if (!collection) {
    console.error("No collection returned; cannot save to DB.");
    return false;
  }

  // Remove codeObjects from metadata to reduce size
  const meta = { ...ragData.metadata };
  delete (meta as any).codeObjects;

  try {
    // Generate embedding
    const embeddings = await embedder.generate([code]);
    // Add to collection
    await collection.add({
      ids: [
        `${projectName}-${meta.filename}-${ragData.metadata.codeChunkId}`
      ],
      documents: [code],
      embeddings,
      metadatas: [meta as any],
    });
    return true;
  } catch (err: any) {
    console.error("Error saving to Vector Database:", err);
    return false;
  }
}

// -------------------------------------
// Search the loaded Vector DB using embeddings
// -------------------------------------
export async function searchRAG(
  projectName: string,
  searchString: string,
  bRetry = true,
  AIusageData?: llmRuntimeData
): Promise<RagData> {
  const ragData: RagData = {} as RagData;

  if (embedderMode === "OFF" || !embedder) {
    return ragData;
  }

  // If search string is empty, skip
  if (!searchString || !searchString.trim()) {
    console.warn("searchRAG: searchString is empty or whitespace. Returning empty result.");
    return ragData;
  }

  // Attempt to load collection
  const collection = await load_create_collection(projectName);
  if (!collection) {
    console.error("No collection found/created for searching.");
    return ragData;
  }

  try {
    // Generate embedding for search
    const searchEmbeddings = await embedder.generate([searchString]);
    // Perform query
    const searchResults = await collection.query({
      queryEmbeddings: searchEmbeddings,
    });

    // Construct a minimal RagData result
    ragData.metadata = (searchResults.metadatas?.[0] as any) || {};
    // Because searchResults.embeddings is an array of arrays, we store it or skip
    ragData.embeddings = searchResults.embeddings as any || [];
    ragData.documentData = searchResults.documents?.[0] || [];
    ragData.allSearchResults = searchResults;
    ragData.allResults = {
      documents: searchResults.documents,
      embeddings: searchResults.embeddings,
      metadatas: searchResults.metadatas,
    };

    console.log("RAG Data from search:", ragData);

    // Update usage stats if provided
    if (AIusageData) {
      AIusageData.totalAPIcalls++;
      AIusageData.totalCharactersEmbed += searchString.length;
      const costVal = typeof API_COST_PER_EMBEDDING === "string"
        ? parseFloat(API_COST_PER_EMBEDDING)
        : API_COST_PER_EMBEDDING;
      AIusageData.totalCost += costVal * searchString.length;
    }

    return ragData;
  } catch (err) {
    console.error("Error searching collection:", err);

    if (bRetry) {
      console.log("Retrying search after 30-second cool-down...");
      await new Promise((resolve) => setTimeout(resolve, 30000));
      return searchRAG(projectName, searchString, false, AIusageData);
    }
    return ragData;
  }
}
