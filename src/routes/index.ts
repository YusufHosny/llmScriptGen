import { Request, Response, NextFunction } from "express";
import { Router } from 'express'
import * as path from 'path'
import * as fs from 'fs'

var router = Router();

// stuff to render readme on homepage
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const readmePath = path.join(__dirname, '..', '..', 'README.md');

  const readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const readmeHtml = md.render(readmeContent);

  res.render('readme', { title: 'LLM Script Generator', readme: readmeHtml });
});

module.exports = router;
