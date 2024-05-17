import { CodeObject, ProjectSummary, CodeObjectType } from "./objectSchemas";
import fs from 'fs';
import path from 'path';
import "dotenv/config";

const backupDirectory = path.join(__dirname, 'backup');

function jsonToMarkdown(projectSummary: ProjectSummary, outputFolder: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const projectFolder = path.join(outputFolder, `${projectSummary.projectName}-${timestamp}`);
    fs.mkdirSync(projectFolder, { recursive: true });

    const toc: string[] = [];
    
    toc.push(`# ${projectSummary.projectName}`);
    toc.push(`\n## Project Description\n${projectSummary.projectDescription}`);
    toc.push(`\n## Team Context\n${projectSummary.teamContext}`);

    // Process Code Files
    projectSummary.codeFiles.forEach(file => {
        const fileName = `${file.fileName}.md`;
        const filePath = path.join(projectFolder, fileName);
        toc.push(`\n- [${file.fileName}](./${fileName})`);

        let fileContent = `# ${file.fileName}\n`;
        fileContent += `\n**File Location:** ${file.fileLocation}`;
        fileContent += `\n**Language:** ${file.language}`;
        fileContent += `\n**Summary:** ${file.codeSummary.summary}\n`;
        fileContent += generateCodeObjectContent(file.codeObjects, 0);
        

        // Make sure the folder path for the file exists
        const fileFolder = path.dirname(filePath);

        try {
            fs.mkdirSync(fileFolder, { recursive: true });
        } catch (err) {
            console.error(`Error creating folder for ${file.fileName}`);
        }

        fs.writeFileSync(filePath, fileContent);
    });

    // Write TOC
    const tocPath = path.join(projectFolder, 'README.md');
    fs.writeFileSync(tocPath, toc.join('\n'));
}

function generateCodeObjectContent(codeObject: CodeObject, indent: number): string {
    const indentation = '  '.repeat(indent);

    let content = `\n${indentation}## ${codeObject.name || 'Unnamed Code Object'}`;
    content += `\n${indentation}**Type:** ${codeObject.type || 'undefined'}`;
    content += `\n${indentation}**Description:** ${codeObject.objectDescription || 'undefined'}`;
    content += `\n${indentation}**Code Snippet:**\n\`\`\`\n${codeObject.codeSnippet || 'undefined'}\n\`\`\``;
    content += `\n${indentation}**Line:** ${codeObject.codeLine !== undefined ? codeObject.codeLine : 'undefined'}`;
    content += `\n${indentation}**Indent:** ${codeObject.codeIndent !== undefined ? codeObject.codeIndent : 'undefined'}`;
    content += `\n${indentation}**Location:** ${codeObject.fileName || 'undefined'} (${codeObject.fileLocation || 'undefined'})`;
    content += `\n${indentation}**Exported:** ${codeObject.isExported !== undefined ? codeObject.isExported : 'undefined'}`;
    content += `\n${indentation}**Function:** ${codeObject.isFunction !== undefined ? codeObject.isFunction : 'undefined'}`;
    content += `\n${indentation}**Class:** ${codeObject.isClass !== undefined ? codeObject.isClass : 'undefined'}`;
    content += `\n${indentation}**Private:** ${codeObject.isPrivate !== undefined ? codeObject.isPrivate : 'undefined'}`;
    content += `\n${indentation}**Async:** ${codeObject.isAsync !== undefined ? codeObject.isAsync : 'undefined'}`;

    if (codeObject.functionParameters && codeObject.functionParameters.length > 0) {
        content += `\n${indentation}**Function Parameters:**`;
        codeObject.functionParameters.forEach(param => {
            content += `\n${indentation}- **${param.name}** (${param.type}): ${param.description} \n Example: ${param.example}`;
        });
    }

    if (codeObject.functionReturns) {
        content += `\n${indentation}**Function Returns:**`;
        content += `\n${indentation}- **Type:** ${codeObject.functionReturns.type}`;
        content += `\n${indentation}- **Description:** ${codeObject.functionReturns.description}`;
        content += `\n${indentation}- **Example:** ${codeObject.functionReturns.example}`;
    }

    if (codeObject.subObjects && codeObject.subObjects.length > 0) {
        content += `\n${indentation}**Sub Objects:**`;
        codeObject.subObjects.forEach(subObj => {
            content += generateCodeObjectContent(subObj, indent + 1);
        });
    }

    return content;
}

export async function generateDocumentation(folderPath: string, projectContext: ProjectSummary | null = null, jsonFile?: string): Promise<boolean> {

    if (!fs.existsSync(folderPath)) {
        try {
            fs.mkdirSync(folderPath, {
                recursive: true
            });
        } catch (err) {
            console.error(err);
            console.log("Using Backup Directory");

            if (!fs.existsSync(backupDirectory)) {
                fs.mkdirSync(backupDirectory, {
                    recursive: true
                });
            }

            if (!fs.existsSync(backupDirectory)) {
                console.error("Backup Directory does not exist. We could not make it!");
                return false;
            }

            folderPath = backupDirectory;
        }
    }

    // Check to make sure the filepath is writeable before proceeding
    try {
        fs.accessSync(folderPath, fs.constants.W_OK);
    } catch (err) {
        console.error(`Cannot write to ${folderPath}. Please check the path and try again.`);
        return false;
    }



    // Save projectContext to a JSON file
    if (!jsonFile) {

        const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
        const model= process.env.LLM_TO_USE || 'ml';
        const projectContextPath = path.join(folderPath, `projectContext-${timeStamp}-${model}.json`);
        jsonFile = projectContextPath;

        try {
            fs.writeFileSync(jsonFile, JSON.stringify(projectContext, null, 4));
        } catch (err) {
            console.error(`Error writing project context to ${projectContextPath}`);
        }
    } else {
        const projectContextPath = jsonFile;

        if (!projectContext) {
            try {
                projectContext = JSON.parse(fs.readFileSync(projectContextPath, 'utf-8')) as ProjectSummary;
            } catch (err) {
                console.error(`Error reading project context from ${projectContextPath}`);
            }
        }
    }

    // parse the context file, etc.
    if (!projectContext) {
        console.error(`Error generating MD file. Project context is empty.`);
        return false;
    }
    jsonToMarkdown(projectContext, folderPath);

    return true;
}