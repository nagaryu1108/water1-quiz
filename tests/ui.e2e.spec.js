const {test,expect}=require('@playwright/test');

async function openQuiz(page){
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.ch')).toHaveCount(5);
  await page.waitForFunction(()=>window.WATER1_UI_RELEASE&&/^v\d+$/.test(window.WATER1_UI_RELEASE.release));
  const release=await page.evaluate(()=>window.WATER1_UI_RELEASE.release);
  await expect(page.locator('.ver')).toContainText('問題バンク '+release);
  return release;
}

test('approved quiz UI flow is preserved on mobile',async({page})=>{
  const release=await openQuiz(page);
  await expect(page).toHaveTitle(new RegExp('問題バンク '+release));
  await expect(page.locator('#poolStatus')).toHaveText('通常出題 199問 ｜ 安定ID 200件 ｜ アーカイブ 1問');
  await expect(page.locator('#audit')).toBeHidden();
  await page.waitForFunction(()=>!!window.WATER1_REGRESSION_AUDIT);
  await expect(page.locator('#regressionWarn')).toBeHidden();
  const regression=await page.evaluate(()=>({questions:window.WATER1_REGRESSION_AUDIT.questions,checks:Array.isArray(window.WATER1_REGRESSION_AUDIT.checks)?window.WATER1_REGRESSION_AUDIT.checks.length:0,learnerAuditVisible:window.WATER1_UI_RELEASE&&window.WATER1_UI_RELEASE.learnerAuditVisible}));
  expect(regression.questions).toBeGreaterThanOrEqual(199);expect(regression.checks).toBeGreaterThan(0);expect(regression.learnerAuditVisible).toBe(false);
  await expect(page.locator('.ch.good')).toHaveCount(0);await expect(page.locator('.ch.bad')).toHaveCount(0);
  await page.waitForFunction(()=>window.WATER1_COMPACT_MENU&&window.WATER1_COMPACT_MENU.installed);await page.locator('#studyMenuToggle').click();await expect(page.locator('#studyMenuPanel')).toBeVisible();const heights=await page.locator('.tools button').evaluateAll(btns=>btns.map(b=>b.getBoundingClientRect().height));expect(heights.every(h=>h>=44)).toBeTruthy();await page.locator('#studyMenuToggle').click();await expect(page.locator('#studyMenuPanel')).toBeHidden();
  const before=await page.evaluate(()=>({id:window.S.current,answer:window.getQ(window.S.current).a}));const wrong=(before.answer+1)%5;await page.locator('.ch').nth(wrong).click();
  await expect(page.locator('.ch.good')).toHaveCount(1);await expect(page.locator('.ch.bad')).toHaveCount(1);await expect(page.locator('.ch.good')).toContainText('✓ 正解');await expect(page.locator('.ch.bad')).toContainText('✕ あなたの回答');await expect(page.locator('#res')).toBeVisible();await expect(page.locator('#openall')).toBeVisible();await expect(page.locator('#next')).toBeVisible();
  const saved=await page.evaluate(id=>{const x=JSON.parse(localStorage.getItem('water1_bank_v3'));return {answered:x.currentAnswered,attempts:x.hist[id].attempts,lastSel:x.hist[id].lastSel};},before.id);expect(saved).toEqual({answered:true,attempts:1,lastSel:wrong});
  for(let i=0;i<5;i++){await page.locator('.ch').nth(i).click();await expect(page.locator('#e'+i)).toBeVisible();}
  await page.locator('#openall').click();for(let i=0;i<5;i++)await expect(page.locator('#e'+i)).toBeVisible();
  await page.locator('#next').click();await page.waitForFunction(oldId=>window.S.current!==oldId,before.id);await expect(page.locator('.ch')).toHaveCount(5);await expect(page.locator('.ch.good')).toHaveCount(0);await expect(page.locator('.ch.bad')).toHaveCount(0);await expect(page.locator('#res')).toBeHidden();
});

test('visual questions stay readable without widening the mobile page',async({page})=>{
  await openQuiz(page);await page.evaluate(()=>{localStorage.setItem('water1_bank_v3',JSON.stringify({hist:{},mode:'coverage',current:'G38',total:0,correct:0,currentAnswered:false,currentSel:null}));});await page.reload({waitUntil:'domcontentloaded'});await expect(page.locator('#visual')).toBeVisible();
  const metrics=await page.locator('#visual').evaluate(el=>{const content=el.querySelector('svg,table');return {clientWidth:el.clientWidth,scrollWidth:el.scrollWidth,contentWidth:content?content.getBoundingClientRect().width:0,documentWidth:document.documentElement.scrollWidth,viewportWidth:window.innerWidth};});expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);expect(metrics.contentWidth).toBeGreaterThanOrEqual(540);expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth+1);
});

