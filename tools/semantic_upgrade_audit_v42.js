const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const review=JSON.parse(fs.readFileSync(path.join(root,'tools/full_bank_semantic_review_v41.json'),'utf8'));
const rewriteFiles=['qbank_semantic_rewrite_gw_v42.js','qbank_semantic_rewrite_th_v42.js','qbank_semantic_rewrite_l_v42.js'];
const strengthenFiles=['qbank_semantic_strengthen_g_v42.js','qbank_semantic_strengthen_w_v42.js','qbank_semantic_strengthen_t_v42.js','qbank_semantic_strengthen_h_v42.js','qbank_semantic_strengthen_l_v42.js'];
function fail(s){throw new Error(s)} function ok(c,s){if(!c)fail(s)}
function extract(files,fnNames){
  const out=[];
  for(const f of files){
    const s=fs.readFileSync(path.join(root,f),'utf8');
    const re=new RegExp("(?:"+fnNames.join("|")+")\\(\\s*(['\"])([GWTLH]\\d{2})\\1\\s*,","g");
    let m; while((m=re.exec(s))) out.push({id:m[2],file:f});
  }
  return out;
}
const rw=extract(rewriteFiles,['put']), st=extract(strengthenFiles,['u']);
const expectedRw=review.questions.filter(x=>x.status==='REWRITE').map(x=>x.id).sort();
const expectedSt=review.questions.filter(x=>x.status==='STRENGTHEN').map(x=>x.id).sort();
const gotRw=rw.map(x=>x.id).sort(), gotSt=st.map(x=>x.id).sort();
ok(gotRw.length===49,'rewrite declarations must be 49, got '+gotRw.length);
ok(gotSt.length===117,'strengthen declarations must be 117, got '+gotSt.length);
ok(new Set(gotRw).size===49,'duplicate rewrite IDs');
ok(new Set(gotSt).size===117,'duplicate strengthen IDs');
ok(JSON.stringify(gotRw)===JSON.stringify(expectedRw),'rewrite IDs differ from v41 review');
ok(JSON.stringify(gotSt)===JSON.stringify(expectedSt),'strengthen IDs differ from v41 review');
ok(!gotRw.some(id=>gotSt.includes(id)),'rewrite/strengthen overlap exists');

const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js','qbank_distractor_plausibility_v40.js',...rewriteFiles,...strengthenFiles];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const bank=ctx.window.QBANK||[],arc=ctx.window.WATER1_ARCHIVED_QUESTIONS||[];
ok(bank.length===199,'active bank must remain 199, got '+bank.length);
ok(arc.length===1&&arc[0].id==='L30','L30 archive invariant failed');
const all=[...bank,...arc], map=new Map(all.map(x=>[x.id,x]));
ok(all.length===200&&map.size===200,'stable 200 IDs not preserved');
for(const x of all){
  ok(Array.isArray(x.o)&&x.o.length===5,x.id+' choices !=5');
  ok(Array.isArray(x.e)&&x.e.length===5,x.id+' explanations !=5');
  ok(Number.isInteger(x.a)&&x.a>=0&&x.a<5,x.id+' answer invalid');
  ok(new Set(x.o).size===5,x.id+' duplicate choices');
  ok(new Set(x.e).size===5,x.id+' duplicate explanations');
  ok(!JSON.stringify(x).includes('undefined'),x.id+' contains undefined');
}
for(const id of expectedRw) ok(map.get(id)&&map.get(id).semanticUpgradeVersion==='v42-rewrite',id+' rewrite marker missing');
for(const id of expectedSt) ok(map.get(id)&&map.get(id).semanticStrengthenVersion==='v42',id+' strengthen marker missing');

const magic=/P2ガス|F2へ還元|GC[-‐‑–—]?FID[^。]{0,30}硝酸|硝化菌[^。]{0,30}(クロム|Cr)|純窒素[^。]{0,30}Fe|Cr[^。]{0,30}N2へ/;
const magicHits=[];
for(const x of bank){const z=[x.q,...x.o,...x.e].join(' ');if(magic.test(z))magicHits.push(x.id)}
ok(magicHits.length===0,'known magic distractor patterns remain: '+magicHits.join(','));

const ABS=/必ず|常に|一切|例外なく|すべて|全て/;
const absCue=[],lengthCue=[],shortCue=[];
for(const id of expectedSt){
 const x=map.get(id), flags=x.o.map(s=>ABS.test(String(s)));
 const n=flags.filter(Boolean).length;
 if(n===1 && !flags[x.a]) absCue.push({id,choice:flags.findIndex(Boolean)+1,text:x.o[flags.findIndex(Boolean)]});
 const lens=x.o.map(s=>String(s).length), wrong=lens.filter((_,i)=>i!==x.a).sort((a,b)=>a-b), med=(wrong[1]+wrong[2])/2;
 if(lens[x.a]>=med*1.55 && lens[x.a]-med>=18) lengthCue.push({id,answer:lens[x.a],wrongMedian:med});
 const min=Math.min(...wrong); if(min<Math.max(15,med*0.45)) shortCue.push({id,min,wrongMedian:med});
}
console.log('V42 STATIC rewrite='+gotRw.length+' strengthen='+gotSt.length);
console.log('V42 RUNTIME active='+bank.length+' archived='+arc.length+' stable='+all.length);
console.log('ABS_CUE_COUNT',absCue.length,JSON.stringify(absCue));
console.log('ANSWER_LENGTH_CUE_COUNT',lengthCue.length,JSON.stringify(lengthCue));
console.log('VERY_SHORT_WRONG_COUNT',shortCue.length,JSON.stringify(shortCue));
console.log('PASS semantic upgrade v42 structural/runtime coverage');
