export async function appendSubmission({ name, email, phone, message }) {
  const res = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.GOOGLE_APPS_SCRIPT_SECRET,
      name,
      email,
      phone,
      message,
    }),
  });

  const result = await res.json();

  if (!res.ok || result.error) {
    throw new Error(result.error || "Failed to write to Google Sheet");
  }

  return result;
}