# macraemyint.com — Portfolio Rebuild Brief
## For Claude Code. Read every word before touching a file.

---

## WHO THIS IS FOR
Macrae Myint (Min Hein) — web designer + developer, Redmond WA → Yangon Myanmar Nov 2026.
12+ years graphic design experience. Now building web products and AI systems.
This site is his cold outreach proof: every email to local service businesses says
"check my portfolio at macraemyint.com." A Tacoma plumber, roofer, or electrician 
reads this email, clicks the link, and decides in 8 seconds whether Macrae can
build their site. This portfolio has ONE job: earn that yes.

---

## CURRENT STATE (what you're working with)
- React + TypeScript + Vite + Tailwind + framer-motion + shadcn/ui
- Routing: Home (/), Portfolio (/portfolio), ProjectDetail (/project/:slug), About (/about), Contact (/contact)
- Effects already built: ParticleEmbers, MagneticButton, TiltCard, TiltCard, TypingCarousel, CustomCursor, ScrollProgress
- Problem: currently positioned as "Professional Automotive Illustrator." Wrong for this purpose.
- Fix: reposition as "Web Designer + Developer" with design background as supporting credential.

---

## WHAT TO DELETE IMMEDIATELY (before anything else)
1. The entire `tailwind-plus/` folder — third-party Tailwind UI templates, not Macrae's code
2. `src/assets/portfolio/` — ALL images EXCEPT:
   - Keep: `aleph-carwash.png`, `aleph-logos.png`, `akagi-branding.png`, `aleph-pricelist.png`,
     `naturin-store.png`, `digital-kaway.png`, `comet-logo.png`, `creativo27-flyer.jpg`
     (these are brand/commercial design work, not car art)
   - DELETE: all the car illustration files (godzilla-r33, r33-multiangle, celica, evo-iv, jzx100, manga-style-car, etc.)
   - DELETE: all the enzyme/smoothie/organic product label files (banana-enzyme, pineapple, guava, etc. — not relevant)
   - DELETE: `rias-vector`, `tracer-overwatch`, `lucio-overwatch` (character art)
   - KEEP: `macrae-profile.jpg`, `logo-signature.png`, `before-car.jpg`, `after-art.jpg`
3. `src/components/sections/CarQuiz.tsx` — not relevant to web clients
4. `src/components/sections/CommissionForm.tsx` — car illustration commissions, wrong context
5. `src/components/sections/InstagramFeed.tsx` — not needed
6. `public/portfolio-book/` — all 12 book pages (replaced by web project screenshots)

---

## CONTENT HIERARCHY (what the new site communicates, in priority order)
1. I build clean, fast websites for local service businesses — in ~48 hours, then managed monthly
2. Here's the proof: three real live web projects (with links, screenshots, stack)
3. I've got 12+ years of design experience behind every pixel (supporting credential)
4. Here's a sample of my graphic design work (secondary section, not the lead)
5. Get in touch: macrae@macraemyint.com

---

## THE THREE HERO WEB PROJECTS (main portfolio content)

### Project 1 — SignPros Demo
- Name: SignPros Demo
- URL: https://signpros-demo.vercel.app
- Description: Portfolio SPA for a real estate sign company. 58 real estate brand logos, 
  product catalog, FAQ chatbot, gold/dark premium aesthetic. Vanilla JS, fully custom.
- Tech: Vanilla JS, CSS, HTML — no frameworks
- Status: Live
- Category: Business Website
- Why it matters to the target: It's a local-business site. Polished, fast, mobile-first.
  This is exactly what a plumber or roofer is picturing when they imagine "a good website."

### Project 2 — Lumino AI Studios
- Name: Lumino AI Studios
- URL: https://app.luminoaistudiosmm.com (or luminoaistudiosmm.com for the landing page)
- Description: Myanmar-first AI SaaS platform with 41+ AI tools, Wave Pay/KBZ payment 
  integration, multi-language (EN/MM/TH/PH), Telegram-based AutoReply system. 
  Production-grade with auth, subscriptions, and billing.
- Tech: Next.js 16, MongoDB Atlas, NextAuth, Vercel
- Status: Live
- Category: Web Application / SaaS
- Why it matters: Shows Macrae can build full-stack, production-grade web apps — not just
  landing pages. Impresses anyone who wants more than a brochure site.

