(function(){
'use strict';

var B=window.QBANK||[];
var VERSION='v59';

/* Final display typography only. Keep reaction-source arrays untouched:
   qbank_chem_v7.js owns reaction HTML rendering. Explicit replacements avoid
   accidentally interpreting acronyms such as BOD/COD/GC/HPLC as formulas. */
var reps=[
  ['MgNH4PO4','MgNH₄PO₄'],
  ['Fe(CN)6','Fe(CN)₆'],
  ['Ca(OH)2','Ca(OH)₂'],
  ['Al(OH)3','Al(OH)₃'],
  ['Cr(OH)3','Cr(OH)₃'],
  ['Fe(OH)3','Fe(OH)₃'],
  ['Mg(OH)2','Mg(OH)₂'],
  ['B(OH)4','B(OH)₄'],
  ['B(OH)3','B(OH)₃'],
  ['Cr2O7','Cr₂O₇'],
  ['CrO4','CrO₄'],
  ['CH3COO','CH₃COO'],
  ['H2PO4','H₂PO₄'],
  ['H3PO4','H₃PO₄'],
  ['HPO4','HPO₄'],
  ['PO4','PO₄'],
  ['SO4','SO₄'],
  ['CO3','CO₃'],
  ['CH2O','CH₂O'],
  ['NH4-N','NH₄-N'],['NO2-N','NO₂-N'],['NO3-N','NO₃-N'],
  ['NH4+','NH₄⁺'],['NH3','NH₃'],['H2S','H₂S'],['H2O','H₂O'],
  ['NO2−','NO₂⁻'],['NO2-','NO₂⁻'],['NO3−','NO₃⁻'],['NO3-','NO₃⁻'],
  ['CO2','CO₂'],['CH4','CH₄'],['O2','O₂'],['N2','N₂'],
  ['CaCO3','CaCO₃'],['CaF2','CaF₂'],['AsH3','AsH₃'],['H2Se','H₂Se'],
  ['Ca2+','Ca²⁺'],['Mg2+','Mg²⁺'],['Hg2+','Hg²⁺'],['Al3+','Al³⁺'],
  ['Cr3+','Cr³⁺'],['Fe3+','Fe³⁺']
];

function fmt(s){
  if(typeof s!=='string')return s;
  for(var i=0;i<reps.length;i++)s=s.split(reps[i][0]).join(reps[i][1]);
  /* Read quantities as “F⁻ 2 mol”, not “F⁻2 mol”. This only fires when an
     ionic superscript is immediately followed by a numeric mol quantity. */
  s=s.replace(/([⁺⁻])(\d+(?:\.\d+)?)(\s*mol\b)/g,'$1 $2$3');
  return s;
}

function fmtQuestion(q){
  ['t','q','p','src'].forEach(function(k){if(q[k])q[k]=fmt(q[k]);});
  ['o','e'].forEach(function(k){if(Array.isArray(q[k]))q[k]=q[k].map(fmt);});
  if(Array.isArray(q.terms))q.terms=q.terms.map(function(t){
    return t?{name:fmt(t.name),desc:fmt(t.desc)}:t;
  });
}

B.forEach(fmtQuestion);

/* H09 is a calculation question, so make the reaction line and mol ratios
   especially legible without changing its meaning, keyed answer or ID. */
var h09=B.find(function(x){return x.id==='H09';});
if(h09){
  h09.q=h09.q.replace(
    '反応をCa²⁺+2F⁻→CaF₂とし',
    '反応を Ca²⁺ + 2 F⁻ → CaF₂ とし'
  );
  h09.chemTypographyVersion=VERSION;
}

window.QBANK=B;
window.WATER1_CHEM_TYPOGRAPHY={
  version:VERSION,
  displayFields:['t','q','p','src','o','e','terms'],
  reactionSourceUntouched:true,
  molSpacing:true
};
})();