<script src='./index.js'></script>
<style>@import url(./index.css);</style>

<article>
<embed type='text/html' src='./header.html' />

<h1 title> 
   <a href='#' onclick="goto('./overview.html')">overview</a> 
   | <a href='#' onclick="goto('./preview.html#storer')">preview</a> 
   | <b>review</b>
</h1>

<header>storer handling</header>

> stateful proxy object • stateful props<br/>modular state • global state<br/> OOP state handling

## Stateful objects

Stateful proxy object (SRO) brings a new hookless concept for state handling with functional components using javascript Proxy object for a more leaner, friendly and intuitive OOP stateful components. SRO uses **delayed render** algorithm that enables a performatic approach batching successives changes in a single render call in each 0.1 second range.

## Local stateful props

Stateful props bring out-of-the-box local state handling as SRO component props.

```tsx
const Hello = props => <>   
   Hello { props.name } !
   <input value={props.name} {onChange} />
</>

const onChange = e => props.name = e.taget.value
```

## Global state injection

Global state is injected in Reactful server and resolved as store in component 2nd argument.

<aside cols='4:5'>

```tsx
import server from '@reactful/server'

const user = { name: 'world' } 
const settings = { storage: user }

await server("/routes", settings)
     .render("#root")
```

```tsx
function Hello(p, { store }) {
   const on = e => p.name = e.target.value

   return <>   
      Hello { store.name } !
      <input value={store.name} onChange={on} />
   </>
}
```

</aside>

## Orbital modular states

This escope enables a Redux semantics with contextual subtree of components for shared states like React Context API. It enable a more controlled and determined shared states between components.

```ts
export const myStore = useStore({ guid: 0, name: 'john', date: new Date() })
```

After useStore changed, the render calls in components where @state maps.

```tsx
import { state } from '@reactful/web'
import { myStore } from './stores'

@state(myStore)
const Hello = props => <>   
   Hello { store.name } !
   <input value={store.name} {onChange} />
</>

// it will trigger the render inside a component
const onChange = e => props.name = e.taget.value
```

## IoC Container + forwardRef

As shown in global state, reactful has a IoC container wher DI is resolved by 2nd functional component argument deconstrution. This 2nd argument is typed as Feeds interface. 

<aside cols='2'>

```tsx
import '@reactful/extensions'

function Sample(props, feeds: Feeds) {  
   return <>...etc</>
}
```

```ts
interface Feeds {
   param: record    // route params
   store: record    // global state
   logon: record    // logged user
   await: boolean   // pending fetch
   fails: Invalid[] // fetch errors
   ref: any         // forwardRef
}
```
</aside>

The React19 2nd argument ref is handled as ref field inside feeds object.

```tsx
function React19(props, ref) {  return <>...etc</> }

function Reactful(props, { ref }) {  return <>...etc</> }
```

<br/><br/>