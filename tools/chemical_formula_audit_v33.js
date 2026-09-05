const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=[
  'qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js',
  'qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js',
  'qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js',
  'qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js',
  'qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js',
  'qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js',
  'qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js',
  'qbank_chem_v7.js'
];
const noop=()=>{};
const document={readyState:'loading',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{}};
const ctx={window:{QBANK:[]},document,console,setTimeout:noop,clearTimeout:noop,MutationObserver:function(){this.observe=noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};
ctx.window.window=ctx.window;ctx.window.document=document;vm.createContext(ctx);
for(const f of scripts){const p=path.join(root,f);if(!fs.existsSync(p))throw new Error('missing '+f);vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:f});}
const bank=ctx.window.QBANK,chem=ctx.window.water1ChemHTML,errors=[],inventory=[];
const ok=(c,m)=>{if(!c)errors.push(m)};
ok(bank.length===200,'bank must remain 200 questions');
ok(typeof chem==='function','chemical formatter not installed');

function stringsOf(x){
  const a=[];const add=(p,v)=>{if(typeof v==='string')a.push([p,v]);};
  add('t',x.t);add('q',x.q);add('p',x.p);add('src',x.src);
  (x.o||[]).forEach((v,i)=>add('o'+(i+1),v));
  (x.e||[]).forEach((v,i)=>add('e'+(i+1),v));
  (x.rxn||[]).forEach((v,i)=>add('rxn'+(i+1),v));
  (x.terms||[]).forEach((v,i)=>{if(v){add('term'+(i+1)+'.name',v.name);add('term'+(i+1)+'.desc',v.desc);}});
  return a;
}
function candidateTokens(s){
  const out=new Set();
  const pats=[
    /\b[A-Z][A-Za-z0-9()]*\d+(?:\^[0-9]*[+−-])?/g,
    /\b(?:[A-Z][a-z]?|e)\^[0-9]*[+−-]/g,
    /\b(?:CN|HCN|CNO|OCl|OH|Hg|AsH3|H2S|HS|CaF2|CrO4|Cr2O7|NH4|NO2|NO3|PO4|SO4|CO2|CH4|CH3COO)\b/g
  ];
  for(const re of pats){let m;while((m=re.exec(s)))out.add(m[0]);}
  return [...out];
}
for(const x of bank){
  for(const [field,s] of stringsOf(x)){
    if(/@@(?:SUP|SUB)|@@|<\/?su(?:p|b)>/i.test(s))errors.push(`${x.id}.${field}: internal/HTML marker leaked into stored UI text`);
    const toks=candidateTokens(s);if(toks.length)inventory.push({id:x.id,field,tokens:toks});
  }
}

const cases=[
  ['CH3COO^- + H^+ → CH4 + CO2','CH<sub>3</sub>COO<sup>−</sup> + H<sup>+</sup> → CH<sub>4</sub> + CO<sub>2</sub>'],
  ['NH4^+ + 1.5 O2 → NO2^− + 2 H^+ + H2O','NH<sub>4</sub><sup>+</sup> + 1.5 O<sub>2</sub> → NO<sub>2</sub><sup>−</sup> + 2 H<sup>+</sup> + H<sub>2</sub>O'],
  ['CrO4^2− + 8 H^+ + 3 e^− → Cr^3+ + 4 H2O','CrO<sub>4</sub><sup>2−</sup> + 8 H<sup>+</sup> + 3 e<sup>−</sup> → Cr<sup>3+</sup> + 4 H<sub>2</sub>O'],
  ['Al^3+ + 3 H2O ⇄ Al(OH)3↓ + 3 H^+','Al<sup>3+</sup> + 3 H<sub>2</sub>O ⇄ Al(OH)<sub>3</sub>↓ + 3 H<sup>+</sup>'],
  ['Fe(CN)6^4−','Fe(CN)<sub>6</sub><sup>4−</sup>'],
  ['H2PO4^- / CO3^2− / SO4^2− / Ca^2+','H<sub>2</sub>PO<sub>4</sub><sup>−</sup> / CO<sub>3</sub><sup>2−</sup> / SO<sub>4</sub><sup>2−</sup> / Ca<sup>2+</sup>'],
  ['AsH3 + O2 → CO2','AsH<sub>3</sub> + O<sub>2</sub> → CO<sub>2</sub>']
];
for(const [src,want] of cases){const got=chem(src);ok(got===want,`formatter regression: ${src} => ${got} (want ${want})`);ok(!/@@|§§|\^[0-9]*[+−-]/.test(got),`formatter leaked marker: ${src} => ${got}`);}

let rxQuestions=0,rxLines=0;
for(const x of bank){if(!Array.isArray(x.rxn)||!x.rxn.length)continue;rxQuestions++;for(let i=0;i<x.rxn.length;i++){rxLines++;const s=x.rxn[i],rendered=chem(s);ok(!/@@|§§|\^[0-9]*[+−-]/.test(rendered),`${x.id}.rxn${i+1}: marker remains after render: ${rendered}`);ok(!/<sub>\s*<\/sub>|<sup>\s*<\/sup>/.test(rendered),`${x.id}.rxn${i+1}: empty sub/sup`);console.log(`RXN\t${x.id}\t${i+1}\t${s}\t=>\t${rendered}`);}}
ok(rxQuestions===23,`reaction-bearing questions ${rxQuestions}, expected 23`);

const oldChem=fs.readFileSync(path.join(root,'qbank_chem_v7.js'),'utf8');
ok(!oldChem.includes("'@@SUP'+holds.length+'@@'"),'unsafe @@SUPn@@ placeholder must not return');
ok(oldChem.includes("'§§['+holds.length+']§§'"),'safe charge placeholder missing');

const byQuestion=new Map();for(const r of inventory){if(!byQuestion.has(r.id))byQuestion.set(r.id,new Set());r.tokens.forEach(t=>byQuestion.get(r.id).add(t));}
console.log('CHEMISTRY_INVENTORY_QUESTION_COUNT',byQuestion.size);
for(const [id,toks] of [...byQuestion.entries()].sort())console.log(`CHEM\t${id}\t${[...toks].sort().join(',')}`);
console.log('CHEMISTRY_FIELD_RECORDS',inventory.length,'REACTION_QUESTIONS',rxQuestions,'REACTION_LINES',rxLines,'FORMAT_CASES',cases.length);
if(errors.length){console.error('FAIL chemical formula audit\n'+errors.join('\n'));process.exit(1);}
console.log('PASS full-bank chemical formula rendering audit');
