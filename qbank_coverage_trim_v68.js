(function(){
'use strict';
if(window.WATER1_COVERAGE_TRIM_V68||!window.WATER1_SOURCE_AUDIT_V67)return;
var bank=window.QBANK||[],at=bank.findIndex(function(x){return x.id==='T17';});
if(at<0)throw Error('Missing T17 for coverage trim');
var retired=bank.splice(at,1)[0];
retired.coverageTrim={version:'v68',status:'archived',coveredBy:['T34','T43'],reason:'全りん・全窒素の総量対ろ過後の溶存態という判断をそれぞれの詳細問題で扱う'};
window.WATER1_ARCHIVED_QUESTIONS=(window.WATER1_ARCHIVED_QUESTIONS||[]).concat([retired]);
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v68')return s;s=prior(s);if(s.current==='T17'){s.current=null;s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v68';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_COVERAGE_TRIM_V68={version:'v68',retired:['T17'],coveredBy:{T17:['T34','T43']},active:bank.length,migrate:migrate};
})();
