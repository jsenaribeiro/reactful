import React from 'react'
import { seo, client } from '@reactful/web'

@seo('Counter', '...')
export default (props: any) => <>
   <h1>Counter</h1>
   <CountButton />

   <h6 shown={false}>DONT SHOW ME!</h6>
</>

@client(true)
export function CountButton(props: any, feeds: any) {
   function onClick() { props.count ||= 0; props.count++ }

   return <button style={{ padding:'20px' }} onClick={onClick}>
      COUNTED: <b>{ props.count || 0 }</b>
   </button>
}