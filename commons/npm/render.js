import { env } from './env';
export const params = (tag, own, uid, now) => ({ tag, own, uid, mem: now, ioc: env.settings.context });
//# sourceMappingURL=render.js.map