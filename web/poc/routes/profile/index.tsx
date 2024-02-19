import React from 'react'
import { Detail } from './detail'
import { seo, route } from '../../../src/index.ts'
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