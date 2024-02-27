import React from "react"
import '@reactful/extensions'
import { JSXON, env } from "@reactful/commons"
import { Path } from "../extra"
import { streamJSX } from "../guest/stream"

type Props = record & { await: (props, params) => Promise<RRE> }

const LACK_OF_METADATA = '[await] props requires an exported component'
const INVALID_AWAIT_PROPS = '[await] props must be functional component'
const NO_ASYNC_AWAIT_PROPS = '[await] props must be a Promise'

function warn(message: string): true { console.warn(message); return true }

// transform [await] in componentPath to send to client-side for stream JSX
export const awaitProps: Proper = function(props: Props, params: Params) {
   const asyncComponent = props.await as any as EFC
   const componentPath = asyncComponent?.metadata?.path
   const isNotFunction = typeof asyncComponent != "function"   

   if (env.is("CLIENT") || !asyncComponent) return props
   if (isNotFunction) return warn(INVALID_AWAIT_PROPS) && props
   if (!componentPath) return warn(LACK_OF_METADATA) && props
   if (!asyncComponent.isAsync()) return warn(NO_ASYNC_AWAIT_PROPS) && props

   const clientSideAwaitProps: any = JSON.stringify({
      name: (props.await.name || 'default').replace(/\$$/, ''),
      path: componentPath
   })

   return (props.await = clientSideAwaitProps) && props
   
   return props
}