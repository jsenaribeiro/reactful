import './aliases'

declare type UrlMap<T> = { [key:URLString]: T}
declare type UrlTagMap<T> = { [key:URLString]: Record<string, T>}   

declare interface OAuth {
   clientId: string
   secretId: string
   scopings: string
}

declare interface ISession<T> {
   login(username: string, password: string): Promise<void>
   logout():void
   logged: T|undefined
}

declare interface ClientInfo {
   run: IParser<any, any>
   off: boolean // stateless
   tag: string
   jsx: RFC
}

declare interface Settings<T=any> {
   storage: T
   context: Feeds
   current: string
   queryId: string
   binding: Binding
   folders: Folders
   caching: ICache[]
   propers: Proper[]
   renders: Render[]
   faileds: { href: string, call: RFC }[]
   failure: (status:number, errors:string[]) => RRE
   stylers: UrlMap<string[]>
   clients: UrlMap<ClientInfo>
}

declare interface ClientSettings<T=any> extends Settings<T> {
   initial: string
   binding: Binding
}

declare interface Feeds<L=any, P=any> {
   logon: L // current user
   param: P // dynamic routes
   await: boolean      
   fails: Invalid[]
   store: Record<string|symbol, any>
}

type CacheKey = "html"|"meta"|"lazy"|"href"

declare interface ICache  {
   type: CacheKey
   name: string
   data: string
   path: string
   call: RFC      
}

declare interface Caching {
   html: UrlMap<HTMLString>
   lazy: UrlMap<HTMLString>
   meta: UrlTagMap<MetaTags>
}

declare interface Route<D = any, F = Function> {
   type: RouteType
   path: string
   name: string
   data: D
   call: F
}   

declare interface Detail {
   title: string
   description: string
}

declare interface Folders {
   apis: URLString
   assets: URLString
   builds: URLString
   routes: URLString
   shares: URLString
   components: URLString
   directives: URLString
}

declare interface Params<T extends object = any> {
   uid: number
   tag: string
   own: string
   ioc: Feeds
   mem?: T|undefined
}

declare interface Render {
   call: RFC
   mode: Mode
   name: string
   path: string
   href: string
   time: number
}