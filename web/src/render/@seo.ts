import { env, Path } from '@reactful/commons'

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
      const key = call.name
      const seo = { ...metadata, title }
      const url = new Path(meta.url).href

      env.set("meta", url, key || "default", seo)

      return call
   }
}