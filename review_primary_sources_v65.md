# v65：汚水処理特論8問・40肢の逐肢照合

確認日：2026-09-29。v64の最終表示問題を基準に、8問の設問・5肢・各肢解説を改稿。通常199問、問題ID、正答位置、既存の図表、UI、学習履歴を維持する。正答番号は1始まり。米国EPAの技術資料は原理・操作の根拠であり、日本の法的基準として引用しない。

| ID | 正答 | 今回の判断軸 | 主な一次資料 |
| --- | ---: | --- | --- |
| T01 | 1 | HRT一定、槽内固形物1.2倍・排出量0.8倍ならSRT1.5倍、F/M比5/6倍 | [1] |
| T02 | 4（誤り） | SVI=150 mL/g。希釈試験や観察を無視した糸状性原因の断定は不可 | [2][3] |
| T03 | 4（誤り） | 好気槽の硝化と無酸素槽の脱窒を分け、DO・SRT・pH・炭素源・循環を診断 | [1] |
| T04 | 4 | 急速撹拌での薬剤分散と形成池の低せん断成長を区別 | [3][4] |
| T05 | 4（誤り） | MFの粒子除去は溶解硝酸のRO相当の阻止を意味しない | [5][6][7] |
| T07 | 3 | 前段出口の破過と塔全体の飽和を区別し、二塔の切替時期を判断 | [7][8] |
| T21 | 5（誤り） | 濁度と導電率、MF・NF・RO・電気透析の分離機構を区別 | [5][6] |
| T24 | 1 | Zn・Cr(III)の高pH再溶解とCu-EDTAの錯形成を区別 | [9][10][11] |

[1] https://www.epa.gov/sites/default/files/2019-02/documents/nutrient-control-design-manual.pdf
[2] https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30004EKH.TXT
[3] https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000C1E0.TXT
[4] https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=91019EQP.TXT
[5] https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100TNCB.TXT
[6] https://www.epa.gov/sdwa/overview-drinking-water-treatment-technologies
[7] https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=10001KAJ.TXT
[8] https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P1001QTK.TXT
[9] https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000UPBJ.TXT
[10] https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=93000LCQ.TXT
[11] https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=10001OCN.TXT

## 範囲と検証

- T05とT21はどちらも膜処理を含むが、前者は複数技術の選定と残余物処理、後者は実測した除去率から分離機構を推論する問題として残す。
- T01・T02・T03・T04・T07・T24はそれぞれ固形物収支、沈降指標、生物学的窒素除去、凝集操作、吸着塔、金属沈殿と判断軸が異なる。
- v63、v64、v65で計24問・120肢を一次資料と照合して改稿。残る175問を逐肢一次資料照合済みとは扱わない。v62の点検記録とは別の進捗である。
- `node tools/source_audit_v65.js` は構造・正答位置・履歴移行・オフライン資産を検証する。科学的正しさを自動で証明するものではない。実ブラウザ操作は別途必要。
