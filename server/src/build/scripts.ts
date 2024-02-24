"use server"

import { Path, File, logger } from '../extra'
import { env, GLOBAL_KEY, throws } from '@reactful/commons'

const settings = env.settings
const SETTINGS = 'globalThis[GLOBAL_KEY]'

export async function createCliteSideScripts() {  
   const withNoFunction = x => ([ field ]: any) => typeof x[field] != "function"
   const removeFunctions = x => Object.parse(x).filter(withNoFunction(x)).toObject()
   const isNotFailure = (x: { path: string }) => env.settings.faileds.some(y => y.href != x.path)
   const isNotWaitTypeOrFailure = x => x.type != "wait" && isNotFailure(x)

   const rootTag = `queryId:'${settings.queryId}'`
   const renders = settings.renders.map(removeFunctions)
   const caching = settings.caching.filter(isNotWaitTypeOrFailure)
   const scripts = `
      const GLOBAL_KEY = ${JSON.scriptify(GLOBAL_KEY)}
      const process = { env: ${JSON.scriptify(process.env)} }

      ${SETTINGS} ||= { ${rootTag} }
      ${SETTINGS}.renders=${JSON.scriptify(renders)};
      ${SETTINGS}.caching=${JSON.scriptify(caching)};
      ${SETTINGS}.context=${JSON.scriptify(settings.context)};
      ${SETTINGS}.propers=${JSON.scriptify(settings.propers)};
      ${SETTINGS}.stylers=${JSON.stringify(settings.stylers)};
      ${SETTINGS}.folders=${JSON.stringify(settings.folders)};
      ${SETTINGS}.binding=${JSON.stringify(settings.binding)};`
      
   await new File(`${Path.builds}/shared.js`).save(scripts)   
   await scriptsLogging()   
}

export async function saveEntryScriptForBundle() {
   const modules = `${Path.npm}/@reactful/server/npm/guest/client`
   const variable = (url) => `${SETTINGS}.clients['${url}']`

   const importer = (url: string, tag: string) => 
      `\nimport('${url}').then(x => x.${tag})` + 
      `.then(x => ${variable(url)} = x);\n`

   const clients = await Object
      .entries(settings.clients)
      .reduce(reducer, Promise.resolve(''))

   const startup = `\nimport { GLOBAL_KEY } from '@reactful/commons';
      await import('${modules}').then(x => x.default());
      ${SETTINGS}.clients ||= {}`

   async function reducer(text: Promise<string>, [url, cli]: [string, ClientInfo]) {
      const [module, content] = [await import(url), await text]
      const member = module[cli.tag] ? cli.tag : module['default'] ? 'default' : ''
      const starts = `\n${SETTINGS}.clients['${url}'] = { off:${cli.off}, tag:'${cli.tag}' }`
      const append = content + starts + importer(url, member)
      const failed = 'Not found route component in ' + url

      return member ? append : throws<string>(failed, import.meta)
   }

   const code = `${startup}\n${clients}\n`.replace(/^[ ]+/gm, '')  

   await new File(`${Path.builds}/bundle.ts`).save(code)
}

async function scriptsLogging() {   
   const path = `${Path.builds}/shared.ts`
   const file = new File(path)
   const size = file.size.toString().split(".")[0].toNumber().format(true)
   const text = await file.load().then(x => x || '')
   const line = text.split('\n').length.format(true)
   const name = (path.split('/').at(-1) || '').toLowerCase()
   
   logger.itemfy(name)
   logger.append(`${size} kb`, "FG_GRAY")
   logger.append(` | `)
   logger.append(`${line} lines`, "FG_GRAY")
}
