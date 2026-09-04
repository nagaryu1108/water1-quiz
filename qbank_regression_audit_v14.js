(function(){
function get(id){return (window.QBANK||[]).find(function(x){return x.id===id});}
function run(){
  var bank=window.QBANK||[], active=window.Q||bank, checks=[], errors=[];
  function ok(name,pass,detail){checks.push({name:name,pass:!!pass,detail:detail||''});if(!pass)errors.push(name+(detail?'：'+detail:''));}
  ok('問題数200',bank.length===200,'QBANK='+bank.length);
  ok('出題対象200',active.length===200,'Q='+active.length+' / QBANK='+bank.length);
  var total=0,detailOK=0,terms=0;
  bank.forEach(function(x){if(Array.isArray(x.o))total+=x.o.length;if(Array.isArray(x.e)&&x.e.length===5&&x.e.every(function(e){return /^【(正しい|誤り)】/.test(String(e||''));}))detailOK+=5;if(Array.isArray(x.terms)&&x.terms.length)terms++;});
  ok('1000肢',total===1000,'choices='+total);
  ok('全5肢詳細解説',detailOK===1000,'detail='+detailOK+'/1000');
  ok('用語ミニ解説',terms>=174,'termsQuestions='+terms);
  var rxIds=['T03','T04','H04','H07','T08','T11','H09','T14','H26','T31','H29','H30','H31','H32','H33','H34','H35','H36','H37','H38','L36','H40','L38'];
  var rxOK=rxIds.filter(function(id){var x=get(id);return x&&Array.isArray(x.rxn)&&x.rxn.length;}).length;
  ok('反応式23件',rxOK===23,'rxn='+rxOK+'/23');
  ok('G38=産廃最新統計',!!get('G38')&&get('G38').a===1&&/42\.1%/.test(String(get('G38').p||''))&&/54\.7%/.test(String(get('G38').p||'')),'answerIndex='+(get('G38')&&get('G38').a));
  ok('G39=ダイオキシンTEQ',!!get('G39')&&get('G39').a===3&&/PCDD/.test(String(get('G39').p||''))&&/TEQ/.test(String(get('G39').p||'')),'answerIndex='+(get('G39')&&get('G39').a));
  ok('W38=PFOS/PFOA法令区分',!!get('W38')&&get('W38').a===2&&/第一種特定化学物質/.test(String(get('W38').p||''))&&/指定物質/.test(String(get('W38').p||'')),'answerIndex='+(get('W38')&&get('W38').a));
  ok('W39=底層DO 4/3/2',!!get('W39')&&get('W39').a===1&&/4\.0/.test(String(get('W39').p||''))&&/3\.0/.test(String(get('W39').p||''))&&/2\.0/.test(String(get('W39').p||'')),'answerIndex='+(get('W39')&&get('W39').a));
  ok('T43=全窒素全量',!!get('T43')&&get('T43').a===4&&/溶存無機態窒素だけではなく/.test(String(get('T43').p||'')),'answerIndex='+(get('T43')&&get('T43').a));
  ok('T44=脱水と焼却熱収支',!!get('T44')&&get('T44').a===2&&/水分/.test(String(get('T44').p||''))&&/熱収支/.test(String(get('T44').p||'')),'answerIndex='+(get('T44')&&get('T44').a));
  ok('H39=添加回収70%',!!get('H39')&&get('H39').a===1&&/70%/.test(String(get('H39').p||'')),'answerIndex='+(get('H39')&&get('H39').a));
  ok('H40=AsH3水素化物',!!get('H40')&&get('H40').a===3&&/AsH3/.test(String(get('H40').p||'')),'answerIndex='+(get('H40')&&get('H40').a));
  ok('L38=系統分離',!!get('L38')&&get('L38').a===2&&/系統分離/.test(String(get('L38').p||''))&&/Cr\(III\)/.test(String(get('L38').p||'')),'answerIndex='+(get('L38')&&get('L38').a));
  ok('L36=8.0 mgO2/L',!!get('L36')&&get('L36').a===2&&String(get('L36').p||'').indexOf('8.0 mgO2/L')>=0,'answerIndex='+(get('L36')&&get('L36').a));
  ok('G36=2026年新Ox基準',!!get('G36')&&get('G36').a===1&&String(get('G36').p||'').indexOf('0.07 ppm')>=0&&String(get('G36').p||'').indexOf('0.04 ppm')>=0,'answerIndex='+(get('G36')&&get('G36').a));
  ok('W35=大腸菌数現行制度',!!get('W35')&&get('W35').a===1&&String(get('W35').p||'').indexOf('2022年4月')>=0,'answerIndex='+(get('W35')&&get('W35').a));
  ok('頻度×弱点スケジューラ',!!(window.WATER1_FREQUENCY_SCHEDULER&&/frequency x personal weakness/.test(window.WATER1_FREQUENCY_SCHEDULER.method||'')),window.WATER1_FREQUENCY_SCHEDULER&&window.WATER1_FREQUENCY_SCHEDULER.version);
  var chem=window.water1ChemHTML;if(typeof chem==='function'){var c1=chem('Hg^2+ + 2 e^- → Hg^0');ok('化学式上付き・下付き',/<sup>2\+<\/sup>/.test(c1)&&/<sup>0<\/sup>/.test(c1),'formatter');}else ok('化学式上付き・下付き',false,'water1ChemHTML未定義');
  try{var k='water1_regression_probe',v='ok-'+Date.now();localStorage.setItem(k,v);var same=localStorage.getItem(k)===v;localStorage.removeItem(k);ok('localStorage読み書き',same,'probe');}catch(e){ok('localStorage読み書き',false,String(e));}
  var visualPre=['G06','W06','T06','H06','L06','T08','T36','G34','W33','L35','G35','G37','W35','W36','H38','L36','L37','G38','W39','H39','L38'],visualPost=['G04','W05'];
  var vpre=visualPre.filter(function(id){var x=get(id);return x&&x.v;}).length,vpost=visualPost.filter(function(id){var x=get(id);return x&&x.av;}).length;
  ok('問題用図表21件',vpre===visualPre.length,'pre='+vpre+'/'+visualPre.length);
  ok('解説補助グラフ2件',vpost===visualPost.length,'post='+vpost+'/'+visualPost.length);
  ok('第10弾10問',['G32','G33','G34','W32','W33','W34','H37','L33','L34','L35'].every(function(id){return !!get(id)}),'batch10 ids');
  ok('第11弾10問',['G35','G36','G37','W35','W36','W37','T42','H38','L36','L37'].every(function(id){return !!get(id)}),'batch11 ids');
  ok('第12弾9問',['G38','G39','W38','W39','T43','T44','H39','H40','L38'].every(function(id){return !!get(id)}),'batch12 ids');
  var subj={};bank.forEach(function(x){subj[x.s]=(subj[x.s]||0)+1;});ok('科目配分G39/W39/T44/H40/L38',subj['公害総論']===39&&subj['水質概論']===39&&subj['汚水処理特論']===44&&subj['水質有害物質特論']===40&&subj['大規模水質特論']===38,JSON.stringify(subj));
  ok('回答色CSS',!!document.querySelector('style')&&/\.ch\.good\{[^}]*#16a34a/.test(document.documentElement.innerHTML)&&/\.ch\.bad\{[^}]*#dc2626/.test(document.documentElement.innerHTML),'green/red');
  ok('次の問題UI',document.documentElement.innerHTML.indexOf('次の問題へ')>=0,'button');
  ok('全5肢展開UI',document.documentElement.innerHTML.indexOf('全5肢の解説を開く')>=0,'button');
  var qidx=(document.documentElement.innerHTML.match(/qbank_patch_v5\.js\?v=(\d+)/)||[])[1];ok('indexローダー参照',Number(qidx)>=72,'index query v='+(qidx||'none')+'（旧query値は技術的負債として別管理）');
  var result={timestamp:new Date().toISOString(),questions:bank.length,activeQuestions:active.length,totalChoices:total,detailOK:detailOK,reactionOK:rxOK,termQuestions:terms,errors:errors,checks:checks};window.WATER1_REGRESSION_AUDIT=result;
  var el=document.getElementById('audit');if(el){var good=errors.length===0;el.textContent=(el.textContent||'').split(' ｜ 回帰監査：')[0]+' ｜ 回帰監査：'+checks.filter(function(c){return c.pass}).length+'/'+checks.length+(good?' 合格':' 要確認');}
  if(errors.length){var w=document.getElementById('warn');if(w&&!document.getElementById('regressionWarn')){var d=document.createElement('div');d.id='regressionWarn';d.className='warn';d.innerHTML='<b>v17回帰監査：</b><br>'+errors.join('<br>');w.appendChild(d);}}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(run,80)});else setTimeout(run,80);
})();