import { ScriptSchema, SummarySchema, SpeakerPersonaSchema, AudiencePersonaSchema, PersonasSchema } from "./schemas"
import { z } from 'zod'

export type Script = z.infer<typeof ScriptSchema>;

export type Summary = z.infer<typeof SummarySchema>;

export type SpeakerPersona = z.infer<typeof SpeakerPersonaSchema>;

export type AudiencePersona = z.infer<typeof AudiencePersonaSchema>;

export type Personas = z.infer<typeof PersonasSchema>;
