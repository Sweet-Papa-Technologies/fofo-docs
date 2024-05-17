import { ProjectSummary, RagData } from "./objectSchemas";
import 'dotenv/config'
import { ChromaClient, GoogleGenerativeAiEmbeddingFunction, OpenAIEmbeddingFunction, Collection } from 'chromadb'

const apiPass = process.env.API_PASS || ''
const apiUser = process.env.API_USER || ''
const geminiKey = process.env.GEMINI_KEY || ''
const apiURL = process.env.API_URL || ''

// Check to see if any of the environment variables are missing
if (!apiPass || !apiUser || !geminiKey || !apiURL) {
    console.error('Missing environment variables - Please check your .env file')
    process.exit(1)
}

const embedderMode = process.env.EMBEDDER_MODE || 'GCP'

let embedder:any|undefined=undefined

switch (embedderMode) {
    case 'GCP':
        embedder = new GoogleGenerativeAiEmbeddingFunction({googleApiKey: geminiKey})
        break
    case 'OpenAI':
        embedder = new OpenAIEmbeddingFunction({openai_api_key: process.env.OPENAI_API_KEY || '', openai_organization_id: process.env.OPENAI_ORG_ID || '', openai_model: "text-embedding-3-small"})
        break
    default:
        embedder = new GoogleGenerativeAiEmbeddingFunction({googleApiKey: geminiKey})
}


// const chromaSettings = {
//     path: apiURL,
//       "auth": {
//           provider: "basic", credentials: `${apiUser}:${apiPass}`
//           }
//     }

const chromaSettings = undefined

const client = new ChromaClient(chromaSettings);



export async function load_create_collection(projectName:string): Promise<Collection|void> {

    const name = projectName
    let collection:Collection|void

    const hb = await client.heartbeat().catch((err:any) => {
        console.log('Error connecting to database')
        console.error(err)
    })

    console.log('Heartbeat for Database:')
    console.log(hb)

    try {
        collection = await client.getCollection({name:name, embeddingFunction: embedder})
        if (collection instanceof Collection && 'name' in collection) {
            return collection
        }
    } catch (err) {
        console.log('Collection not found, creating collection')
    }



    collection = await client.createCollection({name: name, embeddingFunction: embedder}).catch((err:any) => {
        console.log('Error creating collection')
        console.error(err)
    })

    return collection
}


export async function saveToVectorDatabase(projectName:string, code: string, ragData:RagData): Promise<boolean> {
    let bOK = true

    const meta = ragData.metadata as any

    const filename = meta.filename

    delete meta.codeObjects


    const collection = await load_create_collection(`${projectName}`)

    const embeddings = await embedder.generate([code])
    console.log(embeddings)

    if (!collection) {
        console.error('Error creating collection')
        return false
    }

    const res = await collection.add({
        ids: [`${projectName}-${filename}-${ragData.metadata.codeChunkId}`],
        documents: [
            code
        ],
        embeddings: embeddings,
        metadatas: [meta]
    })

    console.log('Saved to Vector Database:')
    console.log(res)
    
    return true
}
export async function searchRAG(projectName:string, searchString: string): Promise<RagData> {

    const collection = await load_create_collection(projectName)
    if (!collection) {
        console.error('Error creating collection')
        return {} as RagData
    }
    const searchEmbeddings = await embedder.generate([searchString])
    const searchResults = await collection.query({queryEmbeddings: searchEmbeddings})

    console.log('Search Results for RAG:')
    console.log(searchResults)

    const ragData = {
        metadata: searchResults.metadatas[0] as any || {},
        embeddings : searchResults.embeddings?[0] as any : {},
        documentData: searchResults.documents[0] as any || []
    }

    console.log('RAG Data:')
    console.log(ragData)

    return ragData
}