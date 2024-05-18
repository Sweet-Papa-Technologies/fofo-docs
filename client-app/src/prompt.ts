export const codeSummary = `
    Create a summary of the following code in markdown. ONLY respond with the summary, For example:
    
    ##Execution Flow\n\n1. The app... etc
`
import { CodeObjects } from "./objectSchemas";
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

IF no ${type} objects are found, please respond with an empty JSON object:

{
    "${type}": []
}

## Response Format
Respond ONLY with a JSON object containing the identified ${type} objects and their descriptions. Here is an example of the required format:

${type === 'classes' ? `
{
    "classes": [
        {
            "name": "ClassName",
            "type": "class",
            "description": "Description of the class",
            "codeSnippet": "class ClassName { ... }",
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
            "type": "function",
            "description": "Description of the function",
            "codeSnippet": "function functionName() { ... }",
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
}` : type === 'variables' ? `
{
    "variables": [
        {
            "name": "variableName",
            "type": "variable",
            "description": "Description of the variable",
            "codeSnippet": "let variableName = ...;",
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
            "description": "Description of the type",
            "codeSnippet": "type TypeName = ...;",
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
            "type": "interface",
            "description": "Description of the interface",
            "codeSnippet": "interface InterfaceName { ... }",
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
            "type": "import",
            "description": "Description of the import",
            "codeSnippet": "import importName from 'module';",
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
            "type": "export",
            "description": "Description of the export",
            "codeSnippet": "export { exportName };",
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