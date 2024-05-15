# FoFo Docs - PLANNING.md

## Table of Contents
- [Introduction](#introduction)
- [Project Goals](#project-goals)
- [User Stories](#user-stories)
- [Use Cases](#use-cases)
- [Requirements](#requirements)
- [Design](#design)

## Introduction
FoFo Docs is a tool to generate user documentation for code repositories. It is designed to be simple to use and easy to integrate into existing projects.

Major features include:
- Automatic generation of documentation from source code
- Support for multiple programming languages via LLM (Gemini Flash or Gemini Pro 1.5 for Now)
- Standard Templates for common documentation needs
    - Code Blocks
    - Function, Class, Type, and Variable Descriptions
- Analyzes code object by object to generate documentation
    - Classes, Functions, Variables, and Types
    - Comments

## Project Goals
- Create a tool that is easy to use and integrate into existing projects
- Generate documentation that is easy to read and understand
- Support multiple programming languages

## User Stories
- As a developer, I want to be able to generate documentation for my code so that I can share it with others
- As a developer, I want to be able to generate documentation for my code so that I can understand it better
- As a developer, I want to be able to generate documentation for my code so that I can maintain it more easily
- As a Software Developer Manager I want the team to consistently document their code so that it is easier to maintain and understand
- As a Software Developer Manager I want the team to consistently document their code so that it is easier to onboard new team members
- As a Software Developer Manager, I need a cost effective solution to generate documentation

## Use Cases
- Generate documentation for a code repository
- Generate documentation for a specific file
- Generate documentation for a specific object (class, function, variable, type)
- Generate documentation for a specific comment
- Save Documentation to Vector Database for RAG processing 

## Requirements
- The tool must be able to generate documentation for a specific file
- The tool must be able to generate documentation for a code repository
- The tool must be able to generate documentation for all objects in a file (class, function, variable, type)
- The tool must include comments in the generated documentation, if available
- The tool must ignore irrelevant files (.gitignore, .DS_Store, etc.)
- The tool should ignore files and folders defined in the .fofoignore or .gitignore file
- The tool should attempt to create hyperlinks to other objects in the documentation
- Ability to deal with LONG files incrementally
- Tool must efficiently handle API calls to the LLM
- Ignores files over a certain size
- App should be aware of team context, tools, and other useful information
- Project name should be inferred from:
    - package.json, if available
    - .git folder, if available
    - user is prompted to enter the project name
- The tool should show the status of progress as it processes each file


## Design
- The tool will be written in TypeScript
- The tool will use the LLM (Language Level Model) to parse code - Specifically Gemini Flash or Gemini Pro 1.5 for Now
- The tool will have a standard process for each mode:
    - Create a list of files to process
        - Exclude files and folders in the .fofoignore or .gitignore files
    - Parse each file and prompt the LLM to generate a JSON for each required set of data:
        - Classes
        - Functions
        - Variables
        - Types
        - Comments
        - Imports
        - Exports
        - General summary of the code
        - Execution flow based on code and conditional / if statements
    - Interface Object Schema: 

### Object Schemas
```typescript

type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'comment' | 'import' | 'export' | 'interface' | 'constructor';

interface ProjectSummary {
    projectName: string;
    projectDescription: string;
    projectLocation: string;
    codeFiles: CodeFileSummary[];
    ragData: ragData[];
    teamContext: string;
}

interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: string;
    language: string;
    ecexutionFlow: ExecutionFlow[];
    codeObjects: CodeObject[];
}

interface ExecutionFlow {
    step: number;
    stepDescription: string;
    bImportant: boolean;
    codeSnippet: string;
    codeLine: number;
    codeIndent: number;
    fileName: string;
    fileLocation: string;
}

interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}

interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}

interface ragData {
    metadata: {
        codeChunkLineStart: number;
        codeChunkLineEnd: number;
        codeObjects: CodeObject[];
        codeChunkSummary: string;
    }
    embeddings?: any[];
}

interface CodeObject {
    name: string;
    type: CodeObjectType;
    objectDescription: string;
    codeSnippet: string;
    codeLine: number;
    codeIndent: number;
    fileName: string;
    fileLocation: string;
    subObjects: CodeObject[];
    parentObject?: CodeObject;
    functionParameters?: FunctionParameter[];
    functionReturns?: FunctionReturn;
    isExported: boolean;
    isFunction: boolean;
    isClass: boolean;
    isPrivate: boolean;
    isAsync: boolean;
}
```
# Considerations / Specifications
Vector Database and Vector Hosting: Perhaps something hosted in GCP via Cloud Run and setup persistent storage. For now, we will use a local chromaDB instance, and export final results for later use:
    - Windows: `C:\Users\<username>\AppData\Local\FoFoDocs\ChromaDB`
    - MacOS: `/Users/<username>/Library/Application Support/FoFoDocs/ChromaDB`
    - Linux: `/home/<username>/.local/share/FoFoDocs/ChromaDB`

App will be a command line app written in Typescript

.fofoignore.json file will be a JSON file with the following structure:
```json
{
    "excludedFiles": [
        ".gitignore",
        ".DS_Store"
    ],
    "excludedFolders": [
        "node_modules",
        "dist"
    ]
}
```

### General To-Do List
- Generate list of excluded files for a default .fofoignore file
- Decide maximum file size to process (default 750KB)

### Functional Components and Features:

1. **Code Parsing Engine:**
    - Core component responsible for reading and analyzing source code files.
        - Identifies language of the code
        - Generates list of files, excludes files and folders in .fofoignore or .gitignore and by size
        - Token Counting Function for Strings
        - Parses large files incrementally to avoid performance issues.
            - Identifies code objects (classes, functions, variables, types, comments).
            - Extracts relevant information (names, descriptions, parameters, return types).
            - Saves information to RAG system for future queries.
        
2. **Language Level Model (LLM) Interface:**
    - Integrates with the LLM (Gemini Flash or Gemini Pro 1.5) for code understanding and documentation generation.
    - Sends structured code information to the LLM.
    - Receives generated documentation from the LLM in the form of JSON objects based on the defined schemas.

3. **Documentation Generator:**
    - Processes JSON documentation objects from the LLM.
    - Templates the documentation into a readable format (e.g., Markdown, HTML).
    - Handles formatting, cross-linking of code objects, and hyperlinking.
    - Manages the overall structure of the generated documentation.

4. **Vector Database Interface:**
    - Integrates with a Vector Database (e.g., Pinecone, ChromaDB) for storing and retrieving documentation.
    - Enables RAG (Retrieval-Augmented Generation) functionality.
    - Allows for searching and querying existing documentation.

**Step-by-Step Workflow Outline:**

1. **Initialization:**
    - User selects a code repository or specific files to process.
    - User provides project name
    - FoFo Docs reads project configuration files (e.g., `.fofoignore.json` or `.gitignore`) to determine exclusions.
    - A list of files to be processed is created.

2. **Code Parsing:**
    - The Code Parsing Engine iterates through each selected file.
        - Code is broken down into bite size logical chunks if OVER a certain token size: 1000 tokens
            - It identifies and extracts information for each code object (class, function, variable, type, comment, etc.).
                - Injects information about the team and project context
                - Injects existing data from local RAG database
            - It creates structured JSON representations of the code objects based on the defined schemas.
            - Saves the data to RAG system for future queries

3. **LLM Interaction:**
    - The structured JSON code objects are sent to the LLM.
    - The LLM processes the code objects and generates detailed documentation in JSON format based on the provided schemas.
    - The LLM response is parsed and validated.
    - The LLM response is sent back

4. **Documentation Generation:**
    - FoFo Docs receives the JSON documentation from the LLM for each page in the project
    - The Documentation Generator transforms the JSON into a readable set of documentation files, both MD and HTML
        - It applies templates, formatting, and cross-linking.
        - It generates the final documentation files in a folder called output, with a subfolder that has the same name as the project and a timestamp

**Additional Considerations:**

- **Error Handling:** Implement robust error handling to manage cases where code cannot be parsed or LLM responses are unexpected.
- **Caching:** Cache LLM responses to reduce processing time for repeated documentation generation. 
- **Testing:** Develop comprehensive tests to ensure the accuracy and reliability of the documentation generation process.

Let me know if you'd like a more detailed breakdown of any specific component or workflow step. 

### Required LLM Prompts:
Refer to: [prompts/generateObservations](prompts/generateObservations)

#### Generate Code Summary 
- Single Prompt 
- Base 854 tokens
- Core Example Total Tokens In:
    - 3507 tokens - short text - 40 secs => Around the maximum limit -> output max is 8k tokens
    - 5740 tokens - medium text - 60 secs => Can't process, too long

```plaintext

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

```