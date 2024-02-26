import { allCachings } from "./all"

export function get(type: "href", path: string, name: string): string
export function get(type: "meta", path: string, name?: string): MetaTags
export function get(type: "html", path: string): `<${string}</${string}>`
export function get(type: "lazy", path: string, name: string): `<${string}</${string}>`
export function get(type: any, path?: any, name?: any) {
   const allByType = allCachings().filter(x => x.type==type) as any[]
   const allByName = name => allByType.find(x => x.name==name) as any
   const allByPath = path => allByType.filter(x => x.path==path) as any[]
   const allByPathName = (path, name) => allByPath(path).find(x => x.name==name) as any

   if (!path && !name) return allByType.filter(x => x.type==type)
   
   else if (!name) return allByName(path)?.data
       || allByName(path + '/index')?.data

   else return allByPathName(path, name)?.data
      || allByPathName(path + '/index', name)?.data
}