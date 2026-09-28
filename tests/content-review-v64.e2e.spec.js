const {test,expect}=require('@playwright/test');
async function open(page){await page.goto('/index.html',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.WATER1_REVIEW_V64&&window.WATER1_STUDY_WORKFLOW?.installed);}
test('v64 migrates only stale answer presentation',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('water1_bank_v3',JSON.stringify({bankContentVersion:'v63',hist:{H35:{attempts:8,correct:5,wrong:3,lastSel:1,dueAt:1900000000000}},current:'H35',currentSel:1,currentAnswered:true,total:8,correct:5,mode:'coverage'})));
 await open(page);await expect(page.locator('#res')).toBeHidden();await expect(page.locator('#q')).toContainText('全シアン');
 const s=await page.evaluate(()=>window.S);expect(s.total).toBe(8);expect(s.correct).toBe(5);expect(s.hist.H35.attempts).toBe(8);expect(s.hist.H35.wrong).toBe(3);expect(s.hist.H35.lastSel).toBeNull();
});
test('v64 all changed questions keep five inline explanations on mobile',async({page})=>{
 test.setTimeout(180000);await open(page);const ids=await page.evaluate(()=>window.WATER1_REVIEW_V64.changed);
 for(const id of ids){
  const q=await page.evaluate(id=>{window.S.current=id;window.S.currentAnswered=false;window.S.currentSel=null;window.render();const q=window.getQ(id);return {a:q.a,e:q.e};},id);
  await expect(page.locator('.ch')).toHaveCount(5);await page.locator('.ch').nth(q.a).click();await expect(page.locator('.ch.good')).toHaveCount(1);await page.locator('#openall').click();
  for(let i=0;i<5;i++){await expect(page.locator('#e'+i)).toBeVisible();await expect(page.locator('#e'+i)).toHaveText(q.e[i]);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth),id).toBeLessThanOrEqual(1);
 }
});
test('v64 offline cache contains review patch',async({page,context})=>{
 await open(page);await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>navigator.serviceWorker.controller);
 await context.setOffline(true);await page.reload({waitUntil:'domcontentloaded'});
 expect(await page.evaluate(()=>window.WATER1_REVIEW_V64.version)).toBe('v64');expect(await page.evaluate(()=>window.QBANK.length)).toBe(199);await expect(page.locator('.ver')).toContainText('v64');await context.setOffline(false);
});