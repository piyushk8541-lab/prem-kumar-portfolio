/* ============================================================================
   ⚡ PREM KUMAR ELECTRONICS — script.js
   Smooth scroll | Mobile menu | Scroll reveal | Marquee | Services toggle
   Testimonial carousel | Form validation + Formspree/WhatsApp | Back-to-top
============================================================================ */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     0. CONFIG — yahan apni cheezein badlein
  ------------------------------------------------------------------ */
  var WHATSAPP_NUMBER = '919876543210';   /* ⚠️ REPLACE: real WhatsApp number (country code ke saath, bina +) */
  var TESTIMONIAL_AUTOPLAY_MS = 5000;     /* review kitne second mein badle (mobile) */

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ------------------------------------------------------------------
     1. STICKY NAVBAR — scroll pe shadow + mobile hamburger menu
  ------------------------------------------------------------------ */
  var navbar    = $('#navbar');
  var navToggle = $('#navToggle');
  var navLinks  = $('#navLinks');

  function onNavScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onNavScroll, { passive: true });
  onNavScroll();

  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  /* Menu link click — menu band karo (mobile) */
  $$('#navLinks a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ------------------------------------------------------------------
     2. SCROLL REVEAL — IntersectionObserver se fade-in
  ------------------------------------------------------------------ */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal').forEach(function (el) { revealObserver.observe(el); });
  } else {
    /* Purane browser ke liye sab kuch dikha do */
    $$('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }

  /* ------------------------------------------------------------------
     3. ACTIVE NAV LINK — kaunsa section screen pe hai
  ------------------------------------------------------------------ */
  var sections = $$('main section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    var navMap = {};
    $$('#navLinks a').forEach(function (a) {
      navMap[a.getAttribute('href').slice(1)] = a;
    });
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && navMap[entry.target.id]) {
          $$('#navLinks a').forEach(function (a) { a.classList.remove('active'); });
          navMap[entry.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ------------------------------------------------------------------
     4. TRUST BAR MARQUEE — wide screens ke liye content kaafi badao
        (track ka -50% translate seamless loop deta hai)
  ------------------------------------------------------------------ */
  (function marquee() {
    var track = $('[data-marquee] .marquee-track');
    if (!track) return;
    var baseHTML = track.innerHTML; /* already contains 2 duplicate sets */
    var container = track.parentElement;
    var guard = 0;
    while (track.scrollWidth < container.clientWidth * 2.2 && guard < 4) {
      track.innerHTML += baseHTML; /* sets hamesha even multiple mein badhte hain */
      guard++;
    }
  })();

  /* ------------------------------------------------------------------
     5. "VIEW ALL SERVICES" — expandable grid
  ------------------------------------------------------------------ */
  (function servicesToggle() {
    var btn   = $('#viewAllBtn');
    var extra = $('#svcExtra');
    if (!btn || !extra) return;

    /* Page load pe extra 8 services chhupao */
    extra.setAttribute('hidden', '');

    btn.addEventListener('click', function () {
      var isHidden = extra.hasAttribute('hidden');
      if (isHidden) {
        extra.removeAttribute('hidden');
        /* reveal animation naye cards pe chalao */
        $$('.reveal', extra).forEach(function (el) { el.classList.add('visible'); });
      } else {
        extra.setAttribute('hidden', '');
      }
      btn.setAttribute('aria-expanded', String(isHidden));
      $('.view-all-label', btn).textContent = isHidden ? 'Show Fewer Services' : 'View All 16 Services';
    });
  })();

  /* ------------------------------------------------------------------
     6. TESTIMONIAL CAROUSEL — mobile pe auto-slide + swipe + dots
  ------------------------------------------------------------------ */
  (function testimonialCarousel() {
    var track   = $('#testimonialTrack');
    var prevBtn = $('#prevTestimonial');
    var nextBtn = $('#nextTestimonial');
    var dotsBox = $('#carouselDots');
    if (!track) return;

    var cards   = $$('.testimonial-card', track);
    var index   = 0;
    var timer   = null;

    /* Dots banao */
    cards.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Review ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); restart(); });
      dotsBox.appendChild(dot);
    });
    var dots = $$('button', dotsBox);

    function isMobile() { return window.matchMedia('(max-width: 768px)').matches; }

    function render() {
      dots.forEach(function (d, i) { d.classList.toggle('active', i === index); });
      track.style.transform = isMobile() ? 'translateX(-' + (index * 100) + '%)' : '';
    }

    function goTo(i) {
      index = (i + cards.length) % cards.length;
      render();
    }

    prevBtn.addEventListener('click', function () { goTo(index - 1); restart(); });
    nextBtn.addEventListener('click', function () { goTo(index + 1); restart(); });

    /* Auto-slide — sirf mobile pe */
    function start() {
      stop();
      if (!isMobile()) return;
      timer = setInterval(function () { goTo(index + 1); }, TESTIMONIAL_AUTOPLAY_MS);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { start(); }

    /* Touch swipe support */
    var touchX = null;
    track.addEventListener('touchstart', function (e) {
      touchX = e.touches[0].clientX;
      stop();
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var delta = e.changedTouches[0].clientX - touchX;
      if (Math.abs(delta) > 40) { goTo(index + (delta < 0 ? 1 : -1)); }
      touchX = null;
      start();
    }, { passive: true });

    /* Hover pe ruko, resize pe reset */
    var carousel = $('#testimonialCarousel');
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    window.addEventListener('resize', function () { render(); start(); }, { passive: true });
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });

    render();
    start();
  })();

  /* ------------------------------------------------------------------
     7. BOOKING FORM — validation + submit
  ------------------------------------------------------------------ */
  (function bookingForm() {
    var form    = $('#bookingForm');
    if (!form) return;
    var success = $('#formSuccess');
    var btn     = $('#submitBtn');
    var dateInp = $('#fDate');

    /* Preferred date — aaj se pehle ki tarikh nahi chalegi */
    if (dateInp) {
      var today = new Date();
      var iso = today.getFullYear() + '-' +
                String(today.getMonth() + 1).padStart(2, '0') + '-' +
                String(today.getDate()).padStart(2, '0');
      dateInp.min = iso;
    }

    function setError(id, msg) {
      var field = $('#' + id);
      var box   = $('[data-error-for="' + id + '"]');
      field.closest('.form-field').classList.toggle('invalid', !!msg);
      if (box) box.textContent = msg || '';
    }

    function validIndianPhone(raw) {
      var digits = (raw || '').replace(/\D/g, '');
      digits = digits.replace(/^(91|0)/, '');          /* +91 / 0 hatao */
      return /^[6-9]\d{9}$/.test(digits);              /* Indian mobile: 6-9 se shuru, 10 digit */
    }

    function validate() {
      var ok = true;
      var name      = $('#fName').value.trim();
      var phone     = $('#fPhone').value.trim();
      var appliance = $('#fAppliance').value;
      var problem   = $('#fProblem').value.trim();

      if (name.length < 3)          { setError('fName', 'Kripya apna poora naam likhein (min 3 letters).'); ok = false; } else setError('fName');
      if (!validIndianPhone(phone)) { setError('fPhone', 'Sahi 10-digit mobile number daalein (e.g. 98765 43210).'); ok = false; } else setError('fPhone');
      if (!appliance)               { setError('fAppliance', 'Kripya appliance select karein.'); ok = false; } else setError('fAppliance');
      if (problem.length < 10)      { setError('fProblem', 'Problem thodi detail mein likhein (min 10 characters).'); ok = false; } else setError('fProblem');
      return ok;
    }

    /* Live validation — type karte hi error saaf ho */
    ['fName', 'fPhone', 'fAppliance', 'fProblem'].forEach(function (id) {
      var el = $('#' + id);
      el.addEventListener('input',  function () { setError(id); });
      el.addEventListener('change', function () { setError(id); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstBad = $('.form-field.invalid', form);
        if (firstBad) { firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        return;
      }

      var data = {
        name:      $('#fName').value.trim(),
        phone:     $('#fPhone').value.trim(),
        appliance: $('#fAppliance').value,
        problem:   $('#fProblem').value.trim(),
        date:      $('#fDate').value || 'Jald se jald / ASAP'
      };

      var action = form.getAttribute('action') || '';
      var formspreeReady = action.indexOf('formspree.io') !== -1 && action.indexOf('YOUR_FORM_ID') === -1;

      if (formspreeReady) {
        /* --- PATH A: Formspree configured → AJAX submit, email Prem Kumar Ji ko jayega --- */
        btn.disabled = true;
        btn.textContent = '⏳ Bhej rahe hain...';

        fetch(action, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name, phone: data.phone, appliance: data.appliance,
            problem: data.problem, preferred_date: data.date,
            _subject: '🔧 Naya Repair Booking — ' + data.name + ' (' + data.appliance + ')'
          })
        })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            success.hidden = false;
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            throw new Error('Formspree error ' + res.status);
          }
        })
        .catch(function () {
          /* Network fail → WhatsApp pe le jao */
          openWhatsApp(data);
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = '🔧 Repair Book Karein';
        });
      } else {
        /* --- PATH B: Formspree abhi setup nahi hai → WhatsApp pe booking bhejo ---
           (Email-only chahiye? Niche mailto line uncomment kar dein:)
           window.location.href = 'mailto:premkumar.electronics@gmail.com?subject=' + ...        */
        openWhatsApp(data);
        success.hidden = false;
      }
    });

    function openWhatsApp(d) {
      var msg =
        '🔧 *Naya Repair Booking*%0A%0A' +
        '👤 Naam: ' + encodeURIComponent(d.name) + '%0A' +
        '📞 Phone: ' + encodeURIComponent(d.phone) + '%0A' +
        '🛠️ Appliance: ' + encodeURIComponent(d.appliance) + '%0A' +
        '📝 Problem: ' + encodeURIComponent(d.problem) + '%0A' +
        '📅 Date: ' + encodeURIComponent(d.date);
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg, '_blank', 'noopener');
    }
  })();

  /* ------------------------------------------------------------------
     8. BACK-TO-TOP floating button
  ------------------------------------------------------------------ */
  (function backToTop() {
    var btn = $('#backToTop');
    if (!btn) return;
    function onScroll() { btn.classList.toggle('show', window.scrollY > 600); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  /* ------------------------------------------------------------------
     9. FOOTER YEAR — automatic update
  ------------------------------------------------------------------ */
  var yearEl = $('#year');
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

})();
