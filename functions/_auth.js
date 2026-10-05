export async function hashKey(key){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');}
export async function requireClient(request,env){const key=request.headers.get('X-AAI-Key')||'';if(!key||!env.DB)return null;const h=await hashKey(key);return await env.DB.prepare(`SELECT c.tenant_id,c.id credential_id,t.name FROM credentials c JOIN tenants t ON t.id=c.tenant_id WHERE c.key_hash=? AND c.revoked_at IS NULL`).bind(h).first();}
export async function hasEntitlement(env,tenant,cap){return !!(await env.DB.prepare(`SELECT 1 FROM entitlements WHERE tenant_id=? AND capability=? AND status='active'`).bind(tenant,cap).first());}
export function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json','cache-control':'no-store'}});}
export async function body(req){try{return await req.json()}catch{return {};}}
