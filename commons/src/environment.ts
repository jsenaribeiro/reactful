/// <reference lib='dom' />

export const GLOBAL_KEY = Symbol.for("settings")

import { contextualizer } from "./context"
import { routefy } from "./routefy"
import '@reactful/extensions'

const IS_CLIENT_SIDE = !!globalThis.document
const consoleError = console.error.bind({})
const consoleEmpty = (...args) => null

interface IEnv {
   PORT: number
   MINIFY: boolean
}

class Environment implements IEnv {
   public PORT: number = 0
   public MINIFY: boolean = true

   public FLAGS = {
      log: false,
      debug: false,
      build: false,
      serve: false,
      get errors() { return console.error != consoleEmpty },
      set errors(enable) {
         console.error = enable
            ? consoleError.bind({})
            : (...args) => null
      },
   }

   constructor() { 
      validation(this)
      contextualizer()
   }

   public get(type: "href", path: string, name: string): string
   public get(type: "meta", path: string, name?: string): MetaTags
   public get(type: "html", path: string): `<${string}</${string}>`
   public get(type: "lazy", path: string, name: string): `<${string}</${string}>`
   public get(type: any, path?: any, name?: any) {
      if (!path && !name) return this.all.filter(x => x.type==type) as any
      
      if (!name) return this.all.find(x => x.type==type && x.path==path)?.data as any
            || this.all.find(x => x.type==type && x.path==path + '/index')?.data as any

      return this.all.find(x => x.type==type && x.path==path && x.name==name)?.data as any
          || this.all.find(x => x.type==type && x.path==path + '/index' && x.name==name)?.data as any
   }

   public set(type: "href", path: string, name: string, html: string, call: RFC): void
   public set(type: "meta", path: string, name: string, html: MetaTags): void
   public set(type: "html", path: string, html: `<${string}</${string}>`)
   public set(type: "lazy", path: string, name: string, html: `<${string}</${string}>`): void
   public set(type: "wait", path: string, guid: string, html: string)
   public set(...args: any[]): any {
      var type, data, name, path, call

      if (args.length <= 2) return
      if (args.length == 3) [type, path, data] = args
      if (args.length == 4) [type, path, name, data] = args
      if (args.length == 5) [type, path, name, data, call] = args

      if (type == "meta") {
         data = {  ...this.get("meta", path, name), ...data }
         Object.keys(data).forEach(k => data[k] = data[k].replaceAll("'", '"'))
      }

      for (let i = 0; i < this.settings.caching.length; i++) {
         const item = this.settings.caching[i]
         if (!item) continue
         if (item.type != type) continue
         if (item.path != path) continue
         if (item.name && item.name != name) continue
         delete this.settings.caching[i]         
      }

      this.settings.caching.push({ call, data, path, name, type })
   }

   public let(route: RouteString): { href: string; call: RFC | null } {
      return routefy(route)
   }
   
   public get settings(): Settings { return globalThis[GLOBAL_KEY] }

   get all(): ICache[] { return this.settings.caching.distinct() }
}

const fail = (key, pre = '') => `Not found ${pre.trim()} ${key.trim()} from current .env file`

function validation(that) { 
   Object.entries(that)
      .map(validateOf)
      .filter(x => Array.isArray(x))
      .forEach(x => x && (that[x[0]] = x[1]))
}

function validateOf([key, val]: [string, any]) {
   if (IS_CLIENT_SIDE) return

   const data = eval('process.env')
   const keys = Object.keys(data) 

   if (!data) return   
   if (key == "FLAGS") return
   if (val == "function") return    
   if (keys.includes(key) == false) throw fail(key)
   if (!data[key]) throw fail(key, 'value in')

   const value = `${data[key]}`.toLowerCase()
   
   return [key, JSON.parse(value)]
}

export const env = new Environment()