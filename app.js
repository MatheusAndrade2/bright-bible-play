/* ---------- helpers ---------- */
const h=(tag,attrs={},...kids)=>{const e=document.createElement(tag);for(const[k,v]of Object.entries(attrs||{})){if(v===false||v==null)continue;if(k==='class')e.className=v;else if(k==='html')e.innerHTML=v;else if(k==='style')e.style.cssText=v;else if(k.startsWith('on'))e.addEventListener(k.slice(2),v);else e.setAttribute(k,v)}kids.flat(9).forEach(c=>{if(c==null||c===false)return;e.append(c.nodeType?c:document.createTextNode(String(c)))});return e};
const store={get(k,d){try{const v=localStorage.getItem('bbp_'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('bbp_'+k,JSON.stringify(v))}catch(e){}}};
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let RND=Math.random;
const shuffle=(a,r=RND)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=(a,n,r=RND)=>shuffle(a,r).slice(0,n);
const LEVEL={'4-6':0,'7-9':1,'10-12':2,all:1};

/* ---------- shared generators ---------- */
function genWS(words,size,dirs,r){
 for(let attempt=0;attempt<80;attempt++){
  const g=Array.from({length:size},()=>Array(size).fill(''));const placed=[];let ok=true;
  for(const w of words){let done=false;
   for(let t=0;t<300&&!done;t++){const[dx,dy]=dirs[Math.floor(r()*dirs.length)];const x0=Math.floor(r()*size),y0=Math.floor(r()*size);const x1=x0+dx*(w.length-1),y1=y0+dy*(w.length-1);if(x1<0||y1<0||x1>=size||y1>=size)continue;let fit=true;for(let i=0;i<w.length;i++){const c=g[y0+dy*i][x0+dx*i];if(c&&c!==w[i]){fit=false;break}}if(!fit)continue;const cells=[];for(let i=0;i<w.length;i++){g[y0+dy*i][x0+dx*i]=w[i];cells.push([x0+dx*i,y0+dy*i])}placed.push({word:w,cells});done=true}
   if(!done){ok=false;break}}
  if(ok){const A='ABCDEFGHIJKLMNOPQRSTUVWXYZ';for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(!g[y][x])g[y][x]=A[Math.floor(r()*26)];return{grid:g,placed,size}}
 }
 return null;
}
function genMaze(n,r){
 const c=Array.from({length:n},()=>Array.from({length:n},()=>({N:1,E:1,S:1,W:1,v:0})));
 const st=[[0,0]];c[0][0].v=1;
 while(st.length){const[x,y]=st[st.length-1];const nb=[];if(y>0&&!c[y-1][x].v)nb.push(['N',x,y-1,'S']);if(x<n-1&&!c[y][x+1].v)nb.push(['E',x+1,y,'W']);if(y<n-1&&!c[y+1][x].v)nb.push(['S',x,y+1,'N']);if(x>0&&!c[y][x-1].v)nb.push(['W',x-1,y,'E']);
  if(!nb.length){st.pop();continue}const[d,nx,ny,o]=nb[Math.floor(r()*nb.length)];c[y][x][d]=0;c[ny][nx][o]=0;c[ny][nx].v=1;st.push([nx,ny])}
 return c;
}
function solveMaze(c){const n=c.length;const prev={};const q=[[0,0]];prev['0,0']=null;const D={N:[0,-1],E:[1,0],S:[0,1],W:[-1,0]};
 while(q.length){const[x,y]=q.shift();if(x===n-1&&y===n-1)break;for(const d in D){if(c[y][x][d])continue;const nx=x+D[d][0],ny=y+D[d][1];const k=nx+','+ny;if(prev[k]!==undefined)continue;prev[k]=[x,y];q.push([nx,ny])}}
 const p=[];let k=(n-1)+','+(n-1);while(k){const[x,y]=k.split(',').map(Number);p.unshift([x,y]);const pr=prev[k];k=pr?pr[0]+','+pr[1]:null}return p}
function mazeSVG(c,cs=34,opts={}){const n=c.length,W=n*cs+8;let s=`<svg viewBox="0 0 ${W} ${W}" xmlns="http://www.w3.org/2000/svg" id="mz"><g stroke="#0F2A4A" stroke-width="4" stroke-linecap="round" transform="translate(4,4)">`;
 for(let y=0;y<n;y++)for(let x=0;x<n;x++){const X=x*cs,Y=y*cs;if(c[y][x].N&&!(x===0&&y===0&&opts.open))s+=`<line x1="${X}" y1="${Y}" x2="${X+cs}" y2="${Y}"/>`;if(c[y][x].W)s+=`<line x1="${X}" y1="${Y}" x2="${X}" y2="${Y+cs}"/>`;if(y===n-1&&c[y][x].S)s+=`<line x1="${X}" y1="${Y+cs}" x2="${X+cs}" y2="${Y+cs}"/>`;if(x===n-1&&c[y][x].E)s+=`<line x1="${X+cs}" y1="${Y}" x2="${X+cs}" y2="${Y+cs}"/>`}
 s+='</g>';
 if(opts.path){s+=`<polyline fill="none" stroke="#E5484D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" points="${opts.path.map(([x,y])=>(4+x*cs+cs/2)+','+(4+y*cs+cs/2)).join(' ')}"/>`}
 s+=`<text x="${4+cs/2}" y="${4+cs/2+cs*.17}" font-size="${cs*.6}" text-anchor="middle">${opts.s||"🐑"}</text><text x="${4+(n-1)*cs+cs/2}" y="${4+(n-1)*cs+cs/2+cs*.17}" font-size="${cs*.6}" text-anchor="middle">${opts.g||"🌿"}</text>`;
 return s+'</svg>'}
const PALETTE=['#FF6B6B','#FF9F43','#FFD21F','#8FD14F','#2BB673','#4FC3F7','#2F80ED','#7B4FD0','#F78FB3','#A0674B','#FFFFFF','#B8C4CE'];

/* ---------- coloring scenes ---------- */
const starPts=(cx,cy,R,r)=>Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5,d=i%2?r:R;return(cx+d*Math.cos(a)).toFixed(1)+','+(cy+d*Math.sin(a)).toFixed(1)}).join(' ');
function sceneSVG(idx,fills={},outline=false){
 const f=k=>outline?'#fff':(fills[k]||'#fff');
 const R=(k,tag,a)=>`<${tag} data-r="${k}" ${a} fill="${f(k)}" stroke="#0F2A4A" stroke-width="3" stroke-linejoin="round"/>`;
 let body='';
 if(idx===0){
  body=`${R('sky','rect','x="0" y="0" width="400" height="300"')}${R('sun','circle','cx="340" cy="52" r="32"')}
  <g fill="${f('cloud')}" stroke="#0F2A4A" stroke-width="3"><circle data-r="cloud" cx="60" cy="50" r="20"/><circle data-r="cloud" cx="88" cy="42" r="26"/><circle data-r="cloud" cx="118" cy="52" r="20"/><rect data-r="cloud" x="60" y="52" width="58" height="18" stroke="none"/></g>
  <path data-r="r1" d="M70 170 A130 130 0 0 1 330 170 L314 170 A114 114 0 0 0 86 170 Z" fill="${f('r1')}" stroke="#0F2A4A" stroke-width="3"/>
  <path data-r="r2" d="M86 170 A114 114 0 0 1 314 170 L298 170 A98 98 0 0 0 102 170 Z" fill="${f('r2')}" stroke="#0F2A4A" stroke-width="3"/>
  <path data-r="r3" d="M102 170 A98 98 0 0 1 298 170 L282 170 A82 82 0 0 0 118 170 Z" fill="${f('r3')}" stroke="#0F2A4A" stroke-width="3"/>
  ${R('wave','path','d="M0 200 Q50 180 100 200 T200 200 T300 200 T400 200 L400 300 L0 300 Z"')}${R('hull','path','d="M80 190 L320 190 L292 244 L108 244 Z"')}${R('cabin','rect','x="145" y="140" width="110" height="50"')}${R('roof','polygon','points="132,140 268,140 200,96"')}${R('door','rect','x="188" y="156" width="24" height="34"')}${R('window','circle','cx="162" cy="162" r="9"')}${R('dove','ellipse','cx="330" cy="118" rx="22" ry="12"')}${R('wing','path','d="M322 112 Q310 84 342 92 Q336 106 330 112 Z"')}`;
 }else if(idx===1){
  body=`${R('sky','rect','x="0" y="0" width="400" height="300"')}${R('sun','circle','cx="70" cy="60" r="30"')}
  <g fill="${f('cloud')}" stroke="#0F2A4A" stroke-width="3"><circle data-r="cloud" cx="250" cy="52" r="18"/><circle data-r="cloud" cx="276" cy="44" r="24"/><circle data-r="cloud" cx="304" cy="54" r="18"/><rect data-r="cloud" x="250" y="54" width="54" height="16" stroke="none"/></g>
  ${R('hill1','ellipse','cx="120" cy="260" rx="200" ry="90"')}${R('hill2','ellipse','cx="300" cy="285" rx="230" ry="80"')}${R('trunk','rect','x="310" y="150" width="18" height="75"')}${R('crown','circle','cx="319" cy="135" r="40"')}
  ${R('legs','rect','x="136" y="243" width="8" height="20"')}${R('legs','rect','x="162" y="243" width="8" height="20"')}${R('lamb','ellipse','cx="150" cy="228" rx="38" ry="24"')}${R('lamb','circle','cx="192" cy="216" r="15"')}
  ${R('f1','circle','cx="60" cy="252" r="9"')}${R('f2','circle','cx="95" cy="268" r="9"')}${R('f3','circle','cx="250" cy="255" r="9"')}`;
 }else{
  body=`${R('sky','rect','x="0" y="0" width="400" height="300"')}${R('moon','circle','cx="335" cy="58" r="28"')}${R('bigstar','polygon',`points="${starPts(200,72,42,18)}"`)}${R('star2','polygon',`points="${starPts(80,50,13,6)}"`)}${R('star3','polygon',`points="${starPts(315,140,12,5)}"`)}${R('star4','polygon',`points="${starPts(60,130,10,4)}"`)}
  ${R('hill','ellipse','cx="200" cy="305" rx="270" ry="95"')}${R('wall','rect','x="140" y="190" width="120" height="62"')}${R('roof','polygon','points="124,192 276,192 200,142"')}${R('door','rect','x="186" y="214" width="28" height="38"')}${R('hay','ellipse','cx="110" cy="262" rx="26" ry="12"')}${R('hay','ellipse','cx="295" cy="262" rx="26" ry="12"')}`;
 }
 return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

/* ---------- activities (100) ---------- */
const ITEMS=[];
(function build(){
 const add=(type,cat,idx,title,lv,data)=>ITEMS.push({id:type+idx,type,cat,idx,title,lv,data});
 DATA.verse.forEach((v,i)=>{const n=v.text.split(' ').length;add('verse','verse',i,'Memory Verse: '+v.ref,n<=6?[0,1]:n<=13?[1,2]:[2],v)});
 DATA.quiz.forEach((q,i)=>add('quiz','trivia',i,'Bible Quiz: '+q.t,[0,1,6].includes(i)?[0,1,2]:[1,2],q));
 DATA.who.forEach((q,i)=>add('who','trivia',i,'Who Am I? '+q.t,[0,1],q));
 DATA.story.forEach((q,i)=>add('story','trivia',i,'Story Order: '+q.t,i<2?[0,1,2]:[1,2],q));
 DATA.ws.forEach((q,i)=>add('ws','puz',i,'Word Search: '+q.t,[1,2],q));
 DATA.maze.forEach((q,i)=>add('maze','puz',i,'Maze '+(i+1)+': '+MAZE_THEMES[q.th][2].replace('Help the ','').replace(' find',' finds').replace(' follow',' follows').replace(' swim',' swims'),q.n<=6?[0,1,2]:q.n<=9?[1,2]:[2],q));
 DATA.letters.forEach((q,i)=>add('letters','puz',i,'Missing Letters: '+q.t,[0,1],q));
 DATA.memory.forEach((q,i)=>add('memory','puz',i,'Memory Match: '+q.t,[0,1,2],q));
 DATA.coloring.forEach((q,i)=>add('coloring','color',i,'Coloring Page: '+q.t,[0,1,2],q));
 ITEMS.forEach((it,n)=>it.num=n+1);
})();
const itm=id=>ITEMS.find(x=>x.id===id);
const TOTAL=ITEMS.length;

/* ---------- game runners (item based) ---------- */
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const bad=el=>{el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake')};

function G_memory(box,ctx,it){
 const n=ctx.level===0?6:8;const cols=n===6?3:4;const cards=shuffle(it.data.e.slice(0,n).flatMap(e=>[e,e]));let open=[],matched=0,moves=0,lock=false;
 const info=h('div',{class:'msg'},'Find the matching pairs!');const grid=h('div',{class:'mem',style:`grid-template-columns:repeat(${cols},1fr)`});
 const btns=cards.map((e,i)=>h('button',{'aria-label':'card',onclick:async()=>{if(lock||btns[i].classList.contains('up')||btns[i].classList.contains('ok'))return;btns[i].textContent=e;btns[i].classList.add('up');open.push(i);if(open.length===2){moves++;lock=true;const[a,b]=open;if(cards[a]===cards[b]){btns[a].className='ok';btns[b].className='ok';matched++;info.textContent='Great match!';open=[];lock=false;if(matched===n)ctx.win(`You did it in ${moves} tries!`)}else{await sleep(750);[a,b].forEach(k=>{btns[k].textContent='';btns[k].classList.remove('up')});open=[];lock=false}}}},''));
 btns.forEach(b=>grid.append(b));box.append(info,grid);
}
function G_ws(box,ctx,it){
 const r=mulberry(500+it.idx);const size=10;let words=it.data.w.slice();let ws=null;
 while(!ws&&words.length>4){ws=genWS(words,size,[[1,0],[0,1],[1,1]],r);if(!ws)words.pop()}
 const info=h('div',{class:'msg'},it.data.t);const grid=h('div',{class:'ws',style:`grid-template-columns:repeat(${size},1fr)`});const list=h('div',{class:'words'});
 const found=new Set();let first=null;const cells={};const spans={};
 words.forEach(w=>{spans[w]=h('span',{},w);list.append(spans[w])});
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){const b=h('button',{onclick:()=>{
   if(!first){first=[x,y];b.classList.add('start');return}
   const[x0,y0]=first;cells[x0+','+y0].classList.remove('start');first=null;
   const dx=Math.sign(x-x0),dy=Math.sign(y-y0);const len=Math.max(Math.abs(x-x0),Math.abs(y-y0))+1;
   if(!(x===x0||y===y0||Math.abs(x-x0)===Math.abs(y-y0))){info.textContent='Tap the first and last letter in a straight line.';return}
   let s='';const cs=[];for(let i=0;i<len;i++){const cx=x0+dx*i,cy=y0+dy*i;s+=ws.grid[cy][cx];cs.push([cx,cy])}
   const rs=[...s].reverse().join('');const w=words.find(w=>(w===s||w===rs)&&!found.has(w));
   if(w){found.add(w);const col='f'+(found.size%7);cs.forEach(([cx,cy])=>cells[cx+','+cy].classList.add(col));spans[w].classList.add('found');info.textContent='Found '+w+'!';if(found.size===words.length)ctx.win('You found every word!')}else{info.textContent='Not a word on the list. Try again!';bad(grid)}
  }},ws.grid[y][x]);cells[x+','+y]=b;grid.append(b)}
 box.append(info,grid,list,h('p',{class:'muted',style:'text-align:center'},'Tap the first letter, then the last letter.'));
}
function G_maze(box,ctx,it){
 const n=it.data.n;const th=MAZE_THEMES[it.data.th];const c=genMaze(n,mulberry(900+it.idx));const cs=Math.min(40,Math.floor(340/n));
 const wrap=h('div',{class:'mazewrap',html:mazeSVG(c,cs,{s:'🐾',g:th[1]})});let px=0,py=0;
 const info=h('div',{class:'msg'},th[2]+'!');const svg=()=>wrap.querySelector('svg');let lamb=null;
 function draw(){if(lamb)lamb.remove();lamb=document.createElementNS('http://www.w3.org/2000/svg','text');lamb.setAttribute('x',4+px*cs+cs/2);lamb.setAttribute('y',4+py*cs+cs/2+cs*.17);lamb.setAttribute('font-size',cs*.6);lamb.setAttribute('text-anchor','middle');lamb.textContent=th[0];svg().append(lamb)}
 const D={N:[0,-1],E:[1,0],S:[0,1],W:[-1,0]};
 function move(d){if(c[py][px][d])return false;px+=D[d][0];py+=D[d][1];draw();if(px===n-1&&py===n-1)ctx.win('You made it!');return true}
 const pad=h('div',{class:'dpad'},h('span'),h('button',{onclick:()=>move('N'),'aria-label':'up'},'▲'),h('span'),h('button',{onclick:()=>move('W'),'aria-label':'left'},'◀'),h('button',{onclick:()=>move('S'),'aria-label':'down'},'▼'),h('button',{onclick:()=>move('E'),'aria-label':'right'},'▶'));
 box.append(info,wrap,pad);draw();
 let sx=0,sy=0;wrap.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
 wrap.addEventListener('touchend',e=>{const t=e.changedTouches[0];const dx=t.clientX-sx,dy=t.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;if(Math.abs(dx)>Math.abs(dy))move(dx>0?'E':'W');else move(dy>0?'S':'N')});
 ctx.onKey=e=>{const m={ArrowUp:'N',ArrowDown:'S',ArrowLeft:'W',ArrowRight:'E'}[e.key];if(m){e.preventDefault();move(m)}};
}
function G_letters(box,ctx,it){
 const rounds=shuffle(it.data.items);let i=0,score=0;const area=h('div');const A='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 function show(){area.innerHTML='';if(i>=rounds.length){ctx.win(`You got ${score} of ${rounds.length}!`);return}
  const r=rounds[i];const k=Math.floor(RND()*r.w.length);const shown=r.w.split('').map((ch,j)=>j===k?'_':ch).join(' ');
  const opts=shuffle([r.w[k],...pick([...A].filter(x=>!r.w.includes(x)),2)]);
  area.append(h('div',{class:'big'},r.e),h('div',{class:'q',style:'letter-spacing:6px;font-size:34px'},shown),h('div',{class:'choices',style:'grid-template-columns:repeat(3,1fr)'},opts.map(o=>h('button',{class:'choice',style:'text-align:center;font-size:30px',onclick:async ev=>{const b=ev.currentTarget;if(o===r.w[k]){b.classList.add('ok');score++;await sleep(600);i++;show()}else{b.classList.add('bad');b.disabled=true}}},o))))}
 box.append(h('div',{class:'msg'},it.data.t+': find the missing letter!'),area);show();
}
function G_verse(box,ctx,it){
 const v=it.data;const words=v.text.split(' ');const steps=[];if(words.length<=12)steps.push('build');steps.push('fill');let si=0;const area=h('div');
 function build(){let k=0;const built=h('div',{class:'built'});const bank=h('div',{class:'bank'});
  shuffle(words.map((w,i)=>({w,i}))).forEach(o=>{const b=h('button',{onclick:()=>{if(o.w===words[k]){built.append(o.w+' ');b.disabled=true;k++;if(k===words.length){ctx.msg.textContent='✨ '+v.ref+' (KJV)';setTimeout(()=>{si++;next()},1400)}}else bad(built)}},o.w);bank.append(b)});
  area.append(h('div',{class:'muted',style:'text-align:center'},'Step '+(si+1)+' of '+steps.length+': tap the words in the right order. '+v.ref+' (KJV)'),built,bank)}
 function fill(){const parts=v.text.split(/(\s+)/);const slots=[];const para=h('div',{class:'verse'});
  parts.forEach(p=>{const bare=p.replace(/[^A-Za-z']/g,'');if(v.blanks.includes(bare)&&p.trim()){const el=h('span',{class:'blank'},' ');slots.push({word:bare,el,punct:p.replace(bare,'')});para.append(el)}else para.append(p)});
  let idx=0;const bank=h('div',{class:'bank'});
  shuffle(slots.map(s=>s.word)).forEach(w=>{const b=h('button',{onclick:()=>{if(w===slots[idx].word){const s=slots[idx];s.el.textContent=w+s.punct;s.el.classList.add('done');b.disabled=true;idx++;if(idx===slots.length){ctx.msg.textContent='✨ '+v.ref+' (KJV)';setTimeout(()=>{si++;next()},1400)}}else{bad(para);ctx.msg.textContent='Try another word!'}}},w);bank.append(b)});
  area.append(h('div',{class:'panel'},para,h('div',{class:'muted',style:'text-align:center'},v.ref+' (KJV)')),h('div',{class:'muted',style:'text-align:center'},'Step '+(si+1)+' of '+steps.length+': tap the missing words in order.'),bank)}
 function next(){area.innerHTML='';ctx.msg.textContent='';if(si>=steps.length){ctx.win('You know '+v.ref+'!');return}steps[si]==='build'?build():fill()}
 box.append(area);next();
}
function G_quiz(box,ctx,it){
 const rounds=shuffle(it.data.q);let i=0,score=0;const area=h('div');
 function show(){area.innerHTML='';if(i>=rounds.length){ctx.win(`You scored ${score} of ${rounds.length}!`);return}
  const r=rounds[i];const opts=shuffle([r.a,...r.o]);let locked=false;
  area.append(h('div',{class:'muted',style:'text-align:center'},`${it.data.t} · Question ${i+1} of ${rounds.length}`),h('div',{class:'q'},r.q),h('div',{class:'choices'},opts.map(o=>h('button',{class:'choice',onclick:async ev=>{if(locked)return;locked=true;const b=ev.currentTarget;if(o===r.a){b.classList.add('ok');score++}else{b.classList.add('bad');[...area.querySelectorAll('.choice')].find(x=>x.textContent===r.a).classList.add('ok')}await sleep(1100);i++;show()}},o))))}
 box.append(area);show();
}
function G_who(box,ctx,it){
 const rounds=shuffle(it.data.items);const names=it.data.items.map(x=>x.a);let i=0,score=0;const area=h('div');
 function show(){area.innerHTML='';if(i>=rounds.length){ctx.win(`You guessed ${score} of ${rounds.length}!`);return}
  const r=rounds[i];const opts=shuffle([r.a,...pick(names.filter(n=>n!==r.a),2)]);let locked=false;
  area.append(h('div',{class:'big'},'❓'),h('div',{class:'q'},'Who am I?'),h('div',{class:'panel',style:'font-size:21px;text-align:center;font-weight:700'},r.clue),h('div',{class:'choices'},opts.map(o=>h('button',{class:'choice',onclick:async ev=>{if(locked)return;locked=true;const b=ev.currentTarget;if(o===r.a){b.classList.add('ok');score++}else{b.classList.add('bad');[...area.querySelectorAll('.choice')].find(x=>x.textContent===r.a).classList.add('ok')}area.querySelector('.big').textContent=r.e;await sleep(1400);i++;show()}},o))))}
 box.append(area);show();
}
function G_story(box,ctx,it){
 const st=it.data;let k=0;const built=h('ol',{class:'panel',style:'font-size:20px;font-weight:700;min-height:70px'});const bank=h('div',{class:'choices'});
 shuffle(st.s.map((t,i)=>({t,i}))).forEach(o=>{const b=h('button',{class:'choice',onclick:()=>{if(o.i===k){built.append(h('li',{},o.t));b.disabled=true;b.style.opacity='.25';k++;if(k===st.s.length)ctx.win('The story is in order!')}else{b.classList.add('bad');setTimeout(()=>b.classList.remove('bad'),500)}}},o.t);bank.append(b)});
 box.append(h('div',{class:'q'},'Put the story in order: '+st.t),built,bank);
}
function G_coloring(box,ctx,it){
 const fills={};let color=PALETTE[2];const cv=h('div',{class:'cv',html:sceneSVG(it.idx,fills)});const wrap=h('div',{class:'color'},cv);
 cv.addEventListener('click',e=>{const t=e.target.closest('[data-r]');if(!t)return;fills[t.getAttribute('data-r')]=color;cv.innerHTML=sceneSVG(it.idx,fills)});
 const sw=h('div',{class:'sw'},PALETTE.map(c=>h('button',{style:'background:'+c,'aria-label':'color',class:c===color?'on':'',onclick:ev=>{color=c;[...sw.children].forEach(b=>b.classList.remove('on'));ev.currentTarget.classList.add('on')}})));
 box.append(h('div',{class:'msg'},'Pick a color, then tap a shape!'),wrap,sw,h('div',{class:'row'},h('button',{class:'btn alt small',onclick:()=>{for(const k in fills)delete fills[k];cv.innerHTML=sceneSVG(it.idx,fills)}},'Start over'),h('button',{class:'btn small',onclick:()=>ctx.win('What a beautiful picture!')},'I’m done!')));
}
const RUN={memory:G_memory,ws:G_ws,maze:G_maze,letters:G_letters,verse:G_verse,quiz:G_quiz,who:G_who,story:G_story,coloring:G_coloring};
const ICON={memory:'🃏',ws:'🔎',maze:'🐑',letters:'🔤',verse:'📖',quiz:'❓',who:'🤔',story:'📚',coloring:'🎨'};
const CATS=[
 {id:'verse',title:'Memory Verse Games',icon:'📖'},
 {id:'trivia',title:'Bible Trivia',icon:'❓'},
 {id:'puz',title:'Puzzles & Mazes',icon:'🧩'},
 {id:'color',title:'Coloring Pages',icon:'🌈'}
];
const TYPE_NAMES={verse:'Memory Verses',quiz:'Bible Quizzes',who:'Who Am I?',story:'Story Order',ws:'Word Searches',maze:'Mazes',letters:'Missing Letters',memory:'Memory Match',coloring:'Coloring Pages'};
const PLAN=[['Mon','memory0'],['Tue','verse11'],['Wed','quiz1'],['Thu','maze0'],['Fri','ws1'],['Sat','coloring0'],['Sun','verse1']];

/* ---------- app shell ---------- */
const S={tab:'home',cat:null,game:null,age:store.get('age','all'),saved:store.get('saved',[]),played:store.get('played',{}),onKey:null};
const LOGO=`<svg width="86" height="62" viewBox="0 0 86 62" aria-hidden="true"><g stroke="#FFB800" stroke-width="5" stroke-linecap="round"><line x1="43" y1="4" x2="43" y2="12"/><line x1="18" y1="14" x2="24" y2="20"/><line x1="68" y1="14" x2="62" y2="20"/><line x1="8" y1="32" x2="16" y2="32"/><line x1="78" y1="32" x2="70" y2="32"/></g><circle cx="43" cy="34" r="17" fill="#FFD21F"/><path d="M6 40 Q24 34 43 44 Q62 34 80 40 L80 56 Q62 50 43 58 Q24 50 6 56 Z" fill="#FFF6E5" stroke="#2BB673" stroke-width="4" stroke-linejoin="round"/><line x1="43" y1="44" x2="43" y2="58" stroke="#2BB673" stroke-width="3"/></svg>`;
const app=document.getElementById('app');
const avail=()=>ITEMS.filter(g=>S.age==='all'||g.lv.includes(LEVEL[S.age]));
function setAge(a){S.age=a;store.set('age',a);render()}
function go(tab,extra={}){Object.assign(S,{tab,cat:null,game:null,onKey:null},extra);render();window.scrollTo(0,0)}
function toggleSave(id){S.saved=S.saved.includes(id)?S.saved.filter(x=>x!==id):[...S.saved,id];store.set('saved',S.saved);render()}
function play(id){go('game',{game:id})}
function surprise(){const l=avail();play(l[Math.floor(Math.random()*l.length)].id)}
function header(){return h('div',{class:'hero'},h('div',{html:LOGO}),h('h1',{},'Bright Bible Play'),h('p',{},TOTAL+' Bible games & activities for kids'))}
function ageChips(){return h('div',{class:'chips'},['4-6','7-9','10-12'].map(a=>h('button',{class:'chip'+(S.age===a?' on':''),onclick:()=>setAge(S.age===a?'all':a)},'Ages '+a)))}
function itemCard(g){return h('button',{class:'card',onclick:()=>play(g.id)},h('span',{class:'ic'},ICON[g.type]),h('span',{},'#'+g.num+' '+g.title,h('small',{},g.lv.map(l=>['4-6','7-9','10-12'][l]).join(' · ')+(S.played[g.id]?' · ✓ played':''))))}

function vHome(){const m=h('main',{});m.append(header(),h('h2',{style:'text-align:center;margin-top:0'},'Pick a game for class today'),h('button',{class:'btn',onclick:surprise},'✨ Surprise Me! ✨'),ageChips(),
 h('div',{class:'grid2'},CATS.map(c=>{const n=avail().filter(g=>g.cat===c.id).length;return h('button',{class:'card',onclick:()=>go('cat',{cat:c.id})},h('span',{class:'ic'},c.icon),h('span',{},c.title,h('small',{},n+(n===1?' activity':' activities'))))})),
 h('button',{class:'plan',onclick:()=>go('plan')},h('span',{style:'font-size:34px'},'📅'),h('span',{style:'flex:1'},'This week’s plan'),h('span',{},'›')),
 h('p',{class:'foot'},`${S.age==='all'?TOTAL:avail().length} activities shown · works on any phone or tablet`));return m}
function vCat(){const c=CATS.find(x=>x.id===S.cat);const m=h('main',{});const list=avail().filter(g=>g.cat===c.id);
 m.append(h('div',{class:'top'},h('button',{class:'ibtn',onclick:()=>go('home'),'aria-label':'back'},'←'),h('h2',{},c.icon+' '+c.title)),ageChips());
 const types=[...new Set(list.map(g=>g.type))];
 types.forEach(t=>{m.append(h('h2',{},TYPE_NAMES[t]+' ('+list.filter(g=>g.type===t).length+')'),h('div',{style:'display:grid;gap:12px'},list.filter(g=>g.type===t).map(itemCard)))});
 if(!list.length)m.append(h('p',{class:'muted'},'Nothing in this category for that age. Tap the age again to see all.'));return m}
function vPlan(){const m=h('main',{});m.append(h('div',{class:'top'},h('button',{class:'ibtn',onclick:()=>go('home')},'←'),h('h2',{},'📅 This week’s plan')),h('p',{class:'muted'},'One short activity a day. Tap Play to start.'));
 PLAN.forEach(([d,id])=>{const g=itm(id);const done=S.played[id];m.append(h('div',{class:'dayrow'+(done?' done':'')},h('b',{},d),h('span',{style:'font-size:28px'},ICON[g.type]),h('span',{class:'t'},g.title),h('button',{onclick:()=>play(id)},done?'✓ Again':'Play')))});return m}
function vSaved(){const m=h('main',{});m.append(h('div',{class:'top'},h('h2',{},'🔖 Saved activities')));const l=S.saved.map(itm).filter(Boolean);if(!l.length)m.append(h('div',{class:'panel muted'},'Tap the ☆ star inside an activity to save it here for later.'));else m.append(h('div',{style:'display:grid;gap:12px'},l.map(itemCard)));return m}
function vPrint(){const m=h('main',{});m.append(h('div',{class:'top'},h('h2',{},'🖨️ Print')),
 h('div',{class:'panel'},h('p',{style:'margin-top:0'},`All ${TOTAL} activities are also in the printable PDF: word searches, mazes, coloring pages, verse sheets, quizzes, story order, matching cards and an answer key.`),h('a',{class:'btn',style:'text-decoration:none;text-align:center',href:'Bright-Bible-Play-Printables.pdf',target:'_blank'},'Open the printable PDF')),
 h('div',{class:'panel'},h('p',{style:'margin-top:0'},'Printing from the app: open an activity, then use the 🖨 button to print just that screen.')),
 h('p',{class:'foot'},'Scripture quotations are from the King James Version (public domain).'));return m}
function vGame(){const g=itm(S.game);const m=h('main',{});const lv=g.lv;const level=S.age==='all'?(lv.includes(1)?1:lv[0]):(lv.includes(LEVEL[S.age])?LEVEL[S.age]:lv[0]);
 const msg=h('div',{class:'msg'});
 m.append(h('div',{class:'top noprint'},h('button',{class:'ibtn',onclick:()=>go('home'),'aria-label':'back'},'←'),h('h2',{style:'font-size:18px'},'#'+g.num+' '+g.title),h('button',{class:'ibtn',onclick:()=>toggleSave(g.id),'aria-label':'save'},S.saved.includes(g.id)?'★':'☆'),h('button',{class:'ibtn',onclick:()=>window.print(),'aria-label':'print'},'🖨')));
 const box=h('div',{});m.append(box,msg);
 const ctx={level,msg,onKey:null,win(text){S.played[g.id]=(S.played[g.id]||0)+1;store.set('played',S.played);const pool=avail().filter(x=>x.id!==g.id&&!S.played[x.id]);const next=(pool.length?pool:avail().filter(x=>x.id!==g.id));const nx=next[Math.floor(Math.random()*next.length)];
  const ov=h('div',{class:'ov'},h('div',{class:'box pop'},h('div',{class:'big'},'🎉'),h('h3',{},'Great job!'),h('p',{},text),h('button',{class:'btn small',onclick:()=>{ov.remove();play(g.id)}},'Play again'),nx?h('button',{class:'btn alt small',style:'margin-top:8px',onclick:()=>{ov.remove();play(nx.id)}},'Next: #'+nx.num+' '+nx.title):null,h('button',{class:'btn alt small',style:'margin-top:8px',onclick:()=>{ov.remove();go('home')}},'Home')));document.body.append(ov)}};
 RUN[g.type](box,ctx,g);S.onKey=ctx.onKey;return m}
function render(){app.innerHTML='';const v=S.tab==='home'?vHome():S.tab==='cat'?vCat():S.tab==='plan'?vPlan():S.tab==='saved'?vSaved():S.tab==='print'?vPrint():vGame();app.append(v);
 const T=[['home','🎮','Games'],['plan','📅','Plan'],['print','🖨️','Print'],['saved','🔖','Saved']];const cur=['cat','game'].includes(S.tab)?'home':S.tab;
 app.append(h('nav',{class:'noprint'},h('div',{},T.map(([id,e,l])=>h('button',{class:cur===id?'on':'',onclick:()=>go(id)},h('span',{class:'e'},e),l)))))}
document.addEventListener('keydown',e=>{if(S.onKey)S.onKey(e)});
if(!/[?&]print=1/.test(location.search))render();
