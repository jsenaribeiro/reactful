export interface RenderFunction {
    (): Promise<void>;
    (query: string): Promise<void>;
}
/** starts the server from '#root' HTML element */
export declare function render(): any;
/** starts the server from query selector entry point
 * @param {string} query query select for root element */
export declare function render(query: string): any;
