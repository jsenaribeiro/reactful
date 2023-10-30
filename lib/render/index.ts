/** @module Clonning */

import React from "react"
import { emptyCSS } from "./shared"
import { cloneChildren } from "./children"

/** render handling introspection managed by framework */
export const cloner = (children: React.ReactNode) => 
      cloneChildren(children as any, 0, emptyCSS)  
