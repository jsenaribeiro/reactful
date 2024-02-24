import "@reactful/extensions";
export declare function cleanupFolders(): Promise<void>;
export declare function preValidation(path?: string): Promise<void>;
type List = Array<[string, string | RFC | undefined]>;
export declare function folder(one: boolean, dir?: string, has?: List): Promise<[string, string | RFC][]>;
export declare function file({ path, name }: {
    path: string;
    name: string;
}): Promise<[string, string] | [string, RFC]>;
export {};
