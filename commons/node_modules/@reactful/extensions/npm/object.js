/* WARNING: new Object prototype extesions generate Bun bugs */
Object.fromProxy = function (that) {
    const plain = {};
    for (const key in that) {
        if (Array.isArray(that[key]))
            plain[key] = that[key].map(x => Object.fromProxy(x));
        else if (typeof that[key] == 'object')
            plain[key] = Object.fromProxy(that[key]);
        else if (that.hasOwnProperty(key))
            plain[key] = that[key];
    }
    return plain;
};
Object.parse = function (that) { return new ParseObject(that); };
Object.merge = function (self, that) {
    Object.keys(self).forEach(function (name) {
        if (that[name] === undefined)
            return;
        else
            self[name] = that[name];
    });
};
const valueOf = Object.prototype.valueOf.bind({});
Object.prototype.valueOf = function (...args) {
    const [path, data, none] = args;
    const passing = args.length == 0 || typeof path !== "string";
    const reading = args.length == 1;
    if (passing)
        return valueOf.bind(this)();
    if (reading) {
        const arr = path.split('.');
        const get = arr.reduce((x, k) => x[k], this);
        return none ? get : (get?.toString() || '');
    }
    const split = path.split(".");
    const field = split.at(-1) || '';
    const ended = split.length === 1;
    const value = data?.target?.value ?? data;
    const under = path.replace(field, '');
    if (ended)
        this[path] = value;
    if (under)
        this.valueOf(under)[field] = value;
};
class ParseObject {
    entries;
    constructor(that) { this.entries = Object.entries(that); }
    map(fn) {
        return this.entries.map(fn);
    }
    filter(fn) {
        return this.entries.filter(fn);
    }
    toObject() { return Object.fromEntries(this.entries); }
    toArray = () => this.entries;
}
export {};
//# sourceMappingURL=object.js.map