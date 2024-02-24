import { RenderFunction } from './render';
export interface InjectResult {
    inject: InjectFunction;
    render: RenderFunction;
}
export interface InjectFunction {
    (directive: Proper): InjectResult;
}
/** inject a custom props directive */
export declare function inject(directive: Proper): InjectResult;
