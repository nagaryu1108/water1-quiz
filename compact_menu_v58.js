(function(){
'use strict';

var VERSION='v58';

function ensureStyle(){
  if(document.getElementById('water1-compact-menu-v58-style'))return;
  var s=document.createElement('style');
  s.id='water1-compact-menu-v58-style';
  s.textContent=[
    '.studyMenuToggle{width:100%;min-height:48px;margin:0 0 10px;border:1px solid #cbd5e1;border-radius:13px;background:#fff;color:#172033;font-size:14px;font-weight:800;padding:11px 14px;display:flex;align-items:center;justify-content:space-between;gap:12px;touch-action:manipulation}',
    '.studyMenuToggle .studyMenuChevron{font-size:13px;color:#64748b;transition:transform .16s ease}',
    '.studyMenuToggle[aria-expanded="true"]{border-color:#2563eb;background:#eff6ff;color:#1e3a8a}',
    '.studyMenuToggle[aria-expanded="true"] .studyMenuChevron{transform:rotate(180deg)}',
    '#studyMenuPanel[hidden]{display:none!important}',
    '#studyMenuPanel{margin:0 0 10px}',
    '#studyMenuPanel .h{margin-bottom:10px}',
    '#studyMenuPanel #workspaceTabs{margin-top:0}',
    '#studyMenuPanel #reviewSummary{margin-bottom:0}',
    '@media(max-width:600px){.studyMenuToggle{min-height:46px;font-size:14px;margin-bottom:9px}.w{padding-top:10px}}'
  ].join('\n');
  document.head.appendChild(s);
}

function setOpen(open){
  var panel=document.getElementById('studyMenuPanel');
  var btn=document.getElementById('studyMenuToggle');
  if(!panel||!btn)return;
  panel.hidden=!open;
  btn.setAttribute('aria-expanded',open?'true':'false');
  var label=btn.querySelector('.studyMenuLabel');
  if(label)label.textContent=open?'学習メニュー・進捗を閉じる':'学習メニュー・進捗';
}

function build(){
  if(document.getElementById('studyMenuToggle'))return true;
  var main=document.querySelector('main.w');
  var header=document.querySelector('header.h');
  var tabs=document.getElementById('workspaceTabs');
  var tools=document.querySelector('.tools');
  var summary=document.getElementById('reviewSummary');
  var card=document.querySelector('.card');
  if(!main||!header||!tabs||!tools||!summary||!card)return false;

  ensureStyle();

  var btn=document.createElement('button');
  btn.type='button';
  btn.id='studyMenuToggle';
  btn.className='studyMenuToggle';
  btn.setAttribute('aria-expanded','false');
  btn.setAttribute('aria-controls','studyMenuPanel');
  btn.innerHTML='<span class="studyMenuLabel">学習メニュー・進捗</span><span class="studyMenuChevron" aria-hidden="true">▼</span>';

  var panel=document.createElement('div');
  panel.id='studyMenuPanel';
  panel.hidden=true;

  main.insertBefore(btn,header);
  main.insertBefore(panel,header);
  [header,tabs,tools,summary].forEach(function(node){panel.appendChild(node);});

  btn.addEventListener('click',function(){setOpen(panel.hidden);});

  panel.addEventListener('click',function(e){
    var target=e.target.closest('button');
    if(!target)return;
    var closes=target.hasAttribute('data-study-view')||
      target.id==='coverage'||target.id==='weak'||target.id==='latest'||target.id==='review';
    if(closes)setTimeout(function(){setOpen(false);},0);
  });

  window.WATER1_COMPACT_MENU={
    version:VERSION,
    installed:true,
    defaultOpen:false,
    toggleId:'studyMenuToggle',
    panelId:'studyMenuPanel',
    setOpen:setOpen
  };
  return true;
}

function install(){
  if(!window.WATER1_STUDY_WORKFLOW||!window.WATER1_STUDY_WORKFLOW.installed){setTimeout(install,40);return;}
  if(!build()){setTimeout(install,40);return;}
  setOpen(false);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(install,0);},{once:true});
else setTimeout(install,0);
})();