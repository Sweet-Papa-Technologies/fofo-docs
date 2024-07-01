# src/models.ts - fofo-docs

**Summary:** This code defines a set of LLM models with their names, model identifiers, backend platforms (Ollama, OpenAI, Vertex), and optional context sizes. It provides a list of recommended models for an application, allowing users to select and utilize different LLM models based on their needs.

- **File Location:** ./src/models.ts
- **Language:** language: TypeScript 

## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [types](#types)
- [imports](#imports)
- [interfaces](#interfaces)
## functions


### 🔧 getModelBackend - FUNCTION
------------------------------------------------------------
**Description:** This function retrieves the backend type for a given model name from the MODEL_MODES array.

**Code Snippet:**


```typescript
const getModelBackend = (selectedModel: string) => {
  const model = MODEL_MODES.find((m) => m.model === selectedModel);
  if (model) {
    return model.backend as llm_modes;
  }
  throw new Error("Model not found");
};
```

- **Line:** Could Not Verify Line
- **Location:** models.ts (./src/models.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **selectedModel** (string): The name of the model to retrieve the backend for. 
 Example: "phi3"
###### Function Returns:
- **Type:** llm_modes
- **Description:** The backend type for the given model, or an error if the model is not found.
- **Example:** "OLLAMA"
###### Annotations / Comments:
- **Purpose:** The `getModelBackend` function is responsible for retrieving the backend type associated with a given model name. It searches the `MODEL_MODES` array for a model with a matching name and returns its backend type. If no matching model is found, it throws an error.
- **Parameters:** - `selectedModel`: A string representing the name of the model to retrieve the backend for. For example, "phi3".
- **Returns:** - `llm_modes`: A string representing the backend type for the given model. Possible values include "OLLAMA", "VERTEX", or "OPENAI". If the model is not found, an error is thrown.
- **Usage Example:** 


```typescript
const backend = getModelBackend("phi3");
console.log(backend); // Output: "OLLAMA"
```

- **Edge Cases:** If the provided `selectedModel` does not exist in the `MODEL_MODES` array, the function throws an error.
- **Dependencies:** - `MODEL_MODES` array: This array contains the list of available models and their backend types.
## variables


### 🧮 MODELS - VARIABLE
------------------------------------------------------------
**Description:** An array of objects that represent different LLM models.

**Code Snippet:**


```typescript
export const MODELS:llmModel[] = [

];
```

- **Line:** 19
- **Location:** models.ts (./src/models.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines an array of objects that represent different LLM models available for use in the application.
- **Usage Example:** 


```typescript
const selectedModel = MODELS.find(model => model.name === 'phi3');
```


### 🧮 MODEL_MODES_BASE - VARIABLE
------------------------------------------------------------
**Description:** An array of objects that represent the recommended LLM models for the application.

**Code Snippet:**


```typescript
export const MODEL_MODES_BASE:llmModel[] = [
  {
    "name": "deepseek-coder-v2:16b-lite-instruct-q6_K",
    "model": "deepseek-coder-v2:16b-lite-instruct-q6_K",
    "backend": "OLLAMA"
  },
  {
    "name": "gemma2:27b",
    "model": "gemma2:27b",
    "backend": "OLLAMA",
    context: 32000
  },
  {
    "name": "gemma2:27b-instruct-q6_K",
    "model": "gemma2:27b-instruct-q6_K",
    "backend": "OLLAMA",
    context: 32000
  },
  {
    "name": "yi:34b",
    "model": "yi:34b",
    "backend": "OLLAMA",
    context: 32000
  },
  {
    "name": "codestral:22b-v0.1-q5_0",
    "model": "codestral:22b-v0.1-q5_0",
    "backend": "OLLAMA",
    context: 32000
  },
    {
      "name": "codestral:22b-v0.1-q5_1",
      "model": "codestral:22b-v0.1-q5_1",
      "backend": "OLLAMA",
      context: 32000
    },
  
    {
      "name": "granite-code:34b",
      "model": "granite-code:34b",
      "backend": "OLLAMA"
    },
    {
      "name": "phi3:14b-medium-128k-instruct-q5_1",
      "model": "phi3:14b-medium-128k-instruct-q5_1",
      "backend": "OLLAMA"
    }
    ,
    {
      name: "phi3:14b-medium-4k-instruct-q6_K",
      model: "phi3:14b-medium-4k-instruct-q6_K",
      backend: "OLLAMA"
    },
    {
      name: "qwen:32b-chat-v1.5-q4_K_M",
      model: "qwen:32b-chat-v1.5-q4_K_M",
      backend: "OLLAMA"
    },
    {
      name: "mixtral:8x7b-instruct-v0.1-q3_K_L",
      model: "mixtral:8x7b-instruct-v0.1-q3_K_L",
      backend: "OLLAMA"
    },
    {
      name: "qwen:32b-chat-v1.5-q4_0",
      model: "qwen:32b-chat-v1.5-q4_0",
      backend: "OLLAMA"
    },
    {
      name: "codeqwen:7b-code-v1.5-q8_0",
      model: "codeqwen:7b-code-v1.5-q8_0",
      backend: "OLLAMA"
    },
    {
      name: "llama3-chatqa:8b-v1.5-fp16",
      model: "llama3-chatqa:8b-v1.5-fp16",
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
      name: "gemini-1.5-flash-001",
      model: "gemini-1.5-flash-001",
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

- **Line:** 29
- **Location:** models.ts (./src/models.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines an array of objects representing recommended LLM models for the application. Each object contains the model's name, model identifier, backend platform (Ollama, OpenAI, Vertex), and optional context size.
- **Usage Example:** 


```typescript
const model = MODEL_MODES_BASE.find(m => m.model === 'yi:34b');
```

## types


### 🏷️ llmBackendMode - TYPE
------------------------------------------------------------
**Description:** Type alias for the backend mode of the LLM.

**Code Snippet:**


```typescript
export type llmBackendMode = 'OLLAMA' | 'OPENAI' | 'VERTEX';
```

- **Line:** 2
- **Location:** models.ts (./src/models.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines the possible backend modes for the LLM, which are 'OLLAMA', 'OPENAI', and 'VERTEX'.
- **Usage Example:** 


```typescript
const backendMode: llmBackendMode = 'OLLAMA';
```


### 🏷️ llmModel - TYPE
------------------------------------------------------------
**Description:** Type interface for the LLM model.

**Code Snippet:**


```typescript
export type llmModel = {
    name: string;
    model: string;
    backend: llmBackendMode;
    context?: number
}
```

- **Line:** 3
- **Location:** models.ts (./src/models.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type interface defines the structure for an LLM model, specifying its name, model identifier, backend platform, and optional context size.
- **Usage Example:** 


```typescript
const myModel: llmModel = {
  name: "gpt-3.5-turbo",
  model: "gpt-3.5-turbo",
  backend: "OPENAI",
  context: 4096
};
```

## imports


### 📥 ./logger - IMPORT
------------------------------------------------------------
**Description:** Imports the logger module from the current directory.

**Code Snippet:**


```typescript
import "./logger";
```

- **Line:** 1
- **Location:** models.ts (./src/models.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This line imports the `logger` module from the current directory, likely to use its logging functionality within the `models.ts` file.
- **Dependencies:** The `logger` module from the current directory.
## interfaces


### 🌉 llmModel - INTERFACE
------------------------------------------------------------
**Description:** Interface for defining LLM models.

**Code Snippet:**


```typescript
export type llmModel = {
    name: string;
    model: string;
    backend: llmBackendMode;
    context?: number
}
```

- **Line:** 3
- **Location:** models.ts (./src/models.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for representing different Large Language Models (LLMs) used in the application. It specifies the name, model identifier, backend platform (Ollama, OpenAI, Vertex), and optional context size for each LLM.
- **Usage Example:** 


```typescript
const myModel: llmModel = {
  name: "phi3",
  model: "phi3",
  backend: "OLLAMA"
};
```

