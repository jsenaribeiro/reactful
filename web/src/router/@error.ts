import { Path } from '@reactful/commons'

export function error(component: Failure): Decorator<EFC> {
   return function(meta: ImportMeta, call: EFC) {
      const path = new Path(meta).path

      call.metadata ||= {
         fail: component,
         name: call.name,
         path: path,
      }

      return call
   }
}