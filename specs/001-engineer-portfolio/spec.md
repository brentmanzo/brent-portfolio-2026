# Feature Specification: Engineer Portfolio Site

**Feature Branch**: `001-engineer-portfolio`

**Created**: 2026-11-09

**Status**: Draft

**Input**: User description: "Create a single-page personal portfolio for a software engineer with a hero (bio and tagline), exactly three project cards with optional GitHub and live links, an experience timeline, certifications, and a contact form. Keep it statically deployable and make content editable through a JSON file. Adapt the supplied Kive reference's confident minimalist mood, near-black/off-white/gray palette, restrained electric-yellow accent, large lightweight display typography, and quiet centered hero. Use original identity and content, not Kive branding, copy, imagery, or product evidence. Treat the dated 2026-09-08 reference as a single viewport and do not infer unseen sections."

## Clarifications

### Session 2026-11-09

- Q: In what order should the Experience timeline display roles? → A: Newest role first.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the Engineer (Priority: P1)

A prospective employer or collaborator opens the portfolio and quickly understands who the
engineer is, their professional focus, and how to navigate the single-page site.

**Why this priority**: The portfolio must communicate its owner's identity before visitors can
evaluate their work or make contact.

**Independent Test**: Review the opening section on desktop and mobile, then use its navigation
links to reach each named section.

**Acceptance Scenarios**:

1. **Given** a visitor opens the portfolio, **When** the first screen appears, **Then** it shows
   the engineer's name, tagline, and concise biography in a clear, high-contrast hero.
2. **Given** a visitor reads the page from top to bottom, **When** they move beyond the Hero,
   **Then** the sections appear in the order Projects, Experience, Certifications, and Contact.
3. **Given** a visitor wants to inspect a section, **When** they activate its navigation link,
   **Then** the corresponding section is brought into view without leaving the page.
4. **Given** the page is viewed at desktop and mobile widths, **When** the visitor scans the
   page, **Then** the centered, lightweight Hero headline and minimalist dark visual style remain
   consistent, with readable type, restrained accents, and no horizontal page scrolling.
5. **Given** the visitor uses a keyboard or requests reduced motion, **When** they navigate or
   view the page, **Then** all controls remain operable and all content remains available without
   depending on animation, and text and control indicators meet WCAG 2.2 AA contrast thresholds.

---

### User Story 2 - Review Projects (Priority: P1)

A visitor scans three featured projects and follows a project's repository or live-site link to
see more evidence of the engineer's work.

**Why this priority**: Projects are direct evidence of the owner's skills and a primary purpose of
an engineering portfolio.

**Independent Test**: Count the project cards and activate each destination that is shown on
each card.

**Acceptance Scenarios**:

1. **Given** the visitor reaches Projects, **When** the grid is displayed, **Then** it contains
   exactly three showcase cards, each with a project name, concise description, and live-project
   link, plus a GitHub link when a non-empty GitHub URL is supplied.
2. **Given** the visitor activates a displayed project link, **When** the destination opens,
   **Then** it points to the matching repository or live project rather than another project's
   URL.
3. **Given** a project has no GitHub URL or its GitHub URL is empty, **When** its card is
   displayed, **Then** no empty or nonfunctional GitHub link is shown and the live-project link
   remains available.

---

### User Story 3 - Explore Experience and Certifications (Priority: P2)

A visitor reviews the engineer's career history and certifications to understand relevant roles,
skills, and qualifications.

**Why this priority**: These details add context and credibility to the project work.

**Independent Test**: Navigate to Experience and Certifications and verify each supplied record
is represented with its relevant identifying details.

**Acceptance Scenarios**:

1. **Given** the visitor reaches Experience, **When** the timeline is displayed, **Then** each
   supplied role can be distinguished by employer, title, and dates, ordered newest role first.
2. **Given** the visitor reaches Certifications, **When** the certification list is displayed,
   **Then** each supplied certification shows its name and issuer, with an optional credential
   link when one is provided.

---

### User Story 4 - Prepare a Contact Message (Priority: P2)

A prospective employer or collaborator enters their details and message, then uses the form to
prepare an email to the portfolio owner.

**Why this priority**: Visitors need a direct path to contact the engineer, while the site remains
statically deployable.

**Independent Test**: Submit a valid contact form and verify that an email compose window is
addressed to the owner and contains the visitor's name, email, and message.

**Acceptance Scenarios**:

1. **Given** a visitor leaves a required field empty or enters an invalid email address, **When**
   they submit the form, **Then** the form identifies the fields to correct and does not open an
   email draft.
