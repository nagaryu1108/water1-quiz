const {test,expect}=require('@playwright/test');

async function open(page){
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.WATER1_PRIMARY_SOURCE_V63&&window.WATER1_STUDY_WORKFLOW?.installed);
}

test('v63 archives only the genuine H04/H07 duplicate while preserving all stable IDs',async({page})=>{
  await open(page);
  const x=await page.evaluate(()=>({
    active:window.QBANK.length,
    activeIds:window.QBANK.map(q=>q.id),
    archived:(window.WATER1_ARCHIVED_QUESTIONS||[]).map(q=>q.id),
    changed:window.WATER1_PRIMARY_SOURCE_V63.changed
  }));
  expect(x.active).toBe(198);
  expect(x.activeIds).not.toContain('H04');
  expect(x.activeIds).toContain('H07');
  expect(x.archived).toEqual(expect.arrayContaining(['L30','H04']));
  expect(new Set([...x.activeIds,...x.archived]).size).toBe(200);
  expect(x.changed).toEqual(['G10','G23','G26','G29','G32','G33','W09','H01','H14','H16','H22','H37','H40']);
});

test('v63 keeps learning history but clears stale answer presentation',async({page})=>{
  await page.addInitScript(()=>{
    if(!localStorage.getItem('water1_bank_v3'))localStorage.setItem('water1_bank_v3',JSON.stringify({
      bankContentVersion:'v62',
      hist:{H14:{attempts:7,correct:4,wrong:3,lastSel:0,dueAt:1900000000000}},
      current:'H14',currentSel:0,currentAnswered:true,total:7,correct:4,mode:'weak',
      reviewFlags:{H14:true},unknown:{keep:true}
    }));
  });
  await open(page);
  const s=await page.evaluate(()=>window.S);
  expect(s.bankContentVersion).toBe('v63');
  expect(s.total).toBe(7);expect(s.correct).toBe(4);
  expect(s.hist.H14.attempts).toBe(7);expect(s.hist.H14.correct).toBe(4);expect(s.hist.H14.wrong).toBe(3);
  expect(s.hist.H14.dueAt).toBe(1900000000000);expect(s.hist.H14.lastSel).toBeNull();
  expect(s.reviewFlags.H14).toBe(true);expect(s.unknown).toEqual({keep:true});
  await expect(page.locator('#res')).toBeHidden();
});

test('v63 revised questions retain five choices, inline explanations and mobile width',async({page})=>{
  test.setTimeout(120000);
  await open(page);
  const ids=await page.evaluate(()=>window.WATER1_PRIMARY_SOURCE_V63.changed);
  for(const id of ids){
    const q=await page.evaluate(id=>{
      window.S.current=id;window.S.currentAnswered=false;window.S.currentSel=null;window.render();
      const q=window.getQ(id);return {a:q.a,e:q.e,q:q.q};
    },id);
    await expect(page.locator('.ch')).toHaveCount(5);
    await expect(page.locator('#res')).toBeHidden();
    await page.locator('.ch').nth(q.a).click();
    await expect(page.locator('.ch.good')).toHaveCount(1);
    await page.locator('#openall').click();
    for(let i=0;i<5;i++){
      await expect(page.locator('#e'+i)).toBeVisible();
      await expect(page.locator('#e'+i)).toHaveText(q.e[i]);
      expect(await page.locator('.ch').nth(i).evaluate((el,n)=>el.nextElementSibling.id==='e'+n,i),id).toBe(true);
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth),id).toBeLessThanOrEqual(1);
  }
});

test('v63 offline reload retains primary-source patch and compressed bank',async({page,context})=>{
  await open(page);
  await page.evaluate(()=>navigator.serviceWorker.ready);
  await page.reload();
  await page.waitForFunction(()=>navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  expect(await page.evaluate(()=>window.WATER1_PRIMARY_SOURCE_V63.version)).toBe('v63');
  expect(await page.evaluate(()=>window.QBANK.length)).toBe(198);
  expect(await page.evaluate(()=>(window.WATER1_ARCHIVED_QUESTIONS||[]).some(q=>q.id==='H04'))).toBe(true);
  await context.setOffline(false);
});
