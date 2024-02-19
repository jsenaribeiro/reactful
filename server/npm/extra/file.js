"use server";
import { Path, throws } from '@reactful/commons';
import '@reactful/prototypes';
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
            console.log(`Reactive file.ts contructor (${path})`);
            throw ex;
        }
    }
    exists() { return this.blob.exists ? this.blob.exists() : Promise.resolve(false); }
    async save(text) { return await Bun.write(this.path, text); }
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