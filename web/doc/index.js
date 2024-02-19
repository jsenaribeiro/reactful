function startup() {   
   const iframe = document.querySelector('iframe')
   const content = iframe.contentWindow.document.body

   adjustZoom(content)
   createLogo(document)
   // createLink(iframe, content)
}

function goto(href) {
   document.querySelector('main[iframe]').hidden = false
   document.querySelector('iframe').src = href
   document.querySelector('main[index]').hidden = true
}

function adjustZoom(content) {
   content.style.zoom = 1.17
   content.style.padding = '50px !important'   
}

function createLink(iframe, content) {
   const links = content.querySelectorAll('[overview] a')
   const found = x => x.href.split('#').at(-1)
   const apply = a => iframe.src = `./preview.html#${found(a)}`
   const refix = () => setTimeout(() => adjustZoom(content), 1500)
   const click = a => { apply(a); refix(); }

   links.forEach(a => a.onclick = () => click(a))
}

function createLogo(content) {
   const logo = content.querySelector("logo")
   const divs = [1,2,3].map(() => document.createElement('div'))
   
   divs.concat([document.createElement('span')])   
       .forEach(x => logo.appendChild(x))

   setInterval(function() {
      const from0To3 = Math.floor(Math.random() * 3)
      const during = 150 + (100 * (from0To3 * 9))

      document.querySelectorAll("logo div").forEach(div => 
         div.style.animationDuration = `${during}ms`)
   }, 3000)
}