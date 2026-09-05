const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const bank=ctx.window.QBANK||[];
const combo=[],formula=[],termDup=[];
for(const x of bank){
  if(Array.isArray(x.o)){
    const leads=x.o.map(v=>{const s=String(v);const m=s.match(/^\s*([^―—–]+)[―—–]/);return m?m[1].trim():null;}).filter(Boolean);
    const cnt={};for(const s of leads)cnt[s]=(cnt[s]||0)+1;const dup=Object.entries(cnt).filter(([,n])=>n>1);
    if(dup.length)combo.push({id:x.id,dup,choices:x.o});
  }
  const fields=[['q',x.q],['v.note',x.v&&x.v.note],['v.title',x.v&&x.v.title]];
  for(const [name,v] of fields){const s=String(v||'');if(/(?:添加回収率|回収率|除去率|負荷量|SVI|F\/M|滞留時間|濃度)\s*[=＝]/.test(s)||/[（(][^）)]*[−+\-×÷\/][^）)]*[）)]\s*[/÷×]\s*[^\s、。]+\s*[×xX]\s*100/.test(s))formula.push({id:x.id,field:name,text:s});}
  if(Array.isArray(x.terms)){
    const names=x.terms.map(t=>String(t&&t.name||'').trim()).filter(Boolean),seen=new Set(),dups=[];
    for(const n of names){if(seen.has(n)&&!dups.includes(n))dups.push(n);seen.add(n);}if(dups.length)termDup.push({id:x.id,dups});
  }
}
const index=fs.readFileSync(path.join(root,'index.html'),'utf8'),enrich=fs.readFileSync(path.join(root,'qbank_enrichment_v7.js'),'utf8'),patch=fs.readFileSync(path.join(root,'qbank_exam_quality_patch_v34.js'),'utf8');
console.log('BANK',bank.length);
console.log('COMBO_DUP_COUNT',combo.length);combo.forEach(x=>console.log('COMBO',x.id,JSON.stringify(x.dup),JSON.stringify(x.choices)));
console.log('FORMULA_LEAK_COUNT',formula.length);formula.forEach(x=>console.log('FORMULA',x.id,x.field,JSON.stringify(x.text)));
console.log('TERM_DUP_COUNT',termDup.length);termDup.forEach(x=>console.log('TERM_DUP',x.id,x.dups.join('|')));
console.log('LEGACY_DUPLICATE_SOURCE',/function enrich\(x\)/.test(index)&&/function showExtras\(x\)/.test(enrich),'DEDUPE_PATCH',/purgeLegacyExtras/.test(patch));
