## Change Log:

### v1.0.1-alpha4:
- [ ] [FEATURE]: Add ability to parse dependency files such as .toml, package.json, etc. and list external dependencies
    - [ ] [FEATURE]: See associated NPM packages, versions, etc.
- [X] [FEATURE]: Add ability to set pause between requests to avoid rate limiting; settable in `.env`

### v1.0.1-alpha3:
- [X] [BUG]: Fix issue with duplicate information in output (again)
- [X] [ENHANCEMENT]: Changed the default context and chunk sizes for LLMs, especially OpenAI
- [X] [FEATURE]: Added support for teamContext file
- [X] [BUG]: Fixed bug with project summary not generating correctly
- [X] [ENHANCEMENT]: Update the README.md template to include more information

### v1.0.1-alpha2:
- [X] [BUG]: Fix issue with duplicate information in output
- [X] [ENHANCEMENT]: Remove unnecessary information from input/output; comments, etc.
- [X] [ENHANCEMENT]: Revise and update output template for MD documentation
    - [X] Define useful sections for documentation
    - [X] Regroup sections based off content
    - [X] Improve styling and readability

### v1.0.1-alpha:
- [X] [FEATURE] Added support for generating documentation for multiple files
- [X] [FEATURE] Added support for generating documentation for a single file


## Roadmap 
- [ ] Create PoC
    - [ ] Implement LLM Support
        - [X] OpenAI
        - [X] Google Vertex API (Gemini Flash and Pro 1.5)
        - [X] Ollama (Select Models)
        - [ ] Other popular LLM backends
    - [ ] Implement Embedding Generation Support
        - [X] OpenAI
        - [X] Google Studio  
        - [ ] Ollama 
        - [ ] Other popular LLM backends
- [ ] Supported Languages:
    - [x] TypeScript / JavaScript
    - [ ] Python
    - [ ] TBA
- [ ] Supported Documentation Formats:
    - [x] Markdown
    - [ ] HTML
    - [ ] PDF


### Immediate To-Do - View completed items in Changelog section below: [Change Log](#change-log)
- [ ] [FEATURE]: Add support for HTML output and static site generation
- [ ] [FEATURE]: Add support parsing Python projects
- [ ] [FEATURE]: Create logging function and detailed logs, summaries (e.g. cost report, token usage, etc)
- [ ] [ENHANCEMENT]: Add sanity check to see if collected data is actually within the file, or if the model hallucinated it


### Upcoming To-Do

- [ ] [ENHANCEMENT]: Change ChromaDB to use local storage by default
- [ ] [ENHANCEMENT]: Ability to disable embedding generation / RAG functionality via `.env`
- [ ] [BUG]: Code lines and indents are incorrect; build function to manually check for first logical occurrence to determine line number/indentation
- [ ] [FEATURE]: Allow for custom glob patterns to be passed in for file selection via `.fofoinclude` file
- [ ] [ENHANCEMENT]: Batch API Calls to avoid rate limiting and speed up processing
- [ ] [ENHANCEMENT]: Use RAG to prevent model from generating duplicate information to begin with