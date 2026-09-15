const {test,expect}=require('@playwright/test');

async function force(page,id){
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction((qid)=>window.getQ&&window.getQ(qid)&&window.getQ(qid).legalFillinVersion==='v56',id);
  return await page.evaluate((qid)=>{
    const q=window.getQ(qid);
    window.S.current=qid;window.S.currentAnswered=false;window.S.currentSel=null;window.S.hist={};window.S.total=0;window.S.correct=0;window.render();
    return {answer:q.a,q:q.q,choices:q.o};
  },id);
}

test('v56 Environment Basic Act fill-in works on mobile',async({page})=>{
  const f=await force(page,'G01');
  await expect(page.locator('#meta')).toContainText('法文穴埋め・語句組合せ');
  await expect(page.locator('#q')).toContainText('（ア）');
  await expect(page.locator('#q')).toContainText('環境基本法第16条');
  await expect(page.locator('.ch')).toHaveCount(5);
  const wrong=(f.answer+1)%5;
  await page.locator('.ch').nth(wrong).click();
  await expect(page.locator('.ch').nth(wrong)).toHaveClass(/bad/);
  await expect(page.locator('.ch').nth(f.answer)).toHaveClass(/good/);
  await page.locator('.ch').nth(wrong).click();
  await expect(page.locator('#e'+wrong)).toBeVisible();
  await expect(page.locator('#e'+wrong)).toContainText('正しい文章');
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('water1_bank_v3')).hist.G01);
  expect(saved.attempts).toBe(1);expect(saved.lastSel).toBe(wrong);
});

test('v56 pollution-control organization numeric combination works on mobile',async({page})=>{
  const f=await force(page,'G07');
  await expect(page.locator('#q')).toContainText('60');
  await expect(page.locator('#q')).toContainText('（エ）');
  await expect(page.locator('.ch').nth(f.answer)).toContainText('都道府県知事等');
  await page.locator('.ch').nth(f.answer).click();
  await expect(page.locator('.ch').nth(f.answer)).toHaveClass(/good/);
  await expect(page.locator('#res')).toContainText('✓ 正解');
  await page.locator('.ch').nth(f.answer).click();
  await expect(page.locator('#e'+f.answer)).toBeVisible();
  await expect(page.locator('#e'+f.answer)).toContainText('60日');
});