2. **Given** a visitor enters a valid name, email address, and message, **When** they submit the
   form, **Then** the browser opens the visitor's email handler with the configured owner address
   and entered details included.
3. **Given** the visitor views the Contact section, **Then** the owner's direct email address is
   available whether or not an email handler is configured.

---

### User Story 5 - Update Portfolio Content (Priority: P2)

The owner updates portfolio details without editing application source code and deploys the
updated site to static-only hosting.

**Why this priority**: The owner needs to keep the portfolio current without requiring a server or
developer changes for routine content edits.

**Independent Test**: Change one record in the JSON content file, build and deploy the site to
static-only hosting, then verify the updated content appears on the page.

**Acceptance Scenarios**:

1. **Given** the owner changes a profile or portfolio record in the JSON content file, **When**
   the site is rebuilt and deployed, **Then** the updated value appears in the corresponding
   section without application source edits.
2. **Given** the site is deployed to static-only hosting, **When** a visitor opens and navigates
   the page, **Then** all five sections remain available without a server-side runtime or data
   store.

## Edge Cases

- A project has no GitHub URL or has an empty GitHub URL: its repository link is omitted while its
  required live-project destination remains available.
- A project is missing its required live-project URL: the content is incomplete and the owner is
  prompted to provide the live-project destination before release.
- An optional credential link or experience detail is absent: the remaining supplied information
  remains readable without an empty link or placeholder.
- The page is viewed at a narrow viewport or with keyboard-only navigation: content and controls
  remain readable, reachable, and usable without horizontal page scrolling.
- A visitor requests reduced motion: motion is reduced or removed without hiding information or
  making navigation dependent on animation.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The portfolio MUST present the Hero, Projects, Experience, Certifications, and
  Contact sections as one navigable page, in that order.
- **FR-002**: The Hero MUST display the owner's name, professional tagline, and concise biography.
- **FR-003**: The Projects section MUST display exactly three showcase cards. Each card MUST
  include a project name, concise description, and live-project destination. A GitHub destination
  MUST be displayed only when a non-empty GitHub URL is supplied; a missing or empty value MUST
  not produce an empty or nonfunctional link.
- **FR-004**: The Experience section MUST present each supplied role with employer, title, and
  dates in a timeline ordered newest role first.
- **FR-005**: The Certifications section MUST list supplied certifications by name and issuer and
  MUST display a credential destination when one is provided.
- **FR-006**: The Contact section MUST provide fields for visitor name, email address, and message.
  It MUST validate required values and email format before preparing a message.
- **FR-007**: On valid submission, the contact form MUST open the visitor's email handler with the
  configured owner address and entered contact details. The owner's direct email address MUST
  remain visible as an alternative regardless of email-handler availability, and the page MUST
  NOT claim successful delivery.
- **FR-008**: The owner MUST be able to update portfolio text and records through a JSON content
  file without editing application source code. The content MUST cover the Hero, three Projects,
  Experience, Certifications, and Contact information.
- **FR-009**: The complete page MUST be deployable to static-only hosting without a server-side
  runtime or a server-side data store.
- **FR-010**: The visual presentation MUST use a minimalist dark default with near-black,
  off-white, and gray surfaces, a restrained electric-yellow action accent, and prominent
  lightweight display typography. The Hero MUST use a large centered headline with generous
  line spacing on a quiet, nearly flat dark surface. It MUST adapt these principles using
  original portfolio content and assets, without reproducing Kive branding, copy, imagery, or
  product evidence.
- **FR-011**: The page MUST remain usable on mobile and desktop, provide semantic and keyboard
  access to content and controls, provide assistive-technology access, meet WCAG 2.2 AA contrast
  thresholds for text and control indicators, and respect reduced-motion preferences.
- **FR-012**: Any motion MUST be restrained and support hierarchy, feedback, or navigation; it
  MUST NOT delay access to content or make an interaction dependent on animation.

### Key Entities

- **Owner Profile**: The portfolio owner's name, tagline, biography, and contact email.
- **Project**: One of exactly three showcase entries, with a name, description, and live-project
  URL, and an optional GitHub URL.
- **Experience Record**: A role with employer, title, dates, and optional supporting details.
- **Certification**: A qualification with name, issuer, and optional credential URL.
- **Contact Message**: A visitor's name, email address, and message prepared for the owner.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All five required sections are present on one page, and the page displays exactly
  three project cards.
