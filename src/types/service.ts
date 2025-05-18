import { Script, Personas } from './inferred';

export type ScriptUrlParams = {
  episodeId: string,
  sectionId: string
}

export type SectionMetadata = {
  episodeTitle: string,
  sectionTitle: string,
  order: number,
  additionalContext?: string,
  targetDuration: number
}

export type ScriptFormParams = {
  title: string, // The title of the episode
  personas?: Personas // Audience and speaker personas, to try and maintain clarity between sections
          // note: in a real scenario this should be in some datastore, not sent with every request
          // and the system could possibly be more interesting, with some form of "state/memory",
          // to allow speakers to dynamically adjust their tone and style based on what is being said
          // i.e. joke was made in script about some speaker, then they can be "irritated" for some 
          // time frame after that.   
  sections:
    {
      id: string, // Unique identifier for the section
      title: string, // Section title
      order: number, // Order in the episode
      sourceContent: string, // Company article content for this section
      additionalContext?: string, // Additional notes or context for script generation
      targetDuration: number, // Target duration for this section in seconds
      script?: Script
    }[],
}

export type ScriptParams = ScriptUrlParams & ScriptFormParams;
