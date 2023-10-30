/** @module Clonning */

import { ModuleCSS } from "../sharing"
import { emptyCSS } from "./shared"

export function cloneStyle(child) {
   const sheetCSS = new CSSStyleSheet()   
   const cssPaths = globalThis['__CSS__'] as ModuleCSS[]
   const dirChild = child['_source']['fileName'].toLowerCase()
   const cssFound = (cssPaths || []).find(x => dirChild.includes(x.pathJSX))

   if (!cssFound) return emptyCSS
   else sheetCSS.replace(cssFound.textCSS)
   return sheetCSS
}