import { env, GUID } from '@reactful/commons'
import '@reactful/extensions'

export function state(value: any): Decorator<RFC> {
   return function(module: ImportMeta, caller: RFC) {
      if (env.is("SERVER")) return caller

      const index = value[GUID]
      const store = env.settings.binding.store

      store.react[index] ||= []
      store.react[index].push(caller)

      return caller
   }
}