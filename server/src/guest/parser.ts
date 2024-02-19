"use client"

import React from "react"
import { env, PROXY, proper, params } from "@reactful/commons"
import { mountState, refocus } from "../state"
import { styler } from "../guest/styler"

var latest = {} as any

const raw = x => typeof x != "object"
const rce = fce => React.createElement<any>(fce, {})

const settings = env.settings

const fixKey = (child: { key: string|null }) => 
   child.key && child.key.includes(".") ? null : child.key

export async function parser(root: RFC, path: string, href: string) {
   return await new Parser(root, path, href).render()
}

class Parser implements SyncParser {
   public leaf = false
   public path: string
   public href: string
   public root: RRE   

   constructor(root: RFC, path: string, href: string)
   constructor(root: RRE, path: string, href: string)
   constructor(root: RRE|RFC, path: string, href: string) { 
      this.root = root['type'] ? root as RRE : rce(root) as RRE
      this.path = path.replace(/\/$/, '')
      this.href = href.replace(/\/$/, '')
      this.leaf = !!root['type']

      settings.binding.ready = false
   }

   public render() {
      const jsx = this.root
      const tag = jsx.type.name
      const obj = this.parent(jsx, tag) as RRE

      return obj
   }
      
   public parent = (now: RRE | RRE[], own: string) =>
      ! now ? undefined : now[PROXY] ? now
      : now['type'] ? this.child(now as any, own)
      : Array.isArray(now) ? this.children(now, own)
      : typeof now == "object" ? this.syblings(now, own)
      : now   

   public child(jsx: RRE, own: string): RRE | RRE[] {
      const typed = x => typeof jsx?.type == x 
      const count = ++settings.binding.count
      const label = jsx.props?.tag || jsx?.type?.name || jsx?.type
      const props = { ...jsx.props, tag: label, uid: count, own }
      const fixed = { ...jsx, props, key: fixKey(jsx) }

      return typed("string") ? this.element(fixed, own)
           : typed("symbol") ? this.fragment(jsx, own)
           : typed("function") ? this.component(fixed, own)
           : jsx
   }

   public children = (all: RRE[], own: string): RRE[] =>
      React.Children.map(all, x => this.parent(x, own))

   public syblings = <T extends object = object>(props: T, own: string) => 
      Object.fromEntries(Object.entries(props)
         .map(([ key, val ]) => [ key, this.parent(val, own) ]))

   public client(_: FCE, own: string): RRE { throw new Error("client not implemented...") }

   public element(jsx: RRE, own: string): RRE | RRE[] {
      const count = settings.binding.count
      const attrs = params(jsx.type, own, count, latest)
      const props = proper(jsx.props, attrs) 
      const style = styler({ ...jsx, props }, this.path)
      
      jsx.props = this.syblings({...props, style }, own)

      Object.keys(settings.propers).forEach(k => delete jsx[k])

      return jsx
   }

   public fragment(jsx: RRE, own: string): RRE | RRE[] {
      const FRAGMENT = Symbol.for('react.fragment')
      const children = jsx.props?.children 
      const resulted = jsx.type == FRAGMENT
                     ? this.children(children, own)
                     : (children as RRE|RRE[])

      return resulted
   }

   public component(jsx: FCE, own: string) {
      const retype = attrs => {
         const [state, feeds] = rebind(attrs)     
         const child = jsx.type(state, feeds) as RRE
         const props = reprop(child, attrs)

         return { ...child, props, key: fixKey(child) }
      }
      
      const rebind = attrs => {
         const set = React.useState(0)     
         const [dir, url] = [this.path, this.href]
         const [state, feeds] = mountState(url, set, jsx, dir)    
         state.children ||= attrs.children
         return [latest = state, feeds]
      }
      
      const reprop = (child, attrs) => {
         if (!child?.props) return { }

         const label = jsx.type.name
         const count = settings.binding.count
         const isRaw = typeof child.type == 'string'
         const param = isRaw ? params(child.type, own, count, latest) : null
         const props = this.syblings(child.props, label)
         const names = Object.keys(props || {})
         
         for (const field of names) {
            const value = props[field]            
            if (value === undefined) continue
            else if (props[field]) continue
            else props[field] = value
         }    
         
         return param ? proper(props, param) : props
      }

      return refocus(9) && ({ ...jsx, type: retype })   
   }  
}