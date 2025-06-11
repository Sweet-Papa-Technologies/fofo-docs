import { ProjectSummary, fofoMermaidChart, chartPNG } from "./objectSchemas";
import { infer } from "./llmInterface";
let iRetryCounter = 0;
import puppeteer from 'puppeteer';


function cleanUpChartData(chart: fofoMermaidChart) {
  // General initial cleanup
  chart.chart_code = chart.chart_code.trim();
  // Remove markdown fences for mermaid code blocks
  chart.chart_code = chart.chart_code.replace(/^```mermaid\s*/i, '');
  chart.chart_code = chart.chart_code.replace(/\s*```$/, '');
  // Remove any remaining triple backticks
  chart.chart_code = chart.chart_code.replace(/```/g, '');
  // Ensure diagram type declaration (e.g., graph TD, sequenceDiagram) is on its own line
  chart.chart_code = chart.chart_code.replace(/^(graph\s+[LTRBTD]+|flowchart\s+[LTRBTD]+|sequenceDiagram|classDiagram|stateDiagram-v2|erDiagram|journey|gantt)\s*(.+)$/gm, '$1\n$2');
  // Remove leading/trailing whitespace from each line
  chart.chart_code = chart.chart_code.split('\n').map(line => line.trim()).join('\n');
  // Remove multiple consecutive blank lines
  chart.chart_code = chart.chart_code.replace(/\n{3,}/g, '\n\n');

  const lines = chart.chart_code.split('\n');
  const cleanedLines: string[] = [];
  let diagramType = "";

  if (lines.length > 0) {
    const firstLineTrimmed = lines[0].trim();
    if (firstLineTrimmed.startsWith("graph") || firstLineTrimmed.startsWith("flowchart")) {
      diagramType = "graph"; // Catches graph TD, flowchart LR etc.
    } else if (firstLineTrimmed.startsWith("sequenceDiagram")) {
      diagramType = "sequenceDiagram";
    } else if (firstLineTrimmed.startsWith("classDiagram")) {
      diagramType = "classDiagram";
    } else if (firstLineTrimmed.startsWith("stateDiagram-v2")) {
      diagramType = "stateDiagram";
    } else if (firstLineTrimmed.startsWith("erDiagram")) {
      diagramType = "erDiagram";
    } else if (firstLineTrimmed.startsWith("journey")) {
      diagramType = "journey";
    }
    // Add more types as needed
  }

  // Fix common class diagram syntax issues
  if (diagramType === 'classDiagram') {
    let inClassDefinition = false;
    // First ensure the classDiagram declaration is on its own line
    if (!lines[0].trim().match(/^classDiagram$/i)) {
        cleanedLines.push('classDiagram');
    }

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      if (line.trim().match(/^classDiagram$/i) && cleanedLines.length > 0) continue; // Already added or it's the first line

      // Check if entering a class definition block
      const classMatch = line.match(/(\s*)class\s+(\w+)\s*\{/);
      if (classMatch) {
        inClassDefinition = true;
        cleanedLines.push(line);
        continue;
      }
      
      // Check if exiting a class definition block
      if (inClassDefinition && line.includes('}')) {
        inClassDefinition = false;
        cleanedLines.push(line);
        continue;
      }
      
      // Inside class definition, check for properties without type declarations
      if (inClassDefinition) {
        // Ensure properties are indented and correctly formatted
        // Matches lines like "property" or "+ property" or "String property"
        const propertyMatch = line.match(/^(\s*)([+-]?\s*\w+)(\s*)$/);
        const propertyWithTypeMatch = line.match(/^(\s*)([+-]?\s*\w+\s+\w+)(\s*)$/); // e.g. String name
        const methodMatch = line.match(/^(\s*)([+-]?\s*\w+\(.*\))(\s*)$/); // e.g. +method()

        if (propertyMatch && !propertyWithTypeMatch && !methodMatch && !line.includes(':')) {
          // Add default type "string" if missing and it's not a method
          cleanedLines.push(`${propertyMatch[1]}${propertyMatch[2]}: string`);
        } else {
          cleanedLines.push(line);
        }
      } else {
         // Relationship fixes
        line = line.replace(/--\|>\s+([^:]+)\s+:\s+has a/g, '--* $1 : has a'); // Aggregation
        line = line.replace(/--o\s+([^:]+)\s+:\s+has a/g, '--o $1 : has a'); // Composition
        line = line.replace(/--\|>\s+([^:]+)\s+:\s+uses/g, '--> $1 : uses'); // Association
        line = line.replace(/<\|--\s+([^:]+)\s+:\s+is a/g, '<|-- $1 : is a'); // Inheritance
        cleanedLines.push(line);
      }
    }
    chart.chart_code = cleanedLines.join('\n');
  }
  // Fix common flowchart/graph syntax issues
  else if (diagramType === 'graph') {
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      // Ensure graph/flowchart declaration is present and on its own line
      if (i === 0 && !line.match(/^(graph|flowchart)\s+(TD|LR|TB|RL|BT)/i)) {
        cleanedLines.push('graph TD'); // Default to graph TD
        if (line.trim() !== "") cleanedLines.push(line); // Add original line if it wasn't the declaration
      } else if (i===0 && line.match(/^(graph|flowchart)\s+(TD|LR|TB|RL|BT)/i)) {
         cleanedLines.push(line); // It's a valid declaration
      }
      else {
        // Remove empty definitions like `id[]` or `id{}`
        line = line.replace(/(\w+)\s*\[\s*\]/g, '$1');
        line = line.replace(/(\w+)\s*\{\s*\}/g, '$1');
        // Ensure valid node definitions: id["text"] or id("text") or id>"text"]
        line = line.replace(/(\w+)\s*\[\s*([^"'\n\]]*)\s*\]/g, (match, id, text) => {
          if (text.trim() === "") return id; // Handle empty brackets
          return `${id}["${text.replace(/"/g, '#quot;')}"]`;
        });
         line = line.replace(/(\w+)\s*\(\s*([^"'\n)]*)\s*\)/g, (match, id, text) => {
          if (text.trim() === "") return `${id}()`;
          return `${id}("${text.replace(/"/g, '#quot;')}")`;
        });
        line = line.replace(/(\w+)\s*>\s*([^"'\n\]]*)\s*\]/g, (match, id, text) => {
          if (text.trim() === "") return `${id}>]`;
          return `${id}>"${text.replace(/"/g, '#quot;')}"]`;
        });


        // Fix broken links (e.g. "A -- > B" to "A --> B")
        line = line.replace(/(--)\s+(>)/g, '$1$2');
        line = line.replace(/(-)\s+(-)/g, '$1$2');
        line = line.replace(/(<)\s+(--)/g, '$1$2');
        // Ensure text on links is correctly quoted if it contains special characters or spaces
        // e.g. A -- text --> B  to A -- "text" --> B
        line = line.replace(/(--(?:>|x|o)?)\s*([^-\s>][^-=>]+?[^-\s>])\s*(--(?:>|x|o)?)/g, (match, startArrow, text, endArrow) => {
            if (text.startsWith('"') && text.endsWith('"')) return match; // Already quoted
            if (text.startsWith("'") && text.endsWith("'")) return match; // Already quoted
            if (text.match(/^[a-zA-Z0-9_]+$/)) return match; // Simple text, no quotes needed
            return `${startArrow} "${text.replace(/"/g, '#quot;')}" ${endArrow}`;
        });
        line = line.replace(/(-->)\s*([^-\s>][^-=>]+?[^-\s>])\s*$/g, (match, startArrow, text) => {
             if (text.startsWith('"') && text.endsWith('"')) return match; // Already quoted
             if (text.startsWith("'") && text.endsWith("'")) return match; // Already quoted
             if (text.match(/^[a-zA-Z0-9_]+$/)) return match; // Simple text, no quotes needed
            return `${startArrow} "${text.replace(/"/g, '#quot;')}"`;
        });


        cleanedLines.push(line);
      }
    }
    chart.chart_code = cleanedLines.join('\n');
  }
  // Sequence Diagram specific cleanups
  else if (diagramType === 'sequenceDiagram') {
     if (!lines[0].trim().match(/^sequenceDiagram$/i)) {
        cleanedLines.push('sequenceDiagram');
    }
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (line.trim().match(/^sequenceDiagram$/i) && cleanedLines.length > 0) continue;

      // Ensure participant declarations are correct
      line = line.replace(/^participant\s+(.+)\s+as\s+(.+)/i, 'participant $2 as $1'); // Common mistake: "participant Long Name as LN" instead of "participant LN as Long Name"
      line = line.replace(/^actor\s+(.+)\s+as\s+(.+)/i, 'actor $2 as $1');

      // Ensure messages have valid arrow types and participant names are not quoted unless they contain spaces
      // e.g. "Alice"->>"Bob": Hello should be Alice->>Bob: Hello
      line = line.replace(/^"?([\w\s]+)"?\s*(-->>|->>|-->>|->|-x|--x)\s*"?([\w\s]+)"?\s*:\s*(.+)$/, (match, p1, arrow, p2, msg) => {
        const cleanP1 = p1.includes(" ") ? `"${p1}"` : p1;
        const cleanP2 = p2.includes(" ") ? `"${p2}"` : p2;
        return `${cleanP1}${arrow}${cleanP2}: ${msg}`;
      });

      // Remove extra spaces around colons for messages
      line = line.replace(/\s*:\s*/, ': ');
      cleanedLines.push(line);
    }
    chart.chart_code = cleanedLines.join('\n');
  }
  // For other diagram types or if type is not identified, just use the initial cleaned lines
  else {
    chart.chart_code = lines.join('\n');
  }
  
  // Final pass: remove multiple consecutive blank lines again and ensure no leading/trailing newlines on the whole code
  chart.chart_code = chart.chart_code.replace(/\n{2,}/g, '\n').trim();

  return chart;
}


