# Audit sicurezza, accessibilità, GDPR, cookie e privacy

**Data:** 31 ottobre 2026  
**Ambito:** sito statico Evolo Digital Studio (GitHub Pages — `evolodigitalstudio.it`)

## Sintesi

Il sito è statico: niente backend proprio, form via Web3Forms + hCaptcha, analytics solo dopo consenso. Sono stati chiusi i gap principali su Consent Mode, allineamento informativa/Clarity, caricamento Google Fonts non dichiarato, e accessibilità del banner/menu.

## Cosa è stato verificato / corretto

### GDPR / cookie / privacy

| Voce | Stato |
|------|--------|
| Banner con Accetta / Solo necessari | OK — `js/cookie-consent.js` |
| Preferenza in `localStorage` (`evolo_cookie_consent`) | OK |
| Revoca da Cookie Policy + reload se si toglie analytics | OK |
| Google Consent Mode v2 (default denied) | OK — `js/analytics.js` |
| GA4 + Clarity solo dopo consenso | OK |
| `anonymize_ip` su GA4 | OK |
| Privacy Policy: Clarity in finalità / base giuridica | OK (agg. 31/10/2026) |
| Cookie Policy: rimosso Google Fonts; Clarity già in tabella | OK |
| Form: consenso privacy obbligatorio, honeypot, hCaptcha | OK |

### Accessibilità

| Voce | Stato |
|------|--------|
| Banner `role="dialog"` + `aria-modal` + focus trap | OK |
| Skip link «Vai al contenuto» | OK (`js/main.js` + CSS) |
| Menu mobile: `type="button"`, Escape chiude, `aria-expanded` | OK |
| Link esterni: `rel="noopener noreferrer"` (allineato sui form) | OK |

### Sicurezza (sito statico)

| Voce | Stato |
|------|--------|
| Nessun secret in repo (chiavi form lato Web3Forms access key pubblica) | OK per modello Web3Forms |
| `target="_blank"` con noopener | OK |
| HTTPS via GitHub Pages / custom domain | OK |
| Security headers (CSP, HSTS, X-Frame-Options, ecc.) | **Limite hosting:** GitHub Pages non espone header custom senza proxy (Cloudflare o simile). Residual risk documentato sotto. |

## Interventi applicati in questa sessione

1. Riscrivere cookie banner (a11y) e analytics (Consent Mode + Clarity gated).
2. Aggiornare Privacy e Cookie Policy (Clarity, niente Google Fonts, date 31/10/2026).
3. Rimuovere preconnect `fonts.googleapis.com` / `fonts.gstatic.com` da tutte le pagine.
4. Eliminare `@import` Google Fonts da `css/commercial.css`; stack tipografico di sistema.
5. Skip link, Escape sul menu, `type="button"` sui toggle.
6. Bump cache: `style.css?v=30`, `commercial.css?v=11`, `main.js?v=19`, `analytics.js?v=5`, `cookie-consent.js?v=2`.

## Residual risk / follow-up opzionali

1. **Header di sicurezza** — se serve CSP/HSTS/Permissions-Policy, mettere Cloudflare (o altro proxy) davanti a GitHub Pages.
2. **hCaptcha** — carica script al submit del form (necessario al servizio); già descritto in Cookie Policy.
3. **Clarity session replay** — attivo solo con consenso; se un giorno vuoi ridurre superficie, disabilitare replay in dashboard Clarity lasciando solo heatmap.
4. **Audit formale legale** — questo documento è tecnico/operativo, non sostituisce una consulenza privacy esterna.

## File chiave

- `js/cookie-consent.js`, `js/analytics.js`, `js/main.js`
- `privacy.html`, `cookie.html`
- `css/style.css`, `css/commercial.css`
