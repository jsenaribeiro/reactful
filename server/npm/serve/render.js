import { serve } from "./asset";
import { stream } from "./stream";
import { routing } from "./router";
import { logger as log } from '../extra';
import { Path, response } from '@reactful/commons';
import { env, SERVING } from '@reactful/commons';
import { bundler } from '../build';
export async function render(query = '#root') {
    Path.startup() && await bundler(false);
    const port = parseInt(process.env.PORT || '3000');
    log.append(`\n${SERVING.place(port)}`, "FG_GREEN");
    env.FLAGS.serve = true;
    return Bun.serve({
        development: env.FLAGS.debug,
        port: process.env.PORT || port,
        async fetch(request) {
            try {
                env.settings['request'] = request;
                return await routing(request)
                    || await stream(request)
                    || await serve(request);
            }
            catch (ex) {
                console.error('REACTIVE', ex);
                return response(500, ex.message || ex);
            }
        }
    });
}
//# sourceMappingURL=render.js.map