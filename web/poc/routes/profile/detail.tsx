import React from 'react'
import { client } from '../../../src/index'
import '@reactful/extensions'
import './detail.css'

const Tester = import('./tester').asLazyComponent("Tester")

//@ts-ignore
@client(true)
export function Detail(_, feeds: Feeds) {
   return <>
      <h3>Detail</h3>
      Parametric value = <b>{ feeds.param.id }</b>

      <hr />
      <p>modular CSS keep original color</p>

      <fieldset>
         <legend>Mode</legend>

         <section>
            <button link='./developer'>developer</button>
            <button link='./manager'>manager</button>
            <button link='./tester'>tester (component)</button>
         </section>

         <hr/>

         <section route='./developer'>
            <b>DEVELOPER</b> is Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aspernatur similique ipsa, molestiae
            numquam laudantium quod, aliquid soluta cumque placeat
            saepe mollitia sint consectetur labore consequatur
            pariatur praesentium animi. Obcaecati, nihil?
         </section>

         <section route='./manager'>
            <b>MANAGER</b> is Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aspernatur similique ipsa, molestiae
            numquam laudantium quod, aliquid soluta cumque placeat
            saepe mollitia sint consectetur labore consequatur
            pariatur praesentium animi. Obcaecati, nihil?
         </section>

         <Tester route='./tester' />
      </fieldset>
   </>
}