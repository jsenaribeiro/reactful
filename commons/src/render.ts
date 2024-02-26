import { env } from './env'

export const params = (tag: string, own: string, uid: number, now?: object): Params => 
   ({ tag, own, uid, mem: now, ioc: env.settings.context })
