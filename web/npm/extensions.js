import React from "react";
import { isRouted, throws } from "@reactful/commons";
const IS_SERVER_SIDE = !globalThis.document;
Promise.prototype.asLazyComponent = function (exported) {
    if (!exported || exported.endsWith('$'))
        exported = 'default';
    const base = this;
    const none = React.createElement('div');
    const fail = `Not found ${exported} for as LazyComponent`;
    if (IS_SERVER_SIDE)
        return props => none;
    else
        return function (props) {
            base['routing'] ||= props.route;
            const [child, setComponent] = React.useState(none);
            React.useEffect(() => base.then(afterImported), []);
            function afterImported(imported) {
                if (!imported[exported])
                    throws(fail, import.meta);
                const pathRoute = location.pathname;
                const nowRouted = props.route || base['routing'];
                const hasRouted = nowRouted && isRouted(pathRoute, nowRouted);
                const component = imported[exported](props);
                setComponent(hasRouted ? component : none);
            }
            return child;
        };
};
//# sourceMappingURL=extensions.js.map