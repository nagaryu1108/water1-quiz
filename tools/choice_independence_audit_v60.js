const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),errs=[],ok=(c,m)=>{if(!c)errs.push(m)};
const files=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js','qbank_distractor_plausibility_v40.js','qbank_semantic_rewrite_gw_v42.js','qbank_semantic_rewrite_th_v42.js','qbank_semantic_rewrite_l_v42.js','qbank_semantic_strengthen_g_v42.js','qbank_semantic_strengthen_w_v42.js','qbank_semantic_strengthen_t_v42.js','qbank_semantic_strengthen_h_v42.js','qbank_semantic_strengthen_l_v42.js','qbank_semantic_polish_v43.js','qbank_semantic_polish_v44.js','qbank_semantic_polish_v45.js','qbank_exam_difficulty_stage1_v47.js','qbank_recent_exam_upgrade_v47.js','qbank_recent_exam_audit_finalize_v47.js','qbank_exam_difficulty_stage2_v48.js','qbank_exam_difficulty_stage3_v49.js','qbank_exam_difficulty_stage3_fix_v49.js','qbank_exam_difficulty_stage4_v50.js','qbank_exam_difficulty_stage5_v51.js','qbank_learning_visuals_v52.js','visual_aid_audit_v53.js','qbank_learning_visuals_v53.js','qbank_learning_visuals_v53_mobilefix.js','qbank_direct_visual_difficulty_v54.js','qbank_direct_visual_quality_v55.js','qbank_legal_fillin_v56.js','qbank_chem_typography_v59.js','qbank_choice_independence_v60.js'];
const noop=()=>{};const document={readyState:'loading',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{},head:{appendChild:noop},createElement:()=>({style:{},dataset:{},setAttribute:noop,appendChild:noop})};
const ctx={window:{QBANK:[]},document,console,setTimeout:noop,clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;vm.createContext(ctx);
for(const f of files)vm.runInContext(read(f),ctx,{filename:f});
const bank=ctx.window.QBANK||[],arc=ctx.window.WATER1_ARCHIVED_QUESTIONS||[];
ok(bank.length===199,'active bank changed: '+bank.length);ok(arc.length===1&&arc[0].id==='L30','archive invariant changed');
ok(ctx.window.WATER1_CHOICE_INDEPENDENCE&&ctx.window.WATER1_CHOICE_INDEPENDENCE.version==='v60','v60 metadata missing');
const meta=ctx.window.WATER1_CHOICE_INDEPENDENCE;
const rewritten=['W20','W32','W39','T34','T41'];
ok(meta&&JSON.stringify(meta.rewritten)===JSON.stringify(rewritten),'v60 rewritten ID list mismatch');
for(const id of rewritten){
  const q=bank.find(x=>x.id===id);
  ok(q&&q.choiceIndependenceVersion==='v60',id+' v60 marker missing');
  ok(q&&Array.isArray(q.o)&&q.o.length===5&&Array.isArray(q.e)&&q.e.length===5,id+' 5-choice/5-explanation invariant');
}
const expectedAnswers={W20:0,W32:1,W39:1,T34:1,T41:1};
for(const id of rewritten){const q=bank.find(x=>x.id===id);ok(q&&q.a===expectedAnswers[id],id+' answer index changed unexpectedly');}
const w=bank.find(q=>q.id==='W39');

ok(w&&!w.o[0].includes('4.0')&&!w.o[0].includes('3.0')&&!w.o[0].includes('2.0'),'W39 choice 1 still reveals threshold triplet');
ok(w&&!w.o[1].includes('1.0 mg/L'),'W39 answer still uses competing false threshold');
ok(w&&w.o[1].includes('日間平均値は用いない'),'W39 answer must test evaluation method independently');
ok(w&&w.p.includes('生物1=4.0')&&w.p.includes('生物3=2.0'),'W39 explanation must still teach current thresholds');
const w20=bank.find(q=>q.id==='W20'),w32=bank.find(q=>q.id==='W32'),t34=bank.find(q=>q.id==='T34'),t41=bank.find(q=>q.id==='T41');
ok(w20&&w20.o.filter(x=>x.includes('上乗せ')&&x.includes('横出し')).length===1,'W20 still contains a direct swapped-name pair');
ok(w32&&w32.o.filter(x=>x.includes('流量比例合成')).length===1,'W32 still duplicates the flow-proportional answer fact');
ok(t34&&t34.o[t34.a].indexOf('正リン酸')<0,'T34 keyed distractor still directly negates the digestion-to-orthophosphate fact');
ok(t41&&t41.o[t41.a].indexOf('硝化')<0,'T41 keyed distractor still directly opposes the nitrification oxygen-demand fact');

const review=JSON.parse(read('choice_independence_review_v60.json'));
ok(review&&review.version==='v60','manual review version missing');
ok(Array.isArray(review.candidates)&&review.candidates.length===12,'manual review must cover W39 plus all 11 heuristic candidates');
const reviewMap=new Map(review.candidates.map(x=>[x.id,x.disposition]));
for(const id of rewritten)ok(reviewMap.get(id)==='rewritten',id+' manual-review disposition must be rewritten');
['G01','G29','W11','G04','H09','H06','T30'].forEach(id=>ok(/^retain_/.test(reviewMap.get(id)||''),id+' retained-candidate rationale missing'));

function norm(s){return String(s||'').toLowerCase().replace(/[０-９]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0xFEE0)).replace(/\d+(?:\.\d+)?/g,'#').replace(/mg\/l|ng\/l|g\/l|mol|％|%|以上|以下|未満|超|約|である|となる|する|される|もの|こと/g,'').replace(/[\s、。・，,（）()「」『』：:＝=＋+－−→\/]/g,'');}
function bigrams(s){const a=[];for(let i=0;i<s.length-1;i++)a.push(s.slice(i,i+2));return a;}
function dice(a,b){const A=bigrams(norm(a)),B=bigrams(norm(b));if(!A.length||!B.length)return 0;const m=new Map();A.forEach(x=>m.set(x,(m.get(x)||0)+1));let hit=0;B.forEach(x=>{const n=m.get(x)||0;if(n){hit++;m.set(x,n-1);}});return 2*hit/(A.length+B.length);}
function nums(s){return (String(s).match(/\d+(?:\.\d+)?/g)||[]).join(',');}
function anchors(a,b){const keys=['基準値','日間平均','年間平均','排水基準','環境基準','生物1','生物2','生物3','SRT','HRT','SVI','pH','DO','BOD','COD','TOC','純度','回収率','達成率','除去率','負荷量','濃度','温度','時間','流量','mol','mg/L','ng/L','％','%'];return keys.filter(k=>String(a).includes(k)&&String(b).includes(k));}
const currentCandidates=[];
for(const q of bank){
  const keyed=q.o[q.a],pairs=[];
  for(let i=0;i<5;i++)if(i!==q.a){const sim=dice(keyed,q.o[i]),an=anchors(keyed,q.o[i]),na=nums(keyed),nb=nums(q.o[i]);pairs.push({i,sim,an,numeric:!!na&&!!nb&&na!==nb});}
  pairs.sort((a,b)=>b.sim-a.sim);const top=pairs[0],second=pairs[1];
  if((top.sim>=0.44&&top.sim-second.sim>=0.16)||(top.numeric&&top.an.length>=1&&top.sim>=0.30&&top.sim-second.sim>=0.10))currentCandidates.push(q.id);
}
for(const id of currentCandidates)ok(reviewMap.has(id),'new unreviewed same-fact-duel candidate: '+id);
for(const id of rewritten)ok(!currentCandidates.includes(id),'rewritten question still triggers same-fact-duel heuristic: '+id);
const loader=read('qbank_patch_v5.js'),sw=read('sw.js'),ui=read('ui_polish_v46.js'),index=read('index.html'),wf=read('.github/workflows/canonical-audit.yml');
ok(loader.includes('qbank_choice_independence_v60.js?v=158'),'loader missing v60 patch');
ok(loader.indexOf('qbank_choice_independence_v60.js')>loader.indexOf('qbank_chem_typography_v59.js'),'v60 must run after v59');
ok(loader.indexOf('qbank_choice_independence_v60.js')<loader.indexOf('ui_polish_v46.js'),'v60 must run before UI scripts');
ok(sw.includes("'./qbank_choice_independence_v60.js'")&&sw.includes('choice-independence-v60'),'service worker missing v60');
ok(ui.includes("var RELEASE='v60'"),'UI release is not v60');
ok(index.includes("KEY='water1_bank_v3'"),'storage key changed');
ok(wf.includes('Run v60 choice independence audit'),'workflow missing v60 audit');
ok(wf.includes("'choice_independence_review_v60.json'"),'workflow watch path missing v60 manual review');
if(errs.length){console.error('FAIL v60 choice independence audit\n'+errs.join('\n'));process.exit(1)}
console.log('PASS v60 five-question choice-independence rewrite + 12-candidate manual review + bank invariants');