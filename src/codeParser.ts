import { glob } from 'glob';
import { readFile, stat } from 'fs/promises';
import { CodeFileSummary, ProjectSummary, CodeObject } from './objectSchemas';
import { callLLM } from './llmInterface';
import { promptTemplate } from './prompt';
import { connectToVectorDatabase } from './vectorDB';



export async function parseCodebase(
    projectPath: string,
    projectName: string,
   
): Promise<ProjectSummary> {
    const codeFiles: CodeFileSummary[] = [];
    const projectSummary: ProjectSummary = {
        projectName: projectName,
        projectDescription: '', // Placeholder, will be updated later
        projectLocation: projectPath,
        codeFiles: codeFiles,
        ragData: [], // Placeholder, will be updated during parsing
        teamContext: '', // Placeholder, could be fetched from external sources
    };

    return {} as ProjectSummary;
    

    const ignorePatterns = ['node_modules/**', 'dist/**', ...(await getIgnoredFiles(projectPath))];
    const filePaths = await glob('**/*.{ts,js,tsx,jsx}', { cwd: projectPath, ignore: ignorePatterns });
    
    for (const filePath of filePaths) {
        const fullFilePath = `${projectPath}/${filePath}`;
        if (await isFileTooLarge(fullFilePath, 750)) { // 750KB is the default limit
            // Handle large files by breaking into chunks and processing separately
            const fileContent = await readFile(fullFilePath, 'utf-8');
            const codeChunks = breakCodeIntoChunks(fileContent, 1000); // 1000 tokens per chunk
            for (const [index, chunk] of codeChunks.entries()) {
                const chunkCodeObjects = await callLLM(promptTemplate, projectSummary, chunk, filePath);
                // Process each chunk's code objects (update projectSummary.ragData, etc.)

            }
        } else {
            const fileContent = await readFile(fullFilePath, 'utf-8');
            const codeObjects = await callLLM(promptTemplate, projectSummary, fileContent, filePath);
            // Process code objects and update projectSummary and codeFiles
        }
    }

    return projectSummary;
}

// Helper Functions Implementation:

async function getIgnoredFiles(projectPath: string): Promise<string[]> {
    let ignorePatterns: string[] = [];
    try {
        const gitignoreContent = await readFile(`${projectPath}/.gitignore`, 'utf-8');
        ignorePatterns.push(...gitignoreContent.split('\n').filter(Boolean)); // Filter out empty lines
    } catch (err) {
        // .gitignore not found, ignore the error
    }
    try {
        const fofoignoreContent = await readFile(`${projectPath}/.fofoignore`, 'utf-8');
        ignorePatterns.push(...fofoignoreContent.split('\n').filter(Boolean));
    } catch (err) {
        // .fofoignore not found, ignore the error
    }
    return ignorePatterns;
}

async function getFileSizeInKB(filePath: string): Promise<number> {
    return await stat(filePath).then(stats => stats.size / 1024);
}

async function isFileTooLarge(filePath: string, maxFileSizeKB: number, maxChars:number=1000): Promise<boolean> {
    // Check the amount of characters in the file content
    const tooLong = await getFileContentLen(filePath) > maxChars;

    if (tooLong) return true;

    return await getFileSizeInKB(filePath).then(size => size > maxFileSizeKB);
}

async function getFileContentLen(filePath: string): Promise<number> {
    return await readFile(filePath, 'utf-8').then(content => content.length);
}

function breakCodeIntoChunks(code: string, chunkSize: number): string[] {
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


function extractRelevantCode(codeObject: CodeObject, linesOfContext: number = 5): string {
    // ...Implementation to extract code snippet with context
    // You will need the original file content and codeObject.codeLine to achieve this
    const relevantCode = ""

    return relevantCode
}