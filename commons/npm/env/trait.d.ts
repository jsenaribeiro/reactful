export interface IEnvironment {
    PORT: number;
    MINIFY: boolean;
    FLAGS: {
        log: boolean;
        debug: boolean;
        build: boolean;
        serve: boolean;
        errors: boolean;
    };
    get: {
        (type: "href", path: string, name: string): string;
        (type: "meta", path: string, name?: string): MetaTags;
        (type: "html", path: string): `<${string}</${string}>`;
        (type: "lazy", path: string, name: string): `<${string}</${string}>`;
    };
    set: {
        (type: "href", path: string, name: string, html: string, call: RFC): void;
        (type: "meta", path: string, name: string, html: MetaTags): void;
        (type: "html", path: string, html: `<${string}</${string}>`): any;
        (type: "lazy", path: string, name: string, html: `<${string}</${string}>`): void;
    };
    let: (route: RouteString) => {
        href: string;
        call: RFC;
    };
}
