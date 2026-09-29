(function(){
'use strict';
if(window.WATER1_PUBLIC_RESTORE_V96||!window.WATER1_SOURCE_AUDIT_V95)return;
var snapshot=window.WATER1_PUBLISHED_QUESTION_SNAPSHOT_V96;
if(!snapshot||snapshot.length!==19)throw Error('Published v63/v64 snapshot missing');
var bank=window.QBANK||[],archive=window.WATER1_ARCHIVED_QUESTIONS||[],changed=[];
for(var item of snapshot){
 var q=bank.find(function(x){return x.id===item.id;});
 if(item.id==='H40'){
  var at=archive.findIndex(function(x){return x.id==='H40';});if(at<0||q)throw Error('H40 archive mismatch');
  q=archive.splice(at,1)[0];delete q.coverageTrim;
  var afterH39=bank.findIndex(function(x){return x.id==='H39';});if(afterH39<0)throw Error('Missing H39');
  bank.splice(afterH39+1,0,q);
 }
 if(!q)throw Error('Missing integrated '+item.id);
 var old=item.question;if(q.a!==old.a)throw Error('Published answer position changed '+item.id);
 for(var key of ['q','o','e','p','src','v','t','terms','rxn']){
  if(Object.prototype.hasOwnProperty.call(old,key))q[key]=JSON.parse(JSON.stringify(old[key]));
  else delete q[key];
 }
 q.primarySourceReviewVersion=old.primarySourceReviewVersion;
 q.contentReviewVersion='v96';changed.push(item.id);
}
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v96')return s;var wasH40=s.current==='H40';s=prior(s);for(var id of changed){var h=(s.hist||{})[id];if(h&&typeof h==='object')h.lastSel=null;}if(wasH40)s.current='H40';if(changed.indexOf(s.current)!==-1){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v96';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_PUBLIC_RESTORE_V96={version:'v96',changed:changed,restored:['H40'],migrate:migrate};
})();
