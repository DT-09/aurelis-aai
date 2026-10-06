import fs from 'node:fs';
const required=['public/index.html','public/styles.css','public/app.js','public/access.html','public/client.html','public/operator.html','functions/_auth.js','functions/_engine.js','functions/api/client.js','functions/api/health.js','functions/api/operator.js','db/schema.sql','wrangler.toml'];
for(const p of required){if(!fs.existsSync(p))throw new Error('Missing '+p)}
const html=fs.readFileSync('public/index.html','utf8');
for(const s of ['AURELIS AAI','CURRENT WEDGE','UPCOMING','RELEASE EVIDENCE','ASSURANCE ARCHITECTURE','PUBLIC DEMONSTRATION','Test a Change'])if(!html.includes(s))throw new Error('Missing section '+s);
console.log('Aurelis AAI bundle smoke test: PASS');
