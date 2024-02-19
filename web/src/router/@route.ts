import { PREFIX_ERROR } from '@reactful/commons'
import { env, Path } from '@reactful/commons'

const IS_CLIENT_SIDE = !!global.document

function routeDecorator(href: URLString): Decorator<RFC> {
   if (!href && href === '') throw `${PREFIX_ERROR}empty @route(href)`   
   if (!href.match(/^\/[^ "]+$/)) throw `${PREFIX_ERROR}invalid @route(href)`   
   
   return function (meta: ImportMeta, call: RFC) {
      const [name, path] = [call.name, new Path(meta).path]
      env.set("href", path, name, href, call) 
      return call
   }
}

export const route = IS_CLIENT_SIDE ? (...args) => (...params) => null : routeDecorator