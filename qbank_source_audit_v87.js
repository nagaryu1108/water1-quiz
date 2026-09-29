(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V87||!window.WATER1_SOURCE_AUDIT_V86)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v87';ids.push(id);}
review('G15','一次資料：US EPA「Data Considerations」https://www.epa.gov/n-steps-online/data-considerations 、US EPA「Method Detection Limit」https://www.epa.gov/cwa-methods/method-detection-limit-frequent-questions 。演習条件0.006 mg/L=6 µg/Lは検出下限3 µg/Lより上、定量下限10 µg/Lより下。報告は適用法・制度の定めに従う。');
review('G16','一次資料：US EPA「Human Health Risk Assessment」https://www.epa.gov/risk/human-health-risk-assessment 、US EPA「Exposure Assessment Tools by Routes」https://www.epa.gov/expobox/exposure-assessment-tools-routes 。有害性、量・頻度・期間・経路を含む曝露評価を合わせてリスクを特徴づける。');
review('H15','一次資料：US EPA Method 5030C https://www.epa.gov/sites/default/files/2015-12/documents/5030c.pdf 、US EPA Method 8260D https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P10182D1.TXT 。パージトラップ・ヘッドスペース、GC-MSの選択性、ブランクとキャリーオーバーを照合。');
review('L14','一次資料：US EPA「Iron and Steel Manufacturing Pretreatment Standards」https://www.epa.gov/system/files/documents/2021-07/owm0019.pdf 、US EPA「Steel Mills Compliance and Enforcement Data」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=900C0J00.TXT 。圧延水のミルスケール・油と沈降・ろ過・油分離・循環を確認。');
review('L15','一次資料：US EPA「Dairy Products Processing Effluent Guidelines」https://www.epa.gov/eg/dairy-products-processing-effluent-guidelines 、US EPA「Federal Guidelines: Pretreatment of Pollutants」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=91004VWT.TXT 。食品排水の有機物・油脂・洗浄排水変動を前処理、均等化、pH調整、生物処理で管理する。');
review('L16','一次資料：US EPA「Guidance Manual for Electroplating and Metal Finishing Pretreatment Standards」https://www.epa.gov/system/files/documents/2021-07/owm0022.pdf 、US EPA「Managing Cyanide in Metal Finishing」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30004TAD.TXT 。シアン系とCr(VI)系の分別、アルカリ酸化と還元後沈殿を確認。');
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v87')return s;s=prior(s);s.bankContentVersion='v87';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V87={version:'v87',changed:ids,stale:[],migrate:migrate};
})();
