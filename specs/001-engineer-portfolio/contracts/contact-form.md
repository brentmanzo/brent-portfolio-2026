# Contact Form Contract

## Inputs

- `name`: visitor's required name.
- `email`: visitor's required, syntactically valid email address.
- `message`: visitor's required message.
- Recipient: `contact.email` from the portfolio content document.

## Behavior

1. Keep the form fields associated with visible labels and keyboard accessible.
2. Before handoff, trim values and reject blank name, blank message, or invalid email; present
   field-level feedback and preserve the visitor's entered values.
3. On valid submission, construct a `mailto:` URL addressed to the configured portfolio email.
   Include the visitor's name, email, and message in the subject/body. Encode user-provided
   values as URL components.
4. Keep a visible direct email link available as a fallback; do not rely on detecting whether an
   email handler exists. Do not persist the message, call a server, or claim that a message was
   sent or delivered.
5. On narrow viewports and reduced-motion settings, the form remains usable and does not rely
   on animation to reveal validation or submission status.

## Constraints

- No application API endpoint or third-party form service is part of this contract.
- Submission opens the visitor's local email handler; availability and delivery are outside the
  site's control.
