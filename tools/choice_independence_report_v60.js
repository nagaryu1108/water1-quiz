const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const files=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js','qbank_distractor_plausibility_v40.js','qbank_semantic_rewrite_gw_v42.js','qbank_semantic_rewrite_th_v42.js','qbank_semantic_rewrite_l_v42.js','qbank_semantic_strengthen_g_v42.js','qbank_semantic_strengthen_w_v42.js','qbank_semantic_strengthen_t_v42.js','qbank_semantic_strengthen_h_v42.js','qbank_semantic_strengthen_l_v42.js','qbank_semantic_polish_v43.js','qbank_semantic_polish_v44.js','qbank_semantic_polish_v45.js','qbank_exam_difficulty_stage1_v47.js','qbank_recent_exam_upgrade_v47.js','qbank_recent_exam_audit_finalize_v47.js','qbank_exam_difficulty_stage2_v48.js','qbank_exam_difficulty_stage3_v49.js','qbank_exam_difficulty_stage3_fix_v49.js','qbank_exam_difficulty_stage4_v50.js','qbank_exam_difficulty_stage5_v51.js','qbank_learning_visuals_v52.js','visual_aid_audit_v53.js','qbank_learning_visuals_v53.js','qbank_learning_visuals_v53_mobilefix.js','qbank_direct_visual_difficulty_v54.js','qbank_direct_visual_quality_v55.js','qbank_legal_fillin_v56.js','qbank_chem_typography_v59.js','qbank_choice_independence_v60.js'];
const noop=()=>{};const document={readyState:'loading',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{},head:{appendChild:noop},createElement:()=>({style:{},dataset:{},setAttribute:noop,appendChild:noop})};
const ctx={window:{QBANK:[]},document,console,setTimeout:noop,clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;vm.createContext(ctx);
for(const f of files)vm.runInContext(read(f),ctx,{filename:f});
const bank=ctx.window.QBANK||[];

function norm(s){
  return String(s||'').toLowerCase()
    .replace(/[０-９]/g,c=>String.fromCharCode(c.charCodeAt(0)-0xFEE0))
    .replace(/\d+(?:\.\d+)?/g,'#')
    .replace(/mg\/l|ng\/l|g\/l|mol|％|%|以上|以下|未満|超|約|である|となる|する|される|もの|こと/g,'')
    .replace(/[\s、。・，,（）()「」『』：:＝=＋+－−→\/]/g,'');
}
function bigrams(s){const a=[];for(let i=0;i<s.length-1;i++)a.push(s.slice(i,i+2));return a;}
function dice(a,b){
  const A=bigrams(norm(a)),B=bigrams(norm(b));if(!A.length||!B.length)return 0;
  const m=new Map();A.forEach(x=>m.set(x,(m.get(x)||0)+1));let hit=0;
  B.forEach(x=>{const n=m.get(x)||0;if(n){hit++;m.set(x,n-1);}});
  return 2*hit/(A.length+B.length);
}
function nums(s){return (String(s).match(/\d+(?:\.\d+)?/g)||[]).join(',');}
function sharedAnchors(a,b){
  const keys=['基準値','日間平均','年間平均','排水基準','環境基準','生物1','生物2','生物3','SRT','HRT','SVI','pH','DO','BOD','COD','TOC','純度','回収率','達成率','除去率','負荷量','濃度','温度','時間','流量','mol','mg/L','ng/L','％','%'];
  return keys.filter(k=>String(a).includes(k)&&String(b).includes(k));
}
const out=[];
for(const q of bank){
  if(!Array.isArray(q.o)||q.o.length!==5||!Number.isInteger(q.a))continue;
  const correct=q.o[q.a],pairs=[];
  for(let i=0;i<5;i++)if(i!==q.a){
    const sim=dice(correct,q.o[i]),anchors=sharedAnchors(correct,q.o[i]);
    const na=nums(correct),nb=nums(q.o[i]);
    const numeric=!!na&&!!nb&&na!==nb;
    pairs.push({i,sim,anchors,numeric,na,nb});
  }
  pairs.sort((x,y)=>y.sim-x.sim);
  const top=pairs[0],second=pairs[1];
  const dominant=top.sim>=0.44 && top.sim-second.sim>=0.16;
  const numericDuel=top.numeric&&top.anchors.length>=1&&top.sim>=0.30&&top.sim-second.sim>=0.10;
  if(dominant||numericDuel){
    out.push({id:q.id,subject:q.s,title:q.t,answer:q.a+1,other:top.i+1,score:+top.sim.toFixed(3),next:+second.sim.toFixed(3),anchors:top.anchors,numeric:numericDuel,correct,competitor:q.o[top.i]});
  }
}
console.log('CHOICE_INDEPENDENCE_REPORT_V60 ACTIVE',bank.length,'CANDIDATES',out.length);
out.sort((a,b)=>b.score-a.score).forEach(x=>{
 console.log('CANDIDATE\t'+x.id+'\tanswer='+x.answer+'\tother='+x.other+'\tscore='+x.score+'\tnext='+x.next+'\tanchors='+x.anchors.join('/')+'\tnumeric='+x.numeric);
 console.log('  A: '+x.correct);
 console.log('  B: '+x.competitor);
});
if(!out.length)console.log('NO dominant answer-vs-one-distractor pair detected by v60 heuristic');
