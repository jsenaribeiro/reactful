<script src='./index.js'></script>
<style>@import url(./index.css);</style>

<article>
<embed type='text/html' src='./header.html' />
<header>binder properting</header>

> data binding • form binding • props directives<br/>RESTful actions • validation api

## Data binding props

The `[data]` and `[bind]` props directive enables data binding in read-write input elements, where `[data]` props is a target stateful object and `[bind]` props its mapped member field.

```html
<!-- without data binding props -->
<input value={props.name} onChange={e => props.name = e.target.value} /> 

<!-- with data binding props -->
<input data={props} bind='name' />

<!-- props is default -->
<input bind='name' />
```

```tsx
// controlled components
export const Data = props => <>
   <input data={props} bind='name' />
</>

// uncontrolled components
export const Form = props => <form> 
   Name: <input bind='name' maxlength={50} />
   Mail: <input bind='mail' pattern="\w+" />    
   <button>Submit</button>
</form>
```

The props directive maps in background each value and event with its correct type. When the stateful object is the props, the `[data]` is optional (props is its default).


## Form binding props

Form binding enables uncontrolled components binding approach with `form[data]` and `children[bind]`, with full HTML `validation API` support.

```tsx
export const Form = props => <form> 
   Name: <input bind='name' maxlength={50} />
   Mail: <input bind='mail' pattern="\w+@\w+\.\w+" />    
   <button>Submit</button>
</form>
```

The validation could be extended by `input[validate]` and `form[validation]` props.

```tsx
export const Form = props => <> 
   <form {onValidate}>
      Name: <input bind='name' maxlength={50} />
      Mail: <input bind='mail' validate={validateEmail} />    
      <button>Submit</button>
   </form>
</>

function validateEmail() {
   // return a non-empty string to invalidate
   return 'example of a custom email error message....'
}

function onValidate(errors: { field, error, value }[]) { 
   /* adding new errors to errors array */ 
   errors.push({ error: 'some custom error message' })
}
```

## RESTful actions

With `form[data]`, the `[action]` props is made RESTful, sending data object as a JSON as resolving response errors with fails array as dependency injection.

```tsx
export const Todo = (props, { fails }) => <>
   <form action='http://www.api.com' method='POST' > 
      Task: <input bind='task' maxlength={20} />
      Done: <input bind='mail' type='checkbox' />    
      <button>Submit</button>
   </form>

   <ul hidden={!fails.length}>
      <label>Error Summary:</label>
      { fails.map((x,i) => <li>{ x }</li>) }
   </ul>   
</ul>
```

Response fetch could be handled by `[onFetch]` props handler.

<aside cols='3:5'>

```tsx
const Form = () => <form 
   action='www.api.com' 
   onFetch={onPost}> ...
</form>
```

```ts
async function onPost(response: Response) {
   const data = await response.json()
   // done something...   
}
```

</aside>



## Standard authentication

The `[bearer]` and `[action]` props enables a easy standard authentication with use basic authentication request and JWT bearer authentication response with those rules:

<style>
   aside[auth] ul { zoom: 0.95; margin-left: -20px; }
</style>

<aside auth cols='2'>

```tsx
export const Login = () => <form
   action='http://localhost/api/auth' 
   method='POST' bearer='access_token'> 

   username: <input bind='username' />
   password: <input bind='password' />
   <button>Submit</button>

   <ul>{ errors.map(Errors) }</ul>   
</form>
```

- uses Basic authentication request
- username and password bind fields
- [auth] props as response token field
- JWT Bearer authentication response
- caching 'token' with sessionStorage
- current user as sessionStorage 'logon'
- clear 'token' session when 401 status code
- logout as sessionStorage.removeItem('token')

</aside>

A logged user JSON within sessionStorage.set('logon') is exposed by logon DI.

```tsx
const Home = (props, { logon }) => <h1>current user name: { logon.name }</h1>
```


## Custom props directives

Props binding is a props transformation enabled by the new props directive feature. Custom props directive is supported using a similar functional component syntax. 
```tsx
import { server } from '@reactful/web'

// simple custom directive for hidden opposite behavior
const shown = props => ({ ...props, hidden: !props.shown })

// injecting the custom directive into IoC container
await server("/routes").inject([ shown ]).render("#root")

// declaring new attibute for intelisense support
declare module "react" { interface HTMLAttribute { show?: boolean }}

// example of a shown custom directive sample usage
export const Sample = prop => <div shown={false}>sampling...</div>

```

**WARNING!** Custom props directive has limited support to module paradigm. Any import in its module will not work and it will crash the reactful server during build time. 

<br/><br/>