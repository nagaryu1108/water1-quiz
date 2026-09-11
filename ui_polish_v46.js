(function(){
'use strict';
var RELEASE='v51';
var RELEASE_DATE='2026-09-11';
var BUILD_ID='v51-20260911-ui46d';

function ensureStyle(){
  if(document.getElementById('water1-ui-v46-style'))return;
  var s=document.createElement('style');
  s.id='water1-ui-v46-style';
  s.textContent=[
    '.tools button{min-height:44px;touch-action:manipulation}',
    '.ch,.next,.openall{min-height:44px;touch-action:manipulation}',
    '.audit,#regressionWarn{display:none!important}',
    '.poolStatus{margin-top:4px;font-size:11px;line-height:1.55;color:#bfdbfe}',
    '@media(max-width:600px){',
    '  .visual,.afterVisual{-webkit-overflow-scrolling:touch}',
    '  .visual svg,.afterVisual svg{width:560px;min-width:560px;max-width:none}',
    '  .visual table,.afterVisual table{width:560px;min-width:560px}',
    '  .tools button{font-size:13px;padding:10px 6px}',
    '  .dash,.poolStatus{font-size:12px}',
    '}'
  ].join('\n');
  document.head.appendChild(s);
}

function refreshReleaseUI(){
  document.title='水質第1種 本試験型演習｜問題バンク '+RELEASE;
  var ver=document.querySelector('.ver');
  if(ver)ver.textContent='問題バンク '+RELEASE+' / '+RELEASE_DATE;

  var audit=document.getElementById('audit');
  if(audit){
    audit.hidden=true;
    audit.setAttribute('aria-hidden','true');
    var p=document.getElementById('poolStatus');
    if(!p){
      p=document.createElement('div');
      p.id='poolStatus';
      p.className='poolStatus';
      audit.insertAdjacentElement('afterend',p);
    }
    var active=(window.QBANK||[]).length;
    var archived=(window.WATER1_ARCHIVED_QUESTIONS||[]).length;
    var stable=active+archived;
    p.textContent='通常出題 '+active+'問 ｜ 安定ID '+stable+'件 ｜ アーカイブ '+archived+'問';
  }

  var regressionWarn=document.getElementById('regressionWarn');
  if(regressionWarn){
    regressionWarn.hidden=true;
    regressionWarn.setAttribute('aria-hidden','true');
  }

  if(Object.prototype.hasOwnProperty.call(window,'BUILD'))window.BUILD=BUILD_ID;
}

ensureStyle();
refreshReleaseUI();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refreshReleaseUI,{once:true});

window.WATER1_UI_RELEASE={
  release:RELEASE,
  date:RELEASE_DATE,
  build:BUILD_ID,
  mobileVisualMinWidth:560,
  minimumTapHeight:44,
  learnerAuditVisible:false
};
})();
