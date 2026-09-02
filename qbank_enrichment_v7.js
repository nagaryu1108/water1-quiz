(function(){
  var bank=window.QBANK||[];
  function find(id){for(var i=0;i<bank.length;i++)if(bank[i].id===id)return bank[i];return null;}
  function set(id,props){var q=find(id);if(!q)return;Object.keys(props).forEach(function(k){q[k]=props[k];});}
  function add(q){if(!find(q.id))bank.push(q);}

  /* v7 enrichment policy
     - Charts shown after answering only when they aid interpretation and were not required to solve the question.
     - Reaction equations are concise and included only when they explain why a treatment/analysis step is used.
     - Mini glossary notes explain method/law/survey terms in place.
     - Latest official water-quality statistics remain FY2024 (令和6年度) because FY2025 results are not yet published.
  */

  set('G03',{
    terms:[
      {name:'概況調査',desc:'地域全体の地下水質の状況を把握するために行う調査。新たな汚染の発見にもつながる。'},
      {name:'汚染井戸周辺地区調査',desc:'概況調査などで新たに発見された汚染について、汚染範囲を確認するための調査。'},
      {name:'継続監視調査',desc:'過去に汚染が確認された地域で、汚染の推移を継続的に監視するための調査。'}
    ]
  });

  set('G04',{
    d:'最新統計｜令和6年度測定結果（2026年3月公表）',
    av:{kind:'barH',title:'解説補助｜令和6年度 生活環境項目の環境基準達成率',labels:['河川 BOD','海域 COD','湖沼 COD'],values:[93.9,78.2,50.8],unit:'%',max:100,note:'河川・湖沼・海域では代表的に用いる有機汚濁指標が異なる点にも注意。'},
    terms:[{name:'環境基準達成率',desc:'類型指定された水域などで、環境基準を達成した割合。排水基準の遵守率とは別の指標。'}]
  });

  set('W05',{
    av:{kind:'barH',title:'解説補助｜令和6年度 地下水概況調査の項目別環境基準超過率',labels:['硝酸性窒素等','砒素','ふっ素','鉛','ほう素','総水銀','トリクロロエチレン'],values:[2.5,2.0,1.1,0.3,0.3,0.1,0.1],unit:'%',max:3,note:'全体の超過率5.6%とは「いずれかの項目で超過した井戸」の割合であり、項目別超過率の単純合計ではない。'},
    terms:[{name:'概況調査',desc:'地域全体の地下水質の状況を把握するための調査。令和6年度は2,721井戸を調査し、いずれかの項目で基準超過した井戸は5.6%。'}]
  });

  set('T03',{
    rxn:[
      '第1段階（アンモニア酸化の代表式）：NH4+ + 1.5 O2 → NO2− + 2 H+ + H2O',
      '第2段階（亜硝酸酸化）：NO2− + 0.5 O2 → NO3−',
      '脱窒は逆に、無酸素条件でNO3−/NO2−を電子受容体として最終的にN2へ還元する。'
    ],
    terms:[
      {name:'硝化',desc:'好気条件でアンモニア性窒素を亜硝酸性窒素、さらに硝酸性窒素へ酸化する生物反応。酸素とアルカリ度を消費する。'},
      {name:'脱窒',desc:'無酸素条件で硝酸・亜硝酸を窒素ガスへ還元する生物反応。一般に有機物などの電子供与体が必要。'}
    ]
  });

  set('T04',{
    rxn:['アルミニウム塩凝集の概念式：Al3+ + 3 H2O ⇄ Al(OH)3↓ + 3 H+','生成した水酸化アルミニウムのフロックが微細粒子・コロイドを取り込み、沈降しやすくする。'],
    terms:[{name:'凝集法',desc:'薬品添加などにより微細な懸濁粒子やコロイドを不安定化し、より大きなフロックへ成長させて分離しやすくする処理。'}]
  });

  set('T05',{
    terms:[
      {name:'活性炭吸着法',desc:'活性炭の大きな比表面積と細孔を利用し、主として溶解性有機物などを吸着除去する方法。'},
      {name:'イオン交換法',desc:'イオン交換樹脂などの交換基と水中イオンを交換し、特定イオンを除去・回収する方法。'},
      {name:'膜分離法',desc:'膜を介した透過性の差を利用して物質を分離する方法。MF、UF、NF、ROなどで分離対象が異なる。'}
    ]
  });

  set('H04',{
    rxn:[
      '還元段階（代表的な半反応）：CrO4^2− + 8 H+ + 3 e− → Cr3+ + 4 H2O',
      '中和・沈殿：Cr3+ + 3 OH− → Cr(OH)3↓',
      'したがって、Cr(VI)をまずCr(III)へ還元してから、水酸化物として沈殿分離する流れを理解する。'
    ],
    terms:[{name:'還元沈殿法',desc:'高酸化状態で溶解性の高い金属を還元し、その後pH調整により難溶性水酸化物などとして沈殿分離する方法。六価クロム処理が代表例。'}]
  });

  set('H07',{
    rxn:[
      '第1段階の代表式：CN− + OCl− → CNO− + Cl−',
      'まずシアン化物を毒性の低いシアン酸塩へ酸化し、さらに条件を整えて分解を進める。酸性化するとHCNが生じやすいため、アルカリ側で管理する。'
    ],
    terms:[{name:'アルカリ塩素法',desc:'シアン含有排水をアルカリ性に保ち、次亜塩素酸塩などの酸化剤で段階的に酸化分解する方法。HCN発生防止のためpH管理が重要。'}]
  });

  add({
    id:'T08',s:'汚水処理特論',t:'硝化反応・曲線同定',d:'図・凡例同定｜本試験発展',
    q:'下図は、アンモニア性窒素を主成分とする排水を好気条件で回分式に硝化したときの窒素形態の変化を模式的に示したものである。曲線A、B、Cの組合せとして、最も適当なものはどれか。',
    v:{kind:'multiLine',x:[0,1,2,3,4,5],xLabel:'反応時間（相対値）',yLabel:'窒素濃度（相対値）',series:[{label:'A',y:[20,16,10,5,2,1]},{label:'B',y:[0,2,5,4,2,0.5]},{label:'C',y:[0,2,5,11,16,18.5]}],note:'模式図：絶対値ではなく変化の形を読む。'},
    o:[
      'A：アンモニア性窒素、B：亜硝酸性窒素、C：硝酸性窒素',
      'A：硝酸性窒素、B：亜硝酸性窒素、C：アンモニア性窒素',
      'A：アンモニア性窒素、B：硝酸性窒素、C：亜硝酸性窒素',
      'A：亜硝酸性窒素、B：アンモニア性窒素、C：硝酸性窒素',
      'A：硝酸性窒素、B：アンモニア性窒素、C：亜硝酸性窒素'
    ],a:0,
    p:'硝化はNH4+-N → NO2−-N → NO3−-Nの逐次酸化。出発物質は減少し、中間体の亜硝酸は一時的に増えてから減少し、最終生成物の硝酸は増加する。',
    e:[
      '【正しい】Aは初期に高く単調に減少するので基質のアンモニア性窒素、Bは一度増えてから減るので中間体の亜硝酸性窒素、Cは時間とともに蓄積するので硝酸性窒素である。\n【原理】硝化は逐次反応なので、中間体だけが山形の濃度変化になりやすい。\n【試験】凡例を隠した曲線では「出発物質・中間体・最終生成物」の形から同定する。',
      '【誤り】AとCが逆。硝酸性窒素は初期に高濃度から減少する物質ではなく、硝化の最終生成物として増加する。\n【正しい文章】A：アンモニア性窒素、C：硝酸性窒素。\n【ひっかけ】酸化数が高い硝酸を出発物質と誤認しない。',
      '【誤り】BとCが逆。亜硝酸性窒素は中間体なので一時的に蓄積してピークを示し、硝酸性窒素は最終生成物として増加する。\n【正しい文章】B：亜硝酸性窒素、C：硝酸性窒素。\n【ひっかけ】NO2−とNO3−の生成順序を交換する肢に注意。',
      '【誤り】AとBの役割が逆。初期基質はアンモニア性窒素であり、亜硝酸性窒素は反応途中で生成する中間体である。\n【正しい文章】A：アンモニア性窒素、B：亜硝酸性窒素。\n【関連知識】アンモニア酸化と亜硝酸酸化の二段階を対応させる。',
      '【誤り】3曲線すべての対応が反応順序と合わない。\n【正しい文章】NH4+-Nは減少、NO2−-Nは一時的に増減、NO3−-Nは増加する。\n【試験】曲線の絶対値より、初期値・極大・終末値の3点を先に見る。'
    ],
    rxn:['NH4+ + 1.5 O2 → NO2− + 2 H+ + H2O','NO2− + 0.5 O2 → NO3−'],
    terms:[{name:'硝化',desc:'好気条件でアンモニア性窒素を亜硝酸性窒素、さらに硝酸性窒素へ酸化する生物反応。'}],
    src:'JEMAI汚水処理特論の硝化・窒素除去の出題傾向を踏まえたオリジナル模式問題'
  });

  window.QBANK=bank;
})();

