import OpenAI from "openai";

import { zodTextFormat } from "openai/helpers/zod";
import { Personas, Script, Summary } from "../../types/inferred";
import { ScriptSchema } from "../../types/schemas";
import dedent from "dedent";
import { SectionMetadata } from "../../types/service";

const client = new OpenAI();

const dialogueSystemPrompt =
`
Based on the following guidelines and information, you will generate a section \
of the script for a podcast. You will be given a summary, personas, script, and \
metadata.

# Script Style & Structure

- **Conversational**: Informal and casual, like a friendly chat.
- **Balanced tone**: Avoid robotic/formal or overly playful language.
- **Preserve intent**: Keep the article's tone, energy, and key messages.
- **Context-aware**:
    - Link naturally to previous section content.
    - Use cues like "To get started…" for first sections or "To wrap up…" for final ones.
- **Engaging**: Add a small joke or light humor.
- **Clear language**: Keep it simple and easy to follow.

1. Handling Script Order and Flow
    If you see order=0 AND no previous script lines are given, this means:
        This is the FIRST section of the script.
        You MUST begin with an introduction.
    Every section must continue smoothly from the previous one.
        The script should sound like a single, flowing conversation.
        Do NOT jump topics randomly or reset the conversation between parts.
        Do NOT make it feel robotic or unnatural.

2. Speakers and Personas
    The speakers ARE the personas. This is very important:
        You must write their lines as if they are real people with personality, tone, and voice.
        Do NOT change their personalities or make them sound out of character.
        
    You will also be told who the audience is.
        You must write in a way that speaks directly to that audience.
        Use language, tone, and examples that are relevant and appealing to them.

3. Linking Sections
    All sections of the script must be logically connected.
        Make sure every new part continues from where the last one left off.
        Do NOT make the script feel like it's starting over or jumping randomly.
    It should feel like one consistent conversation, not a set of separate pieces.

4. Following the Summary and Metadata
    A summary and metadata will be provided that contains all the key points to be covered in the podcast.
        The summary and metadata are mandatory.
        You must include every single point from the summary in the script.
    Do NOT skip, change, or leave out anything from the summary.
    Your job is to discuss all the points clearly, naturally, and in character.

Do NOT:
    Do NOT include any past script content in your new script section.
    Do NOT invent new content or add things not in the summary.
    Do NOT let the characters sound like robots or lose their personalities.
    Do NOT break the conversation flow between script sections.
`


async function generateDialogue(personas: Personas, summary: Summary, metadata: SectionMetadata, previousScript?: Script) {

    const data =
    dedent`
    ${previousScript && `Previous Script: ${previousScript}`}

    Personas: ${personas}

    Summary: ${summary}

    Metadata: ${metadata}
    `

    const response = await client.responses.parse({
    model:  "gpt-4o-mini",
    input: [
        { role: "system", content: dialogueSystemPrompt },
        { role: "user", content: data },
    ],
    text: {
        format: zodTextFormat(ScriptSchema, "script")
    },
    });


    return response.output_parsed as Script|undefined; 
}

export default generateDialogue