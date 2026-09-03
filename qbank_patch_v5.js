(function(){
  /* Stable entry point: preserve IDs/history while layering quality patches. */
  if(document.readyState==='loading'){
    document.write('<script src="./qbank_core_patch_v7.js?v=74"><\/script>');
    document.write('<script src="./qbank_detail_patch_v6.js?v=74"><\/script>');
    document.write('<script src="./qbank_enrichment_v7.js?v=74"><\/script>');
    document.write('<script src="./qbank_detail_round1_v7.js?v=74"><\/script>');
    document.write('<script src="./qbank_chem_v7.js?v=74"><\/script>');
  }
})();
