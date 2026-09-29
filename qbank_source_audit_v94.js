(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V94||!window.WATER1_SOURCE_AUDIT_V93)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v94';ids.push(id);}
review('H37','一次資料：US EPA Method 7196A https://www.epa.gov/hw-sw846/sw-846-test-method-7196a-chromium-hexavalent-colorimetric 、US EPA Method 7470A https://www.epa.gov/hw-sw846/sw-846-test-method-7470a-mercury-liquid-waste-manual-cold-vapor-technique 、US EPA Method 7062 https://www.epa.gov/hw-sw846/sw-846-test-method-7062-antimony-and-arsenic-atomic-absorption-borohydride-reduction 。Cr(VI)のDPC発色、全Hgの酸化・還元気化、Asの水素化物法等を測定対象に対応させる。');
review('L33','一次資料：US EPA「Petroleum Refining Pretreatment Supplement」https://www.epa.gov/sites/default/files/2015-10/documents/petro-refining_dd-pses_supplement_int-final_1977.pdf 。SWSでNH3・H2Sを気相へ移し管理し、API・DAFで遊離・分散油を前処理、溶解性有機物は後段処理へ送る。油滴径と浮上速度、DAFの気泡付着も確認。');
review('L34','一次資料：US EPA「WASP Model Documentation」https://www.epa.gov/hydrowq/wasp-model-documentation 、US EPA「WASP Stream Transport Model Theory」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1005O7C.TXT 。移流・拡散と反応を分け、境界フラックスや外海濃度を条件に応じ与える。格子幅・時間刻みと数値安定性も検討する。');
review('L35','一次資料：USGS「Nonpoint-Source Nutrient Discharges」https://pubs.usgs.gov/wri/1983/4278/report.pdf 。L=aQ^bは演習条件。Q比40/10=4よりL比4^1.5=8、20×8=160 kg/日。比例定数の単位や濃度変化を無視した単純比例と区別する。');
review('G35','一次資料：US EPA「Understanding Global Warming Potentials」https://www.epa.gov/ghgemissions/understanding-global-warming-potentials 。演習表の100→75、92、85は減少率25%、8%、15%。CO2>N2O>CH4の順。GWPは一定期間の相対的温暖化寄与をCO2換算に用い、排出質量や濃度の単純和ではない。');
review('G36','一次資料：環境省「光化学オキシダントに係る環境基準の改定について」https://www.env.go.jp/content/000373249.pdf 。2026年度以降、オゾンとして8時間値0.07 ppm以下、日最高8時間値の1年平均0.04 ppm以下。8時間値は移動平均、NOx・VOCと日射による光化学反応を考える。');
review('G37','一次資料：環境省「令和6年度騒音規制法等施行状況調査」https://www.env.go.jp/press/press_03011.html 、環境省「令和6年度振動規制法等施行状況調査」https://www.env.go.jp/press/press_03014.html 、環境省「等価騒音レベル」https://www.env.go.jp/hourei/07/000015.html 。建設作業は騒音8166/19886=41.1%、振動3268/4508=72.5%。LAeqはdB値の算術平均ではなく等エネルギーの定常音レベル。');
review('W37','一次資料：ATSDR「Toxicological Profile for Cyanide」https://www.atsdr.cdc.gov/toxprofiles/tp8-c3.pdf 、ATSDR「Cadmium ToxGuide」https://www.atsdr.cdc.gov/toxguides/toxguide-5.pdf 、US EPA「Insecticides」https://www.epa.gov/caddis/insecticides 、US EPA「Health Effects of Exposures to Mercury」https://www.epa.gov/mercury/health-effects-exposures-mercury 、US EPA「Cr(VI) and Cr(III) Treatment」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9101N1RC.TXT 。シアンのシトクロムcオキシダーゼ阻害を正答とし、メチル水銀、Cdとメタロチオネイン、有機りん、Crの化学形態を区別する。');
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v94')return s;s=prior(s);s.bankContentVersion='v94';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V94={version:'v94',changed:ids,stale:[],migrate:migrate};
})();
