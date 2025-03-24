import { CodeObject, ProjectSummary, CodeObjectType, fofoMermaidChart, chartPNG } from "./objectSchemas";
import fs from 'fs';
import path from 'path';
import "dotenv/config";
import { base64ToPngFile, cleanBackticks, escapeStringForMD, makeOSpathFriendly } from "./shared";
import showdown from 'showdown';
import "./logger";
import {generateMermaidCharts, createPNGfromMermaidCharts} from "./generateMermaid";


const backupDirectory = path.join(__dirname, 'backup');

async function jsonToMarkdown(projectSummary: ProjectSummary, outputFolder: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const projectFolder = path.join(outputFolder, `${projectSummary.projectName}-${timestamp}`);
    fs.mkdirSync(projectFolder, { recursive: true });

    const toc: string[] = [];

    
    toc.push(`# Project | ${escapeStringForMD(projectSummary.projectName)}`);
    toc.push(`\n## Project Description\n${escapeStringForMD(projectSummary.projectDescription.goal)}`);
    toc.push(`\n## Tech Stack Description\n${escapeStringForMD(projectSummary.projectTechStackDescription)}`);
    toc.push(`\n## Features and Functions\n${escapeStringForMD(projectSummary.projectDescription.features_functions)}`);

    // Build out our flow chart PNGs
    const makeShortDescriptionFilePathFriendly = (shortDescription: string) => {
        return shortDescription.replace(/[^a-zA-Z0-9]/g, '-');
    }
    
    // Write out the PNGs to the project folder
    fs.mkdirSync(path.join(projectFolder, 'flow-charts'), { recursive: true });
    toc.push(`\n## Diagrams - Flow Charts\n`);
    toc.push(`Here are some helpful visuals to help you understand the project:\n`);
    for (const png of projectSummary.chartPNGs || []) {
        const fileName = `${makeShortDescriptionFilePathFriendly(png.chartData.shortDescription)}.png`;
        const filePath = path.join(projectFolder, 'flow-charts', fileName);
        // Write out the PNG to the project folder
        try{ 
            await base64ToPngFile(png.base64PNG, filePath);
            toc.push(`### ${png.chartData.shortDescription}\n`);
            toc.push(`![${png.chartData.shortDescription}](./flow-charts/${fileName})\n`);
            toc.push(`\n[${png.chartData.shortDescription}](./flow-charts/${fileName})\n`);
            toc.push(`Full Description: \n${png.chartData.longDescription}\n`);
        } catch (err) {
            console.log("Error writing", filePath, err);
        }
    }
    
    // List out dependencies:
    toc.push(`\n## Project Dependencies / Modules:`);
    // Ensure projectDependencies exists before trying to iterate through it
    if (Array.isArray(projectSummary.projectDependencies) && projectSummary.projectDependencies.length > 0) {
        projectSummary.projectDependencies.forEach(dep => {
            if (dep && dep.name) {
                toc.push(`  - ${escapeStringForMD(dep.name)} - ${escapeStringForMD(dep.version || 'N/A')}`);
            }
        });
    } else {
        toc.push(`  - No dependencies found or specified`);
    }

    // Process Code Files
    toc.push(`\n## Table of Contents - Project Files\n`);

    projectSummary.codeFiles.forEach(file => {
        const fileName = `${file.fileName}.md`;
        const filePath = path.join(projectFolder, fileName);
        toc.push(`\n- [${file.fileName}](./${fileName})`);

        let fileContent = `[Back to Readme](./README.md)\n\n`; 

        fileContent += `# ${file.fileName} - ${projectSummary.projectName}\n`;
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

        interface dupObj {
            name?: string;
            content?: string;
            type: CodeObjectType;
        }

        interface dupTrack {
            classes: dupObj[];
            functions: dupObj[];
            variables: dupObj[];
            types: dupObj[];
            comments: dupObj[];
            imports: dupObj[];
            exports: dupObj[];
            interfaces: dupObj[];
        }

        const duplicateTracking: dupTrack = {
            classes: [],
            functions: [],
            variables: [],
            types: [],
            comments: [],
            imports: [],
            exports: [],
            interfaces: []
        };

        const duplicateCheck = (obj: CodeObject, type: CodeObjectType): boolean => {
            const objName = obj.name;
            const objContent = obj.codeSnippet;
            const objType = obj.type;

            if ((objName || objContent) && objType) {
                const dupObj = {
                    name: objName,
                    content: objContent,
                    type: objType
                };

                // Check to see if the object already exists in the duplicate tracking
                let bFound = false;
                for (const [section, content] of Object.entries(duplicateTracking)) {
                    const contentObj = content as dupObj[];

                    // If the same name and the same type, we will go ahead and omit it
                    const found = contentObj.find((item) => (item.name === objName || item.content === objContent) && item.type === objType);

                    if (typeof found !== 'undefined') {
                        bFound = true;
                        break;
                    }
                }

                if (bFound === true) {
                    return true;
                }

                switch (type) {
                    case 'class':
                        duplicateTracking.classes.push(dupObj);
                        break;
                    case 'function':
                        duplicateTracking.functions.push(dupObj);
                        break;
                    case 'variable':
                        duplicateTracking.variables.push(dupObj);
                        break;
                    case 'type':
                        duplicateTracking.types.push(dupObj);
                        break;
                    // case 'comment':
                    //     duplicateTracking.comments.push(dupObj);
                    //     break;
                    case 'import':
                        duplicateTracking.imports.push(dupObj);
                        break;
                    case 'export':
                        duplicateTracking.exports.push(dupObj);
                        break;
                    case 'interface':
                        duplicateTracking.interfaces.push(dupObj);
                        break;
                    default:
                        break;
                }

                return false;
            }

            return false;
        };

        if (typeof file.codeObjects !== 'undefined' || file.codeObjects) {
        Object.keys(file.codeObjects).forEach(key => {
            const baseObject = file.codeObjects as any;
            const obj = baseObject[key] as any[];
            if (obj) {
                obj.forEach((codeObject: CodeObject) => {

                    if (duplicateCheck(codeObject, codeObject.type) === true) {
                        console.warn(`Duplicate object found: ${codeObject.name}`);
                        return;
                    }
    
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
            }

        });
    }

        for (const [section, content] of Object.entries(sectionContent)) {
            if (content) {
                const sectionString = `${section}`
                const sectionTitle = `## ${sectionString}`;
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



    if ( projectSummary.projectDependencies && projectSummary.projectDependencies.length > 0) {
        toc.push(`\n## Project/Team Context\n${escapeStringForMD(projectSummary.teamContext)}`);
    }
    

    // Write TOC
    const tocPath = path.join(projectFolder, 'README.md');
    fs.writeFileSync(tocPath, toc.join('\n'));
    // return toc.join('\n');
}

function markdownToHTML(projectFolder: string) {

// Initialize showdown converter
const converter = new showdown.Converter();

const convertDat = (markdown: string) => {
    // Convert Markdown to HTML
    const html = converter.makeHtml(markdown);
    return html;
}

// For all markdown files in the project folder, convert to HTML, including subfolders
const walkSync = (dir: string, filelist: string[] = []) => {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach((file) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        } else {
            if (file.endsWith('.md')) {
                filelist.push(path.join(dir, file));
            }
        }
    });
    return filelist;
};

const markdownFiles = walkSync(projectFolder);

markdownFiles.forEach((file) => {
    const markdown = fs.readFileSync(file, 'utf-8');
    const html = convertDat(markdown);
    const htmlFile = file.replace('.md', '.html');
    fs.writeFileSync(htmlFile, html);
});



}

function generateCodeObjectContent(codeObject: CodeObject, indent: number): string {
    const indentation = '  '.repeat(indent);
    const fancyBar = '---'.repeat(20);
    const emoji = getEmoji(codeObject.type);

    let content = `\n\n${indentation}### ${emoji} ${escapeStringForMD(codeObject.name) || 'Other Details'} - ${(escapeStringForMD(codeObject.type) || 'Undefined').toUpperCase()}`;
    content += `\n${fancyBar}`;
    content += `\n**Description:** ${escapeStringForMD(codeObject.description) || 'undefined'}`;

    if (codeObject.codeSnippet && codeObject.codeSnippet.length > 0) {
        content += `\n\n**Code Snippet:**\n${cleanBackticks(codeObject.codeSnippet).includes('\`') ? "" : "\`\`\`"}\n${cleanBackticks(codeObject.codeSnippet)}\n${cleanBackticks(codeObject.codeSnippet).includes('\`') ? "" : "\`\`\`"}`;
    }
    content += `\n${indentation}- **Line:** ${(codeObject.codeLine !== undefined && codeObject.codeLine !== -1 && codeObject.codeLine !== -2) ? codeObject.codeLine : 'Could Not Verify Line'}`;
    content += `\n${indentation}- **Location:** ${codeObject.fileName || 'undefined'} (${codeObject.fileLocation || 'Unable to Load'})`;
    content += `\n${indentation}- **Exported:** ${codeObject.isExported !== undefined ? codeObject.isExported : 'Could Not Determine'}`;
    content += `\n${indentation}- **Private:** ${codeObject.isPrivate !== undefined ? codeObject.isPrivate : 'Could Not Determine'}`;
  

    if (codeObject.type === 'function' && codeObject.isAsync !== undefined) {
        content += `\n${indentation}- **Async:** ${codeObject.isAsync !== undefined ? codeObject.isAsync : 'Could Not Determine'}\n\n`;
    }

    if (codeObject.functionParameters && codeObject.functionParameters.length > 0) {

        content += `\n${indentation}###### Function Parameters:`;
        codeObject.functionParameters.forEach(param => {
            content += `\n${indentation}- **${escapeStringForMD(param.name)}** (${escapeStringForMD(param.type)}): ${escapeStringForMD(param.description)} \n Example: ${escapeStringForMD(param.example)}`;
        });
    }

    if (codeObject.functionReturns) {
        content += `\n${indentation}###### Function Returns:`;
        content += `\n${indentation}- **Type:** ${escapeStringForMD(codeObject.functionReturns.type)}`;
        content += `\n${indentation}- **Description:** ${escapeStringForMD(codeObject.functionReturns.description)}`;
        content += `\n${indentation}- **Example:** ${escapeStringForMD(codeObject.functionReturns.example)}`;
    }

    if (codeObject.annotation) {
        content += `\n${indentation}###### Annotations / Comments:`;

        const annotation = codeObject.annotation;

        if (annotation.purpose && annotation.purpose.length > 0) {
            content += `\n${indentation}- **Purpose:** ${escapeStringForMD(annotation.purpose)}`;
        }

        if (annotation.parameters && annotation.parameters.length > 0) {
            content += `\n${indentation}- **Parameters:** ${escapeStringForMD(annotation.parameters)}`;
        }

        if (annotation.returns && annotation.returns.length > 0) {
            content += `\n${indentation}- **Returns:** ${escapeStringForMD(annotation.returns)}`;
        }

        if (annotation.usageExample && annotation.usageExample.length > 0) {
            content += `\n${indentation}- **Usage Example:** \n${cleanBackticks(annotation.usageExample).includes('\`') ? "" : "\`\`\`"}\n${cleanBackticks(annotation.usageExample)}\n${cleanBackticks(annotation.usageExample).includes('\`') ? "" : "\`\`\`"}`;
        }

        if (annotation.edgeCases && annotation.edgeCases.length > 0) {
            content += `\n${indentation}- **Edge Cases:** ${escapeStringForMD(annotation.edgeCases)}`;
        }

        if (annotation.dependencies && annotation.dependencies.length > 0) {
            content += `\n${indentation}- **Dependencies:** ${escapeStringForMD(annotation.dependencies)}`;
        }
    } 

    if (codeObject.subObjects && codeObject.subObjects.length > 0) {
        content += `\n${indentation}###### Sub Objects:`;
        codeObject.subObjects.forEach(subObj => {
            content += generateCodeObjectContent(subObj, indent + 1);
        });
    }

    return content;
}

function getEmoji(type: string | undefined): string {
    // Handle undefined or null type
    if (!type) {
        return '📄'; // Default emoji for undefined types
    }
    
    type = type.toLowerCase();
    if (type === 'classes' || type === 'class') {
        return '📘';
    } else if (type === 'functions' || type === 'function') {
        return '🔧';
    } else if (type === 'variables' || type === 'variable') {
        return '🧮';
    } else if (type === 'types' || type === 'type') {
        return '🏷️';
    } else if (type === 'comments' || type === 'comment') {
        return '💬';
    } else if (type === 'imports' || type === 'import') {
        return '📥';
    } else if (type === 'exports' || type === 'export') {
        return '📤';
    } else if (type === 'interfaces' || type === 'interface') {
        return '🌉';
    } else {
        return '📦';
    }
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
        const model = process.env.LLM_TO_USE || 'ml';
        const projectContextPath = path.join(path.resolve(folderPath), `${makeOSpathFriendly(projectContext?.projectName || '')}-${timeStamp}-${model}.json`);
        jsonFile = projectContextPath;

        console.log(`Original Path ${folderPath}`);
        console.log(`Writing project context to ${projectContextPath}`)

        // if (folderPath.startsWith("./") || folderPath.startsWith("../") || folderPath.startsWith(".\\") || folderPath.startsWith("..\\")) {
        //     folderPath = path.resolve(folderPath);
        // }

        try {
            fs.writeFileSync(jsonFile, JSON.stringify(projectContext, null, 4));
        } catch (err) {
            console.error(err)
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

    // OKIE DOKES, IF WE got this far we can go ahead and also generate our charts using mermaid, etc.!
    projectContext.mermaidCharts = await generateMermaidCharts(projectContext);

    // Convert all of our charts to PNGs using mermaid
    projectContext.chartPNGs = await createPNGfromMermaidCharts(projectContext.mermaidCharts);

    await jsonToMarkdown(projectContext, folderPath);

    // Convert markdown to HTML
    markdownToHTML(folderPath);

    return true;
}
