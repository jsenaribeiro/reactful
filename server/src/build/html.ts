"use server"

import { File } from '../extra'
import { renderToString } from 'react-dom/server'
import { env, Path, response } from '@reactful/commons'

const LINK_COMPONENT_TYPE = /<link.+?type\s*=\s*['"]\s*component\s*['"]/i
const LINK_COMPONENT_HREF = /<link.+?href\s*=\s*['"]\s*(.+)\s*['"]/gmi
const LINK_COMPONENT_NAME = /<link.+?rel\s*=\s*['"]\s*(.+)\s*['"]/i
const BODY_REGEX = /<body.+?>([\s\S]+)<\/\s*body\s*>/
const HEAD_REGEX = /<head.+?>([\s\S]+)<\/\s*head\s*>/
const HTML_REGEX = /<html.+?>([\s\S]+)<\/\s*html\s*>/

const settings = env.settings

export async function HTMLizer(request: Request) {
   var html = await new File(request.url).load()
   var HTML = await new File(`${Path.routes}/index.html`)
   var name = new File(request.url).name.split('.')[0]

   const hasComponent = !!html.match(LINK_COMPONENT_TYPE)
   html = hasComponent ? await transformFromJSX(name, html) : html

   const [outerHtml, innerHtml] = html.match(HTML_REGEX) || [] as string[]
   const [outerHead, innerHead] = html.match(HEAD_REGEX) || [] as string[]
   const [outerBody, innerBody] = html.match(BODY_REGEX) || [] as string[]

   if (outerHtml) html = html.replace(outerHtml, innerHtml)
   const headString = outerHead ? innerHead : ''
   const bodyString = outerBody ? innerBody : ''

   const JSDOM = await import('jsdom').then(x => x.JSDOM)
   const document = new JSDOM(HTML).window.document as Document
   
   document.head.innerHTML += headString
   
   const outlet = document.body.querySelector(settings.queryId)
   if (outlet) outlet.innerHTML = bodyString

   const result = document.documentElement.innerHTML

   return response(200, result, "text/html")
}

// get transpile from bun
// <link rel="Counter" type="component/jsx" href="components/counter.tsx">
async function transformFromJSX(name: string, html: string) {
   const imports = [] as { url: string, res: string }[]

   for (const match of html.matchAll(LINK_COMPONENT_HREF)) {
      const [all, url] = match
      const [ALL, tag] = all.match(LINK_COMPONENT_NAME) || []

      const file = url.split('/').at(-1) || ''
      const fileName = file.split('.').at(0) || ''

      url && imports.push({ url, res: tag ? `{ ${tag} }` : fileName })

      html.replace(ALL || all || '', '')
   }

   const code = `
      import React from 'react'
      ${imports.map(x => `import ${x.res} from '${x.url}'\n`)}
      export function ${name} () { return ${html} }`

   const path = `${Path.builds}/${name}.tsx`

   await new File(path).save(code)

   const jsx = await import(path).then(x => x[name])

   return renderToString(jsx)
}