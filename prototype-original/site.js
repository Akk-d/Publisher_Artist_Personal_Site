/* ===== CONTENT: edit text, books and paintings here only ===== */
const BK=[{c:'c1',y:'2026',pub:'[Publisher]',pg:'240',isbn:'[ISBN]'},{c:'c2',y:'2022',pub:'[Publisher]',pg:'312',isbn:'[ISBN]'},{c:'c3',y:'2018',pub:'[Publisher]',pg:'188',isbn:'[ISBN]'}];
const PT=[
'<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#c9b78a"/><circle cx="210" cy="70" r="46" fill="#9c3d2b" opacity=".85"/><path d="M0 150 Q80 110 150 140 T300 120 V200 H0Z" fill="#22405a"/><path d="M20 60 C80 20 120 90 180 50" stroke="#2a2118" stroke-width="3" fill="none"/></svg>',
'<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#2a2118"/><circle cx="150" cy="100" r="62" fill="none" stroke="#c9a24a" stroke-width="5"/><path d="M110 120 C130 60 170 60 190 120" stroke="#d8cba9" stroke-width="3" fill="none"/></svg>',
'<svg viewBox="0 0 200 260"><rect width="200" height="260" fill="#b9a878"/><path d="M0 200 Q100 120 200 190 V260 H0Z" fill="#3d4a2c"/><rect x="60" y="40" width="80" height="110" fill="#efe6cf" opacity=".6"/></svg>',
'<svg viewBox="0 0 200 260"><rect width="200" height="260" fill="#22405a"/><path d="M30 220 C60 80 140 80 170 220" stroke="#d8cba9" stroke-width="4" fill="none"/><circle cx="100" cy="70" r="22" fill="#c9a24a"/></svg>',
'<svg viewBox="0 0 200 260"><rect width="200" height="260" fill="#8a3d2b"/><path d="M0 0 L200 260" stroke="#efe6cf" stroke-width="3"/><path d="M200 0 L0 260" stroke="#2a2118" stroke-width="3"/></svg>'];
const T={
en:{note:"Design preview — name, photos, books and paintings are placeholders.",name:"Dr. [Name]",menu:"Menu",n_about:"About",n_books:"Books",n_paint:"Paintings",n_contact:"Contact",
kick:"Doctor of Arabic Literature",lede:"Writer of books on language, memory and the Arabic word. Painter of what the word cannot hold.",cta:"Explore the books",ph:"Portrait photo<br>goes here",cap:"Dr. [Name], in the studio",
h_about:"The writer and the painter",s_about:"Two hands, one practice.",a1:"Dr. [Name] holds a doctorate in Arabic literature and has spent his life between the manuscript and the canvas. His books study how a single word carries a civilisation; his paintings begin where the sentence ends.",a2:"He writes in Arabic and is read in translation across several countries. In the studio he works in ink, pigment and paper, often using the line of the calligrapher as the first stroke of a painting.",
h_books:"Books",s_books:"Selected works, shown here for reading and reference.",all_books:"See all books",b1:"Book Title One",b2:"Book Title Two",b3:"Book Title Three",t1:"Essays, 2026",t2:"Criticism, 2022",t3:"Memoir, 2018",
back:"All books",m_pub:"Publisher",m_year:"Year",m_pages:"Pages",m_isbn:"ISBN",d1:"A paragraph about the book goes here: what it is about, who it is for, and what a reader will find inside.",d2:"A second paragraph: the idea behind the book, a short review quote, or the story of how it was written.",buy:"Buy the book",exc:"Read an excerpt",also:"Also available at:",r1:"Publisher",r2:"Online store",r3:"Local bookshop",h_more:"More books",
h_paint:"Paintings",s_paint:"Ink and pigment on paper and canvas.",s_paint2:"Select a painting to open it full screen and zoom in.",all_paint:"See all paintings",p1:"Untitled I",p2:"Untitled II",p3:"Untitled III",p4:"Untitled IV",p5:"Untitled V",
v_in:"Zoom in",v_out:"Zoom out",v_reset:"Reset zoom",v_close:"Close",v_prev:"Previous painting",v_next:"Next painting",
q:"A word is a small house; a painting is the window left open.",qc:"— Dr. [Name]",h_contact:"Write to him",cp:"For invitations, translations, exhibitions and press.",copy:"© 2026 Dr. [Name]. All rights reserved."},
ar:{note:"معاينة للتصميم — الاسم والصور والكتب واللوحات نصوص مؤقتة.",name:"د. [الاسم]",menu:"القائمة",n_about:"نبذة",n_books:"الكتب",n_paint:"اللوحات",n_contact:"تواصل",
kick:"دكتوراه في الأدب العربي",lede:"كاتبٌ في اللغة والذاكرة والكلمة العربية، ورسّامٌ لما تعجز الكلمة عن حمله.",cta:"تصفّح الكتب",ph:"مكان الصورة<br>الشخصية",cap:"د. [الاسم] في المرسم",
h_about:"الكاتب والرسّام",s_about:"يدان، وصنعةٌ واحدة.",a1:"يحمل د. [الاسم] الدكتوراه في الأدب العربي، وقد أمضى عمره بين المخطوط واللوحة. تدرس كتبه كيف تحمل الكلمة الواحدة حضارةً كاملة، وتبدأ لوحاته حيث تنتهي الجملة.",a2:"يكتب بالعربية ويُقرأ مترجَمًا في بلدان عدة. وفي المرسم يعمل بالحبر والصبغة والورق، ويجعل خطّ الخطّاط أولَ ضربةٍ في اللوحة.",
h_books:"الكتب",s_books:"مؤلفات مختارة للاطّلاع والقراءة.",all_books:"كل الكتب",b1:"عنوان الكتاب الأول",b2:"عنوان الكتاب الثاني",b3:"عنوان الكتاب الثالث",t1:"مقالات، ٢٠٢٦",t2:"نقد، ٢٠٢٢",t3:"سيرة، ٢٠١٨",
back:"كل الكتب",m_pub:"الناشر",m_year:"السنة",m_pages:"الصفحات",m_isbn:"الرقم الدولي",d1:"هنا فقرة عن الكتاب: موضوعه، ولمن كُتب، وما سيجده القارئ بين صفحاته.",d2:"فقرة ثانية: فكرة الكتاب، أو مقتطف من مراجعة، أو قصة كتابته.",buy:"اشترِ الكتاب",exc:"اقرأ مقتطفًا",also:"متوفر أيضًا في:",r1:"دار النشر",r2:"المتجر الإلكتروني",r3:"المكتبة المحلية",h_more:"كتب أخرى",
h_paint:"اللوحات",s_paint:"حبر وصبغة على الورق والقماش.",s_paint2:"اختر لوحة لتفتحها بملء الشاشة وتكبّرها.",all_paint:"كل اللوحات",p1:"بلا عنوان ١",p2:"بلا عنوان ٢",p3:"بلا عنوان ٣",p4:"بلا عنوان ٤",p5:"بلا عنوان ٥",
v_in:"تكبير",v_out:"تصغير",v_reset:"إعادة الحجم",v_close:"إغلاق",v_prev:"اللوحة السابقة",v_next:"اللوحة التالية",
q:"الكلمة بيتٌ صغير، واللوحة نافذته المفتوحة.",qc:"— د. [الاسم]",h_contact:"راسله",cp:"للدعوات والترجمات والمعارض والصحافة.",copy:"© ٢٠٢٦ د. [الاسم]. جميع الحقوق محفوظة."}};

