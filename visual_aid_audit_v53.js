(function(){
'use strict';
var B=window.QBANK||[];
var HIGH='G03 G10 G11 G22 W03 W04 W06 W07 W10 W25 W29 W30 W36 T03 T04 T07 T08 T11 T12 T15 T17 T21 T22 T30 T31 T36 T44 H03 H04 H07 H08 H09 H10 H12 H13 H17 H18 H19 H22 H27 H34 H38 H40 L01 L02 L04 L06 L07 L10 L12 L13 L14 L15 L16 L17 L19 L21 L22 L25 L28 L31 L32 L33 L38'.split(' ');
var MED='G13 G14 G16 G20 G25 G31 W01 W02 W08 W11 W31 W32 T01 T02 T05 T10 T14 T16 T19 T20 T24 T28 T29 T34 T37 T38 T41 T42 T43 H05 H06 H11 H15 H20 H21 H23 H24 H25 H28 H29 H30 H31 H32 H33 H35 H36 H37 H39 L03 L05 L08 L09 L18 L23 L24 L26 L27 L29 L34 L37'.split(' ');
var hi=new Set(HIGH),med=new Set(MED);
var typeGroups={
 diagnostic_map:new Set('G03 G22 W30'.split(' ')),
 analysis_flow:new Set('T15 T17 H03 H13 H19 H22 H38 H40 T28 T29 T34 T42 T43 H15 H21 H24 H25 H28 H30 H32 H35 H36 H37 H39'.split(' ')),
 reaction_flow:new Set('T03 T08 T31 T36 H04 H07 H08 H09 H10 H12 H17 H27 H34 L01 L28 T14 T24 H06 H11 H20 H23 H29 H31 H33'.split(' ')),
 mechanism_map:new Set('W01 W02 W03 W04 W06 W07 W25 W29 W36 T01 T02 T07 T16 T19 T30 T37 T38 T41 L02 L03 L04 L05 L06 L08 L09 L17 L18 L23 L24 L26 L27 L29 L34 L37'.split(' ')),
 process_map:new Set('G10 G11 G13 G14 G16 G20 G25 G31 W08 W10 W11 W31 W32 T04 T05 T10 T11 T12 T20 T21 T22 T44 H05 H18 L07 L10 L12 L13 L14 L15 L16 L19 L21 L22 L25 L31 L32 L33 L38'.split(' '))
};
function typeFor(id){for(var k in typeGroups)if(typeGroups[k].has(id))return k;return 'comparison_map';}
function reasonFor(q,priority,type){
  var base=priority==='high'?'工程順序・空間関係・反応機構を文章だけで追うより図解した方が誤概念を防ぎやすい。':'比較軸や判断順序をコンパクトな図にすると、選択肢間の差を整理しやすい。';
  return q.t+'：'+base+' 種別='+type+'。';
}
var rows=[];
B.forEach(function(q){
  var priority=hi.has(q.id)?'high':med.has(q.id)?'medium':'none';
  var type=priority==='none'?'none':typeFor(q.id);
  q.visualAidCandidate=priority!=='none';
  q.visualAidPriority=priority;
  q.visualAidType=type;
  q.visualAidReason=priority==='none'?'図解による追加学習効果が限定的で、文章・既存表/計算で十分。':reasonFor(q,priority,type);
  rows.push({id:q.id,subject:q.s,title:q.t,candidate:q.visualAidCandidate,priority:priority,type:type,reason:q.visualAidReason});
});
window.WATER1_VISUAL_AID_AUDIT={
  version:'v53',date:'2026-09-12',scope:'199 active questions',
  rows:rows,highPriorityIds:HIGH.slice(),mediumPriorityIds:MED.slice(),noneIds:rows.filter(function(r){return r.priority==='none';}).map(function(r){return r.id;}),
  counts:{active:rows.length,high:rows.filter(function(r){return r.priority==='high';}).length,medium:rows.filter(function(r){return r.priority==='medium';}).length,none:rows.filter(function(r){return r.priority==='none';}).length}
};
})();
