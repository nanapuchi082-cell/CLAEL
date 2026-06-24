/* ============================================================
   CLAEEL LP — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Copyright年の自動更新 ── */
  document.querySelectorAll('.copyright-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ── ハンバーガーメニュー ── */
  var btn     = document.getElementById('hbgBtn');
  var drawer  = document.getElementById('navDrawer');
  var overlay = document.getElementById('navOverlay');
  var closeBtn = document.getElementById('navClose');

  if (btn && drawer && overlay && closeBtn) {
    function openNav() {
      drawer.classList.add('open');
      overlay.classList.add('open');
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeNav() {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    btn.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav);
    drawer.querySelectorAll('.nav-list a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });

    /* Escキーで閉じる */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    /* ウィンドウリサイズ時：PCサイズになったらドロワーを閉じる */
    var mqDesktop = window.matchMedia('(min-width: 1024px)');
    function handleBreakpoint(e) {
      if (e.matches) closeNav();
    }
    if (mqDesktop.addEventListener) {
      mqDesktop.addEventListener('change', handleBreakpoint);
    } else {
      mqDesktop.addListener(handleBreakpoint);
    }
  }

  /* ── FAQ アコーディオン ── */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      /* 他を閉じる */
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
      });
      /* クリックしたものをトグル */
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── スクロールフェードイン（IntersectionObserver）── */
  var fadeTargets = document.querySelectorAll(
    '.feature-card, .voice-card, .ingr-item, .step-item, .faq-item, .pain-items li, .guar-inner, .pain-scene'
  );
  if ('IntersectionObserver' in window && fadeTargets.length) {
    var fadeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeTargets.forEach(function (el) {
      el.classList.add('fade-in');
      fadeObs.observe(el);
    });
  }

  /* ── 返金保証「30」カウントアップ ── */
  var guarDays = document.querySelector('.guar-days');
  if (guarDays && 'IntersectionObserver' in window) {
    var guarObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        var count = 0;
        var timer = setInterval(function () {
          count++;
          guarDays.textContent = count;
          if (count >= 30) clearInterval(timer);
        }, 40);
        guarObs.disconnect();
      }
    }, { threshold: 0.5 });
    guarObs.observe(guarDays);
  }


})();
