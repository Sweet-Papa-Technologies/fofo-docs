export const codeSummary = `
    Create a summary of the following code in markdown. ONLY respond with the summary, For example:
    
    ##Execution Flow\n\n1. The app... etc
`
import { CodeObject, CodeObjects, Annotation } from "./objectSchemas";
const generalPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => {
    const fileName = filePath.split('/').pop();
    return`
You will be asked to provide a JSON object that contains the identified ${type} objects in the code snippet attached at the bottom of this request.

## Context
- Project and Team Context: 
${context}

## Previously Parsed Code
- Relevant Code:
${relevantCode}

## Task
In the following code snippet, please identify and described all of the ${type} objects. ONLY focus on the ${type} objects and their descriptions. DO NOT add or implement new code.

The codeSnippet that is extracted from the code chunk should be an exact cut and paste from the actual code, not changed at all, except for adding an ellipsis if truncation needs to happen.

IF no ${type} objects are found, please respond with an empty JSON object:

{
    "${type}": []
}

The only values that can be set for the "type" key are: 
"class", "function", "variable", "type", "interface", "comment", "import", "export"

## Response Format
Respond ONLY with a JSON object containing the identified ${type} and their descriptions. Here is an example of the required format:

${type === 'classes' ? `
{
    "classes": [
        {
            "name": "ClassName",
            "type": "class", // DO NOT CHANGE THIS
            "description": "Description of the class",
            "codeSnippet": "\`\`\`typescript\nclass ClassName { ... }\n\`\`\`",
            "codeLine": 10,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
            "subObjects": []
        }
    ]
}` : type === 'functions' ? `
{
    "functions": [
        {
            "name": "functionName",
            "type": "function", // DO NOT CHANGE THIS
            "description": "Description of the function",
            "codeSnippet": "\`\`\`typescript\nfunction functionName() { ... }\n\`\`\`",
            "codeLine": 20,
            "codeIndent": 2,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
            "isExported": false,
            "isPrivate": false,
            "isAsync": false
            "functionParameters": [
                {
                    "name": "param1",
                    "type": "string",
                    "description": "Description of the parameter",
                    "example": "exampleValue"
                }
            ],
            "functionReturns": {
                "name": "returnVal1",
                "type": "string",
                "description": "Description of the return value",
                "example": "exampleReturn"
            }
        }
    ]
}

# Rules for Gathering Function Information
- IGNORE function import declarations
- If the function is exported, set "isExported" to true
- If the function is private, set "isPrivate" to true
- If the function is async, set "isAsync" to true
- If the function has parameters, add them to the "functionParameters" array
- If the function returns a value, add it to the "functionReturns" object

Include ALL function declarations in the code snippet, even if they are not explicitly called in the code.

` : type === 'variables' ? `
{
    "variables": [
        {
            "name": "variableName",
            "type": "variable", // DO NOT CHANGE THIS
            "description": "Description of the variable",
            "codeSnippet": "\`\`\`typescript\nlet variableName = ...;\n\`\`\`",
            "codeLine": 30,
            "codeIndent": 2,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
            "isExported": false,
            "isPrivate": false
        }
    ]
}` : type === 'types' ? `
{
    "types": [
        {
            "name": "TypeName",
            "type": "type", // DO NOT CHANGE THIS
            "description": "Description of the type",
            "codeSnippet": "\`\`\`typescript\ntype TypeName = ...;\n\`\`\`",
            "codeLine": 40,
            "codeIndent": 2,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` : type === 'interfaces' ? `
{
    "interfaces": [
        {
            "name": "InterfaceName",
            "type": "interface", // DO NOT CHANGE THIS
            "description": "Description of the interface",
            "codeSnippet": "\`\`\`typescript\ninterface InterfaceName { ... }\n\`\`\`",
            "codeLine": 65,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` 
// : type === 'comments' ? `
// {
//     "comments": [
//         {
//             "content": "This is a comment",
//             type: "comment",
//             "codeLine": 50,
//             "codeIndent": 0,
//             "fileName": "${fileName}",
//             "fileLocation": "${filePath}"
//         }
//     ]
// }` 
: type === 'imports' ? `
{
    "imports": [
        {
            "name": "importName",
            "type": "import", // DO NOT CHANGE THIS
            "description": "Description of the import",
            "codeSnippet": "\`\`\`typescript\nimport { importName } from 'module';\n\`\`\`",
            "codeLine": 60,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` : type === 'exports' ? `
{
    "exports": [
        {
            "name": "exportName",
            "type": "export", // DO NOT CHANGE THIS
            "description": "Description of the export",
            "codeSnippet": "\`\`\`typescript\nexport { exportName };\n\`\`\`",
            "codeLine": 70,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` : ''
}

## Code Snippet for file: ${fileName}
- File Path: ${filePath}
${codeSnippet}
`}

export const classesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'classes');

export const functionsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'functions');

export const variablesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'variables');

export const typesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'types');

export const interfacesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'interfaces');

// export const commentsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'comments');

export const importsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'imports');

export const exportsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'exports');

export const getLanguageTypeFromFile = (filePath: string) => {
    return `Based on the file name and path, guess the programming language (i.e. JavaScript, TypeScript, Python, etc.): 
    ${filePath}
    
    Please respond with JUST the language name. For example: JavaScript
    `

}

export const getGlobsBasedOnLangStack = (projectStackLang: string) => {
    return `Please respond with a JSON object that includes two keys: "glob" and "ignore".

- The "glob" key should contain an array of glob patterns that match all source code file extensions relevant to the project described below. The project can be anything from TypeScript to GO to Python, etc.
- The "ignore" key should contain an array of glob patterns for ignoring files in binary, distribution, or dependency directories.

The goal is to find source code files related to the given project stack.
- DO NOT include lock files or metadata files in the glob patterns. Add them to the ignore list instead.

For example, for a JavaScript project, you might respond with:
\`\`\`
{
    "glob": ["**/*.{ts,js,tsx,jsx}"],
    "ignore": ["node_modules/**", "**/node_modules/**", "package.json", "*/package.json", "**/package-lock.json"]
}
\`\`\`

ONLY Respond with the JSON object, nothing else

## Project Stack and Language:
${projectStackLang}
`
}
export const getPackageDependenciesBasedOnLanguage = (projectStackLang: string) => {
    return `
    Please respond with a JSON object that includes two keys: "glob" and "ignore".

    - The "glob" key should contain an array of glob patterns that match all file extensions related to package/dependency management typically used in a ${projectStackLang} project.
    - The "ignore" key should contain an array of glob patterns for ignoring files in the node_modules directory.

    My goal is to use this response to find files related to package dependencies.
    - DO NOT include lock files (e.g. package-lock.json, yarn.lock) in the glob patterns. You can add them to the ignore list.

    For example, for a JavaScript project, you might respond with:
    {
        "glob": ["package.json", "*/package.json", "*/**/package.json"],
        "ignore": ["node_modules/**"]
    }

    RESPOND WITH NO MORE THAN 50 globs or ignores.
    `
}

export const determineProjectStack = (projectFiles: string[]) => {
    return `
    Based on the list of files provided, please infer and respond with the programming languages, frameworks, and any other relevant technologies used in the project.

    List of files:
    ${projectFiles.join('\n')}

    Your response should be a concise description of the project's technology stack. For example, you might respond with:
    "This is a TypeScript project with a Vue.js frontend and a Node.js backend."
    `
}

export const determineModulesPackagesFromFile = (fileContents: string) => {
    return `
    Based on the contents of the file provided, please identify and respond with any modules or packages that are imported or required in the code.

    Specifically, ONLY respond with a JSON object that contains the following information for each identified module or package:
    {
        "name": string,
        "version": string,
        "description": string
    }

    If the version or description is not available, use "unknown" as the value.

    File Contents:
    ${fileContents}
    `
}


export function annotateCodeObjectPrompt(codeObj: CodeObject, context: string, ragContext:string|undefined=undefined): string {

    return `
    Based on the following context for this software code, provide detailed and relevant comments/annotations for the specific code chunk, represented in this object:
    
    ## Full Application Context
    ${context}

    ` + (ragContext ? `

    ## Other Relevant Code Snippets from Other Files 
    ${ragContext}` : '') 
    
    + `
    ## Code Object
    ${JSON.stringify(codeObj, null, 2)}

    ## Annotation Guidelines

    Based on the full context of the code, detail the following:
    
    - Purpose: Describe what this code object does.
    - Parameters: Explain the parameters of functions, their types, and their purpose.
    - Returns: Explain what the function returns.
    - Usage Example: Provide a usage example. DO NOT add additional code blocks within the response. And escape all characters properly.
    - Edge Cases: Mention any edge cases or special conditions.
    - Dependencies: List any dependencies.
    - Error Handling: Explain how errors are handled.
    - Performance: Mention any performance considerations.
    - Best Practices: Highlight best practices for using this code object.

    # Response Format
    Respond with a JSON object containing the annotations. For example:
    {
        "purpose": "This function calculates the sum of two numbers...etc",
        "parameters": "num1: number, num2: number...etd",
        "returns": "number",
        "usageExample": "\`\`\`typescript\nconst sum = add(1, 2);\n\`\`\`",
        "edgeCases": "Negative numbers are not supported...etc",
        "dependencies": "someDependency, anotherDependency...etc",
        "errorHandling": "Throws an error if the input is not a number...etc",
        "performance": "Optimized for speed...etc",
        "bestPractices": "Use this function for adding numbers to...etc"
    }

    If there is no information available for a specific section, you can set the value to an empty string.

    Please properly escape backticks used in your key-value pairs.

    ONLY respond with the JSON object containing the annotations.
`;
}