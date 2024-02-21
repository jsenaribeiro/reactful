import React from 'react'

declare interface MetaData {
   path: string
   name: string
   fail: Failure
}

declare type JSX = React.ReactElement
declare type RRE = React.ReactElement<JSXProps, any>
declare type RFC = React.FunctionComponent<JSXProps> 
declare type FCE = React.FunctionComponentElement<JSXProps> 
declare type ErrorProps = { status?: number, errors?: string[] }
declare type ErrorComponent<T=ErrorProps> = React.FunctionComponentElement<T> 

declare type EEC = { type:EFC }
declare type EFC<T extends object=any> = ((props:T) => RRE) & { metadata: MetaData }  

export { }