import { env } from '@reactful/commons'
import { GUID, PROXY } from '@reactful/commons'

const { binding } = env.settings

/** create a modular orbital state 
 * @param {object} value initial state object */
export function useStore<T extends object = record>(value: T): record {
   const index = ++binding.store.count
   const state = binding.store.state
   const exist = !!state[index]

   if (exist && state[index][PROXY]) return state[index]   
   else state[index] = createProxy(value, index)
   return state[index]
}

function createProxy(store: any, index: number) {
   store[GUID] = index
   
   return new Proxy(store, {
      get(refer, field) {
         if (field==PROXY) return true
         else return refer[field]
      },

      set(refer, field, value) {
         refer[field] = value

         const refresh = () => refreshing(index)

         binding.timer && clearTimeout(binding.timer)
         binding.timer = setTimeout(refresh, 33)

         return true
      }
   })
}

function refreshing(index: number) {
   const components = binding.store.react[index]
   for (const component of (components as any[]))
      if (typeof component['fresh'] == 'function')
         setTimeout(component.fresh, 11)
}