import React from 'react'
import { seo, server, error } from '../../src/index.ts'

//@ts-ignore
@server("periodic", "30min")
@error(specificErrorComponent)
@seo('Quotes', 'Philosophy quotes...')
export default async function Quotes(props: any) {
   const url = "http://localhost:3000/api/quotes"
   const txt = await fetch(url).then(x => x.text())

   return <>
      <h1>Philosophy quote of the day</h1>
      <blockquote style={{zoom:1.1}}>{txt}</blockquote>
      <hr /><code>it will be regenerated in each 30min (press F5 to check)</code>
   </>  
}

function specificErrorComponent(status: number, errors: string[]) {
   return <> 
      <h1>My custom error component</h1>
      <p> { errors.join(', ') } </p><hr/>
      <code>it will be regenerated in each 30min (press F5 to check)</code>
   </>
}