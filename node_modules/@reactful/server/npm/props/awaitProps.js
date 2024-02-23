import '@reactful/extensions';
import { env } from "@reactful/commons";
const INVALID_AWAIT_PROPS = '[await] props must be functional component Promise';
const IS_CLIENT_SIDE = !!globalThis.document;
export const awaitProps = function (props, params) {
    if (!props.await || IS_CLIENT_SIDE)
        return props;
    if (typeof props.await != "function" || !props.await.isAsync) {
        console.warn(INVALID_AWAIT_PROPS);
        return props;
    }
    env.set("wait", "*", params.uid.toString(), JSON.scriptify(props.await));
    props.await = undefined;
    return props;
};
//# sourceMappingURL=awaitProps.js.map