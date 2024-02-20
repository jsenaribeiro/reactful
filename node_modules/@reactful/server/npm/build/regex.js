import { env } from '@reactful/commons';
const settings = env.settings;
const element = (settings.queryId || '#root');
const valueId = element.replace("#", "");
const queryId = `id=['"]${valueId}['"]`;
const initial = element.startsWith("#")
    ? `<\\w.+?${queryId}.*?>.*?<\\/\\w.+?>`
    : `<${element}.*?>.*?<\\/${element}\\s*?>`;
const middled = element.startsWith("#")
    ? initial + `|<\\w.+?${queryId}\\s*?\\/>`
    : initial + `|<${element}\\s*?\\/>`;
const pattern = element.startsWith("#")
    ? middled + `|<\\w.+?${queryId}\\s+?.*?\\/>`
    : middled + `|<${element}\\s+?.*?\\/>`;
export const ROOT_REGEX = new RegExp(pattern, "gmi");
export const TITLE_REGEX = /(<title>).+?(<\/title>)/;
export const METAS_REGEX = name => `(<meta\\s+name=['"]${name}['"]\\s+content=['"]).+(['"]\\s*\\\\*>)`;
//# sourceMappingURL=regex.js.map