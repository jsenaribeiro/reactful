import { env, Path } from '@reactful/commons';
const charsets = ["UTF-8", "UTF-16"];
export function seo(title, metadata) {
    const isString = typeof metadata === "string";
    const isCharSet = isString && charsets.includes(metadata);
    if (isString)
        return seo(title, { description: metadata });
    if (isCharSet)
        return seo(title, { charset: metadata });
    return function (meta, call) {
        const key = call.name;
        const seo = { ...metadata, title };
        const url = new Path(meta.url).href;
        env.set("meta", url, key || "default", seo);
        return call;
    };
}
//# sourceMappingURL=@seo.js.map