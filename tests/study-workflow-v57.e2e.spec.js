const {test,expect}=require('@playwright/test');

async function open(page){
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.WATER1_STUDY_WORKFLOW&&window.WATER1_STUDY_WORKFLOW.installed);
  await expect(page.locator('.ch')).toHaveCount(5);
}
async function force(page,id){
  return page.evaluate((qid)=>{
    const q=window.getQ(qid);
    window.S.current=qid;window.S.currentAnswered=false;window.S.currentSel=null;window.S.hist={};window.S.total=0;window.S.correct=0;window.S.bookmarks={};window.S.reviewFlags={};window.S.studyView='quiz';window.S.mode='coverage';window.save();window.render();
    return {answer:q.a};
  },id);
}

test('v57 schedules 1-day review and due queue survives localStorage',async({page})=>{
  await open(page);const f=await force(page,'G01');
  const before=Date.now();
  await page.locator('.ch').nth(f.answer).click();
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('water1_bank_v3')).hist.G01);
  expect(saved.reviewStage).toBe(0);expect(saved.reviewIntervalDays).toBe(1);
  expect(saved.reviewDue).toBeGreaterThan(before+23*60*60*1000);
  await page.evaluate(()=>{window.S.hist.G01.reviewDue=Date.now()-1000;window.save();});
  await page.locator('#review').click();
  const state=await page.evaluate(()=>({mode:window.S.mode,current:window.S.current,due:window.WATER1_STUDY_WORKFLOW.reviewRows().filter(r=>r.dueNow).length}));
  expect(state.mode).toBe('review');expect(state.current).toBe('G01');expect(state.due).toBeGreaterThanOrEqual(1);
});

test('v57 bookmark and needs-review controls save immediately',async({page})=>{
  await open(page);const f=await force(page,'G02');
  await page.locator('#bookmarkBtn').click();
  let st=await page.evaluate(()=>JSON.parse(localStorage.getItem('water1_bank_v3')));
  expect(st.bookmarks.G02).toBe(true);
  await page.locator('.ch').nth(f.answer).click();
  await expect(page.locator('#confidenceBar')).toBeVisible();
  await page.locator('#needsReviewBtn').click();
  st=await page.evaluate(()=>JSON.parse(localStorage.getItem('water1_bank_v3')));
  expect(st.reviewFlags.G02).toBe(true);
  expect(st.hist.G02.reviewDue).toBeLessThanOrEqual(Date.now()+5000);
  await expect(page.locator('#scheduleNote')).toContainText('即時追加');
});

test('v57 separates official past exam mode and shows water-1 annual index',async({page})=>{
  await open(page);
  await page.locator('[data-study-view="past"]').click();
  await expect(page.locator('#pastExamPanel')).toBeVisible();
  await expect(page.locator('.card')).toBeHidden();
  await expect(page.locator('#pastExamPanel')).toContainText('2025（令和7年度）');
  await expect(page.locator('#pastExamPanel')).toContainText('2006（平成18年度）');
  await expect(page.locator('#pastExamPanel a[href*="R07_01.pdf"]')).toHaveCount(1);
  await expect(page.locator('#pastExamPanel a[href*="R07_07.pdf"]')).toHaveCount(1);
  await expect(page.locator('#pastExamPanel a[href*="R06_10.pdf"]')).toHaveCount(1);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('v57 topic mastery and bookmark jump work on mobile',async({page})=>{
  await open(page);const f=await force(page,'G01');
  await page.locator('#bookmarkBtn').click();await page.locator('.ch').nth(f.answer).click();
  await page.locator('[data-study-view="mastery"]').click();
  await expect(page.locator('#masteryPanel')).toBeVisible();
  await expect(page.locator('#masteryPanel')).toContainText('環境基本法');
  await expect(page.locator('#masteryPanel')).toContainText('正解 1/1');
  await expect(page.locator('#masteryPanel')).toContainText('網羅');
  const jump=page.locator('[data-open-question="G01"]');await expect(jump).toBeVisible();await jump.click();
  await expect(page.locator('.card')).toBeVisible();await expect(page.locator('#meta')).toContainText('ID G01');
});