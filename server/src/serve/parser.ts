"use server"

import React from "react"
import proper from '../props'
import { logger as log } from "../extra"
import { SELF_CLOSE_TAGS } from "@reactful/commons"
import { env, params, JSXON } from "@reactful/commons"
import { styler } from "./styler"

const raw = x => typeof x != "object"
const rce = (fce, props) => React.createElement<any>(fce, props)

let uid = 0

export const parser = (root: RFC, href: string) => new Parser(root, href).render()
    
const getTag = (node: RRE) => 
     typeof node?.type == "function" ? node?.type.name 
   : typeof node?.type == "string" ? node?.type
   : typeof node?.type == "symbol" ? '<>'
   : node?.type?.toString() || ''

class Parser implements AsyncParser {
   public leaf = false
   public path: string
   public href: string
   public root: RRE

   constructor(root: RFC, href: string)
   constructor(root: RRE, href: string)
   constructor(root: RRE|RFC, href: string) { 
      this.root = root['type'] ? root as RRE : rce(root, { }) as RRE
      this.path = (root as EFC).metadata?.path?.replace(/\/$/, '') || ''
      this.href = href.replace(/\/$/, '')
      this.leaf = !!root['type']      

      if (!this.leaf) {
         const filename = this.path.split("/").at(-1)
         filename && log.itemfy(filename)
         uid=0 
      }
   }

   public async render() {
      const tag = this.root.type.name.replace(/[\$]+$/, '') || 'default'
      const now = await this.parent(this.root, tag)
   
      return (uid = 0) || (now as RRE)
   }
   
   public parent = async (now: RRE | RRE[], own: string) =>
      ! now ? undefined
      : now['type'] ? await this.child(now as any, own)
      : Array.isArray(now) ? await this.children(now, own)
      : typeof now == "object" ? await this.syblings(now, own)
      : now

   public async child(jsx: RRE, own: string) {
      const label = typeof jsx.type == 'function' ? (jsx.type.name || 'default') : jsx.type.toString()
      const keyed = jsx.key && jsx.key.includes(".") ? null : jsx.key
      const props = { ...jsx.props, tag: label, uid: uid++ }
      const fixed = { ...jsx, key: keyed, props }
      const infos = (jsx as EEC).type.metadata

      const isElement = typeof jsx.type === "string"
      const isComponent = typeof jsx.type === "function"
      const isFrament = jsx.type === Symbol.for('react.fragment')
      const isSuspense = jsx.type === Symbol.for("react.suspense")
      const isFailed = !React.isValidElement(jsx) && !isComponent && !isSuspense
      const isSubComponent = isComponent && infos?.path && this.path && infos.path != this.path

      if (isFailed) log.insert(`isFailed ${JSON.stringify(jsx)}\n`)

      return isFailed ? undefined as any
         : isSubComponent ? new Parser(jsx, this.href).render()
         : isComponent ? await this.component(fixed, own)
         : isElement ? await this.element(fixed, own)
         : isSuspense ? await this.fragment(jsx, own)
         : isFrament ? await this.fragment(jsx, own)
         : jsx
   }

   public async children(jsxs: RRE[], own: string) {
      const each = async (node: RRE) => {     
         try {
            const end = raw(node)
            const tag = getTag(node)
            if (tag) log.append(` ${tag}`, "DIM")
            else if (end) return await node
            return await this.parent(node, own)            
         }
         catch(ex: any) {
            console.error(ex)
            return undefined
         }
      }

      return await Promise.all(jsxs.map(each))
   }

   public syblings = async (props, own) => Object
      .fromEntries(await Promise
         .all(Object.entries(props)
            .map(async ([key, val]: any) => 
               [key, await this.parent(val, own)])))

   public async element(jsx: RRE, own: string) {
      try {
         const attrs = params(jsx.type, own, ++uid)
         const props = proper(jsx.props, attrs)
         const style = styler({ ...jsx, props }, this.path)
   
         const internal = jsx.props?.children
         const isClosed = SELF_CLOSE_TAGS.includes(jsx.type)
         const children = isClosed ? undefined : await this.parent(internal, own)

         Object.keys(env.settings.propers).forEach(k => delete jsx[k])
   
         return { ...jsx, props: { ...props, style, children } }
      }
      catch(ex) {
         console.error(ex)
         throw ex
      }
   }

   public async fragment(jsx: RRE, own: string) {
      const fall = jsx.props.fallback
      const html = fall ? JSXON.htmlfy(fall) : ''
      const name = own.replace('default$', 'default')
      const lazy = jsx.type === Symbol.for("react.suspense")

      if (lazy && fall) env.set("lazy", 
         this.href, name, html as HTMLString)

      jsx.props.fallback = undefined

      return await this.parent(jsx.props.children, own)
   }

   public async component(jsx: FCE, own: string) {
      const tag = jsx.type.name || 'default'
      const arg = params(tag, own, ++uid)
      const ioc = env.settings.context

      try {
         const topProps = { ...jsx.props, own: tag }   
         const newChild = await jsx.type(topProps, ioc) as RRE
         const subProps = { ...topProps, ...newChild.props }
         const endChild = { ...newChild, props: subProps }
         const children = await this.parent(endChild, tag)
         const newProps = Array.isArray(endChild)
             ? subProps : await proper(subProps, arg)
         
         if (Array.isArray(children)) return children
         else if (!children) return []     
         else return  {
            ...children, props: {
               ...newProps,
               ...children.props,
               own: jsx.props.tag,
            }
         }
      }
      catch (ex: any) {
         const refer = jsx.type as EFC
         const fails = [ ex.message, ex.stack ].distinct()
         const error = (refer.metadata?.fail || env.settings.failure!) 
         const attrs = {  ...jsx.props, retry: this.href, hidden: true }
         const child = error(500, fails) as RRE
         const props = { ...attrs, ...child.props }

         env.settings.faileds.push({ href: this.href, call: jsx.type })

         return { ...child, props }
      }
   }
}