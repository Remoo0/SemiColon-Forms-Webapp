# [Your Club Name] — Forms App

A small site for holding your club's forms (membership sign-up, event RSVP, feedback, etc).

## Project structure

```
club-forms-app/
├── frontend/              React app (Vite) — everything people see and use
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── FormsPage.jsx    the forms hub page
│   │   │   └── FormsPage.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/               placeholder for wherever submissions end up
│   └── README.md
└── README.md              you are here
```

## Running the frontend

```
cd frontend
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Where form submissions go

Right now submissions just log to the browser console — nothing is saved.
See `backend/README.md` for the three easiest ways to actually collect them
(Formspree, Google Sheets, or your own API), and `frontend/src/pages/FormsPage.jsx`
for exactly where to plug that in (`handleSubmit`).
