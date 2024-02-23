import { env, PREFIX_ERROR } from '@reactful/commons';
const IS_CLIENT_SIDE = !!globalThis.document;
function routeDecorator(href) {
    if (!href)
        throw `${PREFIX_ERROR}empty @route(href)`;
    if (!href.match(/^\/[^ "]+$/))
        throw `${PREFIX_ERROR}invalid @route(href)`;
    return function (meta, call) {
        const [name, path] = [call.name, meta.url.replace('file://', '')];
        env.set("href", path, name, href, call);
        return call;
    };
}
export const route = IS_CLIENT_SIDE ? (...args) => (...params) => null : routeDecorator;
//# sourceMappingURL=@route.js.map