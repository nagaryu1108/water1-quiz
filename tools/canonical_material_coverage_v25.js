const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_detail_quality_fix_v23.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const bank=ctx.window.QBANK;
const topics={
REFINERY:/製油|石油精製|サワーウォーター|API油水分離|APIオイル|脱硫排水/,
BOD_COD_ANALYSIS:/BOD5|BOD.*希釈|CODMn|CODCr|過マンガン酸|二クロム酸|植種|DO差|BOD測定|COD測定/,
TN_TP_ANALYSIS:/全窒素|全りん|全リン|モリブデン青|ペルオキソ二硫酸|紫外線吸光.*窒素|硝酸イオン.*吸光/,
SLUDGE_DEWATERING_INCINERATION:/汚泥.*脱水|脱水ケーキ|フィルタープレス|ベルトプレス|遠心脱水|焼却|流動焼却|含水率/,
MERCURY:/水銀|Hg|還元気化|アルキル水銀|メチル水銀/,
ANAEROBIC_UASB:/嫌気性処理|嫌気処理|UASB|メタン発酵|グラニュール|嫌気性生物/,
NITRIFICATION_DENITRIFICATION:/硝化|脱窒|アナモックス|硝酸.*還元|アンモニア.*酸化|窒素除去/,
HEAVY_METAL_COMPLEX:/EDTA|キレート錯体|錯形成|重金属錯体|キレート剤|錯体形成|置換法/,
CYANIDE:/シアン|CN−|CN-|アルカリ塩素|鉄シアノ|全シアン|紺青/,
ARSENIC:/ひ素|砒素|As\(III\)|As\(V\)|As3|As5/,
BIOLOGICAL_PHOSPHORUS:/生物脱りん|生物学的りん|PAO|りん放出|リン放出|過剰摂取|嫌気好気.*りん/,
FLUORIDE_BORON:/ふっ素|フッ素|ほう素|ホウ素|CaF2|N-メチルグルカミン/,
FILTRATION:/急速ろ過|砂ろ過|粒状ろ材|逆洗|ろ過速度|均等係数|有効径|損失水頭/,
ION_EXCHANGE:/イオン交換|交換容量|N-メチルグルカミン型樹脂|再生.*樹脂|破過.*樹脂/,
MEMBRANE:/膜分離|逆浸透|RO膜|\bRO\b|\bMF\b|\bUF\b|\bNF\b|MBR|電気透析|阻止率/
};
function flat(x,part){
 if(part==='main')return [x.t,x.q,x.p,x.d,(x.terms||[]).map(z=>`${z&&z.name||''} ${z&&z.desc||''}`).join(' ')].filter(Boolean).join('｜');
 if(part==='choices')return (x.o||[]).join('｜');
 if(part==='expl')return (x.e||[]).join('｜')+'｜'+(x.rxn||[]).join('｜');
 return flat(x,'main')+'｜'+flat(x,'choices')+'｜'+flat(x,'expl');
}
function short(s){return String(s||'').replace(/\s+/g,' ').slice(0,220)}
console.log('BANK',bank.length);
for(const [k,re] of Object.entries(topics)){
 const rows=[];
 for(const x of bank){
  const main=re.test(flat(x,'main')), ch=re.test(flat(x,'choices')), ex=re.test(flat(x,'expl'));
  if(main||ch||ex)rows.push({id:x.id,s:x.s,t:x.t,main,ch,ex,q:short(x.q),p:short(x.p)});
 }
 console.log(`TOPIC\t${k}\tMATCH=${rows.length}\tMAIN=${rows.filter(r=>r.main).length}\tCHOICE=${rows.filter(r=>r.ch).length}\tEXPL=${rows.filter(r=>r.ex).length}`);
 for(const r of rows)console.log(`HIT\t${k}\t${r.id}\t${r.s}\tmain=${+r.main}\tchoice=${+r.ch}\texpl=${+r.ex}\t${r.t}\tQ=${r.q}\tP=${r.p}`);
}
