const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'..','standards-drill.html'),'utf8');
const errs=[];const ok=(c,m)=>{if(!c)errs.push(m)};
ok(/\.table-scroll\.two-col\{overflow-x:hidden\}/.test(html),'two-column table must disable horizontal scroll on mobile');
ok(/\.std\.cols-2\{min-width:0;width:100%;table-layout:fixed\}/.test(html),'two-column table must fit viewport');
ok(/\.std\.cols-2 th:first-child,.std\.cols-2 td:first-child\{width:62%\}/.test(html),'two-column item width');
ok(/\.std\.cols-2 th:nth-child\(2\),.std\.cols-2 td:nth-child\(2\)\{width:38%\}/.test(html),'two-column value width');
ok(/\.std\.cols-2 tbody th\{position:static/.test(html),'two-column first column must not overlay value column');
ok(/\$\('table'\)\.className='std cols-'\+g\.cols\.length/.test(html),'table must receive column-count class');
ok(/scroll\.classList\.toggle\('two-col',g\.cols\.length===2\)/.test(html),'two-column scroll container class');
if(errs.length){console.error('FAIL standards mobile layout audit\n'+errs.join('\n'));process.exit(1)}
console.log('PASS standards mobile two-column layout audit');
