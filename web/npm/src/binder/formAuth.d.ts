import { ServerActionProps } from "./formShared";
export declare function authenticate<T extends record = record>(props: ServerActionProps): RequestInit;
export declare function authorize(response: Response, props?: ServerActionProps): Promise<void>;
