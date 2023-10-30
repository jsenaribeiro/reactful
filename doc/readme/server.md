<style>@import url('../README.CSS');</style>

## server

### Serving models

Server-side pre-processors (PHP, JSP, ASP, etc), as dynamic evolution of static pages, improves its SoC with SOA/REST and AJAX, spliting a single client-server architecture into backend (shared services) and frontend (backend client), starting the js SPAs momentum.

| | | | | | 
|-|-|-|-|-|
| single client-server | static > pre-processors > MVC, etc |
| backend x frontend | backend (SOA, REST) + frontend (SPA) |

Backend and frontend are both servers, but in traditional SPA frontend, the server just server a empty HTML page and a JS bundle, all happens in client-side browser, with the JS execution.

### Rendering modes

Since any js SPA has its own node.js server, new React frameworks was intruced with server-side rendering, allowing improving SEO (search engine optimization), loading page time and some security gains (keep sensible content in server-side). Those new frontend rendering models could be splitted in two approaches: evenly rendering and timely rendering.

#### `evenly` rendering

| | | | | | 
|-|-|-|-|-|
| **CSR**: client-side rendering | browser | client components | dynamic |
| **SSR**: server-side rendering | request | server components | kinetic |
| **SSG**: static site generation | build | vanillha HTML | static |

#### `timely` rendering

| | | | | | 
|-|-|-|-|-|
| **ISR**: incremental site regeneration | build | cached server components | html |
| **SWR**: stale-while-revalidate | request | cached fetching data | json |
| **PWA**: progressive web apps | browser | cached bundle.js | js |

### static + dynamic = kinetic

All @reactful components are server-side by default, enabling static content by vanilla HTML (since HTML is easier, simpler and faster to this use case).

| static | dynamic | kinetic |
|-:|:-:|-|
| HTML pages + HTML fragments, CSS, images, etc | JSX server component, JSX client component | temporary static content by timeout cached pre-render |

The kinetics are dynamic content cached as static HTML, either by vanilla fetch 'cache-control', or by the new @reactful SWR syncher api (see @reactful/syncher).

### Vanilla first

The HTML-first prevents over-componentatization, where HTML fragments could be merged in server-side using vanilla HTML embed tag (so, avoiding any lib-extra learning curve overhead), and solve simple use cases of HTML reuse (avoiding useless component rendering cost).

```tsx
import '@reactful/server'
import React from 'react'
import App from './app'

React.server("/index.html").render(App) 
```

```html
<!DOCTYPE html>
<html>
<embed src='./slices/header.html' />
<body>
   <App />
   <Modal />
</body>
</html>
```

```html
<!-- slices/header.html -->
<meta charSet="utf-8" />
<title>Less is more</title>
```

THe new render receives multiples root components that could be injected inside of HTML page. All the served HTML pages will renders without extra syntax.

```tsx
import '@reactful/server'
import React from 'react'

React.server("index.html")
     .render(App, Modal) 
```

### Hybrid rendering SSR+RSC

The @reactful server inverts the relation between HTML and React render, as a webserver, the input is also the HTML file itself (index.html).

```tsx
import '@reactful/server'
import React from 'react'

React.server("index.html")
     .render(App)
```

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
   <App />
</body>
</html>
```



### simple architecture

The `@reactful/server` is a lite and simple HTML webserver, based in express, with extensible server-side rendering for JSX, without any framework coupling. 

![image](./ssr.png)