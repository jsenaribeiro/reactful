/** @module Clonning */

export type ReactType = "classic"|"functional"|"fragment"|"element"|"error"
export type Child = React.ReactComponentElement<any>
export type Children = Iterable<React.ReactNode>
export type CSS = CSSStyleSheet

export const isTypeOf = (child, ...types: ReactType[]) => 
   types.includes(typeOf(child))

export const typeOf = (child: React.ReactElement): ReactType =>
     child?.type?.toString().startsWith("class") ? "classic"
   : child?.type?.toString().includes('fragment') ? "fragment"
   : typeof child?.type === "function" ? "functional"
   : typeof child?.type === "string" ? "element"
   : "error"

export const emptyCSS = new CSSStyleSheet()