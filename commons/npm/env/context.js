import { GLOBAL_KEY } from '../constants';
import { allSettings } from './all';
import '@reactful/extensions';
import '../mocks';
const IS_SERVER_SIDE = !globalThis.document;
const binding = {
    index: 0,
    count: 0,
    state: {},
    react: {},
    visit: [],
    ready: false,
    fresh: () => { },
    timer: undefined,
    store: { state: {}, count: 0, react: {} },
};
const context = {
    ref: undefined,
    fails: [],
    store: {},
    param: {},
    await: false,
    get logon() {
        if (IS_SERVER_SIDE)
            return '';
        const json = sessionStorage.getItem('logon');
        return json && JSON.stringify(json);
    }
};
const folders = {
    apis: '/apis',
    assets: '/assets',
    builds: '/builds',
    routes: '/routes',
    shares: '/shares',
    directives: '/directives',
    components: '/components'
};
const failure = (status, errors) => console.error(`status error ${status}`, '\n - ' + errors.join('; \n - '));
export function contextualizer() {
    if (globalThis[GLOBAL_KEY])
        return;
    const settings = {
        context,
        folders,
        binding,
        failure,
        faileds: [],
        caching: [],
        renders: [],
        propers: [],
        clients: {},
        stylers: {},
        current: '/',
        queryId: "#root",
        set storage(value) {
            allSettings().context.store = value;
        }
    };
    globalThis[GLOBAL_KEY] ||= settings;
}
//# sourceMappingURL=context.js.map