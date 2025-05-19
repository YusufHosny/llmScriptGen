# LLM Script Generator
A small proof of concept express node api to generate configurable podcast scripts based on a set of predefined parameters.

# Quick Start / Setup
## Running the main service
- Make sure you have npm/node installed, preferable node lts. (can be downloaded via nvm install lts)
- Clone the project, run npm install to load all dependencies.
- Setup the .env in the root directory, .env.example is provided, rename it to .env and add a functioning OPENAI_API_KEY.
- use "npm run dev" to run the service, then the service will be active, by default on localhost with port 3000.
- the examples provided in the ./test directory show how to interact with the service, and can be tested with an arbitrary json file (other than exampleDelaware.json)

## Extra
If you want to try offline.ts, which runs the system end to end without the service overhead to generate a full script. Then
- First copy your .env file to the test directory and rename it to ".env.offline"
- cd into ./test/ and use "ts-node offline.ts" to run the script.

# Architecture
TODO

# License Information