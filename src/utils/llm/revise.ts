import OpenAI from "openai";

import dedent from "dedent";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from 'zod';

const client = new OpenAI();

const reviseSystemPrompt = 
`
Given the following conversation history, critically assess whether the assistant correctly \
executed the instructor's instructions, and properly met the requirements. Ensure no factually \
incorrect or invalid information was presented, and that the response was coherent and accurate, \
and apply all changes you deem necessary to ensure the highest quality. Improve constructively \
and ensure consistency and sticking to the instructor's requirements.
`

async function revise(originalPrompt: string, responseToImprove: string, format: Zod.AnyZodObject) {

    const history =
    dedent`
        Assistant Prompt: {${originalPrompt}}
        
        Assistant Response: {${responseToImprove}}
    `

    const response = await client.responses.parse({
    model:  "gpt-4.1",
    input: [
        { role: "system", content: reviseSystemPrompt },
        { role: "user", content: history },
    ],
    text: {
        format: zodTextFormat(format, "format") 
    },
    });


    return response.output_parsed as z.infer<typeof format>|undefined;
}

export default revise 