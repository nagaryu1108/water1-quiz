(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V84||!window.WATER1_SOURCE_AUDIT_V83)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v84';ids.push(id);}
review('G09','一次資料：環境省「イタイイタイ病」https://www.env.go.jp/policy/hakusyo/h24/html/hj12040102.html 、国立水俣病総合研究センター「水俣病の発生と原因」https://nimd.env.go.jp/qa/ 、環境省「二酸化硫黄と四日市ぜんそく」https://www.env.go.jp/policy/hakusyo/h03/7833.html 、WHO「Arsenic」https://www.who.int/teams/environment-climate-change-and-health/chemical-safety-and-health/health-impacts/chemicals/arsenic 、CDC/ATSDR「Malathion」https://wwwn.cdc.gov/TSP/MMG/MMGDetails.aspx?mmgid=517&toxid=92 。');
review('G10','一次資料：環境省「環境影響評価法の施行について」https://www.env.go.jp/hourei/19/000016.html 、環境省「環境影響評価の基本的事項」https://www.env.go.jp/hourei/19/000014.html 。方法書・準備書・評価書と不確実性に応じた事後調査を照合。表は演習条件。');
review('H08','一次資料：US EPA「Characterization and Treatment of Wastes from Metal-Finishing Operations」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100RQQ6.TXT 。EDTA錯形成による水酸化物沈殿阻害、硫化物沈殿等の比較。方式選定には金属種・錯体と後処理の評価が必要。');
review('H10','一次資料：US EPA「Removal of Boron From Wastewater」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=910126OB.TXT 、US EPA公開の処理可能性報告https://www.epa.gov/sites/default/files/2019-08/documents/gw_treatability_report_21march19.pdf 。樹脂選択性・再生、ROとpH依存を照合。試験表は演習値。');
review('L08','一次資料：USGS「Estimates of dissolved and suspended substance yield of stream basins in Michigan」https://pubs.usgs.gov/publication/wri834288 。L=aQ^bの経験関係と演習値b=1.4を確認し、流量10倍で10^1.4≈25.1倍を独立計算。');
review('L09','一次資料：US EPA「Enhanced Stream Water Quality Model QUAL2E」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30000KGT.TXT 、US EPA「Coastal General Ecosystem Model」https://www.epa.gov/system/files/documents/2023-09/CGEM_Modeling_Framework.pdf 。最小律・栄養塩の飽和関数・光のBeer則は別の現象を表す。');
var at=bank.findIndex(function(x){return x.id==='L10';});if(at<0)throw Error('Missing L10');var archived=bank.splice(at,1)[0];archived.coverageTrim={version:'v84',status:'archived',coveredBy:['L07'],reason:'高品質用途から低品質用途への段階再利用、必要な追加処理、塩類蓄積・ブロー管理はL07で保持'};
window.WATER1_ARCHIVED_QUESTIONS=(window.WATER1_ARCHIVED_QUESTIONS||[]).concat([archived]);
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v84')return s;s=prior(s);if(s.current==='L10'){s.current=null;s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v84';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V84={version:'v84',changed:ids,retired:['L10'],coveredBy:archived.coverageTrim.coveredBy,stale:[],migrate:migrate};
})();
