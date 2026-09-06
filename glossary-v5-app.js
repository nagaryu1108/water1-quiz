(function(){
'use strict';
const T=window.GLOSSARY_TERMS||[], D=window.GLOSSARY_V5||{};
const byTerm=new Map(T.map((x,i)=>[x.term,{...x,index:i,id:'term-'+(i+1)}]));
const reEsc=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const linkNames=[...byTerm.keys()].filter(n=>n.length>=3).sort((a,b)=>b.length-a.length);
const linkRe=linkNames.length?new RegExp(linkNames.map(reEsc).join('|'),'g'):null;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const norm=s=>String(s||'').normalize('NFKC').toLowerCase().replace(/\s+/g,'');
const tabs=[...document.querySelectorAll('.tab')], panels=[...document.querySelectorAll('.panel')];
const input=document.getElementById('search'), suggest=document.getElementById('suggest'), kanaBox=document.getElementById('kana');
let mode='glossary', currentKana='all';
const placeholder={glossary:'用語・説明・分野を検索',sampling:'採取対象・容器・保存・JISを検索',analysis:'分析対象・方法・原理・装置・JISを検索',reverse:'逆引き対象を検索',refs:'JIS番号・名称・対象を検索'};
function setMode(m,{keepSearch=false,scrollTop=true}={}){mode=m;tabs.forEach(t=>t.classList.toggle('active',t.dataset.mode===m));panels.forEach(p=>p.classList.toggle('active',p.id==='panel-'+m));kanaBox.style.display=m==='glossary'?'flex':'none';if(!keepSearch)input.value='';input.placeholder=placeholder[m];filterCurrent(input.value);renderSuggestions(input.value);try{history.replaceState(null,'','#panel-'+m)}catch(_){}if(scrollTop)window.scrollTo(0,0);}
tabs.forEach(t=>t.addEventListener('click',()=>setMode(t.dataset.mode)));
const hm=(location.hash||'').replace('#panel-','');if(['glossary','sampling','analysis','reverse','refs'].includes(hm))setMode(hm);

function flash(el){if(!el)return;el.classList.remove('flash');requestAnimationFrame(()=>el.classList.add('flash'));}
function scrollToId(id){const el=document.getElementById(id);if(el){el.scrollIntoView({block:'start'});flash(el)}}

// glossary

function linkDesc(text,self){
  const raw=String(text||''); if(!linkRe)return esc(raw);
  let out='',last=0; raw.replace(linkRe,(m,off)=>{out+=esc(raw.slice(last,off));out+=m===self?esc(m):`<button type="button" class="term-ref" data-term="${esc(m)}">${esc(m)}</button>`;last=off+m.length;return m});out+=esc(raw.slice(last));return out;
}
const termCards=document.getElementById('term-cards');
let lastKana='';
termCards.innerHTML=T.map((x,i)=>{const h=x.kana!==lastKana?(lastKana=x.kana,`<h2 class="kana-head" data-kana="${esc(x.kana)}">${esc(x.kana)}</h2>`):'';const ed=x.edition===5?' ed5':x.edition===4?' ed4':'';return `${h}<article class="term-card${ed}" id="term-${i+1}" data-term="${esc(x.term)}" data-cat="${esc(x.cat)}" data-kana="${esc(x.kana)}"><div class="term-head"><h3>${esc(x.term)}</h3><span class="cat">${esc(x.cat)}</span></div><p class="definition">${linkDesc(x.desc,x.term)}</p></article>`}).join('');
const kanas=[...new Set(T.map(x=>x.kana))];kanaBox.innerHTML='<button class="active" data-k="all">全</button>'+kanas.map(k=>`<button data-k="${esc(k)}">${esc(k)}</button>`).join('');
kanaBox.addEventListener('click',e=>{const b=e.target.closest('button[data-k]');if(!b)return;currentKana=b.dataset.k;kanaBox.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));filterGlossary(input.value);if(currentKana!=='all')document.querySelector(`.kana-head[data-kana="${CSS.escape(currentKana)}"]`)?.scrollIntoView({behavior:'smooth',block:'start'});});

