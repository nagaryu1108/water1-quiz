# 水質第1種｜R2残り＋R3～R6有害・大規模 canonical監査 v19

最終更新: 2026-09-04
対象: 第9弾作成前の20年監査。問題バンクは156問のまま。

## 監査原則
- 年度×科目×問番号で本文テーマを確認し、判断対象になっている論点だけcanonical化する。
- 同一問に独立論点がある場合は複数canonical可。同一canonicalは1問につき1回のみ計上する。
- 公式訂正問題は出題実績には残すが、通常の単一正答パターン分析から分離する。
- 古い基準値/JIS/制度は頻度分析にのみ使用し、教材化時には最新試験基準日へ更新する。

# R2（2020）

## 水質概論 10問
|問|主題|canonical|
|---|---|---|
|1|環境基準の測定、測定点・採取・操作|ENV_EFFLUENT_STANDARD / SAMPLE_HANDLING|
|2|水濁法、地下浸透・施設届出|WATER_POLLUTION_LAW / GROUNDWATER|
|3|事故時措置、油等を含む事故対応|WATER_POLLUTION_LAW|
|4|公害防止管理者の技術的職務|WATER_POLLUTION_LAW（組織法補助タグ）|
|5|環境基準の評価方法、年平均・最大値・COD75%値等|ENV_EFFLUENT_STANDARD / WATER_QUALITY_STATS|
|6|工場・生活排水・閉鎖性水域等の汚濁原因|WATER_QUALITY_STATS / EUTROPHICATION_MODEL|
|7|業種と典型汚濁物質の対応|PULP_PAPER / FOOD_BEVERAGE（横断業種タグ）|
|8|河川合流後の完全混合濃度計算|BOD_COD_DO_INDICATORS（物質収支補助タグ）|
|9|金属毒性、化学種・暴露経路|TOXICITY_HEALTH_EFFECTS（新canonical候補）|
|10|環境基準、N/P規制、地下水監視等の施策|ENV_EFFLUENT_STANDARD / WATER_POLLUTION_LAW / GROUNDWATER|

注: R2水質概論はJEMAI公式の試験時間措置対象年度。テーマ頻度には用いるが実施条件異常年度として注記する。

## 汚水処理特論 25問
|問|主題|canonical|
|---|---|---|
|1|排水処理計画、発生源対策、クリーナープロダクション|処理計画（補助タグ）|
|2|向流多段洗浄・水使用合理化計算|COOLING_REUSE|
|3|Stokes式、沈降速度|COAGULATION_SEDIMENTATION|
|4|沈降速度分布曲線と表面積負荷から分離効率を読む図問題|COAGULATION_SEDIMENTATION|
|5|凝集、コロイド、フロック、ジャーテスト|COAGULATION_SEDIMENTATION|
|6|加圧浮上、含油・製紙排水|COAGULATION_SEDIMENTATION（浮上分離補助タグ）|
|7|塩素酸化、HClO/ClO−、クロラミン、不連続点|CHEMICAL_OXIDATION_DISINFECTION（新canonical候補）|
|8|イオン交換樹脂、容量、破過|ION_EXCHANGE（新canonical候補）|
|9|電気透析、イオン交換膜|MEMBRANE|
|10|汚泥焼却、流動炉、ストーカー炉|SLUDGE_DEWATERING_INCINERATION|
|11|活性汚泥BOD容積負荷計算|ACTIVATED_SLUDGE_OP|
|12|MLSS・汚泥負荷からSVI計算|ACTIVATED_SLUDGE_OP / SRT_HRT_SVI|
|13|曝気槽MLSS・余剰汚泥等からSRT計算|ACTIVATED_SLUDGE_OP / SRT_HRT_SVI|
|14|汚泥生成式、BOD-SS負荷、SRT計算|ACTIVATED_SLUDGE_OP / SRT_HRT_SVI|
|15|活性汚泥法とメタン発酵の比較|ACTIVATED_SLUDGE_OP / ANAEROBIC_UASB|
|16|アナモックス|NITRIFICATION_DENITRIFICATION|
|17|凝集除りん、HAP、MAP、生物脱りん|BIOLOGICAL_PHOSPHORUS|
|18|酸化還元装置、ORP計、酸化剤・還元剤管理|CHEMICAL_OXIDATION_DISINFECTION|
|19|活性汚泥維持管理、BOD:N:P、DO、毒性流入|ACTIVATED_SLUDGE_OP|
|20|DO隔膜電極・光学式センサ、消光|INSTRUMENTAL_ANALYSIS / BOD_COD_DO_INDICATORS|
|21|n-ヘキサン抽出物質、試料pH、油分|SAMPLE_HANDLING / INSTRUMENTAL_ANALYSIS|
|22|フェノール類、蒸留、4-アミノアンチピリン吸光光度|SAMPLE_HANDLING / INSTRUMENTAL_ANALYSIS|
|23|全窒素、紫外線吸光光度法|TN_TP_ANALYSIS / INSTRUMENTAL_ANALYSIS|
|24|TOC燃焼酸化-赤外線式、TC/TIC|INSTRUMENTAL_ANALYSIS / BOD_COD_DO_INDICATORS|
|25|全りん、ペルオキソ二硫酸分解、モリブデン青|TN_TP_ANALYSIS / INSTRUMENTAL_ANALYSIS|

