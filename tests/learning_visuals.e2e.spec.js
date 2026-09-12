const {test,expect}=require('@playwright/test');

async function openQuiz(page){
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.ch')).toHaveCount(5);
  await page.waitForFunction(()=>window.WATER1_UI_RELEASE&&window.WATER1_UI_RELEASE.release==='v52');
}

test('L33 renders chemical subscripts and branched refinery treatment flow on mobile',async({page})=>{
  await openQuiz(page);
  await page.waitForFunction(()=>window.getQ&&window.getQ('L33')&&window.WATER1_LEARNING_VISUALS&&window.WATER1_LEARNING_VISUALS.version==='v52');
  const forced=await page.evaluate(()=>{
    const q=window.getQ('L33');
    window.S.current='L33';window.S.currentAnswered=false;window.S.currentSel=null;window.S.hist={};window.S.total=0;window.S.correct=0;window.render();
    return {answer:q.a,choice5:q.o[4],flow:q.learningFlowVersion};
  });
  expect(forced.flow).toBe('v52');
  expect(forced.choice5).toContain('NH₃');expect(forced.choice5).toContain('H₂S');
  expect(forced.choice5).not.toMatch(/\bNH3\b|\bH2S\b/);
  await expect(page.locator('.ch').nth(4)).toContainText('NH₃');await expect(page.locator('.ch').nth(4)).toContainText('H₂S');

  await page.locator('.ch').nth(4).click();
  const flow=page.locator('#res .water1-flow[data-flow-id="L33"]');
  await expect(flow).toBeVisible();
  await expect(flow).toContainText('SWS');await expect(flow).toContainText('API分離');await expect(flow).toContainText('DAF');await expect(flow).toContainText('生物処理');await expect(flow).toContainText('NH₃');await expect(flow).toContainText('H₂S');
  await expect(flow.locator('.water1-flow-branch')).toHaveCount(2);
  const widths=await page.evaluate(()=>({documentWidth:document.documentElement.scrollWidth,viewportWidth:window.innerWidth}));
  expect(widths.documentWidth).toBeLessThanOrEqual(widths.viewportWidth+1);
});
