import { Args } from '../shared';
interface Query {
    name: string;
    call: string;
    expr: string;
}
export default function (args: Args): string;
export declare function extractDecorators(args: Args): Query[];
export {};
