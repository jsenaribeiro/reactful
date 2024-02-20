import { cssPlugin } from './css.plugin';
import { jsxPlugin } from './jsx.plugin';
const library = [cssPlugin, jsxPlugin];
const plugins = library.map(p => { Bun.plugin(p); return p; });
export default plugins;
//# sourceMappingURL=index.js.map