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

## 4. Report mensile

**Baseline compilata:** 31 ott 2026 → dettaglio in [`REPORT-BASELINE-2026-10-31.md`](REPORT-BASELINE-2026-10-31.md)  
**Periodo file:** 1 gen – 31 ott 2026 (GSC Web + GA4 istantanea)

### 4.1 Sintesi

| Metrica | Periodo export (YTD) | Periodo precedente | Δ |
|---------|----------------------|--------------------|---|
| Click organici (GSC) | **15** (lug–ott in Grafico) | n/d in export | — |
| Impressioni (GSC) | **311** | n/d | — |
| CTR medio (GSC) | **~4,8%** | n/d | — |
| Posizione media (GSC) | variabile (IT ~33) | n/d | — |
| Sessioni Organic (GA4) | **45** google/organic (+40 search.google.com) | n/d | — |
| Utenti attivi (GA4) | **36** | n/d | — |
| Eventi `generazione_lead` | **non in istantanea** | — | verificare conversione GA4 |
| Lead reali (inbox) | **non forniti** | — | — |

### 4.2 Top pagine (GSC)

| Pagina | Click | Impr. | CTR | Pos. |
|--------|------:|------:|-----|------|
| `/` | 11 | 136 | 8,09% | 4,54 |
| `/chi-sono.html` | 3 | 22 | 13,64% | 4,64 |
| `/realizzazione-siti-web.html` | 1 | 20 | 5% | 5,5 |
| `/seo-o-google-ads.html` | 0 | 81 | 0% | 84,15 |
| `/sito-wordpress-su-misura.html` | 0 | 36 | 0% | 54,86 |
| `/quanto-costa-sito-web.html` | 0 | 26 | 0% | **5,5** |
| `/come-far-trovare-sito-su-google.html` | 0 | 21 | 0% | 42,29 |
| `/doctorsearch.html` | 0 | 19 | 0% | 66,47 |
| `/come-scegliere-sviluppatore-sito-web.html` | 0 | 7 | 0% | **5,57** |
| `/civicos.html` | 0 | 6 | 0% | 7,33 |

### 4.3 Hub nuovi — riga per URL (§2)

| URL | Click | Impr. | CTR | Pos. | Sessioni GA4 | Note |
|-----|------:|------:|-----|------|--------------|------|
| hub POS / software / IT / ecommerce / PA / articoli | — | — | — | — | — | **Assenti** da questo export (pre-indicizzazione) |

### 4.4 Query da osservare

| Query | Impr. | Pos. | Nota |
|-------|------:|------|------|
| seo o google ads | 74 | ~86 | Volume impr. ma fuori prima pagina |
| sviluppo wordpress su misura | 10 | ~85 | Intent commerciale, posizione bassa |
| digital / evolo / civicos | poche | 5–8 | Brand; volume minimo |
| siti web calabria | 1 | 1 | Segnale locale isolato |

Posizioni ~5–8 con **0 clic** (priorità snippet): `quanto-costa`, `come-scegliere` (+ `civicos`, `tempo-realizzazione` in zona 7).

### 4.5 Alert cannibalizzazione

| Coppia | Sintomo in questo export | Azione |
|--------|--------------------------|--------|
| `manutenzione-assistenza` vs `manutenzione-sito-web` | **Nessuna delle due in Pagine.csv** | Ricontrollare tra 28–90 gg |
| `plugins` vs `software-su-misura` | software hub assente | Ok per ora; monitor post-index |
| `siti-web-mepa` vs PA hub | PA hub assente; MEPA 1 view GA4 | Monitor |
| `soluzioni-pos` vs confronto | assenti | Monitor |

---

## 5. Export da fornire (una volta al mese)

1. GSC → Prestazioni → **Esporta** (Query + Pagine), ultimi 28 o 90 giorni  
2. GSC → Indicizzazione → riepilogo (opzionale screenshot)  
3. GA4 → Acquisizione (Organic) + Eventi (`generazione_lead`, `uso_simulatore_pos`, CTA)  
4. Conteggio lead inbox nello stesso periodo  

Con quei file si chiude il report §4 (nessuna stima al posto dei dati).

---

## 6. Checklist post-publish (prima misura utile)

- [x] Deploy Fase 1–2 su produzione (`main` push 31/10/2026)  
- [ ] Richiesta indicizzazione GSC per le URL nuove (+ home aggiornata)  
- [x] Verifica live `sitemap.xml` (HTTP 200)  
- [ ] GA4: conversione su `generazione_lead` (istantanea senza eventi chiave)  
- [x] Baseline §4 compilata (YTD) — vedi REPORT-BASELINE  
- [ ] Export **ultimi 28 giorni** a fine novembre (effetto hub)  
- [ ] Dopo 90 giorni: confronto vs questa baseline  

---

## 7. Esito Fase 3 (stato)

| Deliverable | Stato |
|-------------|--------|
| Inventario URL nuove | Fatto (§2) |
| Template + baseline numerica | **Fatto** — [`REPORT-BASELINE-2026-10-31.md`](REPORT-BASELINE-2026-10-31.md) |
| Eventi lead + simulatore POS | In codice; conversione GA4 da confermare in UI |
| Sitemap live | HTTP **200** |
| PageSpeed API | Quota esaurita — rieseguire a mano |
| Numeri GSC/GA4 | **Compilati** da export 31/10/2026 |

Prossimo passo: indicizzazione URL nuove + conversione GA4 + export 28 giorni a fine novembre.
