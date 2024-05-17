export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'comment' | 'import' | 'export' | 'interface' | 'constructor';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'comments' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
}

export interface models {
    name: string,
    model: any,
}
export interface modelServiceConfig {
    models: models[],
    endpoint?:string 
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

export interface codeSummary {
    goal: string,
    features_functions: string,
  }
export interface CodeFileSummary {
    fileName: string;
    fileLocation: string;
    codeSummary: codeSummary;
    language: string;
    executionFlow: ExecutionFlow[];
    codeObjects: CodeObject;
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
    description: string;
    codeSnippet: string;
    codeLine: number;
    codeIndent: number;
    content?:string;
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

export type CodeObjectTypes = 'name' | 'type' | 'description' | 'codeSnippet' | 'codeLine' | 'codeIndent' | 'fileName' | 'fileLocation' | 'subObjects' | 'parentObject' | 'functionParameters' | 'functionReturns' | 'isExported' | 'isFunction' | 'isClass' | 'isPrivate' | 'isAsync'