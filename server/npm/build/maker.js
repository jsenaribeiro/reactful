"use server";
import { JSDOM } from 'jsdom';
import { marked } from 'marked';
import { JSXON } from '@reactful/commons';
import { Path, File } from '../extra';
import { renderToString } from 'react-dom/server';
import { throws } from '@reactful/commons';
import { logger as log } from '../extra';
import { env } from '@reactful/commons';
import { parser } from '../serve';
import mergeALL from './inject';
import React from 'react';
import '@reactful/extensions';
const beutify = (code) => code
    .replaceAll(/\n[\s\t]*\n/gm, '\n')
    .replaceAll(/^[\s\t]+(import|export)/gm, '$1');
export default async function (args, type, done = []) {
    const html = args.html || await new File(`${Path.cwd}/index.html`).load();
    const { path, item } = args;
    return type == "MD" ? saveFromMD(item)
        : type == "JSX" ? saveFromJSX(path, item)
            : saveFromHTML(item, html);
    async function saveFromMD(text) {
        const REGEX_FIX = /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/;
        const node = await marked.parse(text.replace(REGEX_FIX, ""));
        return await saveFromHTML(node, html);
    }
    async function saveFromJSX(path, node) {
        path ||= node.metadata.path;
        try {
            const error = /<!--\$!-->([\s\S]+)<!--\/\$-->/;
            const route = new Path(path).href;
            if (done.includes(route))
                return '';
            const url = `${Path.builds}${route}.html`;
            const jsx = await parser(node, route);
            const jms = jsx ? JSXON.htmlfy(jsx) : '';
            const htm = await mergeALL(node, route, jms, html);
            const out = jms.replaceAll("'", '"');
            const err = htm.match(error);
            env.set("html", route, encodeURI(out));
            if (!!err)
                throw err[1];
            await new File(url).save(htm);
            return done.push(route) && htm;
        }
        catch (ex) {
            return throws(ex, import.meta);
        }
    }
    async function saveFromHTML(html, HTML) {
        html = html.replace(/<!--[\s\S]+?-->/gm, '');
        const { last: final, href: route } = new Path(path);
        const htmlJsx = /<link.+?type\s*=\s*['"]\s*component\s*['"]/i;
        const named = final.split(".")[0];
        const label = `${route.slice(1)}.html`;
        if (done.includes(label))
            return '';
        html = html.match(htmlJsx) ? await loadFromJSX(named, html) : html;
        const { body, head } = new JSDOM(html).window.document;
        const title = head?.querySelector('title')?.innerHTML || '';
        title && env.set("meta", route, "default", { title });
        head.querySelectorAll('meta[name]').forEach(x => {
            const name = x.getAttribute('name');
            const data = x.getAttribute('content');
            if (!x || !name || !data)
                return;
            env.set("meta", route, "default", { [name]: data });
        });
        const inner = body.innerHTML.replaceAll("'", '"');
        const outer = await mergeALL(null, route, inner, HTML);
        env.set("html", route, encodeURI(inner));
        await new File(`${Path.builds}/${named}.html`).save(beutify(outer));
        done.push(label) && log.itemfy(label, false);
        return label;
    }
    // <link rel="Counter" type="component/jsx" href="components/counter.tsx">
    async function loadFromJSX(file, html) {
        const imports = [];
        const { head, body } = new JSDOM(html).window.document;
        const fileName = file.split('.')[0];
        const Name = fileName[0].toUpperCase() + fileName.slice(1);
        for (const link of head.querySelectorAll('link[type="component"]')) {
            const name = link.getAttribute("rel");
            const href = link.getAttribute("href") || '';
            const path = href.replace(/\.[tj]sx$/, '');
            const item = { path, name: name ? `{ ${name} }` : Name };
            path && imports.push(item) && link.remove();
        }
        const BODY_REGEX = /<body.*?>([\s\S]+)<\/\s*body\s*>/;
        const base = (html.match(BODY_REGEX) || ['', ''])[1];
        const code = `import React from 'react'
         ${imports.map(x => `import ${x.name} from '${x.path}'\n`)}
         export default function() { \n\treturn <>${base}</> \n}`;
        const path = `${Path.builds}/${fileName}.tsx`;
        await new File(path).save(beutify(code));
        const fnc = await import(path).then(x => x.default);
        const jsx = React.createElement(fnc);
        return html.replace(base, renderToString(jsx));
    }
}
//# sourceMappingURL=maker.js.map