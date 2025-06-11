import {
  Annotation,
  CodeFileSummary,
  CodeObject,
  ProjectSummary,
} from "./objectSchemas";
import fs from "fs";
import path from "path";
import { annotateCodeObjectPrompt } from "./prompt";
import { infer } from "./llmInterface";
import { makeOSpathFriendly } from "./shared";
import { searchRAG } from "./vectorDB";
import "./logger";
import "dotenv/config";

const sModel = process.env["LLM_TO_USE"] || undefined;
const codeRelevanceMin =
  Number(process.env["CODE_RELEVANCE_MIN"] || 0.2) || 0.2;

/**
 * Re-inserts the annotated code object back into the main ProjectSummary structure
 */
const addCodeObjectBackToProjectSummaryObject = (
  codeObj: CodeObject,
  annotation: Annotation,
  projectSummary: ProjectSummary
) => {
  codeObj.annotation = annotation;
  for (const file of projectSummary.codeFiles) {
    if (file.fileName === codeObj.fileName) {
      for (const objKey in file.codeObjects) {
        const codeObjects = file.codeObjects[objKey];
        for (let i = 0; i < codeObjects.length; i++) {
          // If the codeSnippet matches, assume it's the same object
          if (codeObjects[i].codeSnippet === codeObj.codeSnippet) {
            codeObjects[i] = codeObj;
          }
        }
      }
    }
  }
  return projectSummary;
};

/**
 * Retrieves relevant code snippets from RAG data that match the code object's description
 */
async function getRelevantCodeSnippets(
  codeObj: CodeObject,
  projectName: string
): Promise<string> {
  const relevantCodeSnippets: string[] = [];

  // Importing AI usage data on the fly (from llmInterface) if needed
  const llmRuntimeDataResult = (await import("./llmInterface")).AIusageData;

  // Query the vector DB
  const results = await searchRAG(
    projectName || "",
    codeObj.description,
    undefined,
    llmRuntimeDataResult
  );

  if (results && results.allSearchResults?.documents) {
    const docArr = results.allSearchResults.documents;
    // Distances array is often [ [distance1, distance2, ...], [distance1, distance2... ] ]
    // We'll iterate in parallel
    let topIndex = -1;
    for (const docSet of docArr) {
      topIndex++;
      if (!docSet) continue;

      let secondIndex = -1;
      for (const snippet of docSet) {
        secondIndex++;
        if (
          results.allSearchResults.distances &&
          results.allSearchResults.distances[topIndex] &&
          results.allSearchResults.distances[topIndex][secondIndex] !== undefined && // Ensure distance value exists
          results.allSearchResults.distances[topIndex][secondIndex] < codeRelevanceMin // Assuming smaller distance means more relevant
        ) {
          if (snippet) {
            relevantCodeSnippets.push(snippet);
          }
        }
      }
    }
  }

  // Join all relevant snippets with a newline
  return relevantCodeSnippets.join("\n");
}

/**
 * Annotates a single CodeObject by calling the LLM with a prompt
 */
