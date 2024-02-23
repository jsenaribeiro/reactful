<script src='./index.js'></script>
<style>@import url(./index.css);</style>

<article>
<embed type='text/html' src='./header.html' />
<header>storer handling</header>

> stateful proxy object • stateful props<br/>modular state • global state<br/> OOP state handling

## Stateful objects

Stateful proxy object (SRO) brings a new hookless concept for state handling with functional components using javascript Proxy object for a more leaner, friendly and intuitive OOP stateful components. 

## Local stateful props

Stateful props bring out-of-the-box local state handling as SRO component props.

```tsx
const Hello = props => <>   
   Local Hello { props.name } !
   <input value={props.name} {onChange} />
</>

const onChange = e => props.name = e.taget.value
```

## Global state injection

The global state is passed in server settings as storage field.

```tsx
import { server } from 'reactful/server'

const user = { name: 'world', now: new Date() } 
const settings = { storage: user }

await server("/routes", settings)
     .render("#root")
```

DI is resolve in 2nd functional component arg by stores object deconstrution.

```tsx
const Hello = (props, { store }) => <>   
   Local Hello { store.name } !
   <input value={store.name} {onChange} />
</>

const onChange = e => props.name = e.target.value
```

## Orbital modular states

This escope enables a Redux semantics with contextual subtree of components for shared states like React Context API. It enable a more controlled and determined shared states between components.

```ts
export const myStore = useStore({ guid: 0, name: 'john', date: new Date() })
```

After useStore object is changed, the render only will call in components where @state maps.

```tsx
import { state } from '@reactful/web'
import { myStore } from './stores'

@state(myStore)
const Hello = props => <>   
   Local Hello { store.name } !
   <input value={store.name} {onChange} />
</>

// it will trigger the render inside a component
const onChange = e => props.name = e.taget.value
```

<br/><br/>