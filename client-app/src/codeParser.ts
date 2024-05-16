import { glob } from 'glob';
import { readFile, stat } from 'fs/promises';
import { CodeFileSummary, ProjectSummary, CodeObject, RagData } from './objectSchemas';
import { callGemini, callLLM, getCodeSummaryFromLLM,  } from './llmInterface';
import { getLanguageTypeFromFile, promptTemplate } from './prompt';
import { saveToVectorDatabase } from './vectorDB';
import { getFileContentLen } from './shared';

export async function parseCodebase(
    projectPath: string,
    projectName: string,
   
): Promise<ProjectSummary> {
    const projectSummary: ProjectSummary = {
        projectName: projectName,
        projectDescription: '', 
        projectLocation: projectPath,
        codeFiles: [],
        ragData: [], 
        teamContext: '', // Placeholder, TODO==> Add support for team context
    };   

    const ignorePatterns = ['node_modules/**', 'dist/**', ...(await getIgnoredFiles(projectPath))];
    const filePaths = await glob('**/*.{ts,js,tsx,jsx}', { cwd: projectPath, ignore: ignorePatterns }); // TODO=> Add support for way more files
    
    for (const filePath of filePaths) {
        console.log(`Parsing file: ${filePath}`);
        const fullFilePath = `${projectPath}/${filePath}`;
        const fileLanguage = await callGemini(getLanguageTypeFromFile(fullFilePath), 'TEXT STRING', 'language')
        console.log('fileLanguage', fileLanguage.language)
        const codeFileSummary: CodeFileSummary = {
            fileName: filePath,
            fileLocation: fullFilePath,
            codeSummary: '', // Placeholder, will be updated later
            language: fileLanguage.language || 'Unknown',
            executionFlow: [], // Placeholder, will be updated later
            codeObjects: [], // Placeholder, will be updated later
        };
        let currentLine = 0
        if (await isFileTooLarge(fullFilePath, 750)) { // 750KB is the default limit
            // Handle large files by breaking into chunks and processing separately
            const fileContent = await readFile(fullFilePath, 'utf-8');
            const codeChunks = breakCodeIntoChunks(fileContent, 300); // 1000 tokens per chunk
            const getCurrentLineEndLineBasedOnChunk = (chunk: string) => {
                const lines = chunk.split('\n')
                return {
                    start: currentLine,
                    end: currentLine + lines.length
                }
            }
            console.log('Code broken into codeChunks length =', codeChunks.length)
            for (const [index, chunk] of codeChunks.entries()) {

                console.log('Processing chunk:', index+1, 'of ', codeChunks.length, ' chunks for file ', filePath)
                const endLine = getCurrentLineEndLineBasedOnChunk(chunk).end

                // Process each chunk's code objects (update projectSummary.ragData, etc.)
                const chunkCodeObjects = await callLLM(promptTemplate, projectSummary, chunk, filePath);

                const ragData:RagData = {
                    metadata: {
                        filename: fullFilePath,
                        codeChunkId: index,
                        codeChunkLineStart: currentLine,
                        codeChunkLineEnd: endLine,
                        codeObjects: chunkCodeObjects,
                        codeChunkSummary: chunkCodeObjects.objectDescription
                    },
                    documentData: chunk
                } 

                projectSummary.ragData.push(ragData);

                codeFileSummary.codeObjects.push(chunkCodeObjects);
                codeFileSummary.codeSummary = await getCodeSummaryFromLLM(chunk);
                

                await saveToVectorDatabase(projectName, chunk, ragData);

                currentLine = endLine

            }

        } else {
            const fileContent = await readFile(fullFilePath, 'utf-8');
            const codeObjects = await callLLM(promptTemplate, projectSummary, fileContent, filePath);
            // Process code objects and update projectSummary and codeFiles

            // Process each chunk's code objects (update projectSummary.ragData, etc.)
            const ragData:RagData = {
            metadata: {
                filename: fullFilePath,
                codeChunkId: 0,
                codeChunkLineStart: 0,
                codeChunkLineEnd: 0,
                codeObjects: {} as any,
                codeChunkSummary: codeObjects.objectDescription 
            },
            documentData: fileContent
        } 

            await saveToVectorDatabase(projectName, fileContent, ragData);

            codeFileSummary.codeObjects.push(codeObjects);
            codeFileSummary.codeSummary = await getCodeSummaryFromLLM(fileContent);

        }

        // WE need to define the overall execution flow here, with another LLM call?
        const codeDescription = codeFileSummary.codeObjects.map((codeObject) => codeObject.objectDescription).join('\n');
        codeFileSummary.codeSummary = await getCodeSummaryFromLLM("Summaries of Code Chunks: \n" + codeDescription);
        projectSummary.codeFiles.push(codeFileSummary);
    }


    return projectSummary;
}

// Helper Functions Implementation:
async function getIgnoredFiles(projectPath: string): Promise<string[]> {
    let ignorePatterns: string[] = [];
    console.log('projectPath', projectPath)
    try {
        const gitignoreContent = await readFile(`${projectPath}/.gitignore`, 'utf-8');
        ignorePatterns.push(...gitignoreContent.split('\n').filter(Boolean)); // Filter out empty lines
    } catch (err) {
        // .gitignore not found, ignore the error
        console.warn('No .gitignore file found');
    }
    try {
        const fofoignoreContent = await readFile(`${projectPath}/.fofoignore`, 'utf-8');
        ignorePatterns.push(...fofoignoreContent.split('\n').filter(Boolean));

    } catch (err) {
        // .fofoignore not found, ignore the error
        console.warn('No .fofoignore file found');
    }
    return ignorePatterns;
}

async function getFileSizeInKB(filePath: string): Promise<number> {
    return await stat(filePath).then(stats => stats.size / 1024);
}

async function isFileTooLarge(filePath: string, maxFileSizeKB: number, maxChars:number=300): Promise<boolean> {
    // Check the amount of characters in the file content
    const tooLong = await getFileContentLen(filePath) > maxChars;

    if (tooLong) return true;

    return await getFileSizeInKB(filePath).then(size => size > maxFileSizeKB);
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