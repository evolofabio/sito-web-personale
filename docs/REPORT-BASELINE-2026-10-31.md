# Report baseline GSC + GA4 — 31 ottobre 2026

**Proprietà:** evolodigitalstudio.it  
**Fonti:** `docs/gsc-2026-10-31/` (Performance Search zip + Istantanea_report.csv GA4)  
**Periodo GSC/GA4 nei file:** 1 gen 2026 – 31 ott 2026 (ricerca Web)  
**Nota:** le URL hub Fase 1–2 (POS, software, IT, ecommerce, PA…) **non compaiono ancora** — deploy recente; baseline = sito pre-espansione + primi mesi.

---

## 1. Sintesi GSC

| Metrica | Valore (periodo export) |
|---------|-------------------------|
| Clic totali (somma mesi Grafico) | **15** |
| Impressioni (somma mesi) | **311** |
| CTR complessivo (clic/impr) | **~4,8%** |
| Clic Italia | 15 (su 253 impr IT) |
| Mobile | 10 clic / 153 impr (CTR 6,54%) |
| Desktop | 5 clic / 156 impr (CTR 3,21%) |

### Andamento mensile (Grafico.csv)

| Mese | Clic | Impressioni | CTR |
|------|------|-------------|-----|
| lug 2026 (dal 9) | 10 | 45 | 22,22% |
| ago 2026 | 2 | 183 | 1,09% |
| set 2026 | 2 | 57 | 3,51% |
| ott 2026 | 1 | 26 | 3,85% |

**Lettura:** dopo luglio i clic calano; agosto ha molte impressioni e CTR basso (rumore / posizioni profonde). Ottobre è ancora debole in volume.

---

## 2. Top pagine GSC

| Pagina | Clic | Impr. | CTR | Pos. media |
|--------|------|-------|-----|------------|
| `/` | 11 | 136 | **8,09%** | **4,54** |
| `/chi-sono.html` | 3 | 22 | **13,64%** | **4,64** |
| `/realizzazione-siti-web.html` | 1 | 20 | 5% | 5,5 |
| `/seo-o-google-ads.html` | 0 | **81** | 0% | **84,15** |
| `/sito-wordpress-su-misura.html` | 0 | 36 | 0% | 54,86 |
| `/quanto-costa-sito-web.html` | 0 | 26 | **0%** | **5,5** ⚠️ |
| `/come-far-trovare-sito-su-google.html` | 0 | 21 | 0% | 42,29 |
| `/doctorsearch.html` | 0 | 19 | 0% | 66,47 |
| `/plugin-prenotazioni-case-vacanza-wordpress.html` | 0 | 13 | 0% | 25,54 |
| `/vacation-home-bookings.html` | 0 | 10 | 0% | 19,4 |
| `/come-scegliere-sviluppatore-sito-web.html` | 0 | 7 | **0%** | **5,57** ⚠️ |
| `/civicos.html` | 0 | 6 | 0% | 7,33 |
| `/tempo-realizzazione-sito-web.html` | 0 | 6 | 0% | 7,67 |

⚠️ **Priorità CTR:** pagine già in top ~5–8 con zero clic → title/meta/snippet da migliorare subito (`quanto-costa`, `come-scegliere`; anche `civicos` / `tempo-realizzazione` in zona 7).

---

## 3. Query GSC (sample)

| Query | Clic | Impr. | CTR | Pos. |
|-------|------|-------|-----|------|
| seo o google ads | 0 | 74 | 0% | 85,59 |
| sito wordpress professionale maremma | 0 | 13 | 0% | 81,46 |
| sviluppo wordpress su misura | 0 | 10 | 0% | 84,8 |
| digital | 0 | 8 | 0% | 7,62 |
| evolo | 0 | 3 | 0% | 5,33 |
| civicos | 0 | 2 | 0% | 6,5 |
| come far trovare il sito su google | 0 | 2 | 0% | 32,5 |
| siti web calabria | 0 | 1 | 0% | 1 |

**Lettura:** quasi tutti i clic sembrano arrivare da brand/navigazione (home, chi-sono), non dalle query commerciali in tabella. “seo o google ads” genera impressioni ma è troppo indietro per CTR. Query brand (`evolo`, `civicos`) sono in buona posizione ma volume minimo.

**Cannibalizzazione manutenzione:** in questo export **non compare** né `manutenzione-assistenza` né `manutenzione-sito-web` → niente allarme da questi CSV; da ricontrollare tra 28–90 giorni.

**Hub nuovi (POS/IT/software/ecommerce/PA):** assenti dall’export → normali; dopo indicizzazione GSC vanno in riga dedicata al prossimo report.

---

## 4. Sintesi GA4 (Istantanea)

| Metrica | Valore |
|---------|--------|
| Utenti attivi | **36** |
| Nuovi utenti | **37** |
| Durata media coinvolgimento / utente | **270 s** |
| Eventi totali | **1209** |
| Eventi chiave (conversioni) nel report | **vuoto** |

### Acquisizione (prima interazione)

| Sorgente | Utenti |
|----------|--------|
| (direct) | 16 |
| google / organic | 6 |
| Instagram referral/social | 7 |
| linktr.ee | 3 |
| altro | resto |

### Sessioni (mezzo sessione)

| Sorgente | Sessioni |
|----------|----------|
| google / organic | 45 |
| search.google.com / referral | 40 |
| (direct) | 31 |
| social / link in bio / referral vari | resto |
| visitamedical.it / referral | 7 |

### Pagine più viste (titoli GA4 — possono riflettere title vecchi)

| Titolo (come in GA4) | Views | Utenti |
|----------------------|------:|-------:|
| Home (title storico HTML/CSS/JS…) | 239 | 31 |
| Plugin WordPress | 38 | 5 |
| Blog | 33 | 5 |
| Chi Sono | 29 | 6 |
| Home “Siti web che portano clienti” | 25 | 5 |
| Vacation Home Bookings | 17 | 5 |
| Come scegliere sviluppatore | 11 | 3 |
| Quanto costa… | 11 | 3 |

**Lead:** in questa istantanea **non** risultano eventi chiave / `generazione_lead`. Verificare in GA4 che `generazione_lead` sia marcato come conversione e che il consenso cookie carichi gtag prima dell’invio form.

---

## 5. Azioni immediate (dal dato, non da ipotesi)

1. **Snippet CTR** su `/quanto-costa-sito-web.html` e `/come-scegliere-sviluppatore-sito-web.html` (pos ~5–6, 0 clic).  
2. **`seo-o-google-ads.html`:** molte impr. in posizione ~85 → non priorità CTR; eventualmente contenuti/link interni, non obsessare il title.  
3. **Indicizzazione GSC** su URL nuove (soluzioni-pos, software, IT, ecommerce, PA, articoli).  
4. **GA4:** impostare conversione su `generazione_lead` (+ monitorare `uso_simulatore_pos`).  
5. **Prossimo export:** ultimi **28 giorni** (non solo YTD) per vedere effetto hub post-publish.

---

## 6. Checklist report

- [x] GSC Query + Pagine + Grafico  
- [x] GA4 istantanea (utenti, pagine, sorgenti)  
- [ ] GSC Indicizzazione (motivi / URL nuove) — non in questo zip  
- [ ] Lead inbox allineati allo stesso periodo  
- [ ] Confronto 28 vs 28 post-hub (da fare da fine novembre 2026)
