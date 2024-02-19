<script src='./index.js'></script>
<style>@import url(./index.css);</style>

<article>
<embed type='text/html' src='./header.html' />
<header>server rendering</header>

> static rendering • dynamic rendering • periodic rendering <br/>react server components • partial hydration • web apis<br/>extended html • error handling • markdown

## Server startup API

Reactive startup is a server function that serves a routes folder with its container routes/index.html. Its host port default is 3000 in .env file.

```ts
/* define the route folder and customize settings */
server(routes: string = '/routes', settings: { etc... })

/* inject custom props directives (see Binder section) */
inject(directive: Proper)

/* pass the query selector for root element */
render(query: string = "#root")
```

Here a sample of startup reactive index file in /index.ts

```ts
import { server } from 'reactive/server'
import { directive1, directive2 } from './directives'

await server("/routes", { etc... })
     .inject(directive1)
     .inject(directive2)
     .render("#root")
```

## Server folder models

Reactive `/apis`, `/assets`, and `/routes`, where **'/api'** servers RESTful APIs with as exported functions. 

```ts
// file: /apis/sample.ts
// route: http://localhost:3000/api/sample
// warning: route is both resolved as /api and /apis
export const get = (request: Request) => new Response('Hello World!')
```

The **/assets** folder serves all static content as images, styles, sounds, etc. 

```html
<link rel="stylesheet" href="/assets/styles.css" />
```

The **/routes** folder supports JSX, HTML and markdown by filename and folder/index.

```ts
// routing name conflict will throw a build exception 
>> about.md x about.tsx x about.html x about/index.tsx
```


## Client-side components

Client components are modelled with @client function decorators. A more component-scope alternative than next.js modular 'use client' and intra-component fetch api extensions. 

```tsx
@client
export default const ClientSideRendered = props => <>...</>
```

## Server-side components

Static, dynamic and periodic SSR is supported sing @server function decorator as metadata for default exported components. The static SSR is the default rendering model (implicit).

```tsx
@server('static') // default
export default const Static = props => <>...</>

@server('dynamic')  
export default const Dynamic = props => <>...</>

@server('periodic', "36h") 
export default const Periodic = props => <>...</>
```

React server component enables async components, supporting Suspense component API.

```tsx
import { Suspense } from 'react'

export default async function AsyncComponent(props) {
   const user = await fetch(url).then(x => x.json())
   const loading = <h1>loading...</h1>

   return <Suspense fallback={loading}>
      Hello { hello.name }
   </Suspense>
}
```

## Extended renders

Markdown and HTML are supported a new `<link>` extension for JSX usage inside HTML.

```html
<head>
   <link type="component" href="../components/header.tsx" rel="Header" />
</head>
<body>   
   <Header title="HTML-X" /> <!-- JSX into HTML -->
</body>
```

## Exception components

Reactive renderas a default global error component that could be replaceable in failure member in reactive settings object in server call.

```tsx
import { server } from 'reactive/server'

// sampling a custom high-order component error
const myGenericErrorComponent = (status, errors) => <p>
   <h1>My generic error page...</h1>
   <ul>{ errors.map((x,i) => <li key={i}>{ x }</li>) }</ul>
</p>

// replacing default failure HOC for error handling
const settings = { failure: MyGenericErrorComponent }

// starting reactive server with custom error component
await server("#root", settings).render("#root")
```

With `@error` decorator, specific error handlers could be shared between components.

```tsx
import { error } from 'reactive'

// sampling a custom high-order component error
const mySpecificErrorComponent = (status, errors) => <p>
   <h1>My specific error page...</h1>
   <ul>{ errors.map((x,i) => <li key={i}>{ x }</li>) }</ul>
</p>

@error(mySpecificErrorComponent)
export function Sample() { ... }

@error(mySpecificErrorComponent)
export function Example() { ... }
```

<br/>