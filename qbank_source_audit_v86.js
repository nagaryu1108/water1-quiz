(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V86||!window.WATER1_SOURCE_AUDIT_V85)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v86';ids.push(id);}
review('H11','一次資料：US EPA「Reference Guide to Treatment Technologies for Mining-Influenced Water」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100I4PB.TXT 、US EPA「State of the Art of Small Water Treatment Systems」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1011DTR.TXT 。Se(IV)とSe(VI)の鉄系吸着・還元処理の差を確認。');
review('H12','一次資料：USGS「The influence of groundwater chemistry on arsenic concentrations and speciation」https://pubs.usgs.gov/publication/70026183 、US EPA収録のひ素鉄凝集研究https://hero.epa.gov/reference/1016411/ 。As(III)/As(V)の鉄系除去とリン酸競合を確認。表は演習値。');
review('H13','一次資料：US EPA Method 5030C https://www.epa.gov/sites/default/files/2015-12/documents/5030c.pdf （密閉採水・保存・パージトラップ）。表は演習値。密栓容器内の水相から気相への分配と、開放時の容器外への総量損失を区別する。');
review('L11','一次資料：US EPA「Water Efficiency Management Guide: Mechanical Systems」https://www.epa.gov/sites/default/files/2017-12/documents/ws-commercialbuildings-waterscore-mechanical-systems-guide.pdf 。蒸発で失われない溶質の循環側/補給側濃度比400/100=4を独立計算。');
review('L12','一次資料：US EPA「Petroleum Refining Industry Pretreatment Development Document」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000JLKC.TXT 、US EPA「Federal Guidelines: Pretreatment of Pollutants」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=91004VWT.TXT 。遊離油・乳化油とアンモニア/硫化物を含むサワー水の処理原理を区別する。');
review('L13','一次資料：US EPA「Kraft Pulp Mill Compliance Assessment Guide」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=1000446B.TXT 、US EPA「Activated Carbon Treatment of Unbleached Kraft Effluent for Reuse」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=91017KRH.TXT 。黒液の薬品・エネルギー回収、白水の繊維回収、漂白工程排水の性状差を確認。');
review('G14','一次資料：US EPA「QA/QC Guidance for Sampling and Analysis of Sediments, Water, and Tissues」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20003RYN.TXT 、US EPA「In the Lab: Quality Assurance and Quality Control」https://www.epa.gov/choose-fish-and-shellfish-wisely/lab-quality-assurance-and-quality-control 。ブランク・二重測定・添加回収・標準物質の目的を区別する。');
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v86')return s;s=prior(s);s.bankContentVersion='v86';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V86={version:'v86',changed:ids,stale:[],migrate:migrate};
})();
