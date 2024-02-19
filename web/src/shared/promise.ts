import React from "react"
import { isRouted } from './route'
export { }

declare global {
   interface Promise<T> {
      asLazyComponent(): React.FC<{route:string}>
      asLazyComponent(name: keyof T): React.FC<{route:string}>
   }
}

Promise.prototype.asLazyComponent = function(member?) {
   const hidden = React.createElement('div')
   const that = this as any
   that['routing'] ||= ''

   if (!window?.document) return props => hidden
   
   else return props => {      
      that['routing'] ||= props.route

      const [child, setJSX] = React.useState(hidden)      
      
      const effection = () => {
         this.then(imported => {
            const pathRoute = location.pathname
            const nowRouted = props.route || that['routing']
            const hasRouted = nowRouted && isRouted(pathRoute, nowRouted)
            const component = imported[member](props)
            hasRouted ? setJSX(component) : setJSX(hidden)
         })  
      }
   
      React.useEffect(effection, [])

      return child
   } 
}