/** @module Clonning */

import React from "react"
import { CSS } from "./shared"

export function cloneProps(child, guid, tag, css?: CSS) { 
   const newProps = React.propers.toArray()
      .filter(x => child.props.hasKey(x.field))
      .map(x => x.value(child.props, guid, tag))
      .toObject({ ...child.props, guid, tag })

     
   const cssStyles = { }, nowStyles = newProps.style

   if (css) {
      const node = document.createElement(child.type) as HTMLElement  
      node.className = child.props.className   
      node.id = child.props.id 

      for (const rule of css.cssRules as any) 
         if (node.matches(rule['selectorText']))
            Object.keys(rule.style)
               .filter(k => !!rule.style[k])
               .filter(k => isNaN(parseInt(k)))
               .map(k => cssStyles[k] = rule.style[k])
   }

   return { ...newProps, style: { ...nowStyles, ...cssStyles }}
}