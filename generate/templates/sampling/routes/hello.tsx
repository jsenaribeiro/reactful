import { seo, client } from "reactive"
import { Header } from '../components/header'

@client(true)
@seo('Hello', { charset:"UTF-16", rating:"general", keywords:"hello, hi" })
export default (props, {stores:{ hello }}: Feeds) => <>
   <Header>Hello Forms</Header>
   <main grid gaps='0 10px' cols={1}>
      <section>
         <label>
            <b>LOCAL state </b> function(props)
            <input id='1' onChange={e => props.name = e.target.value} value={props.name} />
         </label>
      </section>
      <section>
         <label>
            <b>GLOBAL state</b> function(_, feeds.store)
            <input id='2' onChange={e => hello.name = e.target.value} value={hello.name} />
         </label>
      </section>
      <section>
         <label>
            <b>GLOBAL data binding props</b> [data] [bind]
            <input id='3' data={hello} bind="name" />
         </label>
      </section>
   </main>
   <br />
   <hr />
   <code>
      <strong>local</strong>: <label id='l1'>{ props.name }</label><br />
      <strong>global</strong>: <label id='l2'>{ hello.name }</label>
   </code>
</>;