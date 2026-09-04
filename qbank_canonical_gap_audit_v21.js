(function(){
var bank=window.QBANK||[];
var rules={
ACTIVATED_SLUDGE_OP:/活性汚泥|MLSS|返送汚泥|余剰汚泥|BOD.*負荷|曝気槽/,
SRT_HRT_SVI:/\bSRT\b|\bHRT\b|\bSVI\b|汚泥齢|30分沈降/,
NITRIFICATION_DENITRIFICATION:/硝化|脱窒|アナモックス|窒素除去|硝酸.*還元|アンモニア.*酸化/,
ANAEROBIC_UASB:/嫌気|メタン発酵|UASB|グラニュール/,
BIOLOGICAL_PHOSPHORUS:/脱りん|MAP|HAP|りん除去|リン除去|りん回収/,
COAGULATION_SEDIMENTATION:/凝集|沈殿|ジャーテスト|フロック|表面積負荷|浮上分離|Stokes/,
FILTRATION:/砂ろ過|多層ろ過|清澄ろ過|逆洗|ろ過速度/,
ADSORPTION_ACTIVATED_CARBON:/活性炭|フロイントリッヒ|吸着|破過/,
ION_EXCHANGE:/イオン交換樹脂|交換容量|キレート樹脂/,
MEMBRANE:/\bMF\b|\bUF\b|\bNF\b|\bRO\b|\bMBR\b|電気透析|膜分離/,
SLUDGE_DEWATERING_INCINERATION:/汚泥.*脱水|脱水機|遠心脱水|ベルトプレス|焼却|流動炉|汚泥処分/,
CHEMICAL_OXIDATION_DISINFECTION:/不連続点|塩素処理|次亜塩素酸|オゾン|ORP|酸化還元装置|促進酸化/,
SAMPLE_HANDLING:/試料採取|試料保存|前処理|蒸留|抽出|濃縮|酸添加|保存方法/,
INSTRUMENTAL_ANALYSIS:/ICP|原子吸光|GC\/MS|\bGC\b|HPLC|イオンクロマト|吸光光度|TOC|DO.*電極|DO.*センサ|流れ分析/,
BOD_COD_ANALYSIS:/BOD.*希釈|CODMn|CODCr|BOD\/COD|BOD5|DO差/,
TN_TP_ANALYSIS:/全窒素|全りん|全リン|モリブデン青|ペルオキソ二硫酸|紫外線吸光.*窒素/,
HEAVY_METAL_PRECIPITATION:/水酸化物.*沈殿|硫化物.*沈殿|共沈|フェライト|溶解度.*pH|両性.*再溶解/,
HEAVY_METAL_COMPLEX:/EDTA|キレート|錯体|錯形成|置換法/,
CYANIDE:/シアン|CN[−-]?|アルカリ塩素|紺青/,
CR6:/六価クロム|Cr\(VI\)|CrO4|クロム\(VI\)/,
MERCURY:/水銀|Hg|還元気化/,
SELENIUM:/セレン|Se\(IV\)|Se\(VI\)/,
ARSENIC:/ひ素|砒素|As\(III\)|As\(V\)/,
FLUORIDE_BORON:/ふっ素|フッ素|ほう素|ホウ素|CaF2/,
VOC_DIFFICULT_ORGANICS:/トリクロロエチレン|テトラクロロエチレン|ベンゼン|1,4-ジオキサン|塩素化有機|VOC/,
WATER_POLLUTION_LAW:/水質汚濁防止法|水濁法|特定施設|指定物質|事故時措置|地下浸透|改善命令|届出/,
ENV_EFFLUENT_STANDARD:/環境基準|排水基準|上乗せ|総量規制|水生生物保全/,
GROUNDWATER:/地下水|浄化措置|概況調査|有害物質貯蔵指定施設/,
WATER_QUALITY_STATS:/達成率|超過率|測定結果|公共用水域.*年度|環境統計/,
BOD_COD_DO_INDICATORS:/水質指標|BOD|COD|DO|SS|TOC|透視度/,
TOXICITY_HEALTH_EFFECTS:/毒性|健康影響|生体蓄積|発がん|リスク評価|NOAEL|LD50/,
EUTROPHICATION_MODEL:/富栄養|成層|貧酸素|内部負荷|赤潮|青潮|植物プランクトン|生態系モデル|L-Q|DO収支|流動モデル/,
COOLING_REUSE:/冷却水|濃縮倍数|ブロー|カスケード|再利用|向流洗浄|クローズドシステム/,
REFINERY:/製油|石油精製|API.*セパレータ|サワーウォーター/,
PULP_PAPER:/製紙|紙パルプ|黒液|白水|漂白/,
COKE_STEEL:/製鉄|コークス|圧延|安水|表面処理/,
FOOD_BEVERAGE:/食品|飲料|ビール|清涼飲料|高濃度有機排水/
};
/* v20への遡及変換後に安全側で置く確認下限。未取得問を0扱いしない。 */
var hist={
INSTRUMENTAL_ANALYSIS:{years:9,questions:42},SAMPLE_HANDLING:{years:9,questions:18},
ACTIVATED_SLUDGE_OP:{years:9,questions:27},SRT_HRT_SVI:{years:8,questions:14},
WATER_POLLUTION_LAW:{years:10,questions:18},ENV_EFFLUENT_STANDARD:{years:10,questions:17},GROUNDWATER:{years:8,questions:10},
EUTROPHICATION_MODEL:{years:11,questions:31},COOLING_REUSE:{years:10,questions:17},
HEAVY_METAL_PRECIPITATION:{years:10,questions:22},HEAVY_METAL_COMPLEX:{years:8,questions:13},
CYANIDE:{years:11,questions:16},CR6:{years:9,questions:11},MERCURY:{years:8,questions:11},SELENIUM:{years:7,questions:9},ARSENIC:{years:7,questions:9},FLUORIDE_BORON:{years:8,questions:13},VOC_DIFFICULT_ORGANICS:{years:7,questions:10},
NITRIFICATION_DENITRIFICATION:{years:9,questions:14},ANAEROBIC_UASB:{years:8,questions:10},BIOLOGICAL_PHOSPHORUS:{years:7,questions:9},
COAGULATION_SEDIMENTATION:{years:9,questions:16},FILTRATION:{years:7,questions:8},ADSORPTION_ACTIVATED_CARBON:{years:8,questions:10},ION_EXCHANGE:{years:8,questions:9},MEMBRANE:{years:7,questions:9},SLUDGE_DEWATERING_INCINERATION:{years:8,questions:11},CHEMICAL_OXIDATION_DISINFECTION:{years:8,questions:10},
BOD_COD_ANALYSIS:{years:8,questions:12},TN_TP_ANALYSIS:{years:8,questions:12},BOD_COD_DO_INDICATORS:{years:9,questions:15},WATER_QUALITY_STATS:{years:9,questions:12},TOXICITY_HEALTH_EFFECTS:{years:8,questions:10},
PULP_PAPER:{years:10,questions:12},REFINERY:{years:9,questions:9},COKE_STEEL:{years:8,questions:10},FOOD_BEVERAGE:{years:8,questions:9}
};
function text(x){var a=[x.t,x.q,x.p,x.d];if(Array.isArray(x.terms))x.terms.forEach(function(z){a.push(z&&z.name,z&&z.desc)});return a.filter(Boolean).join('｜');}
var counts={},ids={};Object.keys(rules).forEach(function(k){counts[k]=0;ids[k]=[];});
bank.forEach(function(x){var s=text(x);Object.keys(rules).forEach(function(k){if(rules[k].test(s)){counts[k]++;ids[k].push(x.id);}});});
var rows=Object.keys(hist).map(function(k){var h=hist[k],n=counts[k]||0;var score=(h.questions/Math.max(1,n))*(1+Math.min(h.years,12)/24);return {canonical:k,confirmedYearsMin:h.years,confirmedQuestionsMin:h.questions,bankQuestions:n,gapRatio:+(h.questions/Math.max(1,n)).toFixed(2),score:+score.toFixed(3),ids:ids[k]||[]};}).sort(function(a,b){return b.score-a.score||b.confirmedQuestionsMin-a.confirmedQuestionsMin;});
window.WATER1_CANONICAL_GAP_AUDIT={version:'v21-v20-retro-lowerbound',bankQuestions:bank.length,ruleCount:Object.keys(rules).length,rows:rows,top15:rows.slice(0,15),note:'確認年度数・問数は未取得を0扱いしない安全側下限。bankQuestionsはv20キーワード規則による機械タグで、候補確定前に人手監査する。'};
})();
