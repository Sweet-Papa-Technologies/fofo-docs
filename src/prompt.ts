export const promptTemplate = `
In the following code snippet, please identify all of the following:
- Classes
- Functions
- Variables
- Types
- Comments
- Imports
- Exports

Also please provide a general summary of the code and the execution flow based on code and conditional / if statements.

Please respond with a JSON object containing the identified code objects, their descriptions, and a markdown string containing a summary of the file and what it does. ONLY respond with this JSON object, nothing else. For example:
{
    "classes": [
        {
            "name": "ClassName",
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
            "description": "Description of the function",
            "codeSnippet": "function functionName() { ... }",
            "codeLine": 20,
            "codeIndent": 2,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js",
            "subObjects": [],
            "functionParameters": [
                {
                    "name": "param1",
                    "type": "string",
                    "description": "Description of the parameter",
                    "example": "exampleValue"
                }
            ],
            "functionReturns": {
                "type": "string",
                "description": "Description of the return value",
                "example": "exampleReturn"
            }
        }
    ],
    "variables": [
        {
            "name": "variableName",
            "description": "Description of the variable",
            "codeSnippet": "let variableName = ...;",
            "codeLine": 30,
            "codeIndent": 2,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js",
            "subObjects": []
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
            "subObjects": []
        }
    ],
    "comments": [
        {
            "content": "This is a comment",
            "codeLine": 50,
            "codeIndent": 0,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js"
        }
    ],
    "imports": [
        {
            "name": "importName",
            "description": "Description of the import",
            "codeSnippet": "import importName from 'module';
            "codeLine": 60,
            "codeIndent": 0,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js",
            "subObjects": []
        }
    ],
    "exports": [
        {
            "name": "exportName",
            "description": "Description of the export",
            "codeSnippet": "export { exportName };",
            "codeLine": 70,
            "codeIndent": 0,
            "fileName": "example.js",
            "fileLocation": "/path/to/example.js",
            "subObjects": []
        }
    ],
    "codeSummary": "##Execution Flow\n\n1. The app... etc"
}

--
Context about the project and team that this code is related to:
<supplemental context>

-- 
Relevant Code Previously Parsed:
<relevant code>

--
Code:
<code snippet>
`;