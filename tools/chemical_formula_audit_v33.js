const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_chem_v7.js'];
const noop=()=>{};const document={readyState:'loading',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{}};
const ctx={window:{QBANK:[]},document,console,setTimeout:noop,clearTimeout:noop,MutationObserver:function(){this.observe=noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;vm.createContext(ctx);
for(const f of scripts){const p=path.join(root,f);if(!fs.existsSync(p))throw new Error('missing '+f);vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:f});}
const bank=ctx.window.QBANK,chem=ctx.window.water1ChemHTML,errors=[],formulaFields=[];const ok=(c,m)=>{if(!c)errors.push(m)};
ok(bank.length===200,'bank must remain 200 questions');ok(typeof chem==='function','chemical formatter not installed');
function stringsOf(x){const a=[],add=(p,v)=>{if(typeof v==='string')a.push([p,v]);};add('t',x.t);add('q',x.q);add('p',x.p);add('src',x.src);(x.o||[]).forEach((v,i)=>add('o'+(i+1),v));(x.e||[]).forEach((v,i)=>add('e'+(i+1),v));(x.rxn||[]).forEach((v,i)=>add('rxn'+(i+1),v));(x.terms||[]).forEach((v,i)=>{if(v){add('term'+(i+1)+'.name',v.name);add('term'+(i+1)+'.desc',v.desc);}});return a;}
const chemHint=/\b(?:NH4|NO2|NO3|N2|O2|H2O|H2S|SO2|CO2|CH4|CH2O|CH3COO|HCN|CN|CNO|OCl|CaF2|Al\(OH\)3|CrO4|Cr2O7|Cr\(OH\)3|Fe\(OH\)3|MgNH4PO4|PO4|Hg|AsH3|SeH2|H2Se|B\(OH\)[34])\b|\^[0-9]*[+−-]|[A-Za-z)]\^0/g;
for(const x of bank){for(const [field,s] of stringsOf(x)){if(/@@(?:SUP|SUB)|@@|<\/?su(?:p|b)>/i.test(s))errors.push(`${x.id}.${field}: internal/HTML marker leaked into stored UI text`);if(/\bundefined\b/.test(s))errors.push(`${x.id}.${field}: literal undefined leaked into UI text`);if(chemHint.test(s))formulaFields.push({key:`${x.id}.${field}`,text:s});chemHint.lastIndex=0;}}
const h22=bank.find(x=>x.id==='H22');ok(h22&&Array.isArray(h22.e)&&/H2Se/.test(h22.e[1]||''),'H22 must use H2Se for hydrogen selenide');ok(h22&&!/SeH2/.test((h22.e||[]).join(' ')),'H22 must not contain incorrect SeH2 formula');
const cases=[
 ['CH3COO^- + H^+ → CH4 + CO2','CH<sub>3</sub>COO<sup>−</sup> + H<sup>+</sup> → CH<sub>4</sub> + CO<sub>2</sub>'],
 ['NH4^+ + 1.5 O2 → NO2^− + 2 H^+ + H2O','NH<sub>4</sub><sup>+</sup> + 1.5 O<sub>2</sub> → NO<sub>2</sub><sup>−</sup> + 2 H<sup>+</sup> + H<sub>2</sub>O'],
 ['CrO4^2− + 8 H^+ + 3 e^− → Cr^3+ + 4 H2O','CrO<sub>4</sub><sup>2−</sup> + 8 H<sup>+</sup> + 3 e<sup>−</sup> → Cr<sup>3+</sup> + 4 H<sub>2</sub>O'],
 ['Al^3+ + 3 H2O ⇄ Al(OH)3↓ + 3 H^+','Al<sup>3+</sup> + 3 H<sub>2</sub>O ⇄ Al(OH)<sub>3</sub>↓ + 3 H<sup>+</sup>'],
 ['Fe(CN)6^4−','Fe(CN)<sub>6</sub><sup>4−</sup>'],
 ['H2PO4^- / CO3^2− / SO4^2− / Ca^2+','H<sub>2</sub>PO<sub>4</sub><sup>−</sup> / CO<sub>3</sub><sup>2−</sup> / SO<sub>4</sub><sup>2−</sup> / Ca<sup>2+</sup>'],
 ['Hg^2+ + 2 e− → Hg^0↑','Hg<sup>2+</sup> + 2 e<sup>−</sup> → Hg<sup>0</sup>↑'],
 ['HCN ⇄ H+ + CN−','HCN ⇄ H<sup>+</sup> + CN<sup>−</sup>'],
 ['Ca^2+ + 2 F− → CaF2↓','Ca<sup>2+</sup> + 2 F<sup>−</sup> → CaF<sub>2</sub>↓'],
 ['Cr2O7^2- + 14 H+ + 6 e^- → 2 Cr^3+ + 7 H2O','Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> + 14 H<sup>+</sup> + 6 e<sup>−</sup> → 2 Cr<sup>3+</sup> + 7 H<sub>2</sub>O'],
 ['AsH3 + O2 → CO2','AsH<sub>3</sub> + O<sub>2</sub> → CO<sub>2</sub>']
];
const rawLegacy=/\b(?:H|OH|CN|CNO|OCl|Cl|F|e)[+−-](?=\s|\/|→|⇄|$)|\^0/g;
for(const [src,want] of cases){const got=chem(src);ok(got===want,`formatter regression: ${src} => ${got} (want ${want})`);ok(!/@@|§§|\^[0-9]*[+−-]/.test(got),`formatter leaked marker: ${src} => ${got}`);ok(!rawLegacy.test(got),`legacy ionic notation remained: ${got}`);rawLegacy.lastIndex=0;}
let rxQuestions=0,rxLines=0;
for(const x of bank){if(!Array.isArray(x.rxn)||!x.rxn.length)continue;rxQuestions++;for(let i=0;i<x.rxn.length;i++){rxLines++;const s=x.rxn[i],rendered=chem(s);ok(!/@@|§§|\^[0-9]*[+−-]/.test(rendered),`${x.id}.rxn${i+1}: marker remains after render: ${rendered}`);ok(!rawLegacy.test(rendered),`${x.id}.rxn${i+1}: unformatted ion/oxidation state: ${rendered}`);rawLegacy.lastIndex=0;ok(!/<sub>\s*<\/sub>|<sup>\s*<\/sup>/.test(rendered),`${x.id}.rxn${i+1}: empty sub/sup`);console.log(`RXN\t${x.id}\t${i+1}\t${s}\t=>\t${rendered}`);}}
ok(rxQuestions===23,`reaction-bearing questions ${rxQuestions}, expected 23`);
const code=fs.readFileSync(path.join(root,'qbank_chem_v7.js'),'utf8');ok(!code.includes("'@@SUP'+holds.length+'@@'"),'unsafe @@SUPn@@ placeholder must not return');ok(code.includes("'§§['+holds.length+']§§'"),'safe placeholder missing');
const unique=new Map();for(const r of formulaFields)if(!unique.has(r.key))unique.set(r.key,r.text);
console.log('FORMULA_BEARING_FIELD_COUNT',formulaFields.length,'UNIQUE_FIELDS',unique.size,'REACTION_QUESTIONS',rxQuestions,'REACTION_LINES',rxLines,'FORMAT_CASES',cases.length);
for(const [key,text] of [...unique.entries()].sort())console.log(`FORMULA\t${key}\t${text.replace(/\n/g,' ⏎ ')}`);
if(errors.length){console.error('FAIL chemical formula audit\n'+errors.join('\n'));process.exit(1);}console.log('PASS full-bank chemical formula rendering audit');
