const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const bank=ctx.window.QBANK||[];

function norm(s){return String(s||'').normalize('NFKC').toLowerCase()
 .replace(/(?:最も|もっとも)?(?:適当|不適当|正しい|誤っている|誤り)(?:なもの|もの)?はどれか[。．]?/g,'')
 .replace(/として/g,'').replace(/に関する記述/g,'')
 .replace(/[0-9０-９]+(?:\.[0-9０-９]+)?/g,'#')
 .replace(/(?:mg|kg|g|µg|μg|ml|l|m3|m³|m2|m²|cm|mm|ppm|ppb|%|日|時間|h|s)(?=\b|[・／/）)])/gi,'U')
 .replace(/[\s\u3000、。,.，．・:：;；!?！？()（）\[\]【】「」『』＝=＋+－−—―–\/／×]/g,'');}
function grams(s,n=3){s=norm(s);const out=[];if(s.length<n)return s?[s]:[];for(let i=0;i<=s.length-n;i++)out.push(s.slice(i,i+n));return out;}
function dice(a,b,n=3){const A=grams(a,n),B=grams(b,n);if(!A.length&&!B.length)return 1;if(!A.length||!B.length)return 0;const m=new Map();for(const x of A)m.set(x,(m.get(x)||0)+1);let hit=0;for(const x of B){const c=m.get(x)||0;if(c){hit++;m.set(x,c-1)}}return 2*hit/(A.length+B.length);}
function choiceSim(A,B){A=(A||[]).map(norm);B=(B||[]).map(norm);if(A.length!==5||B.length!==5)return 0;let best=0;const used=Array(5).fill(false);function rec(i,sum){if(i===5){best=Math.max(best,sum/5);return;}for(let j=0;j<5;j++)if(!used[j]){used[j]=true;rec(i+1,sum+dice(A[i],B[j],2));used[j]=false;}}rec(0,0);return best;}
function pairScore(a,b){const ts=dice(a.t,b.t,2),qs=dice(a.q,b.q,3),cs=choiceSim(a.o,b.o);const sameSubject=a.s===b.s?1:0;const overall=.28*ts+.27*qs+.40*cs+.05*sameSubject;return {ts,qs,cs,overall};}
const pairs=[];for(let i=0;i<bank.length;i++)for(let j=i+1;j<bank.length;j++){const a=bank[i],b=bank[j],s=pairScore(a,b);if(s.overall>=.50||(s.ts>=.62&&s.cs>=.50))pairs.push({a,b,...s});}
pairs.sort((x,y)=>y.overall-x.overall);
const high=pairs.filter(x=>x.overall>=.68&&x.cs>=.56&&x.ts>=.45);
const medium=pairs.filter(x=>x.overall>=.58&&x.overall<.68&&x.cs>=.45&&x.ts>=.40);
function clusters(list){const p=new Map(bank.map(x=>[x.id,x.id]));function find(x){while(p.get(x)!==x){p.set(x,p.get(p.get(x)));x=p.get(x)}return x}function union(a,b){a=find(a);b=find(b);if(a!==b)p.set(b,a)}for(const x of list)union(x.a.id,x.b.id);const g=new Map();for(const x of bank){const r=find(x.id);if(r!==x.id||list.some(y=>y.a.id===x.id||y.b.id===x.id)){if(!g.has(r))g.set(r,[]);g.get(r).push(x.id)}}return [...g.values()].filter(x=>x.length>1);}

const ABS=/(必ず|絶対|常に|すべて|全て|一切|全く|完全に|だけ|のみ|しか|不要|必要はない|影響しない|関係しない|ことはない|対象にならない|用いることができない|してはならない|同一の制度|ゼロとなる)/;
function cue(s){const m=String(s||'').match(new RegExp(ABS.source,'g'));return m?m.length:0;}
const giveaway=[];
for(const x of bank){if(!Array.isArray(x.o)||x.o.length!==5)continue;const c=x.o.map(cue),ans=x.a,askWrong=/(誤っている|誤り|不適当)/.test(String(x.q||''));let risk=0,reason='';
 if(askWrong){const others=c.filter((_,i)=>i!==ans);if(c[ans]>=1&&others.filter(v=>v>0).length<=1){risk=2;reason='wrong-answer-only absolute cue'}else if(c[ans]>=2&&others.filter(v=>v>0).length<=2){risk=1;reason='wrong answer has stronger absolute cues';}}
 else {const others=c.filter((_,i)=>i!==ans);const n=others.filter(v=>v>0).length;if(c[ans]===0&&n>=3){risk=2;reason='3+ distractors carry absolute cues'}else if(c[ans]===0&&n===2){risk=1;reason='2 distractors carry absolute cues';}}
 if(risk)giveaway.push({x,c,risk,reason});
}
giveaway.sort((a,b)=>b.risk-a.risk||b.c.reduce((p,q)=>p+q,0)-a.c.reduce((p,q)=>p+q,0));

const subj={};for(const x of bank)subj[x.s]=(subj[x.s]||0)+1;
console.log('BANK',bank.length,'SUBJECTS',JSON.stringify(subj));
console.log('SEMANTIC_HIGH_PAIRS',high.length,'HIGH_CLUSTERS',clusters(high).length,'MEDIUM_PAIRS',medium.length);
console.log('GIVEAWAY_STRONG',giveaway.filter(x=>x.risk===2).length,'GIVEAWAY_WATCH',giveaway.filter(x=>x.risk===1).length);
console.log('--- TOP NEAR-DUPLICATE PAIRS ---');
for(const x of high.slice(0,40))console.log('HIGH',x.a.id,x.b.id,'score='+x.overall.toFixed(3),'topic='+x.ts.toFixed(3),'stem='+x.qs.toFixed(3),'choices='+x.cs.toFixed(3),'|',x.a.t,'<>',x.b.t);
console.log('--- MEDIUM SIMILARITY PAIRS (top 30) ---');
for(const x of medium.slice(0,30))console.log('MED',x.a.id,x.b.id,'score='+x.overall.toFixed(3),'topic='+x.ts.toFixed(3),'stem='+x.qs.toFixed(3),'choices='+x.cs.toFixed(3),'|',x.a.t,'<>',x.b.t);
console.log('--- GIVEAWAY RISK ---');
for(const g of giveaway.slice(0,60))console.log(g.risk===2?'GIVEAWAY':'WATCH',g.x.id,g.reason,'cues='+JSON.stringify(g.c),'answer='+(g.x.a+1),'|',g.x.t);
console.log('NOTE This is a screening report, not an automatic deletion verdict. Same-topic questions are acceptable when they test materially different skills; flagged pairs require human review.');
