/* Printable pages for Bright Bible Play (index.html?print=1 -> PDF). Uses the same 100 activities as the app. */
(function(){
if(!/[?&]print=1/.test(location.search))return;
const st=document.createElement('style');
st.textContent=`@page{size:Letter;margin:.5in}
html,body{background:#fff!important}
#app{max-width:none}
.pg{width:7.5in;height:10in;page-break-after:always;break-after:page;position:relative;overflow:hidden;display:flex;flex-direction:column}
.pg:last-child{page-break-after:auto;break-after:auto}
.pg h1{font-size:28px;margin:0 0 4px;color:#0F2A4A}
.pg h2{font-size:19px;margin:12px 0 4px}
.pg .sub{font-size:14px;color:#4a5b70;margin:0 0 10px}
.pg .ft{margin-top:auto;display:flex;justify-content:space-between;font-size:11px;color:#6b7a8c;border-top:2px solid #FFD21F;padding-top:6px}
.cover{padding:0}.cover img{width:100%;height:100%;object-fit:contain}
.wsg{display:grid;gap:0;margin:8px auto;border:3px solid #0F2A4A;border-radius:12px;overflow:hidden;width:6.2in}
.wsg div{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:24px;border:1px solid #cfd9e4;background:#fff}
.wl{display:flex;flex-wrap:wrap;gap:8px 16px;margin:12px 0;font-weight:800;font-size:18px}
.wl span::before{content:'\\2610 ';font-weight:400}
.mz{display:flex;flex-direction:column;align-items:center}
.mz svg{width:3.9in;height:3.9in}
.mzt{font-size:15px;font-weight:800;margin:4px 0}
.fill{font-size:19px;line-height:2.1;margin:8px 0}
.fill u{display:inline-block;min-width:1.1in;border-bottom:2px solid #0F2A4A;text-decoration:none}
.box{border:3px solid #FFD21F;border-radius:14px;padding:8px 14px;margin:8px 0;background:#FFFBE8;font-weight:800;font-size:16px}
.qn{font-size:15px;margin:6px 0;line-height:1.35}.qn b{display:block}.qn span{display:inline-block;margin-right:16px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:0 .3in}
.ord{display:grid;gap:6px;margin:4px 0}.ord div{border:2.5px dashed #0F2A4A;border-radius:12px;padding:8px 12px;font-size:16px;font-weight:700;display:flex;gap:10px;align-items:center}.ord i{width:30px;height:30px;border:2.5px solid #0F2A4A;border-radius:8px;flex:none}
.line{border-bottom:2px solid #0F2A4A;display:inline-block;min-width:1.4in}
.scene svg{width:7in;height:5.25in;border:3px solid #0F2A4A;border-radius:14px}
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:2px dashed #0F2A4A;margin:10px 0}
.cards div{aspect-ratio:1;border:2px dashed #0F2A4A;display:flex;align-items:center;justify-content:center;font-size:62px}
.k3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px 14px}
.k3 h3{margin:0 0 2px;font-size:11px}
.mini{display:grid;gap:0;width:2.2in}.mini div{aspect-ratio:1;font-size:9px;display:flex;align-items:center;justify-content:center;border:.5px solid #dde5ee}.mini div.hit{background:#FFE27A;font-weight:800}
.kmz svg{width:2.2in;height:2.2in}
.ktext{font-size:12px;line-height:1.5}.ktext h3{margin:8px 0 2px;font-size:13px}
`;
document.head.append(st);
const A=document.getElementById('app');
const pages=[];let pn=0;
const FT=n=>`<div class="ft"><span>Bright Bible Play \u00B7 ${TOTAL} activities \u00B7 printable edition</span><span>${n}</span></div>`;
const add=(html,cls='')=>{pn++;pages.push(`<section class="pg ${cls}">${html}${cls==='cover'?'':FT(pn)}</section>`)};
const of=t=>ITEMS.filter(i=>i.type===t);
const chunk=(a,n)=>{const o=[];for(let i=0;i<a.length;i+=n)o.push(a.slice(i,i+n));return o};
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');

add(`<img src="assets/01-capa-do-kit.png" alt="Bright Bible Play cover">`,'cover');
add(`<h1>Welcome to Bright Bible Play</h1><p class="sub">${TOTAL} Bible games & activities \u00B7 Ages 4\u201312</p>
<div class="box">How to use this book</div>
<p style="font-size:17px;line-height:1.55">Print what you need, as many copies as you like, for your own home or class. Use pencils or crayons. Younger children can do coloring pages, missing letters and matching cards with a grown-up. Older children can do word searches, mazes, quizzes and verse fill-ins on their own. Every activity is numbered, and answers are at the back.</p>
<h2>What is inside</h2>
<ul style="font-size:17px;line-height:1.6">${Object.keys(TYPE_NAMES).map(t=>`<li><b>${of(t).length}</b> ${TYPE_NAMES[t]}</li>`).join('')}</ul>
<div class="box">The same ${TOTAL} activities can be played on a phone or tablet in the Bright Bible Play app.</div>
<p class="sub">Scripture quotations are from the King James Version (public domain). Bright Bible Play is an independent children\u2019s activity product and is not affiliated with any church, denomination or publisher.</p>`);

/* word searches */
const WSK=[];
of('ws').forEach(it=>{const r=mulberry(500+it.idx);const size=10;let words=it.data.w.slice();let ws=null;while(!ws&&words.length>4){ws=genWS(words,size,[[1,0],[0,1],[1,1]],r);if(!ws)words.pop()}WSK.push({it,ws,size});
 add(`<h1>#${it.num} Word Search: ${it.data.t}</h1><p class="sub">Find all the words. They go across, down or diagonally.</p><div class="wsg" style="grid-template-columns:repeat(${size},1fr)">${ws.grid.flat().map(c=>`<div>${c}</div>`).join('')}</div><div class="wl">${words.map(w=>`<span>${w}</span>`).join('')}</div>`)});
/* mazes: 2 per page */
const MZK=[];
chunk(of('maze'),2).forEach(pair=>add(pair.map(it=>{const th=MAZE_THEMES[it.data.th];const c=genMaze(it.data.n,mulberry(900+it.idx));const cs=Math.min(40,Math.floor(340/it.data.n));MZK.push({it,c,cs,th});return `<div class="mz"><div class="mzt">#${it.num} ${th[2]}</div>${mazeSVG(c,cs,{s:th[0],g:th[1]}).replace('id="mz"','')}</div>`}).join('')));
/* coloring */
of('coloring').forEach(it=>add(`<h1>#${it.num} Coloring Page: ${it.data.t}</h1><p class="sub">Color every shape any way you like.</p><div class="scene">${sceneSVG(it.idx,{},true)}</div>`));
/* verses: 4 per page */
const VK=[];
chunk(of('verse'),4).forEach(g=>{const rr=mulberry(7+g[0].num);add(`<h1>Memory Verses</h1><p class="sub">Write the missing words. The word box helps you.</p>${g.map(it=>{const v=it.data;let t=esc(v.text);v.blanks.forEach(b=>{t=t.replace(new RegExp('\\b'+b+'\\b'),'<u>&nbsp;</u>')});VK.push(it);return `<div class="fill"><b>#${it.num}</b> ${t} <b>\u2014 ${v.ref} (KJV)</b></div>`}).join('')}<div class="box">Word box: ${shuffle(g.flatMap(i=>i.data.blanks),rr).join(' \u00B7 ')}</div>`)});
/* quizzes: 2 per page */
const QK=[];
chunk(of('quiz'),2).forEach(g=>{add(`<h1>Bible Quiz</h1><p class="sub">Circle the right answer.</p>${g.map(it=>{const rr=mulberry(31+it.num);const qs=it.data.q.map(q=>{const o=shuffle([q.a,...q.o],rr);return{q:q.q,o,k:'ABC'[o.indexOf(q.a)]}});QK.push({it,qs});return `<h2>#${it.num} ${it.data.t}</h2>${qs.map((q,i)=>`<div class="qn"><b>${i+1}. ${q.q}</b>${q.o.map((o,j)=>`<span>${'ABC'[j]}. ${o}</span>`).join('')}</div>`).join('')}`}).join('')}`)});
/* who am i: 2 per page */
chunk(of('who'),2).forEach(g=>add(`<h1>Who Am I?</h1><p class="sub">Read each clue and write the name.</p>${g.map(it=>`<h2>#${it.num} ${it.data.t}</h2><div class="box">Names: ${it.data.items.map(x=>x.a).join(' \u00B7 ')}</div>${it.data.items.map((x,i)=>`<div class="qn"><b>${i+1}. ${x.clue}</b>Answer: <span class="line"></span></div>`).join('')}`).join('')}`));
/* missing letters: 2 per page */
chunk(of('letters'),2).forEach(g=>add(`<h1>Missing Letters</h1><p class="sub">Write the missing letter in each word.</p>${g.map(it=>{const rr=mulberry(77+it.num);return `<h2>#${it.num} ${it.data.t}</h2><div style="display:flex;flex-wrap:wrap;gap:12px;font-size:26px;font-weight:800;letter-spacing:4px">${it.data.items.map(l=>{const k=Math.floor(rr()*l.w.length);l.k=k;return `<div style="width:2.2in;text-align:center">${l.e}<br>${l.w.split('').map((c,j)=>j===k?'_':c).join(' ')}</div>`}).join('')}</div>`}).join('')}`));
/* story order: 2 per page */
chunk(of('story'),2).forEach(g=>add(`<h1>Story Order</h1><p class="sub">Write 1 to 5 in the boxes to put each story in the right order.</p>${g.map(it=>{const rr=mulberry(101+it.num);return `<h2>#${it.num} ${it.data.t}</h2><div class="ord">${shuffle(it.data.s,rr).map(x=>`<div><i></i>${x}</div>`).join('')}</div>`}).join('')}`));
/* memory cards */
of('memory').forEach(it=>{const cards=[...it.data.e,...it.data.e];const rr=mulberry(200+it.num);add(`<h1>#${it.num} Memory Match: ${it.data.t}</h1><p class="sub">Cut along the dashed lines. Turn the cards face down and find the pairs.</p><div class="cards">${shuffle(cards,rr).map(e=>`<div>${e}</div>`).join('')}</div>`)});
/* answer key */
const mini=k=>{const hit=new Set(k.ws.placed.flatMap(p=>p.cells.map(([x,y])=>x+','+y)));return `<div><h3>#${k.it.num} ${k.it.data.t}</h3><div class="mini" style="grid-template-columns:repeat(${k.size},1fr)">${k.ws.grid.flatMap((row,y)=>row.map((c,x)=>`<div class="${hit.has(x+','+y)?'hit':''}">${c}</div>`)).join('')}</div></div>`};
chunk(WSK,9).forEach((g,i)=>add(`<h1>Answer Key: Word Searches${i?' (cont.)':''}</h1><div class="k3">${g.map(mini).join('')}</div>`));
chunk(MZK,9).forEach((g,i)=>add(`<h1>Answer Key: Mazes${i?' (cont.)':''}</h1><div class="k3 kmz">${g.map(k=>`<div><h3>#${k.it.num}</h3>${mazeSVG(k.c,k.cs,{s:k.th[0],g:k.th[1],path:solveMaze(k.c)}).replace('id="mz"','')}</div>`).join('')}</div>`));
add(`<h1>Answer Key: Quizzes</h1><div class="ktext">${QK.map(q=>`<h3>#${q.it.num} ${q.it.data.t}</h3>${q.qs.map((x,i)=>`${i+1}. ${x.k}`).join(' \u00B7 ')}`).join('')}</div>`);
add(`<h1>Answer Key: Memory Verses</h1><div class="ktext">${VK.map(i=>`#${i.num} ${i.data.ref}: ${i.data.blanks.join(", ")}`).join("<br>")}</div>`);
add(`<h1>Answer Key: Who Am I, Letters, Stories</h1><div class="ktext"><h3>Who Am I?</h3>${of("who").map(i=>`#${i.num}: ${i.data.items.map(x=>x.a).join(", ")}`).join("<br>")}<h3>Missing Letters</h3>${of("letters").map(i=>`#${i.num}: ${i.data.items.map(x=>x.w).join(", ")}`).join("<br>")}<h3>Story Order (correct order)</h3>${of("story").map(i=>`#${i.num} ${i.data.t}: ${i.data.s.map((x,j)=>`${j+1}) ${x}`).join("; ")}`).join("<br>")}</div>`);
A.innerHTML=pages.join('');
document.title='Bright Bible Play Printables';
})();
