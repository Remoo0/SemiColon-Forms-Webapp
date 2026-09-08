# Backend (not built yet — pick one)

This folder is a placeholder. This template doesn't need a real backend to work,
but you need *something* to catch form submissions. Pick whichever fits how
much setup you want to do:

## Option A — Formspree (easiest, no code)
1. Create a free form at https://formspree.io
2. In `frontend/src/pages/FormsPage.jsx`, inside `handleSubmit`, POST to it:
   ```js
   fetch('https://formspree.io/f/yourFormId', {
     method: 'POST',
     body: new FormData(event.target),
     headers: { Accept: 'application/json' },
   });
   ```
3. Delete this folder — you don't need it.

## Option B — Google Sheets via Apps Script
1. Make a Google Sheet, add an Apps Script web app that appends incoming rows.
2. In `handleSubmit`, POST the form data as JSON to that script's URL.
3. Delete this folder — you don't need it.

## Option C — Your own API (most flexible)
1. Build a small server here (Node/Express, etc.) with an endpoint like
   `POST /api/submissions` that saves to a database.
2. In `handleSubmit`, POST the form data to `/api/submissions`.
3. Keep building this folder out as your actual backend.

Whichever you choose, the only file you need to touch on the frontend side
is `handleSubmit()` in `frontend/src/pages/FormsPage.jsx`.
