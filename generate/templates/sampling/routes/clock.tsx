import React, { Suspense } from 'react'
import { server, seo } from 'reactive'

@server("dynamic") 
@seo('Time Zone', 'Time zone clock...')
export default function(props: any) {
   return <Suspense fallback={<h1>Loading</h1>}>
         <TimeZone />
      </Suspense>
}

async function TimeZone() {
   const response = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam")
   const { year, month, day, hour, minute, seconds } = await response.json()
   const time = `${hour}:${minute}:${seconds}`
   const date = `${year}-${month}-${day}`

   return <>
      <h1>World Clock</h1>
      <h2>Europe/Amistedan timezone</h2>
      <h3 style={{color:'yellow'}}> {date} {time} </h3>
   </>
}