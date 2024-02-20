import React from "react"

declare module "react" {
   interface HTMLAttributes<T> { shown?:boolean }
}

export const shown = props => 
   props?.shown === false 
      ? { ...props, hidden: true } 
      : props