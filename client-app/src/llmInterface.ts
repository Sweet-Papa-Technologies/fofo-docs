import { CodeObject, ProjectSummary } from "./objectSchemas"; // Adjust path as needed
import { searchRAG } from "./vectorDB";
import yaml from "js-yaml";
import { jsonrepair } from 'jsonrepair';

import "dotenv/config";

import {
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from "@google-cloud/vertexai";

const project = "sweet-papa-technologies";
const location = "us-central1";
const textModel = "gemini-1.5-flash-preview-0514";
const visionModel = "gemini-1.5-pro";

const vertexAI = new VertexAI({ project: project, location: location });

function validateJSON(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
}

function fixJSON(jsonString: string): string {
  try {
    return jsonrepair(jsonString);
  } catch (e) {
    throw new Error('Unable to fix JSON');
  }
}


// Instantiate Gemini models
const generativeModel = vertexAI.getGenerativeModel({
  model: textModel,
  // The following parameters are optional
  // They can also be passed to individual content generation requests
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  generationConfig: {
    // maxOutputTokens: 256
  },
});

const generativeVisionModel = vertexAI.getGenerativeModel({
  model: visionModel,
});

const generativeModelPreview = vertexAI.getGenerativeModel({
  model: textModel,
});

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
  const obj =  {} as any;
  obj[resKey] = text;
  return obj;
}

async function wait (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function callGemini(
  prompt: string,
  responseMode: "JSON object" | "YAML object" | "TEXT STRING" = "JSON object",
  responseKey?: string
): Promise<any> {
  const promptResponseInstructions = `Please respond with a ${responseMode} containing your answer. ${responseMode !== 
    "TEXT STRING" ? `Please properly format and escape your output, as I will need to parse your response.` : ""}${
    responseKey ? `The key for the response should be ${responseKey}.` : ""
  }\n\n`;

  if (responseMode !== "TEXT STRING" && responseKey) {
    console.warn(
      "responseKey is only applicable for TEXT STRING responseMode. Ignoring responseKey."
    );
  }

  prompt = prompt.trim();
  prompt = promptResponseInstructions + prompt;

  const promptLen = prompt.length
  console.log("Prompt Length:", promptLen);


  const request = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  };

  // Wait 20 seconds before calling Gemini

  const startTime = Date.now();
  const result = await generativeModel.generateContent(request);
  const endTime = Date.now();
  const totalTime = endTime - startTime;

  // PRint the total time in seconds, truncated to 2 decimal places
  console.log(`Total Time: ${totalTime / 1000}s`);
  console.log("Waiting 15 seconds...becuase DEY DONT TRUST US YET.");

  await wait(15000);

  let response = result.response.candidates?.[0].content?.parts[0].text || "";

  if (typeof response !== "string") {
    throw new Error("Invalid response from Gemini");
  }

  if (responseMode === "JSON object") {
    response = response.replace("```json", "").replace("```", "").trim();

    
    if (validateJSON(response)) {
      console.log('Valid JSON:');
    } else {
      try {
        const fixedJson = fixJSON(response);
        console.log('Fixed JSON:', fixedJson);
      } catch (error:any) {
        console.error('Error fixing JSON:', error.message);
        console.warn('Returning error message as JSON -- Please Try Again');
        return { error: error, original: response } as any;
      }
    }

    try {
      const res = JSON.parse(response);
      return res;
    } catch (e:any) {
      console.error('Error parsing JSON:', e);
      console.warn('Returning error message as JSON -- Please Try Again');
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
  codeToSummarize: string
): Promise<string> {
  const question = `Summarize the code block below. Mention the goal of the code and any relevant features / functions: \n\n\`\`\`json\n${codeToSummarize}\n\`\`\``;
  const codeSummary = await callGemini(question, "JSON object");
  return codeSummary;
}

export async function callLLM(
  promptTemplate: string,
  projectContext: ProjectSummary,
  code: string,
  filePath: string,
  bRAG = false
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

  // 2. Call OpenAI
  const response = await callGemini(prompt, "JSON object");

  // 3. Parse and Validate Response
  let codeObjects: CodeObject = response;

  // 4. Enhance with filePath
  const getFileNameFromPath = (path: string) => path.split("/").pop() || "";

  if (!codeObjects.fileName)
    codeObjects.fileName = getFileNameFromPath(filePath);

  if (!codeObjects.fileLocation) codeObjects.fileLocation = filePath;

  return codeObjects;
}
