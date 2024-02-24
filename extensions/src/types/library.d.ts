declare global {
   interface IBunFile {
      exists(): Promise<boolean>
      text(): Promise<string>
      type: string
      size: number
   }

   interface IFile {
      path: string
      mime: string
      file: IBunFile
      new(path: string): IFile
      load<T = string>(): Promise<T>
      load<T = string>(error: string): Promise<T>
      save(text: string): Promise<any>
      exists(): Promise<boolean>
   }

   interface IPath {
      lib: string
      cwd: string
      tst: string
      assets: string
      builds: string
      routes: string
      shares: string
      components: string
      directives: string
      // b________s: string
      get(dir: string, src: string): string | null
      getUpFileName(path: string): string
      getUpFolder(path: string): string
      getLastName(path: string): string
      getFileName(path: string, noExtension: boolean): string
      getExtension(path: string): string
      initializeFolders(): void
      browse(path: string): Promise<IPathBrowse[]>
   }

   interface IPathBrowse {
      name: string,
      path: string,
      base: string,
      file?: IBunFile | undefined
   }

   type Async<T> = Promise<T>

   interface IParser<T = RRE, TTs = T[]> {
      root: RRE
      path: string
      href: string

      parent(all: RRE | RRE[], own: string): TTs
      child(jsx: RRE, own: string): TTs
      children(jsxs: RRE[], own: string): TTs
      syblings<O extends object = object>(props: O, own: string): TTs

      element(jsx: RRE, own: string): TTs
      fragment(jsx: RRE, own: string): TTs
      component(jsx: FCE, own: string): TTs

      render(): T
   }

   interface SyncParser extends IParser<RRE, RRE | RRE[]> { }

   interface AsyncParser extends IParser<Async<RRE>, Async<RRE | RRE[]>> { }

   interface Binding {
      index: number
      count: number
      ready: boolean
      fresh: () => void
      state: Record<number, object>
      visit: Record<number, boolean>
      react: Record<number, SetState>
      store: OrbitalBinding
      timer: any
   }

   interface OrbitalBinding {
      count: number
      state: Record<number, any>
      react: Record<number, RFC[]>
   }
}