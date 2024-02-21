import { InjectFunction } from './inject';
import { RenderFunction } from './render';
interface ServerResult {
    inject: InjectFunction;
    render: RenderFunction;
}
/** reactful startup server bootstrap
 * @param {string} routes entry routes folder */
export declare function server(routes: `/${string}`): ServerResult;
/** reactful startup server bootstrap
 * @param {string} routes entry routes folder
 * @param {Settings} settings custom server settings */
export declare function server(routes: `/${string}`, settings: Partial<Settings>): ServerResult;
export {};
