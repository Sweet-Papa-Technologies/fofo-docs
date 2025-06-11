<center><img src="dev-notes/example_docs/fofo-docs-lighter.png" alt="drawing" width="500px" height="270px" /></center>


## About

FoFo Docs is an intelligent documentation generation tool designed to assist developers and technical writers in creating comprehensive and up-to-date documentation for software projects. By leveraging the power of Large Language Models (LLMs), FoFo Docs automates significant portions of the documentation process, allowing teams to maintain high-quality documentation with greater efficiency.

**Core Functionalities:**

*   **Automated Code Analysis:** FoFo Docs parses your codebase to understand its structure, components, functions, classes, and relationships.
*   **Intelligent Documentation Generation:** Utilizes LLMs to generate descriptive summaries, explanations of code logic, parameter descriptions, return values, and usage examples.
*   **Flow Chart Creation:** Generates MermaidJS-based flow charts and diagrams to visually represent code execution paths, component interactions, and data flows.
*   **Contextual Understanding:** Incorporates project-specific context (via a context file or RAG with a vector database) to tailor documentation to your project's nuances.
*   **Persistent Storage:** Saves generated documentation and project context in JSON files, allowing for easy regeneration and versioning.

**Intended Audience:**

*   **Developers:** Quickly generate baseline documentation for new features, understand existing codebases better, and maintain internal technical documentation.
*   **Technical Writers:** Accelerate the documentation process by using LLM-generated content as a starting point, focusing on refinement and ensuring consistency.
*   **Teams:** Improve collaboration and knowledge sharing by maintaining a well-documented codebase.

#### Example Documentation Output : [Example Output](dev-notes/example_docs/README.md)

## Technical Stack

FoFo Docs is built using the following primary technologies:

*   **TypeScript:** For robust, type-safe JavaScript development.
*   **Node.js:** As the runtime environment for the application.
*   **Large Language Models (LLMs):** Primarily Google's Gemini family (currently optimized for Gemini Flash) for content generation. Support for other models via `LLM_TO_USE` env variable.
*   **Puppeteer:** For rendering MermaidJS charts into images.
*   **ChromaDB (Optional):** For Retrieval Augmented Generation (RAG) to provide more contextually relevant documentation by searching existing project data.
*   **Commander.js:** For command-line interface management.

## Getting Started:
🚧 NOTE: This project is still in development. While configurable, it has been primarily tested and optimized for Google's Gemini Flash models due to cost considerations with larger models for full project analysis.


### Setup Dependencies
- Clone the repository
- CD into "app" and Run `npm install` to install dependencies
    - Ensure you have Node.js installed on your machine, and can call `npx` from the command line
