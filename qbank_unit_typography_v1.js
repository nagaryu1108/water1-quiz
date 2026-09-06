(function(){
'use strict';
var bank=window.QBANK||[];
function fixUnitText(s){
  return String(s)
    .replace(/\bNm3\b/g,'Nm³')
    .replace(/\bNm2\b/g,'Nm²')
    .replace(/\bcm3\b/g,'cm³')
    .replace(/\bcm2\b/g,'cm²')
    .replace(/\bmm3\b/g,'mm³')
    .replace(/\bmm2\b/g,'mm²')
    .replace(/\bm3\b/g,'m³')
    .replace(/\bm2\b/g,'m²');
}
function walk(v,key){
  if(typeof v==='string') return fixUnitText(v);
  if(Array.isArray(v)) return v.map(function(x){return walk(x,key)});
  if(v&&typeof v==='object'){
    Object.keys(v).forEach(function(k){
      if(k==='id') return;
      v[k]=walk(v[k],k);
    });
  }
  return v;
}
bank.forEach(function(q){walk(q)});
window.water1FixUnitTypography=fixUnitText;
})();
