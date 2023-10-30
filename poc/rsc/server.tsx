import React from "react"
import { renderToString } from "react-dom/server"
import webServerExpress, { static as staticFolder } from "express"
import { join } from "path"
import { HOST, PORT } from "./settings"
import fs from 'fs/promises'

console.debug = args => { }

const PRIMITIVES = ["string", "boolean", "number"]

const isReact = jsx => isReactSymbol(jsx?.$$typeof)
const isReactSymbol = value => value === Symbol.for("react.element")
const encode = (_, value) => isReactSymbol(value) ? "$" : value
const log = (...args) => { console.log("!!! ", ...args); return true }
const error = (...args) => { console.error(...args); return undefined }

const express = webServerExpress()

express.use(staticFolder("./builds"))

express.get("/:page", async (req, res) => {
   const modulePath = `./pages/${req.params.page}.js`
   const resolved = await import(modulePath).then(x => x.default)
   const Component = resolved?.default || resolved   
   const tree = await treefy(<Component {...req.query}  />)
   const json = JSON.stringify(tree, encode)

   if (req.query.jsx === "") return res.end(json)

   const rendered = `${renderToString(tree)}
      <script>const exports = {}</script>
      <script>window.__initialMarkup=\`${json}\`</script>
      <script src="/client.js" type="module"></script>`

   const path = join(process.cwd(), 'index.html')
   const html = await fs.readFile(path, 'utf-8')

   return res.end(html.replace('<!-- content -->', rendered))
})

function treefy(jsx) {
   try { return nodeOf(jsx) }
   catch(e) {  
      console.error('TREEFY', e)
      return undefined
   }''
}

const typeOf = jsx => 
   ! jsx ? "unvailable"
   : PRIMITIVES.includes(typeof jsx) ? "primitive"
   : Array.isArray(jsx) && !!jsx?.length ? "children"
   : isReact(jsx) && typeof jsx.type === "string" ? "element"
   : isReact(jsx) && typeof jsx.type === "function" ? "component"
   : isReact(jsx) && jsx.type === Symbol.for('react.fragment') ? "fragment"
   : typeof jsx === "object" && !isReact(jsx) ? "object"
   : isReact(jsx) ? "attachment"
   : "unvailable"

const nodeOf = async jsx =>
     typeOf(jsx) == "unvailable" ? {}
   : typeOf(jsx) == "primitive" ? jsx
   : typeOf(jsx) == "element" ? await element(jsx)
   : typeOf(jsx) == "fragment" ? await element(jsx)
   : typeOf(jsx) == "children" ? await children(jsx)
   : typeOf(jsx) == "component" ? await component(jsx)
   : typeOf(jsx) == "attachment" ? await subComponent(jsx)
   : typeOf(jsx) == "object" ? stringify(jsx)
   : error("nodeOf", typeOf(jsx), jsx?.type, jsx) 

const children = async jsx => await Promise.all(jsx.map(treefy))

async function stringify(jsx) { // «» ⁅⁆   
   return JSON.stringify(jsx)
      .replace(/\{/g, "\{ ")
      .replace(/\}/g, " \}")
      .replace(/","/g, '", "')
      .replace(/"([\w\d_-]+?)":([0-9]+?)/g, '$1: $2')
      .replace(/"([\w\d_-]+?)":"/g, '$1: "')
}

async function element(jsx) {
   const children = await treefy(jsx.props?.children)
   return { ...jsx, props: { ...jsx.props, children } }
}

async function component(jsx) {      
   const children = await treefy(jsx.props?.children)
   const props = { ...jsx.props, children }
   const tag = await jsx.type(props)

   return await treefy(tag)
}

async function subComponent(jsx) {
   const mapper = async ([k, v]) => [k, await treefy(v)]
   const awaits = Object.entries(jsx).map(mapper)
   const synced = await Promise.all(awaits)

   console.log('subComponent', jsx, synced )

   return Object.fromEntries(synced)
}

express.listen(PORT, () => console.log(`Listening on ${HOST}`))
