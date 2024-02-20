import { env, isRouted } from '@reactful/commons';
export default ['route', 'link'];
const settings = env.settings;
const context = { route: {} };
const IS_SERVER_SIDE = !globalThis.document;
export const routeProps = function (props, params) {
    if (!props?.link && !props?.route)
        return props;
    const isNotRouted = IS_SERVER_SIDE
        ? x => !isRouted(settings.current, x)
        : x => !isRouted(location.pathname, x);
    const hidden = isNotRouted(props.route);
    const routed = !isNotRouted(props.link);
    if (props.route)
        props = hidden
            ? { ...props, hidden }
            : { ...props };
    if (props.link)
        props = routed
            ? { ...props, onClick, className: `${props.className} routed` }
            : { ...props, onClick };
    const route = context.route[props.link]
        ||= location.pathname.replace(/\/$/, '');
    function onClick() {
        if (!props.link)
            return;
        const url = props.link.replace(/^\./, route);
        history.pushState(null, '', url);
        settings.binding.fresh();
    }
    return props;
};
//# sourceMappingURL=routeProps.js.map