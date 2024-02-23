import { env, GUID } from '@reactful/commons';
import '@reactful/extensions';
export function state(value) {
    return function (module, caller) {
        const index = value[GUID];
        const store = env.settings.binding.store;
        store.react[index] ||= [];
        store.react[index].push(caller);
        return caller;
    };
}
//# sourceMappingURL=@state.js.map