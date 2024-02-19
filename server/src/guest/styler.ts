"use client"

import { StyleHTMLAttributes } from "react"
import { env, JSXON } from "@reactful/commons"

const settings = env.settings

type RRE = React.ReactElement<any, string>
type CSS = JSXProps|StyleHTMLAttributes<HTMLStyleElement>

export function styler(node: RRE, path: string) {
   if (!node || !path || typeof node.type != 'string') return node   
   const child = createElementFromJSX(node)
   const style = { ...node.props.style }

   for (const rule of getCssRules(path).map(x => x)) {
      if (rule instanceof CSSStyleRule == false) continue     
      if (!child.matches(rule.selectorText)) continue

      for (let index = 0; index < rule.style.length; index++) {
         const field = rule.style.item(index)
         const value = rule.style.getPropertyValue(field)
         const label = fromKebabCaseToCamelCase(field)
         if (style[label] || !value) continue
         else style[label] = value.toString()         
      }
   }

   return style
}

function createElementFromJSX(node: RRE): HTMLElement {
   const htmlString = JSXON.htmlfy(node)
   const div = document.createElement('div')
   div.innerHTML = htmlString.trim()
   return div.firstChild as HTMLElement;
 }

function fromKebabCaseToCamelCase(field: string) {
   for (const match of field.matchAll(/-\w/gm)) {
      const [oldName] = match; if (!oldName) continue
      const newName = oldName.replace("-", "").toUpperCase()      
      field = field.replace(oldName, newName)
   }
   
   return field
}

function getCssRules(src: string) {
   const stylers = settings.stylers || settings.stylers

   const styleSheets = (stylers[src] || [])
      .map(parseStyleSheetText)
      .flatMap(x => [...x.cssRules])

   return styleSheets
}
   
function parseStyleSheetText(text: string) {
   const css = new CSSStyleSheet()
   css.replaceSync(text)
   return css
}   