"use server";
import { TITLE_REGEX, METAS_REGEX } from "./regex";
import { BUNDLE_JS, SHARED_JS } from './shared';
import { env, Path, throws } from "@reactful/commons";
import { File } from '../extra';
import { JSDOM } from 'jsdom';
import format from "html-format";
const settings = env.settings;
const NOT_FOUND_ROOT = `not fould <root> tag in index.html`;
const INDEX_NOT_FOUND = `not fould index.html in routes`;
export default async function (jsx, route, inner, outer) {
    outer ||= (await new File(`${Path.cwd}/index.html`).load(INDEX_NOT_FOUND) || '');
    const oldHTML = await injectInHTML(route, inner, outer);
    const newHTML = await injectingSEO(oldHTML, route, jsx);
    const nowHTML = await injectScript(newHTML);
    return nowHTML;
}
async function injectInHTML(route, inner, outer) {
    const INIT_REGEX = /^[\s\S]*<html.*?>/gm;
    const jdom = new JSDOM(outer).window.document;
    const html = jdom.documentElement.innerHTML;
    const node = jdom.querySelector(settings.queryId);
    if (!node)
        return throws(NOT_FOUND_ROOT);
    const uid = node.getAttribute('id');
    const tag = node.tagName.toLowerCase();
    const beginHTML = outer.query(INIT_REGEX)[0];
    const innerHTML = `<${tag} id='${uid}'>${inner}</${tag}>`;
    const finalHTML = html.replace(node.outerHTML, innerHTML);
    const outerHTML = beginHTML + finalHTML + '</html>';
    return outerHTML;
}
async function injectScript(html) {
    // const file = env.MINIFY ? './zipped.js' : BUNDLE_JS
    const head = `<script src='${SHARED_JS}'></script>
      <script type='module' src='${BUNDLE_JS}'></script>`;
    return html.replace(/(<\/head.*?>)/, `${head}$1`);
}
function injectingSEO(html, route, jsx) {
    const metatags = env.get("meta", route, jsx?.name || undefined)
        || extractingMetaTagsFromHTML(html);
    if (!metatags)
        return html;
    const openMeta = { ...metatags.og };
    const template = `<meta $1='$2' content='$3' />\n`;
    const replacer = new RegExp('<(.+)> <(.+)> <(.+)>');
    const charsets = metatags['charset'];
    const metaRgxs = Object.keys(metatags)
        .filter(k => k != 'title')
        .filter(k => k != 'charset')
        .map(name => METAS_REGEX(name));
    if (metatags.og)
        delete metatags['og'];
    if (charsets) {
        const metachar = `<meta charset='${charsets}'>`;
        html = html.replace(/<meta charset.+?>/, '');
        html = html.replace('</head>', `${metachar}</head>`);
    }
    const metaHtml = Object.keys(metatags)
        .map(k => `<name> <${k}> <${metatags[k]}>`)
        .map(x => [x, replacer])
        .reduce((h, [x, r]) => h + x.replace(r, template), '');
    const ogMetaHtml = Object.keys(openMeta)
        .map(x => createOgEntries(x, openMeta))
        .map(([k, v]) => `property og:${k} ${v}`)
        .map(x => [x, replacer])
        .reduce((h, [x, r]) => h + x.replace(r, template), '');
    // remove previous meta that will be replaced
    html = metaRgxs.reduce((h, r) => h.replace(r, ''), html);
    // append new metatags inside head
    html = html.replace('</head>', `${metaHtml}${ogMetaHtml}</head>`);
    // replace title metatag
    html = html.replace(TITLE_REGEX, `$1${metatags.title}$2`);
    return formatHTML(html);
}
function extractingFromHTML(dom, field) {
    const jsxMetaHTML = dom.querySelectorAll(`meta[${field}]`);
    const metaEntries = Array.from(jsxMetaHTML)
        .map(x => [x.getAttribute(field), x.getAttribute('content')])
        .map(x => x);
    if (!metaEntries.length)
        return undefined;
    else
        return Object.fromEntries(metaEntries);
}
function extractingMetaTagsFromHTML(html) {
    const jsxDocument = new JSDOM(html).window.document;
    const jsxMetaData = extractingFromHTML(jsxDocument, 'name');
    const titleInHTML = jsxDocument.querySelector('title')
        && jsxDocument.querySelector('title').innerHTML;
    if (!jsxMetaData && !titleInHTML)
        return undefined;
    if (titleInHTML && jsxMetaData)
        jsxMetaData.title = titleInHTML;
    const ogMetaData = extractingFromHTML(jsxDocument, 'property');
    if (ogMetaData)
        jsxMetaData.og = ogMetaData;
    return jsxMetaData;
}
function createOgEntries(key, obj) {
    if (typeof obj[key] != 'object')
        return [key, obj[key]];
    const entry = createOgEntries(key, obj[key]);
    const field = `${key}:${entry[0]}`;
    const value = entry[1];
    return [field, value];
}
function formatHTML(htmlString) {
    htmlString = htmlString
        .replace('<head>', '\n<head>')
        .replace('</head>', '\n</head>')
        .replace('</body>', '\n</body>')
        .replaceAll('><', '>\n<');
    htmlString = format(htmlString, '   ', 99);
    htmlString = htmlString.replace(/\n[\s\t]*\n/gm, '\n');
    return htmlString;
}
//# sourceMappingURL=inject.js.map