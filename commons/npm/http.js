/// <reference lib='dom' />
/// <reference lib='esnext' />
import '@reactful/extensions';
export const response = (code, body = {}, type, head) => new Response(body, { status: code, headers: new Headers({ ...head,
        "content-type": type || 'text/plain', "charset": "utf-8" }) });
export function queryStringify(that) {
    return new URLSearchParams(that).toString();
}
export function queriefy(request) {
    const regex = new RegExp('(http|https)+:\/\/' + request.headers.get('host'));
    const [host] = request.url.query(regex);
    const [route, after] = request.url.replace(host, '').split('?');
    const query = queryObjectify(after);
    return { route, query };
}
export function queryObjectify(queries) {
    const params = {};
    if (!queries)
        return params;
    else
        new URLSearchParams(queries)
            .forEach((val, key) => params[key] = val);
    return params;
}
//# sourceMappingURL=http.js.map