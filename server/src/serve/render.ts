import { serve } from "./asset"
import { stream } from "./stream"
import { routing } from "./router"
import { bundler } from '../build'
import { Path, logger } from '../extra'
import { env, response, SERVING } from '@reactful/commons'

export interface RenderFunction {
   (): Promise<void>
   (query: string): Promise<void>
}

/** starts the server from '#root' HTML element */
export async function render()

/** starts the server from query selector entry point  
 * @param {string} query query select for root element */
export async function render(query: string)

export async function render(query = '#root') {
   Path.startup() && await bundler(false)
   const port = parseInt(process.env.PORT || '3000')             
   logger.append(`\n${SERVING.place(port)}`, "FG_GREEN")    
   env.FLAGS.serve = true

   return Bun.serve({ 
      development: env.FLAGS.debug,
      port: process.env.PORT || port,
      async fetch(request: Request) {
         try {                
            env.settings['request'] = request         
            return await routing(request)
                || await stream(request)
                || await serve(request)
         } 
         catch(ex: any) {
            console.error('reactful', ex)         
            return response(500, ex.message || ex)
         }  
      }
   }) 
}