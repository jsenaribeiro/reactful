function onPreview(id) {
   setTimeout(previewing, 111)
   location.href = `#${id}`
}

function previewing() {
   document.body.style.zoom = 1.2

   document.querySelectorAll('fieldset')
      .forEach(x => x.classList.add('hidden'))

   location.hash && document
      .querySelector(location.hash)
      .classList.remove('hidden')   
}

setTimeout(previewing, 111)