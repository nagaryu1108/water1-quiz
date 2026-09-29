(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V78||!window.WATER1_SOURCE_AUDIT_V77)return;
var bank=window.QBANK||[],ids=[];
function edit(id,p){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);Object.keys(p).forEach(function(k){if(k==='point'){var old=String(q.p||''),at=old.search(/<(?:div|details)\b/);q.p=p[k]+(at<0?'':' '+old.slice(at));}else q[k]=p[k];});q.contentReviewVersion='v78';ids.push(id);}
edit('W19',{src:'一次資料：環境省「水質基準項目と基準値」（ジェオスミン、2-MIB、TOCの個別項目）https://www.env.go.jp/water/water_supply/kijun/kijunchi.html 、USGS Turbidity（光学応答と粒径・色）https://www.usgs.gov/labs/national-water-quality-laboratory/science/science-topics/turbidity 、USGS Water Quality（BODと電気伝導率）https://water.usgs.gov/nwc/NWC/water_quality/tables/quality.abs.html 、US EPA Method 9060A（TOC）https://www.epa.gov/sites/default/files/2015-12/documents/9060a.pdf 。'});
edit('W21',{src:'一次資料：NCI研究者らのMetallothionein Protection of Cadmium Toxicity https://pmc.ncbi.nlm.nih.gov/articles/PMC2740813/ 、US EPA LD50説明 https://www.epa.gov/haps/about-health-effects-fact-sheets 、WHO heavy metals（メチル水銀の食物連鎖・カドミウム）https://www.who.int/publications-detail-redirect/9789289071796 、US EPA Human Health Risk Assessment https://www.epa.gov/risk/conducting-human-health-risk-assessment 。生物濃縮係数だけで曝露量・毒性を決められない。'});
edit('W22',{
 o:['政令で定める施設の種類・業種・工程機能と実際の使用状況を照合し、該当施設から生じる汚水・廃液の系統も確認する。','設備名称に「洗浄」が含まれれば、施行令別表の業種・工程の限定に関係なく特定施設と判定する。','事業場の排水量が少なければ、排水基準の適用条件と施設類型の該当性を同じ判定にまとめ、政令上の施設も非該当とする。','乾式主体の工程で付帯スクラバーから排水が生じても、主工程の排水ではないため施設・排水系統の照合対象から除外する。','既設設備を同型へ更新する場合は、使用薬品や排水性状が変わっても既存届出との照合と変更手続の確認を省く。'],
 e:['【正しい】法第2条と施行令別表第1の施設類型を実際の工程・排水の発生と照合する。','【誤り】「洗浄」という通称だけでは政令上の業種・施設区分を決められない。実際の機能を照合する。','【誤り】施設類型の該当性と排水基準等の適用条件は別に判定する。少量排水だけで施設類型から外さない。','【誤り】乾式主体でも付帯する湿式処理等の汚水・廃液を含め、施設と排水系統を確認する。','【誤り】既設・同型更新だけで届出事項の変更を見落とさず、使用方法・排水性状などを照合して手続の要否を判断する。'],
 src:'一次資料：環境省「水質汚濁防止法第二条第二項の特定施設について」（施行令別表第1の具体例）https://www.env.go.jp/hourei/05/000128.html 、環境省「特定施設の変更等の届出」https://www.env.go.jp/info/one-stop/28/003.html 、水質汚濁防止法第2条・第5条・第7条 https://laws.e-gov.go.jp/law/345AC0000000138 。'
});
edit('W24',{src:'一次資料：US EPA Method 8260D（VOC分析・水試料のヘッドスペース抑制）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P10182D1.TXT 、US EPA PCB Technical Factsheet（PCBの底質・懸濁物への吸着）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1011OOM.txt 、環境省「水質汚濁に係る環境基準」https://www.env.go.jp/kijun/mizu.html 。PCBを全て難揮発と一般化せず、VOCと物性・分析法を個別に比較する。'});
edit('W26',{src:'一次資料：US EPA Toxicokinetics Overview（吸収・分布・代謝・排泄）https://www.epa.gov/chemical-research/toxicokinetics-overview 、US EPA Conducting a Human Health Risk Assessment（曝露経路）https://www.epa.gov/risk/conducting-human-health-risk-assessment 、US EPA Guidelines for Carcinogen Risk Assessment（反応性代謝物）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100LY5C.TXT 。物質・数値は演習上の設定。'});
var stale=['W22'],prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v78')return s;s=prior(s);stale.forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object'){if(h.lastSel!==undefined&&h.lastSel!==null)h.previousV77Selection={version:'v77',index:h.lastSel};h.lastSel=null;}});if(stale.indexOf(s.current)>=0){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v78';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V78={version:'v78',changed:ids,stale:stale,migrate:migrate};
})();
