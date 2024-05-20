import { runtimeData } from "./objectSchemas";
import { readFileSync } from "fs";
import path from "path";
import { colorize } from "./shared";

export const fofoDocsBuiltInGlobSearch = [
    // TypeScript / Node.js / JS
    "**/package.json",
    "**/**/package.json"
];

const headerColored = colorize(`
====================================================================================
$$$$$$$$\         $$$$$$\                 $$$$$$$\                                
$$  _____|       $$  __$$\                $$  __$$\                               
$$ |    $$$$$$\  $$ /  \__|$$$$$$\        $$ |  $$ | $$$$$$\   $$$$$$$\  $$$$$$$\ 
$$$$$\ $$  __$$\ $$$$\    $$  __$$\       $$ |  $$ |$$  __$$\ $$  _____|$$  _____|
$$  __|$$ /  $$ |$$  _|   $$ /  $$ |      $$ |  $$ |$$ /  $$ |$$ /      \$$$$$$\  
$$ |   $$ |  $$ |$$ |     $$ |  $$ |      $$ |  $$ |$$ |  $$ |$$ |       \____$$\ 
$$ |   \$$$$$$  |$$ |     \$$$$$$  |      $$$$$$$  |\$$$$$$  |\$$$$$$$\ $$$$$$$  |
\__|    \______/ \__|      \______/       \_______/  \______/  \_______|\_______/ 

Created By Sweet Papa Technologies, LLC
Forrester Terry | fterry@sweetpapatechnologis.com
                          
====================================================================================
`, 'green')


export const appHeaderPretty = (runtimeData:runtimeData) => `

${headerColored}

Version: ${colorize(runtimeData.appVersion, 'blue')}
Project: ${colorize(runtimeData.projectName, 'magenta')}
Path: ${colorize(runtimeData.projectPath, 'magenta')}

Selected Language Model: ${colorize(runtimeData.selectedLLModel, 'yellow')}
Selected RAG Service: ${colorize(runtimeData.selectedRAGService, 'yellow')}

Output Path: ${colorize(runtimeData.outputPath, 'green')}

====================================================================================
`

export function getAppVersion() {
    try {
        const scriptDirectory = __dirname;
        const packageJSONpath = path.join(scriptDirectory, "../package.json");
        const packageJSON = readFileSync(packageJSONpath, "utf-8");
        const packageJSONParsed = JSON.parse(packageJSON);
        return packageJSONParsed.version;
    } catch (error) {
        console.error("Error reading package.json", error);
        return "AWESOME VERSION - THE ONE INCAPABLE OF RETURNING ITS OWN VERSION";
    }
}    

