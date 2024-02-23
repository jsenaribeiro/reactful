/// <reference lib="dom" />
/// <reference lib="esnext" />
declare global {
    interface Array<T> {
        distinct(): T[];
        first(): T | undefined;
        first(predicate: Function): T[keyof T] | undefined;
        pairs(): [T, T][];
    }
    interface Array<T extends [string, any]> {
        toObject(): object;
    }
    interface ArrayConstructor {
        range(total: number): number[];
        range(first: number, final: number): number[];
    }
}
declare global {
    interface NodeList {
        toArray<T = any>(): T[];
    }
}
export {};
