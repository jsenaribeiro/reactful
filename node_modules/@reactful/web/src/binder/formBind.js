import { onSubmitValidate } from "./formValidator";
import { env } from '@reactful/commons';
import { action } from "./formAction";
const { binding } = env.settings;
export function fixProps(props) {
    const p = { ...props };
    delete p['onAwait'];
    delete p['onValidate'];
    return p;
}
export function onSubmitBinding(props, params) {
    return async function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.submitter.onclick = "return false";
        const [ok, inputs] = await onSubmitValidate(props, e);
        if (ok)
            onBinding({ props, params, inputs });
    };
}
export function onBinding(args) {
    const { props, params, inputs, submit } = args;
    props.data ||= {};
    for (const input of inputs) {
        const [obj, val] = [props.data, input.value];
        const key = input.getAttribute('bind');
        if (!key)
            continue;
        obj.valueOf(key, val);
    }
    inputs.map(x => x.getAttribute('bind'))
        .filter((x) => !!x)
        .forEach(x => props.data.valueOf(x));
    if (props['action'])
        action(args);
    if (submit)
        submit(props.data, params.ioc);
    binding.fresh();
}
//# sourceMappingURL=formBind.js.map