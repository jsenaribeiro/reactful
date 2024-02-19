<script src='./index.js'></script>
<style>@import url(./index.css);</style>

<article>
<embed type='text/html' src='./header.html' />
<header>ranker optimizing</header>

> search engine optimization • metatag args<br/>function decorator • html metatags

## SEO decorator

SEO is achieved by @seo function decorator with title and description.

```tsx
import { seo } from 'reactive'

@seo('title', 'description')
export const About(props) {
   return <>About...</>
}
```

## SEO metatags

The @seo decorator overload receives the main SEO metatags as object.

```tsx
import { seo, MetaTag } from 'reactive'

const metatags: MetaTag = { chartset: 'UTF-8', keywords: 'key1, key2' }

@seo('title', metatags) const About = props => <label>etc...</label> 
```

## HTML metatags

Since Reactive supports HTML, HTML native metatags is supported.

```html
<html>
<head>
   <title>About</title>
   <meta name='keywords' content='about' />
</head>   
<body>
   etc...
</body>   
</html>
```

## Dynamic SEO

Reactive supports dynamic SEO (request-time) with title and metatags directly in JSX. Those tags will be discarded in rendered JSX and inserted/replaced into current HTML head.

```tsx
async function Todo(props) {
   const todo = fetch(`${url}/${props.id}`).then(x => x.json())

   return <>
      <title>{ todo.task }</title>
      <meta name='keywords' content='key1, key2' />
      <h1>{ todo.task }</title>      
   </h1>
}
```

## Open Graph Protocol

Reactive supports Open Graph Protocol metatags as metatag object and inner JSX elements.

```tsx
import { seo } from 'reactive'

const metatags: ImageMetaTagOG = { 
   chartset: 'UTF-8', 
   keywords: 'key1, key2' 
   og: {
      description: 'bla bla',
      alt: 'bla bla bla bla'
   }
}

@seo('Blah', metatags)
async function Blah(props) {
   const todo = fetch(`${url}/${props.id}`).then(x => x.json())

   return <>
      <title>{ todo.task }</title>
      <meta property='og:title' content='bla bla' />
      <h1>{ todo.task }</title>      
   </h1>
}
```

<br/>