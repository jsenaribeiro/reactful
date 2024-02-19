import { FormEvent } from "react"
import { Props } from "./formProps"

export type SubmitEvent = FormEvent<HTMLFormElement> & {
   nativeEvent: { submitter: { onclick: string }}
   target: HTMLFormElement & { elements:any }
}

export interface UpdateArgs {
   inputs: HTML[]
   params: Params
   fetch?: OnFetchEvent
   submit?: OnSubmitEvent
   props: ServerActionProps 
}

export interface ServerActionProps extends Props {
   action?: `http://${string}`|`https://${string}`
   format?: "formData"|"json" // default=formData
   method?: "POST"|"PUT"|"PATCH"
   bearer?: string
}

export type HTML = HTMLInputElement

export interface ChildProps {
   bind?: string
   children?: record[]
   validate?: Function // in-element custom validation
}

export interface ProblemDetails {
   type: string
   title: string
   status: number
   detail: string
   invalidFields: FieldProblemDetails[]
 }
 
 export interface FieldProblemDetails {
   fieldName: string
   message: string
 }


export function defaultError(code: number) {
   return code <= 400 ? "Invalid request"
        : code == 404 ? "URL not found"
        : code >= 400 && code < 500 ? "Error"
        : "Internal serve error..."
}

const isProblemDetailObject = (data: any): data is ProblemDetails =>
   data.type && data.title && data.status && data.detail

export async function getErrors(response: Response): Promise<Invalid[]>  {
   const text = await response.text()
   const json = parseOrElseJSON(text)

   return extractErrors(response, json, text)
}

function extractErrors(response: Response, json: any, text?: string): Invalid[] {
   if (json && Array.isArray(json)) 
      return json.flatMap(x => extractErrors(response, json, text))

   if (json && isProblemDetailObject(json)) 
      return json.invalidFields?.length ? json.invalidFields
         .map(x => ({ field:x.fieldName, error: x.message, value:'' }))
         : [{ field: '', error: json.title, value: ''  }]

   const fail = json?.message?.trim() || text?.trim() 
      || response.statusText || defaultError(response.status)

   return [{ error:fail, field:'', value:'' }]
}

function parseOrElseJSON(str) {
   try { return JSON.parse(str) } 
   catch (e) { return undefined }
}