const assert=require('assert/strict');
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const {load}=require('./content_review_audit_v62.js');
const before=load('v62'),now=load('v63'),b=now.QBANK,arc=now.WATER1_ARCHIVED_QUESTIONS||[],m=now.WATER1_PRIMARY_SOURCE_V63;
const plain=x=>JSON.parse(JSON.stringify(x)),by=(bank,id)=>bank.find(q=>q.id===id);
assert.equal(before.QBANK.length,199);
assert.equal(b.length,198);
assert.equal(new Set(b.map(q=>q.id)).size,198);
assert.ok(!by(b,'H04'),'H04 must be archived');
assert.ok(by(b,'H07'),'H07 representative missing');
assert.ok(arc.some(q=>q.id==='L30'),'prior archive L30 missing');
assert.ok(arc.some(q=>q.id==='H04'),'new archive H04 missing');
assert.equal(new Set([...b,...arc].map(q=>q.id)).size,200,'stable 200 IDs across active+archive');
assert.deepEqual(plain(m.changed),['G10','G23','G26','G29','G32','G33','W09','H01','H14','H16','H22','H37','H40']);
for(const id of m.changed){
 const q=by(b,id),old=by(before.QBANK,id);
 assert.ok(q,id+' missing');assert.equal(q.a,old.a,id+' answer position changed');
 assert.equal(q.s,old.s,id+' subject changed');assert.equal(q.t,old.t,id+' topic changed');
 assert.equal(q.o.length,5,id+' choices');assert.equal(q.e.length,5,id+' explanations');
 assert.equal(new Set(q.o).size,5,id+' duplicate choice');assert.equal(new Set(q.e).size,5,id+' duplicate explanation');
 assert.match(q.src,/一次資料照合/,id+' source marker');
}
assert.equal(by(b,'G10').a,1);assert.match(by(b,'G10').o[1],/方法書段階/);assert.match(by(b,'G10').e[4],/地域的範囲/);
assert.equal(by(b,'G26').a,1);assert.match(by(b,'G26').o[1],/環境大臣/);assert.match(by(b,'G26').e[2],/人口・産業/);
assert.equal(by(b,'G29').a,2);assert.match(by(b,'G29').o[2],/環境基準/);assert.match(by(b,'G29').e[3],/指定水域/);
assert.equal(by(b,'G32').a,2);assert.match(by(b,'G32').o[2],/自然的・社会的条件/);
assert.equal(by(b,'W09').a,2);assert.match(by(b,'W09').q,/第14条の3/);assert.match(by(b,'W09').e[2],/自動命令/);
assert.equal(by(b,'G23').a,1);assert.match(by(b,'G23').o[0],/第3条第3項/);assert.match(by(b,'G23').e[0],/第29条/);
assert.equal(by(b,'G33').a,1);assert.match(by(b,'G33').o[1],/あらかじめ選任/);assert.match(by(b,'G33').o[1],/同じ資格/);
assert.equal(by(b,'H01').a,1);assert.match(by(b,'H01').o[1],/多原子イオン/);assert.match(by(b,'H01').e[3],/内部標準/);
assert.equal(by(b,'H14').a,0);assert.match(by(b,'H14').e[2],/加算型/);
assert.equal(by(b,'H16').a,0);assert.match(by(b,'H16').o[0],/背景導電率/);
assert.equal(by(b,'H22').a,1);assert.match(by(b,'H22').o[1],/気液分離/);
assert.equal(by(b,'H37').a,0);assert.match(by(b,'H37').q,/誤っている/);assert.match(by(b,'H37').o[0],/全量Cr\(III\)/);
assert.equal(by(b,'H40').a,3);assert.match(by(b,'H40').e[0],/予備還元/);
// Existing UI should only receive cache/release-key changes.
assert.ok(read('qbank_patch_v5.js').includes('qbank_primary_source_v63.js?v=161'));
assert.ok(read('sw.js').includes("'./qbank_primary_source_v63.js'"));
const ui=read('index.html');assert.ok(ui.includes('qbank_patch_v5.js?v=75'));assert.ok(ui.includes("sw.js?v=73"));
// History is retained; only stale answer presentation is cleared.
const state={bankContentVersion:'v62',hist:{},total:123,correct:77,mode:'weak',unknown:{keep:true},current:'H14',currentSel:0,currentAnswered:true};
before.QBANK.forEach(q=>state.hist[q.id]={attempts:2,correct:1,wrong:1,lastSel:q.a,dueAt:1900000000000});
const z=m.migrate(state);assert.equal(z.bankContentVersion,'v63');assert.equal(z.total,123);assert.equal(z.correct,77);assert.deepEqual(z.unknown,{keep:true});
for(const q of before.QBANK){const h=z.hist[q.id];assert.equal(h.attempts,2);assert.equal(h.correct,1);assert.equal(h.wrong,1);assert.equal(h.dueAt,1900000000000);if(m.stale.includes(q.id))assert.equal(h.lastSel,null);}
assert.equal(z.current,null);assert.equal(z.currentAnswered,false);assert.equal(z.currentSel,null);
assert.deepEqual(plain(m.migrate(z)),plain(z),'v63 migration must be idempotent');
console.log(JSON.stringify({result:'PASS',active:b.length,archived:arc.map(q=>q.id),changed:m.changed,stableIds:200,ui:'unchanged except cache keys',history:'attempt/correct/wrong/due preserved; stale selections cleared'},null,2));
