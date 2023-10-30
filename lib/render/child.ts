/** @module Clonning */

import { isTypeOf } from "./shared"
import { cloneElement } from "./element"
import { cloneFunctional } from "./function"

export const cloneChild = (child: any, guid: number, css: CSSStyleSheet) => 
      isTypeOf(child, "functional") ? cloneFunctional(guid, child) 
    : isTypeOf(child, "element", "fragment") ? cloneElement(guid, child, css)
    : child