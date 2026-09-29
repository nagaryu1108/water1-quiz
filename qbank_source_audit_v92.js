(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V92||!window.WATER1_SOURCE_AUDIT_V91)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v92';ids.push(id);}
review('L26','一次資料：USGS「DOTABLES: Dissolved Oxygen Solubility」https://water.usgs.gov/water-resources/software/DOTABLES/ 、NOAA「Monitoring Estuaries」https://oceanservice.noaa.gov/education/tutorial_estuaries/est10_monitor.html 。DO飽和濃度は水温・塩分・気圧に依存する。高温・高塩分のBでは飽和濃度が低いため、実測7 mg/Lが同じでも飽和度は高い。');
review('L28','一次資料：US EPA「Wastewater Technology Fact Sheet: Ammonia Stripping」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P10099PH.TXT 、US EPA「Emerging Technologies for Wastewater Treatment」https://www.epa.gov/sites/default/files/2019-08/documents/emerging_technologies_for_wastewater_treatment_and_in_plant_wet_weather_management.pdf 。高pH・加温はNH4+から遊離NH3への移行と気相移動を促し、塔頂側のNH3は吸収・回収等で管理する。');
review('G29','一次資料：環境省「環境白書：環境基本法第1条」https://www.env.go.jp/policy/hakusyo/h17/22366.html 。目的条文の基本理念、施策の基本となる事項、総合的かつ計画的、健康で文化的という語順を確認。');
review('G30','一次資料：環境省「総量規制専門委員会議事録」https://www.env.go.jp/council/09water/y097-04a.html 。負荷量=流量×濃度。演習値500 m3/日×20 mg/L=10,000,000 mg/日=10 kg/日。');
review('G31','一次資料：環境省「公害防止管理者等資格認定講習について」https://www.env.go.jp/air/info/training.html 、環境省「指定物質に関するQ&A」https://www.env.go.jp/water/law/qa_hs.html 、US EPA「Field Manual: Metal Finishing Wastewater Treatment」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20007J4U.TXT 。放流前pH異常時は代替測定、流出防止、計器・薬注点検と記録を行う。法定の事故届出の要否は実際の流出と適用条件に従う。');
review('H30','一次資料：US EPA Method 7470A「Mercury in Liquid Wastes (Manual Cold-Vapor Technique)」https://www.epa.gov/hw-sw846/sw-846-test-method-7470a-mercury-liquid-waste-manual-cold-vapor-technique 。有機水銀等を前処理・酸化して定量的に総水銀を回収し、後段でHg(II)をHg(0)へ還元・気化して測定する。');
var retired=[],coverage={L27:['L24'],H29:['H27']};
for(var id of ['L27','H29']){var at=bank.findIndex(function(x){return x.id===id;});if(at<0)throw Error('Missing '+id);var z=bank.splice(at,1)[0];z.coverageTrim={version:'v92',status:'archived',coveredBy:coverage[id],reason:id==='L27'?'高濃縮時の硬度・シリカ・塩化物とスケール・腐食の運転判断はL24で保持':'鉄シアノ錯体の残留、化学形態による酸化難易度と追加処理はH27で保持'};window.WATER1_ARCHIVED_QUESTIONS=(window.WATER1_ARCHIVED_QUESTIONS||[]).concat([z]);retired.push(id);}
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v92')return s;s=prior(s);if(retired.indexOf(s.current)!==-1){s.current=null;s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v92';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V92={version:'v92',changed:ids,retired:retired,coveredBy:coverage,stale:[],migrate:migrate};
})();
