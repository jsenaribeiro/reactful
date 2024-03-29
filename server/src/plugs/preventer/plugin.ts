import { throws } from "@reactful/commons"
import { readFileSync, existsSync } from 'fs'
import { Path } from "../../extra"
import { Args } from "../shared"
import { env } from "@reactful/commons"

export default function(args: Args) {
   const CONTEXT = /\s*['"]use (client|server)['"]/
   const IMPORTS = /\s*import\s+.+from\s+['"](.+)['"]/gm
   const context = args.code.match(CONTEXT)?.at(1)

   if (!context) return args.code

   const pather = (path: string) => 
      new Path(path).resolve(path)

   const mapper = ([, path]: string[]) => 
      ! path?.match(/^[\.\\]/) ? []
      : [`${pather(path)}.ts`, `${pather(path)}.tsx`]

   const imports = args.code.query(IMPORTS, true).flatMap(mapper).flatMap(x => x)
   
   const failure = `A module with 'use ${context}' directive in ${args.path}`
      + ` imports a module with 'use ${context == 'client' ? 'server' : 'client'}'.`
      + ` The 'use' directives restricts import chaining to an specific side context.` 

   if (env.FLAGS.build && context == "server") throws(failure)
   
   for (const uri of imports) {
      if (existsSync(uri) == false) continue
      const text = readFileSync(uri, 'utf-8') || ''
      const side = text.match(CONTEXT)?.at(1) || ''
      side && side != context && throws(failure)
   }

   return args.code
}
