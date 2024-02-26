import { allCachings } from "./all";
export function get(type, path, name) {
    const allByType = allCachings().filter(x => x.type == type);
    const allByName = name => allByType.find(x => x.name == name);
    const allByPath = path => allByType.filter(x => x.path == path);
    const allByPathName = (path, name) => allByPath(path).find(x => x.name == name);
    if (!path && !name)
        return allByType.filter(x => x.type == type);
    else if (!name)
        return allByName(path)?.data
            || allByName(path + '/index')?.data;
    else
        return allByPathName(path, name)?.data
            || allByPathName(path + '/index', name)?.data;
}
//# sourceMappingURL=get.js.map