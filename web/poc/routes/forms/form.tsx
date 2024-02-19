import { client } from "reactive"
import "./form.css"

@client(true)
export default (props, { fails: errors, await: awaits }: Feeds ) => <>
   <h1>Uncontrolled Components</h1>   
   <progress hidden={!awaits} >test...</progress>

   <form grid cols={2} method="post" data={props.user}
      action="https://jsonplaceholder.typicode.com/posts1"
      onValidate={onValidate} onSubmit={e => onSubmit(e)}>

      <label>Name<input id="name" bind="name" /></label>
      <label>Date<input type="date" bind="date" /></label>
      <label>Work<input pattern="dev|test" bind="work" /></label>
      <label>Mode<input validate={modeValidate} bind="mode" /></label>

      <hr/><hr/>
      <label>Accept?<input bind="term" type="checkbox" required /></label>      
      <button>Submit</button>
   </form>


   <fieldset shown={!!errors?.length}>
      <legend>ERROR</legend>
      <ul>{ errors?.map(x => <li>{ x.error }</li>) }</ul>
   </fieldset>
</>

function modeValidate(value: string) {
   console.log('modeValidate', value)
   if (!value) return 'Mode is required!'
   if (value.match(/\d+/)) return 'Mode is non-numerical!'
   return ''
}

function onSubmit(e) {
   // after submited validation (feeds)
   console.log('after form submit', e)

}

async function onValidate(errors: Invalid[]) {
   // add some async custom invalidations
   // ex.: errors.push({field:'*', error:'some error', value:''})

   console.warn(errors)
}