function jisBadges(refs){return (refs||[]).map(r=>`<span class="badge jis">${esc((D.jis||{})[r]||r)}</span>`).join('')}
function diagramHTML(key, source){const x=(source||D.diagrams||{})[key];if(!x)return'';return `<div class="diagram" data-diagram="${esc(key)}"><div class="diagram-title">${esc(x.title)}</div><div class="flow">${x.flow.map((n,i)=>`${i?'<span>→</span>':''}<button type="button" class="node" data-part="${esc(n)}">${esc(n)}</button>`).join('')}</div>${Object.entries(x.parts||{}).map(([n,t])=>`<div class="part" data-note="${esc(n)}"><b>${esc(n)}</b>：${esc(t)}</div>`).join('')}</div>`}
function samplingCard(x,compact=false){return `<article class="card search-item" id="sample-${esc(x.id)}" data-search="${esc([x.target,...(x.tags||[]),...(x.methods||[]),x.container,x.field,x.preserve,x.avoid,...(x.refs||[])].join(' '))}"><h3>${esc(x.target)}</h3><div class="meta">${(x.tags||[]).map(t=>`<span class="badge">${esc(t)}</span>`).join('')}${jisBadges(x.refs)}</div><dl class="kv"><dt>採取方式</dt><dd>${(x.methods||[]).map(m=>'・'+esc(m)).join('<br>')}</dd><dt>容器・器具</dt><dd>${esc(x.container)}</dd><dt>現場操作</dt><dd>${esc(x.field)}</dd><dt>保存・運搬</dt><dd>${esc(x.preserve)}</dd></dl><div class="danger"><b>避ける：</b>${esc(x.avoid)}</div></article>`}
function analysisCard(x){return `<article class="card search-item" id="analysis-${esc(x.id)}" data-search="${esc([x.target,...(x.tags||[]),...(x.refs||[]),...(x.methods||[]).flatMap(m=>Object.values(m))].join(' '))}"><h3>${esc(x.target)}</h3><div class="meta">${(x.tags||[]).map(t=>`<span class="badge">${esc(t)}</span>`).join('')}${jisBadges(x.refs)}</div>${diagramHTML(x.diagram)}${(x.methods||[]).map((m,i)=>`<section class="method"><h4>${i+1}. ${esc(m.name)}</h4><div class="method-grid"><b>原理</b><span>${esc(m.principle)}</span><b>前処理</b><span>${esc(m.pretreat)}</span><b>装置</b><span>${esc(m.instrument)}</span><b>主な干渉</b><span>${esc(m.interference)}</span><b>試験ポイント</b><span>${esc(m.exam)}</span></div></section>`).join('')}</article>`}

// sampling
const sb=document.getElementById('sampling-body');
sb.innerHTML=`<div class="card"><h3>採水方式の図解</h3>${Object.keys(D.samplingDiagrams||{}).map(k=>diagramHTML(k,D.samplingDiagrams)).join('')}</div><div class="toolbar"><button class="filter active" data-g="all">すべて</button><button class="filter" data-g="water">水域・排水</button><button class="filter" data-g="haz">有害物質</button><button class="filter" data-g="org">有機物・VOC</button><button class="filter" data-g="qa">QA/QC</button></div><div id="sampling-cards">${(D.sampling||[]).map(samplingCard).join('')}</div>`;
const sg={water:['S01','S02','S03','S04','S05','S06','S07','S08','S09','S10','S11','S12','S13','S31','S32','S33','S34','S35'],haz:['S14','S15','S16','S17','S18','S19','S20','S21','S27'],org:['S22','S23','S24','S25','S26','S28','S29','S30'],qa:['S36']};
sb.addEventListener('click',e=>{const b=e.target.closest('.filter[data-g]');if(!b)return;sb.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));const g=b.dataset.g;sb.querySelectorAll('#sampling-cards .card').forEach(c=>{const hidden=g!=='all'&&!sg[g].includes(c.id.replace('sample-',''));c.dataset.groupHidden=hidden?'1':'0';});filterCurrent(input.value)});

// analysis
const ab=document.getElementById('analysis-body');
ab.innerHTML=`<div class="toolbar"><button class="filter active" data-g="all">すべて</button><button class="filter" data-g="general">一般水質</button><button class="filter" data-g="inorg">無機・金属</button><button class="filter" data-g="organic">有機・微量</button><button class="filter" data-g="instrument">機器原理</button></div><div id="analysis-cards">${(D.analysis||[]).map(analysisCard).join('')}</div>`;
const ag={general:['A01','A02','A03','A04','A05','A06','A07','A08','A09','A13','A14','A15','A16','A32'],inorg:['A10','A11','A12','A17','A21','A22','A23','A24','A25','A26'],organic:['A18','A19','A20','A27','A28','A29','A30','A31'],instrument:['A33','A34','A35','A36','A37','A38','A39','A40']};
ab.addEventListener('click',e=>{const b=e.target.closest('.filter[data-g]');if(!b)return;ab.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));const g=b.dataset.g;ab.querySelectorAll('#analysis-cards .card').forEach(c=>{const hidden=g!=='all'&&!ag[g].includes(c.id.replace('analysis-',''));c.dataset.groupHidden=hidden?'1':'0';});filterCurrent(input.value)});

