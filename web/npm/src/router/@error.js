import { Path } from '@reactful/commons';
export function error(component) {
    return function (meta, call) {
        const path = new Path(meta).path;
        call.metadata ||= {
            fail: component,
            name: call.name,
            path: path,
        };
        return call;
    };
}
//# sourceMappingURL=@error.js.map