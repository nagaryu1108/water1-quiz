const {test,expect}=require('@playwright/test');

async function openQuiz(page){
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.ch')).toHaveCount(5);
  await expect(page.locator('.ver')).toContainText('v45');
}

test('approved quiz UI flow is preserved on mobile',async({page})=>{
  await openQuiz(page);

  await expect(page).toHaveTitle(/問題バンク v45/);
  await expect(page.locator('#poolStatus')).toHaveText('通常出題 199問 ｜ 安定ID 200件 ｜ アーカイブ 1問');
  await expect(page.locator('#audit')).toBeHidden();
  await page.waitForFunction(()=>!!window.WATER1_REGRESSION_AUDIT);
  await expect(page.locator('#regressionWarn')).toBeHidden();
  const regression=await page.evaluate(()=>({
    questions:window.WATER1_REGRESSION_AUDIT.questions,
    checks:Array.isArray(window.WATER1_REGRESSION_AUDIT.checks)?window.WATER1_REGRESSION_AUDIT.checks.length:0,
    learnerAuditVisible:window.WATER1_UI_RELEASE&&window.WATER1_UI_RELEASE.learnerAuditVisible
  }));
  expect(regression.questions).toBeGreaterThanOrEqual(199);
  expect(regression.checks).toBeGreaterThan(0);
  expect(regression.learnerAuditVisible).toBe(false);
  await expect(page.locator('.ch.good')).toHaveCount(0);
  await expect(page.locator('.ch.bad')).toHaveCount(0);

  const heights=await page.locator('.tools button').evaluateAll(btns=>btns.map(b=>b.getBoundingClientRect().height));
  expect(heights.every(h=>h>=44)).toBeTruthy();

  const before=await page.evaluate(()=>({id:window.S.current,answer:window.getQ(window.S.current).a}));
  const wrong=(before.answer+1)%5;
  await page.locator('.ch').nth(wrong).click();

  await expect(page.locator('.ch.good')).toHaveCount(1);
  await expect(page.locator('.ch.bad')).toHaveCount(1);
  await expect(page.locator('.ch.good')).toContainText('✓ 正解');
  await expect(page.locator('.ch.bad')).toContainText('✕ あなたの回答');
  await expect(page.locator('#res')).toBeVisible();
  await expect(page.locator('#openall')).toBeVisible();
  await expect(page.locator('#next')).toBeVisible();

  const saved=await page.evaluate(id=>{
    const x=JSON.parse(localStorage.getItem('water1_bank_v3'));
    return {answered:x.currentAnswered,attempts:x.hist[id].attempts,lastSel:x.hist[id].lastSel};
  },before.id);
  expect(saved).toEqual({answered:true,attempts:1,lastSel:wrong});

  for(let i=0;i<5;i++){
    await page.locator('.ch').nth(i).click();
    await expect(page.locator('#e'+i)).toBeVisible();
  }

  await page.locator('#openall').click();
  for(let i=0;i<5;i++)await expect(page.locator('#e'+i)).toBeVisible();

  await page.locator('#next').click();
  await page.waitForFunction(oldId=>window.S.current!==oldId,before.id);
  await expect(page.locator('.ch')).toHaveCount(5);
  await expect(page.locator('.ch.good')).toHaveCount(0);
  await expect(page.locator('.ch.bad')).toHaveCount(0);
  await expect(page.locator('#res')).toBeHidden();
});

test('visual questions stay readable without widening the mobile page',async({page})=>{
  await openQuiz(page);
  await page.evaluate(()=>{
    localStorage.setItem('water1_bank_v3',JSON.stringify({
      hist:{},mode:'coverage',current:'G38',total:0,correct:0,currentAnswered:false,currentSel:null
    }));
  });
  await page.reload({waitUntil:'domcontentloaded'});
  await expect(page.locator('#visual')).toBeVisible();

  const metrics=await page.locator('#visual').evaluate(el=>{
    const content=el.querySelector('svg,table');
    return {
      clientWidth:el.clientWidth,
      scrollWidth:el.scrollWidth,
      contentWidth:content?content.getBoundingClientRect().width:0,
      documentWidth:document.documentElement.scrollWidth,
      viewportWidth:window.innerWidth
    };
  });
  expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);
  expect(metrics.contentWidth).toBeGreaterThanOrEqual(540);
  expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth+1);
});

test('service worker supports an offline reload including versioned assets',async({page,context})=>{
  await openQuiz(page);
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.waitForFunction(()=>!!navigator.serviceWorker.controller);

  await context.setOffline(true);
  try{
    await page.reload({waitUntil:'domcontentloaded'});
    await expect(page.locator('.ver')).toContainText('v45');
    await expect(page.locator('.ch')).toHaveCount(5);
    await expect(page.locator('#poolStatus')).toContainText('通常出題 199問');
    await expect(page.locator('#audit')).toBeHidden();
    await page.waitForFunction(()=>!!window.WATER1_REGRESSION_AUDIT);
    await expect(page.locator('#regressionWarn')).toBeHidden();
  }finally{
    await context.setOffline(false);
  }
});
