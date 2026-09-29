const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const noop=()=>{},document={readyState:'loading',addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({style:{},dataset:{},setAttribute:noop,appendChild:noop}),head:{appendChild:noop}};
const c={document,console,setTimeout:noop,setInterval:noop,addEventListener:noop};c.window=c;vm.createContext(c);
for(const f of ['qbank_v3.js','qbank_extra_v4.js',...Array.from(read('qbank_patch_v5.js').matchAll(/src="\.\/([^"?]+)/g),m=>m[1])]){
 if(['ui_polish_v46.js','study_workflow_v57.js','compact_menu_v58.js'].includes(f))continue;
 vm.runInContext(read(f),c,{filename:f});
}
const bank=c.QBANK,fix=c.WATER1_SCORING_FIX_V97;
assert.equal(bank.length,186);assert.equal(Object.keys(fix.answers).length,11);
for(const q of bank){
 const negative=/誤っている|不適当な/.test(q.q);
 const correct=q.e.map((e,i)=>{
  const tag=String(e).match(/^【([^】]*)】/);return tag&&(negative?/^(誤り|不適当)$/:/^(正しい|適当|正答)$/).test(tag[1])?i:-1;
 }).filter(i=>i>=0);
 if(q.id==='G30'||q.id==='H38'){
  assert.equal(q.a,q.e.findIndex(e=>/^正しい。/.test(e)),q.id);
 }else{
  assert.equal(correct.length,1,q.id+': explanation labels');
  assert.equal(q.a,correct[0],q.id+': answer and explanation differ');
 }
 assert.ok(q.a>=0&&q.a<5,q.id);
}
assert.equal(bank.find(q=>q.id==='H24').a,0);
for(const version of ['v61','v95','v96'])for(const id of Object.keys(fix.answers)){
 const state={bankContentVersion:version,hist:{[id]:{attempts:3,correct:1,wrong:2,lastSel:4,dueAt:1900000000000}},current:id,currentSel:4,currentAnswered:true};
 const original=JSON.stringify(state),out=fix.migrate(state);
 assert.equal(JSON.stringify(state),original);assert.equal(out.bankContentVersion,'v97');
 assert.equal(out.hist[id].lastSel,null);assert.equal(out.hist[id].attempts,3);assert.equal(out.hist[id].wrong,2);
 assert.equal(out.hist[id].dueAt,1900000000000);assert.equal(out.currentSel,null);assert.equal(out.currentAnswered,false);
 assert.equal(JSON.stringify(fix.migrate(out)),JSON.stringify(out));
}
const assets=Array.from(read('sw.js').matchAll(/'\.\/([^']+)'/g),m=>m[1]);
assert.ok(assets.includes('qbank_scoring_fix_v97.js'));
assert.match(read('ui_polish_v46.js'),/RELEASE='v97'/);
console.log(JSON.stringify({result:'PASS',checked:bank.length,corrected:Object.keys(fix.answers).length,historyCases:33,offlineAssets:assets.length}));
