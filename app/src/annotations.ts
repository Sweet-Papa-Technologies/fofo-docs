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
          results.allSearchResults.distances[topIndex][secondIndex] &&
          results.allSearchResults.distances[topIndex][secondIndex] > codeRelevanceMin
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

  // If RAG is on, fetch relevant code snippets
  const ragContext = bUseRag
    ? await getRelevantCodeSnippets(codeObj, projectName || "")
    : undefined;

  const prompt = annotateCodeObjectPrompt(codeObj, context, ragContext);
  // We want JSON, so let's just ask the model for that
  return infer(
    prompt,
    "JSON object",
    undefined,
    false,
    true,
    undefined,
    sModel
  );
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
