import { env, isRouted } from '@reactful/commons'

type Props = record & { route: string, link: string }

export default ['route', 'link']

const settings = env.settings
const context = { route: {} }
const IS_SERVER_SIDE = !globalThis.location

export const routeProps: Proper = function(props: Props, params: Params) {
   if (!props?.link && !props?.route) return props

   const actual = IS_SERVER_SIDE ? settings.current : location.pathname
   const routed = isRouted(actual, props.link)
   const hidden = !isRouted(actual, props.route)
   
   if (props.route) props = hidden 
      ? { ...props, hidden } 
      : { ...props }

   if (props.link) props = routed 
      ? { ...props, onClick, className: `${props.className} routed` }   
      : { ...props, onClick }   

   const route = context.route[props.link] ||= actual.replace(/\/$/, '')

   function onClick() {
      if (!props.link) return
      const url = props.link.replace(/^\./, route)            
      history.pushState(null, '', url)
      settings.binding.fresh()
   }      

   return props
} 

