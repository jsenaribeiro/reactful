import Express from 'express'
import { renderToString } from 'react-dom/server'

export async function server() {
   const DIST = process.env.DIST || 'dist'
   const PORT = process.env.PORT || 4444
   const TEXT = `Listen http://localhost:${PORT}`

   const http = Express()

   http.use(Express.static(DIST))

   http.get('/:path', async (req, res) => {
      const dir = join(process.cwd(), DIST, 'routes')
      const page = import(dir)
      const props = req.query
      const Component = page.default
      const html = renderToString(<Component {...props} />)

      console.log({dir, page, props, Component, html})

      res.end(html)
   })

   http.listen(PORT, () => console.log(TEXT))
}