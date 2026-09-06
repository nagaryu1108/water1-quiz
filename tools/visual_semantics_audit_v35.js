const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;vm.createContext(ctx);
for(const f of scripts){const p=path.join(root,f);if(!fs.existsSync(p))throw new Error('missing '+f);vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:f});}
const bank=ctx.window.QBANK||[],errs=[];const ok=(c,m)=>{if(!c)errs.push(m)};
const rows=[];
function inspect(x,slot,v){
  if(!v)return;
  const r={id:x.id,slot,kind:v.kind,title:v.title||'',xLabel:v.xLabel||'',yLabel:v.yLabel||'',unit:v.unit||'',note:v.note||''};rows.push(r);
  ok(['line','multiLine','bar','barH','table'].includes(v.kind),`${x.id}.${slot}: unsupported kind ${v.kind}`);
  if(v.kind==='line'){
    ok(Array.isArray(v.x)&&Array.isArray(v.y)&&v.x.length>=2&&v.x.length===v.y.length,`${x.id}.${slot}: line data invalid`);
    ok(String(v.xLabel||'').trim().length>0,`${x.id}.${slot}: xLabel missing`);
    ok(String(v.yLabel||'').trim().length>0,`${x.id}.${slot}: yLabel missing`);
  }
  if(v.kind==='multiLine'){
    ok(Array.isArray(v.x)&&v.x.length>=2,`${x.id}.${slot}: multiLine x invalid`);
    ok(Array.isArray(v.series)&&v.series.length>=2,`${x.id}.${slot}: multiLine series invalid`);
    (v.series||[]).forEach((s,i)=>{ok(String(s.label||'').trim().length>0,`${x.id}.${slot}: series ${i+1} label missing`);ok(Array.isArray(s.y)&&s.y.length===v.x.length,`${x.id}.${slot}: series ${i+1} length mismatch`)});
    ok(String(v.xLabel||'').trim().length>0,`${x.id}.${slot}: xLabel missing`);
    ok(String(v.yLabel||'').trim().length>0,`${x.id}.${slot}: yLabel missing`);
  }
  if(v.kind==='bar'||v.kind==='barH'){
    ok(Array.isArray(v.labels)&&Array.isArray(v.values)&&v.labels.length>=2&&v.labels.length===v.values.length,`${x.id}.${slot}: bar data invalid`);
    ok(String(v.unit||v.xLabel||v.yLabel||'').trim().length>0,`${x.id}.${slot}: unit/axis label missing`);
  }
  if(v.kind==='table'){
    ok(Array.isArray(v.headers)&&v.headers.length>=2,`${x.id}.${slot}: table headers invalid`);
    ok(Array.isArray(v.rows)&&v.rows.length>=1,`${x.id}.${slot}: table rows invalid`);
    (v.rows||[]).forEach((r,i)=>ok(Array.isArray(r)&&r.length===v.headers.length,`${x.id}.${slot}: row ${i+1} column mismatch`));
  }
}
for(const x of bank){inspect(x,'v',x.v);inspect(x,'av',x.av)}
const problem=rows.filter(r=>r.slot==='v'),post=rows.filter(r=>r.slot==='av');
ok(problem.length===21,`problem visuals ${problem.length}`);ok(post.length===2,`post visuals ${post.length}`);
for(const r of rows)console.log(`VIS\t${r.id}\t${r.slot}\t${r.kind}\ttitle=${r.title||'-'}\tx=${r.xLabel||'-'}\ty=${r.yLabel||'-'}\tunit=${r.unit||'-'}\tnote=${r.note||'-'}`);
console.log('VISUAL_COUNTS',JSON.stringify(rows.reduce((a,r)=>(a[r.kind]=(a[r.kind]||0)+1,a),{})),'PROBLEM',problem.length,'POST',post.length);
if(errs.length){console.error('FAIL VISUAL SEMANTICS\n'+errs.join('\n'));process.exit(1)}
console.log('PASS full visual data semantics audit');
