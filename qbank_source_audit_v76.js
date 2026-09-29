(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V76||!window.WATER1_SOURCE_AUDIT_V75)return;
var bank=window.QBANK||[],ids=[];
function edit(id,p){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);Object.keys(p).forEach(function(k){if(k==='point'){var old=String(q.p||''),at=old.search(/<(?:div|details)\b/);q.p=p[k]+(at<0?'':' '+old.slice(at));}else q[k]=p[k];});q.contentReviewVersion='v76';ids.push(id);}
edit('W07',{
 src:'一次資料：US EPA Precipitation and Inactivation of Phosphorus as a Lake Restoration Technique（底層酸素・酸化還元・鉄相とりん）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000I8M0.TXT 、US EPA Lake and Reservoir Restoration Guidance Manual（成層と底層貧酸素）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=00001K2S.TXT 。表は演習用模式値。'
});
edit('W08',{
 src:'一次資料：環境省「水質調査方法」（河川等の採水地点・時期、同時的な流量測定と負荷量）https://www.env.go.jp/hourei/05/000140.html 。上流・合流部・下流と操業条件を対応させ、流下時間も確認する設問。表は演習用。'
});
edit('W10',{
 src:'一次資料：環境省「地下水汚染の未然防止のための構造と点検・管理に関するマニュアル」https://www.env.go.jp/water/chikasui/brief2012/manual.html 、環境省「地下水汚染未然防止のための管理要領等策定の手引き」（漏えい防止・回収）https://www.env.go.jp/water/chikasui/brief2012/kanri-tebiki01.pdf 。表の徴候は演習用。法令上の個別の届出要否は状況ごとに判断する。'
});
edit('W11',{
 q:'工程内再利用の前後で、排出水量・COD濃度がそれぞれ2000 m³/日・60 mg/Lから1200 m³/日・80 mg/Lになった。COD日負荷量とその変化率の組合せとして、最も適当なものはどれか。',
 o:['前120 kg/日、後96 kg/日、20%減少','前120 kg/日、後96 kg/日、40%減少','前120 kg/日、後160 kg/日、約33%増加','前60 kg/日、後80 kg/日、約33%増加','前120 kg/日、後160 kg/日、20%減少'],
 e:['【正しい】濃度(mg/L)×流量(m³/日)×10⁻³でkg/日。前120、後96 kg/日。減少率(120−96)/120=20%。','【誤り】水量は40%減ったが濃度は上昇したため、負荷の減少率は20%。','【誤り】対策後80×1200×10⁻³=96 kg/日で160ではない。','【誤り】60と80は濃度mg/Lであり、日負荷kg/日ではない。流量も掛ける。','【誤り】後の負荷量は96 kg/日。仮に160 kg/日なら増加であり「20%減少」も合わない。'],
 point:'COD負荷=Q×C×10⁻³ kg/日。前120、後96で20%減。濃度の33%増や水量の40%減をそのまま負荷変化率にしない。',
 src:'一次資料：環境省「水質調査方法」（水質と流量を同時に測り汚濁負荷量を推算）https://www.env.go.jp/hourei/05/000140.html 。流量と濃度は演習値。'
});
edit('W12',{
 src:'一次資料：環境省「生活環境の保全に関する環境基準（湖沼）」底層DO・生物1=4.0、生物2=3.0、生物3=2.0 mg/L以上・日間平均 https://www.env.go.jp/kijun/wt2-1-2.html 、環境省「付表13」底層DO測定方法 https://www.env.go.jp/kijun/wt_a13.html 。4回測定値は演習値で、単純平均を日間平均として用いることは本問の仮定。'
});
var stale=['W11'],prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v76')return s;s=prior(s);stale.forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object'){if(h.lastSel!==undefined&&h.lastSel!==null)h.previousV75Selection={version:'v75',index:h.lastSel};h.lastSel=null;}});if(stale.indexOf(s.current)>=0){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v76';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V76={version:'v76',changed:ids,stale:stale,migrate:migrate};
})();
