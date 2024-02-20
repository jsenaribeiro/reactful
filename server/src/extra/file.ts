"use server"

import { throws } from '@reactful/commons'
import { Path } from './path'
import { BunFile } from 'bun'
import '@reactful/extensions'

export class File /*implements IFile*/ {
   public readonly blob: BunFile
   public readonly mime: string
   public readonly path: string
   public readonly size: number // kbytes
   public readonly name: string

   public get href() { 
      return this.path.replace(Path.routes, '')
   }

   constructor(path: string) { 
      try {
         this.path = path
         this.blob = path ? Bun.file(path) : ({} as any)
         this.mime = path ? this.blob.type : ''
         this.size = path ? this.blob.size / 1000 : 0
         this.name = path ? path.split('/').at(-1) || '' : ''
      }
      catch(ex) {
         console.log(`reactful file.ts contructor (${path})`)
         throw ex
      }
   }

   public exists() { return this.blob.exists ? this.blob.exists() : Promise.resolve(false) }
   
   public async save(text: string) { return await Bun.write(this.path, text) }

   public async load(error?: string, decode?: boolean) {   
      if (!this.path) return ''

      const content = await this.blob.exists() 
                    ? await this.blob.text()
                    : throws<string>(error || '') 

      return decode ? decodeURI(content) : content
   }
}