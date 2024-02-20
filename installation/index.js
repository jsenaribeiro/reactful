#!/usr/bin/env node

import { execSync } from 'child_process'
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
   fs.mkdirSync(answers.project)
   
   const destination = path.join(process.cwd(), answers.project)
   
   await downloadRepo(`commons`, destination)
   await downloadRepo(`templates/${answers.template}`, destination)
   
   renamingJSON(destination, answers.project)
   
   execSync(`cd ${answers.project}; bun install`)
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

async function downloadGitHub(user, repository, subdir, destination) {
   const prefix = `https://api.github.com/repos/${user}/${repository}`
   const response = await fetch(`${prefix}/contents/installation/${subdir}`) 
   const contents = await response.json()

   if (!Array.isArray(contents) || !response.ok) {
      console.log('url: ', response.url)
      console.log('code: ', response.status)
      console.log('array: ', Array.isArray(contents))
      console.log('textual: ', JSON.stringify(contents))
      
      throw 'failed to download scafold from github...'
   }

   for (const item of contents) {
      if (item.type === 'dir' && item.name) {
         const from = `${subdir}/${item.name}`
         const goto = `${destination}/${item.name}`   
         await downloadRepo(from, goto); continue
      }

      if (item.type != 'file') continue
      
      const filename = path.join(destination, item.name)
      const response = await fetch(item.download_url)
      const filetext = await response.text()

      fs.writeFileSync(filename, filetext)
   }
}