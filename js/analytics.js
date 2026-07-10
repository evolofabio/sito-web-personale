(function () {
  'use strict';

  const GA_ID = 'G-TCB4S4BPWH';
  let loaded = false;

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

  window.EvoloAnalytics = { load: loadGoogleAnalytics };
})();
