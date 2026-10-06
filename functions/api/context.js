import {requireUser,json} from './_auth.js';
export async function onRequestGet({request,env}) {
  const auth=await requireUser(request,env); if(auth.error) return auth.error;
  const {user}=auth;
  const rows=await env.DB.prepare(`SELECT id,system_name,domain,decision,status,summary,created_at FROM assessments WHERE organization_id=? ORDER BY created_at DESC LIMIT 50`).bind(user.organization_id).all();
  const stats=await env.DB.prepare(`SELECT COUNT(*) AS total, SUM(CASE WHEN status='controlled' THEN 1 ELSE 0 END) AS controlled, SUM(CASE WHEN decision='DENY' THEN 1 ELSE 0 END) AS denied FROM assessments WHERE organization_id=?`).bind(user.organization_id).first();
  return json({user:{email:user.email,role:user.role,organization_id:user.organization_id},stats,assessments:rows.results||[]});
}
