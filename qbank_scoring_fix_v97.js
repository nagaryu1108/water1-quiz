(function(){
'use strict';
if(window.WATER1_SCORING_FIX_V97||!window.WATER1_PUBLIC_RESTORE_V96)return;
var answers={G02:2,G23:1,W28:2,H01:1,H07:1,H14:0,H16:0,W17:1,W27:1,H24:0,H28:1};
var bank=window.QBANK||[];
Object.keys(answers).forEach(function(id){
 var q=bank.find(function(x){return x.id===id;});
 if(!q||!Array.isArray(q.e)||q.e.length!==5||!String(q.e[answers[id]]).startsWith('【正しい】'))throw Error('Scoring correction mismatch: '+id);
 q.a=answers[id];q.scoringFixVersion='v97';
});
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){
 var s=JSON.parse(JSON.stringify(input||{}));
 if(s.bankContentVersion==='v97')return s;
 s=prior(s);
 Object.keys(answers).forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object')h.lastSel=null;});
 if(Object.prototype.hasOwnProperty.call(answers,s.current)){s.currentAnswered=false;s.currentSel=null;}
 s.bankContentVersion='v97';return s;
}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SCORING_FIX_V97={version:'v97',answers:answers,migrate:migrate};
})();
