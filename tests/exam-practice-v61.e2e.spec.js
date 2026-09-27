const {test,expect}=require('@playwright/test');
const fixture=require('./history-fixture-v61.json');
async function open(page){await page.goto('/index.html',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.WATER1_EXAM_PRACTICE_V61&&window.WATER1_STUDY_WORKFLOW&&window.WATER1_STUDY_WORKFLOW.installed);}
test('v61 preserves pre-upgrade selections, counts and due dates after reload',async({page})=>{
 await page.addInitScript(f=>{
  if(!localStorage.getItem('water1_bank_v3'))localStorage.setItem('water1_bank_v3',JSON.stringify({hist:{[f.id]:{attempts:4,correct:3,wrong:1,lastSel:f.oldAnswer,dueAt:1900000000000}},current:f.id,currentSel:f.oldAnswer,currentAnswered:true,total:4,correct:3,mode:'coverage',reviewFlags:{[f.id]:true}}));
 },fixture);
 await open(page);const dest=fixture.order.indexOf(fixture.oldAnswer);
 await expect(page.locator('.ch').nth(dest)).toContainText(fixture.oldOptions[fixture.oldAnswer]);
 await expect(page.locator('.ch').nth(dest)).toHaveClass(/good/);
 const state=await page.evaluate(()=>JSON.parse(localStorage.getItem('water1_bank_v3')));
 expect(state.total).toBe(4);expect(state.correct).toBe(3);expect(state.hist[fixture.id].lastSel).toBe(dest);expect(state.hist[fixture.id].attempts).toBe(4);expect(state.hist[fixture.id].dueAt).toBe(1900000000000);expect(state.reviewFlags[fixture.id]).toBe(true);
 await page.reload({waitUntil:'domcontentloaded'});await expect(page.locator('.ch').nth(dest)).toHaveClass(/good/);
 expect(await page.evaluate(()=>window.S.currentSel)).toBe(dest);
});
test('v61 rewritten current question clears only stale answer presentation',async({page})=>{
 await page.addInitScript(()=>{if(!localStorage.getItem('water1_bank_v3'))localStorage.setItem('water1_bank_v3',JSON.stringify({hist:{W31:{attempts:6,correct:4,wrong:2,lastSel:0}},current:'W31',currentSel:0,currentAnswered:true,total:6,correct:4,mode:'coverage'}));});
 await open(page);await expect(page.locator('#q')).toContainText('28 mg/L');await expect(page.locator('#res')).toBeHidden();await expect(page.locator('.ch.good')).toHaveCount(0);
 const x=await page.evaluate(()=>({total:window.S.total,h:window.S.hist.W31}));expect(x.total).toBe(6);expect(x.h.correct).toBe(4);expect(x.h.wrong).toBe(2);expect(x.h.lastSel).toBeNull();expect(x.h.previousContentSelection.index).toBe(0);
});
test('v61 all revised questions keep the approved inline explanations and mobile width',async({page})=>{
 test.setTimeout(90000);
 await open(page);const ids=await page.evaluate(()=>window.WATER1_EXAM_PRACTICE_V61.rewritten);
 for(const id of ids){
  const a=await page.evaluate(id=>{window.S.current=id;window.S.currentAnswered=false;window.S.currentSel=null;window.render();return window.getQ(id).a;},id);
  await expect(page.locator('.ch')).toHaveCount(5);await expect(page.locator('#res')).toBeHidden();await page.locator('.ch').nth((a+1)%5).click();
  await expect(page.locator('.ch.good')).toHaveCount(1);await expect(page.locator('.ch.bad')).toHaveCount(1);
  for(let i=0;i<5;i++){await page.locator('.ch').nth(i).click();await expect(page.locator('#e'+i)).toBeVisible();await expect(page.locator('#e'+i)).toContainText('実務');const adjacent=await page.locator('.ch').nth(i).evaluate((el,n)=>el.nextElementSibling.id==='e'+n,i);expect(adjacent).toBe(true);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBeLessThanOrEqual(1);
 }
});
