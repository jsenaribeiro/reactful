import { Props } from "./formProps"

export interface InputProps {
   bind: string
   type: string
}

const ioc: Feeds = {
   await: false,
   logon: '',
   fails: [],
   param: {},
   store: {}
}

export const params: Params = {
   own: 'Sample',
   tag: 'input',
   mem: {},
   uid: 0,
   ioc
}

export const scenarioOf = (props, tag, type = '', keys = ['value', 'onChange']) =>
   [{ ...props, type }, { ...params, tag }, 'world', keys]
