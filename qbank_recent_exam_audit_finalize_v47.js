(function(){
'use strict';
var B=window.QBANK||[];
var ARC=window.WATER1_ARCHIVED_QUESTIONS||[];
var meta=window.WATER1_RECENT_EXAM_DIFFICULTY_AUDIT||{};
var stage1=B.filter(function(x){return x.examDifficultyStage==='v47-stage1';}).map(function(x){return x.id;});
var residual=Array.isArray(meta.upgradedIds)?meta.upgradedIds.slice():[];
var all=[];stage1.concat(residual).forEach(function(id){if(all.indexOf(id)<0)all.push(id);});
var set=new Set(all);
B.forEach(function(x){
  if(!x.recentExamDifficultyAudit)x.recentExamDifficultyAudit={version:'v47',window:'2020-2025',basis:'2020～2025年度出題形式と比較'};
  x.recentExamDifficultyAudit.status=set.has(x.id)?'UPGRADED_TO_RECENT_EXAM_LEVEL':'MATCH_RECENT_EXAM_LEVEL';
});
ARC.forEach(function(x){x.recentExamDifficultyAudit={version:'v47',window:'2020-2025',status:'ARCHIVED_EXCLUDED',basis:'近接重複技能のため通常出題外'};});
window.WATER1_RECENT_EXAM_DIFFICULTY_AUDIT={
  version:'v47',window:'2020-2025',reviewedActive:B.length,
  stage1Ids:stage1,residualUpgradeIds:residual,upgradedIds:all,upgradedCount:all.length,
  unchangedCount:B.length-all.length,archivedIds:ARC.map(function(x){return x.id;})
};
})();
