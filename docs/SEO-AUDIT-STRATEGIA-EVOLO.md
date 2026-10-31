# SEO Audit, architettura e roadmap — Evolo Digital Studio

**Dominio:** https://evolodigitalstudio.it  
**Data analisi:** 31 ottobre 2026  
**Stack verificato:** sito statico HTML/CSS/JS (GitHub Pages), stile `site-commercial`, form Web3Forms, GA4 `G-TCB4S4BPWH` + Clarity, cookie consent  
**Stato:** strategia eseguita in locale (Fase 1–2 hub + footer; Fase 3 kit misura). **Publish** e numeri GSC/GA4 ancora da chiudere.

---

## 1. Situazione iniziale (verificata)

### Tecnologie
| Elemento | Stato |
|----------|--------|
| HTML/CSS/JS statico | Sì — non è WordPress/CMS |
| Pagine `.html` | 37 |
| CSS principale live | `commercial.css` + `style.css` |
| Sitemap / robots | Presenti; Allow all; sitemap referenziata |
| Tracking | GA4 + Clarity dietro consenso |
| Indicizzazione | Confermato dall’utente (ottobre 2026): pagine in indice |

### Mappa URL per cluster attuale

| Cluster | Pagine | Note |
|---------|--------|------|
| **Hub / brand** | `index.html`, `chi-sono.html`, `blog.html` | Home centrata su “siti web” |
| **Sviluppo web (commerciali)** | `realizzazione-siti-web`, `sito-wordpress-su-misura`, `restyling-sito-wordpress`, `realizzazione-landing-page`, nicchie (professionisti, ristoranti, case vacanza, cliniche, parrucchieri) | Forte copertura |
| **Software / plugin** | `plugins.html`, `vacation-home-bookings`, `doctorsearch`, `saloni-elite`, guida prenotazioni | Buona base prodotto |
| **Manutenzione** | `manutenzione-assistenza` (piano), `manutenzione-sito-web` (guida) | Ruoli diversi — ok se linkati bene |
| **Locale / PA** | `sito-web-cosenza-calabria`, `creazione-siti-web-vibo-valentia`, `siti-web-mepa` | Locale sì; PA solo MEPA |
| **Guide SEO/scelta** | costi, tempi, Google, velocità, SEO vs Ads, freelance vs agenzia, AI vs professionista, come scegliere | Cluster editoriale solido |
| **Case study** | Visita Medical, CivicOS, Cala del Sol, NextGen | Manca Studio Furnari (non presente nel repo) |
| **Pagamenti** | `pagamenti-sumup.html` | **noindex, nofollow** — bozza SumUp, non pubblica |
| **Legale** | privacy, cookie | Ok |

### Cosa comunica oggi la home (verificato)
- H1: *“Siti web che portano clienti”*
- Servizi in evidenza: solo 3 card (sito / WordPress / restyling+manutenzione)
- Assenti in home/nav come aree di business: **software**, **assistenza IT**, **POS/pagamenti**, **ecommerce** come hub
- Posizionamento percepito: **web agency / sviluppatore siti**, non studio multidisciplinare

---

## 2. Problematiche davvero verificate (non ipotesi)

| # | Problema | Evidenza | Priorità |
|---|----------|----------|----------|
| P1 | Brand troppo stretto su “siti web” | Title, H1, sezione servizi home | Alta |
| P2 | Aree IT e POS assenti dal sito pubblico | Nessuna pagina indexabile; SumUp in noindex | Alta |
| P3 | Menu non riflette le aree di business | Nav: Servizi (anchor) / Progetti / Prezzi / Manutenzione / Blog | Alta |
| P4 | Gap hub ecommerce / software / assistenza IT | Nessuna landing hub dedicata | Alta |
| P5 | Case study incompleti vs brief | Solo 4 case; Furnari non in repo | Media |
| P6 | On-page minori | Title lunghi Cala del Sol / NextGen; meta lunga manutenzione-assistenza | Bassa |
| P7 | `pagamenti-sumup.html` non usabile come hub POS | Brand-locked + noindex + non “neutro” | Alta (per area POS) |
| P8 | Possibile cannibalizzazione manutenzione | Guida vs piano — da monitorare in GSC (non errore certo) | Media |
| P9 | SEO nazionale ancora debole vs competitor | SERP “realizzazione siti web” / “Cosenza” dominate da altri (ricerca pubblica 2026) | Alta (contenuto+link) |
| P10 | Dati GSC/GA4 ultimi 3 mesi | **Non disponibili in questa sessione** — da analizzare con export CSV | Blocca decisioni fine-tuning |

