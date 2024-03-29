"use server";
import { env, throws } from '@reactful/commons';
import { File, Path, logger } from '../extra';
import { createCliteSideScripts } from './scripts';
import { saveEntryScriptForBundle } from './scripts';
import { cleanupFolders, folder, preValidation } from './filer';
import plugins from '../plugs';
import save from './maker';
import Zlib from 'zlib';
import "@reactful/extensions";
const intervals = [];
const { renders } = env.settings;
const NOT_FOUND_INDEX_HTML = `not fould index.html in /routes`;
export default async function (only) {
    logger.insert(`\nBUILDING...`, "FG_YELLOW");
    await cleanupFolders();
    const done = [];
    const list = await folder(only);
    const path = `${Path.cwd}/index.html`;
    const html = await new File(path)
        .load(NOT_FOUND_INDEX_HTML);
    await preValidation();
    for (const [path, item] of list) {
        if (!item || !path)
            continue;
        const args = { html, item, path };
        const type = typeof item == "function" ? "JSX"
            : path.endsWith(".md") ? "MD"
                : "HTML";
        await save(args, type, done);
    }
    await createBundle(html, save);
    return true;
}
async function createBundle(html, save) {
    logger.insert(`\nBUNDLING...`, "FG_YELLOW");
    env.FLAGS.log = true;
    env.FLAGS.build = true;
    await createCliteSideScripts();
    await saveEntryScriptForBundle();
    const built = await Bun.build({
        entrypoints: [`${Path.builds}/bundle.ts`],
        external: ['jsdom', 'bun', 'os'],
        minify: env.MINIFY,
        target: "browser",
        plugins,
    });
    if (!built.success)
        throw errors(built.logs);
    const code = await built.outputs[0].text();
    const file = env.MINIFY ? await Zlib.deflateSync(code) : code;
    const path = `${Path.builds}/bundle.${env.MINIFY ? 'zip' : 'js'}`;
    await Bun.write(path, file);
    env.FLAGS.build = false;
    await bundleValidation();
    await periodicRebuilds(html, save);
}
async function periodicRebuilds(html, save) {
    intervals.forEach(t => clearInterval(t));
    const renderOf = jsx => ({ item: jsx.call, html, path: '' });
    const periodics = renders.filter(r => r.mode == "periodic");
    const build = async (render) => await save(renderOf(render), "JSX");
    for (const periodic of periodics) {
        const time = periodic.time;
        const call = () => build(periodic);
        const bind = setInterval(call, time);
        intervals.push(bind);
    }
}
async function bundleValidation() {
    const ext = env.MINIFY ? 'zip' : 'js';
    const fail = `\n\nServer-side content inside bundle.${ext}`;
    const file = new File(`${Path.cwd}/builds/bundle.${ext}`);
    const size = file.size.toString().split(".")[0].toNumber().format(true);
    const text = await file.load().then(x => x || '');
    const line = text.split('\n').length.format(true);
    logger.itemfy(`bundle.${ext}`);
    logger.append(`${size} kb`, "FG_GRAY");
    logger.append(` | `);
    logger.append(`${line} lines`, "FG_GRAY");
    logger.append('\n');
    if (text.includes("Bun.plugin"))
        throws(fail, import.meta);
    if (text.match(/['"]use server[;]*['"]/))
        console.error(fail);
}
function errors(logs) {
    const list = ['\n\n !!!!!!! ==== reactful build errors ==== !!!!!!!'];
    for (const log of logs) {
        const line = log.position?.line;
        const cols = log.position?.column;
        const file = log.position?.file;
        const text = log.message;
        list.push(`- ${text} in ${file} (${line},${cols})`);
    }
    return list.join('\n');
}
//# sourceMappingURL=build.js.map