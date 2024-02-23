"use server";
import { env, JSXON, response } from "@reactful/commons";
import { stream, isStream } from "./stream";
import { mergeHTML } from "../build";
import { parser } from '../serve';
import { Path } from "../extra";
import { ssg } from './static';
const settings = env.settings;
export async function routing(route) {
    if (route instanceof Request && !isRoute(route))
        return undefined;
    if (route instanceof Request)
        return routing(new Path(route.url).href);
    // @route : dynamic site generation (decorator)   
    const { call, href } = await env.let(route);
    const html = call && await renderize(call, href);
    const HTML = html && await mergeHTML(call, href, html);
    if (HTML)
        return response(200, HTML, "text/html");
    // dsg : dynamic site generation (folder)
    const rendering = settings.renders.find(x => x.href == href);
    const isDynamic = rendering?.mode == "dynamic";
    if (isDynamic)
        return await stream(href, "html");
    // ssg: static site generation (default)
    return await ssg(route);
}
// rendering JSX to HTML in each routing item
async function renderize(call, href) {
    const node = await parser(call, href);
    const html = node && JSXON.htmlfy(node);
    return html;
}
const isRoute = (request) => isRequestRoute(request)
    && isPathRoute(new Path(request.url))
    && request.url.equal(/\.[\w\d]+$/) == false;
const isRequestRoute = (request) => isStream(request) == false;
const isPathRoute = (path) => path.href.startsWith("/")
    && !path.href.startsWith("/api/")
    && !path.href.startsWith("/assets/")
    && !path.href.equal(/\.[\w\d]+$/);
//# sourceMappingURL=router.js.map