# Quickstart: Engineer Portfolio Site

## Prerequisites

- Node.js and npm versions supported by the existing Next.js 16 project.
- Dependencies installed in the repository root.

## Build and static export

From the repository root:

```powershell
npm ci
npm run lint
npm run build
```

Expected outcomes:

- ESLint exits successfully.
- Next.js completes a production build and produces a static `out/` directory containing
  `index.html` and the page's required assets.
- The exported page runs when served by a static file host; it does not require `next start`,
  a database, or an API server.

## Content-edit validation

1. Edit one displayed value in `data/portfolio.json` without changing application source.
2. Run `npm run build` again.
3. Serve the resulting `out/` directory using a local static file server or preview host.
4. Confirm the changed value is visible in the correct section and the project grid still has
   exactly three cards.
5. Temporarily remove or empty a project's `githubUrl`, rebuild, and confirm its card has no
   repository link while its live-project destination remains available. Restore the original
   content afterward.

Expected outcome: build-time content changes appear in the export, while the shipped site does
not require access to the source JSON file.

## Project previews and local images

1. Add three owner-supplied preview files under `public/images/projects/` and reference each
   with its root-relative path and descriptive alternative text in the matching project record.
2. Rebuild and confirm that each card shows its corresponding preview, the preview opens that
   project's live URL, the live-project link remains available, and a GitHub link appears only
   when its non-empty URL is supplied.
3. Remove or temporarily rename one referenced preview and rebuild. Confirm the card renders a
   neutral fallback without a broken-image indicator and its text and direct links still work.
4. If the owner has a portrait, place it under `public/images/portrait/`, add its path and
   alternative text to the profile, then verify the Hero image remains square at desktop and
   mobile sizes.
5. Comment out the dedicated portrait component invocation in the Hero and rebuild. Confirm the
   name, tagline, biography, and Hero navigation remain visible and usable.

Expected outcome: images are served as part of the static export; no remote image service or
server-side runtime is required.

## Resume records and credential links

1. Confirm the supplied experience records and certification records in `data/portfolio.json`
   match the owner-approved resume details. The lists may contain any number of records,
   including none. In particular, verify whether the newest role is still current before
   publishing.
2. Confirm all experience records show employer, title, location, dates, and description in
   newest-start-first order, including records with overlapping dates.
3. Confirm each certification shows its name, issuer, and date. Verify placeholder links are
   visibly identified as placeholders and are replaced by owner-approved destinations before
   release.
4. Rebuild and verify the data validator accepts empty or reduced experience/certification lists,
   accepts a missing or empty GitHub URL, and rejects invalid non-empty GitHub URLs, invalid local
   asset paths, missing image alternative text, malformed dates, and invalid external URLs.

Expected outcome: the resume-based career and certification information is readable, ordered,
and does not imply that placeholder destinations verify credentials.

## Browser checks

At desktop width, at 320 CSS px, and at a representative mobile width:

- Verify section order, hero content, exactly three project cards, every live-project link, and
  GitHub links only for projects with a non-empty URL.
- Navigate sections and controls with keyboard only; confirm focus is visible.
- Use a screen reader to verify the page's section landmarks and heading structure, project links,
  form labels, and validation-error announcements.
- Verify no horizontal page overflow; check normal text at 4.5:1, large text at 3:1, and
  meaningful control indicators at 3:1 against adjacent colors.
- Enable reduced motion at the operating-system or browser level; confirm content remains
  available and motion is reduced.
- Submit empty and malformed form values; verify field feedback.
- Submit valid values; verify the email handler receives the configured owner address and the
  visitor values, and verify the page does not claim delivery.
- Confirm the owner's email is visible as a direct fallback.
- Open each project's live-project link and verify it reaches the matching destination without a
  navigation error. Verify each supplied GitHub link does the same; ensure missing or empty GitHub
  URLs produce no empty repository link.
- Verify each project preview links to its own live destination and has a project-identifying
  accessible name; verify the missing-image fallback.
- Verify the optional portrait can be replaced and hidden independently without losing Hero text.
- Verify every supplied resume-based role, its location and dates, and every supplied
  certification's issuer, date, and clearly identified credential link when present. Include an
  empty-list check to confirm neither section requires four records.

See [the portfolio content schema](./contracts/portfolio-content.schema.json),
[the data model](./data-model.md), and [the contact form contract](./contracts/contact-form.md).
