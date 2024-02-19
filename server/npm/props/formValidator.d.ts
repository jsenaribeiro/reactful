import { HTML } from "./formShared";
import { SubmitEvent } from "./formShared";
import { Props } from "./formProps";
import '../../helper';
type OnSubmitValidator = [boolean, HTMLInputElement[]];
export declare function onSubmitValidate(props: Props, e: SubmitEvent): Promise<OnSubmitValidator>;
export declare function extractErrors(props: Props, inputs: any): Promise<Invalid<any>[]>;
export declare function elementValidationOf(props: Props, inputs: HTML[]): HTMLInputElement[];
export {};