**Non classificati come bug senza prova:** Core Web Vitals, soft 404 massivi, errori di indicizzazione residui (utente ha confermato indice ok).

---

## 3. Mappa keyword (senza inventare volumi)

*Volumi e KD non dichiarati: vanno letti da GSC + tool (Ahrefs/Semrush) o lasciati come “intento”.*

### Cluster e pagina target consigliata

| Cluster | Esempi query (intento) | Pagina oggi | Azione |
|---------|------------------------|-------------|--------|
| Sviluppo web | realizzazione siti web, siti web professionali, restyling sito | `realizzazione-siti-web`, `restyling-…` | Ottimizzare title/H1 nazionali; rafforzare hub |
| WordPress | sviluppatore WordPress, WordPress su misura | `sito-wordpress-su-misura` | Rafforzare hub; evitare overlap con restyling |
| Nicchie | sito per ristoranti / cliniche / case vacanza | landing nicchia | Mantieni; link da hub |
| Software | plugin WordPress, gestionale, prenotazioni | `plugins` + prodotti | Nuovo hub **Software** |
| Manutenzione | manutenzione WordPress, assistenza sito | `manutenzione-assistenza` + guida | Hub commerciale = piano; guida supporta |
| Locale | siti web Cosenza / Vibo | pagine locali | Mantieni; non farne l’unico messaggio home |
| PA | siti web Comuni, AgID, portali | solo `siti-web-mepa` | Espandere con hub PA (fase 2) |
| IT | assistenza informatica aziende, reti | **assente** | Nuove pagine (fase 2) |
| POS | confronto commissioni POS, POS negozi | **assente** (SumUp noindex) | Nuovo hub neutrale + comparatore |

### Competitor SERP (osservazione pubblica)
Su query commerciali nazionali compaiono agenzie strutturate con hub servizi chiari, prezzi/case study e messaggi “Italia”. Evolo è competitivo su **trasparenza prezzi** e **progetti reali**, ma perde sulla **ampiezza dell’offerta** percepita.

---

## 4. Nuova architettura proposta

### Navigazione principale (target)
1. **Sviluppo Web** → hub + sottopagine esistenti  
2. **Software** → hub + plugin/prodotti  
3. **SEO & Manutenzione** → piano + consulenza SEO (pagina da valutare)  
4. **Servizi IT** → hub assistenza / reti (nuove)  
5. **Soluzioni POS** → hub pagamenti (nuove)  
6. **Portfolio**  
7. **Contatti**

*(PA può stare sotto Software o hub dedicato “Pubblica Amministrazione” — consigliato hub dedicato se si punta AgID/Comuni.)*

### URL nuove (solo se contenuti distinti e domanda reale)

| URL | Scopo | Fase |
|-----|--------|------|
| `/soluzioni-pos.html` | Hub POS neutrale (non marchio singolo) | 1 |
| `/confronto-commissioni-pos.html` | Guida + embed comparatore | 1 |
| `/pos-per-negozi-e-attivita.html` | Verticale retail/HoReCa | 2 (se traffico/query) |
| `/assistenza-informatica-aziende.html` | Hub IT | 2 |
| `/software-su-misura.html` | Hub software/web app | 1–2 |
| `/ecommerce.html` | Hub ecommerce (oggi mancante) | 2 |
| `/siti-web-pubblica-amministrazione.html` | Hub PA oltre MEPA | 2 |

