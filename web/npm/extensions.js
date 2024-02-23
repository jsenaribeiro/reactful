import React from "react";
import { isRouted, throws } from "@reactful/commons";
const IS_SERVER_SIDE = !globalThis.document;
Promise.prototype.asLazyComponent = function (member) {
    if (!member || member.endsWith('$'))
        member = 'default';
    const base = this;
    const hide = React.createElement('div');
    const fail = `Not found ${member} for as LazyComponent`;
    if (IS_SERVER_SIDE)
        return props => hide;
    else
        return function (props) {
            base['routing'] ||= props.route;
            const routing = React.useRef(false);
            const [component, setComponent] = React.useState(hide);
            React.useEffect(() => { base.then(afterImported); }, [routing.current]);
            function afterImported(imported) {
                if (!imported[member])
                    throws(fail, import.meta);
                const pathRoute = location.pathname;
                const importing = imported[member](props);
                const nowRouted = props.route || base['routing'];
                const hasRouted = nowRouted && isRouted(pathRoute, nowRouted);
                routing.current = hasRouted;
                if (hasRouted && component != hide)
                    return;
                else
                    setComponent(hasRouted ? importing : hide);
            }
            return component;
        };
};
//# sourceMappingURL=extensions.js.map