(function(){
'use strict';
var B=window.QBANK||[];
var VERSION='v52';

/* Final-pass typography runs after every content/difficulty patch so late-added choices
   cannot reintroduce plain-text formula digits such as NH3 or H2S. Reaction-source
   strings are intentionally left untouched because qbank_chem_v7.js renders them. */
var reps=[
  ['NH4-N','NH₄-N'],['NO2-N','NO₂-N'],['NO3-N','NO₃-N'],
  ['NH4+','NH₄⁺'],['NH3','NH₃'],['H2S','H₂S'],['H2O','H₂O'],
  ['NO2−','NO₂⁻'],['NO2-','NO₂⁻'],['NO3−','NO₃⁻'],['NO3-','NO₃⁻'],
  ['CO2','CO₂'],['CH4','CH₄'],['O2','O₂'],['N2','N₂'],
  ['CaCO3','CaCO₃'],['CaF2','CaF₂'],['AsH3','AsH₃'],['H2Se','H₂Se']
];
function fmt(s){
  if(typeof s!=='string')return s;
  for(var i=0;i<reps.length;i++)s=s.split(reps[i][0]).join(reps[i][1]);
  return s;
}
function fmtQuestion(q){
  ['q','p','src'].forEach(function(k){if(q[k])q[k]=fmt(q[k]);});
  ['o','e'].forEach(function(k){if(Array.isArray(q[k]))q[k]=q[k].map(fmt);});
  if(Array.isArray(q.terms))q.terms=q.terms.map(function(t){return t?{name:fmt(t.name),desc:fmt(t.desc)}:t;});
}
B.forEach(fmtQuestion);

function step(title,role){
  return '<div class="water1-flow-step"><b>'+title+'</b><span>'+role+'</span></div>';
}
function arrow(){return '<div class="water1-flow-arrow" aria-hidden="true">↓</div>';}
function card(id,title,body,note){
  return '<div class="water1-flow" data-flow-id="'+id+'" role="group" aria-label="'+title+'">'+
    '<div class="water1-flow-title">'+title+'</div>'+body+
    (note?'<div class="water1-flow-note">'+note+'</div>':'')+'</div>';
}
function linear(id,title,steps,note){
  var body='<div class="water1-flow-list">';
  for(var i=0;i<steps.length;i++){
    body+=step(steps[i][0],steps[i][1]);
    if(i<steps.length-1)body+=arrow();
  }
  body+='</div>';
  return card(id,title,body,note);
}
function append(id,html){
  var q=B.find(function(x){return x.id===id;});
  if(!q||typeof q.p!=='string'||q.p.indexOf('data-flow-id="'+id+'"')>=0)return;
  q.p+=' '+html;
  q.learningFlowVersion=VERSION;
}

append('T04',linear('T04','凝集・固液分離の基本フロー',[
  ['凝集剤注入・急速撹拌','凝集剤を均一に分散させ、コロイドの電荷を中和・不安定化する。'],
  ['緩速撹拌（フロック形成）','微小フロックを衝突・成長させ、分離しやすい大きさにする。'],
  ['沈殿またはDAF','形成したフロックを水相から固液分離する。'],
  ['ろ過・後処理','残留した微細フロックや濁質を仕上げ除去する。']
],'試験では「急速撹拌＝分散・不安定化」「緩速撹拌＝フロック成長」の役割を入れ替える肢に注意。'));

append('H04',linear('H04','六価クロム排水の代表的処理フロー',[
  ['Cr(VI)含有排水','六価クロムはそのままでは水酸化物沈殿しにくい。'],
  ['還元工程','酸性側など適切な条件でCr(VI)をCr(III)へ還元する。'],
  ['中和・水酸化物生成','pHを調整してCr(OH)₃の沈殿を形成する。'],
  ['凝集・沈殿／ろ過','生成した水酸化物フロックを固液分離する。'],
  ['汚泥管理','クロムを含む汚泥として適切に取り扱う。']
],'要点は「還元 → 中和沈殿 → 固液分離」の順序。Cr(VI)をいきなり沈殿させる発想にしない。'));

append('H07',linear('H07','シアン含有排水の処理・確認フロー',[
  ['アルカリ条件の維持','酸性化によるHCN生成・揮散を防ぐ。'],
  ['酸化工程','遊離CN⁻をCNO⁻などへ酸化し、さらに分解を進める。'],
  ['遊離CN／全CN・錯体の確認','遊離CNが低くても、安定な金属シアノ錯体が残っていないか切り分ける。'],
  ['必要な追加処理','錯体種に応じて分解・酸化・分離処理を組み合わせる。'],
  ['処理水確認','全CNを含む管理項目が目標を満たすことを確認する。']
],'ORPだけで処理完了を断定せず、pH・反応時間・シアンの化学形態を合わせて判断する。'));

append('H10',linear('H10','ほう素排水の処理選定フロー',[
  ['原水性状・pH確認','ホウ酸／ホウ酸イオンの存在割合と共存成分を確認する。'],
  ['方式選定','ほう素選択性樹脂、ROなどを要求水質と原水条件に応じて比較する。'],
  ['処理水確認','ほう素濃度・回収率・運転安定性を確認する。'],
  ['副流の処理','樹脂再生排液やRO濃縮水に移ったほう素を別途管理する。']
],'ほう素は一般的な重金属の単純な水酸化物沈殿と同じ扱いにしない。除去物質は「消える」のではなく副流へ移る点も重要。'));

append('T21',linear('T21','再利用水・膜処理の考え方',[
  ['二次処理水などの原水','用途ごとの濁度・塩類・硬度等を確認する。'],
  ['MF／UF前処理','懸濁物・コロイドを低減し、後段膜のファウリング負荷を下げる。'],
  ['NF／RO等','軟化・脱塩など要求水質に応じて溶解成分を分離する。'],
  ['透過水・再利用','用途別水質を満たすか確認して再利用する。'],
  ['濃縮水管理','阻止された塩類等を含む濃縮側を処理・処分する。']
],'電気透析は圧力膜とは異なり、電位差とイオン交換膜を利用する選択肢。要求水質に応じて方式を選ぶ。'));

append('T22',linear('T22','汚泥脱水から焼却までのフロー',[
  ['濃縮・調質汚泥','脱水しやすい性状へ整え、固形物を集約する。'],
  ['脱水','ケーキ含水率を下げ、後段へ送る水分量を減らす。'],
  ['脱水ケーキ','同じDS量なら含水率が低いほどケーキ量・水分量が小さくなる。'],
  ['焼却','有機分を燃焼し、水分の加熱・蒸発にも熱を要する。'],
  ['灰・排ガス処理','焼却残渣と排ガスをそれぞれ適切に処理する。']
],'脱水機の電力だけでなく、焼却で蒸発させる水分量まで含めて処理系全体のエネルギーを比較する。'));

var l33Body='<div class="water1-flow-branches">'+
  '<div class="water1-flow-branch"><div class="water1-flow-branch-label">サワー水系</div>'+step('サワー水','NH₃・H₂Sなどの揮発性成分を含む。')+arrow()+step('SWS','蒸気ストリッピング等でNH₃・H₂Sを水相から除去する。')+'</div>'+
  '<div class="water1-flow-branch"><div class="water1-flow-branch-label">含油排水系</div>'+step('含油排水','遊離油・乳化油・SSなどを含む。')+arrow()+step('API分離','密度差を利用し、主に遊離油を重力分離する。')+arrow()+step('DAF','微細油滴・SSを気泡に付着させ浮上分離する。')+'</div>'+
  '</div>'+arrow()+step('均等化・生物処理','前処理後の排水を必要に応じ均等化し、溶解性有機物などを微生物で分解する。')+arrow()+step('後処理・放流／再利用','要求水質に応じて仕上げ処理を行う。');
append('L33',card('L33','製油所排水：工程別の基本処理フロー',l33Body,'実設備ではサワー水系と含油排水系は別系統で前処理されることが多く、必ず「SWS→API→DAF」と一直線に流れるわけではない。各工程の対象物質と役割を対応させて覚える。'));

function installStyle(){
  if(!document||!document.head||document.getElementById('water1-flow-v52-style'))return;
  var s=document.createElement('style');s.id='water1-flow-v52-style';
  s.textContent='.water1-flow{margin-top:14px;padding:12px;border:1px solid #bfdbfe;border-radius:12px;background:#f8fbff}.water1-flow-title{font-weight:800;color:#1e3a8a;margin-bottom:9px}.water1-flow-list{display:grid;gap:5px}.water1-flow-step{display:grid;gap:3px;padding:9px 10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff}.water1-flow-step b{color:#172033}.water1-flow-step span{font-size:13px;line-height:1.55;color:#475569}.water1-flow-arrow{text-align:center;font-weight:900;color:#2563eb;line-height:1}.water1-flow-note{margin-top:9px;font-size:12px;line-height:1.6;color:#64748b}.water1-flow-branches{display:grid;grid-template-columns:1fr 1fr;gap:10px}.water1-flow-branch{display:grid;gap:5px;align-content:start}.water1-flow-branch-label{text-align:center;font-size:12px;font-weight:800;color:#1d4ed8}@media(max-width:600px){.water1-flow-branches{grid-template-columns:1fr}.water1-flow{padding:10px}.water1-flow-step span{font-size:12px}}';
  document.head.appendChild(s);
}
installStyle();
window.QBANK=B;
window.WATER1_LEARNING_VISUALS={version:VERSION,formulaNormalization:true,flowQuestionIds:['T04','H04','H07','H10','T21','T22','L33']};
})();
