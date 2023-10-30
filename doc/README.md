<style>@import url('./README.CSS');</style>

# Reactive Framework

<center top='-43' spacing='3' grey>
   Raw, easy and simple React micro-framework
</center>
<center top='-10' zoom='+15%'>

**create** | **styler** | **server** | **render** | **router** | **binder** | **syncer**

</center>

## overview

React ecosystem has some common **react.js** flaws, issues or weaknesses that brings some hard development or lack of features solved by React alternatives.

<center row-2='grey'>


| CSS modularity | stateful verbosity | over-wrapping |
|-:|:-:|:-|
| CSS global leaking in module importings | statetful boilerplate  imperative code  | component nesting overuse by providers |

With **next.js** framework, performance and SEO is improved by its SSR, but it keeps some React flaws and adds its other its own issues.

| learning overheard | akward syntax | coupled layouts  |
|-:|:-:|:-|
| extra conventions for folder and file | exporting as new semantics  | opaque layout weird injeritance |

</center>

Issues are solved intruducing new concepts and capabilities that expands the possibilities and development design into React ecosystem.

<center col1='bold' col2='grey' borderless splitted zoom='+5%'>

| | |
|-:|-|
| vanilla ware | maximize vanilla semantics  |
| self-rendering | states as Proxy objects and useState |
| two way binding | single props that writes and reads states |
| property handling | custom elements as new building block |
| dependency injection | injectable global props and local states |

</center>

The CSS scope issue is solved and the stateful verbosity is prevented with hookless states, providerless context and custom attribute directives.

<center zoom='+15%'>

```tsx
const Declarative = props => <>stateless driven</>
```

</center>
<div preview>

## preview

<center col2='grey' fill legend col3='code'>

main framework seven features

|  |  |  |
|-:|-|-|
| [**create**](#create-tool) | CLI project **starter** with pre-coded **customizable** run script | typescript, vite, deno, ssr, etc       |
| [**server**](#) | web server with hybrid **SSR** and full **async** components  | async, HTML, mini-server, transparent SSR, etc  |
| [**render**](#render-container)      | **IoC** container with transparent **SSR** and **async components**      | [`await`] (`http`) `asyncJSX`() `inject`() directives |
| [**styler**](#csss-scopings) | modular and className **CSS scope** and style props **aliases** | [`bg`] [`css`] [`shown`] `modularCSS`()       |
| [**router**](#property-routing)      | **folder-based** routing with optimized vanilla **location** API | [`route`] [`link`] (`route`) |
| [**binder**](#dual-data-binding)     | props and forms **two-way binding** with shared states by **DI** | [`bind`] (`store`) |
| [**syncer**](#fetching-as-syncher)  | **SWR** pattern fetching with new  **fluent API** with cache, retry, etc            | `useApi`() {`async`}                           |


</center>

### `create` tool

One line installation with npm and deno.

```ps
npm create @reactful/create@latest
deno -A npm:@reactful/create@latest
```

### `server` root

All resources is injecteds into React module with the new server function.

```tsx
import '@reactful/server'
import React from 'react'

React.server("index.html").render(App)
```

### `styler` plugin

The new CSS vite pluggin solves the CSS global leaking.

```js
import './App.css' // module-only scope

export const App = props => <h1>Welcome!</h1>
```

### `render` injector

The new render intruduces directives as property injection, allowing most of the framework feature and a new minimalist building block to React.

```js
const show = p => ({...p, p.hidden: !p.show})

React.server("index.html").inject(show).render(App)
```

### `router` props

Vanilla HTML rourting with semantic web `<embed>` tag and `[href]` props with new `[link]` and `[route]` props for conditional rendering.

```js
const Hello = React.useLazy('./hello')

export const Menu = (props, { route }) => <>
   <a link='/hello'>Hello</a>
   <a link='/about'>About</a>

   <Hello route='/hello' >
   <label route='/about'>About...</label>
   
   <embed src={route.now} />
</>
```

### `syncer` api

Syncer is a fluent SWR fetching solution that merges axios and react-query solution as handling async global states with retry, cache, pooling, etc.

```js
async function Fact() {
   const [fact, factSync] = await syncer("")
      .fetch("https://fact-cats")
      .retry(3, 1000)
      .catch(3000)
      .match("GET", x => x.toUpperCase())

   factSync(false) // revalidating

   return <h1>Fact cat: { fact }</h1>
}
```

### `binder` states

All props are bindable by default, acting as out-of-the useStates.

```js
const App = props => <>
   <h1> Hello { props.name }!</h1>
   <input data={props} bind="name" />
</>
```

Shared sates are handle by store injection in second component argument.

```js
class Store { name = "World" }

React.server("index.html")
     .inject(Class) // store injection
     .render(App)

const App = (props, { store }) => <>
   <h1> Hello { store.name }!</h1>
   <input data={store} bind="name" />
</>
```

Form[data] handles reactive forms (like `react-hook-forms`) with preventDefault and self-render by submit and reusing DOM Validation API with DI.

```js
const App = (props, ({ errors })) => <>
   <h1> Hello { props.name }!</h1>
   <form data={props} onSubmit={...}>
      <input required bind="name" />
      <button type='submit'>Ok</button>

      <!-- handling form validations -->
      { errors.filter(x => x.bind...) }
   </form>
</>
```
<div review>

## Review

<center>
   (working in progress)
</center>