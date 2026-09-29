(function(){
'use strict';
if(window.WATER1_COVERAGE_TRIM_V71||!window.WATER1_SOURCE_AUDIT_V70)return;
var bank=window.QBANK||[],mapping={W29:['W03','W07'],L01:['W07'],W06:['W01','L06'],W25:['W04']},ids=Object.keys(mapping),archived=[];
ids.forEach(function(id){var at=bank.findIndex(function(x){return x.id===id;});if(at<0)throw Error('Missing '+id);var q=bank.splice(at,1)[0];q.coverageTrim={version:'v71',status:'archived',coveredBy:mapping[id],reason:'既存の詳細な観測・判断問題が同じ主要機構を扱う'};archived.push(q);});
window.WATER1_ARCHIVED_QUESTIONS=(window.WATER1_ARCHIVED_QUESTIONS||[]).concat(archived);
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v71')return s;s=prior(s);if(ids.indexOf(s.current)>=0){s.current=null;s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v71';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_COVERAGE_TRIM_V71={version:'v71',retired:ids,coveredBy:mapping,active:bank.length,migrate:migrate};
})();
