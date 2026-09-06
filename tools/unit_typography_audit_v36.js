const fs=require('fs');
const vm=require('vm');
function run(path){vm.runInThisContext(fs.readFileSync(path,'utf8'),{filename:path});}
global.window={QBANK:[]};
run('qbank_gap_batch7_v7.js');
run('qbank_unit_typography_v1.js');
const t27=window.QBANK.find(q=>q.id==='T27');
if(!t27)throw new Error('T27 missing');
if(!t27.q.includes('800 m³/日'))throw new Error('T27 m³ normalization failed: '+t27.q);
if(/\bm3\b/.test(t27.q))throw new Error('ASCII m3 remains in T27');
const f=window.water1FixUnitTypography;
if(typeof f!=='function')throw new Error('formatter export missing');
const cases=[
 ['1 m3/日','1 m³/日'],['2 m2','2 m²'],['3 cm3','3 cm³'],['4 cm2','4 cm²'],
 ['5 mm3','5 mm³'],['6 mm2','6 mm²'],['7 Nm3/h','7 Nm³/h'],['8 Nm2','8 Nm²']
];
for(const [a,b] of cases){const got=f(a);if(got!==b)throw new Error(`${a} -> ${got}, expected ${b}`)}
console.log('PASS unit typography audit: T27 + 8 exponent-unit regression cases');
