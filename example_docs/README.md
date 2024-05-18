# Project | fofo-docs

## Project Description
The codebase aims to interact with vector databases, provide utility functions for file handling, generate prompts for code analysis, define TypeScript types, interact with language models, generate documentation, and parse codebases.

## Features and Functions
1. src/vectorDB.ts: Interacts with a vector database using ChromaClient, embedding functions from Google and OpenAI, and manages collections for storing and retrieving project-related data.
2. src/shared.ts: Provides utility functions for reading file content, breaking code into chunks, and counting tokens in a string.
3. src/prompt.ts: Generates prompts for identifying and describing different types of code objects within a given code snippet.
4. src/objectSchemas.ts: Defines TypeScript types and interfaces for summarizing and analyzing code projects.
5. src/llmInterface.ts: Interacts with various language models (LLMs) to generate responses based on provided prompts, supporting multiple backends including OLLAMA, VERTEX, and OPENAI.
6. src/index.ts: A CLI tool for generating documentation for a codebase using FoFo Docs.
7. src/documentationGenerator.ts: Generates Markdown documentation from a given project summary, including details about code files and various code objects within them.
8. src/codeParser.ts: Parses a codebase, generates summaries for code files, and stores relevant data in a vector database.

## Team Context
# Team: Sweet Papa Technologies, LLC

## About Sweet Papa Technologies, LLC
- Builds tools that utilize A.I. and Web3 technologies
- Founded in 2023
- Located in the United States

## Technical Stack and Tools:
- TypeScript, Quasar Framework, VueJS, Capacitor, Electron
- OpenAI, Google Cloud, Ollama, Firebase

## Table of Contents


- [src/vectorDB.ts](./src/vectorDB.ts.md)

- [src/shared.ts](./src/shared.ts.md)

- [src/prompt.ts](./src/prompt.ts.md)

- [src/objectSchemas.ts](./src/objectSchemas.ts.md)

- [src/llmInterface.ts](./src/llmInterface.ts.md)

- [src/index.ts](./src/index.ts.md)

- [src/documentationGenerator.ts](./src/documentationGenerator.ts.md)

- [src/codeParser.ts](./src/codeParser.ts.md)