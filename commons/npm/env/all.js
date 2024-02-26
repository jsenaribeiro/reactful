import { GLOBAL_KEY } from "../constants";
export function allSettings() { return globalThis[GLOBAL_KEY]; }
export function allCachings() { return allSettings().caching.distinct(); }
//# sourceMappingURL=all.js.map