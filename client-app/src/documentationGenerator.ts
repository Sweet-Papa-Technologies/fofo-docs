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
    toc.push(`\n## Project Description\n${projectSummary.projectDescription.goal}`);
    toc.push(`\n## Features and Functions\n${projectSummary.projectDescription.features_functions}`);
    toc.push(`\n## Team Context\n${projectSummary.teamContext}`);
    toc.push(`\n## Table of Contents\n`);

    // Process Code Files
    projectSummary.codeFiles.forEach(file => {
        const fileName = `${file.fileName}.md`;
        const filePath = path.join(projectFolder, fileName);
        toc.push(`\n- [${file.fileName}](./${fileName})`);

        let fileContent = `# ${file.fileName}\n`;
        fileContent += `\n**Summary:** ${file.codeSummary.goal}\n`;
        fileContent += `\n- **File Location:** ${file.fileLocation}`;
        fileContent += `\n- **Language:** ${file.language}`;
        fileContent += `\n## Table of Contents\n`;

        const sectionLinks: string[] = [];

        const sectionContent = {
            classes: '',
            functions: '',
            variables: '',
            types: '',
            comments: '',
            imports: '',
            exports: '',
            interfaces: ''
        };

        Object.keys(file.codeObjects).forEach(key => {
            const baseObject = file.codeObjects as any;
            const obj = baseObject[key] as any[];
            console.log(obj)
            obj.forEach((codeObject: CodeObject) => {
                const content = generateCodeObjectContent(codeObject, 0);
                switch (codeObject.type) {
                    case 'class':
                        sectionContent.classes += content;
                        break;
                    case 'function':
                        sectionContent.functions += content;
                        break;
                    case 'variable':
                        sectionContent.variables += content;
                        break;
                    case 'type':
                        sectionContent.types += content;
                        break;
                    // case 'comment':
                    //     sectionContent.comments += content;
                    //     break;
                    case 'import':
                        sectionContent.imports += content;
                        break;
                    case 'export':
                        sectionContent.exports += content;
                        break;
                    case 'interface':
                        sectionContent.interfaces += content;
                        break;
                    default:
                        break;
                }
            });
        });

        for (const [section, content] of Object.entries(sectionContent)) {
            if (content) {
                const emoji = getEmoji(section);
                const sectionString = `${section}`
                const sectionTitle = `## ${sectionString}\n${emoji} **${sectionString.toUpperCase()}**`;
                fileContent += `${sectionTitle}\n${content}\n`;
                sectionLinks.push(`- [${sectionString}](#${sectionString})`);
            }
        }

        fileContent = fileContent.replace('## Table of Contents\n', `## Table of Contents\n${sectionLinks.join('\n')}\n`);

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

    let content = `\n${indentation}### ${codeObject.name || 'Other Details'} - [${(codeObject.type || 'Undefined').toUpperCase()}]`;
    content += `\n${indentation}- **Description:** ${codeObject.description || 'undefined'}`;
    content += `\n${indentation}- **Line:** ${codeObject.codeLine !== undefined ? codeObject.codeLine : 'undefined'}`;
    content += `\n${indentation}- **Indent:** ${codeObject.codeIndent !== undefined ? codeObject.codeIndent : 'undefined'}`;
    content += `\n${indentation}- **Location:** ${codeObject.fileName || 'undefined'} (${codeObject.fileLocation || 'undefined'})`;
    content += `\n${indentation}- **Exported:** ${codeObject.isExported !== undefined ? codeObject.isExported : 'Not Available'}`;
    content += `\n${indentation}- **Private:** ${codeObject.isPrivate !== undefined ? codeObject.isPrivate : 'Not Available'}`;
    content += `\n${indentation}- **Async:** ${codeObject.isAsync !== undefined ? codeObject.isAsync : 'Not Available'}\n\n`;
    content += `\n${indentation}**Code Snippet:**\n\`\`\`\n${codeObject.codeSnippet || codeObject.content}\n\`\`\``;

    if (codeObject.functionParameters && codeObject.functionParameters.length > 0) {
        content += `\n${indentation}###### Function Parameters:`;
        codeObject.functionParameters.forEach(param => {
            content += `\n${indentation}- **${param.name}** (${param.type}): ${param.description} \n Example: ${param.example}`;
        });
    }

    if (codeObject.functionReturns) {
        content += `\n${indentation}###### Function Returns:`;
        content += `\n${indentation}- **Type:** ${codeObject.functionReturns.type}`;
        content += `\n${indentation}- **Description:** ${codeObject.functionReturns.description}`;
        content += `\n${indentation}- **Example:** ${codeObject.functionReturns.example}`;
    }

    if (codeObject.subObjects && codeObject.subObjects.length > 0) {
        content += `\n${indentation}###### Sub Objects:`;
        codeObject.subObjects.forEach(subObj => {
            content += generateCodeObjectContent(subObj, indent + 1);
        });
    }

    return content;
}

function getEmoji(type: string): string {
    switch (type) {
        case 'classes':
            return '📘';
        case 'functions':
            return '🔧';
        case 'variables':
            return '🧮';
        case 'types':
            return '🏷️';
        case 'comments':
            return '💬';
        case 'imports':
            return '📥';
        case 'exports':
            return '📤';
        case 'interfaces':
            return '🌉';
        default:
            return '';
    }
}

function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase + string.slice(1);
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