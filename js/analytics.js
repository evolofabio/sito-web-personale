(function () {
  'use strict';

  const GA_ID = 'G-TCB4S4BPWH';
  let loaded = false;

  function trackEvent(name, params) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      if (params) {
        window.gtag('event', name, params);
      } else {
        window.gtag('event', name);
      }
    }
  }

  function loadGoogleAnalytics() {
    if (loaded) return;
    loaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function isWhatsAppHref(href) {
    if (!href) return false;
    const value = href.toLowerCase();
    return (
      value.includes('wa.me/') ||
      value.includes('whatsapp.com') ||
      value.includes('api.whatsapp.com')
    );
  }

  function bindConversionClicks() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      const hrefLower = href.toLowerCase();

      if (link.id === 'sticky-cta' || link.classList.contains('sticky-cta')) {
        trackEvent('clic_cta_sticky');
        return;
      }

      if (hrefLower.startsWith('mailto:')) {
        trackEvent('clic_email');
        return;
      }

      if (isWhatsAppHref(href)) {
        trackEvent('clic_whatsapp');
        return;
      }

      if (hrefLower.includes('g.page/')) {
        trackEvent('clic_recensione');
        return;
      }

      if (hrefLower.includes('instagram.com') || hrefLower.includes('tiktok.com')) {
        trackEvent('clic_social', {
          network: hrefLower.includes('instagram.com') ? 'instagram' : 'tiktok',
        });
        return;
      }

      if (
        hrefLower.includes('visitamedical') ||
        hrefLower.includes('civicos') ||
        hrefLower.includes('caladelsol')
      ) {
        trackEvent('clic_portfolio');
        return;
      }

      if (
        href === '#contatti' ||
        hrefLower.endsWith('#contatti') ||
        hrefLower.includes('index.html#contatti')
      ) {
        trackEvent('clic_cta_contatti');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindConversionClicks);
  } else {
    bindConversionClicks();
  }

  window.EvoloAnalytics = {
    load: loadGoogleAnalytics,
    trackEvent: trackEvent,
  };
})();
