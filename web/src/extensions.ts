import React from "react"
import { isRouted, throws } from "@reactful/commons"
export { }

const IS_SERVER_SIDE = !globalThis.document

declare global {
   interface Promise<T> {
      asLazyComponent(): React.FC<{route:string}>
      asLazyComponent(member: keyof T): React.FC<{route:string}>
   }
}

Promise.prototype.asLazyComponent = function(member?) {
   if (!member || member.endsWith('$')) member = 'default'
   
   const base = this as any
   const none = React.createElement('div')
   const fail = `Not found ${member} for as LazyComponent`

   if (IS_SERVER_SIDE) return props => none   
   else return function(props) {      
      base['routing'] ||= props.route

      const [child, setComponent] = React.useState(none)   
      React.useEffect(() => base.then(afterImported), [])

      function afterImported(imported) {
         if (!imported[member]) throws(fail, import.meta)

         const pathRoute = location.pathname
         const nowRouted = props.route || base['routing']
         const hasRouted = nowRouted && isRouted(pathRoute, nowRouted)
         const component = imported[member](props)

         setComponent(hasRouted ? component: none)
      }

      return child
   } 
}