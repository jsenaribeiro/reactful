"use server"

import { COLORS } from '@reactful/commons'

type Color = keyof typeof COLORS

export const logger = {
   inline: false,
   insert(message: string, ...colors: Color[]) {
      //if (this.inline) write('\n')
      write('\n' + message, ...colors)
      this.inline = false
   },
   append(message: string, ...colors: Color[]) {
      write(message, ...colors)
      this.inline = true
   },
   itemfy(message: string, fill = true) {      
      this.insert(`${fill ? '●' : '○'} `, "FG_GREEN")
      this.append(`${message} `, "RESET")
   }
}

export function log(message: string)
export function log(message: string, ...colors: Color[])
export function log(message: string, ...colors: Color[]) {
   write('\n' + message, ...colors)
}

function write(message: string)
function write(message: string, ...colors: Color[])
function write(message: string, ...colors: Color[]) {
   const R = COLORS["RESET"]
   const P = colors.map(k => COLORS[k]).join("")
   const C = colors.length > 0 ? P : R

   Bun.write(Bun.stdout, `${C}${message}${R}`)
}