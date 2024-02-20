import OS from "os"
import React from "react"
import { seo, style } from '@reactful/web'

const metatags: MetaTags = { 
   charset:"UTF-16", 
   rating:"general", 
   keywords:"hello, hi" 
}

//@ts-ignore
@seo('System', metatags)
@style('/assets/system.css')
export default function System() {
   const [ type, arch, release ] = [OS.type(), OS.arch(), OS.release()]

   return <>
      <h1>Server OS</h1>
      <h2>server side information</h2>
      <pre>{type} | {arch} | {release} </pre>
      <section shown={false}>DONT SHOW ME!</section>
   </>
}