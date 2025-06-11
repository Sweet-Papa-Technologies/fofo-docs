import { readFile } from 'fs/promises';
import fs from 'fs';
import "dotenv/config";
import "./logger";
import path from 'path';

export const API_COST_PER_CHARACTER = process.env.API_COST_PER_CHARACTER || 0.00025;
export const API_COST_PER_CHARACTER_OUT = process.env.API_COST_PER_CHARACTER_OUT || 0.00075;
export const API_COST_PER_EMBEDDING = process.env.API_COST_PER_EMBEDDING || 0.000025;

export async function getFileContentLen(filePath: string): Promise<number> {
    return await readFile(filePath, 'utf-8').then(content => content.length);
}



/**
 * Custom error class for Base64 to PNG conversion errors
 */
class Base64ToPngError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Base64ToPngError';
    }
}

/**
 * Configuration options for the conversion
 */
interface ConversionOptions {
    /**
     * Whether to create the output directory if it doesn't exist
     * @default true
     */
    createDirectory?: boolean;
    /**
     * Whether to overwrite the file if it already exists
     * @default false
     */
    overwrite?: boolean;
}

/**
 * Result of the conversion process
 */
interface ConversionResult {
    /** The path where the file was saved */
    filePath: string;
    /** The size of the written file in bytes */
    size: number;
}

/**
 * Converts a base64 string to a PNG file and saves it to the specified path
 * @param base64String - The base64 string to convert (with or without data URI prefix)
 * @param filePath - The full path where the PNG file should be saved
 * @param options - Optional configuration for the conversion process
 * @returns Promise resolving to the conversion result
 * @throws {Base64ToPngError} If the conversion fails for any reason
 */
async function base64ToPngFile(
    base64String: string,
    filePath: string,
    options: ConversionOptions = {}
): Promise<ConversionResult> {
    const {
        createDirectory = true,
        overwrite = false
    } = options;

    try {
        // Input validation
        if (!base64String) {
            throw new Base64ToPngError('Base64 string is required');
        }
        if (!filePath) {
            throw new Base64ToPngError('File path is required');
        }

        // Ensure the file extension is .png
        if (path.extname(filePath).toLowerCase() !== '.png') {
            throw new Base64ToPngError('File path must have .png extension');
        }

        // Check if file exists and handle overwrite option
        try {
            const stats = await fs.statSync(filePath);
            if (stats.isFile() && !overwrite) {
                throw new Base64ToPngError('File already exists and overwrite is not enabled');
            }
        } catch (error) {
            // If error is anything other than 'file not found', rethrow it
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
                throw error;
            }
        }

        // Remove data URI prefix if it exists
        let cleanBase64 = base64String;
        if (base64String.startsWith('data:image/png;base64,')) {
            cleanBase64 = base64String.replace(/^data:image\/png;base64,/, '');
        }

        // Validate base64 string format
        if (!/^[A-Za-z0-9+/]+[=]{0,2}$/.test(cleanBase64)) {
            throw new Base64ToPngError('Invalid base64 string format');
        }

        // Convert base64 to buffer
        const buffer = Buffer.from(cleanBase64, 'base64');

        // Verify PNG signature (first 8 bytes)
        const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
        if (buffer.slice(0, 8).compare(pngSignature) !== 0) {
            throw new Base64ToPngError('Invalid PNG format');
        }

        // Create directory if needed
        if (createDirectory) {
            const directory = path.dirname(filePath);
            await fs.mkdirSync(directory, { recursive: true });
        }

        // Write the file
        await fs.writeFileSync(filePath, buffer);

        return {
            filePath,
            size: buffer.length
        };
    } catch (error) {
        if (error instanceof Base64ToPngError) {
            throw error;
        }
        throw new Base64ToPngError(
            `Failed to convert base64 to PNG: ${(error as Error).message}`
        );
    }
}

export { base64ToPngFile, Base64ToPngError, type ConversionOptions, type ConversionResult };

export const getCostOfAPICall = (characters: number): number => {
    characters = characters / 1000;
    const cost: number =  typeof API_COST_PER_CHARACTER === 'string' ? parseFloat(API_COST_PER_CHARACTER) : API_COST_PER_CHARACTER;
    console.debug("Cost of API Call:", cost)
    return characters * cost;
}

export const getCostOfAPICallTextOut = (characters: number): number => {
    characters = characters / 1000;
    const cost: number =  typeof API_COST_PER_CHARACTER_OUT === 'string' ? parseFloat(API_COST_PER_CHARACTER_OUT) : API_COST_PER_CHARACTER_OUT;
    console.debug("Cost of API Call Text Out:", cost)
    return characters * cost;
}

export const getCostOfAPICallEmbedding = (characters: number): number => {
    characters = characters / 1000;
    const cost: number =  typeof API_COST_PER_EMBEDDING === 'string' ? parseFloat(API_COST_PER_EMBEDDING) : API_COST_PER_EMBEDDING;
    console.debug("Cost of API Call Embedding:", cost)
    return characters * cost;
}

export const getTotalLines = (code: string) => code.split('\n').length;

