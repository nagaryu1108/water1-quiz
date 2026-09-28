const {load}=require('./content_review_audit_v62');
const ids=[
'G01','G02','G10','G16','G23','G24','G26','G28','G29','G32','G33',
'W09','W17','W20','W22',
'G08','G14','G17','G31','W03','W19',
'T17','T28','T29','T32','T42','T43',
'H01','H03','H06','H14','H15','H16','H19','H21','H22','H28','H30','H33','H35','H36','H37','H38','H40'
];
const b=load().QBANK;
const out=ids.map(id=>{
 const q=b.find(x=>x.id===id); if(!q)throw new Error('missing '+id);
 return {id:q.id,s:q.s,t:q.t,q:q.q,a:q.a+1,o:q.o,e:q.e,p:q.p,src:q.src||''};
});
console.log('PRIMARY_SOURCE_SNAPSHOT_V63_BEGIN');
console.log(JSON.stringify(out,null,2));
console.log('PRIMARY_SOURCE_SNAPSHOT_V63_END');
