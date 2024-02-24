import { env, PREFIX_ERROR } from '@reactful/commons'

export function route(href: URLString): Decorator<RFC> {
   if (!href) throw `${PREFIX_ERROR}empty @route(href)`   
   if (!href.match(/^\/[^ "]+$/)) throw `${PREFIX_ERROR}invalid @route(href)`   
   
   return function (meta: ImportMeta, call: RFC) {
      const [name, path] = [call.name, meta.url.replace('file://', '')]
      env.set("href", path, name, href, call) 
      return call
   }
}