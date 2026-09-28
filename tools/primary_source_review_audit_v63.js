const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),plain=x=>JSON.parse(JSON.stringify(x));
const changed=['G02','G23','G33','W28','H01','H07','H14','H16','H22','H37','H40'];
function load(include63){
 const noop=()=>{},document={readyState:'loading',write:noop,addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({style:{},dataset:{},setAttribute:noop,appendChild:noop}),head:{appendChild:noop}};
 const c={document,console,setTimeout:noop,setInterval:noop,addEventListener:noop};c.window=c;vm.createContext(c);
 const files=['qbank_v3.js','qbank_extra_v4.js',...Array.from(read('qbank_patch_v5.js').matchAll(/src="\.\/([^"?]+)/g),m=>m[1])];
 for(const f of files){
  if(['qbank_review_v64.js','ui_polish_v46.js','study_workflow_v57.js','compact_menu_v58.js'].includes(f))continue;
  if(!include63&&f==='qbank_review_v63.js')continue;
  vm.runInContext(read(f),c,{filename:f});
 }
 return c;
}
const before=load(false),now=load(true),b=now.QBANK,m=now.WATER1_REVIEW_V63;
const by=id=>b.find(q=>q.id===id),prev=id=>before.QBANK.find(q=>q.id===id);
assert.equal(m.version,'v63');assert.deepEqual(plain(m.changed),changed);assert.deepEqual(plain(m.repurposed),['H07']);
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
 assert.equal(q.s,prev(q.id).s,q.id+' subject changed');assert.equal(q.t,prev(q.id).t,q.id+' topic metadata changed');
 if(JSON.stringify(q)!==JSON.stringify(prev(q.id)))actual.push(q.id);
 if(changed.includes(q.id)){
  assert.equal(q.primarySourceReviewVersion,'v63',q.id+' missing review marker');
  assert.match(q.src,/一次資料/,q.id+' source is not marked primary');
  assert.ok(q.o.every(x=>x.length>=35),q.id+' weak/too-short option remains');
  assert.ok(q.e.every(x=>x.length>=65),q.id+' explanation too short');
 }else assert.deepEqual(plain(q),plain(prev(q.id)),q.id+' changed outside v63 scope');
}
assert.deepEqual(actual.sort(),changed.slice().sort());
assert.deepEqual(counts,[40,40,40,40,39],'answer distribution changed');
assert.match(by('H07').q,/排水処理.*分析/);assert.match(by('H07').o[1],/Cr\(VI\).*Cr\(III\).*分析/);
assert.match(by('G02').o[2],/直罰/);assert.match(by('G02').o[2],/違反のおそれ/);
assert.match(by('G23').o[1],/同じ対象物質・項目/);assert.match(by('G23').o[1],/条例規制/);
assert.match(by('G33').o[1],/代理者/);assert.match(by('G33').o[1],/資格/);
assert.match(by('W28').o[2],/配管.*排水溝.*地下貯蔵/);assert.match(by('W28').o[2],/定期点検/);
assert.match(by('H01').o[1],/多原子イオン/);assert.match(by('H01').o[1],/衝突・反応セル/);
assert.match(by('H14').o[0],/標準添加法/);assert.match(by('H14').o[0],/前処理損失/);
assert.match(by('H16').o[0],/サプレッサー/);assert.match(by('H16').o[0],/背景導電率/);
assert.match(by('H22').o[1],/Se\(VI\).*Se\(IV\)/);assert.match(by('H22').o[1],/揮発性水素化物/);
assert.match(by('H37').o[0],/Hg\(II\).*Hg\(0\)/);
assert.match(by('H40').o[3],/AsH3/);assert.match(by('H40').o[3],/気液分離/);
// v63 migration: keep accumulated learning statistics, clear only stale presentation.
for(let selected=0;selected<5;selected++){
 const state={bankContentVersion:'v62',hist:{},total:995,correct:500,mode:'weak',reviewFlags:{H07:true},unknown:{keep:true}};
 before.QBANK.forEach(q=>state.hist[q.id]={attempts:7,correct:4,wrong:3,lastSel:selected,dueAt:1900000000000});
 const original=JSON.stringify(state),z=m.migrate(state);
 assert.equal(JSON.stringify(state),original,'migration mutates input');assert.equal(z.bankContentVersion,'v63');
 assert.equal(z.total,995);assert.equal(z.correct,500);assert.equal(z.mode,'weak');assert.deepEqual(plain(z.reviewFlags),state.reviewFlags);assert.deepEqual(plain(z.unknown),state.unknown);
 for(const q of before.QBANK){
  const h=z.hist[q.id];assert.equal(h.attempts,7);assert.equal(h.correct,4);assert.equal(h.wrong,3);assert.equal(h.dueAt,1900000000000);
  if(changed.includes(q.id)){assert.equal(h.lastSel,null,q.id);assert.equal(h.previousV62Selection.index,selected,q.id);}
  else assert.equal(by(q.id).o[h.lastSel],q.o[selected],q.id+' unchanged selection shifted');
 }
 assert.deepEqual(plain(m.migrate(z)),plain(z),'v63 migration not idempotent');
}
for(const id of changed){const z=m.migrate({bankContentVersion:'v62',hist:{},current:id,currentSel:0,currentAnswered:true});assert.equal(z.currentSel,null,id);assert.equal(z.currentAnswered,false,id);}
assert.ok(read('qbank_patch_v5.js').includes('qbank_review_v63.js'));
assert.ok(read('sw.js').includes("'./qbank_review_v63.js'"));
assert.match(read('ui_polish_v46.js'),/RELEASE='v6[34]'/);
assert.match(read('review_primary_sources_v63.md'),/11問 × 5肢 = \*\*55肢\*\*/);
console.log(JSON.stringify({result:'PASS',active:b.length,changed:changed.length,checkedChoices:changed.length*5,repurposed:['H07'],answers:counts,historyCases:199*5,ui:'unchanged except release metadata/cache keys',scope:'primary-source-targeted legal/analytical review plus distractor strengthening'},null,2));