**Regola:** non creare sottopagine POS/IT se il contenuto è solo una variazione dell’hub.

### Pagine da mantenere / migliorare / non toccare URL
- **Mantenere URL** di tutte le pagine già indicizzate (redirect solo se merge documentato).
- **Migliorare:** home, hub web, plugin hub, manutenzione-assistenza, case study.
- **Non pubblicare come hub POS:** `pagamenti-sumup.html` finché resta brand SumUp; usarla eventualmente come landing referral **separata** (o noindex permanente).

---

## 5. Strategia area POS (allineata al mockup)

### Posizionamento
- Evolo = **consulenza e intermediazione commerciale** su pagamenti, non banca/acquirer.
- Hub **neutro**; offerte nominative (myPOS, SumUp, ecc.) solo con condizioni verificate + disclosure agente.

### Contenuti minimi hub `/soluzioni-pos.html`
1. Cosa fa Evolo (consulenza / confronto / presentazione operatore)  
2. Per chi (negozi, bar, ristoranti, professionisti, PMI)  
3. Come si sceglie (canone, commissione, fisso/tx, liquidazione)  
4. CTA: “Analisi gratuita del tuo POS attuale”  
5. Link al comparatore / guida commissioni  
6. Disclaimer: condizioni variabili; non “il migliore POS”

### Comparatore commissioni
- Input: transato mensile, commissione %, fisso/tx, canone, altri costi  
- Output: costo mese/anno e risparmio vs scenario attuale  
- Parametri **modificabili**; nessuna preferenza hard-coded a un brand  
- Nota obbligatoria: simulazione illustrativa, IVA/canoni speciali esclusi se non inseriti  
- Target commerciale: utile soprattutto da ~5.000€/mese di transato, senza escludere i più piccoli  

### Relazione con SumUp
- Pagina SumUp = canale partner (noindex o path dedicato), **non** sostituisce l’hub SEO.

---

## 6. SEO on-page — interventi previsti (fase esecuzione)

| Pagina | Intervento | Impatto atteso |
|--------|------------|----------------|
| `index.html` | Riposizionare H1/title/servizi su 4–5 aree; menu hub | Brand + discovery servizi |
| Hub web esistenti | Title nazionali; H2 chiari; CTA coerenti | CTR GSC |
| `manutenzione-assistenza.html` | Accorciare meta; link da guide | Conversione piano |
| Case study | Title ≤60; blocchi problema/soluzione/tecnologie; link a servizi | Autorevolezza |
| `plugins.html` | Hub Software più esplicito | Cluster software |
| Nuove POS/IT | Title/H1/FAQ solo se domande reali | Nuovo traffico commerciale |

---

## 7. SEO tecnica — checklist (da rieseguire in fase 0)

- [x] robots Allow + sitemap  
- [x] Canonical presenti sulle pagine campionate  
- [x] HTTPS / custom domain  
- [x] Verificare risposta `sitemap.xml` — **HTTP 200** via curl (31/10/2026); alcuni client avevano riportato 500 in passato  
- [ ] CWV mobile (PageSpeed) — **quota API esaurita** il 31/10/2026; rieseguire da PageSpeed Insights manualmente su home + 2 landing  
- [x] Audit immagini WebP/lazy — `fabio.jpg` → `fabio.webp`; logo header senza lazy (ok); contenuti blog già lazy in gran parte  
- [x] Schema: Organization/Person/Service/Breadcrumb/FAQ su home e hub principali  
- [x] Nessun cambio URL senza piano 301 (slug esistenti preservati)  

---

## 8. Portfolio e autorevolezza

| Progetto | In sito | Azione |
|----------|---------|--------|
| Visita Medical | Sì | Arricchire risultati solo se misurabili |
| CivicOS | Sì | Enfatizzare PA / Laravel / app |
| Cala del Sol | Sì | Collegare a plugin prenotazioni + turismo |
| NextGen | Sì | Title più corto |
| Studio Furnari | **No** | Aggiungere solo se progetto pubblicabile e autorizzato |

