const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),plain=x=>JSON.parse(JSON.stringify(x));
const changed=['W09','W17','W27','W38','H24','H28','H35','H36'];
function load(include64){
 const noop=()=>{},document={readyState:'loading',write:noop,addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({style:{},dataset:{},setAttribute:noop,appendChild:noop}),head:{appendChild:noop}};
 const c={document,console,setTimeout:noop,setInterval:noop,addEventListener:noop};c.window=c;vm.createContext(c);
 const files=['qbank_v3.js','qbank_extra_v4.js',...Array.from(read('qbank_patch_v5.js').matchAll(/src="\.\/([^"?]+)/g),m=>m[1])];
 for(const f of files){
  if(['ui_polish_v46.js','study_workflow_v57.js','compact_menu_v58.js'].includes(f))continue;
  if(/^qbank_(?:source_audit|coverage_trim)_v\d+\.js$/.test(f))continue;
  if(!include64&&f==='qbank_review_v64.js')continue;
  if(f==='qbank_public_restore_v96.js')continue;vm.runInContext(read(f),c,{filename:f});
 }return c;
}
const before=load(false),now=load(true),b=now.QBANK,m=now.WATER1_REVIEW_V64;
const by=id=>b.find(q=>q.id===id),prev=id=>before.QBANK.find(q=>q.id===id);
assert.equal(m.version,'v64');assert.deepEqual(plain(m.changed),changed);assert.deepEqual(plain(m.repurposed),['H24','H28','H36']);
assert.equal(b.length,199);assert.equal(new Set(b.map(q=>q.id)).size,199);
assert.deepEqual(plain(b.map(q=>q.id)),plain(before.QBANK.map(q=>q.id)),'question IDs/order changed');
assert.deepEqual(plain(now.WATER1_ARCHIVED_QUESTIONS),plain(before.WATER1_ARCHIVED_QUESTIONS),'archive changed');
const counts=[0,0,0,0,0],actual=[];
for(const q of b){
 assert.equal(q.o.length,5,q.id);assert.equal(q.e.length,5,q.id);
 assert.equal(new Set(q.o).size,5,q.id+' duplicate option');assert.equal(new Set(q.e).size,5,q.id+' duplicate explanation');
 assert.ok(q.o.every(x=>typeof x==='string'&&x.trim().length>0),q.id);assert.ok(q.e.every(x=>typeof x==='string'&&x.trim().length>0),q.id);
 assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<5,q.id);counts[q.a]++;
 assert.equal(q.a,prev(q.id).a,q.id+' answer position changed');
 assert.equal(q.s,prev(q.id).s,q.id+' subject changed');assert.equal(q.t,prev(q.id).t,q.id+' topic metadata changed');assert.deepEqual(plain(q.v||null),plain(prev(q.id).v||null),q.id+' visual changed');
 if(JSON.stringify(q)!==JSON.stringify(prev(q.id)))actual.push(q.id);
 if(changed.includes(q.id)){
  assert.equal(q.primarySourceReviewVersion,'v64',q.id+' missing review marker');
  assert.match(q.src,/一次資料/,q.id+' source is not marked primary');
  assert.ok(q.o.every(x=>x.length>=50),q.id+' weak/too-short option remains');
  assert.ok(q.e.every(x=>x.length>=70),q.id+' explanation too short');
 }else assert.deepEqual(plain(q),plain(prev(q.id)),q.id+' changed outside v64 scope');
}
assert.deepEqual(actual.sort(),changed.slice().sort());assert.deepEqual(counts,[40,40,40,40,39],'answer distribution changed');
assert.match(by('W09').o[2],/健康.*おそれ/);assert.match(by('W09').o[2],/当時の設置者/);
assert.match(by('W17').o[1],/処理した水/);assert.match(by('W17').o[1],/有害物質使用特定施設/);
assert.match(by('W27').o[1],/製造・貯蔵・使用・処理/);assert.match(by('W27').o[1],/応急措置/);
assert.match(by('W38').o[2],/第一種特定化学物質/);assert.match(by('W38').o[2],/50 ng\/L/);
assert.match(by('H24').o[0],/ヘッドスペース法/);assert.match(by('H24').o[0],/保存中/);
assert.match(by('H28').o[1],/Se\(VI\)/);assert.match(by('H28').o[1],/Se\(IV\)/);assert.match(by('H28').o[1],/標準添加法/);
assert.match(by('H35').o[1],/ピリジン/);assert.match(by('H35').o[1],/流れ分析法/);assert.match(by('H35').o[1],/イオン電極/);
assert.match(by('H36').o[1],/80～120%/);assert.match(by('H36').o[1],/妨害除去/);
for(let selected=0;selected<5;selected++){
 const state={bankContentVersion:'v63',hist:{},total:995,correct:500,mode:'weak',reviewFlags:{H35:true},unknown:{keep:true}};
 before.QBANK.forEach(q=>state.hist[q.id]={attempts:8,correct:5,wrong:3,lastSel:selected,dueAt:1900000000000});
 const original=JSON.stringify(state),z=m.migrate(state);
 assert.equal(JSON.stringify(state),original,'migration mutates input');assert.equal(z.bankContentVersion,'v64');
 assert.equal(z.total,995);assert.equal(z.correct,500);assert.equal(z.mode,'weak');assert.deepEqual(plain(z.reviewFlags),state.reviewFlags);assert.deepEqual(plain(z.unknown),state.unknown);
 for(const q of before.QBANK){
  const h=z.hist[q.id];assert.equal(h.attempts,8);assert.equal(h.correct,5);assert.equal(h.wrong,3);assert.equal(h.dueAt,1900000000000);
  if(changed.includes(q.id)){assert.equal(h.lastSel,null,q.id);assert.equal(h.previousV63Selection.index,selected,q.id);}
  else assert.equal(by(q.id).o[h.lastSel],q.o[selected],q.id+' unchanged selection shifted');
 }
 assert.deepEqual(plain(m.migrate(z)),plain(z),'v64 migration not idempotent');
}
for(const id of changed){const z=m.migrate({bankContentVersion:'v63',hist:{},current:id,currentSel:0,currentAnswered:true});assert.equal(z.currentSel,null,id);assert.equal(z.currentAnswered,false,id);}
assert.ok(read('qbank_patch_v5.js').includes('qbank_review_v64.js'));assert.ok(read('sw.js').includes("'./qbank_review_v64.js'"));
assert.match(read('ui_polish_v46.js'),/RELEASE='v98'/);assert.match(read('review_primary_sources_v64.md'),/8問 × 5肢 = 40肢/);
console.log(JSON.stringify({result:'PASS',active:b.length,changed:8,checkedChoices:40,repurposed:['H24','H28','H36'],answers:counts,historyCases:199*5,scope:'second primary-source legal/analytical tranche plus duplicate-depth redesign'},null,2));
