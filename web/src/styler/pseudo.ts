export function applyPseudoSelectorCSS(selector: string, element: HTMLElement, cssRule: CSSStyleRule) {   
   if (hasPseudoSelector('hover')) {
      const defaultStyle = { ...element.style }
      
      element.addEventListener('mouseenter', 
         () => Object.entries(cssRule.style)
            .forEach(([k,v]) => element.style[k] = v))

      element.addEventListener('mouseleave', 
         () => Object.entries(defaultStyle)
            .forEach(([k,v]) => element.style[k] = v))
   }

   function hasPseudoSelector(pseudoSelector: string) {
      const pattern = `${selector}\\s*:\\s*${pseudoSelector}`
      return !!cssRule.selectorText.match(new RegExp(pattern))
   }
}