/* ===== ENGINE ===== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const B=document.body,page=B.dataset.page,bid=+(B.dataset.id||0);let L='en';
const cover=i=>`<div class="cover ${BK[i].c}"><small>${BK[i].pub}</small><strong data-i18n="b${i+1}"></strong><small>${BK[i].y}</small></div>`;
const card=i=>`<a class="book" href="book-${i+1}.html">${cover(i)}<h3 data-i18n="b${i+1}"></h3><p data-i18n="t${i+1}"></p></a>`;
const frame=i=>`<figure class="frame" tabindex="0" data-p="${i}">${PT[i]}<figcaption data-i18n="p${i+1}"></figcaption></figure>`;
const shops=()=>`<div class="shops type"><span data-i18n="also"></span> <a href="#" data-i18n="r1"></a><a href="#" data-i18n="r2"></a><a href="#" data-i18n="r3"></a></div>`;
const nav=(h,k)=>`<a href="${h}" data-i18n="${k}"${(k==='n_books'&&(page==='books'||page==='book'))||(k==='n_paint'&&page==='paintings')?' aria-current="page"':''}></a>`;
B.insertAdjacentHTML('afterbegin',`<div class="note" data-i18n="note"></div><header><nav class="wrap"><div class="links" id="links">${nav('index.html','n_about').replace('index.html','index.html#about')}${nav('books.html','n_books')}${nav('paintings.html','n_paint')}${nav('#contact','n_contact')}</div><div class="tools"><button id="menu" aria-expanded="false" aria-controls="links" data-i18n="menu"></button><div class="lang" role="group" aria-label="Language"><button data-l="en">EN</button><button data-l="ar">عربي</button></div></div></nav></header>`);
B.insertAdjacentHTML('beforeend',`<footer id="contact"><div class="wrap"><div class="contact"><div><h2 data-i18n="h_contact"></h2><p data-i18n="cp"></p></div><div><a href="mailto:hello@example.com">hello@example.com</a><a href="#">[Instagram]</a><a href="#">[Publisher / Agent]</a></div></div><div class="copy" data-i18n="copy"></div></div></footer>
<div id="vw" hidden role="dialog" aria-modal="true"><div id="vcap"></div><div class="vb vt"><button id="vx" style="position:static" data-al="v_close">×</button></div><button class="vn" id="vp" data-al="v_prev">‹</button><button class="vn" id="vn" style="inset-inline-end:.6rem" data-al="v_next">›</button><div id="vs"></div><div class="vb vc"><button id="zo" data-al="v_out">−</button><button id="zr" data-al="v_reset">1:1</button><button id="zi" data-al="v_in">+</button></div></div>`);
$$('[data-slot]').forEach(s=>{const k=s.dataset.slot;
 s.innerHTML=k==='books'?BK.map((_,i)=>card(i)).join(''):k==='more'?BK.map((_,i)=>i+1===bid?'':card(i)).join(''):k==='paint'?PT.map((_,i)=>frame(i)).join(''):'';});
if(page==='book'&&bid){const i=bid-1;$('#app').innerHTML=`<div class="wrap bookpg"><div>${cover(i)}</div><div><a class="type" href="books.html" data-i18n="back"></a><h1 data-i18n="b${bid}"></h1><dl class="meta"><dt data-i18n="m_pub"></dt><dd>${BK[i].pub}</dd><dt data-i18n="m_year"></dt><dd>${BK[i].y}</dd><dt data-i18n="m_pages"></dt><dd>${BK[i].pg}</dd><dt data-i18n="m_isbn"></dt><dd>${BK[i].isbn}</dd></dl><p class="drop" data-i18n="d1"></p><p data-i18n="d2"></p><a class="btn" href="#" data-i18n="buy"></a><a class="btn ghost" href="#" data-i18n="exc"></a>${shops()}</div></div>`}
function setLang(l){L=T[l]?l:'en';const d=T[L];document.documentElement.lang=L;document.documentElement.dir=L==='ar'?'rtl':'ltr';
 $$('[data-i18n]').forEach(e=>{if(d[e.dataset.i18n]!==undefined)e.innerHTML=d[e.dataset.i18n]});
 $$('[data-al]').forEach(e=>{e.ariaLabel=e.title=d[e.dataset.al]});
 $$('[data-l]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===L));
 if(page==='book')document.title=d['b'+bid]+' — '+d.name;
 try{localStorage.setItem('lang',L)}catch(e){}}
$$('[data-l]').forEach(b=>b.onclick=()=>setLang(b.dataset.l));
$('#menu').onclick=e=>e.currentTarget.setAttribute('aria-expanded',$('#links').classList.toggle('open'));
$$('#links a').forEach(a=>a.addEventListener('click',()=>$('#links').classList.remove('open')));
let s0='en';try{s0=localStorage.getItem('lang')||'en'}catch(e){}setLang(s0);

/* ===== FULL-SCREEN MAGNIFIER ===== */
const vw=$('#vw'),vs=$('#vs'),V={i:0,s:1,x:0,y:0},ptr=new Map();let pd=0;
const draw=()=>{vs.style.transform=`translate(${V.x}px,${V.y}px) scale(${V.s})`;vs.classList.toggle('z',V.s>1)};
function zoom(f,cx,cy){const n=Math.min(8,Math.max(1,V.s*f)),r=n/V.s,R=vw.getBoundingClientRect(),ox=(cx??R.width/2)-R.width/2,oy=(cy??R.height/2)-R.height/2;V.x=ox-(ox-V.x)*r;V.y=oy-(oy-V.y)*r;V.s=n;if(n===1)V.x=V.y=0;draw()}
function show(i){V.i=(i+PT.length)%PT.length;V.s=1;V.x=V.y=0;vs.innerHTML=PT[V.i];$('#vcap').textContent=T[L]['p'+(V.i+1)];draw()}
function openV(i){vw.hidden=false;B.style.overflow='hidden';show(i);$('#vx').focus()}
function closeV(){vw.hidden=true;B.style.overflow=''}
document.addEventListener('click',e=>{const f=e.target.closest('.frame');if(f)openV(+f.dataset.p)});
document.addEventListener('keydown',e=>{const f=e.target.closest&&e.target.closest('.frame');if(f&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openV(+f.dataset.p)}
 if(vw.hidden)return;if(e.key==='Escape')closeV();if(e.key==='ArrowRight')show(V.i+(L==='ar'?-1:1));if(e.key==='ArrowLeft')show(V.i+(L==='ar'?1:-1));if(e.key==='+'||e.key==='=')zoom(1.4);if(e.key==='-')zoom(1/1.4)});
