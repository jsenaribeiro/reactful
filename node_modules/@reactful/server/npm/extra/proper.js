import { env } from "@reactful/commons";
import bindKeys, { bindProps } from '../props/bindProps';
import formKeys, { formProps } from '../props/formProps';
import styleKeys, { styleProps } from '../props/styleProps';
import routeKeys, { routeProps } from '../props/routeProps';
const nativeProps = bindKeys.concat(styleKeys).concat(formKeys).concat(routeKeys);
const customProps = env.settings?.propers.map(x => x.name);
const directiveProps = nativeProps.concat(customProps);
export function proper(props, params) {
    const library = [bindProps, formProps, routeProps, styleProps];
    const reducer = (props, apply) => apply(props, params);
    const propers = library.concat(env.settings?.propers ?? []);
    return propers.reduce(reducer, props);
}
//# sourceMappingURL=proper.js.map