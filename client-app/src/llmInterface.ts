import {
  CodeObject,
  CodeObjectType,
  CodeObjects,
  ProjectSummary,
  codeSummary,
  modelServiceConfig,
} from "./objectSchemas"; // Adjust path as needed
import { searchRAG } from "./vectorDB";
import yaml from "js-yaml";
import { jsonrepair } from "jsonrepair";
import { Ollama } from "ollama";
import OpenAI from "openai";


import "dotenv/config";

import {
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from "@google-cloud/vertexai";
import { getTokens } from "./shared";

let retries = 0;

// Model Service Modes:
const endpoints = {
  OLLAMA: process.env.OLLAMA_SERVER_URL || "http://infinity.local:11434",
};
const systemPrompt =
  "You are a developer A.I. that summarizes and analyzes code. Please answer all questions asked of you exactly as presented.";

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

const getModelBackend = (selectedModel: string) => {
  const model = MODEL_MODES.find((m) => m.model === selectedModel);
  if (model) {
    return model.backend as llm_modes;
  }
  throw new Error("Model not found");
};

type llm_modes = "OLLAMA" | "VERTEX" | "OPENAI";

// OpenAI Settings
const openai = new OpenAI({
  organization: "org-AJuc7Pqai9CXwN0oppvHSwYk",
  apiKey: process.env.OPENAI_API_KEY
});

// OLLAMA Settings
const ollama = new Ollama({ host: endpoints.OLLAMA });
const contextLength = 32000; // Works with 24GB GPU - RTX 4090

// Vertex Settings:
const project = "sweet-papa-technologies";
const location = "us-central1";
const textModel = "gemini-1.5-flash-preview-0514";
const textModelAdvanced = "gemini-1.5-pro-preview-0514	";
const vertexWAIT = 5000;

const vertexAI = new VertexAI({ project: project, location: location });

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

const generativeModel = vertexAI.getGenerativeModel({
  model: textModel,
  safetySettings: safetySettings,
});

const generateModelAdv = vertexAI.getGenerativeModel({
  model: textModelAdvanced,
  safetySettings: safetySettings,
});

const generativeModelPreview = vertexAI.getGenerativeModel({
  model: textModel,
});

// General Functions
function validateJSON(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

function fixJSON(jsonString: string): string {
  try {
    return jsonrepair(jsonString);
  } catch (e) {
    throw new Error("Unable to fix JSON");
  }
}

export function parseYaml(yamlString: string): any {
  // Convert YAML file into a proper JSON object
  try {
    const obj = yaml.load(yamlString) as any;
    return obj as any;
  } catch (e: any) {
    console.log(e);
    throw new Error("Invalid YAML object");
  }
}

export function parseText(text: string, resKey = "response"): any {
  // Convert text into a proper JSON object
  const obj = {} as any;
  obj[resKey] = text;
  return obj;
}

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function infer(
  prompt: string,
  responseMode: "JSON object" | "YAML object" | "TEXT STRING" = "JSON object",
  responseKey?: string,
  bPro = false,
  bRetry = true,
  supplementalData?: any,
  model: string = textModel
): Promise<any> {
  const modelBackend:llm_modes = getModelBackend(model);

  console.log("====> Model Backend:", modelBackend);

  if (modelBackend === "VERTEX") {
    if (model !== textModel && model !== textModelAdvanced) {
      console.log("Waiting 1 second...");
      await wait(1000);
    } else {
      console.log("Waiting 5 seconds...");
      await wait(vertexWAIT);
    }
  }

  const promptResponseInstructions = `Please respond with a ${responseMode} containing your answer. ${
    responseMode !== "TEXT STRING"
      ? `Please properly format and escape your output, as I will need to parse your response.`
      : ""
  }${
    responseKey ? `The key for the response should be ${responseKey}.` : ""
  }\n\n`;

  if (responseMode !== "TEXT STRING" && responseKey) {
    console.warn(
      "responseKey is only applicable for TEXT STRING responseMode. Ignoring responseKey."
    );
  }

  prompt = prompt.trim();
  prompt = promptResponseInstructions + prompt;

  const promptCharLen = prompt.length;
  const promptLen = getTokens(prompt);

  console.log(`Prompt: ${promptCharLen} Characters`);
  console.log(`Prompt: ${promptLen} Tokens`);

  let promptNew = prompt;

  if (responseMode === "JSON object") {
    promptNew = `
    In your response, PLEASE BE SURE TO FORMAT YOUR RESPONSE AS A PARSE-ABLE JSON OBJECT.
    This means that your response keys and values should be properly formatted and escaped.

    ${prompt}
    `;
  }

  let response = "";

  const startTime = Date.now();

  // BASED on the model passed, we will call the appropriate endpoints, etc:

  if (modelBackend === "OLLAMA") {
    //

    // const contextLength = promptLen > 1000 ? 32000 : 4096;

    const ollamaResponse = await ollama.generate({
      model: model,
      prompt: promptNew,
      stream: false,
      system: systemPrompt,
      options: {
        // temperature: 0.3,
        // top_p: 0.95,
        // top_k: 0.95,
        num_ctx: contextLength,
      },
    });
    console.log(ollamaResponse.response.length);
    response = ollamaResponse.response;
  } else if (modelBackend === "VERTEX") {
    //
    const request = {
      contents: [{ role: "user", parts: [{ text: promptNew }] }],
    };

    let genFunction = generativeModel;
    if (bPro === true) {
      genFunction = generateModelAdv;
    }

    const result = await genFunction.generateContent(request);

    try {
      response = result.response.candidates?.[0].content?.parts[0].text || "";
    } catch (error: any) {
      console.error("Error parsing response from Gemini:", error);
      console.debug("Prompt to Gemini:", promptNew);

      if (typeof result === "string") {
        console.log(
          "Response from Gemini:",
          "Response is a string, but not a valid JSON object"
        );
        console.log(result);
      } else {
        console.log(
          "Response from Gemini - String-y-fied:",
          JSON.stringify(result)
        );
      }

      if (bRetry == true || retries < 3) {
        retries += 1;
        console.log("Retrying since there was an error");
        return await infer(
          promptNew,
          responseMode,
          responseKey,
          bPro,
          false,
          supplementalData,
          model
        );
      }
    }
  } else if (modelBackend === "OPENAI") {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt },
      { role: "user", content: promptNew}
      ],
      model: model,
    });
  
    console.log(completion.choices[0]);
    response = completion.choices[0].message.content || "";

    if (response === "") {
      console.error("Empty response from OpenAI");
      console.error(completion);
    }
  }
  else {
    console.error("Unknown Model Backend");
  }

  const endTime = Date.now();
  const totalTime = endTime - startTime;

  // PRint the total time in seconds, truncated to 2 decimal places
  console.log(`Total Time: ${totalTime / 1000}s`);

  if (typeof response !== "string") {
    throw new Error("Invalid response from LLM");
  }

  if (responseMode === "JSON object") {
    response = response.replace("```json", "").replace("```", "").trim();

    let bFixed = false;
    if (validateJSON(response) === true) {
      console.log("Valid JSON:");
    } else {
      console.error("Invalid JSON, attempting to fix:");
      try {
        const fixedJson = fixJSON(response);
        console.log("Fixed JSON:", fixedJson);
        response = fixedJson;
        bFixed = true;
      } catch (error: any) {
        console.error("Error fixing JSON:", error.message);

        if (bRetry == true || retries < 3) {
          retries += 1;
          console.log(
            "Retrying since JSON output was not correct, here is what we got:"
          );

          console.log(`\n\nBAD JSON\n${response}\n\n`);

          return await infer(
            promptNew,
            responseMode,
            responseKey,
            bPro,
            false,
            supplementalData,
            model
          );
        }

        console.warn("Returning error message as JSON -- Please Try Again");
        return { error: error, original: response } as any;
      }
    }

    try {
      const res = JSON.parse(response);

      if (bFixed == true) {
        console.debug("JSON was fixed! Checking that everything else is OK now.");
        console.debug(res.length);

        // Check if Object malformed into an Array some how...
        if (Array.isArray(res) === true && res.length >= 1) {
          console.log("This looks like a fixed JSON object!");
          if ("classes" in res[0] === false) {
            console.warn("This object does not look correct!");
            console.warn(res);
          }

          const newData = res[0];

          // We should check that the fixed JSON object has the same amount of keys as our interface for the object:
          const keys = Object.keys(newData);

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

          if (keys.length < expectedKeys.length) {
            console.warn(
              "This object does not look correct! Attempting to fix:"
            );

            const fixedData = {} as any;
            for (const key of expectedKeys) {
              if (key in newData) {
                fixedData[key] = newData[key];
              } else {
                if (key === "fileName") {
                  fixedData[key] = supplementalData.fileName || "unknown";
                }
                if (key === "fileLocation") {
                  fixedData[key] = supplementalData.fileLocation || "unknown";
                }
                if (key !== "fileName" && key !== "fileLocation") {
                  fixedData[key] = [];
                }
              }
            }
          }

          console.log("JSON should be fixed now...");

          return res[0];
        } else if (Array.isArray(res) === true) {
          console.log("This looks like a fixed JSON object, but it is empty!");
          console.warn(res);
        }

        // Check if the object has the expected keys
        if ("classes" in res === false) {
          console.log(
            "This was a fixed JSON object, with a single key as expected!"
          );
          console.warn(
            "This object does not look correct though, an expected key is missing!"
          );
          console.warn(res);
        }

      }

      return res;
    } catch (e: any) {
      console.error("Error parsing JSON:", e);
      console.warn("Returning error message as JSON -- Please Try Again");
      return { error: e, original: response } as any;
    }

  } else if (responseMode === "YAML object") {
    response = response.replace("```yaml", "").replace("```", "").trim();
    const res = parseYaml(response);
    return res;
  } else {
    return parseText(response, responseKey);
  }
}

