import OpenAI from "openai"

type ReviserFunction = 
    (
        originalPrompt: string,
        responseToImprove: string,
        format: Zod.AnyZodObject
    ) => Promise<{
            [x: string]: any;
        } | undefined>

export type ReviserType = {
    client: OpenAI,
    revise: ReviserFunction
}