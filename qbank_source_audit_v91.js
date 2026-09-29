(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V91||!window.WATER1_SOURCE_AUDIT_V90)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v91';ids.push(id);}
review('L23','一次資料：US EPA「WASP Model Documentation」https://www.epa.gov/hydrowq/wasp-model-documentation 、US EPA「WASP4 model theory」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30000L0L.TXT 。増殖・呼吸・沈降と境界での流入・流出を水柱の符号と次元で区別。sは沈降速度/水深で1/時間、全項は濃度/時間。式は演習条件。');
review('L24','一次資料：US EPA「Water Efficiency Management Guide: Mechanical Systems」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100TFYV.txt 。補給水と循環水の導電率で濃縮倍数を確認し、硬度・アルカリ度・シリカによるスケール、薬注・ブロー・節水を同時に評価する。');
review('L25','一次資料：US EPA「Field Manual: Metal Finishing Wastewater Treatment Facilities」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20007J4U.TXT 、US EPA「Preliminary Review of the Metal Finishing Category」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100UGY6.txt 。濃厚流の分離回収、向流洗浄と再利用水質を検討。水使用量削減と汚濁負荷量削減を流量×濃度で区別する。');
review('G26','一次資料：環境省「環境基本法（抄）」https://www.env.go.jp/houdou/gazou/1368/873/50.html 。地域における公害防止施策を総合的に講じる計画で、個別排水規制の免除や工場薬注量の指定ではない。');
review('G27','一次資料：環境省「総量規制専門委員会議事録（生活系負荷量の算定）」https://www.env.go.jp/council/09water/y097-04a.html 。演習表の人口・原単位・接続率・除去率・流達率から、接続分と未接続分を別に計算。BOD=80×(0.8×0.1+0.2)×0.7=15.68 kg/日、N=16×(0.8×0.6+0.2)×0.8=8.704 kgN/日、P=2×(0.8×0.5+0.2)×0.6=0.72 kgP/日。');
review('G28','一次資料：環境省「令和6年度公共用水域水質測定結果及び地下水質測定結果」https://www.env.go.jp/press/press_03588.html 、環境省「硝酸性窒素による地下水汚染対策事例集」https://www.env.go.jp/press/5097.html 。硝酸性窒素は施肥・家畜排せつ物・生活排水等の複数源を持ち、ひ素・ふっ素には自然由来もある。');
review('W28','一次資料：環境省「水質汚濁防止法の一部を改正する法律案」https://www.env.go.jp/press/13573.html 、環境省「地下水汚染の未然防止のための構造と点検・管理に関するマニュアル」https://www.env.go.jp/water/chikasui/brief2012/manual.html 。有害物質貯蔵指定施設の構造・設備・使用方法の届出、配管等の漏えい防止と点検記録を区別する。');
review('H26','一次資料：US EPA「An Investigation of Techniques for Removal of Chromium」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9101N1RC.TXT 。Cr(VI)→Cr(III)はCr原子当たり電子3個を受け取る還元で、Cr(III)は適切なpHで水酸化物沈殿を検討する。');
review('H27','一次資料：US EPA「Capsule Report: Managing Cyanide in Metal Finishing」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30004TAD.TXT 、US EPA「Technical Resource Document: Metal-Cyanide Wastes」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000TLQY.TXT 。遊離CNと鉄シアノ錯体は酸化・分解性が異なり、化学形態と安全なpH条件に応じて処理を設計する。');
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v91')return s;s=prior(s);s.bankContentVersion='v91';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V91={version:'v91',changed:ids,stale:[],migrate:migrate};
})();
