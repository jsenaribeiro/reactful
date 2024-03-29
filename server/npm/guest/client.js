"use client";
import { createRoot } from 'react-dom/client';
import { env } from '@reactful/commons';
import { parser } from './parser';
import { streamJSX } from './stream';
const settings = env.settings;
export default async function () {
    if (!window.document)
        return;
    settings.initial = document.title;
    window.addEventListener("click", onClick);
    window.addEventListener('popstate', onBack);
    partialHydrationClientSideOnly();
    const query = settings.queryId;
    const cache = document.querySelector(query)?.innerHTML || '';
    if (!env.get("html", location.pathname))
        env.set("html", location.pathname, encodeURI(cache));
    const fallback = globalThis.FALLBACK_ROUTE;
    if (fallback) {
        console.error(`Not found server-side route for ${fallback.try}`);
        window.history.pushState(null, '', fallback.fix);
    }
}
function onBack(e) { onRoute(location.pathname); }
function onClick(e) {
    if (e.target.tagName != "A")
        return;
    else
        e.preventDefault();
    const begin = location.origin;
    const fixed = decodeURI(e.target.href);
    const route = fixed.replace(begin, '')
        .replaceAll('`', '')
        .replace(/\/\//, '/');
    window.history.pushState(null, '', route);
    onRoute(route);
}
async function onRoute(route) {
    route = decodeURI(route);
    const cache = env.get("html", route);
    const inner = cache && decodeURI(cache);
    const lazed = env.get("lazy", route, "default");
    const title = env.get("meta", route, "default")?.title;
    const model = settings.renders.find(x => x.href == route);
    const entry = document.querySelector(settings.queryId);
    if (model?.mode == "dynamic") {
        lazed && (entry.innerHTML = lazed);
        entry.innerHTML = await streamJSX(route);
    }
    else if (inner)
        entry.innerHTML = inner;
    else
        return location.href = route;
    document.title = title || settings.initial;
    await partialHydrationClientSideOnly();
}
const awaiting = async (delay) => new Promise(resolve => setTimeout(resolve, delay));
async function partialHydrationClientSideOnly() {
    const querier = x => document.querySelectorAll(x);
    const clients = querier('jsx');
    const retries = querier('[retry]');
    const waiting = querier('[await]');
    await awaiting(99);
    clients.forEach(async function (elm) {
        try {
            const url = location.pathname;
            const src = elm.getAttribute('src');
            const cli = settings.clients[src];
            const jsx = await parser(cli, src, url);
            if (jsx)
                createRoot(elm).render(jsx);
            await awaiting(1500);
        }
        catch (ex) {
            console.warn(ex);
        }
    });
    await awaiting(99);
    retries.forEach(async function (node) {
        const entry = document.querySelector(settings.queryId);
        const route = node.getAttribute('retry');
        entry.innerHTML = await streamJSX(route);
    });
    clients.forEach(x => x.hidden = false);
    retries.forEach(x => x.hidden = false);
    waiting.forEach(async function (node) {
        const json = node.getAttribute('await');
        const { path, name } = JSON.parse(json);
        node.innerHTML = await streamJSX(path, name);
    });
}
//# sourceMappingURL=client.js.map