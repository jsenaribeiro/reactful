function delay(timeout, fn) { setTimeout(fn, timeout) }

delay(99, () => document.body.style.zoom = 1.3)

function onOverview() {
   document.querySelector('article[overview]').hidden = false
   document.querySelector('article[preview]').hidden = true
}

function goto(href) {
   window.parent.document.querySelector('iframe').src = href
}