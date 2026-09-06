(function(){
  var bank=window.QBANK||[];
  function get(id){for(var i=0;i<bank.length;i++)if(bank[i]&&bank[i].id===id)return bank[i];return null;}
  function titleMissingVisuals(){
    bank.forEach(function(q){
      if(q&&q.v&&!q.v.title)q.v.title=q.t||('図表 '+q.id);
      if(q&&q.av&&!q.av.title)q.av.title='解説補助｜'+(q.t||q.id);
    });
  }
  titleMissingVisuals();

  /* Vertical lake profiles: put measured quantity on x axis and depth on y axis,
     with depth increasing downward, as is conventional for vertical-profile plots. */
  ['W06','L06'].forEach(function(id){var q=get(id);if(q&&q.v&&q.v.kind==='line'){
    q.v.profile=true;
    q.v.xLabel=id==='W06'?'DO（mg/L）':'水温（℃）';
    q.v.yLabel='深度（m）';
    q.v.note=(q.v.note?q.v.note+' ':'')+'鉛直分布：深度は下向きに増加する。';
  }});
  var w36=get('W36');if(w36&&w36.v&&w36.v.kind==='multiLine'){
    w36.v.profile=true;w36.v.xLabel='水温（℃）';w36.v.yLabel='深度（m）';
    w36.v.note='季節別の鉛直分布。深度は下向きに増加する。夏季は水温躍層による急な温度変化に注目する。';
  }

  /* T36 is one curve, not a multi-series chart. The old multiLine declaration caused
     the browser audit to exclude the question. Convert it to an ordinary line chart. */
  var t36=get('T36');if(t36&&t36.v&&t36.v.kind==='multiLine'&&t36.v.series&&t36.v.series.length===1){
    var s=t36.v.series[0];
    t36.v={kind:'line',title:'曲線A｜嫌気・好気切替時の水中オルトりん酸濃度',x:(t36.v.x||[]).slice(),y:(s.y||[]).slice(),xLabel:t36.v.xLabel||'処理時間（相対値）',yLabel:t36.v.yLabel||'水中オルトりん酸濃度（相対値）',note:t36.v.note||'0～2を嫌気区間、2～6を好気区間とする模式図。'};
  }
  var t06=get('T06');if(t06&&t06.v)t06.v.note='0～20分の直線に近い区間の勾配（界面高さの低下量÷時間）を読む。';
  var g06=get('G06');if(g06&&g06.v)g06.v.title='令和6年度 公共用水域の環境基準達成率';
  var h06=get('H06');if(h06&&h06.v)h06.v.title='pHとろ過後の溶存金属濃度';
  var t08=get('T08');if(t08&&t08.v)t08.v.title='回分硝化における窒素形態の変化（模式図）';

  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]});}
  function num(v){if(Math.abs(v)>=100)return String(Math.round(v));if(Math.abs(v)>=10)return String(Math.round(v*10)/10);return String(Math.round(v*100)/100);}
  function niceBounds(vals){
    var mn=Math.min.apply(null,vals),mx=Math.max.apply(null,vals);if(!isFinite(mn)||!isFinite(mx))return {min:0,max:1};if(mn===mx){mn-=1;mx+=1}
    var span=mx-mn,raw=span/4,pow=Math.pow(10,Math.floor(Math.log(raw)/Math.LN10)),f=raw/pow,step=(f<=1?1:f<=2?2:f<=5?5:10)*pow;
    var lo=Math.floor(mn/step)*step,hi=Math.ceil(mx/step)*step;
    if(mn>=0&&mn<step*1.25)lo=0;
    return {min:lo,max:hi,step:step};
  }
  function ticks(b){var out=[],st=b.step||((b.max-b.min)/4);for(var v=b.min,n=0;v<=b.max+st*.01&&n<8;v+=st,n++)out.push(Math.abs(v)<1e-12?0:v);return out;}
  function titleNote(v){return (v.title?'<div class="vtitle">'+esc(v.title)+'</div>':'')+(v.note?'<div class="vnote">'+esc(v.note)+'</div>':'');}
  function lineSVG(v){
    var W=620,H=380,L=78,R=28,T=28,B=76,profile=!!v.profile;
    var dataX=profile?v.y:v.x,dataY=profile?v.x:v.y;
    var xb=niceBounds(dataX),yb=niceBounds(dataY),xt=ticks(xb),yt=ticks(yb),pw=W-L-R,ph=H-T-B;
    function sx(x){return L+(x-xb.min)/(xb.max-xb.min||1)*pw}
    function sy(y){return profile?T+(y-yb.min)/(yb.max-yb.min||1)*ph:T+(yb.max-y)/(yb.max-yb.min||1)*ph}
    var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc((v.title||'グラフ')+'、横軸 '+(v.xLabel||'')+'、縦軸 '+(v.yLabel||''))+'">';
    yt.forEach(function(y){var yy=sy(y);s+='<line x1="'+L+'" y1="'+yy+'" x2="'+(W-R)+'" y2="'+yy+'" stroke="#e2e8f0"/><text x="'+(L-10)+'" y="'+(yy+4)+'" text-anchor="end" font-size="11">'+esc(num(y))+'</text>'});
    xt.forEach(function(x){var xx=sx(x);s+='<line x1="'+xx+'" y1="'+T+'" x2="'+xx+'" y2="'+(H-B)+'" stroke="#f1f5f9"/><text x="'+xx+'" y="'+(H-B+22)+'" text-anchor="middle" font-size="11">'+esc(num(x))+'</text>'});
    s+='<line x1="'+L+'" y1="'+T+'" x2="'+L+'" y2="'+(H-B)+'" stroke="#334155"/><line x1="'+L+'" y1="'+(H-B)+'" x2="'+(W-R)+'" y2="'+(H-B)+'" stroke="#334155"/>';
    var pts=dataX.map(function(x,i){return sx(x)+','+sy(dataY[i])}).join(' ');s+='<polyline points="'+pts+'" fill="none" stroke="#334155" stroke-width="3"/>';
    dataX.forEach(function(x,i){s+='<circle cx="'+sx(x)+'" cy="'+sy(dataY[i])+'" r="4" fill="#fff" stroke="#334155" stroke-width="1.5"/>'});
    s+='<text x="'+(L+pw/2)+'" y="'+(H-24)+'" text-anchor="middle" font-size="13" font-weight="700">'+esc(v.xLabel||'')+'</text>';
    s+='<text x="20" y="'+(T+ph/2)+'" transform="rotate(-90 20 '+(T+ph/2)+')" text-anchor="middle" font-size="13" font-weight="700">'+esc(v.yLabel||'')+'</text></svg>';
    return s;
  }
  function multiSVG(v){
    var W=620,H=390,L=78,R=34,T=30,B=78,profile=!!v.profile,all=[];
    (v.series||[]).forEach(function(z){all=all.concat(z.y||[])});
    var xb=profile?niceBounds(all):niceBounds(v.x||[]),yb=profile?niceBounds(v.x||[]):niceBounds(all),xt=ticks(xb),yt=ticks(yb),pw=W-L-R,ph=H-T-B;
    function sx(x){return L+(x-xb.min)/(xb.max-xb.min||1)*pw}
    function sy(y){return profile?T+(y-yb.min)/(yb.max-yb.min||1)*ph:T+(yb.max-y)/(yb.max-yb.min||1)*ph}
    var dash=['','8 5','3 4','10 4 2 4'],s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc((v.title||'複数曲線グラフ')+'、横軸 '+(v.xLabel||'')+'、縦軸 '+(v.yLabel||''))+'">';
    yt.forEach(function(y){var yy=sy(y);s+='<line x1="'+L+'" y1="'+yy+'" x2="'+(W-R)+'" y2="'+yy+'" stroke="#e2e8f0"/><text x="'+(L-10)+'" y="'+(yy+4)+'" text-anchor="end" font-size="11">'+esc(num(y))+'</text>'});
    xt.forEach(function(x){var xx=sx(x);s+='<line x1="'+xx+'" y1="'+T+'" x2="'+xx+'" y2="'+(H-B)+'" stroke="#f1f5f9"/><text x="'+xx+'" y="'+(H-B+22)+'" text-anchor="middle" font-size="11">'+esc(num(x))+'</text>'});
    s+='<line x1="'+L+'" y1="'+T+'" x2="'+L+'" y2="'+(H-B)+'" stroke="#334155"/><line x1="'+L+'" y1="'+(H-B)+'" x2="'+(W-R)+'" y2="'+(H-B)+'" stroke="#334155"/>';
    (v.series||[]).forEach(function(z,j){var dx=profile?z.y:v.x,dy=profile?v.x:z.y,pts=dx.map(function(x,i){return sx(x)+','+sy(dy[i])}).join(' ');s+='<polyline points="'+pts+'" fill="none" stroke="#334155" stroke-width="'+(3-j*.25)+'" '+(dash[j%dash.length]?'stroke-dasharray="'+dash[j%dash.length]+'"':'')+'/>';dx.forEach(function(x,i){s+='<circle cx="'+sx(x)+'" cy="'+sy(dy[i])+'" r="3" fill="#fff" stroke="#334155"/>'})});
    var lx=L+8,ly=T+10;(v.series||[]).forEach(function(z,j){var yy=ly+j*23;s+='<line x1="'+lx+'" y1="'+yy+'" x2="'+(lx+30)+'" y2="'+yy+'" stroke="#334155" stroke-width="3" '+(dash[j%dash.length]?'stroke-dasharray="'+dash[j%dash.length]+'"':'')+'/><text x="'+(lx+38)+'" y="'+(yy+4)+'" font-size="11" font-weight="700">'+esc(z.label||('系列'+(j+1)))+'</text>'});
    s+='<text x="'+(L+pw/2)+'" y="'+(H-24)+'" text-anchor="middle" font-size="13" font-weight="700">'+esc(v.xLabel||'')+'</text><text x="20" y="'+(T+ph/2)+'" transform="rotate(-90 20 '+(T+ph/2)+')" text-anchor="middle" font-size="13" font-weight="700">'+esc(v.yLabel||'')+'</text></svg>';
    return s;
  }
  function barSVG(v,horizontal){
    var W=620;
    if(horizontal){
      var row=42,H=40+row*v.labels.length+66,L=175,R=62,T=24,B=54,max=v.max||Math.max.apply(null,v.values),pw=W-L-R,xb=niceBounds([0,max]),xt=ticks(xb),s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(v.title||'棒グラフ')+'">';
      xt.forEach(function(x){var xx=L+(x/xb.max)*pw;s+='<line x1="'+xx+'" y1="'+T+'" x2="'+xx+'" y2="'+(H-B)+'" stroke="#e2e8f0"/><text x="'+xx+'" y="'+(H-B+21)+'" text-anchor="middle" font-size="10">'+esc(num(x))+'</text>'});
      v.values.forEach(function(val,i){var y=T+i*row,w=pw*val/(xb.max||1);s+='<text x="'+(L-9)+'" y="'+(y+20)+'" text-anchor="end" font-size="11">'+esc(v.labels[i])+'</text><rect x="'+L+'" y="'+(y+6)+'" width="'+w+'" height="20" fill="#64748b" rx="3"/><text x="'+Math.min(L+w+7,W-R+4)+'" y="'+(y+21)+'" font-size="11" font-weight="700">'+esc(num(val))+'</text>'});
      s+='<text x="'+(L+pw/2)+'" y="'+(H-15)+'" text-anchor="middle" font-size="12" font-weight="700">'+esc(v.xLabel||v.unit||'')+'</text></svg>';return s;
    }
    var H=360,L=72,R=24,T=25,B=86,max=v.max||Math.max.apply(null,v.values),yb=niceBounds([0,max]),yt=ticks(yb),pw=W-L-R,ph=H-T-B,gap=pw/v.values.length,bw=gap*.55,s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(v.title||'棒グラフ')+'">';
    yt.forEach(function(y){var yy=T+(yb.max-y)/(yb.max-yb.min||1)*ph;s+='<line x1="'+L+'" y1="'+yy+'" x2="'+(W-R)+'" y2="'+yy+'" stroke="#e2e8f0"/><text x="'+(L-9)+'" y="'+(yy+4)+'" text-anchor="end" font-size="10">'+esc(num(y))+'</text>'});
    v.values.forEach(function(val,i){var x=L+gap*i+(gap-bw)/2,y=T+(yb.max-val)/(yb.max-yb.min||1)*ph,h=T+ph-y;s+='<rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+h+'" fill="#64748b"/><text x="'+(x+bw/2)+'" y="'+(y-6)+'" text-anchor="middle" font-size="11" font-weight="700">'+esc(num(val))+'</text><text x="'+(x+bw/2)+'" y="'+(H-B+22)+'" text-anchor="middle" font-size="10">'+esc(v.labels[i])+'</text>'});
    s+='<line x1="'+L+'" y1="'+T+'" x2="'+L+'" y2="'+(H-B)+'" stroke="#334155"/><text x="20" y="'+(T+ph/2)+'" transform="rotate(-90 20 '+(T+ph/2)+')" text-anchor="middle" font-size="12" font-weight="700">'+esc(v.yLabel||v.unit||'')+'</text></svg>';return s;
  }
  function tableHTML(v){var h='<table><thead><tr>'+v.headers.map(function(x){return'<th>'+esc(x)+'</th>'}).join('')+'</tr></thead><tbody>';(v.rows||[]).forEach(function(r){h+='<tr>'+r.map(function(x){return'<td>'+esc(x)+'</td>'}).join('')+'</tr>'});return h+'</tbody></table>';}
  function betterChart(v,box){
    box.innerHTML='';box.style.display='none';if(!v)return;
    var body='';if(v.kind==='line')body=lineSVG(v);else if(v.kind==='multiLine')body=multiSVG(v);else if(v.kind==='bar')body=barSVG(v,false);else if(v.kind==='barH')body=barSVG(v,true);else if(v.kind==='table')body=tableHTML(v);else return;
    var note=v.note?'<div class="vnote">'+esc(v.note)+'</div>':'';
    box.innerHTML=(v.title?'<div class="vtitle">'+esc(v.title)+'</div>':'')+body+note;box.style.display='block';
  }
  function install(){
    window.chart=betterChart;
    window.__water1VisualV35={version:'v35',profileIds:['W06','L06','W36'],t36Fixed:!!(get('T36')&&get('T36').v&&get('T36').v.kind==='line')};
    if(typeof window.render==='function')window.render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(install,0)});else setTimeout(install,0);
})();
