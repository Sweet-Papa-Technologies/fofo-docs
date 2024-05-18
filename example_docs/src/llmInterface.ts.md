# src/llmInterface.ts - fofo-docs

**Summary:** The goal of the code is to prepare a prompt with relevant context and code snippet, call an AI API to get a response, handle rate limits, and enhance the response with file path information.

- **File Location:** .//src/llmInterface.ts
- **Language:** TypeScript
## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [imports](#imports)
- [exports](#exports)
## functions
🔧 **FUNCTIONS**


### getModelBackend - [FUNCTION]
------------------------------------------------------------
**Description:** Retrieves the backend type for a given model based on the selected model name.
**Code Snippet:**
```
const getModelBackend = (selectedModel: string) => { ... }
```
- **Line:** 79
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **selectedModel** (string): The name of the selected model. 
 Example: gpt-4o
###### Function Returns:
- **Type:** llm_modes
- **Description:** The backend type associated with the selected model.
- **Example:** OLLAMA

### validateJSON - [FUNCTION]
------------------------------------------------------------
**Description:** Validates if a given string is a valid JSON.
**Code Snippet:**
```
function validateJSON(jsonString: string): boolean { ... }
```
- **Line:** 10
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **jsonString** (string): The JSON string to be validated. 
 Example: {"key": "value"}
###### Function Returns:
- **Type:** boolean
- **Description:** Returns true if the JSON string is valid, otherwise false.
- **Example:** true

### fixJSON - [FUNCTION]
------------------------------------------------------------
**Description:** Attempts to repair a malformed JSON string.
**Code Snippet:**
```
function fixJSON(jsonString: string): string { ... }
```
- **Line:** 18
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **jsonString** (string): The malformed JSON string to be repaired. 
 Example: {"key": "value"
###### Function Returns:
- **Type:** string
- **Description:** Returns the repaired JSON string.
- **Example:** {"key": "value"}

### parseYaml - [FUNCTION]
------------------------------------------------------------
**Description:** Parses a YAML string and converts it into a JSON object.
**Code Snippet:**
```
export function parseYaml(yamlString: string): any { ... }
```
- **Line:** 26
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **yamlString** (string): The YAML string to be parsed. 
 Example: key: value
###### Function Returns:
- **Type:** any
- **Description:** Returns the parsed JSON object.
- **Example:** {"key": "value"}

### parseText - [FUNCTION]
------------------------------------------------------------
**Description:** Converts a text string into a JSON object with a specified key.
**Code Snippet:**
```
export function parseText(text: string, resKey = "response"): any { ... }
```
- **Line:** 36
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **text** (string): The text string to be converted. 
 Example: This is a sample text.
- **resKey** (string): The key to be used in the resulting JSON object. 
 Example: response
###### Function Returns:
- **Type:** any
- **Description:** Returns the JSON object with the specified key.
- **Example:** {"response": "This is a sample text."}

### wait - [FUNCTION]
------------------------------------------------------------
**Description:** Pauses execution for a specified number of milliseconds.
**Code Snippet:**
```
async function wait(ms: number) { ... }
```
- **Line:** 44
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **ms** (number): The number of milliseconds to wait. 
 Example: 1000
###### Function Returns:
- **Type:** Promise<void>
- **Description:** Returns a promise that resolves after the specified time.
- **Example:** Promise<void>

### infer - [FUNCTION]
------------------------------------------------------------
**Description:** Generates a response based on the provided prompt and model.
**Code Snippet:**
```
export async function infer(prompt: string, responseMode: "JSON object" | "YAML object" | "TEXT STRING" = "JSON object", responseKey?: string, bPro = false, bRetry = true, supplementalData?: any, model: string = textModel): Promise<any> { ... }
```
- **Line:** 48
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **prompt** (string): The prompt to be used for generating the response. 
 Example: What is the capital of France?
- **responseMode** ("JSON object" | "YAML object" | "TEXT STRING"): The format of the response. 
 Example: "JSON object"
- **responseKey** (string): The key to be used in the response object. 
 Example: response
- **bPro** (boolean): Flag to indicate if the pro version should be used. 
 Example: false
- **bRetry** (boolean): Flag to indicate if retries should be allowed. 
 Example: true
- **supplementalData** (any): Additional data to be used in the response generation. 
 Example: {"context": "additional context"}
- **model** (string): The model to be used for generating the response. 
 Example: textModel
###### Function Returns:
- **Type:** Promise<any>
- **Description:** Returns a promise that resolves to the generated response.
- **Example:** {"response": "Paris"}

### getCodeSummaryFromLLM - [FUNCTION]
------------------------------------------------------------
**Description:** Asynchronously gets a code summary from a language model by sending a prompt with the code to summarize.
**Code Snippet:**
```
export async function getCodeSummaryFromLLM(
  codeToSummarize: string,
  model: string = textModel
): Promise<codeSummary> { ... }
```
- **Line:** 52
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **codeToSummarize** (string): The code block that needs to be summarized. 
 Example: const x = 10;
- **model** (string): The model to use for summarization, defaults to textModel. 
 Example: textModel
###### Function Returns:
- **Type:** Promise<codeSummary>
- **Description:** A promise that resolves to a code summary object.
- **Example:** { goal: 'Summarize the code', features_functions: 'Describes features and functions' }

### getFileNameFromPath - [FUNCTION]
------------------------------------------------------------
**Description:** Extracts the file name from a given file path.
**Code Snippet:**
```
const getFileNameFromPath = (path: string) => path.split("/").pop() || "";
```
- **Line:** 20
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **path** (string): The file path from which to extract the file name. 
 Example: /path/to/file.txt
###### Function Returns:
- **Type:** string
- **Description:** The extracted file name.
- **Example:** file.txt
## variables
🧮 **VARIABLES**


### retries - [VARIABLE]
------------------------------------------------------------
**Description:** A counter for the number of retries.
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
**Description:** An object containing the endpoint URLs for different services.
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
**Description:** A system prompt string for the developer AI.
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
**Description:** An array of objects representing different model modes.
**Code Snippet:**
```
const MODEL_MODES = [ ... ];
```
- **Line:** 38
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### openai - [VARIABLE]
------------------------------------------------------------
**Description:** An instance of the OpenAI class configured with organization and API key.
**Code Snippet:**
```
const openai = new OpenAI({ organization: process.env.OPENAI_ORG_ID, apiKey: process.env.OPENAI_API_KEY });
```
- **Line:** 79
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### ollama - [VARIABLE]
------------------------------------------------------------
**Description:** An instance of the Ollama class configured with the host endpoint.
**Code Snippet:**
```
const ollama = new Ollama({ host: endpoints.OLLAMA });
```
- **Line:** 84
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### contextLength - [VARIABLE]
------------------------------------------------------------
**Description:** A constant representing the context length for the model.
**Code Snippet:**
```
const contextLength = 8000;
```
- **Line:** 85
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
- **Line:** 88
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
- **Line:** 89
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### yaml - [VARIABLE]
------------------------------------------------------------
**Description:** Library used for parsing YAML strings.
**Code Snippet:**
```
const obj = yaml.load(yamlString) as any;
```
- **Line:** 28
- **Indent:** 4
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### llm_modes - [VARIABLE]
------------------------------------------------------------
**Description:** Type representing the different modes of the language model.
**Code Snippet:**
```
const modelBackend:llm_modes = getModelBackend(model);
```
- **Line:** 45
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### ollamaResponse - [VARIABLE]
------------------------------------------------------------
**Description:** Stores the response from the ollama.generate function call.
**Code Snippet:**
```
const ollamaResponse = await ollama.generate({ model: model, prompt: promptNew, stream: false, system: systemPrompt, keep_alive: 9000, options: { ...secretSauce, num_ctx: contextLength, }, });
```
- **Line:** 3
- **Indent:** 4
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### request - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the request payload for the VERTEX model backend.
**Code Snippet:**
```
const request = { contents: [{ role: "user", parts: [{ text: promptNew }] }], };
```
- **Line:** 11
- **Indent:** 4
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### genFunction - [VARIABLE]
------------------------------------------------------------
**Description:** Function to generate content, which can be either generativeModel or generateModelAdv based on the bPro flag.
**Code Snippet:**
```
let genFunction = generativeModel;
```
- **Line:** 15
- **Indent:** 4
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### result - [VARIABLE]
------------------------------------------------------------
**Description:** Stores the result from the genFunction.generateContent function call.
**Code Snippet:**
```
const result = await genFunction.generateContent(request);
```
- **Line:** 20
- **Indent:** 4
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### completion - [VARIABLE]
------------------------------------------------------------
**Description:** Stores the completion response from the openai.chat.completions.create function call.
**Code Snippet:**
```
const completion = await openai.chat.completions.create({ ...secretSauce, messages: [{ role: "system", content: systemPrompt }, { role: "user", content: promptNew} ], model: model, });
```
- **Line:** 43
- **Indent:** 4
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### endTime - [VARIABLE]
------------------------------------------------------------
**Description:** Stores the current timestamp at the end of the process.
**Code Snippet:**
```
const endTime = Date.now();
```
- **Line:** 58
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### totalTime - [VARIABLE]
------------------------------------------------------------
**Description:** Calculates the total time taken for the process by subtracting startTime from endTime.
**Code Snippet:**
```
const totalTime = endTime - startTime;
```
- **Line:** 59
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### newData - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the first element of the parsed JSON array if it exists.
**Code Snippet:**
```
const newData = res[0];
```
- **Line:** 14
- **Indent:** 10
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### keys - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the keys of the newData object.
**Code Snippet:**
```
const keys = Object.keys(newData);
```
- **Line:** 17
- **Indent:** 10
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### expectedKeys - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the expected keys for the JSON object.
**Code Snippet:**
```
const expectedKeys: CodeObjects[] = ["classes", "functions", "variables", "types", "interfaces", "imports", "exports"];
```
- **Line:** 19
- **Indent:** 10
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### fixedData - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the fixed JSON object if the original object is missing keys.
**Code Snippet:**
```
const fixedData = {} as any;
```
- **Line:** 27
- **Indent:** 12
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### e - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the error object if JSON parsing fails.
**Code Snippet:**
```
catch (e: any) {
```
- **Line:** 43
- **Indent:** 6
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### question - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the prompt question to be sent to the LLM for summarizing code.
**Code Snippet:**
```
const question = `Summarize the code block below. Mention the goal of the code and any relevant features / functions: \n  Please respond with a JSON object as follows:\n  {\n    \"goal\": \"String summarizing what the code is about, and the goal\",\n    \"features_functions\": \"String describing any relevant features\",\n  }\n\n  ### Code To Sumnarize:\n  ${codeToSummarize}\n  `;
```
- **Line:** 67
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### codeSummary - [VARIABLE]
------------------------------------------------------------
**Description:** Holds the summary of the code returned by the LLM.
**Code Snippet:**
```
const codeSummary = await infer(question, "JSON object", undefined, false, undefined, undefined, model);
```
- **Line:** 75
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### promptTemplate - [VARIABLE]
------------------------------------------------------------
**Description:** Template for the prompt that will be sent to the AI API, with placeholders for relevant code and context.
**Code Snippet:**
```
promptTemplate = promptTemplate.replace("<relevant code>", "");
```
- **Line:** 6
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### prompt - [VARIABLE]
------------------------------------------------------------
**Description:** Final prompt string after replacing placeholders with actual values.
**Code Snippet:**
```
const prompt = promptTemplate.replace("<supplemental context>", projectContext.teamContext).replace("<code snippet>", code).replace("<file path>", filePath);
```
- **Line:** 16
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### getFileNameFromPath - [VARIABLE]
------------------------------------------------------------
**Description:** Function to extract the file name from a given file path.
**Code Snippet:**
```
const getFileNameFromPath = (path: string) => path.split("/").pop() || "";
```
- **Line:** 22
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### fileName - [VARIABLE]
------------------------------------------------------------
**Description:** Extracted file name from the given file path.
**Code Snippet:**
```
const fileName = getFileNameFromPath(filePath);
```
- **Line:** 23
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### response - [VARIABLE]
------------------------------------------------------------
**Description:** Response from the AI API call.
**Code Snippet:**
```
const response = await infer(prompt, "JSON object", undefined, true, true, { fileLocation: filePath, fileName: fileName }, model).catch((error) => { console.error("Error calling API:", error); return { error: error }; });
```
- **Line:** 27
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available



### codeObjects - [VARIABLE]
------------------------------------------------------------
**Description:** Parsed and validated response from the AI API.
**Code Snippet:**
```
let codeObjects: any = response;
```
- **Line:** 39
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
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
**Description:** Imports and configures environment variables from the dotenv module.
**Code Snippet:**
```
import "dotenv/config";
```
- **Line:** 14
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
- **Line:** 16
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
- **Line:** 17
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


## exports
📤 **EXPORTS**


### CodeObject - [EXPORT]
------------------------------------------------------------
**Description:** Exported object from objectSchemas module
**Code Snippet:**
```
import { CodeObject } from "./objectSchemas";
```
- **Line:** 2
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### CodeObjectType - [EXPORT]
------------------------------------------------------------
**Description:** Exported object from objectSchemas module
**Code Snippet:**
```
import { CodeObjectType } from "./objectSchemas";
```
- **Line:** 2
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### CodeObjects - [EXPORT]
------------------------------------------------------------
**Description:** Exported object from objectSchemas module
**Code Snippet:**
```
import { CodeObjects } from "./objectSchemas";
```
- **Line:** 2
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### ProjectSummary - [EXPORT]
------------------------------------------------------------
**Description:** Exported object from objectSchemas module
**Code Snippet:**
```
import { ProjectSummary } from "./objectSchemas";
```
- **Line:** 2
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### codeSummary - [EXPORT]
------------------------------------------------------------
**Description:** Exported object from objectSchemas module
**Code Snippet:**
```
import { codeSummary } from "./objectSchemas";
```
- **Line:** 2
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### modelServiceConfig - [EXPORT]
------------------------------------------------------------
**Description:** Exported object from objectSchemas module
**Code Snippet:**
```
import { modelServiceConfig } from "./objectSchemas";
```
- **Line:** 2
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### searchRAG - [EXPORT]
------------------------------------------------------------
**Description:** Exported object from vectorDB module
**Code Snippet:**
```
import { searchRAG } from "./vectorDB";
```
- **Line:** 3
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### FunctionDeclarationSchemaType - [EXPORT]
------------------------------------------------------------
**Description:** Exported object from @google-cloud/vertexai module
**Code Snippet:**
```
import { FunctionDeclarationSchemaType } from "@google-cloud/vertexai";
```
- **Line:** 10
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### HarmBlockThreshold - [EXPORT]
------------------------------------------------------------
**Description:** Exported object from @google-cloud/vertexai module
**Code Snippet:**
```
import { HarmBlockThreshold } from "@google-cloud/vertexai";
```
- **Line:** 10
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### HarmCategory - [EXPORT]
------------------------------------------------------------
**Description:** Exported object from @google-cloud/vertexai module
**Code Snippet:**
```
import { HarmCategory } from "@google-cloud/vertexai";
```
- **Line:** 10
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### VertexAI - [EXPORT]
------------------------------------------------------------
**Description:** Exported object from @google-cloud/vertexai module
**Code Snippet:**
```
import { VertexAI } from "@google-cloud/vertexai";
```
- **Line:** 10
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### getTokens - [EXPORT]
------------------------------------------------------------
**Description:** Exported object from shared module
**Code Snippet:**
```
import { getTokens } from "./shared";
```
- **Line:** 11
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### parseYaml - [EXPORT]
------------------------------------------------------------
**Description:** Function to convert a YAML string into a JSON object.
**Code Snippet:**
```
export function parseYaml(yamlString: string): any { ... }
```
- **Line:** 28
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### parseText - [EXPORT]
------------------------------------------------------------
**Description:** Function to convert a text string into a JSON object with a specified key.
**Code Snippet:**
```
export function parseText(text: string, resKey = "response"): any { ... }
```
- **Line:** 38
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### infer - [EXPORT]
------------------------------------------------------------
**Description:** Asynchronous function to infer a response based on a given prompt and model.
**Code Snippet:**
```
export async function infer(prompt: string, responseMode: "JSON object" | "YAML object" | "TEXT STRING" = "JSON object", responseKey?: string, bPro = false, bRetry = true, supplementalData?: any, model: string = textModel): Promise<any> { ... }
```
- **Line:** 45
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### getCodeSummaryFromLLM - [EXPORT]
------------------------------------------------------------
**Description:** Asynchronously gets a code summary from the LLM based on the provided code block and model.
**Code Snippet:**
```
export async function getCodeSummaryFromLLM(codeToSummarize: string, model: string = textModel): Promise<codeSummary> { ... }
```
- **Line:** 70
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available



### callLLM - [EXPORT]
------------------------------------------------------------
**Description:** Asynchronously calls the LLM with a given prompt template, project context, code, file path, and model.
**Code Snippet:**
```
export async function callLLM(promptTemplate: string, projectContext: ProjectSummary, code: string, filePath: string, bRAG = false, model: string = textModel): Promise<any> { ... }
```
- **Line:** 86
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


