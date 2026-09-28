const {test,expect}=require('@playwright/test');
async function open(page){await page.goto('/index.html',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.WATER1_REVIEW_V62&&window.WATER1_PRIMARY_SOURCE_V63&&window.WATER1_STUDY_WORKFLOW?.installed);}
test('v62 retains v61 scores/bookmarks but clears changed answer presentation once',async({page})=>{
 await page.addInitScript(()=>{if(!localStorage.getItem('water1_bank_v3'))localStorage.setItem('water1_bank_v3',JSON.stringify({bankContentVersion:'v61',hist:{W15:{attempts:6,correct:4,wrong:2,lastSel:1,dueAt:1900000000000}},reviewFlags:{W15:true},current:'W15',currentSel:1,currentAnswered:true,total:6,correct:4,mode:'coverage'}));});
 await open(page);await expect(page.locator('#res')).toBeHidden();await expect(page.locator('.ch').nth(1)).toContainText('腎近位尿細管');
 const s=await page.evaluate(()=>window.S);expect(s.total).toBe(6);expect(s.correct).toBe(4);expect(s.hist.W15.lastSel).toBeNull();expect(s.hist.W15.dueAt).toBe(1900000000000);expect(s.reviewFlags.W15).toBe(true);
 await page.locator('.ch').nth(3).click();await page.reload({waitUntil:'domcontentloaded'});
 await expect(page.locator('.ch').nth(3)).toHaveClass(/good/);expect(await page.evaluate(()=>window.S.total)).toBe(7);expect(await page.evaluate(()=>window.S.currentSel)).toBe(3);
});
test('v62 all changed content keeps inline explanations and mobile layout',async({page})=>{
 test.setTimeout(180000);await open(page);const ids=await page.evaluate(()=>window.WATER1_REVIEW_V62.changed);
 for(const id of ids){
  const q=await page.evaluate(id=>{window.S.current=id;window.S.currentAnswered=false;window.S.currentSel=null;window.render();const q=window.getQ(id);return {a:q.a,e:q.e};},id);
  await expect(page.locator('.ch')).toHaveCount(5);await expect(page.locator('#res')).toBeHidden();
  await page.locator('.ch').nth(q.a).click();await expect(page.locator('.ch.good')).toHaveCount(1);await page.locator('#openall').click();
  for(let i=0;i<5;i++){await expect(page.locator('#e'+i)).toBeVisible();await expect(page.locator('#e'+i)).toHaveText(q.e[i]);expect(await page.locator('.ch').nth(i).evaluate((el,n)=>el.nextElementSibling.id==='e'+n,i)).toBe(true);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth),id).toBeLessThanOrEqual(1);
 }
});
test('v62 offline reload retains the content patch',async({page,context})=>{
 await open(page);await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>navigator.serviceWorker.controller);
 await context.setOffline(true);await page.reload({waitUntil:'domcontentloaded'});
 expect(await page.evaluate(()=>window.WATER1_REVIEW_V62.version)).toBe('v62');expect(await page.evaluate(()=>window.WATER1_PRIMARY_SOURCE_V63.version)).toBe('v63');expect(await page.evaluate(()=>window.QBANK.length)).toBe(198);
 await context.setOffline(false);
});
