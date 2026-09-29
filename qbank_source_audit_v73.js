(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V73||!window.WATER1_SOURCE_AUDIT_V72)return;
var bank=window.QBANK||[],ids=[];
function edit(id,p){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);Object.keys(p).forEach(function(k){if(k==='point'){var old=String(q.p||''),at=old.search(/<(?:div|details)\b/);q.p=p[k]+(at<0?'':' '+old.slice(at));}else q[k]=p[k];});q.contentReviewVersion='v73';ids.push(id);}
edit('T35',{
 q:'含水率98%の汚泥1000 kgを脱水し、固形物の損失はなく、含水率80%のケーキを得た。脱水前後の乾燥固形物量と、ケーキの湿質量の組合せはどれか。',
 o:['乾燥固形物20 kg、ケーキ20 kg','乾燥固形物20 kg、ケーキ50 kg','乾燥固形物20 kg、ケーキ100 kg','乾燥固形物100 kg、ケーキ200 kg','乾燥固形物200 kg、ケーキ250 kg'],
 e:['【誤り】20 kgは乾燥固形物量。ケーキは水を80%含むので湿質量は20/0.20=100 kg。','【誤り】固形分率は20%であり40%ではない。20/0.20=100 kg。','【正しい】初期固形分2%よりDS=1000×0.02=20 kg。回収率100%ならケーキ固形分率20%より湿質量=20/0.20=100 kg。','【誤り】初期汚泥の含水率98%ならDSは2%=20 kgであり100 kgではない。','【誤り】初期の固形分2%を20%と誤認している。DSは20 kgに保たれる。'],
 point:'水を除いても乾燥固形物量は20 kgのまま。入口1000×(1−0.98)=20 kg、出口湿質量=20/(1−0.80)=100 kg。',
 src:'一次資料：US EPA Design Manual: Dewatering Municipal Wastewater Sludges（固形分率とケーキ含水率）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20008QGY.TXT 。数値は演習値。'
});
edit('T36',{
 q:'PAOによる生物学的りん除去で、嫌気槽と好気槽のりん酸・VFA・PHAの動き、系外へのりん除去を説明する記述として最も適当なものはどれか。',
 o:['嫌気でVFAを取り込みPHAとして貯蔵する間にポリりん酸を分解してりん酸を放出し、好気でPHAを利用してりんを過剰取り込みする。取り込んだりんは余剰汚泥引抜きで系外へ出す。','嫌気でVFAからPHAを作ると同時に水中りん酸を過剰に取り込み、好気でポリりん酸を分解して水へ放出する。','嫌気ではポリりん酸の分解とりん酸放出が起きるが、好気段階で嫌気に蓄えたPHAを使わず外部VFAだけを用いる。','好気の過剰取り込みはPAO細胞外のカルシウムりん酸塩沈殿だけを意味し、細胞内ポリりん酸の蓄積は関与しない。','好気で取り込んだりんを含む余剰汚泥は系外へ出さず、槽内へ保持するほど排水系全体のりん除去量が増える。'],
 e:['【正しい】PAOは嫌気でVFAをPHAへ蓄え、ポリPを分解してりん酸を放出する。好気でPHAを利用してりん酸を過剰取り込みし、余剰汚泥引抜きでりんを系外へ移す。','【誤り】嫌気と好気のりん酸の主な向きが逆。嫌気放出、好気過剰取り込みが基本。','【誤り】嫌気で蓄えたPHAは好気段階の内部炭素・エネルギー源となる。','【誤り】化学沈殿とPAO細胞内へのポリりん酸蓄積を混同している。','【誤り】反応槽内の蓄積だけでは系外除去ではない。りんを濃縮した余剰汚泥を排出する。'],
 point:'嫌気：VFA取り込み、PHA蓄積、P放出。好気：PHA利用、P過剰取り込み。汚泥引抜きがりんを系外へ除く出口。',
 src:'一次資料：US EPA Nutrient Control Design Manual（PAOの嫌気・好気代謝と余剰汚泥）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1008KTD.TXT 。'
});
edit('T37',{
 q:'急速ろ過池で損失水頭が所定値に達したため逆洗する。水温の変化とろ材流出の可能性も踏まえた運転として、最も適当なものはどれか。',
 o:['逆洗流速を固定すれば、水温による粘度変化があってもろ層膨張率は同じになる。','ろ材の分級はろ層の捕捉・水理特性に影響しないため、洗浄後のろ層状態は確認しない。','D60/D10で表す均等係数が大きいほど、粒径分布が必ず狭くなる。','損失水頭が限界でも処理水濁度が低ければ水理上の終点とはみなさず、逆洗を続けて先送りする。','適度なろ層膨張で付着濁質を剥離・排出しつつ、水温・ろ材粒径と密度を考慮してろ材流出や支持層の乱れを避ける。'],
 e:['【誤り】水の粘度は水温で変わり、一定流速でも膨張率に影響し得る。季節・水温で確認する。','【誤り】分級はろ層内の粒度配置と捕捉位置、損失水頭に影響し得る。','【誤り】均等係数はD60/D10。値が1に近いほど相対的に粒度がそろう。','【誤り】損失水頭上限は逆洗の主要な運転終点の一つである。ろ過継続能力も評価する。','【正しい】洗浄不足とろ材流出の双方を避ける。目標膨張率はろ材粒径・密度・水温と装置条件に合わせて管理する。'],
 point:'逆洗は適度なろ層膨張で付着物を排出する。流速だけを固定せず水温・ろ材特性と流出限界を確認する。',
 src:'一次資料：US EPA Long Term 1 Enhanced Surface Water Treatment Rule Turbidity Provisions Technical Guidance Manual（逆洗膨張と水温）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30005ZHV.TXT 、US EPA Wastewater Filtration: Design Considerations https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=94002Z3O.TXT 。'
});
edit('T38',{
 q:'活性汚泥施設で水量・槽容量は一定のまま汚泥引抜量を減らした後、SRTが長くなりSVIも上昇した。HRT、SRT、SVIの解釈と初動として最も適当なものはどれか。',
 o:['HRT一定はSRT一定を意味するため、まず引抜量の記録ではなくHRTの計算値だけを見直す。','SVI上昇は単位MLSS当たり沈降体積の増加だが、沈降性の悪化と無関係なので計器校正だけで対処する。','HRTは水理、SRTは系外固形物流出との比、SVIは沈降状態を示す。固形物在庫・引抜き・流出SSを確認し、DOやF/M、顕微鏡観察などでSVI変化の原因を調べる。','SRTを長くすると全微生物が同じ速度で増え、SVIは必ず変わらないため、観測値を外れ値として除く。','SVIの上昇だけで原因は返送汚泥率の過大と確定できるので、返送をゼロにして汚泥保持を止める。'],
 e:['【誤り】HRT=水の滞留時間、SRT=固形物の保持時間。引抜量を減らせば水量一定でもSRTは変わり得る。','【誤り】SVIは単位MLSS当たり30分沈降体積。増加は沈降・圧密性の変化を示し得る。計器だけでなく汚泥を確認する。','【正しい】3指標の定義は異なる。長SRTと高SVIが同時でも因果を一つに断定せず、固形物収支とDO・F/M、微生物像を確認する。','【誤り】増殖・減衰速度は微生物群で異なる。SRTの変化が群集・沈降性に影響する場合がある。','【誤り】SVIだけで返送率を原因と確定できない。返送停止は曝気槽の固形物保持を損なう。'],
 point:'HRT=V/Q、SRT=系内固形物量/系外固形物流出速度、SVI=沈降体積/MLSS。異なる指標を混同せず変化を診断する。',
 src:'一次資料：US EPA Process Control Manual Aerobic Biological Wastewater Treatment Facilities（SRT・SVI・運転診断）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9100NX8X.TXT 、US EPA Wastewater Math Presentation（HRTとSRT）https://www.epa.gov/system/files/documents/2026-02/20251119-wastewatermath-webinar.pdf 。'
});
edit('T39',{
 q:'交換容量2.0 eq/Lの陽イオン交換樹脂を100 L充填し、二価陽イオンM²⁺だけを交換する。理想的に全容量が利用可能としたとき、全交換容量とM²⁺の最大交換物質量の組合せはどれか。',
 o:['50 eq、25 mol','100 eq、50 mol','200 eq、100 mol','200 eq、200 mol','400 eq、400 mol'],
 e:['【誤り】容量2.0 eq/L×100 L=200 eqであり、50 eqではない。二価M²⁺は1 mol当たり2 eq。','【誤り】全容量は200 eq。100 eqは樹脂量100 Lに係数を掛け忘れている。','【正しい】2.0×100=200 eq、M²⁺は2 eq/molなので200/2=100 mol。','【誤り】200という値の単位はeq。二価陽イオンでは200 eq=100 mol。','【誤り】交換容量を価数で増やすのでなく、二価M²⁺の物質量を求める際は2で割る。'],
 point:'樹脂全容量=2.0 eq/L×100 L=200 eq。M²⁺ 1 molは2 eqなので最大100 mol。実運転は破過により利用可能容量が小さくなり得る。',
 src:'一次資料：US EPA Technical Resource Document: Treatment Technologies for Corrosive-Containing Wastes（イオン交換容量eq/Lと二価イオン）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9101XWVM.TXT 。数値は演習値。'
});
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v73')return s;s=prior(s);ids.forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object'){if(h.lastSel!==undefined&&h.lastSel!==null)h.previousV72Selection={version:'v72',index:h.lastSel};h.lastSel=null;}});if(ids.indexOf(s.current)>=0){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v73';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V73={version:'v73',changed:ids,stale:ids.slice(),migrate:migrate};
})();