async function breakCodeIntoChunks(code: string, maxChunkSize: number, projectSummary: ProjectSummary): Promise<string[]> {
    const chunks: string[] = [];
    const numberOfChunks = Math.ceil(code.length / maxChunkSize);
    let currentChunk = 0;

    for (let i = 0; i < numberOfChunks; i++) {


        const chunk = code.slice(currentChunk, currentChunk + maxChunkSize);
        chunks[currentChunk] = chunk;
        currentChunk += maxChunkSize;

        
        // Let us have the A.I. now analyze the chunk of code and essentially summarize what is happening in that chunk of code.
        // We will need the A.I. to keep in mind the context of the entire codebase when generating the summary as we go along,
        // So we will pass the relevant files and the code chunk to the A.I. each time we process a chunk of code.
        // The goal is to get the A.I. to essentially "summarize" what is happening, sequentially, in the context of the entire codebase.
        // And define important logic points that look good in a flow chart of sorts.

        const prompt = `
        You are a helpful assistant that analyzes code and provides summaries and insights to help with documentation (specifically generating charts relevant to Software Development).
        
        I will be passing you chunks of code from a larger codebase. You will be analyzing the code and providing a summary of what is happening in the code, and relevant files.

        ## Here is a paragraph summary of the overall code you are reviewing: 
        ${projectSummary.projectDescription.goal}
        
        ## Here is are some paragraph summaries of code you have already analyzed thus far: 
        ${chunks.length > 0 ? chunks.map(chunk => chunk).join('\n') : 'N/A - This will be the first chunk.'}

        ## Here is the chunk of code you are analyzing now:
        ${chunk}
        
        ## Instructions:
        Please only respond with a summary of what is happening in the code, and relevant files.
        Again, focus on what is happening, and what the code is doing, and not what the code looks like. We need helpful summaries for building out various charts (flow, UML, etc).

        `
        const summary = await infer(prompt, 'TEXT STRING') as string;

        chunks.push(summary);
    }
    return chunks;
}

