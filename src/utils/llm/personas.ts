import OpenAI from "openai";

import { zodTextFormat } from "openai/helpers/zod";
import { PersonasSchema } from "../../types/schemas";

const client = new OpenAI();

const personaSystemPrompt =
`
Given the following text. Generate personas for the speakers and the target audience. \
The personas should not be a real person, they should be fictional characters that attempt \
to envision the ideal listeners of podcast reader of the text, and given these listeners, \
the speaker personas should be the ideal speakers with the correct tone and approach to \
deliver the podcast to the target audience and align with their personas accurately. \
however, they should be fiction personas derived from the information found in the text.
The speakers should be in the form of podcast speakers, who are attempting to deliver the \
same information given in the text.

Key Components of a Good Audience Persona:
Demographics: Age, gender, location, income, education, occupation, and family status. 
Psychographics: Values, interests, attitudes, beliefs, lifestyle, and personality traits. 
Goals and Motivations: What drives their behavior and decision-making? What are they trying to achieve? 
Pain Points and Challenges: What are the obstacles they face, and how can you help them overcome them? 
Behavioral Characteristics: How do they typically make purchasing decisions? What are their online and offline habits? 
Specific Details: Give your persona a name, photo, and a brief biography to make them feel more real and relatable. 

Ensure to have a good persona, additionally, for the speakers, define in a short sentence what their \
tone and conversation style are, including their technical jargon usage, their vocab, and sentence strucutre.

!!! DO NOT MAKE THE SPEAKERS REAL PEOPLE, DO NOT USE ANY NAMES OR INFORMATION GIVEN, \
GENERATE ARBITRARY PERSONAS THAT FIT THE INFORMATION GIVEN !!!
`



async function definePersonas(input: string) {
    const response = await client.responses.parse({
    model:  "gpt-4o-mini",
    input: [
        { role: "system", content: personaSystemPrompt },
        { role: "user", content: input },
    ],
    text: {
        format: zodTextFormat(PersonasSchema, "personas"),
    },
    });

    return response.output_parsed;
}

export default definePersonas 


