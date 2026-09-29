(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V83||!window.WATER1_SOURCE_AUDIT_V82)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v83';ids.push(id);}
review('G06','一次資料：環境省「令和6年度公共用水域水質測定結果及び地下水質測定結果」https://www.env.go.jp/press/press_03588.html （河川BOD93.9%、湖沼COD50.8%、海域COD78.2%）、「環境基本法に基づく環境基準の水域類型の指定及び常時監視等の処理基準」https://www.env.go.jp/hourei/05/000057.html 。水域数・類型・評価方法を含めて比較する。');
review('T06','一次資料：US EPA「Activated Sludge Process Control」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30004EKH.TXT （回分沈降曲線と界面沈降速度）。図の演習値より(30−18) cm/20 min=0.6 cm/minを独立計算。');
review('H07','一次資料：US EPA「Managing Cyanide in Metal Finishing」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30004TAD.TXT （アルカリ塩素処理、鉄シアノ錯体の残留とHCN管理）、「Centralized Waste Treatment Industry」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100TV5Z.TXT 。表は演習値であり処理後全CNと遊離CNの差を読む。');
review('L07','一次資料：US EPA「2004 Guidelines for Water Reuse」https://www.epa.gov/sites/default/files/2019-08/documents/2004-guidelines-water-reuse.pdf （冷却水の濃縮・スケール、ボイラ給水の硬度・シリカ管理、用途別の追加処理）。設備ごとの要求水質を確認する。');
review('G08','一次資料：環境省「水質汚濁に係る環境基準」https://www.env.go.jp/kijun/mizu.html （科学的判断に応じた見直し）、環境省「水質汚濁に係る環境基準についての一部改正」https://www.env.go.jp/hourei/01/000042.html （健康影響・検出状況・測定法の定量限界）、環境省「常時監視等の処理基準」https://www.env.go.jp/hourei/05/000057.html 。表の数値は模式値。');
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v83')return s;s=prior(s);s.bankContentVersion='v83';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V83={version:'v83',changed:ids,stale:[],migrate:migrate};
})();
