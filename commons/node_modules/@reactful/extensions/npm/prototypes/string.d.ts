import './object';
declare global {
    interface String {
        query(regex: RegExp): string[];
        query(pattern: string): string[];
        query(regex: RegExp, multiple: true): string[][];
        query(pattern: string, multiple: true): string[][];
        equal(regex: RegExp): boolean;
        equal(pattern: string): boolean;
        equal(value: string, ignoreWhiteSpace: boolean): boolean;
        place(...values: any[]): string;
        remove(value: string): string;
        toArray(): any[];
        toObject(): object;
        toNumber(): number;
        trim(): string;
        fix(): string;
    }
}
export {};
