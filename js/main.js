(function () {
  'use strict';

  document.documentElement.classList.add('js');

  const CODE_SNIPPET = [
    { text: '<!DOCTYPE html>\n', type: 'tok-tag' },
    { text: '<html lang="it">\n', type: 'tok-tag' },
    { text: '<head>\n', type: 'tok-tag' },
    { text: '  <title>', type: 'tok-tag' },
    { text: 'Evolo Digital Studio', type: 'tok-val' },
    { text: '</title>\n', type: 'tok-tag' },
    { text: '  <link rel="stylesheet" href="style.css">\n', type: 'tok-tag' },
    { text: '</head>\n', type: 'tok-tag' },
    { text: '<body>\n', type: 'tok-tag' },
    { text: '  <section class="hero">\n', type: 'tok-tag' },
    { text: '    <h1>', type: 'tok-tag' },
    { text: 'Siti che portano clienti', type: 'tok-text' },
    { text: '</h1>\n', type: 'tok-tag' },
    { text: '    <p>', type: 'tok-tag' },
    { text: 'HTML · CSS · JS · WordPress', type: 'tok-text' },
    { text: '</p>\n', type: 'tok-tag' },
    { text: '  </section>\n', type: 'tok-tag' },
    { text: '</body>\n', type: 'tok-tag' },
    { text: '</html>', type: 'tok-tag' },
  ];

  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const codeEl = document.getElementById('code-animation');
  const contactForm = document.getElementById('contact-form');
  const stickyCta = document.getElementById('sticky-cta');
  const navLinks = document.querySelectorAll('.header__links a');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  /* ---- Header scroll ---- */
  function onScroll() {
    if (header) header.classList.toggle('header--scrolled', window.scrollY > 20);
    updateActiveNav();

    if (stickyCta) {
      const heroBottom = document.getElementById('hero')?.offsetHeight || 600;
      stickyCta.classList.toggle('visible', window.scrollY > heroBottom && window.innerWidth <= 768);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
      document.body.classList.toggle('menu-open', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (nav) nav.classList.remove('open');
      if (menuToggle) {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      document.body.classList.remove('menu-open');
    });
  });

  /* ---- Code typing animation ---- */
  let charIndex = 0;
  const TYPING_SPEED = 26;
  const PAUSE_END = 3500;
  const PAUSE_START = 1000;

  function getFlatChars() {
    const chars = [];
    CODE_SNIPPET.forEach((token, ti) => {
      for (let i = 0; i < token.text.length; i++) {
        chars.push({ tokenIndex: ti, charIndex: i });
      }
    });
    return chars;
  }

  const flatChars = getFlatChars();

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderCode(upToChar) {
    let html = '';
    let count = 0;
    for (let ti = 0; ti < CODE_SNIPPET.length; ti++) {
      const token = CODE_SNIPPET[ti];
      const tokenLen = token.text.length;
      if (count + tokenLen <= upToChar) {
        html += `<span class="${token.type}">${escapeHtml(token.text)}</span>`;
        count += tokenLen;
      } else if (count < upToChar) {
        html += `<span class="${token.type}">${escapeHtml(token.text.slice(0, upToChar - count))}</span>`;
        break;
      } else {
        break;
      }
    }
    return html;
  }

  function typeCode() {
    if (!codeEl) return;
    if (charIndex < flatChars.length) {
      charIndex++;
      codeEl.innerHTML = renderCode(charIndex);
      setTimeout(typeCode, TYPING_SPEED);
    } else {
      setTimeout(resetCode, PAUSE_END);
    }
  }

  function resetCode() {
    charIndex = 0;
    if (codeEl) codeEl.innerHTML = '';
    setTimeout(typeCode, PAUSE_START);
  }

  if (codeEl) setTimeout(typeCode, PAUSE_START);

  /* ---- Counter animation ---- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Hero stagger ---- */
  const hero = document.getElementById('hero');
  if (hero) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => hero.classList.add('is-ready'));
    });
  }

  /* ---- Parallax + mouse tilt (studio presence) ---- */
  const heroBg = document.querySelector('.hero__bg');
  const heroVisual = document.querySelector('.hero__visual');
  const canParallax = !reduceMotion
    && window.matchMedia('(pointer: fine)').matches
    && window.matchMedia('(min-width: 769px)').matches;
  if (canParallax && (heroBg || heroVisual)) {
    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let ticking = false;

    function renderMotion() {
      if (heroBg) {
        heroBg.style.transform = `translate3d(${mouseX * -12}px, ${scrollY * 0.22 + mouseY * -8}px, 0)`;
      }
      if (heroVisual) {
        heroVisual.style.transform = `translate3d(${mouseX * 18}px, ${mouseY * 12}px, 0)`;
      }
      ticking = false;
    }

    function requestRender() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(renderMotion);
    }

    window.addEventListener(
      'scroll',
      () => {
        scrollY = Math.min(window.scrollY, 700);
        requestRender();
      },
      { passive: true }
    );

    if (hero) {
      hero.addEventListener('pointermove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        requestRender();
      });
      hero.addEventListener('pointerleave', () => {
        mouseX = 0;
        mouseY = 0;
        requestRender();
      });
    }
  }

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add('visible'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* Auto-enrich section headers for studio motion */
  if (!reduceMotion) {
    document.querySelectorAll('.section__header, .stats-band__item, .service-card, .process__step, .method__step, .case-study, .plugin-card, .pricing-card, .faq__item, .portfolio-reel').forEach((el, i) => {
      if (el.classList.contains('reveal') || el.classList.contains('reveal-left') || el.classList.contains('reveal-scale') || el.classList.contains('hero-enter') || el.classList.contains('method__step')) return;
      el.classList.add(i % 3 === 0 ? 'reveal-scale' : 'reveal');
      if (i % 4 === 1) el.classList.add('reveal--delay');
      if (i % 4 === 2) el.classList.add('reveal--delay-2');
      if (i % 4 === 3) el.classList.add('reveal--delay-3');
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );
        obs.observe(el);
      } else {
        el.classList.add('visible');
      }
    });
  }

  /* ---- Method progress line (scroll-driven) ---- */
  const method = document.getElementById('method');
  const methodProgress = document.getElementById('method-progress');
  const methodSteps = document.querySelectorAll('.method__step');
  if (method && methodProgress && methodSteps.length && !reduceMotion) {
    function updateMethodProgress() {
      const rect = method.getBoundingClientRect();
      const view = window.innerHeight || 800;
      const start = view * 0.75;
      const end = view * 0.25;
      const raw = (start - rect.top) / (start - end + rect.height * 0.35);
      const progress = Math.max(0, Math.min(1, raw));
      methodProgress.style.width = `${progress * 100}%`;
      const activeCount = Math.min(methodSteps.length, Math.floor(progress * methodSteps.length + 0.2) + 1);
      methodSteps.forEach((step, i) => {
        step.classList.toggle('is-active', i < activeCount);
      });
    }
    window.addEventListener('scroll', updateMethodProgress, { passive: true });
    window.addEventListener('resize', updateMethodProgress);
    updateMethodProgress();
  } else if (methodSteps.length) {
    methodSteps.forEach((step) => step.classList.add('is-active'));
  }

  /* Keep portfolio reel muted & playing when visible */
  const reel = document.querySelector('.portfolio-reel__video');
  if (reel) {
    reel.muted = true;
    reel.setAttribute('muted', '');
    if ('IntersectionObserver' in window && !reduceMotion) {
      const reelObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reel.play().catch(() => {});
            } else {
              reel.pause();
            }
          });
        },
        { threshold: 0.35 }
      );
      reelObs.observe(reel);
    }
  }

  /* ---- Contact form (Web3Forms) ---- */
  if (contactForm) {
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit');
    const btnLabel = submitBtn ? submitBtn.querySelector('.btn__label') : null;

    function setFormStatus(type, message) {
      if (!formStatus) return;
      formStatus.hidden = false;
      formStatus.className = `form-status form-status--${type}`;
      formStatus.textContent = message;
    }

    function clearFieldErrors() {
      contactForm.querySelectorAll('.form-group--error').forEach((el) => {
        el.classList.remove('form-group--error');
      });
    }

    function markError(fieldId) {
      const field = document.getElementById(fieldId);
      if (!field) return;
      const group = field.closest('.form-group');
      if (group) group.classList.add('form-group--error');
    }

    function validateForm() {
      clearFieldErrors();
      let valid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const privacy = document.getElementById('privacy-consent');
      const captchaGroup = document.getElementById('captcha-group');
      const hCaptchaResponse = contactForm.querySelector('textarea[name="h-captcha-response"]');

      if (!name || !name.value.trim()) {
        markError('name');
        valid = false;
      }
      if (!email || !email.value.trim() || !email.checkValidity()) {
        markError('email');
        valid = false;
      }
      if (!message || !message.value.trim()) {
        markError('message');
        valid = false;
      }
      if (!privacy || !privacy.checked) {
        markError('privacy-consent');
        valid = false;
      }
      if (!hCaptchaResponse || !hCaptchaResponse.value) {
        if (captchaGroup) captchaGroup.classList.add('form-group--error');
        valid = false;
      } else if (captchaGroup) {
        captchaGroup.classList.remove('form-group--error');
      }
      return valid;
    }

    function resetCaptcha() {
      if (typeof window.hcaptcha !== 'undefined') {
        try {
          window.hcaptcha.reset();
        } catch (err) {
          /* ignore */
        }
      }
    }

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        const captchaMissing = !contactForm.querySelector('textarea[name="h-captcha-response"]')?.value;
        setFormStatus(
          'error',
          captchaMissing
            ? 'Completa la verifica hCaptcha prima di inviare.'
            : 'Controlla i campi obbligatori evidenziati e riprova.'
        );
        const firstError = contactForm.querySelector('.form-group--error input, .form-group--error textarea');
        if (firstError) firstError.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
      }
      if (btnLabel) btnLabel.textContent = 'Invio in corso…';
      if (formStatus) {
        formStatus.hidden = true;
        formStatus.textContent = '';
      }

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' },
        });
        const result = await response.json().catch(() => ({}));

        if (response.ok && result.success) {
          contactForm.reset();
          clearFieldErrors();
          resetCaptcha();
          setFormStatus('success', 'Messaggio inviato! Ti rispondo entro 24 ore lavorative.');
        } else {
          resetCaptcha();
          setFormStatus('error', result.message || 'Invio non riuscito. Riprova tra poco o scrivimi via email.');
        }
      } catch (err) {
        resetCaptcha();
        setFormStatus('error', 'Connessione non disponibile. Controlla la rete e riprova.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
        }
        if (btnLabel) btnLabel.textContent = 'Invia richiesta';
      }
    });

    contactForm.querySelectorAll('input, textarea, select').forEach((field) => {
      field.addEventListener('input', () => {
        const group = field.closest('.form-group');
        if (group) group.classList.remove('form-group--error');
      });
    });
  }

  /* ---- FAQ: close others on open ---- */
  document.querySelectorAll('.faq__item').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        document.querySelectorAll('.faq__item').forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });
})();
