(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V74||!window.WATER1_SOURCE_AUDIT_V73)return;
var bank=window.QBANK||[],ids=[];
function edit(id,p){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);Object.keys(p).forEach(function(k){if(k==='point'){var old=String(q.p||''),at=old.search(/<(?:div|details)\b/);q.p=p[k]+(at<0?'':' '+old.slice(at));}else q[k]=p[k];});q.contentReviewVersion='v74';ids.push(id);}
edit('T40',{
 q:'RO膜で原水溶質濃度500 mg/L、透過水濃度25 mg/Lを得た。濃度基準の見掛けの阻止率と、この値だけから判断できる範囲として最も適当なものはどれか。',
 o:['阻止率5%。これは透過水濃度/原水濃度であり、水回収率も5%と求まる。','阻止率50%。濃縮水の濃度を測らなくても溶質総質量の除去率は50%と求まる。','阻止率90%。透過水量が不明でも溶質の質量分配は確定できる。','阻止率95%。濃度比25/500から計算できるが、透過水への溶質質量や水回収率には各流量が必要である。','阻止率105%。原水濃度と透過水濃度を足すことで膜性能が表せる。'],
 e:['【誤り】25/500=0.05は透過濃度比。阻止率は1−0.05=95%。水回収率には流量が必要。','【誤り】濃度差475 mg/Lを原水500で割ると95%。質量分配には透過流量と濃縮流量が必要。','【誤り】(500−25)/500=95%。濃度から水量や質量収支を直接求めることはできない。','【正しい】見掛け阻止率=(1−Cp/Cf)×100=(1−25/500)×100=95%。透過水に移った溶質質量は濃度×透過水量で別途求める。','【誤り】定義は1−Cp/Cfであり和ではない。この条件では95%。'],
 point:'阻止率は濃度基準で95%。透過率5%や水回収率・溶質の質量除去率とは別の量である。',
 src:'一次資料：US EPA Separation of Hazardous Organics by Low Pressure Reverse Osmosis（阻止率と透過水・原水濃度）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30003U42.TXT 。濃度は演習値。'
});
edit('T41',{
 src:'一次資料：US EPA Process Control Manual Aerobic Biological Wastewater Treatment Facilities（SRTの系内固形物と系外排出、内部返送）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9100NX8X.TXT 、US EPA Nutrient Control Design Manual（低温での硝化、酸素・アルカリ度、SRTと汚泥収率）https://www.epa.gov/sites/default/files/2019-02/documents/nutrient-control-design-manual.pdf 。'
});
edit('T42',{
 q:'工場排水のBODで、植種なしの希釈系列はDO減少が小さく再現性も悪いが、適切な植種後は系列間の整合性が改善した。別分取でCODMnも測るとき、最も適当なものはどれか。',
 o:['植種液の酸素消費を補正しない値を試料BODとして採用し、系列が整合すれば植種由来の誤差はないと判定する。','BODは植種補正・希釈倍率・培養前後DOを管理して試料由来の消費量を算出する。CODMnは別分取を規定の過マンガン酸化条件で測る。','CODMnも植種液を加えて20℃で5日培養し、同じDO差からBOD値と一致することを確認する。','BODの一部系列でDO減少が不足した場合は、希釈条件を見直さず最も高い結果だけを採用する。','CODMnがBODより高ければ両者は同一反応で酸化されたはずなので、植種補正をCODMnにも適用して一致させる。'],
 e:['【誤り】植種液自身のDO消費は試料由来のBODから差し引く。系列間整合だけで植種補正を省略しない。','【正しい】適切な植種・ブランク補正・希釈系列を使ってBODを求める。CODMnは微生物培養ではなく、所定条件の化学酸化・滴定による別指標。','【誤り】CODMnには植種も5日培養も使わない。過マンガン酸カリウムを規定条件で反応させる。','【誤り】DO減少と残存DOが規定に合う系列を選び、必要なら希釈・植種条件を見直す。最大値だけを選ばない。','【誤り】酸化剤と微生物による酸素消費は測定原理と対象が異なる。数値を一致させるための植種補正はCODMnに適用しない。'],
 point:'BODの植種補正・DO条件と、CODMnの過マンガン酸化は別操作。結果の大小だけで一方を補正して一致させない。',
 src:'一次資料：US EPA Organic Analyses in Water Quality Control Programs（BODの植種補正・DO差）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P10119T2.TXT 、環境省「環境測定分析統一精度管理調査結果」（CODMnの過マンガン酸化）https://www.env.go.jp/air/tech/seidokanri/explanation/pdf/q_aR03.pdf 。'
});
edit('T43',{
 src:'一次資料：環境省「水質汚濁に係る環境基準についての一部改正について」（全窒素の酸化分解・紫外線吸光光度法等）https://www.env.go.jp/hourei/01/000040.html 、環境省「窒素・りん自動計測器による水質汚濁負荷量測定方法マニュアル」https://www.env.go.jp/water/heisa/tplc/manu_npami/ 。未ろ過とろ過後の全窒素は対象画分が異なり、表の差は懸濁態の寄与と整合するが個別形態を断定しない。'
});
edit('T44',{
 src:'一次資料：US EPA Fuel-Efficient Sewage Sludge Incineration（調質・脱水・焼却の工程収支）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100PAYY.txt 、US EPA Environmental Regulations and Technology: Use and Disposal of Municipal Wastewater Sludge（焼却灰・金属成分）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=3000438I.TXT 。'
});
var stale=['T40','T42'],prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v74')return s;s=prior(s);stale.forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object'){if(h.lastSel!==undefined&&h.lastSel!==null)h.previousV73Selection={version:'v73',index:h.lastSel};h.lastSel=null;}});if(stale.indexOf(s.current)>=0){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v74';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V74={version:'v74',changed:ids,stale:stale,migrate:migrate};
})();
