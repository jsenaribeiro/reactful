import { env } from '@reactful/commons'
import { InjectFunction, inject } from './inject'
import { RenderFunction, render } from './render'

interface ServerResult {
   inject: InjectFunction
   render: RenderFunction
}

/** reactful startup server bootstrap
 * @param {string} routes entry routes folder */
export function server(routes: `/${string}`): ServerResult

/** reactful startup server bootstrap
 * @param {string} routes entry routes folder 
 * @param {Settings} settings custom server settings */
export function server(routes: `/${string}`, settings: Partial<Settings>): ServerResult

export function server(routes: `/${string}`, settings?: Partial<Settings>) {
   if (settings) Object.merge(env.settings, settings)
   env.settings.folders.routes = routes  
   return { inject, render }
}