# src/llmInterface.ts - fofo-docs

**Summary:** The code is designed to interact with various language models (LLMs) to generate responses based on provided prompts. It supports multiple backends including OLLAMA, VERTEX, and OPENAI, and includes functions for validating and fixing JSON, parsing YAML, and generating responses from LLMs.

- **File Location:** .//src/llmInterface.ts
- **Language:** TypeScript
## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [types](#types)
- [imports](#imports)
- [exports](#exports)
## functions
🔧 **FUNCTIONS**


### getModelBackend - [FUNCTION]
------------------------------------------------------------
**Description:** Retrieves the backend type for a given model.
**Code Snippet:**
```
const getModelBackend = (selectedModel: string) => { ... }
```
- **Line:** 79
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **selectedModel** (string): The model for which the backend type is to be retrieved. 
 Example: textModel
###### Function Returns:
- **Type:** llm_modes
- **Description:** The backend type for the given model.
- **Example:** OLLAMA

### validateJSON - [FUNCTION]
------------------------------------------------------------
**Description:** Validates if a given string is a valid JSON.
**Code Snippet:**
```
function validateJSON(jsonString: string): boolean { ... }
```
- **Line:** 160
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **jsonString** (string): The JSON string to be validated. 
 Example: {"key": "value"}
###### Function Returns:
- **Type:** boolean
- **Description:** True if the string is a valid JSON, otherwise false.
- **Example:** true

### fixJSON - [FUNCTION]
------------------------------------------------------------
**Description:** Attempts to repair a malformed JSON string.
**Code Snippet:**
```
function fixJSON(jsonString: string): string { ... }
```
- **Line:** 168
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **jsonString** (string): The malformed JSON string to be repaired. 
 Example: {"key": "value"
###### Function Returns:
- **Type:** string
- **Description:** The repaired JSON string.
- **Example:** {"key": "value"}

### parseYaml - [FUNCTION]
------------------------------------------------------------
**Description:** Converts a YAML string into a JSON object.
**Code Snippet:**
```
export function parseYaml(yamlString: string): any { ... }
```
- **Line:** 176
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **yamlString** (string): The YAML string to be converted. 
 Example: key: value
###### Function Returns:
- **Type:** any
- **Description:** The resulting JSON object.
- **Example:** {"key": "value"}

### parseText - [FUNCTION]
------------------------------------------------------------
**Description:** Converts a text string into a JSON object with a specified key.
**Code Snippet:**
```
export function parseText(text: string, resKey = "response"): any { ... }
```
- **Line:** 185
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **text** (string): The text string to be converted. 
 Example: This is a response.
- **resKey** (string): The key for the resulting JSON object. 
 Example: response
###### Function Returns:
- **Type:** any
- **Description:** The resulting JSON object.
- **Example:** {"response": "This is a response."}

### wait - [FUNCTION]
------------------------------------------------------------
**Description:** Pauses execution for a specified number of milliseconds.
**Code Snippet:**
```
async function wait(ms: number) { ... }
```
- **Line:** 192
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **ms** (number): The number of milliseconds to wait. 
 Example: 1000
###### Function Returns:
- **Type:** Promise<void>
- **Description:** A promise that resolves after the specified time.
- **Example:** Promise<void>

### infer - [FUNCTION]
------------------------------------------------------------
**Description:** Infers a response from a given prompt using a specified model.
**Code Snippet:**
```
export async function infer( ... ) { ... }
```
- **Line:** 194
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **prompt** (string): The prompt to be sent to the model. 
 Example: What is the capital of France?
- **responseMode** ("JSON object" | "YAML object" | "TEXT STRING"): The format of the response. 
 Example: "JSON object"
- **responseKey** (string): The key for the response (only applicable for TEXT STRING responseMode). 
 Example: response
- **bPro** (boolean): Flag to use advanced model. 
 Example: false
- **bRetry** (boolean): Flag to retry on failure. 
 Example: true
- **supplementalData** (any): Additional data to be used in the inference. 
 Example: {}
- **model** (string): The model to be used for inference. 
 Example: textModel
###### Function Returns:
- **Type:** Promise<any>
- **Description:** The response from the model.
- **Example:** {"response": "Paris"}

### getCodeSummaryFromLLM - [FUNCTION]
------------------------------------------------------------
**Description:** Gets a summary of the given code from the LLM.
**Code Snippet:**
```
export async function getCodeSummaryFromLLM( ... ) { ... }
```
- **Line:** 431
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **codeToSummarize** (string): The code to be summarized. 
 Example: function example() { ... }
- **model** (string): The model to be used for summarization. 
 Example: textModel
###### Function Returns:
- **Type:** Promise<codeSummary>
- **Description:** The summary of the code.
- **Example:** {"goal": "Summarize code", "features_functions": "Summarizes code features"}

### callLLM - [FUNCTION]
------------------------------------------------------------
**Description:** Calls the LLM with a given prompt template and project context.
**Code Snippet:**
```
export async function callLLM( ... ) { ... }
```
- **Line:** 451
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **promptTemplate** (string): The template for the prompt. 
 Example: Summarize the following code: <code snippet>
- **projectContext** (ProjectSummary): The context of the project. 
 Example: {"teamContext": "Team info"}
- **code** (string): The code to be analyzed. 
 Example: function example() { ... }
- **filePath** (string): The path to the file containing the code. 
 Example: .//src/llmInterface.ts
- **bRAG** (boolean): Flag to use RAG (Retrieval-Augmented Generation). 
 Example: false
- **model** (string): The model to be used for the call. 
 Example: textModel
###### Function Returns:
- **Type:** Promise<any>
- **Description:** The response from the LLM.
- **Example:** {"response": "Summary of code"}
## variables
🧮 **VARIABLES**


### retries - [VARIABLE]
------------------------------------------------------------
**Description:** A counter to keep track of the number of retries for certain operations.
**Code Snippet:**
```
let retries = 0;
```
- **Line:** 30
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### endpoints - [VARIABLE]
------------------------------------------------------------
**Description:** An object containing the endpoint URLs for different model services.
**Code Snippet:**
```
const endpoints = { OLLAMA: process.env.OLLAMA_SERVER_URL || "http://infinity.local:11434" };
```
- **Line:** 33
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### systemPrompt - [VARIABLE]
------------------------------------------------------------
**Description:** A system prompt string used for initializing the AI model.
**Code Snippet:**
```
const systemPrompt = "You are a developer A.I. that summarizes and analyzes code. Please answer all questions asked of you exactly as presented.";
```
- **Line:** 36
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### MODEL_MODES - [VARIABLE]
------------------------------------------------------------
**Description:** An array of objects representing different model modes and their configurations.
**Code Snippet:**
```
const MODEL_MODES = [ { name: "qwen:32b-chat-v1.5-q4_0", model: "qwen:32b-chat-v1.5-q4_0", backend: "OLLAMA" }, ... ];
```
- **Line:** 39
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### secretSauce - [VARIABLE]
------------------------------------------------------------
**Description:** An object containing configuration settings for the AI model.
**Code Snippet:**
```
const secretSauce = { temperature: 0.3, top_p: 0.2 };
```
- **Line:** 79
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### openai - [VARIABLE]
------------------------------------------------------------
**Description:** An instance of the OpenAI class initialized with organization and API key.
**Code Snippet:**
```
const openai = new OpenAI({ organization: process.env.OPENAI_ORG_ID, apiKey: process.env.OPENAI_API_KEY });
```
- **Line:** 84
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### ollama - [VARIABLE]
------------------------------------------------------------
**Description:** An instance of the Ollama class initialized with the host endpoint.
**Code Snippet:**
```
const ollama = new Ollama({ host: endpoints.OLLAMA });
```
- **Line:** 89
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### contextLength - [VARIABLE]
------------------------------------------------------------
**Description:** A constant representing the context length for the AI model.
**Code Snippet:**
```
const contextLength = 16000;
```
- **Line:** 90
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### project - [VARIABLE]
------------------------------------------------------------
**Description:** A constant representing the project name for Vertex AI.
**Code Snippet:**
```
const project = "sweet-papa-technologies";
```
- **Line:** 93
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### location - [VARIABLE]
------------------------------------------------------------
**Description:** A constant representing the location for Vertex AI.
**Code Snippet:**
```
const location = "us-central1";
```
- **Line:** 94
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### textModel - [VARIABLE]
------------------------------------------------------------
**Description:** A constant representing the text model for Vertex AI.
**Code Snippet:**
```
const textModel = "gemini-1.5-flash-preview-0514";
```
- **Line:** 95
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### textModelAdvanced - [VARIABLE]
------------------------------------------------------------
**Description:** A constant representing the advanced text model for Vertex AI.
**Code Snippet:**
```
const textModelAdvanced = "gemini-1.5-pro-preview-0514";
```
- **Line:** 96
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### vertexWAIT - [VARIABLE]
------------------------------------------------------------
**Description:** A constant representing the wait time for Vertex AI operations.
**Code Snippet:**
```
const vertexWAIT = 5000;
```
- **Line:** 97
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### vertexAI - [VARIABLE]
------------------------------------------------------------
**Description:** An instance of the VertexAI class initialized with project and location.
**Code Snippet:**
```
const vertexAI = new VertexAI({ project: project, location: location });
```
- **Line:** 99
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### safetySettings - [VARIABLE]
------------------------------------------------------------
**Description:** An array of objects representing safety settings for the AI model.
**Code Snippet:**
```
const safetySettings = [ { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }, ... ];
```
- **Line:** 101
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### generativeModel - [VARIABLE]
------------------------------------------------------------
**Description:** An instance of a generative model from Vertex AI with specific settings.
**Code Snippet:**
```
const generativeModel = vertexAI.getGenerativeModel({ model: textModel, safetySettings: safetySettings, "generationConfig": { temperature: secretSauce.temperature, topP: secretSauce.top_p } });
```
- **Line:** 112
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### generateModelAdv - [VARIABLE]
------------------------------------------------------------
**Description:** An instance of an advanced generative model from Vertex AI with specific settings.
**Code Snippet:**
```
const generateModelAdv = vertexAI.getGenerativeModel({ model: textModelAdvanced, safetySettings: safetySettings, "generationConfig": { temperature: secretSauce.temperature, topP: secretSauce.top_p } });
```
- **Line:** 118
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


## types
🏷️ **TYPES**


### llm_modes - [TYPE]
------------------------------------------------------------
**Description:** Defines the possible modes for the language model backend.
**Code Snippet:**
```
type llm_modes = "OLLAMA" | "VERTEX" | "OPENAI";
```
- **Line:** 86
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## imports
📥 **IMPORTS**


### CodeObject, CodeObjectType, CodeObjects, ProjectSummary, codeSummary, modelServiceConfig - [IMPORT]
------------------------------------------------------------
**Description:** Imports various types and configurations from the objectSchemas module.
**Code Snippet:**
```
import { CodeObject, CodeObjectType, CodeObjects, ProjectSummary, codeSummary, modelServiceConfig } from "./objectSchemas";
```
- **Line:** 1
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### searchRAG - [IMPORT]
------------------------------------------------------------
**Description:** Imports the searchRAG function from the vectorDB module.
**Code Snippet:**
```
import { searchRAG } from "./vectorDB";
```
- **Line:** 7
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### yaml - [IMPORT]
------------------------------------------------------------
**Description:** Imports the yaml module from js-yaml.
**Code Snippet:**
```
import yaml from "js-yaml";
```
- **Line:** 8
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### jsonrepair - [IMPORT]
------------------------------------------------------------
**Description:** Imports the jsonrepair function from the jsonrepair module.
**Code Snippet:**
```
import { jsonrepair } from "jsonrepair";
```
- **Line:** 9
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### Ollama - [IMPORT]
------------------------------------------------------------
**Description:** Imports the Ollama class from the ollama module.
**Code Snippet:**
```
import { Ollama } from "ollama";
```
- **Line:** 10
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### OpenAI - [IMPORT]
------------------------------------------------------------
**Description:** Imports the OpenAI class from the openai module.
**Code Snippet:**
```
import OpenAI from "openai";
```
- **Line:** 11
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### dotenv/config - [IMPORT]
------------------------------------------------------------
**Description:** Imports and configures environment variables from a .env file.
**Code Snippet:**
```
import "dotenv/config";
```
- **Line:** 13
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### FunctionDeclarationSchemaType, HarmBlockThreshold, HarmCategory, VertexAI - [IMPORT]
------------------------------------------------------------
**Description:** Imports various types and classes from the @google-cloud/vertexai module.
**Code Snippet:**
```
import { FunctionDeclarationSchemaType, HarmBlockThreshold, HarmCategory, VertexAI } from "@google-cloud/vertexai";
```
- **Line:** 15
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### getTokens - [IMPORT]
------------------------------------------------------------
**Description:** Imports the getTokens function from the shared module.
**Code Snippet:**
```
import { getTokens } from "./shared";
```
- **Line:** 20
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## exports
📤 **EXPORTS**


### parseYaml - [EXPORT]
------------------------------------------------------------
**Description:** Function to convert a YAML string into a JSON object.
**Code Snippet:**
```
export function parseYaml(yamlString: string): any { ... }
```
- **Line:** 133
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### parseText - [EXPORT]
------------------------------------------------------------
**Description:** Function to convert text into a JSON object with a specified key.
**Code Snippet:**
```
export function parseText(text: string, resKey = "response"): any { ... }
```
- **Line:** 144
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### infer - [EXPORT]
------------------------------------------------------------
**Description:** Function to infer a response from a given prompt using different model backends.
**Code Snippet:**
```
export async function infer(prompt: string, responseMode: "JSON object" | "YAML object" | "TEXT STRING" = "JSON object", responseKey?: string, bPro = false, bRetry = true, supplementalData?: any, model: string = textModel): Promise<any> { ... }
```
- **Line:** 153
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### getCodeSummaryFromLLM - [EXPORT]
------------------------------------------------------------
**Description:** Function to get a summary of a code block from a language model.
**Code Snippet:**
```
export async function getCodeSummaryFromLLM(codeToSummarize: string, model: string = textModel): Promise<codeSummary> { ... }
```
- **Line:** 383
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### callLLM - [EXPORT]
------------------------------------------------------------
**Description:** Function to call a language model with a given prompt template and project context.
**Code Snippet:**
```
export async function callLLM(promptTemplate: string, projectContext: ProjectSummary, code: string, filePath: string, bRAG = false, model: string = textModel): Promise<any> { ... }
```
- **Line:** 398
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


