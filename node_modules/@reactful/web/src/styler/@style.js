import { env } from '@reactful/commons';
const settings = env.settings;
const IS_SERVER_SIDE = !globalThis.document;
export function style(url) {
    return function (meta, call) {
        if (IS_SERVER_SIDE)
            return call;
        fetch(url).then(x => x.text().then(onText));
        const src = meta.url.replace('file://', '');
        function onText(css) {
            settings.stylers ||= {};
            settings.stylers[src] ||= [];
            settings.stylers[src].push(css);
        }
        return call;
    };
}
//# sourceMappingURL=@style.js.map