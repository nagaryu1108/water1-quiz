const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=[
'qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js',
'qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js',
'qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js','qbank_distractor_plausibility_v40.js','qbank_semantic_rewrite_gw_v42.js','qbank_semantic_rewrite_th_v42.js','qbank_semantic_rewrite_l_v42.js','qbank_semantic_strengthen_g_v42.js','qbank_semantic_strengthen_w_v42.js','qbank_semantic_strengthen_t_v42.js','qbank_semantic_strengthen_h_v42.js','qbank_semantic_strengthen_l_v42.js','qbank_semantic_polish_v43.js','qbank_semantic_polish_v44.js','qbank_semantic_polish_v45.js','qbank_exam_difficulty_stage1_v47.js','qbank_recent_exam_upgrade_v47.js','qbank_recent_exam_audit_finalize_v47.js','qbank_exam_difficulty_stage2_v48.js','qbank_exam_difficulty_stage3_v49.js','qbank_exam_difficulty_stage3_fix_v49.js','qbank_exam_difficulty_stage4_v50.js','qbank_exam_difficulty_stage5_v51.js','qbank_learning_visuals_v52.js'
];
const noop=()=>{};
const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},head:{appendChild:noop},createElement:()=>({})};
const localStorage={getItem:()=>null,setItem:noop,removeItem:noop};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage,Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};
ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=localStorage;vm.createContext(ctx);
for(const f of scripts){const p=path.join(root,f);if(!fs.existsSync(p))throw new Error('missing '+f);vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:f});}
const bank=ctx.window.QBANK||[],arc=ctx.window.WATER1_ARCHIVED_QUESTIONS||[],meta=ctx.window.WATER1_LEARNING_VISUALS||{},errs=[];
const ok=(c,m)=>{if(!c)errs.push(m)};
ok(bank.length===199,`active bank ${bank.length}, expected 199`);ok(arc.length===1&&arc[0].id==='L30','archive invariant L30');
for(const q of bank){ok(Array.isArray(q.o)&&q.o.length===5,`${q.id} choices`);ok(Array.isArray(q.e)&&q.e.length===5,`${q.id} explanations`);ok(Number.isInteger(q.a)&&q.a>=0&&q.a<5,`${q.id} answer index`);}
const ids=['T04','H04','H07','H10','T21','T22','L33'];
ok(meta.version==='v52','v52 metadata missing');ok(meta.formulaNormalization===true,'formula normalization metadata missing');ok(Array.isArray(meta.flowQuestionIds)&&meta.flowQuestionIds.length===ids.length&&ids.every(id=>meta.flowQuestionIds.includes(id)),'flow id metadata mismatch');
for(const id of ids){const q=bank.find(x=>x.id===id);ok(!!q,`${id} missing`);if(!q)continue;ok(q.learningFlowVersion==='v52',`${id} flow version`);ok(String(q.p).includes(`data-flow-id="${id}"`),`${id} flow markup missing`);ok(/water1-flow-step/.test(String(q.p)),`${id} stage-role blocks missing`);}
const l33=bank.find(x=>x.id==='L33');
ok(l33&&/NH₃/.test(l33.o[4])&&/H₂S/.test(l33.o[4]),'L33 option 5 Unicode formula formatting');ok(l33&&!/\bNH3\b|\bH2S\b/.test(l33.o[4]),'L33 option 5 raw formula remains');
ok(l33&&/SWS/.test(l33.p)&&/API分離/.test(l33.p)&&/DAF/.test(l33.p)&&/生物処理/.test(l33.p),'L33 process roles incomplete');ok(l33&&/water1-flow-branches/.test(l33.p),'L33 must use branched sour/oily flow');ok(l33&&/別系統/.test(l33.p),'L33 branch caveat missing');
let raw=0;for(const q of bank){const vals=[q.q,q.p,q.src].concat(q.o||[],q.e||[]);for(const s of vals){if(typeof s==='string'&&/\b(?:NH3|H2S)\b/.test(s)){raw++;errs.push(`${q.id} raw NH3/H2S remains: ${s.slice(0,90)}`);}}}
ok(raw===0,`raw NH3/H2S count ${raw}`);
const loader=fs.readFileSync(path.join(root,'qbank_patch_v5.js'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8'),ui=fs.readFileSync(path.join(root,'ui_polish_v46.js'),'utf8');
const lp=loader.indexOf('qbank_learning_visuals_v52.js?v=149'),sp=loader.indexOf('qbank_exam_difficulty_stage5_v51.js?v=147'),up=loader.indexOf('ui_polish_v46.js?v=149');
ok(lp>=0,'v52 loader missing');ok(sp>=0&&sp<lp,'v52 must load after stage5');ok(up>lp,'UI polish must load after v52');ok(sw.includes("'./qbank_learning_visuals_v52.js'"),'service worker does not precache v52');ok(sw.includes('learning-visuals-v52'),'service worker v52 cache marker missing');ok(ui.includes("var RELEASE='v52'"),'UI release is not v52');
console.log('V52_FLOWS',ids.join(','),'ACTIVE',bank.length,'ARCHIVED',arc.map(x=>x.id).join(','),'RAW_NH3_H2S',raw);
if(errs.length){console.error('FAIL v52 formula/learning-flow audit\n'+errs.join('\n'));process.exit(1)}
console.log('PASS v52 formula and explanation-flow audit');
