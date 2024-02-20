export function applyPseudoSelectorCSS(selector, element, cssRule) {
    if (hasPseudoSelector('hover')) {
        const defaultStyle = { ...element.style };
        element.addEventListener('mouseenter', () => Object.entries(cssRule.style)
            .forEach(([k, v]) => element.style[k] = v));
        element.addEventListener('mouseleave', () => Object.entries(defaultStyle)
            .forEach(([k, v]) => element.style[k] = v));
    }
    function hasPseudoSelector(pseudoSelector) {
        const pattern = `${selector}\\s*:\\s*${pseudoSelector}`;
        return !!cssRule.selectorText.match(new RegExp(pattern));
    }
}
//# sourceMappingURL=pseudo.js.map