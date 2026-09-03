(function(){
  /* Stable entry point: preserve IDs/history while layering quality patches. */
  if(document.readyState==='loading'){
    document.write('<script src="./qbank_core_patch_v7.js?v=77"><\/script>');
    document.write('<script src="./qbank_detail_patch_v6.js?v=77"><\/script>');
    document.write('<script src="./qbank_enrichment_v7.js?v=77"><\/script>');
    document.write('<script src="./qbank_detail_round1_v7.js?v=77"><\/script>');
    document.write('<script src="./qbank_detail_complete_v7.js?v=77"><\/script>');
    document.write('<script src="./qbank_gap_batch1_v7.js?v=77"><\/script>');
    document.write('<script src="./qbank_gap_batch2_v7.js?v=77"><\/script>');
    document.write('<script src="./qbank_chem_v7.js?v=77"><\/script>');
    document.write('<script src="./qbank_quality_audit_v7.js?v=77"><\/script>');
  }
})();
