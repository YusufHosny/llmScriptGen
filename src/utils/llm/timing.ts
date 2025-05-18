import OpenAI from "openai";

import dedent from "dedent";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from 'zod'

const client = new OpenAI();

const timingSystemPrompt = 
`
Given the following text, shorten or lengthen the text as required, while maintaining \
clarity, tone, and structure, ensure that the given personas remain consistent, and that \
the main points from the summary and maintained and not ignored. Simply adjust the length \
by the percentage given (in an additive/subtractive way, as in "lengthen by 10% means to \
increase the word count until its 110% of its current 100%.) and do not remove important \
or necessary information.
`

async function adjustTiming(responseToAdjust: string, percentChange: number, format: Zod.AnyZodObject) {

    const prompt = 
    dedent`
    Take this text and ${(percentChange > 0 ? "lengthen" : "shorten")} it by ${Math.abs(percentChange).toFixed(0)}%

    Text: ${responseToAdjust}    
    ` 

    const response = await client.responses.parse({
    model:  "gpt-4.1",
    input: [
        { role: "system", content: timingSystemPrompt },
        { role: "user", content: prompt },
    ],
    text: {
        format: zodTextFormat(format, "format")
    },
    });


    return response.output_parsed as z.infer<typeof format>|undefined; 
}

export default adjustTiming 