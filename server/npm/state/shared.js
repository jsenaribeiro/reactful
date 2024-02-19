import { env, PROXY } from '@reactful/commons';
const { binding } = env.settings;
const DELAY_RENDER = 9;
export function createProxyState(store, index) {
    if (store[PROXY])
        return store;
    const refresh = () => typeof index == 'number'
        ? refreshOne(index) : refreshAll();
    return new Proxy(store, {
        get(refer, field) {
            if (field == PROXY)
                return true;
            else
                binding.visit[index || 0] = true;
            return refer[field];
        },
        set(refer, field, value) {
            refer[field] = value;
            if (field == "route")
                return true;
            if (field == "children")
                return true;
            if (typeof value == "function")
                return true;
            binding.timer && clearTimeout(binding.timer);
            binding.timer = setTimeout(refresh, DELAY_RENDER);
            return true;
        }
    });
}
function refreshOne(index) {
    const value = new Date().getTime();
    const react = binding.react[index];
    react(value);
}
export async function refreshAll() {
    for (const react of Object.values(binding.react)) {
        await new Promise(resolve => setTimeout(resolve, 1));
        react(new Date().getTime());
    }
}
//# sourceMappingURL=shared.js.map