(function(){
'use strict';

var VERSION='v57';
var DAY=24*60*60*1000;
var INTERVALS=[1,3,7,14,30,60];
var OFFICIAL_INDEX='https://www.jemai.or.jp/polconman/examination/past.html';
var SUBJECT_LINKS=[
  {key:'G',label:'公害総論',suffix:'01'},
  {key:'W',label:'水質概論',suffix:'07'},
  {key:'T',label:'汚水処理特論',suffix:'08'},
  {key:'H',label:'水質有害物質特論',suffix:'09'},
  {key:'L',label:'大規模水質特論',suffix:'10'}
];
var VERIFIED_DIRECT={
  2025:{era:'令和7年度',prefix:'R07_',answer:'answerR07.pdf'},
  2024:{era:'令和6年度',prefix:'R06_',answer:'answerR06.pdf'}
};
var PDF_BASE='https://www.jemai.or.jp/polconman/examination/dd4ht300000005fn-att/';

var TOPIC_RULES=[
  {s:'公害総論',name:'環境基本法',re:/環境基本法|環境基準/},
  {s:'公害総論',name:'公害防止組織法',re:/公害防止組織|公害防止管理者|公害防止主任管理者|公害防止統括者|特定工場/},
  {s:'公害総論',name:'水質汚濁防止法・排水規制',re:/水質汚濁防止法|水濁法|排水基準|上乗せ|地下水|総量規制/},
  {s:'公害総論',name:'環境統計・白書',re:/統計|白書|達成率|産業廃棄物|温室効果|苦情|大気測定局/},
  {s:'公害総論',name:'環境管理・リスク',re:/PDCA|環境マネジメント|リスク|ライフサイクル|PRTR|環境影響評価/},
  {s:'水質概論',name:'富栄養化・DO・成層',re:/富栄養|DO|溶存酸素|成層|赤潮|青潮|内部負荷|貧酸素/},
  {s:'水質概論',name:'水質法令・環境基準',re:/環境基準|水質汚濁防止法|上乗せ|指定物質|有害物質貯蔵|特定地下浸透/},
  {s:'水質概論',name:'毒性・生体影響',re:/毒性|生体影響|生物濃縮|メタロチオネイン|LD50/},
  {s:'水質概論',name:'地下水・発生源管理',re:/地下水|発生源|汚水等排出施設/},
  {s:'水質概論',name:'水質指標・微生物',re:/BOD|COD|TOC|大腸菌|指標生物|臭気物質/},
  {s:'汚水処理特論',name:'活性汚泥',re:/活性汚泥|SRT|HRT|SVI|返送汚泥|曝気槽|バルキング|BOD:N:P/},
  {s:'汚水処理特論',name:'生物学的窒素・りん除去',re:/硝化|脱窒|アナモックス|生物脱りん|PAO|MAP|HAP|メタン発酵|UASB/},
  {s:'汚水処理特論',name:'凝集・沈殿・ろ過',re:/凝集|沈殿|浮上|ろ過|ろ材|表面負荷|API/},
  {s:'汚水処理特論',name:'高度処理・膜・吸着',re:/活性炭|吸着|イオン交換|膜|RO|電気透析|フロイントリッヒ/},
  {s:'汚水処理特論',name:'汚泥処理',re:/汚泥|脱水|焼却|ケーキ/},
  {s:'汚水処理特論',name:'水質分析',re:/分析|BOD|CODMn|全窒素|全りん|DOセンサ|CFA|流れ分析|ノルマルヘキサン/},
  {s:'水質有害物質特論',name:'有害物質分析',re:/分析|ICP|原子吸光|GC|HPLC|クロマト|ヘッドスペース|パージ・トラップ|標準添加|試料保存|水素化物/},
  {s:'水質有害物質特論',name:'重金属処理',re:/クロム|Cr\(|水銀|カドミウム|鉛|重金属|キレート|水酸化物|共沈/},
  {s:'水質有害物質特論',name:'シアン処理・分析',re:/シアン|CN|アルカリ塩素|鉄シアノ/},
  {s:'水質有害物質特論',name:'ふっ素・ほう素・ひ素・セレン',re:/ふっ素|ほう素|ひ素|セレン|アルシン/},
  {s:'水質有害物質特論',name:'VOC・有機化合物',re:/VOC|トリクロロ|テトラクロロ|有機りん|農薬/},
  {s:'大規模水質特論',name:'湖沼・海域・生態系',re:/湖沼|海域|成層|富栄養|植物プランクトン|生態系|クロロフィル|POC|酸素収支/},
  {s:'大規模水質特論',name:'工場排水・工程別処理',re:/製油所|製紙|紙パルプ|製鉄|めっき|食料|ビール|コークス|工場排水|工程別/},
  {s:'大規模水質特論',name:'冷却水・水再利用',re:/冷却水|濃縮倍数|ブロー|再利用|カスケード/},
  {s:'大規模水質特論',name:'水質モデル・負荷量',re:/モデル|L-Q|負荷量|物質収支|滞留時間|移流|拡散/}
];

function esc(v){
  return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]});
}
function now(){return Date.now();}
function ensureState(){
  if(!window.S)return;
  if(!window.S.hist||typeof window.S.hist!=='object')window.S.hist={};
  if(!window.S.bookmarks||typeof window.S.bookmarks!=='object')window.S.bookmarks={};
  if(!window.S.reviewFlags||typeof window.S.reviewFlags!=='object')window.S.reviewFlags={};
  if(!window.S.studyView)window.S.studyView='quiz';
}
function saveState(){ensureState();if(window.save)window.save();}
function fmt(ts){
  if(!ts)return '未設定';
  try{return new Date(ts).toLocaleString('ja-JP',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});}catch(e){return '未設定';}
}
function era(y){
  if(y>=2019)return '令和'+(y===2019?'元':(y-2018))+'年度';
  return '平成'+(y-1988)+'年度';
}
function topicOf(q){
  if(!q)return '未分類';
  var blob=[q.t,q.q,q.p].join(' ');
  for(var i=0;i<TOPIC_RULES.length;i++){
    var r=TOPIC_RULES[i];
    if(r.s===q.s&&r.re.test(blob))return r.name;
  }
  return q.t||'その他';
}
function reviewState(id){
  ensureState();
  var h=window.S.hist[id]||{};
  return {
    due:Number(h.reviewDue)||0,
    stage:Number.isInteger(h.reviewStage)?h.reviewStage:-1,
    interval:Number(h.reviewIntervalDays)||0,
    last:Number(h.lastAnsweredAt)||0,
    result:h.lastResult||'',
    flagged:!!window.S.reviewFlags[id],
    bookmarked:!!window.S.bookmarks[id]
  };
}
function reviewRows(){
  ensureState();
  var t=now(),rows=[];
  (window.Q||[]).forEach(function(q){
    var h=window.S.hist[q.id]||{},r=reviewState(q.id);
    if(!h.attempts&&!r.flagged)return;
    if(!r.due&&!r.flagged)return;
    var acc=h.attempts?((h.correct||0)/h.attempts):0;
    var dueNow=r.flagged||(r.due&&r.due<=t);
    var priority=(dueNow?100:0)+(r.flagged?30:0)+((h.wrong||0)/Math.max(1,h.attempts||0))*20+(r.bookmarked?4:0);
    rows.push({q:q,h:h,due:r.due,dueNow:dueNow,priority:priority,acc:acc,flagged:r.flagged});
  });
  rows.sort(function(a,b){
    if(a.dueNow!==b.dueNow)return a.dueNow?-1:1;
    if(a.dueNow&&a.priority!==b.priority)return b.priority-a.priority;
    return (a.due||9e15)-(b.due||9e15);
  });
  return rows;
}
function chooseReview(){
  var rows=reviewRows();
  if(!rows.length)return null;
  var due=rows.filter(function(r){return r.dueNow});
  var pool=due.length?due:rows;
  if(pool.length>1&&window.S.current){
    var alt=pool.filter(function(r){return r.q.id!==window.S.current});
    if(alt.length)pool=alt;
  }
  return pool[0].q.id;
}
function scheduleAfterAnswer(q,correct){
  ensureState();
  var h=window.S.hist[q.id]||{attempts:0,correct:0,wrong:0};
  var previous=Number.isInteger(h.reviewStage)?h.reviewStage:-1;
  var accuracy=h.attempts?((h.correct||0)/h.attempts):0;
  var stage;
  if(correct){
    stage=Math.min(previous+1,INTERVALS.length-1);
    if(accuracy<0.60)stage=Math.max(0,stage-1);
    else if(accuracy<0.80&&stage>0)stage-=1;
    h.reviewStreak=(h.reviewStreak||0)+1;
    h.lastResult='correct';
  }else{
    stage=0;
    h.reviewStreak=0;
    h.lastResult='wrong';
  }
  var days=correct?INTERVALS[stage]:1;
  h.reviewStage=stage;
  h.reviewIntervalDays=days;
  h.lastAnsweredAt=now();
  h.reviewDue=h.lastAnsweredAt+days*DAY;
  delete window.S.reviewFlags[q.id];
  window.S.hist[q.id]=h;
  saveState();
}
function markNeedsReview(id,on){
  ensureState();
  if(on){
    window.S.reviewFlags[id]=true;
    var h=window.S.hist[id];
    if(h){
      h.reviewDue=now();
      h.reviewIntervalDays=0;
      window.S.hist[id]=h;
    }
  }else{
    delete window.S.reviewFlags[id];
    var h2=window.S.hist[id];
    if(h2&&h2.lastAnsweredAt){
      var st=Number.isInteger(h2.reviewStage)?h2.reviewStage:0;
      var days=INTERVALS[Math.max(0,Math.min(st,INTERVALS.length-1))];
      h2.reviewIntervalDays=days;
      h2.reviewDue=h2.lastAnsweredAt+days*DAY;
      window.S.hist[id]=h2;
    }
  }
  saveState();
  refreshAll();
}
function toggleBookmark(id){
  ensureState();
  if(window.S.bookmarks[id])delete window.S.bookmarks[id];
  else window.S.bookmarks[id]=true;
  saveState();
  refreshAll();
}
function masteryData(){
  var by={},subjectOrder=['公害総論','水質概論','汚水処理特論','水質有害物質特論','大規模水質特論'];
  (window.Q||[]).forEach(function(q){
    var topic=topicOf(q),key=q.s+'|||'+topic,h=window.S.hist[q.id]||{};
    if(!by[key])by[key]={subject:q.s,topic:topic,totalQuestions:0,covered:0,attempts:0,correct:0,wrong:0};
    var z=by[key];z.totalQuestions++;
    if(h.attempts){z.covered++;z.attempts+=h.attempts;z.correct+=(h.correct||0);z.wrong+=(h.wrong||0);}
  });
  return Object.keys(by).map(function(k){var z=by[k];z.rate=z.attempts?Math.round(z.correct/z.attempts*100):null;return z;}).sort(function(a,b){
    var ds=subjectOrder.indexOf(a.subject)-subjectOrder.indexOf(b.subject);
    if(ds)return ds;
    if(a.rate===null&&b.rate!==null)return 1;
    if(a.rate!==null&&b.rate===null)return -1;
    if(a.rate!==b.rate)return (a.rate==null?101:a.rate)-(b.rate==null?101:b.rate);
    return a.topic.localeCompare(b.topic,'ja');
  });
}
function subjectData(){
  var order=['公害総論','水質概論','汚水処理特論','水質有害物質特論','大規模水質特論'],out=[];
  order.forEach(function(s){
    var qs=(window.Q||[]).filter(function(q){return q.s===s}),attempts=0,correct=0,covered=0;
    qs.forEach(function(q){var h=window.S.hist[q.id]||{};if(h.attempts){covered++;attempts+=h.attempts;correct+=(h.correct||0);}});
    out.push({subject:s,total:qs.length,covered:covered,attempts:attempts,correct:correct,rate:attempts?Math.round(correct/attempts*100):null});
  });
  return out;
}
function ensureStyle(){
  if(document.getElementById('water1-study-v57-style'))return;
  var s=document.createElement('style');
  s.id='water1-study-v57-style';
  s.textContent=[
    '.studyTabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin:10px 0}',
    '.studyTabs button,.studyAction,.bookmarkBtn,.confidenceBtn{min-height:44px;border:1px solid #cbd5e1;background:#fff;border-radius:10px;padding:9px 8px;color:#172033;font-weight:700}',
    '.studyTabs button.on{background:#dbeafe;border-color:#2563eb;color:#1e3a8a}',
    '.tools{grid-template-columns:repeat(4,minmax(0,1fr))}',
    '.studyPanel{background:#fff;padding:16px;border-radius:16px;box-shadow:0 2px 12px #0001;margin-top:10px}',
    '.studyPanel[hidden]{display:none!important}',
    '.studyPanel h2{font-size:18px;margin:0 0 8px}.studyPanel h3{font-size:15px;margin:16px 0 7px}',
    '.studyLead{font-size:13px;line-height:1.7;color:#475569;margin:0 0 12px}',
    '.studySummary{font-size:12px;line-height:1.65;color:#475569;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:9px 10px;margin:8px 0 10px}',
    '.questionActions{display:flex;gap:8px;flex-wrap:wrap;margin:4px 0 10px}',
    '.bookmarkBtn{font-size:13px;flex:1 1 180px}.bookmarkBtn.on{background:#fff7ed;border-color:#f59e0b;color:#9a3412}',
    '.confidenceBar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:10px 0;padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:#fff}',
    '.confidenceBar[hidden]{display:none!important}.confidenceLabel{font-size:12px;font-weight:800;color:#475569;flex:1 1 100%}',
    '.confidenceBtn{font-size:12px;flex:1 1 130px}.confidenceBtn.on{background:#fee2e2;border-color:#ef4444;color:#991b1b}.confidenceBtn.goodState{background:#ecfdf3;border-color:#22c55e;color:#166534}',
    '.scheduleNote{font-size:12px;color:#475569;flex:1 1 100%;line-height:1.6}',
    '.pastYear{border-top:1px solid #e2e8f0;padding:12px 0}.pastYear:first-of-type{border-top:0}',
    '.pastYearHead{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap;font-weight:800}',
    '.statusBadge{font-size:11px;border-radius:999px;padding:3px 7px;background:#eef2ff;color:#3730a3}',
    '.pastLinks{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.pastLinks a{display:inline-flex;align-items:center;min-height:38px;padding:7px 9px;border:1px solid #cbd5e1;border-radius:9px;text-decoration:none;color:#1d4ed8;background:#fff;font-size:12px;font-weight:700}',
    '.masterySubject{margin-top:14px}.masterySubjectHead{font-weight:800;margin-bottom:6px}',
    '.masteryRow{border-top:1px solid #e2e8f0;padding:9px 0}.masteryRow:first-child{border-top:0}',
    '.masteryTop{display:flex;justify-content:space-between;gap:8px;align-items:baseline}.masteryName{font-weight:700;font-size:13px}.masteryNums{font-size:12px;color:#475569;text-align:right}',
    '.masteryBar{height:7px;background:#e2e8f0;border-radius:999px;overflow:hidden;margin-top:5px}.masteryBar i{display:block;height:100%;background:#60a5fa}',
    '.bookmarkList{display:grid;gap:6px}.bookmarkOpen{width:100%;min-height:42px;text-align:left;border:1px solid #cbd5e1;background:#fff;border-radius:9px;padding:8px 10px;color:#172033}',
    '@media(max-width:600px){.tools{grid-template-columns:repeat(2,minmax(0,1fr))}.studyTabs{grid-template-columns:1fr}.studyPanel{padding:13px}.pastLinks a{flex:1 1 46%;justify-content:center}.masteryTop{align-items:flex-start}.masteryNums{max-width:48%}}'
  ].join('\n');
  document.head.appendChild(s);
}
function ensureUI(){
  ensureStyle();
  var main=document.querySelector('main.w'),tools=document.querySelector('.tools'),card=document.querySelector('.card');
  if(!main||!tools||!card)return false;
  if(!document.getElementById('workspaceTabs')){
    var tabs=document.createElement('div');tabs.id='workspaceTabs';tabs.className='studyTabs';
    tabs.innerHTML='<button type="button" data-study-view="quiz">オリジナル問題</button><button type="button" data-study-view="past">JEMAI実過去問</button><button type="button" data-study-view="mastery">習熟度</button>';
    tools.insertAdjacentElement('beforebegin',tabs);
    tabs.addEventListener('click',function(e){var b=e.target.closest('[data-study-view]');if(b)setView(b.getAttribute('data-study-view'));});
  }
  if(!document.getElementById('review')){
    var rb=document.createElement('button');rb.type='button';rb.id='review';rb.textContent='復習キュー';tools.appendChild(rb);
    rb.addEventListener('click',function(){
      ensureState();window.S.mode='review';window.S.studyView='quiz';
      var id=chooseReview();
      if(id){window.S.current=id;window.S.currentAnswered=false;window.S.currentSel=null;}
      saveState();if(window.render)window.render();refreshAll();
    });
  }
  if(!document.getElementById('reviewSummary')){
    var rs=document.createElement('div');rs.id='reviewSummary';rs.className='studySummary';tools.insertAdjacentElement('afterend',rs);
  }
  if(!document.getElementById('questionActions')){
    var qa=document.createElement('div');qa.id='questionActions';qa.className='questionActions';
    qa.innerHTML='<button type="button" id="bookmarkBtn" class="bookmarkBtn">☆ ブックマーク</button>';
    var q=document.getElementById('q');q.insertAdjacentElement('afterend',qa);
    document.getElementById('bookmarkBtn').addEventListener('click',function(){if(window.S&&window.S.current)toggleBookmark(window.S.current);});
  }
  if(!document.getElementById('confidenceBar')){
    var cb=document.createElement('div');cb.id='confidenceBar';cb.className='confidenceBar';cb.hidden=true;
    cb.innerHTML='<div class="confidenceLabel">この問題の手応え</div><button type="button" id="confidentBtn" class="confidenceBtn goodState">✓ 自信あり</button><button type="button" id="needsReviewBtn" class="confidenceBtn">↺ 要復習</button><div id="scheduleNote" class="scheduleNote"></div>';
    document.getElementById('res').insertAdjacentElement('afterend',cb);
    document.getElementById('confidentBtn').addEventListener('click',function(){if(window.S&&window.S.current)markNeedsReview(window.S.current,false);});
    document.getElementById('needsReviewBtn').addEventListener('click',function(){if(window.S&&window.S.current)markNeedsReview(window.S.current,true);});
  }
  if(!document.getElementById('pastExamPanel')){
    var pp=document.createElement('section');pp.id='pastExamPanel';pp.className='studyPanel';pp.hidden=true;card.insertAdjacentElement('afterend',pp);
  }
  if(!document.getElementById('masteryPanel')){
    var mp=document.createElement('section');mp.id='masteryPanel';mp.className='studyPanel';mp.hidden=true;document.getElementById('pastExamPanel').insertAdjacentElement('afterend',mp);
    mp.addEventListener('click',function(e){
      var b=e.target.closest('[data-open-question]');if(!b)return;
      openQuestion(b.getAttribute('data-open-question'));
    });
  }
  return true;
}
function renderPast(){
  var p=document.getElementById('pastExamPanel');if(!p)return;
  var h='<h2>JEMAI公式・実過去問</h2><p class="studyLead">オリジナル問題とは分離して、JEMAI公式PDFを別タブで開きます。水質第1種に必要な5科目だけを表示します。過去問本文はこのサイトへ転載しません。</p>';
  h+='<div class="studySummary"><b>直リンク方針：</b>現在のJEMAI公式サイト上で実在を確認できたPDFだけを直接リンクします。URLを推測して古い年度へ飛ばすことはしません。2025・2024年度は水1の5科目＋正解PDFを確認済みです。</div>';
  for(var y=2025;y>=2006;y--){
    var d=VERIFIED_DIRECT[y],status=d?'公式PDF直リンク確認済み':'年度索引（公式一覧へ）';
    h+='<div class="pastYear"><div class="pastYearHead"><span>'+y+'（'+era(y)+'）</span><span class="statusBadge">'+status+'</span></div><div class="pastLinks">';
    if(d){
      SUBJECT_LINKS.forEach(function(s){
        h+='<a target="_blank" rel="noopener noreferrer" href="'+PDF_BASE+d.prefix+s.suffix+'.pdf">'+esc(s.label)+'</a>';
      });
      h+='<a target="_blank" rel="noopener noreferrer" href="'+PDF_BASE+d.answer+'">正解</a>';
    }else{
      h+='<a target="_blank" rel="noopener noreferrer" href="'+OFFICIAL_INDEX+'">JEMAI公式一覧</a>';
    }
    h+='</div>';
    if(!d)h+='<div class="vnote">現行の公式一覧から当該年度の個別PDF直リンクを再確認できていないため、非検証URLは掲載していません。</div>';
    h+='</div>';
  }
  p.innerHTML=h;
}
function renderMastery(){
  ensureState();
  var p=document.getElementById('masteryPanel');if(!p)return;
  var due=reviewRows().filter(function(r){return r.dueNow}).length;
  var bookmarks=Object.keys(window.S.bookmarks).filter(function(id){return window.S.bookmarks[id]&&window.getQ&&window.getQ(id)});
  var h='<h2>習熟度</h2><p class="studyLead">科目だけでなく、論点単位で正答率・解答回数・網羅数を確認します。正解していても「要復習」にした問題は復習キューへ残せます。</p>';
  h+='<div class="studySummary">今すぐ復習 '+due+'問 ｜ ブックマーク '+bookmarks.length+'問</div>';
  h+='<h3>科目別</h3>';
  subjectData().forEach(function(z){
    var rate=z.rate==null?'未着手':z.rate+'%';
    h+='<div class="masteryRow"><div class="masteryTop"><span class="masteryName">'+esc(z.subject)+'</span><span class="masteryNums">正解 '+z.correct+'/'+z.attempts+' ｜ 網羅 '+z.covered+'/'+z.total+' ｜ '+rate+'</span></div><div class="masteryBar"><i style="width:'+(z.rate||0)+'%"></i></div></div>';
  });
  var bySubject={};
  masteryData().forEach(function(z){(bySubject[z.subject]||(bySubject[z.subject]=[])).push(z);});
  h+='<h3>論点別</h3>';
  Object.keys(bySubject).forEach(function(s){
    h+='<div class="masterySubject"><div class="masterySubjectHead">'+esc(s)+'</div>';
    bySubject[s].forEach(function(z){
      var rate=z.rate==null?'未着手':z.rate+'%';
      h+='<div class="masteryRow"><div class="masteryTop"><span class="masteryName">'+esc(z.topic)+'</span><span class="masteryNums">正解 '+z.correct+'/'+z.attempts+' ｜ 網羅 '+z.covered+'/'+z.totalQuestions+' ｜ '+rate+'</span></div><div class="masteryBar"><i style="width:'+(z.rate||0)+'%"></i></div></div>';
    });
    h+='</div>';
  });
  h+='<h3>ブックマーク</h3><div class="bookmarkList">';
  if(!bookmarks.length)h+='<div class="studyLead">まだブックマークはありません。</div>';
  bookmarks.forEach(function(id){var q=window.getQ(id);h+='<button type="button" class="bookmarkOpen" data-open-question="'+esc(id)+'">★ '+esc(id)+'｜'+esc(q.s)+'｜'+esc(q.t)+'</button>';});
  h+='</div>';
  p.innerHTML=h;
}
function openQuestion(id){
  if(!window.getQ||!window.getQ(id))return;
  ensureState();window.S.studyView='quiz';window.S.current=id;window.S.currentAnswered=false;window.S.currentSel=null;saveState();setView('quiz');if(window.render)window.render();
}
function setView(view){
  ensureState();
  if(['quiz','past','mastery'].indexOf(view)<0)view='quiz';
  window.S.studyView=view;saveState();
  var tools=document.querySelector('.tools'),card=document.querySelector('.card'),past=document.getElementById('pastExamPanel'),mastery=document.getElementById('masteryPanel'),summary=document.getElementById('reviewSummary');
  var quiz=view==='quiz';
  if(tools)tools.hidden=!quiz;if(card)card.hidden=!quiz;if(summary)summary.hidden=!quiz;
  if(past)past.hidden=view!=='past';if(mastery)mastery.hidden=view!=='mastery';
  document.querySelectorAll('#workspaceTabs [data-study-view]').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-study-view')===view);});
  if(view==='past')renderPast();
  if(view==='mastery')renderMastery();
  if(quiz&&window.render)window.render();
  refreshAll();
}
function updateReviewSummary(){
  var el=document.getElementById('reviewSummary');if(!el)return;
  var rows=reviewRows(),due=rows.filter(function(r){return r.dueNow}),next=rows.filter(function(r){return !r.dueNow})[0];
  var bm=Object.keys(window.S.bookmarks||{}).filter(function(id){return window.S.bookmarks[id]}).length;
  el.innerHTML='<b>復習キュー：</b> 今すぐ '+due.length+'問 ｜ 予定 '+rows.length+'問 ｜ ブックマーク '+bm+'問'+(next?' ｜ 次回 '+fmt(next.due):'');
}
function updateQuestionControls(){
  if(!window.S||!window.S.current)return;
  ensureState();
  var id=window.S.current,b=document.getElementById('bookmarkBtn'),bar=document.getElementById('confidenceBar'),need=document.getElementById('needsReviewBtn'),note=document.getElementById('scheduleNote');
  if(b){var on=!!window.S.bookmarks[id];b.classList.toggle('on',on);b.setAttribute('aria-pressed',on?'true':'false');b.textContent=on?'★ ブックマーク済み':'☆ ブックマーク';}
  if(bar){
    bar.hidden=!window.S.currentAnswered;
    if(window.S.currentAnswered){
      var h=window.S.hist[id]||{},flag=!!window.S.reviewFlags[id];
      if(need){need.classList.toggle('on',flag);need.setAttribute('aria-pressed',flag?'true':'false');}
      if(note){
        if(flag)note.textContent='要復習に設定済み：復習キューへ即時追加しました。';
        else if(h.reviewDue)note.textContent='次回復習：'+fmt(h.reviewDue)+(h.reviewIntervalDays?'（'+h.reviewIntervalDays+'日後）':'');
        else note.textContent='次回復習は回答後に自動設定されます。';
      }
    }
  }
}
function refreshTabsAndMode(){
  if(!window.S)return;
  var rb=document.getElementById('review');if(rb)rb.className=window.S.mode==='review'?'on':'';
  document.querySelectorAll('#workspaceTabs [data-study-view]').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-study-view')===(window.S.studyView||'quiz'));});
}
function refreshAll(){
  if(!ensureUI())return;
  ensureState();
  updateReviewSummary();updateQuestionControls();refreshTabsAndMode();
  if(window.S.studyView==='mastery')renderMastery();
}
function install(){
  if(!window.S||!window.Q||!window.render||!window.pick||!window.save||!window.nextId){setTimeout(install,40);return;}
  if(window.WATER1_STUDY_WORKFLOW&&window.WATER1_STUDY_WORKFLOW.installed)return;
  ensureState();ensureUI();

  var baseNextId=window.nextId;
  window.nextId=function(){
    if(window.S&&window.S.mode==='review')return chooseReview()||baseNextId();
    return baseNextId();
  };
  var baseShowAnswered=window.showAnswered;
  window.showAnswered=function(x,k){baseShowAnswered(x,k);updateQuestionControls();updateReviewSummary();};
  var basePick=window.pick;
  window.pick=function(x,k){
    var fresh=!window.S.currentAnswered;
    basePick(x,k);
    if(fresh){scheduleAfterAnswer(x,k===x.a);updateQuestionControls();updateReviewSummary();}
  };
  var baseUpd=window.upd;
  window.upd=function(){baseUpd();refreshTabsAndMode();updateReviewSummary();};
  var baseRender=window.render;
  window.render=function(){baseRender();updateQuestionControls();refreshTabsAndMode();updateReviewSummary();};

  var oldModeButtons=['coverage','weak','latest'];
  oldModeButtons.forEach(function(id){
    var b=document.getElementById(id);if(!b)return;
    b.addEventListener('click',function(){window.S.studyView='quiz';saveState();refreshAll();});
  });

  window.WATER1_STUDY_WORKFLOW={
    version:VERSION,
    installed:true,
    intervalsDays:INTERVALS.slice(),
    storageKey:'water1_bank_v3',
    verifiedPastYears:[2025,2024],
    officialIndex:OFFICIAL_INDEX,
    chooseReview:chooseReview,
    reviewRows:reviewRows,
    topicOf:topicOf,
    masteryData:masteryData,
    subjectData:subjectData,
    renderMastery:renderMastery,
    renderPast:renderPast,
    setView:setView,
    markNeedsReview:markNeedsReview,
    toggleBookmark:toggleBookmark
  };
  setView(window.S.studyView||'quiz');
  refreshAll();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(install,0);},{once:true});
else setTimeout(install,0);
})();