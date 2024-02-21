import { FormEvent } from "react";
import { Props } from "./formProps";
export type SubmitEvent = FormEvent<HTMLFormElement> & {
    nativeEvent: {
        submitter: {
            onclick: string;
        };
    };
    target: HTMLFormElement & {
        elements: any;
    };
};
export interface UpdateArgs {
    inputs: HTML[];
    params: Params;
    fetch?: OnFetchEvent;
    submit?: OnSubmitEvent;
    props: ServerActionProps;
}
export interface ServerActionProps extends Props {
    action?: `http://${string}` | `https://${string}`;
    format?: "formData" | "json";
    method?: "POST" | "PUT" | "PATCH";
    bearer?: string;
}
export type HTML = HTMLInputElement;
export interface ChildProps {
    bind?: string;
    children?: record[];
    validate?: Function;
}
export interface ProblemDetails {
    type: string;
    title: string;
    status: number;
    detail: string;
    invalidFields: FieldProblemDetails[];
}
export interface FieldProblemDetails {
    fieldName: string;
    message: string;
}
export declare function defaultError(code: number): "Invalid request" | "URL not found" | "Error" | "Internal serve error...";
export declare function getErrors(response: Response): Promise<Invalid[]>;
