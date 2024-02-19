---
marp: true
theme: default
transition: fade-out 1s
class:
  - invert
---

<style>@import url(SLIDEME.css);</style>

<style scoped>
   section { text-align:center; }
</style>

<img src='./img/reactive.png' />

# reactive.**js**
fullstack react framework


<!-- transition: swap 1500ms -->
---

<center>

## OVERVIEW

Introduction, challenges and proposal

</center>

<style scoped>{ filter:invert(0.1) }</style>
---
<!-- transition: coverflow -->


## INTRODUCTION


- React is more than 80% of frontend development
- React docs recommends its use only by frameworks
- Next.js is the most popular React framework
- Bun is the most performatic JS bundler

---
<!-- transition: coverflow -->

## CHALLENGES
> ### **react**.js

<aside right cols='3:5'>
<section>



- **scopeless CSS**
- hard state handling
- context API overnesting

</section>

```tsx
// this import will ovehides global CSS
// instead to be applied in components 
// declared in this current module

import './app.css'
```

<!-- transition: fade-out -->
---

## CHALLENGES
> ### **react**.js

<aside right cols='3:5'>
<section>

- scopeless CSS
- **hard state handling**
- context API overnesting

</section>

```tsx
function Example() {
   const [count, setCount] = useState(0)
   const changeTitle = n => document.title = 'counter:${n}'
   const increment = () => setCount(value => value+1)

   useEffect(() => { changeTitle(count) }, [count])

   // useMemo, usCallback, useReducer, etc...

   return <>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>+</button>
   </>
};
```

---

## CHALLENGES
> ### **react**.js

<aside right cols='3:5'>
<section>

- scopeless CSS
- hard state handling
- **context API overnesting**

</section>

```tsx
const Overnesting = () => <Router>
   <RouterContext.Provider value={Router}>
      <LanguageContext.Provider value={{ language, setLanguage }}>         
         <ThemeContext.Provider value={{ theme, setTheme }}>
            <QueryClientProvider client={queryClient}>
               <I18nextProvider i18n={i18n}>
                  <h1>pyramid of doom...</h1>
               </I18nextProvider>
            </QueryClientProvider>
         </ThemeContext.Provider>
      </LanguageContext.Provider>
   </RouterContext.Provider>
</Router>
```

<!-- transition: coverflow -->
---

## CHALLENGES
> ### **next**.js

<aside right cols='3:5'>
<section>

- **unsolved react issues**
- overhead conventions 
- lack of metadata scope 
  
</section>

```ts
UNSOLVED ISSUES
= scopeless css
= hard state handling
= context api overnesting

NEXT.JS CLONES
- gatsby: no ssr
- fresh: no ssr
- remix: nor ssg, or isr
```

</aside>

<!-- transition: fade-out -->
---

## CHALLENGES
> ### **next**.js

<aside right cols='3:5'>
<section>

- unsolved react issues
- **overhead conventions**
- lack of metadata scope 
  
</section>

```ts
FILE NAME CONVENTIONS 
layout, loading, error, page

FOLDER NAME CONVENTIONS
folder, [dynamic], (group)

PROPRIETARY CONVENTIONS
non-stardard JS solutions
```

</aside>

---

## CHALLENGES
> ### **next**.js

<aside right cols='3:5'>
<section>

- unsolved react issues
- overhead conventions
- **lack of metadata scope**
  
</section>

```ts
"use client" // outer scope for 'use side'

function Component() { 

   // inner scope for rendering model
   fetch({ cache: { next: revalidate:10 }})
}
```

</aside>

<!-- transition: coverflow -->
---

## PROPOSAL

A bun-based vanilla-like server-side rendering with evolved stateful client-side rendering, that brings some new features like function decorators, props binding, stateful object, etc. 
<br/>

* **full SSR** with static, dynamic and periodic rendering 
* **multi renders** with support to JSX, HTML and markdown  
* **minimalist states** with simplified OOP stateful objects
* **versatile routing** with decorator, folder and props routing 
* **props binding** for controlled/uncontrolled component props 
* **scoped CSS** with modular CSS imports with component-scope CSS


<!-- transition: swap 1500ms -->
---

<center>

## PREVIEW

<section preview>

Samples from framework features

</center>

<style scoped>
   section { filter:invert(0.1) }
</style>

---
<!-- transition: coverflow -->

<main cols='3:5'><div text>

### `server` rendering

Server startup root for SSR with high-order component error handling with support to JSX, HTML and markdown.
</div><div>

```tsx
import { server } from 'reactive/server'

const failure = (status, errors) => <>...</>

await server('/routes', { failure }).render("#root")
```

</div></main>

---

<main cols='3:5'><div text>

### `styler` plugin

Fixed CSS imports adding a className component and @style decorator for component-scoped CSS.

</div><div>

