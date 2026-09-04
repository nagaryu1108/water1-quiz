# 水質第1種｜v20 canonical遡及再集計・156問差分監査 v21

最終更新: 2026-09-04
対象: H18～R7（2006～2025）監査行 + 現行156問

## 実施内容
1. `analysis_topic_normalization_v20.md` の分割規則を基準に、旧canonicalの広すぎる分類を遡及整理する方針へ統一。
2. 既存の安全側下限値とR2～R6の問番号監査を使い、v20単位の `確認出題年度数 >=` / `確認出題問数 >=` を暫定再構成。
3. `qbank_canonical_gap_audit_v21.js` を追加し、現行 `window.QBANK` 156問を同じv20規則で機械タグ付けする。
4. 各canonicalについて `gapRatio = confirmedQuestionsMin / max(1, bankQuestions)` を計算し、年度反復を補正したscoreで降順化する。
5. 上位15件を `window.WATER1_CANONICAL_GAP_AUDIT.top15` として自動生成する。

## v21で使用する確認下限（未取得問を0扱いしない）
|canonical|確認年度数 >=|確認問数 >=|
|---|---:|---:|
|INSTRUMENTAL_ANALYSIS|9|42|
|SAMPLE_HANDLING|9|18|
|ACTIVATED_SLUDGE_OP|9|27|
|SRT_HRT_SVI|8|14|
|NITRIFICATION_DENITRIFICATION|9|14|
|ANAEROBIC_UASB|8|10|
|BIOLOGICAL_PHOSPHORUS|7|9|
|COAGULATION_SEDIMENTATION|9|16|
|FILTRATION|7|8|
|ADSORPTION_ACTIVATED_CARBON|8|10|
|ION_EXCHANGE|8|9|
|MEMBRANE|7|9|
|SLUDGE_DEWATERING_INCINERATION|8|11|
|CHEMICAL_OXIDATION_DISINFECTION|8|10|
|BOD_COD_ANALYSIS|8|12|
|TN_TP_ANALYSIS|8|12|
|HEAVY_METAL_PRECIPITATION|10|22|
|HEAVY_METAL_COMPLEX|8|13|
|CYANIDE|11|16|
|CR6|9|11|
|MERCURY|8|11|
|SELENIUM|7|9|
|ARSENIC|7|9|
|FLUORIDE_BORON|8|13|
|VOC_DIFFICULT_ORGANICS|7|10|
|WATER_POLLUTION_LAW|10|18|
|ENV_EFFLUENT_STANDARD|10|17|
|GROUNDWATER|8|10|
|WATER_QUALITY_STATS|9|12|
|BOD_COD_DO_INDICATORS|9|15|
|TOXICITY_HEALTH_EFFECTS|8|10|
|EUTROPHICATION_MODEL|11|31|
|COOLING_REUSE|10|17|
|PULP_PAPER|10|12|
|REFINERY|9|9|
|COKE_STEEL|8|10|
|FOOD_BEVERAGE|8|9|

## 重要な遡及変更
- 旧 `HEAVY_METAL_COMPLEX` を単純沈殿/溶解度-pH (`HEAVY_METAL_PRECIPITATION`) と錯体/キレート (`HEAVY_METAL_COMPLEX`) に分離。
- イオン交換樹脂を `ION_EXCHANGE`、電気透析等を `MEMBRANE` に分離。
- 塩素・オゾン・ORPを `CHEMICAL_OXIDATION_DISINFECTION` として独立。
- TCE/PCE/ベンゼン/1,4-ジオキサン等を `VOC_DIFFICULT_ORGANICS` として分析装置論点から分離。
- 毒性・健康影響を `TOXICITY_HEALTH_EFFECTS` として統計から分離。

## 現行156問の機械タグ
`qbank_canonical_gap_audit_v21.js` は、各問題の `t`（論点名）、`q`（問題文）、`p`（総合解説）、`d`（由来）、`terms` を対象としてv20キーワード規則でタグ付けする。誤答肢全文を機械タグ対象にしないため、別論点が誤答肢に登場しただけで過大計上するリスクを抑えている。

出力:
- `WATER1_CANONICAL_GAP_AUDIT.bankQuestions`
- `WATER1_CANONICAL_GAP_AUDIT.rows[]`
- `rows[].confirmedYearsMin`
- `rows[].confirmedQuestionsMin`
- `rows[].bankQuestions`
- `rows[].gapRatio`
- `rows[].score`
- `WATER1_CANONICAL_GAP_AUDIT.top15`

## score
`score = (確認問数下限 / 現行保有問数) × (1 + min(確認年度数,12)/24)`

目的は「出題回数が多いが現行教材が薄い」論点を上に出すこと。問題数0は分母1として扱い、未教材化の頻出論点を強く上げる。

## 人手監査が必要な理由
機械タグは候補抽出の一次フィルタ。短い語・複合論点・業種横断問題では誤タグの可能性があるため、第9弾作成前にtop15の各ID一覧を確認し、真にそのcanonicalを主題として扱う問題だけ残す。

## 現段階の見込み
履歴下限値だけから見て高優先になりやすいのは、EUTROPHICATION_MODEL、INSTRUMENTAL_ANALYSIS、HEAVY_METAL_PRECIPITATION、SAMPLE_HANDLING、ACTIVATED_SLUDGE_OP、COOLING_REUSE、CYANIDE、水質法令/基準、SRT_HRT_SVI、NITRIFICATION_DENITRIFICATION、PULP_PAPER等。これは最終top15ではなく、機械出力を確認する前の妥当性チェック用。

## 第9弾ルール
第9弾15問はまだ追加しない。`top15` の機械抽出結果を人手監査し、既存問題と実質重複する候補を除いた後、5科目配分と図表/計算比率も確認して作成する。
