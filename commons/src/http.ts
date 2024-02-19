/// <reference lib='dom' />
/// <reference lib='esnext' />

import '@reactful/extension'

export const response = (code: number, body = {} as any, type?: string, head?: any) =>
   new Response(body, { status: code, headers: new Headers({ ...head, 
      "content-type": type || 'text/plain', "charset":"utf-8" })})

export function queryStringify(that: any): string {
   return new URLSearchParams(that).toString()
}

export function queriefy(request: Request) {
   const regex = new RegExp('(http|https)+:\/\/' + request.headers.get('host'))
   const [host] = request.url.query(regex)
   const [route, after] = request.url.replace(host, '').split('?')
   const query = queryStringToObject(after)

   return { route, query }
}

function queryStringToObject(queries: string): any {
   const params = {} as any
   
   if (!queries) return params
   else new URLSearchParams(queries)
      .forEach((val, key) => params[key] = val)
      
   return params
}


