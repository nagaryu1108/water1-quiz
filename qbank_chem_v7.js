(function(){
  var bank=window.QBANK||[];
  function q(id){for(var i=0;i<bank.length;i++)if(bank[i].id===id)return bank[i];return null;}
  function rx(id,arr){var x=q(id);if(x)x.rxn=arr;}

  /* Chemistry-content corrections found by the full-bank formula review. */
  var h22=q('H22');
  if(h22&&Array.isArray(h22.e)&&h22.e[1])h22.e[1]=h22.e[1].replace(/SeH2/g,'H2Se');
  var h10=q('H10');
  if(h10&&Array.isArray(h10.e)&&h10.e[4])h10.e[4]=h10.e[4].replace('【試験・ひっかけ】undefined','【試験・ひっかけ】B(OH)3とB(OH)4−の存在比はpHで変化する。ほう素を単純な重金属水酸化物沈殿と同じ発想で扱わない。');

  /* Use ^ as the canonical source marker for charge/oxidation-state superscripts. */
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
    function holdSup(body){var p='§§['+holds.length+']§§';holds.push('<sup>'+body+'</sup>');return p;}
    /* Explicit canonical notation: charge (^2−, ^+) and neutral oxidation state (^0). */
    z=z.replace(/\^(\d*)([+−-])/g,function(_,n,sign){if(sign==='-')sign='−';return holdSup((n||'')+sign);});
    z=z.replace(/\^0/g,function(){return holdSup('0');});
    /* Legacy monovalent notation found in older reaction data. Restrict conversion to
       common ionic species/electron so arithmetic plus signs and ordinary prose are untouched. */
    z=z.replace(/\b(H|OH|CN|CNO|OCl|Cl|F|e)([+−-])(?=\s|\/|→|⇄|$)/g,function(_,ion,sign){if(sign==='-')sign='−';return ion+holdSup(sign);});
    /* Formula subscripts: digits immediately following an element symbol or closing parenthesis. */
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
