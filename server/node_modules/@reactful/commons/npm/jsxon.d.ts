export declare const JSXON: {
    parse: (json: string) => JSX;
    htmlfy: typeof htmlfyJSX;
    stringify: (jsx: JSX, tabs?: number) => string;
};
/** encapuslates renderToString from react-dom/server */
declare function htmlfyJSX(node: RRE): string;
export {};
