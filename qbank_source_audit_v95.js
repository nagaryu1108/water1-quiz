(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V95||!window.WATER1_SOURCE_AUDIT_V94)return;
var bank=window.QBANK||[],ids=[],retired=['H40','L38'],coverage={H40:['H25','H37'],L38:['L25']};
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v95';ids.push(id);}
review('H38','一次資料：US EPA「Test Methods for Evaluating Solid Waste」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000FROD.TXT 、US EPA「Colorado Smelter Support Document」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1014BW6.txt 。VOCのトリップブランクは試料と同行し未開封のまま輸送・保管由来の汚染を監視する。現場操作を含むフィールドブランク、試薬・手順由来のメソッドブランク、添加回収試験と区別する。');
review('L36','一次資料：US EPA「WASP8 Multiple Algae Model Theory and User’s Guide」https://www.epa.gov/sites/default/files/2018-05/documents/mpm-user-guide.pdf 、US EPA「Technical Guidance Manual for Performing Waste Load Allocations」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=00001IUY.TXT 。C/Chl-a=50は問題で与えた演習値。Chl-a 0.040 mg/L×50=2.0 mgC/Lと非藻類POC 1.0 mgC/Lを合算し、CH2O完全酸化の32/12倍で8.0 mgO2/L。実水域の酸素消費を直接予測する値ではない。');
review('L37','一次資料：USGS「Nutrient limitation of phytoplankton in three tributaries of Chesapeake Bay」https://pubs.usgs.gov/publication/70237867 、USGS「The role of phosphorus and nitrogen on chlorophyll a」https://pubs.usgs.gov/publication/70228654 。+Nのみ応答し+Pは対照並み、+N+Pも+N並みなら当該培養条件でN制限が示唆される。単回の結果を全年・全地点に外挿せず、夜間の呼吸・DOも区別する。曲線は演習値。');
review('G38','一次資料：環境省「産業廃棄物の排出及び処理状況等（令和5年度実績）」https://www.env.go.jp/press/110498_00003.html 。汚泥42.1%、動物のふん尿21.9%、がれき類16.5%、再生利用54.7%、減量化42.9%、最終処分2.4%。種類別と処理状況は異なる分類軸。');
bank.find(function(x){return x.id==='G38';}).e[1]=bank.find(function(x){return x.id==='G38';}).e[1].replace('最新公表の令和5年度実績','令和5年度実績');
review('G39','一次資料：環境省「ダイオキシン類対策特別措置法の施行について」https://www.env.go.jp/hourei/04/000058.html 。TEQは各異性体の濃度×対応するTEFを合計する。設問の仮定値なら2×1+10×0.1=3 pg-TEQ/Lで、濃度の単純和やTEFの単純平均ではない。');
review('H39','一次資料：US EPA「In the Lab - Quality Assurance and Quality Control」https://www.epa.gov/choose-fish-and-shellfish-wisely/lab-quality-assurance-and-quality-control 、US EPA「TCLP Technical Assistance Document」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1007NTD.TXT 。添加回収率=(15−8)/10×100=70%。前処理前添加では前処理損失とマトリックス効果の両方を疑うが、この値だけで原因は確定できない。補正法は適用可能性を個別評価する。');
for(var id of retired){var at=bank.findIndex(function(x){return x.id===id;});if(at<0)throw Error('Missing '+id);var z=bank.splice(at,1)[0];z.coverageTrim={version:'v95',status:'archived',coveredBy:coverage[id],reason:id==='H40'?'As水素化物発生・気液分離・原子吸光はH25の運転診断とH37の分析法選択に保持':'濃厚金属廃液の回収・専用処理と低濃度洗浄排水の系統分離はL25に保持'};window.WATER1_ARCHIVED_QUESTIONS=(window.WATER1_ARCHIVED_QUESTIONS||[]).concat([z]);}
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v95')return s;var wasRetired=retired.indexOf(s.current)!==-1;s=prior(s);if(wasRetired||retired.indexOf(s.current)!==-1){s.current=null;s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v95';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V95={version:'v95',changed:ids,retired:retired,coveredBy:coverage,stale:[],migrate:migrate};
})();
