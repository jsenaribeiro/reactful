import * as fs from "https://deno.land/std/fs/mod.ts"

const NOW = './'
const NEW = '../../jsenaribeiro.github.io/reactful'
const EXT = ['.js', '.html', '.css']

await copyFileAsync('index')
await copyFolderAsync('css')
await copyFolderAsync('img')
await copyFolderAsync('review')

async function copyFileAsync(filename) {
   for (const e of EXT) {
      const file = filename + e
      const from = NOW + '/' + file
      const dist = NEW + '/' + file

      if (await fs.exists(from))
         await Deno.copyFile(from, dist)
   }
}

async function copyFolderAsync(folder) {
   const alloweds = ['.js', '.html', '.css', '.ico', '.png']
   const nowFolder = NOW + '/' + folder
   const newFolder = NEW + '/' + folder
   const settings = {
      includeDirs: false,
      maxDepth: 5,
      exts: alloweds,
      skip: [/\.md/]
   }

   if (!await fs.exists(NEW)) await Deno.mkdir(NEW)
   if (!await fs.exists(newFolder)) await Deno.mkdir(newFolder)

   for await (const item of fs.walk(nowFolder, settings))
      if (item.isFile) await Deno.copyFile(
         nowFolder + '/' + item.name,
         newFolder + '/' + item.name
      )
}

console.log('DONE! deployed in ' + NEW)