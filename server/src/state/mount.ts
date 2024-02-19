import { useProps } from './props'
import { useFeeds } from './feeds'
import { env } from '@reactful/commons'

const { context, binding } = env.settings
const IS_SERVER_SIDE = !globalThis.document

export function startState() {
   binding.state = { }   
}

export function mountState(href: string, hook: UseState<any>, node: FCE, path: string) {
   if (IS_SERVER_SIDE) return [ node.props, context ]

   const stateProps = useProps(hook[1], node, path)
   const stateFeeds = useFeeds(hook[1], href)

   return [ stateProps, stateFeeds ]
}