document.addEventListener('click',e=>{const n=e.target.closest('.node');if(!n)return;const d=n.closest('.diagram');d.querySelectorAll('.node').forEach(x=>x.classList.toggle('active',x===n));d.querySelectorAll('.part').forEach(x=>x.classList.toggle('show',x.dataset.note===n.dataset.part));});

// reverse
const reverseList=document.getElementById('reverse-list'), reverseResult=document.getElementById('reverse-result');
const revTargets=[...new Set([...(D.sampling||[]).flatMap(x=>x.tags||[]),...(D.analysis||[]).flatMap(x=>x.tags||[])])].filter(x=>x&&x.length>1).sort((a,b)=>a.localeCompare(b,'ja'));
reverseList.innerHTML=revTargets.map(t=>`<button class="chip" type="button" data-target="${esc(t)}">${esc(t)}</button>`).join('');
function showReverse(t){reverseList.querySelectorAll('.chip').forEach(c=>c.classList.toggle('active',c.dataset.target===t));const ss=(D.sampling||[]).filter(x=>(x.tags||[]).includes(t)||x.target.includes(t));const aa=(D.analysis||[]).filter(x=>(x.tags||[]).includes(t)||x.target.includes(t));const g=byTerm.get(t);reverseResult.innerHTML=`${g?`<button type="button" class="jump-btn" data-termjump="${esc(t)}">用語大辞典の「${esc(t)}」へ</button>`:''}<h3>${esc(t)}：採取・採水</h3>${ss.length?ss.map(samplingCard).join(''):'<p>専用カードなし。上の検索欄で関連語を検索してください。</p>'}<h3>${esc(t)}：分析方法</h3>${aa.length?aa.map(analysisCard).join(''):'<p>専用カードなし。上の検索欄で関連語を検索してください。</p>'}`;reverseResult.scrollIntoView({behavior:'smooth',block:'start'});flash(reverseResult)}
reverseList.addEventListener('click',e=>{const c=e.target.closest('.chip');if(c)showReverse(c.dataset.target)});
reverseResult.addEventListener('click',e=>{const b=e.target.closest('[data-termjump]');if(!b)return;gotoTerm(b.dataset.termjump)});

// refs
const rb=document.getElementById('refs-body');
rb.innerHTML=(D.refs||[]).map((r,i)=>`<article class="ref-card search-item" id="ref-${i}" data-search="${esc(r.code+' '+r.title+' '+r.use)}"><h3>${esc(r.code)}｜${esc(r.title)}</h3><p>${esc(r.use)}</p><a href="${esc(r.url)}" target="_blank" rel="noopener">JIS参照ページを開く</a></article>`).join('');

// glossary popover
const pop=document.getElementById('popover'), pt=document.getElementById('ptitle'), pc=document.getElementById('pcat'), px=document.getElementById('ptext'), pj=document.getElementById('pjump');let popTerm='';
function closePop(){pop.classList.remove('show');pop.setAttribute('aria-hidden','true')}
document.getElementById('pclose').addEventListener('click',closePop);
document.addEventListener('click',e=>{const b=e.target.closest('.term-ref');if(b){e.preventDefault();const x=byTerm.get(b.dataset.term);if(!x)return;popTerm=x.term;pt.textContent=x.term;pc.textContent=x.cat;px.textContent=x.desc;pop.classList.add('show');pop.setAttribute('aria-hidden','false');const r=b.getBoundingClientRect();if(!matchMedia('(max-width:640px)').matches){pop.style.left=Math.max(12,Math.min(innerWidth-402,r.left))+'px';pop.style.top=Math.min(innerHeight-230,r.bottom+8)+'px';pop.style.bottom='auto'}return}if(!e.target.closest('#popover'))closePop()});
pj.addEventListener('click',()=>{closePop();gotoTerm(popTerm)});
function gotoTerm(t){const x=byTerm.get(t);if(!x)return;setMode('glossary',{keepSearch:true,scrollTop:false});input.value='';filterGlossary('');requestAnimationFrame(()=>scrollToId(x.id))}

