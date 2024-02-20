"use client";
import { env, JSXON } from "@reactful/commons";
const settings = env.settings;
export function styler(node, path) {
    if (!node || !path || typeof node.type != 'string')
        return node;
    const child = createElementFromJSX(node);
    const style = { ...node.props.style };
    for (const rule of getCssRules(path).map(x => x)) {
        if (rule instanceof CSSStyleRule == false)
            continue;
        if (!child.matches(rule.selectorText))
            continue;
        for (let index = 0; index < rule.style.length; index++) {
            const field = rule.style.item(index);
            const value = rule.style.getPropertyValue(field);
            const label = fromKebabCaseToCamelCase(field);
            if (style[label] || !value)
                continue;
            else
                style[label] = value.toString();
        }
    }
    return style;
}
function createElementFromJSX(node) {
    const htmlString = JSXON.htmlfy(node);
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
function fromKebabCaseToCamelCase(field) {
    for (const match of field.matchAll(/-\w/gm)) {
        const [oldName] = match;
        if (!oldName)
            continue;
        const newName = oldName.replace("-", "").toUpperCase();
        field = field.replace(oldName, newName);
    }
    return field;
}
function getCssRules(src) {
    const stylers = settings.stylers || settings.stylers;
    const styleSheets = (stylers[src] || [])
        .map(parseStyleSheetText)
        .flatMap(x => [...x.cssRules]);
    return styleSheets;
}
function parseStyleSheetText(text) {
    const css = new CSSStyleSheet();
    css.replaceSync(text);
    return css;
}
//# sourceMappingURL=styler.js.map