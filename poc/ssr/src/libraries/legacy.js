
export async function server(isProduction, port, base) {   
   // Add Vite or respective production middlewares
   let vite
   if (!isProduction) {
      const { createServer } = await import(`vite`)
      vite = await createServer({
         server: { middlewareMode: true },
         appType: `custom`,
         base
      })
      http.use(vite.middlewares)
   } else {
      const compression = (await import(`compression`)).default
      const sirv = (await import(`sirv`)).default
      http.use(compression())
      http.use(base, sirv(`${DIST}/client`, { extensions: [] }))
   }

   // Serve HTML
   http.use(`*`, async (req, res) => {
      try {
         const url = req.originalUrl.replace(base, ``)

         let template
         let render
         if (!isProduction) {
            // Always read fresh template in development
            template = await fs.readFile(`./index.html`, `utf-8`)
            template = await vite.transformIndexHtml(url, template)
            render = (await vite.ssrLoadModule(`/src/server.tsx`)).render
         } else {
            template = await fs.readFile(`${DIST}/client/index.html`, `utf-8`) // assets
            render = (await import(`${DIST}/server/server.js`)).render
         }

         const manifest = isProduction ? await fs.readFile(`${DIST}/client/ssr-manifest.json`, `utf-8`) : undefined
         const rendered = await render(url, ssrManifest)

         const html = template
            .replace(`<!--app-head-->`, rendered.head ?? ``)
            .replace(`<!--app-html-->`, rendered.html ?? ``)

         res.status(200).set({ "Content-Type": `text/html` }).end(html)
      } catch (e) {
         vite?.ssrFixStacktrace(e)
         console.log(e.stack)
         res.status(500).end(e.stack)
      }
   })
}