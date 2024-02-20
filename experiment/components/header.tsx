import React from 'react'

export const Header = props => <>
   <h1 style={{color:'wheat'}}>{ props.children || props.title  }</h1>
</>

export default { ok:true }