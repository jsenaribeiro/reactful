import { env, PREFIX_ERROR } from '@reactful/commons';
export function route(href) {
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
//# sourceMappingURL=@route.js.map