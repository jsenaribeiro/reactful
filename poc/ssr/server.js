import { server } from './src/libraries/server.js'

const port = process.env.PORT || 5173
const base = process.env.BASE || '/'
const prod = process.env.PROD === true

await server("ssr", prod, port, base)