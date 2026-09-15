# Form Hub

A single static page that displays your [Fillout](https://fillout.com) forms as cards in a responsive grid.

**Live demo:** [semi-colon-forms-webapp.vercel.app](https://semi-colon-forms-webapp.vercel.app)

## Features

- Clean card-grid layout for embedding multiple Fillout forms on one page
- Cycling accent colors so each card is visually distinct
- No build step — plain HTML/CSS, deploys as a static site
- Easy to extend with more cards or restyle via one CSS file

## Project structure

```
.
├── frontend/     # the static site (index.html, style.css, assets)
├── .gitignore
└── README.md
```

All the steps below assume you're working from inside the `frontend/` folder.

## 1. Add your forms

Open `frontend/index.html` and find the `<article class="card">` blocks inside `<main class="grid">`.

For each form:

1. In Fillout, open your form → **Share** → **Embed** → **Standard** and copy the form URL (looks like `https://forms.fillout.com/t/xxxxxxxxxx`).
2. Paste it into the matching card's `<iframe src="...">`.
3. Update the `<h2>` title and `<p>` description text.
4. Set `data-accent` on the `<article>` to `1`, `2`, `3`, or `4` to control which color bar it gets (they cycle).

To add more forms than the four included, copy a whole `<article class="card">...</article>` block and paste it before `</main>` — the grid will automatically reflow to fit however many you add.

To remove a form, delete its `<article>` block.

## 2. Preview locally

From the `frontend/` folder, any static server works, e.g.:

```bash
cd frontend
npx serve .
```

Then open the printed localhost URL.

## 3. Deploy to Vercel

From the `frontend/` folder:

```bash
cd frontend
npm i -g vercel
vercel
```

Follow the prompts (accept defaults — it's a static site, no build step needed). Subsequent deploys: `vercel --prod`.

Or: push this repo to GitHub and import the `frontend/` folder as the root directory in the Vercel dashboard — same result, with auto-deploys on every push.

## Notes

- Card iframe height is fixed at 520px (`style.css` → `.card-frame iframe`). If a Fillout form is much taller/shorter, adjust that value, or check Fillout's embed settings for auto-resize and swap in their JS snippet instead of a plain iframe.
- Colors, type, and spacing all live in `style.css` — the four accent colors are `--violet`, `--orange`, `--lime`, `--sky` near the top of the file.