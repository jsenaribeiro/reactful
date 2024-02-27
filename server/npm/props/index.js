import { env } from "@reactful/commons";
import { bindProps } from './bindProps';
import { formProps } from './formProps';
import { styleProps } from './styleProps';
import { routeProps } from './routeProps';
const library = [
    bindProps,
    formProps,
    styleProps,
    routeProps
];
export default function proper(props, params) {
    const reducer = (props, apply) => apply(props, params);
    const propers = library.concat(env.settings?.propers ?? []);
    return propers.reduce(reducer, props);
}
//# sourceMappingURL=index.js.map