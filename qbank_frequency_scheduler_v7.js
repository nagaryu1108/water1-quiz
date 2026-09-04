(function(){
var bank=window.QBANK||[];
/* Evidence-count scheduler v12. Counts are publicly confirmed LOWER BOUNDS, not a claimed full census. */
var PROFILES=[
{name:'分析・試料取扱い',yearsMin:7,questionsMin:53,weight:3.50,re:/GC|GC-MS|ICP|原子吸光|イオンクロマト|流れ分析|CFA|HPLC|全窒素|全りん|DOセンサ|ヘッドスペース|試料保存|BOD希釈|ランバート|フェノール類|TOC|ウィンクラー|COD.*測定|BOD.*測定/},
{name:'活性汚泥・生物処理運転計算',yearsMin:7,questionsMin:35,weight:3.30,re:/活性汚泥|SRT|SVI|HRT|返送汚泥|曝気槽|BOD:N:P|硝化|脱窒|必要酸素|余剰汚泥|オキシデーションディッチ|生物膜|生物学的脱りん|UASB/},
{name:'水質法令・基準・地下水',yearsMin:8,questionsMin:32,weight:3.15,re:/水質汚濁防止法|水濁法|環境基準|排水基準|地下水|常時監視|総量規制|特定地下浸透水|指定施設|指定物質|有害物質貯蔵指定施設|上乗せ基準|水生生物保全/},
{name:'製紙・紙パルプ',yearsMin:8,questionsMin:9,weight:3.05,re:/製紙|紙パルプ|紙・パルプ|白水|黒液|ECF/},
{name:'シアン',yearsMin:6,questionsMin:11,weight:3.00,re:/シアン|CN|アルカリ塩素|紺青/},
{name:'冷却水・再利用',yearsMin:8,questionsMin:11,weight:3.00,re:/冷却水|濃縮倍数|ブロー|カスケード|再利用|循環冷却/},
{name:'製油所',yearsMin:7,questionsMin:7,weight:2.90,re:/製油所|石油精製|APIオイルセパレーター|サワーウォーター/},
{name:'Cr(VI)',yearsMin:5,questionsMin:6,weight:2.65,re:/六価クロム|Cr\(VI\)|CrVI|クロム\(VI\)/},
{name:'水域モデル・富栄養化',yearsMin:9,questionsMin:20,weight:2.95,re:/生態系モデル|L-Q|富栄養化|内部負荷|海域DO|貧酸素|植物プランクトン|POC|クロロフィル|赤潮|青潮/},
{name:'凝集沈殿',yearsMin:5,questionsMin:6,weight:2.35,re:/凝集|沈殿|ジャーテスト|フロック|水面積負荷/},
{name:'膜分離',yearsMin:4,questionsMin:6,weight:2.20,re:/膜分離|MF|UF|NF|RO|MBR|電気透析/},
{name:'有害金属群',yearsMin:4,questionsMin:6,weight:2.20,re:/水銀|セレン|ひ素|ふっ素|ほう素|キレート|フェライト|カドミウム|鉛/},
{name:'活性炭・吸着',yearsMin:4,questionsMin:4,weight:2.15,re:/活性炭|フロイントリッヒ|吸着|破過/}
];
function blob(x){return [x.id,x.s,x.t,x.q,x.p,(x.terms||[]).map(function(t){return t.name}).join(' ')].join(' ')}
function evidence(x){var s=blob(x),best={name:'未集計',yearsMin:0,questionsMin:0,weight:1.0};PROFILES.forEach(function(p){if(p.re.test(s)&&p.weight>best.weight)best=p;});return {theme:best.name,confirmedYearsMin:best.yearsMin,confirmedQuestionsMin:best.questionsMin,weight:best.weight,provisional:true};}
bank.forEach(function(x){x.freqEvidence=evidence(x);x.freqWeight=x.freqEvidence.weight;});
function install(){
if(!window.Q||!window.S)return;
window.freqPick=function(pool){if(!pool||!pool.length)return null;var sum=pool.reduce(function(a,x){return a+(x.freqWeight||1)},0),r=Math.random()*sum;for(var i=0;i<pool.length;i++){r-=(pool[i].freqWeight||1);if(r<=0)return pool[i].id}return pool[pool.length-1].id};
window.chooseCoverage=function(){var ss=window.sh(window.subjects().slice()),bestSubject=null,bestCount=999;ss.forEach(function(s){var pool=window.Q.filter(function(x){return x.s===s&&!window.covered(x.id)});if(pool.length){var c=window.Q.filter(function(x){return x.s===s&&window.covered(x.id)}).length;if(c<bestCount){bestCount=c;bestSubject=s;}}});if(!bestSubject)return null;return window.freqPick(window.Q.filter(function(x){return x.s===bestSubject&&!window.covered(x.id)}));};
window.weight=function(x){var h=window.S.hist[x.id];var weak=!h?0.4:(1+((h.wrong||0)/Math.max(1,h.attempts||0))*5+(h.wrong||0)*1.2);return weak*(x.freqWeight||1)};
window.weightedPick=function(pool){if(!pool.length)return null;var sum=pool.reduce(function(a,x){return a+window.weight(x)},0),r=Math.random()*sum;for(var i=0;i<pool.length;i++){r-=window.weight(pool[i]);if(r<=0)return pool[i].id}return pool[pool.length-1].id};
window.WATER1_FREQUENCY_SCHEDULER={enabled:true,version:'v12-count-evidence-r1-r6',method:'subject-balanced coverage -> confirmed lower-bound frequency; review -> frequency x personal weakness',profiles:PROFILES.map(function(p){return {theme:p.name,confirmedYearsMin:p.yearsMin,confirmedQuestionsMin:p.questionsMin,weight:p.weight};}),provisional:true,note:'R1/R4/R5/R6 question-level topic evidence added. Counts remain lower bounds until the 2006-2025 matrix is complete.'};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(install,0)});else setTimeout(install,0);
})();
