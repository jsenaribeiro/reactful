import { env } from '../environment';
export const params = (tag, own, uid, now) => ({ tag, own, uid, mem: now, ioc: env.settings.context });
//# sourceMappingURL=render.js.map