R2汚水でも後半に分析・測定ブロックがまとまる。図表/計算は問4、11～14など複数あり、単純知識だけでない。

## 水質有害物質特論 15問
詳細は `analysis_r2_hazardous_full_v18.md` を正本とする。概要:
- 問1～4: 重金属沈殿・錯体・キレート
- 問5～9: Cr(VI)、As、Se、F、CN
- 問10: TCE/PCE/ベンゼン/1,4-ジオキサンの揮発分離
- 問11～15: GC、IC、ICP-MS、蒸留、GC/MS前処理

## 大規模水質特論 10問
|問|主題|canonical|
|---|---|---|
|1|海域DO、底層貧酸素|EUTROPHICATION_MODEL|
|2|L-Q曲線|EUTROPHICATION_MODEL|
|3|閉鎖性水域COD内部生産、底泥・外部負荷|EUTROPHICATION_MODEL|
|4|植物プランクトン・生態系モデル|EUTROPHICATION_MODEL|
|5|カスケード・再生利用・クローズドシステム|COOLING_REUSE|
|6|冷却塔、濃縮・開放循環冷却|COOLING_REUSE|
|7|製鉄所、コークス/圧延/表面処理|COKE_STEEL / CR6|
|8|製油所排水処理フロー|REFINERY|
|9|紙パルプ、黒液・白水等|PULP_PAPER|
|10|ビール工場、UASB→活性汚泥→高度処理|FOOD_BEVERAGE / ANAEROBIC_UASB / ACTIVATED_SLUDGE_OP|

# R3（2021）

## 水質有害物質特論 15問
|問|主題|canonical|
|---|---|---|
|1|Mg置換法・キレート重金属|HEAVY_METAL_COMPLEX|
|2|重金属沈殿用アルカリ剤|HEAVY_METAL_PRECIPITATION|
|3|フェライト法|HEAVY_METAL_PRECIPITATION|
|4|重金属汚泥の安定化・回収|HEAVY_METAL_PRECIPITATION / SLUDGE_DEWATERING_INCINERATION|
|5|Cd水酸化物の溶解度・pH計算|HEAVY_METAL_PRECIPITATION|
|6|水銀処理|MERCURY|
|7|セレン処理|SELENIUM|
|8|ほう素・ふっ素処理|FLUORIDE_BORON|
|9|シアン、アルカリ塩素・紺青法|CYANIDE|
|10|1,4-ジオキサン性状・処理|VOC_DIFFICULT_ORGANICS|
|11|HPLC|INSTRUMENTAL_ANALYSIS|
|12|アルキル水銀の分析法|MERCURY / INSTRUMENTAL_ANALYSIS|
|13|水素化物発生法、As/Se|ARSENIC / SELENIUM / INSTRUMENTAL_ANALYSIS|
|14|ふっ素検定法|FLUORIDE_BORON / INSTRUMENTAL_ANALYSIS|
|15|シアン保存・蒸留・吸光光度|CYANIDE / SAMPLE_HANDLING / INSTRUMENTAL_ANALYSIS|

## 大規模水質特論 10問
|問|主題|canonical|
|---|---|---|
|1|河口・海域流動モデル|EUTROPHICATION_MODEL|
|2|海域生態系物質循環|EUTROPHICATION_MODEL|
|3|植物プランクトン増殖、光・栄養制限|EUTROPHICATION_MODEL|
|4|DO物質収支|EUTROPHICATION_MODEL|
|5|処理水再利用方式|COOLING_REUSE|
|6|冷却塔濃縮倍数計算|COOLING_REUSE|
|7|製鉄所排水|COKE_STEEL|
|8|製鉄表面処理・クロメート|COKE_STEEL / CR6|
|9|製油所プロセス排水|REFINERY|
|10|食品製造排水|FOOD_BEVERAGE|

# R4（2022）

