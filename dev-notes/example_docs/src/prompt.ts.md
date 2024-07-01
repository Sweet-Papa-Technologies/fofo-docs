# src/prompt.ts - fofo-docs

**Summary:** The code defines a set of functions that generate prompts for a language model to analyze and extract information from code.

- **File Location:** ./src/prompt.ts
- **Language:** language: TypeScript 

## Table of Contents
- [classes](#classes)
- [functions](#functions)
- [variables](#variables)
- [types](#types)
- [imports](#imports)
- [exports](#exports)
- [interfaces](#interfaces)
## classes


### 📘 CodeObject - CLASS
------------------------------------------------------------
**Description:** Represents a code object, such as a class, function, variable, type, interface, import, or export.

**Code Snippet:**


```typescript
class CodeObject {
    name: string;
    type: CodeObjectType;
    description: string;
    codeSnippet: string;
    annotation?: Annotation;
    codeLine?: number;
    codeIndent?: number;
    content?: string;
    fileName: string;
    fileLocation: string;
    subObjects?: CodeObject[];
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

- **Line:** Could Not Verify Line
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObject` class represents a code object, such as a class, function, variable, type, interface, import, or export. It stores information about the code object, including its name, type, description, code snippet, annotation, line number, indentation, file name, file location, sub-objects, parent object, function parameters, function returns, and whether it is exported, a function, a class, private, or asynchronous.
- **Usage Example:** 


```typescript
const myClass = new CodeObject({
  name: 'MyClass',
  type: 'class',
  description: 'A simple class',
  codeSnippet: 'class MyClass { ... }',
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
});
```


### 📘 Annotation - CLASS
------------------------------------------------------------
**Description:** Represents annotations or comments for a code object.

**Code Snippet:**


```typescript
interface Annotation {
    purpose: string;
    parameters?: string;
    returns?: string;
    usageExample?: string;
    edgeCases?: string;
    dependencies?: string;
    errorHandling?: string;
    performance?: string;
    bestPractices?: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `Annotation` interface defines the structure for storing annotations or comments related to a code object. It includes properties for describing the purpose, parameters, return values, usage examples, edge cases, dependencies, error handling, performance considerations, and best practices for using the code object.
- **Parameters:** N/A
- **Returns:** N/A
- **Usage Example:** 


```typescript
const annotation: Annotation = {
    purpose: "This function calculates the sum of two numbers.",
    parameters: "num1: number, num2: number",
    returns: "number",
    usageExample: "const sum = add(1, 2);",
    edgeCases: "Negative numbers are not supported.",
    dependencies: "someDependency, anotherDependency",
    errorHandling: "Throws an error if the input is not a number.",
    performance: "Optimized for speed.",
    bestPractices: "Use this function for adding numbers to..."
};
```

- **Edge Cases:** N/A
- **Dependencies:** N/A

### 📘 FunctionParameter - CLASS
------------------------------------------------------------
**Description:** Represents a parameter of a function.

**Code Snippet:**


```typescript
interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `FunctionParameter` class represents a parameter of a function. It stores the name, type, description, and an example value for the parameter.
- **Usage Example:** 


```typescript
const functionParameter: FunctionParameter = {
  name: 'param1',
  type: 'string',
  description: 'This is the first parameter',
  example: 'Hello World'
};
```


### 📘 FunctionReturn - CLASS
------------------------------------------------------------
**Description:** Represents the return value of a function.

**Code Snippet:**


```typescript
interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `FunctionReturn` class represents the return value of a function. It stores the type, description, and an example of the return value.
- **Usage Example:** 


```typescript
const functionReturn: FunctionReturn = {
    type: 'string',
    description: 'This is a string',
    example: 'Hello, world!'
};
```

## functions


### 🔧 generalPrompt - FUNCTION
------------------------------------------------------------
**Description:** This function generates a prompt for the LLM to identify and describe code objects of a specific type.

**Code Snippet:**


```typescript
const generalPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => {
    const fileName = filePath.split('/').pop();
    return`
You will be asked to provide a JSON object that contains the identified ${type} objects in the code snippet attached at the bottom of this request.

## Context
- Project and Team Context: 
${context}

## Previously Parsed Code
- Relevant Code:
${relevantCode}

## Task
In the following code snippet, please identify and described all of the ${type} objects. ONLY focus on the ${type} objects and their descriptions. DO NOT add or implement new code.

The codeSnippet that is extracted from the code chunk should be an exact cut and paste from the actual code, not changed at all, except for adding an ellipsis if truncation needs to happen.

IF no ${type} objects are found, please respond with an empty JSON object:

{
    "${type}": []
}

The only values that can be set for the "type" key are: 
"class", "function", "variable", "type", "interface", "comment", "import", "export"

## Response Format
Respond ONLY with a JSON object containing the identified ${type} and their descriptions. Here is an example of the required format:

${type === 'classes' ? `
{
    "classes": [
        {
            "name": "ClassName",
            "type": "class", // DO NOT CHANGE THIS
            "description": "Description of the class",
            "codeSnippet": "class ClassName { ... }",
            "codeLine": 10,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
            "subObjects": []
        }
    ]
}` : type === 'functions' ? `
{
    "functions": [
        {
            "name": "functionName",
            "type": "function", // DO NOT CHANGE THIS
            "description": "Description of the function",
            "codeSnippet": "function functionName() { ... }",
            "codeLine": 20,
            "codeIndent": 2,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
            "isExported": false,
            "isPrivate": false,
            "isAsync": false
            "functionParameters": [
                {
                    "name": "param1",
                    "type": "string",
                    "description": "Description of the parameter",
                    "example": "exampleValue"
                }
            ],
            "functionReturns": {
                "name": "returnVal1",
                "type": "string",
                "description": "Description of the return value",
                "example": "exampleReturn"
            }
        }
    ]
}

# Rules for Gathering Function Information
- IGNORE function import declarations
- If the function is exported, set "isExported" to true
- If the function is private, set "isPrivate" to true
- If the function is async, set "isAsync" to true
- If the function has parameters, add them to the "functionParameters" array
- If the function returns a value, add it to the "functionReturns" object

Include ALL function declarations in the code snippet, even if they are not explicitly called in the code.

` : type === 'variables' ? `
{
    "variables": [
        {
            "name": "variableName",
            "type": "variable", // DO NOT CHANGE THIS
            "description": "Description of the variable",
            "codeSnippet": "let variableName = ...;",
            "codeLine": 30,
            "codeIndent": 2,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
            "isExported": false,
            "isPrivate": false
        }
    ]
}` : type === 'types' ? `
{
    "types": [
        {
            "name": "TypeName",
            "type": "type", // DO NOT CHANGE THIS
            "description": "Description of the type",
            "codeSnippet": "type TypeName = ...;",
            "codeLine": 40,
            "codeIndent": 2,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` : type === 'interfaces' ? `
{
    "interfaces": [
        {
            "name": "InterfaceName",
            "type": "interface", // DO NOT CHANGE THIS
            "description": "Description of the interface",
            "codeSnippet": "interface InterfaceName { ... }",
            "codeLine": 65,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` 
// : type === 'comments' ? `
// {
//     "comments": [
//         {
//             "content": "This is a comment",
//             type: "comment",
//             "codeLine": 50,
//             "codeIndent": 0,
//             "fileName": "${fileName}",
//             "fileLocation": "${filePath}"
//         }
//     ]
// }
` 
: type === 'imports' ? `
{
    "imports": [
        {
            "name": "importName",
            "type": "import", // DO NOT CHANGE THIS
            "description": "Description of the import",
            "codeSnippet": "import importName from 'module';",
            "codeLine": 60,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` : type === 'exports' ? `
{
    "exports": [
        {
            "name": "exportName",
            "type": "export", // DO NOT CHANGE THIS
            "description": "Description of the export",
            "codeSnippet": "export { exportName };",
            "codeLine": 70,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` : ''
}

## Code Snippet for file: ${fileName}
- File Path: ${filePath}
${codeSnippet}
`}
};
```

- **Line:** Could Not Verify Line
- **Location:** undefined (Unable to Load)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `generalPrompt` function generates a prompt for the LLM to identify and describe code objects of a specific type. It provides context, instructions, and an example response format for the LLM to follow.
- **Parameters:** - `context`: A string representing the project and team context.
- `relevantCode`: A string representing the relevant code snippet from the project.
- `filePath`: A string representing the path to the file containing the code snippet.
- `codeSnippet`: A string representing the code snippet to be analyzed.
- `type`: A string representing the type of code object to be identified (e.g., 'classes', 'functions', 'variables').
- **Returns:** A string representing the prompt for the LLM.
- **Usage Example:** 


```typescript
const prompt = generalPrompt('Project context', 'Relevant code', 'path/to/file.ts', 'code snippet', 'functions');
```

- **Edge Cases:** None.
- **Dependencies:** None.
## variables


### 🧮 codeSummary - VARIABLE
------------------------------------------------------------
**Description:** A template string that defines the prompt for summarizing code.

**Code Snippet:**


```typescript
export const codeSummary = `
    Create a summary of the following code in markdown. ONLY respond with the summary, For example:
    
    ##Execution Flow\n\n1. The app... etc
`
```

- **Line:** 1
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `codeSummary` variable is a template string that defines the prompt used for summarizing code blocks. It instructs the language model to provide a markdown summary of the code, focusing on the execution flow and key steps.
- **Parameters:** None.
- **Returns:** A template string containing the prompt for summarizing code.
- **Usage Example:** 


```typescript
// Example usage:
const prompt = codeSummary.replace('<code block>', codeToSummarize);
```

- **Edge Cases:** None.
- **Dependencies:** None.

### 🧮 generalPrompt - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying and describing code objects of a specific type.

**Code Snippet:**


```typescript
const generalPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => {
    const fileName = filePath.split('/').pop();
    return`
You will be asked to provide a JSON object that contains the identified ${type} objects in the code snippet attached at the bottom of this request.

## Context
- Project and Team Context: 
${context}

## Previously Parsed Code
- Relevant Code:
${relevantCode}

## Task
In the following code snippet, please identify and described all of the ${type} objects. ONLY focus on the ${type} objects and their descriptions. DO NOT add or implement new code.

The codeSnippet that is extracted from the code chunk should be an exact cut and paste from the actual code, not changed at all, except for adding an ellipsis if truncation needs to happen.

IF no ${type} objects are found, please respond with an empty JSON object:

{
    "${type}": []
}

The only values that can be set for the "type" key are: 
"class", "function", "variable", "type", "interface", "comment", "import", "export"

## Response Format
Respond ONLY with a JSON object containing the identified ${type} and their descriptions. Here is an example of the required format:

${type === 'classes' ? `
{
    "classes": [
        {
            "name": "ClassName",
            "type": "class", // DO NOT CHANGE THIS
            "description": "Description of the class",
            "codeSnippet": "class ClassName { ... }",
            "codeLine": 10,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
            "subObjects": []
        }
    ]
}` : type === 'functions' ? `
{
    "functions": [
        {
            "name": "functionName",
            "type": "function", // DO NOT CHANGE THIS
            "description": "Description of the function",
            "codeSnippet": "function functionName() { ... }",
            "codeLine": 20,
            "codeIndent": 2,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
            "isExported": false,
            "isPrivate": false,
            "isAsync": false
            "functionParameters": [
                {
                    "name": "param1",
                    "type": "string",
                    "description": "Description of the parameter",
                    "example": "exampleValue"
                }
            ],
            "functionReturns": {
                "name": "returnVal1",
                "type": "string",
                "description": "Description of the return value",
                "example": "exampleReturn"
            }
        }
    ]
}

# Rules for Gathering Function Information
- IGNORE function import declarations
- If the function is exported, set "isExported" to true
- If the function is private, set "isPrivate" to true
- If the function is async, set "isAsync" to true
- If the function has parameters, add them to the "functionParameters" array
- If the function returns a value, add it to the "functionReturns" object

Include ALL function declarations in the code snippet, even if they are not explicitly called in the code.

` : type === 'variables' ? `
{
    "variables": [
        {
            "name": "variableName",
            "type": "variable", // DO NOT CHANGE THIS
            "description": "Description of the variable",
            "codeSnippet": "let variableName = ...;",
            "codeLine": 30,
            "codeIndent": 2,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
            "isExported": false,
            "isPrivate": false
        }
    ]
}` : type === 'types' ? `
{
    "types": [
        {
            "name": "TypeName",
            "type": "type", // DO NOT CHANGE THIS
            "description": "Description of the type",
            "codeSnippet": "type TypeName = ...;",
            "codeLine": 40,
            "codeIndent": 2,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` : type === 'interfaces' ? `
{
    "interfaces": [
        {
            "name": "InterfaceName",
            "type": "interface", // DO NOT CHANGE THIS
            "description": "Description of the interface",
            "codeSnippet": "interface InterfaceName { ... }",
            "codeLine": 65,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` 
// : type === 'comments' ? `
// {
//     "comments": [
//         {
//             "content": "This is a comment",
//             type: "comment",
//             "codeLine": 50,
//             "codeIndent": 0,
//             "fileName": "${fileName}",
//             "fileLocation": "${filePath}"
//         }
//     ]
// }
` 
: type === 'imports' ? `
{
    "imports": [
        {
            "name": "importName",
            "type": "import", // DO NOT CHANGE THIS
            "description": "Description of the import",
            "codeSnippet": "import importName from 'module';",
            "codeLine": 60,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` : type === 'exports' ? `
{
    "exports": [
        {
            "name": "exportName",
            "type": "export", // DO NOT CHANGE THIS
            "description": "Description of the export",
            "codeSnippet": "export { exportName };",
            "codeLine": 70,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` : ''
}

## Code Snippet for file: ${fileName}
- File Path: ${filePath}
${codeSnippet}
`}
```

- **Line:** Could Not Verify Line
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `generalPrompt` function generates a prompt for a language model to identify and describe code objects of a specific type. It provides context about the project, previously parsed code, and instructions for the model to follow.
- **Parameters:** - `context`: A string representing the project and team context.
- `relevantCode`: A string containing relevant code snippets from previously parsed files.
- `filePath`: A string representing the path to the current file.
- `codeSnippet`: A string containing the code snippet to be analyzed.
- `type`: A string representing the type of code object to be identified (e.g., 'class', 'function', 'variable').
- **Returns:** A string containing the prompt for the language model.
- **Usage Example:** 


```typescript
const prompt = generalPrompt('Project context', 'Relevant code', './src/myFile.ts', 'const myVariable = 10;', 'variable');
```

- **Edge Cases:** If no code objects of the specified type are found, the function returns an empty JSON object.
- **Dependencies:** None

### 🧮 classesPrompt - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying and describing class objects.

**Code Snippet:**


```typescript
export const classesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'classes');
```

- **Line:** 189
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `classesPrompt` function generates a prompt for identifying and describing class objects within a code snippet.
- **Parameters:** - `context`: A string representing the project and team context.
- `relevantCode`: A string containing relevant code snippets from other files.
- `filePath`: A string representing the path to the file containing the code snippet.
- `codeSnippet`: A string containing the code snippet to be analyzed.
- `type`: A string representing the type of code object to be identified (in this case, 'classes').
- **Returns:** The function returns a string representing the prompt for identifying and describing class objects.
- **Usage Example:** 


```typescript
const prompt = classesPrompt('Project context', 'Relevant code snippets', './src/myFile.ts', 'class MyClass { ... }', 'classes');
```

- **Edge Cases:** None.
- **Dependencies:** - `generalPrompt`: A function that generates a generic prompt for identifying code objects.

### 🧮 functionsPrompt - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying and describing function objects.

**Code Snippet:**


```typescript
export const functionsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'functions');
```

- **Line:** 191
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `functionsPrompt` function generates a prompt for the LLM to identify and describe function objects within a code snippet.
- **Parameters:** - `context`: A string representing the project and team context.
- `relevantCode`: A string containing relevant code snippets from other files, used for context.
- `filePath`: A string representing the path to the file containing the code snippet.
- `codeSnippet`: A string containing the code snippet to be analyzed.
- `type`: A string representing the type of code object to be identified (in this case, 'functions').
- **Returns:** The function returns a string representing the prompt for the LLM, formatted according to the specified requirements.
- **Usage Example:** 


```typescript
const prompt = functionsPrompt('Project Context', 'Relevant Code', './src/file.ts', 'function myFunction() { ... }', 'functions');
```

- **Edge Cases:** None specifically mentioned in the code.
- **Dependencies:** - `generalPrompt`: A function that generates a generic prompt template.

### 🧮 variablesPrompt - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying and describing variable objects.

**Code Snippet:**


```typescript
export const variablesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'variables');
```

- **Line:** 193
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `variablesPrompt` function generates a prompt for identifying and describing variable objects within a code snippet.
- **Parameters:** - `context`: A string representing the project and team context.
- `relevantCode`: A string containing relevant code snippets from other files.
- `filePath`: A string representing the path to the file containing the code snippet.
- `codeSnippet`: A string containing the code snippet to be analyzed.
- `type`: A string representing the type of code object to be identified (in this case, 'variables').
- **Returns:** The function returns a string representing the prompt that will be used to identify and describe variable objects.
- **Usage Example:** 


```typescript
const prompt = variablesPrompt('Project Context', 'Relevant Code', './src/file.ts', 'let myVariable = 10;', 'variables');
```

- **Edge Cases:** None specifically mentioned.
- **Dependencies:** - `generalPrompt`: A function that generates a general prompt for identifying code objects.

### 🧮 typesPrompt - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying and describing type objects.

**Code Snippet:**


```typescript
export const typesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'types');
```

- **Line:** 195
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `typesPrompt` function generates a prompt for identifying and describing type objects within a code snippet.
- **Parameters:** - `context`: A string representing the project and team context.
- `relevantCode`: A string containing relevant code snippets from other files.
- `filePath`: A string representing the path to the file containing the code snippet.
- `codeSnippet`: A string containing the code snippet to be analyzed.
- `type`: A string representing the type of code object to be identified (in this case, 'types').
- **Returns:** The function returns a string containing the prompt for identifying and describing type objects. The prompt is formatted to be used with a language model.
- **Usage Example:** 


```typescript
const prompt = typesPrompt('Project Context', 'Relevant Code', './src/myFile.ts', 'type MyType = string;', 'types');
// The prompt variable will contain the generated prompt for identifying type objects in the code snippet.
```

- **Edge Cases:** None.
- **Dependencies:** - `generalPrompt`: A function that generates a general prompt for identifying code objects.

### 🧮 interfacesPrompt - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying and describing interface objects.

**Code Snippet:**


```typescript
export const interfacesPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'interfaces');
```

- **Line:** 197
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `interfacesPrompt` function generates a prompt for identifying and describing interface objects within a code snippet.
- **Parameters:** - `context`: A string representing the project and team context.
- `relevantCode`: A string representing the relevant code snippet from the file.
- `filePath`: A string representing the path to the file containing the code snippet.
- `codeSnippet`: A string representing the code snippet to be analyzed.
- `type`: A string representing the type of code object to be identified (in this case, 'interfaces').
- **Returns:** The function returns a string representing the prompt that will be used to identify and describe interface objects in the code snippet.
- **Usage Example:** 


```typescript
const prompt = interfacesPrompt(projectContext, relevantCode, filePath, codeSnippet, 'interfaces');
// Use the prompt to call an LLM to identify and describe interfaces
```

- **Edge Cases:** None.
- **Dependencies:** - `generalPrompt`: A function that generates a generic prompt for identifying and describing code objects.

### 🧮 importsPrompt - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying and describing import objects.

**Code Snippet:**


```typescript
// export const commentsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'comments');

export const importsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'imports');
```

- **Line:** 199
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `importsPrompt` function generates a prompt for identifying and describing import objects within a code snippet.
- **Parameters:** - `context`: A string representing the project and team context.
- `relevantCode`: A string representing the relevant code from the project.
- `filePath`: A string representing the path to the file containing the code snippet.
- `codeSnippet`: A string representing the code snippet to be analyzed.
- `type`: A string representing the type of code object to be identified (in this case, 'imports').
- **Returns:** The function returns a string representing the prompt that is used to identify and describe import objects within the code snippet.
- **Usage Example:** 


```typescript
const prompt = importsPrompt(projectContext, relevantCode, filePath, codeSnippet, 'imports');
```

- **Edge Cases:** None.
- **Dependencies:** - `generalPrompt`: A function that generates a general prompt for identifying and describing code objects.

### 🧮 exportsPrompt - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying and describing export objects.

**Code Snippet:**


```typescript
export const exportsPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => generalPrompt(context, relevantCode, filePath, codeSnippet, 'exports');
```

- **Line:** 203
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `exportsPrompt` function generates a prompt for identifying and describing export objects within a code snippet.
- **Parameters:** - `context`: A string representing the project and team context.
- `relevantCode`: A string representing the relevant code surrounding the code snippet.
- `filePath`: A string representing the path to the file containing the code snippet.
- `codeSnippet`: A string representing the code snippet to be analyzed.
- `type`: A string representing the type of code object to be identified (e.g., 'exports').
- **Returns:** The function returns a string representing the prompt for identifying and describing export objects.
- **Usage Example:** 


```typescript
const prompt = exportsPrompt(projectContext, relevantCode, filePath, codeSnippet, 'exports');
```

- **Edge Cases:** None.
- **Dependencies:** - `generalPrompt`: A function that generates a general prompt for identifying code objects.

### 🧮 getLanguageTypeFromFile - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for inferring the programming language based on a file path.

**Code Snippet:**


```typescript
export const getLanguageTypeFromFile = (filePath: string) => {
    return `Based on the file name and path, guess the programming language (i.e. JavaScript, TypeScript, Python, etc.): 
    ${filePath}
    
    Please respond with JUST the language name. For example: JavaScript
    `

}
```

- **Line:** 205
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This function generates a prompt for inferring the programming language based on a file path.
- **Parameters:** filePath: string - The path to the file.
- **Returns:** string - A prompt string that can be used to infer the programming language.
- **Usage Example:** 


```typescript
const filePath = './myFile.js';
const prompt = getLanguageTypeFromFile(filePath);
// prompt will be:
// Based on the file name and path, guess the programming language (i.e. JavaScript, TypeScript, Python, etc.):
// ./myFile.js
// 
// Please respond with JUST the language name. For example: JavaScript
```


### 🧮 getGlobsBasedOnLangStack - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for creating glob patterns based on a project's language stack.

**Code Snippet:**


```typescript
export const getGlobsBasedOnLangStack = (projectStackLang: string) => {
    return `Please respond with a JSON object that includes two keys: "glob" and "ignore".

- The "glob" key should contain an array of glob patterns that match all source code file extensions relevant to the project described below. The project can be anything from TypeScript to GO to Python, etc.
- The "ignore" key should contain an array of glob patterns for ignoring files in binary, distribution, or dependency directories.

The goal is to find source code files related to the given project stack.
- DO NOT include lock files or metadata files in the glob patterns. Add them to the ignore list instead.

For example, for a JavaScript project, you might respond with:
```
{
    "glob": ["**/*.{ts,js,tsx,jsx}"],
    "ignore": ["node_modules/**", "**/node_modules/**", "package.json", "*/package.json", "**/package-lock.json"]
}
```

ONLY Respond with the JSON object, nothing else

## Project Stack and Language:
${projectStackLang}
`
}
```

- **Line:** 214
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `getGlobsBasedOnLangStack` function generates a prompt for an LLM to create glob patterns based on a project's language stack. This prompt is designed to help identify source code files relevant to the project while excluding lock files, metadata files, and files in binary, distribution, or dependency directories.
- **Parameters:** The function takes a single parameter, `projectStackLang`, which is a string representing the project's language stack. This string should describe the programming languages, frameworks, and other relevant technologies used in the project.
- **Returns:** The function returns a string containing a prompt for an LLM. This prompt is formatted as a JSON object with two keys: `glob` and `ignore`. The `glob` key contains an array of glob patterns that match source code file extensions, while the `ignore` key contains an array of glob patterns for excluding files.
- **Usage Example:** 


```typescript
const projectStackLang = "This is a TypeScript project with a Vue.js frontend and a Node.js backend.";
const prompt = getGlobsBasedOnLangStack(projectStackLang);
```

- **Edge Cases:** The function does not handle cases where the project stack is unknown or ambiguous. In such cases, the LLM may generate inaccurate or incomplete glob patterns.
- **Dependencies:** The function relies on the `projectStackLang` parameter to generate the prompt. It does not have any external dependencies.

### 🧮 getPackageDependenciesBasedOnLanguage - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for creating glob patterns to find package dependency files based on a project's language.

**Code Snippet:**


```typescript
export const getPackageDependenciesBasedOnLanguage = (projectStackLang: string) => {
    return `
    Please respond with a JSON object that includes two keys: "glob" and "ignore".

    - The "glob" key should contain an array of glob patterns that match all file extensions related to package/dependency management typically used in a ${projectStackLang} project.
    - The "ignore" key should contain an array of glob patterns for ignoring files in the node_modules directory.

    My goal is to use this response to find files related to package dependencies.
    - DO NOT include lock files (e.g. package-lock.json, yarn.lock) in the glob patterns. You can add them to the ignore list.

    For example, for a JavaScript project, you might respond with:
    {
        "glob": ["package.json", "*/package.json", "*/**/package.json"],
        "ignore": ["node_modules/**"]
    }

    RESPOND WITH NO MORE THAN 50 globs or ignores.
    `
}
```

- **Line:** 237
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This function generates a prompt for a language model to identify and extract package dependency files based on a given project's language.
- **Parameters:** projectStackLang: string - The programming language of the project, for example, 'JavaScript', 'Python', or 'TypeScript'.
- **Returns:** string - A prompt string that is formatted for a language model to understand and respond to. The prompt includes instructions for the model to identify relevant package dependency files based on the provided project language.
- **Usage Example:** 


```typescript
const prompt = getPackageDependenciesBasedOnLanguage('JavaScript');
// The prompt variable will contain a string that can be used to query a language model.
```

- **Edge Cases:** The function does not handle cases where the provided project language is invalid or not recognized by the language model.
- **Dependencies:** None

### 🧮 determineProjectStack - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for inferring a project's technology stack based on a list of files.

**Code Snippet:**


```typescript
export const determineProjectStack = (projectFiles: string[]) => {
    return `
    Based on the list of files provided, please infer and respond with the programming languages, frameworks, and any other relevant technologies used in the project.

    List of files:
    ${projectFiles.join('
')}

    Your response should be a concise description of the project's technology stack. For example, you might respond with:
    "This is a TypeScript project with a Vue.js frontend and a Node.js backend."
    `
}
```

- **Line:** Could Not Verify Line
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `determineProjectStack` function generates a prompt for a language model to infer the technology stack of a project based on a list of files.
- **Parameters:** The function takes one parameter: `projectFiles`, which is an array of strings representing the file paths of the project.
- **Returns:** The function returns a string containing a prompt that describes the task of inferring the project's technology stack. The prompt includes a list of the provided files and an example of the expected response format.
- **Usage Example:** 


```typescript
const files = ['src/index.ts', 'src/utils.ts', 'public/index.html'];
const prompt = determineProjectStack(files);
// prompt will contain a string describing the task of inferring the project's technology stack
```

- **Edge Cases:** The function does not handle any edge cases specifically. It assumes that the provided file paths are valid and that the language model can correctly infer the project's technology stack based on the provided information.
- **Dependencies:** The function does not have any external dependencies.

### 🧮 determineModulesPackagesFromFile - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for identifying modules or packages imported or required in a code file.

**Code Snippet:**


```typescript
export const determineModulesPackagesFromFile = (fileContents: string) => {
    return `
    Based on the contents of the file provided, please identify and respond with any modules or packages that are imported or required in the code.

    Specifically, ONLY respond with a JSON object that contains the following information for each identified module or package:
    {
        "name": string,
        "version": string,
        "description": string
    }

    If the version or description is not available, use "unknown" as the value.

    File Contents:
    ${fileContents}
    `
}
```

- **Line:** 269
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `determineModulesPackagesFromFile` function generates a prompt for a language model to identify and extract information about modules or packages imported or required within a given code file.
- **Parameters:** - `fileContents: string`: This parameter represents the content of the code file being analyzed.
- **Returns:** The function returns a string containing a prompt that is designed to be used with a language model. The prompt instructs the model to identify and extract information about modules or packages imported or required in the code file. The prompt is formatted as a string that includes the file contents and instructions for the model to respond with a JSON object containing the extracted information.
- **Usage Example:** 


```typescript
const fileContents = `import { someModule } from 'some-module';`;
const prompt = determineModulesPackagesFromFile(fileContents);
// The prompt will contain instructions for the LLM to identify and extract information about 'someModule'
```

- **Edge Cases:** The function does not handle cases where the file contents are invalid or do not contain any import or require statements.
- **Dependencies:** This function does not have any external dependencies.

### 🧮 annotateCodeObjectPrompt - VARIABLE
------------------------------------------------------------
**Description:** A function that generates a prompt for annotating a code object with detailed comments.

**Code Snippet:**


```typescript
export function annotateCodeObjectPrompt(codeObj: CodeObject, context: string, ragContext:string|undefined=undefined): string {

    return `
    Based on the following context for this software code, provide detailed and relevant comments/annotations for the specific code chunk, represented in this object:
    
    ## Full Application Context
    ${context}

    ` + (ragContext ? `

    ## Other Relevant Code Snippets from Other Files 
    ${ragContext}` : '') 
    
    + `
    ## Code Object
    ${JSON.stringify(codeObj, null, 2)}

    ## Annotation Guidelines

    Based on the full context of the code, detail the following:
    
    - Purpose: Describe what this code object does.
    - Parameters: Explain the parameters of functions, their types, and their purpose.
    - Returns: Explain what the function returns.
    - Usage Example: Provide a usage example. DO NOT add additional code blocks within the response. And escape all characters properly.
    - Edge Cases: Mention any edge cases or special conditions.
    - Dependencies: List any dependencies.
    - Error Handling: Explain how errors are handled.
    - Performance: Mention any performance considerations.
    - Best Practices: Highlight best practices for using this code object.

    # Response Format
    Respond with a JSON object containing the annotations. For example:
    {
        "purpose": "This function calculates the sum of two numbers...etc",
        "parameters": "num1: number, num2: number...etd",
        "returns": "number",
        "usageExample": "\`\`\`typescript\nconst sum = add(1, 2);\n\`\`\`", 
        "edgeCases": "Negative numbers are not supported...etc",
        "dependencies": "someDependency, anotherDependency...etc",
        "errorHandling": "Throws an error if the input is not a number...etc",
        "performance": "Optimized for speed...etc",
        "bestPractices": "Use this function for adding numbers to...etc"
    }

    If there is no information available for a specific section, you can set the value to an empty string.

    Please properly escape backticks used in your key-value pairs.

    ONLY respond with the JSON object containing the annotations.
`;
},
```

- **Line:** Could Not Verify Line
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** true
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `annotateCodeObjectPrompt` function generates a prompt for annotating a code object with detailed comments. It takes a `codeObj` (a code object), `context` (the full application context), and `ragContext` (optional, relevant code snippets from other files) as input.
- **Parameters:** - `codeObj`: A `CodeObject` representing the code snippet to be annotated.
- `context`: A string containing the full application context, including project and team information.
- `ragContext`: An optional string containing relevant code snippets from other files, retrieved from a vector database (RAG).
- **Returns:** A string containing the prompt for annotating the code object.
- **Usage Example:** 


```typescript
const prompt = annotateCodeObjectPrompt(codeObj, context, ragContext);
```

- **Edge Cases:** None specified.
- **Dependencies:** - `CodeObject` interface from the `objectSchemas` module.
- `escapeStringForMD` function from the `shared` module.

### 🧮 fileName - VARIABLE
------------------------------------------------------------
**Description:** A variable that stores the name of the file being processed.

**Code Snippet:**


```typescript
    const fileName = filePath.split('/').pop();
```

- **Line:** 8
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This code snippet extracts the file name from a given file path by splitting the path string on the '/' character and taking the last element of the resulting array.
- **Returns:** The file name as a string.
- **Usage Example:** 


```typescript
const filePath = './src/prompt.ts';
const fileName = filePath.split('/').pop();
// fileName will be 'prompt.ts'
```

- **Edge Cases:** If the file path does not contain any '/' characters, the function will return the entire file path as the file name.
## types


### 🏷️ CodeObject - TYPE
------------------------------------------------------------
**Description:** Interface for representing a code object, such as a class, function, variable, type, interface, import, or export.

**Code Snippet:**


```typescript
import { CodeObject, CodeObjects, Annotation } from "./objectSchemas";
```

- **Line:** 6
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObject` interface defines the structure for representing various code elements within a project, such as classes, functions, variables, types, interfaces, imports, and exports. It provides a standardized way to store and analyze information about these code objects.
- **Usage Example:** 


```typescript
const myFunction: CodeObject = {
  name: "myFunction",
  type: "function",
  description: "This function does something",
  codeSnippet: "function myFunction() { ... }",
  codeLine: 10,
  codeIndent: 2,
  fileName: "myFile.ts",
  fileLocation: "./src/myFile.ts"
};
```

- **Dependencies:** The `CodeObject` interface relies on the `objectSchemas` module, which defines other related interfaces and types.

### 🏷️ CodeObjects - TYPE
------------------------------------------------------------
**Description:** Type for representing the different types of code objects.

**Code Snippet:**


```typescript
import { CodeObject, CodeObjects, Annotation } from "./objectSchemas";
```

- **Line:** 6
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObjects` type defines a union of strings representing different types of code objects, such as 'classes', 'functions', 'variables', 'types', 'imports', 'exports', 'interfaces', 'fileName', and 'fileLocation'.
- **Usage Example:** 


```typescript
const codeObject: CodeObjects = 'classes';
```

## imports


### 📥 CodeObject - IMPORT
------------------------------------------------------------
**Description:** Imports the CodeObject interface from the objectSchemas module.

**Code Snippet:**


```typescript
import { CodeObject, CodeObjects, Annotation } from "./objectSchemas";
```

- **Line:** 6
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code snippet imports the `CodeObject`, `CodeObjects`, and `Annotation` interfaces from the `objectSchemas` module.
- **Usage Example:** 


```typescript
// Example usage of the imported interfaces
const codeObject: CodeObject = {
  name: 'myFunction',
  type: 'function',
  description: 'This function does something',
  codeSnippet: 'function myFunction() { ... }',
  codeLine: 10,
  codeIndent: 2,
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts'
};

const codeObjects: CodeObjects = 'functions';

const annotation: Annotation = {
  purpose: 'This function does something important',
  parameters: 'param1: string, param2: number',
  returns: 'void'
};
```

- **Dependencies:** objectSchemas module
## exports


### 📤 codeSummary - EXPORT
------------------------------------------------------------
**Description:** A string template for a prompt that asks the LLM to create a summary of the code in markdown format.

**Code Snippet:**


```typescript
export const codeSummary = `
    Create a summary of the following code in markdown. ONLY respond with the summary, For example:
    
    ##Execution Flow\n\n1. The app... etc
`
```

- **Line:** 1
- **Location:** prompt.ts (./src/prompt.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code object defines a string template for a prompt that instructs a large language model (LLM) to generate a markdown summary of a code snippet.
- **Parameters:** None
- **Returns:** A string template for a prompt that instructs an LLM to generate a markdown summary of a code snippet.
- **Usage Example:** 


```typescript
// Example usage:
const prompt = codeSummary.replace('<code snippet>', codeSnippet);
// Pass the prompt to the LLM for processing
```

- **Edge Cases:** None
- **Dependencies:** None

### 📤 generalPrompt - EXPORT
------------------------------------------------------------
**Description:** A function that generates a prompt for the LLM to identify and describe code objects of a specific type (e.g., classes, functions, variables, etc.).

**Code Snippet:**


```typescript
const generalPrompt = (context: string, relevantCode: string, filePath: string, codeSnippet: string, type: CodeObjects) => {
    const fileName = filePath.split('/').pop();
    return`
You will be asked to provide a JSON object that contains the identified ${type} objects in the code snippet attached at the bottom of this request.

## Context
- Project and Team Context: 
${context}

## Previously Parsed Code
- Relevant Code:
${relevantCode}

## Task
In the following code snippet, please identify and described all of the ${type} objects. ONLY focus on the ${type} objects and their descriptions. DO NOT add or implement new code.

The codeSnippet that is extracted from the code chunk should be an exact cut and paste from the actual code, not changed at all, except for adding an ellipsis if truncation needs to happen.

IF no ${type} objects are found, please respond with an empty JSON object:

{
    "${type}": []
}

The only values that can be set for the "type" key are: 
"class", "function", "variable", "type", "interface", "comment", "import", "export"

## Response Format
Respond ONLY with a JSON object containing the identified ${type} and their descriptions. Here is an example of the required format:

${type === 'classes' ? `
{
    "classes": [
        {
            "name": "ClassName",
            "type": "class", // DO NOT CHANGE THIS
            "description": "Description of the class",
            "codeSnippet": "class ClassName { ... }",
            "codeLine": 10,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
            "subObjects": []
        }
    ]
}` : type === 'functions' ? `
{
    "functions": [
        {
            "name": "functionName",
            "type": "function", // DO NOT CHANGE THIS
            "description": "Description of the function",
            "codeSnippet": "function functionName() { ... }",
            "codeLine": 20,
            "codeIndent": 2,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
            "isExported": false,
            "isPrivate": false,
            "isAsync": false
            "functionParameters": [
                {
                    "name": "param1",
                    "type": "string",
                    "description": "Description of the parameter",
                    "example": "exampleValue"
                }
            ],
            "functionReturns": {
                "name": "returnVal1",
                "type": "string",
                "description": "Description of the return value",
                "example": "exampleReturn"
            }
        }
    ]
}

# Rules for Gathering Function Information
- IGNORE function import declarations
- If the function is exported, set "isExported" to true
- If the function is private, set "isPrivate" to true
- If the function is async, set "isAsync" to true
- If the function has parameters, add them to the "functionParameters" array
- If the function returns a value, add it to the "functionReturns" object

Include ALL function declarations in the code snippet, even if they are not explicitly called in the code.

` : type === 'variables' ? `
{
    "variables": [
        {
            "name": "variableName",
            "type": "variable", // DO NOT CHANGE THIS
            "description": "Description of the variable",
            "codeSnippet": "let variableName = ...;",
            "codeLine": 30,
            "codeIndent": 2,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
            "isExported": false,
            "isPrivate": false
        }
    ]
}` : type === 'types' ? `
{
    "types": [
        {
            "name": "TypeName",
            "type": "type", // DO NOT CHANGE THIS
            "description": "Description of the type",
            "codeSnippet": "type TypeName = ...;",
            "codeLine": 40,
            "codeIndent": 2,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` : type === 'interfaces' ? `
{
    "interfaces": [
        {
            "name": "InterfaceName",
            "type": "interface", // DO NOT CHANGE THIS
            "description": "Description of the interface",
            "codeSnippet": "interface InterfaceName { ... }",
            "codeLine": 65,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` 
// : type === 'comments' ? `
// {
//     "comments": [
//         {
//             "content": "This is a comment",
//             type: "comment",
//             "codeLine": 50,
//             "codeIndent": 0,
//             "fileName": "${fileName}",
//             "fileLocation": "${filePath}"
//         }
//     ]
// }
` 
: type === 'imports' ? `
{
    "imports": [
        {
            "name": "importName",
            "type": "import", // DO NOT CHANGE THIS
            "description": "Description of the import",
            "codeSnippet": "import importName from 'module';",
            "codeLine": 60,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` : type === 'exports' ? `
{
    "exports": [
        {
            "name": "exportName",
            "type": "export", // DO NOT CHANGE THIS
            "description": "Description of the export",
            "codeSnippet": "export { exportName };",
            "codeLine": 70,
            "codeIndent": 0,
            "fileName": "${fileName}",
            "fileLocation": "${filePath}",
        }
    ]
}` : ''
}

## Code Snippet for file: ${fileName}
- File Path: ${filePath}
${codeSnippet}
`}
};
```

- **Line:** Could Not Verify Line
- **Location:** undefined (Unable to Load)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `generalPrompt` function generates a prompt for a language model to identify and describe code objects of a specific type (e.g., classes, functions, variables, etc.). It provides context about the project, previously parsed code, and instructions for the model to follow.
- **Parameters:** - `context`: A string representing the project and team context.
- `relevantCode`: A string containing relevant code snippets from previously parsed files.
- `filePath`: A string representing the path to the current file.
- `codeSnippet`: A string containing the code snippet to be analyzed.
- `type`: A string representing the type of code object to be identified (e.g., 'classes', 'functions', 'variables').
- **Returns:** A string containing the prompt for the language model.
- **Usage Example:** 


```typescript
const prompt = generalPrompt('Project context', 'Relevant code', '/path/to/file.ts', 'const myFunction = () => { ... }', 'functions');
```

- **Edge Cases:** If no code objects of the specified type are found, the function returns an empty JSON object.
- **Dependencies:** None
## interfaces


### 🌉 CodeObject - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of a code object.

**Code Snippet:**


```typescript
interface CodeObject {
    name: string;
    type: CodeObjectType;
    description: string;
    codeSnippet: string;
    annotation?: Annotation;
    codeLine?: number;
    codeIndent?: number;
    content?: string;
    fileName: string;
    fileLocation: string;
    subObjects?: CodeObject[];
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

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeObject` interface defines the structure of a code object, which represents a single element within a codebase, such as a class, function, variable, or type.
- **Usage Example:** 


```typescript
const myFunction: CodeObject = {
  name: 'myFunction',
  type: 'function',
  description: 'This function does something',
  codeSnippet: 'function myFunction() { ... }',
  codeLine: 10,
  codeIndent: 2,
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  isExported: true,
  isFunction: true,
  isClass: false,
  isPrivate: false,
  isAsync: false
};
```


### 🌉 FunctionParameter - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of a function parameter.

**Code Snippet:**


```typescript
interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `FunctionParameter` interface defines the structure of a function parameter, which is used to represent a single parameter within a function definition.
- **Parameters:** - `name`: A string representing the name of the parameter.
- `type`: A string representing the data type of the parameter.
- `description`: A string providing a description of the parameter's purpose.
- `example`: A string providing an example value for the parameter.
- **Returns:** This interface does not return any value. It simply defines the structure of a function parameter.
- **Usage Example:** 


```typescript
const functionParameter: FunctionParameter = {
    name: 'param1',
    type: 'string',
    description: 'This is the first parameter',
    example: 'Hello World'
};
```


### 🌉 FunctionReturn - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of a function return value.

**Code Snippet:**


```typescript
interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `FunctionReturn` interface defines the structure of a function's return value, specifying its type, description, and an example.
- **Usage Example:** 


```typescript
// Example usage of FunctionReturn interface
const functionReturn: FunctionReturn = {
    type: 'string',
    description: 'This function returns a string',
    example: 'Hello, world!'
};
```


### 🌉 Annotation - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of an annotation for a code object.

**Code Snippet:**


```typescript
interface Annotation {
    purpose: string;
    parameters?: string;
    returns?: string;
    usageExample?: string;
    edgeCases?: string;
    dependencies?: string;
    errorHandling?: string;
    performance?: string;
    bestPractices?: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `Annotation` interface defines the structure for annotations associated with code objects. It provides fields to capture various aspects of a code object, including its purpose, parameters, return values, usage examples, edge cases, dependencies, error handling, performance considerations, and best practices.
- **Usage Example:** 


```typescript
const annotation: Annotation = {
    purpose: "This function calculates the sum of two numbers.",
    parameters: "num1: number, num2: number",
    returns: "number",
    usageExample: "const sum = add(1, 2);",
    edgeCases: "Negative numbers are not supported.",
    dependencies: "someDependency, anotherDependency",
    errorHandling: "Throws an error if the input is not a number.",
    performance: "Optimized for speed.",
    bestPractices: "Use this function for adding numbers to..."
};
```


### 🌉 CodeFileSummary - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of a code file summary.

**Code Snippet:**


```typescript
interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: codeSummary;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `CodeFileSummary` interface represents a summary of a code file, containing information about its name, location, code summary, language, execution flow, and code objects.
- **Usage Example:** 


```typescript
const codeFileSummary: CodeFileSummary = {
  fileName: 'myFile.ts',
  fileLocation: './src/myFile.ts',
  codeSummary: {
    goal: 'This file implements a function to calculate the sum of two numbers.',
    features_functions: 'The function takes two numbers as input and returns their sum.'
  },
  language: 'TypeScript',
  executionFlow: [],
  codeObjects: {
    functions: [
      {
        name: 'add',
        type: 'function',
        description: 'Calculates the sum of two numbers.',
        codeSnippet: 'function add(num1: number, num2: number): number {\n  return num1 + num2;\n}',
        codeLine: 10,
        codeIndent: 2,
        fileName: 'myFile.ts',
        fileLocation: './src/myFile.ts',
        isExported: true,
        isPrivate: false,
        isAsync: false,
        functionParameters: [
          {
            name: 'num1',
            type: 'number',
            description: 'The first number to add.',
            example: '1'
          },
          {
            name: 'num2',
            type: 'number',
            description: 'The second number to add.',
            example: '2'
          }
        ],
        functionReturns: {
          type: 'number',
          description: 'The sum of the two input numbers.',
          example: '3'
        }
      }
    ]
  }
};
```


### 🌉 ExecutionFlow - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of an execution flow step.

**Code Snippet:**


```typescript
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
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ExecutionFlow` interface defines the structure of a single step in an execution flow. It is used to represent a step in a sequence of actions or operations within a codebase.
- **Usage Example:** 


```typescript
const executionFlowStep: ExecutionFlow = {
    step: 1,
    stepDescription: "Initialize the application",
    bImportant: true,
    codeSnippet: "// Initialize the application",
    codeLine: 10,
    codeIndent: 2,
    fileName: "main.ts",
    fileLocation: "./src/main.ts"
};
```


### 🌉 ProjectSummary - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of a project summary.

**Code Snippet:**


```typescript
interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `ProjectSummary` interface defines the structure of a project summary object, which is used to store information about a codebase.
- **Usage Example:** 


```typescript
const projectSummary: ProjectSummary = {
  projectName: 'MyProject',
  projectDescription: {
    goal: 'This project is a simple web application',
    features_functions: 'It has a login page and a home page'
  },
  projectLocation: '/path/to/project',
  projectTechStackDescription: 'This is a TypeScript project with a React frontend and a Node.js backend',
  projectDependencies: [],
  codeFiles: [],
  ragData: [],
  teamContext: 'This project is being developed by a team of engineers'
};
```


### 🌉 RagData - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of RAG data.

**Code Snippet:**


```typescript
interface RagData {
    metadata: {
        filename: string;
        codeChunkId: string | number;
        codeChunkLineStart: number;
        codeChunkLineEnd: number;
        codeObjects: CodeObject;
        codeChunkSummary: string;
    };
    embeddings?: number[][]; // Example: Embeddings could be an array of numbers
    documentData: any
    allSearchResults: QueryResponse,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `RagData` interface defines the structure of data used for Retrieval Augmented Generation (RAG). It stores metadata about code chunks, embeddings, document data, and search results.
- **Usage Example:** 


```typescript
const ragData: RagData = {
  metadata: {
    filename: 'myFile.ts',
    codeChunkId: 1,
    codeChunkLineStart: 10,
    codeChunkLineEnd: 20,
    codeObjects: { /* Code object data */ },
    codeChunkSummary: 'This code chunk defines a function...'
  },
  embeddings: [ /* Embedding data */ ],
  documentData: '// Code chunk content', // Code chunk content
  allSearchResults: { /* Search results data */ },
  allResults: { /* Search results data */ }
};
```

- **Dependencies:** This interface depends on the `CodeObject` interface and the `QueryResponse` type from the `chromadb` library.

### 🌉 moduleObject - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of a module object.

**Code Snippet:**


```typescript
interface moduleObject {
    name: string;
    version: string;
    description: string;
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `moduleObject` interface defines the structure of a module object, which represents a software module or package.
- **Usage Example:** 


```typescript
const myModule: moduleObject = {
  name: 'my-module',
  version: '1.0.0',
  description: 'A useful module',
};
```


### 🌉 runtimeData - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of runtime data.

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
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `runtimeData` interface defines the structure of runtime data used by the application. It stores information about the application version, project name, project path, output path, selected language model, selected RAG service, and other relevant runtime parameters.
- **Usage Example:** 


```typescript
const runtimeData: runtimeData = {
  appVersion: '1.0.0',
  projectName: 'MyProject',
  projectPath: '/path/to/project',
  outputPath: '/path/to/output',
  selectedLLModel: 'gpt-3.5-turbo',
  selectedRAGService: 'chromadb',
};
```


### 🌉 globResult - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of a glob result.

**Code Snippet:**


```typescript
interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `globResult` interface defines the structure of a glob result, which is used to store the results of a glob operation.
- **Usage Example:** 


```typescript
const globResult: globResult = {
    "glob": ["**/*.ts", "**/*.js"],
    "ignore": ["node_modules/**", "dist/**"]
};
```


### 🌉 modelServiceConfig - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of a model service configuration.

**Code Snippet:**


```typescript
interface modelServiceConfig {
    models: models[],
    endpoint?: string
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `modelServiceConfig` interface defines the structure for configuring a model service. It specifies the models available and an optional endpoint for accessing the service.
- **Usage Example:** 


```typescript
const config: modelServiceConfig = {
    models: [
        {
            name: 'phi3',
            model: 'phi3'
        }
    ],
    endpoint: 'http://localhost:11434'
};
```


### 🌉 models - INTERFACE
------------------------------------------------------------
**Description:** An interface that defines the structure of a model.

**Code Snippet:**


```typescript
interface models {
    name: string,
    model: any,
}
```

- **Line:** Could Not Verify Line
- **Location:** objectSchemas.ts (./src/objectSchemas.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** The `models` interface defines the structure of a model object, which is used to represent different language models within the application.
- **Usage Example:** 


```typescript
const myModel: models = {
    name: "gpt-3.5-turbo",
    model: openai.models.gpt3.gpt3_5_turbo
};
```

