export {}

declare global {
   interface MetaData {
      path: string
      name: string
      fail: Failure
   }
   
   type JSX = React.ReactElement
   type RRE = React.ReactElement<JSXProps, any>
   type RFC = React.FunctionComponent<JSXProps> 
   type FCE = React.FunctionComponentElement<JSXProps> 
   type ErrorProps = { status?: number, errors?: string[] }
   type ErrorComponent<T=ErrorProps> = React.FunctionComponentElement<T> 
   
   type EFC<T extends object=any> = ((props:T) => RRE) & { metadata: MetaData }  
   type EEC = { type: EFC }
}