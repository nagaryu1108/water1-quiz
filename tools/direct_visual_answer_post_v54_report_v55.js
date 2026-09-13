const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=[
'qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js',
'qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js',
'qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js','qbank_distractor_plausibility_v40.js','qbank_semantic_rewrite_gw_v42.js','qbank_semantic_rewrite_th_v42.js','qbank_semantic_rewrite_l_v42.js','qbank_semantic_strengthen_g_v42.js','qbank_semantic_strengthen_w_v42.js','qbank_semantic_strengthen_t_v42.js','qbank_semantic_strengthen_h_v42.js','qbank_semantic_strengthen_l_v42.js','qbank_semantic_polish_v43.js','qbank_semantic_polish_v44.js','qbank_semantic_polish_v45.js','qbank_exam_difficulty_stage1_v47.js','qbank_recent_exam_upgrade_v47.js','qbank_recent_exam_audit_finalize_v47.js','qbank_exam_difficulty_stage2_v48.js','qbank_exam_difficulty_stage3_v49.js','qbank_exam_difficulty_stage3_fix_v49.js','qbank_exam_difficulty_stage4_v50.js','qbank_exam_difficulty_stage5_v51.js','qbank_learning_visuals_v52.js','visual_aid_audit_v53.js','qbank_learning_visuals_v53.js','qbank_learning_visuals_v53_mobilefix.js','qbank_direct_visual_difficulty_v54.js'
];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},head:{appendChild:noop},createElement:()=>({})};
const localStorage={getItem:()=>null,setItem:noop,removeItem:noop};
const ctx={window:{QBANK:[]},document,console:{log:noop,warn:noop,error:noop},setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage,Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=localStorage;vm.createContext(ctx);
for(const f of scripts){const p=path.join(root,f);if(!fs.existsSync(p))throw new Error('missing '+f);vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:f});}
const bank=ctx.window.QBANK||[];
function stripHtml(s){return String(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();}
function nums(s){return (stripHtml(s).match(/\d+(?:\.\d+)?/g)||[]).map(Number);}
function flattenVisual(v){if(!v)return'';let a=[v.title,v.note,v.xLabel,v.yLabel,v.unit];if(Array.isArray(v.headers))a=a.concat(v.headers);if(Array.isArray(v.rows))a=a.concat(v.rows.flat());if(Array.isArray(v.labels))a=a.concat(v.labels);if(Array.isArray(v.values))a=a.concat(v.values);if(Array.isArray(v.x))a=a.concat(v.x);if(Array.isArray(v.y))a=a.concat(v.y);if(Array.isArray(v.series))for(const z of v.series){a.push(z.label);if(Array.isArray(z.y))a=a.concat(z.y)}return a.filter(x=>x!=null).join(' ');}
function signals(q){const prompt=stripHtml(q.q),correct=stripHtml((q.o||[])[q.a]||''),all=stripHtml((q.o||[]).join(' ')),vt=flattenVisual(q.v),sig=[];const directWords=/最大|最小|最も大き|最も小さ|上回|下回|多い|少ない|ほぼ同量|割合|順位|合計|適合|非適合|増加|減少|高い|低い|最も適当/;if(directWords.test(correct))sig.push('correct-option-contains-direct-comparison');if(/下表|表に関する|グラフ|図に関する|図表/.test(prompt))sig.push('prompt-points-directly-to-visual');const vn=nums(vt),cn=nums(correct);if(cn.length&&cn.some(n=>vn.includes(n)))sig.push('correct-option-repeats-visual-number');if(/表では|グラフでは|図では/.test(correct))sig.push('correct-option-explicitly-restates-visual');if(q.v&&q.v.kind==='table'&&directWords.test(all))sig.push('table-plus-comparison-options');if(q.v&&['bar','barH'].includes(q.v.kind)&&directWords.test(all))sig.push('bar-plus-comparison-options');return sig;}
function severity(sig){
 if(sig.includes('correct-option-explicitly-restates-visual'))return 'HIGH';
 if(sig.includes('correct-option-repeats-visual-number')&&sig.includes('correct-option-contains-direct-comparison'))return 'HIGH';
 if(sig.includes('correct-option-contains-direct-comparison')&&sig.includes('prompt-points-directly-to-visual')&&(sig.includes('table-plus-comparison-options')||sig.includes('bar-plus-comparison-options')))return 'REVIEW';
 if(sig.length>=2)return 'REVIEW';
 return 'LOW';
}
const rows=bank.filter(q=>q&&q.v).map(q=>{const sig=signals(q);return {id:q.id,subject:q.s,title:q.t,question:stripHtml(q.q),answerIndex:q.a+1,answer:stripHtml(q.o[q.a]),options:(q.o||[]).map(stripHtml),visual:q.v,signals:sig,severity:severity(sig),directVisualDifficulty:q.directVisualDifficulty||null,directVisualReviewed:!!q.directVisualReviewed};});
const high=rows.filter(r=>r.severity==='HIGH');
const review=rows.filter(r=>r.severity==='REVIEW');
const report={generatedAt:new Date().toISOString(),activeQuestions:bank.length,visualQuestions:rows.length,highRisk:high.length,reviewRisk:review.length,rows};
fs.writeFileSync(path.join(root,'direct_visual_answer_post_v54_report_v55.json'),JSON.stringify(report,null,2));
console.log('POST_V54_DIRECT_VISUAL_REPORT active='+bank.length+' visuals='+rows.length+' high='+high.length+' review='+review.length);
for(const r of rows)console.log(['VISUAL',r.id,r.visual.kind,'severity='+r.severity,'signals='+r.signals.join('|'),'answer='+r.answer].join('\t'));
if(bank.length!==199){console.error('FAIL active bank '+bank.length);process.exit(1)}
console.log('PASS post-v54 direct-visual-answer report v55 generated');
