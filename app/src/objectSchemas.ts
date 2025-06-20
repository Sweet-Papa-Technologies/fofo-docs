import {  Embeddings, Metadata, QueryResponse } from "chromadb";

export type CodeObjectType = 'class' | 'function' | 'variable' | 'type' | 'import' | 'export' | 'interface' | 'constructor' | 'method';
export type CodeObjects = 'classes' | 'functions' | 'variables' | 'types' | 'imports' | 'exports' | 'interfaces' | 'fileName' | 'fileLocation'

export interface globResult {
    
        "glob": string[],
        "ignore": string[]
    
}

export interface llmRuntimeData {
    totalTokens: number;
    totalCharacters: number;
    totalCharactersOut: number;
    totalCharactersEmbed: number;
    totalCost: number;
    totalAPIcalls: number;

}

export interface fofoMermaidChart {
    chart_code: string;
    shortDescription: string;
    longDescription: string;
    relevantFiles: string[];
}

export interface chartPNG {
    chartData: fofoMermaidChart;
    base64PNG: string;
}

export interface runtimeData {

    appVersion: string;
    projectName: string;
    projectPath: string;
    outputPath: string;
    selectedLLModel: string | undefined;
    selectedRAGService: string;
}
export interface moduleObject {
    name: string;
    version: string;
    description: string;
}
export interface ProjectSummary {
    projectName: string;
    projectDescription: codeSummary
    projectLocation: string;
    projectTechStackDescription: string,
    projectDependencies: moduleObject[];
    codeFiles: CodeFileSummary[];
    ragData: RagData[];
    teamContext: string;
    mermaidCharts?: fofoMermaidChart[]
    chartPNGs?: chartPNG[]
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
        codeObjects: {
            [key : string]: CodeObject[]
          };
        codeChunkSummary: string;
    };
    embeddings?: number[][]; // Example: Embeddings could be an array of numbers
    documentData: any
    allSearchResults: QueryResponse | any,
    allResults: {
        documents: any,
        embeddings: Embeddings[] | null,
        metadatas: (Metadata | null)[][],
    
    }
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
    codeObjects: {
        [key : string]: CodeObject[]
    }
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

    name?: string;
    type: string;
    description: string;
    example: string;
}

export interface CodeObject extends Object {
    name: string;
    type: CodeObjectType;
    description: string;
    codeSnippet: string;
    annotation?: Annotation;
    codeLine?: number;
    codeIndent?: number;
    content?:string;
    fileName: string;
    fileLocation: string;
    subObjects?: CodeObject[];
    parentObject?: CodeObject;
    functionParameters?: FunctionParameter[];
    functionReturns?: FunctionReturn;
    isExported?: boolean;
    isFunction?: boolean;
    isClass?: boolean;
    isPrivate?: boolean;
    isAsync?: boolean;
}

export type CodeObjectTypes = 'name' | 'type' | 'description' | 'codeSnippet' | 'codeLine' | 'codeIndent' | 'fileName' | 'fileLocation' | 'subObjects' | 'parentObject' | 'functionParameters' | 'functionReturns' | 'isExported' | 'isFunction' | 'isClass' | 'isPrivate' | 'isAsync'

export interface Annotation {
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