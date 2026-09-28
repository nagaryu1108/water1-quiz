const {test,expect}=require('@playwright/test');
async function open(page){await page.goto('/index.html',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.WATER1_REVIEW_V63&&window.WATER1_STUDY_WORKFLOW?.installed);}
test('v63 retains v62 learning history and clears only rewritten answer presentation',async({page})=>{
 await page.addInitScript(()=>{if(!localStorage.getItem('water1_bank_v3'))localStorage.setItem('water1_bank_v3',JSON.stringify({
  bankContentVersion:'v62',hist:{G16:{attempts:9,correct:6,wrong:3,lastSel:2,dueAt:1900000000000},G01:{attempts:2,correct:2,wrong:0,lastSel:0,dueAt:1901000000000}},
  reviewFlags:{G16:true},bookmarks:{G16:true},current:'G16',currentSel:2,currentAnswered:true,total:11,correct:8,mode:'coverage'
 }));});
 await open(page);
 await expect(page.locator('#res')).toBeHidden();
 const s=await page.evaluate(()=>window.S);
 expect(s.total).toBe(11);expect(s.correct).toBe(8);expect(s.hist.G16.attempts).toBe(9);expect(s.hist.G16.correct).toBe(6);expect(s.hist.G16.wrong).toBe(3);
 expect(s.hist.G16.lastSel).toBeNull();expect(s.hist.G16.previousV62Selection.index).toBe(2);expect(s.hist.G16.dueAt).toBe(1900000000000);
 expect(s.hist.G01.lastSel).toBe(0);expect(s.reviewFlags.G16).toBe(true);expect(s.bookmarks.G16).toBe(true);
});
test('v63 all 15 strengthened questions retain approved inline interaction and mobile width',async({page})=>{
 test.setTimeout(180000);await open(page);
 const ids=await page.evaluate(()=>window.WATER1_REVIEW_V63.changed);
 expect(ids).toHaveLength(15);
 for(const id of ids){
  const q=await page.evaluate(id=>{window.S.current=id;window.S.currentAnswered=false;window.S.currentSel=null;window.render();const q=window.getQ(id);return {a:q.a,e:q.e,o:q.o};},id);
  await expect(page.locator('.ch')).toHaveCount(5);await expect(page.locator('#res')).toBeHidden();
  const wrong=(q.a+1)%5;await page.locator('.ch').nth(wrong).click();
  await expect(page.locator('.ch.good')).toHaveCount(1);await expect(page.locator('.ch.bad')).toHaveCount(1);
  for(let i=0;i<5;i++){
   await page.locator('.ch').nth(i).click();await expect(page.locator('#e'+i)).toBeVisible();await expect(page.locator('#e'+i)).toHaveText(q.e[i]);
   expect(await page.locator('.ch').nth(i).evaluate((el,n)=>el.nextElementSibling.id==='e'+n,i)).toBe(true);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth),id).toBeLessThanOrEqual(1);
 }
 await expect(page.locator('.ver')).toContainText('v63');
 expect(await page.evaluate(()=>window.QBANK.length)).toBe(199);
});
test('v63 service worker caches the new review layer for offline reload',async({page,context})=>{
 await open(page);await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>navigator.serviceWorker.controller);
 await context.setOffline(true);await page.reload({waitUntil:'domcontentloaded'});
 expect(await page.evaluate(()=>window.WATER1_REVIEW_V63.version)).toBe('v63');expect(await page.evaluate(()=>window.QBANK.length)).toBe(199);
 await expect(page.locator('.ver')).toContainText('v63');await context.setOffline(false);
});
