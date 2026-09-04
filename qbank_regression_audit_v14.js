(function(){
function get(id){return (window.QBANK||[]).find(function(x){return x.id===id});}
function run(){
  var bank=window.QBANK||[], active=window.Q||bank, checks=[], errors=[];
  function ok(name,pass,detail){checks.push({name:name,pass:!!pass,detail:detail||''});if(!pass)errors.push(name+(detail?'：'+detail:''));}
  ok('問題数191',bank.length===191,'QBANK='+bank.length);
  ok('出題対象191',active.length===191,'Q='+active.length+' / QBANK='+bank.length);
  var total=0,detailOK=0,terms=0;
  bank.forEach(function(x){if(Array.isArray(x.o))total+=x.o.length;if(Array.isArray(x.e)&&x.e.length===5&&x.e.every(function(e){return /^【(正しい|誤り)】/.test(String(e||''));}))detailOK+=5;if(Array.isArray(x.terms)&&x.terms.length)terms++;});
  ok('955肢',total===955,'choices='+total);
  ok('全5肢詳細解説',detailOK===955,'detail='+detailOK+'/955');
  ok('用語ミニ解説',terms>=155,'termsQuestions='+terms);
  var rxIds=['T03','T04','H04','H07','T08','T11','H09','T14','H26','T31','H29','H30','H31','H32','H33','H34','H35','H36','H37','H38','L36'];
  var rxOK=rxIds.filter(function(id){var x=get(id);return x&&Array.isArray(x.rxn)&&x.rxn.length;}).length;
  ok('反応式21件',rxOK===21,'rxn='+rxOK+'/21');
  ok('W34=144 kg/日',!!get('W34')&&get('W34').a===1&&String(get('W34').p||'').indexOf('144 kg/日')>=0,'answerIndex='+(get('W34')&&get('W34').a));
  ok('L35=160 kg/日',!!get('L35')&&get('L35').a===3&&String(get('L35').p||'').indexOf('160 kg/日')>=0,'answerIndex='+(get('L35')&&get('L35').a));
  ok('L36=8.0 mgO2/L',!!get('L36')&&get('L36').a===2&&String(get('L36').p||'').indexOf('8.0 mgO2/L')>=0,'answerIndex='+(get('L36')&&get('L36').a));
  ok('G35=2024年9.94億t',!!get('G35')&&get('G35').a===1&&String(get('G35').p||'').indexOf('9.94億')>=0,'answerIndex='+(get('G35')&&get('G35').a));
  ok('G36=2026年新Ox基準',!!get('G36')&&get('G36').a===1&&String(get('G36').p||'').indexOf('0.07 ppm')>=0&&String(get('G36').p||'').indexOf('0.04 ppm')>=0,'answerIndex='+(get('G36')&&get('G36').a));
  ok('W35=大腸菌数現行制度',!!get('W35')&&get('W35').a===1&&String(get('W35').p||'').indexOf('2022年4月')>=0,'answerIndex='+(get('W35')&&get('W35').a));
  ok('T32=100 mg/L',!!get('T32')&&get('T32').a===3&&String(get('T32').p||'').indexOf('100 mg/L')>=0,'answerIndex='+(get('T32')&&get('T32').a));
  ok('T33=24 mg/L',!!get('T33')&&get('T33').a===2&&String(get('T33').p||'').indexOf('24 mg/L')>=0,'answerIndex='+(get('T33')&&get('T33').a));
  ok('T35=100 kg',!!get('T35')&&get('T35').a===2&&String(get('T35').p||'').indexOf('100 kg')>=0,'answerIndex='+(get('T35')&&get('T35').a));
  ok('T39=100 mol',!!get('T39')&&get('T39').a===2&&String(get('T39').p||'').indexOf('100 mol')>=0,'answerIndex='+(get('T39')&&get('T39').a));
  ok('T40=95%',!!get('T40')&&get('T40').a===3&&String(get('T40').p||'').indexOf('95%')>=0,'answerIndex='+(get('T40')&&get('T40').a));
  ok('頻度×弱点スケジューラ',!!(window.WATER1_FREQUENCY_SCHEDULER&&/frequency x personal weakness/.test(window.WATER1_FREQUENCY_SCHEDULER.method||'')),window.WATER1_FREQUENCY_SCHEDULER&&window.WATER1_FREQUENCY_SCHEDULER.version);
  var chem=window.water1ChemHTML;if(typeof chem==='function'){var c1=chem('Hg^2+ + 2 e^- → Hg^0');ok('化学式上付き・下付き',/<sup>2\+<\/sup>/.test(c1)&&/<sup>0<\/sup>/.test(c1),'formatter');}else ok('化学式上付き・下付き',false,'water1ChemHTML未定義');
  try{var k='water1_regression_probe',v='ok-'+Date.now();localStorage.setItem(k,v);var same=localStorage.getItem(k)===v;localStorage.removeItem(k);ok('localStorage読み書き',same,'probe');}catch(e){ok('localStorage読み書き',false,String(e));}
  var visualPre=['G06','W06','T06','H06','L06','T08','T36','G34','W33','L35','G35','G37','W35','W36','H38','L36','L37'],visualPost=['G04','W05'];
  var vpre=visualPre.filter(function(id){var x=get(id);return x&&x.v;}).length,vpost=visualPost.filter(function(id){var x=get(id);return x&&x.av;}).length;
  ok('問題用図表17件',vpre===visualPre.length,'pre='+vpre+'/'+visualPre.length);
  ok('解説補助グラフ2件',vpost===visualPost.length,'post='+vpost+'/'+visualPost.length);
  ok('第10弾10問',['G32','G33','G34','W32','W33','W34','H37','L33','L34','L35'].every(function(id){return !!get(id)}),'batch10 ids');
  ok('第11弾10問',['G35','G36','G37','W35','W36','W37','T42','H38','L36','L37'].every(function(id){return !!get(id)}),'batch11 ids');
  var subj={};bank.forEach(function(x){subj[x.s]=(subj[x.s]||0)+1;});ok('科目配分G37/W37/T42/H38/L37',subj['公害総論']===37&&subj['水質概論']===37&&subj['汚水処理特論']===42&&subj['水質有害物質特論']===38&&subj['大規模水質特論']===37,JSON.stringify(subj));
  ok('回答色CSS',!!document.querySelector('style')&&/\.ch\.good\{[^}]*#16a34a/.test(document.documentElement.innerHTML)&&/\.ch\.bad\{[^}]*#dc2626/.test(document.documentElement.innerHTML),'green/red');
  ok('次の問題UI',document.documentElement.innerHTML.indexOf('次の問題へ')>=0,'button');
  ok('全5肢展開UI',document.documentElement.innerHTML.indexOf('全5肢の解説を開く')>=0,'button');
  var qidx=(document.documentElement.innerHTML.match(/qbank_patch_v5\.js\?v=(\d+)/)||[])[1];ok('indexローダー参照',Number(qidx)>=72,'index query v='+(qidx||'none')+'（旧query値は技術的負債として別管理）');
  var result={timestamp:new Date().toISOString(),questions:bank.length,activeQuestions:active.length,totalChoices:total,detailOK:detailOK,reactionOK:rxOK,termQuestions:terms,errors:errors,checks:checks};window.WATER1_REGRESSION_AUDIT=result;
  var el=document.getElementById('audit');if(el){var good=errors.length===0;el.textContent=(el.textContent||'').split(' ｜ 回帰監査：')[0]+' ｜ 回帰監査：'+checks.filter(function(c){return c.pass}).length+'/'+checks.length+(good?' 合格':' 要確認');}
  if(errors.length){var w=document.getElementById('warn');if(w&&!document.getElementById('regressionWarn')){var d=document.createElement('div');d.id='regressionWarn';d.className='warn';d.innerHTML='<b>v16回帰監査：</b><br>'+errors.join('<br>');w.appendChild(d);}}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(run,80)});else setTimeout(run,80);
})();