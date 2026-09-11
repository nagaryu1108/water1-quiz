const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js','qbank_distractor_plausibility_v40.js','qbank_semantic_rewrite_gw_v42.js','qbank_semantic_rewrite_th_v42.js','qbank_semantic_rewrite_l_v42.js','qbank_semantic_strengthen_g_v42.js','qbank_semantic_strengthen_w_v42.js','qbank_semantic_strengthen_t_v42.js','qbank_semantic_strengthen_h_v42.js','qbank_semantic_strengthen_l_v42.js','qbank_semantic_polish_v43.js','qbank_semantic_polish_v44.js','qbank_semantic_polish_v45.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const bank=ctx.window.QBANK||[],arc=ctx.window.WATER1_ARCHIVED_QUESTIONS||[];function fail(s){throw new Error(s)}function ok(c,s){if(!c)fail(s)}
ok(bank.length===199,'active bank !=199');ok(arc.length===1&&arc[0].id==='L30','archive invariant failed');
const ABS=/必ず|常に|一切|例外なく|すべて|全て/;const absCue=[],lenCue=[],shortCue=[];
function med4(a){a=[...a].sort((x,y)=>x-y);return(a[1]+a[2])/2;}
for(const x of bank){
  const flags=x.o.map(s=>ABS.test(String(s))),n=flags.filter(Boolean).length;
  if(n===1&&!flags[x.a])absCue.push({id:x.id,choice:flags.findIndex(Boolean)+1,text:x.o[flags.findIndex(Boolean)]});
  const lens=x.o.map(s=>String(s).length),wrong=lens.filter((_,i)=>i!==x.a),med=med4(wrong);
  if(lens[x.a]>=med*1.55&&lens[x.a]-med>=18)lenCue.push({id:x.id,answer:lens[x.a],wrongMedian:med,text:x.o[x.a]});
  const min=Math.min(...wrong),numericDominant=x.o.filter(s=>/\d/.test(String(s))&&String(s).length<=24).length>=4,labelSet=Math.max(...lens)<=24&&med<=18;
  if(!numericDominant&&!labelSet&&min<Math.max(15,med*0.45))shortCue.push({id:x.id,min,wrongMedian:med});
}
const strictC1=[];for(const x of bank){const leads=x.o.map(s=>{const m=String(s).match(/^\s*([^―—–]+)[―—–]/);return m?m[1].trim():null;}).filter(Boolean),counts={};for(const h of leads)counts[h]=(counts[h]||0)+1;for(const [h,n] of Object.entries(counts))if(n>1)strictC1.push({id:x.id,target:h,count:n});}
const DIR=[['増加','減少'],['上昇','低下'],['高い','低い'],['高く','低く'],['多い','少ない'],['大きい','小さい'],['促進','抑制'],['促進','阻害'],['活発','抑制'],['強い','弱い'],['強まる','弱まる'],['供給','消費'],['吸収','放出'],['溶解','沈殿'],['酸化','還元'],['好気','嫌気'],['必要','不要'],['容易','困難'],['有利','不利'],['起こりやすい','起こりにくい']];
function nrm(s){return String(s||'').normalize('NFKC').replace(/[\s\u3000、。,.，．・:：;；!?！？()（）\[\]【】「」『』＝=＋+－−—―–\/／×]/g,'');}function canon(s){s=nrm(s);for(const [a,b] of DIR)s=s.split(a).join('§DIR§').split(b).join('§DIR§');return s.replace(/できない|しない|ではない|ない|不要/g,'§POL§');}function hasInverse(a,b){for(const [u,v] of DIR)if((a.includes(u)&&b.includes(v))||(a.includes(v)&&b.includes(u)))return true;const na=/(できない|しない|ではない|ない|不要)/.test(a),nb=/(できない|しない|ではない|ない|不要)/.test(b);return na!==nb;}function bigrams(s){s=canon(s);if(s.length<2)return s?[s]:[];const a=[];for(let i=0;i<s.length-1;i++)a.push(s.slice(i,i+2));return a;}function dice(a,b){const A=bigrams(a),B=bigrams(b);if(!A.length||!B.length)return 0;const m=new Map();for(const z of A)m.set(z,(m.get(z)||0)+1);let hit=0;for(const z of B){const c=m.get(z)||0;if(c){hit++;m.set(z,c-1)}}return 2*hit/(A.length+B.length);}
const strictC2=[];for(const x of bank)for(let i=0;i<5;i++)for(let j=i+1;j<5;j++)if(hasInverse(x.o[i],x.o[j])){const sim=dice(x.o[i],x.o[j]);if(sim>=0.60)strictC2.push({id:x.id,pair:[i+1,j+1],sim:+sim.toFixed(3),a:x.o[i],b:x.o[j]});}

