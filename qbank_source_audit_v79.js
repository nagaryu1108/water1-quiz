(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V79||!window.WATER1_SOURCE_AUDIT_V78)return;
var bank=window.QBANK||[],ids=[];
function edit(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v79';ids.push(id);}
edit('W30','一次資料：US EPA Performance Monitoring of MNA Remedies for VOCs in Ground Water（上流・下流・側方井戸配置）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=10004FKY.TXT 、USGS VOCs Along Ground-Water Flow Paths（流向とVOC分布）https://pubs.usgs.gov/wri/wrir034059/ 、USGS Fischer and Porter Site（水位・深度別流向）https://pubs.usgs.gov/publication/wri954220 。');
edit('W31','一次資料：US EPA Technical Guidance Manual for Developing TMDLs, BOD/DO（硝化抑制下の炭素性BOD）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=200055WG.TXT 、US EPA Simplified NOD Determination（20℃・5日間と硝化寄与）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20007YOY.TXT 。28・18 mg/Lは演習値であり、差は初期アンモニア濃度の直接測定ではない。');
edit('W32','一次資料：US EPA NPDES Permit Writers Manual（流量比例の定容量・変間隔および定間隔・変容量の合成採水）https://www.epa.gov/sites/default/files/2015-09/documents/pwm_2010.pdf 、US EPA Industrial User Permitting Guidance Manual（一定通過水量ごとの分取）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100FDCO.TXT 。日負荷は対応する濃度と水量の積算で求める。');
edit('W34','一次資料：環境省「陸域環境基準専門委員会議事録」（流入負荷量=発生負荷量×流達率）https://www.env.go.jp/council/09water/y092-02a.html 、環境省「水質総量削減制度導入指針」（流達率の概念）https://www.env.go.jp/content/900541722.pdf 。240 kg/日・0.60は演習値。');
edit('W35','一次資料：環境省「水質汚濁に係る環境基準の見直し」（大腸菌数の90%水質値）https://www.env.go.jp/press/110052.html 、厚生労働省「水道水中のクリプトスポリジウム等対策の実施について」（耐塩素性とろ過・紫外線）https://www.mhlw.go.jp/web/t_doc?dataId=00tb3806&dataType=1&pageNo=1 。');
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v79')return s;s=prior(s);s.bankContentVersion='v79';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V79={version:'v79',changed:ids,stale:[],migrate:migrate};
})();
