"use server"

import { BunPlugin, JavaScriptLoader, OnLoadResult } from "bun"
import { Args, plugins } from "../plugs/shared"
import { env, Path } from '@reactful/commons'
import { log } from '../extra'
import * as ts from 'typescript'
import fs from 'fs'

import { decoratorPlugin } from "./decorator"
import { metadataPlugin } from "./metadata"
import { preventPlugin } from './preventer'

type Transpiler = (args: Args) => string

export const pipeline: Transpiler[] = [
   preventPlugin,
   metadataPlugin,
   decoratorPlugin,
]

export const jsxPlugin: BunPlugin = {
   name: 'jsx plugins',
   setup(build) {
      build.onLoad({ filter: /\.[jt]sx*$/ }, function ({ path }) {
         const code = fs.readFileSync(path, 'utf-8')
         const test = path.match(/.test.[tj]sx*/)
         const base = path.startsWith(Path.cwd)

         if (!test && base) return onLoad(path, code)

         return { loader: 'js', contents: transpileTS(code) }
      })
   }
}

function onLoad(path: string, code: string): OnLoadResult {
   code = pipeline.reduce((x, f) => f({ code: x, path }), code)

   const mode = env.FLAGS.serve ? '// MODE: TYPESCRIPT\n' : '// MODE: BUN\n'

   const contents = env.FLAGS.serve
      ? mode + transpileTS(code)
      : mode + code

   const loader: JavaScriptLoader
      = path.endsWith('x') ? env.FLAGS.build ? "tsx" : "jsx"
      : env.FLAGS.serve ? "js" as JavaScriptLoader
      : (path.split('.').at(-1) || 'ts') as JavaScriptLoader

   plugins.push(path)
   debugging(path, contents, '')
   return { contents, loader } // BUGFIX!!! 
}

function debugging(path: string, contents: string, filename: string) {
   if (!filename) return

   if (path.includes(filename)) {
      const lining = false
      const num = i => lining ? `${i + 1}: ` : ''
      const linedCode = contents.split('\n')
         .map((x, i) => `${num(i)}${x}`)
         .join('\n')

      log('' + linedCode + '\n', 'FG_CYAN')
   }
}

function transpileTS(code: string): string {
   const transpiledResult = ts.transpileModule(code, {
      compilerOptions: {
         jsx: ts.JsxEmit.React,
         target: ts.ScriptTarget.Latest,
      }
   });

   return transpiledResult.outputText;
}