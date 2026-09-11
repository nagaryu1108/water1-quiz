(function(){
'use strict';
var B=window.QBANK||[];
function q(id){var x=B.find(function(v){return v.id===id;});if(!x)throw new Error('v45 polish missing '+id);return x;}
function choice(id,i,text,exp){var x=q(id);x.o[i]=text;if(exp)x.e[i]=exp;x.semanticPolishVersion='v45';}

/* Final prose-length balance: retain a plausible same-domain public-health distractor. */
choice('G18',3,
  '水俣病―水俣湾周辺―PCBに汚染された食用油を介する曝露',
  '【誤り】水俣病は工場排水由来のメチル水銀が魚介類へ蓄積し、それを摂取した住民に中枢神経障害を生じた公害である。PCB等に汚染された食用油による曝露はカネミ油症との混同である。'
);
})();