export function breakCodeIntoChunks(code: string, chunkSize: number): string[] {
    const codeByLine = code.split('\n');
    const chunks = [];
    let currentChunk = '';
    let currentChunkTokenCount = 0;

    for (const line of codeByLine) {
        const lineTokenCount = line.split(/\s+/).length; // Approximate token count by splitting on whitespace

        if (currentChunkTokenCount + lineTokenCount <= chunkSize) {
            currentChunk += line + '\n';
            currentChunkTokenCount += lineTokenCount;
        } else {
            chunks.push(currentChunk);
            currentChunk = line + '\n';
            currentChunkTokenCount = lineTokenCount;
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk);
    }

    return chunks;
}

export function getTokens(code: string): number {
    return code.split(' ').length
}

type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

const colors: { [key in Color]: string } = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
};

const reset = '\x1b[0m';

export function colorize(text: string, color: Color): string {
    return `${colors[color]}${text}${reset}`.trim()
}


export const makeOSpathFriendly = (str: string) => {
    const listOfNoNoChars = ['<', '>', ':', '"', '|', '?', '*'];
    const platform = process.platform;

    if (platform === 'win32') {
        str = str.replace(/\//g, '\\');
    } else {
        str = str.replace(/\\/g, '/');
    }

    for (const char of listOfNoNoChars) {
        str = str.replace(char, '_');
    }
    return str;
}

export function isArray(value: any): value is any[] {
    return Array.isArray(value);
}

export function escapeStringForMD(string: string | undefined): string {
    // Handle undefined, null, or non-string values safely
    if (typeof string !== 'string' || string === null) {
        return "Data Not Available";
    }

    // If string is empty, return it as is
    if (string.trim() === '') {
        return string;
    }

    let result = string;

    // Skip escaping if this is already a code block (surrounded by triple backticks)
    if (result.trim().startsWith('```') && result.trim().endsWith('```')) {
        return result;
    }

    // Skip escaping if this is already an inline code (surrounded by single backticks)
    if (result.trim().startsWith('`') && result.trim().endsWith('`') 
        && (result.match(/`/g) || []).length === 2) {
        return result;
    }
    
    // Handle multiline code blocks more intelligently
    const lines = result.split('\n');
    let inCodeBlock = false;
    const processedLines = lines.map(line => {
        // Check if line is a code block delimiter
        if (line.trim().startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            return line;
        }
        
        // Don't escape content inside code blocks
        if (inCodeBlock) {
            return line;
        }
        
        // Escape markdown syntax outside code blocks
        return escapeMarkdownLine(line);
    });
    
    return processedLines.join('\n');
}

// Helper function to escape markdown syntax in a single line
function escapeMarkdownLine(line: string): string {
    let result = line;
    
    // Escape basic markdown syntax
    result = result.replace(/\[/g, '\\[');
    result = result.replace(/\]/g, '\\]');
    result = result.replace(/\(/g, '\\(');
    result = result.replace(/\)/g, '\\)');
    result = result.replace(/\*/g, '\\*');
    result = result.replace(/\_/g, '\\_');
    
    // Handle header markers at the beginning of lines
    result = result.replace(/^(\s*)#/gm, '$1\\#');
    
    // Handle list markers at the beginning of lines
    result = result.replace(/^(\s*)-/gm, '$1\\-');
    
    // Handle blockquote markers at the beginning of lines
    result = result.replace(/^(\s*)>/gm, '$1\\>');
    
    // Handle inline backticks - escape only unpaired backticks
    const backtickCount = (result.match(/`/g) || []).length;
    if (backtickCount % 2 !== 0) {
        // Find all paired backticks first
        const pairedBacktickPattern = /`[^`]*`/g;
        const pairedBackticks = result.match(pairedBacktickPattern) || [];
        
        // Replace paired backticks with a placeholder
        let tempResult = result;
        const placeholder = "__PAIRED_BACKTICK_PLACEHOLDER__";
        pairedBackticks.forEach((pair, index) => {
            tempResult = tempResult.replace(pair, `${placeholder}${index}`);
        });
        
        // Escape remaining unpaired backticks
        tempResult = tempResult.replace(/`/g, '\\`');
        
        // Restore paired backticks
        pairedBackticks.forEach((pair, index) => {
            tempResult = tempResult.replace(`${placeholder}${index}`, pair);
        });
        
        result = tempResult;
    }
    
    return result;
}

