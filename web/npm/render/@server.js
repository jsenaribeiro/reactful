import { IS_ONLY_FOR_ROUTE, PREFIX_ERROR } from '@reactful/commons';
import { getMillisecondsFrom, env } from '@reactful/commons';
import '@reactful/extensions';
const SERVER_PATH_ERROR = `${PREFIX_ERROR}@server ` + IS_ONLY_FOR_ROUTE;
const IS_CLIENT_SIDE = !!globalThis.document;
export function server(mode, args) {
    setTimeout(() => env.FLAGS.errors = true, 3);
    const side = "server", isMS = typeof args == "number";
    const time = typeof args == "number" ? args
        : getMillisecondsFrom(args);
    env.FLAGS.errors = false;
    return function (meta, call) {
        if (IS_CLIENT_SIDE)
            return call;
        const path = meta.url.replace('file://', '');
        const { folders, renders } = env.settings;
        const inferMode = call.isAsync ? "dynamic" : "static";
        const failedServer = side == "server"
            && !path.includes(folders.routes);
        if (failedServer)
            throw SERVER_PATH_ERROR;
        renders.push({
            call,
            path,
            name: call.name,
            time: time || 0,
            mode: mode || inferMode,
            href: new URL(meta.url).pathname
        });
        return call;
    };
}
//# sourceMappingURL=@server.js.map