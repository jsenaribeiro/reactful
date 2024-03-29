export type IParser = (node: EFC, path: string) => Promise<any>

export type ISaver = (args: SaveProps, type: SaveType, done?: string[]) => Promise<string | boolean>

export interface SaveProps {
   item: RFC | string
   path: string
   html?: string
}

export type SaveType = "MD" | "JSX" | "HTML"