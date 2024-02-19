<script src='./index.js'></script>
<style>@import url(./index.css);</style>

<article>
<embed type='text/html' src='./header.html' />
<header>styler scopings</header>

> module scope CSS • component scope CSS • layout props <br/>function decorator • SoC styling • vanilla-like CSS


## Modular CSS imports

Reactive fixes global CSS leaking in CSS imports, applying CSS imports only in module components.


<aside cols='2'>
<section>

```tsx
export const About = () => 
   <h1>About Hello!</h1>
```

```tsx
import './hello.css'
export const Hello = () => 
   <h1>Hello World!</h1>
```

</section><section>

```css
/* global.css */
h1 { color: blue; }
```

```css
/* modular css sample */
/* file: ./hello.css */
h1 { color: black; }
```

</section></aside>

**WARNING!** Modular CSS imports has no support for pseudo-selectors (:hover, :active, etc).

## Component scope CSS

The `@style` decorator enables component-scope CSS programmatically in JSX.

```tsx
@style('./hello.css')
export default const Hello = () => <h1>Hello World!</h1>
```

In global CSS is also possible achive component-scope CSS using component name as className CSS. Reactive transform all component name as className CSS for its children.

<aside cols='2'>

```tsx
import './hello.css'

function Hello() {
   return <h1>Hello World!</h1>
}
```

```css
button.Hello { 
   color: green;
   padding: 10px 20px;
   background-color: silver;
}
```

</aside>

## Grid layout props

New style props directive, enable easy grid layout with `[grid]` setting `display:grid` and `[cols]` enabling equal spliting size with number or string grid-column-template syntax.

<aside cols='2'>

```tsx
// cols = number
const Table = props =>  <>
   <section grid cols={2}>
      <div>Column 1</div>
      <div>Column 2</div>
   </section>   
</>
```

```tsx
// cols = grid-column-template
const Table = props =>  <>
   <section grid cols='1fr 1fr'>
      <div>Column 1</div>
      <div>Column 2</div>
   </section>   
</>
```
</aside>

The `[gaps]` props sets the both or vertical-horizontal margin between columns.

<aside cols='2'>

```tsx
// cols = number
const Table = props =>  <>
   <section grid cols={2} gaps='10px 10px'>
      <div>Column 1</div>
      <div>Column 2</div>
   </section>   
</>
```

```tsx
// cols = grid-column-template
const Table = props =>  <>
   <section grid cols='1fr 1fr' gaps='10px'>
      <div>Column 1</div>
      <div>Column 2</div>
   </section>   
</>
```
</aside>


<br/>
