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
}

interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: string;
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
        
### Functional Components and Features

1. **Code Parsing Engine:**
    - Core component responsible for reading and analyzing source code files.
    - Handles language-specific syntax and structures.
    - Identifies code objects (classes, functions, variables, types, comments).
    - Extracts relevant information (names, descriptions, parameters, return types).
    - Potentially uses language-specific parsing libraries (e.g., TypeScript parsers).

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

5. **User Interface (Optional):**
    - Provides a visual interface for users to interact with FoFo Docs.
    - Allows users to select code repositories, files, or specific objects for documentation generation.
    - Displays generated documentation in a user-friendly format.
    - Could be a web-based interface or a command-line tool.

**Step-by-Step Workflow Outline:**

1. **Initialization:**
    - User selects a code repository or specific files to process.
    - FoFo Docs reads project configuration files (e.g., `.fofoignore` or `.gitignore`) to determine exclusions.
    - A list of files to be processed is created.

2. **Code Parsing:**
    - The Code Parsing Engine iterates through each selected file.
    - It identifies and extracts information for each code object (class, function, variable, type, comment, etc.).
    - It creates structured JSON representations of the code objects based on the defined schemas.

3. **LLM Interaction:**
    - The structured JSON code objects are sent to the LLM.
    - The LLM processes the code objects and generates detailed documentation in JSON format based on the provided schemas.
    - The LLM response is sent back to FoFo Docs.

4. **Documentation Generation:**
    - FoFo Docs receives the JSON documentation from the LLM.
    - The Documentation Generator transforms the JSON into a readable format (e.g., Markdown, HTML).
    - It applies templates, formatting, and cross-linking.
    - It generates the final documentation files.

5. **Vector Database Storage (Optional):**
    - The generated documentation is converted into vector embeddings.
    - The embeddings are stored in the Vector Database along with the original documentation.

6. **Presentation (Optional):**
    - If a User Interface is present, the generated documentation is displayed to the user.
    - The user can browse, search, and interact with the documentation.

7. **RAG Functionality (Optional):**
    - If a User Interface is present, users can ask questions or make queries related to the code.
    - The Vector Database retrieves relevant documentation passages based on the query.
    - The LLM generates answers based on the retrieved passages.

**Additional Considerations:**

- **Error Handling:** Implement robust error handling to manage cases where code cannot be parsed or LLM responses are unexpected.
- **Caching:** Cache LLM responses to reduce processing time for repeated documentation generation. 
- **Testing:** Develop comprehensive tests to ensure the accuracy and reliability of the documentation generation process.

Let me know if you'd like a more detailed breakdown of any specific component or workflow step. 
