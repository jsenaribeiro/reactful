import { env } from '@reactful/commons'

const charsets = ["UTF-8", "UTF-16"]

export function seo(title: string, charset: "UTF-8"|"UTF-16"): Decorator<RFC>
export function seo(title: string, metadata: MetaTags): Decorator<RFC>
export function seo(title: string, description: string): Decorator<RFC>
export function seo(title: string, metadata: string|MetaTags): Decorator<RFC> {
   const isString = typeof metadata === "string"
   const isCharSet = isString && charsets.includes(metadata)

   if (isString) return seo(title, { description:metadata })
   if (isCharSet) return seo(title, { charset: metadata })   

   return function(meta: ImportMeta, call: RFC) {
      const name = call.name
      const info = { ...metadata, title }
      const path = new URL(meta.url).pathname

      env.set("meta", path, name || "default", info)

      return call
   }
}