/* "Magic" in this project means nuclear transmutation disguised as ordinary water-treatment chemistry: one element becomes another without a nuclear/high-energy process. Keep this distinct from merely implausible chemistry. */
const NUCLEAR=/(核分裂|核融合|核反応|放射性壊変|放射性崩壊|中性子照射|粒子加速器|高エネルギー粒子)/;
const EL=[
  ['C','炭素|C(?![a-z])'],['N','窒素|N(?:2)?(?![a-z])'],['P','りん|リン|P(?![a-z])'],['S','硫黄|S(?![a-z])'],
  ['F','ふっ素|フッ素|F(?![a-z])'],['Cl','塩素|Cl'],['Cr','クロム|Cr'],['Mn','マンガン|Mn'],['Fe','鉄|Fe'],['Co','コバルト|Co'],
  ['Ni','ニッケル|Ni'],['Cu','銅|Cu'],['Zn','亜鉛|Zn'],['As','ひ素|ヒ素|As'],['Se','セレン|Se'],['Cd','カドミウム|Cd'],
  ['Hg','水銀|Hg'],['Pb','鉛|Pb'],['B','ほう素|ホウ素|B(?![a-z])'],['Al','アルミニウム|Al'],['Ca','カルシウム|Ca'],['Mg','マグネシウム|Mg']
];
function transmutationEvidence(text){
  const s=String(text||'');if(NUCLEAR.test(s))return null;
  for(const [ka,aa] of EL)for(const [kb,bb] of EL){if(ka===kb)continue;
    const r1=new RegExp('(?:'+aa+')[^。；;]{0,26}(?:を|が|から)[^。；;]{0,18}(?:'+bb+')(?:元素|原子|ガス)?(?:へ|に)[^。；;]{0,12}(?:変換|転換|変化|還元|酸化|生成|なる|する)');
    const r2=new RegExp('(?:'+aa+')[^。；;]{0,20}(?:を|が)[^。；;]{0,15}(?:還元|酸化|分解|処理)[^。；;]{0,15}(?:'+bb+')(?:元素|原子|ガス)?(?:を生成|になる|へ変換)');
    if(r1.test(s)||r2.test(s))return ka+'→'+kb;
  }
  return null;
}
const transmutationHits=[];for(const x of bank){for(const [kind,arr] of [['q',[x.q]],['o',x.o||[]],['e',x.e||[]]])arr.forEach((s,i)=>{const ev=transmutationEvidence(s);if(ev)transmutationHits.push({id:x.id,field:kind+(kind==='q'?'':i+1),evidence:ev,text:s});});}

/* Other impossible/irrelevant distractors are tracked separately; they are not called transmutation. */
const impossibleChem=/P2ガス|F2へ還元|GC[-‐‑–—]?FID[^。]{0,30}硝酸|硝化菌[^。]{0,30}(クロム|Cr)|純窒素[^。]{0,30}Fe|りん元素が生成|りん酸.*ストリッピング/;
const impossibleHits=[];for(const x of bank)if(impossibleChem.test([x.q,...x.o,...x.e].join(' ')))impossibleHits.push(x.id);

console.log('FINAL_ACTIVE',bank.length,'ARCHIVED',arc.map(x=>x.id).join(','));
console.log('FINAL_ABS_CUE',absCue.length,JSON.stringify(absCue));
console.log('FINAL_ANSWER_LENGTH_CUE',lenCue.length,JSON.stringify(lenCue));
console.log('FINAL_SHORT_WRONG_PROSE',shortCue.length,JSON.stringify(shortCue));
console.log('FINAL_STRICT_C1',strictC1.length,JSON.stringify(strictC1));
console.log('FINAL_STRICT_C2',strictC2.length,JSON.stringify(strictC2));
console.log('FINAL_TRANSMUTATION',transmutationHits.length,JSON.stringify(transmutationHits));
console.log('FINAL_IMPOSSIBLE_CHEM',impossibleHits.length,impossibleHits.join(','));
ok(absCue.length===0,'absolute-word giveaway remains');
ok(lenCue.length===0,'answer-length giveaway remains');
ok(shortCue.length===0,'very short prose distractor remains');
ok(strictC1.length===0,'same target repeated in combination choices');
ok(strictC2.length===0,'direct-opposite pair remains');
ok(transmutationHits.length===0,'ordinary chemistry contains element transmutation');
ok(impossibleHits.length===0,'implausible chemistry distractor remains');
console.log('PASS final semantic quality audit v45');
