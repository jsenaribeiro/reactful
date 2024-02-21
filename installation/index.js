#!/usr/bin/env node

import npmRegistryFetch from 'npm-registry-fetch'
import { spawn , execSync } from 'child_process'
import inquirer from 'inquirer'
import path from 'path'
import * as tar from 'tar'
import fs from 'fs'

const GREEN = '\x1b[32m'
const RESET = '\x1b[0m'
const prefix = `${GREEN}+${RESET}`
const line = '─'.repeat(51)
const decor = '-'.repeat(18)

// console.log(line)
console.log(`${decor}( ${GREEN}reactful${RESET}.js )${decor}`)
// console.log(line)

const templates = ['empty', 'minimal', 'sampling']
const questions = [{
      type: 'list',
      name: 'template',
      message: 'Which template?',
      choices: templates,
      prefix
   },
   { type: 'input', name: 'project', message: 'Project name?', prefix, default: 'Sample' },
   { type: 'confirm', name: 'vscode', message: 'VS Code IDE?', prefix },
   { type: 'confirm', name: 'install', message: 'Install?', prefix },
]

inquirer.prompt(questions).then(prompting)

async function prompting(answers) {
   console.log('- preparing...')

   if (!answers.project) throw 'Required project name!'

   const destination = path.join(process.cwd(), answers.project)
   const downloadPath = path.join(destination, 'temp')
   
   await createDirectory(destination)

   console.log('- loading NPM...')
   await download('@reactful/create', downloadPath)

   console.log('- creating .env...')
   const env = `PORT=333\nMINIFY=FALSE`
   fs.writeFileSync(`${destination}/.env`, env)

   console.log('- copying template...')
   await copyPath(`${downloadPath}/commons`, destination)
   await copyPath(`${downloadPath}/templates/${answers.template}`, destination)
   
   console.log('- renaming project...')
   renamingJSON(destination, answers.project)

   console.log('- installing dependencies...\n')
   process.chdir(answers.project)   
   execSync(`bun install`)

   if (answers.vscode) {
      spawn("code", ['.'])

      const pathVSCode = `${destination}/.vscode`      
      await createDirectory(pathVSCode)
      await copyPath(`${downloadPath}/vscode`, pathVSCode)
   }

   await removeDirectory(downloadPath)
}

function renamingJSON(directory, projectName) {
   const url = `${directory}/package.json`
   const txt = fs.readFileSync(url, { encoding: 'utf-8' })
   const obj = JSON.parse(txt)

   obj.name = projectName

   fs.writeFileSync(url, JSON.stringify(obj, null, 3))
}

async function download(packageName, directory) {
   try {
      await createDirectory(directory)

      const metadata = await npmRegistryFetch.json(packageName)
      const latestVersion = metadata['dist-tags'].latest
      const tarballURL = metadata.versions[latestVersion].dist.tarball
      const filename = tarballURL.substring(tarballURL.lastIndexOf('/') + 1)
      const tempFilePath = path.join(directory, filename)

      if (!fs.existsSync(directory))
         fs.mkdirSync(directory, { recursive: true })

      const response = await npmRegistryFetch(tarballURL)

      await new Promise((resolve, reject) => {
         const fileStream = fs.createWriteStream(tempFilePath)
         response.body.pipe(fileStream)
         response.body.on('error', reject)
         fileStream.on('finish', resolve)
      })

      await tar.x({ file: tempFilePath, cwd: directory, strip: 1 })

      fs.unlinkSync(tempFilePath)
   } catch (error) {
      console.error('downloadPackage')
      throw error
   }
}


function createDirectory(directory) {
   removeDirectory(directory)
   fs.mkdirSync(directory)
}

function removeDirectory(directory) {
   if (!fs.existsSync(directory)) return
   else fs.rmSync(directory, { recursive: true })
}

function copyPath(source, target) {
   if (!fs.existsSync(target)) fs.mkdirSync(target)

   fs.readdirSync(source).forEach(function (file) {
      const currentPath = path.join(source, file)
      const targetPath = path.join(target, file)

      if (fs.lstatSync(currentPath).isDirectory())
         copyPath(currentPath, targetPath)

      else fs.copyFileSync(currentPath, targetPath)
   })
}