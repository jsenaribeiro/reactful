import OS from "node:os"
import React from "react"

export default function Arch() {
   const [ type, arch, release ] = [OS.type(), OS.arch(), OS.release()]

   return <>
      <h2>server side resources</h2>
      <pre>{type} | {arch} | {release} </pre>
   </>
}