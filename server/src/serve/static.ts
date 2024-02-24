"use server"

import maker from '../build/maker'
import { File, Path } from "../extra"
import { env, response } from "@reactful/commons"
import { fallbackFile, fallbackURL } from './fallback'

const INDEX = '/index'

interface Fail { href: string; call: RFC; }

export async function ssg(href: string, init = '', last = '') {
   const link = ((href || INDEX) + last).replaceAll('//', '/')
   const fail = env.settings.faileds.find(x => x.href == link)

   if (fail) return await failure(fail, env.settings.faileds)   
   
   const path = `${Path.builds}${link}.html`
   const file = new File(path)  
   const have = await file.exists() 

   return have && init ? await fallbackFile(file, init, href)
        : have ? new Response(file.blob)
        : last ? await fallbackURL(href, init)
        : await ssg(href, init, INDEX)
}

async function failure(fail: Fail, errs: Fail[]) {   
   const [ path, item ] = [ fail.href, fail.call ]
   const html = await maker({ path, item }, "JSX")
   
   for (let i = 0; i < errs.length; i++) 
      if (errs[i].href == path) 
         delete errs[i]

   env.settings.faileds = errs.distinct()
   return response(200, html, "text/html")   
}