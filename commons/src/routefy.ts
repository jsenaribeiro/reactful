import { env } from './environment'

export function routefy(route: RouteString): { href: string, call: RFC|null } {       
   route = (route.replace(/\/$/, '') || '/') as RouteString
   
   env.settings.current = route
   env.settings.context.param = { } // clearing current route params

   var urlState = '', hasState = false, jsxState: RFC|null = null
   
   const ignore = { href: route, call: null }, state = {}

   for (const args of env.all.filter(x => x.type == "href")) {
      const routed = route.split('/').distinct()
      const params = args.data.split('/').distinct()
   
      if (routed.length != params.length) return ignore
   
      for (let i = 0; i < params.length; i++) {  
         const param = params[i]    
         const value = routed.at(i)
         const isNot = value != param
         const field = param.replace(':', '')
         const isVar = param.startsWith(':')
   
         hasState = hasState || isVar
   
         if (isVar) state[field] = value
         else if (isNot) return ignore
         else urlState += ('/' + value) 
      }

      jsxState = args.call as RFC
   }

   if (hasState) env.settings.context.param = state

   return { href: urlState || route, call: jsxState }
 }