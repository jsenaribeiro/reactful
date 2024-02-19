export declare const BUNDLE_JS: string;
export declare const SHARED_JS: string;
export declare const ZIPPED_JS: string;
export declare const BUNDLE_TS: string;
export declare const ZIPPED_TS: string;
export declare const INDEX_HTML_URL: string;
export type IParser = (node: EFC, path: string) => Promise<any>;
export type ISaver = (args: SaveProps, type: SaveType, done?: string[]) => Promise<string | boolean>;
export interface SaveProps {
    item: RFC | string;
    path: string;
    html?: string;
}
export type SaveType = "MD" | "JSX" | "HTML";
