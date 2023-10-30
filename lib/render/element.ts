/** @module Clonning */

import { cloneChildren } from "./children"
import { cloneProps } from "./property"
import { CSS, Child } from "./shared"

export function cloneElement(guid: number, child: Child, css: CSS) {
   const props = cloneProps(child, guid, child.type, css)
   const children = cloneChildren(props.children, guid, css)

   return {...child, props: { ...props, children }}
}    