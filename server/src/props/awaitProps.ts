import React from "react"
import '@reactful/extensions'
import { JSXON, env } from "@reactful/commons"

type Props = record & { await: (props, params) => Promise<RRE> }

const INVALID_AWAIT_PROPS = '[await] props must be functional component Promise'

export const awaitProps: Proper = function(props: Props, params: Params) {
   if (!props.await || env.is("SERVER")) return props
   
   if (typeof props.await != "function" || !props.await.isAsync()) {
      console.warn(INVALID_AWAIT_PROPS)
      return props
   }

   props.await(props, params.ioc).then(function(jsx) {
      props.children = jsx
      env.settings.binding.fresh()
   })

   props.await = undefined
   
   return props
}