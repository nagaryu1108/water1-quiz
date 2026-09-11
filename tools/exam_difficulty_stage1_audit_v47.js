const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js','qbank_distractor_plausibility_v40.js','qbank_semantic_rewrite_gw_v42.js','qbank_semantic_rewrite_th_v42.js','qbank_semantic_rewrite_l_v42.js','qbank_semantic_strengthen_g_v42.js','qbank_semantic_strengthen_w_v42.js','qbank_semantic_strengthen_t_v42.js','qbank_semantic_strengthen_h_v42.js','qbank_semantic_strengthen_l_v42.js','qbank_semantic_polish_v43.js','qbank_semantic_polish_v44.js','qbank_semantic_polish_v45.js','qbank_exam_difficulty_stage1_v47.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const bank=ctx.window.QBANK||[],arc=ctx.window.WATER1_ARCHIVED_QUESTIONS||[],errs=[];const ok=(c,m)=>{if(!c)errs.push(m)};
ok(bank.length===199,`active bank ${bank.length}`);ok(arc.length===1&&arc[0].id==='L30','archive invariant');
const targets=['L04','L05','L06','L07','L22','L28'];const expected={L04:4,L05:0,L06:0,L07:0,L22:0,L28:0};
for(const id of targets){
 const x=bank.find(q=>q.id===id);ok(!!x,`${id} exists`);if(!x)continue;
 ok(x.examDifficultyStage==='v47-stage1',`${id} stage marker`);
 ok(x.a===expected[id],`${id} answer index stable`);
 ok(Array.isArray(x.o)&&x.o.length===5,`${id} five choices`);
 ok(Array.isArray(x.e)&&x.e.length===5,`${id} five explanations`);
 ok(new Set(x.o).size===5,`${id} unique choices`);
 ok(String(x.q).length>=75,`${id} scenario/data stem too short`);
 ok(/\d/.test(x.q),`${id} lacks quantitative/data condition`);
 x.e.forEach((e,i)=>ok(/^【(正しい|誤り)】/.test(String(e||'')),`${id}.e${i+1} status prefix`));
 const lens=x.o.map(s=>String(s).length),ans=lens[x.a],wrong=lens.filter((_,i)=>i!==x.a).sort((a,b)=>a-b),med=(wrong[1]+wrong[2])/2;
 ok(!(ans>=med*1.55&&ans-med>=18),`${id} answer-length cue`);
}
// Stage-specific realism signals: each rewritten item must require more than a bare definition.
const text=id=>{const x=bank.find(q=>q.id===id);return x?[x.q,...x.o,x.p].join(' '):''};
ok(/8月/.test(text('L04'))&&/11月/.test(text('L04'))&&/DO/.test(text('L04')),'L04 seasonal profile case');
ok(/窒素添加区/.test(text('L05'))&&/りん添加区/.test(text('L05')),'L05 nutrient-addition data');
ok(/水深0/.test(text('L06'))&&/26/.test(text('L06'))&&/1.8/.test(text('L06')),'L06 vertical profile data');
ok(/導電率/.test(text('L07'))&&/RO/.test(text('L07'))&&/75%/.test(text('L07')),'L07 reuse design case');
ok(/VFA\/アルカリ度比/.test(text('L22'))&&/0.75/.test(text('L22')),'L22 UASB upset diagnosis');
ok(/pH 9.0/.test(text('L28'))&&/11.0/.test(text('L28'))&&/塔頂ガス/.test(text('L28')),'L28 stripping equilibrium case');
const loader=fs.readFileSync(path.join(root,'qbank_patch_v5.js'),'utf8');ok(loader.includes('qbank_exam_difficulty_stage1_v47.js?v=139'),'loader includes stage1');
console.log('STAGE1_TARGETS',targets.join(','),'ACTIVE',bank.length,'ARCHIVED',arc.map(x=>x.id).join(','));
if(errs.length){console.error('FAIL stage1 exam difficulty audit\n'+errs.join('\n'));process.exit(1)}
console.log('PASS stage1 large-water exam difficulty uplift v47');
