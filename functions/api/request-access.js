import {json} from './_auth.js';
export async function onRequestPost({request,env}) {
  const body=await request.json().catch(()=>({}));
  const email=String(body.email||'').trim().toLowerCase();
  const company=String(body.company||'').trim();
  const need=String(body.need||'').trim();
  if(!email||!company||!need) return json({error:'Email, company/team and assurance need are required.'},400);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({error:'Enter a valid work email.'},400);
  if(!env.DB) return json({error:'Request service is not configured.'},503);
  const id=crypto.randomUUID();
  await env.DB.prepare(`INSERT INTO access_requests(id,email,company,need,status,created_at) VALUES(?,?,?,?,?,?)`).bind(id,email,company,need,'new',new Date().toISOString()).run();
  return json({ok:true,request_id:id});
}
