import { getModuleFunctions } from '../shared';
import { parenthelessDecorators } from './fixings';
import regexes, { IS_ANONYMOUS } from './regex';
export default function (args) {
    const presentCode = args.code + '';
    const decorators = extractDecorators(args);
    const functions = getModuleFunctions(args);
    if (!functions.length || !decorators.length)
        return presentCode;
    // TODO: evaluate...
    // const decoratorsWithoutModuleFunction = decorators
    //    .filter(d => functions.every(f => f.name != d.call))
    // if (decoratorsWithoutModuleFunction.length)
    //    throw 'Invalid nesting functions decorators: '
    //       + decoratorsWithoutModuleFunction.map(x => 
    //          `function ${x.name} in ${args.path}`).join('\n')
    for (const fn of functions) {
        if (decorators.every(d => d.call != fn.name))
            continue;
        const part = `(import.meta, `;
        const none = !!fn.full.match(/export\s+default\s+/);
        const vars = decorators.filter(x => x.call == fn.name);
        const meta = vars.map(x => x.name);
        const head = meta.join(part).trim() + part;
        const foot = fn.expr + (`)`.repeat(vars.length)).trim();
        const term = fn.type == 'block' ? 'const' : '';
        const name = none ? '' : `${term} ${fn.name} = `;
        const done = `${fn.mods} ${name} ${head} ${foot}`;
        args.code = args.code.replace(fn.full, `${done} `);
    }
    return args.code
        .replaceAll(') (', ')(')
        .replace(/ {2,}/g, ' ')
        .replace(/(\w) \(/g, '$1(')
        .replaceAll('async(', 'async (');
}
export function extractDecorators(args) {
    let regex = undefined, results = [];
    const parentheless = parenthelessDecorators(args);
    while ((regex = regexes.find(regex => args.code.match(regex)))) {
        const discovereds = args.code.query(regex);
        const [full, expr] = discovereds;
        const name = expr.replace('@', '');
        const last = discovereds.at(-1) || '';
        const none = full.match(IS_ANONYMOUS) || last.match(/export\s+default/);
        const call = none ? 'default' : last;
        args.code = args.code.replace(expr, '');
        results.push({ name, call, expr });
    }
    for (const found of results) { // restoring parentheless
        const decorated = found.name.split("(")[0];
        const parenthed = parentheless.some(name => name.includes(decorated));
        found.name = found.name.replace(parenthed ? '()' : '§§§', '');
    }
    args.code = args.code.trim();
    return results;
}
//# sourceMappingURL=plugin.js.map