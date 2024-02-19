import { env } from '../environment'

const initial = { lib:'', cwd:'', tst:'' }

type PathStatic = Omit<Omit<Omit<typeof Path, "prototype">, "from">, "e2e">
type PathFields = keyof Omit<Omit<Omit<Omit<PathStatic, "startup">, "cwd">, "lib">, "tst">

const IS_CLIENT_SIDE = !!globalThis.document

export class Path {
   public path: string
   public static e2e = false
   private static paths: Folders

   constructor(path: string)
   constructor(meta: ImportMeta)
   constructor(path: string|ImportMeta) { 
      this.path ||= '/' 
      this.path = path['url'] || path
      this.path = this.path.toString().replace("file://", "")      
         
   }

   public static from = (directory: PathFields) => new Path(Path[directory])

   static startup(): true {
      Path.paths = env.settings.folders 

      if (Path.e2e && initial.lib) 
         initial.cwd = initial.lib.replace('src', 'poc')

      if (initial.lib) return true

      const src = IS_CLIENT_SIDE ? '/' : eval('Bun.main')

      initial.cwd = new Path(src).base.path
      initial.lib = new Path(import.meta).goto('src')
      initial.tst = initial.lib.replace(/src$/, 'tst')    

      if (initial.tst && !initial.cwd)
         initial.cwd = new Path(initial.lib) + '/poc'

      return true
   }      

   static get lib() { return this.startup() && initial.lib; }
   static get cwd() { return this.startup() && initial.cwd; }
   static get tst() { return this.startup() && initial.tst; }

   get base() { 
      const path = this.path + ''
      const base = path.replace('/' + this.last, '')
      return new Path(base) 
   }

   get name() { return this.last.split(".")[0] }
   get Name() { return this.name[0].toUpperCase() + this.name.slice(1)  }
   get last() { return this.path.split(/\/|\\\\|\\/)?.at(-1) || '' }

   get href(): RouteString { 
      const isURL = this.path.match(/^(http|https):/)
      const removeHTTP = isURL? new URL(this.path).pathname : this.path
      const removeFile = removeHTTP.replace(/\.[^\/]+$/, '/').trim()
      const dropsIndex = removeFile.match(/\/index$/) ? removeFile.remove('/index') : removeFile
      const noRouteDir = dropsIndex.remove(Path.routes).remove(env.settings.folders.routes)
      const noEndSlash = noRouteDir.replace(/(.+)\/$/, '$1')

      return (noEndSlash.trim() || '/') as RouteString
   }

   goto = (name: string, retry = 13) => 
      ! name || retry < 0 ? '/'
      : this.last == name ? this.path
      : this.base.goto(name, retry - 1)

   static get apis() { return `${this.cwd + this.paths.apis}` }
   static get assets() { return `${this.cwd + this.paths.assets}` }
   static get builds() { return `${this.cwd + this.paths.builds}` }
   static get routes() { return `${this.cwd + this.paths.routes}` }
   static get shares() { return `${this.cwd + this.paths.shares}` }
   static get components() { return `${this.cwd + this.paths.components}` }
   static get directives() { return `${this.cwd + this.paths.directives}` }

   browser(): Promise<IPathBrowse[]> { 
      if (IS_CLIENT_SIDE) throw "NOT SUPPORTED"; 
      return Promise.resolve([]) 
   }

   resolve(path: string): string {
      if (path.startsWith("../")) 
         return new Path(this.path).base.base
            .resolve(path.replace("../", ""))

      if (path.startsWith("./")) 
         return new Path(this.path).base
            .resolve(path.replace("./", ""))

      
      const base = this.path.replace(/\/$/, '')
      const rest = path.replace(/^\./, '')

      return `${base}/${rest}`

   }
}
