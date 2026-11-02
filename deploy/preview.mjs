import {createApp} from '../server/main.mjs';import {randomBytes} from 'node:crypto';
const app=createApp({dataKey:randomBytes(32).toString('hex'),dbPath:':memory:',origin:'http://127.0.0.1:8787'});
app.server.listen(8787,'127.0.0.1',()=>console.log('Temporary in-memory QA server: http://127.0.0.1:8787'));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>app.close().then(()=>process.exit(0)));
