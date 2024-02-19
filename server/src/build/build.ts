"use server"

import { File } from  '../extra'
import { Path, throws } from '@reactful/commons'
import { logger as log } from '../extra'
import { BUNDLE_TS, INDEX_HTML_URL, IParser, ISaver } from './shared'
import { cleanupFolders, folder, preValidation } from './filer'
import { saveEntryScriptForBundle } from './scripts'
import { createCliteSideScripts } from './scripts'
import { env } from '@reactful/commons'
import save from './generate'
import plugins from '../plugs'
import Zlib from 'zlib'
import "@reactful/prototypes"

const intervals = [] as any[]
const { renders } = env.settings
const NOT_FOUND_INDEX_HTML = `not fould index.html in /routes`

export default async function(only: boolean): Promise<true> {
   log.insert(`\nBUILDING...`, "FG_YELLOW")

   await cleanupFolders()   

   const done = []   
   const html = await new File(INDEX_HTML_URL)
      .load(NOT_FOUND_INDEX_HTML)

   await preValidation()   

   for (const [path, item] of await folder(only)) {
      if (!item || !path) continue

      const args = { html, item, path }
      const type = typeof item == "function" ? "JSX" 
                 : path.endsWith(".md") ? "MD" 
                 : "HTML"
                 
      await save(args, type, done)
   }

   await createBundle(html, save) 

   return true
}

async function createBundle(html: string, save: ISaver) {    
   log.insert(`\nBUNDLING...`, "FG_YELLOW")

   env.FLAGS.log = true 
   env.FLAGS.build = true 

   await createCliteSideScripts()   
   await saveEntryScriptForBundle()

   const built = await Bun.build({ 
      external: ['jsdom','bun', 'os'],
      entrypoints: [BUNDLE_TS], 
      minify: env.MINIFY,
      target: "browser",
      plugins, 
   })   

   if (!built.success) throw errors(built.logs)

   const code = await built.outputs[0].text()
   const file = env.MINIFY ? await Zlib.deflateSync(code) : code
   const path = `${Path.cwd}/builds/bundle.${env.MINIFY ? 'zip' : 'js'}`

   await Bun.write(path, file)

   // if (env.MINIFY) {
   //    const addPathCode = x => x
   //       .replace('// PATH HERE!!!', 
   //          `const path = '${path}';\n`)

   //    const zipPath = `${Path.builds}/zipped.js`
   //    const zipCode = await new File(zipPath)
   //       .load().then(addPathCode)

   //    await Bun.write(ZIPPED_JS, zipCode)
   // }

   env.FLAGS.build = false
   
   await bundleValidation()
   await periodicRebuilds(html, save)
}

async function periodicRebuilds(html: string, save: ISaver) {
   intervals.forEach(t => clearInterval(t))

   const renderOf = jsx => ({ item: jsx.call, html, path:'' })
   const periodics = renders.filter(r => r.mode == "periodic")

   const build = async (render: Render) =>
      await save(renderOf(render), "JSX")

   for (const periodic of periodics) {
      const time = periodic.time
      const call = () => build(periodic)
      const bind = setInterval(call, time)
      intervals.push(bind)
   }
}

async function bundleValidation() {   
   const ext = env.MINIFY  ? 'zip' : 'js'

   const fail = `\n\nServer-side content inside bundle.${ext}`
   const file = new File(`${Path.cwd}/builds/bundle.${ext}`)
   const size = file.size.toString().split(".")[0].toNumber().format(true)
   const text = await file.load().then(x => x || '')
   const line = text.split('\n').length.format(true)
   
   log.itemfy(`bundle.${ext}`)
   log.append(`${size} kb`, "FG_GRAY")
   log.append(` | `)
   log.append(`${line} lines`, "FG_GRAY")   
   log.append('\n')

   if (text.includes("Bun.plugin")) throws(fail, import.meta)
   if (text.match(/['"]use server[;]*['"]/)) console.error(fail);
}

function errors(logs: (BuildMessage | ResolveMessage)[]) {
   const list = ['\n\n !!!!!!! ==== REACTIVE build errors ==== !!!!!!!']

   for (const log of logs) {
      const line = log.position?.line
      const cols = log.position?.column
      const file = log.position?.file
      const text = log.message

      list.push(`- ${text} in ${file} (${line},${cols})`)
   }

   return list.join('\n')
}