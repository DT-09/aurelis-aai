import test from 'node:test';import assert from 'node:assert/strict';
async function api(path,opts){return fetch('http://127.0.0.1:8787'+path,opts)}
test('static project contains core surfaces',async()=>{const fs=await import('node:fs/promises');for(const f of ['index.html','access.html','dashboard.html','demo.html','evidence.html','verify.html','architecture.html','controls.html','trust.html','docs.html'])assert.ok(await fs.readFile(new URL('../static/'+f,import.meta.url),'utf8'))});
