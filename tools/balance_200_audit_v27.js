const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_detail_quality_fix_v23.js'];
const noop=()=>{}; const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);
for(const f of scripts) vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const bank=ctx.window.QBANK;
const subjects={}; for(const x of bank) subjects[x.s]=(subjects[x.s]||0)+1;
const visual=bank.filter(x=>x.v).map(x=>x.id);
const calcRe=/(計算|求め|最も近い|mg\/L|kg\/(?:m3|kg)|m3\/日|m²|cm\/s|eq\/L|濃縮倍数|阻止率|含水率|SRT|SVI|BOD.*負荷|滴定量|希釈倍率|物質量|ブロー率|負荷量L=|L=aQ|酸素要求量)/;
const calc=bank.filter(x=>calcRe.test([x.t,x.q].filter(Boolean).join(' '))).map(x=>x.id);
const qv=new Set([...visual,...calc]);
function dscore(x){const s=[x.t,x.q,x.p].filter(Boolean).join(' ');let z=0;if(x.v)z+=2;if(calcRe.test([x.t,x.q].filter(Boolean).join(' ')))z+=2;if(/組合せ|複合|工程別|フロー|前処理|干渉|化学形態|物質収支|維持管理|比較/.test(s))z+=1;if(/誤っている|不適当/.test(x.q||''))z+=0.5;if((x.terms||[]).length>=2)z+=0.5;return z;}
const diff={basic:[],standard:[],advanced:[]};for(const x of bank){const z=dscore(x);if(z>=3.5)diff.advanced.push(x.id);else if(z>=1.5)diff.standard.push(x.id);else diff.basic.push(x.id);}
console.log('BANK',bank.length);
console.log('SUBJECTS',JSON.stringify(subjects));
console.log('VISUAL',visual.length,(100*visual.length/bank.length).toFixed(1)+'%',visual.join(','));
console.log('CALC_PROXY',calc.length,(100*calc.length/bank.length).toFixed(1)+'%');
console.log('QUANT_OR_VISUAL',qv.size,(100*qv.size/bank.length).toFixed(1)+'%');
console.log('DIFFICULTY_PROXY',JSON.stringify({basic:diff.basic.length,standard:diff.standard.length,advanced:diff.advanced.length}),JSON.stringify({basic:(100*diff.basic.length/bank.length).toFixed(1),standard:(100*diff.standard.length/bank.length).toFixed(1),advanced:(100*diff.advanced.length/bank.length).toFixed(1)}));
for(const s of Object.keys(subjects)){
 const arr=bank.filter(x=>x.s===s); const aq=arr.filter(x=>qv.has(x.id)).length; const av=arr.filter(x=>x.v).length; const ad=arr.filter(x=>dscore(x)>=3.5).length;
 console.log('SUBJECT_DETAIL',s,'N='+arr.length,'QV='+aq,'V='+av,'ADV='+ad);
}
const target=200, remain=target-bank.length; console.log('REMAIN_TO_200',remain);
const equal40=Object.fromEntries(Object.keys(subjects).map(s=>[s,40-(subjects[s]||0)])); console.log('DELTA_TO_40',JSON.stringify(equal40));
