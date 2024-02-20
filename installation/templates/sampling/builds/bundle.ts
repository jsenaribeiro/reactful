
import { GLOBAL_KEY } from '@reactful/commons'
await import('/mnt/b/Repositorios/reactful/experiments/builds/client.ts').then(x => x.default());
globalThis[GLOBAL_KEY].clients ||= {}

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiments/routes/counter.tsx'] = { off:false, tag:'CountButton' }
import('/mnt/b/Repositorios/reactful/experiments/routes/counter.tsx').then(x => x.CountButton)
.then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiments/routes/counter.tsx'].jsx = x);

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiments/routes/forms/form.tsx'] = { off:false, tag:'default' }
import('/mnt/b/Repositorios/reactful/experiments/routes/forms/form.tsx').then(x => x.default)
.then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiments/routes/forms/form.tsx'].jsx = x);

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiments/routes/hello.tsx'] = { off:false, tag:'Hello' }
import('/mnt/b/Repositorios/reactful/experiments/routes/hello.tsx').then(x => x.default)
.then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiments/routes/hello.tsx'].jsx = x);

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiments/routes/login.tsx'] = { off:false, tag:'default' }
import('/mnt/b/Repositorios/reactful/experiments/routes/login.tsx').then(x => x.default)
.then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiments/routes/login.tsx'].jsx = x);

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiments/routes/profile/detail.tsx'] = { off:false, tag:'Detail' }
import('/mnt/b/Repositorios/reactful/experiments/routes/profile/detail.tsx').then(x => x.Detail)
.then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/experiments/routes/profile/detail.tsx'].jsx = x);

