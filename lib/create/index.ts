import { parse } from "https://deno.land/std@0.200.0/flags/mod.ts";
import type { Args } from "https://deno.land/std@0.200.0/flags/mod.ts";

console.log('-----------------------')
console.log('   %c@reactful project   ', 'color:wheat; font-weight:1')
console.log('-----------------------')

console.log('> %cProject name?', 'color:#999')
const project = prompt('')

if (!project?.trim()) throw 'Invalid project name...'

console.log('> %cOS environment? = 1', 'color:#999')
console.log('%c (windows=1; linux=2; mac=3)', 'color:#777')
const os = prompt('') || '1'

console.log('> installing...')
console.log('%c- react', 'color:#999')
console.log('%c- reactful', 'color:#999')
console.log('%c- typescript', 'color:#999')

