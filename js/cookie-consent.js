(function () {
  'use strict';

  const STORAGE_KEY = 'evolo_cookie_consent';
  const BANNER_ID = 'cookie-banner';

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  }

  function createBanner() {
    if (document.getElementById(BANNER_ID)) return;

    const banner = document.createElement('div');
    banner.id = BANNER_ID;
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Informativa cookie');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = `
      <div class="cookie-banner__inner">
        <div class="cookie-banner__text">
          <strong>Questo sito utilizza cookie e tecnologie simili</strong>
          <p>
            Utilizziamo cookie tecnici necessari al funzionamento del sito e servizi di terze parti
            (es. Google Fonts). Per maggiori informazioni consulta la
            <a href="cookie.html">Cookie Policy</a> e la
            <a href="privacy.html">Privacy Policy</a>.
          </p>
        </div>
        <div class="cookie-banner__actions">
          <button type="button" class="btn btn--outline btn--sm" id="cookie-reject">Solo necessari</button>
          <button type="button" class="btn btn--primary btn--sm" id="cookie-accept">Accetta</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', () => {
      setConsent('accepted');
      hideBanner();
    });

    document.getElementById('cookie-reject').addEventListener('click', () => {
      setConsent('necessary');
      hideBanner();
    });
  }

  function showBanner() {
    createBanner();
    const banner = document.getElementById(BANNER_ID);
    if (banner) {
      requestAnimationFrame(() => banner.classList.add('cookie-banner--visible'));
    }
  }

  function hideBanner() {
    const banner = document.getElementById(BANNER_ID);
    if (banner) {
      banner.classList.remove('cookie-banner--visible');
      setTimeout(() => banner.remove(), 400);
    }
  }

  const consent = getConsent();
  if (!consent) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }

  const reopenBtn = document.getElementById('reopen-cookie-banner');
  if (reopenBtn) {
    reopenBtn.addEventListener('click', showBanner);
  }

  window.EvoloCookieConsent = { showBanner, getConsent, setConsent };
})();
