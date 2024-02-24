import '@reactful/extensions';
export declare function delay(time: Time): Promise<void>;
export declare function delay(time: number): Promise<void>;
export declare function delay<T = any>(time: number, call: () => T): Promise<T>;
export declare function getMillisecondsFrom(value: number | Time): number;