## 水質有害物質特論 15問
|問|主題|canonical|
|---|---|---|
|1|難分解性有機物、1,4-ジオキサン、ベンゼン等|VOC_DIFFICULT_ORGANICS|
|2|重金属沈殿、共沈、キレート、硫化物、フェライト|HEAVY_METAL_PRECIPITATION / HEAVY_METAL_COMPLEX|
|3|Cd/Pbの硫化物・水酸化物・錯体|HEAVY_METAL_PRECIPITATION / HEAVY_METAL_COMPLEX|
|4|水銀処理|MERCURY|
|5|セレン処理|SELENIUM|
|6|ほう素・ふっ素処理|FLUORIDE_BORON|
|7|シアンのオゾン酸化|CYANIDE / CHEMICAL_OXIDATION_DISINFECTION|
|8|シアンのアルカリ塩素法等|CYANIDE|
|9|アンモニア・亜硝酸・硝酸処理|NITRIFICATION_DENITRIFICATION|
|10|有機塩素化合物の生物分解|VOC_DIFFICULT_ORGANICS|
|11|GC/MS|INSTRUMENTAL_ANALYSIS|
|12|イオンクロマトグラフィー検出器|INSTRUMENTAL_ANALYSIS|
|13|ひ素検定法|ARSENIC / INSTRUMENTAL_ANALYSIS|
|14|ふっ素、蒸留・検定|FLUORIDE_BORON / SAMPLE_HANDLING / INSTRUMENTAL_ANALYSIS|
|15|塩素化炭化水素・ベンゼン試料採取/GC-MS|VOC_DIFFICULT_ORGANICS / SAMPLE_HANDLING / INSTRUMENTAL_ANALYSIS|

## 大規模水質特論 10問
|問|主題|canonical|
|---|---|---|
|1|生態系モデル構造|EUTROPHICATION_MODEL|
|2|モデルパラメータ推定|EUTROPHICATION_MODEL|
|3|植物プランクトン由来COD計算|EUTROPHICATION_MODEL|
|4|植物プランクトン増殖速度計算|EUTROPHICATION_MODEL|
|5|再生水処理|COOLING_REUSE|
|6|冷却水再利用|COOLING_REUSE|
|7|製鉄所排水|COKE_STEEL|
|8|製油所排水|REFINERY|
|9|紙パルプ排水|PULP_PAPER|
|10|紙パルプ排水|PULP_PAPER|

# R5（2023）

## 水質有害物質特論 15問
|問|主題|canonical|
|---|---|---|
|1|重金属共沈機構|HEAVY_METAL_PRECIPITATION|
|2|イオン交換・キレート樹脂|ION_EXCHANGE / HEAVY_METAL_COMPLEX|
|3|Cr(VI)処理フロー|CR6|
|4|有機水銀|MERCURY|
|5|ひ素処理|ARSENIC|
|6|活性炭の適用、Se/Hg/TCE/農薬/PCB等|ADSORPTION_ACTIVATED_CARBON / VOC_DIFFICULT_ORGANICS|
|7|ふっ素処理|FLUORIDE_BORON|
|8|有害物質処理法の横断対応|VOC_DIFFICULT_ORGANICS / CYANIDE / HEAVY_METAL_PRECIPITATION|
|9|凝集・沈殿を適用する有害排水|HEAVY_METAL_PRECIPITATION|
|10|キレート・錯体による沈殿阻害|HEAVY_METAL_COMPLEX|
|11|物質別試料保存|SAMPLE_HANDLING|
|12|ガスクロマトグラフィー|INSTRUMENTAL_ANALYSIS|
|13|Cr(VI)ジフェニルカルバジド等|CR6 / INSTRUMENTAL_ANALYSIS|
|14|アルキル水銀/As/Cd/B/Fの分析対応|INSTRUMENTAL_ANALYSIS / MERCURY / ARSENIC / FLUORIDE_BORON|
|15|農薬・チウラム等の測定|INSTRUMENTAL_ANALYSIS|

## 大規模水質特論 10問
|問|主題|canonical|
|---|---|---|
|1|富栄養化した閉鎖性海域|EUTROPHICATION_MODEL|
|2|沿岸生態系モデル|EUTROPHICATION_MODEL|
|3|光制限項|EUTROPHICATION_MODEL|
|4|DO動態・計算|EUTROPHICATION_MODEL|
|5|排水再利用|COOLING_REUSE|
|6|濃縮倍数・ブロー|COOLING_REUSE|
|7|製鉄・熱間圧延|COKE_STEEL|
|8|製油所プロセス排水|REFINERY|
|9|紙パルプ|PULP_PAPER|
|10|食品工場|FOOD_BEVERAGE|

