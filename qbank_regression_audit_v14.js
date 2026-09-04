(function(){
function get(id){return (window.QBANK||[]).find(function(x){return x.id===id});}
function run(){
  var bank=window.QBANK||[], active=window.Q||bank, checks=[], errors=[];
  function ok(name,pass,detail){checks.push({name:name,pass:!!pass,detail:detail||''});if(!pass)errors.push(name+(detail?'：'+detail:''));}
  ok('問題数156',bank.length===156,'QBANK='+bank.length);
  ok('出題対象156',active.length===156,'Q='+active.length+' / QBANK='+bank.length);
  var total=0,detailOK=0,terms=0;
  bank.forEach(function(x){
    if(Array.isArray(x.o))total+=x.o.length;
    if(Array.isArray(x.e)&&x.e.length===5&&x.e.every(function(e){return /^【(正しい|誤り)】/.test(String(e||''));}))detailOK+=5;
    if(Array.isArray(x.terms)&&x.terms.length)terms++;
  });
  ok('780肢',total===780,'choices='+total);
  ok('全5肢詳細解説',detailOK===780,'detail='+detailOK+'/780');
  ok('用語ミニ解説',terms>=120,'termsQuestions='+terms);
  var rxIds=['T03','T04','H04','H07','T08','T11','H09','T14','H26','T31','H29','H30','H31'];
  var rxOK=rxIds.filter(function(id){var x=get(id);return x&&Array.isArray(x.rxn)&&x.rxn.length;}).length;
  ok('反応式13件',rxOK===13,'rxn='+rxOK+'/13');
  ok('T32=100 mg/L',!!get('T32')&&get('T32').a===3&&String(get('T32').p||'').indexOf('100 mg/L')>=0,'answerIndex='+(get('T32')&&get('T32').a));
  ok('L30≈0.23%',!!get('L30')&&String(get('L30').p||'').indexOf('0.23')>=0,'p='+(get('L30')&&get('L30').p));
  ok('頻度×弱点スケジューラ',!!(window.WATER1_FREQUENCY_SCHEDULER&&/frequency x personal weakness/.test(window.WATER1_FREQUENCY_SCHEDULER.method||'')),window.WATER1_FREQUENCY_SCHEDULER&&window.WATER1_FREQUENCY_SCHEDULER.version);
  var chem=window.water1ChemHTML;
  if(typeof chem==='function'){
    var c1=chem('Mg^2+ + NH4^+ + PO4^3− → MgNH4PO4'),c2=chem('CrO4^2− + H^+ → Cr^3+'),c3=chem('Hg^2+ + 2 e^− → Hg^0');
    ok('化学式上付き・下付き',/<sup>2\+<\/sup>/.test(c1)&&/<sub>4<\/sub>/.test(c1)&&/<sup>3−<\/sup>/.test(c1)&&/<sup>2−<\/sup>/.test(c2)&&/<sup>0<\/sup>/.test(c3),'formatter');
  }else ok('化学式上付き・下付き',false,'water1ChemHTML未定義');
  try{
    var k='water1_regression_probe',v='ok-'+Date.now();localStorage.setItem(k,v);var same=localStorage.getItem(k)===v;localStorage.removeItem(k);ok('localStorage読み書き',same,'probe');
  }catch(e){ok('localStorage読み書き',false,String(e));}
  var visualPre=['G06','W06','T06','H06','L06','T08'],visualPost=['G04','W05'];
  var vpre=visualPre.filter(function(id){var x=get(id);return x&&x.v;}).length,vpost=visualPost.filter(function(id){var x=get(id);return x&&x.av;}).length;
  ok('既存問題用図表',vpre===visualPre.length,'pre='+vpre+'/'+visualPre.length);
  ok('解説補助グラフ',vpost===visualPost.length,'post='+vpost+'/'+visualPost.length);
  ok('回答色CSS',!!document.querySelector('style')&&/\.ch\.good\{[^}]*#16a34a/.test(document.documentElement.innerHTML)&&/\.ch\.bad\{[^}]*#dc2626/.test(document.documentElement.innerHTML),'green/red');
  var qidx=(document.documentElement.innerHTML.match(/qbank_patch_v5\.js\?v=(\d+)/)||[])[1];
  ok('indexキャッシュ版',Number(qidx)>=90,'index query v='+(qidx||'none'));
  var result={timestamp:new Date().toISOString(),questions:bank.length,activeQuestions:active.length,totalChoices:total,detailOK:detailOK,reactionOK:rxOK,termQuestions:terms,errors:errors,checks:checks};
  window.WATER1_REGRESSION_AUDIT=result;
  var el=document.getElementById('audit');if(el){var good=errors.length===0;el.textContent=(el.textContent||'').split(' ｜ 回帰監査：')[0]+' ｜ 回帰監査：'+checks.filter(function(c){return c.pass}).length+'/'+checks.length+(good?' 合格':' 要確認');}
  if(errors.length){var w=document.getElementById('warn');if(w&&!document.getElementById('regressionWarn')){var d=document.createElement('div');d.id='regressionWarn';d.className='warn';d.innerHTML='<b>v14回帰監査：</b><br>'+errors.join('<br>');w.appendChild(d);}}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(run,80)});else setTimeout(run,80);
})();