const {test,expect}=require('@playwright/test');
async function open(page){await page.goto('/index.html',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.WATER1_REVIEW_V63&&window.WATER1_STUDY_WORKFLOW?.installed);}
test('v63 migrates changed answer presentation without losing statistics',async({page})=>{
 await page.addInitScript(()=>{if(!localStorage.getItem('water1_bank_v3'))localStorage.setItem('water1_bank_v3',JSON.stringify({bankContentVersion:'v62',hist:{H07:{attempts:9,correct:5,wrong:4,lastSel:1,dueAt:1900000000000}},reviewFlags:{H07:true},current:'H07',currentSel:1,currentAnswered:true,total:9,correct:5,mode:'coverage'}));});
 await open(page);await expect(page.locator('#res')).toBeHidden();await expect(page.locator('#q')).toContainText('排水処理と排水基準に係る分析操作');
 const s=await page.evaluate(()=>window.S);expect(s.total).toBe(9);expect(s.correct).toBe(5);expect(s.hist.H07.attempts).toBe(9);expect(s.hist.H07.wrong).toBe(4);expect(s.hist.H07.lastSel).toBeNull();expect(s.reviewFlags.H07).toBe(true);
});
test('v63 changed questions retain five inline explanations on mobile',async({page})=>{
 test.setTimeout(180000);await open(page);const ids=await page.evaluate(()=>window.WATER1_REVIEW_V63.changed);
 for(const id of ids){
  const q=await page.evaluate(id=>{window.S.current=id;window.S.currentAnswered=false;window.S.currentSel=null;window.render();const q=window.getQ(id);return {a:q.a,e:q.e};},id);
  await expect(page.locator('.ch')).toHaveCount(5);await page.locator('.ch').nth(q.a).click();await expect(page.locator('.ch.good')).toHaveCount(1);await page.locator('#openall').click();
  for(let i=0;i<5;i++){await expect(page.locator('#e'+i)).toBeVisible();await expect(page.locator('#e'+i)).toHaveText(q.e[i]);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth),id).toBeLessThanOrEqual(1);
 }
});
test('v63 offline reload retains primary-source patch',async({page,context})=>{
 await open(page);await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>navigator.serviceWorker.controller);
 await context.setOffline(true);await page.reload({waitUntil:'domcontentloaded'});
 expect(await page.evaluate(()=>window.WATER1_REVIEW_V63.version)).toBe('v63');expect(await page.evaluate(()=>window.QBANK.length)).toBe(199);
 await expect(page.locator('.ver')).toContainText('v63');await context.setOffline(false);
});