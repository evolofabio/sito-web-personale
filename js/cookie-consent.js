(function () {
  'use strict';

  const STORAGE_KEY = 'evolo_cookie_consent';
  const BANNER_ID = 'cookie-banner';
  let previouslyFocused = null;

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

  function focusables(root) {
    return Array.from(
      root.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
  }

  function createBanner() {
    if (document.getElementById(BANNER_ID)) return;

    const banner = document.createElement('div');
    banner.id = BANNER_ID;
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-label', 'Preferenze cookie');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = `
      <div class="cookie-banner__inner">
        <div class="cookie-banner__text">
          <strong id="cookie-banner-title">Questo sito utilizza cookie e tecnologie simili</strong>
          <p>
            Usiamo solo storage tecnico per ricordare la tua scelta. Google Analytics 4 e Microsoft Clarity
            (statistiche e analisi di navigazione) si attivano solo se accetti.
            Dettagli: <a href="cookie.html">Cookie Policy</a> e
            <a href="privacy.html">Privacy Policy</a>.
          </p>
        </div>
        <div class="cookie-banner__actions">
          <button type="button" class="btn btn--outline btn--sm" id="cookie-reject">Solo necessari</button>
          <button type="button" class="btn btn--primary btn--sm" id="cookie-accept">Accetta analitici</button>
        </div>
      </div>
    `;
    banner.setAttribute('aria-labelledby', 'cookie-banner-title');

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', () => {
      const hadAnalytics = getConsent() === 'accepted';
      setConsent('accepted');
      if (window.EvoloAnalytics) window.EvoloAnalytics.load();
      hideBanner();
      if (!hadAnalytics) {
        /* already loading analytics in-page */
      }
    });

    document.getElementById('cookie-reject').addEventListener('click', () => {
      const hadAnalytics = getConsent() === 'accepted';
      setConsent('necessary');
      hideBanner();
      if (hadAnalytics) {
        window.location.reload();
      }
    });

    banner.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const items = focusables(banner);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function showBanner() {
    createBanner();
    const banner = document.getElementById(BANNER_ID);
    if (!banner) return;
    previouslyFocused = document.activeElement;
    requestAnimationFrame(() => {
      banner.classList.add('cookie-banner--visible');
      const rejectBtn = document.getElementById('cookie-reject');
      if (rejectBtn) rejectBtn.focus();
    });
  }

  function hideBanner() {
    const banner = document.getElementById(BANNER_ID);
    if (!banner) return;
    banner.classList.remove('cookie-banner--visible');
    setTimeout(() => {
      banner.remove();
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    }, 400);
  }

  const consent = getConsent();
  if (consent === 'accepted' && window.EvoloAnalytics) {
    window.EvoloAnalytics.load();
  }
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
