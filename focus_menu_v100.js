(function(){
'use strict';
var VERSION='v100';
var subjects=['公害総論','水質概論','汚水処理特論','水質有害物質特論','大規模水質特論'];
var calculationIds=new Set(['G06','G12','G15','G30','G35','W12','W34','T01','T02','T04','T13','T15','T22','L08','L11','L35','L36','H39']);
var filters=[
 {id:'legal',label:'法規の穴埋め',test:function(q){return !!q.legalFillinVersion||/穴埋め|語句組合せ/.test(q.t+' '+q.q);}},
 {id:'calculation',label:'計算問題',test:function(q){return calculationIds.has(q.id)||/計算|算出|質量収支|物質収支|収支計算|濃度換算|当量|倍率/.test(q.t+' '+q.q)||/\d+\s*(?:mg\/L|kg\/日|m³\/日|%|倍)/.test(q.q)&&/求め|算出|計算/.test(q.q);}},
 {id:'equipment',label:'装置の役割',test:function(q){return /装置|設備|施設|単位操作|処理系列|処理フロー|工程選定|膜|ろ過|濾過|吸着塔|ストリッピング|凝集|沈殿|活性炭|分離|脱水|反応槽|酸化池|曝気槽/.test(q.t);}}
].concat(subjects.map(function(s){return{id:'subject:'+s,label:s,test:function(q){return q.s===s;}};}));
window.WATER1_FOCUS_FILTERS_V100=filters;
function pool(){var f=filters.find(function(v){return v.id===window.S.focusCategory;});return f?(window.Q||[]).filter(f.test):[];}
function next(){var all=pool(),s=window.S||{},unseen=all.filter(function(q){return !(s.hist[q.id]&&s.hist[q.id].attempts);}),list=unseen.length?unseen:all;if(list.length>1)list=list.filter(function(q){return q.id!==s.current;});if(!list.length)return null;if(unseen.length)return list[Math.floor(Math.random()*list.length)].id;var sum=0,weights=list.map(function(q){var h=s.hist[q.id]||{},w=1+(h.wrong||0)*2+(h.wrong||0)/Math.max(1,h.attempts||1)*3;sum+=w;return w;}),r=Math.random()*sum;for(var i=0;i<list.length;i++){r-=weights[i];if(r<=0)return list[i].id;}return list[list.length-1].id;}
function refresh(){var b=document.getElementById('focusMode'),select=document.getElementById('focusCategory'),count=document.getElementById('focusCount');if(!b||!window.S)return;b.classList.toggle('on',window.S.mode==='focus');if(select)select.value=window.S.focusCategory||'legal';if(count){var p=pool(),seen=p.filter(function(q){return window.S.hist[q.id]&&window.S.hist[q.id].attempts;}).length;count.textContent=p.length?seen+'/'+p.length+'問 学習済み':'該当問題なし';}}
function install(){if(!window.WATER1_STUDY_WORKFLOW||!window.WATER1_COMPACT_MENU||!window.Q||!window.S||!window.nextId){setTimeout(install,40);return;}if(window.WATER1_FOCUS_MENU)return;
 var tools=document.querySelector('.tools');if(!tools){setTimeout(install,40);return;}
 var style=document.createElement('style');style.textContent='.focusChooser{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:0 0 10px;padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff}.focusChooser label{font-size:13px;font-weight:800}.focusChooser select{flex:1 1 185px;min-height:44px;max-width:100%;border:1px solid #94a3b8;border-radius:8px;background:white;color:#172033;font-size:14px;padding:7px}.focusChooser small{color:#475569}.focusChooser button{min-height:44px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:9px;background:#fff;color:#172033;font-weight:800}.focusChooser button.on{background:#dbeafe;border-color:#2563eb;color:#1e3a8a}';document.head.appendChild(style);
 var div=document.createElement('div');div.className='focusChooser';div.innerHTML='<label for="focusCategory">重点学習</label><select id="focusCategory" aria-label="重点学習のカテゴリ">'+filters.map(function(f){return'<option value="'+f.id+'">'+f.label+'</option>';}).join('')+'</select><button type="button" id="focusMode">この分野を学習</button><small id="focusCount" aria-live="polite"></small>';tools.insertAdjacentElement('afterend',div);
 var select=document.getElementById('focusCategory');select.value=filters.some(function(f){return f.id===window.S.focusCategory;})?window.S.focusCategory:'legal';window.S.focusCategory=select.value;
 select.addEventListener('change',function(){window.S.focusCategory=select.value;window.save();if(window.S.mode==='focus'){window.S.current=next();window.S.currentAnswered=false;window.S.currentSel=null;window.save();window.render();}refresh();});
 document.getElementById('focusMode').addEventListener('click',function(){window.S.focusCategory=select.value;if(!pool().length){refresh();return;}window.S.mode='focus';window.S.studyView='quiz';window.S.current=next();window.S.currentAnswered=false;window.S.currentSel=null;window.save();window.WATER1_STUDY_WORKFLOW.setView('quiz');window.render();refresh();window.WATER1_COMPACT_MENU.setOpen(false);});
 var baseNext=window.nextId;window.nextId=function(){if(window.S.mode==='focus')return next()||baseNext();return baseNext();};
 var baseUpd=window.upd;window.upd=function(){baseUpd();refresh();};
 window.WATER1_FOCUS_MENU={version:VERSION,filters:filters,pool:pool,next:next,refresh:refresh};refresh();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(install,0);},{once:true});else setTimeout(install,0);
})();
