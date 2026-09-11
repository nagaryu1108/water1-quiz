(function(){
'use strict';
var B=window.QBANK||[];
function get(id){var x=B.find(function(q){return q.id===id;});if(!x)throw new Error('v49 stage3 fix missing '+id);return x;}
var h12=get('H12');
h12.o=h12.o.map(function(s){return String(s).replace('常に強く吸着する','より強く吸着する傾向にある');});
h12.examDifficultyPatch='v49-fix1';
var h13=get('H13');
h13.e=h13.e.map(function(s,i){
  if(i===h13.a||String(s).length>=80)return s;
  return String(s)+'【関連知識】VOCでは採取・保存段階の揮散損失が、測定装置へ導入する前から定量値を低く偏らせ得る。';
});
h13.examDifficultyPatch='v49-fix1';
})();
