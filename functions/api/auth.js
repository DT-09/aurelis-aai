import {sha256,cookie,json} from './_auth.js';

export async function onRequestPost({request,env}) {
  const body = await request.json().catch(()=>({}));
  const email = String(body.email||'').trim().toLowerCase();
  const code = String(body.code||'').trim();
  if (!email || !code) return json({error:'Email and access code are required.'},400);
  if (!env.DB) return json({error:'Database binding is not configured.'},503);
  const hash = await sha256(code);
  const user = await env.DB.prepare(`SELECT * FROM access_users WHERE email=? AND access_code_hash=? AND status='active'`).bind(email,hash).first();
  if (!user) return json({error:'Invalid access credentials.'},401);
  const raw = crypto.randomUUID()+crypto.randomUUID();
  const sidHash = await sha256(raw);
  const ttl = Math.max(900,Number(env.SESSION_TTL_SECONDS||28800));
  const exp = new Date(Date.now()+ttl*1000).toISOString();
  await env.DB.prepare(`INSERT INTO sessions(id_hash,user_id,organization_id,role,expires_at,created_at) VALUES(?,?,?,?,?,?)`).bind(sidHash,user.id,user.organization_id,user.role,exp,new Date().toISOString()).run();
  return json({ok:true,role:user.role,organization_id:user.organization_id,email:user.email},{headers:{'Set-Cookie':cookie('aurelis_session',raw,ttl)}});
}

export async function onRequestGet({request,env}) {
  const {currentUser}=await import('./_auth.js');
  const user=await currentUser(request,env);
  return user ? json({authenticated:true,email:user.email,role:user.role,organization_id:user.organization_id,expires_at:user.expires_at}) : json({authenticated:false},401);
}

export async function onRequestDelete({request,env}) {
  const {cookieValue,sha256}=await import('./_auth.js');
  const sid=cookieValue(request,'aurelis_session');
  if(sid && env.DB) await env.DB.prepare('DELETE FROM sessions WHERE id_hash=?').bind(await sha256(sid)).run();
  return json({ok:true},{headers:{'Set-Cookie':cookie('aurelis_session','',0)}});
}
