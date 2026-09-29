(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V88||!window.WATER1_SOURCE_AUDIT_V87)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v88';ids.push(id);}
review('G17','一次資料：環境省「特定工場における公害防止組織の整備に関する法律の施行」https://www.env.go.jp/hourei/17/000014.html 、環境省「総量規制基準専門委員会議事録」https://www.env.go.jp/council/09water/y0918-01a.html 。演習条件で排水量とCOD濃度がともに増えれば負荷量=流量×濃度は増加する。処理・薬注・曝気・汚泥能力を事前確認する。');
review('G18','一次資料：環境省「足尾銅山鉱毒事件」https://www.env.go.jp/policy/hakusyo/s44/11339.html 、環境省「イタイイタイ病」https://www.env.go.jp/policy/hakusyo/h24/html/hj12040102.html 、国立水俣病総合研究センター「水俣病と新潟水俣病」https://nimd.env.go.jp/archives/faq/ 、環境省「四日市ぜんそく」https://www.env.go.jp/policy/hakusyo/h03/7833.html 。事例・水域・原因物質を照合。');
review('G19','一次資料：環境省「水質汚濁に係る環境基準」https://www.env.go.jp/kijun/mizu.html 、環境省「生活環境の保全に関する環境基準（河川）」https://www.env.go.jp/kijun/wt2-1-1.html 、環境省「常時監視等の処理基準」https://www.env.go.jp/hourei/05/000057.html 。健康項目と生活環境項目の体系と河川BODの類型を区別する。');
review('H17','一次資料：US EPA「Pesticide Chemicals Manufacturing Effluent Guidelines Development Document」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30006FOA.TXT 、US EPA「Water Treatment Effects on Pesticide Removal and Transformations」https://www.epa.gov/pesticide-science-and-assessing-pesticide-risks/finalization-guidance-incorporation-water-treatment 。加水分解・生物処理・酸化の適用性と変換生成物を分けて評価。P1～P3の表は仮想物質の演習値。');
review('H18','一次資料：US EPA「TCE Removal From Contaminated Soil And Groundwater」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000BC6O.TXT 、US EPA「Air Stripping of Contaminated Water: Air Emissions and Controls」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000MJ9Z.TXT 。ストリッピングは相間移動であり排ガス側の処理も検討する。');
review('H19','一次資料：US EPA Method 8260D https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P10182D1.TXT 、US EPA Method 5030C https://www.epa.gov/sites/default/files/2015-12/documents/5030c.pdf 。高濃度試料後のブランクで残留・キャリーオーバーを確認し、洗浄・ベーク・分析順・水分管理を見直す。');
review('L17','一次資料：環境省「閉鎖性海域の水質汚濁メカニズム」https://www.env.go.jp/council/09water/y097-07a.html 、環境省「底層の貧酸素化とそれに伴う影響」https://www.env.go.jp/content/900542730.pdf 。成層・沈降有機物分解・底層酸素消費と窒素の還元的な蓄積を考える。表の数値は演習値。');
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v88')return s;s=prior(s);s.bankContentVersion='v88';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V88={version:'v88',changed:ids,stale:[],migrate:migrate};
})();
