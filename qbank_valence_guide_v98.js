(function(){
'use strict';
if(window.WATER1_VALENCE_GUIDE_V98||!window.WATER1_SCORING_FIX_V97)return;
var bank=window.QBANK||[],ids=['H37','H40'];
var guide='<details class="water1-aid-medium water1-valence-guide"><summary>理解補助｜元素分析の酸化・還元を比べる</summary><div class="learn">'+
 '<p><b>まず「何を測るか」を決める。</b>全量は分解・回収、化学形態別は目的の形態を保持。酸分解（有機物などを分解・総量化）と、測定反応のための価数調整は別の段階。</p>'+
 '<ul><li><b>ひ素・水素化物発生：</b>全ひ素なら適切に分解・回収し、As(V)→As(III)へ予備還元。還元剤でAsH₃を発生させて導入する。</li>'+
 '<li><b>セレン・水素化物発生：</b>全セレンなら適切に分解・回収し、Se(VI)→Se(IV)へ十分還元。還元剤でH₂Seを発生させる。</li>'+
 '<li><b>総水銀・還元気化：</b>有機物などを酸化分解して水銀を回収し、測定時にHg(II)→Hg(0)へ還元して気化させる。AsH₃・H₂Seの「水素化物発生」と生成種が違う。</li>'+
 '<li><b>六価クロム・形態別分析：</b>Cr(VI)そのものが測定対象。保存・前処理でCr(III)へ還元して失わない。排水処理でのCr(VI)→Cr(III)還元と、Cr(VI)を測る分析を混同しない。</li></ul>'+
 '<p><b>試験の判断順：</b>①全量か形態別か → ②分解・回収が必要か → ③測定直前にどの化学種へ変えるか → ④何を気相へ導くか。ICP-MS等の直接導入法に、水素化物発生法の予備還元を無条件で当てはめない。実際の操作条件は試料と採用する公定法で確認する。</p>'+
 '<p>根拠：<a href="https://www.env.go.jp/content/000346612.pdf" target="_blank" rel="noopener noreferrer">環境省・産業廃棄物の検定方法に係る分析操作マニュアル（第3版）</a>の各元素の方法と留意点。</p>'+
 '</div></details>';
ids.forEach(function(id){var q=bank.find(function(x){return x.id===id;});if(!q||typeof q.p!=='string')throw Error('Missing valence guide target '+id);if(q.p.indexOf('water1-valence-guide')!==-1)throw Error('Duplicate valence guide '+id);q.p+=' '+guide;q.contentReviewVersion='v98';});
window.WATER1_VALENCE_GUIDE_V98={version:'v98',changed:ids};
})();
