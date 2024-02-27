export type StateResult = [record & {
    children: any;
}, Feeds];
export interface StateArgs {
    url: string;
    set: UseState<any>;
    jsx: FCE;
    dir: string;
}
export declare function mountState(args: StateArgs): StateResult;
