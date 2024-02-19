/* WARNING: new Object prototype extesions generate Bun bugs */

export {}

interface Event<T> { target: { value: T } }

declare global {
   interface Object {
       /** get an object member by dot syntax path */
      valueOf<T=any>(path: string): T

      /** set an object member by dot syntax path 
       * @param {string} path dot syntax path
       * @param {object} data value or an event target.value */
      valueOf<T=any>(path: string, data: T): void

      /** set an object member by dot syntax path 
       * @param {string} path dot syntax path
       * @param {object} data event with target.value to set in member */
      valueOf<T=any>(path: string, data: Event<T>): void

      /** set an object member by dot syntax path 
       * @param {string} path dot syntax path
       * @param {object} data value to set in member
       * @param {boolean} none if false (default), then null|undefined will be '' */
      valueOf<T=any>(path: string, data: T, none: boolean): void
   }

   interface ObjectConstructor {
      merge<T extends Object>(of: T, to: T)
      parse<T extends Object=object>(obj: T): ParseObject      
      fromProxy(that: any): any
   }
}

Object.fromProxy = function(that) {
   const plain = {}

   for (const key in that) {
      if (Array.isArray(that[key]))
         plain[key] = that[key].map(x => Object.fromProxy(x))

      else if (typeof that[key] == 'object')
         plain[key] = Object.fromProxy(that[key])

      else if (that.hasOwnProperty(key)) 
         plain[key] = that[key]
   }

   return plain;
}

Object.parse = function(that) { return new ParseObject(that) }

Object.merge = function(self, that) {
   Object.keys(self).forEach(function (name) {
      if (that[name] === undefined) return         
      else self[name] = that[name]
   })
}

const valueOf = Object.prototype.valueOf.bind({})

Object.prototype.valueOf = function(...args: any[]): any {
   const [ path, data, none ] = args
   
   const passing = args.length == 0 || typeof path !== "string"
   const reading = args.length == 1

   if (passing) return valueOf.bind(this)()

   if (reading) {
      const arr = path.split('.')
      const get = arr.reduce((x, k)=> x[k], this)
      return none ? get : (get?.toString() || '')
   }

   const split = path.split(".")
   const field = split.at(-1) || ''
   const ended = split.length === 1
   const value = data?.target?.value ?? data
   const under = path.replace(field, '')

   if (ended) this[path] = value
   if (under) this.valueOf(under)[field] = value
}

class ParseObject<T extends object = any> { 
   private readonly entries: [keyof T, any][]

   constructor(that: T) { this.entries = Object.entries(that) as [keyof T, any][] }

   public map(fn: (value: [keyof T, any], index: number) => [keyof T, any]): [keyof T, any][] {
      return this.entries.map(fn)
   }

   public filter(fn: (value: [keyof T, any], index: number) => boolean): [keyof T, any][] {
      return this.entries.filter(fn)
   }

   public toObject() { return Object.fromEntries(this.entries) }

   public toArray = () => this.entries
} 