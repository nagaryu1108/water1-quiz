const {test,expect}=require('@playwright/test');

test('v59 H09 renders chemical subscripts and readable mol spacing on mobile',async({page})=>{
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.WATER1_CHEM_TYPOGRAPHY&&window.WATER1_CHEM_TYPOGRAPHY.version==='v59');
  const state=await page.evaluate(()=>{
    const q=window.getQ('H09');
    window.S.current='H09';window.S.currentAnswered=false;window.S.currentSel=null;window.save();window.render();
    return {title:q.t,question:q.q,choices:q.o.slice(),answer:q.a};
  });
  expect(state.title).toContain('CaF₂');
  expect(state.question).toContain('Ca(OH)₂');
  expect(state.question).toContain('Ca²⁺ + 2 F⁻ → CaF₂');
  expect(state.choices[3]).toContain('F⁻ 2 mol');
  expect(state.choices[3]).toContain('Ca²⁺ 1 mol');
  expect(state.choices[0]).toContain('F⁻ 1 mol');
  expect(state.choices[4]).toContain('Ca²⁺ 1 mol');
  const visible=await page.locator('.card').innerText();
  expect(visible).not.toContain('Ca(OH)2');
  expect(visible).not.toContain('CaF2');
  expect(visible).not.toMatch(/F⁻\d+\s*mol/);
  expect(visible).not.toMatch(/Ca²⁺\d+\s*mol/);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});