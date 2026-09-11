const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js','qbank_distractor_plausibility_v40.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const bank=ctx.window.QBANK||[],arc=ctx.window.WATER1_ARCHIVED_QUESTIONS||[];
const review=JSON.parse(fs.readFileSync(path.join(__dirname,'full_bank_semantic_review_v41.json'),'utf8'));
function fail(s){throw new Error(s)}function ok(c,s){if(!c)fail(s)}
ok(review.version==='v41','semantic review version mismatch');
ok(Array.isArray(review.questions)&&review.questions.length===200,'review must cover exactly 200 stable IDs');
const rid=review.questions.map(x=>x.id);ok(new Set(rid).size===200,'duplicate IDs in semantic review');
const current=[...bank,...arc];const cid=current.map(x=>x.id);ok(current.length===200&&new Set(cid).size===200,'active+archive must preserve 200 stable IDs');
for(const id of cid)ok(rid.includes(id),'current question missing semantic review: '+id);
for(const id of rid)ok(cid.includes(id),'review contains unknown question ID: '+id);
const allowed=new Set(['KEEP','STRENGTHEN','REWRITE','EXCLUDE']);
for(const r of review.questions){ok(allowed.has(r.status),'invalid review status '+r.id);ok(Array.isArray(r.tags)&&r.tags.length>0,'missing tags '+r.id);ok(typeof r.reason==='string'&&r.reason.length>=12,'missing review reason '+r.id);}
const counts={};for(const r of review.questions)counts[r.status]=(counts[r.status]||0)+1;
ok(counts.KEEP===33&&counts.STRENGTHEN===117&&counts.REWRITE===49&&counts.EXCLUDE===1,'review counts changed unexpectedly '+JSON.stringify(counts));
const bySubject={};for(const r of review.questions){bySubject[r.subject]=bySubject[r.subject]||{};bySubject[r.subject][r.status]=(bySubject[r.subject][r.status]||0)+1;}
const q=id=>current.find(x=>x.id===id);
ok(q('L30')&&arc.some(x=>x.id==='L30'),'L30 must remain archived');
ok(review.questions.find(x=>x.id==='L30').status==='EXCLUDE','L30 review status must remain EXCLUDE');
const h04=q('H04');ok(h04&&/還元後のpH最適化/.test(h04.t),'H04 v40 redesign not active');
ok(!h04.o.some(s=>/硝化菌.*Cr\(VI\).*硝酸|クロム酸.*エアストリッピング/.test(s)),'H04 implausible distractor regressed');
ok(review.questions.find(x=>x.id==='H04').status==='STRENGTHEN','H04 must remain tracked for post-v40 style tightening');
const rewrite=review.questions.filter(x=>x.status==='REWRITE');
/* MAGIC_DISTRACTOR is a legacy v41 tag whose historical scope was broader than nuclear transmutation. Keep the stored tag for compatibility, but report it accurately as implausible/irrelevant distractor debt. */
const legacyImplausible=rewrite.filter(x=>x.tags.includes('MAGIC_DISTRACTOR'));
const pseudo=rewrite.filter(x=>x.tags.includes('PSEUDO_TWO_CHOICE')||x.tags.includes('MIRRORED_PAIR'));
const absolute=review.questions.filter(x=>x.tags.includes('ABSOLUTE_WORD_GIVEAWAY'));
const style=review.questions.filter(x=>x.tags.includes('ANSWER_STYLE_CUE')||x.tags.includes('CHOICE_LENGTH_IMBALANCE'));
const patch=fs.readFileSync(path.join(root,'qbank_patch_v5.js'),'utf8');ok(patch.includes('qbank_distractor_plausibility_v40.js'),'stable loader does not load v40');
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');ok(sw.includes('qbank_distractor_plausibility_v40.js'),'service worker does not cache v40');
console.log('PASS full-bank semantic review coverage v41');
console.log('REVIEWED',review.questions.length,'ACTIVE',bank.length,'ARCHIVED',arc.map(x=>x.id).join(','),'KEEP',counts.KEEP,'STRENGTHEN',counts.STRENGTHEN,'REWRITE',counts.REWRITE,'EXCLUDE',counts.EXCLUDE,'LEGACY_IMPLAUSIBLE_REWRITE',legacyImplausible.length,'PSEUDO_OR_MIRROR_REWRITE',pseudo.length,'ABSOLUTE_CUE',absolute.length,'STYLE_OR_LENGTH_CUE',style.length);
console.log('BY_SUBJECT',JSON.stringify(bySubject));
console.log('NOTE: REWRITE/STRENGTHEN are explicit quality debt, not a quality-pass claim. Legacy MAGIC_DISTRACTOR tags mean implausible/irrelevant distractors, not necessarily element transmutation.');