- **SC-002**: At release, each of the three project cards exposes a live-project destination that
  opens successfully to the matching project; cards with a supplied non-empty GitHub URL also
  expose a working repository destination, while cards without one show no empty repository link.
- **SC-003**: The owner can change displayed profile, project, experience, certification, and
  contact details through the JSON content file alone, with no application source edits.
- **SC-004**: The completed site can be hosted on static-only hosting and all portfolio sections
  remain available without a server-side runtime.
- **SC-005**: At a 320 CSS-pixel viewport width, all required content and controls remain
  available without horizontal page scrolling.
- **SC-007**: All required contact fields are included in the prepared email, and invalid or
  missing required values are identified before email preparation.

## Assumptions

- The owner supplies accurate portfolio copy, exactly three project names/descriptions and live
  URLs, optional GitHub URLs, project preview images, and a contact email address. The
  resume-derived experience and certification records in Additional Features are starting
  content and must be confirmed before publication; owners may maintain any number of records,
  including none.
- A missing or empty GitHub URL means that no repository link is shown; every project still
  requires its live-project URL.
- Because the site must be statically deployable and no form-processing service is specified,
  contact submission hands off to the visitor's email handler rather than promising delivery.
- A direct owner email address remains available even when visitors can use their device's default
  email handler.
- The dated Kive reference is inspiration for the stated visual principles only. It captures one
  viewport and does not establish requirements for unseen sections or motion. The original
  source could not be inspected interactively in the browser during specification; no motion or
  later-page behavior is inferred. The supplied portfolio sections are defined by the feature
  request, not inferred from that reference.
- Motion remains subordinate to content and follows the constitution's reduced-motion requirement.

## Additional Features

