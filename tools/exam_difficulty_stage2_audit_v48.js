const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js','qbank_distractor_plausibility_v40.js','qbank_semantic_rewrite_gw_v42.js','qbank_semantic_rewrite_th_v42.js','qbank_semantic_rewrite_l_v42.js','qbank_semantic_strengthen_g_v42.js','qbank_semantic_strengthen_w_v42.js','qbank_semantic_strengthen_t_v42.js','qbank_semantic_strengthen_h_v42.js','qbank_semantic_strengthen_l_v42.js','qbank_semantic_polish_v43.js','qbank_semantic_polish_v44.js','qbank_semantic_polish_v45.js','qbank_exam_difficulty_stage1_v47.js','qbank_recent_exam_upgrade_v47.js','qbank_recent_exam_audit_finalize_v47.js','qbank_exam_difficulty_stage2_v48.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const bank=ctx.window.QBANK||[],arc=ctx.window.WATER1_ARCHIVED_QUESTIONS||[],errs=[];const ok=(c,m)=>{if(!c)errs.push(m)};
ok(bank.length===199,`active bank ${bank.length}`);ok(arc.length===1&&arc[0].id==='L30','archive invariant');
const targets=['T10','T15','T16','T21','T22','T30','T42','T43'];
const expected={T10:4,T15:0,T16:3,T21:4,T22:1,T30:1,T42:1,T43:4};
const ABS=/必ず|常に|一切|例外なく|すべて|全て/;
function medianWrong(x){const a=x.o.map(s=>String(s).length).filter((_,i)=>i!==x.a).sort((a,b)=>a-b);return(a[1]+a[2])/2;}
for(const id of targets){
 const x=bank.find(q=>q.id===id);ok(!!x,`${id} exists`);if(!x)continue;
 ok(x.examDifficultyStage==='v48-stage2',`${id} stage marker`);
 ok(x.a===expected[id],`${id} answer index stable`);
 ok(Array.isArray(x.o)&&x.o.length===5,`${id} five choices`);
 ok(Array.isArray(x.e)&&x.e.length===5,`${id} five explanations`);
 ok(new Set(x.o).size===5,`${id} unique choices`);
 ok(x.v&&x.v.kind==='table',`${id} problem table`);
 ok(x.av==null,`${id} no stale after-answer visual`);
 if(x.v&&x.v.kind==='table'){
   ok(Array.isArray(x.v.headers)&&x.v.headers.length>=2,`${id} table headers`);
   ok(Array.isArray(x.v.rows)&&x.v.rows.length>=1,`${id} table rows`);
   x.v.rows.forEach((r,i)=>ok(Array.isArray(r)&&r.length===x.v.headers.length,`${id} row ${i+1} width`));
 }
 x.e.forEach((e,i)=>{
   ok(/^【(正しい|誤り)】/.test(String(e||'')),`${id}.e${i+1} status prefix`);
   ok(String(e||'').length>=55,`${id}.e${i+1} explanation too short`);
 });
 const asksForIncorrect=/誤っている|不適当/.test(String(x.q||''));
 const answerPrefix=asksForIncorrect?'【誤り】':'【正しい】';
 const nonAnswerPrefix=asksForIncorrect?'【正しい】':'【誤り】';
 ok(String(x.e[x.a]||'').startsWith(answerPrefix),`${id} answer explanation status`);
 x.e.forEach((e,i)=>{if(i!==x.a)ok(String(e||'').startsWith(nonAnswerPrefix),`${id}.e${i+1} non-answer explanation status`)});
 const flags=x.o.map(s=>ABS.test(String(s))),n=flags.filter(Boolean).length;
 ok(!(n===1&&!flags[x.a]),`${id} absolute-word giveaway`);
 const ans=String(x.o[x.a]).length,med=medianWrong(x);
 ok(!(ans>=med*1.55&&ans-med>=18),`${id} answer-length cue`);
 const wrongLens=x.o.map((s,i)=>i===x.a?999:String(s).length);
 ok(Math.min(...wrongLens)>=30,`${id} distractor too short`);
}
let absCue=0,lenCue=0;
for(const x of bank){
 const f=x.o.map(s=>ABS.test(String(s))),n=f.filter(Boolean).length;if(n===1&&!f[x.a])absCue++;
 const ans=String(x.o[x.a]).length,med=medianWrong(x);if(ans>=med*1.55&&ans-med>=18)lenCue++;
}
ok(absCue===0,`global absolute cues ${absCue}`);ok(lenCue===0,`global answer-length cues ${lenCue}`);
const text=id=>{const x=bank.find(q=>q.id===id);return x?[x.q,...x.o,x.p,JSON.stringify(x.v||{})].join(' '):''};
ok(/D60\/D10/.test(text('T10'))&&/0.24/.test(text('T10')),'T10 filter-media calculation/data');
ok(/0.80/.test(text('T15'))&&/0.68/.test(text('T15'))&&/ピーク幅/.test(text('T15')),'T15 CFA flow diagnosis');
ok(/膜電極式/.test(text('T16'))&&/6.9/.test(text('T16'))&&/光学式/.test(text('T16')),'T16 DO method comparison');
ok(/MF/.test(text('T21'))&&/NF/.test(text('T21'))&&/RO/.test(text('T21'))&&/電気透析/.test(text('T21')),'T21 membrane selection');
ok(/1.0 t/.test(text('T22'))&&/0.83 t/.test(text('T22'))&&/含水率/.test(text('T22')),'T22 sludge mass/energy calculation');
ok(/0.3/.test(text('T30'))&&/不連続点/.test(text('T30'))&&/遊離残留塩素/.test(text('T30')),'T30 breakpoint curve interpretation');
ok(/植種/.test(text('T42'))&&/CODMn/.test(text('T42'))&&/別分取/.test(text('T42')),'T42 BOD/COD operation');
ok(/8.4/.test(text('T43'))&&/6.7/.test(text('T43'))&&/懸濁態/.test(text('T43')),'T43 TN method comparison');
const meta=ctx.window.WATER1_RECENT_EXAM_DIFFICULTY_AUDIT||{};
ok(meta.version==='v48','recent-exam audit metadata version');
ok(Array.isArray(meta.stage2Ids)&&targets.every(id=>meta.stage2Ids.includes(id)),'stage2 metadata ids');
ok(targets.every(id=>{const x=bank.find(q=>q.id===id);return x&&x.recentExamDifficultyAudit&&x.recentExamDifficultyAudit.status==='UPGRADED_TO_RECENT_EXAM_LEVEL';}),'stage2 metadata status');
const loader=fs.readFileSync(path.join(root,'qbank_patch_v5.js'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
ok(loader.includes('qbank_exam_difficulty_stage2_v48.js?v=144'),'loader includes stage2');
ok(sw.includes('qbank_exam_difficulty_stage2_v48.js')&&sw.includes('difficulty-v48-stage2'),'service worker includes stage2');
console.log('STAGE2_TARGETS',targets.join(','),'ACTIVE',bank.length,'ARCHIVED',arc.map(x=>x.id).join(','),'ABS',absCue,'LEN',lenCue);
if(errs.length){console.error('FAIL stage2 exam difficulty audit\n'+errs.join('\n'));process.exit(1)}
console.log('PASS stage2 wastewater-treatment exam difficulty uplift v48');
