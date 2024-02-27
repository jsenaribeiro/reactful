"use server";
import { queriefy, response, JSXON } from "@reactful/commons";
import { mergeHTML } from "../build";
import { Path, File } from "../extra";
import { parser } from './parser';
import { fallbackHTML } from "./fallback";
export const isStream = (request) => Object.keys(queriefy(request).query).includes("jsx");
export async function stream(args, type = "html", name = 'default', base = '') {
    return args instanceof Request ? await streamByRequest(args)
        : await streamByArgument({ path: args, type, name, base });
}
async function streamByRequest(request) {
    if (!isStream(request))
        return undefined;
    const type = "stream";
    const href = new Path(request.url).href;
    const name = queriefy(request).query.tag || 'default';
    const args = { path: href, type, name, base: '' };
    return await streamByArgument(args);
}
async function streamByArgument(args) {
    const [namedPath, indexPath] = ['', '/index']
        .map(x => `${Path.routes}${args.path}${x}.tsx`);
    const have = async (x) => await new File(x).exists();
    const path = await have(args.path) ? args.path
        : await have(namedPath) ? namedPath
            : await have(indexPath) ? indexPath
                : undefined;
    if (!path)
        return response(404, 'not found: ' + args);
    const mergingHTML = ([jsx, html]) => path ? mergeHTML(jsx, path, html) : '';
    const importComponent = x => x
        .then(x => x[args.name || 'default'])
        .then(x => parser(x, path));
    const streamPipeline = x => importComponent(x)
        .then(jsx => jsx ? JSXON.htmlfy(jsx) : '');
    const servingPipeline = x => importComponent(x)
        .then(jsx => [jsx, JSXON.htmlfy(jsx)])
        .then(mergingHTML);
    const pipeline = args.type == "stream" ? streamPipeline
        : args.type == "html" ? servingPipeline
            : importComponent;
    const html = await pipeline(import(path));
    const mime = args.type == "html" ? "text/html" : "text/plain";
    return args.base == '' ? response(200, html, mime)
        : await fallbackHTML(html, args.base, path);
}
//# sourceMappingURL=stream.js.map