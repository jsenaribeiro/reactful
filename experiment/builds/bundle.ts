
import { GLOBAL_KEY } from '@reactful/commons';
await import('/mnt/b/Repositorios/reactful/node_modules/@reactful/server/npm/guest/client').then(x => x.default());
globalThis[GLOBAL_KEY].clients ||= {}

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiment/routes/counter.tsx'] = { off:false, tag:'CountButton' }
import('/mnt/b/Repositorios/reactful/experiment/routes/counter.tsx').then(x => x.CountButton).then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiment/routes/counter.tsx'] = x);

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiment/routes/forms/form.tsx'] = { off:false, tag:'default' }
import('/mnt/b/Repositorios/reactful/experiment/routes/forms/form.tsx').then(x => x.default).then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiment/routes/forms/form.tsx'] = x);

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiment/routes/hello.tsx'] = { off:false, tag:'Hello' }
import('/mnt/b/Repositorios/reactful/experiment/routes/hello.tsx').then(x => x.default).then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiment/routes/hello.tsx'] = x);

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiment/routes/login.tsx'] = { off:false, tag:'default' }
import('/mnt/b/Repositorios/reactful/experiment/routes/login.tsx').then(x => x.default).then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiment/routes/login.tsx'] = x);

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiment/routes/profile/detail.tsx'] = { off:false, tag:'Detail' }
import('/mnt/b/Repositorios/reactful/experiment/routes/profile/detail.tsx').then(x => x.Detail).then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiment/routes/profile/detail.tsx'] = x);

