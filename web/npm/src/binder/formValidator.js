import { env } from '@reactful/commons';
const { context, binding: storage } = env.settings;
export async function onSubmitValidate(props, e) {
    context.fails = [];
    const founds = document.querySelectorAll(":invalid");
    Array.from(founds)
        .filter(x => !!x.setCustomValidity)
        .forEach(x => x.setCustomValidity(''));
    const childs = Array.from(e.target.elements);
    const inputs = elementValidationOf(props, childs);
    const errors = await extractErrors(props, inputs);
    if (errors.length) {
        e.target.reportValidity();
        return [false, []];
    }
    return [true, inputs];
}
export async function extractErrors(props, inputs) {
    const errors = inputs
        .filter(x => !!x.validationMessage)
        .map(x => ({
        error: x.validationMessage,
        value: x.value,
        field: x.name
    }));
    const validate = props.onValidate || (x => x);
    return (await validate(errors)) || [];
}
export function elementValidationOf(props, inputs) {
    if (!props.children?.forEach)
        return inputs;
    const getPropsOf = (props, bindProps = []) => {
        if (props?.bind && props?.validate)
            bindProps.push(props);
        if (Array.isArray(props?.children))
            props.children
                .forEach(c => getPropsOf(c.props, bindProps));
        return bindProps;
    };
    const getInputOf = (bind) => inputs
        .find(x => x.getAttribute('bind') == bind);
    const getErrorOf = (error, input) => error && input && input.setCustomValidity(error) || ({ error, input });
    const errors = getPropsOf(props)
        .map(props => ({ bind: props.bind, test: props.validate }))
        .map(({ bind, test }) => ({ test, data: getInputOf(bind) }))
        .map(({ test, data }) => [test(data?.value), data])
        .map(([fail, data]) => getErrorOf(fail, data));
    // errors && console.warn('input errors', errors)
    errors.forEach(({ input }) => input.onchange = () => input.setCustomValidity(''));
    return inputs;
}
//# sourceMappingURL=formValidator.js.map