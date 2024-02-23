import React from "react"
import '@reactful/extensions'
import { JSXON, env } from "@reactful/commons"

type Props = record & { await: () => Promise<RRE> }

const INVALID_AWAIT_PROPS = '[await] props must be functional component Promise'
const IS_CLIENT_SIDE = !!globalThis.document

export const awaitProps: Proper = function(props: Props, params: Params) {
   if (!props.await || IS_CLIENT_SIDE) return props
   
   if (typeof props.await != "function" || !props.await.isAsync) {
      console.warn(INVALID_AWAIT_PROPS)
      return props
   }

   env.set("wait", "*", params.uid.toString(), JSON.scriptify(props.await))

   props.await = undefined
   
   return props
}