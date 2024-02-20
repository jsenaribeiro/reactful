"user server"

import { test, expect } from 'bun:test'
import { log } from './log'

export type TestCase = { 
   sampling: string 
   expected: string
   hasError?: boolean
}

export type Encoder = (sample: string) => string | Promise<string>

export type Scenarios = Record<string, TestCase>

export function tester(
   minify: boolean, 
   scenarios: Scenarios, 
   comments: string, 
   encoder: Encoder) {

   const clearing = x => x
      .replace(comments, '').split('\n')
      .map(x => x.trim()).distinct().join('\n')

   log('')

   for (const key of Object.keys(scenarios)) {
      const now = scenarios[key]
      const txt = key
         .replace(/([A-Z])/gm, ' $1')
         .toLocaleLowerCase()
         .replace(' case', '')


      test(`function decorator: ${txt}`, async function () {
         let encoding, expected, resulted, allLines, exception

         try {
            encoding = await encoder(now.sampling)
            expected = clearing(now.expected)
            resulted = clearing(encoding)
            allLines = expected.split("\n")
         }
         catch (ex: any) { 
            if (ex.message) exception = ex.message
            if (typeof ex == 'string') exception = ex
            else exception = JSON.stringify(ex)
         }         

         if (!now.hasError && exception)
            throw `Expected success in ${key}, but has ${exception}`

         if (now.hasError && !exception)
            throw 'Expect an error, but not failed...'

         if (now.hasError) 
            return expect(exception)
               .toInclude(now.expected)

         for (let i = 0; i < allLines.length; i++) {
            const expectLine = allLines[i];
            const resultLine = resulted.split("\n")[i]

            if (expectLine == resultLine) continue

            log('failed case for ' + key)
            log('= ' + now.sampling.replaceAll(/^[\s\t]+/gm, '').replaceAll('\n', '\n  '))
            log('- ' + expectLine, "FG_GREEN")
            log('· ' + resultLine + '\n', "FG_YELLOW")

            log('\n' + encoding.trim(), 'FG_CYAN')
            log('\n')

            if (!minify) expect(expectLine).toBe(resultLine)
         }
      })      
   }
}