"use client";
import { onSubmitBinding, fixProps } from "./formBind";
const IS_SERVER_SIDE = !global.document;
export default ['data', 'bearer', 'validade', 'onFetch', 'onSubmit', 'onValidate'];
/** reactful forms as form[data] and children[bind]
 * with server actions and validation api */
export function formProps(props, params) {
    if (IS_SERVER_SIDE)
        return props;
    if (params.tag !== "form")
        return props;
    if (!Object.keys(props).includes("data"))
        return props;
    const onSubmit = onSubmitBinding(props, params);
    return { ...fixProps(props), onSubmit };
}
//# sourceMappingURL=formProps.js.map