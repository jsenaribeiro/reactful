import { useProps } from './props'
import { useFeeds } from './feeds'
import { env } from '@reactful/commons'

const { context } = env.settings
const IS_SERVER_SIDE = !globalThis.document

export type StateResult = [record & { children:any }, Feeds]

export interface StateArgs { url: string, set: UseState<any>, jsx: FCE, dir: string }

export function mountState(args: StateArgs): StateResult {
   if (IS_SERVER_SIDE) return [ args.jsx.props, context ]

   const stateProps = useProps(args.set[1], args.jsx, args.dir)
   const stateFeeds = useFeeds(args.set[1], args.url)

   return [ stateProps, stateFeeds ]
}

