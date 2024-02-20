import inquirer from 'inquirer'
import { $ } from "bun"
import path from 'path'
import fs from 'fs'

const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';
const prefix = `${GREEN}+${RESET}`
const line = ' '.repeat(50)
const decor = '-'.repeat(15)

export function startup(base) {
   console.log(line)
   console.log(`${decor} ${GREEN}reactive${RESET}.js ${decor}`)
   console.log(line)

   const templatePath = path.join(process.cwd(), base, 'templates')

   const templates = fs
      .readdirSync(templatePath)
      .map(x => ({ name:x, path: `${templatePath}/${x}`}))
      .filter(x => fs.statSync(x.path).isDirectory())      
      .map(x => ({ name: x.name, value: x.name }))

   const questions = [
      {
         type: 'list',
         name: 'template',
         message: 'Which template?',
         choices: templates, 
         prefix
      },
      { type: 'input', name: 'project', message: 'Project name?', prefix },
      { type: 'confirm', name: 'vscode', message: 'VS Code IDE?', prefix },
      { type: 'confirm', name: 'install', message: 'Install?', prefix },
   ]

   inquirer.prompt(questions).then(async function (answers) {
      const fromTemplate = path.join(process.cwd(), base, 'templates', answers.template)
      const destProject = path.join(process.cwd(), answers.project)
      const fromCommon = path.join(process.cwd(), base, 'common')

      copyFolder(fromTemplate, destProject)
      copyFolder(fromCommon, destProject)

      console.log('')

      await $`cd ${answers.project}; bun install`
   })
}

function copyFolder(fromDir, destDir) {
   if (!fs.existsSync(fromDir)) 
      return console.error('Directory not found')

  if (!fs.existsSync(destDir)) 
      fs.mkdirSync(destDir)

  const files = fs.readdirSync(fromDir)

  files.forEach(item => {
      const fromPath = `${fromDir}/${item}`
      const destPath = `${destDir}/${item}`
      const isFolder = fs.statSync(fromPath).isDirectory()

      if (isFolder) copyFolder(fromPath, destPath)      
      else fs.copyFileSync(fromPath, destPath)
  })
}
