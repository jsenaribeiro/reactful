type ImportType = "component" | "stream" | "html";
export declare const isStream: (request: Request) => boolean;
export declare function stream(request: Request): any;
export declare function stream(route: string, type: ImportType, name: string, base?: string): any;
export {};
