/// <reference lib="dom" />
/// <reference lib="esnext" />
import '@reactful/extensions';
export declare const response: (code: number, body?: any, type?: string, head?: any) => Response;
export declare function queryStringify(that: any): string;
export declare function queriefy(request: Request): {
    route: string;
    query: any;
};
export declare function queryObjectify(queries: string): any;
