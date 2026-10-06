const enc = new TextEncoder();
const dec = new TextDecoder();

export async function sha256(value) {
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(value));
  return [...new Uint8Array(buf)].map(x=>x.toString(16).padStart(2,'0')).join('');
}
export function cookieValue(request, name) {
  const raw = request.headers.get('Cookie') || '';
  const hit = raw.split(';').map(x=>x.trim()).find(x=>x.startsWith(name+'='));
  return hit ? decodeURIComponent(hit.slice(name.length+1)) : null;
}
export function cookie(name,value,maxAge) {
  return `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}
export async function currentUser(request, env) {
  if (!env.DB) return null;
  const sid = cookieValue(request,'aurelis_session');
  if (!sid) return null;
  const hash = await sha256(sid);
  const row = await env.DB.prepare(`SELECT s.*, u.email, u.status AS user_status FROM sessions s JOIN access_users u ON u.id=s.user_id WHERE s.id_hash=? AND s.expires_at>? AND u.status='active'`).bind(hash,new Date().toISOString()).first();
  return row || null;
}
export function json(data,status=200,extra={}) {
  return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8',...extra}});
}
export async function requireUser(request,env,roles=[]) {
  const user = await currentUser(request,env);
  if (!user) return {error:json({error:'AUTH_REQUIRED'},401)};
  if (roles.length && !roles.includes(user.role)) return {error:json({error:'FORBIDDEN'},403)};
  return {user};
}
