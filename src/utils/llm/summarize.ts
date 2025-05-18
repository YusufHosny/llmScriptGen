import OpenAI from "openai";

import { zodTextFormat } from "openai/helpers/zod";
import { SummarySchema } from "../../types/schemas";
import { Summary } from "../../types/inferred";

const client = new OpenAI();

const summarizeSystemPrompt = 
`
Given the following text,
First: extract the vital information and summarize it while maintaining content. \
Avoid unnecessary information, but keep the tone and preserve the energy used \
within the information given. Additionally, ensure that under no circumstances \
any vital information is missed, as in all given dates, specific addresses, times, \
calls to action, steps that need to be taken, and all other information that a reader \
can find within the text is present within the summary. The summary should be dense \
but readable, and provide all the information that was in the original text.
Second: Create a list of important quotes and statements from any speakers or \
important figures present in the given text.
`

async function summarize(input: string) {
    const response = await client.responses.parse({
    model:  "gpt-4o-mini",
    input: [
        { role: "system", content: summarizeSystemPrompt },
        { role: "user", content: input },
    ],
    text: {
        format: zodTextFormat(SummarySchema, "summary"),
    },
    });


    return response.output_parsed as Summary|undefined;
}

export default summarize