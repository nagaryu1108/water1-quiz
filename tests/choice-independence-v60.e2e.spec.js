const {test,expect}=require('@playwright/test');

async function open(page){
  await page.goto('/index.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.WATER1_CHOICE_INDEPENDENCE&&window.WATER1_CHOICE_INDEPENDENCE.version==='v60');
  await expect(page.locator('.ch')).toHaveCount(5);
}
async function force(page,id){
  return page.evaluate((qid)=>{
    const q=window.getQ(qid);
    window.S.current=qid;
    window.S.currentAnswered=false;
    window.S.currentSel=null;
    window.save();
    window.render();
    return {answer:q.a,choices:q.o.slice(),title:q.t,question:q.q};
  },id);
}

test('v60 W39 is no longer a threshold-vs-threshold two-choice duel',async({page})=>{
  await open(page);
  const q=await force(page,'W39');
  expect(q.answer).toBe(1);
  expect(q.choices).toHaveLength(5);
  expect(q.choices[0]).not.toContain('4.0');
  expect(q.choices[0]).not.toContain('3.0');
  expect(q.choices[0]).not.toContain('2.0');
  expect(q.choices[1]).not.toContain('1.0 mg/L');
  expect(q.choices[1]).toContain('日間平均値は用いない');

  const visible=await page.locator('.card').innerText();
  expect(visible).not.toContain('生物1、生物2、生物3の順に4.0、3.0、2.0');
  expect(visible).not.toContain('基準値は1.0 mg/L以上');

  await page.locator('.ch').nth(q.answer).click();
  await expect(page.locator('.ch').nth(q.answer)).toHaveClass(/good/);
  await expect(page.locator('#res')).toContainText('日間平均値');
  await expect(page.locator('#res')).toContainText('生物1=4.0');
  await expect(page.locator('#res')).toContainText('生物3=2.0');
});

test('v60 rewritten questions keep five choices and one keyed answer on mobile',async({page})=>{
  await open(page);
  const rows=await page.evaluate(()=>{
    return ['W20','W32','W39','T34','T41'].map(id=>{
      const q=window.getQ(id);
      return {id,choices:q.o.length,explanations:q.e.length,answer:q.a,marker:q.choiceIndependenceVersion};
    });
  });
  expect(rows).toEqual([
    {id:'W20',choices:5,explanations:5,answer:0,marker:'v60'},
    {id:'W32',choices:5,explanations:5,answer:1,marker:'v60'},
    {id:'W39',choices:5,explanations:5,answer:1,marker:'v60'},
    {id:'T34',choices:5,explanations:5,answer:1,marker:'v60'},
    {id:'T41',choices:5,explanations:5,answer:1,marker:'v60'}
  ]);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});