/// <reference lib="esnext" />
export function isRouted(current, routing) {
    if (!routing || routing == "/")
        return true;
    const text = current.replace(/\/$/, '');
    const last = text.split('/').at(-1) || '';
    const base = text.replace(last, '');
    routing = routing.trim();
    routing = routing.replace(/^\.\//, base);
    routing = routing.replace(/\/:[^//]+$/, '/'); // /url/:params = /url
    routing = routing.replace(/\/:.+?\//, '/'); // /url/:params/sub = /url/sub
    return current.includes(routing);
}
//# sourceMappingURL=route.js.map