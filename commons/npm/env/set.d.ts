export declare function set(type: "href", path: string, name: string, html: string, call: RFC): void;
export declare function set(type: "meta", path: string, name: string, html: MetaTags): void;
export declare function set(type: "html", path: string, html: `<${string}</${string}>`): any;
export declare function set(type: "lazy", path: string, name: string, html: `<${string}</${string}>`): void;
