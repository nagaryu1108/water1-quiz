(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V72||!window.WATER1_COVERAGE_TRIM_V71)return;
var bank=window.QBANK||[],ids=[];
function edit(id,p){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);Object.keys(p).forEach(function(k){if(k==='point'){var old=String(q.p||''),at=old.search(/<(?:div|details)\b/);q.p=p[k]+(at<0?'':' '+old.slice(at));}else q[k]=p[k];});q.contentReviewVersion='v72';ids.push(id);}
edit('T30',{
 q:'アンモニア性窒素を含む水へ塩素を段階注入し、同一反応時間で下表の全残留塩素を得た。このデータから読み取れる不連続点と残留塩素の区分について、最も適当なものはどれか。',
 o:['4 mg/L注入時の極大が不連続点であり、以後の低下は遊離塩素が増える過程だけを示す。','8 mg/L付近の極小が不連続点近傍の目安となり、それ以上の注入域では遊離残留塩素が増える可能性が高い。ただし全残留値だけで各区分を直接定量できない。','4 mg/L時の全残留1.6 mg/Lは全量がHOClであり、pH測定をせずに消毒力を同定できる。','10 mg/L注入時の全残留1.0 mg/Lは消費塩素量で、塩素要求量は注入量との差9.0 mg/Lではない。','12 mg/L注入時の全残留2.0 mg/Lを遊離残留塩素2.0 mg/Lと確定し、HOCl/OCl⁻比も1対1と断定する。'],
 e:['【誤り】初期の極大はクロラミン等の結合残留塩素の形成域と整合する。不連続点の目安はその後の極小近傍。','【正しい】全残留は4 mg/Lで極大、8 mg/L付近で極小となり、その後増加する。これは結合残留の生成・分解と不連続点後の遊離残留の増加に整合する。ただし遊離・結合の個別濃度は全残留値だけから直接求めない。','【誤り】全残留には結合残留塩素も含まれる。遊離塩素中のHOCl/OCl⁻の比率にはpH等が関係する。','【誤り】表の1.0 mg/Lは残留した量。同一塩素当量で注入10から残留1を引くと、この条件での要求量は9.0 mg/L。','【誤り】全残留値から遊離残留だけの値、さらにHOCl/OCl⁻比を直接決定できない。必要なら残留区分とpHを別途測定する。'],
 point:'初期の極大は結合残留塩素の形成、不連続点は後の極小付近、その後は遊離残留が増え得る。全残留=遊離+結合だが、全量値だけで内訳やHOCl比を断定しない。',
 src:'一次資料：US EPA Disinfectants and Disinfection Byproducts Operational Evaluation Reports（不連続点塩素処理曲線）https://www.epa.gov/system/files/documents/2021-12/disinfectants-and-disinfection-byproducts-operational-evaluation-reports.pdf 。表の数値は演習値。'
});
edit('T31',{
 q:'NH₄-NとPO₄-Pに富む返流水からりんを回収する。MAP、HAP、鉄塩凝集、生物学的りん除去の比較として、最も適当なものはどれか。',
 o:['MAPはMg・NH₄・りん酸から結晶化し、HAPはCa・りん酸を主成分とする。MAPではMg供給とpHも結晶化に影響する。','MAPはCa・りん酸の結晶で、NH₄-Nの共存は反応上必要ない。HAPはMgとNH₄の結晶である。','HAPはNH₄を結晶の必須成分として固定するので、アンモニアを含まない排水からはりんを回収できない。','鉄塩を加えた処理はりんを水相に保持するための操作であり、生成固形物の引抜きは除去率に影響しない。','生物学的りん除去でPAOが取り込んだりんは、余剰汚泥を長期保持するだけで水処理系外へ出したことになる。'],
 e:['【正しい】MAPはMgNH₄PO₄·6H₂O、HAPはCa₁₀(OH)₂(PO₄)₆。MAPの晶析ではMg、NH₄、りん酸とpH・過飽和度が重要。','【誤り】MAPとHAPの構成成分が逆。HAPはCa・りん酸からなり、MAPにはMgとNH₄が含まれる。','【誤り】HAPはカルシウムリン酸塩であり、NH₄は必須構成成分ではない。','【誤り】鉄塩はりんを難溶化・共沈させて固液分離する処理である。形成した固形物を系外へ出す。','【誤り】PAOに蓄積したりんは、りんを含む余剰汚泥として系外へ排出して除去する。'],
 point:'MAP=リン酸マグネシウムアンモニウム、HAP=ヒドロキシアパタイト（カルシウムリン酸塩）。鉄塩凝集は固形物へ、PAOは余剰汚泥へりんを移す。',
 src:'一次資料：国土交通省「リン回収の主な方式とその特徴」https://www.mlit.go.jp/mizukokudo/sewerage/content/001993966.pdf 、US EPA Nutrient Control Design Manual https://www.epa.gov/sites/default/files/2019-02/documents/nutrient-control-design-manual.pdf 。'
});
edit('T32',{
 q:'20℃・5日間のBOD測定で、20倍希釈した試料の培養前DOは8.8 mg/L、培養後DOは3.8 mg/Lであった。植種・希釈水ブランク補正は不要とする。DO減少量、試料分率、原試料BOD₅の組合せはどれか。',
 o:['5.0 mg/L、1/20、0.25 mg/L','5.0 mg/L、1/20、5.0 mg/L','5.0 mg/L、1/5、25 mg/L','5.0 mg/L、1/20、100 mg/L','8.8 mg/L、1/20、176 mg/L'],
 e:['【誤り】5.0 mg/Lを20で割ると0.25 mg/Lだが、希釈液中のDO減少を原試料濃度へ戻すには試料分率1/20で割り、20倍する。','【誤り】5.0 mg/Lは希釈後の試料で観察したDO減少量。原試料BOD₅は5.0/(1/20)=100 mg/L。','【誤り】20倍希釈なら試料分率は1/20であり1/5ではない。分率を逆数にして原試料へ換算する。','【正しい】DO減少量=8.8−3.8=5.0 mg/L、試料分率=1/20。BOD₅=5.0/(1/20)=100 mg/L。','【誤り】培養前DOそのものを用いるのではなく、培養前後の差5.0 mg/Lを使う。'],
 point:'希釈液のDO減少5.0 mg/Lを原試料分率0.05で割り、BOD₅=100 mg/L。植種補正が必要な条件ではその分を先に差し引く。',
 src:'一次資料：US EPA Volunteer Stream Monitoring Manual, Dissolved Oxygen and Biochemical Oxygen Demand https://archive.epa.gov/water/archive/web/html/vms52.html 、US EPA Organic Analyses in Water Quality Control Programs（DO差、希釈・植種補正）https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P10119T2.TXT 。数値は演習値。'
});
edit('T33',{
 q:'酸性高温過マンガン酸カリウム法のCOD測定で、試料100 mLについて空試験補正後の酸素相当消費量が2.40 mgであった。試料体積のL換算とCOD（mg O₂/L）の組合せはどれか。',
 o:['1.00 L、2.4 mg/L','0.200 L、12 mg/L','0.100 L、24 mg/L','0.0100 L、240 mg/L','0.00100 L、2400 mg/L'],
 e:['【誤り】試料量は100 mL=0.100 L。2.40 mg/1.00 Lという分母は実際の10倍。','【誤り】100 mL=0.100 Lであり0.200 Lではない。2.40/0.100=24 mg/L。','【正しい】100 mL=0.100 L。COD=2.40 mg O₂/0.100 L=24 mg O₂/L。','【誤り】0.0100 Lは10 mL。試料100 mLより10分の1に誤換算している。','【誤り】0.00100 Lは1 mL。100 mLとの換算を100倍誤っている。'],
 point:'酸素相当量がすでに2.40 mgと与えられたら、COD=2.40/0.100=24 mg O₂/L。酸化剤の標定・空試験差を再度掛けない。',
 src:'一次資料：環境省「環境測定分析統一精度管理調査結果」（CODMnの酸性過マンガン酸条件と試料分取）https://www.env.go.jp/air/tech/seidokanri/explanation/pdf/q_aR03.pdf 。酸素相当量2.40 mgは本教材の仮定。'
});
edit('T34',{
 src:'一次資料：環境省「水質汚濁に係る環境基準についての一部改正について」（全りんの分解・モリブデン青法）https://www.env.go.jp/hourei/01/000040.html 、環境省「窒素・りん自動計測器による水質汚濁負荷量測定方法マニュアル」https://www.env.go.jp/water/heisa/tplc/manu_npami/ 。未ろ過全量の試料代表性、分解・発色、ブランク・回収の判断を逐肢確認。'
});
var stale=ids.filter(function(id){return id!=='T34';}),prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v72')return s;s=prior(s);stale.forEach(function(id){var h=(s.hist||{})[id];if(h&&typeof h==='object'){if(h.lastSel!==undefined&&h.lastSel!==null)h.previousV71Selection={version:'v71',index:h.lastSel};h.lastSel=null;}});if(stale.indexOf(s.current)>=0){s.currentAnswered=false;s.currentSel=null;}s.bankContentVersion='v72';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V72={version:'v72',changed:ids,stale:stale,migrate:migrate};
})();
