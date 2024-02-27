FIXINGS
- fix playwright tests
- hot loading not working
- custom form[data] client validationApi only after first render

PENDINGS
- article: problems, foundations, etc
- peerDependence: react react-dom
- mounting markdown lib css
- remote states for stater
- individual suspenses + await props (requires exports)

FUTURES
- DI de dom.id
- recursive reactiveness

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