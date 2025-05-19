import { z } from 'zod';

export const ScriptSchema = z.object({
  lines: z.array(
    z.object({
        speakerId: z.string(),
        speakerName: z.string(),
        text: z.string()
    })
)});

export const SummarySchema = z.object({
    points: z.array(z.string()),
    quotes: z.array(z.string()),
});

export const SpeakerPersonaSchema = z.object({
  name: z.string(),
  age: z.number(),
  gender: z.string(),
  location: z.string(),
  education: z.string(),
  occupation: z.string(),
  tone_and_style: z.object({
    description: z.string(),
    vocabulary_level: z.string(),
  }),
});


export const AudiencePersonaSchema = z.object({
  name: z.string(),
  demographics: z.object({
    age: z.number(),
    gender: z.string(),
    location: z.string(),
    education: z.string(),
    job: z.string()
  }),
  psychographics: z.object({
    interests: z.array(z.string()),
    values: z.array(z.string())
  }),
  bio: z.string()
});


export const PersonasSchema = z.object({
    SpeakerPersonas: z.array(SpeakerPersonaSchema),
    AudiencePersonas: z.array(AudiencePersonaSchema)
});