- (Optional) If you want to let the app use RAG to improve documentation output, we currently support using Chroma DB as the backend (more to come soon)
    - To get a local server running, you can run:
    ### Via Python 
    `pip install chromadb` 
    `chroma run --path ./fofoDB`

    ### Via Docker
    `docker pull chromadb/chroma` 
    `docker run -p 8000:8000 chromadb/chroma`

    - To configure the server, you can edit the .env file in the app directory
        - For more advanced setups: [ChromaDB](https://docs.trychroma.com/deployment/aws#docker) 


### Configure Environment
- Create a `.env` file in the `app` directory. You can copy `example.env` to `.env` to get started.
- Fill out the required and any desired optional environment variables as detailed below.

#### .env Example and Variable Explanations:

```env
################################################################################
## User Settings - Configure these based on your setup
################################################################################

#-------------------------------------------------------------------------------
# LLM Configuration (Required for core functionality)
#-------------------------------------------------------------------------------
# Specifies the Large Language Model to use for generating documentation.
# While other models might work, 'gemini-1.5-flash-001' is recommended and tested.
# Required: Yes
LLM_TO_USE=gemini-1.5-flash-001

# API Key for the selected LLM provider (e.g., Google's Gemini API Key).
# Required: Yes
GEMINI_KEY=YOUR-GOOGLE-API-KEY

# Path to your Google Cloud service account JSON file.
# Required: If using Google Cloud services (like Vertex AI for LLMs or RAG embeddings).
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/google/serviceAccountKey.json

# Your Google Cloud Project ID.
# Required: If using Google Cloud services.
GCP_PROJECT_ID=your-gcp-project-id

# The Google Cloud region for your project.
# Required: If using Google Cloud services.
GCP_REGION="us-central1"

#-------------------------------------------------------------------------------
# RAG (Retrieval Augmented Generation) Settings (Optional)
#-------------------------------------------------------------------------------
# Determines the embedding mode for RAG.
# - "GCP": Use Google Cloud Vertex AI for embeddings (requires GEMINI_KEY and GCP setup).
# - "OFF": Disable RAG. The application will rely solely on the LLM's inherent knowledge and the CONTEXT_FILE.
# Required: No (Defaults to "OFF" if not set, but if you want RAG, configure appropriately)
EMBEDDER_MODE=GCP

# Specifies the backend for the vector database used by RAG.
# Currently, "CHROMA_DB" is the primary supported engine.
# Required: No (Only relevant if EMBEDDER_MODE is not "OFF")
EMBEDDER_ENGINE=CHROMA_DB

# The base URL for your ChromaDB server.
# Required: If EMBEDDER_ENGINE is "CHROMA_DB" and EMBEDDER_MODE is not "OFF".
# Example: CHROMA_DB_URL=http://localhost:8000
CHROMA_DB_URL=http://localhost:8000

#-------------------------------------------------------------------------------
# Context File (Optional)
#-------------------------------------------------------------------------------
# Path to an optional plain text or markdown file (.txt, .md) that provides global context
# about your project, team, coding conventions, or any other relevant information.
# This content is prepended to prompts to give the LLM more background.
# See "Adding Context about your project or team" section below for more details.
# Required: No
CONTEXT_FILE=/path/to/your/project_context_file.md

################################################################################
## Application Behavior Settings - Generally, do not change unless you know why
################################################################################

# Rate limiting for LLM calls: Maximum number of tokens to process per minute.
# (Primarily relevant for models with token-per-minute limits)
RATE_LIMIT=1000

# Maximum number of LLM API calls allowed per minute.
MAX_CALLS_PER_MINUTE=60

# Log a warning if LLM calls per minute exceed this percentage of MAX_CALLS_PER_MINUTE.
WARN_IF_OVER=75

# Maximum token size for splitting large code files or text chunks before sending to LLM.
# This helps manage context window limitations of LLMs.
MAX_TOKEN_SPLIT=3000

# Minimum relevance score for RAG search results.
# This is a value (usually between 0 and 1, depending on the distance metric)
# used to filter document chunks retrieved from the vector database.
# A smaller value (e.g., 0.2 for cosine distance) means stricter similarity.
# Adjust based on your vector DB's distance/similarity metric.
CODE_RELEVANCE_MIN=0.2

#-------------------------------------------------------------------------------
# Vertex AI Cost Estimator Settings (Optional - For cost tracking if using GCP)
#-------------------------------------------------------------------------------
# Estimated cost per 1,000 input characters for LLM processing.
API_COST_PER_CHARACTER=0.000125
# Estimated cost per 1,000 output characters from LLM processing.
API_COST_PER_CHARACTER_OUT=0.000375
# Estimated cost per 1,000 characters for generating embeddings.
API_COST_PER_EMBEDDING=0.000025

```

## Usage:
From the `app` directory, run the following command:

`npx ts-node src/index.ts [<project-name>] [--input 'path/To/FileOrFolder'][-g path/To/JSON.json] [--output 'path/To/Output/Folder']`

### Command Parameters:
- `project-name`: The name of the project (required)
- `--input`: The path to the file or folder you want to generate documentation for (required, or use `-g` instead)
- `--output`: The path to the folder where you want to store the generated documentation 
- `-g`: The path to the JSON file containing the project context (Use this, or use `--input`)

### Basic Examples

#### Generate Documentation for all files in a folder:
`npx ts-node src/index.ts <project-name> --input 'path/To/Folder' --output 'path/To/Output/Folder'`
###### Example:
```
npx ts-node src/index.ts fofo-docs --input ./ --output ./test-output
```

#### Generate documentation for a specific file by running the following command:
`npx ts-node src/index.ts <project-name> --input 'path/To/File.ts' --output 'path/To/Output/Folder'`
##### Example:
```
npx ts-node src/index.ts fofo-doc --input './src/shared.ts' --output ./test-output
```

### Advanced Usage

#### Regenerate the documentation for the project by running the following command:
`npx ts-node src/index.ts <project-name> -g 'path/To/Data/Json.json' --output 'path/To/Output/Folder'`
###### Example:
```
npx ts-node src/index.ts fofo-doc -g './test-output/projectContext-2024-05-17T17-38-07-340Z-gpt-4o.json' --output ./test-output
```


## File Exclusions:
Add files or folders you want to ignore to: `app/.fofoignore`
Files in the `.gitignore` will be ignored automatically

## Adding Context about your project or team:
Add a file (e.g., `my_project_context.md` or `team_guidelines.txt`) in your project or a known location. Then, set the `CONTEXT_FILE` environment variable in your `.env` file to the absolute path of this file.

Example: `CONTEXT_FILE=/Users/yourname/projects/my_app/docs/project_specific_context.md`

This file should contain information about your team, project, technical stack details, architectural overview, coding conventions, or any other global context you want the LLM to consider when generating documentation. It will be added to relevant prompts.

### Example Content for your `CONTEXT_FILE`:
```markdown
# Team: Sweet Papa Technologies, LLC

## About Sweet Papa Technologies, LLC
- Builds tools that utilize A.I. and Web3 technologies
- Founded in 2023
- Located in the United States

## Technical Stack and Tools:
- TypeScript, Quasar Framework, VueJS, Capacitor, Electron
- OpenAI, Google Cloud, Ollama, Firebase
```

## Bug Reporting and Pull Requests:

### Bugs:
Please report any bugs or issues to the GitHub repository: 
[FoFo Docs Bugs](https://github.com/Sweet-Papa-Technologies/fofo-docs/issues)

### Pull Requests:
Please feel free to create feature branches from main, and then submit a pull request back to main.
