"use server";
import * as fs from 'fs';
import { File, Path } from '../extra';
import { throws } from '@reactful/commons';
import { validateRoutes } from './validate';
import "@reactful/extensions";
globalThis.REFACT = true;
const NO_DEFAULT_EXPORT = `\nno default export in ???.`
    + ` Routed components need to be exported as default!`;
export async function cleanupFolders() {
    for (const entry of await Path.from("builds").browser()) {
        if (!entry.name || !entry.file)
            continue;
        else
            fs.unlinkSync(entry.path);
    }
}
export async function preValidation(path) {
    const directory = new Path(path || Path.routes);
    for (const entry of await directory.browser()) {
        const reloop = preValidation;
        const isFile = !!entry.file;
        if (isFile)
            continue;
        await validateRoutes(entry.path);
        await reloop(entry.path);
    }
}
const getIsAlready = (value, entry) => typeof value == "object"
    ? value['src'] == entry.path
    : false;
export async function folder(one, dir, has = []) {
    const entries = await new Path(dir || Path.routes).browser();
    for await (const entry of entries) {
        const isJSX = entry.path.match(/\.[tj]sx$|\.html|\.md/);
        const isIndex = entry.name.includes('index.');
        const isAlready = has.some(x => getIsAlready(x, entry));
        const isDirectory = !entry.file;
        if (isDirectory)
            await folder(one, entry.path, has);
        else if ((one && !isIndex) || !isJSX || isAlready)
            continue;
        else
            has.push(await file(entry));
    }
    return has.distinct();
}
export async function file({ path, name }) {
    const fail = 'not found file in browse.file';
    const file = new File(path);
    if (!(await file.exists()))
        return throws(fail);
    else if (path.match(/\.html$|\.md$/))
        return [path, await file.load()];
    const module = await import(path);
    if (!module?.default) {
        const isIndex = name.toLowerCase().includes("index.");
        const error = NO_DEFAULT_EXPORT.replace("???", path);
        if (isIndex)
            throws(error);
    }
    return [path, module.default];
}
//# sourceMappingURL=filer.js.map