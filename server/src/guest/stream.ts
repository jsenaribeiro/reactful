export async function streamJSX(url: string, tag = 'default') {
   const response = await fetch(`${url}?jsx=true&tag=${tag}`)
   const textHTML = await response.text()

   return textHTML
}