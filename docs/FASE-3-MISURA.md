# Fase 3 — Misura (Evolo Digital Studio)

**Dominio:** https://evolodigitalstudio.it  
**Baseline codice (Fase 1–2):** 31 ottobre 2026 (locale; publish su richiesta)  
**GA4:** `G-TCB4S4BPWH`  
**Clarity:** `xu58plvbwu`  
**Regola:** nessun numero inventato — compilare solo da export GSC / GA4.

---

## 1. Cosa misurare ogni mese

| Fonte | Vista | Perché |
|-------|--------|--------|
| **GSC** Prestazioni → Query | Click, impressioni, CTR, posizione media | Domanda reale vs keyword target |
| **GSC** Prestazioni → Pagine | Idem per URL | Hub nuovi vs hub vecchi |
| **GSC** Indicizzazione | Motivi / esclusi | Nuove URL scoperte / indicizzate |
| **GA4** Traffico acquisizione → Organic Search | Sessioni / utenti | Volume organico |
| **GA4** Pagine e schermate | Landing / visualizzazioni | Quali hub lavorano |
| **GA4** Eventi | Vedi §3 | Lead e intent commerciali |
| **Web3Forms / inbox** | Lead ricevuti | Verifica vs evento `generazione_lead` |

**Periodo consigliato:** ultimi 28 giorni + confronto 28 precedenti (o 90 vs 90 dopo il primo trimestre post-publish).

---

## 2. URL nuove (Fase 1–2) — da monitorare in GSC/GA4

| URL | Cluster | Fase | Priorità monitoraggio |
|-----|---------|------|------------------------|
| `/soluzioni-pos.html` | POS | 1 | Alta |
| `/confronto-commissioni-pos.html` | POS / tool | 1 | Alta (engagement simulatore) |
| `/software-su-misura.html` | Software | 1 | Alta |
| `/assistenza-informatica-aziende.html` | IT | 1 | Media |
| `/ecommerce.html` | Ecommerce | 2 | Alta |
| `/siti-web-pubblica-amministrazione.html` | PA | 2 | Media–alta |
| `/` (home riposizionata) | Brand | 1 | Alta |
| `/manutenzione-assistenza.html` | Manutenzione | pre | Alta (cannibalizzazione vs guida) |
| `/pos-per-negozi-e-attivita.html` | POS verticale | 2 | Media |
| `/consulenza-seo.html` | SEO | 2 | Media |
| `/manutenzione-wordpress-piano-vs-spot.html` | Editoriale | 2 | Media |
| `/quando-serve-plugin-wordpress-su-misura.html` | Editoriale | 2 | Media |
| `/assistenza-informatica-pmi-cosa-include.html` | Editoriale IT | 2 | Media |
| `/sito-web-gestionale-quando-integrarli.html` | Editoriale | 2 | Media |
| `/segnali-restyling-sito-web.html` | Editoriale | 2 | Media |

**Esclusa da SEO pubblica:** `/pagamenti-sumup.html` (noindex — landing partner).

**Hub correlati già esistenti da confrontare:**  
`plugins.html`, `siti-web-mepa.html`, `realizzazione-siti-web.html`, `sito-wordpress-su-misura.html`, case study.

---

## 3. Eventi GA4 già sul sito

| Evento | Quando | Note |
|--------|--------|------|
| `generazione_lead` | Form contatto inviato con successo | Param: `metodo_contatto`, `interesse_servizio` |
| `clic_cta_contatti` | Click link verso `#contatti` | Intent |
| `clic_cta_sticky` | Sticky CTA | Solo pagine con sticky |
| `clic_email` | mailto | |
| `clic_whatsapp` | Link WhatsApp | |
| `clic_recensione` | Google review | |
| `clic_social` | Instagram / TikTok | param `network` |
| `clic_portfolio` | Link a progetti live | |
| `uso_simulatore_pos` | Interazione simulatore commissioni | param `azione` |

In GA4: **Admin → Eventi** — segna come conversione almeno `generazione_lead` (se non già fatto).

---

## 4. Template report mensile (compilare a mano)

### 4.1 Sintesi

| Metrica | Periodo corrente | Periodo precedente | Δ |
|---------|------------------|--------------------|---|
| Click organici (GSC) | | | |
| Impressioni (GSC) | | | |
| CTR medio (GSC) | | | |
| Posizione media (GSC) | | | |
| Sessioni Organic (GA4) | | | |
| Eventi `generazione_lead` | | | |
| Lead reali (inbox) | | | |

### 4.2 Top pagine (GSC) — 10 URL

| Pagina | Click | Impr. | CTR | Pos. |
|--------|-------|-------|-----|------|
| | | | | |

### 4.3 Hub nuovi — riga per URL (§2)

| URL | Click | Impr. | CTR | Pos. | Sessioni GA4 | Note |
|-----|-------|-------|-----|------|--------------|------|
| | | | | | | |

### 4.4 Query da osservare (senza inventare volumi)

Intento commerciale legato agli hub:

- realizzazione siti web / WordPress su misura  
- manutenzione WordPress / assistenza sito  
- commissioni POS / POS negozio  
- assistenza informatica aziende  
- ecommerce WooCommerce / negozio online  
- siti web pubblica amministrazione / MEPA  
- plugin WordPress / software su misura  

Segnare: query in posizioni 8–20 con CTR basso (candidati title/meta), query nuove che atterrano sugli hub.

### 4.5 Alert cannibalizzazione

| Coppia | Sintomo | Azione se confermato |
|--------|---------|----------------------|
| `manutenzione-assistenza` vs `manutenzione-sito-web` | Stesse query, CTR spezzato | Rafforzare intent: piano vs guida |
| `plugins` vs `software-su-misura` | Overlap “plugin WordPress” | Hub software = commerciale; plugins = catalogo |
| `siti-web-mepa` vs `siti-web-pubblica-amministrazione` | Overlap PA | PA = hub; MEPA = guida acquisto |
| `soluzioni-pos` vs `confronto-commissioni-pos` | Ok se ruoli diversi | Hub vs tool |

---

## 5. Export da fornire (una volta al mese)

1. GSC → Prestazioni → **Esporta** (Query + Pagine), ultimi 28 o 90 giorni  
2. GSC → Indicizzazione → riepilogo (opzionale screenshot)  
3. GA4 → Acquisizione (Organic) + Eventi (`generazione_lead`, `uso_simulatore_pos`, CTA)  
4. Conteggio lead inbox nello stesso periodo  

Con quei file si chiude il report §4 (nessuna stima al posto dei dati).

---

## 6. Checklist post-publish (prima misura utile)

- [ ] Deploy Fase 1–2 su produzione  
- [ ] Richiesta indicizzazione GSC per le 6 URL nuove (+ home)  
- [ ] Verifica live `sitemap.xml`  
- [ ] GA4: conversione su `generazione_lead`  
- [ ] Dopo 14–28 giorni: primo riempimento §4  
- [ ] Dopo 90 giorni: confronto vs baseline pre-hub  

---

## 7. Esito Fase 3 (stato)

| Deliverable | Stato |
|-------------|--------|
| Inventario URL nuove | Fatto (§2, aggiornato) |
| Template report | Fatto (§4) |
| Eventi lead + simulatore POS | Fatto in codice (`main.js` / `confronto-commissioni-pos.html`) |
| Sitemap live | HTTP **200** (curl 31/10/2026) |
| PageSpeed API | Quota giornaliera esaurita — rieseguire a mano |
| Numeri GSC/GA4 compilati | **In attesa export** (non inventabili) |

Prossimo passo misura: allegare CSV GSC/GA4 → compilare §4 senza ipotesi.
