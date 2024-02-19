/// <reference types="bun-types" />
/// <reference types="bun-types" />
import { BunFile } from 'bun';
import '@reactful/prototypes';
export declare class File {
    readonly blob: BunFile;
    readonly mime: string;
    readonly path: string;
    readonly size: number;
    readonly name: string;
    get href(): string;
    constructor(path: string);
    exists(): Promise<boolean>;
    save(text: string): Promise<number>;
    load(error?: string, decode?: boolean): Promise<string>;
}
