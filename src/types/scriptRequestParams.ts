export type ScriptUrlParams = {
  episodeId: number,
  sectionId: number
}

export type ScriptFormParams = {
  title: string, // The title of the episode
  targetAudience: string, // The intended audience for the podcast
  tone: string, // The desired tone (casual, professional, etc.)
  sections: [
    {
      id: string, // Unique identifier for the section
      title: string, // Section title
      order: number, // Order in the episode
      sourceContent: string, // Company article content for this section
      emotion: string, // Emotional tone for this section
      additionalContext: string, // Additional notes or context for script generation
      targetDuration: number, // Target duration for this section in seconds
      script: [
        {
          speakerId: string, // ID of the speaker
          speakerName: string, // Name of the speaker
          text: string // The dialogue text content
        }
      ] // Existing scripts for each section, important for context
    }
  ],
}

export type ScriptParams = ScriptUrlParams & ScriptFormParams;
