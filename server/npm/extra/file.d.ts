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
    exists(): any;
    save(text: string): Promise<any>;
    load(error?: string, decode?: boolean): Promise<any>;
}
