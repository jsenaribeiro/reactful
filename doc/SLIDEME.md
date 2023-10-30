---
marp: true
theme: default
transition: fade 1s
class:
  - invert
---

<style>@import url("./SLIDEME.css");</style>

<center class='logo'>

### reactful.js

<!-- TODO: who I am -->

Comprehensive stateless-driven React SPA framework
`@jsenaribeiro | software architect | MCS degree`

<style scoped>
   section, h1, center { font-weight:1 !important; }
   h3 { font-size: 2rem; padding-bottom:0; }
   h3 { color: wheat;  }
   center { 
      zoom:1.2;
      opacity: 0.8;
      padding-top: 99px;
      background-size: 123px;
      background-repeat: no-repeat;
      background-position: top center;
   }  
</style>

<!-- transition: swap 1500ms -->
---

<center overview>

## OVERVIEW

designs, concepts and features

</center>

<style scoped>{ filter:invert(0.1) }</style>


---
<!-- transition: coverflow -->

<center>

### WEAKNESSES

<article cols='2' none splitted>
<aside right>

###  `react`.js

* scopeless CSS
* over-wrapping
* state verbosity

</aside><aside left>

### `next`.js

* over-conventions 
* adds learning curve
* non-modular features

</aside>
</article>
</center>

---

<center none>

### DESIGNING

<div top="-43">
   design-driven solutions<br/><br/>
</div>

* **STATELESS** <br/>`const clean = props => <h1>stateless</h1>`
  
* **DRY** | **KISS** | **YAGNI** <br/>low-level vanilla abstrations with modular packages

* **create** | **server** | **render** | **styler** | **router** | **syncer** | **binder** <br/>comprehensive SPA framework features with enhanced new features.

</center>

<style scoped>   
   h3, li { margin-bottom:30px; }
   code { padding:0; margin:0; zoom:1.2; color:silver; }
</style>

--- 

<center>

### INOVATIONS

**dual binding** | **IoC container** | **props directives** | **self-render** <br/>new React expandend development ways with new capabilities

</center>

<style scoped>
   li { list-style-type: none !important; }
   li {  margin-left:-50px; }
   strong { font-size: 1.1rem; }   
</style>

<!-- transition: swap 1500ms -->
---

<center>

## PREVIEW

<section preview>

some sampling codes of main features
<div hidden zoom>

### `feature` contexts - <span> alternative|alternative</span>

</div>

</center>

<style scoped>
   section { filter:invert(0.1) }
   div[zoom] { zoom:0.75; background: #000; }
   div[zoom] span { 
      display:inline;
      font-size: 1.7rem;
   }
</style>

---
<!-- transition: coverflow -->


### `create` tool

<main cols='2:5'><div>

CLI project setup starter

<section alternative>

- create-next-app
- create-react-app
- create-vite-extra

<section>

</div><div>

```tsx
npm create @reactful/create@latest
deno -A npm:@reactful/create@latest
```

</div></main>

---

### `server` root

<main cols='2:5'><div>

Lite webserver for SSR with React Server Components support

<section alternative>

- next.js
- qwik.js
- fresh.js

<section>

</div><div>

```tsx
import '@reactful/server'
import React from 'react'

React.server(true, "index.html")
     .render(App, "#root")
```

</div></main>

---

### `render` IoC

<main cols='2:5'><div>

IoC container with built-in property directives.

</div><div>

```tsx
const show = p => ({...p, p.hidden: !p.show})

React.server(true).inject(show).render(App)
```

</div></main>

---

### `styler` plugin

<main cols='2:5'><div>


Scoped modular CSS imports with className component tag

<section alternative cancel>

- React.js
- CSS modules
- styled components

<section>

</div><div>

```css
button.App { background-color: 'yellow' } 
```

```tsx
import './App.css' // only applied here!

const App = props => <h1>Only here</h1>
```

</div></main>

---

### `router` props

<main cols='2:5'><div>

Simple folder-based with props routing using semantic web.

<section alternative>

- next.js
- react-router

<section>
</div><div>

```tsx
const Hello = React.useLazy('./hello')

export const Menu = (props, { route }) => <>
   <a link='/hello'>Hello</a>
   <a link='/about'>About</a>

   <Hello route='/hello' >
   <label route='/about'>About...</label>
   
   <embed src={route.now} />
</>
```

</div></main>

---

### `syncer` fetching

<main cols='2:5'><div>

Fully SWR async shared states based in sync semantics

<section alternative>

- fetch | axios
- react-query
- next.js

<section>
</div><div>

```tsx
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

</div></main>

---

### `binder` states

<main cols='2:5'><div>

Dual bindable props, injectable store and reactive forms with new two way data binding props

<section alternative>

- useState | useContext
- next.js (server actions)
- react-hook-forms
- formix

<section>

</div><div>

```js
const App = (props, { store }) => <>
   <h1>{ store.title }</h1>

   <h2> Hello { props.name }!</h2>
   <input data={props} bind="name" />

    <form data={props} onSubmit={...}>
      <input required bind="name" />
      <button type='submit'>Ok</button>
   </form>
</>

class Store { title = "Welcome!" }

React.server(true).inject(Store).render(App)
```

</div></main>

---

### `binder` states 
> statetul props

<main cols='2:5'><div>

Self-rendering stateful props that encapsulates an useState

<section alternative>

- useState

<section></div><div>

```js
const App = props => <>
   <h2> Hello { props.name }!</h2>
   <input value={props.name} onChange={e => 
      props.name=e.target.value} />
</>
```

</div></main>

---

### `binder` states 
> store injection

<main cols='2:5'><div>

Self-rendering stateful store that is injected by IoC container

<section alternative>

- useContext
- createContext
- Context.Provider

<section></div><div>

```js
class Store { title = "Welcome!" }

const App = props, ({ store }) => <>
   <h2> { store.title } </h2>
   <input value={store.title} onChange={e => 
      props.title=e.target.value} />
</>

React.server(true).inject(Store).render(App)
```

</div></main>

---

### `binder` states 
> dual binding

<main cols='2:5'><div>

New `[data]` and `[bind]` props handle the data bindings.

<section alternative>


<section></div><div>

```js
const App = props => <>
   <h2> Hello { props.name }!</h2>
   <input data={props} bind="name" />
</>
```

</div></main>

---

### `binder` states 
> statetul props

<main cols='2:5'><div>

Self-rendering stateful props that encapsulates an useState

<section alternative>

- useState

<section></div><div>

```js
const App = props => <>
   <h2> Hello { props.name }!</h2>
   <input value={props.name} onChange={e => 
      props.name=e.target.value} />
</>
```

</div></main>

</section> <!--preview -->

<!-- transition: swap 1500ms -->
---

<center>

## REVIEW

Reviewin features, concepts and design principles.

</center>

<style scoped>{ filter:invert(0.1) }</style>
---
<!-- transition: coverflow -->

</center>

## HIGHLIGHTS

* **ADDS** | self-render, IoC container and custom attribute
* **SOLVES** | scopeless CSS, stateful verbosity and over-wrappings
* **EVOLVES** | fully react.js SPA framework transformation
* **REDUCES** | stateful learning curve with binder module
* **SUPPORTS** | stateless-driven components style

<style scoped>
   li strong { font-size: 1.3rem; }
   li { 
      font-size: 1.1rem;
      list-style-type: none  
   }
   h1 {      
      margin-bottom:0;
      padding-bottom:0;
   }
</style>

</center>

---

<center>

# `THANKS!` 

working in progress...


<style scoped>
   section { filter:invert(0.1) }
   h1 { font-size:3rem !important }
</style>


</center>