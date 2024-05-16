export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'comment' | 'import' | 'export' | 'interface' | 'constructor';

export interface ProjectSummary {
    projectName: string;
    projectDescription: string;
    projectLocation: string;
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}

export interface RagData {
    metadata: {
        filename: string;
        codeChunkId: string|number;
        codeChunkLineStart: number;
        codeChunkLineEnd: number;
        codeObjects: CodeObject;
        codeChunkSummary: string;
    };
    embeddings?: number[][]; // Example: Embeddings could be an array of numbers
    documentData: any
}

export interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: string;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject[];
}

export interface ExecutionFlow {
    step: number;
    stepDescription: string;
    bImportant: boolean;
    codeSnippet: string;
    codeLine: number;
    codeIndent: number;
    fileName: string;
    fileLocation: string;
}

export interface FunctionParameter {
    name: string;
    type: string;
    description: string;
    example: string;
}

export interface FunctionReturn {
    type: string;
    description: string;
    example: string;
}

export interface CodeObject {
    name: string;
    type: CodeObjectType;
    objectDescription: string;
    codeSnippet: string;
    codeLine: number;
    codeIndent: number;
    fileName: string;
    fileLocation: string;
    subObjects: CodeObject[];
    parentObject?: CodeObject;
    functionParameters?: FunctionParameter[];
    functionReturns?: FunctionReturn;
    isExported: boolean;
    isFunction: boolean;
    isClass: boolean;
    isPrivate: boolean;
    isAsync: boolean;
}
