const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),plain=x=>JSON.parse(JSON.stringify(x));
const old=require('./content_review_audit_v62').load().QBANK;
const noop=()=>{},document={readyState:'loading',addEventListener:noop,querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({style:{},dataset:{},setAttribute:noop,appendChild:noop}),head:{appendChild:noop}};
const c={document,console,setTimeout:noop,setInterval:noop,addEventListener:noop};c.window=c;vm.createContext(c);
for(const f of ['qbank_v3.js','qbank_extra_v4.js',...Array.from(read('qbank_patch_v5.js').matchAll(/src="\.\/([^"?]+)/g),m=>m[1])]){
 if(['ui_polish_v46.js','study_workflow_v57.js','compact_menu_v58.js','qbank_source_audit_v64.js','qbank_source_audit_v65.js','qbank_source_audit_v66.js','qbank_source_audit_v67.js','qbank_coverage_trim_v68.js','qbank_source_audit_v69.js','qbank_source_audit_v70.js'].includes(f))continue;
 if(f==='qbank_coverage_trim_v71.js')continue;if(f==='qbank_source_audit_v72.js')continue;if(f==='qbank_source_audit_v73.js')continue;if(f==='qbank_source_audit_v74.js')continue;if(f==='qbank_source_audit_v75.js')continue;if(f==='qbank_source_audit_v76.js')continue;if(f==='qbank_source_audit_v77.js')continue;if(f==='qbank_source_audit_v78.js')continue;if(f==='qbank_source_audit_v79.js')continue;if(f==='qbank_source_audit_v80.js')continue;if(f==='qbank_source_audit_v81.js')continue;if(f==='qbank_source_audit_v82.js')continue;if(f==='qbank_source_audit_v83.js')continue;if(f==='qbank_source_audit_v84.js')continue;if(f==='qbank_source_audit_v85.js')continue;if(f==='qbank_source_audit_v86.js')continue;if(f==='qbank_source_audit_v87.js')continue;if(f==='qbank_source_audit_v88.js')continue;if(f==='qbank_source_audit_v89.js')continue;if(f==='qbank_source_audit_v90.js')continue;if(f==='qbank_source_audit_v91.js')continue;if(f==='qbank_source_audit_v92.js')continue;if(f==='qbank_source_audit_v93.js')continue;if(f==='qbank_source_audit_v94.js')continue;if(f==='qbank_source_audit_v95.js')continue;if(f==='qbank_review_v63.js'||f==='qbank_review_v64.js')continue;if(f==='qbank_public_restore_v96.js')continue;vm.runInContext(read(f),c,{filename:f});
}
const q=c.QBANK,rev=c.WATER1_SOURCE_AUDIT_V63;
assert.equal(q.length,199);assert.equal(new Set(q.map(x=>x.id)).size,199);
assert.deepEqual(plain(q.map(x=>x.id)),plain(old.map(x=>x.id)));
assert.deepEqual(plain(rev.changed),['W09','W17','W27','W38','H24','H28','H35','H36']);
assert.deepEqual(plain(rev.stale),plain(rev.changed));
const by=id=>q.find(x=>x.id===id),before=id=>old.find(x=>x.id===id);
for(const x of q){
 assert.equal(x.o.length,5,x.id);assert.equal(x.e.length,5,x.id);assert.equal(new Set(x.o).size,5,x.id);assert.equal(new Set(x.e).size,5,x.id);
 if(rev.changed.includes(x.id))assert.ok(x.e.every(v=>v.length>35),x.id);assert.equal(x.a,before(x.id).a,x.id);assert.deepEqual(plain(x.v||null),plain(before(x.id).v||null),x.id);
 if(!rev.changed.includes(x.id))assert.deepEqual(plain(x),plain(before(x.id)),x.id);
 else{assert.notDeepEqual(plain(x.o),plain(before(x.id).o),x.id);assert.match(x.src,/https:\/\//);}
}
const counts=[0,0,0,0,0];q.forEach(x=>counts[x.a]++);assert.deepEqual(counts,[40,40,40,40,39]);
for(const version of ['v61','v62'])for(let sel=0;sel<5;sel++){
 const s={bankContentVersion:version,hist:{},current:'W09',currentSel:sel,currentAnswered:true,total:12,correct:6,mode:'weak',reviewFlags:{W09:true},other:{keep:1}};
 for(const x of q)s.hist[x.id]={attempts:3,correct:2,wrong:1,lastSel:sel,dueAt:1900000000000};s.hist.L30={lastSel:sel};
 const z=rev.migrate(s);assert.equal(z.bankContentVersion,'v63');assert.equal(z.total,12);assert.equal(z.correct,6);assert.deepEqual(plain(z.other),s.other);
 assert.equal(z.currentAnswered,false);assert.equal(z.currentSel,null);assert.equal(z.hist.W09.lastSel,null);assert.equal(z.hist.W09.attempts,3);
 assert.equal(z.hist.W09.previousV62Selection.index,sel);assert.equal(z.hist.W09.dueAt,1900000000000);
 assert.equal(z.hist.L30.lastSel,sel);assert.deepEqual(plain(rev.migrate(z)),plain(z));
}
assert.ok(read('sw.js').includes("'./qbank_source_audit_v63.js'"));
assert.ok(read('qbank_patch_v5.js').includes('qbank_source_audit_v63.js'));
console.log(JSON.stringify({result:'PASS',questions:q.length,changed:rev.changed.length,choices:rev.changed.length*5,distribution:counts,migrationCases:10}));
