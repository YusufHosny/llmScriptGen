import { Request, Response, NextFunction } from "express";
import { ScriptParams, ScriptUrlParams, SectionMetadata } from "../types/service";
import { Router } from 'express'

import summarize from "../utils/llm/summarize";
import definePersonas from "../utils/llm/personas";
import generateDialogue from "../utils/llm/dialogue";

import { Reviser } from "../utils/llm/revise";
import { Script } from "../types/inferred";

const router = Router();

/* POST query to script creation endpoint . */
router.post('/:episodeId/sections/:sectionId/script', async (req: Request<ScriptUrlParams>, res: Response, next: NextFunction) => {

  const scriptParams: ScriptParams = {
    ...req.body,
    ...req.params
  }

  const scripts = scriptParams.sections
    .map(s => s.script)
    .filter(s => s != undefined)
    .map(s => s.lines);
  const lines = new Array().concat(scripts);
  const script: Script = { lines: lines };

  const section = scriptParams.sections.find(s => s.id == scriptParams.sectionId);
  if(!section) throw Error("Requested Section Not Present.");

  const input = section.sourceContent;

  const summary = await summarize(input, Reviser);
  const personas = scriptParams.personas ?? await definePersonas(input, Reviser); 

  const metadata: SectionMetadata = {
      episodeTitle: scriptParams.title,
      sectionTitle: section.title,
      order: section.order,
      targetDuration: section.targetDuration
  }

  const newSection = await generateDialogue(personas, summary, metadata, script, undefined, true);

  console.log(JSON.stringify({
      summary: summary,
      personas: personas,
      script: script
  }));

  res.json(newSection);
});

module.exports = router;
