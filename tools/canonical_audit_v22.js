const fs=require('fs');const vm=require('vm');const path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;
vm.createContext(ctx);
for(const f of scripts){const p=path.join(root,f);if(!fs.existsSync(p))throw new Error('missing '+f);vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:f});}
vm.runInContext(fs.readFileSync(path.join(root,'qbank_canonical_gap_audit_v21.js'),'utf8'),ctx,{filename:'qbank_canonical_gap_audit_v21.js'});
const a=ctx.window.WATER1_CANONICAL_GAP_AUDIT;if(!a)throw new Error('audit missing');
console.log('BANK',a.bankQuestions);console.log('TOP15');for(const [i,r] of a.top15.entries())console.log(`${i+1}\t${r.canonical}\tyears>=${r.confirmedYearsMin}\tquestions>=${r.confirmedQuestionsMin}\tbank=${r.bankQuestions}\tratio=${r.gapRatio}\tscore=${r.score}\tids=${r.ids.join(',')}`);
console.log('CATALOG');for(const x of ctx.window.QBANK){const terms=(x.terms||[]).map(z=>z&&z.name).filter(Boolean).join('/');console.log(`CAT\t${x.id}\t${x.s||''}\t${x.t||''}\t${String(x.q||'').replace(/\s+/g,' ')}\tTERMS=${terms}`)}
console.log('ALLROWS_JSON='+JSON.stringify(a.rows));
