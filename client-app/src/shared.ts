import { readFile } from 'fs/promises';


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
    return `${colors[color]}${text}${reset}`;
}

