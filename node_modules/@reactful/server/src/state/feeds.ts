"use client"

import { env } from '@reactful/commons'
import { createProxyState } from './shared'

var timeout: any

const { context, binding } = env.settings

export function useFeeds(hook: SetState, href: string) {
   if (binding.ready) return context
   else env.let(href as RouteString)

   context.store = createProxyState(context.store)      
   binding.ready = true

   return context
}