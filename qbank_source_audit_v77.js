(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V77||!window.WATER1_SOURCE_AUDIT_V76)return;
var bank=window.QBANK||[],ids=[];
function edit(id,p){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);Object.keys(p).forEach(function(k){if(k==='point'){var old=String(q.p||''),at=old.search(/<(?:div|details)\b/);q.p=p[k]+(at<0?'':' '+old.slice(at));}else q[k]=p[k];});q.contentReviewVersion='v77';ids.push(id);}
edit('W13',{src:'一次資料：環境省「PRTRとは何？」https://www.env.go.jp/chemi/prtr/about/about-1.html 、環境省「排出量・移動量の区分」https://www.env.go.jp/press/2549.html 、環境省「PRTRの仕組み」https://www.env.go.jp/chemi/prtr/about/about-4.html 。数値は演習値。'});
edit('W14',{
 o:['地点Aでカワゲラ類が多ければ、DOだけが地点差の原因と確定し、礫底や流速の違いは解析しなくてよい。','地点Bのイトミミズ類の優占は低DOと整合するので、重金属汚染を特異的に示すものと判断できる。','地点Aのカワゲラ類は比較的良好な水質の指標となるため、流速・底質が異なっても生物相の地点差は水質差だけで説明できる。','地点差にはDOだけでなく流速や底質も関与し得るため、生物相と物理化学データを合わせて総合評価する。','地点Bの細泥底では底泥酸素消費の可能性があり、DO 4.0 mg/Lという一時点の値だけでその寄与率まで確定できる。'],
 e:['【誤り】カワゲラ類の多さはDOだけで決まらず、流速や底質などの生息場も関わる。','【誤り】イトミミズ類の優占は低DOや有機物・底質条件とも整合し、重金属だけに特異的ではない。','【誤り】生物指標は有用だが、地点間で流速・底質が異なるなら、水質だけへの帰属はできない。','【正しい】水質、生息場、底質の情報を合わせて解釈する。','【誤り】一時点のDO値だけでは底泥酸素消費の寄与率を定量できない。時間変化と酸素収支などを調べる。'],
 src:'一次資料：環境省「水生生物による簡易水質調査」の指標生物 https://www.env.go.jp/press/files/jp/1303.html 、USGS Stream Ecology（底質・水理・水質と生物相）https://pubs.usgs.gov/wri/wri984269/streameco.html 。地点A/Bの値は演習値。'
});
edit('W15',{src:'一次資料：WHO「Health risks of heavy metals」（メチル水銀・カドミウム）https://www.who.int/publications-detail-redirect/9789289071796 、ATSDR Chromium Toxicological Profile https://www.atsdr.cdc.gov/toxprofiles/tp7-c3.pdf 、ATSDR Malathion Medical Management Guidelines https://wwwn.cdc.gov/TSP/MMG/MMGDetails.aspx?mmgid=517&toxid=92 。'});
edit('W16',{src:'一次資料：環境省「水質汚濁に係る環境基準」https://www.env.go.jp/kijun/mizu.html 、環境省「環境基準」https://www.env.go.jp/kijun/ 。公共用水域の健康項目と生活環境項目の体系を区別する。'});
edit('W18',{src:'一次資料：環境省「めっき事業者の取扱物質と洗浄工程」https://www.env.go.jp/chemi/prtr/archive/kondankai/gijiroku/gijiroku4.html 、環境省「管理指針」https://www.env.go.jp/hourei/12/000010.html 、US EPA Electroplating Development Document https://www.epa.gov/sites/default/files/2015-10/documents/electroplating_dd_1979.pdf 、US EPA Trichloroethylene Use https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100ZIT6.TXT 。無電解銅の還元剤はホルムアルデヒド等であり、カドミウムではない。'});
var stale=['W14'],prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v77')return s;s=prior(s);stale.forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object'){if(h.lastSel!==undefined&&h.lastSel!==null)h.previousV76Selection={version:'v76',index:h.lastSel};h.lastSel=null;}});if(stale.indexOf(s.current)>=0){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v77';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V77={version:'v77',changed:ids,stale:stale,migrate:migrate};
})();
