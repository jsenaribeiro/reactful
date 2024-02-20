export type Args = {
    path: string;
    code: string;
};
export type Item = {
    index: number;
    regex: RegExp;
};
export type CallType = "arrow" | "block";
export declare const plugins: string[];
export interface FunctionExpression {
    name: string;
    path: string;
    args: string;
    body: string;
    full: string;
    sign: string;
    expr: string;
    mods: string;
    sync: boolean;
    type: CallType;
    none: boolean;
}
export declare const cleanCode: (code: any) => any;
export declare function getModuleFunctions({ code, path }: Args): FunctionExpression[];
