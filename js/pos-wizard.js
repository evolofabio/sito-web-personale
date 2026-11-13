(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form || !form.classList.contains('pos-wizard')) return;

  var panels = Array.prototype.slice.call(form.querySelectorAll('[data-panel]'));
  var steps = Array.prototype.slice.call(form.querySelectorAll('[data-step-label]'));
  var fitNote = document.getElementById('pos-fit-note');
  var summaryRange = document.getElementById('pos-summary-range');
  var summaryDevice = document.getElementById('pos-summary-device');
  var subject = document.getElementById('pos-subject');
  var message = document.getElementById('message');

  var fitByRange = {
    'Sotto i 5.000 €': ['myPOS Go 2', 'myPOS Flex', 'Tap to Pay'],
    'Da 5.000 a 10.000 €': ['myPOS Go Combo', 'myPOS Flex', 'myPOS Go 2'],
    'Da 10.000 a 25.000 €': ['myPOS Ultra', 'myPOS Go Combo'],
    'Da 25.000 a 50.000 €': ['myPOS Ultra'],
    'Oltre 50.000 €': ['myPOS Ultra']
  };

  var fitCopy = {
    'Sotto i 5.000 €': 'Con pochi pagamenti carta ho messo in alto i terminali semplici, anche da portare con te. Puoi sceglierne un altro.',
    'Da 5.000 a 10.000 €': 'Per una giornata piena servono autonomia e, spesso, la ricevuta cartacea. Go Combo e Flex coprono banco e spostamenti.',
    'Da 10.000 a 25.000 €': 'Con la fila in cassa contano velocità e stampa. Ultra o Go Combo sono le scelte più sensate per questo ritmo.',
    'Da 25.000 a 50.000 €': 'Con più persone in cassa il punto di partenza è Ultra, anche su più di una postazione.',
    'Oltre 50.000 €': 'Con più casse partiamo da Ultra. Nella richiesta indicami quante postazioni hai: la proposta la preparo su quello.'
  };

  function ensureCaptcha() {
    function render() {
      var el = form.querySelector('.h-captcha');
      if (!el || !window.hcaptcha || el.querySelector('iframe')) return;
      try { window.hcaptcha.render(el); } catch (err) { /* already rendered */ }
    }
    if (window.hcaptcha) {
      render();
      return;
    }
    var existing = document.querySelector('script[data-web3forms]');
    if (!existing) {
      var script = document.createElement('script');
      script.src = 'https://web3forms.com/client/script.js';
      script.async = true;
      script.dataset.web3forms = 'true';
      script.onload = function () { window.setTimeout(render, 40); };
      document.body.appendChild(script);
      return;
    }
    window.setTimeout(render, 300);
  }

  function selected(name) {
    var input = form.querySelector('input[name="' + name + '"]:checked');
    return input ? input.value : '';
  }

  function showError(panel, text) {
    var error = panel.querySelector('.pos-wizard__error');
    if (!error) return;
    error.hidden = !text;
    error.textContent = text || '';
  }

  function paintSteps() {
    var names = form.querySelectorAll('[data-step-name]');
    if (names[0]) names[0].textContent = selected('transato_mensile') || 'Transato mensile';
    if (names[1]) names[1].textContent = selected('terminale') || 'Tipo di POS';
  }

  function markSuggested(range) {
    var fits = fitByRange[range] || [];
    var list = form.querySelector('.pos-choices--devices');
    if (!list) return;
    var cards = Array.prototype.slice.call(list.querySelectorAll('.pos-choice'));
    cards.forEach(function (card) {
      card.classList.toggle('is-suggested', fits.indexOf(card.getAttribute('data-device')) !== -1);
    });
    cards.sort(function (a, b) {
      var ai = fits.indexOf(a.getAttribute('data-device'));
      var bi = fits.indexOf(b.getAttribute('data-device'));
      if (ai === -1) ai = 100;
      if (bi === -1) bi = 100;
      return ai - bi;
    });
    cards.forEach(function (card) { list.appendChild(card); });
    if (fitNote) fitNote.textContent = fitCopy[range] || '';
    paintSteps();
  }

  function goTo(step) {
    panels.forEach(function (panel) {
      var n = Number(panel.getAttribute('data-panel'));
      panel.hidden = n !== step;
    });
    steps.forEach(function (item) {
      var n = Number(item.getAttribute('data-step-label'));
      item.classList.toggle('is-current', n === step);
      item.classList.toggle('is-done', n < step);
    });
    if (step === 3) {
      if (summaryRange) summaryRange.textContent = selected('transato_mensile');
      if (summaryDevice) summaryDevice.textContent = selected('terminale');
      if (subject) {
        subject.value = 'Richiesta POS myPOS — ' + selected('transato_mensile') + ' — ' + selected('terminale');
      }
      ensureCaptcha();
    }
    paintSteps();
    var active = form.querySelector('[data-panel="' + step + '"]');
    if (active) {
      var heading = active.querySelector('h3');
      if (heading) heading.focus({ preventScroll: true });
      var top = form.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }

  form.addEventListener('click', function (event) {
    var gotoBtn = event.target.closest('[data-goto]');
    if (gotoBtn) {
      var target = Number(gotoBtn.getAttribute('data-goto'));
      var rangeNow = selected('transato_mensile');
      var deviceNow = selected('terminale');
      if (target >= 2 && !rangeNow) {
        goTo(1);
        showError(form.querySelector('[data-panel="1"]'), 'Seleziona il transato mensile per continuare.');
        return;
      }
      if (target >= 3 && !deviceNow) {
        markSuggested(rangeNow);
        goTo(2);
        showError(form.querySelector('[data-panel="2"]'), 'Seleziona il terminale che ti interessa.');
        return;
      }
      if (rangeNow) markSuggested(rangeNow);
      goTo(target);
      return;
    }
    var next = event.target.closest('[data-next]');
    var prev = event.target.closest('[data-prev]');
    if (!next && !prev) return;
    var panel = event.target.closest('[data-panel]');
    var step = panel ? Number(panel.getAttribute('data-panel')) : 1;
    if (next) {
      if (step === 1 && !selected('transato_mensile')) {
        showError(panel, 'Seleziona il transato mensile per continuare.');
        return;
      }
      if (step === 2 && !selected('terminale')) {
        showError(panel, 'Seleziona il terminale che ti interessa.');
        return;
      }
      showError(panel, '');
      if (step === 1) markSuggested(selected('transato_mensile'));
      goTo(step + 1);
    }
    if (prev) goTo(step - 1);
  });

  form.addEventListener('change', function (event) {
    var panel = event.target.closest('[data-panel]');
    if (panel) showError(panel, '');
    if (event.target.name === 'transato_mensile') markSuggested(event.target.value);
    else paintSteps();
  });

  form.addEventListener('submit', function (event) {
    var range = selected('transato_mensile');
    var device = selected('terminale');
    if (!range || !device) {
      event.preventDefault();
      event.stopImmediatePropagation();
      goTo(range ? 2 : 1);
      var panel = form.querySelector('[data-panel="' + (range ? 2 : 1) + '"]');
      showError(panel, range ? 'Seleziona il terminale che ti interessa.' : 'Seleziona il transato mensile per continuare.');
      return;
    }
    if (message && message.value.indexOf('Transato mensile:') !== 0) {
      var note = message.value.trim();
      message.value = 'Transato mensile: ' + range + '\nTerminale: ' + device + (note ? '\n\n' + note : '');
    }
    if (subject) subject.value = 'Richiesta POS myPOS — ' + range + ' — ' + device;
  }, true);

  var preset = new URLSearchParams(window.location.search).get('transato');
  if (preset) {
    var presetInput = form.querySelector('input[name="transato_mensile"][value="' + preset + '"]');
    if (presetInput) {
      presetInput.checked = true;
      markSuggested(preset);
    }
  }
})();
