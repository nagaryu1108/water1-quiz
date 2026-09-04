(function(){
  /* Stable entry point: preserve IDs/history while layering quality patches. */
  if(document.readyState==='loading'){
    document.write('<script src="./qbank_core_patch_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_detail_patch_v6.js?v=89"><\/script>');
    document.write('<script src="./qbank_enrichment_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_detail_round1_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_detail_complete_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_gap_batch1_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_gap_batch2_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_gap_batch3_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_gap_batch4_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_gap_batch4_fix_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_gap_batch5_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_gap_batch6_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_gap_batch6_fix_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_gap_batch7_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_frequency_scheduler_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_chem_v7.js?v=89"><\/script>');
    document.write('<script src="./qbank_quality_audit_v7.js?v=89"><\/script>');
  }
})();
