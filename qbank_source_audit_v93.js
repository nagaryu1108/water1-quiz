(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V93||!window.WATER1_SOURCE_AUDIT_V92)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v93';ids.push(id);}
review('H31','一次資料：US EPA「Preliminary Study of the Metal Finishing Category」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100P2ZN.TXT 、US EPA「Characterization and Treatment of Wastes from Metal-Finishing Operations」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100RQQ6.TXT 。金属ごとの溶解度-pH特性、強アルカリでの両性再溶解、EDTA等の錯化を考慮し、共通pHまたは段階処理を検討する。');
review('L29','一次資料：US EPA「WASP Model Documentation」https://www.epa.gov/hydrowq/wasp-model-documentation 、US EPA「Water Quality Analysis Simulation Program」https://www.epa.gov/hydrowq/water-quality-analysis-simulation-program-wasp 。DO・栄養塩・植物プランクトン等を状態変数とし、移流・拡散、内部反応、底泥境界フラックスを別の項で表す。境界条件だけでは反応を省けない。');
review('L31','一次資料：US EPA「Field Manual: Metal Finishing Wastewater Treatment」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20007J4U.TXT 、US EPA「Petroleum Refinery Wastewater Treatment System」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9100EN7A.TXT 、US EPA「Two-stage Biological Treatment of Coke Plant Wastewater」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000TB7K.TXT 、US EPA「Kraft Pulp Process」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=1000446B.TXT 。含油排水の重力・浮上分離、めっき系統分離、安水の後段処理、黒液と白水の別系統を照合。');
review('H32','一次資料：US EPA Method 7470A https://www.epa.gov/hw-sw846/sw-846-test-method-7470a-mercury-liquid-waste-manual-cold-vapor-technique 、US EPA「Mercury Speciation in Natural Waters」https://hero.epa.gov/hero/index.cfm/reference/details/reference_id/4161506 。全水銀の酸化・総量測定と形態別の分離分析を区別し、完全分解後の冷蒸気測定で元のメチル水銀を識別できない。');
review('H34','一次資料：US EPA「Removal of Fluorides from Industrial Wastewaters」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30000B4U.TXT 、US EPA「Boron Selective Resin Treatability Report」https://www.epa.gov/sites/default/files/2019-08/documents/gw_treatability_report_21march19.pdf 。CaF2沈殿後の残留ほう素にはN-メチルグルカミン型樹脂・膜等を候補とし、濃縮廃液も評価する。濃度は演習値。');
review('G34','一次資料：US EPA「Near-road vehicle emissions air quality monitoring for exposure modeling」https://hero.epa.gov/reference/7693101/ 、US EPA「Near-road air pollution seasonal variability」https://hero.epa.gov/reference/1551413/ 。NO2・COは交通・燃焼影響を疑う材料だが環境濃度は気象・背景にも依存し、単回観測から発生源寄与率・年間排出量は確定できない。表は演習値。');
review('W33','一次資料：環境省「要監視項目及び指針値」https://www.env.go.jp/water/impure/item.html 、環境省「令和6年度公共用水域水質測定結果及び地下水質測定結果」https://www.env.go.jp/press/press_03588.html 。PFOS・PFOA、ウラン、全マンガンの制度区分を確認。模式表から6/500=1.20%、4/450≈0.89%、2/800=0.25%を独立計算。地点選定の違いで全国順位は推定できない。');
var at=bank.findIndex(function(x){return x.id==='L32';});if(at<0)throw Error('Missing L32');var z=bank.splice(at,1)[0];z.coverageTrim={version:'v93',status:'archived',coveredBy:['L19'],reason:'紙パルプの黒液・白水・漂白工程別の回収と排水負荷はL19に保持'};window.WATER1_ARCHIVED_QUESTIONS=(window.WATER1_ARCHIVED_QUESTIONS||[]).concat([z]);
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v93')return s;var wasL32=s.current==='L32';s=prior(s);if(wasL32||s.current==='L32'){s.current=null;s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v93';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V93={version:'v93',changed:ids,retired:['L32'],coveredBy:['L19'],stale:[],migrate:migrate};
})();
