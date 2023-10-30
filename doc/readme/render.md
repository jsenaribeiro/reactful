<style>@import url('../README.CSS');</style>

Serving folder with HTML (for static rendering) using iframe tag (but merged) with routing by native href

```tsx
<Todo />
<a href='/hello/#world'>
```

HTML and DOM native API with some prototype extension

```js
// http://apis/todo/#1/detail
location.href     // http://apis/todo/#1/detail
location.pathname // /todo/#1/details/2
location.params   // [1, 'details, '2'] (new)

<iframe src='details' />

```

```tsx
const Menu = props => <>
   <a href='/todo/#1'>Todo</a>
   <iframe src={location.pathname} />
</>

```


 
```js
pub/              // --- release version
lib/              // --- node_modules alias
src/              // --- project content
  ├─ assets/
  ├─ components/
  ├─ extensions/
  ├─ libraries/
  ├─ propers/
  ├─ routes/
  ├─ index.js
  ├─ index.html
  └─ index.css
deno.json
deno.lock
README.md
.gitignore
.env

```