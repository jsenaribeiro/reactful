const ioc = {
    await: false,
    logon: '',
    fails: [],
    param: {},
    store: {}
};
export const params = {
    own: 'Sample',
    tag: 'input',
    mem: {},
    uid: 0,
    ioc
};
export const scenarioOf = (props, tag, type = '', keys = ['value', 'onChange']) => [{ ...props, type }, { ...params, tag }, 'world', keys];
//# sourceMappingURL=shared.js.map