/// <reference lib="esnext" />
import './array';
declare global {
    interface JSON {
        scriptify<T = any>(that: T): string;
        scriptify<T = any>(that: T, swap: Swap): string;
        scriptify<T = any>(that: T, swap: Swap, functionless: boolean): string;
    }
}
type Swap = (field: string, value: any) => any;
export {};
