const {test,expect}=require('@playwright/test');

async function openAndForce(page,id){
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.ch')).toHaveCount(5);
  await page.waitForFunction(()=>window.WATER1_UI_RELEASE&&window.WATER1_UI_RELEASE.release==='v53'&&window.WATER1_VISUAL_AID_AUDIT&&window.WATER1_VISUAL_AID_RELEASE);
  return await page.evaluate(id=>{
    const q=window.getQ(id);
    window.S.current=id;window.S.currentAnswered=false;window.S.currentSel=null;window.S.hist={};window.S.total=0;window.S.correct=0;window.render();
    return {id:q.id,answer:q.a,priority:q.visualAidPriority,rendered:q.visualAidRendered};
  },id);
}

async function answerWrong(page,answer){
  const wrong=(answer+1)%5;
  await page.locator('.ch').nth(wrong).click();
  await expect(page.locator('#res')).toBeVisible();
  await expect(page.locator('.ch').nth(answer)).toHaveClass(/good/);
  await expect(page.locator('.ch').nth(wrong)).toHaveClass(/bad/);
}

test('v53 audit covers all 199 active questions exactly once',async({page})=>{
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.WATER1_VISUAL_AID_AUDIT&&window.WATER1_VISUAL_AID_RELEASE);
  const m=await page.evaluate(()=>({
    rows:window.WATER1_VISUAL_AID_AUDIT.rows.length,
    counts:window.WATER1_VISUAL_AID_AUDIT.counts,
    release:window.WATER1_VISUAL_AID_RELEASE,
    active:window.QBANK.length,
    archived:(window.WATER1_ARCHIVED_QUESTIONS||[]).map(q=>q.id)
  }));
  expect(m.active).toBe(199);expect(m.rows).toBe(199);expect(m.counts).toEqual({active:199,high:64,medium:60,none:75});expect(m.release.version).toBe('v53');expect(m.archived).toEqual(['L30']);
});

test('new HIGH visual is expanded in the answer explanation on mobile',async({page})=>{
  const q=await openAndForce(page,'T30');
  expect(q.priority).toBe('high');expect(q.rendered).toBe('v53-high');
  await answerWrong(page,q.answer);
  const aid=page.locator('#res [data-v53-aid="T30"]');
  await expect(aid).toBeVisible();await expect(aid).toContainText('不連続点塩素処理');await expect(aid).toContainText('遊離残留塩素');
  const metrics=await aid.evaluate(el=>({right:el.getBoundingClientRect().right,viewport:window.innerWidth,doc:document.documentElement.scrollWidth}));
  expect(metrics.right).toBeLessThanOrEqual(metrics.viewport+1);expect(metrics.doc).toBeLessThanOrEqual(metrics.viewport+1);
});

test('MEDIUM visual is collapsible and can be opened under the core explanation',async({page})=>{
  const q=await openAndForce(page,'T10');
  expect(q.priority).toBe('medium');expect(q.rendered).toBe('v53-medium');
  await answerWrong(page,q.answer);
  const details=page.locator('#res details[data-v53-aid="T10"]');
  await expect(details).toBeVisible();expect(await details.getAttribute('open')).toBeNull();
  await details.locator('summary').click();expect(await details.getAttribute('open')).not.toBeNull();await expect(details).toContainText('判断マップ');await expect(details).toContainText('支配機構');
});

test('v52 L33 flow remains HIGH with formatted NH₃/H₂S and two branches',async({page})=>{
  const q=await openAndForce(page,'L33');
  expect(q.priority).toBe('high');expect(q.rendered).toBe('v52-existing');
  await expect(page.locator('.ch').nth(4)).toContainText('NH₃');await expect(page.locator('.ch').nth(4)).toContainText('H₂S');
  await answerWrong(page,q.answer);
  const aid=page.locator('#res [data-flow-id="L33"]');await expect(aid).toBeVisible();await expect(aid.locator('.water1-flow-branch')).toHaveCount(2);await expect(aid).toContainText('SWS');await expect(aid).toContainText('API分離');await expect(aid).toContainText('DAF');
});
