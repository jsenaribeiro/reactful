"use server";
import { PREFIX_ERROR } from "@reactful/commons";
import { Path } from "@reactful/commons";
import { File } from '../extra';
const PREFIX_CONFLICT = `${PREFIX_ERROR}Broken routing conflict rule`;
export async function validateRoutes(path) {
    if (!path.includes("."))
        return;
    path = path?.toLowerCase() || '';
    const file = path.split("/").at(-1) || '';
    const name = file.split(".").at(0);
    const base = path.replace(file, "");
    const exts = [".tsx", ".ts", ".js", ".jsx"];
    if (!file || !name || !exts.some(x => path.endsWith(x)))
        return;
    await onlySupportTSXComponents(path);
    await mustBeIndeTsxInteadIndexTs(path);
    await sameFileMdAndTsxAndHTML(name, path);
    await sameFolderIndexAndFileTsx(name, path);
}
async function onlySupportTSXComponents(path) {
    if (path.endsWith(".jsx"))
        throw `Not supports JSX components, only support TSX component`;
}
async function mustBeIndeTsxInteadIndexTs(path) {
    if (path.endsWith("index.ts"))
        throw `Uses index.tsx instead index.ts in /routes`;
}
async function sameFolderIndexAndFileTsx(name, path) {
    const hasFileIndex = await new File(`${Path.routes}/${name}.tsx`).exists();
    const hasFolder = await new File(`${Path.routes}/${name}/index.tsx`).exists();
    const conflict = '/routes/[name].tsx <===> /routes/[name]/index.tsx';
    if (hasFileIndex && hasFolder)
        throw error(conflict, path);
}
async function sameFileMdAndTsxAndHTML(name, path) {
    const sameNameMd = await new File(`${Path.routes}/${name}.md`).exists();
    const sameNameTsx = await new File(`${Path.routes}/${name}.tsx`).exists();
    const sameNameHTML = await new File(`${Path.routes}/${name}.html`).exists();
    const conflict = "/routes/[name].md|tsx|html <===> /routes/[name].md|tsx|html";
    const conflicted = [sameNameMd, sameNameTsx, sameNameHTML].map(x => x).length > 1;
    if (conflicted)
        throw error(conflict, path);
}
const error = (rule, path) => `${PREFIX_CONFLICT}:\n- rule: ${rule}\n- path: ${path}`;
//# sourceMappingURL=validate.js.map