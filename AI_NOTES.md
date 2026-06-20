# AI Notes — Kalan Brunell Portfolio Site

> **Purpose:** Briefing sheet for any AI given a task on this website (add a
> project, fix layout, tweak copy, improve SEO/a11y, etc.). Read this whole file
> before touching the site. It captures what the site is, how it's built, the
> conventions to follow, and what's currently incomplete.
>
> **Maintainers (human + AI):** When you learn something new about the site or
> establish a new convention, add it here so the next AI inherits it.
>
> _Last updated: 2026-06-19_

> **Related:** there is a separate `AI_NOTES.md` in the **Resumes** repo with
> Kalan's applicant profile, voice/style cheat sheet, and content knowledge bank.
> The site and resume should stay consistent — see §6 for known drift.

---

## 0. Hard rules (do not break these)

1. **Never fabricate.** Same rule as the resume. Don't invent metrics, dates,
   tools, or accomplishments. If a stronger claim *might* be true but you can't
   confirm it, flag it as a question for Kalan instead of publishing it. This
   site is public and indexed by Google.
2. **Hand-coded, no build step, no framework.** This is plain static
   HTML + CSS + one vanilla JS file, deployed by GitHub Pages. Do **not**
   introduce React/Vue, a bundler, npm, Tailwind, or any build tooling. Keep it
   editable by opening a file. The footer literally says "Built with care,
   hand-coded."
3. **Keep it accessible & SEO-clean.** The site was deliberately polished for
   a11y and SEO (skip links, `aria-label`s, alt text, WCAG-AA-contrast tokens,
   canonical URLs, OG tags, sitemap). Preserve these. Every new page needs the
   full `<head>` block (title, description, canonical, theme-color, OG tags,
   analytics, fonts, stylesheet) and an `alt` on every image.
4. **Match the existing design system.** Use the CSS variables and existing
   class names (§3). Don't hand-roll new colors or inline one-off styles when a
   token/class exists. The look is intentional: warm cream + navy, editorial
   serif headings.
5. **Preserve Kalan's voice.** Technical, specific, first-person on the site
   ("I led…", "I wrote…"), concrete about hardware/tools. No fluff, no
   buzzwords. (Resume is no-pronoun; the *site* uses first person — that's an
   intentional difference.)
   - **Avoid em dashes (`—`) in prose.** Kalan flags them as an AI tell that
     doesn't fit his voice. Rewrite with commas, colons, "such as", or two
     sentences instead. The ONLY allowed em dashes are structural and site-wide:
     the page-title suffix `Title — Kalan Brunell` and date ranges like
     `January — April 2026`. Same goes for the resume.

When in doubt, ask Kalan before guessing.

---

## 1. What this is

- **Live URL:** https://kalanbrunell.site (custom domain via `CNAME` →
  `kalanbrunell.site`). Repo is `kalanbrunell.github.io`, served by GitHub Pages.
- **One-line:** Kalan's engineering portfolio — single-page homepage with
  deep-dive subpages for individual experiences and projects.
- **Stack:** static HTML, one stylesheet (`assets/css/site.css`), one script
  (`assets/js/site.js`), Google Fonts (Playfair Display + Inter), Google
  Analytics (gtag `G-B1149WE8N1`). No backend, no build.
- **Deploy:** push to the default branch → GitHub Pages publishes. No CI.
- **Canonical content note:** the resume PDF (`Brunell_Kalan_Resume.pdf`) is
  committed at repo root and linked from the hero + contact. When the resume
  changes in the Resumes repo, copy the new PDF here too.

---

## 2. File / folder map

