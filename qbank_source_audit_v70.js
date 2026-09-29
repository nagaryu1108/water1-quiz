(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V70||!window.WATER1_SOURCE_AUDIT_V69)return;
var bank=window.QBANK||[],ids=[];
function edit(id,p){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);Object.keys(p).forEach(function(k){if(k==='point'){var old=String(q.p||''),at=old.search(/<(?:div|details)\b/);q.p=p[k]+(at<0?'':' '+old.slice(at));}else q[k]=p[k];});q.contentReviewVersion='v70';ids.push(id);}
edit('T25',{
 q:'流量300 m³/日、流入BOD 250 mg/Lの排水を活性汚泥法で処理する。汚泥負荷を0.30 kgBOD/(kgMLSS・日)、槽内MLSSを2000 mg/Lとして設計するとき、流入BOD負荷と必要曝気槽容積の組合せはどれか。',
 o:['75 kg/日、60 m³','75 kg/日、125 m³','75 kg/日、250 m³','150 kg/日、250 m³','75 kg/日、300 m³'],
 e:['【誤り】BOD負荷75 kg/日を0.30で割ると必要MLSS量250 kg。MLSSは2 kg/m³だから槽容積は125 m³。','【正しい】300×0.250=75 kgBOD/日。必要MLSS量=75/0.30=250 kg、MLSS=2 kg/m³よりV=250/2=125 m³。','【誤り】250は必要なMLSS質量のkg値であり、容積m³ではない。濃度2 kg/m³で割る。','【誤り】250 mg/L=0.250 kg/m³なので、300 m³/日のBOD負荷は75 kg/日。濃度を倍にしない。','【誤り】流量300 m³/日は一日当たりの水量。曝気槽容積は指定された汚泥負荷とMLSSから125 m³となる。'],
 point:'流入BOD負荷=Q×濃度=75 kg/日。汚泥負荷=75/(V×2)=0.30を解き、V=125 m³。流量と槽容量、汚泥質量と容積を分ける。',
 src:'一次資料：US EPA Treatability Manual Volume IV（BOD負荷とMLSSによるF/M）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30005QSD.TXT 。数値は演習条件。'
});
edit('T26',{
 q:'曝気槽25 m³、MLSS 3000 mg/L、処理水量100 m³/日、処理水SS 3 mg/Lの活性汚泥施設をSRT 5日で運転する。沈殿池等の固形物在庫を無視すると、系内固形物量・処理水SS流出量・必要余剰汚泥固形物引抜量の組合せはどれか。',
 o:['75 kg、0.3 kg/日、5 kg/日','75 kg、3 kg/日、12 kg/日','75 kg、0.3 kg/日、14.7 kg/日','75 kg、0.3 kg/日、15.3 kg/日','15 kg、0.3 kg/日、14.7 kg/日'],
 e:['【誤り】系内75 kgをSRT 5日で割った系外流出合計は15 kg/日。余剰汚泥だけで5 kg/日ではない。','【誤り】処理水SS=3 mg/L=0.003 kg/m³。100 m³/日では0.3 kg/日であり3 kg/日ではない。','【正しい】槽内25×3=75 kg。SRT=75/(引抜き+流出)=5日より系外流出15 kg/日。処理水SSは100×0.003=0.3 kg/日、引抜きは14.7 kg/日。','【誤り】系外流出の合計15 kg/日に処理水流出0.3 kg/日を加算するのでなく、その分を差し引いて余剰汚泥引抜量を得る。','【誤り】15 kgは一日当たりの固形物流出総量。槽内固形物在庫は25 m³×3 kg/m³=75 kg。'],
 point:'SRT=系内固形物75 kg/(余剰汚泥引抜き+処理水SS流出)。分母は15 kg/日、処理水0.3 kg/日なので引抜き14.7 kg/日。',
 src:'一次資料：US EPA Process Control Manual Aerobic Biological Wastewater Treatment Facilities（SRTは系内固形物/系外固形物流出）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9100NX8X.TXT 。数値は演習条件。'
});
edit('T27',{
 q:'流量800 m³/日、BOD 400 mg/L、窒素20 mg/L、りん2 mg/Lの排水を活性汚泥法で処理する。必要比をBOD:N:P=100:5:1とし、流入N・Pが全量利用可能と仮定する。補給薬液は「元素Pとして質量分率20%」のりん酸溶液である。必要なN補給量、P補給量、薬液量の組合せはどれか。',
 o:['N 16 kg/日、P 1.6 kg/日、薬液8 kg/日','N 0 kg/日、P 3.2 kg/日、薬液16 kg/日','N 0 kg/日、P 1.6 kg/日、薬液1.6 kg/日','N 0 kg/日、P 1.6 kg/日、薬液8 kg/日','N 0 kg/日、P 0 kg/日、薬液0 kg/日'],
 e:['【誤り】必要NはBOD負荷320 kg/日の5%=16 kg/日だが、流入Nも800×0.020=16 kg/日ある。追加Nは0。','【誤り】必要Pの総量は320×0.01=3.2 kg/日。流入P=800×0.002=1.6 kg/日を差し引くと補給Pは1.6 kg/日。','【誤り】1.6 kg/日は元素Pの不足量。薬液中のPが20%なので1.6/0.20=8 kg/日の溶液を要する。','【正しい】BOD負荷320 kg/日からN必要量16 kg/日、P必要量3.2 kg/日。流入N16、P1.6 kg/日を差し引き、N補給0、P補給1.6 kg/日、薬液8 kg/日。','【誤り】流入Pは1.6 kg/日だが、必要Pは3.2 kg/日。不足分1.6 kg/日を補給する。'],
 point:'BOD負荷320 kg/日。N必要16=流入16、P必要3.2−流入1.6=不足1.6 kg-P/日。薬液はP質量分率0.20なので8 kg/日。「りん酸そのものの濃度20%」とは異なる。',
 src:'一次資料：US EPA Process Control Manual Aerobic Biological Wastewater Treatment Facilities（BOD:N:P=100:5:1、流入栄養塩との差分、元素換算）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9100NX8X.TXT 。比と薬液濃度は本問の仮定。'
});
edit('T28',{
 q:'気泡で分節するCFA（連続流れ分析）で、試料・試薬の送液比と試料間のキャリーオーバーを管理する。流路構成と異常時の対応として最も適当なものはどれか。',
 o:['送液比はチューブ劣化後も一定なので、ピーク高さが変われば検出器感度だけを補正する。','高濃度試料後に持越しがあれば、洗浄区間を短縮し、先行試料の影響を大きくして再現性を調べる。','反応コイルは流量・反応時間に影響しないため、コイルを変更しても標準液による再確認は不要である。','試料と試薬の流量・分節と反応時間を管理し、持越しがあれば洗浄と流路を点検する。検出前に気泡を除く構成では除泡部も確認し、標準液・管理試料で応答を検証する。','気泡による分節を使う装置では、気泡をそのまま光学セルに必ず通すことが定量条件であり、除泡は許されない。'],
 e:['【誤り】ポンプチューブの劣化は送液流量・比を変え得る。感度調整だけで流路の異常は解消しない。','【誤り】持越しがあれば試料間洗浄や流路を点検する。洗浄を短くすると先行試料の影響が増え得る。','【誤り】反応コイルと流量が変われば反応時間・混合が変わり得る。標準液と管理試料で性能を確認する。','【正しい】分節流と送液比、反応部、洗浄区間、検出部を一連で管理する。除泡部は装置構成に応じ点検し、校正・管理試料で正常応答を確かめる。','【誤り】気泡は分節に役立つが、光学セル内の気泡は妨害になり得る。除泡の有無と位置は採用した流路・方法に従う。'],
 point:'CFAは一定の試料・試薬比と反応条件、分節・洗浄・検出を一体管理する。キャリーオーバーと気泡によるセル妨害を分け、方法に従いQCで確認する。',
 src:'一次資料：US EPA Method 353.2（連続流れ分析の送液比・反応部・検出）https://www.epa.gov/sites/production/files/2015-08/documents/method_353-2_1993.pdf 、US EPA National Coastal Condition Assessment Laboratory Methods Manual（分節流・除泡部・持越し管理）https://www.epa.gov/sites/default/files/2013-11/documents/ncca-labmethods_final.pdf 。'
});
edit('T29',{
 q:'環境省の付表14に示されたn-ヘキサン抽出物質（油分等）の測定を行う。試料容器内壁への付着、抽出時の乳化、溶媒除去、秤量を考慮した記述として誤っているものはどれか。',
 o:['試料容器をヘキサンで洗い、その洗液も抽出操作に加えて容器付着による損失を抑える。','安定なエマルジョンが生じた場合は、規定の操作で相分離を改善してから抽出層を回収する。','ヘキサン除去後に定められた条件で乾燥・放冷・秤量し、空試験値を補正して濃度を求める。','測定値は規定の抽出・溶媒除去後の残留物であり、操作中に失われる揮発性成分を含む全有機物量と同一ではない。','抽出前に開放容器で試料を強く加熱して揮発成分を飛ばせば、油分の回収率が必ず向上するため、付表14の標準操作に含まれる。'],
 e:['【正しい】付表14は試料容器をヘキサンで洗って洗液を分液漏斗へ合わせる。壁面付着分を捨てない。','【正しい】乳化した場合は付表14注4など所定の処理を行う。抽出層を不完全な分離のまま秤量しない。','【正しい】溶媒を除き80±5℃で30分乾燥し、デシケーターで30分放冷後に質量を測る。空試験差を補正する。','【正しい】操作で残ったヘキサン可溶成分を測る方法であり、水中の全有機物を直接定量するものではない。揮発性成分は失われ得る。','【誤り】付表14は試料を開放加熱してから抽出する操作を規定しない。前加熱は対象成分の損失を招くため、所定の捕集・抽出・溶媒除去を行う。'],
 point:'容器洗液を回収し、乳化を所定の方法で解消する。溶媒除去後に定条件で乾燥・放冷・秤量し、空試験を差し引く。前加熱で対象成分を失わない。',
 src:'一次資料：環境省「付表14 n-ヘキサン抽出物質（油分等）の測定方法」https://www.env.go.jp/kijun/wt_a14.html 。'
});
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v70')return s;s=prior(s);ids.forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object'){if(h.lastSel!==undefined&&h.lastSel!==null)h.previousV69Selection={version:'v69',index:h.lastSel};h.lastSel=null;}});if(ids.indexOf(s.current)>=0){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v70';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V70={version:'v70',changed:ids,stale:ids.slice(),migrate:migrate};
})();
