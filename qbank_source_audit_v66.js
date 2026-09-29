(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V66||!window.WATER1_SOURCE_AUDIT_V65)return;
var bank=window.QBANK||[],ids=[];
function edit(id,p){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);Object.keys(p).forEach(function(k){if(k==='point'){var old=String(q.p||''),at=old.search(/<(?:div|details)\b/);q.p=p[k]+(at<0?'':' '+old.slice(at));}else q[k]=p[k];});q.contentReviewVersion='v66';ids.push(id);}
edit('T08',{
 q:'下図はアンモニア性窒素を主成分とする排水を、好気条件で回分式に硝化した模式図である。曲線A、B、Cの対応と、Bが一時的に蓄積したことからいえる判断の組合せとして、最も適当なものはどれか。',
 o:['Aはアンモニア性窒素、Bは亜硝酸性窒素、Cは硝酸性窒素であり、Bの一時的な蓄積は二段階の反応速度が時間によって異なり得ることと整合する。','Aはアンモニア性窒素、Bは硝酸性窒素、Cは亜硝酸性窒素であり、亜硝酸酸化が途中で停止してもCは増え続ける。','Aは硝酸性窒素、Bは亜硝酸性窒素、Cはアンモニア性窒素であり、好気性硝化では還元された窒素が末端に蓄積する。','Aはアンモニア性窒素、Bは亜硝酸性窒素、Cは硝酸性窒素だが、Bの山形だけで亜硝酸酸化菌の完全な死滅が証明される。','Aはアンモニア性窒素、Bは亜硝酸性窒素、Cは硝酸性窒素だが、図だけで窒素ガスへの脱窒量を定量できる。'],
 e:['【正しい】Aは初期に高く減少、Bは中間体として一時上昇、Cは硝化の最終生成物として増加する。Bの蓄積はアンモニア酸化と亜硝酸酸化の速度差と整合する。','【誤り】亜硝酸が中間体、硝酸が最終生成物。BとCを逆にし、後段反応停止時のC増加まで主張するのは図と合わない。','【誤り】好気的な硝化はアンモニアから亜硝酸、硝酸への酸化。AとCの出発物質・生成物を逆にしている。','【誤り】A～Cの対応は合うが、Bは後に減少している。山形だけから菌の死滅を断定できず、速度や阻害条件の変化を調べる。','【誤り】A～Cの対応は合うが、図は溶存態の3形態の模式変化を示すだけ。ガス放出や他の窒素形態を測らず脱窒量を定量できない。'],
 point:'硝化はNH₄-N→NO₂-N→NO₃-N。図の曲線対応と、そこから追加測定なしに推定できる範囲を分ける。',
 src:'一次資料：US EPA Wastewater Technology Fact Sheet Trickling Filter Nitrification（硝化の二段階）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1008JE3.TXT 、US EPA Nutrient Control Design Manual https://www.epa.gov/sites/default/files/2019-02/documents/nutrient-control-design-manual.pdf 。図と各肢は本教材の模式設定。'
});
edit('T09',{
 q:'APIオイルセパレーターで油滴の浮上速度が0.10 cm/s、水深が1.5 m、平均水平流速が0.30 m/minである。油滴が底部から水面へ浮上する時間と、理想条件で必要な槽長の組合せとして最も近いものはどれか。短絡・乱れ・安全率は考慮しない。',
 o:['浮上時間15 min、槽長4.5 m。浮上速度を0.10 m/minへ換算して計算する。','浮上時間25 min、槽長4.5 m。槽長には水深だけを速度換算せずに用いる。','浮上時間25 min、槽長7.5 m。浮上速度を0.06 m/minへ換算し、水平移動距離を求める。','浮上時間50 min、槽長15 m。水深を二度通過するとして時間を倍にする。','浮上時間25 min、槽長25 m。浮上時間の数値をそのまま水平距離mとする。'],
 e:['【誤り】0.10 cm/s=0.06 m/minであり、0.10 m/minではない。浮上時間は1.5/0.06=25 min。','【誤り】浮上時間25 minは合うが、槽長は水平流速0.30 m/minとの積。4.5 mではなく7.5 mとなる。','【正しい】0.10 cm/s×0.01 m/cm×60 s/min=0.06 m/min。底からの浮上に25 min、水平距離は0.30×25=7.5 m。','【誤り】水深1.5 mは底部から表面まで一度だけ通過する距離。50 minと15 mは時間・槽長を二倍にした値。','【誤り】25 minは浮上時間であり距離ではない。水平流速を乗じ、7.5 mを得る。実施設では短絡・乱れ等の余裕を別途評価する。'],
 point:'理想モデルの槽長は水平流速×(水深/油滴浮上速度)。cm/sとm/minをそろえ、安全率は問題条件にない限り加えない。',
 src:'一次資料：US EPA Oil/Water Separation: State of the Art（油滴の上昇時間、水平流れと必要長さ）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=91017FMD.TXT 。数値は本問の演習条件。'
});
edit('T11',{
 q:'UASBなどの嫌気性処理で流入COD負荷が急増した後、処理水のVFAが上昇し、アルカリ度と単位流入COD当たりのメタン生成量が低下した。まず行う診断として最も適当なものはどれか。',
 o:['VFAが増えたので酸生成も停止したと判断し、流入COD負荷をさらに上げてメタン生成菌の活性だけを刺激する。','処理水pHが当初は一定なら緩衝能に関係なく安定とみなし、VFAとアルカリ度の推移を測定しない。','メタン生成量の低下はガス流量計の故障だけで説明できるため、VFA上昇とアルカリ度低下を別の偶然と扱う。','アルカリ度低下には必ずアルカリ剤を無制限に追加し、過負荷・温度・阻害物質を確認せず運転負荷を維持する。','VFA/アルカリ度とガス量・組成の推移を確認し、急増した負荷、pH・温度、毒性流入等を切り分けて酸生成とメタン生成の不均衡を是正する。'],
 e:['【誤り】VFA蓄積は酸生成側の生成に対し後段の消費が追いつかないことを示唆する。追加負荷は酸性化を悪化させ得る。','【誤り】アルカリ度の緩衝でpHの変化が遅れる場合がある。VFAとアルカリ度の比・推移を監視する。','【誤り】計器の確認は有用だが、VFA上昇と緩衝能低下を無視しない。ガス量だけでなく組成も合わせて評価する。','【誤り】アルカリの補給は対策候補だが、ショック負荷や温度低下、阻害物質流入を放置しては原因の是正にならない。','【正しい】VFA蓄積、アルカリ度低下、メタン減少はメタン生成系の不均衡を疑う組合せ。計器を検証しつつ負荷・温度・pH・毒性も確認する。'],
 point:'VFA上昇とアルカリ度低下は酸性化の早期兆候になり得る。pHだけで安定とみなさず、ガス量・組成と負荷履歴を併用する。',
 src:'一次資料：US EPA Anaerobic Sludge Digestion Operations Manual（volatile acids/alkalinity ratioとgas production）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=00000IKT.TXT 、US EPA Process Design Manual for Upgrading Existing Wastewater Treatment Plants https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20007T66.TXT 。'
});
edit('T12',{
 q:'加圧浮上設備で流入SS質量負荷が従来の1.5倍となった。飽和槽の圧力・温度、リサイクル流量、空気の溶解・放出効率が一定なら、流入SSに対する供給空気量の比A/Sはどう変化し、何を確認すべきか。最も適当なものはどれか。',
 o:['A/Sは従来の2/3になり得る。処理水SS上昇時には、供給空気量と流入固形物量を実測し、圧力・リサイクル率・気泡・凝集状態を確認する。','A/Sは1.5倍となる。空気量一定でもSSが増えるほど気泡付着の機会は自動的に増える。','A/Sは一定である。リサイクル加圧方式では流入SS質量と供給空気量が常に同じ比率で増える。','A/Sは2/3になるが、飽和圧力を下げるほど水に溶ける空気量が増えるので、圧力を下げれば必ず元へ戻せる。','A/Sは2/3になるが、浮上したスカムを長く滞留させれば不足した供給空気量を補えるため、掻き取りは停止する。'],
 e:['【正しい】空気量一定・SS質量1.5倍ならA/Sは1/1.5=2/3。処理水悪化時は空気供給、固形物負荷、気泡・凝集、スカム管理を切り分ける。','【誤り】A/Sは空気質量/流入固形物質量。分母が1.5倍で分子一定なら1.5倍ではなく2/3。','【誤り】リサイクル加圧方式でも空気供給が一定なら、流入SS増加でA/Sは低下する。方式名から比率一定とはいえない。','【誤り】2/3の計算は合うが、加圧で溶解する空気量の方向を逆にしている。圧力調整は装置条件の範囲で評価する。','【誤り】2/3の計算は合うが、スカムの長時間滞留は空気供給不足を補わない。掻き取りを止めると再分散等も懸念される。'],
 point:'A/Sは空気供給量と流入SS質量の比。負荷が変わったら設備設定だけでなく実際の空気供給・気泡・凝集・水理条件を再評価する。',
 src:'一次資料：US EPA Development Document for Centralized Waste Treatment（圧力・リサイクル・A/S等の運転因子）https://www.epa.gov/sites/default/files/2015-06/documents/cwt_dd_2000.pdf 、US EPA DAF Process Optimization（流入固形物負荷に応じた加圧流量調整）https://www.epa.gov/sites/default/files/2016-01/documents/p1008sbm.pdf 。'
});
edit('T14',{
 q:'部分亜硝酸化・アナモックス法の運転で、亜硝酸の蓄積が減り硝酸生成が増えた。プロセスの基質関係と確認事項として最も適当なものはどれか。',
 o:['アンモニアの一部を亜硝酸まで酸化し、残りのアンモニアと亜硝酸をアナモックスに供給する。硝酸増加時は亜硝酸酸化菌の活性やDO条件を確認する。','アンモニアを全量硝酸にしてからアナモックスへ送る。硝酸が増えたことは亜硝酸の供給が増えた証拠となる。','アナモックス反応そのものを十分な好気条件にすれば、亜硝酸酸化菌による硝酸生成を避けながら窒素除去できる。','アナモックスは主にメタノールと硝酸を使う従属栄養脱窒なので、硝酸の増加だけからメタノール注入不足を確定できる。','亜硝酸酸化菌の活性を最大化して亜硝酸を全量硝酸へ変えることが部分亜硝酸化の目的である。'],
 e:['【正しい】部分亜硝酸化でNO₂-Nを作り、残存NH₄-Nとともにアナモックス反応へ供給する。硝酸増加はNOB活性等を疑うが、運転データで確認する。','【誤り】硝酸はアナモックスの主たる電子受容体ではない。NO₂-Nが不足すれば残存NH₄-Nの処理が難しくなる。','【誤り】アナモックスの主反応は無酸素的。酸素供給は部分亜硝酸化のためで、反応槽全体の高DOを意味しない。','【誤り】メタノールを用いる従属栄養脱窒と異なり、アナモックスはNH₄-NとNO₂-Nを利用する独立栄養的経路。','【誤り】亜硝酸酸化菌がNO₂-Nを硝酸へ変えると、アナモックスの基質が不足し得る。部分亜硝酸化ではNOBの抑制が課題となる。'],
 point:'部分亜硝酸化はNH₄-Nの一部をNO₂-Nに留め、アナモックスは残存NH₄-NとNO₂-Nを使う。硝酸生成の増加はNOBの働きを検証する手掛かり。',
 src:'一次研究：Mainstream partial nitritation and anammox: long-term process stability and effluent quality at low temperatures https://www.sciencedirect.com/science/article/pii/S0043135416303207 、Return-Sludge Treatment with Endogenous Free Nitrous Acid Limits Nitrate Production and N2O Emission https://pubs.acs.org/doi/10.1021/acs.est.9b06404 。'
});
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v66')return s;s=prior(s);ids.forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object'){if(h.lastSel!==undefined&&h.lastSel!==null)h.previousV65Selection={version:'v65',index:h.lastSel};h.lastSel=null;}});if(ids.indexOf(s.current)>=0){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v66';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V66={version:'v66',changed:ids,stale:ids.slice(),migrate:migrate};
})();
