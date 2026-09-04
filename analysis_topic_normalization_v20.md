# 水質第1種｜20年監査用 canonical統一辞書 v20

最終更新: 2026-09-04
対象: 2006(H18)～2025(R7)

## 目的
v10で広すぎた分類を、R2～R6の問番号単位監査結果に合わせて整理する。第9弾以降は本辞書を基準とする。

## 集計ルール
- 1問に独立した複数論点があれば複数canonical可。
- 同一問で同一canonicalは1回だけ数える。
- 単に関連語が登場しただけでは加算せず、その事項が正誤判断・計算・方法選択の対象である場合だけ加算。
- 古い法令値/JIS/統計値は歴史分類にのみ用い、教材化時は最新制度へ照合。
- 公式訂正・複数正答問題は「出題された事実」には数えるが、通常の正答パターン統計から分離する。

## 生物処理・運転
|canonical|範囲|
|---|---|
|ACTIVATED_SLUDGE_OP|活性汚泥、MLSS、BOD負荷、返送・余剰汚泥、曝気槽、運転管理|
|SRT_HRT_SVI|SRT、HRT、SVI、汚泥齢、30分沈降|
|NITRIFICATION_DENITRIFICATION|硝化、脱窒、アナモックス、窒素除去、酸素要求量、アルカリ度、水素供与体|
|ANAEROBIC_UASB|嫌気処理、メタン発酵、UASB、グラニュール、嫌気流動床|
|BIOLOGICAL_PHOSPHORUS|生物脱りん、MAP、HAP、化学除りん、りん回収|

## 物理化学処理
|canonical|範囲|
|---|---|
|COAGULATION_SEDIMENTATION|凝集、沈殿、表面積負荷、ジャーテスト、フロック、浮上分離|
|FILTRATION|砂ろ過、多層ろ過、清澄ろ過、逆洗|
|ADSORPTION_ACTIVATED_CARBON|活性炭、吸着、フロイントリッヒ、破過、再生|
|ION_EXCHANGE|イオン交換樹脂、交換容量、選択性、破過、再生、キレート樹脂（錯体論点併記可）|
|MEMBRANE|MF、UF、NF、RO、MBR、電気透析、膜分離|
|SLUDGE_DEWATERING_INCINERATION|脱水、濃縮、遠心、ベルトプレス、焼却、流動炉、汚泥処分|
|CHEMICAL_OXIDATION_DISINFECTION|塩素、次亜塩素酸、不連続点、オゾン、ORP、酸化還元装置、促進酸化|

## 分析・測定
|canonical|範囲|
|---|---|
|SAMPLE_HANDLING|採取、保存、前処理、蒸留、酸添加、抽出、濃縮、ろ過|
|INSTRUMENTAL_ANALYSIS|AAS、ICP-OES/MS、GC/MS、HPLC、IC、吸光光度、TOC、DOセンサ等|
|BOD_COD_ANALYSIS|BOD希釈、DO差、CODMn/CODCr、BOD/COD比|
|TN_TP_ANALYSIS|全窒素、全りん、UV法、モリブデン青、分解前処理|

## 有害物質
|canonical|範囲|
|---|---|
|HEAVY_METAL_PRECIPITATION|水酸化物・硫化物沈殿、共沈、フェライト、溶解度-pH、両性再溶解|
|HEAVY_METAL_COMPLEX|EDTA、キレート、錯形成、置換法、錯体による沈殿阻害|
|CYANIDE|遊離/錯体シアン、アルカリ塩素、紺青、保存・分析|
|CR6|六価クロム、還元→Cr(III)、沈殿、DPC分析|
|MERCURY|全水銀、有機水銀、硫黄系吸着、還元気化AAS|
|SELENIUM|Se(IV)/(VI)、共沈、還元、水素化物発生|
|ARSENIC|As(III)/(V)、酸化/共沈、水素化物発生|
|FLUORIDE_BORON|ふっ素、ほう素、CaF2、Al共沈、吸着、検定|
|VOC_DIFFICULT_ORGANICS|TCE/PCE、ベンゼン、1,4-ジオキサン、塩素化有機物、農薬等の揮発・吸着・酸化・生分解|

## 法令・環境・健康影響
|canonical|範囲|
|---|---|
|WATER_POLLUTION_LAW|水濁法、特定施設、指定施設/物質、事故、届出、地下浸透、行政措置|
|ENV_EFFLUENT_STANDARD|環境基準、排水基準、上乗せ、総量、水生生物保全|
|GROUNDWATER|地下水基準、概況調査、浄化措置、汚染原因|
|WATER_QUALITY_STATS|公共用水域/地下水測定結果、達成率、超過率、媒体別統計|
|BOD_COD_DO_INDICATORS|BOD/COD/DO/SS/pH/TOC等の水質指標の意味・比較|
|TOXICITY_HEALTH_EFFECTS|急性/慢性毒性、金属・有機化学物質の人体影響、生体蓄積、リスク評価|

## 大規模水質・業種
|canonical|範囲|
|---|---|
|EUTROPHICATION_MODEL|富栄養化、成層、貧酸素、内部負荷、赤潮/青潮、植物プランクトン、生態系/流動モデル、L-Q、DO収支|
|COOLING_REUSE|冷却水、濃縮倍数、ブロー、循環、カスケード、再生利用、向流洗浄|
|REFINERY|石油精製、API、サワーウォーター、製油所フロー|
|PULP_PAPER|紙パルプ、黒液、白水、漂白、製紙排水|
|COKE_STEEL|コークス、製鉄、圧延、表面処理、安水|
|FOOD_BEVERAGE|食品、飲料、ビール、高濃度有機排水、嫌気＋好気処理|

## v10からの重要変更
1. `HEAVY_METAL_COMPLEX` から単純沈殿・共沈・フェライトを `HEAVY_METAL_PRECIPITATION` へ分離。
2. `ION_EXCHANGE` を `MEMBRANE` から独立。電気透析は膜、樹脂交換はイオン交換。
3. `CHEMICAL_OXIDATION_DISINFECTION` を新設し、塩素・オゾン・ORPを集約。
4. `VOC_DIFFICULT_ORGANICS` を新設。1,4-ジオキサン、TCE/PCE等の処理性を分析装置論点から分離。
5. `TOXICITY_HEALTH_EFFECTS` を新設。水質概論の毒性・健康影響を統計から分離。

## 遡及置換ルール
- 旧表でHEAVY_METAL_COMPLEXに入れた問は、錯体/キレートが判断対象ならCOMPLEX、沈殿/溶解度/pHが判断対象ならPRECIPITATION、双方なら両方。
- 旧表でINSTRUMENTAL_ANALYSISに仮置きしたVOC処理問題は、装置測定が主題でなければVOC_DIFFICULT_ORGANICSへ移す。
- 塩素酸化・オゾン・ORPは物質固有canonical（例CYANIDE/CR6）とCHEMICAL_OXIDATION_DISINFECTIONを必要に応じ併記する。

## 次工程
H18～R7の既存行へ本辞書を遡及適用し、canonicalごとの確認出題年度数・確認出題問数を再計算する。その後、156問版にも同じタグを付け、頻度に対する保有数不足を機械的に抽出する。
