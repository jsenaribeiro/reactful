<script src='./index.js'></script>
<style>@import url(./index.css);</style>

<article>
<embed type='text/html' src='./header.html' />

<h1 title> 
   <a href='#' onclick="goto('./overview.html')">overview</a> 
   | <a href='#' onclick="goto('./preview.html#router')">preview</a> 
   | <b>review</b>
</h1>

<header>ranker optimizing</header>

> simple folder routing • routing decorator • route params<br/>props routing • extended HTML • markdown support<br/>  lazy components • prefetch route • nested routes

## Folder routing

Simple folder routing with no extranaming conventions to serve in static routes.

<style>
   table { zoom:0.9; line-height:11px; }
   table tr th { padding-bottom: 10px; color: rgb(96, 164, 216); font-weight:400 !important; }
   table tr:nth-of-type(1) td { padding-top: 10px; }
   table tr td:nth-of-type(3) { color:grey; }
</style>

| DIRECTORY                 | ROUTING                | RESOLUTION          |
| ------------------------- | ---------------------- | ------------------- |
| /routes/index.tsx         | localhost:3000/        | index JSX           |
| /routes/about.tsx         | localhost:3000/about   | filename JSX        |
| /routes/sample.html       | localhost:3000/sample  | filename HTML       |
| /routes/example.md        | localhost:3000/example | filename markdown   |
| /routes/profile/index.tsx | localhost:3000/profile | subfolder index JSX |

Resolution conflicts will throw exception in build time. 

| CONTEXT SAMPLING                             | CONFLICT TYPE                 |
| -------------------------------------------- | ----------------------------- |
| file.tsx, file/index.tsx                     | filename x index              |
| file.html, file.tsx, file.md                 | filename x extensions         |
| file.html, file.tsx, file.md, file/index.tsx | filename x extensions x index |

## Nesting routing

<style>
   aside[nesting] table td { padding:0; }
   aside[nesting] table tr { padding:0; }
</style>

<aside nesting cols='4:5'>

Normal routes starts with slash (**/**), meanwhile nesting routes starts with dot slash syntax (**./**) based on current file path.

|                        |           |                       |
| ---------------------- | --------- | --------------------- |
| /                      | ./about   | /about                |
| /admin/system          | ./account | /admin/account        |
| /user/profile/overview | ./details | /user/profile/details |

</aside>

## Async components

React server components, enabling async components and easier data fetching. 

```tsx
async function AsyncSample(props) {
   const text = await fetch('http://www.some-url.com')
   return <h1>awaited content = { text }</h1>
}
```

Reactful async components supports React Suspense API.

```tsx
const SuspenseSample = async props => <>
   <Suspense fallback={<b>loading...</b>}>
      <AsyncSample />
   </Suspense>
</>
```

It introduces an inverse props-driven Suspense alternative as await props. It works replacing its children after its await component is loaded by component streaming. 

```tsx
const AwaitPropsSample = async props => <h1 await={AsyncSample}>loading...</h1>
```

## Dynamic routes

The @route functions decorator support route params with priority above folder routing.

```tsx
import { route } from '@reactful/web'

@route('/whatever/profile/:id')
export default async function Profile(props, { params }) {
   const user = fetch(`${url}/${params.id}`).then(x => x.json())

   return <>
      <h1>Profile</h1>
      <h2>User ID: { params.id }</h2>
      <h3>User name: { user.name }</h3>
   </h1>
}
```

## Props routing

The `[route]` and `[link]` props  enable client-side routing for element conditional.

```tsx
export default const Menu = (props) => <>
   <h1>Menu</h1>

   <!-- [link] client-side router -->
   <a link='/main'>Main</a>

   <!-- [route] conditional rendering -->
   <main route='/main'>Main</main>
</!->
```

## Lazy routing

Client-side route component is lazy loaded by promise extension `asLazyComponent`.

```tsx
const Sample = import('./main').asLazyComponent('Sample')
const Sample = importComponent('./main', 'Sample')
const Sample = useRoute(import('./main'), 'Sample')

export default const Menu = (props) => <>
   <h1>Menu</h1>

   <!-- [link] router -->
   <a link='/sample'>Sample</a>

   <!-- [route] lazy routing -->
   <Sample route='./lazy' />
</!->
```

## Routed styling

A `routed` className is for current route is inserted in element`[link]` for 'active' styling.

```css
button.routed { background: wheat; font-weight: bolder; }
```

As client-side routing, props routing not renders by request or after refresh. When a not found happens, the reactful responde with nearest route available.

## New concepts

The reactful routing come with some new concepts, behaviors and approachs that keep the code more leaner, readable and intuitive, but is slightly differente from popular frameworks.

<style>
   [concept] table tr td:nth-of-type(1) {
      font-weight: 500 !important;
   }
</style>

<section concept>

| CONCEPT               | DESCRIPTION                                                     |
| --------------------- | --------------------------------------------------------------- |
| declarative redirects | Redirect is declarativilly handled with conditional returns.    |
| fullstack routing     | Server routing sends prefetched routes to client-side usage     |
| fallback falts        | Not found route fallbacks to its nearest available route in URL |

</section>


Here a sample of a declarative redirect with a simple conditional component return.
```tsx
function Component(props) { return condition_1 ? <Redirect1 /> : <>etc...</> }
```

<br/><br/>