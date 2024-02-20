import React from "react"
import reactful from "reactful/server"
import { shown } from './directives'
import { auth } from 'ajaxness'

const hello = { name: "ok" }
const hi = { name:'john' }

const failure = (status, errors) => React.createElement('div')

type Profile = { name: string }
type Token = { accessToken: string }

export const session = auth<Profile>()
   .fetch("http://www.api.com/login")
   .catch(x => "Usuário e senha inválidos", "/login")
   .match<Token>(x => x.accessToken, "/home")

await reactful
   .server("#root", { failure })
   .inject([ shown ])
   .inject({ hello, hi })
   .render()

