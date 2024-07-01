import { Command } from "commander";
import { parseCodebase } from "./codeParser";
import { generateDocumentation } from "./documentationGenerator";
import fs from "fs";
import path from "path";
import { appHeaderPretty, getAppVersion } from "./appData";
import { ProjectSummary, runtimeData } from "./objectSchemas";
import { API_COST_PER_CHARACTER, API_COST_PER_CHARACTER_OUT, API_COST_PER_EMBEDDING, colorize, getContextFromFile, makeOSpathFriendly } from "./shared";
import { annotateProject } from "./annotations";
import "./logger";

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

    projectName=removeDoubleQuotesFromBegEnd(projectName);
    projectName=makeOSpathFriendly(projectName);
    projectName = projectName.replace(/\s/g, "_");
    projectName = projectName.replace(/\//g, "_");
    projectName = projectName.replace(/\\/g, "_");

    const bTestMode = removeDoubleQuotesFromBegEnd(options.test);
    const bAnnotate = removeDoubleQuotesFromBegEnd(options.annotate);
    let projectPath = removeDoubleQuotesFromBegEnd(options.input);
    const timeStampDirectoryFriendly = new Date().toISOString().replace(/:/g, "-");
    const outputDir = path.join(removeDoubleQuotesFromBegEnd(options.output), projectName, timeStampDirectoryFriendly);
    const jsonFile = removeDoubleQuotesFromBegEnd(options.generateFromFile);

    if (jsonFile) {
      projectPath = jsonFile
    }



    const appVersion = getAppVersion()

    const runtimeData:runtimeData = {
      appVersion: appVersion,
      projectName: projectName,
      projectPath: projectPath,
      outputPath: outputDir,
      selectedLLModel:process.env['LLM_TO_USE'],
      selectedRAGService: process.env['EMBEDDER_MODE'] || "OFF"
    }

    const prettyHeader = appHeaderPretty(runtimeData)

    console.log(prettyHeader + "\n\n");

    if (runtimeData.selectedLLModel == undefined || runtimeData.selectedLLModel == ''){
      console.error("Environment variables not set correctly. Please check your .env file ==> LLM_TO_USE")
      process.exit(1)
    }

    console.log(
      `FoFo Docs is generating documentation for project: ${projectName}`
    );

    const runAnnotations = async (projectSummary?:ProjectSummary) => {
      if (bAnnotate && bAnnotate !== "false") {
        console.log("Annotating code objects...");
        // Annotate code objects
        let jsonData: ProjectSummary;
        if (projectSummary) {
          jsonData = projectSummary;
        } else if
        (jsonFile) {
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
      parsedCodebase.teamContext = getContextFromFile();

      let projectSummary:any = null

      if (bAnnotate) {
       projectSummary = await runAnnotations(parsedCodebase)
      }

      // 2. Generate Documentation
      const bGenerated = await generateDocumentation(
        outputDir,
        parsedCodebase || projectSummary       
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

    const llmRuntimeDataResult = (await import("./llmInterface")).AIusageData;

    if (llmRuntimeDataResult){
      console.log("LLM Runtime Data:\n", JSON.stringify(llmRuntimeDataResult))
    }

    console.log(colorize(`API Call Stats \n ${"Total API Calls" + llmRuntimeDataResult.totalAPIcalls}`, "blue"));

    const dataTotals=
    "Total Chars In: " + llmRuntimeDataResult.totalCharacters + "\n" +
    "Total Chars Out: " + llmRuntimeDataResult.totalCharactersOut + "\n" +
    "Total Chars Embed: " + llmRuntimeDataResult.totalCharactersEmbed + "\n" +
    "Total Tokens" + llmRuntimeDataResult.totalTokens
    console.log(colorize(`Char/Token Stats:\n ${dataTotals}`, "blue"));

    const costInfo = 
    "Cost per Character In: " + API_COST_PER_CHARACTER + "\n" +
    "Cost per Character Out: " + API_COST_PER_CHARACTER_OUT + "\n" +
    "Cost per Character Embed: " + API_COST_PER_EMBEDDING
    console.log(colorize(`Cost Info \n ${costInfo}`, "blue"));

    console.log("====================================")

    console.log(colorize("Estimated Total Cost (w/ Caching Savings Applied): $" + llmRuntimeDataResult.totalCost + " USD", 'magenta'));
    console.log(`Total Time: ${totalTime / 1000}s\n\n`);

    console.log(colorize(`Documentation generated at: ${outputDir}`, "green"));
    
  });

// Run program if being ran standalone from CLI
program.parse();
