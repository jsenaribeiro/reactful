/// <reference lib="dom" />
export declare const GLOBAL_KEY: unique symbol;
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
    set(type: "href", path: string, name: string, data: string, call: RFC): void;
    set(type: "meta", path: string, name: string, data: MetaTags): void;
    set(type: "html", path: string, data: `<${string}</${string}>`): any;
    set(type: "lazy", path: string, name: string, data: `<${string}</${string}>`): void;
    let(route: RouteString): {
        href: string;
        call: RFC | null;
    };
    get settings(): Settings;
    get all(): ICache[];
}
export declare const env: Environment;
export {};