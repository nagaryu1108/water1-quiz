(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V80||!window.WATER1_SOURCE_AUDIT_V79)return;
var bank=window.QBANK||[],ids=[];
function edit(id,p){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);Object.keys(p).forEach(function(k){if(k==='point'){var old=String(q.p||''),at=old.search(/<(?:div|details)\b/);q.p=p[k]+(at<0?'':' '+old.slice(at));}else q[k]=p[k];});q.contentReviewVersion='v80';ids.push(id);}
edit('W36',{src:'一次資料：環境省「冬季全循環の変化」（成層・水温躍層、表層冷却と混合）https://www.env.go.jp/content/900542176.pdf 、US EPA Lake and Reservoir Restoration Guidance Manual（底層DOの供給・消費）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=00001K2S.TXT 。水温プロファイルは演習用模式値。'});
edit('W39',{src:'一次資料：環境省「生活環境の保全に関する環境基準（湖沼）」底層溶存酸素量、生物1=4、生物2=3、生物3=2 mg/L以上、日間平均値 https://www.env.go.jp/kijun/wt2-1-2.html 。W12は計算、本問は類型の保全対象と評価方法を問う。'});
edit('G01',{src:'一次資料：環境基本法第16条 https://laws.e-gov.go.jp/law/405AC0000000091 、環境省「環境基準」https://www.env.go.jp/kijun/ 。全5肢で「条件・保護・保全」の条文用語を照合。'});
edit('G02',{src:'一次資料：水質汚濁防止法第3条 https://laws.e-gov.go.jp/law/345AC0000000138 、環境省「水質汚濁防止法の施行について」（上乗せ排水基準）https://www.env.go.jp/hourei/05/000136.html 。全5肢で熱・都道府県・条例・許容限度を照合。設問文は条文を一部要約している。'});
var g=bank.find(function(x){return x.id==='G03';}),v=JSON.parse(JSON.stringify(g.v));v.rows[0][1]='対象物質が環境基準を超過';v.note='概況調査で新たな基準超過を確認した後、汚染範囲・原因仮説を把握する。';
edit('G03',{
 q:'地下水の概況調査で井戸Aから対象物質が環境基準を超えて検出され、既知の工場はAの上流側に位置する。下表の情報を踏まえ、次段階の調査計画として最も適当なものはどれか。',
 v:v,
 point:'概況調査で新たな基準超過を確認した後は、汚染井戸周辺地区調査で汚染範囲を把握する。流向、鉛直分布、土地利用、濃度分布を合わせ、原因仮説を検証する。',
 src:'一次資料：環境省「水質モニタリング方式効率化指針の通知について」（概況・汚染井戸周辺地区・継続監視調査の目的）https://www.env.go.jp/hourei/05/000141.html 、環境省「地下水質モニタリングの手引き」（深度・流向等を考慮した測定計画）https://www.env.go.jp/content/900539358.pdf 。表は演習用。'
});
var stale=['G03'],prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v80')return s;s=prior(s);stale.forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object'){if(h.lastSel!==undefined&&h.lastSel!==null)h.previousV79Selection={version:'v79',index:h.lastSel};h.lastSel=null;}});if(stale.indexOf(s.current)>=0){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v80';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V80={version:'v80',changed:ids,stale:stale,migrate:migrate};
})();
