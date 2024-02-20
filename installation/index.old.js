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

const nodeModulesPath = 'node_modules/@reactful/create'

const templatePath = path.join(process.cwd(), nodeModulesPath, 'templates')

const templates = fs.readdirSync(templatePath)
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
   // const fromTemplate = path.join(process.cwd(), base, 'templates', answers.template)
   // const destination = path.join(process.cwd(), answers.project)
   // const fromCommon = path.join(process.cwd(), base, 'common')
   // copyFolder(fromTemplate, destination)
   // copyFolder(fromCommon, destination)

   const base = 'https://github.com/jsenaribeiro/reactful/installation/'

   copyScaffold(`${base}/common`, destination)
   copyScaffold(`${base}/templates/${answers.template}`, destination)
   renamingJSON(destination, answers.project)

   console.log('')

   exec($`cd ${answers.project} bun install`)
})

function renamingJSON(directory, projectName) {
   const url = `${directory}/package.json`
   const txt = fs.readFileSync(url, { encoding:'utf-8' })
   const obj = JSON.parse(txt)

   obj.name = projectName

   fs.writeFileSync(url, JSON.stringify(obj, null, 3))
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

async function downloadRepo(url, destino) {
   const resposta = await fetch(url)
   const conteudo = await resposta.json()
 
   for (const item of conteudo) {
     if (item.type === 'file') {
       const arquivoUrl = item.download_url
       const arquivoNome = path.join(destino, item.name)
       const arquivoResposta = await fetch(arquivoUrl)
       const arquivoTexto = await arquivoResposta.text()
       fs.writeFileSync(arquivoNome, arquivoTexto)
       console.log(`Arquivo baixado: ${arquivoNome}`)
     }
   }
 }
 
 async function copyScaffold(destination) {
   const url = 'https://github.com/jsenaribeiro/reactful/installation/'
 
   try { await downloadRepo(url, destination) } 
   catch (error) { console.error(error) }
 }