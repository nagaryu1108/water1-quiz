(function(){
'use strict';
var B=window.QBANK||[];
var VERSION='v60';
function get(id){return B.find(function(x){return x.id===id;});}
function set(id,p){var q=get(id);if(q)Object.keys(p).forEach(function(k){q[k]=p[k];});}

/* W39 previously put the correct 4/3/2 mg/L thresholds in one choice and a
   wrong 1 mg/L value in another, turning a five-choice question into a
   same-fact duel. W12 already tests the numeric thresholds by calculation.
   W39 now tests independent dimensions of the standard instead. */
set('W39',{
  t:'底層溶存酸素量・類型目的と評価方法',
  q:'湖沼及び海域の底層溶存酸素量（底層DO）の環境基準に関する記述として、誤っているものはどれか。',
  v:null,
  o:[
    '底層DOは、湖沼・海域の底層における貧酸素化を評価し、水生生物の生息・再生産の場の保全等に資する生活環境項目である。',
    '底層DOの環境基準は、1日の測定値のうち最も低い1点だけを用いて適否を判定し、日間平均値は用いない。',
    '生物1は、生息又は再生産段階で貧酸素耐性の低い水生生物を保全・再生する水域を対象とする。',
    '生物2は、貧酸素耐性の低い水生生物を除く水生生物が生息又は再生産できる場を保全・再生する水域を対象とする。',
    '生物3は、貧酸素耐性の高い水生生物の生息・再生産や、無生物域の解消を目的とする水域を対象とする。'
  ],
  a:1,
  p:'誤りは2。底層DOの環境基準は日間平均値で評価し、1日の最低値1点だけで適否を決めるものではない。類型別基準値は生物1=4.0 mg/L以上、生物2=3.0 mg/L以上、生物3=2.0 mg/L以上である。数値そのものはW12で日間平均の計算と組み合わせて確認し、本問では評価方法と各類型の保全目的を独立して判別する。',
  e:[
    '【正しい】底層DOは、湖沼・海域の底層で生じる貧酸素化を把握し、水生生物の生息・再生産の場を保全するための生活環境項目である。\n【関連】一般の水中DOとは別に、底層の貧酸素問題を対象として類型指定して評価する。',
    '【誤り】「1日の最低値1点だけを用いる」「日間平均値は用いない」の部分が誤り。\n【正しい文章】底層DOの基準値は日間平均値で評価する。\n【関連】現行基準値は生物1=4.0、生物2=3.0、生物3=2.0 mg/L以上。\n【ひっかけ】瞬間値・最低値・日間平均値を入れ替える肢に注意する。',
    '【正しい】生物1は、貧酸素耐性の低い水生生物の生息・再生産の場を保全・再生するための類型である。\n【関連】3類型の中で最も高い底層DO水準が求められる。',
    '【正しい】生物2は、生物1が対象とする貧酸素耐性の低い生物を除いた水生生物の生息・再生産の場を保全・再生する類型である。\n【ひっかけ】生物1と生物2の保全対象を逆転させない。',
    '【正しい】生物3は、貧酸素耐性の高い水生生物の生息・再生産や無生物域の解消を目的とする類型である。\n【関連】類型目的と基準値を別々に暗記せず、必要な酸素水準との関係で理解する。'
  ],
  src:'環境省「生活環境の保全に関する環境基準（湖沼・海域）」の現行底層DO基準を基にしたオリジナル問題',
  choiceIndependenceVersion:VERSION
});

window.QBANK=B;
window.WATER1_CHOICE_INDEPENDENCE={version:VERSION,rewritten:['W39']};
})();