/* UI enrichment is installed after the original page script has defined render/showAnswered. */
document.addEventListener('DOMContentLoaded',function(){
  if(window.__water1EnrichV7)return;window.__water1EnrichV7=true;
  var st=document.createElement('style');
  st.textContent='.ansviz{margin:12px 0;padding:12px;border:1px solid #cbd5e1;border-radius:12px;background:#fff}.ansviz h3{font-size:14px;margin:0 0 8px}.ansviz .note{font-size:11px;color:#64748b;line-height:1.5;margin-top:8px}.learnbox{margin-top:12px;padding:12px;border-radius:10px;background:#fff;border:1px solid #dbe3ee}.learnbox h3{font-size:14px;margin:0 0 8px;color:#1e3a8a}.formula{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#f8fafc;padding:8px;border-radius:8px;margin:6px 0;overflow-wrap:anywhere}.termmini{margin:8px 0;line-height:1.65}.termmini b{color:#1d4ed8}';
  document.head.appendChild(st);

  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function drawHBar(box,v){
    var W=680,row=42,L=190,R=50,T=36,B=24,H=T+B+row*v.values.length,max=v.max||Math.max.apply(null,v.values),pw=W-L-R;
    var s='<h3>'+esc(v.title||'解説補助グラフ')+'</h3><svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto;display:block">';
    v.values.forEach(function(val,i){var y=T+i*row,w=pw*(val/max);s+='<text x="'+(L-8)+'" y="'+(y+18)+'" text-anchor="end" font-size="12">'+esc(v.labels[i])+'</text><rect x="'+L+'" y="'+(y+3)+'" width="'+w+'" height="22" rx="3" fill="#64748b"/><text x="'+(L+w+7)+'" y="'+(y+19)+'" font-size="12" font-weight="700">'+val+esc(v.unit||'')+'</text>';});
    s+='</svg>'+(v.note?'<div class="note">'+esc(v.note)+'</div>':'');box.innerHTML=s;
  }
  function drawMultiLine(box,v){
    box.innerHTML='';box.style.display='block';
    var W=620,H=360,L=64,R=28,T=24,B=76,xmin=Math.min.apply(null,v.x),xmax=Math.max.apply(null,v.x),all=[];v.series.forEach(function(z){all=all.concat(z.y)});var ymin=0,ymax=Math.max.apply(null,all)*1.12||1,pw=W-L-R,ph=H-T-B;
    function sx(x){return L+(x-xmin)/(xmax-xmin||1)*pw}function sy(y){return T+(ymax-y)/(ymax-ymin||1)*ph}
    var dash=['','8 5','2 4'],s='<svg viewBox="0 0 '+W+' '+H+'">';
    for(var g=0;g<=5;g++){var val=ymax*g/5,y=sy(val);s+='<line x1="'+L+'" y1="'+y+'" x2="'+(W-R)+'" y2="'+y+'" stroke="#e2e8f0"/><text x="'+(L-8)+'" y="'+(y+4)+'" text-anchor="end" font-size="10">'+Math.round(val*10)/10+'</text>';}
    s+='<line x1="'+L+'" y1="'+T+'" x2="'+L+'" y2="'+(H-B)+'" stroke="#334155"/><line x1="'+L+'" y1="'+(H-B)+'" x2="'+(W-R)+'" y2="'+(H-B)+'" stroke="#334155"/>';
    v.series.forEach(function(z,si){var pts=v.x.map(function(x,i){return sx(x)+','+sy(z.y[i])}).join(' ');s+='<polyline points="'+pts+'" fill="none" stroke="#334155" stroke-width="'+(3-si*.4)+'" '+(dash[si]?'stroke-dasharray="'+dash[si]+'"':'')+'/>';var lx=W-R-75,ly=T+18+si*22;s+='<line x1="'+lx+'" y1="'+ly+'" x2="'+(lx+28)+'" y2="'+ly+'" stroke="#334155" stroke-width="3" '+(dash[si]?'stroke-dasharray="'+dash[si]+'"':'')+'/><text x="'+(lx+35)+'" y="'+(ly+4)+'" font-size="12" font-weight="700">'+esc(z.label)+'</text>';});
    v.x.forEach(function(x){s+='<text x="'+sx(x)+'" y="'+(H-B+20)+'" text-anchor="middle" font-size="10">'+x+'</text>';});
    s+='<text x="'+(L+pw/2)+'" y="'+(H-30)+'" text-anchor="middle" font-size="12">'+esc(v.xLabel||'')+'</text><text x="18" y="'+(T+ph/2)+'" transform="rotate(-90 18 '+(T+ph/2)+')" text-anchor="middle" font-size="12">'+esc(v.yLabel||'')+'</text></svg>';
    if(v.note)s+='<div style="font-size:11px;color:#64748b;margin-top:4px">'+esc(v.note)+'</div>';box.innerHTML=s;
  }

  var oldRV=window.renderVisual;
  if(typeof oldRV==='function')window.renderVisual=function(v){if(v&&v.kind==='multiLine'){drawMultiLine(document.getElementById('visual'),v);return;}return oldRV(v);};

  function showExtras(x){
    var res=document.getElementById('res');if(!res)return;var old=document.getElementById('enrichV7');if(old)old.remove();var wrap=document.createElement('div');wrap.id='enrichV7';
    if(x.av&&!x.v){var av=document.createElement('div');av.className='ansviz';drawHBar(av,x.av);wrap.appendChild(av);}
    if((x.rxn&&x.rxn.length)||(x.terms&&x.terms.length)){var lb=document.createElement('div');lb.className='learnbox';var h='';if(x.rxn&&x.rxn.length){h+='<h3>反応・原理</h3>';x.rxn.forEach(function(z){h+='<div class="formula">'+esc(z)+'</div>';});}if(x.terms&&x.terms.length){h+='<h3 style="margin-top:12px">用語ミニ解説</h3>';x.terms.forEach(function(t){h+='<div class="termmini"><b>'+esc(t.name)+'</b>：'+esc(t.desc)+'</div>';});}lb.innerHTML=h;wrap.appendChild(lb);}
    if(wrap.childNodes.length)res.appendChild(wrap);
  }
  var oldSA=window.showAnswered;if(typeof oldSA==='function')window.showAnswered=function(x,k){oldSA(x,k);showExtras(x);};
  var oldRender=window.render;if(typeof oldRender==='function')window.render=function(){var z=document.getElementById('enrichV7');if(z)z.remove();oldRender();};
  if(typeof window.render==='function')window.render();
});