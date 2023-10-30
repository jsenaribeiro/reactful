"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("react-dom/client");
const decode = (_, value) => value === "$"
    ? Symbol.for("react.element")
    : value;
// @ts-ignore
const markup = JSON.parse(window.__initialMarkup, decode);
// @ts-ignore
// console.log("markup", window.__initialMarkup)
const root = (0, client_1.hydrateRoot)(document, markup);
function navigate(to) {
    console.log("navigate", to);
    fetch(`${to}&jsx`)
        .then((r) => r.text())
        .then((data) => root.render(JSON.parse(data, decode)));
}
window.addEventListener("click", (e) => {
    console.log(999, e.target);
    if (e.target.tagName !== "A")
        return;
    e.preventDefault();
    window.history.pushState(null, null, e.target.href);
    navigate(e.target.href);
});
