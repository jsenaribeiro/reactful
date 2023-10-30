<style>@import url('./README.CSS');</style>




```ts
interface IoC<I18N,Store> {
   http: { url, body, cache, header, status }
   i18n: { ...locales, idiom, change() }
   route: { current, params, stack, onBack, onNext }
   store: { ...store }
}

// type MyType = ReturnType<typeof func>
export default React
   .create("#root", true)
   .addStore(AppStore)
   .addLocale<I18N>("en-us", EN_US)   
   .addLocale<I18N>("pt-br", PT_BR)
   .addPropery("shown", p => p.hidden = !p.shown)
   .render(App)

// IOT is also exported with corret feeds type
// export type IOT = ReturnType<typeof f>

const Concept = (props, ({ i18n }): IoT) = <>
   <h1> { i18n.hello } </h1>
   <input bind="name" />
</>
```

```tsx
const App = props => <>
   <Hello name="world" />
</>

// self-render props (as local states)
const Hello = props => <>
   <h1>Hello { props.name }</h1>
   <input bind="name" scope="default=forms|store|state|route" />
   <input value={props.name} onChange={e => props.name = e.target.value} />
</>
```

## data binding

```html
<!-- binding name --->
<input data={state} bind="title" />  

<!-- binding deep --->
<input data={state} bind="person.address.street" />  

<!-- binding type (lambda) --->
<input data={state} bind={(x:string) = x.toLowerCase()} />  

<!-- binding form (object) --->
<form data={state}><input bind="field"></form> 

<!-- binding loop (arrays) --->
<ul data={state}><input bind="field"></ul> 
```