export declare function get(type: "href", path: string, name: string): string;
export declare function get(type: "meta", path: string, name?: string): MetaTags;
export declare function get(type: "html", path: string): `<${string}</${string}>`;
export declare function get(type: "lazy", path: string, name: string): `<${string}</${string}>`;
