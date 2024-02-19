import { COLORS } from '@reactful/commons';
type Color = keyof typeof COLORS;
export declare const logger: {
    inline: boolean;
    insert(message: string, ...colors: Color[]): void;
    append(message: string, ...colors: Color[]): void;
    itemfy(message: string, fill?: boolean): void;
};
export declare function log(message: string): any;
export declare function log(message: string, ...colors: Color[]): any;
export {};
