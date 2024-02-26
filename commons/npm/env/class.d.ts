/// <reference lib="dom" />
import { IEnvironment } from "./trait";
import { routefy } from "./let";
import { get } from "./get";
import { set } from "./set";
import '@reactful/extensions';
export declare class Environment implements IEnvironment {
    constructor();
    is: (side: "CLIENT" | "SERVER") => boolean;
    PORT: number;
    MINIFY: boolean;
    FLAGS: {
        log: boolean;
        debug: boolean;
        build: boolean;
        serve: boolean;
        errors: boolean;
    };
    get: typeof get;
    set: typeof set;
    let: typeof routefy;
    get settings(): Settings<any>;
}
