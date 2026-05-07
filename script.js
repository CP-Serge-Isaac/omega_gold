/**
 * ALPHA ET OMEGA GOLD · Shared Scripts
 * Multi-page : index.html / services.html / contact.html
 */
(function () {
  'use strict';

  /* ── Preloader ── */
  window.addEventListener('load', function () {
    var p = document.querySelector('.preloader');
    if (p) { setTimeout(function () { p.classList.add('done'); setTimeout(function () { p.remove(); }, 500); }, 300); }
  });

  /* ── Nav scroll ── */
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 50);
      var top = document.querySelector('.scroll-top');
      if (top) top.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
  }

  /* ── Mobile menu ── */
  var burger = document.querySelector('.burger');
  var mob = document.querySelector('.mob-menu');
  if (burger && mob) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      mob.classList.toggle('open');
      document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
    });
    mob.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('open');
        mob.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Smooth scroll (anchor links within same page) ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var h = this.getAttribute('href');
      if (h === '#') return;
      var t = document.querySelector(h);
      if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' }); }
    });
  });

  /* ── Reveal on scroll ── */
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv').forEach(function (el) { obs.observe(el); });

  /* ── Counter animation ── */
  function animCount(el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var steps = 40;
    var inc = target / steps;
    var cur = 0;
    var timer = setInterval(function () {
      cur += inc;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = Math.floor(cur) + suffix;
    }, 25);
  }
  var cobs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { animCount(e.target); cobs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cobs.observe(el); });

  /* ── Active nav link (scroll spy — index only) ── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', function () {
      var s = window.scrollY + 120;
      sections.forEach(function (sec) {
        if (s >= sec.offsetTop && s < sec.offsetTop + sec.offsetHeight) {
          navLinks.forEach(function (a) {
            var href = a.getAttribute('href');
            if (href && href.indexOf('#') !== -1) {
              a.classList.toggle('active', href.split('#')[1] === sec.id);
            }
          });
        }
      });
    }, { passive: true });
  }

  /* ── Scroll to top ── */
  var st = document.querySelector('.scroll-top');
  if (st) st.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ── Gold price ── */
  var gp = document.getElementById('goldPrice');
  if (gp) {
    var OZ = 31.1035;
    function fmt(n) { return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.', ','); }
    function upd(price) {
      var g24 = price / OZ, g22 = (g24 * 22) / 24, g18 = (g24 * 18) / 24;
      gp.textContent = fmt(price);
      var e24 = document.getElementById('p24'), e22 = document.getElementById('p22'), e18 = document.getElementById('p18'), eCfa = document.getElementById('pCFA'), eTime = document.getElementById('pTime');
      if (e24) e24.textContent = fmt(g24);
      if (e22) e22.textContent = fmt(g22);
      if (e18) e18.textContent = fmt(g18);
      if (eCfa) eCfa.textContent = Math.round(g24 * 608).toLocaleString('fr-FR') + ' FCFA';
      if (eTime) eTime.textContent = 'Mis à jour : ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    upd(4710);
    function fetchGold() { fetch('https://api.gold-api.com/price/XAU').then(function (r) { return r.json(); }).then(function (d) { if (d && d.price) upd(d.price); }).catch(function () {}); }
    fetchGold();
    setInterval(fetchGold, 300000);
  }

  /* ── Map interactivity ── */
  var mapInfo = document.querySelector('.map-info');
  document.querySelectorAll('.map-site').forEach(function (s) {
    s.addEventListener('mouseenter', function () { if (mapInfo) mapInfo.innerHTML = '<strong>' + this.dataset.name + '</strong>' + this.dataset.region; });
    s.addEventListener('mouseleave', function () { if (mapInfo) mapInfo.innerHTML = "<strong>Zones d'opération</strong>Survolez un site"; });
  });

  /* ── Contact form ── */
  var form = document.getElementById('contactForm');
  var msg = document.getElementById('formMsg');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.submit-btn');
      var orig = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Envoi...';
      new Promise(function (r) { setTimeout(function () { r({ json: function () { return Promise.resolve({ success: true, message: 'Aperçu — en production ce message serait envoyé.' }); } }); }, 800); })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (msg) { msg.className = 'form-msg show ' + (d.success ? 'ok' : 'err'); msg.textContent = d.message; }
          if (d.success) form.reset();
          setTimeout(function () { if (msg) msg.classList.remove('show'); }, 7000);
        })
        .catch(function () { if (msg) { msg.className = 'form-msg show err'; msg.textContent = 'Erreur. Contactez-nous par téléphone.'; } })
        .finally(function () { btn.disabled = false; btn.textContent = orig; });
    });
  }

})();
