# ⚡ Prem Kumar Electronics — Official Website

> **20 Saal Ka Bharosa | Har Electronic Ka Ilaaj**

Prem Kumar ji ka Electronic Repairing Centre ab online! Ek single-page,
blazing-fast, mobile-first website — Fridge, TV, AC, Washing Machine, Cooler
repair se lekar complete electrical & CCTV kaam tak.

A single-page, zero-build, production-ready website for a local electronics
repair business. Pure HTML5 + CSS3 + Vanilla JavaScript — no frameworks,
no build step, no dependencies. Open `index.html` and it runs.

---

## 📁 File Structure / फ़ाइलों की व्यवस्था

```
📁 premkumar-electronics/
├── index.html                      ← Complete single-page website (all 11 sections)
├── styles.css                      ← Design system, animations, responsive CSS
├── script.js                       ← All interactivity (menu, carousel, form, reveal)
├── README.md                       ← Ye file (project guide)
├── robots.txt                      ← SEO: Google ko crawl karne do
├── sitemap.xml                     ← SEO: Google Search Console mein submit karein
└── assets/
    └── images/
        ├── prem-kumar-portrait.jpg ← About section photo (REPLACE with real photo)
        └── og-cover.jpg            ← WhatsApp/Facebook share image (1200×630)
```

---

## 🔧 Quick Setup — Sirf 5 Minute (हिंदी में)

Website live karne se pehle sirf ye placeholders badalne hain.
Kisi bhi editor (VS Code / Notepad++) mein **Find & Replace** karein:

| # | Dhundhein (Find) | Badlein (Replace with) |
|---|---|---|
| 1 | `+91-98765-43210` | Prem Kumar ji ka real phone number |
| 1b | `919876543210` | Real number, sirf digits (tel: aur wa.me links mein) |
| 2 | `premkumar.electronics@gmail.com` | Real email address |
| 3 | `[Your Shop Address, Your City, Your State - PIN]` | Dukaan ka poora pata |
| 4 | `https://premkumarelectronics.in/` | Aapka real domain ya GitHub Pages URL |
| 5 | `YOUR_FORM_ID` | Formspree form ID (neeche steps dekhein) |
| 6 | Area names (Gandhi Nagar, Station Road...) | Aapke real local areas |
| 7 | `assets/images/prem-kumar-portrait.jpg` | Same naam se real photo replace karein |

**Code mein har jagah ⚠️ REPLACE comment laga hai — dhundne mein aasaani ke liye.**

### 📋 Booking Form Setup (Formspree — FREE)

