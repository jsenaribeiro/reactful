export function error(component) {
    return function (meta, call) {
        const path = meta.url.replace('file://', '');
        call.metadata ||= {
            fail: component,
            name: call.name,
            path: path,
        };
        return call;
    };
}
//# sourceMappingURL=@error.js.map