import { Args, cleanCode, getModuleFunctions } from "../shared"

export default function(args: Args) {
   for (const fn of getModuleFunctions(args)) {     
      const meta = '["metadata"]'
      const char = fn.name == 'default' ? '$' : ''
      const name = char == '$' ? `default${char}` : fn.name

      // anonymous default arrow function
      if (fn.name == 'default' && fn.type == 'arrow')  {
         const regex = fn.sync ? /export.+default/ : /export.+async\s*(.+)=>/
         const value = fn.sync ? `const default${char} =` : `const default${char} = $1 =>`

         args.code = args.code.replace(regex, value)
      }

      // anonymous default block function
      else if (fn.name == 'default' && fn.type == 'block') {
         const regex = /export.+function/
         const value = `function default${char}`
         const annex = fn.sync ? '' : 'async '

         args.code = args.code.replace(regex, annex + value)
      }

      // non-anonymous default block function
      // export default async function Name(props) { ... }
      // ------
      // async function Name(props) { ... }
      // export default Name
      else if (fn.mods.includes("default") && fn.type == 'block') {
         const clearedExportDefault = `export\\s+default`
         const clearedExportDefaultRgx = new RegExp(clearedExportDefault)

         args.code = args.code.replace(clearedExportDefaultRgx, '')
      }

      args.code += `\n\n${fn.name}${char}${meta} ||= { };`
      args.code += `\n${fn.name}${char}${meta}.path = '${args.path}';`

      if (fn.mods.includes('default')) args.code += `\n\nexport default ${name}`
   }         

   return cleanCode(args.code)
}

/*
   for (const fn of getModuleFunctions(args)) {      
      if (!fn.mods.includes("export")) continue

      const meta = `{ path: '${args.path}' }`
      const then = `x => x.${fn.name}.metadata = ${meta}`
      const code = `import('${args.path}').then(${then})`

      args.code += `\n\n${code}`


      // args.code += `\n\nimport.meta['${fn.name}'] ||= ${fn.name};`
      // args.code += `\nimport.meta['${fn.name}'].path = '${args.path}';`
   }      
*/