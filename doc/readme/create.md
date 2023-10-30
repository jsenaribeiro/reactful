<style>@import url('../README.CSS');</style>

## creating

### Installation

To start a new project its needs deno installed.

```properties
deno -A npm:reactful/create
name? my-project
OS? windows | linux | mac?
```

After started will show a basic tutorial 

```properties
   cd sample
   run dev    -- debug watching
   run build  -- build release
   run server -- run release
```

The run script is downloaded base in witch OS is chose. As a simple script, it could be freely modified or expanded as well.

```cmd
set ARG="-A --node-modules-dir"

if "%1"=="" ( deno run %ARG% npm:vite )
if "%1"=="dev" ( deno run %ARG% npm:vite )

...etc
```

### Structure

Project is simple structured with **pub**, **lib** and **src** folders, and with `.gitignore`, `server.js`, `README.md` and `run` files. Some folder are only enabled by specific modules, as mentioned below between parentheses.

<section folder>

| | |
|-|-|
| pub/ | optimized version for production publication |
| lib/ | node_module folder alias |
| src/ | project   |
| &nbsp;├ assets/ | public content: CSS, images, etc |
| &nbsp;├ commons/ | shared content: types, interfaces, etc |
| &nbsp;├ components/ | JSX custom elements (render-only) |
| &nbsp;├ directives/ | custom attribute handlers |
| &nbsp;├ layouts/ | partial HTMLs (router-only) |
| &nbsp;├ routes/  | HTML pages (router-only) |
| &nbsp;├ index.html | entry HTML |
| &nbsp;└ index.tsx | root component |

</section>

### Startup

New React startup by server rendering default (hybrid rendering) with support to async component in client and server side.

```tsx
import '@reactful/server'
import React from 'react'

React.server("/index.html")
     .render(App)
```

<style>
   section[folder] {
      & table { width:100% }
      & td:not(:first-of-type) { opacity:0.7; }
      & td {
         white-space:pre !important;
         line-height: 13px;
      }

   }
   section[folder] 
</style>

Reactive is as a compreensive SPA framework features, but each package coulde be separatelly imported by `@reactful` modules.

<aside cols='2'>

```tsx
// independent packages
import '@reactful/server'
```

```tsx
// all-in-one packages
import '@reactful'
```

</aside>