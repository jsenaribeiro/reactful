import { InjectFunction } from './inject';
import { RenderFunction } from './render';
interface ServerResult {
    inject: InjectFunction;
    render: RenderFunction;
}
/** Reactive startup server bootstrap
 * @param {string} routes entry routes folder */
export declare function server(routes: `/${string}`): ServerResult;
/** Reactive startup server bootstrap
 * @param {string} routes entry routes folder
 * @param {Settings} settings custom server settings */
export declare function server(routes: `/${string}`, settings: Partial<Settings>): ServerResult;
export {};
