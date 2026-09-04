(function(){
var bank=window.QBANK||[];
/*
  Verified-frequency scheduler.
  Tiering uses only publicly confirmed repetition; it does not pretend that the still-incomplete
  2006-2025 audit is an exact census. Five-subject coverage is preserved, then historical repeat
  strength is multiplied by the learner's own weak-area weight.
*/
function text(x){return [x.id,x.s,x.t,x.q].join(' ')}
function tier(x){
  var s=text(x);
  /* Tier A: repeated blocks or explicit long-running repeats in official JEMAI explanations. */
  if(/製油所|製紙|紙パルプ|活性汚泥|SRT|SVI|返送汚泥|曝気槽|BOD:N:P|硝化|脱窒|シアン|GC|ICP|原子吸光|イオンクロマト|流れ分析|CFA|HPLC|全窒素|全りん|DOセンサ|ヘッドスペース|試料保存/.test(s))return 3.0;
  /* Tier B: repeatedly confirmed treatment, hazardous substances, large-water calculations. */
  if(/六価クロム|Cr\(VI\)|ふっ素|ほう素|セレン|ひ素|水銀|キレート|膜分離|凝集|沈殿|活性炭|吸着|冷却水|濃縮倍数|L-Q|生態系モデル|カスケード|再利用|コークス|めっき|食料品|ビール/.test(s))return 2.35;
  /* Tier C: recurring legal / standards / eutrophication / monitoring themes. */
  if(/水質汚濁防止法|環境基準|排水基準|地下水|常時監視|総量規制|富栄養化|DO|BOD|COD|PRTR|水生生物|公害防止管理者/.test(s))return 1.75;
  return 1.0;
}
bank.forEach(function(x){x.freqWeight=tier(x);});
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
      if(pool.length){
        var c=window.Q.filter(function(x){return x.s===s&&window.covered(x.id)}).length;
        if(c<bestCount){bestCount=c;bestSubject=s;}
      }
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
  window.WATER1_FREQUENCY_SCHEDULER={enabled:true,method:'subject-balanced coverage -> verified-frequency weighted; review -> frequency x personal weakness',tiers:{A:3.0,B:2.35,C:1.75,base:1.0},note:'H22 JEMAI official explanation explicitly describes cyanide wastewater treatment as an annual topic; cyanide is therefore promoted to Tier A.'};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(install,0)});else setTimeout(install,0);
})();
