(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V89||!window.WATER1_SOURCE_AUDIT_V88)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v89';ids.push(id);}
review('L18','一次資料：USGS「Estimates of Dissolved and Suspended Substance Yield for Stream Basins in Michigan」https://www.usgs.gov/publications/estimates-dissolved-and-suspended-substance-yield-stream-basins-michigan 、USGS「Storm-related nutrient loads」https://pubs.usgs.gov/publication/wri864026 。L=Q×Cであり高流量時の負荷、面源流出・再懸濁の可能性と観測不足による年間推定誤差を考慮する。');
review('L19','一次資料：US EPA「Pulp and Paper Industry Effluent Guidelines」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=000030WD.TXT 、US EPA「Kraft pulp process」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=1000446B.TXT 、US EPA「White liquor」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000ZF3I.TXT 。酸素脱リグニン・ECF、黒液回収、白水回収を区別。主要蒸解薬品はNaOHとNa2SでありNaClと硫酸ではない。');
review('G20','一次資料：US EPA「Risk Management」https://www.epa.gov/risk/risk-management 、US EPA「Alternatives Assessments」https://www.epa.gov/saferchoice/design-environment-alternatives-assessments 、US EPA「Cross-Media Transfers」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000STOA.TXT 。有害性・曝露・不確実性を踏まえ、代替策と媒体間負荷移転を比較し、実施後の条件をそろえて効果を確認する。');
review('G21','一次資料：環境省「臭気指数及び臭気排出強度の算定の方法」https://www.env.go.jp/hourei/10/000019.html 、環境省「臭気指数のQ&A」https://www.env.go.jp/air/akushu/panph_ind/yokuwkaru2_full.pdf 。臭気指数=10log10(臭気濃度)から1000は30、濃度10倍で指数は10増加する。');
review('G22','一次資料：環境省「土壌汚染対策法の施行について」https://www.env.go.jp/hourei/06/000024.html 、環境省「土壌汚染対策法に基づく告示」https://www.env.go.jp/water/dojo/law/kokuji.html 。鉛の土壌含有・溶出・直接摂取とTCEの土壌ガス・地下水分布を物質、深度、流向に応じて調査する。表の位置・濃度傾向は演習条件。');
review('H21','一次資料：US EPA Method 200.7 https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P10177CN.TXT 、US EPA Method 5030C https://www.epa.gov/sites/default/files/2015-12/documents/5030c.pdf 、US EPA Method 335.4 https://www.epa.gov/sites/production/files/2015-06/documents/epa-335.4.pdf 。金属の対象画分と保存、VOCの気泡・揮散防止、シアンのアルカリ保存は試験法ごとに分ける。');
review('H22','一次資料：US EPA Method 7742「Selenium (Atomic Absorption, Borohydride Reduction)」https://www.epa.gov/hw-sw846/sw-846-test-method-7742-selenium-atomic-absorption-borohydride-reduction 。酸化状態調整後、還元剤により揮発性水素化物を発生し気液分離して原子化部へ導入する。');
var at=bank.findIndex(function(x){return x.id==='H20';});if(at<0)throw Error('Missing H20');var archived=bank.splice(at,1)[0];
archived.coverageTrim={version:'v89',status:'archived',coveredBy:['H08'],reason:'EDTA-Cuによる水酸化物沈殿の阻害と酸化分解・硫化物沈殿・選択性樹脂の比較はH08に保持'};
window.WATER1_ARCHIVED_QUESTIONS=(window.WATER1_ARCHIVED_QUESTIONS||[]).concat([archived]);
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v89')return s;s=prior(s);if(s.current==='H20'){s.current=null;s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v89';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V89={version:'v89',changed:ids,retired:['H20'],coveredBy:archived.coverageTrim.coveredBy,stale:[],migrate:migrate};
})();
