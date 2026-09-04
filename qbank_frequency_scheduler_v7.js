(function(){
var bank=window.QBANK||[];
/*
  Evidence-count scheduler v8.
  The weights below are based on publicly confirmed LOWER-BOUND counts, not a claimed complete census.
  Five-subject coverage remains primary; historical evidence is multiplied by the learner's weak-area weight.
*/
var PROFILES=[
  {name:'分析・試料取扱い',yearsMin:6,questionsMin:42,weight:3.40,re:/GC|GC-MS|ICP|原子吸光|イオンクロマト|流れ分析|CFA|HPLC|全窒素|全りん|DOセンサ|ヘッドスペース|試料保存|BOD希釈|ランバート|フェノール類|TOC分析|ウィンクラー/},
  {name:'活性汚泥・生物処理運転計算',yearsMin:6,questionsMin:26,weight:3.15,re:/活性汚泥|SRT|SVI|HRT|返送汚泥|曝気槽|BOD:N:P|硝化|脱窒|必要酸素|余剰汚泥|オキシデーションディッチ/},
  {name:'製紙・紙パルプ',yearsMin:7,questionsMin:7,weight:2.95,re:/製紙|紙パルプ|紙・パルプ|白水|黒液|ECF/},
  {name:'シアン',yearsMin:5,questionsMin:9,weight:2.85,re:/シアン|CN|アルカリ塩素|紺青/},
  {name:'水質法令・基準・地下水',yearsMin:5,questionsMin:17,weight:2.75,re:/水質汚濁防止法|水濁法|環境基準|排水基準|地下水|常時監視|総量規制|特定地下浸透水|指定施設|指定物質/},
  {name:'Cr(VI)',yearsMin:5,questionsMin:6,weight:2.65,re:/六価クロム|Cr\(VI\)|CrVI|クロム\(VI\)/},
  {name:'冷却水・再利用',yearsMin:5,questionsMin:5,weight:2.60,re:/冷却水|濃縮倍数|ブロー|カスケード|再利用|循環冷却/},
  {name:'製油所',yearsMin:5,questionsMin:5,weight:2.60,re:/製油所|石油精製|APIオイルセパレーター/},
  {name:'凝集沈殿',yearsMin:4,questionsMin:4,weight:2.20,re:/凝集|沈殿|ジャーテスト|フロック|水面積負荷/},
  {name:'膜分離',yearsMin:3,questionsMin:3,weight:2.05,re:/膜分離|MF|UF|NF|RO|MBR|電気透析/},
  {name:'活性炭・吸着',yearsMin:3,questionsMin:3,weight:2.05,re:/活性炭|フロイントリッヒ|吸着|破過/},
  {name:'有害金属群',yearsMin:3,questionsMin:4,weight:2.10,re:/水銀|セレン|ひ素|ふっ素|ほう素|キレート|フェライト/},
  {name:'水域モデル・富栄養化',yearsMin:4,questionsMin:6,weight:2.20,re:/生態系モデル|L-Q|富栄養化|内部負荷|海域DO|貧酸素|植物プランクトン/}
];
function blob(x){return [x.id,x.s,x.t,x.q,x.p,(x.terms||[]).map(function(t){return t.name}).join(' ')].join(' ')}
function evidence(x){
  var s=blob(x),best={name:'未集計',yearsMin:0,questionsMin:0,weight:1.0};
  PROFILES.forEach(function(p){if(p.re.test(s)&&p.weight>best.weight)best=p;});
  return {theme:best.name,confirmedYearsMin:best.yearsMin,confirmedQuestionsMin:best.questionsMin,weight:best.weight,provisional:true};
}
bank.forEach(function(x){x.freqEvidence=evidence(x);x.freqWeight=x.freqEvidence.weight;});
function install(){
  if(!window.Q||!window.S)return;
  window.freqPick=function(pool){
    if(!pool||!pool.length)return null;
    var sum=pool.reduce(function(a,x){return a+(x.freqWeight||1)},0),r=Math.random()*sum;
    for(var i=0;i<pool.length;i++){r-=(pool[i].freqWeight||1);if(r<=0)return pool[i].id}
    return pool[pool.length-1].id;
  };
  window.chooseCoverage=function(){
    var ss=window.sh(window.subjects().slice()),bestSubject=null,bestCount=999;
    ss.forEach(function(s){
      var pool=window.Q.filter(function(x){return x.s===s&&!window.covered(x.id)});
      if(pool.length){var c=window.Q.filter(function(x){return x.s===s&&window.covered(x.id)}).length;if(c<bestCount){bestCount=c;bestSubject=s;}}
    });
    if(!bestSubject)return null;
    return window.freqPick(window.Q.filter(function(x){return x.s===bestSubject&&!window.covered(x.id)}));
  };
  window.weight=function(x){
    var h=window.S.hist[x.id];
    var weak=!h?0.4:(1+((h.wrong||0)/Math.max(1,h.attempts||0))*5+(h.wrong||0)*1.2);
    return weak*(x.freqWeight||1);
  };
  window.weightedPick=function(pool){
    if(!pool.length)return null;
    var sum=pool.reduce(function(a,x){return a+window.weight(x)},0),r=Math.random()*sum;
    for(var i=0;i<pool.length;i++){r-=window.weight(pool[i]);if(r<=0)return pool[i].id}
    return pool[pool.length-1].id;
  };
  window.WATER1_FREQUENCY_SCHEDULER={enabled:true,version:'v8-count-evidence',method:'subject-balanced coverage -> confirmed lower-bound frequency; review -> frequency x personal weakness',profiles:PROFILES.map(function(p){return {theme:p.name,confirmedYearsMin:p.yearsMin,confirmedQuestionsMin:p.questionsMin,weight:p.weight};}),provisional:true,note:'Counts are confirmed lower bounds until the 2006-2025 question-level matrix is complete.'};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(install,0)});else setTimeout(install,0);
})();
