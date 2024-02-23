"use server";
import { env } from '@reactful/commons';
import { File } from './file';
import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
const context = { lib: '', cwd: '', tst: '' };
const IS_CLIENT_SIDE = !!globalThis.document;
export class Path {
    path;
    static e2e = false;
    static paths;
    static node_modules = '';
    constructor(args) {
        this.path ||= '/';
        this.path = args['url'] || args;
        this.path = this.path.toString().replace("file://", "");
    }
    static get npm() {
        if (Path.node_modules)
            return Path.node_modules;
        return Path.node_modules = Path.getNodeModuleFolder();
    }
    static getNodeModuleFolder(last = '') {
        last ||= `${Path.cwd}`;
        const next = new Path(last).base.path;
        const node = '/node_modules';
        const path = `${last}${node}`;
        if (!last || last == '/')
            throw 'failed to get node_modules path';
        return existsSync(path) ? path
            : Path.getNodeModuleFolder(next);
    }
    static from = (directory) => new Path(Path[directory]);
    static startup() {
        if (context.cwd)
            return true;
        Path.paths = env.settings.folders;
        const src = IS_CLIENT_SIDE ? '/' : eval('Bun.main');
        context.cwd = new Path(src).base.path;
        return true;
    }
    static get cwd() {
        this.startup();
        return context.cwd;
    }
    get base() {
        const path = this.path + '';
        const base = path.replace('/' + this.last, '');
        return new Path(base);
    }
    get name() { return this.last.split(".")[0]; }
    get Name() { return this.name[0].toUpperCase() + this.name.slice(1); }
    get last() { return this.path.split(/\/|\\\\|\\/)?.at(-1) || ''; }
    get href() {
        const isURL = this.path.match(/^(http|https):/);
        const removeHTTP = isURL ? new URL(this.path).pathname : this.path;
        const removeFile = removeHTTP.replace(/\.[^\/]+$/, '/').trim();
        const dropsIndex = removeFile.match(/\/index$/) ? removeFile.remove('/index') : removeFile;
        const noRouteDir = dropsIndex.remove(Path.routes).remove(env.settings.folders.routes);
        const noEndSlash = noRouteDir.replace(/(.+)\/$/, '$1');
        return (noEndSlash.trim() || '/');
    }
    goto = (name, retry = 13) => !name || retry < 0 ? '/'
        : this.last == name ? this.path
            : this.base.goto(name, retry - 1);
    static get apis() { return `${this.cwd}${this.paths.apis}`; }
    static get assets() { return `${this.cwd}${this.paths.assets}`; }
    static get builds() { return `${this.cwd}${this.paths.builds}`; }
    static get routes() { return `${this.cwd}${this.paths.routes}`; }
    static get shares() { return `${this.cwd}${this.paths.shares}`; }
    static get components() { return `${this.cwd}${this.paths.components}`; }
    static get directives() { return `${this.cwd}${this.paths.directives}`; }
    async browser() {
        if (IS_CLIENT_SIDE)
            throw "NOT SUPPORTED";
        const dirents = await readdir(this.path, { withFileTypes: true });
        const mapper = async (d) => {
            const path = `${this.path}/${d.name}`;
            const file = d.isDirectory() ? undefined
                : await new File(path).exists()
                    ? new File(path)
                    : undefined;
            return { name: d.name, path, file, base: this.path };
        };
        return await Promise.all(dirents.map(mapper));
    }
    resolve(path) {
        if (path.startsWith("../"))
            return new Path(this.path).base.base
                .resolve(path.replace("../", ""));
        if (path.startsWith("./"))
            return new Path(this.path).base
                .resolve(path.replace("./", ""));
        const base = this.path.replace(/\/$/, '');
        const rest = path.replace(/^\./, '');
        return `${base}/${rest}`;
    }
}
//# sourceMappingURL=path.js.map