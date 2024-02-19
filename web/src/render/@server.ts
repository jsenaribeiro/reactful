import { IS_ONLY_FOR_ROUTE, PREFIX_ERROR } from '@reactful/commons'
import { getMillisecondsFrom, Path, env } from '@reactful/commons'

const SERVER_PATH_ERROR = `${PREFIX_ERROR}@server ` + IS_ONLY_FOR_ROUTE
const IS_CLIENT_SIDE = !!globalThis.document

export function server(mode: "static"|"dynamic"): Decorator<RFC>
export function server(mode: "periodic", ms: number): Decorator<RFC>
export function server(mode: "periodic", time: Time): Decorator<RFC>
export function server(mode: SSR, args?: Time|number): Decorator<RFC> {
   setTimeout(() => env.FLAGS.errors = true, 3)

   const side = "server", isMS = typeof args == "number"
   const time = typeof args == "number" ? args
      : getMillisecondsFrom(args as Time)

   env.FLAGS.errors = false

   return function (meta: ImportMeta, call: RFC) {
      if (IS_CLIENT_SIDE) return call

      const path = new Path(meta.url).path
      const { folders, renders } = env.settings
      const inferMode = call.isAsync() ? "dynamic" : "static"
      const failedServer = side == "server"
         && !path.includes(folders.routes)

      if (failedServer) throw SERVER_PATH_ERROR

      renders.push({
         call,
         path,
         name: call.name,
         time: time || 0,
         mode: mode || inferMode,
         href: new Path(path).href
      })

      return call
   }
}