import "./logger";
export type llmBackendMode = 'OLLAMA' | 'OPENAI' | 'VERTEX';
export type llmModel = {
    name: string;
    model: string;
    backend: llmBackendMode;
    context?: number
}

// EXAMPLE:
// {
//     "name": "phi3", // THE NAME OF THE MODEL, I.E. "phi3" FOR OLLAMA, "gpt-4o" FOR OPENAI, "codechat-bison" FOR VERTEX ETC
//     "model": "phi3", // SAME AS MODEL NAME
//     "backend": "OLLAMA" // THE BACKEND TO USE, I.E. "OLLAMA" FOR OLLAMA, "OPENAI" FOR OPENAI, "VERTEX" FOR VERTEX ETC
// }

// ADD YOUR OWN MODELS HERE, REFER TO EXAMPLE ABOVE
// ADD AS MANY AS YOU LIKE!!
export const MODELS:llmModel[] = [

];

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
// These are the recommended models for the app. Keep these the same.
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

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
      name: "gpt-4o-mini",
      model: "gpt-4o-mini",
      backend: "OPENAI"
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
      name: "gemini-1.5-flash",
      model: "gemini-1.5-flash",
      backend: "VERTEX",
    },
    {
      name: "gemini-2.0-flash-exp",
      model: "gemini-2.0-flash-exp",
      backend: "VERTEX",
    },
    {
      name: "gemini-1.5-flash-002",
      model: "gemini-1.5-flash-002",
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