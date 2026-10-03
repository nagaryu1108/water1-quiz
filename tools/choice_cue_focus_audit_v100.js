const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const doc={readyState:'loading',write(){},addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getElementById(){return null},createElement(){return {style:{},dataset:{},setAttribute(){},appendChild(){}}},head:{appendChild(){}}};
const c={document:doc,console,setTimeout(){},setInterval(){},addEventListener(){}};c.window=c;vm.createContext(c);
const files=['qbank_v3.js','qbank_extra_v4.js',...Array.from(read('qbank_patch_v5.js').matchAll(/src="\.\/([^"?]+)/g),m=>m[1])].filter(f=>!['ui_polish_v46.js','study_workflow_v57.js','compact_menu_v58.js'].includes(f));
for(const f of files)vm.runInContext(read(f),c,{filename:f});
const before=new Map(c.QBANK.map(q=>[q.id,{a:q.a,o:q.o.slice(),e:q.e.slice()}]));
const priorMigrate=c.WATER1_EXAM_PRACTICE_V61.migrate;
vm.runInContext(read('qbank_choice_cue_revision_v100.js'),c);
vm.runInContext(read('focus_menu_v100.js'),c);
assert.equal(c.QBANK.length,186);
assert.equal(c.WATER1_ARCHIVED_QUESTIONS.length,14);
const revised=Array.from(c.WATER1_CHOICE_CUE_REVISION_V100.changed),expected=['G13','T07','W04','T24','H33','L34','H01','H16','W17','L17','W26','T38','G02','G03','L02','W07','G12','H07','T08','G08','W09','T11','H08','H11','T15','H17','T22','G24','H23','G26','G28','T28','H26','H28','W30','H32','H36','G32','G35','W36','L37','T44','H40'];assert.deepEqual(revised.sort(),expected.sort());
for(const q of c.QBANK){assert.equal(q.a,before.get(q.id).a,q.id);assert.equal(q.o.length,5,q.id);assert.equal(q.e.length,5,q.id);assert.equal(new Set(q.o).size,5,q.id);assert.equal(new Set(q.e).size,5,q.id);if(revised.includes(q.id)){assert.match(q.e[q.a],/^【正しい】/,q.id);for(let i=0;i<5;i++)if(i!==q.a)assert.match(q.e[i],/^【誤り】/,q.id);}else{assert.deepEqual(q.o,before.get(q.id).o,q.id);assert.deepEqual(q.e,before.get(q.id).e,q.id);}}
const extreme=/必ず|一切|無条件|完全|だけで|のみで|すべて|全て|ゼロ(?:と|に|で|を|$)|不要|考慮しない|測定する必要はない|対象から外|含めない|と断定|と確定|無関係|同一とみな|単独で/;
for(const id of revised){const q=c.QBANK.find(x=>x.id===id);assert.ok(q.o.every(s=>!extreme.test(s)),id+' cue remains');const lengths=q.o.map(x=>x.length),meanWrong=lengths.filter((_,i)=>i!==q.a).reduce((a,n)=>a+n,0)/4;assert.ok(lengths[q.a]/meanWrong<=1.65,id+' correct option is conspicuously long');}
const residual=c.QBANK.filter(q=>!extreme.test(q.o[q.a])&&q.o.filter((s,i)=>i!==q.a&&extreme.test(s)).length>=2);assert.equal(residual.length,0,'Remaining answer-cue candidates: '+residual.map(q=>q.id).join(','));
const filters=c.WATER1_FOCUS_FILTERS_V100;assert.equal(filters.length,8);const counts=filters.map(f=>[f.id,c.QBANK.filter(f.test).length]);assert.ok(counts.every(([,count])=>count>0),JSON.stringify(counts));
for(const s of ['公害総論','水質概論','汚水処理特論','水質有害物質特論','大規模水質特論'])assert.equal(c.QBANK.filter(filters.find(f=>f.id==='subject:'+s).test).length,c.QBANK.filter(q=>q.s===s).length);
assert.ok(read('index.html').includes('qbank_choice_cue_revision_v100.js?v=200'));assert.ok(read('index.html').includes('focus_menu_v100.js?v=200'));assert.ok(read('sw.js').includes("'./qbank_choice_cue_revision_v100.js'"));assert.ok(read('sw.js').includes("'./focus_menu_v100.js'"));
const input={bankContentVersion:'v99',hist:{T07:{attempts:3,lastSel:1},G13:{attempts:4,lastSel:2},T08:{attempts:1,lastSel:0}},current:'T07',currentAnswered:true,currentSel:1},baseline=priorMigrate(input),migrated=c.WATER1_EXAM_PRACTICE_V61.migrate(input);assert.equal(migrated.hist.T07.attempts,3);assert.equal(migrated.hist.T07.lastSel,null);assert.equal(migrated.hist.T08.lastSel,baseline.hist.T08.lastSel);assert.equal(migrated.currentAnswered,false);assert.equal(migrated.currentSel,null);assert.equal(migrated.bankContentCueVersion,'v100');
console.log(JSON.stringify({result:'PASS',active:c.QBANK.length,revised:revised.length,heuristicCueCandidates:residual.length,categories:counts,history:'preserved; stale selections reset'}));
