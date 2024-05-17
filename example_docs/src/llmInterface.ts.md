# src/llmInterface.ts

**Summary:** The goal of the code is to replace placeholders in a template with actual values, call an AI API to process the template, handle potential rate limiting, and enhance the response with file path information.

- **File Location:** .//src/llmInterface.ts
- **Language:** TypeScript
## Table of Contents
- [classes](#classes)
- [functions](#functions)
- [variables](#variables)
- [imports](#imports)
- [exports](#exports)
- [interfaces](#interfaces)
## classes
📘 **CLASSES**

### Ollama - [CLASS]
- **Description:** Class representing the OLLAMA settings.
- **Line:** 18
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
class Ollama { ... }
```
### OpenAI - [CLASS]
- **Description:** Class representing the OpenAI settings.
- **Line:** 19
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
class OpenAI { ... }
```
### VertexAI - [CLASS]
- **Description:** Class representing the Vertex AI settings.
- **Line:** 33
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
class VertexAI { ... }
```
## functions
🔧 **FUNCTIONS**

### getModelBackend - [FUNCTION]
- **Description:** Returns the backend type (OLLAMA, VERTEX, or OPENAI) for the selected model.
- **Line:** 64
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


**Code Snippet:**
```
const getModelBackend = (selectedModel: string) => {
const model = MODEL_MODES.find((m) => m.model === selectedModel);
if (model) {
return model.backend as llm_modes;
}
throw new Error("Model not found");
};
```
###### Function Parameters:
- **selectedModel** (string): The model name to find its backend. 
 Example: gpt-4o
###### Function Returns:
- **Type:** llm_modes
- **Description:** The backend associated with the selected model.
- **Example:** OLLAMA
### validateJSON - [FUNCTION]
- **Description:** Checks if a string is a valid JSON.
- **Line:** 141
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


**Code Snippet:**
```
function validateJSON(jsonString: string): boolean {
try {
JSON.parse(jsonString);
return true;
} catch (e) {
console.error(e);
```
###### Function Parameters:
- **jsonString** (string): The string to be validated as JSON. 
 Example: {"key": "value"}
###### Function Returns:
- **Type:** boolean
- **Description:** True if the string is a valid JSON, false otherwise.
- **Example:** true
### fixJSON - [FUNCTION]
- **Description:** Attempts to repair a given JSON string using 'jsonrepair'. Throws an error if it fails.
- **Line:** 4
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


**Code Snippet:**
```
function fixJSON(jsonString: string): string { ... }
```
###### Function Parameters:
- **jsonString** (string): The JSON string to be repaired. 
 Example: {"key": value}
###### Function Returns:
- **Type:** string
- **Description:** The repaired JSON string.
- **Example:** {"key": "value"}
### parseYaml - [FUNCTION]
- **Description:** Parses a YAML string into a JavaScript object.
- **Line:** 11
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export function parseYaml(yamlString: string): any { ... }
```
###### Function Parameters:
- **yamlString** (string): The YAML string to be parsed. 
 Example: key: value
###### Function Returns:
- **Type:** any
- **Description:** The resulting JavaScript object from parsing the YAML string.
- **Example:** {"key": "value"}
### parseText - [FUNCTION]
- **Description:** Converts a text string into a JSON object with a specified key.
- **Line:** 20
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


**Code Snippet:**
```
export function parseText(text: string, resKey = 'response'): any { ... }
```
###### Function Parameters:
- **text** (string): The text to be converted to a JSON object. 
 Example: Example text
- **resKey** (string): The key for the resulting JSON object. Default is 'response'. 
 Example: response
###### Function Returns:
- **Type:** any
- **Description:** The resulting JSON object.
- **Example:** {"response": "Example text"}
### wait - [FUNCTION]
- **Description:** Asynchronously waits for a specified number of milliseconds.
- **Line:** 28
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


**Code Snippet:**
```
async function wait(ms: number) { ... }
```
###### Function Parameters:
- **ms** (number): The number of milliseconds to wait. 
 Example: 1000
###### Function Returns:
- **Type:** Promise<void>
- **Description:** A promise that resolves after the specified number of milliseconds.
- **Example:** Promise that resolves after 1000 ms
### getFileNameFromPath - [FUNCTION]
- **Description:** Extracts the file name from a given file path.
- **Line:** 7
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


**Code Snippet:**
```
const getFileNameFromPath = (path: string) => path.split("/").pop() || "";
```
###### Function Parameters:
- **path** (string): The file path from which to extract the file name. 
 Example: /path/to/file.ts
###### Function Returns:
- **Type:** string
- **Description:** The extracted file name.
- **Example:** file.ts
### infer - [FUNCTION]
- **Description:** Calls the AI API with the given parameters to infer a response.
- **Line:** 13
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


**Code Snippet:**
```
const response = await infer(prompt, "JSON object", undefined, true, true, { fileLocation: filePath, fileName: fileName }, model).catch((error) => { console.error("Error calling API:", error); return { error: error }; });
```
###### Function Parameters:
- **prompt** (string): The prompt to send to the AI API. 
 Example: Generate a JSON object.
- **responseType** (string): Expected type of the response. 
 Example: JSON object
- **otherParams** (any): Additional optional parameters for the API call. 
 Example: undefined
- **param1** (boolean): A boolean example parameter. 
 Example: true
- **param2** (boolean): A boolean example parameter. 
 Example: true
- **context** (object): An object containing the context for the API call. 
 Example: { fileLocation: '/src/llmInterface.ts', fileName: 'llmInterface.ts' }
- **model** (any): The AI model to use for the inference. 
 Example: model
###### Function Returns:
- **Type:** any
- **Description:** The response from the AI API.
- **Example:** { error: { message: 'Some error' } }
### getFileNameFromPath - [FUNCTION]
- **Description:** Function to extract the file name from a given file path
- **Line:** 7
- **Indent:** 2
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const getFileNameFromPath = (path: string) => path.split('/').pop() || '';
```
### wait - [FUNCTION]
- **Description:** Utility function to wait for specified milliseconds.
- **Line:** 45
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export function wait(ms: number) { ... }
```
## variables
🧮 **VARIABLES**

### retries - [VARIABLE]
- **Description:** Variable to keep track of the number of retries.
- **Line:** 35
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
let retries = 0;
```
### endpoints - [VARIABLE]
- **Description:** Object containing endpoint URLs for different services.
- **Line:** 38
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const endpoints = {
  OLLAMA: process.env.OLLAMA_SERVER_URL || "http://infinity.local:11434",
};
```
### MODEL_MODES - [VARIABLE]
- **Description:** Array containing information about different model modes.
- **Line:** 44
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const MODEL_MODES = [
  {
    name: "codeqwen:7b-code-v1.5-q8_0",
    model: "codeqwen:7b-code-v1.5-q8_0",
    backend: "OLLAMA"
  },
  {
    name: "qwen:32b-text-v1.5-q4_0",
    model: "qwen:32b-text-v1.5-q4_0",
    backend: "OLLAMA"
  },
  {
    name: "gpt-4o",
    model: "gpt-4o",
    backend: "OPENAI"
  },
  {
    name: "phi3:3.8b-mini-instruct-4k-fp16",
    model: "phi3:3.8b-mini-instruct-4k-fp16",
    backend: "OLLAMA",
  },
  {
    name: "llama3-gradient:8b-instruct-1048k-q6_K",
    model: "llama3-gradient:8b-instruct-1048k-q6_K",
    backend: "OLLAMA",
  },
  {
    name: "phi3",
    model: "phi3",
    backend: "OLLAMA",
  },
  {
    name: "dolphin-llama3:8b-v2.9-fp16",
    model: "dolphin-llama3:8b-v2.9-fp16",
    backend: "OLLAMA",
  },
  {
    name: "codechat-bison",
    model: "codechat-bison",
    backend: "VERTEX",
  },
  {
    name: "codechat-bison-32k",
    model: "codechat-bison-32k",
    backend: "VERTEX",
  },
  {
    name: "gemini-1.5-flash-preview-0514",
    model: "gemini-1.5-flash-preview-0514",
    backend: "VERTEX",
  },
  {
    name: "gemini-1.5-pro-preview-0514",
    model: "gemini-1.5-pro-preview-0514",
    backend: "VERTEX",
  },
];
```
### openai - [VARIABLE]
- **Description:** Instance of OpenAI class initialized with organization ID and API key.
- **Line:** 75
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const openai = new OpenAI({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY
});
```
### ollama - [VARIABLE]
- **Description:** Instance of Ollama class initialized with a host URL.
- **Line:** 81
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const ollama = new Ollama({ host: endpoints.OLLAMA });
```
### project - [VARIABLE]
- **Description:** String containing the name of the project.
- **Line:** 85
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const project = "sweet-papa-technologies";
```
### location - [VARIABLE]
- **Description:** String containing the location setting, specifically 'us-central1'.
- **Line:** 86
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const location = "us-central1";
```
### textModel - [VARIABLE]
- **Description:** String containing the name of the text model used in VertexAI.
- **Line:** 87
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const textModel = "gemini-1.5-flash-preview-0514";
```
### textModelAdvanced - [VARIABLE]
- **Description:** String containing the name of the advanced text model used in VertexAI.
- **Line:** 88
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const textModelAdvanced = "gemini-1.5-pro-preview-0514";
```
### vertexAI - [VARIABLE]
- **Description:** Instance of VertexAI class initialized with project and location settings.
- **Line:** 91
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const vertexAI = new VertexAI({ project: project, location: location });
```
### safetySettings - [VARIABLE]
- **Description:** Array containing safety settings for the generative model.
- **Line:** 93
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];
```
### generativeModel - [VARIABLE]
- **Description:** Instance of a generative model using the textModel and safetySettings in VertexAI.
- **Line:** 106
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const generativeModel = vertexAI.getGenerativeModel({
  model: textModel,
  safetySettings: safetySettings,
});
```
### generateModelAdv - [VARIABLE]
- **Description:** Instance of a generative model using the textModelAdvanced and safetySettings in VertexAI.
- **Line:** 110
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const generateModelAdv = vertexAI.getGenerativeModel({
  model: textModelAdvanced,
  safetySettings: safetySettings,
});
```
### generativeModelPreview - [VARIABLE]
- **Description:** Instance of a generative model using the textModel in VertexAI for preview.
- **Line:** 114
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const generativeModelPreview = vertexAI.getGenerativeModel({
  model: textModel,
});
```
### modelBackend - [VARIABLE]
- **Description:** Determines the backend to be used based on the provided model.
- **Line:** 39
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const modelBackend: llm_modes = getModelBackend(model);
```
### promptResponseInstructions - [VARIABLE]
- **Description:** Instructions to be appended to the prompt based on the response mode.
- **Line:** 42
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const promptResponseInstructions = `Please respond with a ${responseMode} containing your answer. ${responseMode !== "TEXT STRING" ? `Please properly format and escape your output, as I will need to parse your response.` : ""} ${responseKey ? `The key for the response should be ${responseKey}.` : ""}

`;
```
### promptCharLen - [VARIABLE]
- **Description:** Length of the prompt string in characters.
- **Line:** 50
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const promptCharLen = prompt.length;
```
### promptLen - [VARIABLE]
- **Description:** Length of the prompt string in tokens.
- **Line:** 51
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const promptLen = getTokens(prompt);
```
### promptNew - [VARIABLE]
- **Description:** The updated prompt string based on response mode.
- **Line:** 57
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
let promptNew = prompt;
```
### startTime - [VARIABLE]
- **Description:** Start time for inference processing.
- **Line:** 67
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const startTime = Date.now();
```
### ollamaResponse - [VARIABLE]
- **Description:** Stores the response from Ollama model.
- **Line:** 78
- **Indent:** 3
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
const ollamaResponse = await ollama.generate({
```
### genFunction - [VARIABLE]
- **Description:** A function variable that determines which model generation function to use.
- **Line:** 7
- **Indent:** 4
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
let genFunction = generativeModel;
```
### bFixed - [VARIABLE]
- **Description:** A flag that indicates if the JSON response has been fixed.
- **Line:** 59
- **Indent:** 6
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** true
- **Async:** Not Available


**Code Snippet:**
```
let bFixed = false;
```
### newData - [VARIABLE]
- **Description:** Holds the first element of the response array.
- **Line:** 5
- **Indent:** 10
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const newData = res[0];
```
### keys - [VARIABLE]
- **Description:** Holds the keys of the newData object.
- **Line:** 8
- **Indent:** 10
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const keys = Object.keys(newData);
```
### expectedKeys - [VARIABLE]
- **Description:** An array of expected keys in the CodeObjects.
- **Line:** 10
- **Indent:** 10
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const expectedKeys: CodeObjects[] = [
            "classes",
            "functions",
            "variables",
            "types",
            "interfaces",
            "comments",
            "imports",
            "exports"
          ];
```
### fixedData - [VARIABLE]
- **Description:** An object initialized as 'any' type to hold fixed data.
- **Line:** 19
- **Indent:** 12
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const fixedData = {} as any;
```
### question - [VARIABLE]
- **Description:** A template question used for summarizing code.
- **Line:** 48
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const question = `Summarize the code block below. Mention the goal of the code and any relevant features / functions: 
  Please respond with a JSON object as follows:
  {
    "goal": "The goal of the code",
    "features_functions": "Any relevant features",
  }

  ### Code To Sumnarize:
  ${codeToSummarize}
  `
```
### codeSummary - [VARIABLE]
- **Description:** Holds the result of the inference call summarizing the code.
- **Line:** 58
- **Indent:** 2
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const codeSummary = await infer(
    question,
    "JSON object",
    undefined,
    false,
    undefined,
    undefined,
    model
  );
```
### relevantCode - [VARIABLE]
- **Description:** Holds 400 characters of relevant code from a project.
- **Line:** 6
- **Indent:** 4
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const relevantCode = await searchRAG(projectContext.projectName, code); // Placeholder, implement searchRAG function
```
### r - [VARIABLE]
- **Description:** Holds a substring of the relevant code (up to 400 characters).
- **Line:** 7
- **Indent:** 4
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const r =
    relevantCode.documentData.length > 400
      ? relevantCode.documentData.substring(0, 400)
      : relevantCode.documentData;
```
### fileName - [VARIABLE]
- **Description:** Variable to store the extracted file name from the given file path
- **Line:** 8
- **Indent:** 2
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const fileName = getFileNameFromPath(filePath);
```
### response - [VARIABLE]
- **Description:** Variable to store the response from the AI API call
- **Line:** 12
- **Indent:** 2
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
const response = await infer(prompt, 'JSON object', undefined, true, true, { fileLocation: filePath, fileName: fileName }, model).catch((error) => { console.error('Error calling API:', error); return { error: error }; });
```
### codeObjects - [VARIABLE]
- **Description:** Variable to store the parsed and validated response from the AI API call
- **Line:** 25
- **Indent:** 2
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** Not Available


**Code Snippet:**
```
let codeObjects: any = response;
```
## imports
📥 **IMPORTS**

### jsonrepair - [IMPORT]
- **Description:** A function used to repair JSON strings.
- **Line:** 5
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import jsonrepair from 'jsonrepair';
```
### yaml - [IMPORT]
- **Description:** A library used to load YAML formatted strings.
- **Line:** 15
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import * as yaml from 'yaml';
```
### llm_modes - [IMPORT]
- **Description:** Types related to language model modes.
- **Line:** 39
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { llm_modes } from 'llmModes';
```
### getModelBackend - [IMPORT]
- **Description:** Function used to get the model backend.
- **Line:** 40
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { getModelBackend } from 'modelBackend';
```
### textModel - [IMPORT]
- **Description:** The default text model to be used.
- **Line:** 41
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { textModel } from 'textModels';
```
### textModelAdvanced - [IMPORT]
- **Description:** An advanced text model to be used.
- **Line:** 42
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { textModelAdvanced } from 'textModels';
```
### vertexWAIT - [IMPORT]
- **Description:** Time to wait for vertex model.
- **Line:** 43
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { vertexWAIT } from 'config';
```
### ollama - [IMPORT]
- **Description:** Ollama library to generate responses.
- **Line:** 88
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import * as ollama from 'ollama';
```
### systemPrompt - [IMPORT]
- **Description:** System prompt configuration.
- **Line:** 89
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { systemPrompt } from 'prompts';
```
### parseYaml - [IMPORT]
- **Description:** Importing the parseYaml function from a module.
- **Line:** 108
- **Indent:** 0
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { parseYaml } from 'yaml';
```
### ProjectSummary - [IMPORT]
- **Description:** Importing the ProjectSummary type from a module.
- **Line:** 2
- **Indent:** 0
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { ProjectSummary } from './types';
```
### searchRAG - [IMPORT]
- **Description:** Importing the searchRAG function from a module.
- **Line:** 16
- **Indent:** 0
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { searchRAG } from './ragSearch';
```
### wait - [IMPORT]
- **Description:** Utility function to wait for a specified duration
- **Line:** 24
- **Indent:** 4
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
await wait(30000);
```
## exports
📤 **EXPORTS**

### parseYaml - [EXPORT]
- **Description:** Function to convert a YAML string into a JSON object
- **Line:** 12
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export function parseYaml(yamlString: string): any { ... }
```
### parseText - [EXPORT]
- **Description:** Function to convert text into a JSON object using a specified response key
- **Line:** 21
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export function parseText(text: string, resKey = "response"): any { ... }
```
### infer - [EXPORT]
- **Description:** Asynchronous function to infer responses using different models and formats
- **Line:** 27
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
export async function infer(...) { ... }
```
## interfaces
🌉 **INTERFACES**

### FunctionDeclarationSchemaType - [INTERFACE]
- **Description:** Interface imported from @google-cloud/vertexai, which is likely used for defining function declaration schema types.
- **Line:** 18
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { FunctionDeclarationSchemaType } from '@google-cloud/vertexai';
```
### HarmBlockThreshold - [INTERFACE]
- **Description:** Interface imported from @google-cloud/vertexai, used to define the thresholds for harm categories.
- **Line:** 19
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { HarmBlockThreshold } from '@google-cloud/vertexai';
```
### HarmCategory - [INTERFACE]
- **Description:** Interface imported from @google-cloud/vertexai, used to define harm categories for safety settings.
- **Line:** 20
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { HarmCategory } from '@google-cloud/vertexai';
```
### VertexAI - [INTERFACE]
- **Description:** Interface imported from @google-cloud/vertexai used for Vertex AI functionalities.
- **Line:** 21
- **Indent:** 0
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
import { VertexAI } from '@google-cloud/vertexai';
```
### CodeObjects - [INTERFACE]
- **Description:** An interface that contains various code-related keys such as classes, functions, variables, etc.
- **Line:** 13
- **Indent:** 10
- **Location:** llmInterface.ts (.//src/llmInterface.ts)
- **Exported:** Not Available
- **Private:** Not Available
- **Async:** Not Available


**Code Snippet:**
```
interface CodeObjects { classes: string[]; functions: string[]; variables: string[]; types: string[]; interfaces: string[]; comments: string[]; imports: string[]; exports: string[]; }
```
