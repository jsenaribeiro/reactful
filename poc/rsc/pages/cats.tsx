import React from "react"

export default async function Cats(props) {
   const response = await fetch("https://catfact.ninja/fact?max_length=33")
   const catFacts = await response.json()

   return <>
      <h2>Async React Server Component</h2>
      <div>Cat Fact of day: {catFacts.fact} </div>
   </>
}