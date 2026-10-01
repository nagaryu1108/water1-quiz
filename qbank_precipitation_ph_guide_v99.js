(function(){
'use strict';
if(window.WATER1_PRECIP_PH_GUIDE_V99||!window.WATER1_VALENCE_GUIDE_V98)return;
var bank=window.QBANK||[],ids=['H04','H06','T24'];
var guide='<details class="water1-aid-medium water1-precip-ph-guide"><summary>理解補助｜沈殿処理のpHを比較する</summary><div class="learn">'+
 '<p><b>原則：</b>水酸化物沈殿のpHは金属ごとに異なる。低すぎると沈殿しにくく、両性水酸化物は高すぎても再溶解する。「強アルカリほどよい」は誤り。</p>'+
 '<ul><li><b>Cr(VI)→Cr(III)：</b>亜硫酸水素塩等による代表的な処理では、まず酸性側（EPA資料の例：pH 2～3）で還元し、その後アルカリ側へ調整してCr(OH)₃として沈殿させる。還元時と沈殿時のpHを混同しない。</li>'+
 '<li><b>Cu・Zn の水酸化物：</b>EPAのめっき排水資料の試験例では、溶解度を小さくする目安はpH 8.5～9.0。Znは上げすぎると再溶解に注意。</li>'+
 '<li><b>Ni・Cr(III) の水酸化物：</b>同資料の試験例ではpH 9.5～10.0。Cr(III)も過度のアルカリ側で再溶解に注意。</li>'+
 '<li><b>混合排水：</b>同資料では四金属の妥協点としてpH約9を挙げるが、各成分の最適点を同時に満たす万能値ではない。EDTAなどの錯化剤があると、pHを合わせても沈殿しにくい。</li></ul>'+
 '<p><b>沈殿の種類を先に確認：</b>フッ素はCaF₂、リン酸は鉄・アルミニウム塩などによる沈殿であり、上の金属水酸化物のpH値を転用しない。ホウ素もpH調整だけの単純な水酸化物沈殿で除去できるとは考えない。</p>'+
 '<p><b>実務と試験の区別：</b>上記pHは特定資料での例であり、一律の運転設定値ではない。共存物・錯化・反応時間・固液分離により最適条件は変わる。処理後の溶存濃度と沈降性を試験し、放流前のpHと対象物質を確認する。</p>'+
 '<p>根拠：<a href="https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000LF1K.TXT" target="_blank" rel="noopener noreferrer">米国EPA・めっき排水技術資料</a>、<a href="https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20003217.TXT" target="_blank" rel="noopener noreferrer">米国EPA・集中処理技術資料</a>。</p>'+
 '</div></details>';
ids.forEach(function(id){var q=bank.find(function(x){return x.id===id;});if(!q||typeof q.p!=='string')throw Error('Missing precipitation pH guide target '+id);if(q.p.indexOf('water1-precip-ph-guide')!==-1)throw Error('Duplicate precipitation pH guide '+id);q.p+=' '+guide;q.contentReviewVersion='v99';});
window.WATER1_PRECIP_PH_GUIDE_V99={version:'v99',changed:ids};
})();