### Project 3 — MN Order Sync
- Name: MN Order Sync
- URL: (internal client tool — show screenshots, no live link)
- Description: Custom order tracking web app for MN Custom Homes. Real estate construction
  company uses it to track sign installation jobs from email screenshots. OpenAI OCR extracts
  order data, Supabase stores it, custom dashboard shows status in real time.
- Tech: Next.js, Supabase, OpenAI Vision API
- Status: Live (internal)
- Category: Client Web App
- Why it matters: Real client, real problem solved, real business outcome. Shows Macrae 
  builds tools that actually get used, not just pretty pages.

### Future Project (Coming Soon slot)
- Name: CLC Construction (Dad's Business)
- Description: Website coming soon for a cellular lightweight concrete construction company
  in Myanmar. Razor/razorblade model — the machines they sell, recurring chemical sales.
- Status: Building
- Why: Shows Macrae is actively building, and signals the Myanmar/construction market niche.

---

## GRAPHIC DESIGN SECTION (secondary, tasteful, not the lead)
Label it: "12+ Years of Design Work" or "Design Background"
Show a tight grid (6-8 pieces max) of commercial design work:
- Aleph Carwash branding + social posts (real client, real brand)
- Akagi branding
- Naturin store / digital-kaway (product design)
- Comet logo, Creativo27 flyer
- 2-3 car illustrations (the Supra-era and JDM work shows design eye, not just logos)
Frame it as: "Behind every website I build is 12 years of design discipline."
Do NOT use the product enzyme/smoothie labels — they dilute the premium feel.
Do NOT make this section bigger than the web projects section.

---

## PROFILE UPDATE (src/data/profile.ts)
Change these fields:
- tagline: "Web Designer & Developer — 12+ Years Design Experience"
- headline: "I build clean, fast websites for local businesses. Based in Seattle, WA."
- heroIntroduction: "Web designer and developer building products for local businesses 
  and startups. 12 years of design discipline behind every project."
- biography: rewrite (see below)
- availability: "Taking on new clients"
- email: "macrae@macraemyint.com" (the new domain email)
- calendlyUrl: remove or update — no car illustration consultations

New biography:
"I'm Macrae Myint — a web designer and developer with 12+ years of design experience 
behind every project I ship. I started in graphic design in 2014 and spent years doing 
brand identity, print, and digital work for clients across Myanmar and the US. 
In the last few years I've moved into web development and AI systems — building 
production SaaS platforms, client tools, and local business websites.
Based in Redmond, WA (moving to Yangon, Myanmar in late 2026), I work with local 
service businesses who need a clean, fast website that actually converts visitors.
My offer: a polished single-page site built in ~48 hours, then managed for a flat 
monthly fee. No templates. No page builders. Just good design and clean code."

---

## HOME PAGE REDESIGN (src/pages/Home.tsx)

### Hero section
- Replace the hero with a DARK, premium layout
- Add a Spline 3D embed (https://spline.design) as the hero background or floating element
  Use a clean, abstract 3D scene — geometric shapes, particles, or a floating sphere
  Import via: `npm install @splinetool/react-spline` and the @splinetool/runtime
  Spline scene URL (use a free public one from spline.design/community, or use this pattern):
  `<Spline scene="https://prod.spline.design/[scene-id]/scene.splinecode" />`
  If Spline is unavailable, use the existing ParticleEmbers component for the hero background
- Hero text: "Macrae Myint" (large) | "Web Designer & Developer" (subtitle)
- TypingCarousel: cycle through ["For local businesses.", "Built in 48 hours.", 
  "Managed monthly.", "Design that converts."]
- CTA buttons: "See My Work" (scroll to projects) + "Get in Touch" (mailto:macrae@macraemyint.com)

### Projects section (MAIN section)
- Title: "Web Projects"
- Show the 3 hero web projects as large cards with:
  - Live screenshot/thumbnail (use a screenshot tool or placeholder showing the actual URL)
  - Project name, category badge, tech stack pills
  - 2-line description
  - "View Live →" button (opens URL in new tab) — or "See Screenshots →" for internal tools
- Style: dark cards, subtle border, hover effect (TiltCard component already exists — use it)
- Coming soon: CLC Construction card with "Building →" status

### Stats bar
- 12+ Years Design
- 3 Live Products
- 2 Countries
- 48hr Turnaround
(Remove "$633 Alfred this week" and "24/7 Bots Running" — irrelevant to web clients)

### Design background section
- Title: "Design Background"
- Subtitle: "12+ years of visual discipline behind every website I build."
- Clean masonry or grid of 6-8 design samples (the kept assets listed above)
- Keep it tasteful — not a full portfolio page, just a section that shows the design eye

### Services section
- Keep it simple, 3 items only:
  1. "Website Design & Build" — Clean, fast single-page sites. ~48 hours. 
  2. "Monthly Management" — Updates, hosting, changes. Flat monthly fee.
  3. "Web Applications" — Custom tools, dashboards, SaaS. Complex builds.
- Remove "Social Automation" and "AI Systems" from this page — confusing to local business clients

### Contact CTA (bottom of home)
- Simple: "Ready to get your site built?"
- Email: macrae@macraemyint.com
- Note: "Based in Redmond, WA — working with businesses in WA, OR, and remotely."

---

## ABOUT PAGE (src/pages/About.tsx)
- Remove: "Professional Automotive Illustrator" and "100% Hand-Crafted — Zero AI" — ironic and wrong
- Replace hero heading with: "About Me"
- Bio: use the new biography from profile.ts
- Keep the experience section — it's strong (SignPros, Kairox, Greenland, iNitiate, Huddersfield degree)
- Keep the skills section but reorder:
  1. Web Development (React, Next.js, Node.js, Supabase, MongoDB)
  2. Design (Graphic design, brand identity, Adobe Creative Suite)
  3. Remove "Automotive Art" category
- Keep the portrait photo

---

## PORTFOLIO PAGE (src/pages/Portfolio.tsx)
- Category filters: "Web Projects" (default) | "Design Work" | "All"
- Web Projects: the 3 main ones + CLC coming soon
- Design Work: the 8 kept graphic design assets
- Keep the lightbox component (already exists, works well)

---

## STYLING RULES
- Dark theme as DEFAULT (not light) — the target audience (local businesses) converts better 
  on dark premium sites; it signals quality and doesn't look like a template
- Accent: a warm amber/gold (#F59E0B or similar) — evokes quality, not cold tech blue
- Font: keep whatever display font is current for headings; body stays clean/readable
- NO: carousel sliders for hero, cookie banners, chatbots, subscription forms
- YES: scroll-triggered reveals (already built), magnetic buttons on CTAs, tilt on project cards

---

## TECH STACK CHANGES
Add:
- `@splinetool/react-spline` for 3D hero
- `@splinetool/runtime`

Remove (package.json):
- Any Lovable-specific packages if present
- Check for and remove any unused packages after deletion of CarQuiz/CommissionForm

Keep everything else as-is.

---

## DEPLOYMENT
- GitHub repo: create `macraemyint-portfolio` under macraemyintminhein98
- Vercel: connect to that repo, deploy to production
- Domain: macraemyint.com — update Namecheap A records from 185.158.133.1 (Lovable) 
  to Vercel's IP (76.76.21.21 + 76.76.21.22) after deploy confirmed
- `git config user.email macraemyintminhein98@gmail.com` before first commit (Vercel Hobby rule)

---

## WHAT CLAUDE CODE SHOULD PRODUCE (in order)
1. Delete the files listed above
2. Update `src/data/profile.ts` with new positioning
3. Rewrite `src/pages/Home.tsx` — new hero, projects section, design section, services, CTA
4. Update `src/pages/About.tsx` — new positioning, keep experience/education
5. Update `src/pages/Portfolio.tsx` — category filter with Web Projects default
6. Install Spline package, add 3D hero to Home
7. `npm run build` — confirm it builds with zero errors
8. Provide exact Vercel deployment + Namecheap DNS instructions

---

## WHAT NOT TO DO
- Don't change the routing structure
- Don't remove framer-motion animations — they're what makes it feel premium
- Don't build a chatbot or contact form that requires a backend
- Don't use Lorem ipsum anywhere — use real copy from this brief
- Don't keep any reference to "automotive illustrator", "car commissions", "JDM specialist"
  in the user-facing copy. The design samples section can show the car art as portfolio pieces
  without centering the identity on it.
- Don't remove the dark theme or switch to a light default
