<center><img src="dev-notes/example_docs/fofo-docs-lighter.png" alt="drawing" width="500px" height="270px" /></center>


## About

FoFo Docs is a tool to generate user documentation for code repositories. It works by passing in a project directory, and then generating documentation for each file in the project. The tool uses a Language Model (LLM) to generate the documentation, and then stores the generated documentation in a JSON file. The JSON file can be used to regenerate the documentation at any time.

#### Example Documentation Output : [Example Output](dev-notes/example_docs/README.md)

## Getting Started:
🚧 NOTE: This project is still in development. For now, it only works with Gemini Flash models, as any other paid model is too costly to run.


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
- Create a `.env` file in the app directory (an example is provided below and in the app directory `example.env`)
- Fill out required ENV Variables
(Todo: Add ENV Variables List Here)

#### .env Example:
```
#################################
## User Settings

## Google API Keys
GEMINI_KEY=YOUR-GOOGLE-API-KEY
GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceJSON.json

## Google Project Settings
GCP_PROJECT_ID=
GCP_REGION="us-central1"

## RAG Settings
# - Set to: GCP or OFF
# IF GCP, you must set "GEMINI_KEY" env variable above
EMBEDDER_MODE=GCP

## Context File Path
CONTEXT_FILE=/path/to/context/file.txt


#################################
#################################
## DO NOT TOUCH BEYOND THIS POINT

LLM_TO_USE=gemini-1.5-flash-001
EMBEDDER_ENGINE=CHROMA_DB
RATE_LIMIT=1000
MAX_CALLS_PER_MINUTE=60
WARN_IF_OVER=75
MAX_TOKEN_SPLIT=3000 

## Vertex API Cost Estimator Settings (per 1K characters)

API_COST_PER_CHARACTER=0.000125
API_COST_PER_CHARACTER_OUT=0.000375
API_COST_PER_EMBEDDING=0.000025

```

## Usage:
From the client-app directory, run the following command:

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
Add a file named `teamContext.md` to the `prompts` directory (located in the `app` folder). This file should contain information about your team, project, and any other context you want to include in the documentation.

You can paste it as a markdown file, and the tool will consider it when generating responses.

### Example `teamContext.md`:
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
