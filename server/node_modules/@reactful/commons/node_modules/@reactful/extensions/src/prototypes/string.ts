import './object'

declare global {
   interface String {
      query(regex: RegExp): string[]
      query(pattern: string): string[]
      query(regex: RegExp, multiple: true): string[][]
      query(pattern: string, multiple: true): string[][]
      equal(regex: RegExp): boolean
      equal(pattern: string): boolean
      equal(value: string, ignoreWhiteSpace: boolean): boolean
      place(...values: any[]): string
      remove(value: string): string
      toArray(): any[]
      toObject(): object
      toNumber(): number
      trim(): string
      fix(): string
      // hashCode: number
   }
}

String.prototype.fix = function () { return this.trim().replace("  ", " ") }

String.prototype.place = function (...args) {
   return this.replace(/{(\d+)}/g, (match, index) =>
      typeof args[index] !== 'undefined' ? args[index] : match);
}

String.prototype.remove = function (value) { return this.replace(value, '') }

String.prototype.toNumber = function () { return parseFloat(this.toString()) || 0 }

String.prototype.equal = function (...args) {
   const [that, ignore] = args
   const regex = ignore ? /\s+/gm : /JUST_IGNORE_THIS/
   const clear = (x, full) => x.toLowerCase().trim().replace(regex, '')

   if (that instanceof RegExp) return !!this.match(that)
   if (args.length == 1) return !!this.match(new RegExp(that, "gmi"))

   return clear(this, ignore) == clear(that, ignore)
}

String.prototype.query = function (...args: any[]): any {
   const [regex, multiple] = args

   if (typeof regex == "string") return this
      .query(new RegExp(regex), !!multiple as any)

   return multiple
      ? Array.from<string[]>(this.matchAll(regex))
      : Array.from<string>(this.match(regex) || [])
}

String.prototype.toObject = function () {
   const that = this.toString()
   try { return JSON.parse(that) }
   catch { return undefined }
}

String.prototype.toArray = function (): any {
   const that = this.toString()
   const self = that.toObject()

   if (self) return Array.isArray(self) ? self : [self]

   const entryCookies = that.split(';').distinct().map(x => x.trim())
   const isEntryCookie = entryCookies.every(x => x.match(/^\w.*?=.+?$/))

   if (isEntryCookie) {
      const entries = entryCookies
         .map(x => x.trim().split('='))
         .map(([x,y]) => [x.trim(), y.trim()])
      
      return Object.fromEntries(entries)
   }

   const csvEntries = that.split('\n').distinct().map(x => x.trim())
   const isCsvEntry = csvEntries.every(x => x.match(/.+?,.+?/))

   if (isCsvEntry && csvEntries.length > 1) {
      const headers = csvEntries[0].split(',').map(x => x.trim())
      const entries = csvEntries.slice(1).flatMap(x => 
         x.split(',').map((y,i) => [headers[i], y.trim()]))

      return Object.fromEntries(entries)
   }
}

const charCode = x => x ? x.charCodeAt(0) : 0
const reduceHash = (x, y) => charCode(x) + charCode(y)

// function getter<T>(field: string, call: (arg: any) => T) {
//    Object.defineProperty(String.prototype, field, { 
//       get() { return call(this) }
//    })   
// }

// getter("hashCode", that => that.split("").reduce(reduceHash))

export { }