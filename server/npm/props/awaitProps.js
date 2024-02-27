import '@reactful/extensions';
import { env } from "@reactful/commons";
const LACK_OF_METADATA = '[await] props requires an exported component';
const INVALID_AWAIT_PROPS = '[await] props must be functional component';
const NO_ASYNC_AWAIT_PROPS = '[await] props must be a Promise';
function warn(message) { console.warn(message); return true; }
// transform [await] in componentPath to send to client-side for stream JSX
export const awaitProps = function (props, params) {
    const asyncComponent = props.await;
    const componentPath = asyncComponent?.metadata?.path;
    const isNotFunction = typeof asyncComponent != "function";
    if (env.is("CLIENT") || !asyncComponent)
        return props;
    if (isNotFunction)
        return warn(INVALID_AWAIT_PROPS) && props;
    if (!componentPath)
        return warn(LACK_OF_METADATA) && props;
    if (!asyncComponent.isAsync())
        return warn(NO_ASYNC_AWAIT_PROPS) && props;
    const clientSideAwaitProps = JSON.stringify({
        name: (props.await.name || 'default').replace(/\$$/, ''),
        path: componentPath
    });
    return (props.await = clientSideAwaitProps) && props;
    return props;
};
//# sourceMappingURL=awaitProps.js.map