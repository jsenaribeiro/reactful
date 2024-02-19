import { Path } from '@reactful/commons'

export const BUNDLE_JS = `${Path.builds}/bundle.js`

export const SHARED_JS = `${Path.builds}/shared.js`

export const ZIPPED_JS = `${Path.builds}/zipped.js`

export const BUNDLE_TS = `${Path.lib}/bundle/bundle.ts`

export const ZIPPED_TS = `${Path.lib}/bundle/bundle.ts`

export const INDEX_HTML_URL = `${Path.cwd}/index.html`

export type IParser = (node: EFC, path: string) => Promise<any>

export type ISaver = (args: SaveProps, type: SaveType, done?: string[]) => Promise<string | boolean>

export interface SaveProps {
   item: RFC | string
   path: string
   html?: string
}

export type SaveType = "MD" | "JSX" | "HTML"