import React from "react";
import { isRouted } from "@reactful/commons";
const IS_SERVER_SIDE = !globalThis.document;
Promise.prototype.asLazyComponent = function (member) {
    const hidden = React.createElement('div');
    const that = this;
    that['routing'] ||= '';
    if (IS_SERVER_SIDE)
        return props => hidden;
    else
        return props => {
            that['routing'] ||= props.route;
            const [child, setJSX] = React.useState(hidden);
            const effection = () => {
                this.then(imported => {
                    const pathRoute = location.pathname;
                    const nowRouted = props.route || that['routing'];
                    const hasRouted = nowRouted && isRouted(pathRoute, nowRouted);
                    const component = imported[member](props);
                    hasRouted ? setJSX(component) : setJSX(hidden);
                });
            };
            React.useEffect(effection, []);
            return child;
        };
};
//# sourceMappingURL=extensions.js.map