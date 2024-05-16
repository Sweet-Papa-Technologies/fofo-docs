import { ProjectSummary } from "./objectSchemas";
import fs from 'fs';
import path from 'path';

const backupDirectory = path.join(__dirname, 'backup');
export async function generateDocumentation(projectContext: ProjectSummary, code: string, filePath: string): Promise<boolean> {

    if (!fs.existsSync(filePath)) {
        try{
            fs.mkdirSync(filePath, {
                recursive: true
            });
        } catch (err) {
            console.error(err);
            console.log("Using Backup Directory")

            if (!fs.existsSync(backupDirectory)) {
                fs.mkdirSync(backupDirectory, {
                    recursive: true
                });
            }

            if (!fs.existsSync(backupDirectory)) {
                console.error("Backup Directory does not exist. We could not make it!")
                return false
            }

            filePath = backupDirectory;
        }
    }

    // Check to make sure the filepath is writeable before proceeding
    try {
        fs.accessSync(filePath
        , fs.constants.W_OK);
    } catch (err) {
        console.error(`Cannot write to ${filePath}. Please check the path and try again.`);
        return false;
    }

    // Save projectContext to a JSON file
    const projectContextPath = path.join(filePath, 'projectContext.json');

    try {
        fs.writeFileSync(projectContextPath, JSON.stringify(projectContext, null, 4));
    } catch (err) {
        console.error(`Error writing project context to ${projectContextPath}`);
        
    }

    // parse the context file, etc.

    return true
}