import { Command } from "commander";
import { parseCodebase } from "./codeParser";
import { generateDocumentation } from "./documentationGenerator";
import fs from "fs";
import { appHeaderPretty, getAppVersion } from "./appData";
import { runtimeData } from "./objectSchemas";

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
    const projectPath = removeDoubleQuotesFromBegEnd(options.input);
    const outputDir = removeDoubleQuotesFromBegEnd(options.output);
    const jsonFile = removeDoubleQuotesFromBegEnd(options.generateFromFile);

    projectName=removeDoubleQuotesFromBegEnd(projectName);

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
        const bGenerated = await generateDocumentation(outputDir, null, jsonFile);
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

      // 2. Generate Documentation
      const bGenerated = await generateDocumentation(
        outputDir,
        parsedCodebase        
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
