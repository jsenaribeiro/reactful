import { env } from '@reactful/commons';
import { inject } from './inject';
import { render } from './render';
export function server(routes, settings) {
    if (settings)
        Object.merge(env.settings, settings);
    env.settings.folders.routes = routes;
    return { inject, render };
}
//# sourceMappingURL=server.js.map