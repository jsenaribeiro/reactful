import fs from "node:fs/promises"
import express from "express"

export async function server(isProduction, port, base) {   
   const http = express()
   const DIST = process.env.DIST || './dist'   
   
   await (isProduction ? production() : development())

   async function development() {
      const { createServer } = await import(`vite`)
      const vite = await createServer({
         server: { middlewareMode: true },
         appType: `custom`,
         base
      })

      http.use(vite.middlewares)

      await serving(undefined, async url => {
         const preTemplate = await fs.readFile(`./index.html`, `utf-8`)
         const template = await vite.transformIndexHtml(url, preTemplate)
         const { render } = await vite.ssrLoadModule(`/src/server.tsx`)
         return [render, template, e => vite?.ssrFixStacktrace(e)]
      })
   }

   async function production() {      
      const { default: compress} = await import(`compression`)
      const { default: sirv } = await import(`sirv`)

      http.use(compress())
      http.use(base, sirv(`${DIST}/client`, { extensions: [] }))
      
      const manifest = await fs.readFile(`${DIST}/client/ssr-manifest.json`, `utf-8`) 

      await serving(manifest, async url => {
         const template = await fs.readFile(`${DIST}/client/index.html`, `utf-8`)
         const { render } = await import(`${DIST}/server/server.js`)
         return [render, template, undefined]
      })
   }

   async function serving(manifest, setting) {      
      http.use(`*`, async (req, res) => {
         const url = req.originalUrl.replace(base, ``)         
         const [render, template, handler] = await setting(url)

         try {
            const rendered = await render(url, manifest)
            const headers = { "Content-Type": `text/html` }
   
            const html = template
               .replace(`<!--app-head-->`, rendered.head ?? ``)
               .replace(`<!--app-html-->`, rendered.html ?? ``)
   
            res.status(200).set(headers).end(html)   
         }
         catch (e) {
            console.log(e.stack)
            handler?.call(this, e)
            res.status(500).end(e.stack)
         }
      })         
   }

   // starting http server...
   const host = `\x1b[96mhttp://localhost:\x1b[34m${port}\x1b[0m`
   const ping = () => console.log("\x1b[0mServer at " + host)
   http.listen(port, ping)
}
