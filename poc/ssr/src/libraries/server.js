import { server as ssr } from './ssr.js'
import { server as rsc } from './rsc.jsx'

export function server(mode, sProduction, port, base) {
   mode != "rsc" ? ssr(sProduction, port, base) : rsc()
}