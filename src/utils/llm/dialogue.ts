import OpenAI from "openai";

import { zodTextFormat } from "openai/helpers/zod";
import { Personas, Script, Summary } from "../../types/inferred";
import { ScriptSchema } from "../../types/schemas";
import dedent from "dedent";
import { SectionMetadata } from "../../types/service";
import { ReviserType } from "../../types/system";

const client = new OpenAI();

const dialogueSystemPrompt =
`
Based on the following guidelines and information, you will generate a section \
of the script for a podcast. You will be given a summary, personas, script, and \
metadata.

it should be:
Conversational: Informal and casual, like a friendly chat.
Balanced tone: Avoid robotic/formal or overly playful language.
Preserve intent: Keep the article's tone, energy, and key messages.
Context-aware:
  Link naturally to previous section content.
  Use cues like "To get started…" for first sections or "To wrap up…" for final ones.
Engaging: Add a small joke or light humor.
Clear language: Keep it simple and easy to follow.
If you see order=0 AND no previous script lines are given, start with an introduction.
The speakers in the persona summary are the speakers of the podcast.
You must write their lines as if they are real people with personality, tone, and voice.
Do NOT change their personalities or make them sound out of character.
You will also be told who the audience is, write the script to be targetted to them.
All sections of the script must be logically connected.
Make sure every new part continues from where the last one left off.
A summary and metadata will be provided that contains all the key points to be covered in the podcast.
You must include every single point from the summary in the script.
Do NOT skip, change, or leave out anything from the summary.
Do NOT include any past script content in your new script section.
Do NOT let the characters sound like robots or lose their personalities.

The most important point: FOCUS on the script, DO NOT go off topic heavily and ensure the context remains clear. \
Ensure the speakers remain CONSISTENT, AND DONT CHANGE!!!
`


async function generateDialogue(personas: Summary|Personas, summary: Summary, metadata: SectionMetadata, previousScript?: Script, reviser?: ReviserType, strictTime?: boolean) {

    const data =
    dedent`
    Personas: ${JSON.stringify(personas)}

    Summary: ${JSON.stringify(summary)}

    Metadata: ${JSON.stringify(metadata)}

    ${previousScript && `Previous Script: ${JSON.stringify(previousScript)}`}
    `

    const response = await client.responses.parse({
    model:  "gpt-4.1",
    input: [
        { role: "system", content: dialogueSystemPrompt },
        { role: "user", content: data },
    ],
    text: {
        format: zodTextFormat(ScriptSchema, "script")
    },
    });

    let result = response.output_parsed as Script|undefined;
    if(!result) throw Error("Result was not received");

    if(reviser) 
    {
        const originalPrompt = JSON.stringify([
            { role: "system", content: dialogueSystemPrompt },
            { role: "user", content: data },
        ]);

        result = await reviser.revise(originalPrompt, JSON.stringify(result), ScriptSchema) as Script;
    }

    return result;
}

export default generateDialogue