```
kalanbrunell.github.io/
├── index.html              Homepage: hero, about, experience, projects, skills, education, contact
├── 404.html                Styled not-found page (noindex)
├── CNAME                   kalanbrunell.site
├── robots.txt              points at sitemap
├── sitemap.xml             list every LIVE (non-draft) page here when you add one
├── Brunell_Kalan_Resume.pdf  resume download (keep in sync with Resumes repo)
├── assets/
│   ├── css/site.css        ALL styles (design tokens in :root, ~30 KB)
│   ├── js/site.js          nav shadow, scrollspy, reveal-on-scroll (IntersectionObserver)
│   └── favicon.svg
├── experience/
│   └── gentex.html         experience deep-dive (pattern template for new ones)
├── projects/
│   ├── accumulator.html    FSAE high-voltage accumulator (most detailed; good template)
│   ├── arm-processor.html  5-stage pipelined ARM/LEGv8 processor (VHDL)
│   ├── safety-pcbs.html    FSAE EV safety-system PCBs
│   ├── fpga-2048.html      FPGA 2048 (VHDL/VGA)
│   ├── color-following.html  autonomous color-following vehicle
│   ├── vision-system.html  FRC robotics vision & control
│   ├── ctf.html            MITRE eCTF — LIVE (2026 HSM design + attack-phase work)
│   └── keyboard.html?      custom keyboard — page referenced as draft but may not exist yet
└── images/
    ├── hero/  about/  logos/
    ├── experience/<slug>/  one folder per experience
    └── projects/<slug>/    one folder per project
```

**Image convention:** each project/experience gets its own folder under
`images/projects/<slug>/` or `images/experience/<slug>/`. Reference with relative
paths (`../images/...` from a subpage, `images/...` from `index.html`). Always
set `loading="lazy"` on below-the-fold images; the hero image uses
`fetchpriority="high"` + preload.

---

## 3. Design system & conventions

### Tokens (defined in `:root` in `site.css`)
- Palette: `--bg` warm cream `#f6f1e6`, `--surface` `#fffdf7`, `--text`
  `#1c1a17`, `--muted`/`--muted-soft` warm grays, `--line` beige,
  `--accent` navy `#1f4868` (+`--accent-hover`, `--accent-soft`), `--warm`
  brighter navy. **No dark mode** — it's a single warm light theme. (The
  Resume AI_NOTES mentions auto dark mode for the *dashboard* project; that's a
  different repo. This site has none.)
- `--max: 1100px` content width, `--radius: 12px`, `--ease` shared easing.
- **Fonts:** Playfair Display (serif) for headings/display, Inter for body.

### Typography / structure idioms
- Section eyebrows are numbered: `01 — About`, `02 — Experience`, … Keep the
  numbering sequential if you add/reorder sections.
- Homepage section pattern: `<section class="section">` → `.container` →
  `.section__head` (`.section__eyebrow` + `<h2>` ending in a period, e.g.
  "Projects.") → content.
- Detail (sub)page pattern: `.detail-hero` (with `.detail-back`,
  `.detail-eyebrow`, `.detail-title`, `.detail-meta`, `.detail-summary`) →
  `<main class="detail-body">` with `.detail-section`s → `.detail-footer-nav`
  (prev/next). Reuse `accumulator.html` or `gentex.html` as the template.
- Useful detail components already styled: `.detail-callout` (highlight box),
  `.detail-grid-2`, `.detail-grid-side` (+`--flip`), `.detail-figure` +
  `<figcaption>`, `.detail-pillrow`/`.detail-pill`, `.detail-credits`.

### Projects on the homepage are TWO tiers
- `.proj-list` — large featured items (currently accumulator, arm-processor,
  keyboard-draft).
- `.proj-grid` — smaller cards (ctf-draft, fpga-2048, safety-pcbs,
  color-following, vision-system).
- Status badges: `.proj-status` ("In Progress"/"Upcoming"),
  `.proj-coming-soon` ("Coming Soon"). Tags use `.proj-tag`.

### Motion / behavior (`site.js`)
- Add `class="reveal"` (optionally `delay-1`..`delay-4`) to anything that should
  fade/slide in on scroll. If JS is off or IO unsupported, everything is shown.
- Nav gets `.is-scrolled` after 8px scroll; homepage nav links get scrollspy
  `.is-active`/`aria-current`.

### Drafts
- A not-yet-written page is rendered as a non-clickable `<div>` (not an `<a>`)
  with a `--draft` modifier and a placeholder media box, plus a "Coming Soon"
  badge. To publish: write the page, swap the `<div>` back to
  `<a href="…">`, drop in the real image, and **add the URL to `sitemap.xml`**.

---

## 4. Checklist for common tasks