Ogni case study: cliente/settore → problema → obiettivi → soluzione → stack → link a servizio correlato.

---

## 9. Piano editoriale 3 mesi (outline)

### Mese 1 — Rafforzare hub + POS
1. *Come funzionano le commissioni POS* → `/confronto-commissioni-pos.html`  
2. *Come scegliere un POS per la tua attività* → hub POS  
3. *Manutenzione WordPress: piano vs intervento spot* → link a `manutenzione-assistenza`  

### Mese 2 — Software + IT
4. *Quando serve un plugin WordPress su misura*  
5. *Assistenza informatica per PMI: cosa include davvero*  
6. *Sito web + gestionale: quando integrarli*  

### Mese 3 — PA + nazionale
7. *Siti web per Comuni e linee guida* (senza overclaim AgID)  
8. *Ecommerce: WooCommerce vs custom*  
9. *Restyling sito: segnali che è il momento*  

Ogni pezzo: keyword primaria, outline H2, 2–3 internal link, CTA servizio.

---

## 10. UX / conversione

- Menu a **aree di business** (non solo ancore home).  
- Home: una sezione “Aree di lavoro” con 5 card (Web, Software, Manutenzione/SEO, IT, POS) — allineata al mockup POS come *area commerciale*, non come footer.  
- CTA contestuali: “Preventivo sito” vs “Analisi POS” vs “Assistenza IT”.  
- Mantenere design minimal commerciale attuale (no template AI generico).  
- Form: eventuale campo “Tipo richiesta” (già in parte presente).

---

## 11. GSC + GA4 — cosa serve da te

Export (ultimi 90 giorni + confronto 90 precedenti):
1. GSC Prestazioni → Query + Pagine (CSV)  
2. GSC Indicizzazione → riepilogo motivi  
3. GA4 → Landing page + Organic + eventi chiave  

Con quelli si chiudono: CTR bassi, posizioni 8–20, cannibalizzazione, landing senza lead.

---

## 12. Roadmap di esecuzione (modulare)

### Fase 0 — Dati (1–2 giorni)
Export GSC/GA4; PageSpeed home+2 URL; conferma sitemap in browser.

### Fase 1 — Fondamenta commerciali (1–2 settimane) **PRIORITÀ**
1. Redesign informativo home + menu (multidisciplinare)  
2. Hub `soluzioni-pos.html` (neutro)  
3. Guida/comparatore commissioni (MVP)  
4. Hub `software-su-misura.html` (o potenziare `plugins.html`)  
5. Fix on-page minori (title/meta)  
6. Link interni guide → hub  

### Fase 2 — Espansione (2–4 settimane)
1. Hub assistenza IT  
2. Hub ecommerce / PA se contenuti pronti  
3. Case study aggiuntivi (solo reali)  
4. Articoli mese 2–3  

### Fase 3 — Misura
Report mensile: GSC (click/impr/CTR/pos) + GA4 (organic, lead) + elenco URL nuove.  
→ Kit operativo: [`docs/FASE-3-MISURA.md`](FASE-3-MISURA.md) (inventario URL, eventi, template). Numeri da compilare con export.

---

## 13. Cosa **non** fare ora
- Non riscrivere tutto il sito in un colpo.  
- Non cambiare slug delle pagine già indicizzate senza necessità.  
- Non pubblicare hub POS marchiati SumUp/myPOS come unica verità SEO.  
- Non inventare volumi keyword, clienti o risultati.  
- Non eliminare `pagamenti-sumup.html` senza decidere se resta landing partner privata.

---

## 14. Prossimo passo operativo

1. **Publish** su produzione (Fase 1–2 ancora in locale se non deployate).  
2. Richiesta indicizzazione GSC sulle URL nuove (vedi FASE-3-MISURA §2).  
3. Export GSC/GA4 → compilare il template in `docs/FASE-3-MISURA.md` §4.  
4. (Opzionale) articoli editoriali mese 2–3 dall’outline §9, solo dopo baseline misura.
