(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V82||!window.WATER1_SOURCE_AUDIT_V81)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v82';ids.push(id);}
review('H05','一次資料：環境省「PFOS等の濃度低減のための対策技術集」https://www.env.go.jp/press/press_04977.html 、US EPA PFAS Treatment Fact Sheet（GAC・陰イオン交換・ROと残渣管理）https://www.epa.gov/system/files/documents/2024-04/pfas-npdwr_fact-sheet_treatment_4.8.24.pdf 。吸着・分離は槽内での完全無機化を意味しない。');
review('L02','一次資料：環境省「指定水域の水質汚濁メカニズム」（閉鎖性海域の成層・内部生産・沈降・分解・水交換）https://www.env.go.jp/council/content/49wat-doj02/000320313.pdf 、環境省「底層の貧酸素化とその影響」https://www.env.go.jp/content/900542730.pdf 。条件は演習用。');
review('L03','一次資料：US EPA Processes, Coefficients, and Models for Simulating Toxic Organics and Heavy Metals in Surface Waters（完全混合・滞留時間の物質収支）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000HUI3.TXT 。演習条件からVdC/dt=−QC、C/C0=exp(−Qt/V)、V/Q=50日でexp(−1)=0.368を独立計算。');
review('L05','一次資料：USGS「Chlorophyll : Carbon Ratio」（光・温度・栄養制限によるChl-aと生産速度の関係）https://pubs.usgs.gov/publication/70185325 、US EPA Nutrient and Response Variable Overviews（色素量と藻類現存量の相違）https://archive.epa.gov/epa/nutrient-policy-data/n-steps-nutrient-and-response-variable-overviews.html 。表は演習値。');
var at=bank.findIndex(function(x){return x.id==='L04';});if(at<0)throw Error('Missing L04');var archived=bank.splice(at,1)[0];archived.coverageTrim={version:'v82',status:'archived',coveredBy:['W01','W03','W36'],reason:'成層・秋季循環・底層DO・栄養塩再分配は既存問題で保持'};
window.WATER1_ARCHIVED_QUESTIONS=(window.WATER1_ARCHIVED_QUESTIONS||[]).concat([archived]);
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v82')return s;s=prior(s);if(s.current==='L04'){s.current=null;s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v82';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V82={version:'v82',changed:ids,retired:['L04'],coveredBy:archived.coverageTrim.coveredBy,stale:[],migrate:migrate};
})();
