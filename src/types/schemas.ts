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
  biography: z.string(),
  tone_and_style: z.object({
    description: z.string(),
    technical_jargon_usage: z.string(),
    vocabulary_level: z.string(),
    sentence_structure: z.string()
  }),
  interests: z.array(z.string()),
  values: z.array(z.string())
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
  goals: z.array(z.string()),
  challenges: z.array(z.string()),
  behavior: z.object({
    decision_style: z.string(),
    online_habits: z.string()
  }),
  bio: z.string()
});


export const PersonasSchema = z.object({
    SpeakerPersonas: z.array(SpeakerPersonaSchema),
    AudiencePersonas: z.array(AudiencePersonaSchema)
});