test('stage 2 wastewater table question works on mobile',async({page})=>{
  await openQuiz(page);await page.waitForFunction(()=>window.getQ&&window.getQ('T22')&&window.getQ('T22').examDifficultyStage==='v48-stage2');
  const forced=await page.evaluate(()=>{const q=window.getQ('T22');window.S.current='T22';window.S.currentAnswered=false;window.S.currentSel=null;window.S.hist={};window.S.total=0;window.S.correct=0;window.render();return {id:window.S.current,marker:q.examDifficultyStage,answer:q.a};});expect(forced).toEqual({id:'T22',marker:'v48-stage2',answer:1});
  await expect(page.locator('#q')).toContainText('乾燥固形物量1.0 t/日');await expect(page.locator('.ch')).toHaveCount(5);await expect(page.locator('#visual')).toBeVisible();await expect(page.locator('#visual table')).toBeVisible();await expect(page.locator('#visual')).toContainText('脱水方式の比較');
  await page.locator('.ch').nth(0).click();await expect(page.locator('.ch').nth(0)).toHaveClass(/bad/);await expect(page.locator('.ch').nth(1)).toHaveClass(/good/);await page.locator('.ch').nth(1).click();await expect(page.locator('#e1')).toBeVisible();await expect(page.locator('#e1')).toContainText('0.83 t/日');
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('water1_bank_v3')).hist.T22);expect(saved.attempts).toBe(1);expect(saved.lastSel).toBe(0);
});

test('stage 3 hazardous-substance table question works on mobile',async({page})=>{
  await openQuiz(page);await page.waitForFunction(()=>window.getQ&&window.getQ('H12')&&window.getQ('H12').examDifficultyStage==='v49-stage3');
  const forced=await page.evaluate(()=>{const q=window.getQ('H12');window.S.current='H12';window.S.currentAnswered=false;window.S.currentSel=null;window.S.hist={};window.S.total=0;window.S.correct=0;window.render();return {id:window.S.current,marker:q.examDifficultyStage,answer:q.a};});
  expect(forced.id).toBe('H12');expect(forced.marker).toBe('v49-stage3');await expect(page.locator('#visual table')).toBeVisible();await expect(page.locator('#visual')).toContainText('鉄塩凝集試験');await expect(page.locator('#q')).toContainText('As(III)');
  const wrong=(forced.answer+1)%5;await page.locator('.ch').nth(wrong).click();await expect(page.locator('.ch').nth(wrong)).toHaveClass(/bad/);await expect(page.locator('.ch').nth(forced.answer)).toHaveClass(/good/);await page.locator('.ch').nth(forced.answer).click();await expect(page.locator('#e'+forced.answer)).toBeVisible();await expect(page.locator('#e'+forced.answer)).toContainText('リン酸');
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('water1_bank_v3')).hist.H12);expect(saved.attempts).toBe(1);expect(saved.lastSel).toBe(wrong);
});

test('v55 G37 does not print the answer percentages and requires calculation',async({page})=>{
  await openQuiz(page);await page.waitForFunction(()=>window.getQ&&window.getQ('G37')&&window.getQ('G37').directVisualDifficulty==='v55');
  const forced=await page.evaluate(()=>{const q=window.getQ('G37');window.S.current='G37';window.S.currentAnswered=false;window.S.currentSel=null;window.S.hist={};window.S.total=0;window.S.correct=0;window.render();return {answer:q.a,marker:q.directVisualDifficulty};});
  expect(forced).toEqual({answer:2,marker:'v55'});await expect(page.locator('#q')).toContainText('割合をそれぞれ計算');await expect(page.locator('#visual table')).toBeVisible();
  const visualText=await page.locator('#visual').innerText();expect(visualText).not.toContain('41.1%');expect(visualText).not.toContain('72.5%');expect(visualText).not.toContain('建設作業の割合');
  await page.locator('.ch').nth(0).click();await expect(page.locator('.ch').nth(2)).toHaveClass(/good/);await page.locator('.ch').nth(2).click();await expect(page.locator('#e2')).toContainText('8,166/19,886');await expect(page.locator('#e2')).toContainText('LAeq');
});

test('v55 L37 nutrient-addition graph agrees with the keyed N-limitation conclusion',async({page})=>{
  await openQuiz(page);await page.waitForFunction(()=>window.getQ&&window.getQ('L37')&&window.getQ('L37').directVisualDifficulty==='v55');
  const state=await page.evaluate(()=>{const q=window.getQ('L37');window.S.current='L37';window.S.currentAnswered=false;window.S.currentSel=null;window.S.hist={};window.S.total=0;window.S.correct=0;window.render();const m=Object.fromEntries(q.v.series.map(s=>[s.label,s.y[s.y.length-1]]));return {answer:q.a,marker:q.directVisualDifficulty,n:m['+N'],p:m['+P'],np:m['+N+P'],correct:q.o[q.a]};});
  expect(state.answer).toBe(0);expect(state.marker).toBe('v55');expect(state.n).toBeGreaterThan(state.p+1);expect(Math.abs(state.np-state.n)).toBeLessThanOrEqual(0.15);expect(state.correct).toContain('窒素が主要な制限栄養塩');
  await expect(page.locator('#visual')).toBeVisible();await page.locator('.ch').nth(0).click();await expect(page.locator('.ch').nth(0)).toHaveClass(/good/);await page.locator('.ch').nth(0).click();await expect(page.locator('#e0')).toContainText('窒素制限');
});

test('service worker supports an offline reload including versioned assets',async({page,context})=>{
  const release=await openQuiz(page);await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  try{await page.reload({waitUntil:'domcontentloaded'});await expect(page.locator('.ver')).toContainText('問題バンク '+release);await expect(page.locator('.ch')).toHaveCount(5);await expect(page.locator('#poolStatus')).toContainText('通常出題 199問');await expect(page.locator('#audit')).toBeHidden();await page.waitForFunction(()=>!!window.WATER1_REGRESSION_AUDIT);await expect(page.locator('#regressionWarn')).toBeHidden();}finally{await context.setOffline(false);}
});