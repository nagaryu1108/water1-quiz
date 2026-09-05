(function(){
  var bank=window.QBANK||[];
  function q(id){for(var i=0;i<bank.length;i++)if(bank[i].id===id)return bank[i];return null;}
  function rx(id,arr){var x=q(id);if(x)x.rxn=arr;}

  /* Use ^ only as an internal charge marker. The UI converts it to <sup> and ordinary
     stoichiometric/formula digits to <sub>, e.g. NH4^+ -> NH₄⁺ and CrO4^2− -> CrO₄²⁻. */
  rx('T03',[
    '第1段階（アンモニア酸化の代表式）：NH4^+ + 1.5 O2 → NO2^− + 2 H^+ + H2O',
    '第2段階（亜硝酸酸化）：NO2^− + 0.5 O2 → NO3^−',
    '脱窒は逆に、無酸素条件でNO3^− / NO2^−を電子受容体として最終的にN2へ還元する。'
  ]);
  rx('T04',[
    'アルミニウム塩凝集の概念式：Al^3+ + 3 H2O ⇄ Al(OH)3↓ + 3 H^+',
    '生成したAl(OH)3のフロックが微細粒子・コロイドを取り込み、沈降しやすくする。'
  ]);
  rx('H04',[
    '還元段階（代表的な半反応）：CrO4^2− + 8 H^+ + 3 e^− → Cr^3+ + 4 H2O',
    '中和・沈殿：Cr^3+ + 3 OH^− → Cr(OH)3↓',
    'したがって、Cr(VI)をまずCr(III)へ還元してから、水酸化物として沈殿分離する流れを理解する。'
  ]);
  rx('H07',[
    '第1段階の代表式：CN^− + OCl^− → CNO^− + Cl^−',
    'まずシアン化物を毒性の低いシアン酸塩へ酸化し、さらに条件を整えて分解を進める。酸性化するとHCNが生じやすいため、アルカリ側で管理する。'
  ]);
  rx('T08',[
    'NH4^+ + 1.5 O2 → NO2^− + 2 H^+ + H2O',
    'NO2^− + 0.5 O2 → NO3^−'
  ]);

  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function chem(s){
    var z=esc(s),holds=[];
    /* Keep charge placeholders immune to the later subscript pass. The former @@SUP0@@
       marker contained P0, so the 0 itself became <sub>0</sub> and leaked into the UI. */
    z=z.replace(/\^(\d*)([+−-])/g,function(_,n,sign){
      var p='§§['+holds.length+']§§';
      if(sign==='-')sign='−';
      holds.push('<sup>'+(n||'')+sign+'</sup>');
      return p;
    });
    /* Formula subscripts: digits immediately following an element symbol or closing parenthesis.
       Decimal coefficients (1.5), leading coefficients (3 H2O), oxidation-state labels Cr(VI),
       and years/narrative numbers are therefore left alone. */
    z=z.replace(/([A-Z][a-z]?|\))(\d+)/g,'$1<sub>$2</sub>');
    z=z.replace(/§§\[(\d+)\]§§/g,function(_,i){return holds[+i]||'';});
    return z;
  }
  function formatReactionBoxes(root){
    var boxes=(root||document).querySelectorAll('.learn');
    for(var i=0;i<boxes.length;i++){
      var b=boxes[i].querySelector('b');
      if(!b||b.textContent.trim()!=='反応式・反応の流れ'||boxes[i].dataset.chemDone==='1')continue;
      var parts=[];for(var n=b.nextSibling;n;n=n.nextSibling){if(n.nodeName==='BR')continue;var t=n.textContent;if(t&&t.trim())parts.push(t.trim());}
      boxes[i].innerHTML='<b>反応式・反応の流れ</b><br>'+parts.map(chem).join('<br>');
      boxes[i].dataset.chemDone='1';
    }
  }
  function install(){
    formatReactionBoxes(document);
    var target=document.getElementById('res')||document.body;
    new MutationObserver(function(){formatReactionBoxes(document);}).observe(target,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  window.water1ChemHTML=chem;
})();
