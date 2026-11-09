# Implementation Plan: Engineer Portfolio Site

**Branch**: `001-engineer-portfolio` | **Date**: 2026-11-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-engineer-portfolio/spec.md`

**Planning update**: Align the existing implementation plan and content contract with the
specification's clarified rules: GitHub destinations are optional, and Experience and
Certifications have no minimum record count. The current validator, schema, and project UI still
enforce the previous behavior and require implementation updates.

## Summary

Extend the implemented one-page portfolio to add a linked visual preview to each project card,
populate Experience and Certifications from the supplied resume, and add an optional square
Hero portrait that can be hidden by commenting out its dedicated component. Preserve the existing
dark-first design, static export, build-time JSON validation, five-section order, accessible
navigation, and client-only contact handoff. Keep exactly three project cards and require each
card's live-project URL, but render its GitHub link only when a non-empty GitHub URL is supplied.
Experience and Certifications display all supplied records, with no minimum list size. Store
replaceable images as local static assets so the export remains self-contained and avoids a
runtime image service.

## Technical Context

**Language/Version**: TypeScript 6.x; React 19.2; Next.js 16.3 (installed project)

**Primary Dependencies**: Next.js App Router, Tailwind CSS 4, Framer Motion 14, React 19

**Storage**: `data/portfolio.json`, imported and validated at build time; image files live under
`public/`; no runtime database or API.

**Testing**: Existing `npm run lint` (ESLint) and `npm run build` (Next.js); add no test
framework by default. Validate JSON shape, static output, image destinations and fallback,
preview-to-project matching, portrait visibility toggle, zero-or-more experience/certification
records and their ordering, conditional GitHub-link rendering for missing and empty values, and
manual desktop/mobile, keyboard, reduced-motion, and contact-form checks.

**Target Platform**: Static web hosting serving the generated Next.js `out/` directory; modern
desktop and mobile browsers.

**Project Type**: Existing single-project Next.js web application.

**Performance Goals**: Serve all five sections from the static page; avoid horizontal overflow at
320 CSS px; keep animation and client-side JavaScript limited to interactions that need them.

**Constraints**: Exactly three project cards, each with a required live URL and a matching
clickable preview; GitHub URLs are optional and empty values produce no repository link; the
resume supplies initial Experience and Certification records, with no minimum count; optional
Hero portrait that can be independently hidden; JSON-only routine content edits; local static
media; no server runtime, server-side data store, or email-sending backend; dark default; keyboard
access, WCAG 2.2 AA contrast, and reduced-motion support.

**Scale/Scope**: One route and five content sections, one owner profile, exactly three projects,
and zero or more owner-editable experience and certification records, initially populated from
the resume.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Content first**: Pass. The page focuses on the engineer's identity, work, career, credentials,
  and contact.
- **Responsive accessibility**: Pass with design and verification requirements covering semantic
  content, keyboard operation, narrow screens, contrast, and reduced motion.
- **Dark-first visual system**: Pass. The default is dark, with consistent near-black, off-white,
  gray, and restrained yellow accents.
- **Intentional motion**: Pass. Framer Motion is limited to clarifying transitions and must honor
  the operating-system reduced-motion preference.
- **Lean performance**: Pass. Next static generation and imported local JSON avoid runtime
  services; client components are restricted to necessary interactions.
- **Scope**: Pass. One page, five sections, and three projects; no unnecessary APIs, services, or
  persistent data stores.
- **Post-design re-check**: Pass. Optional repository links and zero-or-more record collections
  remain within the existing content-first, accessible, static-only architecture.

## Project Structure

### Documentation (this feature)

```text
specs/001-engineer-portfolio/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── portfolio-content.schema.json
│   └── contact-form.md
└── tasks.md                 # Existing tasks; regenerate after this plan update
```

### Current application structure

The original portfolio implementation is already present. The App Router renders the sections
from the validated `data/portfolio.json`; static HTML is generated from `app/page.tsx`.

```text
.
├── app/
│   ├── components/
│   │   ├── Certifications.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Experience.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   └── Projects.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── data/
│   └── portfolio.json
├── lib/
│   ├── portfolio-content.ts
│   └── utils.ts
├── public/
│   └── ...                       # Existing public assets
├── next.config.ts                # output: "export"
├── eslint.config.mjs
└── package.json                  # lint and build scripts
```

The current content has three project records with sample GitHub and live URLs, no
preview-image fields, four experience records, four certification records, and no portrait field.
The build-time validator currently requires `githubUrl` and at least four experience and
certification records. `Projects` unconditionally renders a GitHub link; `Experience` and
`Certifications` already render supplied records and safely omit empty lists. These validator,
schema, and UI behaviors must be aligned with the clarified optional-link and unrestricted-count
requirements.

### Planned incremental application changes

Keep existing route, section components, and JSON workflow. Extend content types and validation,
make `githubUrl` optional, treating a missing or empty value as no repository link; retain the
required live URL. Remove minimum-count validation for Experience and Certifications while
continuing to validate each supplied record. Update the JSON schema and tests/validation guidance
to match those rules. Populate resume records, and add optional local image paths. Implement the
portrait as a dedicated component rendered by `Hero`; commenting out its component invocation
hides only the portrait. Project images link to their matching live destinations. A direct GitHub
link is rendered only when its destination is supplied, and the live-project link remains
available. Small client components handle native image-load errors and replace failed images with
neutral placeholders; all portfolio content remains statically rendered.

```text
.
├── app/
│   ├── components/
│   │   ├── Hero.tsx              # Render profile and optional portrait component
│   │   ├── Portrait.tsx          # Replaceable square image, removable independently
│   │   ├── Projects.tsx          # Project preview links and fallback
│   │   ├── ProjectPreview.tsx    # Client-side missing-image fallback
│   │   ├── Experience.tsx        # Resume details in newest-start-first timeline
│   │   ├── Certifications.tsx    # Issuer, date, and placeholder credential links
│   │   ├── Header.tsx            # Existing section navigation
│   │   └── ContactForm.tsx       # Existing validation and mailto handoff
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Existing section order remains unchanged
├── data/
│   └── portfolio.json            # Add image fields and resume details
├── lib/
│   └── portfolio-content.ts      # Extend types and build-time validation
├── public/
│   └── images/
│       ├── projects/              # Owner-supplied project previews
│       └── portrait/              # Owner-supplied portrait
└── specs/001-engineer-portfolio/
    └── contracts/portfolio-content.schema.json
```

**Structure Decision**: Extend the existing Next.js single-project application instead of
introducing a new route or service. Keep source styles in `app/globals.css` and route composition
in `app/page.tsx`; save editable content in `data/portfolio.json` and local images under
`public/images/`. Validate local media paths and the existing HTTPS external destinations at
build time. Static export produces `out/index.html` and copies public assets into the export;
neither generated output nor `out/` is a hand-maintained source location. Use the existing
`next/image` component with `unoptimized` for locally served static files and small client
components only for image error fallback; no new dependency is required.

## Complexity Tracking

No constitution violations or additional architecture complexity require justification. The
portrait component is separate only to satisfy the owner's independent hide/show request.
