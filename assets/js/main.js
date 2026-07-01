(function(){
'use strict';

// Preloader
window.addEventListener('load',function(){
  var p=document.querySelector('.preloader');
  if(p){setTimeout(function(){p.classList.add('done');setTimeout(function(){p.remove()},600)},400)}
});

// Nav scroll
var nav=document.querySelector('.nav');
window.addEventListener('scroll',function(){
  nav.classList.toggle('scrolled',window.scrollY>50);
  var st=document.querySelector('.scroll-top');
  if(st) st.classList.toggle('show',window.scrollY>600);
},{passive:true});

// Mobile menu
var burger=document.querySelector('.burger'),mob=document.querySelector('.mob-menu');
if(burger&&mob){
  burger.addEventListener('click',function(){var o=!mob.classList.contains('open');burger.classList.toggle('open',o);mob.classList.toggle('open',o);nav.classList.toggle('menu-open',o);document.body.style.overflow=o?'hidden':''});
  mob.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){burger.classList.remove('open');mob.classList.remove('open');nav.classList.remove('menu-open');document.body.style.overflow=''})});
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){var h=this.getAttribute('href');if(h==='#')return;var t=document.querySelector(h);if(t){e.preventDefault();window.scrollTo({top:t.offsetTop-80,behavior:'smooth'})}});
});

// Reveal on scroll
var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.rv, .rv-right, .rv-left, .rv-scale').forEach(function(el){obs.observe(el)});

// ═══════════════════════════
// RIPPLE EFFECT ON BUTTONS
// ═══════════════════════════
document.querySelectorAll('.btn-fill, .btn-line, .submit-btn, .nav-cta-btn').forEach(function(btn){
  btn.addEventListener('click',function(e){
    var ripple=document.createElement('span'),d=Math.max(btn.offsetWidth,btn.offsetHeight);
    ripple.className='btn-ripple';
    ripple.style.width=ripple.style.height=d+'px';
    ripple.style.left=(e.clientX-btn.getBoundingClientRect().left-d/2)+'px';
    ripple.style.top=(e.clientY-btn.getBoundingClientRect().top-d/2)+'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend',function(){ripple.remove()});
  });
});

// Counter animation
function animCount(el){
  var target=parseFloat(el.dataset.count),suffix=el.dataset.suffix||'',steps=50,inc=target/steps,cur=0;
  var timer=setInterval(function(){cur+=inc;if(cur>=target){cur=target;clearInterval(timer);el.classList.add('counter-glow');setTimeout(function(){el.classList.remove('counter-glow')},500)}el.textContent=Math.floor(cur)+suffix},30);
}
var cobs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){animCount(e.target);cobs.unobserve(e.target)}})},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(function(el){cobs.observe(el)});

// Active nav link
var sections=document.querySelectorAll('section[id]'),navLinks=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',function(){
  var s=window.scrollY+120;
  sections.forEach(function(sec){
    if(s>=sec.offsetTop&&s<sec.offsetTop+sec.offsetHeight){
      navLinks.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+sec.id)});
    }
  });
},{passive:true});

// Scroll to top
var st=document.querySelector('.scroll-top');
if(st) st.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});

// Gold price — REAL API with smooth count
var gp=document.getElementById('goldPrice');
if(gp){
  var OZ=31.1035,lastPrice=4710,live=false;
  function fmt(n){return '$'+n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,' ').replace('.',',')}
  function smoothCount(el,targetVal,fmtFn,dur){
    var start=parseFloat(el.textContent.replace(/[^0-9.]/g,''))||targetVal*.98,startTime=performance.now();
    function tick(now){
      var p=Math.min((now-startTime)/dur,1),eased=1-Math.pow(1-p,3),val=start+(targetVal-start)*eased;
      el.textContent=fmtFn(val);
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function upd(price){
    lastPrice=price;
    var g24=price/OZ,g22=g24*22/24,g18=g24*18/24;
    smoothCount(gp,price,fmt,800);
    var e24=document.getElementById('p24'),e22=document.getElementById('p22'),e18=document.getElementById('p18'),eCfa=document.getElementById('pCFA'),eTime=document.getElementById('pTime');
    if(e24)smoothCount(e24,g24,fmt,600);if(e22)smoothCount(e22,g22,fmt,600);if(e18)smoothCount(e18,g18,fmt,600);
    if(eCfa){var cfaVal=Math.round(g24*608);eCfa.textContent=cfaVal.toLocaleString('fr-FR')+' FCFA'}
    if(eTime)eTime.textContent=live?(window.aogTr('priceUpdated')+new Date().toLocaleTimeString(window.AOG_LANG==='en'?'en-GB':'fr-FR',{hour:'2-digit',minute:'2-digit'})):window.aogTr('priceIndicative');
  }
  upd(4710);
  window.__i18nHooks.push(function(){upd(lastPrice);});
  function fetchGold(){
    fetch('https://api.gold-api.com/price/XAU').then(function(r){return r.ok?r.json():Promise.reject()}).then(function(d){if(d&&d.price){live=true;upd(d.price);pulsePrice()}}).catch(function(){});
  }
  fetchGold();setInterval(fetchGold,300000);
}

// Map interactivity
var mapInfo=document.querySelector('.map-info');
document.querySelectorAll('.map-site').forEach(function(s){
  s.addEventListener('mouseenter',function(){
    if(mapInfo){mapInfo.innerHTML='<strong>'+this.dataset.name+'</strong>'+this.dataset.region}
  });
  s.addEventListener('mouseleave',function(){
    if(mapInfo){mapInfo.innerHTML='<strong>'+window.aogTr('mapName')+'</strong>'+window.aogTr('mapHint')}
  });
});
function resetMapInfo(){if(mapInfo){mapInfo.innerHTML='<strong>'+window.aogTr('mapName')+'</strong>'+window.aogTr('mapHint')}}
window.__i18nHooks.push(resetMapInfo);

// Contact form
var form=document.getElementById('contactForm'),msg=document.getElementById('formMsg');
if(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var btn=form.querySelector('.submit-btn'),orig=btn.textContent;
    btn.disabled=true;btn.textContent=window.aogTr('sending');
    new Promise(function(r){setTimeout(function(){r({json:function(){return Promise.resolve({success:true,message:window.aogTr('formOk')})}})},800)})
    .then(function(r){return r.json()})
    .then(function(d){
      if(msg){msg.className='form-msg show '+(d.success?'ok':'err');msg.textContent=d.message}
      if(d.success)form.reset();
      setTimeout(function(){if(msg)msg.classList.remove('show')},7000);
    })
    .catch(function(){if(msg){msg.className='form-msg show err';msg.textContent=window.aogTr('formErr')}})
    .finally(function(){btn.disabled=false;btn.textContent=orig});
  });
}

