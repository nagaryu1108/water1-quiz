const {test,expect}=require('@playwright/test');

test('v60 W39 no longer collapses into a threshold-value duel',async({page})=>{
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.WATER1_CHOICE_INDEPENDENCE&&window.WATER1_CHOICE_INDEPENDENCE.version==='v60');
  const st=await page.evaluate(()=>{
    const q=window.getQ('W39');
    window.S.current='W39';window.S.currentAnswered=false;window.S.currentSel=null;window.save();window.render();
    return {choices:q.o.slice(),answer:q.a,explanations:q.e.slice(),prompt:q.q};
  });
  expect(st.answer).toBe(1);
  expect(st.choices).toHaveLength(5);
  expect(st.choices[0]).not.toMatch(/4\.0|3\.0|2\.0/);
  expect(st.choices[1]).not.toContain('1.0 mg/L');
  expect(st.choices[1]).toContain('日間平均値は用いない');
  expect(st.choices.filter(x=>x.includes('基準値')).length).toBeLessThanOrEqual(1);
  await page.locator('.ch').nth(1).click();
  await expect(page.locator('.ch').nth(1)).toHaveClass(/good/);
  await expect(page.locator('#res')).toContainText('生物1=4.0');
  await expect(page.locator('#res')).toContainText('生物3=2.0');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});