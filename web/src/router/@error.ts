export function error(component: Failure): Decorator<EFC> {
   return function(meta: ImportMeta, call: EFC) {
      const path = meta.url.replace('file://', '')

      call.metadata ||= {
         fail: component,
         name: call.name,
         path: path,
      }

      return call
   }
}