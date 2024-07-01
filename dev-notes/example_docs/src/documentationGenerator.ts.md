# src/documentationGenerator.ts - fofo-docs

**Summary:** The code generates documentation for a project in Markdown and HTML formats. It takes a ProjectSummary object containing project information, code files, and dependencies, and creates a directory structure with Markdown files for each code file and a README.md file for the project overview. It then converts the Markdown files to HTML.

- **File Location:** ./src/documentationGenerator.ts
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


### 📘 jsonToMarkdown - CLASS
------------------------------------------------------------
**Description:** This function takes a ProjectSummary object and an output folder path as input. It generates a Markdown file for each code file in the ProjectSummary object and a README.md file containing a table of contents for the project.

**Code Snippet:**

function jsonToMarkdown(projectSummary: ProjectSummary, outputFolder: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const projectFolder = path.join(outputFolder, `${projectSummary.projectName}-${timestamp}`);
    fs.mkdirSync(projectFolder, { recursive: true });

    const toc: string[] = [];
    
    toc.push(`[Back to Readme](./README.md)\n\n`);
    
    toc.push(`# Project | ${escapeStringForMD(projectSummary.projectName)}`);
    toc.push(`\n## Project Description\n${escapeStringForMD(projectSummary.projectDescription.goal)}`);
    toc.push(`\n## Tech Stack Description\n${escapeStringForMD(projectSummary.projectTechStackDescription)}`);
    toc.push(`\n## Features and Functions\n${escapeStringForMD(projectSummary.projectDescription.features_functions)}`);
    
    // List out dependencies:
    toc.push(`\n## Project Dependencies / Modules:`);
    projectSummary.projectDependencies.forEach(dep => {
        toc.push(`  - ${dep.name} - ${dep.version}`);
    });

    // Process Code Files
    toc.push(`\n## Table of Contents - Project Files\n`);

    projectSummary.codeFiles.forEach(file => {
        const fileName = `${file.fileName}.md`;
        const filePath = path.join(projectFolder, fileName);
        toc.push(`\n- [${file.fileName}](./${fileName})`);

        let fileContent = `# ${file.fileName} - ${projectSummary.projectName}\n`;
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
                fileContent += `${sectionTitle}
${content}
`;
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

- **Line:** Could Not Verify Line
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `jsonToMarkdown` function generates Markdown documentation for a code project based on a provided `ProjectSummary` object. It creates a directory structure with Markdown files for each code file and a README.md file for the project overview.
- **Parameters:** - `projectSummary`: A `ProjectSummary` object containing project information, code files, and dependencies.
- `outputFolder`: The path to the output directory where the Markdown files will be generated.
- **Returns:** The function does not explicitly return a value. It generates Markdown files in the specified output directory.
- **Usage Example:** 


```typescript
// Assuming you have a ProjectSummary object called 'projectSummary'
jsonToMarkdown(projectSummary, './output');
```

- **Edge Cases:** - If the output directory does not exist, the function will create it recursively.
- If duplicate code objects are found, the function will log a warning and omit the duplicate objects from the documentation.
- **Dependencies:** - `fs`: For file system operations (creating directories, writing files).
- `path`: For manipulating file paths.
- `escapeStringForMD`: A utility function for escaping strings for Markdown.

### 📘 markdownToHTML - CLASS
------------------------------------------------------------
**Description:** This function takes a project folder path as input and converts all Markdown files within the folder (including subfolders) to HTML files.

**Code Snippet:**
```
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
```
- **Line:** 237
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `markdownToHTML` function converts all Markdown files within a specified project folder (including subfolders) to HTML files.
- **Parameters:** The function takes one parameter: `projectFolder`, which is a string representing the path to the project folder.
- **Returns:** The function does not explicitly return a value. It modifies the files in the project folder by converting Markdown files to HTML files.
- **Usage Example:** 


```typescript
// Assuming 'myProject' is the path to the project folder
markdownToHTML('myProject');
```

- **Edge Cases:** The function assumes that the `projectFolder` path is valid and that the folder contains Markdown files. If the path is invalid or the folder does not contain Markdown files, the function may not work as expected.
- **Dependencies:** The function depends on the following libraries:
- `showdown`: A Markdown to HTML converter library.
- `fs`: Node.js built-in module for file system operations.

### 📘 generateCodeObjectContent - CLASS
------------------------------------------------------------
**Description:** This function takes a CodeObject and an indentation level as input. It generates a Markdown string representing the CodeObject, including its name, type, description, code snippet, and other relevant details.

**Code Snippet:**

function generateCodeObjectContent(codeObject: CodeObject, indent: number): string {
    const indentation = '  '.repeat(indent);
    const fancyBar = '---'.repeat(20);
    const emoji = getEmoji(codeObject.type);

    let content = `\n\n${indentation}### ${emoji} ${escapeStringForMD(codeObject.name) || 'Other Details'} - ${(escapeStringForMD(codeObject.type) || 'Undefined').toUpperCase()}`;
    content += `\n${fancyBar}`;
    content += `\n**Description:** ${escapeStringForMD(codeObject.description) || 'undefined'}`;

    if (codeObject.codeSnippet && codeObject.codeSnippet.length > 0) {
        content += `\n\n**Code Snippet:**\n${cleanBackticks(codeObject.codeSnippet).includes('`') ? "" : "\`\`\`"}
${cleanBackticks(codeObject.codeSnippet)}
${cleanBackticks(codeObject.codeSnippet).includes('`') ? "" : "\`\`\`"}
`;
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
            content += `\n${indentation}- **Usage Example:** \n${cleanBackticks(annotation.usageExample).includes('`') ? "" : "\`\`\`"}
${cleanBackticks(annotation.usageExample)}
${cleanBackticks(annotation.usageExample).includes('`') ? "" : "\`\`\`"}
`;
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

- **Line:** Could Not Verify Line
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `generateCodeObjectContent` function is responsible for generating a Markdown representation of a `CodeObject`. It takes a `CodeObject` and an indentation level as input and returns a formatted Markdown string.
- **Parameters:** - `codeObject`: A `CodeObject` representing a code element (class, function, variable, etc.)
- `indent`: An integer representing the indentation level for the Markdown output.
- **Returns:** A formatted Markdown string representing the `CodeObject`.
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
  isPrivate: false,
  isAsync: false,
  functionParameters: [
    { name: 'param1', type: 'string', description: 'First parameter', example: 'hello' },
  ],
  functionReturns: { type: 'void', description: 'Returns nothing', example: 'undefined' },
};

const markdownContent = generateCodeObjectContent(codeObject, 0);
console.log(markdownContent);
```

- **Edge Cases:** The function handles cases where the `CodeObject` might have missing or undefined properties. It also handles cases where the code snippet contains backticks, ensuring proper escaping.
- **Dependencies:** - `escapeStringForMD`: A function to escape strings for Markdown.
- `cleanBackticks`: A function to clean backticks in code blocks.

### 📘 getEmoji - CLASS
------------------------------------------------------------
**Description:** This function takes a string representing a code object type and returns the corresponding emoji.

**Code Snippet:**
```
function getEmoji(type: string): string {
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
```
- **Line:** 353
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `getEmoji` function takes a string representing a code object type and returns the corresponding emoji. It maps different code object types to specific emojis, providing a visual representation for each type in the generated documentation.
- **Parameters:** The function accepts a single parameter, `type`, which is a string representing the code object type. The type is expected to be one of the following: 'classes', 'functions', 'variables', 'types', 'comments', 'imports', 'exports', or 'interfaces'.
- **Returns:** The function returns a string representing the emoji corresponding to the provided code object type. If the type is not recognized, it returns a default emoji '📦'.
- **Usage Example:** 


```typescript
const emoji = getEmoji('class'); // Returns '📘'
```

- **Edge Cases:** The function handles cases where the provided type is not recognized by returning a default emoji. It also handles cases where the type is provided in different cases (e.g., 'class' or 'Classes') by converting it to lowercase before comparison.

### 📘 generateDocumentation - CLASS
------------------------------------------------------------
**Description:** This function takes a folder path, an optional ProjectSummary object, and an optional JSON file path as input. It generates documentation for the project based on the provided information.

**Code Snippet:**

export async function generateDocumentation(folderPath: string, projectContext: ProjectSummary | null = null, jsonFile?: string): Promise<boolean> {
    if (!fs.existsSync(folderPath)) {
        try {
            fs.mkdirSync(folderPath, { recursive: true });
        } catch (err) {
            console.error(err);
            console.log("Using Backup Directory");

            if (!fs.existsSync(backupDirectory)) {
                fs.mkdirSync(backupDirectory, { recursive: true });
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
    jsonToMarkdown(projectContext, folderPath);

    // Convert markdown to HTML
    markdownToHTML(folderPath);

    return true;
}

- **Line:** Could Not Verify Line
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `generateDocumentation` function is responsible for generating documentation for a codebase. It takes a folder path, an optional `ProjectSummary` object, and an optional JSON file path as input. The function first checks if the provided folder path exists and creates it if it doesn't. It then checks if the folder path is writeable. If the `jsonFile` parameter is not provided, the function generates a JSON file containing the `ProjectSummary` object in the specified folder. If the `jsonFile` parameter is provided, the function reads the `ProjectSummary` object from the provided JSON file. The function then calls the `jsonToMarkdown` function to convert the `ProjectSummary` object to Markdown format and writes the Markdown files to the specified folder. Finally, the function calls the `markdownToHTML` function to convert the Markdown files to HTML format.
- **Parameters:** - `folderPath`: The path to the folder where the documentation will be generated.
- `projectContext`: An optional `ProjectSummary` object containing information about the project. If not provided, the function will attempt to read the `ProjectSummary` object from the `jsonFile` parameter.
- `jsonFile`: An optional path to a JSON file containing the `ProjectSummary` object. If not provided, the function will generate a JSON file in the specified folder.
- **Returns:** The function returns a boolean value indicating whether the documentation generation was successful.
- **Usage Example:** 


```typescript
// Generate documentation for a project
generateDocumentation('./output', projectSummary);

// Generate documentation from a JSON file
generateDocumentation('./output', null, './projectSummary.json');
```

- **Edge Cases:** - If the provided folder path does not exist, the function will attempt to create it. If the folder cannot be created, the function will return `false`.
- If the provided folder path is not writeable, the function will return `false`.
- If the `jsonFile` parameter is provided but the file does not exist, the function will return `false`.
- If the `projectContext` parameter is not provided and the `jsonFile` parameter is not provided, the function will return `false`.
- **Dependencies:** - `fs`: The `fs` module is used for file system operations, such as checking if a file exists, creating a directory, and writing to a file.
- `path`: The `path` module is used for working with file paths, such as joining paths and resolving paths.
## functions


### 🔧 jsonToMarkdown - FUNCTION
------------------------------------------------------------
**Description:** This function takes a ProjectSummary object and an output folder path as input. It generates a Markdown file for each code file in the ProjectSummary object, and a README.md file containing a table of contents for the project.

**Code Snippet:**

function jsonToMarkdown(projectSummary: ProjectSummary, outputFolder: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const projectFolder = path.join(outputFolder, `${projectSummary.projectName}-${timestamp}`);
    fs.mkdirSync(projectFolder, { recursive: true });

    const toc: string[] = [];
    
    toc.push(`[Back to Readme](./README.md)\n\n`);
    
    toc.push(`# Project | ${escapeStringForMD(projectSummary.projectName)}`);
    toc.push(`\n## Project Description\n${escapeStringForMD(projectSummary.projectDescription.goal)}`);
    toc.push(`\n## Tech Stack Description\n${escapeStringForMD(projectSummary.projectTechStackDescription)}`);
    toc.push(`\n## Features and Functions\n${escapeStringForMD(projectSummary.projectDescription.features_functions)}`);
    
    // List out dependencies:
    toc.push(`\n## Project Dependencies / Modules:`);
    projectSummary.projectDependencies.forEach(dep => {
        toc.push(`  - ${dep.name} - ${dep.version}`);
    });

    // Process Code Files
    toc.push(`\n## Table of Contents - Project Files\n`);

    projectSummary.codeFiles.forEach(file => {
        const fileName = `${file.fileName}.md`;
        const filePath = path.join(projectFolder, fileName);
        toc.push(`\n- [${file.fileName}](./${fileName})`);

        let fileContent = `# ${file.fileName} - ${projectSummary.projectName}\n`;
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
                fileContent += `${sectionTitle}
${content}
`;
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

- **Line:** Could Not Verify Line
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **projectSummary** (ProjectSummary): An object containing information about the project, including the project name, description, dependencies, and code files. 
 Example: N/A
- **outputFolder** (string): The path to the folder where the documentation will be generated. 
 Example: N/A
###### Function Returns:
- **Type:** undefined
- **Description:** This function does not return a value.
- **Example:** N/A
###### Annotations / Comments:
- **Purpose:** The `jsonToMarkdown` function generates Markdown documentation for a code project based on a provided `ProjectSummary` object. It creates a directory structure with Markdown files for each code file and a README.md file for the project overview.
- **Parameters:** - `projectSummary`: A `ProjectSummary` object containing information about the project, including the project name, description, dependencies, and code files.
- `outputFolder`: The path to the folder where the documentation will be generated.
- **Returns:** This function does not return a value.
- **Usage Example:** 


```typescript
const projectSummary = { ... }; // Your ProjectSummary object
const outputFolder = './docs'; // Path to your output folder
jsonToMarkdown(projectSummary, outputFolder);
```

- **Edge Cases:** - If the `ProjectSummary` object is invalid or missing, the function will throw an error.
- If the output folder path is invalid or inaccessible, the function will throw an error.
- **Dependencies:** - `fs`: Node.js module for file system operations.
- `path`: Node.js module for working with file paths.
- `showdown`: A Markdown to HTML converter library.

### 🔧 markdownToHTML - FUNCTION
------------------------------------------------------------
**Description:** This function takes a project folder path as input and converts all Markdown files in the folder to HTML files.

**Code Snippet:**
```
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
```
- **Line:** 237
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **projectFolder** (string): The path to the project folder containing the Markdown files. 
 Example: N/A
###### Function Returns:
- **Type:** undefined
- **Description:** This function does not return a value.
- **Example:** N/A
###### Annotations / Comments:
- **Purpose:** The `markdownToHTML` function converts all Markdown files within a specified project folder to their corresponding HTML files. It utilizes the Showdown library to perform the Markdown-to-HTML conversion.
- **Parameters:** The function accepts a single parameter, `projectFolder`, which is a string representing the path to the project folder containing the Markdown files.
- **Returns:** The function does not explicitly return a value. It modifies the files in the project folder by converting Markdown files to HTML files.
- **Usage Example:** 


```typescript
// Assuming 'myProject' is the path to the project folder
markdownToHTML('myProject');
```

- **Edge Cases:** The function assumes that the project folder contains Markdown files with the '.md' extension. It does not handle other file types or nested folders within the project folder.
- **Dependencies:** The function relies on the following dependencies:
- `fs` (Node.js file system module)
- `path` (Node.js path module)
- `showdown` (Showdown library for Markdown-to-HTML conversion)

### 🔧 generateCodeObjectContent - FUNCTION
------------------------------------------------------------
**Description:** This function takes a CodeObject and an indentation level as input. It generates a Markdown string representing the CodeObject, including its name, type, description, code snippet, and annotations.

**Code Snippet:**

function generateCodeObjectContent(codeObject: CodeObject, indent: number): string {
    const indentation = '  '.repeat(indent);
    const fancyBar = '---'.repeat(20);
    const emoji = getEmoji(codeObject.type);

    let content = `\n\n${indentation}### ${emoji} ${escapeStringForMD(codeObject.name) || 'Other Details'} - ${(escapeStringForMD(codeObject.type) || 'Undefined').toUpperCase()}`;
    content += `\n${fancyBar}`;
    content += `\n**Description:** ${escapeStringForMD(codeObject.description) || 'undefined'}`;

    if (codeObject.codeSnippet && codeObject.codeSnippet.length > 0) {
        content += `\n\n**Code Snippet:**\n${cleanBackticks(codeObject.codeSnippet).includes('\`') ? "" : "\`\`\`"}
${cleanBackticks(codeObject.codeSnippet)}
${cleanBackticks(codeObject.codeSnippet).includes('\`') ? "" : "\`\`\`"}
`;
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
            content += `\n${indentation}- **Usage Example:** \n${cleanBackticks(annotation.usageExample).includes('\`') ? "" : "\`\`\`"}
${cleanBackticks(annotation.usageExample)}
${cleanBackticks(annotation.usageExample).includes('\`') ? "" : "\`\`\`"}
`;
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

- **Line:** Could Not Verify Line
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **codeObject** (CodeObject): An object representing a code object, such as a class, function, or variable. 
 Example: N/A
- **indent** (number): The indentation level for the Markdown string. 
 Example: N/A
###### Function Returns:
- **Type:** string
- **Description:** A Markdown string representing the CodeObject.
- **Example:** N/A
###### Annotations / Comments:
- **Purpose:** The `generateCodeObjectContent` function takes a `CodeObject` and an `indent` level as input and generates a Markdown string representing the `CodeObject`. This string includes the object's name, type, description, code snippet, and annotations.
- **Parameters:** - `codeObject`: An object representing a code object, such as a class, function, or variable.
- `indent`: The indentation level for the Markdown string.
- **Returns:** A Markdown string representing the `CodeObject`.
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
  isPrivate: false,
  isAsync: false,
  functionParameters: [],
  functionReturns: { type: 'string', description: 'Returns a string', example: 'Hello' },
  annotation: { purpose: 'This function does something' }
};

const markdownContent = generateCodeObjectContent(codeObject, 2);
console.log(markdownContent);
```

- **Edge Cases:** N/A
- **Dependencies:** - `escapeStringForMD`: Escapes backticks in strings for Markdown.
- `cleanBackticks`: Removes backticks from strings.

### 🔧 getEmoji - FUNCTION
------------------------------------------------------------
**Description:** This function takes a code object type as input and returns the corresponding emoji.

**Code Snippet:**
```
function getEmoji(type: string): string {
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
```
- **Line:** 353
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **type** (string): The type of the code object, such as 'class', 'function', or 'variable'. 
 Example: N/A
###### Function Returns:
- **Type:** string
- **Description:** The emoji corresponding to the code object type.
- **Example:** N/A
###### Annotations / Comments:
- **Purpose:** The `getEmoji` function takes a string representing a code object type as input and returns the corresponding emoji. It uses a series of `if` and `else if` statements to check the input string against various code object types and return the appropriate emoji.
- **Parameters:** The function takes one parameter: `type` (string). This parameter represents the type of the code object, such as 'class', 'function', or 'variable'.
- **Returns:** The function returns a string representing the emoji corresponding to the input code object type. If the input type is not recognized, it returns the '📦' emoji.
- **Usage Example:** 


```typescript
const emoji = getEmoji('function');
console.log(emoji); // Output: 🔧
```

- **Edge Cases:** The function handles cases where the input type is not recognized by returning the '📦' emoji. It also handles cases where the input type is provided in different cases (e.g., 'class' vs. 'Classes') by converting the input to lowercase before comparison.

### 🔧 generateDocumentation - FUNCTION
------------------------------------------------------------
**Description:** This function takes a folder path, a ProjectSummary object, and an optional JSON file path as input. It generates documentation for the project in the specified folder, using the ProjectSummary object as the source of information. If a JSON file path is provided, it will read the ProjectSummary object from the file instead.

**Code Snippet:**

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

        // if (folderPath.startsWith("./") || folderPath.startsWith("../") || folderPath.startsWith(".\") || folderPath.startsWith("..\")) {
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
    jsonToMarkdown(projectContext, folderPath);

    // Convert markdown to HTML
    markdownToHTML(folderPath);

    return true;
}

- **Line:** Could Not Verify Line
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** true
- **Private:** false
- **Async:** true


###### Function Parameters:
- **folderPath** (string): The path to the folder where the documentation will be generated. 
 Example: N/A
- **projectContext** (ProjectSummary | null): An object containing information about the project, including the project name, description, dependencies, and code files. If null, the ProjectSummary object will be read from the JSON file specified by the jsonFile parameter. 
 Example: N/A
- **jsonFile** (string | undefined): The path to the JSON file containing the ProjectSummary object. If undefined, the ProjectSummary object will be used directly. 
 Example: N/A
###### Function Returns:
- **Type:** boolean
- **Description:** Returns true if the documentation was generated successfully, false otherwise.
- **Example:** N/A
###### Annotations / Comments:
- **Purpose:** The `generateDocumentation` function is responsible for generating documentation for a codebase. It takes a folder path, a `ProjectSummary` object (containing information about the project), and an optional JSON file path as input. The function generates documentation in both Markdown and HTML formats, creating a directory structure with Markdown files for each code file and a README.md file for the project overview. It then converts the Markdown files to HTML.
- **Parameters:** - `folderPath`: The path to the folder where the documentation will be generated.
- `projectContext`: An object containing information about the project, including the project name, description, dependencies, and code files. If null, the `ProjectSummary` object will be read from the JSON file specified by the `jsonFile` parameter.
- `jsonFile`: The path to the JSON file containing the `ProjectSummary` object. If undefined, the `ProjectSummary` object will be used directly.
- **Returns:** The function returns a boolean value indicating whether the documentation was generated successfully. It returns `true` if the documentation was generated successfully, and `false` otherwise.
- **Usage Example:** 


```typescript
// Generate documentation for a project using a ProjectSummary object
generateDocumentation('./output', projectSummary);

// Generate documentation for a project using a JSON file
generateDocumentation('./output', null, './projectSummary.json');
```

- **Edge Cases:** - If the specified folder path does not exist, the function will attempt to create it. If the folder cannot be created, the function will use a backup directory.
- If the specified folder path is not writeable, the function will return `false` and log an error message.
- If the `jsonFile` parameter is provided but the file does not exist, the function will return `false` and log an error message.
- If the `projectContext` parameter is null and the `jsonFile` parameter is not provided, the function will return `false` and log an error message.
- **Dependencies:** - `fs`: Node.js module for file system operations.
- `path`: Node.js module for working with file paths.
- `makeOSpathFriendly`: A function from the `shared` module that makes file paths OS-friendly.
- `jsonToMarkdown`: A function from the `documentationGenerator` module that converts a `ProjectSummary` object to Markdown.
- `markdownToHTML`: A function from the `documentationGenerator` module that converts Markdown to HTML.
## variables


### 🧮 backupDirectory - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the path to the backup directory, which is located in the same directory as the current file.

**Code Snippet:**
```
const backupDirectory = path.join(__dirname, 'backup');
```
- **Line:** 10
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines the path to the backup directory, which is used to store documentation files if the primary output directory is not writeable.
- **Usage Example:** 


```typescript
const backupDirectory = path.join(__dirname, 'backup');
```

- **Dependencies:** path

### 🧮 timestamp - VARIABLE
------------------------------------------------------------
**Description:** This variable stores a timestamp representing the current date and time, formatted in ISO 8601 format with hyphens replacing colons and periods.

**Code Snippet:**
```
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
```
- **Line:** 13
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores a timestamp representing the current date and time, formatted in ISO 8601 format with hyphens replacing colons and periods.
- **Returns:** A string representing the timestamp in ISO 8601 format with hyphens replacing colons and periods.
- **Usage Example:** 


```typescript
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
```

- **Dependencies:** Date object

### 🧮 projectFolder - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the path to the folder where the documentation for the project will be generated. The folder name is a combination of the project name, a hyphen, and the timestamp.

**Code Snippet:**

const projectFolder = path.join(outputFolder, `${projectSummary.projectName}-${timestamp}`);

- **Line:** 14
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the path to the folder where the documentation for the project will be generated. The folder name is a combination of the project name, a hyphen, and the timestamp.
- **Returns:** string
- **Usage Example:** 


```typescript
const projectFolder = path.join(outputFolder, `${projectSummary.projectName}-${timestamp}`);
```

- **Dependencies:** path

### 🧮 toc - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an array of strings that will be used to create the table of contents for the documentation.

**Code Snippet:**
```
const toc: string[] = [];
```
- **Line:** 17
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `toc` variable is an array of strings that will be used to create the table of contents for the documentation. It is initialized as an empty array.

### 🧮 fileName - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the name of the markdown file that will be generated for each code file in the project.

**Code Snippet:**

const fileName = `${file.fileName}.md`;

- **Line:** 36
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the name of the markdown file that will be generated for each code file in the project. It is constructed by concatenating the file's name with the '.md' extension.
- **Usage Example:** 


```typescript
const fileName = `${file.fileName}.md`;
```


### 🧮 filePath - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the full path to the markdown file that will be generated for each code file in the project.

**Code Snippet:**
```
const filePath = path.join(projectFolder, fileName);
```
- **Line:** 37
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `filePath` variable stores the full path to the markdown file that will be generated for each code file in the project. This path is constructed by joining the `projectFolder` (the directory where the documentation will be output) with the `fileName` (the name of the code file).
- **Usage Example:** 


```typescript
const filePath = path.join(projectFolder, fileName);
```

- **Dependencies:** The `path` module is used to construct the file path.

### 🧮 fileContent - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the content of the markdown file that will be generated for each code file in the project.

**Code Snippet:**

let fileContent = `# ${file.fileName} - ${projectSummary.projectName}
`;

- **Line:** 36
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `fileContent` variable is used to store the Markdown content that will be generated for each code file in the project. It initializes the Markdown file with the file name, project name, and a summary section.
- **Usage Example:** 


```typescript
let fileContent = `# ${file.fileName} - ${projectSummary.projectName}
`;
```


### 🧮 sectionLinks - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an array of strings that will be used to create the links to the different sections of the documentation for each code file.

**Code Snippet:**
```
const sectionLinks: string[] = [];
```
- **Line:** 46
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `sectionLinks` variable is an array of strings that will be used to create the links to the different sections of the documentation for each code file. It is initialized as an empty array and populated later in the code.
- **Usage Example:** 


```typescript
// Example usage of sectionLinks
const sectionLinks: string[] = [];
sectionLinks.push('- [Classes](#classes)');
sectionLinks.push('- [Functions](#functions)');
// ... add more links

// Use sectionLinks to create the table of contents
const toc = `## Table of Contents
${sectionLinks.join('\n')}
`;
```


### 🧮 sectionContent - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an object that will be used to store the content of the different sections of the documentation for each code file.

**Code Snippet:**
```
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
```
- **Line:** 49
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable is used to store the content of different sections (classes, functions, variables, types, imports, exports, interfaces) of the documentation for each code file. It is initialized as an empty object with keys for each section.
- **Usage Example:** 


```typescript
// Example usage:
const sectionContent = {
  classes: '',
  functions: '',
  variables: '',
  types: '',
  imports: '',
  exports: '',
  interfaces: ''
};

// Add content to the sections
sectionContent.classes = 'Class content...';
sectionContent.functions = 'Function content...';

// Use the content to generate documentation
console.log(sectionContent.classes);
console.log(sectionContent.functions);
```


### 🧮 duplicateTracking - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an object that will be used to track duplicate code objects, preventing them from being added to the documentation multiple times.

**Code Snippet:**
```
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
```
- **Line:** 77
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `duplicateTracking` variable is an object used to track duplicate code objects within a project. This helps prevent redundant entries in the documentation by ensuring that each code object is only documented once.
- **Usage Example:** 


```typescript
// Example usage within the code:
const duplicateCheck = (obj: CodeObject, type: CodeObjectType): boolean => {
    // ...
    if (bFound === true) {
        return true;
    }

    switch (type) {
        case 'class':
            duplicateTracking.classes.push(dupObj);
            break;
        // ...
    }

    return false;
};
```


### 🧮 objName - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the name of the code object being checked for duplicates.

**Code Snippet:**
```
const objName = obj.name;
```
- **Line:** 88
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the name of the code object being checked for duplicates.
- **Usage Example:** 


```typescript
const objName = obj.name;
```


### 🧮 objContent - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the code snippet of the code object being checked for duplicates.

**Code Snippet:**
```
const objContent = obj.codeSnippet;
```
- **Line:** 89
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the code snippet of the code object being checked for duplicates. It is used in the `duplicateCheck` function to compare the code snippet of a new code object with existing code objects in the `duplicateTracking` object.
- **Usage Example:** 


```typescript
const objContent = obj.codeSnippet;
```


### 🧮 objType - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the type of the code object being checked for duplicates.

**Code Snippet:**
```
const objType = obj.type;
```
- **Line:** 90
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the type of the code object being checked for duplicates. It is used in the `duplicateCheck` function to determine if a code object with the same name and type already exists in the `duplicateTracking` object.
- **Usage Example:** 


```typescript
const objType = obj.type;
```


### 🧮 bFound - VARIABLE
------------------------------------------------------------
**Description:** This variable is a boolean flag that indicates whether a duplicate code object has been found.

**Code Snippet:**
```
let bFound = false;
```
- **Line:** 100
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable is a boolean flag that indicates whether a duplicate code object has been found. It is used to prevent duplicate code objects from being added to the documentation.

### 🧮 contentObj - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the array of objects for the current section being checked for duplicates.

**Code Snippet:**
```
const contentObj = content as dupObj[];
```
- **Line:** 102
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the array of objects for the current section being checked for duplicates.

### 🧮 found - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the result of searching for a duplicate code object in the current section.

**Code Snippet:**
```
const found = contentObj.find((item) => (item.name === objName || item.content === objContent) && item.type === objType);
```
- **Line:** 105
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `found` variable is used to store the result of searching for a duplicate code object within the `contentObj` array. It uses the `find` method to check if an object with the same name, content, and type already exists in the array.
- **Usage Example:** 


```typescript
const found = contentObj.find((item) => (item.name === objName || item.content === objContent) && item.type === objType);
```


### 🧮 baseObject - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the code objects for the current file, cast as any to allow access to all properties.

**Code Snippet:**
```
const baseObject = file.codeObjects as any;
```
- **Line:** 154
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the code objects for the current file, cast as any to allow access to all properties.
- **Usage Example:** 


```typescript
const baseObject = file.codeObjects as any;
```


### 🧮 obj - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the array of code objects for the current key, cast as any to allow access to all properties.

**Code Snippet:**
```
const obj = baseObject[key] as any[];
```
- **Line:** 155
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the array of code objects for the current key, cast as any to allow access to all properties.
- **Usage Example:** 


```typescript
const obj = baseObject[key] as any[];
```


### 🧮 sectionString - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the name of the current section being processed.

**Code Snippet:**

const sectionString = `${section}`

- **Line:** 201
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the name of the current section being processed, which is used to create a section title and link in the documentation.
- **Usage Example:** 


```typescript
const sectionString = `classes`;
// This will create a section titled "## Classes" in the documentation.
```


### 🧮 sectionTitle - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the title of the current section being processed.

**Code Snippet:**

const sectionTitle = `## ${sectionString}`;

- **Line:** 202
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the title of the current section being processed, which is used to generate the markdown documentation for the project.
- **Usage Example:** 


```typescript
const sectionTitle = `## ${sectionString}`;
```


### 🧮 fileFolder - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the path to the folder where the markdown file for the current code file will be saved.

**Code Snippet:**
```
const fileFolder = path.dirname(filePath);
```
- **Line:** 211
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `fileFolder` variable stores the path to the directory where the markdown file for the current code file will be saved. This is used to ensure that the markdown file is saved in the correct location within the project's documentation structure.
- **Dependencies:** The `fileFolder` variable depends on the `path` module, which is used to extract the directory name from the `filePath` variable.

### 🧮 converter - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an instance of the Showdown converter, which is used to convert markdown to HTML.

**Code Snippet:**
```
const converter = new showdown.Converter();
```
- **Line:** 238
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable initializes an instance of the Showdown converter, which is used to convert Markdown text into HTML.
- **Usage Example:** 


```typescript
const html = converter.makeHtml(markdown);
```

- **Dependencies:** showdown library

### 🧮 html - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the HTML code generated by the Showdown converter.

**Code Snippet:**
```
const html = converter.makeHtml(markdown);
```
- **Line:** 242
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `html` variable is declared and assigned the result of converting Markdown to HTML using the `converter.makeHtml(markdown)` function.
- **Dependencies:** The `html` variable depends on the `converter` object, which is an instance of the Showdown converter.

### 🧮 htmlFile - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the path to the HTML file that will be generated from the markdown file.

**Code Snippet:**
```
const htmlFile = file.replace('.md', '.html');
```
- **Line:** 267
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the path to the HTML file that will be generated from the markdown file. It is created by replacing the '.md' extension of the markdown file with '.html'.

### 🧮 indentation - VARIABLE
------------------------------------------------------------
**Description:** This variable stores a string containing the appropriate number of spaces for indentation based on the given indent level.

**Code Snippet:**
```
const indentation = '  '.repeat(indent);
```
- **Line:** 276
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores a string containing the appropriate number of spaces for indentation based on the given indent level. It is used to create the correct indentation for the markdown output of the code objects.
- **Usage Example:** 


```typescript
const indentation = '  '.repeat(indent);
```


### 🧮 fancyBar - VARIABLE
------------------------------------------------------------
**Description:** This variable stores a string containing a series of hyphens, used as a visual separator in the generated markdown.

**Code Snippet:**
```
const fancyBar = '---'.repeat(20);
```
- **Line:** 277
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `fancyBar` variable is a constant that stores a string of 20 hyphens, used as a visual separator in the generated markdown output. It's used to visually separate different sections within the markdown files, enhancing readability and organization.
- **Usage Example:** 


```markdown
### Function Name - [FUNCTION]
---
**Description:** Description of the function
**Code Snippet:**
```
```


### 🧮 emoji - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the emoji that will be used to represent the type of the current code object.

**Code Snippet:**
```
const emoji = getEmoji(codeObject.type);
```
- **Line:** 278
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the emoji that will be used to represent the type of the current code object.
- **Usage Example:** 


```typescript
const emoji = getEmoji(codeObject.type);
```

- **Dependencies:** The `getEmoji` function is a dependency.

### 🧮 annotation - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the annotations for the current code object.

**Code Snippet:**
```
const annotation = codeObject.annotation;
```
- **Line:** 315
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `annotation` variable stores the annotations for the current code object. It is used to access and display the annotations in the documentation generation process.
- **Usage Example:** 


```typescript
// Accessing the annotations for a code object
const annotation = codeObject.annotation;
// Displaying the annotations in the documentation
console.log(annotation.purpose);
```


### 🧮 subObj - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the current sub-object being processed.

**Code Snippet:**
```
codeObject.subObjects.forEach(subObj => {
```
- **Line:** 344
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable is used to iterate over the `subObjects` array of a `codeObject`.

### 🧮 timeStamp - VARIABLE
------------------------------------------------------------
**Description:** This variable stores a timestamp representing the current date and time, formatted in ISO 8601 format with hyphens replacing colons and periods.

**Code Snippet:**
```
const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
```
- **Line:** 410
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores a timestamp representing the current date and time, formatted in ISO 8601 format with hyphens replacing colons and periods.
- **Returns:** A string representing the timestamp in ISO 8601 format with hyphens replacing colons and periods.
- **Usage Example:** 


```typescript
const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
```

- **Dependencies:** Date object

### 🧮 model - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the name of the LLM model to be used for generating documentation.

**Code Snippet:**
```
const model = process.env.LLM_TO_USE || 'ml';
```
- **Line:** 411
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the name of the LLM model to be used for generating documentation.
- **Usage Example:** 


```typescript
const model = process.env.LLM_TO_USE || 'ml';
```

- **Edge Cases:** If the environment variable `LLM_TO_USE` is not set, the default model 'ml' will be used.
- **Dependencies:** The `process.env` object is used to access environment variables.

### 🧮 jsonFile - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the path to the JSON file where the project context will be saved.

**Code Snippet:**
```
jsonFile = projectContextPath;
```
- **Line:** 413
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `jsonFile` variable stores the path to the JSON file where the project context will be saved. This file will contain all the information about the project, including the project name, description, dependencies, code files, and annotations.
- **Usage Example:** 


```typescript
// Example usage:
const projectContextPath = './my-project.json';
const jsonFile = projectContextPath;
```


### 🧮 projectContext - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the project context loaded from the JSON file.

**Code Snippet:**
```
projectContext = JSON.parse(fs.readFileSync(projectContextPath, 'utf-8')) as ProjectSummary;
```
- **Line:** 433
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the project context loaded from the JSON file. It is used to access information about the project, such as the project name, description, dependencies, and code files.
- **Usage Example:** 


```typescript
const projectContext = JSON.parse(fs.readFileSync(projectContextPath, 'utf-8')) as ProjectSummary;
```

- **Edge Cases:** If the JSON file does not exist or is invalid, an error will be thrown.
- **Dependencies:** fs, path, ProjectSummary

### 🧮 files - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an array of file names in the current directory.

**Code Snippet:**
```
const files = fs.readdirSync(dir);
```
- **Line:** 248
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores an array of file names in the current directory, obtained using the `fs.readdirSync` function.
- **Usage Example:** 


```typescript
const files = fs.readdirSync(dir);
```

- **Edge Cases:** If the directory does not exist or is inaccessible, an error will be thrown.
- **Dependencies:** fs (Node.js file system module)

### 🧮 filelist - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an array of file paths, recursively collected from the given directory.

**Code Snippet:**
```
filelist = filelist || [];
```
- **Line:** 249
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable is used to store an array of file paths, which are collected recursively from the given directory. It is initialized as an empty array if it is not already defined.
- **Usage Example:** 


```typescript
const filelist = walkSync(dir, filelist || []);
```


### 🧮 markdownFiles - VARIABLE
------------------------------------------------------------
**Description:** This variable stores an array of file paths to all markdown files in the project folder.

**Code Snippet:**
```
const markdownFiles = walkSync(projectFolder);
```
- **Line:** 262
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `markdownFiles` variable stores an array of file paths to all markdown files within the `projectFolder` directory. This array is used later in the code to convert each markdown file to HTML.
- **Usage Example:** 


```typescript
// Example usage of markdownFiles variable
markdownFiles.forEach((file) => {
  // Read the markdown content from the file
  const markdown = fs.readFileSync(file, 'utf-8');
  // Convert the markdown to HTML
  const html = convertDat(markdown);
  // Write the HTML to a new file
  const htmlFile = file.replace('.md', '.html');
  fs.writeFileSync(htmlFile, html);
});
```

- **Dependencies:** The `markdownFiles` variable depends on the `walkSync` function, which is responsible for recursively traversing the `projectFolder` directory and collecting all markdown file paths.

### 🧮 markdown - VARIABLE
------------------------------------------------------------
**Description:** This variable stores the content of the current markdown file being processed.

**Code Snippet:**
```
const markdown = fs.readFileSync(file, 'utf-8');
```
- **Line:** 265
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `markdown` variable stores the content of the current markdown file being processed, which is read from the file system using the `fs.readFileSync` function.
- **Usage Example:** 


```typescript
const markdown = fs.readFileSync(file, 'utf-8');
```

- **Edge Cases:** If the file does not exist or cannot be read, an error will be thrown.
- **Dependencies:** The `fs` module is required for reading the file content.
## types


### 🏷️ CodeObject - TYPE
------------------------------------------------------------
**Description:** Interface for representing code objects, such as classes, functions, variables, types, interfaces, comments, imports, and exports.

**Code Snippet:**


```typescript
interface CodeObject {
  name?: string;
  type: CodeObjectType;
  description?: string;
  codeSnippet?: string;
  codeLine?: number;
  codeIndent?: number;
  fileName?: string;
  fileLocation?: string;
  isExported?: boolean;
  isPrivate?: boolean;
  isAsync?: boolean;
  functionParameters?: FunctionParameter[];
  functionReturns?: FunctionReturn;
  annotation?: Annotation;
  subObjects?: CodeObject[];
}
```

- **Line:** Could Not Verify Line
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObject` interface defines the structure for representing various code elements within a project, such as classes, functions, variables, types, interfaces, comments, imports, and exports. It provides a standardized way to store and analyze information about these code elements.
- **Usage Example:** 


```typescript
const myFunction: CodeObject = {
  name: 'myFunction',
  type: 'function',
  description: 'This function does something',
  codeSnippet: 'function myFunction() { ... }',
  codeLine: 10,
  codeIndent: 2,
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  isExported: true,
  isPrivate: false,
  isAsync: false,
  functionParameters: [
    {
      name: 'param1',
      type: 'string',
      description: 'Description of the parameter',
      example: 'exampleValue'
    }
  ],
  functionReturns: {
    type: 'string',
    description: 'Description of the return value',
    example: 'exampleReturn'
  }
};
```


### 🏷️ ProjectSummary - TYPE
------------------------------------------------------------
**Description:** Interface for representing a project summary, containing information about the project, its dependencies, code files, and other relevant details.

**Code Snippet:**


```typescript
interface ProjectSummary {
  projectName: string;
  projectDescription: codeSummary;
  projectDependencies: ModuleObject[];
  projectLocation: string;
  projectTechStackDescription: string;
  codeFiles: CodeFileSummary[];
  ragData: RagData[];
  teamContext: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ProjectSummary` interface represents a comprehensive summary of a software project, encompassing various aspects like project name, description, dependencies, code files, and contextual information.
- **Usage Example:** 


```typescript
const projectSummary: ProjectSummary = {
  projectName: "MyProject",
  projectDescription: {
    goal: "This project aims to...",
    features_functions: "Key features include..."
  },
  projectDependencies: [
    { name: "express", version: "^4.18.2" },
    { name: "typescript", version: "^4.9.4" }
  ],
  projectLocation: "/path/to/project",
  projectTechStackDescription: "This project uses Node.js, Express, and TypeScript.",
  codeFiles: [
    // ... code file summaries
  ],
  ragData: [
    // ... RAG data
  ],
  teamContext: "This project is developed by..."
};
```


### 🏷️ CodeObjectType - TYPE
------------------------------------------------------------
**Description:** Enum for representing different types of code objects.

**Code Snippet:**


```typescript
enum CodeObjectType {
  class = 'class',
  function = 'function',
  variable = 'variable',
  type = 'type',
  comment = 'comment',
  import = 'import',
  export = 'export',
  interface = 'interface'
}
```

- **Line:** Could Not Verify Line
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type defines an enum called `CodeObjectType` which represents different types of code objects, such as classes, functions, variables, types, comments, imports, exports, and interfaces.
- **Usage Example:** 


```typescript
const codeObjectType: CodeObjectType = CodeObjectType.class;
```


### 🏷️ dupObj - TYPE
------------------------------------------------------------
**Description:** Interface for representing a duplicate object, used for tracking duplicate code objects during documentation generation.

**Code Snippet:**


```typescript
interface dupObj {
  name?: string;
  content?: string;
  type: CodeObjectType;
}
```

- **Line:** 59
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `dupObj` interface is used to represent a duplicate code object during documentation generation. It stores the name, content, and type of the code object.
- **Usage Example:** 


```typescript
const duplicateObject: dupObj = {
  name: 'MyClass',
  content: 'class MyClass { ... }',
  type: 'class'
};
```


### 🏷️ dupTrack - TYPE
------------------------------------------------------------
**Description:** Interface for representing a duplicate tracking object, used for keeping track of duplicate code objects during documentation generation.

**Code Snippet:**


```typescript
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
```

- **Line:** 65
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `dupTrack` type is an interface used to track duplicate code objects during documentation generation. It helps ensure that the documentation doesn't include redundant information about the same code object multiple times.
- **Usage Example:** 


```typescript
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
```

## imports


### 📥 CodeObject - IMPORT
------------------------------------------------------------
**Description:** Imports the CodeObject interface from the objectSchemas module.

**Code Snippet:**
```
import { CodeObject, ProjectSummary, CodeObjectType } from "./objectSchemas";
```
- **Line:** 1
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `CodeObject`, `ProjectSummary`, and `CodeObjectType` interfaces from the `objectSchemas` module.
- **Dependencies:** objectSchemas module

### 📥 fs - IMPORT
------------------------------------------------------------
**Description:** Imports the fs module for file system operations.

**Code Snippet:**
```
import fs from 'fs';
```
- **Line:** 2
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `fs` module from Node.js, providing access to file system operations.
- **Dependencies:** Node.js `fs` module

### 📥 path - IMPORT
------------------------------------------------------------
**Description:** Imports the path module for working with file paths.

**Code Snippet:**
```
import path from 'path';
```
- **Line:** 3
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `path` module, which provides utilities for working with file paths.
- **Dependencies:** path module

### 📥 dotenv/config - IMPORT
------------------------------------------------------------
**Description:** Imports the dotenv/config module to load environment variables from a .env file.

**Code Snippet:**
```
import "dotenv/config";
```
- **Line:** 4
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This import statement loads the `dotenv/config` module, which is used to load environment variables from a `.env` file.
- **Dependencies:** dotenv

### 📥 cleanBackticks - IMPORT
------------------------------------------------------------
**Description:** Imports the cleanBackticks function from the shared module.

**Code Snippet:**
```
import { cleanBackticks, escapeStringForMD, makeOSpathFriendly } from "./shared";
```
- **Line:** 5
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `cleanBackticks` function from the `shared` module.
- **Usage Example:** 


```typescript
const cleanedCode = cleanBackticks(codeSnippet);
```

- **Dependencies:** The `cleanBackticks` function is defined in the `shared` module.

### 📥 showdown - IMPORT
------------------------------------------------------------
**Description:** Imports the showdown module for converting Markdown to HTML.

**Code Snippet:**
```
import showdown from 'showdown';
```
- **Line:** 6
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `showdown` module, which is a library for converting Markdown to HTML.
- **Usage Example:** 


```typescript
const converter = new showdown.Converter();
const html = converter.makeHtml(markdown);
```

- **Dependencies:** showdown library

### 📥 ./logger - IMPORT
------------------------------------------------------------
**Description:** Imports the logger module.

**Code Snippet:**
```
import "./logger";
```
- **Line:** 7
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This line imports the `logger` module, which is likely responsible for logging messages and events within the application.
- **Dependencies:** logger module
## exports


### 📤 generateDocumentation - EXPORT
------------------------------------------------------------
**Description:** Generates documentation for a project, either from a ProjectSummary object or a JSON file.

**Code Snippet:**
```
export async function generateDocumentation(folderPath: string, projectContext: ProjectSummary | null = null, jsonFile?: string): Promise<boolean> {
```
- **Line:** 375
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `generateDocumentation` function is responsible for generating documentation for a code project. It takes a folder path, an optional ProjectSummary object, and an optional JSON file path as input. The function first checks if the provided folder path exists and creates it if it doesn't. It then checks if the folder path is writeable. If a JSON file path is provided, it reads the ProjectSummary object from the file. Otherwise, it uses the provided ProjectSummary object. The function then calls the `jsonToMarkdown` function to convert the ProjectSummary object to Markdown files and the `markdownToHTML` function to convert the Markdown files to HTML files. Finally, it returns a boolean value indicating whether the documentation generation was successful.
- **Parameters:** - `folderPath`: A string representing the path to the output folder where the documentation will be generated.
- `projectContext`: An optional ProjectSummary object containing information about the project, including code files, dependencies, and descriptions. If not provided, the function will attempt to read the ProjectSummary object from the JSON file path.
- `jsonFile`: An optional string representing the path to a JSON file containing the ProjectSummary object. If provided, the function will read the ProjectSummary object from this file.
- **Returns:** A boolean value indicating whether the documentation generation was successful. `true` if successful, `false` otherwise.
- **Usage Example:** 


```typescript
// Generate documentation from a ProjectSummary object
generateDocumentation('./output', projectSummary);

// Generate documentation from a JSON file
generateDocumentation('./output', null, './projectContext.json');
```

- **Edge Cases:** - If the provided folder path does not exist, the function will attempt to create it. If the creation fails, the function will log an error and return `false`.
- If the provided folder path is not writeable, the function will log an error and return `false`.
- If the provided JSON file path does not exist or cannot be read, the function will log an error and return `false`.
- If the provided ProjectSummary object is invalid or missing, the function will log an error and return `false`.
- **Dependencies:** - `fs`: The Node.js file system module for file operations.
- `path`: The Node.js path module for working with file paths.
- `jsonToMarkdown`: A function that converts a ProjectSummary object to Markdown files.
- `markdownToHTML`: A function that converts Markdown files to HTML files.

### 📤 jsonToMarkdown - EXPORT
------------------------------------------------------------
**Description:** Converts a ProjectSummary object into a Markdown file.

**Code Snippet:**
```
function jsonToMarkdown(projectSummary: ProjectSummary, outputFolder: string) {
```
- **Line:** 12
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `jsonToMarkdown` function takes a `ProjectSummary` object and an output folder path as input. It generates a Markdown file for the project, including a table of contents, project description, tech stack, dependencies, and code file summaries.
- **Parameters:** - `projectSummary`: A `ProjectSummary` object containing information about the project, code files, and dependencies.
- `outputFolder`: The path to the output directory where the Markdown files will be generated.
- **Returns:** The function does not explicitly return a value. It generates Markdown files in the specified output folder.
- **Usage Example:** 


```typescript
// Assuming you have a ProjectSummary object called 'projectSummary'
jsonToMarkdown(projectSummary, './output');
```

- **Edge Cases:** The function handles edge cases such as empty project descriptions, dependencies, or code files. It also handles duplicate code objects by omitting them from the output.
- **Dependencies:** - `fs`: Node.js module for file system operations.
- `path`: Node.js module for working with file paths.
- `escapeStringForMD`: A utility function from the `shared` module for escaping strings for Markdown.

### 📤 markdownToHTML - EXPORT
------------------------------------------------------------
**Description:** Converts Markdown files in a project folder to HTML.

**Code Snippet:**
```
function markdownToHTML(projectFolder: string) {
```
- **Line:** 235
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `markdownToHTML` function converts all Markdown files within a specified project folder to HTML format.
- **Parameters:** The function takes a single parameter, `projectFolder`, which is a string representing the path to the project folder containing the Markdown files.
- **Returns:** The function does not explicitly return a value. It directly modifies the Markdown files in the project folder by converting them to HTML and saving them with the `.html` extension.
- **Usage Example:** 


```typescript
// Assuming 'myProject' is the path to the project folder containing Markdown files
markdownToHTML('myProject');
```

- **Edge Cases:** The function assumes that the project folder contains Markdown files with the `.md` extension. It does not handle other file types or nested folders within the project folder.
- **Dependencies:** The function relies on the `showdown` library for Markdown to HTML conversion. It also uses the `fs` module for file system operations.

### 📤 generateCodeObjectContent - EXPORT
------------------------------------------------------------
**Description:** Generates Markdown content for a CodeObject, including its details and annotations.

**Code Snippet:**
```
function generateCodeObjectContent(codeObject: CodeObject, indent: number): string {
```
- **Line:** 275
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `generateCodeObjectContent` function takes a `CodeObject` and an indentation level as input and generates Markdown content for the code object, including its details and annotations.
- **Parameters:** - `codeObject`: A `CodeObject` representing a code element (class, function, variable, etc.)
- `indent`: An integer representing the indentation level for the Markdown output.
- **Returns:** A string containing the Markdown representation of the `CodeObject`.
- **Usage Example:** 


```typescript
const codeObject = {
  name: 'myFunction',
  type: 'function',
  description: 'This function does something',
  codeSnippet: 'function myFunction() { ... }',
  codeLine: 10,
  codeIndent: 2,
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts'
};

const markdownContent = generateCodeObjectContent(codeObject, 0);

console.log(markdownContent);
```

- **Edge Cases:** None specifically mentioned in the code.
- **Dependencies:** - `escapeStringForMD`: A function from the `shared` module to escape backticks in Markdown.

### 📤 getEmoji - EXPORT
------------------------------------------------------------
**Description:** Returns an emoji based on the type of CodeObject.

**Code Snippet:**
```
function getEmoji(type: string): string {
```
- **Line:** 352
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function returns an emoji based on the type of CodeObject. It is used to add visual flair to the generated documentation.
- **Parameters:** type: string - The type of CodeObject, such as 'classes', 'functions', 'variables', etc.
- **Returns:** string - The emoji corresponding to the given CodeObject type.
- **Usage Example:** 


```typescript
const emoji = getEmoji('classes'); // Returns '📘'
```

- **Edge Cases:** If the type is not recognized, an empty string is returned.
- **Dependencies:** None
## interfaces


### 🌉 dupObj - INTERFACE
------------------------------------------------------------
**Description:** Interface for duplicate object tracking

**Code Snippet:**
```
interface dupObj {
            name?: string;
            content?: string;
            type: CodeObjectType;
        }
```
- **Line:** 60
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure of an object used for tracking duplicate code objects within a file.

### 🌉 dupTrack - INTERFACE
------------------------------------------------------------
**Description:** Interface for duplicate object tracking

**Code Snippet:**
```
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
```
- **Line:** 66
- **Location:** documentationGenerator.ts (./src/documentationGenerator.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This interface defines the structure for tracking duplicate code objects within a project.
