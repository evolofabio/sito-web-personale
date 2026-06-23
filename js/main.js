(function () {
  'use strict';

  /* ---- Config ---- */
  const PIVA = ''; // Inserisci qui la tua Partita IVA

  const CODE_SNIPPET = [
    { text: '<!DOCTYPE html>\n', type: 'tok-tag' },
    { text: '<html lang="it">\n', type: 'tok-tag' },
    { text: '<head>\n', type: 'tok-tag' },
    { text: '  <meta charset="UTF-8">\n', type: 'tok-tag' },
    { text: '  <title>', type: 'tok-tag' },
    { text: 'Evolo Digital Studio', type: 'tok-val' },
    { text: '</title>\n', type: 'tok-tag' },
    { text: '  <link rel="stylesheet" href="style.css">\n', type: 'tok-tag' },
    { text: '</head>\n', type: 'tok-tag' },
    { text: '<body>\n', type: 'tok-tag' },
    { text: '  <!-- Hero Section -->\n', type: 'tok-comment' },
    { text: '  <header class="hero">\n', type: 'tok-tag' },
    { text: '    <h1>', type: 'tok-tag' },
    { text: 'Siti web su misura', type: 'tok-text' },
    { text: '</h1>\n', type: 'tok-tag' },
    { text: '    <p>', type: 'tok-tag' },
    { text: 'HTML · CSS · JS · WordPress', type: 'tok-text' },
    { text: '</p>\n', type: 'tok-tag' },
    { text: '  </header>\n', type: 'tok-tag' },
    { text: '  <script src="main.js">', type: 'tok-tag' },
    { text: '</script>\n', type: 'tok-tag' },
    { text: '</body>\n', type: 'tok-tag' },
    { text: '</html>', type: 'tok-tag' },
  ];

  /* ---- DOM refs ---- */
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const codeEl = document.getElementById('code-animation');
  const cursorEl = document.getElementById('code-cursor');
  const contactForm = document.getElementById('contact-form');
  const pivaEl = document.getElementById('piva-number');
  const navLinks = document.querySelectorAll('.header__links a');

  /* ---- P.IVA ---- */
  if (pivaEl && PIVA) {
    pivaEl.textContent = PIVA;
  }

  /* ---- Header scroll ---- */
  function onScroll() {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
    updateActiveNav();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Active nav link ---- */
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

  /* ---- Code typing animation ---- */
  let charIndex = 0;
  let tokenIndex = 0;
  let currentTokenChars = 0;
  let renderedHTML = '';
  const TYPING_SPEED = 28;
  const PAUSE_END = 3000;
  const PAUSE_START = 800;

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
        const partial = token.text.slice(0, upToChar - count);
        html += `<span class="${token.type}">${escapeHtml(partial)}</span>`;
        count = upToChar;
        break;
      } else {
        break;
      }
    }
    return html;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function typeCode() {
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
    codeEl.innerHTML = '';
    setTimeout(typeCode, PAUSE_START);
  }

  setTimeout(typeCode, PAUSE_START);

  /* ---- Contact form ---- */
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`Richiesta da ${name} — Evolo Digital Studio`);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:evolofabio@outlook.it?subject=${subject}&body=${body}`;
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll(
    '.section__header, .about, .service-card, .project-card, .contact'
  );

  revealEls.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));

  /* Stagger service cards */
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.15}s`;
  });
})();
