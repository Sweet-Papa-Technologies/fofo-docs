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
import "dotenv/config";
import { makeOSpathFriendly } from "./shared";
import { searchRAG } from "./vectorDB";
import "./logger";

const sModel = process.env["LLM_TO_USE"] || undefined;
const codeRelevanceMin =
  (process.env["CODE_RELEVANCE_MIN"]
    ? Number(process.env["CODE_RELEVANCE_MIN"])
    : undefined) || 0.2;

const addCodeObjectBackToProjectSummaryObject = (
  codeObj: CodeObject,
  annotation: Annotation,
  projectSummary: ProjectSummary
) => {
  // Add annotation to the code object
  codeObj.annotation = annotation;

  for (const file of projectSummary.codeFiles) {
    if (file.fileName === codeObj.fileName) {
      for (const objKey in file.codeObjects) {
        const codeObjects = file.codeObjects[
          objKey as keyof CodeObject
        ] as CodeObject;
        for (const i in codeObjects) {
          const currentCodeObject = codeObjects[i as keyof CodeObject] as any;
          if (currentCodeObject.codeSnippet === codeObj.codeSnippet) {
            (codeObjects[i as keyof CodeObject] as any) = codeObj;
          }
        }
      }
    }
  }

  return projectSummary;
};

async function getRelevantCodeSnippets(
  codeObj: CodeObject,
  projectName: string
): Promise<string> {
  let relevantCodeSnippets: string[] = [];
  let returnString = "";

  const llmRuntimeDataResult = (await import("./llmInterface")).AIusageData;

  const results = await searchRAG(projectName || "", codeObj.description, undefined, llmRuntimeDataResult);

  if (results) {
    let indexLvl1 = -1;
    let indexLvl2 = -1;
    for (const codeObj of results.allSearchResults.documents) {
      indexLvl1++;
      if (results.allSearchResults.distances) {
        console.debug(
          "Distance LVL1: ",
          results.allSearchResults.distances[indexLvl1]
        );
      }
      for (const codeSnippet of codeObj) {
        indexLvl2++;
        if (
          results.allSearchResults.distances &&
          results.allSearchResults.distances[indexLvl1]
        ) {
          console.debug(
            "Distance LVL2: ",
            results.allSearchResults.distances[indexLvl1][indexLvl2]
          );
        }
        if (
          results.allSearchResults.distances &&
          results.allSearchResults.distances[indexLvl1][indexLvl2]
        ) {
          if (
            results.allSearchResults.distances[indexLvl1][indexLvl2] >
            codeRelevanceMin
          ) {
            if (codeSnippet) {
              console.debug("Code Snippet: ", codeSnippet);
              relevantCodeSnippets.push(codeSnippet);
            }
          }
        }
      }
    }
  }

  return returnString.concat(relevantCodeSnippets.join("\n"));
}

async function annotateCodeObject(
  codeObj: CodeObject,
  context: string,
  projectName?: string
): Promise<Annotation> {
  // Generate prompt for LLM
  const bRAG = process.env.EMBEDDER_MODE || "OFF";
  const bUseRag = bRAG !== "OFF" ? true : false;
  // const ragContext = bUseRag === true ? (await searchRAG(projectName || "", codeObj.description)).metadata.codeObjects.codeSnippet : undefined;
    const ragContext = bUseRag === true ? await getRelevantCodeSnippets(codeObj, projectName || "") : undefined;

  console.debug("Annotating code object: ", ragContext);

  const prompt = annotateCodeObjectPrompt(codeObj, context, ragContext);
  return await infer(
    prompt,
    "JSON object",
    undefined,
    false,
    true,
    undefined,
    sModel
  );
}

export async function annotateProject(
  projectSummary: ProjectSummary,
  outputDir: string
) {
  const annotationsFolder = path.join(outputDir, "annotations", projectSummary.projectName);
  try {
    fs.mkdirSync(annotationsFolder, { recursive: true });
  } catch (error) {
    console.error(error);
    console.error("Error creating annotations folder");
  }

  // Summarize all files
  const context = await summarizeAllFiles(projectSummary.codeFiles);

  for (const aFile of projectSummary.codeFiles) {
    const file = aFile as any;
    const fileAnnotations = [];

    for (const key in file.codeObjects) {
      const codeObjects = file.codeObjects[key];
      try {
        for (const codeObj of codeObjects) {
          const annotation = await annotateCodeObject(codeObj, context, projectSummary.projectName);
          try {
            // UPDATE the project summary with the annotation == TODO: Redo this. we don't need to update the project summary at every iteration, we should do it at the end
            projectSummary = addCodeObjectBackToProjectSummaryObject(
              codeObj,
              annotation,
              projectSummary
            );
          } catch (error) {
            console.error(error);
          }
          fileAnnotations.push({ codeObj, annotation });
        }
      } catch (error) {
        console.error(error);
      }
    }

    // // Write annotations to a file
    const sDate = new Date().toISOString().replace(/:/g, "-");
    const filePath = path.join(
      annotationsFolder,
      `${makeOSpathFriendly(file.fileName)}-${makeOSpathFriendly(
        sDate
      )}-annotations.json`
    );
    const filePathFolder = path.dirname(filePath);
    try {
      if (!fs.existsSync(filePathFolder)) {
        fs.mkdirSync(filePathFolder, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(fileAnnotations, null, 2));
    } catch (error) {
      console.error(error);
    }
  }

  return projectSummary;
}

// Example function to summarize all files (for context)
async function summarizeAllFiles(
  codeFiles: CodeFileSummary[]
): Promise<string> {
  let summary =
    "Project contains the following files and their high-level summaries:\n";

  for (const file of codeFiles) {
    summary += `File: ${file.fileName}\nSummary: ${file.codeSummary.goal}\n\n`;
  }
  return summary;
}
