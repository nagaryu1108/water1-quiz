const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict');
const nodes={};let saved=0,rendered=0,closed=0,viewed=0;
function element(id){return{id,handlers:{},classList:{toggle(){}},addEventListener(type,fn){this.handlers[type]=fn;},insertAdjacentElement(where,child){if(this.id==='tools'&&where==='afterend'){nodes.focusCategory=element('focusCategory');nodes.focusMode=element('focusMode');nodes.focusCount=element('focusCount');}}};}
nodes.tools=element('tools');
const document={readyState:'complete',head:{appendChild(){}},createElement:()=>element('created'),querySelector:selector=>selector==='.tools'?nodes.tools:null,getElementById:id=>nodes[id]||null};
const state={hist:{},mode:'coverage',current:null,studyView:'quiz'};
const bank=[{id:'G01',s:'公害総論',t:'法文穴埋め',q:'語句を選ぶ',legalFillinVersion:'v56'},{id:'T25',s:'汚水処理特論',t:'曝気槽容積・汚泥負荷計算',q:'算出する'},{id:'T07',s:'汚水処理特論',t:'活性炭吸着塔',q:'塔の役割'}];
const c={document,console,Set,setTimeout:fn=>fn(),S:state,Q:bank,save(){saved++;},render(){rendered++;},upd(){},nextId(){return'G01';},WATER1_STUDY_WORKFLOW:{installed:true,setView(){viewed++;}},WATER1_COMPACT_MENU:{installed:true,setOpen(open){if(!open)closed++;}}};c.window=c;vm.createContext(c);
vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../focus_menu_v100.js'),'utf8'),c);
assert.ok(c.WATER1_FOCUS_MENU);
assert.equal(state.focusCategory,'legal');
nodes.focusMode.handlers.click();assert.equal(state.mode,'focus');assert.equal(state.current,'G01');assert.equal(c.nextId(),'G01');assert.equal(viewed,1);assert.equal(closed,1);
nodes.focusCategory.value='calculation';nodes.focusCategory.handlers.change();assert.equal(state.focusCategory,'calculation');assert.equal(state.current,'T25');assert.equal(c.nextId(),'T25');
nodes.focusCategory.value='subject:汚水処理特論';nodes.focusCategory.handlers.change();assert.ok(['T25','T07'].includes(state.current));assert.ok(['T25','T07'].includes(c.nextId()));
state.mode='coverage';assert.equal(c.nextId(),'G01');assert.ok(saved>=3);assert.ok(rendered>=3);
console.log(JSON.stringify({result:'PASS',modeSwitch:true,subjectFocus:true,historyModeFallback:true}));