async function annotateCodeObject(
  codeObj: CodeObject,
  context: string,
  projectName?: string
): Promise<Annotation> {
  const bRAG = process.env.EMBEDDER_MODE || "OFF";
  const bUseRag = bRAG !== "OFF";
  const maxRetries = 1; // Allow one retry

  let annotation: Annotation | undefined;
  let attempts = 0;

  // Function to check if annotation is sufficient
  const isAnnotationSufficient = (anno: Annotation): boolean => {
    if (!anno) return false;
    // Consider an annotation insufficient if critical fields are missing or too short
    const criticalFields = ["purpose", "usageExample"];
    if (codeObj.type === "function" || codeObj.type === "class") { // Classes can have methods that behave like functions
        criticalFields.push("parameters", "returns");
    }
    for (const field of criticalFields) {
      const value = anno[field as keyof Annotation];
      if (value === undefined || value === null || (typeof value === 'string' && value.trim().length < 10) && value.trim().toLowerCase() !== "none" && value.trim().toLowerCase() !== "not applicable") {
        console.warn(`Annotation for ${codeObj.name} deemed insufficient due to field: ${field} (value: "${value}")`);
        return false;
      }
    }
    // Check if parameters (if an array) has meaningful content
    if (Array.isArray(anno.parameters) && anno.parameters.length > 0) {
        const firstParam = anno.parameters[0];
        if (typeof firstParam === 'object' && firstParam !== null) {
            if ((!firstParam.name || firstParam.name.length < 1) && (!firstParam.type || firstParam.type.length < 1)) {
                 console.warn(`Annotation for ${codeObj.name} deemed insufficient due to empty parameter object.`);
                 return false;
            }
        } else if (typeof firstParam === 'string' && firstParam.length < 5 && firstParam.toLowerCase() !== "none" && firstParam.toLowerCase() !== "not applicable" ) {
            console.warn(`Annotation for ${codeObj.name} deemed insufficient due to short parameter string: "${firstParam}"`);
            return false;
        }
    } else if (typeof anno.parameters === 'string' && anno.parameters.length < 5 && anno.parameters.toLowerCase() !== "none" && anno.parameters.toLowerCase() !== "not applicable") {
        console.warn(`Annotation for ${codeObj.name} deemed insufficient due to short parameters field: "${anno.parameters}"`);
        return false;
    }


    return true;
  };

  while (attempts <= maxRetries) {
    attempts++;
    // If RAG is on, fetch relevant code snippets
    const ragContext = bUseRag
      ? await getRelevantCodeSnippets(codeObj, projectName || "")
      : undefined;

    let prompt;
    if (attempts > 1 && annotation) {
      // This is a retry, modify the prompt to ask for elaboration
      console.info(`Retrying annotation for code object: ${codeObj.name} (Attempt ${attempts})`);
      prompt = `
The previous annotation for the code object below was found to be insufficient.
Please provide a more detailed and complete annotation, paying close attention to any fields that were previously left blank, marked as "Not applicable" or "None" without justification, or were too brief.

Original Code Object:
${JSON.stringify(codeObj, null, 2)}

Previously Generated (Insufficient) Annotation:
${JSON.stringify(annotation, null, 2)}

Refer to the original guidelines for the full application context and desired JSON structure. Ensure all fields are thoroughly addressed.
For example, if 'parameters' or 'returns' are applicable, provide full details (name, type, description). Do not just state 'None' if the function does have parameters or return values.
If a field like 'edgeCases' or 'dependencies' was 'None', elaborate if there are any, or confirm that 'None' is accurate after careful consideration.

## Full Application Context
${context}
` + (ragContext ? `\n## Other Relevant Code Snippets from Other Files \n${ragContext}` : '') + `
\n## Annotation Guidelines (Reminder)
    - **purpose**: Clearly describe the primary goal and functionality of this code object. What does it do? Why does it exist?
    - **parameters**: (For functions/methods) Detail each parameter, including its name, expected data type, and its role in the function. If no parameters, state "None".
    - **returns**: (For functions/methods) Explain what the function or method returns, including its data type. If it doesn't return a value (e.g., void), state "None" or "void".
    - **usageExample**: Provide a concise and correct code snippet demonstrating how to use this code object. Ensure all characters are properly escaped for a JSON string. For example, use '\\\`\\\`\\\`typescript\\nconst x = 1;\\\`\\\`\\\`' for a TypeScript code block.
    - **edgeCases**: Identify and describe any known edge cases, limitations, or special conditions that affect this code object's behavior.
    - **dependencies**: List any other code objects, modules, or external libraries that this code object directly depends on to function. If none, state "None".
    - **errorHandling**: Describe how this code object handles potential errors or exceptional situations. Does it throw exceptions, return error codes, or have specific error recovery mechanisms?
    - **performance**: Note any important performance considerations related to this code object, such as time complexity, memory usage, or potential bottlenecks.
    - **bestPractices**: Highlight any recommended best practices, common patterns, or important considerations for developers when using or interacting with this code object.
Respond ONLY with the improved JSON object.
`;
    } else {
      // First attempt
      prompt = annotateCodeObjectPrompt(codeObj, context, ragContext);
    }

    try {
      const currentAnnotation = await infer(
        prompt,
        "JSON object",
        undefined,
        false,
        true,
        undefined,
        sModel
      ) as Annotation;

      annotation = currentAnnotation;

      if (isAnnotationSufficient(annotation)) {
        break; // Annotation is good, exit loop
      } else if (attempts > maxRetries) {
        console.warn(`Annotation for ${codeObj.name} is still insufficient after ${attempts} attempts. Using the last one.`);
      }

    } catch (error) {
      console.error(`Error during LLM inference for ${codeObj.name} (Attempt ${attempts}):`, error);
      if (attempts > maxRetries) {
        throw error; // Re-throw error if max retries reached
      }
      // Optionally, wait a bit before retrying on error
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  if (!annotation) {
    // Should not happen if infer throws on error, but as a fallback
    console.error(`Failed to generate any annotation for ${codeObj.name} after ${maxRetries+1} attempts.`);
    // Return a default/empty annotation object to avoid breaking the flow
    return {
        purpose: "Failed to generate annotation.",
        parameters: "Failed to generate annotation.",
        returns: "Failed to generate annotation.",
        usageExample: "Failed to generate annotation.",
        edgeCases: "Failed to generate annotation.",
        dependencies: "Failed to generate annotation.",
        errorHandling: "Failed to generate annotation.",
        performance: "Failed to generate annotation.",
        bestPractices: "Failed to generate annotation."
    };
  }
  return annotation;
}

/**
 * Main function to annotate the entire project
 */
export async function annotateProject(
  projectSummary: ProjectSummary,
  outputDir: string
) {
  // Create an 'annotations' folder if it doesn't exist
  const annotationsFolder = path.join(
    outputDir,
    "annotations",
    projectSummary.projectName
  );
  try {
    fs.mkdirSync(annotationsFolder, { recursive: true });
  } catch (error) {
    console.error("Error creating annotations folder:", error);
  }

  // Summarize all files (provides global context for the LLM)
  const context = await summarizeAllFiles(projectSummary.codeFiles);

  // For each file, annotate each code object
  for (const aFile of projectSummary.codeFiles) {
    const fileAnnotations: { codeObj: CodeObject; annotation: Annotation }[] = [];

    for (const key in aFile.codeObjects) {
      const codeObjects = aFile.codeObjects[key];
      // Annotate each object
      for (const obj of codeObjects) {
        try {
          const annotation = await annotateCodeObject(
            obj,
            context,
            projectSummary.projectName
          );

          // Update the project summary so the annotation is stored
          projectSummary = addCodeObjectBackToProjectSummaryObject(
            obj,
            annotation,
            projectSummary
          );

          fileAnnotations.push({ codeObj: obj, annotation });
        } catch (error) {
          console.error("Error annotating code object:", error);
        }
      }
    }

    // Write annotations for this file to a timestamped JSON
    const sDate = new Date().toISOString().replace(/:/g, "-");
    const filePath = path.join(
      annotationsFolder,
      `${makeOSpathFriendly(aFile.fileName)}-${makeOSpathFriendly(sDate)}-annotations.json`
    );
    try {
      const filePathFolder = path.dirname(filePath);
      if (!fs.existsSync(filePathFolder)) {
        fs.mkdirSync(filePathFolder, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(fileAnnotations, null, 2));
    } catch (error) {
      console.error("Error writing annotations JSON:", error);
    }
  }

  return projectSummary;
}

/**
 * Helper function to summarize all files in the project.
 * Returns a short string that describes each file's summary.
 */
async function summarizeAllFiles(codeFiles: CodeFileSummary[]): Promise<string> {
  let summary =
    "Project contains the following files and their high-level summaries:\n\n";

  for (const file of codeFiles) {
    summary += `File: ${file.fileName}\nSummary: ${file.codeSummary.goal}\n\n`;
  }
  return summary;
}