These additions extend the portfolio requirements above. The experience and certification
content is based on the [resume supplied by the owner](https://brentmanzo.com/static/media/Brent%20Millen%20Manzo%20-%20Resume%202024.0dbf658afa3862fb2d8e.pdf).

### User Story 6 - Preview Featured Projects (Priority: P1)

A visitor sees a visual preview of each featured project and can open its live project directly
from the preview.

**Why this priority**: Project imagery helps visitors recognize and assess the featured work.

**Independent Test**: Verify each of the three project cards has a matching preview and that
activating each preview opens that card's live-project destination.

**Acceptance Scenarios**:

1. **Given** a visitor reaches Projects, **When** the three cards are displayed, **Then** each
   card includes a representative image preview and its existing project details and links.
2. **Given** a visitor activates a project preview, **When** the destination opens, **Then** it
   is the live-project URL belonging to that same card.
3. **Given** a preview image is unavailable, **When** its card is displayed, **Then** no broken
   image is shown and the card's text and direct project links remain usable.
4. **Given** a visitor uses a keyboard or assistive technology, **When** they reach a preview,
   **Then** its live-project action has an accessible name identifying the project and can be
   activated without a pointer.

### User Story 7 - Review Resume-Based Career and Credentials (Priority: P2)

A visitor reviews the owner's resume-based work history and certifications, including links to
credential destinations.

**Why this priority**: Accurate career and certification details give visitors context for the
owner's skills and qualifications.

**Independent Test**: Verify every supplied resume role appears as a dated timeline entry in
newest-first order and every supplied certification shows its identifying details and any
placeholder destination.

**Acceptance Scenarios**:

1. **Given** a visitor reaches Experience, **When** the timeline is displayed, **Then** every
   supplied role is shown with employer, title, location, dates, and a concise summary of its
   responsibilities, newest role first; the list is not required to contain four or more roles.
2. **Given** a visitor reaches Certifications, **When** the list is displayed, **Then** every
   supplied certification is shown with its issuer, date, and a clearly identified credential
   link when one is supplied; the list is not required to contain four or more certifications.
3. **Given** a role's dates overlap another role, **When** the timeline is displayed, **Then**
   each role retains its own resume dates and the entries remain ordered by most recent start
   date.
4. **Given** a visitor activates a placeholder credential link, **When** its destination opens,
   **Then** the portfolio does not represent the placeholder as a verified credential record.

**Initial resume-based experience records** (starting content; owners may remove or add records):

1. **SyCip, Gorres, Velayo & Co.** — Full-stack Developer, Makati City, Philippines,
   Mar 2023–Present. Builds responsive web and mobile applications, manages and supports internal
   applications and databases, and unit tests software changes.
2. **Oracle Corporation** — Application Engineer, Makati City, Philippines, Jun 2022–Mar 2023.
   Enhanced code using Java ADF, implemented procurement and purchasing product features, and
   investigated customer bugs and corrections.
3. **Digital Advantage Corporation** — Application Developer Intern, Pasay City, Philippines,
   Jan 2022–Jun 2022. Built screens for a web-based loyalty application, refined front-end pages
   from wireframes with validation, and contributed to pre-production quality assessment.
4. **Freelance** — Front-end Developer, Taguig City, Philippines, Jan 2021–Mar 2022. Developed
   and consulted on web applications, managed and deployed custom systems including an online
   ordering system, and created front-end pages for portfolio and token-generation projects.

**Initial resume-based certification records** (starting content; owners may remove or add
records):

1. React Front To Back 2022 (React.js) — Udemy, Jan 2023.
   Placeholder: `https://example.com/certifications/react-front-to-back-2022`.
2. Professional Scrum Master I (PSM I) — Scrum.org, Jul 2022.
   Placeholder: `https://example.com/certifications/professional-scrum-master-i`.
3. Microsoft Certified: Azure Fundamentals — Microsoft, Mar 2022.
   Placeholder: `https://example.com/certifications/azure-fundamentals`.
4. AWS Academy Graduate - Cloud Foundations — Amazon Web Services Training and Certification,
   Mar 2021. Placeholder: `https://example.com/certifications/aws-academy-cloud-foundations`.

### User Story 8 - Personalize the Hero Portrait (Priority: P2)

The owner can add a square portrait to the Hero when ready and hide the portrait without removing
or disrupting the rest of the Hero.

**Why this priority**: A personal image can make the portfolio more recognizable while allowing
the owner to choose whether and when to display it.

**Independent Test**: Verify the Hero has an optional square image area that can be replaced with
an owner-supplied portrait and hidden while the name, tagline, and biography remain available.

**Acceptance Scenarios**:

1. **Given** the owner has not supplied a portrait, **When** the Hero is displayed, **Then** it
   uses a neutral placeholder rather than fabricated personal imagery.
2. **Given** the owner supplies a portrait, **When** the Hero is displayed, **Then** it appears
   in a square image area with appropriate text alternative.
3. **Given** the owner chooses not to show the portrait, **When** the portrait display is
   disabled, **Then** the name, tagline, biography, and remaining Hero layout remain usable.

### Additional Functional Requirements

- **FR-013**: Each of the three project cards MUST show a representative preview image. Activating
  the image MUST open that card's live-project destination; the image action MUST be keyboard
  operable and have an accessible name identifying the project. Existing direct project links
  MUST remain available.
- **FR-014**: Project preview images MUST be replaceable by the owner without changing unrelated
  portfolio content. If an image is unavailable, the page MUST avoid showing a broken image and
  preserve the card's text and direct links.
- **FR-015**: The Experience section MUST display every supplied role with employer, title,
  location, dates, and concise responsibility details, ordered newest-first by role start date
  while retaining its supplied dates. The list MUST NOT require a minimum of four records.
- **FR-016**: The Certifications section MUST display every supplied certification with its name,
  issuer, and date, and display a clearly identified credential link when one is supplied. The
  list MUST NOT require a minimum of four records.
- **FR-017**: The Hero MUST provide an optional square portrait area that the owner can replace
  with a supplied image and hide by commenting out its dedicated display component, without
  removing or hiding the other Hero content. A supplied image MUST have an appropriate text
  alternative; no personal portrait may be fabricated.

### Additional Success Criteria

- **SC-009**: All three project cards show a matching preview, and activating each preview opens
  the live-project destination for that same project.
- **SC-010**: Every supplied role and its identifying details are visible in newest-first timeline
  order, including when role dates overlap; the owner can maintain fewer than four roles.
- **SC-011**: Every supplied certification shows its name, issuer, and date, with a clearly
  identified link when one is supplied; the owner can maintain fewer than four certifications.
- **SC-012**: The Hero portrait area is square when shown, can be replaced or hidden independently,
  and hiding it leaves all required Hero text available.

### Additional Assumptions

- The supplied 2024 resume is the source for the role and certification details above. In
  particular, the latest role's “Present” date is reproduced as written in that resume and must
  be confirmed by the owner before publication.
- Credential links use reserved `example.com` placeholder destinations and are not evidence that
  credentials have been independently verified. The owner replaces them with valid destinations
  before publication.
- The owner supplies suitable project preview images. Until supplied, a non-project-specific
  neutral placeholder may be used; fabricated project imagery or evidence is not used.
- The Hero portrait is not supplied yet; a neutral placeholder is used until the owner provides
  an image.
