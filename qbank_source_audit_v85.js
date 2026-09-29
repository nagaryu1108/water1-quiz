(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V85||!window.WATER1_SOURCE_AUDIT_V84)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v85';ids.push(id);}
review('G07','一次資料：e-Gov「特定工場における公害防止組織の整備に関する法律」https://laws.e-gov.go.jp/law/346AC0000000107 、環境省「公害防止統括者の選任の届出等について」https://www.env.go.jp/hourei/17/000004.html 。主任管理者の選任60日・届出30日、統括者の従業員20人以下の例外を確認。権限移譲等により市長等が届出先となる場合がある。');
review('H06','一次資料：US EPA「Final Treatment Technology Background Document」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9100EAHI.TXT 、US EPA「Feasibility Study, GEMS Landfill Site」https://semspub.epa.gov/work/02/112729.pdf 。金属水酸化物の溶解度・高pH側での両性挙動を確認。表は演習値であり金属種の同定値ではない。');
review('H09','一次資料：US EPA「Removal of Fluorides from Industrial Wastewaters」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30000B4U.TXT （カルシウム塩でCaF2沈殿）。演習条件から100/19÷2×74÷0.9=216.4 mg/Lを独立計算。化学量論量と実設備薬注量は区別する。');
review('G11','一次資料：ISO「ISO 14001:2026」https://www.iso.org/standard/14001 、ISO「Plan-Do-Check-Act model」https://committee.iso.org/sites/tc207sc1/home/projects/published/iso-14001---environmental-manage/plan-do-check-act-model.html 。演習表のCOD改善・薬品量・汚泥量増加を併せて評価し、条件最適化と是正の有効性確認へ進む。');
review('G12','一次資料：環境省「令和6年度公共用水域水質測定結果」https://www.env.go.jp/press/press_03588.html （達成水域数と類型指定水域数の集計）。演習表の分子67・分母90より74.4%を独立計算。中央値や3区分の並びから個別水域の値・因果は確定できない。');
review('G13','一次資料：ISO「ISO 14040:2006」https://committee.iso.org/standard/37456.html 、ISO「Life-cycle perspective」https://committee.iso.org/sites/tc207sc1/home/projects/published/iso-14001---environmental-manage/life-cycle.html 。機能単位・境界と上流から廃棄までの負荷移転を確認。');
var at=bank.findIndex(function(x){return x.id==='L06';});if(at<0)throw Error('Missing L06');var archived=bank.splice(at,1)[0];archived.coverageTrim={version:'v85',status:'archived',coveredBy:['W01','W36'],reason:'水温・DO鉛直分布の躍層と底層酸素収支はW01、季節循環はW36で保持'};
window.WATER1_ARCHIVED_QUESTIONS=(window.WATER1_ARCHIVED_QUESTIONS||[]).concat([archived]);
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v85')return s;s=prior(s);if(s.current==='L06'){s.current=null;s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v85';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V85={version:'v85',changed:ids,retired:['L06'],coveredBy:archived.coverageTrim.coveredBy,stale:[],migrate:migrate};
})();
