const {test,expect}=require('@playwright/test');

test('stage 4 water-overview data question works on mobile',async({page})=>{
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.ch')).toHaveCount(5);
  await page.waitForFunction(()=>window.getQ&&window.getQ('W07')&&window.getQ('W07').examDifficultyStage==='v50-stage4');
  const forced=await page.evaluate(()=>{
    const q=window.getQ('W07');
    window.S.current='W07';window.S.currentAnswered=false;window.S.currentSel=null;window.S.hist={};window.S.total=0;window.S.correct=0;window.render();
    return {id:window.S.current,marker:q.examDifficultyStage,answer:q.a};
  });
  expect(forced.id).toBe('W07');expect(forced.marker).toBe('v50-stage4');
  await expect(page.locator('#visual table')).toBeVisible();
  await expect(page.locator('#visual')).toContainText('底層水の季節変化');
  await expect(page.locator('#q')).toContainText('夏季成層');
  const wrong=(forced.answer+1)%5;
  await page.locator('.ch').nth(wrong).click();
  await expect(page.locator('.ch').nth(wrong)).toHaveClass(/bad/);
  await expect(page.locator('.ch').nth(forced.answer)).toHaveClass(/good/);
  await page.locator('.ch').nth(forced.answer).click();
  await expect(page.locator('#e'+forced.answer)).toBeVisible();
  await expect(page.locator('#e'+forced.answer)).toContainText('ORP');
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('water1_bank_v3')).hist.W07);
  expect(saved.attempts).toBe(1);expect(saved.lastSel).toBe(wrong);
});
