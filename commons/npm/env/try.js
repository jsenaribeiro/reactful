const fail = (key, pre = '') => `Not found ${pre}'${key.trim()}' of .env file`;
export function validation(instance) {
    Object.entries(instance)
        .map(validateOf)
        .filter(x => Array.isArray(x))
        .forEach(x => x && (instance[x[0]] = x[1]));
}
function validateOf([field, value]) {
    if (globalThis.document)
        return;
    const dataOf = eval('process.env') || eval('Bun.env');
    const keysOf = Object.keys(dataOf);
    if (!dataOf)
        return;
    if (field == "FLAGS")
        return;
    if (typeof value == "function")
        return;
    if (!dataOf[field])
        throw fail(field, 'value in field ');
    if (!keysOf.includes(field))
        throw fail(field, 'field ');
    return [field, JSON.parse(`${dataOf[field]}`.toLowerCase())];
}
//# sourceMappingURL=try.js.map