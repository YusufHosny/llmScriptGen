# LLM Script Generator
A small proof of concept express node api to generate configurable podcast scripts based on a set of predefined parameters.

# Quick Start / Setup
## Running the main service
- Make sure you have npm/node installed, preferable node lts. (can be downloaded via `nvm install lts`)
- Clone the project, run npm install to load all dependencies.
- Setup the `.env` in the root directory, `.env.example` is provided, rename it to `.env` and add a functioning `OPENAI_API_KEY`.
- use `npm run dev` to run the service, then the service will be active, by default on localhost with port 3000.
- the examples provided in the `./test` directory show how to interact with the service, and can be tested with an arbitrary json file (other than `exampleDelaware.json`)
- A `.ps1` and a `.sh` example are provided.
- The examples show a possible use case of the endpoint, however the system is capable of much more complex flows due to its modularity, and can generally be easily adjusted to go through many different control flows.

## Extra
If you want to try `offline.ts`, which runs the system end to end without the service overhead to generate a full script. Then
- First copy your `.env` file to the test directory and rename it to `.env.offline`
- cd into `./test/` and use `ts-node offline.ts` to run the script.

# Architecture
The system is designed as generally module subparts that are described below.
## Service
The interface to the application is through an express web api, exposing a post request endpoint to make usage and integration more convenient. The service exposes 2 routes.
- The `/` route, which renders this README as html, to function as some documentation
- The `/api/:episodeid/sections/:sectionid/script` endpoint, which exposes the main functionality of the application. This endpoint accepts POST requests following the schema shown below. Additionally, it uses 2 url parameters, episode and section id.

```ts
export type ScriptFormParams = {
  title: string, // The title of the episode
  personas?: Personas // Audience and speaker personas
  sections:
    {
      id: string, // Unique identifier for the section
      title: string, // Section title
      order: number, // Order in the episode
      sourceContent: string, // Company article content for this section
      additionalContext?: string, // Additional notes or context for script generation
      targetDuration: number, // Target duration for this section in seconds
      script?: Script
    }[],
}
```
##  Script Generation Pipeline
After the main functionality is accessed through the service, the main program flow is passed to a set of modular llm-based utilities, which each service some functionality within the pipeline.
- Initially the parsed data is passed to two sub-systems, the summarizer and the persona generator.
- The summarizer takes the content that was passed for this section and summarizes it down to a clear and dense format, to save space in the llms context window in downstream tasks.
- The persona generator creates speaker and audience personas to be used in the podcast, however, the personas can also be provided beforehand, or generated separately with a persona specific prompt
- All components can be injected with a "reviser" object, which if passed in, applies a critical reassessment step where another llm session is used to re-evaluate the response and improve it. This can be applied multiple times if necessary, or can be turned off for speed/cost-efficiency.
- Afterwards, the personas, the summary, all the previous section data, and all relevant metadata are all packaged and sent to the dialogue generator, which generates the relevant script data. This data can also be revised with the reviser module.
- Additionally, the dialogue generator has a strictTime mode, which uses an average wpm estimate to estimate how long the text will take, and continually regenerates it until it matches the requested length, within some margin of error.

# Included Packages
From package.json, but here to be clearer.
- Dependencies
    - cookie-parser (for express)
    - debug (for express)
    - dedent (to include multiline strings without looking weird)
    - http-errors (for express)
    - jade (for express)
    - markdown-it (to render readme page as html on "/" route)
    - morgan (for express)
    - nodemon (for hot reloads)
    - openai (openai api for llm calls)
    - zod (zod schema definition for object schema and llm response parsing)
- Development Dependencies
    - types ...
    - dotenv (for loading .env into process.env)
    - eslint (linter)
    - express (router and webserver package)
    - install
    - npm
    - prettier (prettifier)
    - typescript

# License Information
MIT