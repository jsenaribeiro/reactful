"use server"

import { env, JSXON, response } from "@reactful/commons"
import { stream, isStream } from "./stream"
import { mergeHTML } from "../build"
import { parser } from '../serve'
import { Path } from "../extra"
import { ssg } from './static'
import { fallbackHTML } from "./fallback"

const settings = env.settings

export async function routing(request: Request)
export async function routing(route: string, start?: string)
export async function routing(route: Request|string, start = '') {
   if (route instanceof Request && !isRoute(route)) return undefined
   if (route instanceof Request) return routing(new Path(route.url).href)
   
   // @route : dynamic site generation (decorator)   
   const { call, href } = await env.let(route as RouteString)
   const html = call && await renderize(call, href)
   const HTML = html && await mergeHTML(call, href, html)
   
   if (HTML) return start 
      ? fallbackHTML(HTML, start, route)
      : response(200, HTML, "text/html")

   // dsg : dynamic site generation (folder)
   const rendering = settings.renders.find(x => x.href == href)
   const isDynamic = rendering?.mode == "dynamic"
   if (isDynamic) return await stream(href, "html", start)

   // ssg: static site generation (default)
   return await ssg(route, start)
}

// rendering JSX to HTML in each routing item
async function renderize(call: RFC, href: string) {   
   const node = await parser(call, href)
   const html = node && JSXON.htmlfy(node)
   return html
} 

const isRoute = (request: Request) =>
      isRequestRoute(request) 
   && isPathRoute(new Path(request.url))
   && request.url.equal(/\.[\w\d]+$/) == false
   && request.url.includes('?jsx=true') == false

const isRequestRoute = (request: Request) => isStream(request) == false

const isPathRoute = (path: Path) => 
       path.href.startsWith("/") 
   && !path.href.startsWith("/api/")
   && !path.href.startsWith("/assets/")
   && !path.href.equal(/\.[\w\d]+$/)