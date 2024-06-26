import { readFile } from 'fs/promises';
import fs from 'fs';
import "dotenv/config";
import "./logger";

export const API_COST_PER_CHARACTER = process.env.API_COST_PER_CHARACTER || 0.00025;
export const API_COST_PER_CHARACTER_OUT = process.env.API_COST_PER_CHARACTER_OUT || 0.00075;
export const API_COST_PER_EMBEDDING = process.env.API_COST_PER_EMBEDDING || 0.000025;

export async function getFileContentLen(filePath: string): Promise<number> {
    return await readFile(filePath, 'utf-8').then(content => content.length);
}

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

export function escapeStringForMD(string:string|undefined){
    if (typeof string != 'string'){
        return "Data Not Available"
    }

    const backtickCount = (string.match(/`/g) || []).length;
  
    // If the number of backticks is odd, it means they're not properly closed
    if (backtickCount % 2 !== 0) {
      // Escape all backticks
      return string.replace(/\`/g, '\\`')
    }

    return string;  
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
    const languages = ['javascript', 'typescript', 'python', 'java', 'c', 'c\\+\\+', 'c#', 'html', 'css', 'scss', 'less', 'json', 'yaml', 'xml', 'markdown', 'plaintext', 'shell', 'bash', 'powershell', 'dockerfile', 'sql', 'graphql', 'php', 'ruby', 'perl', 'go', 'rust', 'swift', 'kotlin', 'dart', 'r'];
  
    // Escape special characters in language names
    const escapedLanguages = languages.map(lang => lang.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  
    // Check if the input starts with a language identifier without backticks
    const languageStartRegex = new RegExp(`^(${escapedLanguages.join('|')})\\s*[\n\r]`, 'i');
    const match = input.match(languageStartRegex);
    
    if (match) {
      const lang = match[1].toLowerCase();
      input = `\`\`\`${lang}\n${input.slice(match[0].length)}`;
    }
  
    // Add closing backticks if missing
    if (input.startsWith('```') && !input.trim().endsWith('```')) {
      input = input.trimEnd() + '\n```';
    }
  
    // Fix language specifier on newline
    const incorrectFormatRegex = new RegExp(`\`\`\`\\s*[\\n\\r]+(${escapedLanguages.join('|')})\\s*[\\n\\r]+`, 'gi');
    input = input.replace(incorrectFormatRegex, (match, lang) => `\`\`\`${lang.toLowerCase()}\n`);
  
    // IF closing backticks are not by themselves on a line, move them to a new line
    input = input.replace(/```/g, '\n```');

    // Remove extra newlines after opening backticks and before closing backticks
    input = input.replace(/```(\w+)\s*[\n\r]+/g, '```$1\n');
    input = input.replace(/[\n\r]+```/g, '\n```');


  
    return input;
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