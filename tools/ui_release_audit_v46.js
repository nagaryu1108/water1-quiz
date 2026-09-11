const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const errs=[];
const ok=(c,m)=>{if(!c)errs.push(m);};

const ui=read('ui_polish_v46.js');
const loader=read('qbank_patch_v5.js');
const sw=read('sw.js');
const pkg=JSON.parse(read('package.json'));
const cfg=read('playwright.config.js');
const e2e=read('tests/ui.e2e.spec.js');
const wf=read('.github/workflows/canonical-audit.yml');

ok(loader.includes('ui_polish_v46.js?v=136'),'loader missing ui_polish_v46.js');
ok(ui.includes("問題バンク '+RELEASE+' / '+RELEASE_DATE"),'v45 release badge updater missing');
ok(ui.includes("通常出題 '+active+'問 ｜ 安定ID '+stable+'件 ｜ アーカイブ '+archived+'問"),'199+1 pool status missing');
ok(ui.includes('min-width:560px'),'mobile visual minimum width missing');
ok(ui.includes('min-height:44px'),'minimum tap target missing');
ok(ui.includes('WATER1_ARCHIVED_QUESTIONS'),'archive count source missing');
ok(sw.includes("'./index.html'"),'service worker does not precache index.html');
ok(sw.includes("'./ui_polish_v46.js'"),'service worker does not precache UI patch');
ok(sw.includes("ignoreSearch:true"),'service worker version-query fallback missing');
ok(/c\.put\('\.\/index\.html',copy\)/.test(sw),'navigation refresh is not cached to index.html');
ok(pkg.devDependencies&&pkg.devDependencies['@playwright/test']==='1.55.0','Playwright dependency not pinned');
ok(cfg.includes("viewport:{width:390,height:844}"),'mobile E2E viewport missing');
ok(e2e.includes(".ch.good")&&e2e.includes(".ch.bad"),'answer-color E2E assertions missing');
ok(e2e.includes("water1_bank_v3"),'instant-save E2E assertion missing');
ok(e2e.includes("#e'+i")||e2e.includes("#e'+i"),'per-choice inline explanation E2E assertion missing');
ok(e2e.includes('setOffline(true)'),'offline service-worker E2E missing');
ok(wf.includes('Run v46 UI and service-worker static audit'),'workflow missing v46 static audit step');
ok(wf.includes('Run mobile browser E2E'),'workflow missing browser E2E step');

if(errs.length){
  console.error('FAIL v46 UI release audit\n'+errs.join('\n'));
  process.exit(1);
}
console.log('PASS v46 UI release audit');
