"use client";
const IS_SERVER_SIDE = !globalThis.document;
export function refocus(timeout) {
    if (IS_SERVER_SIDE)
        return true;
    const getQuery = query => document.querySelector(query);
    const currentUID = document.activeElement?.getAttribute("uid") || "0";
    const queryUID = `[uid='${currentUID}']`;
    const activate = function () {
        const element = getQuery(queryUID);
        if (element)
            element.focus();
    };
    setTimeout(activate, timeout);
    return true;
}
//# sourceMappingURL=refocus.js.map