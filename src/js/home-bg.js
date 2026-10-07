/* Drifting Arabic letters behind the name and portrait (home page only).
   Moved unchanged from the prototype's inline script. */
(function(){
 const st=document.querySelector('.stage'),c=document.getElementById('bg'),x=c.getContext('2d');
 const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const G='ا ب ت ث ج ح خ د ر س ش ص ع غ ف ق ك ل م ن ه و ي كلمة حبر قلم سطر ديوان'.split(' ');
 let W,H,P=[],m={x:-999,y:-999},raf=0,vis=true;
 function size(){
  const r=st.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),sm=r.width<800;
  W=r.width;H=r.height;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
  const n=Math.round(W*H/(sm?65000:48000));
  P=Array.from({length:n},()=>{const b=-.3-Math.random()*.55;
   return{t:G[Math.random()*G.length|0],x:Math.random()*W,y:Math.random()*H,s:(sm?18:22)+Math.random()*(sm?40:60),b,vx:0,vy:b,a:(sm?.04:.05)+Math.random()*(sm?.09:.12),r:(Math.random()-.5)*.6}});
  draw1();
 }
 function draw1(){
  x.clearRect(0,0,W,H);x.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--ink').trim()||'#2a2118';
  for(const p of P){
   if(!RM){const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1;
    if(d<150){const f=(150-d)/150;p.vx+=dx/d*f*1.4;p.vy+=dy/d*f*1.4}
    p.x+=p.vx;p.y+=p.vy;p.vx*=.93;p.vy+=(p.b-p.vy)*.03;
    if(p.y<-100){p.y=H+60;p.x=Math.random()*W}}
   x.save();x.globalAlpha=p.a;x.translate(p.x,p.y);x.rotate(p.r);x.font=p.s+'px Amiri,serif';x.fillText(p.t,0,0);x.restore();
  }
 }
 function loop(){draw1();raf=vis&&!RM?requestAnimationFrame(loop):0}
 function start(){if(!raf&&!RM)raf=requestAnimationFrame(loop)}
 const aim=e=>{const r=c.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top};
 addEventListener('pointermove',aim,{passive:true});addEventListener('pointerdown',aim,{passive:true});
 addEventListener('pointerup',()=>{m.x=m.y=-999});
 new ResizeObserver(size).observe(st);
 new IntersectionObserver(([e])=>{vis=e.isIntersecting;if(vis)start()}).observe(st);
 document.fonts.ready.then(()=>{size();start()});
})();
