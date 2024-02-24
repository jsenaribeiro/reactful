import { routing } from './router'
import { response } from '@reactful/commons'
import { File } from '../extra'

export async function fallbackFile(file: File, base: string, href: string) {
   const html = await file.load()
   return fallbackHTML(html, base, href)
}

export function fallbackHTML(html: string, base: string, href: string) {
   const data = `globalThis.FALLBACK_ROUTE = { try:'${base}', fix:'${href}' }`
   const HTML = html?.replace('</head>', `\n\t<script>${data}</script>` + '</head>') || ''

   return response(200, HTML, "text/html")
}

export async function fallbackURL(href: string, base: string) {
   const last = href.split('/').at(-1)
   const next = href.replace(`/${last}`, '')
   const root = next.trim().split('/').length == 1

   return await routing(root ? '/' : next, base || href)
}