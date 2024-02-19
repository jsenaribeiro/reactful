//@ts-nocheck

import { server, seo } from '../../src/index'

const loading = <h1>Loading</h1>
const address = "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam"

@server("dynamic") 
@seo('Time Zone', 'Time zone clock...')
export default function(props: any) {
   return <Suspense fallback={loading}>      
         <TimeZone />
      </Suspense>
}

async function TimeZone() {   
   const response = await fetch(address)
   const { year, month, day, hour, minute, seconds } = await response.json()
   const time = `${hour}:${minute}:${seconds}`
   const date = `${year}-${month}-${day}`

   return <>
      <h1>World Clock</h1>
      <h2>Europe/Amistedan timezone</h2>
      <h3 style={{color:'yellow'}}> {date} {time} </h3>
      <Suspense fallback={loading}>
         <InnerAsyncComponent />
      </Suspense>
   </>
}

async function InnerAsyncComponent() {
   await new Promise(promise => setTimeout(promise, 1000))
   return <code><mark>I'm a inner subcomponent !!!</mark></code>
}