import { env } from './environment';
import { throws } from './throw';
import { renderToString } from 'react-dom/server';
import { PRIMITIVES } from './constants';
const map = [
    { key: "$RE", for: Symbol.for("react.element") },
    { key: "$RF", for: Symbol.for("react.fragment") }
];
const deserializer = (_, val) => map.find(x => x.key == val)?.for || val;
const serializer = (_, val) => map.find(x => x.for == val)?.key || val;
export const JSXON = {
    parse: (json) => JSON.parse(json, deserializer) || {},
    htmlfy: htmlfyJSX,
    stringify: (jsx, tabs) => JSON.stringify(jsx, serializer, tabs)
        .replaceAll("$$typeof", "$typeof")
};
/** encapuslates renderToString from react-dom/server */
function htmlfyJSX(node) {
    if (!node)
        return '';
    try {
        env.FLAGS.errors = false;
        const wrap = wrapper(node);
        const html = renderToString(wrap);
        env.FLAGS.errors = true;
        return html;
    }
    catch (ex) {
        return throws(ex, import.meta);
    }
}
function wrapper(value) {
    if (typeof value?.type != "function")
        return value;
    if (Array.isArray(value))
        return value.map(wrapper);
    const props = value?.props;
    const feeds = env.settings.context;
    const basic = PRIMITIVES.includes(typeof value);
    const ended = typeof value?.type == "string";
    const typed = typeof value?.type;
    const named = value?.type?.name;
    if (!value || ended || basic)
        return value;
    if (typed != "function" || named == "retype")
        return value;
    function retype(p, f) {
        const child = value.type({ ...props, ...p }, { ...feeds, ...f });
        const split = Object.entries(child.props)
            .map(([key, obj]) => [key, wrapper(obj)]);
        return { ...child, props: Object.fromEntries(split) };
    }
    return { ...value, type: retype };
}
//# sourceMappingURL=jsxon.js.map