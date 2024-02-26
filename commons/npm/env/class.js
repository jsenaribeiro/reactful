/// <reference lib='dom' />
import { allSettings } from "./all";
import { contextualizer } from "./context";
import { validation } from "./try";
import { routefy } from "./let";
import { get } from "./get";
import { set } from "./set";
import '@reactful/extensions';
const consoleError = console.error.bind({});
const consoleEmpty = (...args) => null;
export class Environment {
    constructor() { validation(this); contextualizer(); }
    is = (side) => side == (globalThis.document ? "CLIENT" : "SERVER");
    PORT = 0;
    MINIFY = true;
    FLAGS = {
        log: false,
        debug: false,
        build: false,
        serve: false,
        get errors() { return console.error != consoleEmpty; },
        set errors(enable) {
            console.error = enable
                ? consoleError.bind({})
                : (...args) => null;
        },
    };
    get = get;
    set = set;
    let = routefy;
    get settings() { return allSettings(); }
}
//# sourceMappingURL=class.js.map