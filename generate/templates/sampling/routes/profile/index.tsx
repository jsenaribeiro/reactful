import { Detail } from './detail'
import { seo, route } from 'reactive'
import './profile.css'

@route("/profile/:id")
@seo('Profile', 'Profile description')
export default () => <>
   <h1>Profile</h1>
   <Detail />   
   <hr/>
   <p>modular CSS chainging to red</p>
</>