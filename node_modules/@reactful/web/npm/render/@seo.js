import { env } from '@reactful/commons';
const charsets = ["UTF-8", "UTF-16"];
export function seo(title, metadata) {
    const isString = typeof metadata === "string";
    const isCharSet = isString && charsets.includes(metadata);
    if (isString)
        return seo(title, { description: metadata });
    if (isCharSet)
        return seo(title, { charset: metadata });
    return function (meta, call) {
        const name = call.name;
        const info = { ...metadata, title };
        const path = new URL(meta.url).pathname;
        env.set("meta", path, name || "default", info);
        return call;
    };
}
//# sourceMappingURL=@seo.js.map