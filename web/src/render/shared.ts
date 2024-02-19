import bindKeys, { bindProps } from '../binder/bindProps.ts'
import styleKeys, { styleProps } from '../styler/props.ts'
import formKeys, { formProps } from '../binder/formProps.ts'
import routeKeys, { routeProps } from '../router/props.ts'
import { env } from '@reactful/commons'

const settings = env.settings
const nativeProps = bindKeys.concat(styleKeys).concat(formKeys).concat(routeKeys)
const customProps = settings?.propers.map(x => x.name)
const directiveProps = nativeProps.concat(customProps)

export function proper<T extends Object>(props: T, params: Params): record {
   const library = [ bindProps, formProps, routeProps, styleProps ] 
   const reducer = (props, apply) => apply(props, params)  
   const propers = library.concat(settings?.propers ?? [])

   return clear(propers.reduce(reducer, props))
}

export const params = (tag: string, own: string, uid: number, now?: object): Params => 
   ({ tag, own, uid, mem: now, ioc: settings.context })

export function clear(props: any) {
   return props

   for (const key of directiveProps) 
      if (Object.hasOwn(props, key))
         delete props[key]

   return props
}

