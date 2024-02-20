import { client } from "reactful"

@client(true)
export default (props, { errors, awaits, logged }: Feeds ) => <>
   <h1>Login</h1>   

   <progress hidden={!awaits}>loading...</progress>

   <form method="post" data={props.user} 
      action="http://localhost:3000/api/auth/basic">

      <section grid cols={1}>
         <label>UserName<input bind="username" /></label>
         <label>PassWord<input type="password" bind="password" /></label>
      </section>
      
      <button>Submit</button>
   </form>

   <fieldset shown={!!errors?.length}>
      <legend>ERROR</legend>
      <ul>{ errors?.map((x,i) => <li key={i}>{ x.error }</li>) }</ul>
   </fieldset>

   <code>
      logged current user: { JSON.stringify(logged) }
   </code>
</>