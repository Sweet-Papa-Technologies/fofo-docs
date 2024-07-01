# src/index.ts - fofo-docs

**Summary:** The code is a command-line interface (CLI) tool called "fofodocs" designed to generate documentation for codebases. It parses code, extracts information, and uses an LLM (Large Language Model) to generate documentation in Markdown format. The tool offers options for customizing the output directory, running in test mode, and annotating code objects.

- **File Location:** ./src/index.ts
- **Language:** language: TypeScript 

## Table of Contents
- [classes](#classes)
- [functions](#functions)
- [variables](#variables)
- [types](#types)
- [imports](#imports)
- [interfaces](#interfaces)
## classes


### 📘 Command - CLASS
------------------------------------------------------------
**Description:** Class from the 'commander' library used for creating command-line interfaces.

**Code Snippet:**


```typescript
import { Command } from "commander";
...
```

- **Line:** Could Not Verify Line
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `Command` class from the `commander` library is used to create command-line interfaces (CLIs) in Node.js applications. It provides a way to define commands, options, and arguments for your CLI, making it easier to handle user input and execute different actions based on the provided commands.
- **Usage Example:** 


```typescript
const program = new Command();

program
  .name("fofodocs")
  .description("Generate documentation for your codebase using FoFo Docs")
  .version("1.0.0")
  .argument("<project_name>", "Name of your project")
  .option("-i, --input <path>", "Path to your codebase (default: current directory)", ".")
  .option("-o, --output <path>", "Path to output documentation (default: ./output)", "./output")
  .option("-t, --test <bool>", "Run in Test Mode", "false")
  .option("-g, --generateFromFile <path>", "Generate MD documentation from JSON file")
  .option("-a, --annotate <bool>", "Annotate code objects", "true")
  .action(async (projectName, options) => {
    // ...
  });

program.parse();
```

- **Dependencies:** The `Command` class is part of the `commander` library, which needs to be installed as a dependency in your project.

### 📘 runtimeData - CLASS
------------------------------------------------------------
**Description:** Class representing runtime data for the documentation generation process.

**Code Snippet:**


```typescript
import { ProjectSummary, runtimeData } from "./objectSchemas";
...
```

- **Line:** Could Not Verify Line
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `runtimeData` class represents runtime data used during the documentation generation process. It stores information like the application version, project name, project path, output path, selected language model, and selected RAG service.
- **Usage Example:** 


```typescript
const runtimeData: runtimeData = {
  appVersion: appVersion,
  projectName: projectName,
  projectPath: projectPath,
  outputPath: outputDir,
  selectedLLModel: process.env['LLM_TO_USE'],
  selectedRAGService: process.env['EMBEDDER_MODE'] || "OFF"
};
```

- **Dependencies:** The `runtimeData` class depends on the `ProjectSummary` and `runtimeData` interfaces from the `objectSchemas` module.
## functions


### 🔧 removeDoubleQuotesFromBegEnd - FUNCTION
------------------------------------------------------------
**Description:** Removes double quotes from the beginning and end of a string.

**Code Snippet:**


```typescript
const removeDoubleQuotesFromBegEnd = (str: string) => {
  if (!str) {
    return str;
  }
  if (str.startsWith('
```

- **Line:** 35
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **str** (string): The string to remove double quotes from. 
 Example: "Hello, world!"
###### Function Returns:
- **Type:** string
- **Description:** The string with double quotes removed.
- **Example:** Hello, world!
###### Annotations / Comments:
- **Purpose:** The `removeDoubleQuotesFromBegEnd` function takes a string as input and removes any double quotes from the beginning and end of the string. It handles various types of double quotes, including standard double quotes ("), curly double quotes (” and “), and single curly quotes (‘ and ’).
- **Parameters:** The function takes one parameter: `str` (string): The string to remove double quotes from.
- **Returns:** The function returns a string with the double quotes removed from the beginning and end.
- **Usage Example:** 


```typescript
const str1 = "Hello, world!";
const str2 = removeDoubleQuotesFromBegEnd(str1);
console.log(str2); // Output: Hello, world!
```

- **Edge Cases:** If the input string is null or undefined, the function returns the input string without modification.

### 🔧 runAnnotations - FUNCTION
------------------------------------------------------------
**Description:** Annotates code objects if the annotate flag is set.

**Code Snippet:**


```typescript
const runAnnotations = async (projectSummary?:ProjectSummary) => {
  if (bAnnotate && bAnnotate !== "false") {
    console.log("Annotating code objects...");
    // Annotate code objects
    let jsonData: ProjectSummary;
    if (projectSummary) {
      jsonData = projectSummary;
    } else if
    (jsonFile) {
      jsonData = JSON.parse(fs.readFileSync(jsonFile, "utf-8")) as ProjectSummary;
    } else {
      if (!projectSummary) {
        console.error("Project summary not found!");
        return projectSummary;
      }
      jsonData = projectSummary;
    }

    try {
      projectSummary = await annotateProject(jsonData, outputDir);

      if (jsonFile) {
        fs.writeFileSync(jsonFile, JSON.stringify(projectSummary, null, 4));
      }



    } catch (error) {
      console.error("Error during annotation:", error);
    }
    console.log("Annotation complete!");
  }
  return projectSummary;

}
```

- **Line:** 91
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
- **Async:** true


###### Function Parameters:
- **projectSummary** (ProjectSummary): The project summary object. 
 Example: undefined
###### Function Returns:
- **Type:** ProjectSummary
- **Description:** The project summary object with annotations.
- **Example:** undefined
###### Annotations / Comments:
- **Purpose:** The `runAnnotations` function is responsible for annotating code objects within a project if the `annotate` flag is set. It takes an optional `projectSummary` object as input, which represents the project's code structure and metadata.
- **Parameters:** - `projectSummary` (optional): A `ProjectSummary` object containing the project's code structure and metadata. If not provided, the function attempts to load the project summary from a JSON file specified by the `jsonFile` variable.
- **Returns:** - `ProjectSummary`: The `projectSummary` object with annotations added to the code objects. If the `annotate` flag is not set or an error occurs during annotation, the original `projectSummary` object is returned.
- **Usage Example:** 


```typescript
// Example usage:
const projectSummary = await parseCodebase(projectPath, projectName);
const annotatedProjectSummary = await runAnnotations(projectSummary);
```

- **Edge Cases:** - If the `projectSummary` object is not provided and the `jsonFile` variable is not set, the function will return an error message and the original `projectSummary` object.
- **Dependencies:** - `annotateProject`: This function is responsible for annotating the code objects within the project.

### 🔧 getAppVersion - FUNCTION
------------------------------------------------------------
**Description:** Gets the application version from the package.json file.

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
- **Location:** index.ts (./src/index.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Returns:
- **Type:** string
- **Description:** The application version.
- **Example:** 1.0.0
###### Annotations / Comments:
- **Purpose:** This function retrieves the application version from the `package.json` file.
- **Returns:** The application version as a string.
- **Usage Example:** 


```typescript
const version = getAppVersion();
console.log(version); // Output: 1.0.0 (or the actual version)
```

- **Edge Cases:** If the `package.json` file is not found or cannot be read, the function returns a default string indicating an error.
- **Dependencies:** The function relies on the `fs` and `path` modules for file system operations.

### 🔧 isNoNoFile - FUNCTION
------------------------------------------------------------
**Description:** Checks if a file is a file that should be ignored.

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
- **Location:** index.ts (./src/index.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **file** (string): The file path to check. 
 Example: src/index.ts
- **ignoreMeh** (string[]): An array of additional ignore patterns. 
 Example: []
###### Function Returns:
- **Type:** boolean
- **Description:** True if the file should be ignored, false otherwise.
- **Example:** true
###### Annotations / Comments:
- **Purpose:** This function checks if a file should be ignored based on its name and path. It uses a list of predefined directories and keywords to determine if a file should be excluded from processing.
- **Parameters:** - `file`: The file path to check. For example, `src/index.ts`.
- `ignoreMeh`: An optional array of additional ignore patterns. This allows users to customize the ignore list beyond the default patterns.
- **Returns:** Returns `true` if the file should be ignored, `false` otherwise.
- **Usage Example:** 


```typescript
const shouldIgnore = isNoNoFile('src/index.ts');
```

- **Edge Cases:** The function uses a combination of directory names and keywords to determine if a file should be ignored. If a file matches any of the predefined patterns, it will be ignored. The `ignoreMeh` parameter allows users to add additional patterns to the ignore list.
- **Dependencies:** The function relies on the `fofoDocsBuiltInGlobSearch` and `fofoDocsBuiltInFileSearch` arrays, which contain lists of file patterns and keywords used for determining if a file should be ignored.

### 🔧 appHeaderPretty - FUNCTION
------------------------------------------------------------
**Description:** Generates a pretty header for the application.

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
- **Location:** index.ts (./src/index.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **runtimeData** (runtimeData): The runtime data object. 
 Example: undefined
###### Function Returns:
- **Type:** string
- **Description:** The pretty header string.
- **Example:** undefined
###### Annotations / Comments:
- **Purpose:** This function generates a formatted header string for the FoFo Docs application, displaying information like the application version, project name, project path, selected language model, selected RAG service, and output path.
- **Parameters:** runtimeData: runtimeData - The runtime data object containing information about the application and project.
- **Returns:** string - The formatted header string.
- **Usage Example:** 


```typescript
const runtimeData = {
  appVersion: '1.0.0',
  projectName: 'MyProject',
  projectPath: '/path/to/project',
  outputPath: '/path/to/output',
  selectedLLModel: 'gpt-3.5-turbo',
  selectedRAGService: 'OpenAI'
};

const header = appHeaderPretty(runtimeData);
console.log(header);
```

- **Dependencies:** appHeaderPretty depends on the following functions:
- colorize: This function adds color to the text using ANSI escape codes.
- headerColored: This function defines a colored header string.

### 🔧 parseCodebase - FUNCTION
------------------------------------------------------------
**Description:** Parses a codebase and returns a ProjectSummary object.

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
  projectPath = projectPath.replace(//$/, "");
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
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `parseCodebase` function is responsible for parsing a codebase, extracting relevant information, and generating a `ProjectSummary` object. This object contains details about the project, including its name, description, dependencies, technology stack, code files, and associated RAG data.
- **Parameters:** - `projectPath`: A string representing the path to the codebase to be parsed.
- `projectName`: A string representing the name of the project.
- **Returns:** A `ProjectSummary` object containing information about the parsed codebase.
- **Usage Example:** 


```typescript
const projectSummary = await parseCodebase('./my-project', 'My Project');
```

- **Edge Cases:** - The function handles large files by breaking them into chunks and processing them separately.
- It also includes logic to handle cases where the project path is a directory or a single file.
- The function includes error handling for invalid file paths and other potential issues.
- **Dependencies:** - `glob`: For finding files matching specific patterns.
- `fs/promises`: For reading files asynchronously.
- `objectSchemas`: For defining the structure of the `ProjectSummary` object.
- `llmInterface`: For interacting with the LLM to infer language type, project stack, and dependencies.
- `prompt`: For generating prompts for the LLM.
- `vectorDB`: For saving code snippets to the vector database.
- `shared`: For utility functions like breaking code into chunks, getting token counts, and colorizing text.

### 🔧 findCorrectCodeLineForObject - FUNCTION
------------------------------------------------------------
**Description:** Finds the correct code line for each object in a CodeObject object.

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
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function takes a CodeObject object and a string containing the entire code, and then iterates through each object in the CodeObject object to find the correct line number in the code where the object's code snippet is located.
- **Parameters:** - codeObj: CodeObject - The object containing the code objects to be annotated.
- code: string - The entire code string.
- **Returns:** CodeObject - The original CodeObject object with the codeLine property updated for each object.
- **Usage Example:** 


```typescript
const codeObj = {
  classes: [
    {
      name: 'MyClass',
      type: 'class',
      description: 'A simple class',
      codeSnippet: 'class MyClass { ... }',
      codeLine: -2,
      codeIndent: 0,
      fileName: 'index.ts',
      fileLocation: './src/index.ts'
    }
  ]
};

const code = `
class MyClass {
  // ...
}
`;

const annotatedCodeObj = findCorrectCodeLineForObject(codeObj, code);

console.log(annotatedCodeObj); // Output: The codeObj with the codeLine property updated for each object.
```

- **Edge Cases:** If the code snippet cannot be found in the code, the codeLine property will be set to -2.
- **Dependencies:** None

### 🔧 generateDocumentation - FUNCTION
------------------------------------------------------------
**Description:** Generates documentation for a project.

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
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `generateDocumentation` function is responsible for generating documentation for a code project. It takes a folder path, an optional project context object, and an optional JSON file path as input. The function first checks if the specified folder path exists and creates it if it doesn't. It then checks if the folder path is writeable. If the `jsonFile` parameter is not provided, the function generates a JSON file containing the project context in the specified folder. If the `jsonFile` parameter is provided, the function reads the project context from the specified JSON file. The function then calls the `jsonToMarkdown` function to convert the project context to Markdown format and the `markdownToHTML` function to convert the Markdown to HTML format. Finally, the function returns a boolean value indicating whether the documentation generation was successful.
- **Parameters:** - `folderPath`: A string representing the path to the folder where the documentation should be generated.
- `projectContext`: An optional `ProjectSummary` object containing information about the project. If not provided, the function will attempt to read the project context from the `jsonFile` parameter.
- `jsonFile`: An optional string representing the path to a JSON file containing the project context. If not provided, the function will generate a JSON file in the specified folder.
- **Returns:** A boolean value indicating whether the documentation generation was successful.
- **Usage Example:** 


```typescript
const folderPath = './docs';
const projectContext = { ... }; // Project context object
const jsonFile = './projectContext.json';

await generateDocumentation(folderPath, projectContext, jsonFile);
```

- **Edge Cases:** - If the specified folder path does not exist, the function will create it.
- If the specified folder path is not writeable, the function will return `false`.
- If the `jsonFile` parameter is not provided, the function will generate a JSON file in the specified folder.
- If the `jsonFile` parameter is provided and the file does not exist, the function will return `false`.
- **Dependencies:** - `fs`: Node.js module for file system operations.
- `path`: Node.js module for working with file paths.
- `jsonToMarkdown`: Function to convert project context to Markdown format.
- `markdownToHTML`: Function to convert Markdown to HTML format.
## variables


### 🧮 bTestMode - VARIABLE
------------------------------------------------------------
**Description:** Boolean variable indicating whether to run in test mode.

**Code Snippet:**


```typescript
const bTestMode = removeDoubleQuotesFromBegEnd(options.test);
```

- **Line:** 54
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `bTestMode` variable is a boolean flag that determines whether the application should run in test mode. It is set to `true` if the `-t` or `--test` flag is passed to the command-line interface (CLI) and `false` otherwise.

### 🧮 bAnnotate - VARIABLE
------------------------------------------------------------
**Description:** Boolean variable indicating whether to annotate code objects.

**Code Snippet:**


```typescript
const bAnnotate = removeDoubleQuotesFromBegEnd(options.annotate);
```

- **Line:** 55
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `bAnnotate` variable is a boolean flag that determines whether code objects should be annotated during the documentation generation process.
- **Usage Example:** 


```typescript
// Example usage:
const bAnnotate = true; // Enable annotation
// ...
// Or
const bAnnotate = false; // Disable annotation
```


### 🧮 projectPath - VARIABLE
------------------------------------------------------------
**Description:** String variable representing the path to the codebase.

**Code Snippet:**


```typescript
let projectPath = removeDoubleQuotesFromBegEnd(options.input);
```

- **Line:** 56
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `projectPath` variable stores the path to the codebase being analyzed. It is initialized with the value from the `options.input` argument, which is either the default current directory or a user-specified path.
- **Usage Example:** 


```typescript
// Example usage:
const projectPath = './my-project'; // Set the project path
const projectSummary = await parseCodebase(projectPath, 'My Project'); // Parse the codebase
```

- **Edge Cases:** The `projectPath` should be a valid path to a directory or file containing the codebase. If the path is invalid, an error will be thrown.

### 🧮 timeStampDirectoryFriendly - VARIABLE
------------------------------------------------------------
**Description:** String variable representing a timestamp in a directory-friendly format.

**Code Snippet:**


```typescript
const timeStampDirectoryFriendly = new Date().toISOString().replace(/:/g, "-");
```

- **Line:** 57
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable creates a timestamp in a directory-friendly format by converting the current date and time to an ISO string and replacing all colons with hyphens.
- **Returns:** A string representing the timestamp in a directory-friendly format.
- **Usage Example:** 


```typescript
const timestamp = new Date().toISOString().replace(/:/g, "-");
console.log(timestamp); // Output: 2023-10-26T17-23-45.123Z
```


### 🧮 outputDir - VARIABLE
------------------------------------------------------------
**Description:** String variable representing the path to the output documentation directory.

**Code Snippet:**


```typescript
const outputDir = path.join(removeDoubleQuotesFromBegEnd(options.output), projectName, timeStampDirectoryFriendly);
```

- **Line:** 58
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `outputDir` variable stores the path to the output documentation directory. It is constructed by combining the user-specified output path, the project name, and a timestamp-based directory name.
- **Usage Example:** 


```typescript
// Example usage:
const outputDir = path.join('./output', 'myProject', '2023-10-26T10-30-00.000Z');
```

- **Dependencies:** The `outputDir` variable depends on the `path` module from Node.js.

### 🧮 jsonFile - VARIABLE
------------------------------------------------------------
**Description:** String variable representing the path to the JSON file containing the project summary.

**Code Snippet:**


```typescript
const jsonFile = removeDoubleQuotesFromBegEnd(options.generateFromFile);
```

- **Line:** 59
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `jsonFile` variable stores the path to the JSON file containing the project summary. This file is used to generate documentation from an existing project summary instead of parsing the codebase directly.
- **Usage Example:** 


```typescript
// Example usage:
const projectName = 'my-project';
const jsonFile = './my-project-summary.json';
const outputDir = './output';
fofodocs.generateDocumentation(jsonFile, projectName, outputDir);
```

- **Edge Cases:** If the `generateFromFile` option is not provided, the `jsonFile` variable will be undefined, and the code will proceed to parse the codebase instead of using the JSON file.
- **Dependencies:** The `removeDoubleQuotesFromBegEnd` function is used to remove any double quotes from the beginning and end of the `generateFromFile` option value.

### 🧮 appVersion - VARIABLE
------------------------------------------------------------
**Description:** String variable representing the application version.

**Code Snippet:**


```typescript
const appVersion = getAppVersion()
```

- **Line:** 67
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the application version, retrieved using the `getAppVersion()` function.
- **Dependencies:** getAppVersion() function

### 🧮 runtimeData - VARIABLE
------------------------------------------------------------
**Description:** Object variable containing runtime data for the application.

**Code Snippet:**


```typescript
const runtimeData:runtimeData = {
  appVersion: appVersion,
  projectName: projectName,
  projectPath: projectPath,
  outputPath: outputDir,
  selectedLLModel:process.env['LLM_TO_USE'],
  selectedRAGService: process.env['EMBEDDER_MODE'] || "OFF"
}
```

- **Line:** 69
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `runtimeData` variable stores runtime information for the application, including the application version, project name, project path, output directory, selected language model, and selected RAG service.
- **Usage Example:** 


```typescript
const runtimeData:runtimeData = {
  appVersion: appVersion,
  projectName: projectName,
  projectPath: projectPath,
  outputPath: outputDir,
  selectedLLModel:process.env['LLM_TO_USE'],
  selectedRAGService: process.env['EMBEDDER_MODE'] || "OFF"
}
```


### 🧮 prettyHeader - VARIABLE
------------------------------------------------------------
**Description:** String variable representing a formatted header for the application.

**Code Snippet:**


```typescript
const prettyHeader = appHeaderPretty(runtimeData)
```

- **Line:** 78
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores a formatted header string for the application, which is generated by calling the `appHeaderPretty` function and passing in the `runtimeData` object.
- **Returns:** A string representing the formatted header for the application.
- **Usage Example:** 


```typescript
console.log(prettyHeader);
```

- **Dependencies:** The `prettyHeader` variable depends on the `appHeaderPretty` function and the `runtimeData` object.

### 🧮 jsonData - VARIABLE
------------------------------------------------------------
**Description:** Object variable representing the project summary data.

**Code Snippet:**


```typescript
let jsonData: ProjectSummary;
```

- **Line:** 95
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `jsonData` variable is declared as a type `ProjectSummary` and is used to store the summary data of the project being analyzed.
- **Usage Example:** 


```typescript
// Load project summary data into the jsonData variable
jsonData = await parseCodebase(projectPath, projectName);
```

- **Dependencies:** The `ProjectSummary` interface is defined in the `objectSchemas.ts` file.

### 🧮 projSummary - VARIABLE
------------------------------------------------------------
**Description:** Object variable representing the project summary data.

**Code Snippet:**


```typescript
const projSummary = await runAnnotations()
```

- **Line:** 152
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `projSummary` variable is declared and assigned the result of calling the asynchronous function `runAnnotations()`. This function likely generates and returns a project summary object, which is then stored in the `projSummary` variable.
- **Usage Example:** 


```typescript
// Example usage of projSummary
console.log(projSummary.projectName); // Accessing the project name
```


### 🧮 parsedCodebase - VARIABLE
------------------------------------------------------------
**Description:** Object variable representing the parsed codebase data.

**Code Snippet:**


```typescript
const parsedCodebase = await parseCodebase(projectPath, projectName);
```

- **Line:** 173
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `parsedCodebase` variable stores the result of parsing a codebase using the `parseCodebase` function. This function analyzes the codebase, extracts information about its structure and content, and returns a `ProjectSummary` object.
- **Returns:** The `parsedCodebase` variable holds a `ProjectSummary` object, which contains information about the parsed codebase, including its name, description, dependencies, files, and other relevant data.
- **Usage Example:** 


```typescript
const projectPath = './my-project';
const projectName = 'My Project';
const parsedCodebase = await parseCodebase(projectPath, projectName);
```

- **Edge Cases:** The `parseCodebase` function may encounter errors if the provided project path is invalid or if the codebase contains unexpected or unsupported file types. It also handles large files by breaking them into chunks and processing them separately, which may affect performance.
- **Dependencies:** The `parseCodebase` function relies on various dependencies, including the `glob`, `fs/promises`, `llmInterface`, `prompt`, `vectorDB`, and `shared` modules. It also uses the `dotenv` package to load environment variables.

### 🧮 bGenerated - VARIABLE
------------------------------------------------------------
**Description:** Boolean variable indicating whether documentation generation was successful.

**Code Snippet:**


```typescript
const bGenerated = await generateDocumentation(
  outputDir,
  parsedCodebase || projectSummary       
);
```

- **Line:** 184
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `bGenerated` variable stores the result of the `generateDocumentation` function call, indicating whether the documentation generation process was successful.
- **Returns:** The `generateDocumentation` function returns a boolean value, which is assigned to the `bGenerated` variable. This boolean value represents whether the documentation generation was successful or not.
- **Usage Example:** 


```typescript
const bGenerated = await generateDocumentation(
  outputDir,
  parsedCodebase || projectSummary       
);
```

- **Edge Cases:** If the `generateDocumentation` function encounters an error during the documentation generation process, the `bGenerated` variable will be set to `false`. This could happen due to various reasons, such as invalid input data, file access errors, or issues with the LLM used for documentation generation.
- **Dependencies:** The `bGenerated` variable depends on the `generateDocumentation` function, which in turn depends on other functions and modules within the project, such as the `documentationGenerator` module and the LLM interface.

### 🧮 startTime - VARIABLE
------------------------------------------------------------
**Description:** Number variable representing the start time of the documentation generation process.

**Code Snippet:**


```typescript
const startTime = Date.now();
```

- **Line:** 171
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `startTime` variable stores the current timestamp using `Date.now()` at the beginning of the documentation generation process.

### 🧮 endTime - VARIABLE
------------------------------------------------------------
**Description:** Number variable representing the end time of the documentation generation process.

**Code Snippet:**


```typescript
const endTime = Date.now();
```

- **Line:** 202
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `endTime` variable stores the current timestamp using `Date.now()` to mark the end of the documentation generation process.

### 🧮 totalTime - VARIABLE
------------------------------------------------------------
**Description:** Number variable representing the total time taken for documentation generation.

**Code Snippet:**


```typescript
const totalTime = endTime - startTime;
```

- **Line:** 203
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `totalTime` variable stores the difference between the `endTime` and `startTime` variables, representing the total time taken for documentation generation.
- **Usage Example:** 


```typescript
const endTime = Date.now();
const totalTime = endTime - startTime;
console.log(`Total Time: ${totalTime / 1000}s`);
```


### 🧮 llmRuntimeDataResult - VARIABLE
------------------------------------------------------------
**Description:** Object variable representing the runtime data for the LLM.

**Code Snippet:**


```typescript
const llmRuntimeDataResult = (await import("./llmInterface")).AIusageData;
```

- **Line:** 205
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores the result of importing the `AIusageData` object from the `./llmInterface` module.
- **Dependencies:** This variable depends on the `./llmInterface` module.

### 🧮 dataTotals - VARIABLE
------------------------------------------------------------
**Description:** String variable representing a formatted string containing total character and token counts.

**Code Snippet:**


```typescript
const dataTotals=
"Total Chars In: " + llmRuntimeDataResult.totalCharacters + "\n" +
"Total Chars Out: " + llmRuntimeDataResult.totalCharactersOut + "\n" +
"Total Chars Embed: " + llmRuntimeDataResult.totalCharactersEmbed + "\n" +
"Total Tokens" + llmRuntimeDataResult.totalTokens
```

- **Line:** 213
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This code snippet declares a string variable named `dataTotals` that concatenates various character and token counts from the `llmRuntimeDataResult` object.
- **Usage Example:** 


```typescript
const dataTotals = "Total Chars In: " + llmRuntimeDataResult.totalCharacters + "\n" +
"Total Chars Out: " + llmRuntimeDataResult.totalCharactersOut + "\n" +
"Total Chars Embed: " + llmRuntimeDataResult.totalCharactersEmbed + "\n" +
"Total Tokens" + llmRuntimeDataResult.totalTokens;
```

- **Dependencies:** llmRuntimeDataResult object

### 🧮 costInfo - VARIABLE
------------------------------------------------------------
**Description:** String variable representing a formatted string containing cost information.

**Code Snippet:**


```typescript
const costInfo = 
"Cost per Character In: " + API_COST_PER_CHARACTER + "\n" +
"Cost per Character Out: " + API_COST_PER_CHARACTER_OUT + "\n" +
"Cost per Character Embed: " + API_COST_PER_EMBEDDING
```

- **Line:** 220
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable stores a formatted string containing cost information for API calls. It concatenates strings representing the cost per character for different API operations, including input, output, and embedding.
- **Usage Example:** 


```typescript
console.log(costInfo);
```

- **Dependencies:** API_COST_PER_CHARACTER, API_COST_PER_CHARACTER_OUT, API_COST_PER_EMBEDDING

### 🧮 str - VARIABLE
------------------------------------------------------------
**Description:** String variable representing the input string to the function.

**Code Snippet:**


```typescript
const removeDoubleQuotesFromBegEnd = (str: string) => {
```

- **Line:** 35
- **Location:** index.ts (./src/index.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable represents the input string to the `removeDoubleQuotesFromBegEnd` function.
- **Usage Example:** 


```typescript
const str = "This is a string with double quotes at the beginning and end.";
const result = removeDoubleQuotesFromBegEnd(str);
```

## types


### 🏷️ runtimeData - TYPE
------------------------------------------------------------
**Description:** Type definition for runtimeData object.

**Code Snippet:**


```typescript
const runtimeData:runtimeData = {
      appVersion: appVersion,
      projectName: projectName,
      projectPath: projectPath,
      outputPath: outputDir,
      selectedLLModel:process.env['LLM_TO_USE'],
      selectedRAGService: process.env['EMBEDDER_MODE'] || "OFF"
    }
```

- **Line:** 69
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type definition defines the structure of the `runtimeData` object, which stores various runtime information about the application.
- **Usage Example:** 


```typescript
const runtimeData:runtimeData = {
      appVersion: appVersion,
      projectName: projectName,
      projectPath: projectPath,
      outputPath: outputDir,
      selectedLLModel:process.env['LLM_TO_USE'],
      selectedRAGService: process.env['EMBEDDER_MODE'] || "OFF"
    }
```

## imports


### 📥 Command - IMPORT
------------------------------------------------------------
**Description:** Import the Command class from the 'commander' library.

**Code Snippet:**


```typescript
import { Command } from "commander";
```

- **Line:** 1
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `Command` class from the `commander` library, which is used for creating command-line interfaces (CLIs).
- **Usage Example:** 


```typescript
const program = new Command();
program.name("fofodocs");
program.description("Generate documentation for your codebase using FoFo Docs");
program.version("1.0.0");
program.argument("<project_name>", "Name of your project");
program.option("-i, --input <path>", "Path to your codebase (default: current directory)", ".");
program.option("-o, --output <path>", "Path to output documentation (default: ./output)", "./output");
program.option("-t, --test <bool>", "Run in Test Mode", "false");
program.option("-g, --generateFromFile <path>", "Generate MD documentation from JSON file");
program.option("-a, --annotate <bool>", "Annotate code objects", "true");
program.action(async (projectName, options) => { ... });
program.parse();
```

- **Dependencies:** commander

### 📥 parseCodebase - IMPORT
------------------------------------------------------------
**Description:** Import the parseCodebase function from the './codeParser' module.

**Code Snippet:**


```typescript
import { parseCodebase } from "./codeParser";
```

- **Line:** 2
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `parseCodebase` function from the `./codeParser` module, which is likely responsible for parsing a codebase and generating a summary of its contents.
- **Usage Example:** 


```typescript
const projectSummary = await parseCodebase(projectPath, projectName);
```

- **Dependencies:** The `parseCodebase` function likely depends on other modules within the `./codeParser` module, such as functions for reading files, analyzing code, and extracting information.

### 📥 generateDocumentation - IMPORT
------------------------------------------------------------
**Description:** Import the generateDocumentation function from the './documentationGenerator' module.

**Code Snippet:**


```typescript
import { generateDocumentation } from "./documentationGenerator";
```

- **Line:** 3
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `generateDocumentation` function from the `./documentationGenerator` module, which is likely used to generate documentation for the project.
- **Usage Example:** 


```typescript
const documentation = generateDocumentation('./output', projectSummary);
```

- **Dependencies:** This import depends on the `./documentationGenerator` module.

### 📥 fs - IMPORT
------------------------------------------------------------
**Description:** Import the 'fs' module for file system operations.

**Code Snippet:**


```typescript
import fs from "fs";
```

- **Line:** 4
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the 'fs' module, providing access to file system operations.
- **Usage Example:** 


```typescript
// Read a file
const data = fs.readFileSync('file.txt', 'utf-8');

// Write to a file
fs.writeFileSync('file.txt', 'Hello, world!');
```


### 📥 path - IMPORT
------------------------------------------------------------
**Description:** Import the 'path' module for working with file paths.

**Code Snippet:**


```typescript
import path from "path";
```

- **Line:** 5
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the \`path\` module, which provides utilities for working with file paths.
- **Usage Example:** 


```typescript
const filePath = path.join(__dirname, 'file.txt');
```


### 📥 appHeaderPretty - IMPORT
------------------------------------------------------------
**Description:** Import the appHeaderPretty function from the './appData' module.

**Code Snippet:**


```typescript
import { appHeaderPretty, getAppVersion } from "./appData";
```

- **Line:** 6
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function imports the `appHeaderPretty` and `getAppVersion` functions from the `./appData` module.
- **Dependencies:** appData

### 📥 ProjectSummary - IMPORT
------------------------------------------------------------
**Description:** Import the ProjectSummary interface from the './objectSchemas' module.

**Code Snippet:**


```typescript
import { ProjectSummary, runtimeData } from "./objectSchemas";
```

- **Line:** 7
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `ProjectSummary` interface from the `./objectSchemas` module. This interface is used to represent a summary of a code project, including its name, description, dependencies, files, and other relevant information.
- **Usage Example:** 


```typescript
import { ProjectSummary, runtimeData } from "./objectSchemas";
```

- **Dependencies:** This code object depends on the `./objectSchemas` module, which defines the `ProjectSummary` interface.

### 📥 API_COST_PER_CHARACTER - IMPORT
------------------------------------------------------------
**Description:** Import the API_COST_PER_CHARACTER constant from the './shared' module.

**Code Snippet:**


```typescript
import { API_COST_PER_CHARACTER, API_COST_PER_CHARACTER_OUT, API_COST_PER_EMBEDDING, colorize, getContextFromFile, makeOSpathFriendly } from "./shared";
```

- **Line:** 8
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object imports the `API_COST_PER_CHARACTER` constant from the `./shared` module.
- **Usage Example:** 


```typescript
const cost = API_COST_PER_CHARACTER * code.length;
```

- **Dependencies:** This code object depends on the `./shared` module.

### 📥 annotateProject - IMPORT
------------------------------------------------------------
**Description:** Import the annotateProject function from the './annotations' module.

**Code Snippet:**


```typescript
import { annotateProject } from "./annotations";
```

- **Line:** 9
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This function imports the `annotateProject` function from the `./annotations` module, which is likely used to annotate code objects within a project.
- **Usage Example:** 


```typescript
const projectSummary = await annotateProject(projectSummary, outputDir);
```

- **Dependencies:** The `annotateProject` function likely depends on other functions and modules within the `./annotations` module.

### 📥 ./logger - IMPORT
------------------------------------------------------------
**Description:** Import the './logger' module.

**Code Snippet:**


```typescript
import "./logger";
```

- **Line:** 10
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This line imports the "./logger" module, which likely contains custom logging functionality for the project.
- **Dependencies:** The "./logger" module.
## interfaces


### 🌉 runtimeData - INTERFACE
------------------------------------------------------------
**Description:** Interface for runtime data

**Code Snippet:**


```typescript
interface runtimeData {
  appVersion: string;
  projectName: string;
  projectPath: string;
  outputPath: string;
  selectedLLModel: string | undefined;
  selectedRAGService: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** index.ts (./src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `runtimeData` interface defines the structure for storing runtime data related to the FoFo Docs application.
