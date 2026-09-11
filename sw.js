const CACHE='water1-quiz-v30-final200-ui-chem-audit-v25-exam-quality-content-restructure-v39-plausibility-v40-semantic-v45-ui-v46b-difficulty-v48-stage2-20260911';
const ASSETS=['./index.html','./manifest.webmanifest','./qbank_v3.js','./qbank_extra_v4.js','./qbank_patch_v5.js','./qbank_core_patch_v7.js','./qbank_detail_patch_v6.js','./qbank_enrichment_v7.js','./qbank_detail_round1_v7.js','./qbank_detail_complete_v7.js','./qbank_gap_batch1_v7.js','./qbank_gap_batch2_v7.js','./qbank_gap_batch3_v7.js','./qbank_gap_batch4_v7.js','./qbank_gap_batch4_fix_v7.js','./qbank_gap_batch5_v7.js','./qbank_gap_batch6_v7.js','./qbank_gap_batch6_fix_v7.js','./qbank_gap_batch7_v7.js','./qbank_gap_batch8_v7.js','./qbank_gap_batch9_v7.js','./qbank_gap_batch10_v7.js','./qbank_gap_batch11_v7.js','./qbank_gap_batch12_v7.js','./qbank_detail_quality_fix_v23.js','./qbank_undefined_fix_v7.js','./qbank_exam_quality_patch_v34.js','./qbank_visual_fix_v35.js','./qbank_unit_typography_v1.js','./qbank_frequency_scheduler_v7.js','./qbank_chem_v7.js','./qbank_quality_audit_v7.js','./qbank_regression_audit_v14.js','./qbank_canonical_gap_audit_v21.js','./qbank_content_restructure_v39.js','./qbank_distractor_plausibility_v40.js','./qbank_semantic_rewrite_gw_v42.js','./qbank_semantic_rewrite_th_v42.js','./qbank_semantic_rewrite_l_v42.js','./qbank_semantic_strengthen_g_v42.js','./qbank_semantic_strengthen_w_v42.js','./qbank_semantic_strengthen_t_v42.js','./qbank_semantic_strengthen_h_v42.js','./qbank_semantic_strengthen_l_v42.js','./qbank_semantic_polish_v43.js','./qbank_semantic_polish_v44.js','./qbank_semantic_polish_v45.js','./qbank_exam_difficulty_stage1_v47.js','./qbank_recent_exam_upgrade_v47.js','./qbank_recent_exam_audit_finalize_v47.js','./qbank_exam_difficulty_stage2_v48.js','./ui_polish_v46.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const isNav=e.request.mode==='navigate'||e.request.destination==='document';
  if(isNav){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(resp=>{
      const copy=resp.clone();
      caches.open(CACHE).then(c=>c.put('./index.html',copy));
      return resp;
    }).catch(()=>caches.match('./index.html',{ignoreSearch:true})));
    return;
  }
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(resp=>{
    const copy=resp.clone();
    caches.open(CACHE).then(c=>c.put(e.request,copy));
    return resp;
  }).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});