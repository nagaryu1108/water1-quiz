const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),plain=x=>JSON.parse(JSON.stringify(x));
function load(version='v62'){
 const noop=()=>{},document={readyState:'loading',addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({style:{},dataset:{},setAttribute:noop,appendChild:noop}),head:{appendChild:noop}};
 const c={document,console,setTimeout:noop,setInterval:noop,addEventListener:noop};c.window=c;vm.createContext(c);
 for(const f of ['qbank_v3.js','qbank_extra_v4.js',...Array.from(read('qbank_patch_v5.js').matchAll(/src="\.\/([^"?]+)/g),m=>m[1])]){
  if(f==='qbank_review_v63.js')continue;
  if(['ui_polish_v46.js','study_workflow_v57.js','compact_menu_v58.js'].includes(f))continue;
  if(version!=='v62'&&f==='qbank_review_v62.js')continue;
  if(version==='v60'&&f==='qbank_exam_practice_v61.js')continue;
  vm.runInContext(read(f),c,{filename:f});
 }return c;
}
module.exports={load};
if(require.main===module){
 const old=load('v61'),now=load(),b=now.QBANK,m=now.WATER1_REVIEW_V62;
 const by=id=>b.find(q=>q.id===id),prev=id=>old.QBANK.find(q=>q.id===id);
 assert.equal(b.length,199);assert.equal(new Set(b.map(q=>q.id)).size,199);
 assert.deepEqual(plain(b.map(q=>q.id)),plain(old.QBANK.map(q=>q.id)));
 assert.deepEqual(plain(now.WATER1_ARCHIVED_QUESTIONS),plain(old.WATER1_ARCHIVED_QUESTIONS));
 const counts=[0,0,0,0,0],actual=[];
 for(const q of b){
  assert.equal(q.o.length,5,q.id);assert.equal(q.e.length,5,q.id);
  assert.equal(new Set(q.o).size,5,q.id+' duplicate option');assert.equal(new Set(q.e).size,5,q.id+' duplicate explanation');
  assert.ok(q.o.every(x=>typeof x==='string'&&x.length>0),q.id);assert.ok(q.e.every(x=>typeof x==='string'&&x.length>0),q.id);
  assert.equal(q.a,prev(q.id).a,q.id+' answer position changed');counts[q.a]++;
  assert.equal(q.s,prev(q.id).s);assert.equal(q.t,prev(q.id).t);
  if(JSON.stringify(q)!==JSON.stringify(prev(q.id)))actual.push(q.id);
  if(q.id!=='L06')assert.deepEqual(plain(q.v||null),plain(prev(q.id).v||null),q.id+' unexpected figure change');
 }
 assert.deepEqual(counts,[40,40,40,40,39]);
 assert.deepEqual(actual.sort(),plain(m.changed).sort());assert.equal(new Set(m.changed).size,m.changed.length);
 for(const id of old.WATER1_EXAM_PRACTICE_V61.rewritten)assert.deepEqual(plain(by(id)),plain(prev(id)),id+' prior review changed');
 // Coverage checks verify documentation completeness, NOT scientific correctness.
 const reviewed=Array.from(read('review_remaining_v62.md').matchAll(/^\| ([GWTHL]\d\d) \|/gm),x=>x[1]);
 const expected=b.map(q=>q.id).filter(id=>!old.WATER1_EXAM_PRACTICE_V61.rewritten.includes(id));
 assert.equal(reviewed.length,187);assert.deepEqual(reviewed.sort(),plain(expected).sort());
 // Targeted semantic regression anchors: independently reviewed reasoning lives
 // in the ledger. These assertions prevent known regressions, not new errors.
 assert.match(by('W15').o[1],/腎近位尿細管/);assert.doesNotMatch(by('W15').o[1],/コリンエステラーゼ/);
 assert.match(by('W23').o[2],/腎障害/);assert.match(by('W23').o[4],/コリンエステラーゼ/);
 assert.equal(by('W15').a,3);assert.equal(by('W23').a,4);
 assert.match(by('T01').q,/有効容積.*BOD負荷/);assert.match(by('T01').q,/固形物排出量/);
 assert.match(by('T19').e[4],/^【正答】/);assert.match(by('T23').q,/最終沈殿池.*定常/);
 assert.match(by('T26').q,/処理水量100/);assert.match(by('T27').q,/元素P換算/);
 assert.match(by('H39').q,/前処理開始前/);assert.match(by('H39').e[1],/以前の損失/);
 assert.deepEqual(plain(by('L06').v.x),[0,5,10,15,20]);assert.deepEqual(plain(by('L06').v.y),[26,25,19,12,11]);
 assert.match(by('L23').q,/濃度\/時間/);assert.match(by('H23').e[0],/倍にしない/);
 const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
 near(2/800*100,0.25);near(6/500*100,1.2);near(4/450*100,8/9);
 near(0.2/(600/30/24)*100,24);near(25*3/5-100*0.003,14.7);
 near((800*400/1000/100-800*2/1000)/0.2,8);near(2*100/2,100);
 near((1-25/500)*100,95);near((15-8)/10*100,70);near(2*1+10*0.1,3);
 near(10*Math.log10(1000),30);near(100/19/2*74/0.9,216.37426900584794);
 // Version chain + all 995 selections, current answer and repeat load.
 for(const version of ['v60','v61']){
  const baseline=version==='v60'?load('v60'):old;
  for(let selected=0;selected<5;selected++){
   const s={bankContentVersion:version,hist:{},total:995,correct:199,mode:'weak',reviewFlags:{W15:true},unknown:{keep:true}};
   baseline.QBANK.forEach(q=>s.hist[q.id]={lastSel:selected,attempts:5,correct:1,wrong:4,dueAt:1900000000000});
   const copy=JSON.stringify(s),z=m.migrate(s);assert.equal(JSON.stringify(s),copy);assert.equal(z.bankContentVersion,'v62');
   assert.equal(z.total,995);assert.equal(z.correct,199);assert.equal(z.mode,'weak');assert.deepEqual(plain(z.unknown),s.unknown);assert.deepEqual(plain(z.reviewFlags),s.reviewFlags);
   const cleared=id=>m.stale.includes(id)||(version==='v60'&&old.WATER1_EXAM_PRACTICE_V61.rewritten.includes(id));
   for(const q of baseline.QBANK){const h=z.hist[q.id];assert.equal(h.attempts,5);assert.equal(h.correct,1);assert.equal(h.wrong,4);assert.equal(h.dueAt,1900000000000);
    if(cleared(q.id))assert.equal(h.lastSel,null);else assert.equal(by(q.id).o[h.lastSel],q.o[selected],q.id+' selected text shifted');
    const current=m.migrate({...s,current:q.id,currentSel:selected,currentAnswered:true});
    if(cleared(q.id)){assert.equal(current.currentAnswered,false);assert.equal(current.currentSel,null);}
    else{assert.equal(current.currentAnswered,true);assert.equal(by(q.id).o[current.currentSel],q.o[selected]);}
   }
   assert.deepEqual(plain(m.migrate(z)),plain(z),'v62 double migration');
   assert.deepEqual(plain(now.WATER1_EXAM_PRACTICE_V61.migrate(z)),plain(z),'legacy entry double migration');
  }
 }
 assert.equal(m.migrate({bankContentVersion:'v61',hist:{L30:{lastSel:3},x:null}}).hist.L30.lastSel,3);
 assert.ok(read('sw.js').includes("'./qbank_review_v62.js'"));
 // Includes the strict existing UI hashes, stable v61 compiler and old migration.
 require('child_process').execFileSync(process.execPath,['tools/exam_practice_audit_v61.js'],{cwd:root});
 console.log(JSON.stringify({result:'PASS',active:b.length,reviewRows:reviewed.length,changed:m.changed.length,stalePresentation:m.stale.length,answers:counts,historyCases:2*199*5,ui:'unchanged except release metadata',scope:'structural/numeric regression; scientific review is documented separately'},null,2));
}
