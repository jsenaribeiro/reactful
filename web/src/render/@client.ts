import React from 'react'
import { env, JSXON } from '@reactful/commons'

const rce = React.createElement
const IS_CLIENT_SIDE = !!globalThis.document

export const client = (stateful: boolean): Decorator<RFC> => (meta, call) => {
   if (!meta || !call || IS_CLIENT_SIDE) return call

   const path = meta.url.replaceAll('file://', '')      
   const html = { __html: JSXON.htmlfy(rce(call)) } 
   const prop = { dangerouslySetInnerHTML: html }
   const attr = { ...prop, src: path, tag: call.name, hidden: true }

   env.settings.clients[path] = <ClientInfo> {
      off: stateful == false,
      tag: call.name || 'default'
   }

   return (() => rce('jsx', attr)) as RFC
}