const {test,expect}=require('@playwright/test');

async function open(page){
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.WATER1_COMPACT_MENU&&window.WATER1_COMPACT_MENU.installed);
  await expect(page.locator('.ch')).toHaveCount(5);
}

test('v58 keeps the question near the top by default and expands controls on demand',async({page})=>{
  await open(page);
  const toggle=page.locator('#studyMenuToggle'),panel=page.locator('#studyMenuPanel'),card=page.locator('.card');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded','false');
  await expect(panel).toBeHidden();
  await expect(page.locator('header.h')).toBeHidden();
  await expect(card).toBeVisible();
  const y=await card.evaluate(el=>el.getBoundingClientRect().top);
  expect(y).toBeLessThan(130);

  await toggle.click();
  await expect(panel).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded','true');
  await expect(page.locator('header.h')).toBeVisible();
  await expect(page.locator('#workspaceTabs')).toBeVisible();
  await expect(page.locator('.tools')).toBeVisible();
  await expect(page.locator('#reviewSummary')).toBeVisible();

  await page.locator('#coverage').click();
  await expect(panel).toBeHidden();
  await expect(card).toBeVisible();
});

test('v58 menu closes after navigation and is collapsed again after reload',async({page})=>{
  await open(page);
  await page.locator('#studyMenuToggle').click();
  await page.locator('[data-study-view="mastery"]').click();
  await expect(page.locator('#studyMenuPanel')).toBeHidden();
  await expect(page.locator('#masteryPanel')).toBeVisible();
  await expect(page.locator('.card')).toBeHidden();

  await page.locator('#studyMenuToggle').click();
  await page.locator('[data-study-view="quiz"]').click();
  await expect(page.locator('#studyMenuPanel')).toBeHidden();
  await expect(page.locator('.card')).toBeVisible();

  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.WATER1_COMPACT_MENU&&window.WATER1_COMPACT_MENU.installed);
  await expect(page.locator('#studyMenuPanel')).toBeHidden();
  await expect(page.locator('#studyMenuToggle')).toHaveAttribute('aria-expanded','false');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});