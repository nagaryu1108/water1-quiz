# 水質第1種｜20年監査用 論点表記統一辞書 v10

最終更新: 2026-09-04

## 目的
2006(H18)～2025(R7)の問題を年度横断で集計する際、同一テーマが年度ごとに異なる表現で記録されることによる頻度の分散を防ぐ。今後の確認出題年度数・確認出題問数は、この正規化名を基準に集計する。

## 正規化ルール
- 原文の用語は保存するが、頻度集計では canonical 名へ寄せる。
- 1問に独立した複数論点がある場合は複数 canonical を付与可。
- 古い法令値・基準値は論点分類には使うが、教材化時は最新制度へ置換する。
- 単なる関連語の出現だけで頻度加算せず、その事項が判断対象になっている問題だけ数える。

## canonical 論点
|canonical|代表的な別表記・関連表現|
|---|---|
|ACTIVATED_SLUDGE_OP|活性汚泥、曝気槽、返送汚泥、余剰汚泥、MLSS、汚泥負荷、容積負荷|
|SRT_HRT_SVI|SRT、HRT、SVI、30分沈降汚泥容積、汚泥齢|
|NITRIFICATION_DENITRIFICATION|硝化、脱窒、窒素除去、硝化酸素量、アルカリ度、水素供与体|
|ANAEROBIC_UASB|嫌気処理、メタン発酵、UASB、グラニュール、嫌気流動床|
|BIOLOGICAL_PHOSPHORUS|生物脱りん、MAP、HAP、りん除去|
|COAGULATION_SEDIMENTATION|凝集、沈殿、ジャーテスト、フロック、水面積負荷、傾斜板|
|FILTRATION|清澄ろ過、砂ろ過、多層ろ過、逆洗、均等係数|
|ADSORPTION_ACTIVATED_CARBON|活性炭、吸着、フロイントリッヒ、破過|
|MEMBRANE|MF、UF、NF、RO、MBR、電気透析、膜分離|
|SLUDGE_DEWATERING_INCINERATION|汚泥脱水、ベルトプレス、遠心脱水、焼却、流動炉|
|SAMPLE_HANDLING|試料採取、試料保存、前処理、ろ過、酸添加、蒸留、濃縮|
|INSTRUMENTAL_ANALYSIS|ICP-OES、ICP-MS、原子吸光、GC、GC-MS、HPLC、IC、吸光光度、TOC、DO測定|
|BOD_COD_ANALYSIS|BOD希釈、DO差、CODMn、CODCr、BOD/COD比|
|TN_TP_ANALYSIS|全窒素、全りん、UV法、モリブデン青|
|CYANIDE|シアン、CN、アルカリ塩素法、紺青、鉄シアノ錯体、シアン保存/分析|
|CR6|六価クロム、Cr(VI)、クロム(VI)、還元、中和沈殿、DPC分析|
|MERCURY|水銀、有機水銀、キレート樹脂、還元気化AAS|
|SELENIUM|セレン(IV)/(VI)、共沈、水素化物発生AAS|
|ARSENIC|ひ素、As(III)/(V)、共沈、水素化物発生|
|FLUORIDE_BORON|ふっ素、ほう素、二段沈殿、吸着|
|HEAVY_METAL_COMPLEX|キレート、錯体、EDTA、重金属処理阻害、置換法|
|WATER_POLLUTION_LAW|水質汚濁防止法、水濁法、特定施設、指定施設、指定物質、特定地下浸透水、届出、事故時措置|
|ENV_EFFLUENT_STANDARD|環境基準、排水基準、上乗せ基準、総量規制基準、水生生物保全|
|GROUNDWATER|地下水、浄化措置命令、概況調査、有害物質貯蔵指定施設|
|WATER_QUALITY_STATS|公共用水域測定結果、達成率、非達成率、地下水超過率|
|BOD_COD_DO_INDICATORS|BOD、COD、DO、SS、pH、TOC、透視度、水質指標|
|EUTROPHICATION_MODEL|富栄養化、内部負荷、赤潮、青潮、貧酸素、成層、植物プランクトン、生態系モデル、L-Q|
|COOLING_REUSE|冷却水、濃縮倍数、ブロー、循環冷却、再利用、カスケード、向流洗浄|
|REFINERY|製油所、石油精製、APIオイルセパレーター、サワーウォーターストリッパー|
|PULP_PAPER|製紙、紙パルプ、白水、黒液、ECF、漂白|
|COKE_STEEL|コークス炉ガス精製、安水、製鉄、熱間圧延|
|FOOD_BEVERAGE|食品、飲料、ビール、清涼飲料、UASB+活性汚泥|

## 今後の頻度集計
1. 年度×科目×問番号ごとに canonical を付与
2. canonical ごとに `確認出題年度数` と `確認出題問数` を再計算
3. 同じ問で同一canonicalを重複計上しない
4. 旧A/B/Cは廃止方向とし、確認下限値から重みを計算
5. 第8弾は「頻度が高いのに141問版の教材化が薄い canonical」を優先する
