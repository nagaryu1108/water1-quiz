const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),plain=x=>JSON.parse(JSON.stringify(x));
function load(with98){
 const noop=()=>{},document={readyState:'loading',addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({style:{},dataset:{},setAttribute:noop,appendChild:noop}),head:{appendChild:noop}};
 const c={document,console,setTimeout:noop,setInterval:noop,addEventListener:noop};c.window=c;vm.createContext(c);
 for(const f of ['qbank_v3.js','qbank_extra_v4.js',...Array.from(read('qbank_patch_v5.js').matchAll(/src="\.\/([^"?]+)/g),m=>m[1])]){
  if(['ui_polish_v46.js','study_workflow_v57.js','compact_menu_v58.js'].includes(f)||(!with98&&f==='qbank_valence_guide_v98.js'))continue;
  vm.runInContext(read(f),c,{filename:f});
 }
 return c;
}
const before=load(false),after=load(true),changed=['H37','H40'];
assert.equal(after.QBANK.length,186);assert.deepEqual(plain(after.WATER1_VALENCE_GUIDE_V98.changed),changed);
for(const q of after.QBANK){
 const old=before.QBANK.find(x=>x.id===q.id);assert.ok(old,q.id);
 if(!changed.includes(q.id)){assert.deepEqual(plain(q),plain(old),q.id);continue;}
 assert.equal(q.a,old.a,q.id);assert.deepEqual(plain(q.o),plain(old.o),q.id);assert.deepEqual(plain(q.e),plain(old.e),q.id);
 assert.equal(q.src,old.src,q.id);assert.ok(q.p.startsWith(old.p+' '),q.id);
 assert.equal(q.p.match(/water1-valence-guide/g).length,1,q.id);
 for(const phrase of ['As(V)→As(III)','Se(VI)→Se(IV)','Hg(II)→Hg(0)','Cr(VI)→Cr(III)','全量か形態別か'])assert.ok(q.p.includes(phrase),q.id+': '+phrase);
 assert.equal(q.contentReviewVersion,'v98',q.id);
}
assert.match(read('ui_polish_v46.js'),/RELEASE='v98'/);
assert.ok(read('sw.js').includes("'./qbank_valence_guide_v98.js'"));
console.log(JSON.stringify({result:'PASS',active:after.QBANK.length,guideQuestions:changed,answerKeysUnchanged:true}));
