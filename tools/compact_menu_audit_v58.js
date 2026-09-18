const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),errs=[],ok=(c,m)=>{if(!c)errs.push(m)};
const mod=read('compact_menu_v58.js'),loader=read('qbank_patch_v5.js'),sw=read('sw.js'),ui=read('ui_polish_v46.js'),index=read('index.html'),wf=read('.github/workflows/canonical-audit.yml');
ok(mod.includes("var VERSION='v58'"),'v58 metadata missing');
ok(mod.includes("panel.hidden=true")&&mod.includes("setOpen(false)"),'menu is not default-collapsed');
ok(mod.includes("aria-expanded")&&mod.includes("aria-controls"),'accessible disclosure state missing');
ok(mod.includes("[header,tabs,tools,summary].forEach"),'progress/tabs/tools/review summary are not grouped into collapsible panel');
ok(mod.includes("target.id==='coverage'")&&mod.includes("target.id==='review'")&&mod.includes("data-study-view"),'menu does not auto-close after selecting a destination');
ok(!mod.includes("localStorage.setItem")&&!mod.includes("water1_bank_v3"),'compact UI must not create/change learning storage');
ok(loader.includes('compact_menu_v58.js?v=156'),'loader missing compact menu v58');
ok(loader.indexOf('compact_menu_v58.js')>loader.indexOf('study_workflow_v57.js'),'compact menu must load after v57 workflow');
ok(sw.includes("'./compact_menu_v58.js'"),'service worker missing compact menu v58');
ok(sw.includes('compact-menu-v58'),'service worker cache marker missing v58');
ok(ui.includes("var RELEASE='v58'"),'UI release is not v58');
ok(index.includes("var KEY='water1_bank_v3'"),'learning-history key changed');
ok(wf.includes('Run v58 compact menu audit'),'workflow missing v58 audit');
ok(wf.includes("'compact_menu_v58.js'")&&wf.includes("'tools/compact_menu_audit_v58.js'"),'workflow watch paths missing v58');
if(errs.length){console.error('FAIL v58 compact menu audit\n'+errs.join('\n'));process.exit(1)}
console.log('PASS v58 compact default-collapsed learning menu audit');