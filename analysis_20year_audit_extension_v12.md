# 水質第1種｜20年監査拡張 v12

最終更新: 2026-09-04

## 目的
H23未取得3科目、H20/H19/H18の欠落、H30～R6の問番号単位監査を進め、canonical単位の確認出題年度数・確認問数を安全側の下限値で更新する。

## H23
公開過去問倉庫ではH23の水質概論・水質有害物質特論・大規模水質特論のPDF導線を再確認した。ただし今回の取得環境では本文キャッシュ取得が安定せず、本文を見ていない問は推測でTEXT化しない。H23汚水処理特論25問は既にTEXT化済み。

## H18～H20
- H18/H19/H20はJEMAI CLUB公式アーカイブの年度・科目所在を確認済み。
- 旧年度公開PDFのテキストレイヤ欠落がある問は、文字断片だけでcanonicalを付与しない。
- 既確認のH18汚水後半、H19汚水16～18、H19/H20有害等は従来どおり保持する。

## H30（2018）
公開解説から少なくとも水質概論で以下を確認。
- 問5: 公害史・有害化学物質の年代順
- 問6: 公共用水域の健康項目、河川BOD、湖沼/海域COD、全窒素・全りんの達成状況
canonical候補: WATER_QUALITY_STATS, ENV_EFFLUENT_STANDARD, BOD_COD_DO_INDICATORS。

## R1（2019）水質概論 全10問
公開解説一覧で問番号と主論点を確認。
1 健康項目の環境基準
2 有害物質でないもの
3 実施の制限
4 水質関係公害防止管理者の業務
5 健康項目で環境基準を超過していないもの
6 水生生物保全の環境基準
7 富栄養化指標
8 PRTR排出量最多物質
9 水質階級と指標生物
10 化学物質のリスク評価

canonical:
- Q1,2,3,4,6 → WATER_POLLUTION_LAW / ENV_EFFLUENT_STANDARD 系
- Q5 → WATER_QUALITY_STATS
- Q7 → EUTROPHICATION_MODEL
- Q8 → PRTR/化学物質管理（今後canonical追加候補）
- Q9 → BOD_COD_DO_INDICATORS / 生物指標
- Q10 → 化学物質リスク評価（canonical追加候補）

## R2（2020）
JEMAI CLUB公式アーカイブに5水質科目が存在することを確認。公開解説ではR2の大気・水質概論10問について、事故時措置、排水基準、公害防止組織、要監視項目、水質指標、水生植物等の論点を確認。水質第1種の5科目全問の問番号行列は継続取得。

R2水質有害物質特論では公開解説から少なくとも次を確認。
- 問2: 錯体形成物質による水酸化物沈殿阻害 → HEAVY_METAL_COMPLEX
- 問4: キレート重金属排水の置換法 → HEAVY_METAL_COMPLEX
- 問5へCr(VI)処理が連続することも公開解説導線で確認 → CR6

## R3（2021）
公開年度一覧で、水質概論10、汚水処理25、有害15、大規模10の全問正答表を確認。汚水処理問20は公式訂正で正答2・5の複数正答扱い。通常単一正答の正答肢分布分析から分離する。

## R4～R6
### R4 大規模水質特論 全10問
1 生態系モデル構成
2 パラメータ推定
3 植物プランクトンCOD計算
4 増殖速度計算
5 排水再生利用
6 冷却水再利用
7 製鉄所排水
8 製油所排水
9 製紙工場排水
10 製紙工場排水
canonical: EUTROPHICATION_MODEL, COOLING_REUSE, COKE_STEEL, REFINERY, PULP_PAPER。

### R5 大規模水質特論 全10問
1 富栄養化した閉鎖性海域
2 沿岸生態系モデル
3 光制限項
4 DO動態
5 排水再生利用
6 濃縮倍数・ブロー水量
7 製鉄所熱間圧延
8 製油所プロセス排水
9 製紙工場
10 食品製造工場
canonical: EUTROPHICATION_MODEL, COOLING_REUSE, COKE_STEEL, REFINERY, PULP_PAPER, FOOD_BEVERAGE。

### R6 水質概論 全10問
1 河川生活環境基準
2 上乗せ排水基準
3 有害物質貯蔵指定施設届出
4 汚水等排出施設
5 水生生物保全環境基準
6 海洋汚染（油）
7 富栄養化指標
8 地下水汚染
9 有害物質の健康影響
10 PFOS/PFOA（要監視項目）
canonical: WATER_POLLUTION_LAW, ENV_EFFLUENT_STANDARD, GROUNDWATER, EUTROPHICATION_MODEL, WATER_QUALITY_STATS。

### R6 汚水処理特論 全25問
1 処理計画
2 凝集分離
3 清澄ろ過
4 塩素酸化
5 フロイントリッヒ
6 活性炭
7 イオン交換
8 膜分離
9 脱水
10 流動焼却炉
11 活性汚泥操作条件
12 返送汚泥率計算
13 SVI計算
14 汚泥生成量計算
15 硝化酸素消費量
16 脱窒
17 アナモックス
18 りん除去
19 嫌気処理維持管理
20 ICP-OES
21 流れ分析
22 光学式DO
23 全窒素UV法
24 全りん
25 ORP計
canonical: COAGULATION_SEDIMENTATION, FILTRATION, ADSORPTION_ACTIVATED_CARBON, MEMBRANE, SLUDGE_DEWATERING_INCINERATION, ACTIVATED_SLUDGE_OP, SRT_HRT_SVI, NITRIFICATION_DENITRIFICATION, ANAEROBIC_UASB, BIOLOGICAL_PHOSPHORUS, SAMPLE_HANDLING/INSTRUMENTAL_ANALYSIS/TN_TP_ANALYSIS。

## 公式訂正の扱い
JEMAI公式試験結果変更一覧で以下を再確認。
- R5 公害総論 問12
- R5 汚水処理特論 問21
- R3 汚水処理特論 問20
- H24 公害総論 問12
- H23 公害総論 問8
- H20 公害総論 問11
訂正問題はテーマ存在には使えるが、通常の単一正答ひっかけ分析・正答位置分布から分離する。

## 現時点の判断
20年表の完全行列化はまだ未完了。ただしR1、R4、R5、R6の問番号単位主論点が追加され、canonical頻度は従来より実数に近づいた。第8弾はまだ作らず、R3～R6の残り3科目/年度とH23未取得3科目をできる限り埋めてからギャップ順位を確定する。
