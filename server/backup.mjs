import {DatabaseSync,backup} from 'node:sqlite';
import {mkdirSync,readdirSync,statSync,unlinkSync,chmodSync} from 'node:fs';
import path from 'node:path';
const dir=process.env.BACKUP_DIR||'backups';mkdirSync(dir,{recursive:true,mode:0o700});
async function run(){const db=new DatabaseSync(process.env.DB_PATH||'runtime/forma.sqlite');const out=path.join(dir,'forma-'+new Date().toISOString().replace(/[:.]/g,'-')+'.sqlite');try{await backup(db,out);chmodSync(out,0o600);for(const f of readdirSync(dir)){if(/^forma-.*\.sqlite$/.test(f)&&Date.now()-statSync(path.join(dir,f)).mtimeMs>7*86400000)unlinkSync(path.join(dir,f))}console.log('backup_complete')}finally{db.close()}}
await run();if(process.argv.includes('--loop'))setInterval(()=>run().catch(()=>console.error('backup_failed')),24*60*60*1000);
