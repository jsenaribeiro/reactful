export {};
interface Event<T> {
    target: {
        value: T;
    };
}
declare global {
    interface Object {
        /** get an object member by dot syntax path */
        valueOf<T = any>(path: string): T;
        /** set an object member by dot syntax path
         * @param {string} path dot syntax path
         * @param {object} data value or an event target.value */
        valueOf<T = any>(path: string, data: T): void;
        /** set an object member by dot syntax path
         * @param {string} path dot syntax path
         * @param {object} data event with target.value to set in member */
        valueOf<T = any>(path: string, data: Event<T>): void;
        /** set an object member by dot syntax path
         * @param {string} path dot syntax path
         * @param {object} data value to set in member
         * @param {boolean} none if false (default), then null|undefined will be '' */
        valueOf<T = any>(path: string, data: T, none: boolean): void;
    }
    interface ObjectConstructor {
        merge<T extends Object>(of: T, to: T): any;
        parse<T extends Object = any>(obj: T): ParseObject<T>;
        fromProxy(that: any): any;
    }
}
declare class ParseObject<T extends object = any> {
    private readonly entries;
    constructor(that: T);
    map(fn: (value: [keyof T, any], index: number) => [keyof T, any]): [keyof T, any][];
    filter(fn: (value: [keyof T, any], index: number) => boolean): [keyof T, any][];
    toObject(): {
        [k: string]: any;
    };
    toArray: () => [keyof T, any][];
}
