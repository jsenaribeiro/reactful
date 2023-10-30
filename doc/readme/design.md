<style>@import url('../README.CSS');</style>

# Design

<center col2='grey' borderless splitted>

## overview

### DRY | KISS | YAGNI

The Reactful is fully driven by D.K.Y. design principles

| | |
|-:|-|
| DON'T REPEAT ITSELF | reusing vanilla when possible |
| KEEP IT SIMPLE, STUPID! | adds abstraction if over-simplifes  |
| YOU AREN'T GONNA NEED IT | addomg abstraction incrementally |

### DRY: don't repeat itself

Maximize vanilla API reuse to more compatibility and less lib coupling, avoiding  **reinvent the wheel** anti-pattern above DOM or vanilla HTML.

| | |
|-:|-|
| persistence | url, localStorage, IndexDB  |
| validation | form validation with full reuse |
| elements | semantic web, a[href], hash |

### KISS: keep it simple, stupid!

Vanilla web technologies could handle most of problems, but, the Web Components example, its costful complexity could make worthy decreases a DRY design with a very low-cost abstration as JSX. 

| | |
|-:|-|
| routing | extended location object, HTML pages |
| fetching | new fluent syncher algorithm alternative |
| binding | hookless, providerless, stateful props |


### YAGNI: you aren't gonna need it

YAGNI design make progressive the solutions between vanilla DRY  vanilla API and new KISS abstrations, keeping progressive low profile in transitioning between vanilla and library, keeping simplicity as a reuse vanilla way.

| | |
|-:|-|
| routing | vanilla HTML over components |
| fetching | localStorage, location, cookies  |
| reusing | HTML splitting, CSS components or JSX  |

</center>

## preview

## review

You don't need a component if all you need a stateless and not-parameterized HTML, this could easily solved with HTML splitting (like layout files). For example, in Reactful server, the server-side  **embed** tag merges the HTMLs by reusing the same client-side sematic and syntax. This keeping simple (KISS) and reusable solution (DRY), preventig extra APIs (YAGNI).

```html
<!DOCTYPE html>
<html lang="en">
<embed src='./header.html' />
<body>
</body>
```

if want component just for styling, before a JSX component, you could handle with CSS components. CSS component are fully compatible in any browser, more intuitive, more lightweight, more simple and vanilla way. It is a better way to incrementally create a new component, that could be fully reused when it is evolved as JSX component, avoiding any rendering cost.

```css
card title { font-size:2rem; border-bottom:1px; }
card { margin:10px; border: 1px; padding:10px; }
```
```html
<card>
   <title>My title</title>
   this is my card content
</card>
```

If you don't need create a new conceptual tag, you could just extends existing tag by property injection (Angular-like attribute directive), this option avoids component over-nesting and promotes vanila tag reuse. Then, instead of create a full new JSX component, with property injection you could just inject a new behavior, reusing a vanilla tag.

```jsx
<button toggle="grey">
<ToggleButton backgroundColor="grey" />
```

The real use case of a web/jsx components is to encapsulate a repeated dynamic HTML using data binding. Data binding means that if the data changes, the piece of HTML will be render by itself and its childrens with same prop-drilled data. Components are complex set of elements with auto-render. 

All YAGNI alternatives are some partial componentization, as CSS, or HTML, or custom attribute, then, they are incrementaly steps to potential JSX components, without the cost and complexity of it. 
