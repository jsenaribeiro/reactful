export const PREFIX_ERROR = '@reactful error: ';
export function throws(ex, mt) {
    if (!ex)
        return false;
    const url = mt ? mt.url : '';
    const uri = url ? `${url.split('/src').at(1)} ` : ' ';
    console.error('\n' + PREFIX_ERROR + uri);
    console.warn(ex?.message || ex?.toString());
    throw ex;
}
//# sourceMappingURL=throw.js.map