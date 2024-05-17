# Notes

- Sending complex instructions, for even long prompts, works well with Gemini 1.5 flash
- Rate limiting is applied to the Vertex API initially, 5 request per minute
- GPT4o is the best performing model right now by far


# Helpful Prompts:

```
I need to take a JSON object that contains a lot of code data and convert it into a useful MD file that details all of the sections and details within the JSON object. For reference, here is a summary of my requirements doc:

--
## Introduction
FoFo Docs is a tool to generate user documentation for code repositories. It is designed to be simple to use and easy to integrate into existing projects.

Major features include:
- Automatic generation of documentation from source code
- Support for multiple programming languages via LLM (Gemini Flash or Gemini Pro 1.5 for Now)
- Standard Templates for common documentation needs
    - Code Blocks
    - Function, Class, Type, and Variable Descriptions
- Analyzes code object by object to generate documentation
    - Classes, Functions, Variables, and Types
    - Comments
--

Below is the TypeScript interfaces I will work with. Specifically, the ProjecSummary interface is the one I need to convert to a markdown file.

```typescript
<interface>
```

With this information, please generate a TypeScript function that:

- Takes this JSON object and an output folder as input
- Converts the JSON object into a set of properly linked MD files
- Consolidates any redundant or duplicate data within a single MD page
- Generates a table of contents for the MD files
- Applies MD formatting such as code blocks etc, (can ignore more complex formatting for now)
- Outputs the MD files to a time-stamped folder (projectname-timestamp) in the output folder
```