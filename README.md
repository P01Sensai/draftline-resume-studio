# Draftline — Resume & Cover Letter Builder

A free, no-sign-up resume and cover letter builder with a live paper preview.
Built with Next.js (App Router) for real server-rendered SEO — the landing
page and the builder each have their own crawlable URL (`/` and `/builder`).

## What's included

- **`/` — Landing page**: animated glass hero, cursor-reactive floating
  letters, rotating headline word, scrolling ticker, minimal feature list.
- **`/builder` — Resume & cover letter builder**: retro black-and-white
  editor with a live side-by-side paper preview, two templates
  (Typewriter / Ledger), and a "What's next" panel listing roadmap features
  that aren't built yet.
- SEO: per-page `metadata` (title/description/canonical/OpenGraph),
  `sitemap.xml`, `robots.txt`, and JSON-LD structured data on the landing
  page — all generated natively by Next.js, no extra packages.
- PDF export uses the browser's native print dialog (`window.print()`) with
  print-only CSS — zero dependencies, works everywhere. If you want a
  polished, code-generated PDF later (custom fonts, exact pixel layout),
  that's a good next feature to add with a library like `@react-pdf/renderer`.

## Run it locally

You'll need [Node.js](https://nodejs.org) 18.17 or newer installed.

```bash
# 1. Unzip the project, then from inside the folder:
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:3000
```

Edit files under `app/` and `components/` — the dev server hot-reloads.

## Before you deploy

Replace the placeholder domain in these two files with your real domain
once you have one (used for canonical URLs, sitemap, and Open Graph tags):

- `app/layout.js` — `SITE_URL`
- `app/sitemap.js` — `SITE_URL`
- `app/robots.js` — `SITE_URL`

## Deploy to Vercel (free)

**Option A — from the Vercel dashboard (no terminal needed):**

1. Push this folder to a GitHub repo (create a new repo, then in this
   folder: `git init && git add . && git commit -m "init" && git branch -M main && git remote add origin <your-repo-url> && git push -u origin main`).
2. Go to [vercel.com](https://vercel.com), sign in, click **Add New → Project**.
3. Select your GitHub repo. Vercel auto-detects Next.js — leave the default
   build settings as-is.
4. Click **Deploy**. You'll get a live `.vercel.app` URL in about a minute.
5. Once you have a custom domain, add it under **Project → Settings → Domains**,
   then update `SITE_URL` in the three files above and redeploy.

**Option B — from the terminal:**

```bash
npm install -g vercel
vercel        # first deploy, follow the prompts
vercel --prod # promote to production
```

## Project structure

```
app/
  layout.js          # fonts + default SEO metadata
  page.js             # landing page ("/")
  sitemap.js          # sitemap.xml
  robots.js           # robots.txt
  builder/
    page.js           # builder route metadata, renders BuilderClient
components/
  landing/
    Hero.jsx          # interactive hero (client component)
    Sections.jsx       # ticker + feature list (server components)
  builder/
    BuilderClient.jsx  # the whole editor + preview + templates
```

## Roadmap (shown in-app under "What's next")

- AI bullet-point rewriting
- Job description keyword matcher
- Multiple saved profiles
- More templates
- AI-drafted cover letters
- Account sync across devices
