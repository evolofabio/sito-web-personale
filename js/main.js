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

  /* ---- Scroll reveal (sempre visibile) ---- */
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));

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
