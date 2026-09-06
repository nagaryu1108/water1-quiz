(function(){
'use strict';
const rows=window.GLOSSARY_ROWS||[];
const T=rows.map(r=>({term:r[0],cat:r[1],desc:r[2],kana:r[3],edition:r[4]||0,html:''}));
const names=new Set(T.map(x=>x.term));
const eligible=T.map(x=>x.term).filter(t=>t.length>=2).sort((a,b)=>b.length-a.length||a.localeCompare(b,'ja'));
const re=eligible.length?new RegExp('('+eligible.map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','g'):null;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function linkify(desc,self){
  if(!re)return esc(desc);
  return String(desc||'').split(re).map(p=>names.has(p)&&p!==self?'<button type="button" class="term-ref" data-term="'+esc(p)+'">'+esc(p)+'</button>':esc(p)).join('');
}
for(const x of T)x.html=linkify(x.desc,x.term);
window.GLOSSARY_TERMS=T;
})();
