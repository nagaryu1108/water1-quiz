const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const bank=ctx.window.QBANK||[];
fs.writeFileSync('choice_logic_bank_v38.json',JSON.stringify(bank.map(x=>({id:x.id,s:x.s,t:x.t,q:x.q,o:x.o,a:x.a,p:x.p,d:x.d,terms:(x.terms||[]).map(z=>z&&z.name).filter(Boolean)})),null,2));
function norm(s){return String(s||'').normalize('NFKC').toLowerCase().replace(/(?:最も|もっとも)?(?:適当|不適当|正しい|誤っている|誤り)(?:なもの|もの)?はどれか[。．]?/g,'').replace(/として/g,'').replace(/に関する記述/g,'').replace(/[0-9０-９]+(?:\.[0-9０-９]+)?/g,'#').replace(/(?:mg|kg|g|µg|μg|ml|l|m3|m³|m2|m²|cm|mm|ppm|ppb|%|日|時間|h|s)(?=\b|[・／/）)])/gi,'U').replace(/[\s\u3000、。,.，．・:：;；!?！？()（）\[\]【】「」『』＝=＋+－−—―–\/／×]/g,'');}
function prof(s,n=2){s=norm(s);const m=new Map(),len=Math.max(0,s.length-n+1);if(!len&&s){m.set(s,1);return {m,len:1}}for(let i=0;i<len;i++){const g=s.slice(i,i+n);m.set(g,(m.get(g)||0)+1)}return {m,len};}
function diceP(A,B){if(!A.len&&!B.len)return 1;if(!A.len||!B.len)return 0;let small=A.m,big=B.m;if(small.size>big.size){small=B.m;big=A.m}let hit=0;for(const [g,c] of small)hit+=Math.min(c,big.get(g)||0);return 2*hit/(A.len+B.len);}
function dice(a,b,n=2){return diceP(prof(a,n),prof(b,n));}
function lcsLen(a,b){a=norm(a);b=norm(b);if(!a||!b)return 0;let prev=new Uint16Array(b.length+1),best=0;for(let i=1;i<=a.length;i++){const cur=new Uint16Array(b.length+1);for(let j=1;j<=b.length;j++)if(a[i-1]===b[j-1]){cur[j]=prev[j-1]+1;if(cur[j]>best)best=cur[j]}prev=cur}return best;}
function dashHead(s){const parts=String(s||'').split(/[―—–－]/).map(x=>norm(x)).filter(Boolean);return parts.length>=2?parts[0]:'';}
const predicateNoise=/(必ず|絶対|常に|すべて|全て|一切|全く|完全に|だけ|のみ|しか|不要|必要|適当|不適当|正しい|誤り|誤って|である|となる|なる|される|する|できる|できない|しない|ない|高い|低い|多い|少ない|大きい|小さい|増加|減少|上昇|低下|促進|抑制|活発|弱ま|強ま|容易|困難|有利|不利|起こりやすい|起こりにくい)/g;
function core(s){return norm(String(s||'').replace(predicateNoise,''));}
const targetPairs=[];
for(const x of bank){if(!Array.isArray(x.o)||x.o.length!==5)continue;const heads=x.o.map(dashHead);for(let i=0;i<5;i++)for(let j=i+1;j<5;j++){
 let reason='',score=0;const h=heads[i];if(h&&h.length>=2&&h===heads[j]&&heads.filter(z=>z===h).length===2){reason='same dash-head target';score=1;}
 if(!reason){const c=dice(core(x.o[i]),core(x.o[j]),2),l=lcsLen(x.o[i],x.o[j]);const third=Math.max(...x.o.map((z,k)=>k===i||k===j?0:Math.max(dice(core(x.o[i]),core(z),2),dice(core(x.o[j]),core(z),2))));if((c>=.72||l>=10)&&third<.58){reason='two choices share a distinctive target/core';score=Math.max(c,Math.min(1,l/14));}}
 if(reason)targetPairs.push({id:x.id,i:i+1,j:j+1,reason,score,topic:x.t,a:x.o[i],b:x.o[j]});
}}
const oppPairs=[['増加','減少'],['上昇','低下'],['高く','低く'],['高い','低い'],['多い','少ない'],['大きい','小さい'],['促進','抑制'],['促進','阻害'],['活発','抑え'],['活発','抑制'],['強ま','弱ま'],['強い','弱い'],['供給','消費'],['生成','分解'],['吸収','放出'],['溶解','沈殿'],['酸化','還元'],['好気','嫌気'],['必要','不要'],['必要である','必要はない'],['関係する','関係しない'],['影響する','影響しない'],['起こりやす','起こりにく'],['しやす','しにく'],['容易','困難'],['有利','不利'],['増える','減る'],['高まる','低下する']];
function oppEvidence(a,b){for(const [u,v] of oppPairs)if((a.includes(u)&&b.includes(v))||(a.includes(v)&&b.includes(u)))return u+' <> '+v;const na=/(ない|しない|できない|不要|無関係)/.test(a),nb=/(ない|しない|できない|不要|無関係)/.test(b);if(na!==nb){const sa=String(a).replace(/ない|しない|できない|不要|無関係/g,''),sb=String(b).replace(/ない|しない|できない|不要|無関係/g,'');if(dice(sa,sb,2)>=.68)return 'affirmative <> negative';}return '';}
function canonOpp(s){s=String(s||'');for(const [u,v] of oppPairs){s=s.split(u).join('§DIR§');s=s.split(v).join('§DIR§')}return s.replace(/ない|しない|できない|不要|無関係/g,'§POL§');}
const opposite=[];
for(const x of bank){if(!Array.isArray(x.o)||x.o.length!==5)continue;for(let i=0;i<5;i++)for(let j=i+1;j<5;j++){const ev=oppEvidence(x.o[i],x.o[j]);if(!ev)continue;const sim=dice(canonOpp(x.o[i]),canonOpp(x.o[j]),2),l=lcsLen(x.o[i],x.o[j]);if(sim>=.46||l>=8)opposite.push({id:x.id,i:i+1,j:j+1,ev,sim,l,topic:x.t,a:x.o[i],b:x.o[j]});}}
function skill(x){const s=[x.t,x.q,x.p].join(' ');if(/計算|算出|求め|必要量|負荷量|収支|濃縮倍数|回収率|希釈|当量/.test(s))return 'CALC';if(/図|グラフ|表|データ|曲線|分布/.test(s))return 'DATA';if(/分析|測定|検定|前処理|採水|保存|検出|定量|ICP|GC|HPLC|原子吸光|吸光光度/.test(s))return 'ANALYSIS';if(/法|基準|届出|命令|環境基準|排水基準|特定施設|管理者/.test(s))return 'LAW';if(/処理|除去|酸化|還元|沈殿|凝集|吸着|ろ過|脱水|曝気|硝化|脱窒|消化/.test(s))return 'PROCESS';if(/原因|影響|関係|発生|成層|貧酸素|富栄養|毒性|健康/.test(s))return 'CAUSE';if(/説明|定義|意味|概念/.test(s))return 'DEFINITION';return 'GENERAL';}
const prep=bank.map(x=>({x,t:prof(x.t,2),q:prof(x.q,3),p:prof(x.p||'',3),c:prof((x.o||[])[x.a]||'',3),skill:skill(x)}));
const dup=[];for(let i=0;i<prep.length;i++)for(let j=i+1;j<prep.length;j++){const A=prep[i],B=prep[j];const ts=diceP(A.t,B.t),qs=diceP(A.q,B.q),ps=diceP(A.p,B.p),cs=diceP(A.c,B.c),sameSkill=A.skill===B.skill;const overall=.20*ts+.12*qs+.40*ps+.28*cs+(sameSkill?.05:0);if((overall>=.54&&(ps>=.36||cs>=.46)&&(ts>=.20||qs>=.30))||(sameSkill&&ts>=.48&&ps>=.42)||(sameSkill&&ps>=.62&&cs>=.34))dup.push({a:A.x,b:B.x,skillA:A.skill,skillB:B.skill,ts,qs,ps,cs,overall});}
dup.sort((a,b)=>b.overall-a.overall);
function uniqQ(list){return [...new Set(list.map(x=>x.id))];}
console.log('BANK',bank.length);
console.log('CRITERION1_TARGET_TWO_CHOICE_QUESTIONS',uniqQ(targetPairs).length,'PAIRS',targetPairs.length);
for(const r of targetPairs.sort((a,b)=>b.score-a.score))console.log('C1',r.id,`${r.i}-${r.j}`,'score='+r.score.toFixed(3),r.reason,'|',r.topic,'|',r.a,'<>',r.b);
console.log('CRITERION2_OPPOSITE_TWO_CHOICE_QUESTIONS',uniqQ(opposite).length,'PAIRS',opposite.length);
for(const r of opposite.sort((a,b)=>b.sim-a.sim||b.l-a.l))console.log('C2',r.id,`${r.i}-${r.j}`,'sim='+r.sim.toFixed(3),'lcs='+r.l,'evidence='+r.ev,'|',r.topic,'|',r.a,'<>',r.b);
console.log('CRITERION3_CROSS_QUESTION_SAME_JUDGMENT_PAIRS',dup.length);
for(const r of dup.slice(0,200))console.log('C3',r.a.id,r.b.id,'score='+r.overall.toFixed(3),'topic='+r.ts.toFixed(3),'stem='+r.qs.toFixed(3),'core='+r.ps.toFixed(3),'answer='+r.cs.toFixed(3),'skill='+r.skillA+'/'+r.skillB,'|',r.a.t,'<>',r.b.t,'|CORE',r.a.p,'<>',r.b.p);
console.log('NOTE v38 intentionally ignores absolute-word giveaway counts. C1/C2/C3 are screening candidates for human review under the three user-defined criteria, not automatic deletion verdicts.');
