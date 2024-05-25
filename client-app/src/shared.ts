import { readFile } from 'fs/promises';
import fs from 'fs';
import "dotenv/config";

export async function getFileContentLen(filePath: string): Promise<number> {
    return await readFile(filePath, 'utf-8').then(content => content.length);
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
    return `
    ${colors[color]}
    ${text}
    ${reset}`.trim()
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

export function getContextFromFile() {
    const contextFile = process.env.CONTEXT_FILE === '' || !process.env.CONTEXT_FILE ? "./prompts/teamContext.md" : (process.env.CONTEXT_FILE || "./prompts/teamContext.md");
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