declare global {
   type none = undefined|null

   type primitive = string|number|boolean|none
   
   type Proper<P=any> = (props: P, params: Params) => P & record
   
   type Decorator<T extends Function=Function, U extends Function=T> = (module: ImportMeta, caller: T) => U
   
   type JSXProps<T=any> = T & Params & { children?: any }
   
   type Time = `${number}h` | `${number}min` | `${number}s`
   
   type Side = "client" | "server"
   
   type Mode = "static" | "dynamic" | "periodic"
   
   type Class = { new() }
   
   type URLString = `/${string}`
   
   type HTMLString = `<${string}</${string}>`
   
   type Key = string|symbol|number
   
   type record = Record<Key, any>
   
   type Call<T = any, U = any> = ((...args: T[]) => U)
   
   type LetEvent<T = any, U = T> = (value: T) => U
   
   type Invalid<T = any> = { error: string, field: string, value: T }
   
   type UseState<T=any> = [T, SetState<T>]
   
   type LetState<T=any> = [T, SetState<T>, LetEvent<T>]
   
   type SetState<T = any> = (value: T) => void
   
   type Infer<T> = T extends [infer A] ? A : T
   
   type SSR = "static"|"dynamic"|"periodic"
   
   type RouteType = "href"|"lazy"|"call"
      
   type RouteString = `/${string}`|`./${string}`
   
   type Failure = (status: number, errors: string[]) => RRE
   
   // type Store<T extends Object = record> = { [K in keyof T]: UseState<Infer<T[K]>> }
   
}