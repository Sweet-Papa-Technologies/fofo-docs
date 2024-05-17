export const codeSummary = `
    Create a summary of the following code in markdown. ONLY respond with the summary, For example:
    
    ##Execution Flow\n\n1. The app... etc
`

export const promptTemplate = `
You will be asked to provide a JSON object that contains the identified code objects in the code snippet attached at the bottom of this request.

## Context
- Project and Team Context: 
<supplemental context>

## Previously Parsed Code
- Relevant Code:
<relevant code>

## Task
In the following code snippet, please identify all of the following:
- Classes
- Functions
- Variables
- Types
- Interfaces
- Comments
- Imports
- Exports

## Response Format
Respond ONLY with a JSON object containing the identified code objects and their descriptions. Here is an example of the required format:

{
    "classes": [
        {
            "name": "ClassName",
            "type": "class",
            "description": "Description of the class",
            "codeSnippet": "class ClassName { ... }",
            "codeLine": 10,
            "codeIndent": 0,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js",
            "subObjects": []
        }
    ],
    "functions": [
        {
            "name": "functionName",
            "type": "function",
            "description": "Description of the function",
            "codeSnippet": "function functionName() { ... }",
            "codeLine": 20,
            "codeIndent": 2,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js",
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
    ],
    "variables": [
        {
            "name": "variableName",
            "type": "variable",
            "description": "Description of the variable",
            "codeSnippet": "let variableName = ...;",
            "codeLine": 30,
            "codeIndent": 2,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js",
        }
    ],
    "types": [
        {
            "name": "TypeName",
            "description": "Description of the type",
            "codeSnippet": "type TypeName = ...;",
            "codeLine": 40,
            "codeIndent": 2,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js",
        }
    ],
    "interfaces": [
        {
            "name": "InterfaceName",
            "type": "interface",
            "description": "Description of the interface",
            "codeSnippet": "interface InterfaceName { ... }",
            "codeLine": 65,
            "codeIndent": 0,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js",
        }
    ],
    "comments": [
        {
            "content": "This is a comment",
            type: "comment",
            "codeLine": 50,
            "codeIndent": 0,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js"
        }
    ],
    "imports": [
        {
            "name": "importName",
            "type": "import",
            "description": "Description of the import",
            "codeSnippet": "import importName from 'module';",
            "codeLine": 60,
            "codeIndent": 0,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js",
        }
    ],
    "exports": [
        {
            "name": "exportName",
            "type": "export",
            "description": "Description of the export",
            "codeSnippet": "export { exportName };",
            "codeLine": 70,
            "codeIndent": 0,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js",
        }
    ]    
}

## Code Snippet
- File Path: <file path>
<code snippet>
`;



// export const promptTemplate = `
// You will be asked to provide a JSON object that contains the identified code objects in the code snippet attached at the bottom of this request.

// --
// Here is some context about the project and team that this code is related to:
// <supplemental context>

// -- 
// Here is some relevant Code Previously Parsed:
// <relevant code>

// --
// In the following code snippet, please identify all of the following:
// - Classes
// - Functions
// - Variables
// - Types
// - Interfaces
// - Comments
// - Imports
// - Exports

// Please respond with a JSON object containing the identified code objects, their descriptions. ONLY respond with this JSON object, nothing else. For example:
// {
//     "classes": [
//         {
//             "name": "ClassName",
//             "description": "Description of the class",
//             "codeSnippet": "class ClassName { ... }",
//             "codeLine": 10,
//             "codeIndent": 0,
//             "fileName": "example.js",
//             "fileLocation": "/path/to/example.js",
//             "subObjects": []
//         }
//     ],
//     "functions": [
//         {
//             "name": "functionName",
//             "description": "Description of the function",
//             "codeSnippet": "function functionName() { ... }",
//             "codeLine": 20,
//             "codeIndent": 2,
//             "fileName": "example.js",
//             "fileLocation": "/path/to/example.js",
//             "subObjects": [],
//             "functionParameters": [
//                 {
//                     "name": "param1",
//                     "type": "string",
//                     "description": "Description of the parameter",
//                     "example": "exampleValue"
//                 }
//             ],
//             "functionReturns": {
//                 "type": "string",
//                 "description": "Description of the return value",
//                 "example": "exampleReturn"
//             }
//         }
//     ],
//     "variables": [
//         {
//             "name": "variableName",
//             "description": "Description of the variable",
//             "codeSnippet": "let variableName = ...;",
//             "codeLine": 30,
//             "codeIndent": 2,
//             "fileName": "example.js",
//             "fileLocation": "/path/to/example.js",
//             "subObjects": []
//         }
//     ],
//     "types": [
//         {
//             "name": "TypeName",
//             "description": "Description of the type",
//             "codeSnippet": "type TypeName = ...;",
//             "codeLine": 40,
//             "codeIndent": 2,
//             "fileName": "example.js",
//             "fileLocation": "/path/to/example.js",
//             "subObjects": []
//         }
//     ],
//     "interfaces": [
//         {
//             "name": "InterfaceName",
//             "description": "Description of the interface",
//             "codeSnippet": "interface InterfaceName { ... }",
//             "codeLine": 65,
//             "codeIndent": 0,
//             "fileName": "example.js",
//             "fileLocation": "/path/to/example.js",
//             "subObjects": []
//         }
//     ],
//     "comments": [
//         {
//             "content": "This is a comment",
//             "codeLine": 50,
//             "codeIndent": 0,
//             "fileName": "example.js",
//             "fileLocation": "/path/to/example.js"
//         }
//     ],
//     "imports": [
//         {
//             "name": "importName",
//             "description": "Description of the import",
//             "codeSnippet": "import importName from 'module';
//             "codeLine": 60,
//             "codeIndent": 0,
//             "fileName": "example.js",
//             "fileLocation": "/path/to/example.js",
//             "subObjects": []
//         }
//     ],
//     "exports": [
//         {
//             "name": "exportName",
//             "description": "Description of the export",
//             "codeSnippet": "export { exportName };",
//             "codeLine": 70,
//             "codeIndent": 0,
//             "fileName": "example.js",
//             "fileLocation": "/path/to/example.js",
//             "subObjects": []
//         }
//     ]    
// }

// --
// Code: <file path>
// <code snippet>
// `;

export const getLanguageTypeFromFile = (filePath: string) => {
    return `Based on the file name and path, guess the programming language (i.e. JavaScript, TypeScript, Python, etc.): 
    ${filePath}
    
    Please respond with JUST the language name. For example: JavaScript
    `

}