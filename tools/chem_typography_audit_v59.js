const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),errs=[],ok=(c,m)=>{if(!c)errs.push(m)};
const files=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js','qbank_distractor_plausibility_v40.js','qbank_semantic_rewrite_gw_v42.js','qbank_semantic_rewrite_th_v42.js','qbank_semantic_rewrite_l_v42.js','qbank_semantic_strengthen_g_v42.js','qbank_semantic_strengthen_w_v42.js','qbank_semantic_strengthen_t_v42.js','qbank_semantic_strengthen_h_v42.js','qbank_semantic_strengthen_l_v42.js','qbank_semantic_polish_v43.js','qbank_semantic_polish_v44.js','qbank_semantic_polish_v45.js','qbank_exam_difficulty_stage1_v47.js','qbank_recent_exam_upgrade_v47.js','qbank_recent_exam_audit_finalize_v47.js','qbank_exam_difficulty_stage2_v48.js','qbank_exam_difficulty_stage3_v49.js','qbank_exam_difficulty_stage3_fix_v49.js','qbank_exam_difficulty_stage4_v50.js','qbank_exam_difficulty_stage5_v51.js','qbank_learning_visuals_v52.js','visual_aid_audit_v53.js','qbank_learning_visuals_v53.js','qbank_learning_visuals_v53_mobilefix.js','qbank_direct_visual_difficulty_v54.js','qbank_direct_visual_quality_v55.js','qbank_legal_fillin_v56.js','qbank_chem_typography_v59.js'];
const noop=()=>{};const document={readyState:'loading',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{},head:{appendChild:noop},createElement:()=>({style:{},dataset:{},setAttribute:noop,appendChild:noop})};
const ctx={window:{QBANK:[]},document,console,setTimeout:noop,clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;vm.createContext(ctx);
for(const f of files)vm.runInContext(read(f),ctx,{filename:f});
const bank=ctx.window.QBANK||[],arc=ctx.window.WATER1_ARCHIVED_QUESTIONS||[];
ok(bank.length===199,'active bank changed: '+bank.length);ok(arc.length===1&&arc[0].id==='L30','archive invariant changed');
ok(ctx.window.WATER1_CHEM_TYPOGRAPHY&&ctx.window.WATER1_CHEM_TYPOGRAPHY.version==='v59','v59 metadata missing');

function fields(q){const a=[];const add=(k,v)=>{if(typeof v==='string')a.push([k,v]);};['t','q','p','src'].forEach(k=>add(k,q[k]));['o','e'].forEach(k=>(q[k]||[]).forEach((v,i)=>add(k+(i+1),v)));(q.terms||[]).forEach((t,i)=>{if(t){add('term'+(i+1)+'.name',t.name);add('term'+(i+1)+'.desc',t.desc);}});return a;}
const raw=/(?:MgNH4PO4|Fe\(CN\)6|Ca\(OH\)2|Al\(OH\)3|Cr\(OH\)3|Fe\(OH\)3|Mg\(OH\)2|B\(OH\)[34]|Cr2O7|CrO4|CH3COO|H2PO4|H3PO4|HPO4|PO4|SO4|CO3|CH2O|NH4-N|NO2-N|NO3-N|NH4\+|NH3|H2S|H2O|NO2[−-]|NO3[−-]|CO2|CH4|O2|N2|CaCO3|CaF2|AsH3|H2Se|Ca2\+|Mg2\+|Hg2\+|Al3\+|Cr3\+|Fe3\+)/;
const stuck=/[⁺⁻]\d+(?:\.\d+)?\s*mol\b/;
for(const q of bank)for(const [field,s] of fields(q)){if(raw.test(s))errs.push(q.id+'.'+field+': raw formula typography remains: '+s);if(stuck.test(s))errs.push(q.id+'.'+field+': missing ion/mol spacing: '+s);}

const h=bank.find(q=>q.id==='H09');
ok(h&&h.t.includes('CaF₂'),'H09 title CaF₂ subscript missing');
ok(h&&h.q.includes('Ca(OH)₂'),'H09 question Ca(OH)₂ subscript missing');
ok(h&&h.q.includes('Ca²⁺ + 2 F⁻ → CaF₂'),'H09 reaction spacing/typography missing');
ok(h&&h.o[3].includes('F⁻ 2 mol')&&h.o[3].includes('Ca²⁺ 1 mol'),'H09 correct choice ion/mol spacing missing');
ok(h&&h.o[0].includes('F⁻ 1 mol'),'H09 choice 1 ion/mol spacing missing');
ok(h&&h.o[4].includes('F⁻ 1 mol')&&h.o[4].includes('Ca²⁺ 1 mol'),'H09 choice 5 ion/mol spacing missing');
ok(h&&h.chemTypographyVersion==='v59','H09 v59 marker missing');

const loader=read('qbank_patch_v5.js'),sw=read('sw.js'),ui=read('ui_polish_v46.js'),index=read('index.html'),wf=read('.github/workflows/canonical-audit.yml');
ok(loader.includes('qbank_chem_typography_v59.js?v=157'),'loader missing v59 typography patch');
ok(loader.indexOf('qbank_chem_typography_v59.js')>loader.indexOf('qbank_legal_fillin_v56.js'),'v59 must run after final content patch');
ok(loader.indexOf('qbank_chem_typography_v59.js')<loader.indexOf('ui_polish_v46.js'),'v59 must run before UI/workflow scripts');
ok(sw.includes("'./qbank_chem_typography_v59.js'")&&sw.includes('chem-typography-v59'),'service worker missing v59');
ok(ui.includes("var RELEASE='v59'"),'UI release is not v59');
ok(index.includes("KEY='water1_bank_v3'"),'storage key changed');
ok(wf.includes('Run v59 chemical typography audit'),'workflow missing v59 audit');
console.log('CHEM_TYPOGRAPHY_V59 ACTIVE',bank.length,'H09',h&&h.t);
if(errs.length){console.error('FAIL v59 chemical typography audit\n'+errs.join('\n'));process.exit(1)}
console.log('PASS v59 all-bank display chemistry typography + ion/mol spacing audit');