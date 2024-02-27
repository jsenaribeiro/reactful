export async function streamJSX(url, tag = 'default') {
    const response = await fetch(`${url}?jsx=true&tag=${tag}`);
    const textHTML = await response.text();
    return textHTML;
}
//# sourceMappingURL=stream.js.map