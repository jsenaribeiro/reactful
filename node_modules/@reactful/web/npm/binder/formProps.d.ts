declare const _default: string[];
export default _default;
export interface Props<T extends object = object> {
    data: T;
    children?: any;
    onFetch?: OnFetchEvent;
    onSubmit?: OnSubmitEvent;
    onValidate?: OnValidateEvent;
}
/** reactful forms as form[data] and children[bind]
 * with server actions and validation api */
export declare function formProps(props: Props, params: Params): any;
