import { CodeObject, ProjectSummary, CodeObjectType, fofoMermaidChart, chartPNG, CodeFileSummary } from "./objectSchemas";
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
            // Removed duplicate link
            toc.push(`**Full Description:** ${png.chartData.longDescription}\n`);
        } catch (err) {
            console.log("Error writing", filePath, err);
        }
    }
    
    // List out dependencies:
    toc.push(`\n## Project Dependencies / Modules:`);
    if (projectSummary.projectDependencies && Object.keys(projectSummary.projectDependencies).length > 0) {
        for (const depType in projectSummary.projectDependencies) {
            const dependencies = projectSummary.projectDependencies[depType];
            if (dependencies && dependencies.length > 0) {
                // Create a more readable header, e.g., "Dev Dependencies" from "devDependencies"
                const typeHeader = depType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                toc.push(`\n### ${escapeStringForMD(typeHeader)}`);
                dependencies.forEach((dep: import("./objectSchemas").moduleObject) => { // Typed dep
                    if (dep && dep.name) {
                        let depLine = `  - **${escapeStringForMD(dep.name)}** (${escapeStringForMD(dep.version || 'latest')})`;
                        // Check if description is meaningful before appending
                        if (dep.description && dep.description.trim() !== '' && !dep.description.toLowerCase().startsWith('n/a')) {
                            depLine += ` - ${escapeStringForMD(dep.description)}`;
                        }
                        toc.push(depLine);
                    }
                });
            }
        }
    } else {
        toc.push(`  - No dependencies found or specified.`);
        // Fallback: Try to extract from package.json if projectDependencies is empty or not structured as expected
        const packageJsonPath = path.join(projectSummary.projectLocation, 'package.json');
        try {
            if (fs.existsSync(packageJsonPath)) {
                const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                const mainDependencies = packageData.dependencies;
                const devDependencies = packageData.devDependencies;

                if (mainDependencies && Object.keys(mainDependencies).length > 0) {
                    toc.push(`\n### Dependencies (from package.json)`);
                    Object.entries(mainDependencies).forEach(([name, version]) => {
                        toc.push(`  - **${escapeStringForMD(name)}** (${escapeStringForMD(version as string)})`);
                    });
                }
                if (devDependencies && Object.keys(devDependencies).length > 0) {
                    toc.push(`\n### Dev Dependencies (from package.json)`);
                    Object.entries(devDependencies).forEach(([name, version]) => {
                        toc.push(`  - **${escapeStringForMD(name)}** (${escapeStringForMD(version as string)})`);
                    });
                }
                if ((!mainDependencies || Object.keys(mainDependencies).length === 0) && (!devDependencies || Object.keys(devDependencies).length === 0)) {
                     toc.push(`  - No dependencies listed in package.json.`);
                }
            } else {
                // Already covered by "No dependencies found or specified" if primary method fails.
            }
        } catch (err) {
            console.warn("Error loading dependencies from package.json as fallback:", err);
            // toc.push(`  - Error parsing package.json for fallback dependencies.`); // Avoid redundant messages
        }
    }

    // Process Code Files
    toc.push(`\n## Table of Contents - Project Files\n`);
    
    // Group files by directories for better organization
    const filesByDirectory: Record<string, CodeFileSummary[]> = {};
    projectSummary.codeFiles.forEach(file => {
        const dirPath = path.dirname(file.fileLocation);
        if (!filesByDirectory[dirPath]) {
            filesByDirectory[dirPath] = [];
        }
        filesByDirectory[dirPath].push(file);
    });
    
    // Add file navigation with hierarchy
    if (Object.keys(filesByDirectory).length > 1) {
        // If we have multiple directories, show organized structure
        Object.entries(filesByDirectory).forEach(([dir, files]) => {
            const dirName = path.basename(dir);
            toc.push(`\n### ${dirName}/`);
            files.forEach(file => {
                const fileName = `${file.fileName}.md`;
                toc.push(`- [${file.fileName}](./${fileName})`);
            });
        });
    }

    projectSummary.codeFiles.forEach(file => {
        const fileName = `${file.fileName}.md`;
        const filePath = path.join(projectFolder, fileName);
        toc.push(`\n- [${escapeStringForMD(file.fileName)}](./${fileName})`);

        let fileContent = `[Back to Readme](./README.md)\n\n`; 

        fileContent += `# ${escapeStringForMD(file.fileName)} - ${escapeStringForMD(projectSummary.projectName)}\n`;
        fileContent += `\n- **File Location:** ${escapeStringForMD(file.fileLocation)}`;
        fileContent += `\n- **Language:** ${escapeStringForMD(file.language)}`;
        fileContent += `\n- **Processing Status:** ${escapeStringForMD(file.processingStatus)}`;
        if (file.processingError) {
            fileContent += `\n- **Processing Error:** ${escapeStringForMD(file.processingError)}`;
        }

        fileContent += `\n\n## Summary\n`;
        if (file.processingStatus === 'success') {
            fileContent += `${escapeStringForMD(file.codeSummary?.goal || 'Goal not provided.')}\n`;
            if (file.codeSummary?.features_functions) {
                fileContent += `\n### Key Functionality\n${escapeStringForMD(file.codeSummary.features_functions)}\n`;
            }
        } else {
            fileContent += `Summary not available. Status: ${escapeStringForMD(file.processingStatus)}.`;
            if (file.processingError) {
                fileContent += ` Reason: ${escapeStringForMD(file.processingError)}`;
            }
            fileContent += "\n";
        }

        // Add enhanced file information based on file type (only if successfully processed)
        if (file.processingStatus === 'success') {
            const isTestFile = file.fileName.includes('.test.') || file.fileName.includes('.spec.') ||
                              file.fileLocation.includes('/test/') || file.fileLocation.includes('/tests/');

            if (isTestFile) {
                fileContent += `\n- **Type:** Test File`;
                fileContent += `\n\n## Test Summary\n`;
                fileContent += `This file contains tests for validating the functionality of the application.\n`;

                // Key Functionality for test files might be the overview of tests.
                // This was previously under 'if (file.codeSummary && file.codeSummary.features_functions)'
                // It's now part of the main summary section if status is 'success'
                // So, we might not need to repeat it unless it's specifically for "Tests Overview"
                // if (file.codeSummary && file.codeSummary.features_functions) {
                //    fileContent += `\n### Tests Overview\n${escapeStringForMD(file.codeSummary.features_functions)}\n`;
                // }
            
                fileContent += `\n### Key Components Being Tested\n`;
            // Extract component names from code objects to list what's being tested
            const testTargets = new Set<string>();
                // Ensure file.codeObjects is an object before trying to iterate over its properties
                if (typeof file.codeObjects === 'object' && file.codeObjects !== null) {
                    Object.values(file.codeObjects).forEach(objArray => {
                        if (Array.isArray(objArray)) {
                            objArray.forEach((obj: CodeObject) => {
                                if (obj.name && (obj.type === 'function' || obj.type === 'method')) {
                                    const name = obj.name.toLowerCase();
                                    if (name.startsWith('test') || name.includes('should') || name.includes('expect')) {
                                        const words = obj.name.split(/(?=[A-Z])|\s|_|(?=\d)/).filter(Boolean);
                                        const targetIndex = words.findIndex((w: string) =>
                                            w.toLowerCase() === 'test' ||
                                            w.toLowerCase() === 'should' ||
                                            w.toLowerCase() === 'expect'
                                        );
                                        if (targetIndex >= 0 && words.length > targetIndex + 1) {
                                            testTargets.add(words.slice(targetIndex + 1).join(' '));
                                        }
                                    }
                                }
                            });
                        }
                    });
                }

                if (testTargets.size > 0) {
                    Array.from(testTargets).forEach(target => {
                        fileContent += `- ${escapeStringForMD(target)}\n`;
                    });
                } else {
                    fileContent += `- Components being tested are not explicitly identified in the test names.\n`;
                }
            }
            // This was part of the original 'else if' for non-test files, already handled by the main summary section if status is 'success'
            // else if (file.codeSummary && file.codeSummary.features_functions) {
            //     fileContent += `\n\n## Key Functionality\n${escapeStringForMD(file.codeSummary.features_functions)}\n`;
            // }
        }
        
        // Only add Table of Contents and detailed code objects if processing was successful
        if (file.processingStatus === 'success') {
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

            // Ensure file.codeObjects is an object before trying to iterate over its properties
            if (typeof file.codeObjects === 'object' && file.codeObjects !== null) {
                Object.keys(file.codeObjects).forEach(key => {
                    const codeObjectArray = (file.codeObjects as any)[key] as CodeObject[];
                    if (Array.isArray(codeObjectArray)) {
                        codeObjectArray.forEach((codeObject: CodeObject) => {
                            if (duplicateCheck(codeObject, codeObject.type) === true) {
                                console.warn(`Duplicate object found: ${codeObject.name || 'Unnamed Object'} in ${file.fileName}`);
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
                    const sectionString = `${section}`;
                    const sectionTitle = `## ${escapeStringForMD(sectionString.charAt(0).toUpperCase() + sectionString.slice(1))}`;
                    fileContent += `\n${sectionTitle}\n${content}\n`;
                    sectionLinks.push(`- [${escapeStringForMD(sectionString.charAt(0).toUpperCase() + sectionString.slice(1))}](#${sectionString.toLowerCase()})`);
                }
            }
            if (sectionLinks.length > 0) {
              fileContent = fileContent.replace('## Table of Contents\n', `## Table of Contents\n${sectionLinks.join('\n')}\n`);
            } else {
              fileContent = fileContent.replace('## Table of Contents\n', '## Table of Contents\nNo code objects identified for table of contents.\n');
            }
        } else {
            // If processingStatus is not 'success', we don't add detailed code objects or TOC for them.
            fileContent = fileContent.replace('## Table of Contents\n', ''); // Remove TOC placeholder if no details are added
        }

        // Make sure the folder path for the file exists
        const fileFolder = path.dirname(filePath);

        try {
            fs.mkdirSync(fileFolder, { recursive: true });
        } catch (err) {
            console.error(`Error creating folder for ${file.fileName}`);
        }

        fs.writeFileSync(filePath, fileContent);
    });



    // Improved Team Context section with better fallback
    if (projectSummary.teamContext && projectSummary.teamContext !== 'N/A') {
        toc.push(`\n## Project/Team Context\n${escapeStringForMD(projectSummary.teamContext)}`);
    } else {
        toc.push(`\n## Project Context\nThis documentation was generated automatically based on code analysis.`);
    }
    
    // Add a Getting Started section with installation instructions
    toc.push(`\n## Getting Started\n`);
    toc.push(`### Installation\n`);
    toc.push(`To install the project dependencies, run:\n`);
    toc.push(`\`\`\`bash\nnpm install\n\`\`\`\n`);
    
    toc.push(`### Usage\n`);
    toc.push(`Please refer to the individual file documentation for specific usage examples.\n`);
    
    // Add File Processing Report to main README
    toc.push(`\n## File Processing Report\n`);
    const successfullyProcessed: string[] = [];
    const emptyFiles: string[] = [];
    const failedFiles: { filePath: string, error: string | null }[] = [];

    projectSummary.codeFiles.forEach(file => {
        switch (file.processingStatus) {
            case 'success':
                successfullyProcessed.push(file.fileLocation);
                break;
            case 'empty':
                emptyFiles.push(`${file.fileLocation} (Reason: ${file.processingError || 'File is empty or contains only whitespace.'})`);
                break;
            case 'error_read':
            case 'error_parse':
            case 'error_llm_summary':
                failedFiles.push({ filePath: file.fileLocation, error: file.processingError });
                break;
        }
    });

    if (successfullyProcessed.length > 0) {
        toc.push(`\n### Successfully Processed Files (${successfullyProcessed.length})\n`);
        successfullyProcessed.forEach(filePath => toc.push(`- ${escapeStringForMD(filePath)}`));
    }

    if (emptyFiles.length > 0) {
        toc.push(`\n### Empty Files (${emptyFiles.length})\n`);
        emptyFiles.forEach(fileInfo => toc.push(`- ${escapeStringForMD(fileInfo)}`));
    }

    if (failedFiles.length > 0) {
        toc.push(`\n### Failed Files (${failedFiles.length})\n`);
        failedFiles.forEach(file => toc.push(`- ${escapeStringForMD(file.filePath)} (Error: ${escapeStringForMD(file.error || 'Unknown error')})`));
    }

    if (successfullyProcessed.length === 0 && emptyFiles.length === 0 && failedFiles.length === 0) {
        toc.push(`\nNo files were processed or found.\n`);
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
    let markdown = fs.readFileSync(file, 'utf-8');
    markdown = markdown.replace(/]\(\.\/README\.md\)/g, '](./README.html)');
    const html = convertDat(markdown);
    const htmlFile = file.replace('.md', '.html');
    fs.writeFileSync(htmlFile, html);
});



}

function generateCodeObjectContent(codeObject: CodeObject, indent: number): string {
    const indentation = '  '.repeat(indent);
    const fancyBar = '---'.repeat(20);
    const emoji = getEmoji(codeObject.type);

    // Detect the language for better syntax highlighting
    let codeLanguage = '';
    if (codeObject.fileName) {
        if (codeObject.fileName.endsWith('.ts') || codeObject.fileName.endsWith('.tsx')) {
            codeLanguage = 'typescript';
        } else if (codeObject.fileName.endsWith('.js') || codeObject.fileName.endsWith('.jsx')) {
            codeLanguage = 'javascript';
        } else if (codeObject.fileName.endsWith('.py')) {
            codeLanguage = 'python';
        } else if (codeObject.fileName.endsWith('.java')) {
            codeLanguage = 'java';
        } else if (codeObject.fileName.endsWith('.html')) {
            codeLanguage = 'html';
        } else if (codeObject.fileName.endsWith('.css')) {
            codeLanguage = 'css';
        }
    }
    
    let content = `\n\n${indentation}### ${emoji} ${escapeStringForMD(codeObject.name) || 'Other Details'} - ${(escapeStringForMD(codeObject.type) || 'Undefined').toUpperCase()}`;
    content += `\n${fancyBar}`;
    content += `\n**Description:** ${escapeStringForMD(codeObject.description) || 'No description available'}`;

    // Improve code snippet display with proper syntax highlighting and formatting
    if (codeObject.codeSnippet && codeObject.codeSnippet.length > 0) {
        const trimmedSnippet = codeObject.codeSnippet.trim();
        
        // Process the snippet to ensure it doesn't contain nested code blocks
        let processedSnippet = trimmedSnippet;
        
        // Determine appropriate fence length to handle backticks in snippet
        const backtickSequences = processedSnippet.match(/`+/g) || [];
        const maxBackticks = backtickSequences.reduce((max, seq) => Math.max(max, seq.length), 0);
        const fenceLength = Math.max(3, maxBackticks + 1);
        const fence = '`'.repeat(fenceLength);

        // Add fencing for code block with proper language tag
        content += `\n\n${indentation}${fence}${codeLanguage}\n${processedSnippet}\n${indentation}${fence}\n`;
    }
    
    // Improve metadata display
    const lineInfo = (codeObject.codeLine !== undefined && codeObject.codeLine !== -1 && codeObject.codeLine !== -2) 
        ? codeObject.codeLine 
        : 'Not specified';
        
    content += `\n${indentation}- **Line:** ${lineInfo}`;
    // Don't duplicate file location in parentheses
    content += `\n${indentation}- **Location:** ${codeObject.fileLocation || 'Unknown'}`;
    
    // Format boolean values more clearly
    const exportedInfo = codeObject.isExported === true ? 'Yes' : 
                       (codeObject.isExported === false ? 'No' : 'Not specified');
    const privateInfo = codeObject.isPrivate === true ? 'Yes' : 
                      (codeObject.isPrivate === false ? 'No' : 'Not specified');
                      
    content += `\n${indentation}- **Exported:** ${exportedInfo}`;
    content += `\n${indentation}- **Private:** ${privateInfo}`;
  

    if (codeObject.type === 'function' && codeObject.isAsync !== undefined) {
        const asyncInfo = codeObject.isAsync === true ? 'Yes' : 
                       (codeObject.isAsync === false ? 'No' : 'Not specified');
        content += `\n${indentation}- **Async:** ${asyncInfo}`;
    }

    // Improve function parameters formatting
    if (codeObject.functionParameters && codeObject.functionParameters.length > 0) {
        content += `\n\n${indentation}###### Function Parameters:`;
        codeObject.functionParameters.forEach(param => {
            const paramName = param.name || 'unnamed';
            const paramType = param.type || 'any';
            const paramDesc = param.description || 'No description provided';
            
            content += `\n${indentation}- **${escapeStringForMD(paramName)}** (${escapeStringForMD(paramType)}): ${escapeStringForMD(paramDesc)}`;
            
            // Only show example if it exists
            if (param.example && param.example.trim()) {
                content += `\n${indentation}  - Example: \`${escapeStringForMD(param.example)}\``;
            }
        });
    } else if (codeObject.type === 'function' || codeObject.type === 'constructor' || codeObject.type === 'method') {
        // Indicate when there are no parameters for functions
        content += `\n\n${indentation}###### Function Parameters: None`;
    }

    // Improve function returns formatting
    if (codeObject.functionReturns) {
        content += `\n\n${indentation}###### Function Returns:`;
        
        // Handle missing properties gracefully
        const returnType = codeObject.functionReturns.type || 'void';
        const returnDesc = codeObject.functionReturns.description || 'No description provided';
        
        content += `\n${indentation}- **Type:** ${escapeStringForMD(returnType)}`;
        content += `\n${indentation}- **Description:** ${escapeStringForMD(returnDesc)}`;
        
        // Only show example if it exists
        if (codeObject.functionReturns.example && codeObject.functionReturns.example.trim()) {
            content += `\n${indentation}- **Example:** \`${escapeStringForMD(codeObject.functionReturns.example)}\``;
        }
    } else if (codeObject.type === 'function' || codeObject.type === 'method') {
        // Indicate when there is no return info for functions
        content += `\n\n${indentation}###### Function Returns: Not specified`;
    }

    if (codeObject.annotation) {
        content += `\n\n${indentation}###### Annotations / Comments:`;

        const annotation = codeObject.annotation;
        let hasAnnotation = false;

        if (annotation.purpose && annotation.purpose.trim().length > 0) {
            content += `\n${indentation}- **Purpose:** ${escapeStringForMD(annotation.purpose)}`;
            hasAnnotation = true;
        }

        // Handle annotation.parameters
        let parametersString = "";
        if (typeof annotation.parameters === 'string') {
            if (annotation.parameters.trim().length > 0 && annotation.parameters.toLowerCase() !== 'none' && annotation.parameters.toLowerCase() !== 'not applicable') {
                parametersString = escapeStringForMD(annotation.parameters);
            }
        } else if (Array.isArray(annotation.parameters) && annotation.parameters.length > 0) {
            parametersString = annotation.parameters.map(p => {
                let paramLine = `- **${escapeStringForMD(p.name || 'unnamed')}**`;
                if (p.type) paramLine += ` (\`${escapeStringForMD(p.type)}\`)`;
                if (p.description) paramLine += `: ${escapeStringForMD(p.description)}`;
                if (p.example) paramLine += ` (e.g., \`${escapeStringForMD(p.example)}\`)`;
                return paramLine;
            }).join(`\n${indentation}  `); // Indent subsequent lines
        }

        if (parametersString.length > 0) {
            content += `\n${indentation}- **Parameters:**\n${indentation}  ${parametersString}`;
            hasAnnotation = true;
        }

        // Handle annotation.returns
        let returnsString = "";
        if (typeof annotation.returns === 'string') {
            if (annotation.returns.trim().length > 0 && annotation.returns.toLowerCase() !== 'none' && annotation.returns.toLowerCase() !== 'not applicable' && annotation.returns.toLowerCase() !== 'void') {
                returnsString = escapeStringForMD(annotation.returns);
            }
        } else if (typeof annotation.returns === 'object' && annotation.returns !== null) {
            let returnLine = `- **Type:** \`${escapeStringForMD(annotation.returns.type || 'void')}\``;
            if (annotation.returns.description) returnLine += `\n${indentation}  - **Description:** ${escapeStringForMD(annotation.returns.description)}`;
            if (annotation.returns.example) returnLine += `\n${indentation}  - **Example:** \`${escapeStringForMD(annotation.returns.example)}\``;
            returnsString = returnLine;
        }

        if (returnsString.length > 0) {
            content += `\n${indentation}- **Returns:**\n${indentation}  ${returnsString}`;
            hasAnnotation = true;
        }

        if (annotation.usageExample && annotation.usageExample.trim().length > 0) {
            // Detect the language for better syntax highlighting
            let exampleLanguage = codeLanguage || 'typescript';
            
            // Determine fence length for usage example
            const exampleBacktickSeq = annotation.usageExample.match(/`+/g) || [];
            const exampleMaxBackticks = exampleBacktickSeq.reduce((max, seq) => Math.max(max, seq.length), 0);
            const exampleFenceLen = Math.max(3, exampleMaxBackticks + 1);
            const exampleFence = '`'.repeat(exampleFenceLen);

            // Add fenced code block for usage example
            content += `\n${indentation}- **Usage Example:**`; 
            content += `\n\n${indentation}${exampleFence}${exampleLanguage}\n${annotation.usageExample}\n${indentation}${exampleFence}\n`;
            hasAnnotation = true;
        }

        if (annotation.edgeCases && annotation.edgeCases.trim().length > 0) {
            content += `\n${indentation}- **Edge Cases:** ${escapeStringForMD(annotation.edgeCases)}`;
            hasAnnotation = true;
        }

        // Standardize handling for annotation.dependencies
        let dependenciesString = ""; // Default to empty string
        if (typeof annotation.dependencies === 'string') {
            dependenciesString = annotation.dependencies;
        } else if (Array.isArray(annotation.dependencies)) {
            dependenciesString = annotation.dependencies.join(', ');
        } else if (annotation.dependencies !== null && annotation.dependencies !== undefined) {
            // If it's some other non-null/undefined type, try to convert to string
            dependenciesString = String(annotation.dependencies);
        }

        if (dependenciesString.trim().length > 0) {
            content += `\n${indentation}- **Dependencies:** ${escapeStringForMD(dependenciesString)}`;
            hasAnnotation = true;
        }
        
        if (annotation.errorHandling && annotation.errorHandling.trim().length > 0) {
            content += `\n${indentation}- **Error Handling:** ${escapeStringForMD(annotation.errorHandling)}`;
            hasAnnotation = true;
        }
        
        if (annotation.performance && annotation.performance.trim().length > 0) {
            content += `\n${indentation}- **Performance:** ${escapeStringForMD(annotation.performance)}`;
            hasAnnotation = true;
        }
        
        if (annotation.bestPractices && annotation.bestPractices.trim().length > 0) {
            content += `\n${indentation}- **Best Practices:** ${escapeStringForMD(annotation.bestPractices)}`;
            hasAnnotation = true;
        }
        
        // If no annotation content was added, provide a note
        if (!hasAnnotation) {
            content += `\n${indentation}- No detailed annotations available`;
        }
    } 

    if (codeObject.subObjects && codeObject.subObjects.length > 0) {
        content += `\n\n${indentation}###### Sub Objects:`;
        
        // Sort sub-objects for more logical presentation
        const sortedSubObjects = [...codeObject.subObjects].sort((a, b) => {
            // Sort by type first (classes, then constructors, then functions, etc)
            const typeOrder: Record<string, number> = { 
                'class': 1, 
                'constructor': 2, 
                'function': 3, 
                'method': 4,
                'variable': 5,
                'interface': 6
            };
            
            const aTypeValue = a.type && typeOrder[a.type] ? typeOrder[a.type] : 99;
            const bTypeValue = b.type && typeOrder[b.type] ? typeOrder[b.type] : 99;
            
            if (aTypeValue !== bTypeValue) {
                return aTypeValue - bTypeValue;
            }
            
            // Then sort alphabetically by name
            return (a.name || '').localeCompare(b.name || '');
        });
        
        sortedSubObjects.forEach(subObj => {
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

        // Enhance the project context with additional information if missing
        if (projectContext) {
            // The teamContext is now populated by extractProjectContext in codeParser.ts,
            // which has its own more specific fallbacks. So, the generic fallback below is removed.
            // if (!projectContext.teamContext || projectContext.teamContext === 'N/A') {
            //     projectContext.teamContext = 'This documentation was automatically generated based on code analysis.'
            // }
            
            // If dependencies are missing, try to extract from package.json
            // If dependencies are missing or not in the new grouped format, try to extract from package.json
            // This check needs to be adapted for the new structure of projectDependencies (object with types)
            const hasGroupedDependencies = projectContext.projectDependencies &&
                                           typeof projectContext.projectDependencies === 'object' &&
                                           Object.keys(projectContext.projectDependencies).length > 0 &&
                                           Object.values(projectContext.projectDependencies).some(group => Array.isArray(group) && group.length > 0);

            if (!hasGroupedDependencies) {
                console.log("Attempting to populate projectDependencies from package.json as it's missing or not in grouped format.");
                projectContext.projectDependencies = {}; // Initialize if not already an object
                try {
                    const packageJsonPath = path.join(projectContext.projectLocation, 'package.json');
                    if (fs.existsSync(packageJsonPath)) {
                        const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                        
                        const parseAndAddDeps = (deps: Record<string, string> | undefined, type: string) => { // Typed deps
                            if (!projectContext) { // Null check for projectContext
                                console.warn(`[parseAndAddDeps] projectContext is null. Skipping processing for ${type}.`);
                                return;
                            }
                            if (deps && typeof deps === 'object') {
                                const depArray = Object.entries(deps).map(([name, version]) => ({
                                    name,
                                    version: version as string,
                                    description: '', // Will be fetched by codeParser logic if run again
                                    type
                                }));
                                if (depArray.length > 0) {
                                    if (!projectContext.projectDependencies[type]) {
                                        projectContext.projectDependencies[type] = [];
                                    }
                                    projectContext.projectDependencies[type]!.push(...depArray);
                                }
                            }
                        };

                        parseAndAddDeps(packageData.dependencies, 'dependencies');
                        parseAndAddDeps(packageData.devDependencies, 'devDependencies');
                        parseAndAddDeps(packageData.peerDependencies, 'peerDependencies');
                        parseAndAddDeps(packageData.optionalDependencies, 'optionalDependencies');
                    }
                } catch (err) {
                    console.warn("Error loading dependencies from package.json during generateDocumentation:", err);
                }
            }
        }

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
