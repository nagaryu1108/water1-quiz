const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const scripts=['qbank_v3.js','qbank_extra_v4.js','qbank_core_patch_v7.js','qbank_detail_patch_v6.js','qbank_enrichment_v7.js','qbank_detail_round1_v7.js','qbank_detail_complete_v7.js','qbank_gap_batch1_v7.js','qbank_gap_batch2_v7.js','qbank_gap_batch3_v7.js','qbank_gap_batch4_v7.js','qbank_gap_batch4_fix_v7.js','qbank_gap_batch5_v7.js','qbank_gap_batch6_v7.js','qbank_gap_batch6_fix_v7.js','qbank_gap_batch7_v7.js','qbank_gap_batch8_v7.js','qbank_gap_batch9_v7.js','qbank_gap_batch10_v7.js','qbank_gap_batch11_v7.js','qbank_gap_batch12_v7.js','qbank_detail_quality_fix_v23.js','qbank_undefined_fix_v7.js','qbank_exam_quality_patch_v34.js','qbank_visual_fix_v35.js','qbank_unit_typography_v1.js','qbank_content_restructure_v39.js'];
const noop=()=>{};const document={readyState:'complete',addEventListener:noop,getElementById:()=>null,querySelectorAll:()=>[],body:{},createElement:()=>({})};
const ctx={window:{QBANK:[]},document,console,setTimeout:(f)=>{try{f()}catch(e){}},clearTimeout:noop,MutationObserver:function(){this.observe=noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},Set,Map,Math,JSON,Number,String,Array,Object,RegExp,Date};ctx.window.window=ctx.window;ctx.window.document=document;ctx.window.localStorage=ctx.localStorage;vm.createContext(ctx);
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const bank=ctx.window.QBANK||[],arc=ctx.window.WATER1_ARCHIVED_QUESTIONS||[],meta=ctx.window.WATER1_RESTRUCTURE_V39;
function fail(s){throw new Error(s)}function ok(c,s){if(!c)fail(s)}function q(id){return bank.find(x=>x.id===id)}
ok(bank.length===199,'active bank must be 199 after retiring only L30, got '+bank.length);
ok(arc.length===1&&arc[0].id==='L30','archive must contain only L30');
ok(meta&&meta.version==='v39','v39 metadata missing');
ok(meta.modifiedIds.length===34,'modified question count must be 34');
ok(meta.groups.length===21,'duplicate/redundancy groups must be 21');
const ids=[...bank,...arc].map(x=>x.id);ok(ids.length===200&&new Set(ids).size===200,'200 stable IDs must be preserved across active+archive');
for(const x of [...bank,...arc]){ok(Array.isArray(x.o)&&x.o.length===5,x.id+' choices !=5');ok(Array.isArray(x.e)&&x.e.length===5,x.id+' explanations !=5');ok(Number.isInteger(x.a)&&x.a>=0&&x.a<5,x.id+' answer invalid');ok(new Set(x.o).size===5,x.id+' duplicate choice');ok(new Set(x.e).size===5,x.id+' duplicate explanation');ok(!JSON.stringify(x).includes('undefined'),x.id+' contains undefined');}
const classified=[...bank,...arc].filter(x=>x.restructure&&x.restructure.version==='v39');ok(classified.length===54,'expected 54 classified questions, got '+classified.length);
const reps=classified.filter(x=>x.restructure.class==='representative').length,repurposed=classified.filter(x=>x.restructure.class==='repurposed').length,excluded=classified.filter(x=>x.restructure.class==='excluded-normal-pool').length,choice=classified.filter(x=>x.restructure.class==='choice-redesign').length;
ok(reps===22,'representative count mismatch '+reps);ok(repurposed===27,'repurposed count mismatch '+repurposed);ok(excluded===1,'excluded count mismatch '+excluded);ok(choice===4,'choice-redesign count mismatch '+choice);
// Criterion 1: known two-choice target collisions must no longer exist.
ok(q('W19').o.filter(s=>/ジェオスミン|2-MIB/.test(s)).length===1,'W19 still duplicates the same odor target in two choices');
ok(q('W23').o.filter(s=>/メタロチオネイン/.test(s)).length===1,'W23 still duplicates metallothionein target');
ok(q('G28').o.filter(s=>/硝酸性窒素/.test(s)).length===1,'G28 still duplicates nitrate target');
// Criterion 2: known direct-opposite pairs must be gone.
ok(!q('L17').o.some(s=>/成層.*上下混合.*活発/.test(s)),'L17 old direct opposite remains');
ok(!q('T36').o.some(s=>/嫌気.*取り込み.*好気.*放出/.test(s)),'T36 inverse PAO distractor remains');
ok(!q('H04').o.some(s=>/三価クロム.*六価クロムへ酸化/.test(s)),'H04 reverse Cr pair remains');
ok(!q('T10').o.some(s=>/均等係数.*大きいほど.*粒径.*そろ/.test(s)),'T10 inverse uniformity pair remains');
ok(!q('G35').o.some(s=>/2013年度より増加/.test(s)),'G35 direct graph inverse remains');
// Criterion 3: representative and repurposed questions now test materially different skills.
const topicChecks={G08:/見直し/,G29:/実務適用/,G30:/負荷量/,W20:/横出し/,W30:/流向/,W31:/硝化/,W32:/合成試料/,L01:/内部負荷/,L17:/酸素収支/,W29:/データ/,W25:/青潮/,H29:/錯体シアン/,H20:/処理法選定/,H25:/気液分離器/,H28:/方法選択/,H33:/共存りん酸/,H31:/両性/,H32:/形態別/,H37:/分析法/,H38:/QA\/QC/,H19:/パージ・トラップ/,L24:/導電率/,L27:/スケール/,L28:/ストリッピング/,L22:/エネルギー回収/,L38:/高濃度廃液/};
for(const [id,re] of Object.entries(topicChecks)){ok(q(id)&&re.test(q(id).t),id+' was not repurposed as intended: '+(q(id)&&q(id).t));}
const subj={};for(const x of bank)subj[x.s]=(subj[x.s]||0)+1;
ok(subj['公害総論']===39&&subj['水質概論']===39&&subj['汚水処理特論']===44&&subj['水質有害物質特論']===40&&subj['大規模水質特論']===37,'active subject counts unexpected '+JSON.stringify(subj));
const w29=q('W29');ok(w29.v&&w29.v.kind==='table'&&w29.v.headers.join('|').includes('深度（m）')&&w29.v.headers.join('|').includes('DO（mg/L）'),'W29 data-reading table missing axis/unit semantics');
const patch=fs.readFileSync(path.join(root,'qbank_patch_v5.js'),'utf8');ok(patch.includes('qbank_content_restructure_v39.js'),'stable loader does not load v39');
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');ok(sw.includes('qbank_content_restructure_v39.js')&&sw.includes('content-restructure-v39'),'service worker not bumped for v39');
console.log('PASS content restructure v39');
console.log('ACTIVE',bank.length,'ARCHIVED',arc.map(x=>x.id).join(','),'MODIFIED',meta.modifiedIds.length,'GROUPS',meta.groups.length,'REPRESENTATIVE',reps,'REPURPOSED',repurposed,'EXCLUDED',excluded,'CHOICE_REDESIGN',choice,'SUBJECTS',JSON.stringify(subj));
