"use server"

import { env } from '@reactful/commons'
import { plugins } from "../plugs/shared"
import { BunPlugin } from "bun"
import fs from 'fs'

const settings = env.settings

export const cssPlugin: BunPlugin = {
   name: "css plugins",
   setup(build) {
      const ignore = env.FLAGS.log
      const { stylers } = env.settings

      // ignore || log('PLUGINS', 'FG_YELLOW')
      // ignore || log('- css plugins')

      build.onLoad({ filter: /\.(css)$/ }, function({ path }){
         const ext = x => !!x.match(/\.[tj]sx/)
         const css = fs.readFileSync(path, 'utf-8')
         const url = plugins.filter(ext).at(-1) || ''
         const obj = { url: path, css }

         stylers[url] ||= []
         stylers[url].push(css)

         // return { exports: obj, loader: "object" }
         return { contents: JSON.stringify(obj) }
      })
   }
}
