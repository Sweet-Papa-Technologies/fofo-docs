# package.json - fofo-docs

**Summary:** This code defines a package.json file for a Node.js project called 'fofo-docs'. The goal of this project is to generate user documentation for code repositories using various tools and libraries.

- **File Location:** ./package.json
- **Language:** language: JavaScript 

## Table of Contents
- [variables](#variables)
- [imports](#imports)
- [exports](#exports)
## variables


### 🧮 name - VARIABLE
------------------------------------------------------------
**Description:** The name of the package. This is used to identify the package in the npm registry.

**Code Snippet:**
```
  "name": "fofo-docs"
```
- **Line:** 2
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines the name of the package, which is used to identify it in the npm registry.

### 🧮 version - VARIABLE
------------------------------------------------------------
**Description:** The version of the package. This is used to track changes to the package.

**Code Snippet:**
```
  "version": "1.3.0-alpha6"
```
- **Line:** 3
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines the version of the package. It is used to track changes and updates to the package.

### 🧮 description - VARIABLE
------------------------------------------------------------
**Description:** A brief description of the package. This is used to help users understand what the package does.

**Code Snippet:**
```
  "description": "Tool to generate user documentation for code repositories."
```
- **Line:** 4
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores a brief description of the "fofo-docs" package. It is used to provide a concise overview of the package's functionality for users.

### 🧮 main - VARIABLE
------------------------------------------------------------
**Description:** The entry point for the package. This is the file that will be executed when the package is installed.

**Code Snippet:**
```
  "main": "dist/index.js"
```
- **Line:** 5
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable specifies the entry point for the package. When the package is installed, this file will be executed.

### 🧮 repository - VARIABLE
------------------------------------------------------------
**Description:** The URL of the package's repository. This is used to help users find the source code for the package.

**Code Snippet:**
```
  "repository": "https://github.com/Sweet-Papa-Technologies/fofo-docs"
```
- **Line:** 6
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the URL of the package's repository. This URL is used to help users find the source code for the package.

### 🧮 test - VARIABLE
------------------------------------------------------------
**Description:** The command to run to test the package. This is used to ensure that the package is working correctly.

**Code Snippet:**
```
    "test": "echo \"Error: no test specified\" && exit 1"
```
- **Line:** 8
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines the command to run when testing the package. It's a placeholder that currently outputs an error message if no test is specified.
- **Usage Example:** 


```bash
npm test
```


### 🧮 test:dev:bad-params - VARIABLE
------------------------------------------------------------
**Description:** A development test command that runs the package with no parameters.

**Code Snippet:**
```
    "test:dev:bad-params": "npx ts-node src/index.ts"
```
- **Line:** 9
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines a development test command called "test:dev:bad-params" that runs the package using the "npx ts-node" command and executes the script located at "src/index.ts".
- **Usage Example:** 


```bash
npx ts-node src/index.ts
```

- **Dependencies:** npx, ts-node

### 🧮 test:dev:good-params - VARIABLE
------------------------------------------------------------
**Description:** A development test command that runs the package with parameters.

**Code Snippet:**
```
    "test:dev:good-params": "npx ts-node src/index.ts fofo-docs --input ./ --output ./test-output --test true"
```
- **Line:** 10
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines a development test command for the 'fofo-docs' package.
- **Parameters:** The command takes the following parameters:

- `--input`: Path to the codebase to be documented. Defaults to the current directory.
- `--output`: Path to the output directory for the generated documentation. Defaults to `./test-output`.
- `--test`: Flag to run in test mode. Set to `true`.
- **Returns:** This variable does not return any value.
- **Usage Example:** 

To run the test command, execute the following in your terminal:

bash
npx ts-node src/index.ts fofo-docs --input ./ --output ./test-output --test true
```

- **Edge Cases:** None.
- **Dependencies:** The command depends on the following packages:

- `ts-node`: Transpiles TypeScript code to JavaScript and executes it.
- `fofo-docs`: The main package for generating documentation.

### 🧮 dev:docs - VARIABLE
------------------------------------------------------------
**Description:** A development command that generates documentation from a JSON file.

**Code Snippet:**
```
    "dev:docs": "npx ts-node src/index.ts fofo-doc -g '../example_docs/projectContext-2024-05-18T07-10-49-301Z-gpt-4o.json' --output ./test-output"
```
- **Line:** 11
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This development command generates documentation from a JSON file.
- **Parameters:** None
- **Returns:** None
- **Usage Example:** 


```bash
npx ts-node src/index.ts fofo-doc -g '../example_docs/projectContext-2024-05-18T07-10-49-301Z-gpt-4o.json' --output ./test-output
```

- **Dependencies:** npx ts-node, fofo-doc

### 🧮 dev:single-file - VARIABLE
------------------------------------------------------------
**Description:** A development command that generates documentation for a single file.

**Code Snippet:**
```
    "dev:single-file": "npx ts-node src/index.ts fofo-doc --input './package.json' --output ./test-output"
```
- **Line:** 12
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This development command generates documentation for a single file.
- **Parameters:** The command takes two parameters: `--input` and `--output`. The `--input` parameter specifies the path to the single file for which documentation should be generated. The `--output` parameter specifies the directory where the generated documentation should be saved.
- **Returns:** The command does not return any value. It generates documentation files in the specified output directory.
- **Usage Example:** 


```bash
npx ts-node src/index.ts fofo-doc --input './package.json' --output ./test-output
```

- **Edge Cases:** If the input file does not exist or is not a valid file, the command will fail. If the output directory does not exist, the command will attempt to create it. If the output directory is not writeable, the command will fail.
- **Dependencies:** The command depends on the following packages: `ts-node`, `fofo-docs`, `package.json`, `test-output`.

### 🧮 dev - VARIABLE
------------------------------------------------------------
**Description:** A development command that generates documentation for the entire project.

**Code Snippet:**
```
    "dev": "npx ts-node src/index.ts fofo-docs --input ./ --output ./test-output"
```
- **Line:** 13
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines a script for running the documentation generation process in development mode.
- **Usage Example:** 

To run the documentation generation in development mode, execute the following command in your terminal:

bash
npm run dev
```

- **Dependencies:** This script relies on the following dependencies:

- `npx`: A package runner that allows you to execute packages without installing them globally.
- `ts-node`: A TypeScript runtime that allows you to execute TypeScript code directly.
- `fofo-docs`: The main command for the documentation generation tool.
- `--input ./`: Specifies the input directory for the codebase. In this case, it's the current directory.
- `--output ./test-output`: Specifies the output directory for the generated documentation. In this case, it's a directory named `test-output` in the current directory.

### 🧮 author - VARIABLE
------------------------------------------------------------
**Description:** The author of the package. This is used to help users contact the author of the package.

**Code Snippet:**
```
  "author": "Forrester Terry (fterry@sweetpapatechnologies.com)"
```
- **Line:** 15
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the author's name and email address, which is used to provide contact information for the package.

### 🧮 keywords - VARIABLE
------------------------------------------------------------
**Description:** A list of keywords that describe the package. This is used to help users find the package.

**Code Snippet:**
```
  "keywords": [
    "documentation",
    "code",
    "repo",
    "readme",
    "markdown"
  ]
```
- **Line:** 17
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This code object defines a list of keywords that are used to describe the package. These keywords are used to help users find the package when searching for it.

### 🧮 license - VARIABLE
------------------------------------------------------------
**Description:** The license for the package. This is used to specify how the package can be used.

**Code Snippet:**
```
  "license": "Apache-2.0"
```
- **Line:** 23
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines the license for the package, specifying how it can be used.

### 🧮 @google-cloud/aiplatform - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that provides access to Google Cloud AI Platform.

**Code Snippet:**
```
    "@google-cloud/aiplatform": "^3.20.0"
```
- **Line:** 25
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable imports the `@google-cloud/aiplatform` library, which provides access to Google Cloud AI Platform.

### 🧮 @google-cloud/vertexai - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that provides access to Google Cloud Vertex AI.

**Code Snippet:**
```
    "@google-cloud/vertexai": "^1.1.0"
```
- **Line:** 26
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This code object imports the `@google-cloud/vertexai` library, which provides access to Google Cloud Vertex AI services.
- **Dependencies:** This code object is a dependency of the project, meaning it is required for the project to run.

### 🧮 @google/generative-ai - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that provides access to Google Cloud Generative AI.

**Code Snippet:**
```
    "@google/generative-ai": "^0.1.3"
```
- **Line:** 27
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable represents a dependency for the package. It imports the `@google/generative-ai` library, which provides access to Google Cloud Generative AI services.

### 🧮 chalk - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that provides colored terminal output.

**Code Snippet:**
```
    "chalk": "^5.3.0"
```
- **Line:** 28
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `chalk` variable is a dependency for the package. It is used to provide colored terminal output.
- **Dependencies:** chalk library

### 🧮 chromadb - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that provides access to ChromaDB, a vector database.

**Code Snippet:**
```
    "chromadb": "^1.8.1"
```
- **Line:** 29
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines the dependency for the `chromadb` package, which is a library that provides access to ChromaDB, a vector database.

### 🧮 commander - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that provides command-line argument parsing.

**Code Snippet:**
```
    "commander": "^12.0.0"
```
- **Line:** 30
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines a dependency for the package, which is the "commander" library. This library provides command-line argument parsing capabilities.
- **Usage Example:** 


```typescript
const program = new Command();
program.option('-i, --input <path>', 'Path to your codebase (default: current directory)', '.');
program.parse();
```


### 🧮 dotenv - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that loads environment variables from a .env file.

**Code Snippet:**
```
    "dotenv": "^16.4.5"
```
- **Line:** 31
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `dotenv` variable represents a dependency for the package. It is a library that loads environment variables from a `.env` file.
- **Dependencies:** The `dotenv` library is a dependency for this package.

### 🧮 glob - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that provides file path matching.

**Code Snippet:**
```
    "glob": "^10.3.15"
```
- **Line:** 32
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines a dependency for the package, specifically the \"glob\" library, which is used for file path matching.
- **Dependencies:** glob library

### 🧮 js-yaml - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that provides YAML parsing.

**Code Snippet:**
```
    "js-yaml": "^4.1.0"
```
- **Line:** 33
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable imports the `js-yaml` library, which is used for parsing YAML files.
- **Dependencies:** js-yaml

### 🧮 jsonrepair - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that provides JSON repair functionality.

**Code Snippet:**
```
    "jsonrepair": "^3.8.0"
```
- **Line:** 34
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `jsonrepair` variable represents a dependency for the project. It imports the `jsonrepair` library, which provides functionality to repair malformed JSON strings.
- **Dependencies:** jsonrepair library

### 🧮 ollama - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that provides access to Ollama, a large language model.

**Code Snippet:**
```
    "ollama": "^0.5.1"
```
- **Line:** 35
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines a dependency for the package, specifically the "ollama" library. This library provides access to Ollama, a large language model.
- **Dependencies:** ollama library

### 🧮 openai - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that provides access to OpenAI's API.

**Code Snippet:**
```
    "openai": "^4.47.1"
```
- **Line:** 36
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable represents a dependency for the package. It imports the \`openai\` library, which provides access to OpenAI's API.
- **Dependencies:** openai library

### 🧮 showdown - VARIABLE
------------------------------------------------------------
**Description:** A dependency for the package. This is a library that provides Markdown to HTML conversion.

**Code Snippet:**
```
    "showdown": "^2.1.0"
```
- **Line:** 37
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable imports the 'showdown' library, which is used for converting Markdown to HTML.

### 🧮 @types/js-yaml - VARIABLE
------------------------------------------------------------
**Description:** A development dependency for the package. This is a library that provides type definitions for js-yaml.

**Code Snippet:**
```
    "@types/js-yaml": "^4.0.9"
```
- **Line:** 40
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This line in the `package.json` file specifies a development dependency for the project, indicating that the `@types/js-yaml` package is required during development but not in the production environment.

### 🧮 @types/showdown - VARIABLE
------------------------------------------------------------
**Description:** A development dependency for the package. This is a library that provides type definitions for showdown.

**Code Snippet:**
```
    "@types/showdown": "^2.0.6"
```
- **Line:** 41
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines a development dependency for the package, which is a library that provides type definitions for showdown.

### 🧮 typescript - VARIABLE
------------------------------------------------------------
**Description:** A development dependency for the package. This is the TypeScript compiler.

**Code Snippet:**
```
    "typescript": "^5.4.5"
```
- **Line:** 42
- **Location:** package.json (./package.json)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines the TypeScript compiler as a development dependency for the package. It specifies the version of the TypeScript compiler to use, which is 5.4.5 or later.
## imports


### 📥 Command - IMPORT
------------------------------------------------------------
**Description:** Imports the Command class from the commander library, which is used for creating command-line interfaces.

**Code Snippet:**
```
import { Command } from "commander";
```
- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `Command` class from the `commander` library, which is used for creating command-line interfaces (CLIs) in Node.js.
- **Usage Example:** 


```typescript
const program = new Command();
program.name("my-cli");
program.description("My CLI tool");
program.version("1.0.0");
program.option('-f, --foo <type>', 'Some option');
program.parse(process.argv);
```

- **Dependencies:** commander

### 📥 parseCodebase - IMPORT
------------------------------------------------------------
**Description:** Imports the parseCodebase function from the codeParser module, which is responsible for parsing the codebase and extracting code objects.

**Code Snippet:**
```
import { parseCodebase } from "./codeParser";
```
- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `parseCodebase` function from the `codeParser` module. This function is responsible for parsing the codebase and extracting code objects, such as classes, functions, variables, and types.
- **Usage Example:** 


```typescript
const projectSummary = await parseCodebase(projectPath, projectName);
```

- **Dependencies:** This code object depends on the `codeParser` module.

### 📥 generateDocumentation - IMPORT
------------------------------------------------------------
**Description:** Imports the generateDocumentation function from the documentationGenerator module, which is responsible for generating documentation from the parsed code objects.

**Code Snippet:**
```
import { generateDocumentation } from "./documentationGenerator";
```
- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `generateDocumentation` function from the `documentationGenerator` module. This function is responsible for generating documentation for the codebase in Markdown and HTML formats.
- **Usage Example:** 


```typescript
const bGenerated = await generateDocumentation(outputDir, parsedCodebase || projectSummary);
```

- **Dependencies:** The `generateDocumentation` function depends on the `documentationGenerator` module, which in turn depends on other modules like `fs` (for file system operations) and `showdown` (for Markdown to HTML conversion).

### 📥 fs - IMPORT
------------------------------------------------------------
**Description:** Imports the fs module, which provides access to the file system.

**Code Snippet:**
```
import fs from "fs";
```
- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `fs` module, which provides access to the file system in Node.js.
- **Dependencies:** Node.js built-in modules

### 📥 appHeaderPretty - IMPORT
------------------------------------------------------------
**Description:** Imports the appHeaderPretty function from the appData module, which is responsible for generating a pretty header for the application.

**Code Snippet:**
```
import { appHeaderPretty, getAppVersion } from "./appData";
```
- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `appHeaderPretty` function from the `appData` module. This function is responsible for generating a formatted header for the application, which includes information like the application version, project name, path, selected language model, RAG service, and output path.
- **Usage Example:** 


```typescript
import { appHeaderPretty } from './appData';

const header = appHeaderPretty({ ...runtimeData });
console.log(header);
```

- **Dependencies:** This code depends on the `appData` module, which contains the `appHeaderPretty` function.

### 📥 ProjectSummary - IMPORT
------------------------------------------------------------
**Description:** Imports the ProjectSummary interface from the objectSchemas module, which defines the structure of the project summary object.

**Code Snippet:**
```
import { ProjectSummary, runtimeData } from "./objectSchemas";
```
- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ProjectSummary` interface is imported from the `objectSchemas` module. It defines the structure of the project summary object, which is used to store information about a codebase.
- **Usage Example:** 


```typescript
const projectSummary: ProjectSummary = {
  projectName: "MyProject",
  projectDescription: {
    goal: "This project is a web application that allows users to...",
    features_functions: "The application has features such as..."
  },
  projectLocation: "/path/to/project",
  projectTechStackDescription: "This project uses TypeScript, React, and Node.js",
  projectDependencies: [
    { name: "react", version: "18.2.0", description: "A JavaScript library for building user interfaces" },
    { name: "express", version: "4.18.2", description: "A Node.js web application framework" }
  ],
  codeFiles: [
    // ... code file summaries
  ],
  ragData: [
    // ... RAG data
  ],
  teamContext: "This project is being developed by a team of engineers..."
};
```

- **Dependencies:** objectSchemas

### 📥 colorize - IMPORT
------------------------------------------------------------
**Description:** Imports the colorize function from the shared module, which is responsible for adding color to console output.

**Code Snippet:**
```
import { colorize, getContextFromFile, makeOSpathFriendly } from "./shared";
```
- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `colorize` function is imported from the `shared` module. It is used to add color to console output, enhancing readability and providing visual cues.
- **Usage Example:** 


```typescript
console.log(colorize("This text is blue", "blue"));
```

- **Dependencies:** The `colorize` function depends on the `shared` module, which provides utility functions for handling text, code, and file operations.

### 📥 annotateProject - IMPORT
------------------------------------------------------------
**Description:** Imports the annotateProject function from the annotations module, which is responsible for annotating code objects with additional information.

**Code Snippet:**
```
import { annotateProject } from "./annotations";
```
- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `annotateProject` function imports the `annotateProject` function from the `annotations` module. This imported function is likely used to annotate code objects within a project with additional information, such as descriptions, comments, or usage examples.
- **Usage Example:** 


```typescript
const annotatedProject = annotateProject(projectSummary, outputDir);
```

- **Dependencies:** The `annotateProject` function depends on the `annotations` module, which likely contains the implementation for annotating code objects.

### 📥 logger - IMPORT
------------------------------------------------------------
**Description:** Imports the logger module, which is responsible for logging information to the console.

**Code Snippet:**
```
import "./logger";
```
- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `logger` module, which is responsible for logging information to the console.
- **Dependencies:** The `logger` module is defined in the `src/logger.ts` file.
## exports


### 📤 fofoDocsBuiltInGlobSearch - EXPORT
------------------------------------------------------------
**Description:** Array of glob patterns for searching for dependency files in a project.

**Code Snippet:**


```typescript
export const fofoDocsBuiltInGlobSearch = [
    // TypeScript / Node.js / JS
    "package.json",
    "**/package.json",
    "**/**/package.json",

    // Python
    "**/requirements.txt",
    "**/**/requirements.txt",
    "**/Pipfile",
    "**/**/Pipfile",
    
    // Ruby
    "**/Gemfile",
    "**/**/Gemfile",
    
    // Java
    "**/pom.xml",
    "**/**/pom.xml",

    // Swift
    "**/Podfile",
    "**/**/Podfile",

    // C#
    "**/packages.config",
    "**/**/packages.config",

    // C++
    "**/CMakeLists.txt",
    "**/**/CMakeLists.txt",

    // Kotlin
    "**/build.gradle",
    "**/**/build.gradle",

    // Go
    "**/go.mod",
    "**/**/go.mod",

    // PHP
    "**/composer.json",
    "**/**/composer.json",

    // Rust
    "**/Cargo.toml",
    "**/**/Cargo.toml",

    // Dart
    "**/pubspec.yaml",
    "**/**/pubspec.yaml",

    // Scala
    "**/build.sbt",
    "**/**/build.sbt",

    // Haskell
    "**/stack.yaml",
    "**/**/stack.yaml",

    // Lua
    "**/rockspec",
    "**/**/rockspec",

    // Erlang
    "**/rebar.config",
    "**/**/rebar.config",

    // Elixir
    "**/mix.exs",
    "**/**/mix.exs",

    // Julia
    "**/Project.toml",
    "**/**/Project.toml",

    // R
    "**/DESCRIPTION",
    "**/**/DESCRIPTION",

    // Golang
    "**/go.mod",
    "**/**/go.mod",
    
];
```

- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This constant defines a list of glob patterns used to search for dependency files within a project. It includes patterns for various programming languages and package managers.

### 📤 fofoDocsBuiltInFileSearch - EXPORT
------------------------------------------------------------
**Description:** Array of glob patterns for searching for source code files in a project.

**Code Snippet:**


```typescript
export const fofoDocsBuiltInFileSearch = [
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx",
    "**/*.swift",
    "**/*.java",
    "**/*.py",
    "**/*.go",
    "**/*.rb",
    "**/*.php",
    "**/*.cs",
    "**/*.cpp",
    "**/*.c",
    "**/*.h",
    "**/*.hpp",
    "**/*.m",
    "**/*.mm",
    "**/*.kt",
    "**/*.kts",
    "**/*.sql",
    "**/*.r",
    "**/*.scala",
    "**/*.sh",
    "**/*.bat",
    "**/*.cmd",
    "**/*.rs",
    "**/*.dart",
    "**/*.erl",
    "**/*.ex",
    "**/*.exs",
    "**/*.hs",
    "**/*.jl",
    "**/*.lua",
  
    "**/*.pl",
    "**/*.pm",
    "**/*.r",
    "**/*.tcl",
    "**/*.vb",
    "**/*.vbs",
    "**/*.xml",
    "**/*.html",
    "**/*.css",
    "**/*.scss",
    "**/*.sass",
    "**/*.less",
    "**/*.yaml",
    "**/*.yml",
    "**/*.json"
]
```

- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This constant defines a list of glob patterns used to search for source code files within a project.

### 📤 appHeaderPretty - EXPORT
------------------------------------------------------------
**Description:** Function that generates a pretty header for the FoFo Docs application.

**Code Snippet:**


```typescript
export const appHeaderPretty = (runtimeData:runtimeData) => `

${headerColored}

Version: ${colorize(runtimeData.appVersion, 'blue')}
Project: ${colorize(runtimeData.projectName, 'magenta')}
Path: ${colorize(runtimeData.projectPath, 'magenta')}

Selected Language Model: ${colorize(runtimeData.selectedLLModel || 'Undefined', 'yellow')}
Selected RAG Service: ${colorize(runtimeData.selectedRAGService, 'yellow')}

Output Path: ${colorize(runtimeData.outputPath, 'green')}

====================================================================================
`
```

- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function generates a formatted header for the FoFo Docs application, displaying information like the application version, project name, path, selected language model, RAG service, and output path.
- **Parameters:** runtimeData:runtimeData - An object containing runtime data for the application, including appVersion, projectName, projectPath, selectedLLModel, selectedRAGService, and outputPath.
- **Returns:** A string representing the formatted header for the FoFo Docs application.
- **Usage Example:** 


```typescript
const runtimeData = {
  appVersion: '1.0.0',
  projectName: 'MyProject',
  projectPath: './my-project',
  selectedLLModel: 'gpt-4o',
  selectedRAGService: 'ON',
  outputPath: './docs'
};

const header = appHeaderPretty(runtimeData);
console.log(header);
```

- **Dependencies:** colorize, headerColored

### 📤 getAppVersion - EXPORT
------------------------------------------------------------
**Description:** Function that retrieves the version of the FoFo Docs application from the package.json file.

**Code Snippet:**


```typescript
export function getAppVersion() {
    try {
        const scriptDirectory = __dirname;
        const packageJSONpath = path.join(scriptDirectory, "../package.json");
        const packageJSON = readFileSync(packageJSONpath, "utf-8");
        const packageJSONParsed = JSON.parse(packageJSON);
        return packageJSONParsed.version;
    } catch (error) {
        console.error("Error reading package.json", error);
        return "AWESOME VERSION - THE ONE INCAPABLE OF RETURNING ITS OWN VERSION";
    }
}
```

- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `getAppVersion` function retrieves the version of the FoFo Docs application from the `package.json` file.
- **Returns:** The function returns a string representing the version of the FoFo Docs application. If an error occurs while reading the `package.json` file, it returns a default string indicating that the version could not be retrieved.
- **Usage Example:** 


```typescript
const appVersion = getAppVersion();
console.log(`FoFo Docs Version: ${appVersion}`);
```

- **Edge Cases:** The function handles the case where the `package.json` file is not found or cannot be read. In this case, it returns a default string indicating that the version could not be retrieved.
- **Dependencies:** The function depends on the following modules:
- `fs` (for reading files)
- `path` (for manipulating file paths)

### 📤 isNoNoFile - EXPORT
------------------------------------------------------------
**Description:** Function that checks if a file is a 'no-no' file, meaning it should be ignored during code parsing.

**Code Snippet:**


```typescript
export function isNoNoFile(file: string, ignoreMeh:string[]=[]): boolean {
    let isNoNo = false;

    const nonoDirs = [
        "node_modules",
        "dist",
        "build",
        "out",
        "bin",
        "obj",
        "venv",
        "__pycache__",
        ".DS_Store",
        ".vscode",
        "coverage",
        ".nyc_output",
        ".mypy_cache",
        ".pytest_cache",
        ".tox",
        ".nox",
        ".coverage",
        ".hypothesis",
        ".git",
        ".hg",
        ".svn",
        ".bzr",
        "htmlcov",
        "site",
        ".sass-cache",
        ".cache",
        "npm-debug.log",
        "yarn-debug.log",
        "yarn-error.log",
        ".env",
        ".venv",
        ...ignoreMeh
    ]

    const noNoKeywords = [
        "node_modules/",
        "tsconfig.json",
        ".md",
        "dist/",
        "build/",
        "out/",
        "bin/",
        "obj/",
        "venv/",
        "__pycache__/",
        "*.pyc",
        "*.pyo",
        ".DS_Store",
        "*.class",
        "*.jar",
        "*.war",
        "*.ear",
        "*.dll",
        "*.exe",
        "*.out",
        "*.log",
        "*.tmp",
        "*.lock",
        "yarn.lock",
        "package-lock.json",
        "pipfile.lock",
        "poetry.lock",
        "*.iml",
        ".idea/",
        "*.suo",
        "*.user",
        "*.userosscache",
        "*.sln.docstates",
        "*.swp",
        "*.swo",
        "*.bak",
        "*.orig",
        "*.rej",
        ".vscode/",
        "coverage/",
        ".nyc_output/",
        "*.test",
        "*.spec",
        "*.snap",
        "target/",
        "Pods/",
        "DerivedData/",
        ".gradle/",
        "*.xcworkspace",
        "*.xcodeproj",
        "CMakeFiles/",
        "CMakeCache.txt",
        "CMakeLists.txt.user",
        ".mypy_cache/",
        ".pytest_cache/",
        ".tox/",
        ".nox/",
        ".coverage",
        ".hypothesis/",
        "*.prof",
        ".xml",
        ".json",
        ".html",
        ".css",
        ".scss",
        ".sass",
        ".less",
        ".yaml",
        ".yml",
        ".env",
        ".env.*",
        ".git/",
        ".hg/",
        ".svn/",
        ".bzr/",
        "nosetests.xml",
        "test-results.xml",
        "tests/__pycache__/",
        "tests/*.pyc",
        "tests/*.pyo",
        "docs/_build/",
        "*.ipynb_checkpoints",
        "htmlcov/",
        "site/",
        ".sass-cache/",
        ".cache/",
        "npm-debug.log",
        "yarn-debug.log",
        "yarn-error.log",
        ".env",
        ".env.*",
        ".venv/"
    ]
    
    for (const keyword of noNoKeywords) {
        if (file.includes(keyword)) {
            isNoNo = true;
            break;
        }
    }

    for (const OKkeyword of fofoDocsBuiltInGlobSearch) {

        if (file.includes(OKkeyword)) {
            let isOK = true

            for (const dir of nonoDirs) {
                if (file.includes(dir)) {
                    isOK = false;
                    break;
                }
            }

            if (isOK === true) {
                isNoNo = false;
                break;
            }
        }
    }

    return isNoNo;

}
```

- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function checks if a file is a 'no-no' file, meaning it should be ignored during code parsing. It does this by checking if the file name or path contains any of the keywords or directories in the `noNoKeywords` or `nonoDirs` arrays, respectively. It also checks if the file name includes any of the keywords in the `fofoDocsBuiltInGlobSearch` array, but only if it is not in any of the `nonoDirs`.
- **Parameters:** - `file`: The file name or path to check.
- `ignoreMeh`: An optional array of additional directories or keywords to ignore.
- **Returns:** A boolean value indicating whether the file is a 'no-no' file (true) or not (false).
- **Usage Example:** 


```typescript
const isNoNo = isNoNoFile("node_modules/my-package/index.js");
console.log(isNoNo); // true

const isOK = isNoNoFile("src/my-component.tsx");
console.log(isOK); // false
```

- **Edge Cases:** None.
- **Dependencies:** None.

### 📤 parseCodebase - EXPORT
------------------------------------------------------------
**Description:** Function that parses a codebase and generates a ProjectSummary object.

**Code Snippet:**


```typescript
export async function parseCodebase(
  projectPath: string,
  projectName: string
): Promise<ProjectSummary> {
  const projectSummary: ProjectSummary = {
    projectName: projectName,
    projectDescription: {} as codeSummary,
    projectDependencies: [],
    projectLocation: projectPath,
    projectTechStackDescription: "",
    codeFiles: [],
    ragData: [],
    teamContext: "",
  };

  // Clean projectPath of any trailing slashes or '"' characters
  projectPath = projectPath.replace(/\$/, "");
  projectPath = projectPath.replace(/\\$/g, "");
  projectPath = projectPath.replace(/"/g, "");

  const ignorePatterns = [
    "**/node_modules",
    "node_modules",
    "dist",
    "*/node_modules/**",
    "*/dist/**",
    "node_modules/**",
    "dist/**",
    ...(await getIgnoredFiles(projectPath)),
  ];

  projectSummary.teamContext = getContextFromFile(); 
  console.log("Team/Project Context:
", projectSummary.teamContext)

  let filePaths: string[] = [];
  let bIsDir = false
  // Determine if the projectPath is a directory or a file

  if (fs.lstatSync(projectPath).isDirectory()) {

    filePaths = await glob(["**/*", "*"], {
      cwd: projectPath,
      ignore: ignorePatterns,
    });
    bIsDir = true
  } else {
    const file = projectPath.split("/").pop();
    projectPath = projectPath.split("/").slice(0, -1).join("/");

    if (!file) {
      throw new Error("Invalid file path");
    }
    filePaths = [file];
  }

  // Determine the general information about the project, and determine if there are any package dependencies, etc:
  if (bIsDir === true) {
  const filePathsTruncated = filePaths.length > 500 ? filePaths.slice(0, 500) : filePaths;
  console.log("===> Determining Project Stack and Dependencies:

");
  console.log("Files to Determine Stack:", filePathsTruncated.length);
  //console.debug(filePathsTruncated)
  const projectStackLang = await infer(
    determineProjectStack(filePathsTruncated),
    "TEXT STRING",
    undefined,
    false,
    undefined,
    undefined,
    llmToUse
  ) as any;

  projectSummary.projectTechStackDescription = projectStackLang.response;

  console.log("Project Stack Language:", projectStackLang.response);

  // const associatedDependencyFiles = await infer(
  //   getPackageDependenciesBasedOnLanguage(projectStackLang.response),
  //   "JSON object",
  //   undefined,
  //   false,
  //   undefined,
  //   undefined,
  //   llmToUse
  // ) as globResult;

  // const detectedGlobs = await infer(
  //   getGlobsBasedOnLangStack(projectStackLang.response),
  //   "JSON object",
  //   undefined,
  //   false,
  //   undefined,
  //   undefined,
  //   llmToUse
  // ) as globResult;

  // console.log("Detected Globs:", detectedGlobs.glob);
  // console.log("Detected Ignore Patterns:", detectedGlobs.ignore);
  // Search for the specific files the LLM decided we should look for:

  // Update Files Paths to Include LLM Result:
  const ignoreMeh = await getIgnoredFiles(projectPath)
  filePaths = await glob(["**/*.{ts,js,tsx,jsx}", ...fofoDocsBuiltInFileSearch], {
    cwd: projectPath,
    ignore: [...ignorePatterns],
  }).then((res) => {
    console.log("All Files LEN:", res.length);
    return res.filter((file) => isNoNoFile(file) === false);
  });

  console.log(filePaths)
  console.log("POST Filter Files to Process LEN:", filePaths.length);

  console.log("Searching for Dependency Files:", fofoDocsBuiltInGlobSearch)
  console.log("Ignoring Files:", ignorePatterns)

  const dependencyFiles = await glob(fofoDocsBuiltInGlobSearch, {
    cwd:projectPath,
    ignore: ignorePatterns,
  })
  .then((res) => {
    console.log("Dependency Files Found (PRIOR):", res);
    return res.filter((file) => isNoNoFile(file, ignoreMeh) === false);
  });

  console.log("Dependency Files Found:", dependencyFiles);

  // Process each dependency file:
  for (const depFileName of dependencyFiles) {
    const depFile = `${projectPath}/${depFileName}`;
    console.log("Processing Dependency File:", depFile);
    const depFileContent = await readFile(`${depFile}`, "utf-8");
    const relevantPackagesModules = await infer(
      determineModulesPackagesFromFile(depFileContent),
      "JSON object",
      undefined,
      false,
      undefined,
      undefined,
      llmToUse
    ) as moduleObject;

    projectSummary.projectDependencies.push(relevantPackagesModules);
  }

  // if the result array is nested, or it is an array of arrays, we need to flatten it
  projectSummary.projectDependencies = projectSummary.projectDependencies.flat(1);

}

console.log(filePaths)
  // Process Each File!
  console.log("===> Processing Code Files:

");
  console.log("Files to Process:", filePaths.length);
  
  // pause for a moment so user can see
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const warnIfOverValue = Number(process.env.WARN_IF_OVER || "100");
  console.log("Warn if over value:", warnIfOverValue);

  if (filePaths.length === 0) {
    console.log("No files to process, exiting...");
    return projectSummary;
  }

  if (filePaths.length > warnIfOverValue) {
    console.warn("Warning: Large number of files to process, this may take a while...");

    // Prompt to see if they want to continue:
    const bContinue = await promptUser("Continue processing files? (y/n): ") as string;
    if (bContinue?.toLocaleLowerCase() !== "y") {
      console.log("Exiting...");
      return projectSummary;
    } else {
      console.log("ALRIGHT, LET'S CONTINUE...");
    }
  }

  for (const filePath of filePaths) {
    console.log(`Parsing file: ${filePath}`);
    const fullFilePath = `${projectPath}/${filePath}`;

    const fileLanguage = await infer(
      getLanguageTypeFromFile(fullFilePath),
      "TEXT STRING",
      "language",
      false,
      undefined,
      undefined,
      llmToUse
    );
    console.log("fileLanguage", fileLanguage.language);
    const codeFileSummary: CodeFileSummary = {
      fileName: filePath,
      fileLocation: fullFilePath,
      codeSummary: {} as codeSummary, // Placeholder, will be updated later
      language: fileLanguage.language || "Unknown",
      executionFlow: [], // Placeholder, will be updated later
      codeObjects: {} as CodeObject, // Placeholder, will be updated later
    };
    let currentLine = 0;

    if ((await isFileTooLarge(fullFilePath, 3000, breakNum)) == true) {
      // 750KB is the default limit
      // Handle large files by breaking into chunks and processing separately
      const fileContent = await readFile(fullFilePath, "utf-8");
      const codeChunks = breakCodeIntoChunks(fileContent, breakNum); // 1000 tokens per chunk
      const getCurrentLineEndLineBasedOnChunk = (chunk: string) => {
        const lines = chunk.split("\n");
        return {
          start: currentLine,
          end: currentLine + lines.length,
        };
      };
      console.log("Code broken into codeChunks length =", codeChunks.length);
      for (const [index, chunk] of codeChunks.entries()) {
        console.log(
          "Processing chunk:",
          index + 1,
          "of ",
          codeChunks.length,
          " chunks for file ",
          filePath
        );
        const endLine = getCurrentLineEndLineBasedOnChunk(chunk).end;

        const chunkCodeObjects = await genCodeChunkObj(projectSummary, fullFilePath, chunk)
        .then(
          (res) => {

            try {
              const codeLineUpdatedObject =  findCorrectCodeLineForObject(res, chunk)
              if (codeLineUpdatedObject.codeLine){
                codeLineUpdatedObject.codeLine = codeLineUpdatedObject.codeLine + currentLine
                return codeLineUpdatedObject 
              }
            } catch (err) {
              console.error("Error finding correct code line for object", err);
          }
          return res
        });

        // Update the Data with correct line information:
        
        const ragData: RagData = {
          metadata: {
            filename: fullFilePath,
            codeChunkId: index,
            codeChunkLineStart: currentLine,
            codeChunkLineEnd: endLine,
            codeObjects: chunkCodeObjects,
            codeChunkSummary: chunkCodeObjects.description,
          },
          documentData: chunk,
          allSearchResults: {
            ids: [],
            embeddings: null,
            documents: [],
            metadatas: [],
            distances: null
          },
          allResults: {
            documents: undefined,
            embeddings: null,
            metadatas: []
          }
        };

        projectSummary.ragData.push(ragData);

        codeFileSummary.codeObjects = mergeObjectArrays(
          codeFileSummary.codeObjects,
          chunkCodeObjects
        );
        codeFileSummary.codeSummary = await getCodeSummaryFromLLM(
          chunk,
          llmToUse
        );

        await saveToVectorDatabase(projectName, chunk, ragData);

        currentLine = endLine;
      }
    } else {
      const fileContent = await readFile(fullFilePath, "utf-8");
      const codeObjects = await genCodeChunkObj(projectSummary, fullFilePath, fileContent)
      .then(
        (res) => {

          try {
            const codeLineUpdatedObject =  findCorrectCodeLineForObject(res, fileContent)
            return codeLineUpdatedObject 

          } catch (err) {
            console.error("Error finding correct code line for object", err);
            
        }
        return res
      });
      // Process code objects and update projectSummary and codeFiles

      // Process each chunk's code objects (update projectSummary.ragData, etc.)
      const ragData: RagData = {
        metadata: {
          filename: fullFilePath,
          codeChunkId: 0,
          codeChunkLineStart: 1,
          codeChunkLineEnd: getTotalLines(fileContent),
          codeObjects: codeObjects,
          codeChunkSummary: codeObjects.description,
        },
        documentData: fileContent,
        allSearchResults: {
          ids: [],
          embeddings: null,
          documents: [],
          metadatas: [],
          distances: null
        },
        allResults: {
          documents: undefined,
          embeddings: null,
          metadatas: []
        }
      };

      projectSummary.ragData.push(ragData); 

      await saveToVectorDatabase(projectName, fileContent, ragData);

      codeFileSummary.codeObjects = mergeObjectArrays(
        codeFileSummary.codeObjects,
        codeObjects
      );
      codeFileSummary.codeSummary = await getCodeSummaryFromLLM(
        fileContent,
        llmToUse
      );
    }

    // WE need to define the overall execution flow here, with another LLM call?

    projectSummary.codeFiles.push(codeFileSummary);
  }

  let codeDescription = '';
    for (const codeFile of projectSummary.codeFiles) {

        codeDescription += `## ${codeFile.fileName}
`;
        codeDescription += codeFile.codeSummary.goal + "\n" + 
        codeFile.codeSummary.features_functions + "\n\n";
    }
  projectSummary.projectDescription = 
    await getCodeSummaryFromLLM(
      "# Summaries of Code Files: \n" + codeDescription,
      llmToUse
    )
  

  return projectSummary;
}
```

- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `parseCodebase` function is responsible for parsing a codebase (a directory or a single file) and generating a `ProjectSummary` object that contains information about the project, its dependencies, and its code files.
- **Parameters:** - `projectPath`: The path to the codebase (directory or file). 
- `projectName`: The name of the project.
- **Returns:** A `ProjectSummary` object containing information about the project, its dependencies, and its code files.
- **Usage Example:** 


```typescript
const projectSummary = await parseCodebase('./my-project', 'My Project');
```

- **Edge Cases:** - The function handles large files by breaking them into chunks and processing them separately. 
- It also handles cases where the project path is a directory or a single file. 
- The function also handles cases where the project has a large number of files, prompting the user to continue or exit.
- **Dependencies:** - `glob`: For finding files in a directory. 
- `fs/promises`: For reading files. 
- `objectSchemas`: For defining the data structures used in the function. 
- `llmInterface`: For calling the LLM to infer information about the project. 
- `prompt`: For generating prompts for the LLM. 
- `vectorDB`: For saving code snippets to the vector database. 
- `shared`: For utility functions. 
- `dotenv/config`: For loading environment variables. 
- `readline`: For prompting the user for input.

### 📤 findCorrectCodeLineForObject - EXPORT
------------------------------------------------------------
**Description:** Function that finds the correct line number for a code object within a code snippet.

**Code Snippet:**


```typescript
export function findCorrectCodeLineForObject(codeObj: CodeObject, code: string): CodeObject {
  // Split the entire code into lines
  const codeLines = code.split("\n");

  // Function to find the start line of a code snippet with fuzzy matching
  const findStartLine = (snippetLines: string[], codeLines: string[]): number => {
      for (let i = 0; i < codeLines.length; i++) {
          let match = true;
          for (let j = 0; j < snippetLines.length; j++) {
              if (i + j >= codeLines.length || !codeLines[i + j].includes(snippetLines[j].trim())) {
                  match = false;
                  break;
              }
          }
          if (match) {
              return i + 1; // Line numbers are 1-based
          }
      }
      return -1; // Not found
  };

  // Find the correct code line for each object
  for (const key in codeObj) {
      const codeObject = codeObj as any;
      try {
        for (const objects of codeObject[key]) {
          const obj = objects as CodeObject;
          const codeSnippet = obj.codeSnippet;
          const snippetLines = codeSnippet.split("\n");

          const startLine = findStartLine(snippetLines, codeLines);
          obj.codeLine = startLine !== -1 ? startLine : -2;
      }

      } catch(err) {
          console.error("Error finding correct code line for object", err);
          console.debug("Code Object:", codeObj);
          console.debug("Code Object Key:", codeObject[key]);
          continue
      }
  }
  return codeObj;
}



// Helper Functions Implementation:
async function getIgnoredFiles(projectPath: string): Promise<string[]> {
  let ignorePatterns: string[] = [];
  const basePath = projectPath.split("/").slice(0, -1).join("/");
  const executionPath = process.cwd();

  console.log("basePath", basePath);
  console.log("executionPath", executionPath);

  // CHECK for these files in order:
  const pathsToCheck = [
    `${basePath}/.gitignore`,
    `${basePath}/.fofoignore`,
    `${executionPath}/.gitignore`,
    `${executionPath}/.fofoignore`,
  ];

  for (const path of pathsToCheck) {
    if (path.includes("fofoignore")) {
      try {
        const fofoignoreContent = await readFile(
          path,
          "utf-8"
        );
        ignorePatterns.push(...fofoignoreContent.split("\n").filter(Boolean));
      } catch (err) {
        // .fofoignore not found, ignore the error
        console.warn("No .fofoignore file found in " + path);
      }
    } else {
      try {
        const gitignoreContent = await readFile(
          path,
          "utf-8"
        );
        ignorePatterns.push(...gitignoreContent.split("\n").filter(Boolean)); // Filter out empty lines
      } catch (err) {
        // .gitignore not found, ignore the error
        console.warn("No .gitignore file found in " + path);
      }
    }
  }

  return ignorePatterns;
}

async function getFileSizeInKB(filePath: string): Promise<number> {
  return await stat(filePath).then((stats) => stats.size / 1024);
}

async function isFileTooLarge(
  filePath: string,
  maxFileSizeKB: number,
  maxChars: number = 300
): Promise<boolean> {
  // Check the amount of characters in the file content
  const file = readFileSync(filePath, "utf-8");
  const tooLong = getTokens(file) > maxChars;

  if (tooLong === true) return true;

  return await getFileSizeInKB(filePath).then((size) => size > maxFileSizeKB);
}
```

- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function iterates through each code object in a code file and attempts to find the correct line number where the code snippet for that object starts within the entire code content of the file.
- **Parameters:** - `codeObj`: A `CodeObject` representing a code element (class, function, variable, etc.) with a `codeSnippet` property containing the code snippet for that element.
- `code`: A string representing the entire code content of the file.
- **Returns:** The original `codeObj` with an updated `codeLine` property, which represents the starting line number of the code snippet within the file. If the line number cannot be determined, the `codeLine` property is set to -2.
- **Usage Example:** 


```typescript
const codeObject = {
  name: 'myFunction',
  type: 'function',
  codeSnippet: 'function myFunction() { ... }'
};

const codeContent = '// Some code above
function myFunction() { ... }
// Some code below';

const updatedCodeObject = findCorrectCodeLineForObject(codeObject, codeContent);

console.log(updatedCodeObject.codeLine); // Output: 2 (assuming the function starts on line 2)
```

- **Edge Cases:** The function uses fuzzy matching to find the starting line number. If the code snippet is not a perfect match within the code content, the line number might be inaccurate or not found.
- **Dependencies:** None

### 📤 generateDocumentation - EXPORT
------------------------------------------------------------
**Description:** Function that generates documentation for a project, converting JSON data to Markdown and then to HTML.

**Code Snippet:**


```typescript
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
```

- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function generates documentation for a project, converting JSON data to Markdown and then to HTML.
- **Parameters:** - folderPath: string - The path to the output folder where the documentation will be generated.
- projectContext: ProjectSummary | null - An optional ProjectSummary object containing project information, code files, and dependencies. If not provided, the function will attempt to read the project context from a JSON file.
- jsonFile: string - An optional path to a JSON file containing the project context. If provided, the function will read the project context from this file instead of using the provided projectContext object.
- **Returns:** boolean - Returns true if the documentation generation was successful, false otherwise.
- **Usage Example:** 


```typescript
const projectContext = { ... }; // ProjectSummary object
const outputFolder = './docs';
const success = await generateDocumentation(outputFolder, projectContext);
console.log(success); // true if successful
```

- **Edge Cases:** - If the output folder does not exist, the function will attempt to create it. If the folder cannot be created, the function will use a backup directory.
- If the output folder is not writeable, the function will throw an error.
- **Dependencies:** - fs: Node.js file system module
- path: Node.js path module
- dotenv: Environment variable loading module
- makeOSpathFriendly: Function from the shared module to make file paths OS-friendly
- showdown: Markdown to HTML converter
- jsonToMarkdown: Function to convert JSON data to Markdown
- markdownToHTML: Function to convert Markdown to HTML

### 📤 getFileContentLen - EXPORT
------------------------------------------------------------
**Description:** Function that retrieves the length of the content of a file.

**Code Snippet:**


```typescript
export async function getFileContentLen(filePath: string): Promise<number> {
    return await readFile(filePath, 'utf-8').then(content => content.length);
}
```

- **Line:** Could Not Verify Line
- **Location:** package.json (./package.json)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function retrieves the length of the content of a file.
- **Parameters:** filePath: string - The path to the file.
- **Returns:** Promise<number> - A promise that resolves to the length of the file's content.
- **Usage Example:** 


```typescript
const filePath = './myFile.txt';
const fileContentLen = await getFileContentLen(filePath);
console.log('File content length:', fileContentLen);
```

- **Edge Cases:** If the file does not exist or cannot be read, the promise will reject with an error.
- **Dependencies:** fs/promises: readFile - This function uses the readFile function from the fs/promises module to read the file content.

### 📤 getTotalLines - EXPORT
------------------------------------------------------------
**Description:** Function that counts the number of lines in a string of code.

**Code Snippet:**


```typescript
```

- **Line:** 42
- **Location:** undefined (Unable to Load)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function counts the number of lines in a string of code.
- **Parameters:** code: string - The string of code to count the lines of.
- **Returns:** number - The number of lines in the code string.
- **Usage Example:** 


```typescript
const code = `
const myVar = 'hello';
console.log(myVar);
`;
const numLines = getTotalLines(code);
console.log(numLines); // Output: 3
```

