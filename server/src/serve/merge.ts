import { Dirent } from 'fs'
import { readdir, } from 'fs/promises'
import { Path } from "@reactful/commons"
import { File } from "../extra/file"

Path.prototype.browser = async function() {
   const dirents = await readdir(this.path, { withFileTypes:true })      

   const mapper = async (d: Dirent) => {
      const path = `${this.path}/${d.name}`      
      const file = d.isDirectory() ? undefined 
          : await new File(path).exists()
          ? new File(path)
          : undefined

      return { name: d.name, path, file, base: this.path }
   }

   return await Promise.all(dirents.map(mapper)) as any as IPathBrowse[]
}