1. [formspree.io](https://formspree.io) pe free account banayein (email se)
2. "New Form" banayein → ek **Form ID** milega (e.g. `xqkrabcd`)
3. `index.html` mein `<form id="bookingForm" action="https://formspree.io/f/YOUR_FORM_ID"` mein `YOUR_FORM_ID` ki jagah apna ID daalein
4. Done — ab har booking request seedha email pe aayegi!

> **Note:** Jab tak Formspree setup nahi karte, form automatically booking ki
> poori details ke saath **WhatsApp message** khol dega — matlab website bina
> kisi setup ke bhi kaam karti hai. 🇮🇳

---

## 🚀 GitHub Pages Deployment — Step by Step

### English

1. **Create repository:** On GitHub → **New Repository** → name it
   `premkumar-electronics` → Public → Create (don't add any template files)
2. **Upload files:**
   - Easiest: repo page pe **"uploading an existing file"** click karein →
     saari files drag-and-drop karein → **Commit changes**
   - Ya git se:
     ```bash
     git init && git add . && git commit -m "Launch Prem Kumar Electronics website"
     git branch -M main
     git remote add origin https://github.com/<your-username>/premkumar-electronics.git
     git push -u origin main
     ```
3. **Enable GitHub Pages:** Repo → **Settings** → **Pages** →
   Source: **Deploy from a branch** → Branch: **main** / **(root)** → **Save**
4. **Wait 1-2 minutes** → website live at
   `https://<your-username>.github.io/premkumar-electronics/`
5. **Update placeholders** in `index.html`, `robots.txt`, `sitemap.xml`
   (canonical/OG URLs) to your real URL, then commit again.

### हिंदी में (आसान भाषा)

1. GitHub pe **naya repository** banayein — naam: `premkumar-electronics` (Public)
2. Saari files upload karein (drag & drop bhi chalega)
3. **Settings → Pages** mein jaakar **main branch** select karke **Save** karein
4. 1–2 minute mein website live ho jayegi! Link sabko WhatsApp pe bhej dein 🎉

### 🌐 Custom Domain (Optional / वैकल्पिक)

1. Domain Registrar (GoDaddy/Hostinger) mein DNS records banayein:
   - `A` records → GitHub ke IPs: `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - Ya `CNAME` record → `<your-username>.github.io`
2. Repo ke **Settings → Pages → Custom domain** mein apna domain likhein
3. Repo root mein ek file `CNAME` banayein jisme sirf domain ho (e.g. `premkumarelectronics.in`)
4. **Enforce HTTPS** tick karein (certificate aane mein kuch minute lagte hain)
5. `index.html` ke canonical/OG tags aur `robots.txt`/`sitemap.xml` mein naya domain daalein

---

## 🔍 SEO Checklist (Google Ranking)

Website mein pehle se included:

- [x] SEO-optimized `<title>` + meta description + keywords
- [x] Open Graph + Twitter Card tags (WhatsApp/Facebook pe sundar preview)
- [x] Schema.org **LocalBusiness (Electrician)** JSON-LD structured data
- [x] Semantic HTML5: `<header> <main> <section> <article> <footer> <nav>`
- [x] Sirf ek `<h1>`, proper heading hierarchy (h1→h2→h3)
- [x] Sabhi images pe descriptive `alt` text + `width`/`height` (no layout shift)
- [x] Canonical URL tag
- [x] `robots.txt` + `sitemap.xml`
- [x] Mobile-first, fast loading (no frameworks, ~200KB total images)
- [x] Smooth scroll + anchor sections (`#services`, `#contact` — indexable)

**Live hone ke baad karein:**

- [ ] [Google Search Console](https://search.google.com/search-console) mein
      property add karke `sitemap.xml` submit karein
- [ ] **Google Business Profile** banayein (local search + Maps ranking ka king)
- [ ] JSON-LD mein `geo` (latitude/longitude) add karein — Google Maps se
      right-click karke milta hai
- [ ] Real reviews aane pe `aggregateRating` schema add karein
- [ ] Domain regularly content update rakhein (Google fresh content pasand karta hai)

---

## ✏️ How to Update Content Later (बाद में बदलाव कैसे करें)

| Kya badalna hai | Kahan milega |
|---|---|
| Phone / WhatsApp number | Find: `919876543210` (index.html + script.js top ke `WHATSAPP_NUMBER` config) |
| Email | Find: `premkumar.electronics@gmail.com` |
| Address / timing | `index.html` → Contact section + Footer |
| Services list | `index.html` → `<!-- SECTION 3: SERVICES -->` ke andar cards copy/paste karein |
| Customer reviews | `index.html` → Testimonials section — card copy karke text badlein |
| Service areas | `index.html` → Area section ki `<li>` items |
| About photo | `assets/images/prem-kumar-portrait.jpg` ko real photo se replace (same naam rakhein) |
| Colors / branding | `styles.css` → sabse upar `:root` ke andar ek jagah saare colors |

---

## 🎨 Design System

| Token | Value | Use |
|---|---|---|
| Royal Blue | `#1E40AF` | Primary / Trust |
| Amber Gold | `#F59E0B` | Premium accents |
| Green | `#10B981` | WhatsApp / Success |
| Navy | `#0F172A` | Dark backgrounds |
| Off-white | `#F8FAFC` | Light sections |
| Red | `#EF4444` | Call urgency |

**Fonts:** Poppins (headings) + Noto Sans Devanagari (body/Hindi) via Google Fonts.

**Sections:** Hero → Trust Bar → Services (16) → Why Us → Brands (18) →
Process (4 steps) → Testimonials → About → Service Area → Contact/Booking → Footer

**Features:** sticky nav, mobile hamburger, seamless marquee, expandable
services grid, auto-sliding testimonial carousel (with swipe), scroll-reveal
animations, validated booking form (Formspree + WhatsApp fallback),
floating WhatsApp + back-to-top buttons, reduced-motion support, print styles.

---

## 📜 License

Sabhi rights Prem Kumar Electronics ke paas surakshit hain.
Dekhein [LICENSE](LICENSE) file.
