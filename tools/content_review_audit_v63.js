const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict'),cp=require('child_process');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),plain=x=>JSON.parse(JSON.stringify(x));
const {load:loadV62}=require('./content_review_audit_v62');
const old=loadV62('v62');
const now=loadV62('v62');
vm.runInContext(read('qbank_review_v63.js'),now,{filename:'qbank_review_v63.js'});
const b=now.QBANK,m=now.WATER1_REVIEW_V63;
const changed=['G16','G23','G24','G26','G28','G32','G33','H01','H14','H16','H22','H28','H33','H37','H40'];
const sourceTargets=[
'G01','G02','G10','G16','G23','G24','G26','G28','G29','G32','G33',
'W09','W17','W20','W22','G08','G14','G17','G31','W03','W19',
'T17','T28','T29','T32','T42','T43',
'H01','H03','H06','H14','H15','H16','H19','H21','H22','H28','H30','H33','H35','H36','H37','H38','H40'
];
const by=(ctx,id)=>ctx.QBANK.find(q=>q.id===id);
assert.equal(b.length,199);assert.equal(new Set(b.map(q=>q.id)).size,199);
assert.deepEqual(plain(b.map(q=>q.id)),plain(old.QBANK.map(q=>q.id)));
assert.deepEqual(plain(now.WATER1_ARCHIVED_QUESTIONS),plain(old.WATER1_ARCHIVED_QUESTIONS));
assert.deepEqual(plain(m.changed),changed);assert.deepEqual(plain(m.stale),changed);
const counts=[0,0,0,0,0],actual=[];
for(const q of b){
 const p=by(old,q.id);
 assert.equal(q.o.length,5,q.id);assert.equal(q.e.length,5,q.id);
 assert.equal(new Set(q.o).size,5,q.id+' duplicate option');assert.equal(new Set(q.e).size,5,q.id+' duplicate explanation');
 assert.equal(q.a,p.a,q.id+' answer index changed');counts[q.a]++;
 assert.equal(q.s,p.s,q.id+' subject changed');assert.equal(q.t,p.t,q.id+' topic changed');
 assert.deepEqual(plain(q.v||null),plain(p.v||null),q.id+' visual changed');
 if(JSON.stringify(q)!==JSON.stringify(p))actual.push(q.id);
}
assert.deepEqual(counts,[40,40,40,40,39]);
assert.deepEqual(actual.sort(),changed.slice().sort());
for(const id of changed){
 const q=by(now,id),p=by(old,id);
 assert.equal(q.reviewV63,'primary-source+distractor',id);
 assert.equal(q.a,p.a,id+' correct position moved');
 assert.ok(q.q.length>20,id+' weak stem');
 assert.ok(q.p.length>20,id+' weak core');
 assert.match(q.src,/一次資料照合/,id+' missing source marker');
 assert.ok(q.e[q.a].startsWith('【正しい】'),id+' correct explanation label');
 q.e.forEach((e,i)=>{if(i!==q.a)assert.ok(e.startsWith('【誤り】'),id+' wrong explanation '+(i+1));});
 assert.ok(q.o.every(o=>o.length>=28),id+' still contains a too-short giveaway');
 assert.ok(q.e.every(e=>e.length>=42),id+' explanation too short');
}
// Review ledger must cover exactly the declared 44 final-bank questions.
const ledger=read('review_primary_sources_v63.md');
const rows=Array.from(ledger.matchAll(/^\| ([GWTHL]\d\d) \|/gm),x=>x[1]);
assert.equal(rows.length,sourceTargets.length,'source-review row count');
assert.deepEqual(rows.slice().sort(),sourceTargets.slice().sort(),'source-review target mismatch');
assert.match(ledger,/199問×5肢すべてが一次資料で完全照合済み、とはまだ宣言しない/);
// v62 -> v63 history: all 995 old selections, stats/due/bookmarks/unknowns preserved.
for(let selected=0;selected<5;selected++){
 const s={bankContentVersion:'v62',hist:{},current:null,currentAnswered:false,currentSel:null,total:995,correct:401,mode:'weak',reviewFlags:{G16:true,W31:true},bookmarks:{H01:true},unknown:{keep:1}};
 old.QBANK.forEach(q=>s.hist[q.id]={attempts:7,correct:3,wrong:4,lastSel:selected,dueAt:1900000000000,custom:'keep'});
 const before=JSON.stringify(s),z=m.migrate(s);
 assert.equal(JSON.stringify(s),before,'migration mutated input');
 assert.equal(z.bankContentVersion,'v63');assert.equal(z.total,995);assert.equal(z.correct,401);assert.equal(z.mode,'weak');
 assert.deepEqual(plain(z.reviewFlags),s.reviewFlags);assert.deepEqual(plain(z.bookmarks),s.bookmarks);assert.deepEqual(plain(z.unknown),s.unknown);
 for(const q of old.QBANK){
  const h=z.hist[q.id];assert.equal(h.attempts,7);assert.equal(h.correct,3);assert.equal(h.wrong,4);assert.equal(h.dueAt,1900000000000);assert.equal(h.custom,'keep');
  if(changed.includes(q.id)){assert.equal(h.lastSel,null,q.id);assert.equal(h.previousV62Selection.index,selected,q.id);}
  else{assert.equal(h.lastSel,selected,q.id);assert.equal(by(now,q.id).o[h.lastSel],q.o[selected],q.id+' selected option shifted');}
  const cur=m.migrate({...s,current:q.id,currentAnswered:true,currentSel:selected});
  if(changed.includes(q.id)){assert.equal(cur.currentAnswered,false,q.id);assert.equal(cur.currentSel,null,q.id);}
  else{assert.equal(cur.currentAnswered,true,q.id);assert.equal(cur.currentSel,selected,q.id);}
 }
 assert.deepEqual(plain(m.migrate(z)),plain(z),'v63 migration not idempotent');
}
assert.ok(read('qbank_patch_v5.js').includes('qbank_review_v63.js?v=161'));
assert.ok(read('sw.js').includes("'./qbank_review_v63.js'"));
assert.match(read('ui_polish_v46.js'),/var RELEASE='v63'/);
assert.match(read('index.html'),/qbank_patch_v5\.js\?v=75/);
assert.match(read('index.html'),/sw\.js\?v=73/);
// All prior v62 structure/history/UI assertions must continue to pass.
cp.execFileSync(process.execPath,['tools/content_review_audit_v62.js'],{cwd:root,stdio:'pipe'});
console.log(JSON.stringify({
 result:'PASS',active:b.length,changed:changed.length,sourceReviewedQuestions:sourceTargets.length,sourceReviewedChoices:sourceTargets.length*5,
 answers:counts,historyCases:199*5,ui:'unchanged except release metadata/cache keys',
 limitation:'This proves regression properties and documented review coverage, not statistical exam equivalence.'
},null,2));