export async function getCodeSummaryFromLLM(
  codeToSummarize: string,
  model: string = textModel
): Promise<codeSummary> {
  const question = `Summarize the code block below. Mention the goal of the code and any relevant features / functions: \n\n\`\`\`json\n${codeToSummarize}\n\`\`\``;
  const codeSummary = await infer(
    question,
    "JSON object",
    undefined,
    false,
    undefined,
    undefined,
    model
  );
  return codeSummary;
}

export async function callLLM(
  promptTemplate: string,
  projectContext: ProjectSummary,
  code: string,
  filePath: string,
  bRAG = false,
  model: string = textModel
): Promise<CodeObject> {
  if (bRAG === true) {
    // Take 400 characters of relevant code
    const relevantCode = await searchRAG(projectContext.projectName, code); // Placeholder, implement searchRAG function
    const r =
      relevantCode.documentData.length > 400
        ? relevantCode.documentData.substring(0, 400)
        : relevantCode.documentData;
    promptTemplate = promptTemplate.replace("<relevant code>", r); // Not implemented yet, placeholder for RAG
  } else {
    promptTemplate = promptTemplate.replace("<relevant code>", "");
  }

  // 1. Prepare Prompt
  const prompt = promptTemplate
    .replace("<supplemental context>", projectContext.teamContext) // Add team context
    .replace("<code snippet>", code)
    .replace("<file path>", filePath);

  const getFileNameFromPath = (path: string) => path.split("/").pop() || "";
  const fileName = getFileNameFromPath(filePath);

  // 2. Call OpenAI
  const response = await infer(
    prompt,
    "JSON object",
    undefined,
    true,
    true,
    {
      fileLocation: filePath,
      fileName: fileName,
    },
    model
  ).catch((error) => {
    console.error("Error calling API:", error);
    return { error: error };
  });

  // IF too many request or rate limit has been hit, we wait 30 seconds and try again
  if (response.error && response.error.code === 429) {
    console.log("Rate Limit Hit, waiting 30 seconds...");
    await wait(30000);
    return await callLLM(
      promptTemplate,
      projectContext,
      code,
      filePath,
      bRAG,
      model
    );
  }

  // 3. Parse and Validate Response
  let codeObjects: CodeObject = response;

  // 4. Enhance with filePath
  if (!codeObjects.fileName) codeObjects.fileName = fileName;

  if (!codeObjects.fileLocation) codeObjects.fileLocation = filePath;

  return codeObjects;
}
