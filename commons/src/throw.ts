export const PREFIX_ERROR = '@reactful error: '

export function throws<T>(ex: Error, mt?: ImportMeta): T
export function throws<T>(ex: string, mt?: ImportMeta): T
export function throws<T>(ex: any, mt?: ImportMeta): T {
   if (!ex) return false as T

   const url = mt ? mt.url : ''   
   const uri = url ? `${url.split('/src').at(1)} ` : ' '
   
   console.error('\n' + PREFIX_ERROR + uri)
   console.warn(ex?.message || ex?.toString())

   throw ex
}