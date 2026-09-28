const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict'),cp=require('child_process');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
function load(include){
 const noop=()=>{},document={readyState:'loading',addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({style:{},dataset:{},setAttribute:noop,appendChild:noop}),head:{appendChild:noop}};
 const c={document,console,setTimeout:noop,setInterval:noop,addEventListener:noop};c.window=c;vm.createContext(c);
 const files=['qbank_v3.js','qbank_extra_v4.js',...Array.from(read('qbank_patch_v5.js').matchAll(/src="\.\/([^"?]+)/g),m=>m[1])];
 for(const f of files){if(['qbank_review_v62.js','qbank_review_v63.js','ui_polish_v46.js','study_workflow_v57.js','compact_menu_v58.js'].includes(f)||(!include&&f==='qbank_exam_practice_v61.js'))continue;vm.runInContext(read(f),c,{filename:f});}return c;
}
const before=load(false),after=load(true),b=after.QBANK,m=after.WATER1_EXAM_PRACTICE_V61,r=JSON.parse(read('exam_practice_review_v61.json'));
const plain=x=>JSON.parse(JSON.stringify(x));
assert.equal(b.length,199);assert.equal(new Set(b.map(q=>q.id)).size,199);
assert.deepEqual(plain(after.WATER1_ARCHIVED_QUESTIONS),plain(before.WATER1_ARCHIVED_QUESTIONS));
assert.deepEqual(plain(b.map(q=>q.id)),plain(before.QBANK.map(q=>q.id)));
const oldById=new Map(before.QBANK.map(q=>[q.id,q])),counts=[0,0,0,0,0],duplicates=new Set();
for(const q of b){
 const old=oldById.get(q.id),order=m.orders[q.id]||[0,1,2,3,4],edit=r.questions[q.id];
 assert.equal(q.o.length,5,q.id);assert.equal(q.e.length,5,q.id);assert.equal(new Set(q.o).size,5,q.id);assert.equal(new Set(q.e).size,5,q.id);assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<5,q.id);counts[q.a]++;
 assert.equal(q.s,old.s);assert.equal(q.t,old.t);assert.deepEqual(plain(q.v||null),plain(old.v||null),q.id+' visual unchanged');
 const src=edit||old;
 for(let i=0;i<5;i++){assert.equal(q.o[i],src.o[order[i]],q.id+' option alignment');assert.equal(q.e[i],src.e[order[i]],q.id+' explanation alignment');assert.ok(!duplicates.has(q.e[i]),q.id+' copied explanation');duplicates.add(q.e[i]);}
 assert.equal(q.o[q.a],src.o[src.a],q.id+' keyed content unchanged by permutation');
 if(edit){assert.ok(q.e.every(e=>/実務/.test(e)&&/試験|原理|関連/.test(e)),q.id+' missing pedagogical content');assert.equal(q.examPracticeVersion,'v61');
  const expectedTag=/誤っている/.test(q.q)?'【誤り】':'【正しい】';assert.ok(q.e[q.a].startsWith(expectedTag),q.id+' question/answer polarity');
 } else {assert.equal(q.q,old.q);assert.equal(q.p,old.p);}
}
assert.deepEqual(counts,[40,40,40,40,39]);
for(const [prefix,target] of Object.entries(m.targets)){const n=[0,0,0,0,0];b.filter(q=>q.id[0]===prefix).forEach(q=>n[q.a]++);assert.deepEqual(n,plain(target));}
// Every old selected option survives the migration as the same text, not merely an index.
for(let selected=0;selected<5;selected++){
 const state={hist:{},total:995,correct:199,mode:'weak',reviewFlags:{W31:true},customField:{keep:1}};
 before.QBANK.forEach(q=>state.hist[q.id]={attempts:5,correct:1,wrong:4,lastSel:selected,dueAt:1790000000000});
 const z=m.migrate(state);assert.equal(state.bankContentVersion,undefined,'migration mutates input');
 assert.equal(z.total,995);assert.equal(z.correct,199);assert.equal(z.mode,'weak');assert.deepEqual(plain(z.reviewFlags),state.reviewFlags);assert.deepEqual(plain(z.customField),state.customField);
 for(const q of before.QBANK){const h=z.hist[q.id];assert.equal(h.attempts,5);assert.equal(h.correct,1);assert.equal(h.wrong,4);assert.equal(h.dueAt,1790000000000);
  if(r.questions[q.id]){assert.equal(h.lastSel,null);assert.equal(h.previousContentSelection.index,selected);}
  else assert.equal(b.find(v=>v.id===q.id).o[h.lastSel],q.o[selected],q.id+' past selection shifted');
 }
 assert.deepEqual(plain(m.migrate(z)),plain(z),'migration is not idempotent');
 for(const q of before.QBANK){const z2=m.migrate({hist:{},current:q.id,currentSel:selected,currentAnswered:true});
  if(r.questions[q.id]){assert.equal(z2.currentSel,null);assert.equal(z2.currentAnswered,false);}
  else{assert.equal(z2.currentAnswered,true);assert.equal(b.find(v=>v.id===q.id).o[z2.currentSel],q.o[selected]);}
 }
}
assert.equal(m.migrate({hist:{L30:{attempts:2,lastSel:3}},current:null}).hist.L30.lastSel,3,'archive history changed');
assert.deepEqual(plain(m.migrate({hist:{x:null,y:{lastSel:-1}}}).hist),{x:null,y:{lastSel:-1}});
// UI baseline: only release metadata, script cache keys and the storage loader may differ.
const uiBase=JSON.parse(read('ui_baseline_v61.json')),hash=s=>require('crypto').createHash('sha256').update(s).digest('hex');
const stripScripts=s=>s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
assert.equal(hash(stripScripts(read('index.html'))),uiBase.htmlCss,'HTML/CSS changed');
const uiNorm=s=>s.replace(/var (RELEASE|RELEASE_DATE|BUILD_ID)='[^']*';/g,'');
assert.equal(hash(uiNorm(read('ui_polish_v46.js'))),uiBase.uiCodeWithoutReleaseMetadata,'UI code changed');
for(const f of ['study_workflow_v57.js','compact_menu_v58.js'])assert.equal(hash(read(f)),uiBase[f],f+' changed');
const newCore=read('index.html');
const coreNorm=s=>s.replace(/function load\(\)\{.*?function save\(\)/,'function save()').replace(/qbank_patch_v5.js\?v=\d+/g,'qbank_patch_v5.js').replace(/sw.js\?v=\d+/g,'sw.js');
assert.equal(hash(coreNorm(newCore)),uiBase.coreWithoutLoaderOrCacheKeys,'render/pick/navigation code changed');
assert.ok(read('sw.js').includes("'./qbank_exam_practice_v61.js'"));
assert.ok(read('index.html').includes("KEY='water1_bank_v3'"));
assert.equal(Math.round(Math.exp(-50/(5e7/1e6))*100),37);
// Generated artifact cannot drift away from the reviewed content.
const compiled=read('qbank_exam_practice_v61.js');cp.execFileSync(process.execPath,['tools/build_exam_practice_v61.js'],{cwd:root});assert.equal(read('qbank_exam_practice_v61.js'),compiled);
console.log(JSON.stringify({result:'PASS',active:b.length,rewritten:m.rewritten.length,reordered:Object.keys(m.orders).length,answers:counts,historyCases:199*5,ui:'unchanged except version metadata',scope:'structure and migration for all 199; content review for 12'},null,2));
