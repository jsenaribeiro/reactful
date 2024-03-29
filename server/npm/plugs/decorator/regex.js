import '@reactful/extensions';
const _ = `[\\s]`;
const __ = `[\\s\\t]`;
const ___ = `[\\s\\t\\n]`;
const NAME = `[\\w_][\\w\\d\\$_]*`;
const IN_ARGS = `[^\n@=]*?`;
const DECORATOR = `@${NAME}\\(${IN_ARGS}\\)`;
const BLOCK_ARG = `${__}*\\(${IN_ARGS}\\)`;
const ARROW_ARG = `${__}*${IN_ARGS}${__}*=>`;
const MODIFIERS = Array
    .range(5) // create until 5 successive modifiers
    .reverse() // starts with more modifiers
    .map(n => Array.range(n) // iterate each item modifier list
    .map(() => `${NAME}`) // list repeated modifier
    .join('\\s+')) // separated by space
    .distinct() // remove empties
    .join('|'); // add OR conditional
const DECORATORS = [
    `(${DECORATOR})${___}+function${__}+(${NAME})${__}*${BLOCK_ARG}`,
    `(${DECORATOR})${___}+(${MODIFIERS})+${__}+function${__}*(${NAME})${__}*${BLOCK_ARG}`,
    `(${DECORATOR})${___}+(${MODIFIERS})+${__}+function${__}*${BLOCK_ARG}`,
    `(${DECORATOR})${___}+(${MODIFIERS})+${__}+(const|var|let)${__}+(${NAME})${__}*=${ARROW_ARG}`,
    `(${DECORATOR})${___}+(const|var|let)${__}+(${NAME})${__}*=${ARROW_ARG}`,
    `(${DECORATOR})${___}+(${MODIFIERS})+${__}+${ARROW_ARG}`,
];
export const NO_FUNCTION_MODIFIERS = new RegExp(`${DECORATOR}${___}+function`);
export const NO_LAMBDA_MODIFIERS = new RegExp(`${DECORATOR}${___}+(const|var|let)`);
export const IS_ANONYMOUS = new RegExp(`function${__}*\\(|export\\s+default[^=]>`);
export default DECORATORS.map(x => new RegExp(x));
//# sourceMappingURL=regex.js.map