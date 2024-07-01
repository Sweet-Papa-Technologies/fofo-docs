# General Notes
- Sending complex instructions, for even long prompts, works well with Gemini 1.5 flash
- Rate limiting is applied to the Vertex API initially, 5 request per minute
- GPT4o is the best performing model right now by far

# Model Notes:

**Ratings:**
- Works Best
- Works Well
- Works OK
- Not Good
- Not Workable

**Criteria:**
- Minimal hallucinations
- Consistent output
- Response time
- Rate limits
- Expense

## Model Results:

### [gpt-4o](https://beta.openai.com/signup/)
- **Overall Rating:** Works Best
- Minimal hallucinations: Works Best
- Consistent output: Works Best
- Response time: Works Best
- Rate limits: Works Best
- Expense: Works Best

### [gemini-1.5-flash-preview-0514](https://cloud.google.com/vertex-ai/docs/using/gemini)
- **Overall Rating:** Works Well
- Minimal hallucinations: Works Well
- Consistent output: Works Well
- Response time: Works Well
- Rate limits: Works OK
- Expense: Works OK

### [qwen:32b-chat-v1.5-q4_0](https://ollama.com/)
- **Overall Rating:** Works OK
- Minimal hallucinations: Works OK
- Consistent output: Works OK
- Response time: Works OK
- Rate limits: Works Best
- Expense: Works Best

### [dolphin-llama3:8b-v2.9-fp16](https://ollama.com/)
- **Overall Rating:** Works OK
- Minimal hallucinations: Works OK
- Consistent output: Works OK
- Response time: Works Well
- Rate limits: Works Best
- Expense: Works Best


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

```
## TODO: MOVE THESE NOTES TO THE README
## All Supported Models:
# OPENAI
# - gpt-4o

# Google Vertex AI
# - gemini-1.5-flash-preview-0514
# - gemini-1.5-pro-preview-0514
# - codechat-bison
# - codechat-bison-32k

# OLLAMA - TESTED
# - codestral:22b-v0.1-q5_0
# - codestral:22b-v0.1-q5_1
# - granite-code:34b
# - phi3:14b-medium-128k-instruct-q5_1 - OKAY, BUT NOT GREAT
# - phi3:14b-medium-4k-instruct-q6_K - NO GOOD
# - qwen:32b-chat-v1.5-q4_0
# - dolphin-llama3:8b-v2.9-fp16

# OLLAMA - UNTESTED, but available
# - qwen:32b-chat-v1.5-q4_K_M
# - mixtral:8x7b-instruct-v0.1-q3_K_L
# - llama3-chatqa:8b-v1.5-fp16
# - qwen:32b-text-v1.5-q4_0
# - llama3-gradient:8b-instruct-1048k-q6_K
# - codeqwen:7b-code-v1.5-q8_0
# - phi3:latest
# - phi3:3.8b-mini-instruct-4k-fp16
```