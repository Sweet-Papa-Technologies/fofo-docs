import { Command } from "commander";
import { parseCodebase } from "./codeParser";
import { generateDocumentation } from "./documentationGenerator";
import fs from "fs";
import { appHeaderPretty, getAppVersion } from "./appData";
import { ProjectSummary, runtimeData } from "./objectSchemas";
import { makeOSpathFriendly } from "./shared";
import { annotateProject } from "./annotations";

const program = new Command();

program
  .name("fofodocs")
  .description("Generate documentation for your codebase using FoFo Docs")
  .version("1.0.0")
  .argument("<project_name>", "Name of your project")
  .option(
    "-i, --input <path>",
    "Path to your codebase (default: current directory)",
    "."
  )
  .option(
    "-o, --output <path>",
    "Path to output documentation (default: ./output)",
    "./output"
  )
  .option("-t, --test <bool>", "Run in Test Mode", "false")
  .option("-g, --generateFromFile <path>", "Generate MD documentation from JSON file")
  .option("-a, --annotate <bool>", "Annotate code objects", "true")
  .action(async (projectName, options) => {


    const removeDoubleQuotesFromBegEnd = (str: string) => {
      if (!str) {
        return str;
      }
      if (str.startsWith('"') || str.startsWith("'") || str.startsWith("”") || str.startsWith("“") || str.startsWith("‘") || str.startsWith("’")){
        str = str.slice(1);
      }
      if (str.endsWith('"') || str.endsWith("'") || str.endsWith("”") || str.endsWith("“") || str.endsWith("‘") || str.endsWith("’")){
        str = str.slice(0, -1);
      }
      return str;
    }

    const bTestMode = removeDoubleQuotesFromBegEnd(options.test);
    const bAnnotate = removeDoubleQuotesFromBegEnd(options.annotate);
    let projectPath = removeDoubleQuotesFromBegEnd(options.input);
    const outputDir = removeDoubleQuotesFromBegEnd(options.output);
    const jsonFile = removeDoubleQuotesFromBegEnd(options.generateFromFile);

    if (jsonFile) {
      projectPath = jsonFile
    }

    projectName=removeDoubleQuotesFromBegEnd(projectName);
    projectName=makeOSpathFriendly(projectName);

    const appVersion = getAppVersion()

    const runtimeData:runtimeData = {
      appVersion: appVersion,
      projectName: projectName,
      projectPath: projectPath,
      outputPath: outputDir,
      selectedLLModel:process.env['LLM_TO_USE'] || "default",
      selectedRAGService: process.env['EMBEDDER_MODE'] || "default"
    }

    const prettyHeader = appHeaderPretty(runtimeData)

    console.log(prettyHeader + "\n\n");

    console.log(
      `FoFo Docs is generating documentation for project: ${projectName}`
    );

    const runAnnotations = async (projectSummary?:ProjectSummary) => {
      if (bAnnotate && bAnnotate !== "false") {
        console.log("Annotating code objects...");
        // Annotate code objects
        let jsonData: ProjectSummary;
        if (jsonFile) {
          jsonData = JSON.parse(fs.readFileSync(jsonFile, "utf-8")) as ProjectSummary;
        } else {
          if (!projectSummary) {
            console.error("Project summary not found!");
            return projectSummary;
          }
          jsonData = projectSummary;
        }

        try {
          projectSummary = await annotateProject(jsonData, outputDir);

          if (jsonFile) {
            fs.writeFileSync(jsonFile, JSON.stringify(projectSummary, null, 4));
          }


 
        } catch (error) {
          console.error("Error during annotation:", error);
        }
        console.log("Annotation complete!");
      }
      return projectSummary;

    }

    // Generate documentation from JSON file ONLY if flag is set
    if (jsonFile) {
      console.log("Generating documentation from JSON file:", jsonFile);

      // Check if JSON file exists
      if (!fs.existsSync(jsonFile)) {
        console.error("JSON file does not exist!");
        return;
      }

      // Check if output directory exists, if not create it
      if (!fs.existsSync(outputDir)) {
        try {
          fs.mkdirSync(outputDir, {
            recursive: true,
          });
        } catch (err) {
          console.error(err);
          throw new Error("Error creating output directory");
        }
      }


      // Generate documentation
      try {
        const projSummary = await runAnnotations()

        const bGenerated = await generateDocumentation(outputDir, projSummary, jsonFile);
        if (!bGenerated) {
          console.error("Documentation generation failed!");
          return;
        }
      } catch (error) {
        console.error("Error during documentation generation:", error);
        if (!bTestMode) {
          process.exit(1);
        }
        return;
      }
      console.log("Documentation generation complete!");
      return;
    }

    // 1. Parse Codebase
    const startTime = Date.now();
    try {
      const parsedCodebase = await parseCodebase(projectPath, projectName);
      parsedCodebase.projectName = projectName;

      let projectSummary:any = null
      if (bAnnotate) {
       projectSummary = await runAnnotations(parsedCodebase)
      }

      // 2. Generate Documentation
      const bGenerated = await generateDocumentation(
        outputDir,
        projectSummary || parsedCodebase        
      );

      if (!bGenerated) {
        console.error("Documentation generation failed!");
        return;
      }
    } catch (error) {
      console.error("Error during documentation generation:", error);
      if (!bTestMode) {
        process.exit(1);
      }
      return;
    }

    console.log("Documentation generation complete!");
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    console.log(`Total Time: ${totalTime / 1000}s`);
    
  });

program.parse();
