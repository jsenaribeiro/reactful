import '@reactful/extensions';
import { env } from "@reactful/commons";
const INVALID_AWAIT_PROPS = '[await] props must be functional component Promise';
export const awaitProps = function (props, params) {
    if (!props.await || env.is("SERVER"))
        return props;
    if (typeof props.await != "function" || !props.await.isAsync()) {
        console.warn(INVALID_AWAIT_PROPS);
        return props;
    }
    props.await(props, params.ioc).then(function (jsx) {
        props.children = jsx;
        env.settings.binding.fresh();
    });
    props.await = undefined;
    return props;
};
//# sourceMappingURL=awaitProps.js.map