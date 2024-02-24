/// <reference lib="dom" />
import '@reactful/extensions';
interface IEnv {
    PORT: number;
    MINIFY: boolean;
}
declare class Environment implements IEnv {
    PORT: number;
    MINIFY: boolean;
    FLAGS: {
        log: boolean;
        debug: boolean;
        build: boolean;
        serve: boolean;
        errors: boolean;
    };
    constructor();
    get(type: "href", path: string, name: string): string;
    get(type: "meta", path: string, name?: string): MetaTags;
    get(type: "html", path: string): `<${string}</${string}>`;
    get(type: "lazy", path: string, name: string): `<${string}</${string}>`;
    set(type: "href", path: string, name: string, html: string, call: RFC): void;
    set(type: "meta", path: string, name: string, html: MetaTags): void;
    set(type: "html", path: string, html: `<${string}</${string}>`): any;
    set(type: "lazy", path: string, name: string, html: `<${string}</${string}>`): void;
    set(type: "wait", path: string, guid: string, html: string): any;
    let(route: RouteString): {
        href: string;
        call: RFC | null;
    };
    get settings(): Settings;
    get all(): ICache[];
}
export declare const env: Environment;
export declare const GLOBAL_KEY: unique symbol;
export {};
