import { useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await fetch(
        `${API_URL}/api/submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      setStatus({
        type: "success",
        message: "Your form was submitted successfully!",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Unable to submit the form.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <div className="form-card">
        <h1>SemiColon Forms</h1>

        <p className="subtitle">
          Fill in the form and we'll get back to you.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">
              Name *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="Your name"
            />
          </div>

          <div className="field">
            <label htmlFor="email">
              Email *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              maxLength={200}
              placeholder="you@example.com"
            />
          </div>

          <div className="field">
            <label htmlFor="phone">
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              maxLength={50}
              placeholder="+20..."
            />
          </div>

          <div className="field">
            <label htmlFor="message">
              Message
            </label>

            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              maxLength={2000}
              rows={5}
              placeholder="Your message..."
            />
          </div>

          {status.message && (
            <div
              className={`status ${status.type}`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;