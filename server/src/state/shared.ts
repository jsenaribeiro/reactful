import { env, PROXY } from '@reactful/commons'

const IGNOREDS = [ "await", "route", "children" ] as any[]
const { binding } = env.settings
const DELAY_RENDER = 9

export function createProxyState<T>(store: any)
export function createProxyState<T>(store: any, index: number)
export function createProxyState<T>(store: any, index?: number) {   
   if (store[PROXY]) return store

   const refresh = () => typeof index == 'number' 
       ? refreshOne(index) : refreshAll()

   return new Proxy(store, {
      get(refer, field) { 
         if (field==PROXY) return true
         else binding.visit[index || 0] = true
         return refer[field] 
      },

      set(refer, field, value) {                  
         refer[field] = value
         
         if (IGNOREDS.includes(field)) return true
         if (typeof value == "function") return true

         binding.timer && clearTimeout(binding.timer)
         binding.timer = setTimeout(refresh, DELAY_RENDER)
         
         return true
      }
   }) 
}

function refreshOne(index: number) {
   const value = new Date().getTime()
   const react = binding.react[index]
   react(value)
}

export async function refreshAll() {
   for (const react of Object.values(binding.react)) {
      await new Promise(resolve => setTimeout(resolve, 1))
      react(new Date().getTime())
   }   
}