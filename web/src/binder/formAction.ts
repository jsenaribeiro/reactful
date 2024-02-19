import { UpdateArgs, getErrors } from "./formShared"
import { authenticate, authorize } from './formAuth'
import { env } from '@reactful/commons'

const { context, binding } = env.settings

export async function action(args: UpdateArgs) {
   const { props, fetch: caller } = args
   const config = authenticate(props)     

   context.await = true
   binding.fresh()
   
   try {
      const result = await fetch(props.action!, config)

      if (!result.ok) context.fails = await getErrors(result)

      await authorize(result, props)

      caller && caller(result)
   } 
   catch (ex: any) {
      const error = ex?.message || ex?.toString()
      context.fails.push({ error, field: '', value: '' })
   }
   finally {
      const errors = context.fails

      errors.filter(e => !e.error)
            .forEach((e, i) => delete errors[i])

      errors.filter(e => errors.filter(x => e.error == x.error).length > 1)
            .forEach((e, i) => delete errors[i])

      context.await = false
      binding.fresh()
   }
}  