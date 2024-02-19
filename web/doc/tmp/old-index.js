setTimeout(createLogo, 111)

function delay(timeout, fn) { setTimeout(fn, timeout) }

function createFavicon() {
   const link = document.createElement('link');
   link.rel = 'icon';
   document.head.appendChild(link);
   document.title = 'reactive.js'
   link.href = 'img/favicon.ico';
}

function createLogo() {
   createRadios()
   createFavicon()
   createHeadings()

   // document.body.innerHTML = window.getComputedStyle(document.body).getPropertyValue('font-size');

   const logo = document.querySelector("logo")
   const divs = [1,2,3].map(() => document.createElement('div'))
   
   divs.concat([document.createElement('span')])   
       .forEach(x => logo.appendChild(x))

   // setInterval(function() {
   //    const from0To3 = Math.floor(Math.random() * 3)
   //    const during = 150 + (100 * (from0To3 * 9))

   //    document.querySelectorAll("logo div").forEach(div => 
   //       div.style.animationDuration = `${during}ms`)
   // }, 3000)
}

function createHeadings() {
   const iframe = document.querySelector('iframe')
   document.querySelectorAll('h3 a').forEach(a => {
      const link = a.href;
      const text = a.textContent
      if (text == 'Licence') return
      a.href = '#';
      a.onclick = () => { 
         uncheckRadios()
         iframe.src = link
      }      
   })
}
function uncheckRadios() {
   document.getElementsByName('menu')
      .forEach(r => r.checked = false)
}

function createRadios() {
   const iframe = document.querySelector('iframe')
   
   const scroll = hash => delay(100, () => 
      iframe.contentWindow.location.hash = hash)

   document.querySelectorAll('#menu li').forEach(li => {
      const a = li.querySelector('a')
      if (!a) return

      const text = a.textContent
      const link = a.href.replace('.md', '.html')
      const hash = a.href.split('#').at(1) || ''

      const input = document.createElement('input')      
      input.name = 'menu'
      input.type = 'radio'
      
      const span = document.createElement('span')
      span.textContent = text

      const label = document.createElement('label')
      label.appendChild(input)
      label.appendChild(span)

      li.innerHTML = ''
      li.appendChild(label)
      li.onclick = function() {         
         iframe.src = link
         if (hash) scroll(hash)
      }
   })
}



// document.body.addEventListener("click", onFocus, true);
// document.body.addEventListener("onfocusout", onFocus, true);

// function onFocus() {
//    const timeout = setTimeout(function() {
//       const query = `[href='${location.hash}']`
//       const child = document.querySelector(query)
//       child.focus()
      
//       console.log(timeout, query, child)
//    }, 5)
// }


