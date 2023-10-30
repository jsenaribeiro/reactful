import { hydrateRoot } from "react-dom/client"

console.log("CLIENT SIDE RUNNING...")

// @ts-ignore
const exports = { }

const decode = (_, value) => {
   const isReactElement = value === "$"
   console.log("decote", isReactElement, value)

   return isReactElement
      ? Symbol.for("react.element")
      : value
}

// @ts-ignore
const markup = JSON.parse(window.__initialMarkup, decode)
const root = hydrateRoot(document, markup)

function navigate(to: string) {
   console.log("navigate", to)

  fetch(`${to}&jsx`)
    .then((r) => r.text())
    .then((data) => root.render(JSON.parse(data, decode)))
}

window.addEventListener("click", (e: any) => {
  console.log(999, e.target)
  if (e.target.tagName !== "A") return

  e.preventDefault()
  window.history.pushState(null, null, e.target.href)
  navigate(e.target.href)
})
