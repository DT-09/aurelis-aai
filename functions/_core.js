const enc=new TextEncoder();
export const now=()=>new Date().toISOString();
export const id=p=>`${p}_${crypto.randomUUID().replaceAll('-','').slice(0,20)}`;
export async function sha256(s){const b=await crypto.subtle.digest('SHA-256',enc.encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
export async function hashSecret(s){return sha256(s)}
export async function sign(value,secret){return sha256(`${value}.${secret}`)}
export function json(data,status=200){return new Response(JSON.stringify(data,null,2),{status,headers:{'content-type':'application/json','cache-control':'no-store'}})}
export async function body(req){try{return await req.json()}catch{return {}}}
export function cookie(name,value,maxAge){return `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`}
export function getCookie(req,name){const c=req.headers.get('Cookie')||'';const m=c.match(new RegExp(`(?:^|; )${name}=([^;]+)`));return m?.[1]||null}
export async function requireSession(req,env,roles=[]){const sid=getCookie(req,'aurelis_session');if(!sid)return null;const r=await env.DB.prepare('SELECT * FROM sessions WHERE id=? AND expires_at>?').bind(sid,now()).first();if(!r)return null;if(roles.length&&!roles.includes(r.role))return null;return r}
export async function audit(env,tenant,actor,event,payload){await env.DB.prepare('INSERT INTO audit_events VALUES(?,?,?,?,?,?)').bind(id('aud'),tenant,actor,event,JSON.stringify(payload),now()).run()}
export function canonical(v){return JSON.stringify(v,Object.keys(v).sort())}
