(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V75||!window.WATER1_SOURCE_AUDIT_V74)return;
var bank=window.QBANK||[],ids=[];
function edit(id,p){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);Object.keys(p).forEach(function(k){if(k==='point'){var old=String(q.p||''),at=old.search(/<(?:div|details)\b/);q.p=p[k]+(at<0?'':' '+old.slice(at));}else q[k]=p[k];});q.contentReviewVersion='v75';ids.push(id);}
edit('W01',{
 src:'一次資料：US EPA Lake and Reservoir Restoration Guidance Manual（夏季成層・深層酸素消費・秋季循環）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=00001K2S.TXT 、US EPA Volunteer Lake Monitoring: A Methods Manual（温度・DO鉛直分布）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=00001KKO.TXT 。表は演習値。'
});
edit('W02',{
 q:'同一試料のBOD、CODMn、TOCを測定した。測定対象の物理量と、河川・湖沼・海域の生活環境基準における代表的な有機汚濁指標の組合せとして、最も適当なものはどれか。',
 o:['BODは生物学的酸素消費だが、TOCも同じ酸素当量なので両値はmg/Lで一致する。','CODMnは過マンガン酸による酸素消費だが、微生物の硝化を抑制しなければ測れない。','TOCは有機炭素の量を測り、BOD・CODMnの酸素消費と原理が異なる。生活環境基準の代表的な有機汚濁指標は河川でBOD、湖沼・海域でCODである。','海域でCODを測っても生活環境基準と比較できないため、海域ではBODのみを用いる。','BOD、CODMn、TOCは化学的・生物学的反応の相違があっても、同じ有機炭素を全量酸化するので同一濃度になる。'],
 e:['【誤り】BODは微生物の酸素消費、TOCは炭素の質量。単位が共にmg/Lでも測る物理量は異なり一致しない。','【誤り】CODMnは規定の過マンガン酸カリウムによる化学酸化。硝化はBODに影響し得る微生物反応である。','【正しい】TOCは有機体炭素、BODは所定培養中の酸素消費、CODMnは酸化剤による酸素相当量。河川BOD、湖沼・海域CODという環境基準の区分を対応させる。','【誤り】海域の生活環境基準にはCODの類型値がある。河川の代表的指標BODと入れ替えない。','【誤り】BODには生物分解性、CODMnには酸化剤との反応性が影響し、TOCは炭素量。還元性無機物などの寄与も異なる。'],
 point:'BODは生物学的酸素消費、CODMnは規定の化学酸化に対応する酸素量、TOCは有機炭素量。物理量の違いと、河川BOD・湖沼/海域CODの類型を区別する。',
 src:'一次資料：US EPA Method 9060A Total Organic Carbon（有機炭素の定量）https://www.epa.gov/sites/default/files/2015-12/documents/9060a.pdf 、環境省の河川・湖沼・海域の生活環境基準 https://www.env.go.jp/kijun/wt2-1-1.html https://www.env.go.jp/kijun/wt2-1-2.html https://www.env.go.jp/kijun/wt2-2.html 。'
});
edit('W03',{
 src:'一次資料：US EPA Lake and Reservoir Restoration Guidance Manual（Chl-a・成層・底層DO）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=00001K2S.TXT 、US EPA Precipitation and Inactivation of Phosphorus as a Lake Restoration Technique（底層低DO、鉄相とりんの溶出）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000I8M0.TXT 。表は演習用の模式値。'
});
edit('W04',{
 src:'一次資料：環境省「環境白書」青潮（底層貧酸素水・硫化物・湧昇と魚介類影響）https://www.env.go.jp/policy/hakusyo/h18/26891_k225_r433.html 、環境省「生物・水産資源・水環境問題検討作業小委員会」https://www.env.go.jp/council/20ari-yatsu/y202-05a.html 。表の日時・濃度は演習用模式値。'
});
edit('W05',{
 src:'一次資料：環境省「地下水質調査方法」（概況調査と継続監視調査の目的）https://www.env.go.jp/hourei/05/000131.html 、環境省「令和6年度公共用水域水質測定結果及び地下水質測定結果」https://www.env.go.jp/press/press_03588.html 、環境省「硝酸性窒素及び亜硝酸性窒素に係る水質汚染対策マニュアル」https://www.env.go.jp/hourei/05/000097.html 。超過井戸数/調査井戸数は地点構成を確認して比較する。'
});
var stale=['W02'],prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v75')return s;s=prior(s);stale.forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object'){if(h.lastSel!==undefined&&h.lastSel!==null)h.previousV74Selection={version:'v74',index:h.lastSel};h.lastSel=null;}});if(stale.indexOf(s.current)>=0){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v75';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V75={version:'v75',changed:ids,stale:stale,migrate:migrate};
})();
