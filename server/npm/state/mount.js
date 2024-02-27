import { useProps } from './props';
import { useFeeds } from './feeds';
import { env } from '@reactful/commons';
const { context } = env.settings;
const IS_SERVER_SIDE = !globalThis.document;
export function mountState(args) {
    if (IS_SERVER_SIDE)
        return [args.jsx.props, context];
    const stateProps = useProps(args.set[1], args.jsx, args.dir);
    const stateFeeds = useFeeds(args.set[1], args.url);
    return [stateProps, stateFeeds];
}
//# sourceMappingURL=mount.js.map