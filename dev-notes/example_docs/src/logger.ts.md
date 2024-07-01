# src/logger.ts - fofo-docs

**Summary:** The code aims to create a custom logging system that enhances the default console logging functionality by adding color-coded output, timestamps, and file logging. It replaces the original console methods (log, error, warn, debug, info) with custom functions that provide these enhancements.

- **File Location:** ./src/logger.ts
- **Language:** language: TypeScript 

## Table of Contents
- [functions](#functions)
- [variables](#variables)
- [types](#types)
- [imports](#imports)
## functions


### 🔧 logToFile - FUNCTION
------------------------------------------------------------
**Description:** Helper function to log to a file

**Code Snippet:**


```typescript
function logToFile(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level}] ${message}
`;
    appendFileSync(logFilePath, logMessage);
}
```

- **Line:** Could Not Verify Line
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** false
- **Private:** false
- **Async:** false


###### Function Parameters:
- **level** (string): The log level 
 Example: 'LOG'
- **message** (string): The message to log 
 Example: 'This is a log message'
###### Function Returns:
- **Type:** void
- **Description:** Returns nothing
- **Example:** undefined
###### Annotations / Comments:
- **Purpose:** This function logs a message to a file with a timestamp and log level.
- **Parameters:** - level: string - The log level (e.g., 'LOG', 'ERROR', 'WARN', 'DEBUG').
- message: string - The message to log.
- **Returns:** void - The function does not return any value.
- **Dependencies:** - appendFileSync from 'fs' - Used to append the log message to the file.

### 🔧 customLog - FUNCTION
------------------------------------------------------------
**Description:** Custom log function

**Code Snippet:**


```typescript
export function customLog(...args: any[]): void {
    const message = args.join(' ');
    originalConsole.log(chalk.blue(`ℹ️ [LOG] ${message}`));
    logToFile('LOG', message);
}
```

- **Line:** 45
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **args** (any[]): The arguments to log 
 Example: ['This', 'is', 'a', 'log', 'message']
###### Function Returns:
- **Type:** void
- **Description:** Returns nothing
- **Example:** undefined
###### Annotations / Comments:
- **Purpose:** This function logs a message to the console and to a log file. It uses chalk to colorize the message and adds a timestamp and level to the log message.
- **Parameters:** args: any[] - The arguments to log. These arguments will be joined together with spaces to form the log message.
- **Returns:** void - This function does not return any value.
- **Usage Example:** 
```
customLog('This is a log message');
```
- **Dependencies:** chalk, originalConsole, logToFile

### 🔧 customError - FUNCTION
------------------------------------------------------------
**Description:** Custom error function

**Code Snippet:**


```typescript
export function customError(...args: any[]): void {
    const message = args.join(' ');
    originalConsole.error(chalk.red(`❌ [ERROR] ${message}`));
    logToFile('ERROR', message);
}
```

- **Line:** 51
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **args** (any[]): The arguments to log 
 Example: ['This', 'is', 'an', 'error', 'message']
###### Function Returns:
- **Type:** void
- **Description:** Returns nothing
- **Example:** undefined
###### Annotations / Comments:
- **Purpose:** This function logs an error message to the console and to a log file.
- **Parameters:** args: any[] - The arguments to log. These arguments will be joined together with spaces to form the error message.
- **Returns:** void - This function does not return any value.
- **Usage Example:** 
```
customError('This is an error message');
```
- **Dependencies:** - chalk: Used for colorizing the error message.
- originalConsole: Stores the original console methods (log, error, warn, debug, info).
- logToFile: A helper function to log messages to a file.

### 🔧 customWarn - FUNCTION
------------------------------------------------------------
**Description:** Custom warn function

**Code Snippet:**


```typescript
export function customWarn(...args: any[]): void {
    const message = args.join(' ');
    originalConsole.warn(chalk.yellow(`⚠️ [WARN] ${message}`));
    logToFile('WARN', message);
}
```

- **Line:** 57
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **args** (any[]): The arguments to log 
 Example: ['This', 'is', 'a', 'warning', 'message']
###### Function Returns:
- **Type:** void
- **Description:** Returns nothing
- **Example:** undefined
###### Annotations / Comments:
- **Purpose:** This function logs a warning message to the console and to a log file.
- **Parameters:** args: any[] - An array of arguments to be logged as a warning message.
- **Returns:** void - The function does not return any value.
- **Usage Example:** 
```
customWarn('This is a warning message');
```
- **Dependencies:** originalConsole, chalk, logToFile

### 🔧 customDebug - FUNCTION
------------------------------------------------------------
**Description:** Custom debug function

**Code Snippet:**


```typescript
export function customDebug(...args: any[]): void {
    const message = args.join(' ');
    originalConsole.debug(chalk.gray(`🐞 [DEBUG] ${message}`));
    logToFile('DEBUG', message);
}
```

- **Line:** 63
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** true
- **Private:** false
- **Async:** false


###### Function Parameters:
- **args** (any[]): The arguments to log 
 Example: ['This', 'is', 'a', 'debug', 'message']
###### Function Returns:
- **Type:** void
- **Description:** Returns nothing
- **Example:** undefined
###### Annotations / Comments:
- **Purpose:** The `customDebug` function is a custom logging function that logs debug messages to both the console and a log file. It uses the `chalk` library to colorize the output and adds a timestamp and log level to the message.
- **Parameters:** args: any[] - An array of arguments to be logged. The arguments are joined together with spaces to form the final log message.
- **Returns:** void - The function does not return any value.
- **Usage Example:** 
```
customDebug('This is a debug message');
```
- **Dependencies:** chalk, originalConsole, logToFile
## variables


### 🧮 colors - VARIABLE
------------------------------------------------------------
**Description:** An object containing ANSI color codes for different colors.

**Code Snippet:**


```typescript
const colors = {
    reset: "\x1b[0m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    gray: "\x1b[90m",
};
```

- **Line:** 5
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** This variable defines an object called `colors` that stores ANSI color codes for different colors. These codes are used to colorize the output of the logging system.
- **Usage Example:** 


```typescript
console.log(chalk.blue("This text will be blue"));
```


### 🧮 chalk - VARIABLE
------------------------------------------------------------
**Description:** An object containing functions to colorize text using the ANSI color codes defined in the `colors` object.

**Code Snippet:**


```typescript
const chalk = {
    blue: (text: string) => `${colors.blue}${text}${colors.reset}`,
    red: (text: string) => `${colors.red}${text}${colors.reset}`,
    yellow: (text: string) => `${colors.yellow}${text}${colors.reset}`,
    gray: (text: string) => `${colors.gray}${text}${colors.reset}`,
}
```

- **Line:** 13
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `chalk` variable is an object that provides functions to colorize text using ANSI escape codes. It's used to enhance the logging output by adding color to different log levels.
- **Parameters:** Each function within the `chalk` object takes a single parameter, `text`, which is the string to be colorized.
- **Returns:** Each function returns a string with the ANSI escape codes applied to the input text, resulting in colored output when printed to the console.
- **Usage Example:** 


```typescript
console.log(chalk.blue("This is blue text"));
console.log(chalk.red("This is red text"));
```

- **Dependencies:** The `chalk` object depends on the `colors` object, which defines the ANSI color codes.

### 🧮 logsFolder - VARIABLE
------------------------------------------------------------
**Description:** A string representing the path to the logs folder, which is located in the same directory as the current file.

**Code Snippet:**


```typescript
const logsFolder = join(__dirname, 'logs');
```

- **Line:** 22
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `logsFolder` variable stores the path to the directory where log files will be saved. It is created by joining the directory of the current file (`__dirname`) with the string 'logs'.
- **Dependencies:** The `logsFolder` variable depends on the `join` function from the `path` module.

### 🧮 logFilePath - VARIABLE
------------------------------------------------------------
**Description:** A string representing the path to the log file, which is located in the logs folder and named `log-{timestamp}.txt`.

**Code Snippet:**


```typescript
const logFilePath = join(logsFolder, `log-${timestamp}.txt`);
```

- **Line:** 26
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `logFilePath` variable stores the path to the log file, which is dynamically generated based on the current timestamp.
- **Usage Example:** 


```typescript
// Example usage of logFilePath
console.log(`Logging to file: ${logFilePath}`);
```

- **Dependencies:** The `logFilePath` variable depends on the `join` function from the `path` module and the `timestamp` variable, which is generated using the `Date` object.

### 🧮 logMessage - VARIABLE
------------------------------------------------------------
**Description:** A string representing the log message to be written to the log file, including the timestamp, level, and message.

**Code Snippet:**


```typescript
function logToFile(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level}] ${message}
`;
    appendFileSync(logFilePath, logMessage);
}
```

- **Line:** Could Not Verify Line
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `logMessage` variable is a string that stores the formatted log message, which includes the timestamp, log level, and the actual message.

### 🧮 originalConsole - VARIABLE
------------------------------------------------------------
**Description:** An object containing references to the original console methods (log, error, warn, debug, info).

**Code Snippet:**


```typescript
const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    debug: console.debug,
    info: console.info,
};
```

- **Line:** 36
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** false
- **Private:** false
###### Annotations / Comments:
- **Purpose:** The `originalConsole` variable stores references to the original console methods (log, error, warn, debug, info) from the Node.js standard library. This is done to preserve the original console functionality before it's replaced with custom logging functions.
## types


### 🏷️ Color - TYPE
------------------------------------------------------------
**Description:** Type alias for color names.

**Code Snippet:**


```typescript
type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
```

- **Line:** Could Not Verify Line
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This type alias defines a set of possible color names for use in the code.
- **Usage Example:** 


```typescript
const color: Color = 'red';
```

## imports


### 📥 appendFileSync - IMPORT
------------------------------------------------------------
**Description:** Imports the appendFileSync function from the 'fs' module.

**Code Snippet:**


```typescript
import { appendFileSync, existsSync, mkdirSync } from 'fs';
```

- **Line:** 1
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `appendFileSync`, `existsSync`, and `mkdirSync` functions from the 'fs' module, which provides file system operations in Node.js.
- **Dependencies:** fs

### 📥 existsSync - IMPORT
------------------------------------------------------------
**Description:** Imports the existsSync function from the 'fs' module.

**Code Snippet:**


```typescript
import { appendFileSync, existsSync, mkdirSync } from 'fs';
```

- **Line:** 1
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the `existsSync`, `appendFileSync`, and `mkdirSync` functions from the `fs` module, which provides file system operations in Node.js.
- **Dependencies:** fs module

### 📥 join - IMPORT
------------------------------------------------------------
**Description:** Imports the join function from the 'path' module.

**Code Snippet:**


```typescript
import { join } from 'path';
```

- **Line:** 2
- **Location:** logger.ts (./src/logger.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This code imports the \`join\` function from the \`path\` module, which is used for joining path segments into a single path string.
- **Usage Example:** 


```typescript
const filePath = join(__dirname, 'logs');
```

- **Dependencies:** path module
