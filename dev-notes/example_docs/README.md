[Back to Readme](./README.md)


# Project | fofo-docs

## Project Description
The code implements a documentation generation tool called "fofodocs" that analyzes codebases, extracts information, and uses a large language model (LLM) to generate documentation in Markdown format. It aims to provide a comprehensive and user-friendly way to document code projects, including code objects, project structure, and dependencies.

## Tech Stack Description
This project appears to be a Python application using the FastAPI framework, with potential integration of TypeScript for frontend development. It utilizes various libraries including `chromadb` for vector database functionality, `huggingface_hub` for interacting with Hugging Face models, and `opentelemetry` for observability. 


## Features and Functions
The tool utilizes various features and functions, including:

* **Code Parsing:** Parses code files, extracts code objects (classes, functions, variables, etc.), and determines the project's technology stack and dependencies.
* **LLM Integration:** Leverages a large language model (LLM) to summarize code, generate descriptions, and annotate code objects.
* **Vector Database (RAG):** Uses a vector database to store and retrieve code snippets for context and search.
* **Documentation Generation:** Creates Markdown files for each code file and a README.md for the project overview, and converts them to HTML.
* **Annotation:** Annotates code objects with detailed information about their purpose, parameters, returns, usage examples, edge cases, dependencies, error handling, performance, and best practices.
* **CLI Interface:** Provides a command-line interface for users to interact with the tool and customize its behavior.
* **Error Handling:** Includes error handling for invalid file paths, LLM errors, and other potential issues.
* **Large File Handling:** Breaks large files into chunks to avoid exceeding LLM token limits.
* **Project Summary:** Generates a structured summary of the project, including project metadata, code files, code objects, and runtime data.
* **Custom Logging:** Provides a custom logging system with color-coded output, timestamps, and file logging.

## Project Dependencies / Modules:
  - @google-cloud/aiplatform - ^3.20.0
  - @google-cloud/vertexai - ^1.1.0
  - @google/generative-ai - ^0.1.3
  - chalk - ^5.3.0
  - chromadb - ^1.8.1
  - commander - ^12.0.0
  - dotenv - ^16.4.5
  - glob - ^10.3.15
  - js-yaml - ^4.1.0
  - jsonrepair - ^3.8.0
  - ollama - ^0.5.1
  - openai - ^4.47.1
  - showdown - ^2.1.0
  - @types/js-yaml - ^4.0.9
  - @types/showdown - ^2.0.6
  - typescript - ^5.4.5

## Table of Contents - Project Files


- [package.json](./package.json.md)

- [src/vectorDB.ts](./src/vectorDB.ts.md)

- [src/shared.ts](./src/shared.ts.md)

- [src/prompt.ts](./src/prompt.ts.md)

- [src/objectSchemas.ts](./src/objectSchemas.ts.md)

- [src/models.ts](./src/models.ts.md)

- [src/logger.ts](./src/logger.ts.md)

- [src/llmInterface.ts](./src/llmInterface.ts.md)

- [src/index.ts](./src/index.ts.md)

- [src/documentationGenerator.ts](./src/documentationGenerator.ts.md)

- [src/codeParser.ts](./src/codeParser.ts.md)

- [src/appData.ts](./src/appData.ts.md)

- [src/annotations.ts](./src/annotations.ts.md)

## Project/Team Context
N/A