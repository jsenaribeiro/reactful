export { }

declare type OnFetchEvent = (response: Response) => void
declare type OnSubmitEvent = (value: any, feeds: Feeds) => void
declare type OnValidateEvent = (invalids: Invalid[]) => Promise<void>
declare type Validate = (value: string) => string|''

declare interface Bind { bind?: string }
declare interface Data<T extends Object = record> { data?: T }
declare interface FormAuth { bearer?: string }
declare interface DataBind extends Data, Bind { validate?: Validate }
declare interface OnValidate { onValidate?: OnValidateEvent }
declare interface OnSubmit { onSubmit?: OnSubmitEvent }

declare module "react" {
   // bindProps + formProps
   interface FormHTMLAttributes<T> extends Data, FormAuth, OnSubmit, OnValidate { }
   interface InputHTMLAttributes<T> extends DataBind { }
   interface SelectHTMLAttributes<T> extends DataBind { }
   interface TextareaHTMLAttributes<T> extends DataBind { }   

   // routeProps
   interface HTMLAttributes<T> { link?: string, route?: string } 

   // css props
   interface HTMLAttributes<T> {  
      grid?: boolean
      cols?: number|string
      gaps?: number|string
      range?: [number, number]
      theme?: "dark"|"light"
      media?: string
   }
}