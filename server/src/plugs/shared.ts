import * as ts from 'typescript'

export type Args = { path: string, code: string }
export type Item = { index: number, regex: RegExp }
export type CallType = "arrow"|"block"

export const plugins: string[] = []

export interface FunctionExpression {
   name: string
   path: string
   args: string
   body: string
   full: string
   sign: string
   expr: string
   mods: string
   sync: boolean
   type: CallType
   none: boolean // anonymous
}

export const cleanCode = code => code
   .replaceAll('\r', '')
   .replace(/^[\s\t]+$/gm, '')
   .replaceAll('\n\n\n\n', '\n\n')
   .replaceAll('\n\n\n', '\n\n')

export function getModuleFunctions({ code, path }: Args): FunctionExpression[] {
   const functions = [] as FunctionExpression[]
   const version = ts.ScriptTarget.Latest
   const source = ts.createSourceFile('temp.ts', code, version, true, ts.ScriptKind.TSX)

   function traverse(node: ts.Node) {
      let type:CallType = "block"
      let init, name, body, full, sign, expr, mods, args, none=false, sync=true

      const isNesting = node.parent.kind == ts.SyntaxKind.Block
         || ts.isFunctionDeclaration(node.parent) 
         || ts.isArrowFunction(node.parent)
      
      const isDefault = !!node.parent.getText().equal(/\s+default\s+/)

      const isFunction = ts.isFunctionDeclaration(node) || ts.isArrowFunction(node)

      if (ts.isArrowFunction(node)) {
         type = "arrow"
         full = node.parent.getText()
         init = full.indexOf('=>') + 2
         sync = full.includes('async') == false
         name = (node.parent['name']?.getText() || 'default').trim()
         mods = (full.split(name)[0] + (isDefault ? 'default' : '')).trim()
         body = (full.slice(init) || '').trim()
         args = full.split('=>')[0].replace(mods || '§§§', '').replace(/^.+=/,'').trim()
         none = name.includes('default')
         expr = `${args} => ${body}`.replace(/;$/, '')
         sign = `${name} ${args}`
      }

      else if (ts.isFunctionDeclaration(node)) {
         type = "block"
         name = (node.name?.getText() || 'default').trim()
         none = name.includes('default')
         full = node.getText().trim()
         sync = full.includes('async') == false
         mods = full.split('function')[0].trim()
         body = (node.body?.getText() || '').trim()
         expr = (mods ? full.split(mods)[1] : full).replace(/;$/, '').trim() 
         args = (expr.split('function')[1].split(')')[0] + ')').trim()
         sign = expr.split('{')[0].trim()

         if (sync === false) {
            mods = mods.replace(/[\s]*async[\s\()]*/, '')
            expr = ('async ' + expr).replace('  ', ' ').trim()
         }
      }

      else ts.forEachChild(node, traverse);

      if (isFunction && !isNesting) 
         return functions.push({ name, body, expr, args,
            path, full, sign, none, mods, sync, type })
   }

   ts.forEachChild(source, traverse);

   return functions
}

