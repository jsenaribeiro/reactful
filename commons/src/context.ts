import { env, GLOBAL_KEY } from './environment'
import '@reactful/prototypes'
import '@reactful/types'
import './mocks'

const IS_SERVER_SIDE = !globalThis.document

const binding: Binding = {
   index: 0, 
   count: 0,
   state: {},
   react: {},
   visit: [],
   ready: false,
   fresh: () => { },
   timer: undefined as any,
   store: { state: {}, count: 0, react: {} },
}

const context: Feeds = { 
   fails: [], 
   store: {}, 
   param: {}, 
   await: false, 
   get logon () {
      if (IS_SERVER_SIDE) return ''
      const json = sessionStorage.getItem('logon')
      return json && JSON.stringify(json)
   }
}

const folders: Folders = {
   apis: '/apis',
   assets: '/assets',
   builds: '/builds',
   routes: '/routes',
   shares: '/shares',
   directives: '/directives',
   components: '/components'
}

const failure = (status: number, errors: string[]): any => 
   console.error(`status error ${status}`, 
      '\n - ' + errors.join('; \n - '))

export function contextualizer() {
   if (globalThis[GLOBAL_KEY]) return

   const settings: Settings = {
      context,
      folders,
      binding,
      failure,
      faileds: [],
      caching: [],
      renders: [],
      propers: [],
      clients: {},
      stylers: {},
      current: '/',
      queryId: "#root",    
      set storage(value: any) {
         env.settings.context.store = value
      }
   }

   globalThis[GLOBAL_KEY] ||= settings
}