import React from 'react'
import { seo, client, useStore, state } from '@reactful/web'
import { Header } from '../components/header'

const orbital1 = useStore({ value:0 })
const orbital2 = useStore({ value:1 })

//@ts-ignore
@client(true)
@state(orbital1)
@state(orbital2)
@seo('Hello', 'Hello forms...')
export default function Hello(props, { store }: Feeds) {
   if (globalThis.document) globalThis.props = props

   return <>
      <Header>Hello Forms</Header>
      <main grid gaps='0 10px' cols={1}>      
         <label>
            <b>LOCAL state </b> <code>function(props)</code><br/>
            <input id='1' data={props} bind="value" placeholder="{props}" />            
            <input id='1.1' bind="value" placeholder="default" />
            <SubLocal id='1.1.1' placeholder="inner" />
         </label>
         
          <label>
            <b>GLOBAL state</b> <code>function(props, {'{ store }'})</code><br/>
            <input id='2' data={store} bind="value" placeholder="outer" />
            <SubGlobal id='2.1' placeholder='inner' />
         </label>

         <label>
            <b>ORBITAL state</b> <code>useStore(...) + @state(...)</code><br/>
            <input id='3' data={orbital1} bind="value" placeholder="outer" />
            <SubOrbital id='3.1' placeholder='inner' />
            <input id='3.2' data={orbital2} bind="value" placeholder="other" /> = {orbital2.value }
         </label>
      </main>
      <br />
      <hr />
      <code>
         <strong>local</strong>: <label id='l1'>{ props.value }</label><br />
         <strong>global</strong>: <label id='l2'>{ store.value }</label><br />
         <strong>orbital</strong>: <label id='l3'>{ orbital1.value }</label>
      </code>
   </>
}


function SubGlobal(props, { store }) {
   return <input {...props} data={store} bind='value' />
}

function SubLocal(props) {
   return <><input {...props} data={props} bind='value' /><label> = {props.value}</label></>
}

//@ts-ignore
@state(orbital1)
function SubOrbital(props) {
   return <input {...props} data={orbital1} bind='value' />
}