export function getContextFromFile() {
    const contextFile = (process.env.CONTEXT_FILE === '' || !process.env.CONTEXT_FILE) ? "./prompts/teamContext.md" : (process.env.CONTEXT_FILE || "./prompts/teamContext.md");
    console.log("Looking for Context File at Path:", contextFile)
    try {
      if (!fs.existsSync(contextFile)) {
        throw new Error("Context File Not Found!");
      }
      return fs.readFileSync(contextFile, "utf-8");
    } catch (err) {
      console.warn("Context File Not Loaded! Using Default Context");
      return "N/A";
    }
  }

  export function makeWebSafe(str: string): string {
    return str.replace(/[^a-zA-Z0-9]/g, "_");
  }

  export function cleanBackticks(input: string): string {
    if (!input) return '';
    
    // List of common programming languages for code block syntax highlighting
    const languages = ['javascript', 'typescript', 'python', 'java', 'c', 'c\\+\\+', 'c#', 'html', 'css', 'scss', 'less', 'json', 'yaml', 'xml', 'markdown', 'plaintext', 'shell', 'bash', 'powershell', 'dockerfile', 'sql', 'graphql', 'php', 'ruby', 'perl', 'go', 'rust', 'swift', 'kotlin', 'dart', 'r'];
    
    // Trim input and ensure we're working with clean text
    let processedInput = input.trim();
    
    // Step 1: Handle any existing backticks in the content to prevent nested code blocks
    // Replace any existing triple backticks inside the content with single backticks
    // Only do this for content that isn't already a proper code block
    if (!(processedInput.startsWith('```') && processedInput.endsWith('```'))) {
      // Replace triple backticks with single backticks to avoid breaking markdown structure
      processedInput = processedInput.replace(/```/g, '`');
    }
    
    // Step 2: Escape markdown special characters at the beginning of lines
    // This prevents text within code blocks from being interpreted as markdown headers, lists, etc.
    processedInput = processedInput.replace(/^(\s*)(#+|\*|-|>)/gm, '$1\\$2');
    
    // Step 3: Ensure the code block has proper language specification
    if (!processedInput.startsWith('```')) {
      // If we don't have opening backticks, add them with appropriate language
      let languageSpec = '';
      
      // Try to detect language from the first line
      const firstLine = processedInput.split('\n')[0].toLowerCase();
      for (const lang of languages) {
        if (firstLine.includes(lang)) {
          languageSpec = lang;
          break;
        }
      }
      
      // Default to plaintext if no language is detected
      if (!languageSpec) {
        languageSpec = 'plaintext';
      }
      
      // Add proper opening code block with language
      processedInput = `\`\`\`${languageSpec}\n${processedInput}`;
    }
    
    // Step 4: Ensure the code block has proper closing
    if (!processedInput.endsWith('```')) {
      processedInput = `${processedInput}\n\`\`\``;
    }
    
    return processedInput;
  }
//   export function cleanBackticks(input: string): string {

//     // OK, we seem to have proper backticks, let's check to make sure the code header for the code block is present
   
//     const languages = ['javascript', 'typescript', 'python', 'java', 'c', 'c++', 'c#', 'html', 'css', 'scss', 'less', 'json', 'yaml', 'xml', 'markdown', 'plaintext', 'shell', 'bash', 'powershell', 'dockerfile', 'sql', 'graphql', 'php', 'ruby', 'perl', 'go', 'rust', 'swift', 'kotlin', 'dart', 'r'];
  
//     languages.forEach((lang) => {
//         const badFormatting = '```\n' + lang
//         const alsoBadFormatting = '```\r\n' + lang
//         const thisIsAlsoBadFormatting = '```\r' + lang
//         const thisIsREALLYbadFormatting = lang + "\n"
//         const correctFormatting = '```' + lang + "\n";

//         if (input.includes(thisIsREALLYbadFormatting) && !input.includes(correctFormatting)) {
//             console.debug(`Replacing bad formatting: ${thisIsREALLYbadFormatting} with ${correctFormatting}`);
//             input = input.replace(thisIsREALLYbadFormatting, correctFormatting);
//         }

//         if (input.includes(badFormatting)) {
            
//             console.debug(`Replacing bad formatting: ${badFormatting} with ${correctFormatting}`);
//             input = input.replace(badFormatting, correctFormatting);
//         }

//         if (input.includes(alsoBadFormatting)) {
//             console.debug(`Replacing bad formatting: ${alsoBadFormatting} with ${correctFormatting}`);
//             input = input.replace(alsoBadFormatting, correctFormatting);
//         }

//         if (input.includes(thisIsAlsoBadFormatting)) {
//             console.debug(`Replacing bad formatting: ${thisIsAlsoBadFormatting} with ${correctFormatting}`);
//             input = input.replace(thisIsAlsoBadFormatting, correctFormatting);
//         }


//     }

// )

//     // Count the number of backticks
//     const backtickCount = (input.match(/`/g) || []).length;
  
//     // If the number of backticks is odd, it means they're not properly closed
//     if (backtickCount % 2 !== 0) {
//       // Remove all backticks
//       return input.replace(/`/g, '');
//     }

//     // Escape any backticks that are NOT at the beginning or end of the string
//     input = input.replace(/([^`])`([^`])/g, '$1\\`$2');

//     // // Escape any code block headers that are not at the beginning of the string
//     // input = input.replace(/([^`])```/g, '$1\\`\\`\\`');

//     // If backticks are properly closed, return the original string
//     return input;
//   }

  export function removeCodeBlockIfPresent(input: string): string {
    console.debug("Removing code block if present:")
    console.debug("Input:", input)

    const codeBlockRegex = /^(```)?\n?.*?\n/g;
    const codeBlockRegex2 = /```/g;
    input = input.replace(codeBlockRegex, '');
    input = input.replace(codeBlockRegex2, '');
    input = input.trim();

    console.debug("Output:", input)

    return input;
  }