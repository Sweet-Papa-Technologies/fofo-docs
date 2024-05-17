import { Command } from "commander";
import { parseCodebase } from "./codeParser";
import { generateDocumentation } from "./documentationGenerator";
import fs from "fs";

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
    console.log(
      `FoFo Docs is generating documentation for project: ${projectName}`
    );

    const bTestMode = options.test;
    const projectPath = options.input;
    const outputDir = options.output;
    const jsonFile = options.generateFromFile;

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
