"use client"

import { GLOBAL_KEY } from '@reactful/commons'
import { createProxyState, refreshAll } from './shared'
import { env } from '@reactful/commons'

const { binding } = env.settings
const clients: UrlMap<ClientInfo> = globalThis[GLOBAL_KEY]

export function useProps(react: SetState, child: FCE, path: string) { 
   const stateless = Object.keys(clients)
      .filter(k => (clients[k] as ClientInfo).off)
      .some(k => k == path)
      
   child.props = { ...child.props, uid: ++binding.count }
   
   if (stateless) return child.props      
   
   const index = child.type['UID'] ||= (++binding.index)
   const props = createProxyState(child.props, index) 

   binding.react[index] = react
   binding.state[index] ||= props
   binding.fresh = refreshAll
   
   child.type['fresh'] = () => react(new Date().getTime())

   return binding.state[index]
}