async function askAItoHelpFixError(charts: fofoMermaidChart[], error: any) {
  
  if (typeof error !== 'string') {
    error = error.message;
  }

  for (let i = 0; i < charts.length; i++) {
    let chart = charts[i];
    const prompt = `
    I have this MermaidJS code that I am trying to render, but I am getting this error: 
    "${error}"

    Please help me fix this code, so that I can render it using MermaidJS.

    Reply ONLY with the fixed code, and nothing else. Be sure to use proper formatting and escaping to meet MermaidJS requirements.

    (NOTE, this error MAY not be related to the code provided below, so please only use the error message as something to look out for)
    
    Code to Be Fixed: 
    ${chart.chart_code}
    `
  const fixedCode = await infer(prompt, 'TEXT STRING') as {
    response: string
  };

  console.info("Fixed Code:", fixedCode);
  chart.chart_code = fixedCode.response;
  chart = cleanUpChartData(chart)

  charts[i] = chart;
  }

  return charts;


}

export async function generateMermaidCharts(projectSummary: ProjectSummary) {
    const charts: fofoMermaidChart[] = [];
    const exampleChart: fofoMermaidChart = {
        shortDescription: "Example Chart",
        longDescription: "This is an example chart. It does...",
        relevantFiles: ["src/file1.ts", "src/file2.ts"],
        chart_code: `
        graph TD
            A-->B
            B-->C
            C-->D
        `
    };

    // We will go ahead and have the A.I. Analyze the entire project and generate some mermaid charts

    // First, let us see if we will be able to send the entire project to the A.I. to generate mermaid charts:
    let CODEBASE_JSON_STRING = JSON.stringify(projectSummary.codeFiles.map(file => file).flat(), null, 2);

    console.log("Codebase JSON String length =", CODEBASE_JSON_STRING.length);
    console.log("SELECTED MODEL=", process.env.LLM_TO_USE);

    const modelMaxTokenInput = (()=>{
        let maxTokenInput = 0;
        if (process.env.LLM_TO_USE?.includes("gpt") === true) {
            maxTokenInput = 30000; // OpenAI models tend to have a higher token limit, around 30k
        } else if (process.env.LLM_TO_USE?.includes("gemini") === true) {
            maxTokenInput = 989999; // Gemini models tend to have a really high input token limit, around 1M
        } else if (process.env.LLM_TO_USE?.includes("claude") === true) {
            maxTokenInput = 25000; // Anthropic models tend to have a higher token limit, around 30k
        } else if (process.env.LLM_TO_USE?.includes("llama3") === true || process.env.LLM_TO_USE?.includes("llama-3") === true) {
            maxTokenInput = 25000; // Llama models tend to have a higher token limit, around 30k
        } else if (process.env.CHART_CHUNK_SIZE){
            maxTokenInput = Number(process.env.CHART_CHUNK_SIZE || "7500"); // User can specify a custom chunk size
        } else {
            maxTokenInput = 7500;
        }

        return maxTokenInput * 3 // Assuming ~3 chars per token
    })();

    const bWeNeedToSplit = CODEBASE_JSON_STRING.length > modelMaxTokenInput;

    if (bWeNeedToSplit === true) {
        // We need to split the codebase into chunks
        console.log(modelMaxTokenInput)
        const codeChunks = await breakCodeIntoChunks(CODEBASE_JSON_STRING, modelMaxTokenInput - 500, projectSummary); // 1000 tokens per chunk
        console.log("Code broken into codeChunks length =", codeChunks.length);
        let condensedSummaryOfCodebase = ''
        for (const chunk of codeChunks) {
            condensedSummaryOfCodebase += chunk + "\n";
        }
        // console.log("Condensed Summary of Codebase:", condensedSummaryOfCodebase);
        CODEBASE_JSON_STRING = JSON.stringify({codebaseSummary: condensedSummaryOfCodebase}, null, 2); // We will use this for the prompt later, to avoid having to re-process the codebasecondensedSummaryOfCodebase
    } else {
        console.log("Codebase is small enough to process in one go");
    }

    // Now we do le prompt:
    const prompt = `
    ## Instructions:
    Please analyze the following codebase (summarized as a JSON object detailing the structure and complexity of the codebase) and generate Mermaid charts.

    Focus on creating diagrams that illustrate:
    - **Control flow:** Show the sequence of operations and decisions within the code.
    - **Data flow:** Depict how data moves through the system and is transformed.
    - **Component interactions:** Visualize the relationships and communication between different parts of the software.

    Ensure the generated Mermaid code is clean, valid, and adheres to Mermaid syntax best practices. Use clear and concise labels for nodes and edges.

    For your response, please use the following JSON schema and format, and ONLY respond with the json object (do not add anything else):
    {
        "charts": [
            ${JSON.stringify(exampleChart, null, 2)},
            ${JSON.stringify(exampleChart, null, 2)}
        ]
    }

    ## Acceptable Chart Types to Choose From:
        - Flowchart (flowchart LR or graph LR) - Ideal for control flow and data flow.
        - Sequence Diagram (sequenceDiagram) - Excellent for showing component interactions and message passing.
        - Class Diagram (classDiagram) - Useful for representing the static structure and relationships of classes.
        - State Machine Diagram (stateDiagram-v2) - Good for modeling the states and transitions of an object.
        - Entity Relationship Diagram (erDiagram) - Suitable for database schema representation.
        - C4-style Architecture Diagrams (journey, context, container, component, deployment) - For visualizing software architecture at different levels of detail. Use 'graph TD' or 'graph LR' for these if no direct C4 syntax is available, and structure them accordingly.

    ## Chart Syntax Rules and General Guidelines:
    - **Validity:** Ensure all generated code is valid Mermaid syntax. Test against common pitfalls.
    - **Clarity:** Use meaningful names for nodes and clear descriptions for relationships.
    - **Simplicity:** Keep diagrams focused on a specific aspect (e.g., a particular user flow, data transformation, or component interaction). Avoid overly complex or cluttered diagrams.
    - **Styling:** You can use styling (e.g., colors, shapes) to enhance readability, but ensure it doesn't break the code.
    - **Escaping:** Properly escape any special characters within labels or descriptions. For example, use "#quot;" for quotes in node labels if needed.
    - **Direction:** For flowcharts and similar diagrams, use appropriate direction indicators (e.g., `LR` for left-to-right, `TD` for top-down).

    ### Sequence Diagram Example:
    sequenceDiagram
        participant User
        participant WebServer
        participant Database
        User->>WebServer: Request data
        WebServer->>Database: Query data
        Database-->>WebServer: Return data
        WebServer-->>User: Display data

    ### Flowchart Example (Control Flow):
    flowchart TD
        A[Start] --> B{Decision?};
        B -- Yes --> C[Process 1];
        B -- No --> D[Process 2];
        C --> E[End];
        D --> E;

    ### Class Diagram Example:
    classDiagram
        class Animal {
          +String name
          +speak()
        }
        class Dog {
          +bark()
        }
        Animal <|-- Dog

    
    ## Codebase:
    Here is the entire codebase as a JSON object:
    ${CODEBASE_JSON_STRING}
    `;

    console.log("Prompt:", prompt);

    const response = await infer(prompt, "JSON object") as {charts: fofoMermaidChart[]};
    console.log("Response:", response);



    // Let us make sure the response is valid and contains what we need:
    if (response.charts && Array.isArray(response.charts) && response.charts.length > 0) {
        response.charts.forEach((chart) => {
            chart =cleanUpChartData(chart);
            charts.push(chart);
        });
    }

    console.log("# of Charts Generated:", charts.length);
    
    return charts;
}

