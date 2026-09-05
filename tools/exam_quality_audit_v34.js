const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const bank=ctx.window.QBANK||[],errs=[];const ok=(c,m)=>{if(!c)errs.push(m)},get=id=>bank.find(x=>x.id===id);
ok(bank.length===200,`bank ${bank.length}`);ok(bank.reduce((n,x)=>n+(Array.isArray(x.o)?x.o.length:0),0)===1000,'1000 choices');
let comboDup=0,termDup=0,formulaLeak=0,undefinedCount=0;
for(const x of bank){
  ok(Array.isArray(x.o)&&x.o.length===5,`${x.id} choices`);ok(Array.isArray(x.e)&&x.e.length===5,`${x.id} explanations`);ok(Number.isInteger(x.a)&&x.a>=0&&x.a<5,`${x.id} answer`);
  if(Array.isArray(x.e))x.e.forEach((e,i)=>{if(/\bundefined\b/.test(String(e||''))){undefinedCount++;ok(false,`${x.id}.e${i+1} undefined`)};ok(/^【(正しい|誤り)】/.test(String(e||'')),`${x.id}.e${i+1} status`)});
  if(Array.isArray(x.o)){
    const leads=x.o.map(v=>{const m=String(v).match(/^\s*([^―—–]+)[―—–]/);return m?m[1].trim():null;}).filter(Boolean),count={};for(const s of leads)count[s]=(count[s]||0)+1;const d=Object.entries(count).filter(([,n])=>n>1);if(d.length){comboDup++;ok(false,`${x.id} repeated combination lead ${JSON.stringify(d)}`)}
  }
  if(Array.isArray(x.terms)){const names=x.terms.map(t=>String(t&&t.name||'').trim()).filter(Boolean);if(new Set(names).size!==names.length){termDup++;ok(false,`${x.id} duplicate term names`)}}
  const pre=[x.q,x.v&&x.v.note].map(v=>String(v||'')).join('\n');if(/添加回収率\s*[=＝]/.test(pre)){formulaLeak++;ok(false,`${x.id} recovery formula leaked before answer`)}
}
ok(undefinedCount===0,`undefined ${undefinedCount}`);ok(comboDup===0,`combo duplicate questions ${comboDup}`);ok(termDup===0,`term duplicate questions ${termDup}`);ok(formulaLeak===0,`formula leaks ${formulaLeak}`);
const g09=get('G09'),g18=get('G18'),h39=get('H39');
ok(g09&&g09.a===0&&/中枢神経/.test(g09.o[0])&&/土呂久/.test(g09.o[4]),'G09 strengthened');
ok(g09&&g09.o.filter(s=>/^水俣病[―—–]/.test(s)).length===1,'G09 no duplicate Minamata lead');
ok(g18&&g18.a===1&&/神通川/.test(g18.o[1])&&/カドミウム/.test(g18.o[1]),'G18 strengthened');
ok(g18&&g18.o.filter(s=>/^阿賀野川[―—–]/.test(s)).length===0,'G18 no duplicate river-as-leading trick');
ok(h39&&h39.a===1,'H39 answer stable');ok(h39&&!/添加回収率\s*[=＝]/.test(String(h39.v&&h39.v.note||'')),'H39 formula removed from visual note');ok(h39&&/添加回収率\s*[=＝]/.test(h39.p)&&/70%/.test(h39.p),'H39 formula taught after answer');
const loader=fs.readFileSync(path.join(root,'qbank_patch_v5.js'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8'),index=fs.readFileSync(path.join(root,'index.html'),'utf8'),enrich=fs.readFileSync(path.join(root,'qbank_enrichment_v7.js'),'utf8'),patch=fs.readFileSync(path.join(root,'qbank_exam_quality_patch_v34.js'),'utf8');
ok(loader.includes('qbank_exam_quality_patch_v34.js?v=125'),'loader quality patch');ok(sw.includes('qbank_exam_quality_patch_v34.js')&&sw.includes('v25-exam-quality'),'service worker quality cache');ok(/var KEY='water1_bank_v3'/.test(index),'history key preserved');ok(/function enrich\(x\)/.test(index)&&/function showExtras\(x\)/.test(enrich),'legacy duplicate source identified');ok(/purgeLegacyExtras/.test(patch)&&/getElementById\('enrichV7'\)/.test(patch),'duplicate UI purge installed');
// Isolated runtime check: legacy wrapper adds #enrichV7, final wrapper must remove it.
let legacy=false,listener=null;const d2={addEventListener:(n,f)=>{if(n==='DOMContentLoaded')listener=f},getElementById:id=>id==='enrichV7'&&legacy?{remove:()=>{legacy=false}}:null};const c2={window:{QBANK:[],showAnswered:()=>{legacy=true}},document:d2,console};c2.window.window=c2.window;c2.window.document=d2;vm.createContext(c2);vm.runInContext(patch,c2,{filename:'qbank_exam_quality_patch_v34.js'});ok(typeof listener==='function','dedupe DOM listener');if(listener){listener();c2.window.showAnswered({},0);ok(legacy===false,'legacy duplicate removed after answered render')}
console.log('BANK',bank.length,'COMBO_DUP',comboDup,'TERM_DUP',termDup,'FORMULA_LEAK',formulaLeak,'UNDEFINED',undefinedCount,'G09',g09&&g09.a+1,'G18',g18&&g18.a+1,'H39',h39&&h39.a+1);if(errs.length){console.error('FAIL exam quality audit\n'+errs.join('\n'));process.exit(1)}console.log('PASS exam realism / duplicate enrichment / formula-leak audit');
