import {json} from '../_core.js';
import {analyzeImpact,diff,ENGINE_VERSION} from '../_engine.js';
export async function onRequestGet(){const baseline={model:'support-model-v17',tools:[{name:'CRM',read:true}],data:[{name:'Customer PII'}],controls:[{name:'Ticket modification approval',requiredApproval:true}]};const changed={...baseline,tools:[{name:'CRM',read:true,write:true}]};const changes=diff(baseline,changed),impact=analyzeImpact(changes);return json({engine:ENGINE_VERSION,controlledDemo:true,baseline,changed,changes,impact,decision:impact.findings.length?'BLOCKED':'APPROVED'})}
