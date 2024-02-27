PENDINGS
- playwright tests is failing
- custom form[data] client validationApi only after first render
- article: problems, foundations, etc
- mounting markdown lib css

FUTURES
- DI de dom.id
- recursive reactivity
- remote states for stater

DISCLAMERS
- inner components must be declared before outer components
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

await props (requires export)

```tsx
@client(true)
function Component(props) {
   return <div await={AsyncComponent}>loading...</div>
}
```