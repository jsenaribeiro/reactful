---
marp: true
theme: default
transition: fade 1s
class:
  - invert
---

# Reactful Diet

---
<!-- transition: fade 300ms -->

## Reactful Diet `#0`


```tsx
import React from 'react'
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import './assets/index.css'

const ThemeContext = React.createContext()

const router = createBrowserRouter([
   { path: "/", element: <App />},
   { path: "/welcome", element: <h1>Welcome!</h1>},
])

function App(props) {
   const useTheme = React.useState("dark")
   return <ThemeContext.Provider value={useTheme}>
      <Hello />
      <Outlet />
      <a href='/welcome'>Go to Welcome...</a>
   </ThemeContext.Provider>
}

function Hello(props){    
   const [name, setName] = React.useState("World")
   const { theme } = React.useContext(Context)

   return <section className={theme}>
      <h1>Hello { props.name }!</h1>
      <input value={name} 
         onChange={e => props.name = e.target.value} />
   </section>
}

ReactDOM.createRoot(document.getElementById("root"))
        .render(<RouterProvider router={router} />)
```

---

## Reactful Diet `#1`

<article cols='5:3'><aside>

```tsx
import 'reactive-framework'
import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import './assets/index.css'

const ThemeContext = React.createContext()

const router = createBrowserRouter([
   { path: "/", element: <App />},
   { path: "/welcome", element: <h1>Welcome!</h1>},
])

function App(props) {
   const useTheme = React.useState("dark")
   return <ThemeContext.Provider value={useTheme}>
      <Hello />
      <Outlet />
      <a href='/welcome'>Go to Welcome...</a>
   </ThemeContext.Provider>
}

function Hello(props){    
   const [name, setName] = React.useState("World")
   const { theme } = React.useContext(Context)

   return <section className={theme}>
      <h1 className='hello-title'>Hello { name }!</h1>
      <input className='hello-name' value={name} 
         onChange={e => setName(e.target.value)} />
   </section>
}

React.createDOM("#root").render(<RouterProvider router={router} />)
```

</aside><aside>

- `framework root`

```tsx
import 'reactive-framework'

...

React.createDOM("#...").render(...)
```

</aside></article>

---

## Reactful Diet `#2`

<article cols='5:3'><aside>

```tsx
import 'reactive-framework'
import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import './app.css'

const ThemeContext = React.createContext()

const router = createBrowserRouter([
   { path: "/", element: <App />},
   { path: "/welcome", element: <h1>Welcome!</h1>},
])

function App(props) {
   const useTheme = React.useState("dark")
   return <ThemeContext.Provider value={useTheme}>
      <Hello />
      <Outlet />
      <a href='/welcome'>Go to Welcome...</a>
   </ThemeContext.Provider>
}

function Hello(props){    
   const [name, setName] = React.useState("World")
   const { theme } = React.useContext(Context)

   return <section className={theme}>
      <h1>Hello { name }!</h1>
      <input value={name} 
         onChange={e => setName(e.target.value)} />
   </section>
}

React.createDOM("#root").render(<RouterProvider router={router} />)
```

</aside><aside>

- framework root
- `modular CSS file`

```tsx
import './apply-only-into-module.css'
```

```css
section { ... } /* tag selecting */
```

</aside></article>

---

## Reactful Diet `#3`

<article cols='5:3'><aside>

```tsx
import 'reactive-framework'
import React from 'react'
import './app.css'

const ThemeContext = React.createContext()

function App(props) {
   const useTheme = React.useState("dark")
   return <ThemeContext.Provider value={useTheme}>
      <Hello />
      <h1 route="/welcome">Welcome!</h1>
      <a href='/welcome'>Go to Welcome...</a>
   </ThemeContext.Provider>
}

function Hello(props){    
   const [name, setName] = React.useState("World")
   const { theme } = React.useContext(Context)

   return <section className={theme}>
      <h1>Hello { name }!</h1>
      <input value={name} 
         onChange={e => setName(e.target.value)} />
   </section>
}

React.createDOM("#root").render(App)
```

</aside><aside>

- framework root
- modular CSS file
- `property routing`

```xml
<p route="/uri">Page</p>
<a href='/uri'>Go to</a>
```

</aside></article>

---

## Reactful Diet `#4`

<article cols='5:3'><aside>

