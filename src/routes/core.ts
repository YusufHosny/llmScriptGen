import { Request, Response, NextFunction } from "express";
import { ScriptParams, ScriptUrlParams } from "../types/scriptRequestParams";
import { Router } from 'express'

const router = Router();

/* POST query to script creation endpoint . */
router.post('/:episodeId/sections/:sectionId/script', (req: Request<ScriptUrlParams>, res: Response, next: NextFunction) => {

  const scriptParams: ScriptParams = {
    ...req.body,
    ...req.params
  }

  res.json({ in: scriptParams });
});

module.exports = router;
