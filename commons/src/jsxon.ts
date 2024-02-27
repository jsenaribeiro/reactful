import { env } from './env'
import { throws } from './throw'
import { renderToString } from 'react-dom/server'
import { PRIMITIVES } from './constants'

const map = [
   { key: "$RE", for: Symbol.for("react.element") },
   { key: "$RF", for: Symbol.for("react.fragment") }
]

const deserializer = (_, val) => map.find(x => x.key == val)?.for || val
const serializer = (_, val) => map.find(x => x.for == val)?.key || val

/** encapuslates renderToString from react-dom/server */
function htmlfyJSX(node: RRE): string {
   if (!node) return ''

   try {
      env.FLAGS.errors = false

      const wrap = wrapper(node)
      const html = renderToString(wrap)   
      
      env.FLAGS.errors = true
   
      return html
   } 
   catch(ex: any) {
      return throws<string>(ex, import.meta)
   }
}

function wrapper(value: RRE|any[]|any) {
   if (typeof value?.type != "function") return value
   if (Array.isArray(value)) return value.map(wrapper)

   const props = value?.props
   const feeds = env.settings.context
   const basic = PRIMITIVES.includes(typeof value)
   const ended = typeof value?.type == "string"
   const typed = typeof value?.type
   const named = value?.type?.name

   if (!value || ended || basic) return value
   if (typed != "function" || named == "retype") return value

   function retype(p, f){
      try {
         const child = value.type({ ...props, ...p }, { ...feeds, ...f})            
         const split = Object.entries(child?.props || { })
            .map(([key, obj]) => [key, wrapper(obj)])
   
         return { ...child, props: Object.fromEntries(split) }
      }
      catch(ex) {
         throws(ex, import.meta)
      }
   }

   return { ...value, type: retype }
}


export const JSXON = {
   parse: (json: string): JSX => JSON.parse(json, deserializer) || {},
   htmlfy: htmlfyJSX,
   stringify: (jsx: JSX, tabs?: number): string =>
      JSON.stringify(jsx, serializer, tabs)
         .replaceAll("$$typeof", "$typeof")
}