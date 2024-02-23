"use client"

import { createRoot } from 'react-dom/client'
import { JSXON, env } from '@reactful/commons'
import { parser } from './parser'

const settings = env.settings as ClientSettings

export default async function() {
   if (!window.document) return
   
   settings.initial = document.title

   window.addEventListener("click", onClick)
   window.addEventListener('popstate', onBack)   
   
   partialHydrationClientSideOnly()

   const query = settings.queryId
   const cache = document.querySelector(query)?.innerHTML || ''

   if (!env.get("html", location.pathname))
      env.set("html", location.pathname, encodeURI(cache) as HTMLString)

   const fallback = globalThis.FALLBACK_ROUTE as { fix:string, try:string }
   
   if (fallback) {
      console.error(`Not found server-side route for ${fallback.try}`)
      window.history.pushState(null, '', fallback.fix)
   }
}

function onBack(e: any) { onRoute(location.pathname) }

function onClick(e: any) {
   if (e.target.tagName != "A") return
   else e.preventDefault()

   const begin = location.origin
   const fixed = decodeURI(e.target.href)
   const route = fixed.replace(begin, '')
                      .replaceAll('`','')
                      .replace(/\/\//, '/')

   window.history.pushState(null, '', route)

   onRoute(route)
}

async function onRoute(route: string){   
   route = decodeURI(route)

   const cache = env.get("html", route)
   const inner = cache && decodeURI(cache)
   const lazed = env.get("lazy", route, "default")
   const title = env.get("meta", route, "default")?.title
   const model = settings.renders.find(x => x.href == route)   
   const entry = document.querySelector(settings.queryId)!
   
   if (model?.mode == "dynamic") {
      lazed && (entry.innerHTML = lazed)
      await streamJSX(entry, route)
   }

   else if (inner) entry.innerHTML = inner
   else return location.href = route

   document.title = title || settings.initial
   
   await partialHydrationClientSideOnly()
}

const awaiting = async delay => new Promise(resolve => setTimeout(resolve, delay))

async function streamJSX(entry, route) {
   const response = await fetch(`${route}?jsx=true`)
   const textHTML = await response.text()
   entry.innerHTML = textHTML
}

async function partialHydrationClientSideOnly() {
   const querier = x => document.querySelectorAll<HTMLElement>(x)
   const clients = querier('jsx')
   const retries = querier('[retry]')

   await awaiting(99)
   
   clients.forEach(async function(elm) {
      try {
         const url = location.pathname
         const src = elm.getAttribute('src')!
         const cli = settings.clients[src] as ClientInfo
         const jsx = await parser(cli.jsx, src, url) 
         
         if (jsx) createRoot(elm).render(jsx)
         
         await awaiting(1500)
      }
      catch(ex) {
         console.warn(ex)
      }
   })

   await awaiting(99)

   retries.forEach(async function(node) {
      const entry = document.querySelector(settings.queryId)!
      const route = node.getAttribute('retry')
      await streamJSX(entry, route)
   })

   clients.forEach(x => x.hidden = false)   
   retries.forEach(x => x.hidden = false)

   for (const item of settings.caching) {
      if (item.type != "wait") continue
      
      const find = `[uid='${item.name}']`
      const node = document.querySelector(find)
      const func = eval(item.data)

      if (!node || !func) continue

      func().then(jsx => node.innerHTML = JSXON.htmlfy(jsx))
   }
}