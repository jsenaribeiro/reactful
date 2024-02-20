"use server"

import CSS from 'css'
import { env, PRIMITIVES, JSXON } from '@reactful/commons'
import { JSDOM } from 'jsdom'

interface CSS { 
   type: string
   selectors: string[]
   declarations: CSS.Declaration[] 
}

const settings = env.settings

export function styler(jsx: RRE, src: string) {   
   try {
      const style = { }
      const child = wrapper(jsx)
      const htmlString = JSXON.htmlfy(child)
      const styles = settings.stylers[src] || []
      const [node] = new JSDOM(htmlString).window.document.body.childNodes

      if (!node || !styles.length) return child.props?.style || { }
   
      for (const css of styles.map(x => CSS.parse(x))) 
      for (const rule of css.stylesheet!.rules) {
         const { type, selectors, declarations } = rule as CSS.Rule
         if (type != "rule" || !selectors?.length || !declarations?.length) continue
         if (!selectors.some(x => node.matches(x))) continue
         
         for (const cssRule of declarations as CSS.Declaration[]) {
            if (!cssRule.property || !cssRule.value) continue
            style[cssRule.property] = cssRule.value
         }
      }
   
      return { ...style, ...child.props.style  }      
   }
   catch(ex: any) {
      console.error('reactful styler/server.ts')
      throw ex
   }
}

function wrapper(child: RRE|any[]|any) {
   if (Array.isArray(child)) return child.map(wrapper)

   const props = child?.props
   const feeds = settings.context
   const basic = PRIMITIVES.includes(typeof child)

   if (!child?.type || basic) return child
   if (child?.type != "function") return child

   function retype(p, f){
      const reducer = ([ key, obj ]) => [ key, wrapper(obj) ]
      const element = child.type({...props, p}, { ...feeds, ...f})            
      const entries = Object.entries(element.props).map(reducer)

      return { ...element, props: Object.fromEntries(entries) }
   }

   return { ...child, type: retype }
}