$('#vx').onclick=closeV;$('#vp').onclick=()=>show(V.i-1);$('#vn').onclick=()=>show(V.i+1);$('#zi').onclick=()=>zoom(1.5);$('#zo').onclick=()=>zoom(1/1.5);$('#zr').onclick=()=>{V.s=1;V.x=V.y=0;draw()};
vw.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.15:1/1.15,e.clientX,e.clientY)},{passive:false});
vs.addEventListener('dblclick',e=>{V.s>1?(V.s=1,V.x=V.y=0,draw()):zoom(3,e.clientX,e.clientY)});
vs.addEventListener('pointerdown',e=>{vs.setPointerCapture(e.pointerId);ptr.set(e.pointerId,[e.clientX,e.clientY]);vs.classList.add('d');pd=0});
vs.addEventListener('pointermove',e=>{const p=ptr.get(e.pointerId);if(!p)return;
 if(ptr.size===2){const o=[...ptr.entries()].find(([k])=>k!==e.pointerId)[1],d=Math.hypot(e.clientX-o[0],e.clientY-o[1]);if(pd)zoom(d/pd,(e.clientX+o[0])/2,(e.clientY+o[1])/2);pd=d}
 else if(V.s>1){V.x+=e.clientX-p[0];V.y+=e.clientY-p[1];draw()}p[0]=e.clientX;p[1]=e.clientY});
['pointerup','pointercancel'].forEach(t=>vs.addEventListener(t,e=>{ptr.delete(e.pointerId);pd=0;if(!ptr.size)vs.classList.remove('d')}));
