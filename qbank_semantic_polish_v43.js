(function(){
'use strict';
var B=window.QBANK||[];
function q(id){var x=B.find(function(v){return v.id===id;});if(!x)throw new Error('v43 polish missing '+id);return x;}
function choice(id,i,text,exp){var x=q(id);x.o[i]=text;x.e[i]=exp;x.semanticPolishVersion='v43';}
/* T34: remove the remaining impossible P2-gas distractor; keep all choices inside total-phosphorus analytical chemistry. */
choice('T34',2,
  '酸化分解では有機態りんを正リン酸態へ変換せず、縮合りん酸として保持したままモリブデン青発色へ導く。',
  '【誤り】全りん測定では有機態・縮合りん酸等を測定可能な正リン酸態へ変換することが重要。分解後に正リン酸として発色・定量する。');
})();