// Search/filter/suggestions
function filterGlossary(q){const n=norm(q);document.querySelectorAll('.term-card').forEach(c=>{const k=c.dataset.kana, hitKana=currentKana==='all'||k===currentKana, hitText=!n||norm((c.dataset.term||'')+' '+(c.dataset.cat||'')+' '+c.innerText).includes(n);c.style.display=hitKana&&hitText?'block':'none'});document.querySelectorAll('.kana-head').forEach(h=>{const k=h.dataset.kana;let any=false;let e=h.nextElementSibling;while(e&&e.tagName!=='H2'){if(e.classList?.contains('term-card')&&e.style.display!=='none'){any=true;break}e=e.nextElementSibling}h.style.display=any?'block':'none'});}
function filterCurrent(q){const n=norm(q);if(mode==='glossary')return filterGlossary(q);if(mode==='reverse'){reverseList.querySelectorAll('.chip').forEach(c=>c.style.display=!n||norm(c.dataset.target).includes(n)?'':'none');return}document.querySelectorAll('#panel-'+mode+' .search-item').forEach(c=>{const gh=c.dataset.groupHidden==='1';const hit=!n||norm((c.dataset.search||'')+' '+c.innerText).includes(n);c.style.display=!gh&&hit?'':'none'});}
const pool={
 glossary:T.map((x,i)=>({mode:'glossary',label:x.term,sub:x.cat,text:x.term+' '+x.cat+' '+x.desc,id:'term-'+(i+1)})),
 sampling:(D.sampling||[]).map(x=>({mode:'sampling',label:x.target,sub:(x.tags||[]).join('・'),text:[x.target,...(x.tags||[]),...(x.methods||[]),x.container,x.field,x.preserve,x.avoid,...(x.refs||[])].join(' '),id:'sample-'+x.id})),
 analysis:(D.analysis||[]).map(x=>({mode:'analysis',label:x.target,sub:(x.tags||[]).join('・'),text:[x.target,...(x.tags||[]),...(x.refs||[]),...(x.methods||[]).flatMap(m=>Object.values(m))].join(' '),id:'analysis-'+x.id})),
 reverse:revTargets.map(t=>({mode:'reverse',label:t,sub:'対象物質逆引き',text:t,id:'reverse-result'})),
 refs:(D.refs||[]).map((r,i)=>({mode:'refs',label:r.code,sub:r.title,text:r.code+' '+r.title+' '+r.use,id:'ref-'+i}))
};
function candidates(q){const n=norm(q);if(!n)return[];return (pool[mode]||[]).map(x=>{const l=norm(x.label),t=norm(x.text);let score=99;if(l===n)score=0;else if(l.startsWith(n))score=1;else if(l.includes(n))score=2;else if(t.includes(n))score=3;return {...x,score}}).filter(x=>x.score<99).sort((a,b)=>a.score-b.score||a.label.localeCompare(b.label,'ja')).slice(0,12)}
function renderSuggestions(q){const cs=candidates(q);if(!norm(q)){suggest.classList.remove('show');suggest.innerHTML='';return}suggest._items=cs;suggest.innerHTML=cs.length?cs.map((x,i)=>`<button class="sug" type="button" data-i="${i}"><b>${esc(x.label)}</b><small>${esc(x.sub||'')}</small></button>`).join(''):'<div class="sug"><small>このタブに一致する候補はありません。</small></div>';suggest.classList.add('show')}
function goResult(x){suggest.classList.remove('show');if(x.mode==='reverse'){setMode('reverse');setTimeout(()=>showReverse(x.label),20);return}setMode(x.mode,{keepSearch:true,scrollTop:false});input.value=x.label;filterCurrent(input.value);requestAnimationFrame(()=>{const el=document.getElementById(x.id);if(el){el.style.display='';el.scrollIntoView({block:'start'});flash(el)}})}
input.addEventListener('input',()=>{filterCurrent(input.value);renderSuggestions(input.value)});input.addEventListener('focus',()=>{if(input.value)renderSuggestions(input.value)});input.addEventListener('keydown',e=>{if(e.key==='Enter'){const x=candidates(input.value)[0];if(x){e.preventDefault();goResult(x)}}});suggest.addEventListener('click',e=>{const b=e.target.closest('.sug[data-i]');if(b){const x=suggest._items?.[+b.dataset.i];if(x)goResult(x)}});document.addEventListener('click',e=>{if(e.target!==input&&!suggest.contains(e.target))suggest.classList.remove('show')});

// expose compact audit info
window.GLOSSARY_V5_READY={terms:T.length,sampling:(D.sampling||[]).length,analysis:(D.analysis||[]).length,refs:(D.refs||[]).length,reverse:revTargets.length};
})();
