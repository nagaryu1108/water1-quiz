(function(){
  var bank=window.QBANK||[];
  var reps=[
    ['CrO4^2−','CrO₄²⁻'],['CrO4^2-','CrO₄²⁻'],['Al(OH)3','Al(OH)₃'],
    ['NH4+','NH₄⁺'],['NH4-N','NH₄-N'],['NO2−','NO₂⁻'],['NO2-','NO₂⁻'],['NO2-N','NO₂-N'],
    ['NO3−','NO₃⁻'],['NO3-','NO₃⁻'],['NO3-N','NO₃-N'],['Al3+','Al³⁺'],['Cr3+','Cr³⁺'],
    ['H2O','H₂O'],['O2','O₂'],['H+','H⁺'],['OH−','OH⁻'],['OH-','OH⁻'],['e−','e⁻'],['e-','e⁻'],
    ['CN−','CN⁻'],['CN-','CN⁻'],['OCl−','OCl⁻'],['OCl-','OCl⁻'],['CNO−','CNO⁻'],['CNO-','CNO⁻'],['Cl−','Cl⁻'],['Cl-','Cl⁻']
  ];
  function fmt(s){if(typeof s!=='string')return s;for(var i=0;i<reps.length;i++)s=s.split(reps[i][0]).join(reps[i][1]);return s;}
  bank.forEach(function(q){
    ['q','p','src'].forEach(function(k){if(q[k])q[k]=fmt(q[k]);});
    ['o','e','rxn'].forEach(function(k){if(Array.isArray(q[k]))q[k]=q[k].map(fmt);});
    if(q.terms)q.terms=q.terms.map(function(t){return{name:fmt(t.name),desc:fmt(t.desc)};});
  });
  window.QBANK=bank;
})();