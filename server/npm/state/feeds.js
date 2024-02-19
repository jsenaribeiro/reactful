"use client";
import { env } from '@reactful/commons';
import { createProxyState } from './shared';
var timeout;
const { context, binding } = env.settings;
export function useFeeds(hook, href) {
    if (binding.ready)
        return context;
    else
        env.let(href);
    context.store = createProxyState(context.store);
    binding.ready = true;
    return context;
}
//# sourceMappingURL=feeds.js.map