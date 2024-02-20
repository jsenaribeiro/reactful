import React from "react"
import { shown } from './directives'
import { server } from "@reactful/server"

const storage = { name: "ok" }

await server("/routes", { failure, storage })
     .inject(shown)
     .render("#root")

function failure(status, errors) {
   const children: any[] = errors.map((x, i) => 
         React.createElement('li', { key:i }, x))

   return React.createElement('div', {}, [
      React.createElement('h1', {}, status),
      React.createElement('ul', {}, children),
   ])
}