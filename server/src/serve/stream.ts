"use server"

import { File } from "../extra"
import { mergeHTML } from "../build"
import { queriefy, response, Path, JSXON } from "@reactful/commons"
import  { parser } from './parser'

type ImportType = "component"|"stream"|"html"

export const isStream = (request: Request) => 
   Object.keys(queriefy(request)).includes("jsx")

export async function stream(request: Request)   
export async function stream(route: string, type: ImportType)
export async function stream(params: string|Request, type: ImportType = "html") {  
   if (params && params instanceof Request) 
   if (params && params instanceof Request) 
      return isStream(params as Request) 
         ? stream(new Path(params.url).href, "stream")
         : undefined

   const value = params as string
   const route = typeof params == 'string' ? params : '/'
   const named = `${Path.routes}${params}.tsx`
   const index = `${Path.routes}${params}/index.tsx`
   const found = await new File(value).exists() ? value
               : await new File(named).exists() ? named
               : await new File(index).exists() ? index
               : undefined   

   if (!found) return response(404, 'not found: ' + params)

   const mergingHTML = ([jsx, html]) => route ? mergeHTML(jsx, route, html) : ''
   
   const importDefault = x => x.then(x => x.default)
      .then(x => parser(x, value))

   const streamPipeline = x => importDefault(x)
      .then(jsx => jsx ? JSXON.htmlfy(jsx) : '')

   const servingPipeline = x => importDefault(x)
      .then(jsx => [jsx, JSXON.htmlfy(jsx)])
      .then(mergingHTML)

   const pipeline = type == "stream" ? streamPipeline
                  : type == "html" ? servingPipeline
                  : importDefault

   const data = await pipeline(import(found))
   const mime = type == "html" ? "text/html" : "text/plain"

   return response(200, data, mime)
}