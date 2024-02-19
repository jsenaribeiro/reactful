"use server"

import { File } from '../extra'
import { throws } from '@reactful/commons'
import { BUNDLE_TS, SHARED_JS } from './shared'
import { env, GLOBAL_KEY } from '@reactful/commons'
import { logger as log } from '../extra'

const settings = env.settings
const SETTINGS = 'globalThis[GLOBAL_KEY]'

export async function createCliteSideScripts() {  
   const withNoFunction = x => ([ field ]: any) => typeof x[field] != "function"
   const removeFunctions = x => Object.parse(x).filter(withNoFunction(x)).toObject()
   const isNotFailure = (x: { path: string }) => env.settings.faileds.some(y => y.href != x.path)

   const rootTag = `queryId:'${settings.queryId}'`
   const renders = settings.renders.map(removeFunctions)
   const caching = settings.caching.filter(isNotFailure)
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
      
   await new File(`${SHARED_JS}`).save(scripts)   
   await scriptsLogging()   
}

export async function saveEntryScriptForBundle() {
   const variable = (url) => `${SETTINGS}.clients['${url}'].jsx`
   const importer = (url, tag) => `\nimport('${url}').then(x => x.${tag})
                                    .then(x => ${variable(url)} = x);\n`

   const starting = `\nimport { GLOBAL_KEY } from '../shared/constants'
                     await import('./client.ts').then(x => x.default());
                     ${SETTINGS}.clients ||= {}`

   const clients = await Object.entries(settings.clients)
                               .reduce(reducer, Promise.resolve(''))

   async function reducer(text: Promise<string>, [url, cli]: [string, ClientInfo]) {
      const [module, content] = [await import(url), await text]
      const member = module[cli.tag] ? cli.tag : module['default'] ? 'default' : ''
      const starts = `\n${SETTINGS}.clients['${url}'] = { off:${cli.off}, tag:'${cli.tag}' }`
      const append = content + starts + importer(url, member)

      return member ? append : throws<string>('Not found route component in ' + url, import.meta)
   }

   const code = `${starting}\n${clients}\n`.replace(/^[ ]+/gm, '')  

   await new File(BUNDLE_TS).save(code)
}

async function scriptsLogging() {   
   const file = new File(`${SHARED_JS}`)
   const size = file.size.toString().split(".")[0].toNumber().format(true)
   const text = await file.load().then(x => x || '')
   const line = text.split('\n').length.format(true)
   const name = (SHARED_JS.split('/').at(-1) || '').toLowerCase()
   
   log.itemfy(name)
   log.append(`${size} kb`, "FG_GRAY")
   log.append(` | `)
   log.append(`${line} lines`, "FG_GRAY")
}
