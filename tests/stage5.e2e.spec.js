const {test,expect}=require('@playwright/test');

test('stage 5 pollution-general calculation question works on mobile',async({page})=>{
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.ch')).toHaveCount(5);
  await page.waitForFunction(()=>window.getQ&&window.getQ('G27')&&window.getQ('G27').examDifficultyStage==='v51-stage5');
  const forced=await page.evaluate(()=>{
    const q=window.getQ('G27');
    window.S.current='G27';window.S.currentAnswered=false;window.S.currentSel=null;window.S.hist={};window.S.total=0;window.S.correct=0;window.render();
    return {id:window.S.current,marker:q.examDifficultyStage,answer:q.a};
  });
  expect(forced.id).toBe('G27');expect(forced.marker).toBe('v51-stage5');
  await expect(page.locator('#visual table')).toBeVisible();
  await expect(page.locator('#visual')).toContainText('生活排水負荷の計算条件');
  await expect(page.locator('#q')).toContainText('人口2,000人');
  const wrong=(forced.answer+1)%5;
  await page.locator('.ch').nth(wrong).click();
  await expect(page.locator('.ch').nth(wrong)).toHaveClass(/bad/);
  await expect(page.locator('.ch').nth(forced.answer)).toHaveClass(/good/);
  await page.locator('.ch').nth(forced.answer).click();
  await expect(page.locator('#e'+forced.answer)).toBeVisible();
  await expect(page.locator('#e'+forced.answer)).toContainText('15.68');
  await expect(page.locator('#e'+forced.answer)).toContainText('8.704');
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('water1_bank_v3')).hist.G27);
  expect(saved.attempts).toBe(1);expect(saved.lastSel).toBe(wrong);
});
