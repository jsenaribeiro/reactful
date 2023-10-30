<style>@import url('../README.CSS');</style>

## runner

<center top='-15'>

project creator, folder structure and script runner

</center>

### Installation

Reactful has a script creation based in deno + vite, but all defaults could be replaceable with manual instalation.

```cmd
> deno run -A npm:create-reactful@latest
```

The CLI will install 3 dependencies: react, reactful and typescript.

```
-------------------------------------------
          @reactful CLI creator
-------------------------------------------
= project name? my-first-reactful-project
= OS (windows=1 | linux=2 | mac=2)? 1
  
installing packages...
- react
- reactful
- typescript
```

After started will show a basic tutorial 

```properties
cd my-first-reactful-project
run dev    -- debug watching
run build  -- build release
run server -- run release
```

### Getting started

The project starts with os-dependent run script with all starter command using deno and vite. As a script, it could be freely modified or extended.

```cmd
set ARG="-A --node-modules-dir"

if "%1"=="" ( deno run %ARG% npm:vite )
if "%1"=="dev" ( deno run %ARG% npm:vite )

...etc
```

Instead of usual importing, a anonymous @reactful import, extends React module itself, adding a the new `server()` function for server-side rendering (SSR) based in React Server Components (RSC).

```tsx
import '@reactful/server'
import React from 'react'

React.server("routes/index.html").render(App)
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

Reactful is a modular framework with SSR as core feature, it means that you could just import particular module, instead of full framework.

<aside cols='2' top='-20'><div>

#### all `framework`

```tsx
import '@reactful'
```

</div><div>

 #### `SSR` only

```tsx
import '@reactful/server'
```

</div></aside>



### Source structure

Project is flatten structured with configuration-only root files added with server.js startup node server.

<style>
   section[folder] td:first-of-type { color:white !important  }
</style>

#### root files

<section folder>

| | |
|-|-|
| .env | environment files |
| .gitignore | git ignore files |
| .deno.lock | Deno lock file |
| README.md | project documentatoin |
| server.js | startup node server 
| run.bat  | OS dependent runner file |

</section>

#### root folders

Project is flatten one-level structured without 'src' or 'app' extra folder project, the root folder project is the 'src' itself.

<section folder>

| | |
|-|-|
| /apis | **optional** RESTful api |
| /assets | public content: CSS, images, etc |
| /commons | shared content: types, interfaces, etc |
| /components | JSX components (custom element) |
| /directives | custom attribute handlers |
| /libraries | **optinal** NPM package content |
| /releases | build content (A.K.A. dist) |
| /routes  | HTML pages (index.html) |

</section>

#### **routes** folder

A simple folder-based routing is served here that is complemented with component scope routing for advanced route features (like params).

<section folder>

| | |
|-|-|
| /about | sample about page |
| /todos | sample todos page |
| index.html | entry HTML |
| header.html | Deno lock file |

</section>