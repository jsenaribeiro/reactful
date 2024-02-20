import { env } from '@reactful/commons'
import { RenderFunction, render } from './render'

export interface InjectResult {
   inject: InjectFunction
   render: RenderFunction
}

export interface InjectFunction {
   (directive: Proper): InjectResult
}

/** inject a custom props directive */
export function inject(directive: Proper): InjectResult {
   if (!directive || typeof directive != "function")
      throw `Invalid directive injection in server.inject(...)`

   else env.settings.propers.push(directive)

   return { inject, render }
}