const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const c={document:{write(){},readyState:'loading',addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getElementById(){return null},createElement(){return {style:{},dataset:{},setAttribute(){},appendChild(){}}},head:{appendChild(){}}},console,setTimeout(){},setInterval(){},addEventListener(){}};c.window=c;vm.createContext(c);
const entry=fs.readFileSync(path.join(root,'qbank_patch_v5.js'),'utf8');
for(const file of ['qbank_v3.js','qbank_extra_v4.js',...Array.from(entry.matchAll(/src="\.\/([^"?]+)/g),m=>m[1])]){
 if(['ui_polish_v46.js','study_workflow_v57.js','compact_menu_v58.js','focus_menu_v100.js'].includes(file))continue;
 vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c,{filename:file});
}
vm.runInContext(fs.readFileSync(path.join(root,'qbank_choice_cue_revision_v100.js'),'utf8'),c,{filename:'qbank_choice_cue_revision_v100.js'});
const bank=Array.from(c.QBANK||[]),active=bank.filter(x=>!x.archived&&!x.inactive&&!x.excluded);
const re=/必ず|一切|無条件|完全|だけで|のみで|すべて|全て|ゼロ(?:と|に|で|を|$)|不要|考慮しない|測定する必要はない|対象から外|含めない|と断定|と確定|無関係|同一とみな|単独で/;
for(const q of active){const wrong=q.o.filter((_,i)=>i!==q.a),n=wrong.filter(s=>re.test(s)).length,correct=re.test(q.o[q.a]);if(n>=2&&!correct)console.log(process.argv.includes('--brief')?JSON.stringify({id:q.id,a:q.a,q:q.q,o:q.o}):[q.id,q.s,n,q.t].join('\t'));}
console.error('BANK',bank.length,'ACTIVE',active.length);
if(process.argv.includes('--detail'))for(const q of active.filter(x=>(process.argv.slice(process.argv.indexOf('--detail')+1).length?process.argv.slice(process.argv.indexOf('--detail')+1):['G13','T07']).includes(x.id)))console.log(JSON.stringify({id:q.id,q:q.q,o:q.o,a:q.a,e:q.e,src:q.src},null,2));