**Add a new project/experience page:**
1. Copy `projects/accumulator.html` (rich) or a smaller one as a skeleton.
2. Update the entire `<head>`: title, meta description, canonical, OG title/desc/url/image.
3. Write content in Kalan's first-person technical voice; real details only.
4. Create `images/projects/<slug>/`, add images with `alt` + `loading="lazy"`.
5. Wire the homepage card (`.proj-item` or `.proj-card`) — if it was a draft
   `<div>`, convert to `<a href="projects/<slug>.html">` and remove the
   placeholder/"Coming Soon".
6. Add the page to `sitemap.xml` with a sensible `priority`/`changefreq`.
7. Fix the `.detail-footer-nav` prev/next links on neighboring pages if needed.

**Edit copy:** keep the voice (§0.5), don't break contrast/SEO, mind that the
same fact may live in both the homepage card *and* the detail page.

**Update the resume:** replace `Brunell_Kalan_Resume.pdf` here when the Resumes
repo's PDF changes.

---

## 5. Current state / incomplete items (good places to make progress)

- **MITRE experience is a stale placeholder.** `index.html` shows it as
  "Engineering Intern · RCAT Lab · Summer 2026 · Upcoming · details to follow,"
  but the *resume* now has a real title ("Avionics Cybersecurity Intern") and
  four concrete bullets (SystemVerilog FPGA IP for avionics data-bus security,
  CocoTB/Vivado RTL verification on AMD Xilinx FPGAs, USB/SPI interfaces, etc.).
  Opportunity: flesh out the site entry and/or add an `experience/mitre.html`.
  **Confirm with Kalan what's OK to publish** (it's a security/avionics role).
- **eCTF (`ctf.html`) — DONE (2026-06-19).** Full page written: 2026 HSM
  scenario, team design (wolfSSL/wolfCrypt, AES-CBC + ECC hybrid encryption,
  authenticated receive handshake, SHA-256/constant-time PIN, overflow defenses),
  and Kalan's contributions (compile-time function-reordering hardening; attack
  phase: UART MITM + a voltage fault-injection rig with an external-light trigger
  targeting the PIN check; Tufts placed 19th). Card is live, in sitemap.
  **Still TODO:** add an image at `images/projects/ctf/` and restore the card
  `<img>` + an `og:image` (currently a placeholder). Source: Tufts' 2026 eCTF
  design doc (Patrick Johnson, Kalan Brunell, Joe-Ansel Puplava, Jet Yotsuuye,
  Nathan Edwards; advisors Steven Bell & Ming Chow) — not committed to the repo.
- **Custom keyboard project is a draft** with no page/image yet.
- **Accumulator page** predates the resume's BMS pivot: it talks about "BMS
  integration" generally, but the resume now centers a **custom STM32 BMS logic
  board** (cell monitoring/balancing/charge control, CAN telemetry) and a
  **custom RS-485 protocol** to distributed thermistor boards. Opportunity to
  surface that work on the page.
- **Minor date drift:** accumulator detail page says "Dates: 2024 — Present";
  resume says FSAE "May 2025 – Present." Pick one and make them consistent.

---

## 6. Known site ↔ resume drift to keep an eye on

| Item | Site | Resume |
|---|---|---|
| MITRE role title | "Engineering Intern" (placeholder) | "Avionics Cybersecurity Intern" |
| MITRE detail | "details to follow" | 4 real bullets |
| eCTF | draft, unlinked | full section |
| FSAE focus | general BMS integration | custom STM32 BMS board + RS-485 |
| Email | kbrunell06@gmail.com | kbrunell06@gmail.com (account is kalanmitchellb@…) |
| GPA | 3.6/4.0 | (not on current resume) |

When you change one, check whether the other should change too.

---

## 7. Open items / TBD

- Confirm what MITRE/avionics detail is cleared for public posting.
- Decide whether to add `experience/mitre.html` and `projects/ctf.html` or keep
  them light until Kalan has shareable detail.
- GitHub/LinkedIn are already linked; resume PDF is linked. Target roles for the
  whole personal brand are still TBD (see Resumes AI_NOTES §6).
</content>
</invoke>
