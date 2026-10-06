import {requireUser,json} from './_auth.js';
export async function onRequestPost({request,env}) {
  const auth=await requireUser(request,env,['operator']); if(auth.error) return auth.error;
  const b=await request.json().catch(()=>({}));
  const id='ASM-'+crypto.randomUUID().slice(0,8).toUpperCase();
  await env.DB.prepare(`INSERT INTO assessments(id,organization_id,system_name,domain,decision,status,summary,created_at) VALUES(?,?,?,?,?,?,?,?)`).bind(id,auth.user.organization_id,String(b.system_name||'AI system'),String(b.domain||'AI Assurance'),String(b.decision||'REVIEW'),String(b.status||'controlled'),String(b.summary||'Assessment recorded.'),new Date().toISOString()).run();
  return json({ok:true,id});
}
