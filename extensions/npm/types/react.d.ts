export {};
declare global {
    type OnFetchEvent = (response: Response) => void;
    type OnSubmitEvent = (value: any, feeds: Feeds) => void;
    type OnValidateEvent = (invalids: Invalid[]) => Promise<void>;
    type Validate = (value: string) => string | '';
    interface Bind {
        bind?: string;
    }
    interface Data<T extends Object = record> {
        data?: T;
    }
    interface FormAuth {
        bearer?: string;
    }
    interface DataBind extends Data, Bind {
        validate?: Validate;
    }
    interface OnValidate {
        onValidate?: OnValidateEvent;
    }
    interface OnSubmit {
        onSubmit?: OnSubmitEvent;
    }
}
declare module "react" {
    interface FormHTMLAttributes<T> extends Data, FormAuth, OnSubmit, OnValidate {
    }
    interface InputHTMLAttributes<T> extends DataBind {
    }
    interface SelectHTMLAttributes<T> extends DataBind {
    }
    interface TextareaHTMLAttributes<T> extends DataBind {
    }
    interface HTMLAttributes<T> {
        link?: string;
        route?: string;
    }
    interface HTMLAttributes<T> {
        grid?: boolean;
        cols?: number | string;
        gaps?: number | string;
        range?: [number, number];
        theme?: "dark" | "light";
        media?: string;
    }
}