# R6（2024）

## 水質有害物質特論 15問
|問|主題|canonical|
|---|---|---|
|1|重金属の硫化物沈殿|HEAVY_METAL_PRECIPITATION|
|2|ほう素吸着樹脂、N-メチルグルカミン|FLUORIDE_BORON / ION_EXCHANGE|
|3|フェライト法・鉄粉法|HEAVY_METAL_PRECIPITATION|
|4|Cr(VI)処理|CR6|
|5|水銀処理|MERCURY|
|6|セレン処理|SELENIUM|
|7|ふっ素二段沈殿|FLUORIDE_BORON|
|8|シアン処理|CYANIDE|
|9|有機りん農薬処理|VOC_DIFFICULT_ORGANICS / ADSORPTION_ACTIVATED_CARBON|
|10|TCE/PCE処理|VOC_DIFFICULT_ORGANICS|
|11|鉛検定法|INSTRUMENTAL_ANALYSIS|
|12|ひ素・水素化物発生原子吸光|ARSENIC / SAMPLE_HANDLING / INSTRUMENTAL_ANALYSIS|
|13|ほう素メチレンブルー法|FLUORIDE_BORON / INSTRUMENTAL_ANALYSIS|
|14|アンモニウム測定|INSTRUMENTAL_ANALYSIS|
|15|チウラム/シマジン/ジオキサン/ベンゼン/PCBの装置対応|VOC_DIFFICULT_ORGANICS / INSTRUMENTAL_ANALYSIS|

## 大規模水質特論 10問
|問|主題|canonical|
|---|---|---|
|1|閉鎖性海域の外部/内部COD|EUTROPHICATION_MODEL|
|2|生態系モデル計算・パラメータ|EUTROPHICATION_MODEL|
|3|DO動態|EUTROPHICATION_MODEL|
|4|植物プランクトン比増殖速度計算|EUTROPHICATION_MODEL|
|5|冷却水補給・濃縮倍数計算|COOLING_REUSE|
|6|水再利用|COOLING_REUSE|
|7|コークス炉ガス精製排水|COKE_STEEL|
|8|製油所排水・再利用|REFINERY|
|9|紙パルプ蒸解・黒液|PULP_PAPER|
|10|製紙工場汚濁負荷・排水処理|PULP_PAPER|

# 今回の監査でcanonical体系に生じた論点
既存v10の `HEAVY_METAL_COMPLEX` には、錯体処理だけでなく単純な水酸化物・硫化物沈殿・フェライト・共沈まで混在し始めている。20年最終集計では以下を分離する方がよい。

1. `HEAVY_METAL_PRECIPITATION`: 水酸化物・硫化物・共沈・フェライト・溶解度-pH
2. `HEAVY_METAL_COMPLEX`: EDTA、キレート、錯形成、置換法、キレート樹脂等
3. `VOC_DIFFICULT_ORGANICS`: TCE/PCE、ベンゼン、1,4-ジオキサン、塩素化有機物、難分解性有機物の処理
4. `ION_EXCHANGE`: イオン交換樹脂、交換容量、破過、再生。膜分離とは別原理なので分離
5. `CHEMICAL_OXIDATION_DISINFECTION`: 塩素、オゾン、ORP、酸化還元装置、不連続点塩素処理
6. `TOXICITY_HEALTH_EFFECTS`: 水質概論の毒性・健康影響問題が複数年度にまたがる場合に使用

# 構造的に強い出題パターン
- 有害物質特論: 前半が処理、後半が分析・前処理という構造がR2～R6で一貫して強い。
- 大規模水質特論: 問1～4が水域/生態系モデル、問5～6が再利用・冷却水、問7～10が業種別排水という骨格がR2～R6で非常に安定。
- 汚水処理特論: 物化処理→生物処理→分析の並びがR2でも確認され、分析ブロックは末尾に連続する。
- 計算・図表: 沈降速度分布、活性汚泥負荷、SVI/SRT、植物プランクトン、冷却水濃縮など、知識＋数理の複合出題が長期反復する。

# 次作業
1. canonical辞書をv20へ整理する。
2. H18～R7の既存監査表へ新canonicalを遡及適用する。
3. 全年度の確認出題年度数・確認出題問数を重複なしで再集計する。
4. 156問版について同じcanonical辞書で保有問題数を数える。
5. `頻度 × 重要度 × 現行不足 × 形式不足` で第9弾候補15件を抽出する。

第9弾はこの再集計が終わるまで作成しない。
