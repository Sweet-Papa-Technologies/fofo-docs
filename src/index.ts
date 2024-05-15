import { Command } from "commander";
import { parseCodebase } from "./codeParser";
import { generateDocumentation } from "./documentationGenerator";

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
  .action(async (projectName, options) => {
    console.log(
      `FoFo Docs is generating documentation for project: ${projectName}`
    );

    const bTestMode = options.test;
    const projectPath = options.input;
    const outputDir = options.output;

    // 1. Parse Codebase
    try {
      const parsedCodebase = await parseCodebase(projectPath, projectName);

      // 2. Generate Documentation
      const bGenerated = await generateDocumentation(
        parsedCodebase,
        projectName,
        outputDir
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
  });

program.parse();
