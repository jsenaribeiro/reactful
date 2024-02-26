import { GLOBAL_KEY } from "../constants";
export function set(...args) {
    var type, data, name, path, call;
    const settings = globalThis[GLOBAL_KEY];
    if (args.length <= 2)
        return;
    if (args.length == 3)
        [type, path, data] = args;
    if (args.length == 4)
        [type, path, name, data] = args;
    if (args.length == 5)
        [type, path, name, data, call] = args;
    if (type == "meta") {
        data = { ...this.get("meta", path, name), ...data };
        Object.keys(data).forEach(k => data[k] = data[k].replaceAll("'", '"'));
    }
    for (let i = 0; i < settings.caching.length; i++) {
        const item = settings.caching[i];
        if (!item)
            continue;
        if (item.type != type)
            continue;
        if (item.path != path)
            continue;
        if (item.name != name)
            continue;
        delete settings.caching[i];
    }
    settings.caching.push({ call, data, path, name, type });
}
//# sourceMappingURL=set.js.map