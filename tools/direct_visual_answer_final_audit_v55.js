const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=[
'qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js',
'qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js',
'qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js','qbank_distractor_plausibility_v40.js','qbank_semantic_rewrite_gw_v42.js','qbank_semantic_rewrite_th_v42.js','qbank_semantic_rewrite_l_v42.js','qbank_semantic_strengthen_g_v42.js','qbank_semantic_strengthen_w_v42.js','qbank_semantic_strengthen_t_v42.js','qbank_semantic_strengthen_h_v42.js','qbank_semantic_strengthen_l_v42.js','qbank_semantic_polish_v43.js','qbank_semantic_polish_v44.js','qbank_semantic_polish_v45.js','qbank_exam_difficulty_stage1_v47.js','qbank_recent_exam_upgrade_v47.js','qbank_recent_exam_audit_finalize_v47.js','qbank_exam_difficulty_stage2_v48.js','qbank_exam_difficulty_stage3_v49.js','qbank_exam_difficulty_stage3_fix_v49.js','qbank_exam_difficulty_stage4_v50.js','qbank_exam_difficulty_stage5_v51.js','qbank_learning_visuals_v52.js','visual_aid_audit_v53.js','qbank_learning_visuals_v53.js','qbank_learning_visuals_v53_mobilefix.js','qbank_direct_visual_difficulty_v54.js','qbank_direct_visual_quality_v55.js'
];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},head:{appendChild:noop},createElement:()=>({})};
const localStorage={getItem:()=>null,setItem:noop,removeItem:noop};
const ctx={window:{QBANK:[]},document,console:{log:noop,warn:noop,error:noop},setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage,Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=localStorage;vm.createContext(ctx);
for(const f of scripts){const p=path.join(root,f);if(!fs.existsSync(p))throw new Error('missing '+f);vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:f});}
const bank=ctx.window.QBANK||[];
const review=JSON.parse(fs.readFileSync(path.join(root,'tools/direct_visual_manual_review_v55.json'),'utf8'));
function fail(msg){console.error('FAIL '+msg);process.exitCode=1;}
function q(id){return bank.find(x=>x&&x.id===id);}
function strip(s){return String(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();}
function flattenVisual(v){if(!v)return'';let a=[v.title,v.note,v.xLabel,v.yLabel,v.unit];if(Array.isArray(v.headers))a=a.concat(v.headers);if(Array.isArray(v.rows))a=a.concat(v.rows.flat());if(Array.isArray(v.labels))a=a.concat(v.labels);if(Array.isArray(v.values))a=a.concat(v.values);if(Array.isArray(v.x))a=a.concat(v.x);if(Array.isArray(v.y))a=a.concat(v.y);if(Array.isArray(v.series))for(const z of v.series){a.push(z.label);if(Array.isArray(z.y))a=a.concat(z.y)}return a.filter(x=>x!=null).join(' ');}
function nums(s){return (strip(s).match(/\d+(?:\.\d+)?/g)||[]).map(Number);}
function highRisk(qn){const correct=strip((qn.o||[])[qn.a]||''),vt=flattenVisual(qn.v),vn=nums(vt),cn=nums(correct);const direct=/最大|最小|最も大き|最も小さ|上回|下回|多い|少ない|割合|順位|合計|適合|非適合|増加|減少|高い|低い/;if(/表では|グラフでは|図では/.test(correct))return true;if(direct.test(correct)&&cn.some(n=>vn.includes(n)))return true;return false;}

if(bank.length!==199)fail('active bank count '+bank.length+' != 199');
const visualIds=bank.filter(x=>x&&x.v).map(x=>x.id).sort();
const groups=['rewriteDirectDisclosure','fixVisualStemConsistency','keepDerivedCalculationOrPattern','keepMechanismOrCurveInterpretation','keepProfessionalJudgmentOrConcept'];
const reviewed=[];for(const g of groups){if(!Array.isArray(review[g]))fail('review group missing '+g);else reviewed.push(...review[g]);}
const duplicates=reviewed.filter((id,i,a)=>a.indexOf(id)!==i);
if(duplicates.length)fail('duplicate review ids '+[...new Set(duplicates)].join(','));
const reviewedSorted=[...reviewed].sort();
if(JSON.stringify(reviewedSorted)!==JSON.stringify(visualIds)){
 const miss=visualIds.filter(id=>!reviewed.includes(id));const extra=reviewed.filter(id=>!visualIds.includes(id));
 fail('manual review coverage mismatch missing='+miss.join(',')+' extra='+extra.join(','));
}
console.log('REVIEW_COVERAGE visual='+visualIds.length+' reviewed='+reviewed.length);

const severe=bank.filter(x=>x&&x.v&&highRisk(x)).map(x=>x.id);
const approvedSevere=['W33'];
const unapproved=severe.filter(id=>!approvedSevere.includes(id));
if(unapproved.length)fail('unapproved direct-visual high risk '+unapproved.join(','));
console.log('MECHANICAL_HIGH_RISK remaining='+severe.length+' ids='+severe.join(','));

const g37=q('G37');
if(!g37)fail('G37 missing');
else{
 if(g37.directVisualDifficulty!=='v55')fail('G37 not marked v55');
 const headers=(g37.v&&g37.v.headers)||[];
 if(headers.some(x=>/割合/.test(String(x))))fail('G37 still prints percentage column');
 const vt=flattenVisual(g37.v);
 if(/41\.1|72\.5/.test(vt))fail('G37 visual still discloses computed percentages');
 if(g37.a!==2)fail('G37 answer index changed');
 const ca=strip(g37.o[g37.a]);
 if(!/41\.1/.test(ca)||!/72\.5/.test(ca)||!/LAeq/.test(ca))fail('G37 keyed answer lacks calculated shares/LAeq');
 const a=8166/19886*100,b=3268/4508*100;
 if(Math.abs(a-41.1)>0.1||Math.abs(b-72.5)>0.1)fail('G37 arithmetic constants inconsistent');
}

const l37=q('L37');
if(!l37)fail('L37 missing');
else{
 if(l37.directVisualDifficulty!=='v55')fail('L37 not marked v55');
 const s=(l37.v&&l37.v.series)||[];const m=Object.fromEntries(s.map(z=>[z.label,z.y]));
 for(const k of ['無添加','+N','+P','+N+P'])if(!m[k])fail('L37 missing series '+k);
 if(m['+N']&&m['+P']&&m['+N+P']){
   const n=m['+N'][m['+N'].length-1],p=m['+P'][m['+P'].length-1],np=m['+N+P'][m['+N+P'].length-1];
   if(!(n>p+1.0))fail('L37 +N response is not clearly above +P');
   if(!(Math.abs(np-n)<=0.15))fail('L37 +N+P is not approximately equal to +N');
 }
 if(!/窒素が主要な制限栄養塩/.test(strip(l37.o[l37.a])))fail('L37 keyed conclusion not N limitation');
}

const g38=q('G38');
if(!g38)fail('G38 missing');
else{
 const v=flattenVisual(g38.v);
 for(const term of ['汚泥','動物のふん尿','がれき類','再生利用量','減量化量','最終処分量'])if(v.includes(term))fail('G38 visual discloses hidden label '+term);
}

if(process.exitCode){process.exit(process.exitCode)}
console.log('PASS v55 all visual questions manually reviewed; direct-disclosure and visual consistency audit passed');
