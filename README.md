# Linea Official Website — React.js Frontend Clone

A React.js + Vite frontend clone of [https://www.lineaofficial.com/](https://www.lineaofficial.com/) built exclusively with frontend web technologies (React, React Router DOM, Framer Motion, Lucide React, HTML5, CSS3, JavaScript).

---

## Setup & Running Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production bundle locally
npm run preview
```

---

## Implemented Routes

| Route Path | Page Component | Description |
|---|---|---|
| `/` | `Home` | Fixed desktop/mobile hero cover (`#aligners-cover`) and header login link |
| `/aligners/` | `Aligners` | Full clear aligners landing page: responsive hero video (`Linea_Wide_Website_Hero_Comp.mp4` / `Linea_Vertical__Website_Hero_Comp.mp4`), Featured carousel, 3-step treatment process with playable step videos (`progress-step-1..3.mp4`), 3 pricing cards, Module 6 AI monitor video/Vimeo preview, comparison table, 7 dental cases, 21 Trustpilot reviews, profile/intraoral before-and-after lightboxes, Socials video carousel (`socials-1..4.mp4`), FAQs, and bottom bar |
| `/aligners/pricing/` | `Pricing` | 3 aligner pricing tiers (`$1,995`, `$2,995`, `$3,995`), IPR & Attachments hover/focus tooltips, 9-step treatment timeline (`#timeline`), pricing FAQs, and Google Reviews carousel |
| `/aligners/results/` | `Results` | Google Reviews carousel, Trustpilot Reviews carousel, and 21-item Before & After gallery with click-to-lightbox zoom (`#results`) |
| `/aligners/faq/` | `FAQ` | Categorized sticky sidebar + accessible expand/collapse accordions across 6 categories (53 Q&As) |
| `/aligners/why/` | `WhyLinea` | "Why Linea" clinical supervision and standards overview |
| `/aligners/quiz/` & `/get-started/` | `GetStarted` | 9-step branching Smile Assessment quiz with US ZIP check and frontend confirmation flow |
| `/about/` & `/our-story/` | `Story` | Linea brand story, founder imagery (`twisting-aligners.jpg`, `model-2-new.jpg`), and CTA |
| `/before-afters/` | `BeforeAfter` | Dedicated Before & After gallery route with case-type filter buttons, overlay slider, Smile Profiles slider, and lightbox inspection |
| `/timeline/` | `Timeline` | Dedicated 9-step Treatment Timeline route (`#timeline`) |
| `/blog/` | `Blog` | Blog index across 31 articles with progressive pagination / "Load More" |
| `/blog/:slug/` | `BlogPost` | Article reader page with `.ck-content` responsive typography, tables, and internal router link handling |
| `/contact/` | `Contact` | Contact form with client-side validation and confirmation banner + phone modal trigger |
| `/partners/` & `/for-dentists/` | `ForDentists` | Dental partner onboarding page, partner portal login link, partner inquiry form, and partner FAQs |
| `/login/` | `Login` | Patient/Partner login form UI (frontend mock validation/feedback without authentication backend) |
| `/password_reset/` | `PasswordReset` | Password reset request UI with frontend confirmation message |
| `/terms/` | `Terms` | Website Usage Terms and Conditions (`termsInnerHtml`) |
| `/privacy/` | `Privacy` | Privacy Policy (`privacyInnerHtml`) |
| `*` | `NotFound` | Custom 404 page with navigation shortcuts and Smile Expert toll-free modal trigger |

---

## Frontend-Only Mocked Interactions

All interactive UI behaviors are implemented purely in the browser without any backend, database, or paid APIs:

- **Navigation Drawer (`LargeMenu`)**: Full-screen overlay menu with Escape-key and backdrop dismissal plus route-aware mobile `Start Here` button.
- **Book Now Drawer (`BookNowModal`)**: 3-step call scheduling drawer featuring dynamic calendar day selection, weekday time slots, US/AU searchable timezone modal (`#book-tz-modal`), SMS promotional opt-in validation, and booking confirmation screen. Triggered from header `"Book Now"`, links, or `?l=bn`.
- **Smile Assessment (`GetStarted`)**: Interactive multi-step branching smile quiz with image/text options, back navigation, ZIP check, and local submission state.
- **Carousels (`SlideCarousel`)**: Dual-mode (`aligners` and `overlay`) responsive sliders supporting arrow controls, touch swipe gestures, and keyboard Left/Right navigation.
- **FAQ Accordions (`FaqAccordion`)**: Accessible accordion buttons managing `aria-expanded` and `aria-controls`.
- **Modals & Lightbox (`GlobalModals`)**: Full-screen photo lightbox (click before/after photos), truncated review reader modal, Australian 4-digit postcode modal, and toll-free expert modal (`1-888-546-3206`).

---

## Original Assets & Documented Differences

- **Asset Inventory**: See [`ASSET_INVENTORY.md`](./ASSET_INVENTORY.md) for URLs, dimensions, byte sizes, and page mappings of all 153 downloaded original images, icons, videos, and webfonts under `public/assets/`.
- **`PanamaRegular.woff` (`HTTP 403 Forbidden`)**: The `https://linea-official-us.s3.amazonaws.com/static/fonts/PanamaRegular.woff` font file returned HTTP 403 from S3 and was omitted from `@font-face`; `--font-serif` in `src/styles/variables.css` uses `'Panama', Georgia, 'Times New Roman', serif` while `LaNord-Light.woff` and `LaNord-Regular.woff` load from `/assets/fonts/`.
- **Videos**: Hero and process/social videos play directly from downloaded original S3 `.mp4` assets under `/assets/videos/` with poster frames; Module 6 (`878905076`) offers click-to-play preview over `video-still.jpeg`.
- **Excluded Routes**: Routes disallowed by `robots.txt` (`/admin/`, `/staff/`, `/dashboard/`, `/dentists/`, `/payment/`, `/suppliers/`, `/c/`), regional `.com.au` pages, and inactive US routes returning 404 on the live site (`/veneers/`, `/whitening/`, `/aligners/retainers/`) are excluded.

---

## Build & Verification Status

- `npm run build`: Built cleanly via Vite (`vite build`) producing `dist/index.html`, `dist/assets/index-CFA-NKWa.css`, and `dist/assets/index-lLJKOMxe.js` with 0 errors.
- Static Reference Audit: Verified all 142 `/assets/...` references resolve to non-empty files in `public/assets/`, 0 remaining external `s3.amazonaws.com` URLs in `src/` or `index.html`, and 0 dead internal `<Link to="...">` targets.
- Vite Preview Verification (`npx vite preview --host 127.0.0.1 --port 4173`): Verified HTTP 200 across all 20 tested routes and sample image/video/font/icon assets.

