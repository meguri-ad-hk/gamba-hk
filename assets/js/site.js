(()=>{'use strict';const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];let zh=false;const menu=$('#mobileNav'),menuBtn=$('.menu-toggle');function setMenu(open){menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?(zh?'關閉導覽選單':'Close navigation'):(zh?'開啟導覽選單':'Open navigation'));}
menuBtn.addEventListener('click',e=>{e.stopPropagation();setMenu(menuBtn.getAttribute('aria-expanded')!=='true');});
$$('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))setMenu(false)});
addEventListener('resize',()=>{if(innerWidth>800)setMenu(false)},{passive:true});function applyLanguage(isZh){
 zh=isZh;document.documentElement.lang=zh?'zh-HK':'en-HK';document.body.classList.toggle('zh',zh);
 $$('[data-en][data-zh]').forEach(el=>{el.textContent=el.getAttribute(zh?'data-zh':'data-en')});
 $$('[data-en-alt][data-zh-alt]').forEach(el=>{el.alt=el.getAttribute(zh?'data-zh-alt':'data-en-alt')});
 $$('[data-en-aria-label][data-zh-aria-label]').forEach(el=>{el.setAttribute('aria-label',el.getAttribute(zh?'data-zh-aria-label':'data-en-aria-label'))});
 $$('[data-en-title][data-zh-title]').forEach(el=>{el.title=el.getAttribute(zh?'data-zh-title':'data-en-title')});
 document.title=zh?'GAMBA HK｜整合營銷與企劃執行':'GAMBA HK — Integrated Marketing & Campaign Execution';
 const d=document.querySelector('meta[name=description]');if(d)d.content=zh?'GAMBA HK 立足香港，結合媒體策劃、項目統籌與專業執行，為品牌提供整合營銷及推廣企劃執行服務。':'GAMBA HK plans and manages integrated marketing campaigns, with established media planning and buying experience across Hong Kong.';
 $$('.language-toggle').forEach(b=>{b.setAttribute('aria-label',zh?'切換至英文':'Switch to Traditional Chinese');b.setAttribute('aria-pressed',String(zh))});
 const menuButton=$('.menu-toggle');if(menuButton)menuButton.setAttribute('aria-label',menuButton.getAttribute('aria-expanded')==='true'?(zh?'關閉導覽選單':'Close navigation'):(zh?'開啟導覽選單':'Open navigation'));
 }
 const initialZh=document.documentElement.lang.toLowerCase().startsWith('zh');
 $$('.language-toggle').forEach(b=>b.addEventListener('click',()=>{window.location.href=zh?'../index.html':'./zh/index.html';}));
 applyLanguage(initialZh);

function currentIndex(track,slides){
 const x=track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft||'0');
 let best=0,dist=Infinity;slides.forEach((s,i)=>{const d=Math.abs(s.getBoundingClientRect().left-x);if(d<dist){dist=d;best=i}});
 return best;
}
function initGallery(trackId,dotsId,prevId,nextId,label){
 const track=$(trackId),slides=[...track.querySelectorAll('.story-slide')],dots=$(dotsId);
 slides.forEach((slide,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Show '+label+' photograph '+(i+1));b.addEventListener('click',()=>go(i));dots.appendChild(b)});
 const prev=prevId?$(prevId):null,next=nextId?$(nextId):null;
 function go(i){i=Math.max(0,Math.min(slides.length-1,i));const x=slides[i].offsetLeft-slides[0].offsetLeft;track.scrollTo({left:x,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
 function update(){const i=currentIndex(track,slides);dots.querySelectorAll('button').forEach((dot,j)=>dot.setAttribute('aria-current',String(j===i)));if(prev)prev.disabled=i===0;if(next)next.disabled=i===slides.length-1;}
 let pending=false;track.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(()=>{update();pending=false})}},{passive:true});
 track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(currentIndex(track,slides)+(e.key==='ArrowRight'?1:-1))}});
 if(prev)prev.addEventListener('click',()=>go(currentIndex(track,slides)-1));
 if(next)next.addEventListener('click',()=>go(currentIndex(track,slides)+1));
 update();return {go,update};
}
initGallery('#storyTrack','#storyDots','#prevSlide','#nextSlide','Foo Hang Jewellery');
initGallery('#ballyhooTrack','#ballyhooDots','#prevBallyhoo','#nextBallyhoo','Ballyhoo');
const serviceImg=$('#serviceImage'),choices=$$('.service-choice'),servicePhotos=['ballyhoo_media_network_corridor.jpg','creative_campaign_materials.jpg','digital_campaign_and_social_media_material.jpg','event_presentation.jpg','fhj_talent_production.jpg','fhj_digital_assets.jpg'],serviceAlt=['Media campaign at MTR','Campaign creative artwork','Social media campaign content','Event activation','Talent and content production','Digital campaign visuals'];let requestId=0;function activateService(i){choices.forEach((b,j)=>{b.classList.toggle('is-selected',j===i);b.setAttribute('aria-pressed',String(j===i))});if(serviceImg.getAttribute('data-active')===String(i))return;const req=++requestId;const next=new Image();next.onload=()=>{if(req!==requestId)return;serviceImg.classList.add('fading');setTimeout(()=>{if(req!==requestId)return;serviceImg.src=next.src;serviceImg.alt=serviceAlt[i];serviceImg.dataset.active=String(i);requestAnimationFrame(()=>serviceImg.classList.remove('fading'))},120)};next.src=cards[i]?.querySelector('img')?.src || ('assets/'+servicePhotos[i])}choices.forEach((b,i)=>{b.addEventListener('click',()=>activateService(i));if(matchMedia('(hover:hover) and (pointer:fine)').matches)b.addEventListener('mouseenter',()=>activateService(i));b.addEventListener('focus',()=>activateService(i))});serviceImg.dataset.active='0';
$$('[data-service-link]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const i=Number(a.dataset.serviceLink);document.querySelector('#services').scrollIntoView({behavior:'smooth'});activateService(i);const card=cards[i];if(card)requestAnimationFrame(()=>serviceTrack.scrollTo({left:card.offsetLeft-cards[0].offsetLeft,behavior:'smooth'}));}));
const serviceTrack=$('#serviceTrack'),cards=$$('.service-card');const serviceDots=$('#serviceDots');cards.forEach((card,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Show service '+(i+1));b.addEventListener('click',()=>serviceTrack.scrollTo({left:card.offsetLeft-cards[0].offsetLeft,behavior:'smooth'}));serviceDots.appendChild(b)});function updateService(){const i=currentIndex(serviceTrack,cards);$$('#serviceDots button').forEach((dot,j)=>dot.setAttribute('aria-current',String(i===j)))}serviceTrack.addEventListener('scroll',()=>requestAnimationFrame(updateService),{passive:true});serviceTrack.addEventListener('keydown',e=>{if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;e.preventDefault();const i=Math.max(0,Math.min(5,currentIndex(serviceTrack,cards)+(e.key==='ArrowRight'?1:-1)));serviceTrack.scrollTo({left:cards[i].offsetLeft-cards[0].offsetLeft,behavior:'smooth'})});updateService();

// V11.2: compositor-first cookie motion. No layout read in the animation loop.
// Mobile Safari can resize its toolbar while scrolling; a height-only resize MUST NOT reset motion.
const hero=$('.hero'),field=$('.hero-motion-field'),cookieEls=[...field.querySelectorAll('.brand-cookie')];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const clamp=(v,lo,hi)=>Math.min(hi,Math.max(lo,v));
let cookies=[],bounds=null,motionTime=0,lastFrame=0,heroInView=true,collisionCount=0;
let heroWidth=0,heroHeight=0,headerHeight=0;
function readBounds(){
 const w=hero.clientWidth,h=hero.clientHeight;
 const nav=$('.site-header .nav');
 // Header measurement is cached, never measured inside requestAnimationFrame.
 headerHeight=nav.getBoundingClientRect().height;
 return {left:18,right:w-18,top:headerHeight+(w<=700?61:75),bottom:h-18};
}
function wall(c){
 const p=Math.max(6,c.sz*.13);
 const loX=bounds.left+p,hiX=Math.max(loX,bounds.right-c.sz-p);
 const loY=bounds.top+p,hiY=Math.max(loY,bounds.bottom-c.sz-p);
 if(c.x<loX){c.x=loX;c.vx=Math.abs(c.vx)}
 if(c.x>hiX){c.x=hiX;c.vx=-Math.abs(c.vx)}
 if(c.y<loY){c.y=loY;c.vy=Math.abs(c.vy)}
 if(c.y>hiY){c.y=hiY;c.vy=-Math.abs(c.vy)}
}
function collide(impulse=true){
 // Rounded scalloped cookies use a calibrated circular contact envelope.
 // Resolve overlap once per pair; only apply an impulse when two cookies are approaching.
 for(let i=0;i<cookies.length;i++)for(let j=i+1;j<cookies.length;j++){
  const a=cookies[i],b=cookies[j];
  let dx=b.x+b.sz*.5-a.x-a.sz*.5,dy=b.y+b.sz*.5-a.y-a.sz*.5;
  let dist=Math.hypot(dx,dy),limit=a.r+b.r;
  if(dist>=limit)continue;
  if(dist<.0001){dx=.01;dy=.0001;dist=Math.hypot(dx,dy)}
  const nx=dx/dist,ny=dy/dist,ia=1/a.m,ib=1/b.m,total=ia+ib;
  const overlap=Math.max(0,limit-dist);
  if(overlap>0){
   const correction=(overlap+.015)/total;
   a.x-=nx*correction*ia;a.y-=ny*correction*ia;
   b.x+=nx*correction*ib;b.y+=ny*correction*ib;
  }
  const approaching=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
  if(impulse&&approaching<-.00005){
   const restitution=.9,force=-(1+restitution)*approaching/total;
   a.vx-=force*nx*ia;a.vy-=force*ny*ia;
   b.vx+=force*nx*ib;b.vy+=force*ny*ib;
   collisionCount++;
  }
 }
}
function drawCookies(){
 // Physics and paint now both use RAF: no 42ms CSS transform tween fighting 32ms updates.
 // Retain sub-pixel coordinates/angles to prevent edge shimmer and quantized rotation.
 for(const c of cookies){
  c.el.style.transform=`translate3d(${c.x.toFixed(3)}px,${c.y.toFixed(3)}px,0) rotate(${c.angle.toFixed(3)}deg)`;
 }
}
function setupCookies(){
 bounds=readBounds();heroWidth=hero.clientWidth;heroHeight=hero.clientHeight;
 const mobile=heroWidth<=700;
 // Restore V11's gentle, stable paths (V11.1's extra random steering caused jitter).
 const starts=mobile?[
  [.16,.13,.102,.073],[.77,.26,-.115,.066],[.33,.51,.091,-.085],
  [.70,.73,-.080,-.092],[.20,.89,.089,-.073]
 ]:[
  [.14,.23,.100,.074],[.76,.15,-.094,.089],[.29,.69,.082,-.083],
  [.82,.64,-.102,-.067],[.56,.35,.086,.091],[.40,.87,-.074,-.090]
 ];
 cookies=[];
 cookieEls.forEach((el,i)=>{
  el.hidden=i>=starts.length;
  if(el.hidden)return;
  const sz=el.getBoundingClientRect().width,r=sz*.475,p=Math.max(6,sz*.12),
        spanX=Math.max(0,bounds.right-bounds.left-sz-2*p),
        spanY=Math.max(0,bounds.bottom-bounds.top-sz-2*p);
  const [fx,fy,vx,vy]=starts[i];
  cookies.push({el,sz,r,m:r*r,x:bounds.left+p+spanX*fx,y:bounds.top+p+spanY*fy,vx,vy,angle:i*13,seed:i+1});
 });
 for(let k=0;k<12;k++){collide(false);cookies.forEach(wall)}
 drawCookies();field.dataset.physics='on';
}
const PHYSICS_STEP=1000/60;
let accumulatedTime=0;
function physicsStep(dt){
 motionTime+=dt;
 for(const c of cookies){
  // Low-amplitude steering preserves the established calm movement without abrupt turns.
  c.vx+=Math.sin(motionTime*.00054+c.seed*1.8)*dt*.000004;
  c.vy+=Math.cos(motionTime*.00047+c.seed*2.2)*dt*.000004;
  const speed=Math.hypot(c.vx,c.vy),min=heroWidth<=700?.066:.075,max=heroWidth<=700?.118:.145;
  if(speed>max){c.vx*=max/speed;c.vy*=max/speed}
  else if(speed<min&&speed>.001){c.vx*=min/speed;c.vy*=min/speed}
  c.x+=c.vx*dt;c.y+=c.vy*dt;
  c.angle+=(c.seed%2?1:-1)*(heroWidth<=700?.00055:.0011)*dt;
  wall(c);
 }
 // One velocity impulse, then a non-impulsive separation pass to prevent repeated jitter.
 collide(true);cookies.forEach(wall);
 collide(false);cookies.forEach(wall);
}
function advanceCookies(dt){
 // Test hook: step physics and render without relying on wall-clock timing.
 const substeps=Math.max(1,Math.ceil(dt/PHYSICS_STEP));
 for(let i=0;i<substeps;i++)physicsStep(dt/substeps);
 drawCookies();
}
function animateCookies(now){
 requestAnimationFrame(animateCookies);
 if(!lastFrame){lastFrame=now;return}
 if(reduced.matches||!heroInView){lastFrame=now;accumulatedTime=0;return}
 // Fixed-step physics means bounce behaviour doesn't depend on screen refresh rate.
 // One compositor transform per frame, without a concurrent CSS transition.
 accumulatedTime+=Math.min(now-lastFrame,50);
 lastFrame=now;
 let steps=0;
 while(accumulatedTime>=PHYSICS_STEP&&steps<3){
  physicsStep(PHYSICS_STEP);
  accumulatedTime-=PHYSICS_STEP;
  steps++;
 }
 if(steps)drawCookies();
}
setupCookies();
if('IntersectionObserver' in window){
 const heroObserver=new IntersectionObserver(entries=>{heroInView=entries[0].isIntersecting},{rootMargin:'100px 0px 100px 0px'});
 heroObserver.observe(hero);
}
addEventListener('resize',()=>{
 const w=hero.clientWidth,h=hero.clientHeight;
 if(Math.abs(w-heroWidth)>3){setupCookies();accumulatedTime=0;lastFrame=0}
 else if(Math.abs(h-heroHeight)>3 && (w>700 || Math.abs(h-heroHeight)>140)){
  // Ignore toolbar-only viewport-height fluctuations on mobile; update on real layout changes.
  heroHeight=h;bounds=readBounds();cookies.forEach(wall);drawCookies();
 }
},{passive:true});
window.__gambaMotion={get positions(){return cookies.map(c=>({x:c.x,y:c.y,size:c.sz,vx:c.vx,vy:c.vy}))},get bounds(){return bounds},get collisions(){return collisionCount},step:advanceCookies};
requestAnimationFrame(animateCookies);

// V11.4 — minimal, re-playable in-view counters (no scroll-settle timers).
// Actual digits stay available in the static HTML when JavaScript is restricted.
const metricBlock=$('.metrics');
const metricEls=[...document.querySelectorAll('.metrics strong[data-count]')];
const valueNodes=metricEls.map(el=>el.querySelector('.count-value'));
const targets=metricEls.map(el=>Number(el.dataset.count));
let metricFrame=0, metricsRunning=false, metricsPlayed=false,metricsInView=false;
function metricsReadable(){
 if(!metricBlock)return false;
 const r=metricBlock.getBoundingClientRect();
 const vh=innerHeight||document.documentElement.clientHeight;
 // Robust on mobile Safari and embedded previews: keep the group within the middle 65%.
 const visible=Math.max(0,Math.min(vh,r.bottom)-Math.max(0,r.top));
 return visible>=Math.min(r.height,vh)*.62 && r.top<vh*.74 && r.bottom>vh*.27;
}
function paintMetrics(progress){
 const eased=progress*progress*(3-2*progress);
 valueNodes.forEach((n,i)=>{n.textContent=String(1+Math.round((targets[i]-1)*eased))});
}
function resetMetricAnimation(){
 if(metricFrame)cancelAnimationFrame(metricFrame);
 metricFrame=0;metricsRunning=false;metricsPlayed=false;paintMetrics(0);
}
function startMetricAnimation(){
 if(metricsRunning)return;
 if(reduced.matches){valueNodes.forEach((n,i)=>n.textContent=String(targets[i]));metricsPlayed=true;return}
 if(metricFrame)cancelAnimationFrame(metricFrame);
 metricsRunning=true;metricsPlayed=false;paintMetrics(0);
 const began=performance.now(),length=2600;
 const frame=now=>{
  if(!metricsInView){metricsRunning=false;metricFrame=0;return}
  const p=Math.min(1,(now-began)/length);
  paintMetrics(p);
  if(p<1){metricFrame=requestAnimationFrame(frame)}
  else {metricsRunning=false;metricsPlayed=true;metricFrame=0}
 };
 metricFrame=requestAnimationFrame(frame);
}
function updateMetrics(){
 const visible=metricsReadable();
 if(visible&&!metricsInView){
  metricsInView=true;
  startMetricAnimation();
 } else if(!visible&&metricsInView){
  metricsInView=false;
  if(!reduced.matches)resetMetricAnimation();
 }
}
if(metricBlock){
 if(!reduced.matches)paintMetrics(0);
 addEventListener('scroll',updateMetrics,{passive:true});
 addEventListener('resize',updateMetrics,{passive:true});
 addEventListener('pageshow',updateMetrics);
 if('IntersectionObserver' in window){
  new IntersectionObserver(updateMetrics,{threshold:[0,.2,.5,.8,1]}).observe(metricBlock);
 }
 // Touching the figures directly also replays: usable in restrictive iOS previews.
 metricBlock.setAttribute('title','Tap the figures to replay');
 metricBlock.addEventListener('click',()=>{metricsInView=true;resetMetricAnimation();startMetricAnimation()});
 requestAnimationFrame(updateMetrics);
}
window.__gambaCounter={get played(){return metricsPlayed},get running(){return metricsRunning},get readable(){return metricsReadable()},get numbers(){return valueNodes.map(n=>n.textContent)},replay:()=>{resetMetricAnimation();metricsInView=true;startMetricAnimation()}};

$('#whatsAppFloat').addEventListener('click',()=>{const t=$('#contactToast');t.hidden=false;t.textContent=zh?'WhatsApp 號碼尚未設定；此為版面預覽。':'WhatsApp number is not configured yet; this is a design preview.';t.onclick=()=>{t.hidden=true}});
$('#enquiryForm').addEventListener('submit',e=>{e.preventDefault();$('#formStatus').textContent=zh?'目前為網站預覽，尚未設定 Formspree，查詢未有送出。':'Website preview: Formspree endpoint has not been configured. Your enquiry was not sent.'});})();