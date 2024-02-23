"use server";
import maker from '../build/maker';
import { routing } from './router';
import { File, Path } from "../extra";
import { env, response } from "@reactful/commons";
const INDEX = '/index';
export async function ssg(href, last = '') {
    const link = ((href || INDEX) + last).replaceAll('//', '/');
    const fail = env.settings.faileds.find(x => x.href == link);
    if (fail)
        return await failure(fail, env.settings.faileds);
    const base = Path.builds;
    const file = new File(`${base}${link}.html`);
    const have = await file.exists();
    return have ? new Response(file.blob)
        : last ? await fallback(href)
            : await ssg(href, INDEX);
}
async function fallback(href) {
    const last = href.split('/').at(-1);
    const next = href.replace(`/${last}`, '');
    const root = next.trim().split('/').length == 1;
    return await routing(root ? '/' : next);
}
async function failure(fail, errs) {
    const [path, item] = [fail.href, fail.call];
    const html = await maker({ path, item }, "JSX");
    for (let i = 0; i < errs.length; i++)
        if (errs[i].href == path)
            delete errs[i];
    env.settings.faileds = errs.distinct();
    return response(200, html, "text/html");
}
async function handle(file, base, done) {
    const then = x => x ? x.replace('</head>', info + '</head>') : '';
    const info = createScriptInformation(base, done);
    const html = await file.load().then(then);
    return response(200, html, "text/html");
}
function createScriptInformation(tryRoute, fixRoute) {
    const label = `globalThis.FALLBACK_ROUTE`;
    const value = `{ try:'${tryRoute}', fix:'${fixRoute}' }`;
    return `\n\t<script>${label} = ${value}</script>`;
}
//# sourceMappingURL=static.js.map