import { env } from '@reactful/commons';
import { render } from './render';
/** inject a custom props directive */
export function inject(directive) {
    if (!directive || typeof directive != "function")
        throw `Invalid directive injection in server.inject(...)`;
    else
        env.settings.propers.push(directive);
    return { inject, render };
}
//# sourceMappingURL=inject.js.map