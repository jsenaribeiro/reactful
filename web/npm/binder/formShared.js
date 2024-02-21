export function defaultError(code) {
    return code <= 400 ? "Invalid request"
        : code == 404 ? "URL not found"
            : code >= 400 && code < 500 ? "Error"
                : "Internal serve error...";
}
const isProblemDetailObject = (data) => data.type && data.title && data.status && data.detail;
export async function getErrors(response) {
    const text = await response.text();
    const json = parseOrElseJSON(text);
    return extractErrors(response, json, text);
}
function extractErrors(response, json, text) {
    if (json && Array.isArray(json))
        return json.flatMap(x => extractErrors(response, json, text));
    if (json && isProblemDetailObject(json))
        return json.invalidFields?.length ? json.invalidFields
            .map(x => ({ field: x.fieldName, error: x.message, value: '' }))
            : [{ field: '', error: json.title, value: '' }];
    const fail = json?.message?.trim() || text?.trim()
        || response.statusText || defaultError(response.status);
    return [{ error: fail, field: '', value: '' }];
}
function parseOrElseJSON(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return undefined;
    }
}
//# sourceMappingURL=formShared.js.map