```tsx
import 'reactive-framework'
import React from 'react'
import './app.css'

class AppStore { theme = "dark" }

const App = props => <>
   <Hello />
   <h1 route="/welcome">Welcome!</h1>
   <a href='/welcome'>Go to Welcome...</a>
</>

function Hello(props, { store }){    
   const [name, setName] = React.useState("World")

   return <section className={store.theme}>
      <h1>Hello { name }!</h1>
      <input value={name} 
         onChange={e => setName(e.target.value)} />
   </section>
}

React.createDOM("#root").addStore(AppStore).render(App)
```

</aside><aside>

- framework root
- modular CSS file
- property routing
- `store injection`

```tsx
class Main { ok = true }

React.createDOM("#root")
     .addStore(Main)
     .render(App)
```

</aside></article>

---

## Reactful Diet `#5`

<article cols='5:3'><aside>

```tsx
import 'reactive-framework'
import React from 'react'
import './app.css'

class AppStore { theme = "dark" }

const App = props => <>
   <Hello />
   <h1 route="/welcome">Welcome!</h1>
   <a href='/welcome'>Go to Welcome...</a>
</>

const Hello = (props, { store }) = <>
   <section className={store.theme}>
      <h1>Hello { props.name || "World" }!</h1>
      <input value={name} 
         onChange={e => props.name = e.target.value} />
   </section>
</>

React.createDOM("#root").addStore(AppStore).render(App)
```

</aside><aside>

- framework root
- modular CSS file
- property routing
- store injection
- `stateful props`


```tsx
const StatefulProps = p => <>
   <input value={p.name} 
      onChange={e => p.name = 
         e.target.value} />
</>
```

</aside></article>

---

## Reactful Diet `#6`

<article cols='5:3'><aside>

```tsx
import 'reactive-framework'
import React from 'react'
import './app.css'

class AppStore { theme = "dark" }

const App = props => <>
   <Hello />
   <h1 route="/welcome">Welcome!</h1>
   <a href='/welcome'>Go to Welcome...</a>
</>

const Hello = (props, { store }) = <>
   <section className={store.theme}>
      <h1>Hello { props.name || "World" }!</h1>
      <input bind="name" />
   </section>
</>

React.createDOM("#root").addStore(AppStore).render(App)
```

</aside><aside>

- framework root
- modular CSS file
- property routing
- store injection
- stateful props
- `data bind`


```html
<input bind="field" />
<input bind="{field}.field" />
<input bind="[array].field" />
<input bind="(store).field" />
```

</aside></article>

---

## Reactful Diet `versus` (<small>-41% lines | -52% chars </small>)

<article cols='7:4'><aside>

```tsx
import 'reactive-framework'
import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import './assets/index.css'

const ThemeContext = React.createContext()

const router = createBrowserRouter([
   { path: "/", element: <App />},
   { path: "/welcome", element: <h1>Welcome!</h1>},
])

function App(props) {
   const useTheme = React.useState("dark")
   return <ThemeContext.Provider value={useTheme}>
      <Hello />
      <Outlet />
      <a href='/welcome'>Go to Welcome...</a>
   </ThemeContext.Provider>
}

function Hello(props){    
   const [name, setName] = React.useState("World")
   const { theme } = React.useContext(Context)

   return <section className={theme}>
      <h1 className='hello-title'>Hello { name }!</h1>
      <input className='hello-name' value={name} 
         onChange={e => setName(e.target.value)} />
   </section>
}

React.createDOM("#root").render(<RouterProvider router={router} />)
```

</aside><aside>

```tsx
import 'reactive-framework'
import React from 'react'
import './app.css'

class AppStore { theme = "dark" }

const App = props => <>
   <Hello />
   <h1 route="/welcome">Welcome!</h1>
   <a href='/welcome'>Go to Welcome...</a>
</>

const Hello = (props, { store }) = <>
   <section className={store.theme}>
      <h1>Hello { props.name || "World" }!</h1>
      <input bind="name" bindOf="props" />
   </section>
</>

React.createDOM("#root").addStore(AppStore).render(App)
```

- custom attributes
- self-render states
- dependency injection
- two-way data binding

</aside></article>

<style scoped>
   small { color: #777; font-size:0.8em !important; display:inline-block;}
   li { opacity:0.75; zoom: 0.8; }
</style>

<style>@import url('./dieting.css');</style>

<style>
   aside:nth-of-type(2) pre {
      background: transparent;
      opacity: 80%;
      border:0;
   }

   aside:nth-of-type(2) li code {
      zoom: 1.3;
      background-color: #333;   
   }
</style>