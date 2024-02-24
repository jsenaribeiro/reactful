FIXINGS
- fix playwright tests
- hot loading not working
- types failing in commons
- shown custom directive type (poc - login.tsx)
- custom form[validation] only after first render

PENDINGS
- article: problems, foundations, etc
- mounting markdown lib css
- remote states for stater
- peerDependence: react react-dom
- individual suspenses?
- await props

FUTURES
- DI de dom.id
- recursive reactiveness
- fallback routing

WARNINGS
- function decorator intelisense warning (pending)
- custom props directive no support imports
- modular CSS not support pseudo-selectors
- no inner async component intelisense 


AWAIT DESIGNING

```tsx
<div await={InnerAsyncComponent}><h1>Loading...</h1></div>
<Loading await={InnerAsyncComponent} />
```

DI DOM ID

```tsx
function Component(props, { id }) {
   console.log(id.myDiv.innerHTML)

   return <div id='myDiv'>testing</div>
}
```

RECURSIVE REACTIVENESS

```tsx
function Component(props) {
   console.log(id.myDiv.innerHTML)

   const onClick = () => Component(props)

   return <div id='myDiv'>testing</div>
}
```