function makeHTMLStringSafe(htmlString: string) {
  return htmlString
  .replace(/\n/g, '\\n')
  .replace(/`/g, '\\`')
  .replace(/"/g, "'");
}
/**
 * Renders the given Mermaid charts into PNG images (base64-encoded).
 *
 * This version uses a headless browser with Puppeteer
 * to load the web-based Mermaid library and render the diagram.
 */
export async function createPNGfromMermaidCharts(
    charts: fofoMermaidChart[],
    bRetry=true
  ): Promise<{ chartData: fofoMermaidChart; base64PNG: string }[]> {
    const chartPNGs: chartPNG[] = [];
    const browser = await puppeteer.launch({ headless: true });
  
    try {
      for (const chart of charts) {
        try {
        const page = await browser.newPage();
        let parseError: string | null = null;
  
        // Set up error handlers before loading content
        page.on('console', (msg) => {
          const msgText = msg.text();
          console.log(`Page console [${msg.type()}]: ${msgText}`);
          
          // Catch both UnknownDiagramError and syntax errors
          if (msg.type() === 'error' || msgText.includes('syntax error')) {
            parseError = msgText;
          }
        });
  
        page.on('error', (error) => {
          console.log(`Page error: ${error}`);
          parseError = error.message;
        });
  
        page.on('pageerror', (error) => {
          console.log(`Page error: ${error}`);
          parseError = error.message;
        });

        console.log("Rendering chart:\n\n", chart.chart_code);
        
  
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <style>
                body { margin: 0; padding: 0; }
              </style>
            </head>
            <body>
              <pre class="mermaid">
                ${chart.chart_code}
              </pre>
  
              <script type="module">
                import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
                
                try {
                  // Initialize first
                  mermaid.initialize({
                    startOnLoad: false,  // We'll render manually
                    theme: 'default'
                  });

                  // Try to parse - this will throw if invalid
                  const chartCode = "${makeHTMLStringSafe(chart.chart_code)}";
                  const parseResult = await mermaid.parse(chartCode);
                  if (!parseResult) {
                    throw new Error('Mermaid parse failed');
                  }

                  // If parse succeeded, render
                  await mermaid.run({
                    querySelector: '.mermaid'
                  });

                } catch (error) {
                  console.error('Mermaid processing failed:', error.message);
                  document.body.innerHTML = \`<div style="color: red">Error: \${error.message}</div>\`;
                }
              </script>
            </body>
          </html>
        `;
  
        // Load the page and wait for network to be idle
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        // Give time for any async errors to surface
        await new Promise((resolve) => setTimeout(resolve, 2000));
  
        // Check for parse errors that occurred during loading
        if (parseError) {
          await page.close();
          throw new Error(`Mermaid parse error for chart "${chart.shortDescription}": ${parseError}`);
        }
  
        // Verify the diagram was rendered
        const mermaidDiv = await page.$('.mermaid');
        if (!mermaidDiv) {
          await page.close();
          throw new Error(`Could not find .mermaid container for chart: ${chart.shortDescription}`);
        }
  
        // Check if we got an error message instead of a diagram
        const errorDiv = await page.$('div[style="color: red"]');
        if (errorDiv) {
          const errorText = await page.evaluate(el => el.textContent, errorDiv);
          await page.close();
          throw new Error(`Failed to render chart "${chart.shortDescription}": ${errorText}`);
        }
  
        // If we got here, take the screenshot
        const base64PNG = (await mermaidDiv.screenshot({
          encoding: 'base64',
          type: 'png',
        })) as string;
  
        chartPNGs.push({ chartData: chart, base64PNG });
        await page.close();
        }
        catch (error) {
          console.error('Error during Puppeteer operation:', error);
          if (bRetry) {
            // Let's ask the A.I. to help fix the issue
            iRetryCounter++;
            if (iRetryCounter >= 4) {
              bRetry = false;
            }
            charts = await askAItoHelpFixError(charts, error as any);

            return await createPNGfromMermaidCharts(charts, false);

          }
          continue;
        }
      }
    } catch (error) {
      console.error('Error during Puppeteer operation:', error);
      return chartPNGs;
    } finally {
      await browser.close();
    }
  
    return chartPNGs;
  }