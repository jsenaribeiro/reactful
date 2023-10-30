/** @module Clonning */

import React from "react"
import { Child } from "./shared"
import { refocusAfterOf } from "../sharing"
import { cloneChildren } from "./children"
import { cloneStyle } from "./style"
import { cloneProps } from "./property"

export function cloneFunctional(guid: number, child: Child) {
   const content = (React.scopeds[guid] = React.scopeds[guid] || {})
   const [ state, setState ] = React.useState(content)   

   const cloneNew = (props, guid: number) => ((p, s) => 
      child.type(p || { ...props, guid }, s || state.toProxy(setState)))()

   const type = () => {
      const newChild = cloneNew(child.props, guid)
      const stylings = cloneStyle(newChild)
      const children = cloneChildren(newChild.props.children, guid, stylings)
      const newProps = cloneProps(newChild, guid, child.type.name)

      return ({...newChild, props: { ...newProps, children }})
   }

   return refocusAfterOf(1) && ({...child, type })
}