"use client";

import { useState, type FormEvent } from "react";

type ContactField = "name" | "email" | "message";
type ContactErrors = Partial<Record<ContactField, string>>;

const fieldLabels: Record<ContactField, string> = {
  name: "Name",
  email: "Email",
  message: "Message",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactForm({ ownerEmail }: { ownerEmail: string }) {
  const [errors, setErrors] = useState<ContactErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const nextErrors: ContactErrors = {};

    if (!name) nextErrors.name = "Enter your name.";
    if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address.";
    if (!message) nextErrors.message = "Enter a message.";

    setErrors(nextErrors);
    const firstInvalidField = (Object.keys(fieldLabels) as ContactField[]).find(
      (field) => nextErrors[field],
    );

    if (firstInvalidField) {
      document.getElementById(`contact-${firstInvalidField}`)?.focus();
      return;
    }

    const query = new URLSearchParams({
      subject: `Portfolio inquiry from ${name}`,
      body: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    window.location.href = `mailto:${encodeURIComponent(ownerEmail)}?${query.toString()}`;
  }

  return (
    <section
      className="content-section contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="section-inner contact-layout">
        <div className="section-heading">
          <p className="eyebrow">Have an idea in mind?</p>
          <h2 id="contact-title">
            Let&apos;s connect<span aria-hidden="true">.</span>
          </h2>
          <p>Share a little about what you are working on.</p>
          <a className="direct-email" href={`mailto:${ownerEmail}`}>
            {ownerEmail} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contact-form-wrap">
          <form className="contact-form" noValidate onSubmit={handleSubmit}>
            {Object.keys(errors).length > 0 && (
              <p className="form-error-summary" role="alert">
                Please correct the highlighted fields.
              </p>
            )}
            <div className="form-field">
              <label htmlFor="contact-name">Name</label>
              <input
                autoComplete="name"
                id="contact-name"
                name="name"
                type="text"
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
              />
              {errors.name && (
                <p className="field-error" id="contact-name-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">Email</label>
              <input
                autoComplete="email"
                id="contact-email"
                name="email"
                type="email"
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
              />
              {errors.email && (
                <p className="field-error" id="contact-email-error">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
              />
              {errors.message && (
                <p className="field-error" id="contact-message-error">
                  {errors.message}
                </p>
              )}
            </div>
            <button className="submit-button" type="submit">
              Send <span aria-hidden="true">↗</span>
            </button>
            <p className="form-note">
              This will open your email app to deliver your message/inquiry.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
