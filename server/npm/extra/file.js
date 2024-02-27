"use server";
import { throws } from '@reactful/commons';
import { Path } from './path';
import '@reactful/extensions';
export class File /*implements IFile*/ {
    blob;
    mime;
    path;
    size; // kbytes
    name;
    get href() {
        return this.path.replace(Path.routes, '');
    }
    constructor(path) {
        try {
            this.path = path;
            this.blob = path ? Bun.file(path) : {};
            this.mime = path ? this.blob.type : '';
            this.size = path ? this.blob.size / 1000 : 0;
            this.name = path ? path.split('/').at(-1) || '' : '';
        }
        catch (ex) {
            console.log(`reactful file.ts contructor (${path})`);
            throw ex;
        }
    }
    exists() { return this.blob.exists ? this.blob.exists() : Promise.resolve(false); }
    async save(text) {
        const result = await Bun.write(this.path, text);
        await new Promise(resolve => setTimeout(resolve, 9));
        return result;
    }
    async load(error, decode) {
        if (!this.path)
            return '';
        const content = await this.blob.exists()
            ? await this.blob.text()
            : throws(error || '');
        return decode ? decodeURI(content) : content;
    }
}
//# sourceMappingURL=file.js.map