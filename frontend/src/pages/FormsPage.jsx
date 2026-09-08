import { useState } from 'react';
import './FormsPage.css';

// Add, remove, or edit form cards here — the board renders whatever's in this list.
const FORMS = [
  { id: 'signup', tag: 'New members', title: 'Membership sign-up', blurb: "Join the club — takes about 2 minutes." },
  { id: 'rsvp', tag: 'Events', title: 'Event RSVP', blurb: "Let us know if you're coming to the next meetup." },
  { id: 'feedback', tag: 'Feedback', title: 'Suggestions & feedback', blurb: "Tell us what's working and what isn't." },
];

function FormsPage() {
  const [activeForm, setActiveForm] = useState(null); // null | 'signup' | 'rsvp' | 'feedback'
  const [submitted, setSubmitted] = useState({});

  function openForm(id) {
    setActiveForm(id);
  }

  function closeForm() {
    setActiveForm(null);
    setSubmitted((prev) => ({ ...prev, [activeForm]: false }));
  }

  // ============================================================
  // Right now this just reads the field values and shows the
  // success screen — nothing is sent anywhere. To actually collect
  // submissions, pick ONE option from backend/README.md and drop
  // it in here, before setSubmitted(...) is called.
  // ============================================================
  function handleSubmit(event, formId) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());

    // For now: just log it, so you can see the shape of the data.
    console.log(`[${formId} submission]`, data);

    // TODO: send `data` to Formspree / Sheets / your API here.

    event.target.reset();
    setSubmitted((prev) => ({ ...prev, [formId]: true }));
  }

  return (
    <div className="forms-page">
      <header className="site">
        <div className="wrap">
          <div className="brand">
            <div className="brand-mark">C</div>
            <div className="brand-name">[Your Club Name]</div>
          </div>
          <nav className="site-nav">
            <a href="#forms">Forms</a>
            <a href="#contact-footer">Contact</a>
          </nav>
        </div>
      </header>

      {activeForm === null ? (
        <>
          <section className="hero">
            <div className="wrap">
              <h1>Everything the club needs, in one place.</h1>
              <p>Sign up, RSVP, or send us feedback — pick a form below and it'll take less than a minute.</p>
              <div className="hero-actions">
                <a href="#forms" className="btn btn-primary">See all forms</a>
                <a href="#contact-footer" className="btn btn-ghost">Contact an officer</a>
              </div>
            </div>
          </section>

          <section className="board" id="forms">
            <div className="wrap">
              <div className="board-heading">
                <h2>Open forms</h2>
                <span>{FORMS.length} available</span>
              </div>

              <div className="card-grid">
                {FORMS.map((form) => (
                  <div
                    key={form.id}
                    className="pin-card"
                    tabIndex={0}
                    role="button"
                    onClick={() => openForm(form.id)}
                    onKeyPress={(e) => e.key === 'Enter' && openForm(form.id)}
                  >
                    <span className="tag">{form.tag}</span>
                    <h3>{form.title}</h3>
                    <p>{form.blurb}</p>
                    <span className="go">Fill out form →</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="form-panel">
          <div className="wrap">
            <div className="panel-card">
              <button className="back" onClick={closeForm}>← Back to forms</button>

              {!submitted[activeForm] ? (
                <FormBody formId={activeForm} onSubmit={handleSubmit} />
              ) : (
                <SuccessBody formId={activeForm} onBack={closeForm} />
              )}
            </div>
          </div>
        </section>
      )}

      <footer className="site" id="contact-footer">
        <div className="wrap">
          <p>[Your Club Name] · questions? email [club-email@school.edu]</p>
          <p>Built with this template — swap the tokens at the top of FormsPage.css to reskin it.</p>
        </div>
      </footer>
    </div>
  );
}

function FormBody({ formId, onSubmit }) {
  if (formId === 'signup') {
    return (
      <>
        <h2>Membership sign-up</h2>
        <p className="sub">Fill this out once and you're in — no fees, no catch.</p>
        <form onSubmit={(e) => onSubmit(e, 'signup')}>
          <div className="field">
            <label>Full name <span className="required-mark">*</span></label>
            <input type="text" name="name" required />
          </div>
          <div className="field">
            <label>Email <span className="required-mark">*</span></label>
            <input type="email" name="email" required />
          </div>
          <div className="field">
            <label>Year <span className="hint">(freshman, sophomore, etc.)</span></label>
            <select name="year">
              <option>Freshman</option>
              <option>Sophomore</option>
              <option>Junior</option>
              <option>Senior</option>
              <option>Grad student</option>
            </select>
          </div>
          <div className="field">
            <label>Why do you want to join?</label>
            <textarea name="reason" placeholder="A sentence or two is plenty" />
          </div>
          <button type="submit" className="btn btn-primary">Submit sign-up</button>
        </form>
      </>
    );
  }

  if (formId === 'rsvp') {
    return (
      <>
        <h2>Event RSVP</h2>
        <p className="sub">Let us know you're coming so we can plan food and seating.</p>
        <form onSubmit={(e) => onSubmit(e, 'rsvp')}>
          <div className="field">
            <label>Name <span className="required-mark">*</span></label>
            <input type="text" name="name" required />
          </div>
          <div className="field">
            <label>Are you attending? <span className="required-mark">*</span></label>
            <div className="choice-row">
              <label><input type="radio" name="attending" value="yes" required /> Yes</label>
              <label><input type="radio" name="attending" value="no" /> No</label>
              <label><input type="radio" name="attending" value="maybe" /> Maybe</label>
            </div>
          </div>
          <div className="field">
            <label>Guests <span className="hint">(not counting yourself)</span></label>
            <input type="text" name="guests" placeholder="0" />
          </div>
          <div className="field">
            <label>Dietary restrictions</label>
            <input type="text" name="diet" placeholder="e.g. vegetarian, none" />
          </div>
          <button type="submit" className="btn btn-primary">Send RSVP</button>
        </form>
      </>
    );
  }

  // feedback
  return (
    <>
      <h2>Suggestions &amp; feedback</h2>
      <p className="sub">Anonymous is fine — we read every one of these.</p>
      <form onSubmit={(e) => onSubmit(e, 'feedback')}>
        <div className="field">
          <label>Name <span className="hint">(optional)</span></label>
          <input type="text" name="name" />
        </div>
        <div className="field">
          <label>What's this about?</label>
          <select name="topic">
            <option>General feedback</option>
            <option>An event</option>
            <option>Club leadership</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="field">
          <label>Your message <span className="required-mark">*</span></label>
          <textarea name="message" required placeholder="Tell us what's on your mind" />
        </div>
        <button type="submit" className="btn btn-primary">Send feedback</button>
      </form>
    </>
  );
}

const SUCCESS_COPY = {
  signup: { title: "You're on the list", body: "We'll email you before the next meeting with details." },
  rsvp: { title: 'RSVP received', body: "See you there — we'll send a reminder closer to the date." },
  feedback: { title: 'Thanks for letting us know', body: 'An officer will follow up if you left contact info.' },
};

function SuccessBody({ formId, onBack }) {
  const copy = SUCCESS_COPY[formId];
  return (
    <div className="form-success">
      <div className="check">✓</div>
      <h3>{copy.title}</h3>
      <p>{copy.body}</p>
      <button className="btn btn-ghost" onClick={onBack}>Back to forms</button>
    </div>
  );
}

export default FormsPage;
