type PathStatic = Omit<Omit<Omit<typeof Path, "prototype">, "from">, "e2e">;
type PathFields = keyof Omit<Omit<Omit<Omit<PathStatic, "startup">, "cwd">, "lib">, "tst">;
export declare class Path {
    path: string;
    static e2e: boolean;
    private static paths;
    constructor(path: string);
    constructor(meta: ImportMeta);
    static from: (directory: PathFields) => Path;
    static startup(): true;
    static get cwd(): string;
    get base(): Path;
    get name(): string;
    get Name(): string;
    get last(): string;
    get href(): RouteString;
    goto: (name: string, retry?: number) => any;
    static get apis(): string;
    static get assets(): string;
    static get builds(): string;
    static get routes(): string;
    static get shares(): string;
    static get components(): string;
    static get directives(): string;
    browser(): Promise<IPathBrowse[]>;
    resolve(path: string): string;
}
export {};