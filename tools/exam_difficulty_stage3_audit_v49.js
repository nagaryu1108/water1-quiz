const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const pre=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js','qbank_distractor_plausibility_v40.js','qbank_semantic_rewrite_gw_v42.js','qbank_semantic_rewrite_th_v42.js','qbank_semantic_rewrite_l_v42.js','qbank_semantic_strengthen_g_v42.js','qbank_semantic_strengthen_w_v42.js','qbank_semantic_strengthen_t_v42.js','qbank_semantic_strengthen_h_v42.js','qbank_semantic_strengthen_l_v42.js','qbank_semantic_polish_v43.js','qbank_semantic_polish_v44.js','qbank_semantic_polish_v45.js','qbank_exam_difficulty_stage1_v47.js','qbank_recent_exam_upgrade_v47.js','qbank_recent_exam_audit_finalize_v47.js','qbank_exam_difficulty_stage2_v48.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);
for(const f of pre)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const targets=['H03','H07','H10','H12','H13','H17'];
const baseline={};for(const id of targets){const x=ctx.window.QBANK.find(q=>q.id===id);if(x)baseline[id]=x.a;}
vm.runInContext(fs.readFileSync(path.join(root,'qbank_exam_difficulty_stage3_v49.js'),'utf8'),ctx,{filename:'qbank_exam_difficulty_stage3_v49.js'});
const bank=ctx.window.QBANK||[],arc=ctx.window.WATER1_ARCHIVED_QUESTIONS||[],errs=[];const ok=(c,m)=>{if(!c)errs.push(m)};
const ABS=/必ず|常に|一切|例外なく|すべて|全て/;
function medianWrong(x){const a=x.o.map(s=>String(s).length).filter((_,i)=>i!==x.a).sort((a,b)=>a-b);return(a[1]+a[2])/2;}
ok(bank.length===199,`active bank ${bank.length}`);ok(arc.length===1&&arc[0].id==='L30','archive invariant');
for(const id of targets){
 const x=bank.find(q=>q.id===id);ok(!!x,`${id} exists`);if(!x)continue;
 ok(x.s==='水質有害物質特論',`${id} subject`);ok(x.examDifficultyStage==='v49-stage3',`${id} stage marker`);ok(x.a===baseline[id],`${id} answer index changed`);
 ok(Array.isArray(x.o)&&x.o.length===5,`${id} five choices`);ok(Array.isArray(x.e)&&x.e.length===5,`${id} five explanations`);ok(new Set(x.o).size===5,`${id} unique choices`);
 ok(x.v&&x.v.kind==='table',`${id} problem table`);ok(x.av==null,`${id} stale after-answer visual`);
 if(x.v&&x.v.kind==='table'){ok(Array.isArray(x.v.headers)&&x.v.headers.length>=2,`${id} headers`);ok(Array.isArray(x.v.rows)&&x.v.rows.length>=2,`${id} rows`);x.v.rows.forEach((r,i)=>ok(r.length===x.v.headers.length,`${id} row ${i+1} width`));}
 x.e.forEach((e,i)=>{ok(String(e||'').length>=70,`${id}.e${i+1} too short`);ok(String(e||'').startsWith(i===x.a?'【正しい】':'【誤り】'),`${id}.e${i+1} status`);});
 const flags=x.o.map(s=>ABS.test(String(s))),n=flags.filter(Boolean).length;ok(!(n===1&&!flags[x.a]),`${id} absolute-word giveaway`);
 const ans=String(x.o[x.a]).length,med=medianWrong(x);ok(!(ans>=med*1.55&&ans-med>=18),`${id} answer-length cue`);
 const wrongLens=x.o.map((s,i)=>i===x.a?999:String(s).length);ok(Math.min(...wrongLens)>=30,`${id} distractor too short`);
}
let absCue=0,lenCue=0;for(const x of bank){const f=x.o.map(s=>ABS.test(String(s))),n=f.filter(Boolean).length;if(n===1&&!f[x.a])absCue++;const ans=String(x.o[x.a]).length,med=medianWrong(x);if(ans>=med*1.55&&ans-med>=18)lenCue++;}
ok(absCue===0,`global absolute cues ${absCue}`);ok(lenCue===0,`global answer-length cues ${lenCue}`);
const text=id=>{const x=bank.find(q=>q.id===id);return x?[x.q,...x.o,x.p,JSON.stringify(x.v||{})].join(' '):''};
ok(/ヘッドスペース/.test(text('H03'))&&/HPLC/.test(text('H03')),'H03 property/method selection');
ok(/遊離シアン/.test(text('H07'))&&/Fe-CN/.test(text('H07')),'H07 cyanide speciation diagnosis');
ok(/4.8/.test(text('H10'))&&/選択性樹脂/.test(text('H10'))&&/RO/.test(text('H10')),'H10 boron treatment data');
ok(/As\(III\)/.test(text('H12'))&&/リン酸/.test(text('H12')),'H12 arsenic oxidation/competition');
ok(/25.0/.test(text('H13'))&&/ヘッドスペース/.test(text('H13')),'H13 VOC preservation');
ok(/P1/.test(text('H17'))&&/生分解率/.test(text('H17')),'H17 organophosphorus treatability');
const meta=ctx.window.WATER1_RECENT_EXAM_DIFFICULTY_AUDIT||{};ok(meta.version==='v49','metadata version');ok(Array.isArray(meta.stage3Ids)&&targets.every(id=>meta.stage3Ids.includes(id)),'stage3 metadata ids');
const loader=fs.readFileSync(path.join(root,'qbank_patch_v5.js'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');ok(loader.includes('qbank_exam_difficulty_stage3_v49.js?v=145'),'loader includes stage3');ok(sw.includes('qbank_exam_difficulty_stage3_v49.js')&&sw.includes('difficulty-v49-stage3'),'service worker includes stage3');
console.log('STAGE3_TARGETS',targets.join(','),'ACTIVE',bank.length,'ARCHIVED',arc.map(x=>x.id).join(','),'ABS',absCue,'LEN',lenCue);
if(errs.length){console.error('FAIL stage3 hazardous-substance exam difficulty audit\n'+errs.join('\n'));process.exit(1)}
console.log('PASS stage3 hazardous-substance exam difficulty uplift v49');
