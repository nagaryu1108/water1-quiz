(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V69||!window.WATER1_COVERAGE_TRIM_V68)return;
var bank=window.QBANK||[],ids=[];
function edit(id,p){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);Object.keys(p).forEach(function(k){if(k==='point'){var old=String(q.p||''),at=old.search(/<(?:div|details)\b/);q.p=p[k]+(at<0?'':' '+old.slice(at));}else q[k]=p[k];});q.contentReviewVersion='v69';ids.push(id);}
edit('T18',{
 q:'表面積30 m²の理想的な横流式沈殿池に、600 m³/日の排水が流入する。沈降速度0.20 m/hの独立粒子について、表面負荷と理論除去率の組合せとして最も適当なものはどれか。短絡・乱れはなく、粒子の流入位置は水深方向に一様とする。',
 o:['表面負荷20 m/h、除去率1%','表面負荷0.83 m/h、除去率24%','表面負荷0.50 m/h、除去率40%','表面負荷0.33 m/h、除去率60%','表面負荷0.20 m/h、除去率100%'],
 e:['【誤り】600/30=20 m/日であり、20 m/hではない。20 m/日を24で割ると0.83 m/h。','【正しい】Q/A=20 m/日=0.833 m/h。理想独立粒子の除去率は0.20/0.833=0.24、すなわち24%。','【誤り】0.50 m/hは与えられたQ/Aに一致しない。0.20/0.50=40%という比の計算だけでは足りない。','【誤り】0.33 m/hという表面負荷は流量600 m³/日と面積30 m²から得られない。実際の比は24%。','【誤り】全量除去には沈降速度が表面負荷以上である必要がある。本条件では0.20<0.833 m/h。'],
 point:'表面負荷Q/Aは20 m/日=0.833 m/h。理想沈殿池の独立粒子では、v_s<Q/Aなら理論除去率v_s/(Q/A)=24%。単位を先に合わせる。',
 src:'一次資料：US EPA Process Design Manual for Suspended Solids Removal（理想沈殿池の表面負荷と沈降速度）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9101ERMZ.TXT 。流量・面積・粒子速度は本教材の演習値。'
});
edit('T19',{
 q:'水中に濁質、微細SS、溶存正りん酸、コロイド状有機物、硝酸イオンが含まれる。鉄塩を用い、pH・薬注量を適切に調整した通常の凝集沈殿「単独」で、高い除去率を最も期待しにくい対象はどれか。',
 o:['コロイド粒子に由来する濁度','凝集でフロックへ取り込まれる微細SS','鉄塩と反応して難溶性化する溶存正りん酸','凝集で分離されるコロイド状有機物に由来するCOD','水に溶解した硝酸態窒素'],
 e:['【非選択】コロイド粒子は電荷の中和・フロック形成によって分離対象となる。','【非選択】微細SSは適切な凝集で大きなフロックに取り込み、沈殿分離できる。','【非選択】正りん酸は鉄塩による沈殿・共沈で除去できる。pHや薬注量に依存する。','【非選択】粒子性・コロイド性の有機物を分離すれば、その分のCODは低下し得る。溶解性COD全量の除去を意味しない。','【正答】硝酸イオンは溶存態のまま通常の鉄塩凝集沈殿では捕捉しにくい。窒素除去には脱窒など別の処理を検討する。'],
 point:'凝集で捕捉される粒子・コロイド、鉄塩と反応するりん酸と、溶存硝酸イオンを区別する。「凝集単独」の対象を問う。',
 src:'一次資料：US EPA Wastewater Technology Fact Sheet: Chemical Precipitation（鉄塩・アルミニウム塩によるりん除去）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1001QTR.TXT 、US EPA Nutrient Control Design Manual（窒素除去とりんの化学沈殿）https://www.epa.gov/sites/default/files/2019-02/documents/nutrient-control-design-manual.pdf 。'
});
edit('T20',{
 q:'めっき工程で、高濃度・少量の使用済み浴と低濃度・多量の水洗排水が生じる。水使用量と処理負荷の管理に関する記述として、誤っているものはどれか。',
 o:['使用済み浴と水洗排水を系統分離すれば、高濃度液の回収・専用処理と、水洗水の再利用をそれぞれ検討しやすい。','向流多段水洗と持出し液の低減は、必要な洗浄水量や末端へ流れる金属負荷を減らし得る。','再利用する水は工程の要求水質に合わせ、塩類の蓄積、腐食やスケールも確認する。','処理設備では平均流量だけでなく、浴交換時のピーク負荷や水洗流量の変動を見込む。','使用済み浴を全水洗排水へ混ぜて濃度だけを下げれば、金属の質量負荷も同じ割合で減るため、系統分離や回収は不要となる。'],
 e:['【正しい】濃度・流量の異なる系統を分ければ、回収や用途別の処理・再利用を選びやすい。','【正しい】向流洗浄は水と品物の流れを逆にする。持出し液を減らせば流出する汚濁物質の総量も抑えられる。','【正しい】再利用時は工程の許容水質と循環による塩類濃縮を評価する。','【正しい】周期的な浴交換の高負荷を平均値だけで設計すると調整容量・処理能力が不足し得る。','【誤り】混合・希釈は濃度を下げても金属質量そのものを消さない。回収できる高濃度液を混ぜると回収・専用処理も難しくなる。'],
 point:'負荷量=流量×濃度。系統分離と向流水洗は回収・水量削減に役立つ。希釈だけでは金属質量負荷は減らない。',
 src:'一次資料：US EPA Technical Resource Document: Treatment Technologies for Metal/Cyanide-Containing Wastes（系統分離・持出し削減・向流洗浄）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100GB94.TXT 、US EPA Watts Nickel and Rinse Water Recovery（向流水洗・回収）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30002X4D.TXT 。'
});
edit('T22',{
 q:'乾燥固形物量1.0 t/日の汚泥について、下表の二方式を比較する。各方式のケーキ量・水分量と焼却を含む評価として最も適当なものはどれか。',
 o:['Aのケーキ量は1.0×0.80=0.80 t/日、Bは0.76 t/日であり、含水率の差だけが焼却熱量を決める。','Aのケーキ量は5.0 t/日、Bは約4.17 t/日。水分は約0.83 t/日減るが、Bの脱水電力は14 kWh/日増えるので、総エネルギーで比較する。','Aのケーキ水分は5.0 t/日、Bは約4.17 t/日。乾燥固形物1.0 t/日は水分量に加算しない。','BはAより含水率が4ポイント低いため、ケーキ量と水分蒸発負荷はどちらも必ず4%だけ減る。','脱水電力18と32 kWh/t-DSの大小だけで方式を決めれば、焼却時の水分蒸発負荷は考慮済みとなる。'],
 e:['【誤り】乾燥固形物量を固形分率で割る。A=1/0.20=5.0 t/日、B=1/0.24≈4.17 t/日。','【正しい】水分はA=5−1=4.0、B≈4.17−1≈3.17 t/日。差は約0.83 t/日。脱水電力は1 t-DS/日なので18対32 kWh/日で差14。焼却・補機の条件も含め比較する。','【誤り】5.0と4.17 t/日はケーキ総量。水分は各々から乾燥固形物1.0 t/日を差し引く。','【誤り】4ポイントは含水率の差で、ケーキ量の減少率ではない。ケーキは約16.7%、水分は約20.8%減る。','【誤り】表の電力は脱水機の分だけ。焼却前に蒸発させる水分の差0.83 t/日の熱負荷を含まない。'],
 point:'ケーキ量=DS/(1−含水率)、水分量=ケーキ量−DS。A:5.0/4.0、B:約4.17/3.17 t/日。脱水電力差14 kWh/日と焼却側の水分負荷を総合する。',
 src:'一次資料：US EPA Sludge Treatment and Disposal（脱水ケーキ水分・焼却時の熱収支）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20007TN9.TXT 。表は本教材の演習値。'
});
edit('T23',{
 q:'活性汚泥法でBOD容積負荷0.8 kg/(m³・日)、BOD汚泥負荷0.2 kg/(kgMLSS・日)とする。返送汚泥濃度は8000 mg/L。最終沈殿池の定常固形物収支で処理水SSと余剰汚泥引抜きを無視するとき、槽内MLSSと返送汚泥率R（返送流量/原水流量）の組合せはどれか。',
 o:['MLSS 400 mg/L、R=0.05','MLSS 4000 mg/L、R=0.5','MLSS 8000 mg/L、R=1.0','MLSS 4000 mg/L、R=0.8','MLSS 4000 mg/L、R=1.0'],
 e:['【誤り】0.8/0.2=4 kg/m³=4000 mg/L。400 mg/Lへの換算は10倍不足。','【誤り】MLSSは4000 mg/Lだが、(1+0.5)×4000=6000と0.5×8000=4000 mg/L相当は一致しない。','【誤り】8000 mg/Lは返送汚泥濃度。生物反応槽のMLSSは負荷比から4000 mg/L。','【誤り】(1+0.8)×4000=7200、0.8×8000=6400で固形物収支が合わない。','【正しい】X=0.8/0.2=4 kg/m³=4000 mg/L。Q(1+R)X=QRXrより(1+R)4000=8000R、したがってR=1。'],
 point:'容積負荷/汚泥負荷=MLSS=4 kg/m³。最終沈殿池でQ(1+R)X=QRXrを解くとR=X/(Xr−X)=1。無視できない固形物流出があれば別途加える。',
 src:'一次資料：US EPA Process Design Manual for Upgrading Existing Wastewater Treatment Plants（最終沈殿池の返送汚泥と固形物収支）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9100WQD9.TXT 。数値は本教材の演習値。'
});
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v69')return s;s=prior(s);ids.forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object'){if(h.lastSel!==undefined&&h.lastSel!==null)h.previousV68Selection={version:'v68',index:h.lastSel};h.lastSel=null;}});if(ids.indexOf(s.current)>=0){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v69';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V69={version:'v69',changed:ids,stale:ids.slice(),migrate:migrate};
})();
