"use server";
import maker from '../build/generate';
import { File, Path } from "../extra";
import { env, response } from "@reactful/commons";
const INDEX = '/index';
export async function ssg(href, last = '') {
    href = (href || INDEX) + last;
    const errs = env.settings.faileds;
    const fail = errs.find(x => x.href == href);
    if (fail)
        return await failure(fail, errs);
    const base = Path.builds;
    const file = new File(`${base}${href}.html`);
    const have = await file.exists();
    if (have)
        return new Response(file.blob);
    if (last)
        return await fallback(href, file);
    else
        return await ssg(href, INDEX);
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
async function fallback(href, file) {
    const list = href.split('/').reverse();
    const base = href + '';
    for (const part of list) {
        href = href.replace(`/${part}`, '');
        const file = await loadFileHTML(href);
        if (file)
            return await handle(file, base, href);
    }
    return response(404, 'not found...');
}
async function loadFileHTML(href) {
    const noIndexFile = new File(`${Path.builds}${href}.html`);
    if (await noIndexFile.exists())
        return noIndexFile;
    const withIndexFile = new File(`${Path.builds}${href}/index.html`);
    if (await withIndexFile.exists())
        return withIndexFile;
    return undefined;
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