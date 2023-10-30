/** @module Clonning */

import React from "react"
import { cloneChild } from "./child"
import { Children, CSS } from "./shared"

export const cloneChildren = (children: Children, guid: number, css: CSS) =>      
   ! children ? children
   : React.Children.map(children, (child, i) =>
      ! React.isValidElement(child) ? child
      : (child as any).props.hidden === true ? undefined
      : React.cloneElement(cloneChild(child, guid + i, css), 
         cloneChildren((child as any).props.children, guid + i, css)));