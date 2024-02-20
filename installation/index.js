#!/usr/bin/env node

import { exec } from 'child_process'
import inquirer from 'inquirer'
import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'

const GREEN = '\x1b[32m'
const RESET = '\x1b[0m'
const prefix = `${GREEN}+${RESET}`
const line = ' '.repeat(50)
const decor = '-'.repeat(15)

console.log(line)
console.log(`${decor}( ${GREEN}reactful${RESET}.js )${decor}`)
console.log(line)

const templates = ['empty', 'minimal', 'sampling']

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
   exec(`md ${answers.project}`)
   exec(`cd ${answers.project}`)

   const destination = path.join(process.cwd(), answers.project)

   await downloadRepo(`common`, destination)
   await downloadRepo(`templates/${answers.template}`, destination)

   renamingJSON(destination, answers.project)

   exec(`bun install`)
})

function renamingJSON(directory, projectName) {
   const url = `${directory}/package.json`
   const txt = fs.readFileSync(url, { encoding: 'utf-8' })
   const obj = JSON.parse(txt)

   obj.name = projectName

   fs.writeFileSync(url, JSON.stringify(obj, null, 3))

   console.log('')
}

const downloadRepo = async (subfolder, destination) =>
   downloadGitHub('jsenaribeiro', 'reactful', subfolder, destination)

async function downloadGitHub(user, repository, subfolder, destination) {
   const url = `https://api.github.com/repos/${user}/${repository}/contents/${subfolder}`
   const content = await fetch(url).then(x => x.json())

   console.log('- url', url)
   console.log('- res', JSON.stringify(content))

   for (const item of content) {
      if (item.type != 'file') continue
      
      const filename = path.join(destination, item.name)
      const response = await fetch(item.download_url)
      const filetext = await response.text()

      fs.writeFileSync(filename, filetext)
   }
}