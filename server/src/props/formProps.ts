"use client"

import { onSubmitBinding, fixProps } from "./formBind"
import '@reactful/extensions'

export default ['data', 'bearer', 'validade', 'onFetch', 'onSubmit', 'onValidate']

export interface Props<T extends object = object> {
   data: T
   children?: any
   onFetch?: OnFetchEvent
   onSubmit?: OnSubmitEvent
   onValidate?: OnValidateEvent // custom post-validation
}

const IS_SERVER_SIDE = !globalThis.document

/** reactful forms as form[data] and children[bind] 
 * with RESTful actions and validation api */
export function formProps(props: Props, params: Params) {
   if (IS_SERVER_SIDE) return props
   if (params.tag !== "form") return props
   if (!Object.keys(props).includes("data")) return props

   const onSubmit = onSubmitBinding(props, params)

   return { ...fixProps(props), onSubmit }
}

