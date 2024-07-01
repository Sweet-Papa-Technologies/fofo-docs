# src/llmInterface.ts - fofo-docs

**Summary:** The code defines a function `getCodeSummaryFromLLM` that takes a code block as input and returns a JSON object summarizing the code. The summary includes the goal of the code and any relevant features or functions.

- **File Location:** ./src/llmInterface.ts
- **Language:** language: TypeScript 

## Table of Contents
- [classes](#classes)
- [functions](#functions)
- [variables](#variables)
- [types](#types)
- [imports](#imports)
- [exports](#exports)
- [interfaces](#interfaces)
## classes


### 📘 Ollama - CLASS
------------------------------------------------------------
**Description:** The Ollama class is used to interact with the Ollama LLM API.

**Code Snippet:**
```
import { Ollama } from "ollama";
```
- **Line:** 15
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `Ollama` class is a constructor function that creates an instance of the `Ollama` class, which is used to interact with the Ollama LLM API.
- **Parameters:** None. The `Ollama` class is instantiated with no parameters.
- **Returns:** An instance of the `Ollama` class.
- **Usage Example:** 


```typescript
const ollama = new Ollama({ host: 'http://infinity.local:11434' });
```

- **Dependencies:** The `Ollama` class depends on the `ollama` library.

### 📘 OpenAI - CLASS
------------------------------------------------------------
**Description:** The OpenAI class is used to interact with the OpenAI API.

**Code Snippet:**
```
import OpenAI from "openai";
```
- **Line:** 16
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `OpenAI` class is used to interact with the OpenAI API. It provides methods for making requests to the OpenAI API, such as generating text, translating languages, writing different kinds of creative content, and answering your questions in an informative way.
- **Usage Example:** 


```typescript
const openai = new OpenAI({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

// Make a request to the OpenAI API
const response = await openai.chat.completions.create({
  ...secretSauce,
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: promptNew },
  ],
  model: model,
});
```

- **Dependencies:** The `OpenAI` class depends on the `openai` library, which is a Node.js library for interacting with the OpenAI API.

### 📘 VertexAI - CLASS
------------------------------------------------------------
**Description:** The VertexAI class is used to interact with the Google Vertex AI API.

**Code Snippet:**
```
import { VertexAI } from "@google-cloud/vertexai";
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `VertexAI` class is a constructor function from the `@google-cloud/vertexai` library. It is used to create a client object that can be used to interact with the Google Vertex AI API.
- **Parameters:** The constructor function takes two optional parameters: `project` and `location`. The `project` parameter specifies the Google Cloud project ID to use. The `location` parameter specifies the region to use for Vertex AI operations. If these parameters are not provided, the default values from the environment variables `GCP_PROJECT_ID` and `GCP_REGION` will be used.
- **Returns:** The constructor function returns a new `VertexAI` client object that can be used to interact with the Google Vertex AI API.
- **Usage Example:** 


```typescript
const vertexAI = new VertexAI({ project: 'my-project-id', location: 'us-central1' });
```

- **Dependencies:** The `VertexAI` class depends on the `@google-cloud/vertexai` library.
## functions


### 🔧 getModelBackend - FUNCTION
------------------------------------------------------------
**Description:** This function retrieves the backend for a given model from the MODEL_MODES array.

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
- **Line:** 47
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **selectedModel** (string): The name of the model to retrieve the backend for. 
 Example: "gemini-1.5-flash-preview-0514"
###### Function Returns:
- **Type:** llm_modes
- **Description:** The backend for the given model.
- **Example:** "VERTEX"
###### Annotations / Comments:
- **Purpose:** The `getModelBackend` function is responsible for retrieving the backend type associated with a given LLM model from the `MODEL_MODES` array. This function is crucial for determining which LLM service (Ollama, OpenAI, or Vertex AI) should be used to execute the model.
- **Parameters:** - `selectedModel`: This parameter represents the name of the LLM model for which the backend needs to be identified. It is expected to be a string value.
- **Returns:** - `llm_modes`: The function returns a string representing the backend type associated with the provided model. The possible return values are 'OLLAMA', 'VERTEX', or 'OPENAI'.
- **Usage Example:** 


```typescript
const backend = getModelBackend('gemini-1.5-flash-preview-0514');
console.log(backend); // Output: 'VERTEX'
```

- **Edge Cases:** - If the provided `selectedModel` is not found within the `MODEL_MODES` array, the function throws an error indicating that the model was not found.
- **Dependencies:** - `MODEL_MODES`: This array contains the definitions of all supported LLM models, including their names, model identifiers, backend platforms, and optional context sizes.

### 🔧 validateJSON - FUNCTION
------------------------------------------------------------
**Description:** This function validates if a given string is a valid JSON string.

**Code Snippet:**
```
function validateJSON(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
```
- **Line:** 125
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **jsonString** (string): The string to validate. 
 Example: "{"key": "value"}"
###### Function Returns:
- **Type:** boolean
- **Description:** True if the string is a valid JSON string, false otherwise.
- **Example:** true
###### Annotations / Comments:
- **Purpose:** The `validateJSON` function checks if a given string is a valid JSON string. It attempts to parse the string using `JSON.parse`. If the parsing is successful, it returns `true`, indicating a valid JSON string. If an error occurs during parsing, it logs the error and returns `false`, indicating an invalid JSON string.
- **Parameters:** The function takes one parameter: `jsonString`, which is a string representing the JSON string to be validated.
- **Returns:** The function returns a boolean value. It returns `true` if the input string is a valid JSON string and `false` otherwise.
- **Usage Example:** 


```typescript
const jsonString = '{\"key\": \"value\"}';
const isValid = validateJSON(jsonString);
console.log(isValid); // Output: true
```

- **Edge Cases:** The function handles cases where the input string is not a valid JSON string by catching the `JSON.parse` error and returning `false`. It also logs the error to the console for debugging purposes.
- **Dependencies:** The function relies on the built-in `JSON.parse` function to validate the JSON string.

### 🔧 fixJSON - FUNCTION
------------------------------------------------------------
**Description:** This function attempts to fix a malformed JSON string.

**Code Snippet:**
```
function fixJSON(jsonString: string): string {
  try {
    return jsonrepair(jsonString);
  } catch (e) {
    throw new Error("Unable to fix JSON");
  }
}
```
- **Line:** 135
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **jsonString** (string): The malformed JSON string to fix. 
 Example: "{"key": "value", "key2": "value2"
###### Function Returns:
- **Type:** string
- **Description:** The fixed JSON string.
- **Example:** "{"key": "value", "key2": "value2"}"
###### Annotations / Comments:
- **Purpose:** The `fixJSON` function attempts to repair a malformed JSON string using the `jsonrepair` library.
- **Parameters:** The function takes a single parameter, `jsonString`, which is a string representing the malformed JSON.
- **Returns:** The function returns a string representing the fixed JSON string, if successful. If the JSON cannot be fixed, it throws an error.
- **Usage Example:** 


```typescript
const malformedJSON = "{\"key\": \"value\", \"key2\": \"value2\"";
const fixedJSON = fixJSON(malformedJSON);
console.log(fixedJSON); // Output: {\"key\": \"value\", \"key2\": \"value2\"}
```

- **Edge Cases:** If the JSON string is too malformed to be repaired, the function will throw an error.
- **Dependencies:** The function depends on the `jsonrepair` library.

### 🔧 parseYaml - FUNCTION
------------------------------------------------------------
**Description:** This function parses a YAML string into a JSON object.

**Code Snippet:**
```
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
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **yamlString** (string): The YAML string to parse. 
 Example: name: John
age: 30
###### Function Returns:
- **Type:** any
- **Description:** The parsed JSON object.
- **Example:** {name: "John", age: 30}
###### Annotations / Comments:
- **Purpose:** The `parseYaml` function takes a YAML string as input and attempts to convert it into a JSON object using the `js-yaml` library.
- **Parameters:** - `yamlString`: A string containing the YAML data to be parsed.
- **Returns:** - `any`: Returns the parsed JSON object if successful. If the input is invalid YAML, it throws an error.
- **Usage Example:** 


```typescript
const yamlData = 'name: John\nage: 30';
const jsonData = parseYaml(yamlData);
console.log(jsonData); // Output: { name: 'John', age: 30 }
```

- **Edge Cases:** - If the input string is not valid YAML, the function throws an error.
- **Dependencies:** - `js-yaml` library for parsing YAML.

### 🔧 parseText - FUNCTION
------------------------------------------------------------
**Description:** This function converts a text string into a JSON object with a specified key.

**Code Snippet:**
```
export function parseText(text: string, resKey = "response"): any {
  // Convert text into a proper JSON object
  const obj = {} as any;
  obj[resKey] = text;
  return obj;
}
```
- **Line:** 154
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **text** (string): The text string to convert. 
 Example: This is a text string.
- **resKey** (string): The key to use for the JSON object. 
 Example: "response"
###### Function Returns:
- **Type:** any
- **Description:** The JSON object with the specified key and the text string as the value.
- **Example:** {response: "This is a text string."}
###### Annotations / Comments:
- **Purpose:** The `parseText` function takes a text string as input and converts it into a JSON object. It allows you to specify a key for the JSON object, which will hold the provided text string as its value.
- **Parameters:** - `text`: A string representing the text to be converted into a JSON object.
- `resKey`: An optional string representing the key to be used for the JSON object. Defaults to "response" if not provided.
- **Returns:** The function returns a JSON object with the specified key (`resKey`) and the provided text string (`text`) as its value.
- **Usage Example:** 


```typescript
const text = "This is a text string.";
const jsonObject = parseText(text, "myText");
console.log(jsonObject); // Output: {myText: "This is a text string."}
```


### 🔧 wait - FUNCTION
------------------------------------------------------------
**Description:** This function creates a promise that resolves after a specified delay.

**Code Snippet:**
```
async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```
- **Line:** 161
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **ms** (number): The delay in milliseconds. 
 Example: 1000
###### Function Returns:
- **Type:** Promise<void>
- **Description:** A promise that resolves after the specified delay.
- **Example:** undefined
###### Annotations / Comments:
- **Purpose:** The `wait` function creates a promise that resolves after a specified delay in milliseconds.
- **Parameters:** The `ms` parameter represents the delay in milliseconds.
- **Returns:** The function returns a promise that resolves after the specified delay. The promise resolves with `undefined`.
- **Usage Example:** 


```typescript
// Wait for 1 second (1000 milliseconds)
const promise = wait(1000);

// The promise will resolve after 1 second
promise.then(() => {
  console.log('The promise has resolved!');
});
```

- **Edge Cases:** The `ms` parameter should be a positive integer. If a negative or non-integer value is provided, the behavior is undefined.
- **Dependencies:** The function relies on the built-in `setTimeout` function.

### 🔧 infer - FUNCTION
------------------------------------------------------------
**Description:** This function sends a prompt to a specified LLM backend and returns the response.

**Code Snippet:**

export async function infer(
  prompt: string,
  responseMode: "JSON object" | "YAML object" | "TEXT STRING" = "JSON object",
  responseKey?: string,
  bPro = false,
  bRetry = true,
  supplementalData?: any,
  model: string = textModel
): Promise<any> {
  const modelBackend: llm_modes = getModelBackend(model);

  console.log("====> Model Backend:", modelBackend);

  if (isNaN(RATE_LIMIT) == false) {
    if (RATE_LIMIT > 0) {
      console.log(`Rate Limit Set: ${RATE_LIMIT}`);
      await wait(RATE_LIMIT);
    }
  }

  const promptResponseInstructions = `Please respond with a ${responseMode} containing your answer. ${responseMode !== "TEXT STRING" ? `Please properly format and escape your output, as I will need to parse your response.` : ""} ${responseKey ? `The key for the response should be ${responseKey}.` : ""}

`;

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
      keep_alive: 30000,
      options: {
        ...secretSauce,
        num_ctx: contextLength,
      },
    });
    console.log(ollamaResponse.response.length);
    response = ollamaResponse.response;
  } else if (modelBackend === "VERTEX") {
    //
    const request = {
      contents: [{ role: "user", parts: [{ text: promptNew }] }]
    };

    let genFunction = generativeModel;
    if (bPro === true) {
      if (model.includes("gemini-1.5-pro") == true) {
        genFunction = generateModelAdv;
      } else {
        console.warn(
          "Specified model was FLASH, using provided model: ",
          model
        );
      }
    }

    const result = await genFunction.generateContent(request).catch((err:any)=>{
      console.error(err)
      return "Invalid Response from the LLM"
    })

    try {

      if (typeof result !== 'string'){
        response = result.response.candidates?.[0].content?.parts[0].text || "";
      } else {
        throw "Invalid Response from the LLM"
      }

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
        console.log("Retrying since there was an error -- retying in 10 seconds");
        await wait(10000);
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
      ...secretSauce,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: promptNew },
      ],
      model: model,
    });

    console.debug(completion.choices[0]);
    response = completion.choices[0].message.content || "";

    if (response === "") {
      console.error("Empty response from OpenAI");
      console.error(completion);
    }
  } else {
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
    response = response.replace("json", "").replace("
```", "").trim();

    let bFixed = false;
    if (validateJSON(response) === true) {
      console.log("Valid JSON:");
    } else {
      console.error("Invalid JSON, attempting to fix:");
      try {
        const fixedJson = fixJSON(response);
        console.debug("Fixed JSON:", fixedJson);
        response = fixedJson;
        bFixed = true;
      } catch (error: any) {
        console.error("Error fixing JSON:", error.message);

        if (bRetry == true || retries < 3) {
          retries += 1;
          console.log(
            "Retrying since JSON output was not correct, here is what we got:"
          );

          console.log(`

BAD JSON
${response}

`);

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
        console.debug(
          "JSON was fixed! Checking that everything else is OK now."
        );

        // Check if Object malformed into an Array some how...
        if (Array.isArray(res) === true && res.length >= 1) {
          console.log("This looks like a fixed JSON object!");
          // if ("classes" in res[0] === false) {
          //   console.warn("This object does not look correct!");
          //   console.warn(res);
          // }

          const newData = res[0];

          // We should check that the fixed JSON object has the same amount of keys as our interface for the object:
          const keys = Object.keys(newData);

          const expectedKeys: CodeObjects[] = [
            "classes",
            "functions",
            "variables",
            "types",
            "interfaces",
            // "comments",
            "imports",
            "exports",
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
      }

      return res;
    } catch (e: any) {
      console.error("Error parsing JSON:", e);
      console.warn("Returning error message as JSON -- Please Try Again");
      return { error: e, original: response } as any;
    }
  } else if (responseMode === "YAML object") {
    response = response.replace("
```yaml", "").replace("
```", "").trim();
    const res = parseYaml(response);
    return res;
  } else {
    return parseText(response, responseKey);
  }
}

- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **prompt** (string): The prompt to send to the LLM. 
 Example: What is the capital of France?
- **responseMode** ("JSON object" | "YAML object" | "TEXT STRING"): The desired format of the response. 
 Example: "JSON object"
- **responseKey** (string): The key to use for the response in the JSON object. 
 Example: "response"
- **bPro** (boolean): Whether to use the advanced model. 
 Example: true
- **bRetry** (boolean): Whether to retry the request if an error occurs. 
 Example: true
- **supplementalData** (any): Additional data to pass to the LLM. 
 Example: {fileName: "llmInterface.ts", fileLocation: "./src/llmInterface.ts"}
- **model** (string): The name of the LLM model to use. 
 Example: textModel
###### Function Returns:
- **Type:** Promise<any>
- **Description:** A promise that resolves with the LLM response.
- **Example:** {response: "Paris"}
###### Annotations / Comments:
- **Purpose:** The `infer` function acts as a central interface for interacting with different Large Language Models (LLMs) like Ollama, Vertex AI, and OpenAI. It takes a prompt, desired response format, and optional parameters, then sends the prompt to the selected LLM backend and returns the response.
- **Parameters:** - `prompt`: A string representing the prompt to be sent to the LLM.
- `responseMode`: Specifies the desired format of the response. Options include "JSON object", "YAML object", and "TEXT STRING".
- `responseKey`: (Optional) The key to use for the response in the JSON object. Ignored if `responseMode` is not "TEXT STRING".
- `bPro`: (Optional) A boolean indicating whether to use the advanced model (if available). Defaults to `false`.
- `bRetry`: (Optional) A boolean indicating whether to retry the request if an error occurs. Defaults to `true`.
- `supplementalData`: (Optional) Additional data to pass to the LLM.
- `model`: (Optional) The name of the LLM model to use. Defaults to `textModel`.
- **Returns:** A promise that resolves with the LLM response. The response format depends on the `responseMode` parameter. For example, if `responseMode` is "JSON object", the response will be a JSON object.
- **Usage Example:** 


```typescript
const response = await infer("What is the capital of France?", "TEXT STRING", "response");
console.log(response.response); // Output: Paris
```

- **Edge Cases:** - The function handles rate limiting by waiting for a specified duration before retrying the request.
- It attempts to fix invalid JSON responses by using the `jsonrepair` library. If the fix fails, it retries the request or returns an error message.
- It handles empty responses from OpenAI by logging an error message.
- **Dependencies:** - `ollama` library for interacting with Ollama.
- `openai` library for interacting with OpenAI.
- `@google-cloud/vertexai` library for interacting with Vertex AI.
- `jsonrepair` library for fixing invalid JSON responses.
- `js-yaml` library for parsing YAML responses.

### 🔧 getCodeSummaryFromLLM - FUNCTION
------------------------------------------------------------
**Description:** This function sends a code block to the LLM to generate a summary.

**Code Snippet:**

export async function getCodeSummaryFromLLM(
  codeToSummarize: string,
  model: string = textModel
): Promise<codeSummary> {
  const question = `Summarize the code block below. Mention the goal of the code and any relevant features / functions: 
  Please respond with a JSON object as follows:
  {
    "goal": "String summarizing what the code is about, and the goal",
    "features_functions": "String describing any relevant features",
  }

  ### Code To Sumnarize:
  ${codeToSummarize}
  `;
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

- **Line:** 456
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **codeToSummarize** (string): The code block to summarize. 
 Example: const myVar = "Hello World";
- **model** (string): The name of the LLM model to use. 
 Example: textModel
###### Function Returns:
- **Type:** Promise<codeSummary>
- **Description:** A promise that resolves with the code summary.
- **Example:** {goal: "This code defines a variable called myVar and assigns it the value "Hello World".", features_functions: "The code uses a string literal to define the value of the variable."}
###### Annotations / Comments:
- **Purpose:** The `getCodeSummaryFromLLM` function takes a code block as input and uses the `infer` function to send it to a large language model (LLM) for summarization. The LLM is instructed to provide a JSON object containing the goal of the code and any relevant features or functions.
- **Parameters:** - `codeToSummarize`: A string representing the code block to be summarized.
- `model`: An optional string specifying the name of the LLM model to use. Defaults to `textModel`.
- **Returns:** A promise that resolves with a `codeSummary` object. The `codeSummary` object contains two properties: `goal` and `features_functions`. The `goal` property describes the overall purpose of the code, while the `features_functions` property highlights any relevant features or functions within the code.
- **Usage Example:** 


```typescript
const codeBlock = `
  // This is a simple function that adds two numbers.
  function add(a: number, b: number): number {
    return a + b;
  }
`;

const codeSummary = await getCodeSummaryFromLLM(codeBlock);

console.log(codeSummary); // Output: { goal: "This code defines a function called add that takes two numbers as input and returns their sum.", features_functions: "The function uses the + operator to add the two numbers together." }
```

- **Edge Cases:** If the LLM fails to generate a valid JSON response, the function will throw an error.
- **Dependencies:** - `infer`: A function that sends a prompt to an LLM and returns the response.

### 🔧 callLLM - FUNCTION
------------------------------------------------------------
**Description:** This function sends a prompt to the LLM with context and code, and returns the parsed response.

**Code Snippet:**
```
export async function callLLM(
  promptTemplate: string,
  projectContext: ProjectSummary,
  code: string,
  filePath: string,
  bRAG = false,
  model: string = textModel
): Promise<any> {
  if (bRAG === true) {
    // Take subset of characters of relevant code
    const maxChars = 3000;
    const relevantCode = await searchRAG(projectContext.projectName, code, undefined, AIusageData);
    if (relevantCode.documentData) {
      const r =
        relevantCode.documentData.length > maxChars
          ? relevantCode.documentData.substring(0, maxChars)
          : relevantCode.documentData;
      promptTemplate = promptTemplate.replace("<relevant code>", r);
    } else {
      console.log("No relevant code found in RAG")
      promptTemplate = promptTemplate.replace("<relevant code>", "");
    }
  } else {
    promptTemplate = promptTemplate.replace("<relevant code>", "");
  }

  // 1. Prepare Prompt
  const prompt = promptTemplate
    .replace("<supplemental context>", projectContext.teamContext)
    .replace("<code snippet>", code)
    .replace("<file path>", filePath);

  const getFileNameFromPath = (path: string) => path.split("/").pop() || "";
  const fileName = getFileNameFromPath(filePath);

  // 1.5 Update our STATS
  const tokens = getTokens(prompt);
  AIusageData.totalTokens += tokens;
  AIusageData.totalCharacters += prompt.length;
  AIusageData.totalAPIcalls += 1;
  AIusageData.totalCost += getCostOfAPICall(prompt.length);

  console.log("Total Tokens:", AIusageData.totalTokens);
  console.log("Total Characters:", AIusageData.totalCharacters);
  console.log("Total API Calls:", AIusageData.totalAPIcalls);

  console.log(colorize("Total Cost:", "magenta"), AIusageData.totalCost);

  console.info("Cost for Current Call:", "$" + getCostOfAPICall(prompt.length) + " USD");


  // 2. Call AI API
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

  AIusageData.totalTokens += getTokens(JSON.stringify(response));
  AIusageData.totalCharactersOut += JSON.stringify(response).length;
  AIusageData.totalCost += getCostOfAPICallTextOut(AIusageData.totalCharactersOut);

  // 3. Parse and Validate Response
  let codeObjects: any = response;

  // 4. Enhance with filePath
  if (!codeObjects.fileName) codeObjects.fileName = fileName;

    // Update the filePath to be the relative path to the project directory:
    const projectDir = projectContext.projectLocation
    const relativePath = filePath.replace(projectDir, "")


  if (!codeObjects.fileLocation) codeObjects.fileLocation = relativePath;

  return codeObjects;
}
```
- **Line:** 482
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **promptTemplate** (string): The template for the prompt to send to the LLM. 
 Example: This is a template for the prompt: <supplemental context> <code snippet>
- **projectContext** (ProjectSummary): The context of the project. 
 Example: {projectName: "MyProject", projectDescription: {goal: "This project is about...", features_functions: "This project has the following features..."}, projectLocation: "./src", projectTechStackDescription: "This project uses...", codeFiles: [], ragData: [], teamContext: "This project is for..." }
- **code** (string): The code snippet to send to the LLM. 
 Example: const myVar = "Hello World";
- **filePath** (string): The path to the file containing the code snippet. 
 Example: ./src/llmInterface.ts
- **bRAG** (boolean): Whether to use RAG (Relevant Code Retrieval) to provide additional context. 
 Example: true
- **model** (string): The name of the LLM model to use. 
 Example: textModel
###### Function Returns:
- **Type:** Promise<any>
- **Description:** A promise that resolves with the parsed response from the LLM.
- **Example:** {classes: [], functions: [], variables: [], types: [], interfaces: [], imports: [], exports: [], fileName: "llmInterface.ts", fileLocation: "./src/llmInterface.ts"}
###### Annotations / Comments:
- **Purpose:** The `callLLM` function is responsible for sending a prompt to the LLM (Large Language Model) with context and code, and then parsing and returning the response.
- **Parameters:** - `promptTemplate`: A string representing the template for the prompt to be sent to the LLM. It includes placeholders for context, code snippets, and file paths.
- `projectContext`: An object of type `ProjectSummary` containing information about the project, such as its name, description, location, technology stack, and team context.
- `code`: A string representing the code snippet to be sent to the LLM.
- `filePath`: A string representing the path to the file containing the code snippet.
- `bRAG`: A boolean indicating whether to use RAG (Relevant Code Retrieval) to provide additional context to the LLM. If `true`, the function will search for relevant code snippets from the vector database and include them in the prompt.
- `model`: A string representing the name of the LLM model to use. Defaults to `textModel`.
- **Returns:** A promise that resolves with the parsed response from the LLM. The response is an object containing the identified code objects (classes, functions, variables, etc.) and their descriptions.
- **Usage Example:** 


```typescript
const codeObjects = await callLLM(
  `This is a prompt template: <supplemental context> <code snippet> <file path>`,
  {projectName: "MyProject", projectDescription: {goal: "This project is about...", features_functions: "This project has the following features..."}, projectLocation: "./src", projectTechStackDescription: "This project uses...", codeFiles: [], ragData: [], teamContext: "This project is for..." },
  `const myVar = "Hello World";`,
  "src/llmInterface.ts",
  true,
  "textModel"
);
```

- **Edge Cases:** - If the LLM returns an error, the function will catch the error and return an object containing the error information.
- If the LLM returns an empty response, the function will log an error message and return an empty object.
- If the LLM returns a response that is not a valid JSON object, the function will attempt to fix the JSON and return the fixed object. If the JSON cannot be fixed, the function will log an error message and return the original response.
- **Dependencies:** - `searchRAG`: A function that searches the vector database for relevant code snippets.
- `infer`: A function that sends a prompt to the LLM and returns the response.
- `getTokens`: A function that counts the number of tokens in a string.
- `getCostOfAPICall`: A function that calculates the cost of an API call based on the number of characters in the prompt.
- `wait`: A function that pauses execution for a specified amount of time.
## variables


### 🧮 retries - VARIABLE
------------------------------------------------------------
**Description:** A variable that keeps track of the number of retries for LLM calls.

**Code Snippet:**
```
let retries = 0;
```
- **Line:** 28
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `retries` variable is a counter that keeps track of the number of times an LLM call has been retried. It is used to limit the number of retries in case of errors.

### 🧮 endpoints - VARIABLE
------------------------------------------------------------
**Description:** An object that stores the endpoints for different LLM services.

**Code Snippet:**
```
const endpoints = {
  OLLAMA: process.env.OLLAMA_SERVER_URL || "http://infinity.local:11434",
};
```
- **Line:** 41
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `endpoints` variable is a constant object that stores the URLs for different LLM services. This allows the application to easily switch between different LLM backends without hardcoding the URLs directly into the code.
- **Usage Example:** 


```typescript
const ollamaEndpoint = endpoints.OLLAMA;
```

- **Edge Cases:** If the environment variable `OLLAMA_SERVER_URL` is not set, the default value `http://infinity.local:11434` will be used.
- **Dependencies:** The code depends on the `process.env` object to access environment variables.

### 🧮 systemPrompt - VARIABLE
------------------------------------------------------------
**Description:** A string that defines the system prompt for LLM interactions.

**Code Snippet:**
```
const systemPrompt =
  "You are a developer A.I. that summarizes and analyzes code. Please answer all questions asked of you exactly as presented.";
```
- **Line:** 44
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines the system prompt used for interactions with the Large Language Model (LLM). It instructs the LLM to act as a developer AI that summarizes and analyzes code, ensuring it responds to questions precisely as presented.
- **Usage Example:** 


```typescript
const response = await ollama.generate({
  model: model,
  prompt: promptNew,
  stream: false,
  system: systemPrompt,
  keep_alive: 9000,
  options: {
    ...secretSauce,
    num_ctx: contextLength,
  },
});
```


### 🧮 RATE_LIMIT - VARIABLE
------------------------------------------------------------
**Description:** A number that represents the rate limit for LLM calls.

**Code Snippet:**
```
const RATE_LIMIT = Number(process.env.RATE_LIMIT || "0") || 0;
```
- **Line:** 56
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `RATE_LIMIT` variable defines a rate limit for calls to the Large Language Model (LLM). It is set to the value of the environment variable `RATE_LIMIT` if it exists, otherwise it defaults to 0.
- **Usage Example:** 


```typescript
// Example usage:
const rateLimit = RATE_LIMIT;
// If RATE_LIMIT is set to 1000 in the environment, rateLimit will be 1000.
// If RATE_LIMIT is not set, rateLimit will be 0.
```

- **Dependencies:** The `RATE_LIMIT` variable depends on the environment variable `RATE_LIMIT`.

### 🧮 secretSauce - VARIABLE
------------------------------------------------------------
**Description:** An object that stores settings for LLM generation, such as temperature and top_p.

**Code Snippet:**
```
const secretSauce = {
  temperature: 0.3, // 0.2 works well for big LLM
  top_p: 0.2, // 0.9 works well for big LLM
};
```
- **Line:** 60
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `secretSauce` variable is an object that stores settings for LLM generation, such as temperature and top_p.
- **Usage Example:** 


```typescript
const completion = await openai.chat.completions.create({
  ...secretSauce,
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: promptNew },
  ],
  model: model,
});
```


### 🧮 openai - VARIABLE
------------------------------------------------------------
**Description:** An instance of the OpenAI client, used for interacting with the OpenAI API.

**Code Snippet:**
```
const openai = new OpenAI({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});
```
- **Line:** 65
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable initializes an instance of the OpenAI client, which is used for interacting with the OpenAI API.
- **Parameters:** The OpenAI client is initialized with the following parameters:

- `organization`: The OpenAI organization ID.
- `apiKey`: The OpenAI API key.
- **Returns:** An instance of the OpenAI client.
- **Usage Example:** 


```typescript
const response = await openai.chat.completions.create({
  ...secretSauce,
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: promptNew },
  ],
  model: model,
});
```

- **Edge Cases:** If the OpenAI API key or organization ID is invalid, the client will not be able to connect to the OpenAI API.
- **Dependencies:** The OpenAI client depends on the `openai` library, which is installed as a dependency in the project.

### 🧮 ollama - VARIABLE
------------------------------------------------------------
**Description:** An instance of the Ollama client, used for interacting with the Ollama API.

**Code Snippet:**
```
const ollama = new Ollama({ host: endpoints.OLLAMA });
```
- **Line:** 70
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This code object initializes an instance of the Ollama client, which is used for interacting with the Ollama API. It sets the host property to the value of the `endpoints.OLLAMA` variable, which is likely a URL pointing to the Ollama server.
- **Dependencies:** Ollama library

### 🧮 contextLength - VARIABLE
------------------------------------------------------------
**Description:** A number that represents the maximum context length for LLM interactions.

**Code Snippet:**
```
const contextLength = Number(process.env.MODEL_CONTEXT || 4096); // 8000 Works Really Well with 24GB GPU - RTX 4090
```
- **Line:** 71
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines the maximum context length for LLM interactions, which is set to 8000 tokens. This value is a trade-off between memory usage and the amount of context the LLM can process.
- **Dependencies:** process.env.MODEL_CONTEXT

### 🧮 project - VARIABLE
------------------------------------------------------------
**Description:** A string that represents the GCP project ID.

**Code Snippet:**
```
const project = process.env.GCP_PROJECT_ID || "Not Set";
```
- **Line:** 75
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the GCP project ID, which is retrieved from the environment variable `GCP_PROJECT_ID`. If the environment variable is not set, it defaults to the string "Not Set".
- **Usage Example:** 


```typescript
// Access the project ID
console.log(project);
```

- **Dependencies:** process.env

### 🧮 location - VARIABLE
------------------------------------------------------------
**Description:** A string that represents the GCP region.

**Code Snippet:**
```
const location = process.env.GCP_REGION || "us-central1";
```
- **Line:** 76
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the GCP region, which is used to specify the location for Vertex AI services. It uses the environment variable `GCP_REGION` if it is set, otherwise it defaults to `us-central1`.
- **Dependencies:** The variable depends on the environment variable `GCP_REGION`.

### 🧮 textModel - VARIABLE
------------------------------------------------------------
**Description:** A string that represents the name of the Gemini text model.

**Code Snippet:**
```
const textModel = "gemini-1.5-flash-preview-0514";
```
- **Line:** 77
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the name of the Gemini text model, which is used for generating text and code.
- **Usage Example:** 


```typescript
const response = await infer(prompt, "JSON object", undefined, false, true, undefined, textModel);
```

- **Dependencies:** Vertex AI

### 🧮 textModelAdvanced - VARIABLE
------------------------------------------------------------
**Description:** A string that represents the name of the Gemini text model (advanced version).

**Code Snippet:**
```
const textModelAdvanced = "gemini-1.5-pro-preview-0514	";
```
- **Line:** 78
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the name of the Gemini text model (advanced version) for use in the Vertex AI service.
- **Usage Example:** 


```typescript
const generativeModelAdv = vertexAI.getGenerativeModel({
  model: textModelAdvanced,
  safetySettings: safetySettings,
  generationConfig: {
    temperature: secretSauce.temperature,
    topP: secretSauce.top_p,
  },
});
```

- **Dependencies:** Vertex AI service, `@google-cloud/vertexai` library

### 🧮 vertexAI - VARIABLE
------------------------------------------------------------
**Description:** An instance of the VertexAI client, used for interacting with the VertexAI API.

**Code Snippet:**
```
const vertexAI = new VertexAI({ project: project, location: location });
```
- **Line:** 80
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This code snippet initializes a VertexAI client object, which is used for interacting with the VertexAI API.
- **Parameters:** The constructor of the VertexAI client takes two parameters:

- `project`: The Google Cloud Project ID where the VertexAI service is deployed.
- `location`: The region where the VertexAI service is deployed.
- **Returns:** The `vertexAI` variable is assigned an instance of the VertexAI client, which can be used to interact with the VertexAI API.
- **Usage Example:** 


```typescript
// Create a VertexAI client
const vertexAI = new VertexAI({ project: 'your-project-id', location: 'us-central1' });

// Use the client to interact with the VertexAI API
// ...
```

- **Edge Cases:** If the `project` or `location` parameters are not provided, the client will use the default values from the environment variables.
- **Dependencies:** This code snippet depends on the `@google-cloud/vertexai` library, which provides the VertexAI client.

### 🧮 safetySettings - VARIABLE
------------------------------------------------------------
**Description:** An array of objects that define safety settings for LLM interactions.

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
- **Line:** 83
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines an array of objects that configure safety settings for the LLM interactions.
- **Usage Example:** 


```typescript
const generativeModel = vertexAI.getGenerativeModel({
  model: textModel,
  safetySettings: safetySettings,
  generationConfig: {
    temperature: secretSauce.temperature,
    topP: secretSauce.top_p,
  },
});
```

- **Dependencies:** The `safetySettings` variable depends on the `HarmCategory` and `HarmBlockThreshold` enums from the `@google-cloud/vertexai` library.

### 🧮 generativeModel - VARIABLE
------------------------------------------------------------
**Description:** An instance of the VertexAI GenerativeModel, representing the Gemini text model.

**Code Snippet:**
```
const generativeModel = vertexAI.getGenerativeModel({
  model: textModel,
  safetySettings: safetySettings,
  generationConfig: {
    temperature: secretSauce.temperature,
    topP: secretSauce.top_p,
  },
});
```
- **Line:** 106
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This code snippet initializes a `generativeModel` variable, which represents an instance of the VertexAI `GenerativeModel` class. This model is specifically configured to use the Gemini text model for generating text content.
- **Parameters:** The `getGenerativeModel` function takes the following parameters:
- `model`: The name of the Gemini text model to use. In this case, it's set to `textModel`, which is defined as `gemini-1.5-flash-preview-0514`.
- `safetySettings`: An array of safety settings to apply to the model's output. This ensures that the generated text adheres to certain safety guidelines.
- `generationConfig`: An object containing configuration options for text generation, such as `temperature` and `topP`, which control the randomness and creativity of the generated text.
- **Returns:** The `getGenerativeModel` function returns an instance of the `GenerativeModel` class, which represents the configured Gemini text model.
- **Usage Example:** 


```typescript
const generatedText = await generativeModel.generateContent({ contents: [{ role: 'user', parts: [{ text: 'Write a short story about a cat.' }] }] });
console.log(generatedText.response.candidates[0].content.parts[0].text);
```

- **Edge Cases:** The `GenerativeModel` might encounter errors if the specified model is not available or if the safety settings are too restrictive. Additionally, the generation process might fail if the input prompt is too long or complex.
- **Dependencies:** This code snippet depends on the `@google-cloud/vertexai` library, which provides access to VertexAI services, including the `GenerativeModel` class.

### 🧮 generateModelAdv - VARIABLE
------------------------------------------------------------
**Description:** An instance of the VertexAI GenerativeModel, representing the Gemini text model (advanced version).

**Code Snippet:**
```
const generateModelAdv = vertexAI.getGenerativeModel({
  model: textModelAdvanced,
  safetySettings: safetySettings,
  generationConfig: {
    temperature: secretSauce.temperature,
    topP: secretSauce.top_p,
  },
});
```
- **Line:** 115
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `generateModelAdv` variable initializes an instance of the VertexAI GenerativeModel, specifically using the Gemini text model (advanced version). This model is configured with safety settings to mitigate potential risks and generation parameters like temperature and top_p to control the creativity and randomness of the generated text.
- **Dependencies:** - `vertexAI`: An instance of the VertexAI client, responsible for interacting with the Vertex AI service.
- `textModelAdvanced`: A string representing the name of the Gemini text model (advanced version) to be used.
- `safetySettings`: An array of safety settings to be applied to the model, ensuring responsible and ethical text generation.
- `secretSauce`: An object containing generation parameters like temperature and top_p, which influence the creativity and randomness of the generated text.

### 🧮 startTime - VARIABLE
------------------------------------------------------------
**Description:** A number that stores the start time of an LLM call.

**Code Snippet:**
```
const startTime = Date.now();
```
- **Line:** 220
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `startTime` variable is used to store the current time in milliseconds using the `Date.now()` function. This is typically done at the beginning of a process or operation to track the duration of the process.
- **Usage Example:** 


```typescript
const startTime = Date.now();
// Perform some operation
const endTime = Date.now();
const duration = endTime - startTime;
console.log(`Operation took ${duration} milliseconds`);
```


### 🧮 endTime - VARIABLE
------------------------------------------------------------
**Description:** A number that stores the end time of an LLM call.

**Code Snippet:**
```
const endTime = Date.now();
```
- **Line:** 326
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `endTime` variable stores the current timestamp using the `Date.now()` function, which returns the number of milliseconds that have elapsed since the Unix epoch (January 1, 1970, 00:00:00 UTC).

### 🧮 totalTime - VARIABLE
------------------------------------------------------------
**Description:** A number that represents the total time taken for an LLM call.

**Code Snippet:**
```
const totalTime = endTime - startTime;
```
- **Line:** 327
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `totalTime` variable stores the difference between the `endTime` and `startTime` variables, representing the total time taken for an LLM call.

### 🧮 promptNew - VARIABLE
------------------------------------------------------------
**Description:** A string that stores the modified prompt for an LLM call.

**Code Snippet:**
```
let promptNew = prompt;
```
- **Line:** 207
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the modified prompt for an LLM call. It is used to ensure that the prompt is formatted correctly for the specific LLM backend being used.
- **Usage Example:** 


```typescript
// Example usage:
const prompt = "This is a prompt.";
let promptNew = prompt;
```


### 🧮 promptCharLen - VARIABLE
------------------------------------------------------------
**Description:** A number that represents the character length of the prompt for an LLM call.

**Code Snippet:**
```
const promptCharLen = prompt.length;
```
- **Line:** 201
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `promptCharLen` variable stores the character length of the `prompt` string, which is used as input for a large language model (LLM). This variable is used for logging purposes to track the size of the prompt being sent to the LLM.

### 🧮 promptLen - VARIABLE
------------------------------------------------------------
**Description:** A number that represents the token count of the prompt for an LLM call.

**Code Snippet:**
```
const promptLen = getTokens(prompt);
```
- **Line:** 202
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `promptLen` variable stores the token count of the prompt used for an LLM (Large Language Model) call. This is likely used for various purposes, such as determining the cost of the API call, checking if the prompt exceeds a certain token limit, or for other LLM-related calculations.
- **Usage Example:** 


```typescript
const prompt = "This is a prompt for the LLM.";
const promptLen = getTokens(prompt); // Calculate the token count of the prompt
```

- **Dependencies:** The `promptLen` variable depends on the `getTokens` function, which is likely a utility function for calculating the token count of a given string.

### 🧮 promptResponseInstructions - VARIABLE
------------------------------------------------------------
**Description:** A string that defines instructions for the LLM on how to format its response.

**Code Snippet:**

const promptResponseInstructions = `Please respond with a ${responseMode} containing your answer. ${responseMode !== "TEXT STRING" ? `Please properly format and escape your output, as I will need to parse your response.` : ""} ${responseKey ? `The key for the response should be ${responseKey}.` : ""}

`;

- **Line:** 190
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines a string that contains instructions for the LLM on how to format its response. It specifies the desired response mode (JSON object, YAML object, or TEXT STRING), whether the response should be properly formatted and escaped, and the key for the response if applicable.
- **Usage Example:** 


```typescript
const promptResponseInstructions = `Please respond with a JSON object containing your answer. Please properly format and escape your output, as I will need to parse your response. The key for the response should be response. 

`;
```


### 🧮 modelBackend - VARIABLE
------------------------------------------------------------
**Description:** A string that represents the backend used for the LLM call.

**Code Snippet:**
```
const modelBackend: llm_modes = getModelBackend(model);
```
- **Line:** 173
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `modelBackend` variable stores the backend used for the LLM call, which can be either "OLLAMA", "VERTEX", or "OPENAI".
- **Usage Example:** 


```typescript
const modelBackend: llm_modes = getModelBackend(model);
```

- **Edge Cases:** If the model is not found in the `MODEL_MODES` array, an error is thrown.
- **Dependencies:** The `modelBackend` variable depends on the `getModelBackend` function, which retrieves the backend from the `MODEL_MODES` array.

### 🧮 supplementalData - VARIABLE
------------------------------------------------------------
**Description:** An object that contains supplemental data to be passed to the LLM call.

**Code Snippet:**
```
supplementalData?: any,
```
- **Line:** 170
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `supplementalData` variable is an optional parameter that allows for passing additional data to the LLM call. This data can be used to provide context or additional information to the LLM, which can help it generate more accurate and relevant responses.
- **Parameters:** The `supplementalData` parameter is of type `any`, which means it can accept any type of data. This allows for flexibility in passing different types of information to the LLM.
- **Returns:** The `supplementalData` variable does not return any value. It is simply a parameter that is passed to the LLM call.
- **Usage Example:** 


```typescript
const response = await infer(prompt, "JSON object", undefined, false, true, { fileName: "myFile.ts", fileLocation: "./src/myFile.ts" });
```

- **Edge Cases:** There are no specific edge cases for the `supplementalData` variable. However, it is important to ensure that the data passed to the LLM is properly formatted and escaped to avoid errors.
- **Dependencies:** The `supplementalData` variable does not have any dependencies.

### 🧮 bRetry - VARIABLE
------------------------------------------------------------
**Description:** A boolean that indicates whether to retry the LLM call if an error occurs.

**Code Snippet:**
```
bRetry = true,
```
- **Line:** 169
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `bRetry` variable is a boolean flag that controls whether the LLM call should be retried if an error occurs during the inference process.

### 🧮 bPro - VARIABLE
------------------------------------------------------------
**Description:** A boolean that indicates whether to use the advanced version of the Gemini model.

**Code Snippet:**
```
bPro = false,
```
- **Line:** 168
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `bPro` variable is a boolean flag that determines whether to use the advanced version of the Gemini model for text generation. It is set to `false` by default, indicating that the standard Gemini model will be used.

### 🧮 responseKey - VARIABLE
------------------------------------------------------------
**Description:** A string that represents the key for the response in the LLM output.

**Code Snippet:**
```
responseKey?: string,
```
- **Line:** 167
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `responseKey` variable is an optional string that specifies the key to use for the response in the LLM output. It is used when the `responseMode` is set to "TEXT STRING" to ensure the response is returned with the correct key.
- **Usage Example:** 


```typescript
// Example usage:
const response = await infer(prompt, "TEXT STRING", "myResponse");
// The response object will have the following structure:
{
  "myResponse": "The LLM response"
}
```

- **Edge Cases:** If the `responseMode` is not "TEXT STRING", the `responseKey` is ignored.

### 🧮 responseMode - VARIABLE
------------------------------------------------------------
**Description:** A string that represents the desired format for the LLM response.

**Code Snippet:**
```
responseMode: "JSON object" | "YAML object" | "TEXT STRING" = "JSON object",
```
- **Line:** 166
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `responseMode` variable defines the desired format for the response from the Large Language Model (LLM). It can be one of three values: "JSON object", "YAML object", or "TEXT STRING".
- **Usage Example:** 


```typescript
// Example usage:
const response = await infer(prompt, "JSON object");
```

- **Edge Cases:** If an invalid `responseMode` is provided, the function will likely throw an error or return an unexpected result.

### 🧮 prompt - VARIABLE
------------------------------------------------------------
**Description:** A string that represents the prompt for the LLM call.

**Code Snippet:**
```
prompt: string,
```
- **Line:** 165
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the prompt that will be used to call the LLM (Large Language Model).
- **Usage Example:** 


```typescript
const prompt = "This is a prompt for the LLM.";
```


### 🧮 ms - VARIABLE
------------------------------------------------------------
**Description:** A number that represents the duration in milliseconds for a delay.

**Code Snippet:**
```
ms: number
```
- **Line:** 160
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable represents the duration in milliseconds for a delay.
- **Usage Example:** 


```typescript
setTimeout(() => {
  // Code to be executed after the delay
}, ms);
```


### 🧮 yamlString - VARIABLE
------------------------------------------------------------
**Description:** A string that represents a YAML string.

**Code Snippet:**
```
yamlString: string
```
- **Line:** 142
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable represents a string that holds a YAML string.
- **Usage Example:** 


```typescript
const yamlString: string = '---
key: value
...';
```


### 🧮 jsonString - VARIABLE
------------------------------------------------------------
**Description:** A string that represents a JSON string.

**Code Snippet:**
```
jsonString: string
```
- **Line:** 124
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable represents a string that holds a JSON string.
- **Usage Example:** 


```typescript
const jsonString: string = '{"name": "John Doe", "age": 30}';
```


### 🧮 text - VARIABLE
------------------------------------------------------------
**Description:** A string that represents a text string.

**Code Snippet:**
```
text: string
```
- **Line:** 153
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable represents a string that holds text data.
- **Usage Example:** 


```typescript
const myText = "Hello, world!";
console.log(myText); // Output: Hello, world!
```


### 🧮 resKey - VARIABLE
------------------------------------------------------------
**Description:** A string that represents the key for the response in the LLM output.

**Code Snippet:**
```
resKey = "response"
```
- **Line:** 153
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `resKey` variable is used to specify the key for the response in the LLM output. It is used in the `parseText` function to create a JSON object with the response text.
- **Usage Example:** 


```typescript
const responseText = "This is the response text.";
const responseObject = parseText(responseText, "myResponseKey");
console.log(responseObject); // { myResponseKey: "This is the response text." }
```


### 🧮 fixedJson - VARIABLE
------------------------------------------------------------
**Description:** A string that stores the fixed JSON string.

**Code Snippet:**
```
const fixedJson = fixJSON(response);
```
- **Line:** 345
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `fixedJson` variable is declared and assigned the result of calling the `fixJSON` function with the `response` string as an argument. This function attempts to repair the `response` string if it is not a valid JSON object.
- **Usage Example:** 


```typescript
const fixedJson = fixJSON(response);
```

- **Dependencies:** The `fixJSON` function is a dependency of this code object.

### 🧮 error - VARIABLE
------------------------------------------------------------
**Description:** A variable that captures any error that occurs during JSON fixing.

**Code Snippet:**
```
catch (error: any) {
```
- **Line:** 273
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable captures any error that occurs during JSON fixing.

### 🧮 newData - VARIABLE
------------------------------------------------------------
**Description:** An object that stores the data from the fixed JSON object.

**Code Snippet:**
```
const newData = res[0];
```
- **Line:** 392
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `newData` variable is declared to store the first element of the `res` array, which is assumed to be a JSON object. This is done after the JSON response from the LLM is parsed and potentially fixed.
- **Edge Cases:** If the `res` array is empty or does not contain a valid JSON object at index 0, the `newData` variable will be undefined.

### 🧮 keys - VARIABLE
------------------------------------------------------------
**Description:** An array of strings that represents the keys of the fixed JSON object.

**Code Snippet:**
```
const keys = Object.keys(newData);
```
- **Line:** 395
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This code snippet defines a variable named `keys` that stores an array of strings representing the keys of the `newData` object.
- **Usage Example:** 


```typescript
const keys = Object.keys(newData);
```

- **Dependencies:** Object.keys

### 🧮 expectedKeys - VARIABLE
------------------------------------------------------------
**Description:** An array of strings that represents the expected keys for the CodeObjects interface.

**Code Snippet:**
```
const expectedKeys: CodeObjects[] = [
            "classes",
            "functions",
            "variables",
            "types",
            "interfaces",
            // "comments",
            "imports",
            "exports",
          ];
```
- **Line:** 398
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This code object defines an array of strings called `expectedKeys` which represents the expected keys for the `CodeObjects` interface. This array is used to ensure that the JSON object returned by the LLM contains all the necessary keys for the `CodeObjects` interface.
- **Usage Example:** 


```typescript
const codeObjects: CodeObjects = {
  classes: [],
  functions: [],
  variables: [],
  types: [],
  interfaces: [],
  imports: [],
  exports: [],
};

// Check if all expected keys are present in the codeObjects object
const missingKeys = expectedKeys.filter(key => !(key in codeObjects));

if (missingKeys.length > 0) {
  console.warn(`Missing keys in codeObjects: ${missingKeys.join(', ')}`);
}
```


### 🧮 fixedData - VARIABLE
------------------------------------------------------------
**Description:** An object that stores the fixed JSON data.

**Code Snippet:**
```
const fixedData = {} as any;
```
- **Line:** 413
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable is used to store the fixed JSON data. It is declared as an empty object of type `any` to allow for dynamic properties.
- **Usage Example:** 


```typescript
const fixedData = {} as any;
// Add properties to fixedData as needed
```


### 🧮 key - VARIABLE
------------------------------------------------------------
**Description:** A string that represents a key in the fixed JSON object.

**Code Snippet:**
```
for (const key of expectedKeys) {
```
- **Line:** 414
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This code object is a variable named 'key' that iterates through the 'expectedKeys' array, which contains a list of expected keys for a JSON object.
- **Usage Example:** 


```typescript
for (const key of expectedKeys) {
  // Code to process each key
}
```


### 🧮 ollamaResponse - VARIABLE
------------------------------------------------------------
**Description:** An object that stores the response from the Ollama API.

**Code Snippet:**
```
const ollamaResponse = await ollama.generate({
```
- **Line:** 229
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `ollamaResponse` variable stores the response received from the Ollama API after calling the `generate` function.
- **Usage Example:** 


```typescript
const ollamaResponse = await ollama.generate({
  model: 'yi:34b',
  prompt: 'What is the capital of France?',
  stream: false,
  system: 'You are a helpful assistant.',
  keep_alive: 9000,
  options: {
    temperature: 0.3,
    top_p: 0.2,
    num_ctx: 32000,
  },
});
console.log(ollamaResponse.response);
```

- **Dependencies:** The `ollamaResponse` variable depends on the `ollama` object, which is an instance of the `Ollama` class from the `ollama` library.

### 🧮 result - VARIABLE
------------------------------------------------------------
**Description:** An object that stores the response from the VertexAI API.

**Code Snippet:**
```
const result = await genFunction.generateContent(request).catch((err:any)=>{
```
- **Line:** 260
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `result` variable is declared to store the response from the `generateContent` method of the `genFunction` object, which is a VertexAI generative model. The `catch` block handles any errors that might occur during the API call.
- **Dependencies:** VertexAI, @google-cloud/vertexai

### 🧮 err - VARIABLE
------------------------------------------------------------
**Description:** A variable that captures any error that occurs during the VertexAI API call.

**Code Snippet:**
```
catch((err:any)=>{
```
- **Line:** 260
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `err` variable is used to capture any errors that occur during the `generateContent` call to the VertexAI API.
- **Usage Example:** 


```typescript
// Example usage of the `err` variable
const result = await genFunction.generateContent(request).catch((err:any)=>{ 
  console.error(err)
  return "Invalid Response from the LLM"
})

// Check if an error occurred
if (result.error) {
  console.error("Error generating content:", result.error);
}
```

- **Dependencies:** VertexAI API

### 🧮 genFunction - VARIABLE
------------------------------------------------------------
**Description:** A variable that stores the function to use for generating content from the VertexAI API.

**Code Snippet:**
```
let genFunction = generativeModel;
```
- **Line:** 248
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the function to use for generating content from the VertexAI API. It is assigned the value of `generativeModel`, which is a VertexAI generative model object.
- **Usage Example:** 


```typescript
const response = await genFunction.generateContent(request);
```

- **Dependencies:** VertexAI, @google-cloud/vertexai

### 🧮 completion - VARIABLE
------------------------------------------------------------
**Description:** An object that stores the response from the OpenAI API.

**Code Snippet:**
```
const completion = await openai.chat.completions.create({
```
- **Line:** 306
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `completion` variable stores the response from the OpenAI API's `chat.completions.create` function.
- **Parameters:** The `chat.completions.create` function takes an object as an argument, which includes parameters like `messages`, `model`, `temperature`, `top_p`, etc. These parameters control the behavior of the LLM and the generated response.
- **Returns:** The `chat.completions.create` function returns an object containing the generated response from the LLM, including the generated text, the chosen model, and other metadata.
- **Usage Example:** 


```typescript
const completion = await openai.chat.completions.create({
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: promptNew },
  ],
  model: model,
});
```

- **Edge Cases:** The OpenAI API can return errors if the request is invalid or if the API key is incorrect. The code handles these errors by using a `try...catch` block.
- **Dependencies:** This code depends on the `openai` library, which provides an interface to the OpenAI API.

### 🧮 codeSummary - VARIABLE
------------------------------------------------------------
**Description:** An object that stores the code summary generated by the LLM.

**Code Snippet:**
```
const codeSummary = await infer(
```
- **Line:** 469
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `codeSummary` variable is declared and assigned the result of calling the `infer` function, which is used to interact with a large language model (LLM). The `infer` function takes a prompt, response mode, response key, boolean values for professional mode and retrying, optional supplemental data, and the model to use as arguments.
- **Parameters:** The `infer` function takes the following parameters:

- `prompt`: A string containing the prompt to be sent to the LLM.
- `responseMode`: A string indicating the expected response format from the LLM. It can be "JSON object", "YAML object", or "TEXT STRING".
- `responseKey`: An optional string specifying the key for the response in the JSON object. This is only applicable for the "TEXT STRING" response mode.
- `bPro`: A boolean value indicating whether to use the professional mode of the LLM. This is only applicable for certain models.
- `bRetry`: A boolean value indicating whether to retry the request if an error occurs.
- `supplementalData`: An optional object containing additional data to be passed to the LLM.
- `model`: A string specifying the name of the LLM model to use.
- **Returns:** The `infer` function returns a promise that resolves to an object containing the response from the LLM. The format of the response object depends on the `responseMode` parameter.
- **Usage Example:** 


```typescript
const codeSummary = await infer(
  "Summarize the code block below. Mention the goal of the code and any relevant features / functions: 
  Please respond with a JSON object as follows:
  {
    "goal": "String summarizing what the code is about, and the goal",
    "features_functions": "String describing any relevant features",
  }

  ### Code To Sumnarize:
  ${codeToSummarize}",
  "JSON object",
  undefined,
  false,
  undefined,
  model
);
```

- **Edge Cases:** The `infer` function may encounter errors such as rate limiting, invalid JSON responses, or network issues. The `bRetry` parameter can be used to handle these errors by retrying the request.
- **Dependencies:** The `infer` function depends on the following external libraries:

- `ollama`
- `openai`
- `@google-cloud/vertexai`
- `jsonrepair`
- `js-yaml`

### 🧮 question - VARIABLE
------------------------------------------------------------
**Description:** A string that represents the question to ask the LLM for code summarization.

**Code Snippet:**

const question = `Summarize the code block below. Mention the goal of the code and any relevant features / functions: 
  Please respond with a JSON object as follows:
  {
    "goal": "String summarizing what the code is about, and the goal",
    "features_functions": "String describing any relevant features",
  }

  ### Code To Sumnarize:
  ${codeToSummarize}
  `;

- **Line:** 460
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the prompt for the LLM to summarize a code block. It includes instructions for the LLM to respond with a JSON object containing the goal and relevant features/functions of the code.
- **Usage Example:** 


```typescript
const question = `Summarize the code block below. Mention the goal of the code and any relevant features / functions: 
  Please respond with a JSON object as follows:
  {
    "goal": "String summarizing what the code is about, and the goal",
    "features_functions": "String describing any relevant features",
  }

  ### Code To Sumnarize:
  ${codeToSummarize}
  `;
```


### 🧮 codeToSummarize - VARIABLE
------------------------------------------------------------
**Description:** A string that represents the code to be summarized by the LLM.

**Code Snippet:**
```
codeToSummarize: string,
```
- **Line:** 456
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `codeToSummarize` variable represents the code snippet that will be passed to the LLM for summarization.
- **Usage Example:** 


```typescript
const codeSnippet = "// This is a code snippet to be summarized.";
const codeToSummarize = codeSnippet;
```


### 🧮 codeObjects - VARIABLE
------------------------------------------------------------
**Description:** An object that stores the code objects extracted from the LLM response.

**Code Snippet:**
```
let codeObjects: any = response;
```
- **Line:** 568
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This code object is a variable that stores the code objects extracted from the LLM response. It is used to store the results of the LLM call and then process them further.
- **Usage Example:** 


```typescript
// Example usage:
const codeObjects = await callLLM(promptTemplate, projectContext, code, filePath, bRAG, model);
// Process the code objects
```

## types


### 🏷️ llmRuntimeData - TYPE
------------------------------------------------------------
**Description:** Interface for storing runtime data related to LLM usage.

**Code Snippet:**
```
export const AIusageData:llmRuntimeData = {
  totalTokens: 0,
  totalCharacters: 0,
  totalCharactersOut: 0,
  totalCharactersEmbed: 0,
  totalCost: 0,
  totalAPIcalls: 0
}
```
- **Line:** 31
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type defines the structure for storing runtime data related to LLM usage, including token counts, character counts, costs, and API call counts.

### 🏷️ llm_modes - TYPE
------------------------------------------------------------
**Description:** Type alias for LLM backend modes.

**Code Snippet:**
```
type llm_modes = "OLLAMA" | "VERTEX" | "OPENAI";
```
- **Line:** 54
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines the possible backend modes for the LLM (Large Language Model) used in the application.
- **Usage Example:** 


```typescript
const modelBackend: llm_modes = getModelBackend(model);
```


### 🏷️ HarmBlockThreshold - TYPE
------------------------------------------------------------
**Description:** Type alias for harm block threshold.

**Code Snippet:**
```
import {
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from "@google-cloud/vertexai";
```
- **Line:** 21
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines the harm block threshold for content moderation in Vertex AI.
- **Dependencies:** This type alias is imported from the `@google-cloud/vertexai` package.

### 🏷️ llmBackendMode - TYPE
------------------------------------------------------------
**Description:** Type alias for LLM backend mode.

**Code Snippet:**
```
export type llmBackendMode = 'OLLAMA' | 'OPENAI' | 'VERTEX';
```
- **Line:** Could Not Verify Line
- **Location:** models.ts (./src/models.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines the possible backend modes for Large Language Models (LLMs) used in the application.
- **Usage Example:** 


```typescript
// Example usage:
const backendMode: llmBackendMode = 'OLLAMA';
```


### 🏷️ llmModel - TYPE
------------------------------------------------------------
**Description:** Interface for defining LLM models.

**Code Snippet:**
```
export type llmModel = {
    name: string;
    model: string;
    backend: llmBackendMode;
    context?: number
}
```
- **Line:** Could Not Verify Line
- **Location:** models.ts (./src/models.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Defines the structure for an LLM model, specifying its name, model identifier, backend platform (Ollama, OpenAI, Vertex), and optional context size.
- **Usage Example:** 


```typescript
// Example of an LLM model definition
const myModel: llmModel = {
  name: "phi3",
  model: "phi3",
  backend: "OLLAMA"
};
```


### 🏷️ Color - TYPE
------------------------------------------------------------
**Description:** Type alias for color.

**Code Snippet:**
```
type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
```
- **Line:** Could Not Verify Line
- **Location:** shared.ts (./src/shared.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines a set of possible color values for use in the `colorize` function.
- **Usage Example:** 


```typescript
const color: Color = 'red';
```


### 🏷️ CodeObjectType - TYPE
------------------------------------------------------------
**Description:** Type alias for code object type.

**Code Snippet:**
```
export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor';
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines the possible types for code objects, which are used to represent different elements within a codebase, such as classes, functions, variables, types, imports, exports, interfaces, and constructors.
- **Usage Example:** 


```typescript
// Example usage of CodeObjectType
const codeObject: CodeObject = {
  type: 'function', // Code object type is 'function'
  // ... other properties
};
```


### 🏷️ models - TYPE
------------------------------------------------------------
**Description:** Interface for representing models.

**Code Snippet:**
```
export interface models {
    name: string,
    model: any,
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for representing models, which likely includes information about the model's name and its underlying implementation.

### 🏷️ modelServiceConfig - TYPE
------------------------------------------------------------
**Description:** Interface for representing model service configuration.

**Code Snippet:**
```
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `modelServiceConfig` interface defines the configuration for a model service. It specifies the models available in the service and an optional endpoint for accessing the service.
- **Usage Example:** 


```typescript
const config: modelServiceConfig = {
  models: [
    {
      name: 'gpt-3.5-turbo',
      model: 'gpt-3.5-turbo',
      backend: 'OPENAI',
    },
  ],
  endpoint: 'https://api.openai.com/v1',
};
```


### 🏷️ ExecutionFlow - TYPE
------------------------------------------------------------
**Description:** Interface for representing execution flow.

**Code Snippet:**
```
export interface ExecutionFlow {
    step: number;
    stepDescription: string;
    bImportant: boolean;
    codeSnippet: string;
    codeLine: number;
    codeIndent: number;
    fileName: string;
    fileLocation: string;
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for representing a step in the execution flow of a codebase. It includes information about the step number, description, importance, code snippet, line number, indentation level, and file location.
- **Usage Example:** 


```typescript
const executionFlow: ExecutionFlow[] = [
    {
        step: 1,
        stepDescription: "Initialize the application",
        bImportant: true,
        codeSnippet: "const app = express();",
        codeLine: 10,
        codeIndent: 2,
        fileName: "index.ts",
        fileLocation: "./src/index.ts"
    },
    {
        step: 2,
        stepDescription: "Define routes",
        bImportant: true,
        codeSnippet: "app.get('/api/users', (req, res) => { ... });",
        codeLine: 15,
        codeIndent: 2,
        fileName: "routes.ts",
        fileLocation: "./src/routes.ts"
    }
];
```


### 🏷️ FunctionParameter - TYPE
------------------------------------------------------------
**Description:** Interface for representing function parameters.

**Code Snippet:**
```
export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `FunctionParameter` interface defines the structure for representing function parameters. It includes properties for the parameter's name, type, description, and an example value.
- **Usage Example:** 


```typescript
const param: FunctionParameter = {
  name: 'myParam',
  type: 'string',
  description: 'This is a parameter',
  example: 'hello world'
};
```


### 🏷️ FunctionReturn - TYPE
------------------------------------------------------------
**Description:** Interface for representing function return values.

**Code Snippet:**
```
export interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for representing function return values, including the type, description, and an example.
- **Usage Example:** 


```typescript
// Example usage:
const functionReturn: FunctionReturn = {
  type: 'string',
  description: 'This function returns a string',
  example: 'Hello, world!'
};
```


### 🏷️ CodeObjectTypes - TYPE
------------------------------------------------------------
**Description:** Type alias for code object types.

**Code Snippet:**
```
export type CodeObjectTypes = 'name' | 'type' | 'description' | 'codeSnippet' | 'codeLine' | 'codeIndent' | 'fileName' | 'fileLocation' | 'subObjects' | 'parentObject' | 'functionParameters' | 'functionReturns' | 'isExported' | 'isFunction' | 'isClass' | 'isPrivate' | 'isAsync'
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines the possible keys for a CodeObject, which represents a code element like a class, function, variable, or type.
- **Usage Example:** 


```typescript
const codeObject: CodeObject = {
  name: 'myFunction',
  type: 'function',
  description: 'This function does something',
  codeSnippet: 'function myFunction() { ... }',
  codeLine: 10,
  codeIndent: 2,
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  isExported: true,
  isFunction: true,
  isClass: false,
  isPrivate: false,
  isAsync: false
};

// Accessing a property using CodeObjectTypes
console.log(codeObject.name); // 'myFunction'
console.log(codeObject[CodeObjectTypes.description]); // 'This function does something'
```

## imports


### 📥 CodeObjects - IMPORT
------------------------------------------------------------
**Description:** Imports the CodeObjects interface from the objectSchemas module.

**Code Snippet:**
```
import {  CodeObjects,  ProjectSummary,  codeSummary,  llmRuntimeData, } from "./objectSchemas"; // Adjust path as needed
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code snippet imports the `CodeObjects` interface from the `objectSchemas` module. This interface is likely used to define the structure of code objects that are extracted from the codebase.
- **Dependencies:** objectSchemas module

### 📥 logger - IMPORT
------------------------------------------------------------
**Description:** Imports the logger module.

**Code Snippet:**
```
import "./logger";
```
- **Line:** 7
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `logger` module, which is likely responsible for logging events and messages within the application.
- **Dependencies:** The `logger` module is a dependency of this code.

### 📥 MODEL_MODES_BASE - IMPORT
------------------------------------------------------------
**Description:** Imports the MODEL_MODES_BASE constant from the models module.

**Code Snippet:**
```
import { MODEL_MODES_BASE, MODELS } from "./models";
```
- **Line:** 9
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `MODEL_MODES_BASE` constant from the `models` module. This constant likely defines a list of recommended language models for the application.
- **Dependencies:** models module

### 📥 searchRAG - IMPORT
------------------------------------------------------------
**Description:** Imports the searchRAG function from the vectorDB module.

**Code Snippet:**
```
import { searchRAG } from "./vectorDB";
```
- **Line:** 12
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `searchRAG` function from the `vectorDB` module, which is likely used for searching a vector database.
- **Dependencies:** vectorDB module

### 📥 yaml - IMPORT
------------------------------------------------------------
**Description:** Imports the yaml module from js-yaml.

**Code Snippet:**
```
import yaml from "js-yaml";
```
- **Line:** 13
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This line imports the `yaml` module from the `js-yaml` library, which is used for parsing YAML data.
- **Usage Example:** 


```typescript
const yamlData = yaml.load(yamlString);
```

- **Dependencies:** js-yaml

### 📥 jsonrepair - IMPORT
------------------------------------------------------------
**Description:** Imports the jsonrepair function from jsonrepair.

**Code Snippet:**
```
import { jsonrepair } from "jsonrepair";
```
- **Line:** 14
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This import statement brings in the `jsonrepair` function from the `jsonrepair` library.
- **Dependencies:** jsonrepair library

### 📥 Ollama - IMPORT
------------------------------------------------------------
**Description:** Imports the Ollama class from ollama.

**Code Snippet:**
```
import { Ollama } from "ollama";
```
- **Line:** 15
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This line of code imports the `Ollama` class from the `ollama` library, which is likely used for interacting with an Ollama language model.
- **Dependencies:** ollama library

### 📥 OpenAI - IMPORT
------------------------------------------------------------
**Description:** Imports the OpenAI class from openai.

**Code Snippet:**
```
import OpenAI from "openai";
```
- **Line:** 16
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `OpenAI` class from the `openai` library.
- **Dependencies:** openai library

### 📥 dotenv/config - IMPORT
------------------------------------------------------------
**Description:** Imports the config function from dotenv.

**Code Snippet:**
```
import "dotenv/config";
```
- **Line:** 18
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This line imports the \"config\" function from the \"dotenv\" package, which is used to load environment variables from a \"\.env\" file.
- **Dependencies:** dotenv

### 📥 HarmBlockThreshold - IMPORT
------------------------------------------------------------
**Description:** Imports the HarmBlockThreshold enum from @google-cloud/vertexai.

**Code Snippet:**
```
import {  HarmBlockThreshold,  HarmCategory,  VertexAI, } from "@google-cloud/vertexai";
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This import statement brings in the `HarmBlockThreshold` enum from the `@google-cloud/vertexai` library.
- **Dependencies:** @google-cloud/vertexai

### 📥 getTokens - IMPORT
------------------------------------------------------------
**Description:** Imports the getTokens function from the shared module.

**Code Snippet:**
```
import { getTokens } from "./shared";
```
- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `getTokens` function from the `shared` module.
- **Usage Example:** 


```typescript
const tokenCount = getTokens("This is a string with 5 tokens.");
```

- **Dependencies:** The `shared` module.
## exports


### 📤 AIusageData - EXPORT
------------------------------------------------------------
**Description:** Object that tracks the usage of the LLM, including the total number of tokens, characters, API calls, and cost.

**Code Snippet:**
```
export const AIusageData:llmRuntimeData = {
  totalTokens: 0,
  totalCharacters: 0,
  totalCharactersOut: 0,
  totalCharactersEmbed: 0,
  totalCost: 0,
  totalAPIcalls: 0
}
```
- **Line:** 31
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object defines an exported constant named `AIusageData` which is an object that tracks the usage of the LLM. It stores information about the total number of tokens, characters, API calls, and cost.
- **Returns:** An object of type `llmRuntimeData` which contains the following properties:

- `totalTokens`: The total number of tokens used by the LLM.
- `totalCharacters`: The total number of characters used by the LLM.
- `totalCharactersOut`: The total number of characters output by the LLM.
- `totalCharactersEmbed`: The total number of characters used for embedding.
- `totalCost`: The total cost of using the LLM.
- `totalAPIcalls`: The total number of API calls made to the LLM.
- **Usage Example:** 


```typescript
// Access the total number of tokens used
console.log(AIusageData.totalTokens);

// Increment the total number of API calls
AIusageData.totalAPIcalls++;
```


### 📤 parseYaml - EXPORT
------------------------------------------------------------
**Description:** Function that parses a YAML string and returns a JSON object.

**Code Snippet:**
```
export function parseYaml(yamlString: string): any {
  // Convert YAML file into a proper JSON object
  try {
    const obj = yaml.load(yamlString) as any;
    return obj as any;
  } catch (e: any) {
    console.error(e);
    throw new Error("Invalid YAML object");
  }
}
```
- **Line:** 143
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `parseYaml` function takes a YAML string as input and attempts to convert it into a JSON object using the `js-yaml` library.
- **Parameters:** yamlString: string - The YAML string to be parsed.
- **Returns:** any - Returns a JSON object representing the parsed YAML string. If the parsing fails, it throws an error.
- **Usage Example:** 


```typescript
const yamlString = `
name: John Doe
age: 30
`;
const jsonObject = parseYaml(yamlString);
console.log(jsonObject); // Output: { name: 'John Doe', age: 30 }
```

- **Edge Cases:** If the input YAML string is invalid, the function throws an error.
- **Dependencies:** js-yaml library

### 📤 parseText - EXPORT
------------------------------------------------------------
**Description:** Function that converts a text string into a JSON object with a specified key.

**Code Snippet:**
```
export function parseText(text: string, resKey = "response"): any {
  // Convert text into a proper JSON object
  const obj = {} as any;
  obj[resKey] = text;
  return obj;
}
```
- **Line:** 154
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `parseText` function takes a text string as input and converts it into a JSON object. It allows for specifying a custom key for the response object.
- **Parameters:** - `text`: A string representing the text to be converted into a JSON object.
- `resKey`: An optional string representing the key to be used for the response object. Defaults to "response".
- **Returns:** A JSON object with the specified key containing the input text string.
- **Usage Example:** 


```typescript
const text = "This is a text string.";
const jsonObject = parseText(text, "myText");
console.log(jsonObject); // Output: { myText: "This is a text string." }
```


### 📤 infer - EXPORT
------------------------------------------------------------
**Description:** Asynchronous function that sends a prompt to an LLM and returns the response in the specified format.

**Code Snippet:**

export async function infer(
  prompt: string,
  responseMode: "JSON object" | "YAML object" | "TEXT STRING" = "JSON object",
  responseKey?: string,
  bPro = false,
  bRetry = true,
  supplementalData?: any,
  model: string = textModel
): Promise<any> {
  const modelBackend: llm_modes = getModelBackend(model);

  console.log("====> Model Backend:", modelBackend);

  if (isNaN(RATE_LIMIT) == false) {
    if (RATE_LIMIT > 0) {
      console.log(`Rate Limit Set: ${RATE_LIMIT}`);
      await wait(RATE_LIMIT);
    }
  }

  const promptResponseInstructions = `Please respond with a ${responseMode} containing your answer. ${responseMode !== "TEXT STRING" ? `Please properly format and escape your output, as I will need to parse your response.` : ""} ${responseKey ? `The key for the response should be ${responseKey}.` : ""}

`;

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
      keep_alive: 30000,
      options: {
        ...secretSauce,
        num_ctx: contextLength,
      },
    });
    console.log(ollamaResponse.response.length);
    response = ollamaResponse.response;
  } else if (modelBackend === "VERTEX") {
    //
    const request = {
      contents: [{ role: "user", parts: [{ text: promptNew }] }]
    };

    let genFunction = generativeModel;
    if (bPro === true) {
      if (model.includes("gemini-1.5-pro") == true) {
        genFunction = generateModelAdv;
      } else {
        console.warn(
          "Specified model was FLASH, using provided model: ",
          model
        );
      }
    }

    const result = await genFunction.generateContent(request).catch((err:any)=>{
      console.error(err)
      return "Invalid Response from the LLM"
    })

    try {

      if (typeof result !== 'string'){
        response = result.response.candidates?.[0].content?.parts[0].text || "";
      } else {
        throw "Invalid Response from the LLM"
      }

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
        console.log("Retrying since there was an error -- retying in 10 seconds");
        await wait(10000);
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
      ...secretSauce,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: promptNew },
      ],
      model: model,
    });

    console.debug(completion.choices[0]);
    response = completion.choices[0].message.content || "";

    if (response === "") {
      console.error("Empty response from OpenAI");
      console.error(completion);
    }
  } else {
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
    response = response.replace("json", "").replace("
```", "").trim();

    let bFixed = false;
    if (validateJSON(response) === true) {
      console.log("Valid JSON:");
    } else {
      console.error("Invalid JSON, attempting to fix:");
      try {
        const fixedJson = fixJSON(response);
        console.debug("Fixed JSON:", fixedJson);
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
        console.debug(
          "JSON was fixed! Checking that everything else is OK now."
        );

        // Check if Object malformed into an Array some how...
        if (Array.isArray(res) === true && res.length >= 1) {
          console.log("This looks like a fixed JSON object!");
          // if ("classes" in res[0] === false) {
          //   console.warn("This object does not look correct!");
          //   console.warn(res);
          // }

          const newData = res[0];

          // We should check that the fixed JSON object has the same amount of keys as our interface for the object:
          const keys = Object.keys(newData);

          const expectedKeys: CodeObjects[] = [
            "classes",
            "functions",
            "variables",
            "types",
            "interfaces",
            // "comments",
            "imports",
            "exports",
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
      }

      return res;
    } catch (e: any) {
      console.error("Error parsing JSON:", e);
      console.warn("Returning error message as JSON -- Please Try Again");
      return { error: e, original: response } as any;
    }
  } else if (responseMode === "YAML object") {
    response = response.replace("
```yaml", "").replace("
```", "").trim();
    const res = parseYaml(response);
    return res;
  } else {
    return parseText(response, responseKey);
  }
}

- **Line:** Could Not Verify Line
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `infer` function is an asynchronous function that sends a prompt to a large language model (LLM) and returns the response in the specified format. It handles different LLM backends (Ollama, Vertex AI, OpenAI), manages rate limits, and parses the response into the desired format (JSON, YAML, or plain text).
- **Parameters:** - `prompt`: The prompt to be sent to the LLM.
- `responseMode`: The desired format of the response (JSON object, YAML object, or TEXT STRING). Defaults to "JSON object".
- `responseKey`: The key for the response in the returned object. Only applicable for TEXT STRING responseMode.
- `bPro`: Boolean flag indicating whether to use the professional version of the LLM (if available). Defaults to false.
- `bRetry`: Boolean flag indicating whether to retry the request if an error occurs. Defaults to true.
- `supplementalData`: Optional data to be passed to the LLM. Can be used to provide additional context or information.
- `model`: The name of the LLM model to use. Defaults to `textModel` (which is set to `gemini-1.5-flash-preview-0514` in the code).
- **Returns:** A Promise that resolves to an object containing the LLM's response in the specified format. The format of the returned object depends on the `responseMode` parameter.
- **Usage Example:** 


```typescript
const response = await infer("What is the capital of France?", "TEXT STRING");
console.log(response.response); // Output: Paris
```

- **Edge Cases:** - If the LLM returns an invalid JSON response, the function attempts to fix it. If the fix fails, it returns an error object with the original response.
- If the rate limit is exceeded, the function waits for a specified duration before retrying the request.
- **Dependencies:** - `ollama` library for interacting with Ollama.
- `openai` library for interacting with OpenAI.
- `@google-cloud/vertexai` library for interacting with Vertex AI.
- `jsonrepair` library for fixing invalid JSON responses.
- `js-yaml` library for parsing YAML responses.
- `getTokens` function from the `shared` module for calculating the number of tokens in a string.

### 📤 getCodeSummaryFromLLM - EXPORT
------------------------------------------------------------
**Description:** Asynchronous function that calls the LLM to summarize a code block and returns a codeSummary object.

**Code Snippet:**

export async function getCodeSummaryFromLLM(
  codeToSummarize: string,
  model: string = textModel
): Promise<codeSummary> {
  const question = `Summarize the code block below. Mention the goal of the code and any relevant features / functions: 
  Please respond with a JSON object as follows:
  {
    "goal": "String summarizing what the code is about, and the goal",
    "features_functions": "String describing any relevant features",
  }

  ### Code To Sumnarize:
  ${codeToSummarize}
  `;
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

- **Line:** 456
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `getCodeSummaryFromLLM` function is an asynchronous function that utilizes a large language model (LLM) to generate a summary of a given code block. It returns a `codeSummary` object containing the goal of the code and any relevant features or functions.
- **Parameters:** - `codeToSummarize`: A string representing the code block to be summarized.
- `model`: An optional string specifying the LLM model to use. Defaults to `textModel` (likely a specific model like `gemini-1.5-flash-preview-0514`).
- **Returns:** A `codeSummary` object, which is an interface defined in the `objectSchemas` module. It contains two properties:
- `goal`: A string summarizing the purpose and goal of the code block.
- `features_functions`: A string describing any relevant features or functions within the code block.
- **Usage Example:** 


```typescript
const codeBlock = `
// This is a simple function to add two numbers
function add(a: number, b: number): number {
  return a + b;
}
`;

const codeSummary = await getCodeSummaryFromLLM(codeBlock);

console.log(codeSummary); // Output: { goal: 'This code defines a simple function called add that takes two numbers as input and returns their sum.', features_functions: 'The add function is a simple addition function.' }
```

- **Edge Cases:** The function relies on the LLM's ability to understand and summarize code. If the LLM encounters difficulties in understanding the code, the summary might be inaccurate or incomplete.
- **Dependencies:** - `infer`: An asynchronous function that calls the LLM and returns the response.
- `codeSummary`: An interface defined in the `objectSchemas` module.

### 📤 callLLM - EXPORT
------------------------------------------------------------
**Description:** Asynchronous function that calls the LLM with a prepared prompt and returns a CodeObject.

**Code Snippet:**
```
export async function callLLM(
  promptTemplate: string,
  projectContext: ProjectSummary,
  code: string,
  filePath: string,
  bRAG = false,
  model: string = textModel
): Promise<any> {
  if (bRAG === true) {
    // Take subset of characters of relevant code
    const maxChars = 3000;
    const relevantCode = await searchRAG(projectContext.projectName, code, undefined, AIusageData);
    if (relevantCode.documentData) {
      const r =
        relevantCode.documentData.length > maxChars
          ? relevantCode.documentData.substring(0, maxChars)
          : relevantCode.documentData;
      promptTemplate = promptTemplate.replace("<relevant code>", r);
    } else {
      console.log("No relevant code found in RAG")
      promptTemplate = promptTemplate.replace("<relevant code>", "");
    }
  } else {
    promptTemplate = promptTemplate.replace("<relevant code>", "");
  }

  // 1. Prepare Prompt
  const prompt = promptTemplate
    .replace("<supplemental context>", projectContext.teamContext)
    .replace("<code snippet>", code)
    .replace("<file path>", filePath);

  const getFileNameFromPath = (path: string) => path.split("/").pop() || "";
  const fileName = getFileNameFromPath(filePath);

  // 1.5 Update our STATS
  const tokens = getTokens(prompt);
  AIusageData.totalTokens += tokens;
  AIusageData.totalCharacters += prompt.length;
  AIusageData.totalAPIcalls += 1;
  AIusageData.totalCost += getCostOfAPICall(prompt.length);

  console.log("Total Tokens:", AIusageData.totalTokens);
  console.log("Total Characters:", AIusageData.totalCharacters);
  console.log("Total API Calls:", AIusageData.totalAPIcalls);

  console.log(colorize("Total Cost:", "magenta"), AIusageData.totalCost);

  console.info("Cost for Current Call:", "$" + getCostOfAPICall(prompt.length) + " USD");


  // 2. Call AI API
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

  AIusageData.totalTokens += getTokens(JSON.stringify(response));
  AIusageData.totalCharactersOut += JSON.stringify(response).length;
  AIusageData.totalCost += getCostOfAPICallTextOut(AIusageData.totalCharactersOut);

  // 3. Parse and Validate Response
  let codeObjects: any = response;

  // 4. Enhance with filePath
  if (!codeObjects.fileName) codeObjects.fileName = fileName;

    // Update the filePath to be the relative path to the project directory:
    const projectDir = projectContext.projectLocation
    const relativePath = filePath.replace(projectDir, "")


  if (!codeObjects.fileLocation) codeObjects.fileLocation = relativePath;

  return codeObjects;
}
```
- **Line:** 482
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `callLLM` function is responsible for preparing a prompt, calling the LLM (Large Language Model) with the prompt, and parsing the response. It handles various aspects of the interaction with the LLM, including error handling, rate limiting, and tracking usage statistics.
- **Parameters:** - `promptTemplate`: A string containing the prompt template to be used for the LLM call. This template can include placeholders for context, code snippets, and file paths.
- `projectContext`: A `ProjectSummary` object containing information about the project being analyzed, including its name, location, dependencies, and code files.
- `code`: A string representing the code snippet to be analyzed by the LLM.
- `filePath`: A string representing the path to the file containing the code snippet.
- `bRAG`: A boolean flag indicating whether to use the RAG (Retrieval Augmented Generation) system to provide relevant code snippets from the vector database. Defaults to `false`.
- `model`: A string representing the name of the LLM model to be used. Defaults to `textModel`.
- **Returns:** The function returns a `CodeObject` containing the results of the LLM call. This object includes information about the identified code objects, such as classes, functions, variables, and their descriptions.
- **Usage Example:** 


```typescript
const codeObjects = await callLLM(promptTemplate, projectContext, code, filePath, true, "gemini-1.5-flash-preview-0514");
```

- **Edge Cases:** - If the LLM call fails, the function returns an error object.
- If the rate limit is exceeded, the function waits for 30 seconds and retries the call.
- **Dependencies:** - `searchRAG`: Function to search the vector database for relevant code snippets.
- `infer`: Function to call the LLM with a prompt and parse the response.
- `getTokens`: Function to calculate the number of tokens in a string.
- `getCostOfAPICall`: Function to calculate the cost of an API call based on the character count.
- `wait`: Function to pause execution for a specified duration.
## interfaces


### 🌉 llmRuntimeData - INTERFACE
------------------------------------------------------------
**Description:** Interface for storing runtime data related to LLM usage.

**Code Snippet:**
```
export const AIusageData:llmRuntimeData = {
  totalTokens: 0,
  totalCharacters: 0,
  totalCharactersOut: 0,
  totalCharactersEmbed: 0,
  totalCost: 0,
  totalAPIcalls: 0
}
```
- **Line:** 31
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `llmRuntimeData` interface defines the structure for storing runtime data related to LLM usage. This data includes metrics like total tokens, characters, API calls, and costs associated with LLM interactions.

### 🌉 llm_modes - INTERFACE
------------------------------------------------------------
**Description:** Type alias for LLM backend modes.

**Code Snippet:**
```
type llm_modes = "OLLAMA" | "VERTEX" | "OPENAI";
```
- **Line:** 54
- **Location:** llmInterface.ts (./src/llmInterface.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines the possible backend modes for the LLM (Large Language Model) used in the application.
- **Usage Example:** 


```typescript
const modelBackend: llm_modes = getModelBackend(model);
```


### 🌉 FunctionParameter - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing a function parameter.

**Code Snippet:**
```
export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `FunctionParameter` interface defines the structure for representing a function parameter. It includes properties for the parameter's name, type, description, and an example value.
- **Parameters:** The interface has four properties:

- `name`: A string representing the name of the parameter.
- `type`: A string representing the data type of the parameter.
- `description`: A string providing a description of the parameter's purpose.
- `example`: A string providing an example value for the parameter.
- **Returns:** This interface does not return any value. It is used to define the structure of a function parameter.
- **Usage Example:** 


```typescript
const functionParameter: FunctionParameter = {
  name: 'param1',
  type: 'string',
  description: 'This is the first parameter',
  example: 'Hello World'
};
```


### 🌉 FunctionReturn - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing a function return value.

**Code Snippet:**
```
export interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `FunctionReturn` interface defines the structure for representing a function's return value. It includes the type, description, and an example of the return value.
- **Usage Example:** 


```typescript
// Example usage of FunctionReturn interface
const functionReturn: FunctionReturn = {
  type: 'string',
  description: 'This function returns a string',
  example: 'Hello, world!'
};
```


### 🌉 CodeObject - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing a code object (class, function, variable, etc.).

**Code Snippet:**
```
export interface CodeObject {
    name: string;
    type: CodeObjectType;
    description: string;
    codeSnippet: string;
    annotation?: Annotation;
    codeLine?: number;
    codeIndent?: number;
    content?:string;
    fileName: string;
    fileLocation: string;
    subObjects?: CodeObject[];
    parentObject?: CodeObject;
    functionParameters?: FunctionParameter[];
    functionReturns?: FunctionReturn;
    isExported: boolean;
    isFunction: boolean;
    isClass: boolean;
    isPrivate: boolean;
    isAsync: boolean;
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObject` interface defines the structure for representing code objects within a project. It includes properties for the object's name, type, description, code snippet, annotation, line number, indentation level, file name, file location, sub-objects, parent object, function parameters, function return values, and various flags indicating its characteristics (exported, function, class, private, async).
- **Usage Example:** 


```typescript
const codeObject: CodeObject = {
  name: 'myFunction',
  type: 'function',
  description: 'This function does something cool',
  codeSnippet: 'function myFunction() { ... }',
  codeLine: 10,
  codeIndent: 2,
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  isExported: true,
  isFunction: true,
  isClass: false,
  isPrivate: false,
  isAsync: false
};
```


### 🌉 Annotation - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing annotations for a code object.

**Code Snippet:**
```
export interface Annotation {
    purpose: string;
    parameters?: string;
    returns?: string;
    usageExample?: string;
    edgeCases?: string;
    dependencies?: string;
    errorHandling?: string;
    performance?: string;
    bestPractices?: string;
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `Annotation` interface defines the structure for storing annotations related to a code object. It provides fields to capture various aspects of the code object, including its purpose, parameters, return values, usage examples, edge cases, dependencies, error handling, performance considerations, and best practices.
- **Parameters:** None. The `Annotation` interface is a data structure and does not have any parameters.
- **Returns:** None. The `Annotation` interface is a data structure and does not return any value.
- **Usage Example:** 


```typescript
const annotation: Annotation = {
  purpose: "This function calculates the sum of two numbers.",
  parameters: "num1: number, num2: number",
  returns: "number",
  usageExample: "const sum = add(1, 2);",
  edgeCases: "Negative numbers are not supported.",
  dependencies: "someDependency, anotherDependency",
  errorHandling: "Throws an error if the input is not a number.",
  performance: "Optimized for speed.",
  bestPractices: "Use this function for adding numbers to..."
};
```

- **Edge Cases:** None. The `Annotation` interface is a data structure and does not have any edge cases.
- **Dependencies:** None. The `Annotation` interface is a data structure and does not have any dependencies.

### 🌉 globResult - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing glob results.

**Code Snippet:**
```
export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `globResult` interface defines the structure for storing results from glob operations, which are used to find files matching specific patterns.

### 🌉 runtimeData - INTERFACE
------------------------------------------------------------
**Description:** Interface for storing runtime data.

**Code Snippet:**
```
export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `runtimeData` interface defines the structure for storing runtime data related to the documentation generation process.

### 🌉 moduleObject - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing a module or package.

**Code Snippet:**
```
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `moduleObject` interface defines the structure for representing a module or package. It includes properties for the module's name, version, and description.
- **Usage Example:** 


```typescript
const myModule: moduleObject = {
  name: 'my-module',
  version: '1.0.0',
  description: 'A useful module',
};
```


### 🌉 ProjectSummary - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing a project summary.

**Code Snippet:**
```
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ProjectSummary` interface defines the structure for storing information about a code project. It includes details like the project name, description, location, technology stack, dependencies, code files, RAG data, and team context.
- **Usage Example:** 


```typescript
const projectSummary: ProjectSummary = {
  projectName: 'MyProject',
  projectDescription: {
    goal: 'This project aims to...',
    features_functions: 'It includes features like...'
  },
  projectLocation: '/path/to/project',
  projectTechStackDescription: 'TypeScript, React, Node.js',
  projectDependencies: [
    { name: 'react', version: '18.2.0', description: 'A JavaScript library for building user interfaces' },
    { name: 'express', version: '4.18.2', description: 'A Node.js web application framework' }
  ],
  codeFiles: [
    // ... code file summaries
  ],
  ragData: [
    // ... RAG data
  ],
  teamContext: 'This project is developed by...'
};
```


### 🌉 models - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing a model.

**Code Snippet:**
```
export interface models {
    name: string,
    model: any,
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for representing a model, which likely includes its name and an associated model object.
- **Usage Example:** 


```typescript
const myModel: models = {
  name: "myModelName",
  model: // Model object
};
```


### 🌉 modelServiceConfig - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing a model service configuration.

**Code Snippet:**
```
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `modelServiceConfig` interface defines the configuration for a model service. It specifies the models available in the service and an optional endpoint URL.
- **Usage Example:** 


```typescript
const config: modelServiceConfig = {
  models: [
    { name: 'gpt-3.5-turbo', model: 'gpt-3.5-turbo' },
    { name: 'gpt-4', model: 'gpt-4' }
  ],
  endpoint: 'https://api.example.com/models'
};
```


### 🌉 RagData - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing RAG data.

**Code Snippet:**
```
export interface RagData {
    metadata: {
        filename: string;
        codeChunkId: string|number;
        codeChunkLineStart: number;
        codeChunkLineEnd: number;
        codeObjects: CodeObject;
        codeChunkSummary: string;
    };
    embeddings?: number[][]; // Example: Embeddings could be an array of numbers
    documentData: any
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `RagData` interface represents data retrieved from a Retrieval Augmented Generation (RAG) system. It stores metadata about the retrieved document, embeddings (numerical representations of the document), the actual document data, and search results.
- **Usage Example:** 


```typescript
const ragData: RagData = {
  metadata: {
    filename: 'myFile.ts',
    codeChunkId: 1,
    codeChunkLineStart: 10,
    codeChunkLineEnd: 20,
    codeObjects: {},
    codeChunkSummary: 'This code chunk defines a function...'
  },
  embeddings: [],
  documentData: '// This is the code chunk...',
  allSearchResults: {},
  allResults: {
    documents: [],
    embeddings: [],
    metadatas: []
  }
};
```

- **Dependencies:** The `RagData` interface depends on the `CodeObject` interface and the `QueryResponse` type from the `chromadb` library.

### 🌉 codeSummary - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing a code summary.

**Code Snippet:**
```
export interface codeSummary {
    goal: string,
    features_functions: string,
  }
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `codeSummary` interface defines the structure for storing information about a code snippet's purpose and features.
- **Usage Example:** 


```typescript
const codeSummary: codeSummary = {
  goal: "This code snippet calculates the sum of two numbers.",
  features_functions: "The code uses the `add` function to perform the calculation."
};
```


### 🌉 CodeFileSummary - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing a code file summary.

**Code Snippet:**
```
export interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: codeSummary;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject;
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeFileSummary` interface represents a summary of a code file, containing information about its name, location, code summary, language, execution flow, and code objects.
- **Usage Example:** 


```typescript
const codeFileSummary: CodeFileSummary = {
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  codeSummary: {
    goal: 'This file implements a function to calculate the sum of two numbers.',
    features_functions: 'The function takes two numbers as input and returns their sum.'
  },
  language: 'TypeScript',
  executionFlow: [],
  codeObjects: {
    functions: [
      {
        name: 'add',
        type: 'function',
        description: 'Calculates the sum of two numbers.',
        codeSnippet: 'function add(num1: number, num2: number): number { return num1 + num2; }',
        codeLine: 10,
        codeIndent: 2,
        fileName: 'myFile.ts',
        fileLocation: './src/myFile.ts',
        isExported: true,
        isPrivate: false,
        isAsync: false,
        functionParameters: [
          { name: 'num1', type: 'number', description: 'The first number to add.', example: '1' },
          { name: 'num2', type: 'number', description: 'The second number to add.', example: '2' }
        ],
        functionReturns: { type: 'number', description: 'The sum of the two numbers.', example: '3' }
      }
    ]
  }
};
```


### 🌉 ExecutionFlow - INTERFACE
------------------------------------------------------------
**Description:** Interface for representing a step in the execution flow.

**Code Snippet:**
```
export interface ExecutionFlow {
    step: number;
    stepDescription: string;
    bImportant: boolean;
    codeSnippet: string;
    codeLine: number;
    codeIndent: number;
    fileName: string;
    fileLocation: string;
}
```
- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ExecutionFlow` interface represents a single step in the execution flow of a code file. It is used to store information about each step, such as its description, importance, code snippet, line number, indentation, and file location.
- **Usage Example:** 


```typescript
const executionFlow: ExecutionFlow[] = [
  {
    step: 1,
    stepDescription: 'Initialize variables',
    bImportant: true,
    codeSnippet: 'let myVariable = 0;
let anotherVariable = 'hello';',
    codeLine: 10,
    codeIndent: 2,
    fileName: 'myFile.ts',
    fileLocation: './src/myFile.ts'
  },
  {
    step: 2,
    stepDescription: 'Perform calculation',
    bImportant: false,
    codeSnippet: 'const result = myVariable + anotherVariable;
console.log(result);',
    codeLine: 15,
    codeIndent: 2,
    fileName: 'myFile.ts',
    fileLocation: './src/myFile.ts'
  }
];
```

