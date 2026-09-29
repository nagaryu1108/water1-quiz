(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V65||!window.WATER1_SOURCE_AUDIT_V64)return;
var bank=window.QBANK||[],ids=[];
function edit(id,p){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);Object.keys(p).forEach(function(k){if(k==='point'){var old=String(q.p||''),at=old.search(/<(?:div|details)\b/);q.p=p[k]+(at<0?'':' '+old.slice(at));}else q[k]=p[k];});q.contentReviewVersion='v65';ids.push(id);}
edit('T01',{
 q:'同じ活性汚泥施設で流入水量Q、曝気槽容積V、流入BOD負荷を一定に保った。MLSSが3000から3600 mg/Lへ増加し、余剰汚泥と処理水SSを合わせた固形物排出量は60から48 kg/日へ減少した。沈殿池内の汚泥量を無視し、MLSSを微生物量の指標とすると、変化の組合せとして最も適当なものはどれか。',
 o:['HRTは一定、SRTは1.5倍、F/M比は5/6倍となる。','HRTは一定、SRTは1.2倍、F/M比は5/6倍となる。','HRTは1.2倍、SRTは1.5倍、F/M比は一定となる。','HRTは一定、SRTは1.5倍、F/M比は6/5倍となる。','HRTは1.25倍、SRTは1.2倍、F/M比は5/6倍となる。'],
 e:['【正しい】HRT=V/Qで一定。SRT=(VX)/排出固形物量だから1.2÷0.8=1.5倍。F/M=流入BOD負荷/(VX)だから1/1.2=5/6倍。','【誤り】1.2は槽内MLSS量の倍率だけ。SRTの分母である排出固形物量も0.8倍なので、SRTは1.5倍となる。','【誤り】VとQは一定なのでHRTは変わらない。またBOD負荷一定でXが1.2倍ならF/M比は一定でなく低下する。','【誤り】SRTは1.5倍でよいが、F/M比は微生物量に反比例する。6/5倍ではなく5/6倍。','【誤り】排出量が0.8倍だからといってHRTを1/0.8倍にはしない。HRTは水のV/Q、SRTは固形物の収支で決まる。'],
 point:'同じ「滞留時間」でもHRT=V/QとSRT=VX/(系外固形物排出量)は異なる。F/M比も分子のBOD負荷と分母の槽内MLSS量を分けて倍率計算する。',
 src:'一次資料：US EPA Nutrient Control Design Manual（SRT、HRT、MLSS、F/Mの設計・運転上の区別）https://www.epa.gov/sustainable-water-infrastructure/nutrient-control-design-manual 。倍率は本問の定義と条件から計算。'
});
edit('T02',{
 q:'活性汚泥のMLSSが3000 mg/L、SV30が450 mL/Lだった。さらに同じ試料を希釈した沈降試験ではSVIの評価が変わった。SVIと沈降不良の解釈として、誤っているものはどれか。',
 o:['原試料のSVIは450÷3.0=150 mL/gであり、沈降容積をMLSS濃度で規格化した値である。','SV30はMLSS濃度や沈降時の圧密の影響も受けるため、異なる濃度の試料をSV30だけで比較するのは危うい。','高SVIを認めた場合、糸状性微生物の観察とともに流入性状、DO、SRT等の運転条件を確認する。','原試料のSVIが150 mL/gと計算できれば、希釈試験や顕微鏡観察がどうであれ、原因は糸状性バルキングと確定する。','希釈後に算出したSVIとの違いがあれば、沈降試験の濃度依存性や圧密の影響を検討し、条件をそろえて評価する。'],
 e:['【正しい】MLSS 3000 mg/L=3.0 g/L。SV30をこれで割ると150 mL/gとなり、汚泥質量当たりの沈降容積を示す。','【正しい】SV30は1 L当たりの沈降体積。異なるMLSS濃度での単純比較は、汚泥量だけでなく沈降・圧密挙動の違いも含む。','【正しい】高SVIは沈降不良の手掛かりだが原因は一つではない。微生物相と流入・曝気・汚泥齢等を合わせて調べる。','【誤り】SVIの数値だけで糸状性原因を確定できない。希釈で結果が変わるなら試験条件の影響も点検し、顕微鏡観察などで裏付ける。','【正しい】試料濃度に依存する圧密・干渉沈降があるため、希釈前後で指標が違う場合は測定条件と観察結果を並べて解釈する。'],
 point:'SVI=SV30(mL/L)/MLSS(g/L)。高SVIは診断の入口であり、原因確定には希釈条件や顕微鏡観察、運転記録を要する。',
 src:'一次資料：US EPA Summary Report: The Causes and Control of Activated Sludge Bulking and Foaming https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30004EKH.TXT 、US EPA Field Manual for Performance Evaluation and Troubleshooting https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000C1E0.TXT 。'
});
edit('T03',{
 q:'前置脱窒槽・後段好気槽を持つ活性汚泥施設で、好気槽のNH₄-N残留が増え、無酸素槽のDOも高くなった。窒素除去を立て直す判断として、誤っているものはどれか。',
 o:['好気槽では水温と好気SRTを確認し、硝化菌の保持不足なら汚泥引抜量などを検討する。','硝化には酸素とアルカリ度が必要なため、好気槽のDOとpH・アルカリ度も確認する。','無酸素槽では硝化液の循環量と流入有機物の供給を確認し、硝酸と電子供与体の不足を切り分ける。','無酸素槽のDOが高いならさらに曝気を強め、酸素呼吸より硝酸呼吸を優先させれば脱窒が回復する。','内部循環には硝酸の供給という利点がある一方、過剰なDO持込みが無酸素条件を損ね得る点を評価する。'],
 e:['【正しい】低温や短い好気SRTは硝化菌の保持に不利。汚泥引抜量を変える前に負荷と固液分離能力も合わせて見る。','【正しい】硝化は酸素・アルカリ度を消費する。DOだけでなくpH低下による反応阻害も調べる。','【正しい】前置脱窒では硝化液の硝酸を無酸素槽へ戻し、流入有機物を電子供与体にできる。両方の供給を確認する。','【誤り】DOが高いと酸素が先に電子受容体として使われ、脱窒の無酸素条件が損なわれる。無酸素槽への酸素持込みと撹拌・循環条件を点検する。','【正しい】硝化液の循環は硝酸を供給するが、溶存酸素も運び得る。循環量を増やすだけで改善するとは限らない。'],
 point:'NH₄-N残留は好気硝化のSRT・DO・pHを、無酸素槽の脱窒不良は硝酸・炭素源・DO持込みを別々に診断する。',
 src:'一次資料：US EPA Nutrient Control Design Manual（硝化の好気SRT・アルカリ度、前置脱窒とDO持込み）https://www.epa.gov/sites/default/files/2019-02/documents/nutrient-control-design-manual.pdf 。'
});
edit('T04',{
 q:'凝集沈殿設備で、急速撹拌槽の出口には微小フロックが見られるが、後段のフロック形成池ではフロックが細かく砕け、処理水濁度が上昇した。薬注率・pHは適正範囲にある。まず検討すべき対応はどれか。',
 o:['急速撹拌槽の混合を弱めて薬剤分散を不均一にし、後段での衝突回数を増やす。','フロック形成池の混合強度を急速撹拌槽と同じにし、全段で高いせん断力を保つ。','フロック形成池の出口に高せん断ポンプを設け、生成したフロックを細粒化して沈降速度を上げる。','形成池の段階ごとの撹拌強度と局所せん断を調べ、破砕を抑えながら接触・成長時間を確保する。','フロック破砕の有無を確認せず、凝集剤増量だけで解決したとみなして沈殿池の越流速度を上げる。'],
 e:['【誤り】急速撹拌は凝集剤を素早く均一に分散する工程。後段の破砕を、初期混合の不均一化だけで解決する理由はない。','【誤り】形成池で急速撹拌相当のせん断をかけると成長したフロックを破砕し得る。工程ごとの混合目的を分ける。','【誤り】形成済みフロックをポンプで砕くと粒子が細かくなり、沈降・分離が悪化し得る。送水部のせん断も点検する。','【正しい】薬注とpHが妥当で形成池内の破砕が観察されたため、段階的な緩速撹拌と局所せん断、実際の滞留・接触時間を確認する。','【誤り】薬剤増量は破砕の原因を取り除かない。さらに越流速度を上げると小フロックの流出を助長し得る。'],
 point:'急速撹拌は薬剤分散、フロック形成は適度な接触・成長。形成後の過大せん断と沈殿池への移送条件を切り分ける。',
 src:'一次資料：US EPA Field Manual for Performance Evaluation and Troubleshooting（rapid mixとslow mixing）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000C1E0.TXT 、US EPA Cost and Technology Document（過大な混合とフロック破砕）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=91019EQP.TXT 。'
});
edit('T05',{
 q:'再利用水には溶解性有機物、硝酸イオン、微量のコロイドが残る。活性炭、陰イオン交換、MF、ROを組み合わせる計画として、誤っているものはどれか。',
 o:['粒状活性炭は対象有機物の破過曲線と共存有機物の競合を見て、交換・再生時期を決める。','陰イオン交換で硝酸を除去するなら、共存陰イオンの選択性だけでなく再生廃液の処理も検討する。','ROで脱塩した場合、回収率を高めるほど濃縮側のスケールと濃縮水の処理条件を確認する。','MFの濁度除去率が高ければ、膜差圧を上げることで溶存硝酸の阻止もROと同程度にできる。','MFによるコロイド前処理は後段ROの粒子付着低減に役立つ場合があるが、硝酸除去の代用とはしない。'],
 e:['【正しい】GACの有効性は物質ごと・共存有機物ごとに異なる。流出濃度の推移で破過を監視し、再生・交換を計画する。','【正しい】硝酸を保持した樹脂の再生では濃縮廃液が生じる。原水中の競合イオンと再生系を含めて比較する。','【正しい】RO透過側だけでなく濃縮側の塩類蓄積・スケーリング・排出先の管理を要する。','【誤り】MFの孔径選別は主に粒子・コロイドが対象。圧力を上げても溶解した硝酸イオンをRO並みに阻止する膜へ変わらない。','【正しい】前処理の粒子除去はROのファウリングを減らし得るが、溶解イオンの分離機構は別。'],
 point:'処理対象を粒子、吸着可能な有機物、溶解イオンに分け、除去後の再生廃液・濃縮水の行き先まで評価する。',
 src:'一次資料：US EPA Overview of Drinking Water Treatment Technologies（陰イオン交換、RO/NF、濃縮水）https://www.epa.gov/sdwa/overview-drinking-water-treatment-technologies 、US EPA 2017 Potable Reuse Compendium（MF/UF前処理とRO）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100TNCB.TXT 、US EPA GAC Engineering Bulletin https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=10001KAJ.TXT 。'
});
edit('T07',{
 q:'同じ原水を処理する固定床粒状活性炭塔A・Bを直列に運転中、A出口の対象物質濃度が上昇し、B出口はまだ管理値未満である。運転判断として最も適当なものはどれか。',
 o:['A出口で検出した時点でAの全粒子が完全飽和しているため、Aの未使用容量はゼロと計算してよい。','Aの空塔接触時間を短くすれば吸着帯の移動が遅くなり、Bへの流入濃度は必ず下がる。','A出口とB出口の濃度を監視し、Aの交換・再生後にBを前段へ切り替えるなど、破過と残存容量を踏まえた直列運用を行う。','B出口が管理値未満ならAからの脱着・置換は起こらないので、以後A出口を測定する必要はない。','競合有機物の増加があっても、対象物質の破過時期とBへの負荷は原水中の対象物質濃度だけで決まる。'],
 e:['【誤り】出口への到達は物質移動帯の進行を示すが、塔内の全粒子が同時に飽和したことではない。残存容量は流出曲線から評価する。','【誤り】EBCTを短くすると接触時間が減り、同じ条件での破過を遅らせるとはいえない。','【正しい】前段の破過と後段の余裕を別々に監視し、塔の切替・交換・再生を流出濃度と容量に基づき行う。','【誤り】後段で管理値を守れていても、前段の濃度推移を止めてよいわけではない。競合成分による置換等も評価する。','【誤り】競合吸着は対象物質の容量・破過を変え得る。原水の組成変化と流量・EBCTを合わせて監視する。'],
 point:'破過開始≠全層の完全飽和。前段出口と最終出口を区別し、物質移動帯、競合、EBCT、交換・再生の時点を管理する。',
 src:'一次資料：US EPA Engineering Bulletin: Granular Activated Carbon Treatment（物質移動帯・破過・EBCT）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=10001KAJ.TXT 、US EPA Wastewater Technology Fact Sheet https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1001QTK.TXT 。'
});
edit('T21',{
 q:'再利用水の試験でMFは濁度をほぼ除去したが導電率はほとんど下がらず、NFは硬度を大きく低減した一方、ROは導電率を大きく低減した。運転判断として誤っているものはどれか。',
 o:['MFの濁度低減は後段ROの粒子ファウリング負荷の低減につながり得る。','NFで硬度が下がっても一価塩が残り得るため、軟化と脱塩の要求水質を分けて判断する。','ROで導電率が下がっても塩類は濃縮側に移るので、回収率とスケーリングを評価する。','電気透析は電位差でイオン交換膜を通じてイオンを移動させるため、ROとは駆動力が異なる。','MFで濁度をほぼ除去した事実から、同じ原水の溶解硝酸と一価塩もROと同程度に除去されたと推定する。'],
 e:['【正しい】MFの粒子・コロイド除去は後段ROの前処理として有用な場合がある。ただし溶解塩類の除去を意味しない。','【正しい】NFの多価イオン阻止と一価イオンの透過傾向は対象・膜条件で異なる。硬度と導電率の実測結果を分ける。','【正しい】ROの透過水質だけで完結しない。濃縮水の処理、塩類濃縮とスケーリングも確認する。','【正しい】電気透析は電位差によるイオン移動、ROは圧力駆動の膜分離。電気透析でも濃縮側の管理は必要。','【誤り】濁度は粒子・コロイド、導電率は主に溶解イオンを反映。提示されたMFの導電率結果にも反し、硝酸除去は別途測定すべきである。'],
 point:'粒子除去率と溶解イオンの除去率は別指標。MF、NF、RO、電気透析を駆動力・分離対象・濃縮側管理で比較する。',
 src:'一次資料：US EPA 2017 Potable Reuse Compendium（MF/UF、RO、電気透析）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100TNCB.TXT 、US EPA Overview of Drinking Water Treatment Technologies https://www.epa.gov/sdwa/overview-drinking-water-treatment-technologies 。'
});
edit('T24',{
 q:'Cu²⁺、Zn²⁺、Cr³⁺を含む排水の水酸化物沈殿で、強アルカリ側ではZnとCrの溶存濃度が再上昇し、EDTAが混入した系ではCuも残留した。まず検討すべき解釈はどれか。',
 o:['Zn・Crの高pH側での両性挙動と、EDTAによるCuの錯形成を別々に検討し、適正pHと錯体対策を試験する。','Znの再上昇はpH計の値と独立に、沈殿池の表面負荷だけで説明できるので溶存態と全量を分けて測る必要はない。','EDTAがCuを錯形成すれば水酸化物沈殿の溶解度が必ず低下するため、より少ないアルカリでCuを定量除去できる。','Cr(III)が強アルカリ側で残留するのは必ずCr(VI)への酸化が起きた証拠であり、化学形態分析なしに酸化反応と断定できる。','Zn、Cr、Cuの残留には同一の最適pHが存在すると決め、共存配位子や分別測定をせず全てのpHをさらに上げる。'],
 e:['【正しい】Zn・Crの水酸化物は高pH側で再溶解し得る。Cu-EDTA等の溶存錯体は別の阻害要因なので、pH試験と錯体対策を分ける。','【誤り】表面負荷は固液分離に影響するが、ろ過後の溶存態のpH依存性を単独では説明しない。全量と溶存態を区別する。','【誤り】EDTAはCuを安定な溶存錯体として保持し、水酸化物沈殿を妨げ得る。共存配位子の影響を評価する。','【誤り】Cr(III)の高pH側での溶存は両性・ヒドロキソ錯体でも起こり得る。酸化状態を測らずCr(VI)化を断定しない。','【誤り】金属ごとの最小溶解度pHと錯形成条件は異なる。全成分を一律に強アルカリ化すればよいとは限らない。'],
 point:'水酸化物沈殿はpHを上げれば常に改善するわけではない。両性による再溶解と配位子による錯形成を区別する。',
 src:'一次資料：US EPA Metal Finishing Waste Treatment（Znなどの両性と適正pH）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000UPBJ.TXT 、US EPA Leather Tannery Waste Management（Cr(OH)3の両性）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=93000LCQ.TXT 、US EPA Bio-Recovery Systems（Cu-EDTAの水酸化物沈殿の難しさ）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=10001OCN.TXT 。'
});
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v65')return s;s=prior(s);ids.forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object'){if(h.lastSel!==undefined&&h.lastSel!==null)h.previousV64Selection={version:'v64',index:h.lastSel};h.lastSel=null;}});if(ids.indexOf(s.current)>=0){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v65';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V65={version:'v65',changed:ids,stale:ids.slice(),migrate:migrate};
})();
