import React from 'react'
import { Detail } from './detail'
import { seo, route } from '@reactful/web'
import './profile.css'

//@ts-ignore
@route("/profile/:id")
@seo('Profile', 'Profile description')
export default () => <>
   <h1>Profile</h1>
   <Detail />   
   <hr/>
   <p>modular CSS chainging to red</p>
</>