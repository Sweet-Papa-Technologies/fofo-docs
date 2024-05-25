import { Annotation, CodeFileSummary, CodeObject, ProjectSummary } from "./objectSchemas";
import fs from 'fs';
import path from 'path';
import { annotateCodeObjectPrompt } from "./prompt";
import { infer } from "./llmInterface";
import 'dotenv/config';
import { makeOSpathFriendly } from "./shared";

const sModel = process.env['LLM_TO_USE'] || undefined;

const addCodeObjectBackToProjectSummaryObject = (codeObj: CodeObject, annotation: Annotation, projectSummary: ProjectSummary) => {
    // Add annotation to the code object
    codeObj.annotation = annotation;

    for (const file of projectSummary.codeFiles) {
        if (file.fileName === codeObj.fileName) {
            for (const objKey in file.codeObjects) {
                const codeObjects = file.codeObjects[objKey as keyof CodeObject] as CodeObject
                for (const i in codeObjects) {
                    const currentCodeObject = codeObjects[i as keyof CodeObject] as any
                    if (currentCodeObject.codeSnippet === codeObj.codeSnippet) {
                        (codeObjects[i as keyof CodeObject] as any) = codeObj;
                    }
                }
            }
        }
    }

    return projectSummary;
}

async function annotateCodeObject(codeObj: CodeObject, context: string): Promise<Annotation> {
    // Generate prompt for LLM
    const prompt = annotateCodeObjectPrompt(codeObj, context);
    return await infer(prompt, 'JSON object', undefined, false, true, undefined, sModel);
}

export async function annotateProject(projectSummary: ProjectSummary, outputDir: string) {
    const annotationsFolder = path.join(outputDir, 'annotations');
    try {
        fs.mkdirSync(annotationsFolder, { recursive: true });
    } catch (error){ 
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
                    const annotation = await annotateCodeObject(codeObj, context);
                    try {
                        // UPDATE the project summary with the annotation == TODO: Redo this. we don't need to update the project summary at every iteration, we should do it at the end
                        projectSummary = addCodeObjectBackToProjectSummaryObject(codeObj, annotation, projectSummary);
                    } catch (error) {
                        console.error(error);
                    }
                    fileAnnotations.push({ codeObj, annotation });
                }
            }
            catch (error) {
                console.error(error);
            }
        }

        // // Write annotations to a file
        const sDate = new Date().toISOString().replace(/:/g, '-');
        const filePath = path.join(annotationsFolder, `${makeOSpathFriendly(file.fileName)}-${makeOSpathFriendly(sDate)}-annotations.json`);
        const filePathFolder = path.dirname(filePath);
        try {
            if (!fs.existsSync(filePathFolder)){
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
async function summarizeAllFiles(codeFiles:CodeFileSummary[]): Promise<string> {
    let summary = 'Project contains the following files and their high-level summaries:\n';
    
    for (const file of codeFiles) {
        summary += `File: ${file.fileName}\nSummary: ${file.codeSummary.goal}\n\n`;
    }
    return summary;
}