// ═══════════════════════════
// SCROLL PROGRESS BAR
// ═══════════════════════════
var progBar=document.querySelector('.scroll-progress');
if(progBar){
  window.addEventListener('scroll',function(){
    var h=document.documentElement.scrollHeight-window.innerHeight;
    var p=h>0?(window.scrollY/h)*100:0;
    progBar.style.width=p+'%';
  },{passive:true});
}

// ═══════════════════════════
// HERO PARALLAX
// ═══════════════════════════
var paraBg=document.querySelector('.parallax-bg');
if(paraBg){
  window.addEventListener('scroll',function(){
    var scrolled=window.scrollY;
    if(scrolled<window.innerHeight){
      paraBg.style.transform='translateY('+(scrolled*0.18)+'px)';
    }
  },{passive:true});
}

// ═══════════════════════════
// STAGGERED REVEAL
// ═══════════════════════════
var stagObs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('in');stagObs.unobserve(e.target)}
  });
},{threshold:.15,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv-stagger').forEach(function(el){stagObs.observe(el)});

// ═══════════════════════════
// GOLD PRICE PULSE ON UPDATE
// ═══════════════════════════
var pc=document.querySelector('.price-card');
function pulsePrice(){
  if(pc){pc.classList.add('price-flash');setTimeout(function(){pc.classList.remove('price-flash')},600)}
}

// ═══════════════════════════
// PROCESS CONNECTOR ANIMATION
// ═══════════════════════════
var stepsEl=document.querySelector('.steps');
if(stepsEl){
  var stepsObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('connected');stepsObs.unobserve(e.target)}});
  },{threshold:.3});
  stepsObs.observe(stepsEl);
}

// ═══════════════════════════
// GALLERY LIGHTBOX
// ═══════════════════════════
(function(){
  var items=Array.prototype.slice.call(document.querySelectorAll('#gallery .gal-item'));
  if(!items.length)return;
  var lb=document.getElementById('lb'),lbImg=document.getElementById('lbImg'),
      lbCap=document.getElementById('lbCap'),lbCount=document.getElementById('lbCount'),
      cur=0;
  var slides=items.map(function(it){
    var img=it.querySelector('img'),cap=it.querySelector('.gal-cap');
    return {
      src:img.getAttribute('src').replace(/([?&])w=\d+/,'$1w=1600').replace(/&h=\d+/,''),
      alt:img.getAttribute('alt')||'',
      small:cap?(cap.querySelector('small')||{}).textContent||'':'',
      title:cap?(cap.querySelector('h4')||{}).textContent||'':''
    };
  });
  function show(i){
    cur=(i+slides.length)%slides.length;
    var s=slides[cur];
    lbImg.src=s.src;lbImg.alt=s.alt;
    lbCap.innerHTML='<b>'+s.title+'</b><small>'+s.small+'</small>';
    lbCount.textContent=(cur+1)+' / '+slides.length;
  }
  function open(i){show(i);lb.classList.add('open');document.body.style.overflow='hidden'}
  function close(){lb.classList.remove('open');document.body.style.overflow='';lbImg.src=''}
  items.forEach(function(it,i){
    it.setAttribute('role','button');it.setAttribute('tabindex','0');
    it.addEventListener('click',function(){open(i)});
    it.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i)}});
  });
  document.getElementById('lbClose').addEventListener('click',close);
  document.getElementById('lbPrev').addEventListener('click',function(e){e.stopPropagation();show(cur-1)});
  document.getElementById('lbNext').addEventListener('click',function(e){e.stopPropagation();show(cur+1)});
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();
    else if(e.key==='ArrowLeft')show(cur-1);
    else if(e.key==='ArrowRight')show(cur+1);
  });
})();

// Apply persisted language (static text + dynamic hooks)
if(window.aogSetLang)window.aogSetLang(window.AOG_LANG||'fr');

})();

// --- année du footer ---
document.getElementById('yr').textContent=new Date().getFullYear()
