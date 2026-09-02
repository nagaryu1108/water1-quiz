(function(){
  /* This file is already loaded by index.html. Keep it as the stable entry point so learning-history and page wiring do not regress. */
  if(document.readyState==='loading'){
    document.write('<script src="./qbank_core_patch_v7.js?v=72"><\/script>');
    document.write('<script src="./qbank_detail_patch_v6.js?v=72"><\/script>');
    document.write('<script src="./qbank_enrichment_v7.js?v=72"><\/script>');
  }
})();
