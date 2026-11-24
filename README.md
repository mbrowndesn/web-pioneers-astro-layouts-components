# Web Pioneers: Astro Layouts & Components

A small static site that profiles people who shaped the web, built with
[Astro](https://astro.build). It shows how Astro's **layouts**, **components**
and **content collections** fit together to turn a folder of Markdoc files into
a set of pages. There is no CMS: each pioneer is a file in the repository.

Profiles included so far: Tim Berners-Lee, Molly Holzschlag and Jeffrey Zeldman.

## What it demonstrates

- **A layout:** [`BaseLayout.astro`](src/layouts/BaseLayout.astro) holds the
  shared `<html>`, `<head>`, page title and footer. Each page fills its
  `<slot />`.
- **A reusable component:** [`PersonCard.astro`](src/components/PersonCard.astro)
  takes `name`, `image`, `intro` and `href` as props. The homepage and the 404
  page both use it.
- **A content collection:** [`content.config.ts`](src/content.config.ts) loads
  every `.mdoc` file in `src/content/pioneers/` and checks its frontmatter
  against a Zod schema.
- **Data rendering:** the homepage maps over the collection to draw a grid of
  cards. [`pioneers/[slug].astro`](src/pages/pioneers/[slug].astro) uses
  `getStaticPaths()` to build one profile page per entry and `render()` to
  output the bio.
- **Shared logic and values:** [`lib/pioneers.ts`](src/lib/pioneers.ts) sorts
  pioneers by last name, and [`consts.ts`](src/consts.ts) holds the site title.
- **A custom 404 page** that explains what a 404 is and links back to every
  pioneer.

## Tech stack

- Astro 7, building a fully static site
- Markdoc (`@astrojs/markdoc`) for the bios
- Tailwind CSS 4, through the Vite plugin
- Cloudflare Workers static assets (`wrangler`) for hosting

## Project structure

```text
public/
  images/pioneers/<slug>/image.jpg   Portrait for each pioneer
src/
  components/
    Footer.astro                     Site footer
    PersonCard.astro                 Card used in the pioneer grids
  content/pioneers/<slug>.mdoc       One file per pioneer: frontmatter + bio
  content.config.ts                  Collection definition and schema
  consts.ts                          Site-wide values (SITE_TITLE)
  layouts/BaseLayout.astro           Page shell shared by every page
  lib/pioneers.ts                    getSortedPioneers()
  pages/
    index.astro                      Homepage grid             -> /index.html
    pioneers/[slug].astro            Profile page              -> /pioneers/<slug>.html
    404.astro                        Not-found page            -> /404.html
  styles/global.css                  Tailwind import and bio typography
astro.config.mjs                     Build options and integrations
wrangler.jsonc                       Cloudflare deployment config
```

## Getting started

You need Node.js 22.12 or newer.

```bash
npm install
```

```bash
npm run dev
```

The dev server runs at <http://localhost:4321>.

| Command           | What it does                                                 |
| ----------------- | ------------------------------------------------------------ |
| `npm run dev`     | Start the dev server with live reload                        |
| `npm run build`   | Build the static site into `dist/`                           |
| `npm run preview` | Serve the built `dist/` folder locally                       |
| `npx wrangler dev`| Serve `dist/` the way Cloudflare will, 404 handling included |

## Adding a pioneer

1. Pick a slug in lowercase with hyphens, such as `eric-meyer`. It becomes the
   filename and the URL (`/pioneers/eric-meyer.html`).
2. Add a portrait at `public/images/pioneers/eric-meyer/image.jpg`.
3. Create `src/content/pioneers/eric-meyer.mdoc`:

   ```markdown
   ---
   title: Eric Meyer
   image: /images/pioneers/eric-meyer/image.jpg
   intro: >-
     One or two sentences for the card and the top of the profile page.
   homepage: https://meyerweb.com/
   ---
   The bio goes here. Use paragraphs, `##` headings, lists and links.

   *Photo: credit and license, with a link to the source.*
   ```

All four frontmatter fields are required, and `homepage` must be a full URL.
If anything is missing or malformed, the build stops with an error that names
the file. The new pioneer shows up on the homepage and the 404 page, sorted by
last name, with no other code changes.

## Build output and opening from disk

[`astro.config.mjs`](astro.config.mjs) sets two build options so the files in
`dist/` work when you double-click them, without a server:

- `build.format: 'file'` writes `pioneers/eric-meyer.html` instead of
  `pioneers/eric-meyer/index.html`.
- `build.inlineStylesheets: 'always'` puts the CSS inside each page.

For the same reason, the homepage and profile pages use relative links and
image paths. The 404 page is the exception: the server can return it for a
missing URL at any depth, so it uses root-relative paths (`/pioneers/...`).
Those only resolve when the site is served, through `npm run preview`,
`npx wrangler dev` or the deployed site.

## Deploying to Cloudflare

[`wrangler.jsonc`](wrangler.jsonc) deploys `dist/` as static assets and serves
`404.html` for any path that doesn't exist.

```bash
npm run build
```

```bash
npx wrangler deploy
```

The first deploy asks you to log in to Cloudflare. If you fork this project,
change `name` in `wrangler.jsonc` so it doesn't clash with an existing Worker.

## Learn more

- [Astro layouts](https://docs.astro.build/en/basics/layouts/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Routing and `getStaticPaths()`](https://docs.astro.build/en/guides/routing/)
- [Markdoc in Astro](https://docs.astro.build/en/guides/integrations-guide/markdoc/)
- [Tailwind CSS](https://tailwindcss.com/docs)

Photo credits and licenses are at the end of each pioneer's bio.
