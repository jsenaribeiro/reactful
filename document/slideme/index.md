---
marp: true
theme: default
transition: fade 1s
class:
  - invert
---

<style>@import url(index.css);</style>

<style scoped>
   section { text-align:center; }
   img { margin: 0 auto; }
</style>

<img src='../img/reactful.png' width='150px' />

# reactful.**js**
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
- React docs recommends be used only by frameworks
- Next.js is the most popular React framework

---
<!-- transition: fade-out -->

## CHALLENGES

<style scoped>
   [vertical] {  
      zoom: 0.9;
      display: flex;
      align-items: center;
   }   
   aside[right] { padding-top: 30px; }
</style>

<aside right cols='3:5'>
<section vertical>

- **boilerplate code**
- counterintuitive rules
- context pyramid of doom

</section>

```tsx
import React from 'react'

function Example() {
   const [count, setCount] = useState(0)
   const on = () => setCount(count + 1)

   return <>
      <h1>Counter: {count}</h1>
      <button onClick={on}>+</button>
   </>
};
```

---

## CHALLENGES

<style scoped>
   [vertical] {  
      zoom: 0.9;
      display: flex;
      align-items: center;
   }   
   aside[right] { padding-top: 30px; }
   code { zoom:0.9 }
</style>

<aside right cols='3:5'>
<section vertical>

- boilerplate code
- **counterintuitive rules**
- context pyramid of doom

</section>

```
Some Hook rules and concerns:

- Don't call inside loops
- Don't call inside conditions
- Don't call inside nested functions
- Don't call after a return statements
- Must keep same order in every render cycle
- Must be called in top-level functional components
- Asynchronous states requires useState + useEffect
- Manual risk management of useEffect endless loops
- Risk of low-performance (useMemo + useCallback)
```

---

## CHALLENGES


<style scoped>
   [vertical] {  
      zoom: 0.9;
      display: flex;
      align-items: center;
   }   
   aside[right] { padding-top: 30px; }
</style>

<aside right cols='3:5'>
<section vertical>

- boilerplate code
- counterintuitive rules
- **context pyramid of doom**

</section>

```tsx
const Overwraping = () => <>
   <Router>
      <RouterContext.Provider value={Router}>
         <LanguageContext.Provider value={{ lang, setLang }}>         
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
</>
```


<!-- transition: coverflow -->
---

## PROPOSAL

A stateful handling using javascript Proxy object that encapsulates a `useState` hook within a server-side rendering framework to maximize its performance.
<br/>

* **stateful objects**: reactive self-rendering objects (during changes)
* **relayed render**: batching render algorithm for stateful objects 
* **stateful props**: component props to handle local states 
* **state injection**: global states handled by framework IoC container
* **orbital states**: shared states within a component tree (context API)


<!-- transition: swap 1500ms -->
---

<center>

## PREVIEW

<section preview>

Sampling code with stateful objects

**local** | **global** | **orbital**

</center>

<style scoped>
   section { filter:invert(0.1) }
</style>

---
<!-- transition: coverflow -->

<style scoped>
   table * { border:0 }
   table tr td:first-of-type { color: wheat }
   h2 { color: silver !important }
</style>

## `stateful` scopes

| | | 
|-:|-|
| LOCAL | when the state is changed, only in the component where the state ins created will trigger the render, impacting also its children components |
| GLOBAL | all the component tree read and write the state, and when the state is changed, all the component tree will be re-rendered |
| ORBITAL | state is accessible in a part of component tree, acting like multiple local states that could be trigger the render after the state is changed |

---

<main cols='3:5'><div text>

### `local` stateful props

<p subtitle>unified state+props concept</p>

Stateful props is the framework transformation of all component props in stateful objects made by Reactful framework, unifying the React concepts of props and states. With the new binding props the code is even leaner.

</div><div>

```tsx
import React from 'react'

// React: useState
function React(props) {
   const [name, setName] = React.useState('')
   const onName = e => state.name = e.target.value
   return <input value={name} onChange={onName(props)} />
}
```
```tsx
// Reactful: stateful props
const Reactful = props => <input value={props.name} 
   onChange={e => props.name = e.target.value} />

// Reactful: stateful props + binding props
const Reactful = props => <input bind='name' />
```

</div></main>

---

<main cols='3:5'><div text>

### `global` state injection

<p subtitle>IoC container for global state</p>

There is no global state properly in React, but just a contextual state that is generally put into root component (then the state works like a global one). In Reactful offers a global state as stateful object with dependency injection and framework IoC.

</div><div>

```tsx
import server from '@reactful/server'

const myGlobalState = { name: 'world' } 
const settings = { storage: myGlobalState }

// injecting a global state into IoC container
await server("/routes", settings).render("#root")
```
```tsx
// DI with 2nd argument destructring
function Hello(p, { store }) {
   const on = e => p.name = e.target.value
   return <> Hello { store.name } !
      <input value={store.name} onChange={on} />
   </>
}
```

</div></main>

---

<!-- transition: fade-out -->

<main cols='2'>
<aside text>

### `orbital` module state <span small>1/3</span>

<p subtitle>implementation steps comparison </p>

**REACTFUL** ORBITAL STATE

- import useStore and state
- create a useStore object
- decorated by @state(store)

</aside>
<aside>

**REACT** CONTEXT API

- import useState and createContext
- create a createContext object
- wrap parent component with Context
- put useStates inside Context value
- import/use custom Context object
- import useContext
- get the useStates with useContext

</aside></main>

---

<main cols='4:5'>
<aside text>

### `orbital` module state <span small>2/3</span>

<p subtitle>implementation code comparison</p>

**REACTFUL** ORBITAL STATE

```tsx
import { useStore } from '@reactful/web'
import { state } from '@reactful/web'

const theme = useStore({mode:'light'})

@state(theme) const Hello = () => <>
   <div>Theme = {theme.mode}</div>
</>
```
</aside>
<aside>

**REACT** CONTEXT API

```tsx
import React from 'react'

const MyContext = React.createContext(null)

function App() {   
   const useTheme = React.useState('light')

   return <>
      <MyContext.Provider value={{useTheme}}>
         <Hello />
      </MyContext.Provider>
   </>
}

function Hello() {
   const useTheme = useContext(MyContext)
   return <div>Theme = {useTheme[0]}</div>
}
```

</aside></main>

---

<main cols='2'>
<aside text>


### `orbital` module state <span small>3/3</span>

<p subtitle>Render algorithm comparison</p>

**REACTFUL** ORBITAL STATE

When an orbital state is changed, only the related components that uses an @state decorator with the related orbital state will render.

</aside>
<aside>

**REACT** CONTEXT API

The component where the custom Context is wrapped enable its children to import and use the created custom context object (minimizes useless render). 

When this context state is change, all the component tree wrapped by custom Context component will be render.

</aside></main>

<!-- transition: swap 1500ms -->

---

<center>

## REVIEW

advantages, innovations and highlights.

</center>

<style scoped>{ filter:invert(0.1) }</style>

---

</center>

## HIGHLIGHTS

* **SOLVES** stateful complexity and verbosity
* **REDUCES** boilerplate code with stateful objects
* **PREVENTS** low learning curve reusing OO paradigm

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
[jsenaribeiro.github.com](#)


<style scoped>
   section { filter:invert(0.1) }
   h1 { font-size:3rem !important }
</style>

</center>