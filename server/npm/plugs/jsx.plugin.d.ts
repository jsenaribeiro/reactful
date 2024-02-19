import { BunPlugin } from "bun";
import { Args } from "../plugs/shared";
type Transpiler = (args: Args) => string;
export declare const pipeline: Transpiler[];
export declare const jsxPlugin: BunPlugin;
export {};