```tsx
import './module.css' // only applied here!

@style('./component.css')
const App = props => <h1>Only here</h1>
```

```css
/* 'automatic' className component tag */
button.App { background-color: 'yellow' } 
```

</div></main>

---

<main cols='3:5'><div text>

### `stater` handling

Stateful proxy object for local (stateful props), global (by DI) and orbital states for regional subtree sharing data.

</div><div>

```tsx
import share from './store'

const Component = (props, { store }) => <>
   <input value={props.name} onChange={on(props)} />
   <input value={store.name} onChange={on(store)} />
   <input value={share.name} onChange={on(share)} />
</>

const on = state => e => state.name = e.target.value
```

</div></main>

---

<main cols='2:5'><div text>

### `ranker` coding

Seach Engine Optimization (SEO) is handled by function decorators with full metatags object model.

</div><div>

```tsx
import { seo, MetaTags } from 'reactive'

// title + description
@seo('Home', 'A home page...')
export function Home() { return <>...</> }

// title + full metatags object
@seo('About', { charset: 'UTF-8', keywords: 'about,etc' })
export function About() { return <>...</> }
```

</div></main>

---

<main cols='3:5'><div text>

### `router` modelling

Reactive support static folder routing (with no conventions), decorator routing for dynamic routes, and props routing for client-side routing with support to lazy component import.

</div><div>

```tsx
const Hello = import('./hello')
   .asLazyComponent('Sample')

@route('/whatever/params/:id')
const Sample(props, { params }) => 
   <h1>ID: { params.id }</h1>

export const Menu = (props, { route }) => <>
   <a link='/hello'>Hello</a>
   <a link='/about'>About</a>

   <Hello route='/hello' >
   <label route='/about'>About...</label>
</>
```

</div></main>

---

<main cols='3:5'><div text>

### `binder` props

Binding props simplifies controlled and uncontrolled components with stateful objects, supporting validation API and RESTful server actions.

</div><div>

```jsx
const Hi = props => <input data={props} bind='name' /> 
```

```tsx
const Form = (props, { errors }) => <>
   <form data={props} {onSubmit} {onValidate}
      method="post" action="http://api.com"> 
      Name: <input bind='name' required /> 
      <button>Submit</button>
   </form>
</>

function onSubmit(data) { /* handling data */ }
function onValidate(errs) { /* handling errs */ }
```

</div></main>

<!-- transition: swap 1500ms -->

---

<center>

## REVIEW

advantages, innovations and highlights.

</center>

<style scoped>{ filter:invert(0.1) }</style>

---

## ADVANTAGES

* `FULL` SSR with SSG and ISR
* `FAST` rendering with bun.js + SSR
* `LITE` bundle with partial hydration
* `LEAN` state handling with stateful objects
* `FLEX` routing by props, folder and decorator
* `NICE` devex with cleaner and clearer code
* `EASY` SEO with function decorators

<!-- transition: fade-out -->
---

## INNOVATIONS 

<aside cols='2:5'>

- **IoC container** 
- props directive
- stateful object
- data binding

Introduces a new dependency injection system to handle global states, props directives, error handling and overall settings for server-side rendering.

</aside>


--- 

## INNOVATIONS 

<aside cols='2:5'>

- IoC container 
- **props directive**
- stateful object
- data binding

Props directive enables an injectable standalone props into JSX elements (avoiding over-componentization), similar to Angular attribute directive. It is widely use by reactive framework and support custom props directive.

</aside>

--- 

## INNOVATIONS 

<aside cols='2:5'>

- IoC container 
- props directive
- **stateful object**
- data binding

Stateful object deeply simplifies functional components state handling with OOP. It encapsulates an useState state hooks that triigers render when object is changed. It has a performatic delay render algorithm and allow multiple states as simpple object member fields.

</aside>

--- 

## INNOVATIONS 

<aside cols='2:5'>

- IoC container 
- props directive
- stateful object
- **data binding**

Reactive data binding simplifies controlled and uncontrolled components with a data props that receives a stateful object, and a bind props that get its field name, mapping in background the value and event fields.

<!-- transition: coverflow -->

---

</center>

## HIGHLIGHTS

* **SOLVES** | react.js complexity, verbosity and modular issues
* **REDUCES** | boilerplate code with stateful objects props binding
* **PREVENTS** | extra learning curve with no proprietary conventions

<style scoped>
   li strong { color:wheat; }
   li strong { font-size: 1.3rem; }
   li { 
      font-size: 1.1rem;
      list-style-type: none  
   }
   h2 { color:wheat; }
</style>

</center>

---

<center>

# `THANKS!` 

check out our documentation
[jsenaribeiro.github.com/reactive](#)


<style scoped>
   section { filter:invert(0.1) }
   h1 { font-size:3rem !important }
</style>


</center>