(function(){
'use strict';
if(window.WATER1_SOURCE_AUDIT_V90||!window.WATER1_SOURCE_AUDIT_V89)return;
var bank=window.QBANK||[],ids=[];
function review(id,src){var q=bank.find(function(x){return x.id===id;});if(!q)throw Error('Missing '+id);q.src=src;q.contentReviewVersion='v90';ids.push(id);}
review('L20','一次資料：US EPA「Water Efficiency Management Guide: Mechanical Systems」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100TFYV.txt 。蒸発水に塩類がほぼなく、飛散とブローには循環水濃度の塩類が含まれる前提で、M=E+D+BかつN=M/(D+B)=1+E/(D+B)。演習値よりB=0.3%、M=1.5%。漏洩等は設問条件に含まない。');
review('L21','一次資料：US EPA「Two-stage Biological Treatment of Coke Plant Wastewater」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000TB7K.TXT 、US EPA「Survey of biological treatment in the iron and steel industry」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=91017SGN.TXT 。安水のアンモニア・フェノール・シアン・チオシアン酸の性状を分け、アンモニア前処理と生物処理、必要な仕上げを検討する。');
review('L22','一次資料：US EPA「Instructional Resources Monograph Series: Anaerobic Digestion」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=60001DTM.TXT 。VFA/アルカリ度上昇、pH低下、ガス減少は酸生成とメタン生成の不均衡を示す。負荷抑制・緩衝能回復と追跡を行う。pH等の数値は演習条件。');
review('G24','一次資料：経済産業省「PRTR制度の概要」https://www.meti.go.jp/policy/chemical_management/law/prtr/r6kohyo/04gaiyou/01_summary1.pdf 、経済産業省「排出量等算出マニュアル」https://www.meti.go.jp/policy/chemical_management/law/prtr/pdf/r8_haishutsu_sanshutsu_manual/1.pdf 。環境への排出と事業所外への移動を区別し、届出外推計値の条件、有害性・曝露を併用する。PRTR集計だけで排水基準や健康リスクを判定しない。');
review('G25','一次資料：USGS「Carson Valley nitrate and arsenic」https://pubs.usgs.gov/publication/ofr20241045/full 、USGS「Status of water quality in groundwater resources, San Joaquin Valley」https://pubs.usgs.gov/publication/sir20245009/full 。自然地質・還元条件によるひ素、農地負荷と脱窒による硝酸変化、井戸深度・スクリーン・涵養時期を分けて解釈する。');
review('W23','一次資料：ATSDR「Toxicological Profile for Cyanide」https://www.atsdr.cdc.gov/toxprofiles/tp8-c3.pdf 、US EPA「Insecticides」https://www.epa.gov/caddis/insecticides 、ATSDR「Cadmium ToxGuide」https://www.atsdr.cdc.gov/toxguides/toxguide-5.pdf 、US EPA「Health Effects of Exposures to Mercury」https://www.epa.gov/mercury/health-effects-exposures-mercury 、CDC「Nitrate/Nitrite Toxicity」https://archive.cdc.gov/www_atsdr_cdc_gov/csem/nitrate-nitrite/health_effects.html 。シアンの細胞呼吸、農薬のAChE、Cdの腎・骨、メチル水銀の神経系、硝酸のメトヘモグロビンを照合。');
review('H23','一次資料：US EPA「Workshop on Monitoring Oxidation-Reduction Processes for Ground-Water Restoration」https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=10003Z26.TXT 、USGS「Geochemistry of Water」https://pubs.usgs.gov/wsp/1535c/report.pdf 。標準電位は示量量でないため半反応式の整数倍で倍にしない。実電位はNernst式で反応商、pH、温度等に依存し、混合系ORPだけで濃度は確定しない。');
review('H25','一次資料：US EPA Method 7062「Antimony and Arsenic (Atomic Absorption, Borohydride Reduction)」https://www.epa.gov/hw-sw846/sw-846-test-method-7062-antimony-and-arsenic-atomic-absorption-borohydride-reduction 。ガス・液分離器は生成水素化物を原子化部へ導く。泡・液滴同伴時は送液・排液・ガス条件を規定に戻し、ブランクと標準液を再確認する。');
var prior=window.WATER1_EXAM_PRACTICE_V61.migrate;
function migrate(input){var s=JSON.parse(JSON.stringify(input||{}));if(s.bankContentVersion==='v90')return s;s=prior(s);s.bankContentVersion='v90';return s;}
window.WATER1_EXAM_PRACTICE_V61.migrate=migrate;
window.WATER1_SOURCE_AUDIT_V90={version:'v90',changed:ids,stale:[],migrate:migrate};
})();
