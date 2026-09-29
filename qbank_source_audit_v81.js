(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V81||!window.WATER1_SOURCE_AUDIT_V80)return;
var bank=window.QBANK||[],ids=[];
function edit(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v81';ids.push(id);}
edit('G04','一次資料：環境省「令和6年度公共用水域水質測定結果及び地下水質測定結果」https://www.env.go.jp/press/press_03588.html 。健康項目27項目99.1%、河川BOD93.9%、湖沼COD50.8%、海域の健康項目超過0地点、地下水概況の硝酸性窒素等超過率2.5%を照合。');
edit('G05','一次資料：環境省「PFASに関するよくある質問」（2026年4月1日から水道水質基準、PFOS・PFOA合算50 ng/L）https://www.env.go.jp/water/pfas/faq010.html 、環境省「要監視項目及び指針値」（公共用水域・地下水の50 ng/L）https://www.env.go.jp/water/impure/item.html 。');
edit('H02','一次資料：US EPA Atomic Absorption Method（フレーム・黒鉛炉、元素別光源）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100Y86C.txt 、US EPA Method 6010D（ICP-OES）https://www.epa.gov/hw-sw846/sw-846-test-method-6010d-inductively-coupled-plasma-optical-emission-spectrometry-icp-oes 、US EPA Method 6020B（ICP-MSと干渉）https://www.epa.gov/sites/default/files/2015-12/documents/6020b.pdf 。');
edit('H03','一次資料：US EPA Method 8260D（VOCの密閉採取・パージトラップ/ヘッドスペースGC-MS）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P10182D1.TXT 、US EPA Method 8321B（難揮発性有機物のHPLC系）https://www.epa.gov/hw-sw846/sw-846-test-method-8321b-solvent-extractable-nonvolatile-compounds-high-performance-liquid 。A～Cは演習用の物性設定であり、個別物質の公定法指定ではない。');
edit('H04','一次資料：US EPA Final Treatment Technology Background Document（亜硫酸水素塩によるCr(VI)還元、pH依存のORP、後段のCr(III)沈殿）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9100EAHI.TXT 、環境省「排水中からの除去技術」https://www.env.go.jp/content/000143912.pdf 、US EPA Environmental Chemistry of Chromium（Cr(OH)3の両性）https://hero.epa.gov/reference/735962/ 。');
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v81')return s;s=prior(s);s.bankContentVersion='v81';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V81={version:'v81',changed:ids,stale:[],migrate:migrate};
})();
