declare type none = undefined|null

declare type primitive = string|number|boolean|none

declare type Proper<P=any> = (props: P, params: Params) => P & record

declare type Decorator<T extends Function=Function, U extends Function=T> = (module: ImportMeta, caller: T) => U

declare type JSXProps<T=any> = T & Params & { children?: any }

declare type Time = `${number}h` | `${number}min` | `${number}s`

declare type Side = "client" | "server"

declare type Mode = "static" | "dynamic" | "periodic"

declare type Class = { new() }

declare type URLString = `/${string}`

declare type HTMLString = `<${string}</${string}>`

declare type Key = string|symbol|number

declare type record = Record<Key, any>

declare type Call<T = any, U = any> = ((...args: T[]) => U)

declare type LetEvent<T = any, U = T> = (value: T) => U

declare type Invalid<T = any> = { error: string, field: string, value: T }

declare type UseState<T=any> = [T, SetState<T>]

declare type LetState<T=any> = [T, SetState<T>, LetEvent<T>]

declare type SetState<T = any> = (value: T) => void

declare type Infer<T> = T extends [infer A] ? A : T

declare type SSR = "static"|"dynamic"|"periodic"

declare type RouteType = "href"|"lazy"|"call"
   
declare type RouteString = `/${string}`|`./${string}`

declare type Failure = (status: number, errors: string[]) => RRE

// type Store<T extends Object = record> = { [K in keyof T]: UseState<Infer<T[K]>> }
